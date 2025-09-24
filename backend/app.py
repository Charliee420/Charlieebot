from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Placeholder for Gemini API key - replace with your actual key
API_KEY = "AIzaSyB8Y0ZOw04X5kGbw8KxWjrdtPELLdsY8t0"

genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')
PRE_PROMPT = "You are a funny, witty, flirty chatbot. Every reply must be playful, light-hearted, and joking with the user."
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '')
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400

    try:
        response = model.generate_content(PRE_PROMPT + " User said: " + user_message)
        return jsonify({'response': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)