import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import './Visualize.css';

function Visualize() {
  const [options, setOptions] = useState({
    x_axis: 'parental level of education',
    y_axis: 'math score',
    chart_type: 'bar'
  });

  const [plotData, setPlotData] = useState(null);
  const [loading, setLoading] = useState(false);

  const columnOptions = [
    "gender",
    "race/ethnicity",
    "parental level of education",
    "lunch",
    "test preparation course",
    "math score",
    "reading score",
    "writing score"
  ];

  const fetchVisualization = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/visualize', options);
      setPlotData(response.data);
    } catch (error) {
      console.error('Visualization error:', error);
      alert('Error generating visualization');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="visualization-container">
      <h2>Data Visualization</h2>
      
      <div className="controls">
        <div className="control-group">
          <label>X Axis:</label>
          <select 
            value={options.x_axis} 
            onChange={function(e) { setOptions({...options, x_axis: e.target.value}) }}
          >
            {columnOptions.map(function(option) {
              return <option key={option} value={option}>{option}</option>;
            })}
          </select>
        </div>
        
        <div className="control-group">
          <label>Y Axis:</label>
          <select 
            value={options.y_axis} 
            onChange={function(e) { setOptions({...options, y_axis: e.target.value}) }}
          >
            {columnOptions
              .filter(function(opt) {
                return ['math score', 'reading score', 'writing score'].includes(opt);
              })
              .map(function(option) {
                return <option key={option} value={option}>{option}</option>;
              })}
          </select>
        </div>
        
        <div className="control-group">
          <label>Chart Type:</label>
          <select 
            value={options.chart_type} 
            onChange={function(e) { setOptions({...options, chart_type: e.target.value}) }}
          >
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
            <option value="scatter">Scatter Plot</option>
          </select>
        </div>
        
        <button onClick={fetchVisualization} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Visualization'}
        </button>
      </div>
      
      {plotData && (
        <div className="plot-container">
          <Plot
            data={[{
              x: plotData.x,
              y: plotData.y,
              type: plotData.type,
              marker: {color: '#3f51b5'},
            }]}
            layout={{
              width: 800, 
              height: 500, 
              title: options.y_axis + " by " + options.x_axis,
              xaxis: {title: options.x_axis},
              yaxis: {title: options.y_axis}
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Visualize;
