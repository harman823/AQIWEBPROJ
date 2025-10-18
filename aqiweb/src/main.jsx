import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// This finds the 'root' div in your index.html and renders the main App component inside it.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

