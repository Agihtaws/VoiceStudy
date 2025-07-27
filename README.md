# VoiceStudy

![Project Screenshot](https://github.com/Agihtaws/VoiceStudy/blob/main/voicestudy-frontend/public/Screenshot%202025-07-27%20183814.png)

## 🎓 Educational Voice Assistant with AI-Powered Responses

VoiceStudy is an innovative voice-based educational assistant that transforms how students learn through natural conversation. Simply speak your questions and receive clear, concise explanations from our AI tutor, with both visual and audio responses for enhanced learning.

## 🌟 Live Demo

[Watch the Demo Video on YouTube](https://youtu.be/demo-link)

## ✨ Features

### 🎙️ Voice Interaction
- **Speech-to-Text**: Natural voice recognition with real-time transcription
- **Text-to-Speech**: Listen to AI responses with high-quality voice synthesis
- **Typing Animation**: Engaging visual feedback as your words appear on screen

### 🧠 AI-Powered Education
- **Dual AI Models**: Choose between Mistral AI or Google Gemini
- **Educational Focus**: Responses optimized for learning and explanation
- **Subject Coverage**: Support across various academic disciplines

### 💻 User Experience
- **Clean Interface**: Minimalist design focused on content
- **Visual Feedback**: Clear indicators for recording, processing, and playback
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 🔧 Technical Features
- **Real-time Processing**: Fast transcription and response generation
- **Error Handling**: Graceful management of connection issues
- **Cross-Browser Support**: Works on all modern browsers

## 🛠️ Technologies Used

- **Frontend**: React.js with custom CSS animations
- **Backend**: Python Flask API
- **Speech-to-Text**: AssemblyAI API
- **AI Models**: Mistral AI and Google Gemini
- **Text-to-Speech**: Web Speech API

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- Python (v3.8+)
- AssemblyAI API key
- Mistral AI or Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Agihtaws/VoiceStudy.git
cd VoiceStudy
```

2. Set up the backend:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. Create a `.env` file with your API keys:
```
ASSEMBLYAI_API_KEY=your_assemblyai_key
MISTRAL_API_KEY=your_mistral_key
GEMINI_API_KEY=your_gemini_key
```

4. Start the backend server:
```bash
python server.py
```

5. Set up the frontend:
```bash
cd voicestudy-frontend
npm install
npm start
```

6. Open your browser and navigate to:
```
http://localhost:3000
```

## 🎮 How to Use

- **Start Recording**: Click the "Start Recording" button and ask your question
- **Stop Recording**: Click "Stop Recording" when finished speaking
- **Listen to Response**: Click the speaker icon to hear the AI's explanation
- **Read Response**: View the AI's answer in text format
- **Clear All**: Reset the interface for a new question

## 🧩 Project Structure

```
VoiceStudy/
├── .env                   # Environment variables (API keys)
├── server.py              # Main Flask server
├── config.py              # Configuration settings
├── audio_handler.py       # Audio processing and transcription
├── ai_handler.py          # AI model integration
└── requirements.txt       # Python dependencies
└── voicestudy-frontend/       # React.js frontend
    ├── public/
    │   ├── index.html
    │   ├── favicon.ico
    │   └── manifest.json
    │
    ├── src/
    │   ├── components/        # React components
    │   │   ├── Header.js
    │   │   ├── RecordingSection.js
    │   │   ├── TranscriptionSection.js
    │   │   └── ResponseSection.js
    │   │
    │   ├── App.js            # Main application component
    │   ├── App.css           # Application styles
    │   ├── index.js          # Entry point
    │   └── index.css         # Global styles
    │
    ├── package.json
    └── README.md
```

## 🔮 Future Enhancements

- **User Accounts**: Save conversation history and track learning progress
- **Subject Specialization**: Optimize responses for specific academic fields
- **Voice Customization**: Select different voices for text-to-speech
- **Offline Mode**: Basic functionality without internet connection
- **Multi-language Support**: Expand beyond English for global accessibility
- **Visualization Tools**: Add diagrams and visual aids for complex concepts

## 💡 Use Cases

- **Students**: Get help with homework and exam preparation
- **Self-learners**: Explore new subjects through conversation
- **Teachers**: Demonstrate concepts with AI-assisted explanations
- **Researchers**: Quick access to explanations of complex topics
- **Accessibility**: Learning support for those who prefer audio over reading

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name** - [GitHub Profile](https://github.com/Agihtaws)

## 🙏 Acknowledgements

- [AssemblyAI](https://www.assemblyai.com/) for speech-to-text capabilities
- [Mistral AI](https://mistral.ai/) for AI response generation
- [Google Gemini](https://ai.google/discover/gemini/) for alternative AI model
- The open-source community for inspiration and resources

---

Feel free to reach out with questions, suggestions, or collaboration ideas!
