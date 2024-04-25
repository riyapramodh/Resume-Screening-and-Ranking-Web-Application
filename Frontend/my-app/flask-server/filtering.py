import pandas as pd
import re
from pymongo import MongoClient
import db
def extract_education_fields(education_text):
    # Customize this function based on the actual structure of your 'EDUCATION' field
    # For example, if CGPA is stored as 'CGPA: X.X', adjust the regular expression accordingly
    cgpa_match = re.search(r'CGPA (\d+(\.\d+)?)\s*/\s*10', education_text)
    class12_match = re.search(r'Class 12 (\d+(\.\d+)?)\s*%', education_text)
    class10_match = re.search(r'Class 10 (\d+(\.\d+)?)\s*%', education_text)
    

    cgpa = float(cgpa_match.group(1)) if cgpa_match else 0
    class12 = float(class12_match.group(1)) if class12_match else 0
    class10 = float(class10_match.group(1)) if class10_match else 0
    

    return cgpa, class12, class10

def check_minimum_requirements(row, input_values):
    # Extract education fields using the customized function
    cgpa, class12, class10 = extract_education_fields(row['Education'])
    
    # Check if all requirements are greater than or equal to the corresponding input value
    try:
        cgpa_input = float(input_values.get('CGPA', 0))
    except ValueError:
        cgpa_input = 0
    cgpa_condition = cgpa >= cgpa_input
    try:
        class12_input = float(input_values.get('Class 12', 0))
    except ValueError:
        class12_input = 0
    class12_condition = class12 >= class12_input
    try:
        class10_input = float(input_values.get('Class 10', 0))
    except ValueError:
        class10_input = 0
    class10_condition = class10 >= class10_input
    degree_list = input_values.get('Degree', [])
    degree_str_list = [str(deg) for deg in degree_list]  # Convert elements to strings
    try:
        if degree_str_list:
            degree_match = re.search('|'.join(degree_str_list), row['Education'])
            print(degree_match)
            degree_condition = bool(degree_match)
        else:
            degree_condition = True
    except re.error:
        degree_condition = True

    specialization_list = input_values.get('Specialization', [])
    education_info = str(row['Education'].split('CGPA')[0].strip())
    # Flatten the specialization list
    flattened_specialization_list = [specialization for sublist in specialization_list for specialization in sublist]

    # Convert elements to strings
    specialization_str_list = [str(spec) for spec in flattened_specialization_list]

    try:
        if specialization_str_list:         
            # Construct regex pattern to match any specialization
            specialization_pattern = '|'.join(map(re.escape, specialization_str_list))
            specialization_match = re.search(specialization_pattern, education_info)
            specialization_condition = bool(specialization_match)
        else:
            specialization_condition = True
    except re.error:
        specialization_condition = True
    
    # Return True only if all conditions are satisfied
    return all([cgpa_condition, class12_condition, class10_condition, degree_condition, specialization_condition])
def filtering(recruiter_id, input_values):
    filtered_data = []
    database_name = "test"
    collection_name = "temp"
    collection = db.db[collection_name]
# Query data from MongoDB
    cursor = collection.find({'recruiter_id':recruiter_id})
    df = pd.DataFrame(list(cursor))

# Input values with multiple specializations
    # input_values = {'CGPA': 7.0, 'Class 12': 70, 'Class 10': 70, 'Degree': True, 'Specialization': ['Computer Science Engineering', 'Electronics Communication Engineering']}

# Create a new column with True only if all conditions are satisfied
    df['Requirements_Satisfied'] = df.apply(lambda row: check_minimum_requirements(row, input_values), axis=1)

# Filter rows where 'Requirements_Satisfied' is True
    df_filtered = df[df['Requirements_Satisfied']]

# Drop the 'Requirements_Satisfied' column if you don't need it anymore
    df_filtered = df_filtered.drop(columns=['Requirements_Satisfied'])
    
# You can choose to save the filtered data back to MongoDB if needed
# (Optional) Save filtered data back to MongoDB
    filtered_data = df_filtered.to_dict(orient='records')
    collection_filtered = db.db.filtered_temp  # Replace with your desired collection name
    if filtered_data:
        collection_filtered.insert_many(filtered_data)
        collection_filtered.insert_one({'recruiter_id': recruiter_id})  # Use insert_one for a single document

    else:
        print("No data to insert into the collection")


