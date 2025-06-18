import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

import Home from './components/Home';
import Predict from './components/Predict';
import Visualize from './components/Visualize';
import About from './components/About';
import Help from './components/Help';
import Chatbot from './components/Chatbot'; // ✅ Import du chatbot

import './App.css';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/predict" className="nav-link">Predict</NavLink>
        <NavLink to="/visualize" className="nav-link">Visualize</NavLink>
        <NavLink to="/chatbot" className="nav-link">Chatbot</NavLink> {/* ✅ Lien vers le chatbot */}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/visualize" element={<Visualize />} />
        <Route path="/chatbot" element={<Chatbot />} /> {/* ✅ Route du chatbot */}
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </Router>
  );
}

export default App;
