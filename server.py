from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import tempfile
from audio_handler import AudioHandler
from ai_handler import AIHandler

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize handlers
audio_handler = AudioHandler()
ai_handler = AIHandler()

@app.route('/api/transcribe', methods=['POST'])
def transcribe_audio():
    """Endpoint to transcribe audio from the frontend"""
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400
    
    audio_file = request.files['audio']
    
    # Save the audio file temporarily
    temp_file = tempfile.NamedTemporaryFile(suffix=".wav", delete=False)
    temp_file.close()
    audio_file.save(temp_file.name)
    
    try:
        # Transcribe the audio
        transcription = audio_handler.transcribe_audio(temp_file.name)
        return jsonify({"transcription": transcription})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        # Clean up the temporary file
        if os.path.exists(temp_file.name):
            os.unlink(temp_file.name)

@app.route('/api/generate', methods=['POST'])
def generate_response():
    """Endpoint to generate AI response"""
    data = request.json
    if not data or 'message' not in data:
        return jsonify({"error": "No message provided"}), 400
    
    try:
        # Generate AI response
        response = ai_handler.generate_response(data['message'])
        return jsonify({"response": response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
