import React, { useState } from 'react';
import axios from 'axios';

const TrainingPage = () => {
    const [trainingStatus, setTrainingStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const handleTrainModels = async () => {
        setIsLoading(true);
        setTrainingStatus('Training process has started. This may take several minutes...');
        setResult(null);
        try {
            const response = await axios.post('http://127.0.0.1:5000/train');
            setTrainingStatus('Training process completed successfully!');
            setResult(response.data);
        } catch (error) {
            setTrainingStatus('An error occurred during training.');
            setResult(error.response?.data || { status: 'error', message: 'Unknown error' });
        }
        setIsLoading(false);
    };
    return (
        <div className="training-page card">
            <h2>Train Prediction Models</h2>
            <p>
                Click the button below to train the AQI prediction models for all cities. This process fetches the latest data, trains a new model for each city, and saves it. This should be done periodically to ensure predictions are accurate.
            </p>
            <button onClick={handleTrainModels} disabled={isLoading}>
                {isLoading ? 'Training in Progress...' : 'Start Model Training'}
            </button>
            {trainingStatus && (
                <div className="training-status">
                    <h4>Status:</h4>
                    <p>{trainingStatus}</p>
                    {result && (
                        <div className="training-result">
                            <h5>Details:</h5>
                            {result.status === 'success' ? (
                                <p>Models trained for {result.trained_models.length} cities.</p>
                            ) : (
                                <p>Error: {result.message}</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
export default TrainingPage;