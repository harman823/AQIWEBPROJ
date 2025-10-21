// src/components/CompareChart.jsx

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Function to determine bar color based on AQI value
const getAqiColor = (aqi) => {
  if (aqi <= 50) return '#4ade80'; // Green
  if (aqi <= 100) return '#facc15'; // Yellow
  if (aqi <= 150) return '#fb923c'; // Orange
  if (aqi <= 200) return '#f87171'; // Red
  if (aqi <= 300) return '#c084fc'; // Purple
  return '#8b5cf6'; // Darker Purple
};

const CompareChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="card bg-slate-800 p-4 rounded-xl shadow-lg h-80 flex items-center justify-center">
        <p className="text-slate-400">Loading comparison chart data...</p>
      </div>
    );
  }

  return (
    <div className="card bg-slate-800 p-6 rounded-xl shadow-lg">
       <h2 className="text-xl font-bold mb-4 text-white">Most Polluted Cities</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="city" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} 
            cursor={{fill: '#334155'}}
          />
          <Legend />
          <Bar dataKey="aqi" name="Current AQI">
            {data.map((entry, index) => (
              <cell key={`cell-${index}`} fill={getAqiColor(entry.aqi)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompareChart;