// src/components/TranscriptionSection.js
import React from 'react';

function TranscriptionSection({ transcription, isLoading }) {
  return (
    <section className="transcription-section card mb-4">
      <div className="card-body">
        <h2 className="card-title">Transcription</h2>
        {isLoading ? (
          <div className="d-flex justify-content-center my-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : transcription ? (
          <div className="transcription-content p-3 border rounded bg-light">
            <p className="mb-0">{transcription}</p>
          </div>
        ) : (
          <p className="text-muted">Your transcribed text will appear here...</p>
        )}
      </div>
    </section>
  );
}

export default TranscriptionSection;
