
import pandas as pd
import pymongo
import joblib
from pymongo import MongoClient
import db
# Step 1: Connect to MongoDB and retrieve data
def read_from_mongodb(collection, recruiter_id):
    
    
    data_from_mongo = list(collection.find({'recruiter_id':recruiter_id}))
    
    return data_from_mongo

# Step 2: Convert MongoDB data to DataFrame
def convert_mongo_to_dataframe(mongo_data):
    df_mongo = pd.DataFrame(mongo_data)
    # Drop the '_id' column if it exists
    df_mongo = df_mongo.drop('_id', axis=1, errors='ignore')
    return df_mongo

def classification(recruiter_id):
    database_name = "test"
    collection_name = "filtered_temp"
    collection = db.db[collection_name]
    mongo_data = read_from_mongodb(collection, recruiter_id)

    # Step 4: Convert MongoDB data to DataFrame
    df_mongo = convert_mongo_to_dataframe(mongo_data)
    print("DataFrame from MongoDB:")
    print(df_mongo)
    
    if df_mongo.empty:
        return "No Resumes Filtered"
    else:
        model_filename = r"final_modelXG.pkl"
        vectorizer_filename = r"vectorizer.pkl"
        # Load the trained XGBoost model from the .pkl file
        final_modelXG = joblib.load(model_filename)
        print("XGBoost model loaded from", model_filename)

        # Load the CountVectorizer from the saved file
        vectorizer = joblib.load(vectorizer_filename)
        print("Vectorizer loaded from", vectorizer_filename)

        # Create an empty 'Label' column
        df_mongo['Label'] = None

        # Concatenate relevant columns to create feature vectors for new resumes
        df_mongo['combined_text'] = df_mongo.apply(lambda row: ' '.join(map(str, row.drop(['Label', 'Name']))), axis=1)

        # Transform new data using the original CountVectorizer
        X_new_resumes = vectorizer.transform(df_mongo['combined_text'])

        # Predict for new resumes
        new_resumes_predictions = final_modelXG.predict(X_new_resumes)

        # Output the final predictions
        df_mongo['Predicted_Label'] = new_resumes_predictions
        df_mongo[['Name', 'Predicted_Label']].to_csv('predictions_xgboost.csv', index=False)

        # Display the final predictions
        print("Final Predictions for new resumes:")
        print(df_mongo[['Name', 'Predicted_Label']])


        
    # Access or create the "Results" database
        

    # Create collections "1" and "0" in the "Results" database
        collection_1 = db.db["Screened"]

    # Filter the DataFrame based on predicted labels and insert into corresponding collections
        df_1 = df_mongo[df_mongo['Predicted_Label'] == 1]
        records_1 = df_1.to_dict(orient='records')

    # Insert records into collections
        try:
            collection_1.insert_many(records_1)
        except:
            return "No Resumes Filtered"

