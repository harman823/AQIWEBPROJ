// src/App.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PredictionPage from './components/PredictionPage';
import ImprovingCitiesList from './components/ImprovingCitiesList';
import CompareTable from './components/CompareTable';
import CompareChart from './components/CompareChart'; // Import the new chart component

function App() {
  const [comparisonData, setComparisonData] = useState([]);
  const [error, setError] = useState('');

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchComparisonData = async () => {
      try {
        const res = await axios.get('/api/compare');
        setComparisonData(res.data);
      } catch (err) {
        console.error("Failed to fetch comparison data:", err);
        setError('Could not fetch data for comparison. Is the backend server running?');
      }
    };

    fetchComparisonData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-white text-center tracking-tight">
            Air Quality Monitoring Dashboard
          </h1>
          <p className="text-center text-slate-400 mt-2">
            Global AQI Insights & Predictions
          </p>
        </header>

        {error && (
          <div className="bg-red-900/50 text-red-200 p-4 rounded-lg mb-6 text-center">
            <strong>Error:</strong> {error}
          </div>
        )}

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area - 2/3 width */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <PredictionPage />
            <CompareTable data={comparisonData} />
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <CompareChart data={comparisonData} />
            <ImprovingCitiesList />
          </div>
        </main>

        <footer className="text-center mt-12 text-slate-500">
          <p>&copy; 2025 AQI Insights. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;