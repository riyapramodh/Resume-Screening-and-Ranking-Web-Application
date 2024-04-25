import re
from pymongo import MongoClient
import db

def tokenize(text):
    if text is None:
        return []  # Return an empty list if text is None
    if isinstance(text, int):
        text = str(text)
    return [text.rstrip() for text in re.findall(r'\b\w+\S*', text.lower())]

def tokenize_user_input(text_list, weights):
    tokenized_user_input = {}
    for text, weight in zip(text_list, weights):
        if text:
            if isinstance(text, int):
                text = str(text)
            # Treat the entire text as a single token
            tokenized_user_input[text.lower()] = weight
    return tokenized_user_input

def process_document(document, tokenized_user_input):
    row_score = 0
    
    for category, data in document.items():
        
        if category not in ['_id', 'Name', 'Score', 'recruiter_id']:  # Exclude non-data fields
            weights = tokenized_user_input.get(category, {})  # Ensure the category exists in user input weights

            for token, category_score in weights.items():
                if token in data.lower():
                    if ' ' in token:
                        token_words = token.split()
                        if all(word in data.lower() for word in token_words):
                            row_score += category_score
                            print("Matched phrase:", token)
                    else:
                        words = data.lower().split()
                        try:
                            index_of_token = words.index(token)
                            if index_of_token < len(words) - 1:
                                next_word = words[index_of_token + 1]
                                if next_word not in {'beginner', 'intermediate', 'advanced', 'developer'}:
                                    category_score *= 1
                                else:
                                    if next_word == 'advanced':
                                        category_score *= 3
                                    elif next_word == 'intermediate':
                                        category_score *= 2
                                    elif next_word == 'beginner':
                                        category_score *= 1
                                    elif next_word == 'developer':
                                        category_score *= 3
                                row_score += category_score
                                print("Matched word:", token)
                            else:
                                row_score += category_score
                                print("Matched word:", token)
                        except ValueError:
                            pass

    return row_score





def ranking(recruiter_id, user_input, user_input_weights):
    collection = db.db["Screened"]  # Assuming "Screened" is the collection name
    # Create or access the "Rankings" collection
    rankings_collection = db.db["Rankings"]

    # Tokenize user input weights
    tokenized_user_input = {
    category: tokenize_user_input(user_input[category], weights)
    for category, weights in user_input_weights.items()
    }
    
    print(tokenized_user_input)

    # Query MongoDB data and process the documents
    rows = []
    for document in collection.find({'recruiter_id': recruiter_id}):
        row_score = process_document(document, tokenized_user_input)
        rows.append({'_id': document['_id'], 'Name': document['Name'], 'Score': row_score, 'recruiter_id': recruiter_id})
        
    # Sort rows by score in descending order
    rows.sort(key=lambda x: x['Score'], reverse=True)

    # Insert the results into the "Rankings" collection
    if rows:
        rankings_collection.delete_many({'recruiter_id': recruiter_id})  # Delete previous entries for this recruiter
        result = rankings_collection.insert_many(rows)
        print("Inserted", len(result.inserted_ids), "documents")

    # Print or save the results as needed
    for row in rows:
        print(row)
