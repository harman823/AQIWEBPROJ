import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import feather from "feather-icons";
import CurrentAqiList from "../components/CurrentAqiList.jsx";
import HistoryChart from "../components/HistoryChart.jsx";
import { CITIES } from "../utils/aqiUtils";

// ✨ CHANGE: Point to local backend
const API_BASE_URL = "http://localhost:5000/api";

export default function Home() {
  const [historyData, setHistoryData] = useState([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("Delhi");

  useEffect(() => {
    feather.replace();
  }, []);

  useEffect(() => {
    async function fetchHistory() {
      setIsHistoryLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/history/${selectedCity}`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setHistoryData(data);
      } catch (error) {
        console.error("History Error:", error);
        setHistoryData([]);
      } finally {
        setIsHistoryLoading(false);
      }
    }
    fetchHistory();
  }, [selectedCity]);

  return (
    <>
      <section className="relative py-20 bg-linear-to-br from-emerald-400 via-teal-500 to-cyan-600 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">Predict Air Quality</h1>
          <p className="text-xl text-emerald-100 mb-8">
            Real-time data & ML forecasts for your city.
          </p>
          <Link
            to="/predictions"
            className="bg-white text-emerald-600 px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition"
          >
            View Forecasts
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-emerald-800 mb-4">
            Current Air Quality
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <CurrentAqiList />
        </div>
      </section>

      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-emerald-800 mb-8">
            Historical Trends
          </h2>
          <div className="flex justify-center mb-8">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="p-2 rounded-lg border border-gray-300 text-gray-700"
            >
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-5xl mx-auto">
            <HistoryChart
              data={historyData}
              isLoading={isHistoryLoading}
              city={selectedCity}
            />
          </div>
        </div>
      </section>
    </>
  );
}
