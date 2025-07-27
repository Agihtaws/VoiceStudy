// src/components/RecordingSection.js
import React from 'react';
import { FaMicrophone, FaStop, FaUpload } from 'react-icons/fa';

function RecordingSection({ isRecording, startRecording, stopRecording, handleFileUpload, isLoading }) {
  return (
    <section className="recording-section card mb-4">
      <div className="card-body">
        <h2 className="card-title">Ask Your Question</h2>
        <p className="card-text">Record your voice or upload an audio file to get started.</p>
        
        <div className="d-flex justify-content-center gap-3 mt-4">
          {!isRecording ? (
            <button 
              className="btn btn-primary btn-lg record-btn"
              onClick={startRecording}
              disabled={isLoading}
            >
              <FaMicrophone className="me-2" />
              Start Recording
            </button>
          ) : (
            <button 
              className="btn btn-danger btn-lg stop-btn"
              onClick={stopRecording}
            >
              <FaStop className="me-2" />
              Stop Recording
            </button>
          )}
          
          <div className="upload-container">
            <input
              type="file"
              id="audio-upload"
              accept="audio/*"
              onChange={handleFileUpload}
              disabled={isLoading || isRecording}
              className="d-none"
            />
            <label 
              htmlFor="audio-upload" 
              className={`btn btn-outline-primary btn-lg ${(isLoading || isRecording) ? 'disabled' : ''}`}
            >
              <FaUpload className="me-2" />
              Upload Audio
            </label>
          </div>
        </div>
        
        {isRecording && (
          <div className="text-center mt-3">
            <div className="recording-indicator">
              <span className="recording-dot"></span> Recording in progress...
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default RecordingSection;
