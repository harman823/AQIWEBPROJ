import React, { useState } from 'react';
import axios from 'axios';
import CitySearch from './components/CitySearch';
import CompareTable from './components/CompareTable';
import ImprovingCities from './components/ImprovingCities';
import AQIChart from './components/AQIChart';
import PredictionPage from './components/PredictionPage';
import AwarenessPage from './components/AwarenessPage';

export default function App() {
  const [chartData, setChartData] = useState([]);
  const [chartCity, setChartCity] = useState('');
  const [isLoadingChart, setIsLoadingChart] = useState(false);

  /**
   * A centralized function to fetch historical data for a given city.
   * This function is passed down to child components that need to trigger a chart update.
   * @param {string} city - The name of the city to fetch data for.
   */
  const loadCityHistory = async (city) => {
    if (!city) return;
    
    setIsLoadingChart(true);
    setChartCity(city); // Set city name immediately for better UX
    setChartData([]); // Clear previous data

    try {
      const res = await axios.get(`/api/city/${city}/history`);
      setChartData(res.data);
    } catch (error) {
      console.error("Failed to fetch city history:", error);
      setChartData([]); // Ensure data is cleared on error
    } finally {
      setIsLoadingChart(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
          AQIWEB<span className="text-primary-400"></span>
        </h1>
        <p className="text-lg text-slate-400">Global Air Quality Intelligence Dashboard</p>
      </header>

      <main className="max-w-7xl mx-auto space-y-12">
        {/* The CitySearch component calls loadCityHistory when a search is performed */}
        <CitySearch onDataLoaded={loadCityHistory} />

        {/* The AQIChart component displays the data fetched by the App */}
        <AQIChart data={chartData} city={chartCity} isLoading={isLoadingChart} />

        {/* The Prediction component is self-contained */}
        <PredictionPage />
        
        {/* Analysis Section with two columns */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* The ImprovingCities component calls loadCityHistory when a city is clicked */}
          <ImprovingCities onCityClick={loadCityHistory} />
          
          {/* The CompareTable component is self-contained */}
          <CompareTable />
        </div>

        {/* The Awareness component is static */}
        <AwarenessPage />
      </main>

      <footer className="text-center mt-16 py-6 border-t border-slate-700 text-slate-500">
        <p>AQI Prediction Project | Data for demonstration purposes only.</p>
      </footer>
    </div>
  );
}

