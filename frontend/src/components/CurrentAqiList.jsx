// src/components/CurrentAqiList.jsx
import { useState, useEffect } from 'react';
import * as api from '../apiService.js';
import feather from 'feather-icons';

// Helper function to get the right CSS utility classes for the AQI status
function getAqiStatusClass(status) {
  switch (status) {
    case 'Good': return 'bg-green-500 text-white';
    case 'Moderate': return 'bg-yellow-400 text-white';
    case 'Unhealthy for Sensitive Groups': return 'bg-orange-500 text-white';
    case 'Unhealthy': return 'bg-red-500 text-white';
    case 'Very Unhealthy': return 'bg-purple-500 text-white';
    default: return 'bg-purple-800 text-white';
  }
}

// Helper function to get the AQI category from a value
function getAqiCategory(aqi) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive Groups";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
}

export default function CurrentAqiList() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await api.getTop5Compare();
        setCities(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      feather.replace();
    }
  }, [isLoading, cities]);

  if (isLoading) {
    return <p className="text-lg text-gray-600 col-span-full text-center">Loading city data...</p>;
  }

  if (error) {
    return <p className="text-lg text-red-500 col-span-full text-center">Error: {error}</p>;
  }

  return (
    <>
      {cities.map(city => {
        const aqi = Math.round(city.aqi);
        const status = getAqiCategory(aqi);
        const statusClass = getAqiStatusClass(status); // This now returns 'bg-green-500 text-white' etc.

        return (
          // The hover effects from .aqi-card are now inline
          <div 
            key={city.city} 
            className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{city.city}</h3>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-4xl font-bold text-gray-800 mb-1">{aqi}</div>
                  <div className="text-gray-600">Air Quality Index</div>
                </div>
                <div className="text-right">
                  <div className={`inline-block px-3 py-1 rounded-full font-medium ${statusClass}`}>
                    {status}
                  </div>
                </div>
              </div>
            </div>
            {/* The bottom-colored border */}
            <div className={`${statusClass} h-2`}></div>
          </div>
        );
      })}
    </>
  );
}