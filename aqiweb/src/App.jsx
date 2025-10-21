import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import TrainingPage from './pages/TrainingPage';
import './styles/main.css';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>AQI Analysis and Prediction Dashboard</h1>
                    <nav>
                        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Dashboard</NavLink>
                        <NavLink to="/training" className={({ isActive }) => (isActive ? 'active' : '')}>Model Training</NavLink>
                    </nav>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/training" element={<TrainingPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;