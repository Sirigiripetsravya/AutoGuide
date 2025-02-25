import string
import spacy
import nltk
import joblib
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

# Download necessary NLTK resources
nltk.download('punkt')
nltk.download('stopwords')

# Load spaCy model
nlp = spacy.load('en_core_web_sm')

# Load the trained model and vectorizer
model = joblib.load('model.pkl')
vectorizer = joblib.load('tfidf_vectorizer.pkl')

def preprocess_text(text):
    """
    Preprocesses input text by converting to lowercase, removing punctuation, 
    tokenizing, removing stopwords, and performing lemmatization.
    """
    if not isinstance(text, str):
        return ""
    
    text = text.lower()
    text = text.translate(str.maketrans('', '', string.punctuation))
    tokens = word_tokenize(text)
    stop_words = set(stopwords.words('english'))
    tokens = [word for word in tokens if word not in stop_words]
    tokens = [nlp(word)[0].lemma_ for word in tokens]

    return ' '.join(tokens)

def predict_query(user_input):
    """
    Predicts the response category for a given user input.
    """
    processed_input = preprocess_text(user_input)
    input_vectorized = vectorizer.transform([processed_input])
    prediction = model.predict(input_vectorized)[0]
    return prediction
