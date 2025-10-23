// src/pages/Home.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import feather from 'feather-icons';

// --- We need to create these components next ---
// import CurrentAqiList from '../components/CurrentAqiList.jsx';
// import PredictionChart from '../components/PredictionChart.jsx';
// For now, let's use placeholders.

// Placeholder components (replace with real ones)
const CurrentAqiList = () => <div className="text-center p-8 bg-white rounded-lg shadow">AQI Cards will load here...</div>;
const PredictionChart = () => <div className="text-center p-8 bg-white rounded-lg shadow">Prediction Chart will load here...</div>;

export default function Home() {
  // Run feather.replace() when the component mounts
  useEffect(() => {
    feather.replace();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-emerald-400 to-teal-500 opacity-90"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Predict Air Quality with AI</h1>
            <p className="text-xl text-emerald-100 mb-10">Real-time AQI data and machine learning forecasts for major cities worldwide</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#cities" className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg">
                View Cities
              </a>
              <a href="#how-it-works" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-full transition duration-300">
                How It Works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Current AQI Section */}
      <section id="cities" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">Current Air Quality Index</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Real-time AQI measurements from your backend API</p>
          </div>
          
          {/* This ID is no longer needed, we use the component directly */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* We will replace this with a real component that fetches data */}
            <CurrentAqiList />
          </div>
        </div>
      </section>

      {/* Prediction Section */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">AI-Powered Predictions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Machine learning forecasts from your backend API</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            {/* We will replace this with a real, interactive chart component */}
            <PredictionChart />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">How Our Prediction Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Advanced machine learning algorithms analyze environmental data</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-emerald-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i data-feather="database" className="text-white w-8 h-8"></i>
              </div>
              <h3 className="text-xl font-bold text-emerald-800 mb-3">Data Collection</h3>
              <p className="text-gray-600">We gather real-time air quality data from monitoring stations worldwide along with weather patterns and historical trends.</p>
            </div>
            
            <div className="bg-emerald-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i data-feather="cpu" className="text-white w-8 h-8"></i>
              </div>
              <h3 className="text-xl font-bold text-emerald-800 mb-3">Machine Learning</h3>
              <p className="text-gray-600">Our AI models process millions of data points to identify patterns and predict future air quality conditions.</p>
            </div>
            
            <div className="bg-emerald-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i data-feather="trending-up" className="text-white w-8 h-8"></i>
              </div>
              <h3 className="text-xl font-bold text-emerald-800 mb-3">Accurate Forecasts</h3>
              <p className="text-gray-600">Receive 7-day forecasts with confidence intervals to help you plan your activities safely.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-500 to-teal-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Stay Informed About Air Quality</h2>
          <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">Join thousands of users who rely on our accurate AQI predictions</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#" className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg">
              Get Started Free
            </a>
            <a href="#" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-full transition duration-300">
              View Documentation
            </a>
          </div>
        </div>
      </section>
    </>
  );
}