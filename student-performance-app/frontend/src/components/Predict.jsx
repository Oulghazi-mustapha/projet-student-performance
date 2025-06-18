import React, { useState } from 'react';
import axios from 'axios';
import './Predict.css';

function Predict() {
  const [formData, setFormData] = useState({
    gender: 'female',
    race_ethnicity: 'group B',
    parental_level_of_education: "bachelor's degree",
    lunch: 'standard',
    test_preparation_course: 'none',
    math_score: 70,
    reading_score: 80,
    writing_score: 75
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.endsWith('_score') ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/predict', formData);
      setPrediction(response.data);
    } catch (error) {
      console.error('Prediction error:', error);
      alert('Error making prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="predict-container">
      <h2>Exam Success Prediction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label>Race/Ethnicity:</label>
          <select name="race_ethnicity" value={formData.race_ethnicity} onChange={handleChange}>
            {['group A', 'group B', 'group C', 'group D', 'group E'].map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>

        {/* Add similar form groups for other fields */}

        <button type="submit" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict Exam Success'}
        </button>
      </form>

      {prediction && (
        <div className={`prediction-result ${prediction.prediction ? 'success' : 'failure'}`}>
          <h3>Prediction: {prediction.message}</h3>
          <p>Probability: {(prediction.probability * 100).toFixed(1)}%</p>
        </div>
      )}
    </div>
  );
}

export default Predict;