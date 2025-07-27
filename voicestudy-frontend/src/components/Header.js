// src/components/Header.js
import React from 'react';

function Header() {
  return (
    <header className="bg-primary text-white py-3">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="mb-0">VoiceStudy</h1>
          <p className="mb-0">Your Voice-Enabled Educational Assistant</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
