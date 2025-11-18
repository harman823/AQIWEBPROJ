import { useEffect, useState } from "react";
import CurrentAqi from "./CurrentAqi.jsx";
import { CITIES } from "../utils/aqiUtils";

// ✨ CHANGE: Point to local backend
const API_BASE_URL = "http://localhost:5000/api";

export default function CurrentAqiList() {
  const [aqiData, setAqiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAqiData() {
      setIsLoading(true);
      try {
        const displayCities = CITIES.slice(0, 6);
        const fetchPromises = displayCities.map((city) =>
          fetch(`${API_BASE_URL}/city/${encodeURIComponent(city)}`)
            .then((res) => (res.ok ? res.json() : null))
            .catch(() => null)
        );

        const results = await Promise.all(fetchPromises);
        setAqiData(results.filter((data) => data && data.city));
      } catch (error) {
        console.error("Error fetching AQI data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAqiData();
  }, []);

  if (isLoading)
    return <p className="col-span-full text-center">Loading data...</p>;
  if (aqiData.length === 0)
    return (
      <p className="col-span-full text-center text-red-500">
        No data found. Is local backend running?
      </p>
    );

  return (
    <>
      {aqiData.map((cityData) => (
        <CurrentAqi
          key={cityData.city}
          city={cityData.city}
          aqi={cityData.aqi}
          date={cityData.date || cityData.created_at}
        />
      ))}
    </>
  );
}
