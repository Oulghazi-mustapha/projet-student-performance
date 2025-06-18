import React from 'react';
import './PageStyle.css';

function About() {
  return (
    <div className="page-container">
      <h2>About This Project</h2>
      <p>Ce projet vise à prédire la réussite académique des élèves à partir de leurs caractéristiques
personnelles et sociales, à l’aide de modèles de machine learning et d’analyses visuelles
interactives.
2 Objectifs
• Prédire si un élève va réussir ou échouer.
• Visualiser les corrélations entre différents facteurs et les performances.
• Fournir une interface web interactive avec FastAPI et React.
• Intégrer un chatbot pour faciliter la saisie des données..</p>
    </div>
  );
}

export default About;
