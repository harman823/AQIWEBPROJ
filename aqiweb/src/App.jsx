import React, { useState } from 'react';
import CitySearch from './components/CitySearch';
import CompareTable from './components/CompareTable';
import ImprovingCities from './components/ImprovingCities';
import AQIChart from './components/AQIChart'; // Import the new chart component

export default function App() {
  const [chartData, setChartData] = useState([]);
  const [chartCity, setChartCity] = useState('');

  // This function will be called by CitySearch with the fetched data
  const handleDataLoaded = (data, city) => {
    setChartData(data);
    setChartCity(city);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">
          Air Quality Monitoring Dashboard
        </h1>
        <p className="text-gray-600">Track and analyze AQI trends across cities</p>
      </header>

      <div className="max-w-5xl mx-auto space-y-10">
        {/* Pass the handler function to CitySearch */}
        <CitySearch onDataLoaded={handleDataLoaded} />
        
        {/* Pass the loaded data to the AQIChart */}
        <AQIChart data={chartData} city={chartCity} />

        <CompareTable />
        <ImprovingCities />
      </div>
    </div>
  );
}