// src/components/Admin.jsx
import { useState } from 'react';
import * as api from '../apiService.js';

export default function Admin() {
  const [status, setStatus] = useState('');
  const [isTraining, setIsTraining] = useState(false);
  const [statusClass, setStatusClass] = useState('status-text');

  const handleTrain = async () => {
    setIsTraining(true);
    setStatus('Training in progress... this may take a minute.');
    setStatusClass('status-text-warning');

    try {
      const result = await api.postTrainModel();
      setStatus(`Training complete! (MSE: ${result.mean_squared_error || 'N/A'})`);
      setStatusClass('status-text-success');
    } catch (error) {
      setStatus(`Training failed: ${error.message}`);
      setStatusClass('status-text-error');
    } finally {
      setIsTraining(false);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Admin</h2>
      <button
        onClick={handleTrain}
        disabled={isTraining}
        className="button-danger"
      >
        {isTraining ? 'Training...' : 'Re-Train Model'}
      </button>
      {status && <p className={statusClass}>{status}</p>}
    </div>
  );
}