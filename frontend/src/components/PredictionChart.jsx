// src/components/PredictionChart.jsx
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import * as api from '../apiService.js';
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

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  Filler
);

// A list of cities for the dropdown
const CITIES = ['New York', 'London', 'Tokyo', 'Paris', 'Beijing', 'Delhi', 'Mumbai'];

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' },
    tooltip: {
      callbacks: {
        label: (context) => `${context.dataset.label}: ${context.parsed.y}`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      min: 0,
      title: { display: true, text: 'AQI Value' },
      ticks: { stepSize: 25 },
    },
    x: {
      title: { display: true, text: 'Date' },
    },
  },
  tension: 0.3,
};

export default function PredictionChart() {
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchForecast() {
      try {
        setIsLoading(true);
        // Call your backend forecast API
        const data = await api.postForecast(selectedCity, 7); // 7-day forecast
        
        if (!data.predictions || data.predictions.length === 0) {
          throw new Error("No predictions returned from API.");
        }

        // Process data for Chart.js
        const labels = data.predictions.map(p => new Date(p.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }));
        const aqiValues = data.predictions.map(p => p.predicted_aqi);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: `Predicted AQI for ${selectedCity}`,
              data: aqiValues,
              borderColor: '#10B981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              borderWidth: 3,
              pointBackgroundColor: '#10B981',
              pointRadius: 6,
              pointHoverRadius: 8,
              fill: true,
            },
            // Confidence bands can be added if your API provides them
          ],
        });
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error(`Failed to fetch forecast for ${selectedCity}:`, err);
        setChartData({ labels: [], datasets: [] }); // Clear chart on error
      } finally {
        setIsLoading(false);
      }
    }

    fetchForecast();
  }, [selectedCity]); // Re-run this effect when selectedCity changes

  return (
    <>
      <div className="flex flex-wrap items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-emerald-800">{selectedCity} Forecast</h3>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Select City:</span>
          <select
            id="city-selector"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="border border-emerald-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {CITIES.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="h-80 relative">
        {isLoading && <p className="text-center text-gray-600">Loading forecast...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        {!isLoading && !error && chartData.labels.length > 0 && (
          <Line options={chartOptions} data={chartData} />
        )}
      </div>
    </>
  );
}