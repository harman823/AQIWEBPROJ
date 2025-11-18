// src/components/CurrentAqiList.jsx
import { useEffect, useState } from "react";
import CurrentAqi from "./CurrentAqi.jsx";

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

export default function CurrentAqiList({ cities = DEFAULT_CITIES }) {
  // Accept cities as prop
  const [aqiData, setAqiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAqiData() {
      setIsLoading(true);
      try {
        const fetchPromises = cities.map((city) =>
          fetch(`${API_BASE_URL}/city/${encodeURIComponent(city)}`)
            .then((res) => {
              if (!res.ok) {
                // If fetching a city fails, log and return null/empty object
                console.error(`Failed to fetch AQI for ${city}: ${res.status}`);
                return {};
              }
              return res.json();
            })
            .catch((error) => {
              console.error(`Error fetching AQI for ${city}:`, error);
              return {}; // Return empty on network error
            })
        );

        const results = await Promise.all(fetchPromises);
        // Filter out empty results and structure data
        const validResults = results.filter((data) => data && data.city);
        setAqiData(validResults);
      } catch (error) {
        console.error("Error fetching multiple AQI data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAqiData();
  }, [cities]); // Re-fetch when cities prop changes

  if (isLoading) {
    // Skeleton loaders for a better UX
    return Array.from({ length: 6 }).map((_, index) => (
      <div
        key={index}
        className="bg-gray-100 rounded-lg shadow p-6 h-32 animate-pulse"
      ></div>
    ));
  }

  if (aqiData.length === 0) {
    return (
      <p className="text-center text-gray-500 col-span-full">
        No current AQI data available.
      </p>
    );
  }

  return (
    <>
      {/* Show top 6 cities for a concise view on the homepage */}
      {aqiData.slice(0, 6).map((cityData) => (
        <CurrentAqi
          key={cityData.city}
          city={cityData.city}
          aqi={cityData.aqi}
          date={cityData.created_at}
        />
      ))}
    </>
  );
}
