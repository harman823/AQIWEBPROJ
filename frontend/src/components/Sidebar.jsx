// src/components/Sidebar.jsx
import { useState, useEffect } from 'react';

// Define Backend URL
const API_BASE_URL = 'https://aqiwebproj.onrender.com/api'; // Ensure '/api' is here// Helper function to handle fetch responses
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
   // Check for empty response before parsing JSON
   const text = await response.text();
   return text ? JSON.parse(text) : {}; // Return empty object for empty response
}

// Function to fetch top 5 (moved from apiService)
async function getTop5Compare() {
  const response = await fetch(`${API_BASE_URL}/compare`);
  return handleResponse(response);
}

// Function to fetch improving cities (moved from apiService)
async function getImprovingCities() {
    const response = await fetch(`${API_BASE_URL}/analytics/improving`);
    return handleResponse(response);
}

// Helper function to get text color class based on AQI (simplified)
function getAqiTextColorClass(aqi) {
    if (aqi === null || aqi === undefined) return "text-gray-500";
    if (aqi <= 50) return "text-green-500";
    if (aqi <= 100) return "text-yellow-500";
    if (aqi <= 150) return "text-orange-500";
    if (aqi <= 200) return "text-red-500";
    if (aqi <= 300) return "text-purple-600";
    return "text-purple-900";
  }


// Reusable list component for the sidebar
function CityList({ title, data, isLoading, error, renderItem, emptyMessage = "No data available." }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6"> {/* Card styling */}
      <h2 className="text-lg font-bold text-emerald-800 mb-3 border-b border-gray-200 pb-2">{title}</h2> {/* Title styling */}
      {isLoading && <p className="text-sm text-gray-500">Loading...</p>}
      {error && <p className="text-sm text-red-500">Error: {error}</p>}
      {!isLoading && !error && data.length === 0 && (
        <p className="text-sm text-gray-500">{emptyMessage}</p>
      )}
      {!isLoading && !error && data.length > 0 && (
        <ul className="space-y-2"> {/* List styling */}
          {data.map(renderItem)}
        </ul>
      )}
    </div>
  );
}

export default function Sidebar() {
  const [top5, setTop5] = useState([]);
  const [improving, setImproving] = useState([]);
  const [loadingTop5, setLoadingTop5] = useState(true);
  const [loadingImproving, setLoadingImproving] = useState(true);
  const [errorTop5, setErrorTop5] = useState(null);
  const [errorImproving, setErrorImproving] = useState(null);

  useEffect(() => {
    // Load top 5 polluted cities
    async function fetchTop5() {
      setLoadingTop5(true);
      setErrorTop5(null);
      try {
        const data = await getTop5Compare();
        setTop5(Array.isArray(data) ? data : []); // Ensure data is an array
      } catch (err) {
        console.error("Error fetching top 5 cities:", err);
        setErrorTop5(err.message);
        setTop5([]); // Clear data on error
      } finally {
        setLoadingTop5(false);
      }
    }

    // Load improving cities
    async function fetchImproving() {
      setLoadingImproving(true);
      setErrorImproving(null);
      try {
        const data = await getImprovingCities();
        // Access the nested array
        setImproving(data && Array.isArray(data.improving_cities) ? data.improving_cities : []);
      } catch (err) {
        console.error("Error fetching improving cities:", err);
        setErrorImproving(err.message);
        setImproving([]); // Clear data on error
      } finally {
        setLoadingImproving(false);
      }
    }

    fetchTop5();
    fetchImproving();
  }, []); // Run only once on mount

  return (
    <aside className="w-full md:w-64 lg:w-72 shrink-0"> {/* Correction: shrink-0 */}
      <CityList
        title="Top 5 Most Polluted"
        data={top5}
        isLoading={loadingTop5}
        error={errorTop5}
        emptyMessage="Could not load top cities data."
        renderItem={(city) => {
           const aqi = city.aqi !== null && city.aqi !== undefined ? Math.round(city.aqi) : null;
           const colorClass = getAqiTextColorClass(aqi);
           return (
              <li key={city.city} className="flex justify-between items-center text-sm py-1"> {/* List item styling */}
                <span className="text-gray-700">{city.city || 'Unknown'}</span>
                <span className={`font-semibold ${colorClass}`}>
                  {aqi !== null ? aqi : 'N/A'}
                </span>
              </li>
            );
        }}
      />
      <CityList
        title="Improving Cities"
        data={improving}
        isLoading={loadingImproving}
        error={errorImproving}
        emptyMessage="No cities currently show an improving trend."
        renderItem={(city) => (
          <li key={city.city} className="flex justify-between items-center text-sm py-1"> {/* List item styling */}
            <span className="text-gray-700">{city.city || 'Unknown'}</span>
            {/* Optionally display slope or number of points */}
            <span className="text-xs text-green-600">Improving</span>
             {/* <span className="text-xs text-gray-400">({city.n_points} points)</span> */}
          </li>
        )}
      />
       {/* You can add more sidebar components here */}
       {/* Example: <Admin /> */}
    </aside>
  );
}