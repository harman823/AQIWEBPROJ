/* eslint-disable no-unused-vars */
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
import { getAqiColor, CITIES } from "../utils/aqiUtils";

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

// ✨ CHANGE: Point to local backend
const API_BASE_URL = "http://localhost:5000/api";

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { mode: "index", intersect: false },
  },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true, grid: { color: "#f3f4f6" } },
  },
  elements: { line: { tension: 0.4 }, point: { radius: 4 } },
};

export default function PredictionChart({ days = 7 }) {
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
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
          setError(data.error || "Failed");
          return;
        }
        setForecastData(data);
      } catch (err) {
        setError("API Error");
      } finally {
        setIsLoading(false);
      }
    }
    fetchForecast();
  }, [selectedCity, days]);

  const chartConfig = useMemo(() => {
    if (!forecastData?.predictions) return { labels: [], datasets: [] };
    const predictions = forecastData.predictions;
    const { hex, hexBg } = getAqiColor(predictions[0].predicted_aqi);

    return {
      labels: predictions.map((p) => new Date(p.date).toLocaleDateString()),
      datasets: [
        {
          label: "Predicted AQI",
          data: predictions.map((p) => p.predicted_aqi),
          borderColor: hex,
          backgroundColor: hexBg,
          fill: true,
        },
      ],
    };
  }, [forecastData]);

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">{days}-Day Forecast</h2>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="border rounded p-1 text-gray-700"
        >
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <div className="relative h-80">
        {!isLoading && !error && forecastData && (
          <Line options={defaultOptions} data={chartConfig} />
        )}
        {isLoading && (
          <p className="text-center pt-20 text-gray-400">Loading...</p>
        )}
      </div>
    </div>
  );
}
