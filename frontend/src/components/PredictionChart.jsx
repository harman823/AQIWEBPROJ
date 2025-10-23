// src/components/PredictionChart.jsx
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
// NOTE: Removed 'import * as api from '../apiService.js';'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import 'chartjs-adapter-date-fns'; // Import the date adapter


// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  TimeScale, // Register TimeScale
  Tooltip,
  Legend,
  Filler
);

// A list of cities for the dropdown
const CITIES = ['New York', 'London', 'Tokyo', 'Paris', 'Beijing', 'Delhi', 'Mumbai']; // Added Mumbai

// --- Define Backend URL ---
// Make sure this matches where your backend is running
const API_BASE_URL = 'http://localhost:5000/api'; // Or your deployed backend URL

// Consistent chart styling options (same as HistoryChart for consistency)
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows chart to fill container height
    plugins: {
      legend: {
          position: 'top', // Position legend at the top
          labels: {
              color: "#6b7280", // Gray color for labels (Tailwind gray-500)
              padding: 15, // Add padding to legend items
          }
       },
       tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker tooltip background
          titleColor: '#ffffff', // White title color
          bodyColor: '#ffffff', // White body color
          callbacks: {
              // Format tooltip label
              label: (context) => `${context.dataset.label || ''}: ${context.parsed.y !== null ? Math.round(context.parsed.y) : 'N/A'}`,
            },
       }
    },
    scales: {
      x: {
        type: "time", // Specify x-axis is time-based
        time: {
          unit: 'day', // Display units in days
          tooltipFormat: 'MMM d, yyyy', // Format for tooltips
          displayFormats: {
             day: 'MMM d' // Format for axis labels (e.g., Oct 26)
          }
        },
        grid: {
          color: "#e5e7eb", // Lighter grid lines (Tailwind gray-200)
        },
        ticks: {
          color: "#9ca3af", // Medium gray ticks (Tailwind gray-400)
          maxRotation: 0, // Prevent label rotation
          autoSkip: true, // Automatically skip labels to prevent overlap
          maxTicksLimit: 7 // Show max 7 days
        },
         title: {
           display: true,
           text: 'Date',
           color: '#6b7280'
         }
      },
      y: {
        grid: {
          color: "#e5e7eb", // Lighter grid lines
        },
        ticks: {
          color: "#9ca3af", // Medium gray ticks
          stepSize: 50, // Adjust step size based on expected AQI range
        },
        beginAtZero: true, // Start y-axis at 0
        suggestedMax: 250, // Suggest a max value, chartjs will adjust if needed
        title: {
          display: true,
          text: 'Predicted AQI Value',
          color: '#6b7280'
        }
      },
    },
    elements: {
      line: {
        tension: 0.1, // Slight curve to the line
        borderColor: "#10B981", // Emerald-500 border
        borderWidth: 2, // Thinner line
        fill: true, // Fill area under the line
        backgroundColor: "rgba(16, 185, 129, 0.1)", // Light emerald fill
      },
      point: {
        radius: 3, // Show small points
        hoverRadius: 6, // Larger points on hover
        backgroundColor: "#10B981", // Emerald point color
      }
    },
    interaction: {
        mode: 'index', // Show tooltips for all datasets at the same x-index
        intersect: false, // Tooltip will show even if not directly hovering over point/line
    },
  };

// Helper function to handle fetch responses (moved from apiService.js)
async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      // Try to parse error message from backend
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch (e) {
      // If response isn't JSON or has no message, use the status text
      errorMessage = `${response.status} ${response.statusText || 'Error'}`;
    }
    throw new Error(errorMessage);
  }
  // Check for empty response before parsing JSON
  const text = await response.text();
  return text ? JSON.parse(text) : {}; // Return empty object for empty response
}


export default function PredictionChart() {
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchForecast() {
      // Abort previous fetch if a new city is selected quickly
      const controller = new AbortController();
      const signal = controller.signal;

      try {
        setIsLoading(true);
        setError(null); // Clear previous errors

        // --- Direct Fetch Call ---
        const response = await fetch(`${API_BASE_URL}/forecast`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ city: selectedCity, days: 7 }), // Request 7-day forecast
          signal: signal // Pass the abort signal
        });

        const data = await handleResponse(response); // Use the helper
        // --- End Direct Fetch Call ---


        if (!data.predictions || data.predictions.length === 0) {
           // Set error state if predictions are missing or empty
           setError(`No prediction data returned for ${selectedCity}.`);
           setChartData({ labels: [], datasets: [] }); // Clear chart
        } else {
            // Process data for Chart.js
            const labels = data.predictions.map(p => new Date(p.date)); // Use Date objects for time scale
            const aqiValues = data.predictions.map(p => (p.predicted_aqi !== null && p.predicted_aqi !== undefined ? p.predicted_aqi : NaN)); // Handle nulls

            setChartData({
            labels: labels,
            datasets: [
                {
                label: `Predicted AQI for ${selectedCity}`,
                data: aqiValues,
                // Styling is now handled by chartOptions.elements
                },
                // Potential future: Confidence bands could be added here if API provides them
                // {
                //   label: 'Lower Confidence', data: lowerBandValues, fill: '+1', ...
                // },
                // {
                //   label: 'Upper Confidence', data: upperBandValues, fill: '-1', ...
                // }
            ],
            });
        }
      } catch (err) {
         if (err.name === 'AbortError') {
             console.log('Fetch aborted'); // Ignore abort errors
         } else {
            setError(err.message || 'Failed to fetch forecast'); // Set error message
            console.error(`Failed to fetch forecast for ${selectedCity}:`, err);
            setChartData({ labels: [], datasets: [] }); // Clear chart on error
         }
      } finally {
        setIsLoading(false);
      }

      // Cleanup function to abort fetch if component unmounts or city changes
      return () => {
        controller.abort();
      };
    }

    fetchForecast();
  }, [selectedCity]); // Re-run this effect when selectedCity changes

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4"> {/* Adjusted spacing and layout */}
        <h3 className="text-xl md:text-2xl font-bold text-emerald-800 whitespace-nowrap">
          7-Day Forecast: <span className="text-emerald-600">{selectedCity}</span>
        </h3>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <label htmlFor="city-selector" className="text-sm text-gray-600">City:</label> {/* Added label */}
          <select
            id="city-selector"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-full sm:w-auto" // Adjusted styling
            disabled={isLoading} // Disable while loading
          >
            {CITIES.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart container */}
      <div className="relative h-72 md:h-80"> {/* Defined height */}
        {/* Loading State */}
        {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
                <p className="text-gray-500 text-sm">Loading forecast...</p>
                 {/* Optional: Add a spinner icon here */}
            </div>
        )}
        {/* Error State */}
        {error && !isLoading && (
             <div className="absolute inset-0 flex items-center justify-center">
                 <p className="text-center text-red-600 text-sm px-4">Error: {error}</p>
             </div>
        )}
        {/* No Data State (after loading, no error, but no predictions) */}
        {!isLoading && !error && (!chartData.datasets[0] || chartData.datasets[0].data.length === 0) && (
            <div className="absolute inset-0 flex items-center justify-center">
                 <p className="text-center text-gray-500 text-sm">No prediction data available for {selectedCity}.</p>
             </div>
        )}
        {/* Chart Render (only if not loading, no error, and data exists) */}
        {!isLoading && !error && chartData.datasets[0] && chartData.datasets[0].data.length > 0 && (
          <Line options={chartOptions} data={chartData} />
        )}
      </div>
    </>
  );
}