import os
import PyPDF2
from gridfs import GridFS
from pymongo import MongoClient
import re
import pandas as pd
from nltk.corpus import stopwords
import nltk

# Download NLTK stopwords
nltk.download('stopwords')


# Function to clean the text
def clean_text(text, section_name):
    # Check if the input is NaN
    if pd.isna(text):
        return ''

    # Replace specific abbreviations only under "TECHNICAL SKILLS" and "TECHNICAL INTERESTS" sections
    if section_name in ['TECHNICAL SKILLS', 'TECHNICAL INTERESTS']:
        abbreviation_replacements = {
            r'\bC\b': 'C lang',
            r'\bC\+\+\b': 'Cpp',
            r'\bpy\b': 'python',
            r'\bC#\b': 'Csharp',
            r'\bKt\b': 'Kotlin',
            r'\bGolang\b': 'Go',
            r'\bRProg\b': 'R',
            r'\bRStats\b': 'R',
            r'\bR-lang\b': 'R',
            r'\bPl\b': 'Perl',
            r'\bBsh\b': 'Bash',
            r'\bRst\b': 'Rust',
            r'\bSw\b': 'Swift',
            r'\bSft\b': 'Swift',
            r'\bSc\b': 'Scala',
            r'\bTS\b': 'typeScript',
            r'\bRb\b': 'Ruby',
            r'\bF77\b': 'Fortran',
            r'\bF90\b': 'Fortran',
            r'\bJS\b': 'Javascript',
            r'\bjq\b': 'Jquery',
            r'\bVBS\b': 'VBscript',
            r'\bTorch\b': 'PyTorch',
            r'\bPT\b': 'PyTorch',
            r'\bTF\b': 'TensorFlow',
            r'\bJRA\b': 'JIRA',
            r'\bHDP\b': 'Hadoop',
            r'\bAG\b': 'Agile',
            r'\bWS\b': 'Wireshark',
            r'\bWP\b': 'Winpop',
            r'\bSM\b': 'sysmon',
            r'\bAR\b': 'Autoruns',
            r'\bPM\b': 'ProcMan',
            r'\bRM\b': 'RegMon',
            r'\bDM\b': 'diskMon',
            r'\bCSF\b': 'NIST CSF',
            r'\bPEGA\b': 'Pega',
            r'\bANG\b': 'Angular',
            r'\bRCT\b': 'React',
            r'\bNODE\b': 'Node',
            r'\bCSS\b': 'Cassandra',
            r'\bmSQL\b': 'memSQL',
            r'\bTBL\b': 'Tableau',
            r'\bG Suite\b': 'Google Suite',
            r'\bGS\b': 'Google Suite',
            r'\bBS\b': 'Bootstrap',
            r'\bMUI\b': 'Material-UI',
            r'\bCP\b': 'Cypress',
            r'\bGQL\b': 'GraphQL',
            r'\bAMPLFY\b': 'Amplify',
            r'\bSLSS\b': 'Serverless',
            r'\bDBB\b': 'DynamoDB',
            r'\bCFN\b': 'CloudFormation',
            r'\bDL\b': 'Deep learning',
            r'\bML\b': 'Machine learning',
            r'\bIOT\b': 'IoT',
            r'\bCN\b': 'Computer Networks',
            r'\bNN\b': 'Neural Networks',
            r'\bCNN\b': 'Computational Neural Networks',
            r'\bRDMS\b': 'Relational Database Management Systems',
            r'\bDBMS\b': 'Database Management Systems',
            r'\bRNN\b': 'Recurrent Neural Networks',
            r'\bOS\b': 'Operating Systems'
            # Add more abbreviations and their replacements as needed
        }

        for abbr, replacement in abbreviation_replacements.items():
            text = re.sub(abbr, replacement, text)

    # Remove non-alphabetic characters, extra whitespaces, except "&"
    text = re.sub(r'[()]', ' ', text)
    text = re.sub(r'[^a-zA-Z0-9\s.%/&]', '', text)
    # Remove leading and trailing whitespaces
    text = text.strip()
    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    words = nltk.word_tokenize(text)
    filtered_words = [word for word in words if word.lower() not in stop_words]
    return ' '.join(filtered_words)



def extract_data(resume_text):
    sections = re.split(r'\s*(EDUCATION|TECHNICAL\s+INTERESTS|PROJECTS|INTERNSHIP|TECHNICAL\s+SKILLS|CERTIFICATIONS|ACHIEVEMENTS\s+&\s+HONORS|LANGUAGES|HOBBIES)\s*', resume_text)
    data = {}

    for i in range(1, len(sections), 2):
        section_name = sections[i].strip()
        section_text = sections[i + 1].strip() if i + 1 < len(sections) else ''
        if section_name in ['EDUCATION', 'TECHNICAL INTERESTS', 'PROJECTS', 'INTERNSHIP', 'TECHNICAL SKILLS', 'CERTIFICATIONS', 'ACHIEVEMENTS & HONORS', 'LANGUAGES', 'HOBBIES']:
            data[section_name] = clean_text(section_text, section_name)

    return data


def process_resume_data(recruiter_id):
    uri = "mongodb+srv://Vignesh:Vignesh_2906@cluster0.zgopuir.mongodb.net/test"
    client = MongoClient(uri, tlsAllowInvalidCertificates=True)
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)
    db = client.test
    fs = GridFS(db)

    temp_folder = 'temp_unzip'
    os.makedirs(temp_folder, exist_ok=True)

    # Retrieve all PDFs associated with the recruiter_id from GridFS
    pdf_files = list(fs.find({'recruiter_id': recruiter_id}))

    # Download PDFs to the temporary folder
    for pdf_file in pdf_files:
        temp_file_path = os.path.join(temp_folder, pdf_file.filename)
        with open(temp_file_path, 'wb') as temp_file:
            temp_file.write(fs.get(pdf_file._id).read())

    # Process each resume PDF in the temporary folder
    collection = db['temp']  # Replace 'your_collection' with your collection name
    for pdf_file_path in os.listdir(temp_folder):
        if pdf_file_path.endswith(".pdf"):
            with open(os.path.join(temp_folder, pdf_file_path), 'rb') as file:
                reader = PyPDF2.PdfReader(file)
                text = ""
                for page in reader.pages:
                    text += page.extract_text()

                file_name = os.path.splitext(pdf_file_path)[0]
                resume_data = extract_data(text)
                resume_data['Name'] = file_name

                # Insert specific resume data into MongoDB
                collection.insert_one({
                    'Name': resume_data.get('Name'),
                    'Education': resume_data.get('EDUCATION', ''),
                    'TechnicalInterests': resume_data.get('TECHNICAL INTERESTS', ''),
                    'Projects': resume_data.get('PROJECTS', ''),
                    'Internship': resume_data.get('INTERNSHIP', ''),
                    'TechnicalSkills': resume_data.get('TECHNICAL SKILLS', ''),
                    'Certifications': resume_data.get('CERTIFICATIONS', ''),
                    'AchievementsHonors': resume_data.get('ACHIEVEMENTS & HONORS', ''),
                    'Languages': resume_data.get('LANGUAGES', ''),
                    'Hobbies': resume_data.get('HOBBIES', ''),
                    'recruiter_id': recruiter_id
                })

    for pdf_file_path in os.listdir(temp_folder):
        os.remove(os.path.join(temp_folder, pdf_file_path))
    os.rmdir(temp_folder)
