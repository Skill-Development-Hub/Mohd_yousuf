import os
import json
import datetime
import csv
import nltk
import ssl
import random
import argparse
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# SSL certificate verification
ssl._create_default_https_context = ssl._create_unverified_context

# Set up NLTK data path
nltk.data.path.append(os.path.abspath("nltk_data"))
nltk.download('punkt')

# Load intents from the JSON file
file_path = os.path.abspath("./intents.json")
with open(file_path, "r") as file:
    intents = json.load(file)

# Create the vectorizer and classifier
vectorizer = TfidfVectorizer(ngram_range=(1, 4))
clf = LogisticRegression(random_state=0, max_iter=10000)

# Preprocess the data
tags = []
patterns = []
for intent in intents:
    for pattern in intent['patterns']:
        tags.append(intent['tag'])
        patterns.append(pattern)

# Training the model
x = vectorizer.fit_transform(patterns)
y = tags
clf.fit(x, y)

def chatbot(input_text):
    input_text = vectorizer.transform([input_text])
    tag = clf.predict(input_text)[0]
    for intent in intents:
        if intent['tag'] == tag:
            response = random.choice(intent['responses'])
            return response

def setup_argparse():
    parser = argparse.ArgumentParser(description='Chatbot')
    parser.add_argument('--message', type=str, required=True, help='User message')
    return parser.parse_args()

def main():
    args = setup_argparse()
    
    # Process the message and get response
    response = chatbot(args.message)
    
    # Print response (will be captured by Node.js)
    print(response)

    # Log the conversation (optional)
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_conversation(args.message, response, timestamp)

def log_conversation(user_input, bot_response, timestamp):
    log_file = 'chat_log.csv'
    
    # Check if the log file exists, if not create it with headers
    if not os.path.exists(log_file):
        with open(log_file, 'w', newline='', encoding='utf-8') as csvfile:
            csv_writer = csv.writer(csvfile)
            csv_writer.writerow(['User Input', 'Chatbot Response', 'Timestamp'])

    # Append the conversation to the log file
    with open(log_file, 'a', newline='', encoding='utf-8') as csvfile:
        csv_writer = csv.writer(csvfile)
        csv_writer.writerow([user_input, bot_response, timestamp])

if __name__ == '__main__':
    main()