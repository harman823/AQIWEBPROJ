// src/components/CurrentAqiList.jsx
import { useState, useEffect } from 'react';
import feather from 'feather-icons';

// Define Backend URL
const API_BASE_URL = 'https://aqiwebproj.onrender.com/api'; // Ensure '/api' is here
// Helper function to handle fetch responses
async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch (e) {
      // Ignore if response is not JSON
    }
    throw new Error(errorMessage);
  }
  return response.json();
}

// Function to fetch top 5 (moved from apiService)
async function getTop5Compare() {
  const response = await fetch(`${API_BASE_URL}/compare`);
  return handleResponse(response);
}


// Helper function to get the right CSS utility classes for the AQI status background/border
function getAqiStatusBgClass(status) {
  switch (status) {
    case 'Good': return 'bg-green-500';
    case 'Moderate': return 'bg-yellow-400';
    case 'Unhealthy for Sensitive Groups': return 'bg-orange-500';
    case 'Unhealthy': return 'bg-red-500';
    case 'Very Unhealthy': return 'bg-purple-600'; // Adjusted purple shade
    case 'Hazardous': return 'bg-purple-900'; // Adjusted purple shade
    default: return 'bg-gray-400'; // Default fallback
  }
}

// Helper function to get the right CSS utility classes for the AQI status text/badge
function getAqiStatusBadgeClass(status) {
    switch (status) {
      case 'Good': return 'bg-green-500 text-white';
      case 'Moderate': return 'bg-yellow-400 text-white'; // Keep text white for better contrast
      case 'Unhealthy for Sensitive Groups': return 'bg-orange-500 text-white';
      case 'Unhealthy': return 'bg-red-500 text-white';
      case 'Very Unhealthy': return 'bg-purple-600 text-white'; // Adjusted purple shade
      case 'Hazardous': return 'bg-purple-900 text-white'; // Adjusted purple shade
      default: return 'bg-gray-400 text-white'; // Default fallback
    }
  }


// Helper function to get the AQI category from a value
function getAqiCategory(aqi) {
  if (aqi === null || aqi === undefined) return "N/A";
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
        setError(null);
        // Use the direct function call
        const data = await getTop5Compare();
        setCities(data);
      } catch (err) {
        console.error("Failed to fetch top 5 cities:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Only run feather replace after loading and if there are cities
    if (!isLoading && cities.length > 0) {
      feather.replace();
    }
  }, [isLoading, cities]); // Rerun when loading state or cities change

  if (isLoading) {
    return <p className="text-lg text-gray-600 col-span-full text-center py-8">Loading city data...</p>;
  }

  if (error) {
    return <p className="text-lg text-red-500 col-span-full text-center py-8">Error fetching data: {error}</p>;
  }

  if (!cities || cities.length === 0) {
      return <p className="text-lg text-gray-500 col-span-full text-center py-8">No city data available.</p>
  }

  return (
    <>
      {cities.map(city => {
        // Ensure aqi is a number before rounding, default to null if not
        const aqi = typeof city.aqi === 'number' ? Math.round(city.aqi) : null;
        const status = getAqiCategory(aqi);
        const statusBgClass = getAqiStatusBgClass(status); // For bottom border
        const statusBadgeClass = getAqiStatusBadgeClass(status); // For badge

        return (
          <div
            key={city.city}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl" // Slightly reduced hover shadow
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{city.city || 'Unknown City'}</h3>
                {/* Optional: Add an icon or flag here */}
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-4xl font-bold text-gray-800 mb-1">{aqi !== null ? aqi : 'N/A'}</div>
                  <div className="text-sm text-gray-500">Air Quality Index</div> {/* Smaller text */}
                </div>
                <div className="text-right">
                   {/* Badge uses badge-specific classes */}
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeClass}`}>
                    {status}
                  </div>
                </div>
              </div>
            </div>
            {/* The bottom-colored border uses background class */}
            <div className={`h-1.5 ${statusBgClass}`}></div> {/* Thinner border */}
          </div>
        );
      })}
    </>
  );
}