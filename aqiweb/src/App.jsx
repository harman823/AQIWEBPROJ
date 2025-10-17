import React from 'react'
import CitySearch from './components/CitySearch'
import CompareTable from './components/CompareTable'
import ImprovingCities from './components/ImprovingCities'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">
          Air Quality Monitoring Dashboard
        </h1>
        <p className="text-gray-600">Track and analyze AQI trends across cities</p>
      </header>

      <div className="max-w-5xl mx-auto space-y-10">
        <CitySearch />
        <CompareTable />
        <ImprovingCities />
      </div>
    </div>
  )
}
