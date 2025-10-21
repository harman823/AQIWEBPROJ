import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImprovingCitiesList = () => {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchRankedCities = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://127.0.0.1:5000/improving_cities');
                setCities(response.data);
            } catch (err) {
                setError('Failed to fetch city data.');
            }
            setLoading(false);
        };
        fetchRankedCities();
    }, []);
    if (loading) return <div className="card"><p>Loading city rankings...</p></div>;
    if (error) return <div className="card"><p style={{ color: 'red' }}>{error}</p></div>;
    return (
        <div className="improving-cities-list">
            <h2>City AQI Rankings</h2>
            <p>Full list of cities ranked by their overall average AQI.</p>
            <ul>
                {cities.map((city, index) => (
                    <li key={index} className="city-rank-item-expanded">
                        <div className="city-summary">
                            <span className="rank-number">{index + 1}.</span>
                            <span className="city-name">{city.City}</span>
                            <span className="avg-aqi">
                                Avg: <strong>{city.Overall_Avg_AQI.toFixed(2)}</strong>
                            </span>
                        </div>
                        <div className="yearly-details">
                            <h4>Yearly Average AQI:</h4>
                            <ul>
                                {city.Yearly_AQI.length > 0 ? (
                                    city.Yearly_AQI.map(yearly => (
                                        <li key={yearly.Year}>
                                            {yearly.Year}: <strong>{yearly.AQI.toFixed(2)}</strong>
                                        </li>
                                    ))
                                ) : (
                                    <li>No yearly data available</li>
                                )}
                            </ul>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default ImprovingCitiesList;