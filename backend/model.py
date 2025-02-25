import joblib

# Save the trained model
joblib.dump(model, 'model.pkl')

# Save the TF-IDF vectorizer
joblib.dump(vectorizer, 'tfidf_vectorizer.pkl')

print("Model and vectorizer saved successfully!")
# Load the trained model and vectorizer
loaded_model = joblib.load('model.pkl')
loaded_vectorizer = joblib.load('tfidf_vectorizer.pkl')

def predict_query(user_input):
    # Preprocess the input text
    processed_input = preprocess_text(user_input)
    
    # Transform using the TF-IDF vectorizer
    input_vectorized = loaded_vectorizer.transform([processed_input])
    
    # Predict the response category
    prediction = loaded_model.predict(input_vectorized)[0]
    
    return prediction

# Example usage
query = "How can I reset my password?"
print("Predicted Category:", predict_query(query))
