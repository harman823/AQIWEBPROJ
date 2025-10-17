import React, { useState } from 'react'
import axios from 'axios'

export default function CitySearch() {
  const [city, setCity] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const fetchCityAQI = async () => {
    try {
      setError('')
      const res = await axios.get(`/api/city/${city}`)
      setResult(res.data)
    } catch (err) {
      setResult(null)
      setError('City not found or server error.')
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Search City AQI</h2>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full sm:w-2/3 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          onClick={fetchCityAQI}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-600 mt-3">{error}</p>}
      {result && (
        <div className="mt-4 border-t pt-3">
          <p><span className="font-medium">City:</span> {result.city}</p>
          <p><span className="font-medium">AQI:</span> {result.aqi}</p>
          <p><span className="font-medium">Date:</span> {new Date(result.reading_date).toLocaleString()}</p>
        </div>
      )}
    </div>
  )
}
