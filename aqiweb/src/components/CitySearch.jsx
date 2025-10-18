import React, { useState, useEffect } from 'react';

// CitySearch Component
const CitySearch = ({ onDataLoaded }) => {
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!city.trim()) return;
        
        setLoading(true);
        try {
            const response = await fetch(`/api/city/${city}/history`);
            const data = await response.json();
            onDataLoaded(data, city);
        } catch (error) {
            console.error('Error fetching city data:', error);
            onDataLoaded([], city); // Clear data on error
        } finally {
            setLoading(false);
        }
    };

    // Handle Enter key press for searching
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    useEffect(() => {
        // This ensures Feather icons are rendered when the component updates
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }, [loading]);

    return (
        <div className="card bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 flex items-center">
                <i data-feather="search" className="mr-2 text-primary-400"></i>
                City AQI History
            </h2>
            <div className="flex space-x-2">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter city name..."
                    className="flex-1 bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition duration-300"
                />
                <button
                    onClick={handleSearch}
                    disabled={loading}
                    className={`px-4 py-2 rounded-lg font-medium flex items-center justify-center transition duration-300 ${
                        loading 
                            ? 'bg-slate-600 cursor-not-allowed' 
                            : 'bg-primary-600 hover:bg-primary-700'
                    }`}
                >
                    {loading ? (
                        <>
                            <i data-feather="loader" className="animate-spin mr-2 h-5 w-5"></i>
                            Searching...
                        </>
                    ) : (
                        <>
                            <i data-feather="search" className="mr-2 h-5 w-5"></i>
                            Search
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default CitySearch;

