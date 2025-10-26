// src/components/Admin.jsx
import { useState } from 'react';

// Define Backend URL
const API_BASE_URL = 'https://aqiwebproj.onrender.com/api'; // Ensure '/api' is here// Ensure '/api' is here// Helper function to handle fetch responses
async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch (e) {
      // Ignore if response is not JSON
    }
    throw new Error(errorMessage);
  }
  return response.json();
}

// Function to trigger training (moved from apiService)
async function postTrainModel() {
  const response = await fetch(`${API_BASE_URL}/train-model`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // No body needed for this endpoint based on app.py
  });
  return handleResponse(response);
}


export default function Admin() {
  const [status, setStatus] = useState('');
  const [isTraining, setIsTraining] = useState(false);
  const [statusClass, setStatusClass] = useState('text-gray-500'); // Default class

  const handleTrain = async () => {
    setIsTraining(true);
    setStatus('Training in progress... this may take a minute.');
    setStatusClass('text-yellow-600'); // Warning class

    try {
      // Use the direct function call
      const result = await postTrainModel();
      setStatus(`Training complete! (MSE: ${result.mean_squared_error !== undefined ? result.mean_squared_error : 'N/A'})`);
      setStatusClass('text-green-600'); // Success class
    } catch (error) {
      console.error("Training failed:", error); // Log the error
      setStatus(`Training failed: ${error.message}`);
      setStatusClass('text-red-600'); // Error class
    } finally {
      setIsTraining(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6"> {/* Updated styling */}
      <h2 className="text-xl font-bold text-emerald-800 mb-4">Admin Controls</h2> {/* Updated styling */}
      <button
        onClick={handleTrain}
        disabled={isTraining}
        className={`w-full px-4 py-2 rounded-lg text-white font-semibold transition duration-300 ${
          isTraining
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-red-500 hover:bg-red-600'
        }`}
      >
        {isTraining ? 'Training...' : 'Re-Train Model'}
      </button>
      {status && <p className={`mt-4 text-sm ${statusClass}`}>{status}</p>}
    </div>
  );
}