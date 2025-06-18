// src/components/Chatbot.jsx
import React, { useState } from 'react';
import './chatbot.css';

function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Bonjour ! Je suis votre assistant. Donnez-moi vos infos pour prédire votre réussite !", from: "bot" }
  ]);
  const [input, setInput] = useState("");

  const [studentData, setStudentData] = useState({
    gender: '',
    race_ethnicity: '',
    parental_level_of_education: '',
    lunch: '',
    test_preparation_course: '',
    math_score: '',
    reading_score: '',
    writing_score: ''
  });

  const keys = Object.keys(studentData);
  const currentKey = keys.find((key) => studentData[key] === '');

  const prompts = {
    gender: "Quel est votre genre (male/female) ?",
    race_ethnicity: "Quelle est votre ethnie (group A, B, C, D ou E) ?",
    parental_level_of_education: "Niveau d’éducation des parents ?",
    lunch: "Type de repas (standard/free/reduced) ?",
    test_preparation_course: "Cours de préparation (none/completed) ?",
    math_score: "Score en mathématiques ?",
    reading_score: "Score en lecture ?",
    writing_score: "Score en écriture ?"
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, from: "user" }];
    const updatedData = { ...studentData };

    updatedData[currentKey] = input;
    setStudentData(updatedData);
    setMessages(newMessages);

    setInput("");

    const nextKey = keys.find((key) => updatedData[key] === '');

    if (nextKey) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { text: prompts[nextKey], from: "bot" }]);
      }, 600);
    } else {
      try {
        const res = await fetch("http://localhost:8000/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData)
        });
        const result = await res.json();
        setMessages((prev) => [...prev, {
          text: `Résultat : ${result.message} (probabilité : ${(result.probability * 100).toFixed(1)}%)`,
          from: "bot"
        }]);
      } catch (err) {
        setMessages((prev) => [...prev, { text: "Erreur pendant la prédiction", from: "bot" }]);
      }
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbox">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.from}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Écrivez votre réponse ici..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Envoyer</button>
      </div>
    </div>
  );
}

export default Chatbot;
