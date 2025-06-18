import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="menu-container">
      <h1 className="menu-title">🎓 Student Performance Analyzer</h1>
      <div className="menu-buttons">
        <Link to="/about" className="menu-button">ℹ️ About This Project</Link>
        <Link to="/help" className="menu-button">❓ Help & Instructions</Link>
      </div>
    </div>
  );
}

export default Home;
