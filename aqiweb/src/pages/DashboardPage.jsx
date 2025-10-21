import React, { useState } from 'react';
import CitySearch from '../components/CitySearch';
import AQIHistory from '../components/AQIHistory';
import AQIPredictions from '../components/AQIPredictions';
import ImprovingCitiesList from '../components/ImprovingCitiesList';

const DashboardPage = () => {
    const [selectedCity, setSelectedCity] = useState('');
    const handleCitySelect = (city) => {
        setSelectedCity(city);
    };
    return (
        <div className="main-content">
            <div className="search-and-charts">
                <CitySearch onCitySelect={handleCitySelect} />
                {selectedCity ? (
                    <>
                        <AQIHistory city={selectedCity} />
                        <AQIPredictions city={selectedCity} />
                    </>
                ) : (
                    <div className="card placeholder-text">
                        <p>Search for a city to see its detailed AQI history and future predictions.</p>
                    </div>
                )}
            </div>
            <div className="ranked-cities-section">
                <ImprovingCitiesList />
            </div>
        </div>
    );
};
export default DashboardPage;