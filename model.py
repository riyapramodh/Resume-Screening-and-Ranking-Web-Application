
import pandas as pd
import pymongo
import joblib
from pymongo import MongoClient

# Step 1: Connect to MongoDB and retrieve data
def read_from_mongodb(database_name, collection_name):
    client = pymongo.MongoClient("mongodb+srv://admin:password321@cluster0.wmbieqt.mongodb.net/?retryWrites=true&w=majority")
    db = client[database_name]
    collection = db[collection_name]
    data_from_mongo = list(collection.find())
    client.close()
    return data_from_mongo

# Step 2: Convert MongoDB data to DataFrame
def convert_mongo_to_dataframe(mongo_data):
    df_mongo = pd.DataFrame(mongo_data)
    # Drop the '_id' column if it exists
    df_mongo = df_mongo.drop('_id', axis=1, errors='ignore')
    return df_mongo

if __name__ == "__main__":
    # Step 3: Read data from MongoDB
    database_name = "Final"
    collection_name = "Data"
    mongo_data = read_from_mongodb(database_name, collection_name)

    # Step 4: Convert MongoDB data to DataFrame
    df_mongo = convert_mongo_to_dataframe(mongo_data)

    # Step 5: Work with the DataFrame (df_mongo) as needed
    # For example, you can print the DataFrame
    print("DataFrame from MongoDB:")
    print(df_mongo)
    
    model_filename = r'D:\AR. Vishaline\FinalYearProject\Code\Resume-Screening-and-Ranking-System\final_modelXG.pkl'
    vectorizer_filename = r'D:\AR. Vishaline\FinalYearProject\Code\Resume-Screening-and-Ranking-System\vectorizer.pkl'

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


    client = MongoClient('mongodb+srv://admin:password321@cluster0.wmbieqt.mongodb.net/?retryWrites=true&w=majority')

# Access or create the "Results" database
results_db = client["Results"]

# Create collections "1" and "0" in the "Results" database
collection_1 = results_db["Screened"]

# Filter the DataFrame based on predicted labels and insert into corresponding collections
df_1 = df_mongo[df_mongo['Predicted_Label'] == 1]
records_1 = df_1.to_dict(orient='records')

# Insert records into collections
collection_1.insert_many(records_1)


# Disconnect from MongoDB
client.close()