// src/App.js
import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [displayedTranscription, setDisplayedTranscription] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);
  
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const speechSynthRef = useRef(null);
  
  // Typing effect for transcription
  useEffect(() => {
    if (transcription && typingIndex < transcription.length) {
      const typingTimer = setTimeout(() => {
        setDisplayedTranscription(prev => prev + transcription.charAt(typingIndex));
        setTypingIndex(prev => prev + 1);
      }, 30); // Adjust speed as needed
      
      return () => clearTimeout(typingTimer);
    }
  }, [transcription, typingIndex]);
  
  // Reset typing effect when new transcription comes in
  useEffect(() => {
    if (transcription) {
      setDisplayedTranscription('');
      setTypingIndex(0);
    }
  }, [transcription]);
  
  const startRecording = async () => {
    try {
      setError('');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioRef.current = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      setError('Microphone access denied. Please enable microphone permissions.');
      console.error('Error accessing microphone:', err);
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        await processAudio(audioBlob);
        
        // Stop all audio tracks
        audioRef.current.getTracks().forEach(track => track.stop());
      };
    }
  };
  
  const processAudio = async (audioBlob) => {
    setIsLoading(true);
    
    try {
      // Create form data for audio upload
      const formData = new FormData();
      formData.append('audio', audioBlob);
      
      // Send to backend for transcription
      const transcriptionResponse = await fetch('http://localhost:5000/api/transcribe', {
        method: 'POST',
        body: formData
      });
      
      if (!transcriptionResponse.ok) {
        throw new Error('Transcription failed');
      }
      
      const transcriptionData = await transcriptionResponse.json();
      setTranscription(transcriptionData.transcription);
      
      // Now get AI response based on transcription
      const aiResponseResult = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: transcriptionData.transcription })
      });
      
      if (!aiResponseResult.ok) {
        throw new Error('Failed to get AI response');
      }
      
      const aiResponseData = await aiResponseResult.json();
      setAiResponse(aiResponseData.response);
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error('Error processing audio:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const speakResponse = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    
    if (aiResponse) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(aiResponse);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      // Get available voices and select a good one if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Google') || 
        voice.name.includes('Natural') || 
        voice.name.includes('Female')
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  };
  
  return (
    <div className="app-container">
      <div className="app-content">
        <header>
          <h1>VoiceStudy</h1>
        </header>
        
        <main>
          <div className="card">
            <div className="card-header">
              <h2>Ask Your Question</h2>
              <p>Record your voice to get started.</p>
            </div>
            <div className="card-body">
              <div className="button-container">
                <button 
                  className={`btn ${isRecording ? 'btn-stop' : 'btn-primary'}`}
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isLoading && !isRecording}
                >
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>
              </div>
              
              {isRecording && (
                <div className="status-message recording">
                  <div className="recording-indicator">
                    <div className="recording-pulse"></div>
                    Recording in progress...
                  </div>
                </div>
              )}
              
              {isLoading && (
                <div className="status-message loading">
                  <div className="loading-spinner"></div>
                  Processing your request...
                </div>
              )}
              
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h2>Transcription</h2>
            </div>
            <div className="card-body">
              {displayedTranscription ? (
                <div className="typing-text">
                  <p>{displayedTranscription}<span className="cursor">|</span></p>
                </div>
              ) : (
                <p className="placeholder-text">Your transcribed text will appear here...</p>
              )}
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h2>AI Response</h2>
              {aiResponse && (
                <button 
                  className={`speech-button ${isSpeaking ? 'speaking' : ''}`}
                  onClick={speakResponse}
                  aria-label={isSpeaking ? 'Stop speaking' : 'Speak response'}
                >
                  <span className="sr-only">{isSpeaking ? 'Stop speaking' : 'Speak response'}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d={isSpeaking 
                      ? "M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" 
                      : "M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zm4.089 4.49a.75.75 0 00-1.06-1.061 9.748 9.748 0 00-2.924 6.511 9.746 9.746 0 002.924 6.511.75.75 0 001.06-1.06 8.25 8.25 0 01-2.484-5.451c0-2.07.814-4.057 2.484-5.45z"}
                    />
                  </svg>
                </button>
              )}
            </div>
            <div className="card-body">
              {aiResponse ? (
                <p>{aiResponse}</p>
              ) : (
                <p className="placeholder-text">AI response will appear here...</p>
              )}
            </div>
          </div>
        </main>
        
        <footer>
          <p>© 2025 VoiceStudy - Your Educational Voice Assistant</p>
        </footer>
      </div>
    </div>
  );
}

export default App;


