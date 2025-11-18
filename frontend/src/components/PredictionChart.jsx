// src/components/PredictionChart.jsx
import { useEffect, useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const API_BASE_URL = "https://aqiwebproj.onrender.com/api";
// Fallback City List (Should ideally be imported or passed via props)
const DEFAULT_CITIES = [
  "Ahmedabad",
  "Aizawl",
  "Amaravati",
  "Amritsar",
  "Bengaluru",
  "Bhopal",
  "Chennai",
  "Coimbatore",
  "Delhi",
  "Ernakulam",
  "Gandhinagar",
  "Gurugram",
  "Guwahati",
  "Hyderabad",
  "Jaipur",
  "Jorapokhar",
  "Kochi",
  "Kolkata",
  "Lucknow",
  "Mumbai",
  "Patna",
  "Shillong",
  "Thiruvananthapuram",
  "Visakhapatnam",
];

// Helper function to get text color class based on AQI (Tailwind classes)
function getAqiColor(aqi) {
  if (aqi <= 50) return { point: "#10B981", line: "rgba(16, 185, 129, 0.1)" }; // Good: Emerald-500
  if (aqi <= 100) return { point: "#FBBF24", line: "rgba(251, 191, 36, 0.1)" }; // Moderate: Amber-500
  if (aqi <= 150) return { point: "#F97316", line: "rgba(249, 115, 22, 0.1)" }; // Unhealthy for Sensitive: Orange-600
  if (aqi <= 200) return { point: "#EF4444", line: "rgba(239, 68, 68, 0.1)" }; // Unhealthy: Red-500
  if (aqi <= 300) return { point: "#8B5CF6", line: "rgba(139, 92, 246, 0.1)" }; // Very Unhealthy: Violet-500
  return { point: "#7E22CE", line: "rgba(126, 34, 206, 0.1)" }; // Hazardous: Purple-700
}

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true },
    tooltip: { mode: "index", intersect: false },
  },
  scales: {
    x: {
      title: { display: true, text: "Date", color: "#6b7280" },
      grid: { color: "#e5e7eb" },
      ticks: { color: "#9ca3af" },
    },
    y: {
      title: { display: true, text: "Predicted AQI Value", color: "#6b7280" },
      beginAtZero: true,
      suggestedMax: 200,
      grid: { color: "#e5e7eb" },
      ticks: { color: "#9ca3af" },
    },
  },
  elements: {
    line: { tension: 0.3, borderWidth: 3, fill: true },
    point: { radius: 5, hoverRadius: 8 },
  },
};

export default function PredictionChart({ days = 7, cities = DEFAULT_CITIES }) {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [forecastData, setForecastData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchForecast() {
      if (!selectedCity) return;

      setIsLoading(true);
      setError(null);
      setForecastData(null);

      try {
        const response = await fetch(`${API_BASE_URL}/forecast`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ city: selectedCity, days: days }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Failed to fetch prediction.");
          return;
        }

        setForecastData(data);
      } catch (err) {
        setError("Network error or API server is down.");
        console.error("Forecast fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchForecast();
  }, [selectedCity, days]);

  const chartConfig = useMemo(() => {
    if (!forecastData || forecastData.predictions.length === 0)
      return { labels: [], datasets: [] };

    const predictions = forecastData.predictions;
    const firstAqi = predictions[0].predicted_aqi;
    const { point: pointColor, line: lineColor } = getAqiColor(firstAqi);

    return {
      labels: predictions.map((p) => p.date),
      datasets: [
        {
          label: `Predicted AQI for ${selectedCity}`,
          data: predictions.map((p) => p.predicted_aqi),
          borderColor: pointColor,
          backgroundColor: lineColor,
          pointBackgroundColor: pointColor,
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: pointColor,
          pointHoverBorderColor: pointColor,
        },
      ],
    };
  }, [forecastData, selectedCity]);

  const options = useMemo(() => {
    if (forecastData) {
      const suggestedMax = Math.max(300, forecastData.highest_aqi + 50);
      return {
        ...defaultOptions,
        scales: {
          ...defaultOptions.scales,
          y: {
            ...defaultOptions.scales.y,
            suggestedMax: suggestedMax,
          },
        },
      };
    }
    return defaultOptions;
  }, [forecastData]);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 md:mb-0">
          AQI Forecast ({days} Days)
        </h2>

        {/* City Selector Dropdown */}
        <div className="flex items-center space-x-2">
          <label htmlFor="city-select" className="text-gray-600 font-medium">
            Select City:
          </label>
          <select
            id="city-select"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-emerald-500 focus:border-emerald-500"
            disabled={isLoading}
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative h-96">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70">
            <p className="text-lg text-emerald-600 animate-pulse">
              Generating forecast...
            </p>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-50 p-4 rounded-lg">
            <p className="text-red-700 text-center font-medium">
              Error: {error}
              <br />
              {error.includes("Model not found") &&
                "Please navigate to the Predictions page and click the 'Retrain ML Model' button."}
            </p>
          </div>
        )}

        {!isLoading && !error && forecastData && (
          <Line options={options} data={chartConfig} />
        )}

        {!isLoading && !error && !forecastData && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500">
              Select a city and generate a prediction.
            </p>
          </div>
        )}
      </div>

      {forecastData && (
        <div className="mt-6 flex justify-around text-center border-t pt-4">
          <p className="text-sm font-medium text-gray-600">
            Lowest Predicted AQI:{" "}
            <span className="text-lg font-bold text-green-600">
              {Math.round(forecastData.lowest_aqi)}
            </span>
          </p>
          <p className="text-sm font-medium text-gray-600">
            Highest Predicted AQI:{" "}
            <span className="text-lg font-bold text-red-600">
              {Math.round(forecastData.highest_aqi)}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
