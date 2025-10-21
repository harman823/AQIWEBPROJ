import React, { useState } from 'react';

const CitySearch = ({ onCitySelect }) => {
    const [city, setCity] = useState('');
    const handleSearch = (e) => {
        e.preventDefault();
        if (city) {
            onCitySelect(city);
        }
    };
    return (
        <form onSubmit={handleSearch} className="city-search-form card">
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name (e.g., Delhi)"
            />
            <button type="submit">Search</button>
        </form>
    );
};
export default CitySearch;