from flask import Flask, request, jsonify
from zipfile import ZipFile
import os
from flask import Flask, request, jsonify
from zipfile import ZipFile
from gridfs import GridFS
from flask_cors import CORS
import uuid
from pymongo import MongoClient
import base64
from bson import json_util
import json

from Mongo import process_resume_data
from model import classification
from filtering import filtering
from ranking import ranking
import db
app = Flask(__name__)
CORS(app)

processing_status = {}

@app.route("/")
def members():
    return {"members": ["Pramod", "Riya"]}

@app.route('/api/resumes', methods=['POST'])
def upload_resumes():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    filename = file.filename

    if filename.endswith('.zip'):
        try:
            # Generate a unique ID for the recruiter's upload
            recruiter_id = str(uuid.uuid4())

            with ZipFile(file, 'r') as zip_ref:
                zip_ref.extractall(recruiter_id)  # Unzip to a directory with recruiter_id as name

            # Insert PDF files into MongoDB using GridFS and associate with recruiter_id
            pdf_files = [f for f in os.listdir(recruiter_id) if f.endswith('.pdf')]
            for pdf_file in pdf_files:
                with open(os.path.join(recruiter_id, pdf_file), 'rb') as f:
                    file_id = db.fs.put(f.read(), filename=pdf_file, recruiter_id=recruiter_id)  # Store in GridFS

            # Clean up extracted files
            for pdf_file in pdf_files:
                os.remove(os.path.join(recruiter_id, pdf_file))
            os.rmdir(recruiter_id)

            # Set processing status to 'processing'
            processing_status[recruiter_id] = 'processing'

            # Call the process_resume_data script
            process_resume_data(recruiter_id)

            # Set processing status to 'done' when processing is complete
            processing_status[recruiter_id] = 'done'

            return jsonify({'message': 'Resumes uploaded successfully', 'recruiter_id': recruiter_id})
        except Exception as e:
            return jsonify({'error': f'Error processing zip file: {str(e)}'}), 500
            print(e)
    else:
        return jsonify({'error': 'Invalid file format'}), 400


    
@app.route('/requirements', methods=['POST'])
def requirements():
    def convert_priorities(user_input_weights):
    
        converted_priorities = {}

       
        for category, priorities in user_input_weights.items():
            
            if isinstance(priorities, dict):
                
                converted_priorities[category] = list(priorities.values())
            else:
                
                converted_priorities[category] = priorities

        return converted_priorities
    
    data = request.get_json()
    recruiter_id = data.get('recruiter_id')
    print(recruiter_id)
    
    
    education_info = {
        'CGPA': data['CGPA'],
        'Class 12': data['Class 12'],
        'Class 10': data['Class 10'],
        'Degree': data['Degree'],
        'Specialization': [data['Specialization']],
    }
    
    
    user_input = data['user_input']
    user_input_weights = data['user_input_weights']
    converted_priorities = convert_priorities(user_input_weights)
    print(converted_priorities)
    processing_status[recruiter_id] = 'processing'
    filtering(recruiter_id, education_info)
    classification(recruiter_id)
    ranking(recruiter_id, user_input, converted_priorities)
    processing_status[recruiter_id] = 'done'

    return "Requirements processed successfully!"

@app.route('/api/ranked_resumes', methods=['GET'])
def get_ranked_resumes():
    recruiter_id = request.args.get('recruiter_id')
    if not recruiter_id:
        return jsonify({'error': 'No recruiter_id provided'}), 400
    
    print(processing_status)
    if processing_status.get(recruiter_id) != 'done':
        return jsonify({'error': 'Processing not yet complete'}), 400

   
    ranked_resumes = db.db.Rankings.find({'recruiter_id': recruiter_id})
    print(ranked_resumes)
   
    results = []
    for resume in ranked_resumes:
        
        filename = resume['Name'] + '.pdf'
        resume_file = db.fs.find_one({'filename': filename, 'recruiter_id': recruiter_id})
        print(resume_file)
        if resume_file:
            
            resume['file'] = base64.b64encode(resume_file.read()).decode('utf-8')
            results.append(resume)

    return json.dumps(results, default=json_util.default)
if __name__ == "__main__":
    app.run(debug=True)