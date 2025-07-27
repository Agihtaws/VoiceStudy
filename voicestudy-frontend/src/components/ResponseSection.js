// src/components/ResponseSection.js
import React from 'react';

function ResponseSection({ aiResponse, isLoading }) {
  return (
    <section className="response-section card mb-4">
      <div className="card-body">
        <h2 className="card-title">AI Response</h2>
        {isLoading ? (
          <div className="d-flex justify-content-center my-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : aiResponse ? (
          <div className="response-content p-3 border rounded bg-light">
            <p className="mb-0">{aiResponse}</p>
          </div>
        ) : (
          <p className="text-muted">AI response will appear here...</p>
        )}
      </div>
    </section>
  );
}

export default ResponseSection;
