// src/pages/Home.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import feather from 'feather-icons';

// Import the actual components
import CurrentAqiList from '../components/CurrentAqiList.jsx';
import PredictionChart from '../components/PredictionChart.jsx'; // Using this for the home page chart preview

export default function Home() {
  // Run feather.replace() when the component mounts
  useEffect(() => {
    feather.replace();
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-linear-to-br from-emerald-400 via-teal-500 to-cyan-600"> {/* Correction: bg-linear-to-br */}
        {/* Optional: Add subtle background pattern or image here if desired */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight shadow-sm"> {/* Improved typography */}
              Predict Air Quality of your city
            </h1>
            <p className="text-lg md:text-xl text-emerald-100 mb-10">
              Real-time AQI data and machine learning forecasts for major cities worldwide. Breathe easier, plan smarter.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {/* Link to Predictions page */}
              <Link
                to="/predictions"
                className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-500"
              >
                View Forecasts
              </Link>
              {/* Link to scroll down */}
               <a
                  href="#how-it-works"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-full transition duration-300 focus:outline-none focus:ring-2 focus:ring-white"
               >
                 Learn More
               </a>

            </div>
          </div>
        </div>
      </section>

      {/* Current AQI Section */}
      <section id="cities" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16"> {/* Increased bottom margin */}
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">Current Air Quality</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Live AQI readings for key global cities.</p>
          </div>

          {/* Render the CurrentAqiList component */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"> {/* Centered grid */}
             <CurrentAqiList />
          </div>
        </div>
      </section>

      {/* Prediction Section */}
      <section className="py-16 bg-emerald-50"> {/* Light green background */}
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">ML-Powered Forecast</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">See the predicted air quality for the next 7 days.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-5xl mx-auto"> {/* Centered chart container */}
            {/* Render the PredictionChart component */}
             <PredictionChart />
          </div>
          <div className="text-center mt-8">
             <Link to="/predictions" className="text-emerald-600 hover:text-emerald-800 font-semibold group">
                View More Cities & Details
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 ml-1">&rarr;</span>
             </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">How Our Prediction Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Leveraging advanced machine learning for accurate AQI forecasting.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"> {/* Centered grid */}
            {/* Step 1: Data Collection */}
            <div className="bg-emerald-50 rounded-2xl p-8 text-center border border-emerald-100 transition duration-300 hover:shadow-lg">
              <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow">
                <i data-feather="database" className="w-8 h-8"></i>
              </div>
              <h3 className="text-xl font-bold text-emerald-800 mb-3">1. Data Collection</h3>
              <p className="text-gray-600 text-sm leading-relaxed"> {/* Smaller text, relaxed leading */}
                 We gather real-time pollutant data, weather patterns, historical trends, and geographical information from diverse sources worldwide.
              </p>
            </div>

            {/* Step 2: Machine Learning */}
            <div className="bg-emerald-50 rounded-2xl p-8 text-center border border-emerald-100 transition duration-300 hover:shadow-lg">
              <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow">
                <i data-feather="cpu" className="w-8 h-8"></i>
              </div>
              <h3 className="text-xl font-bold text-emerald-800 mb-3">2. ML Modeling</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Analyzes millions of data points, identifying complex patterns and relationships affecting air quality.
              </p>
            </div>

            {/* Step 3: Accurate Forecasts */}
            <div className="bg-emerald-50 rounded-2xl p-8 text-center border border-emerald-100 transition duration-300 hover:shadow-lg">
              <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow">
                <i data-feather="trending-up" className="w-8 h-8"></i>
              </div>
              <h3 className="text-xl font-bold text-emerald-800 mb-3">3. Actionable Forecasts</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Receive clear 7-day AQI forecasts, empowering you to make informed decisions about your health and daily activities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Simplified */}
      <section className="py-16 bg-linear-to-r from-emerald-500 to-teal-600"> {/* Correction: bg-linear-to-r */}
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Breathe Smarter?</h2>
          <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">Explore detailed air quality predictions for your city.</p>
          <Link
            to="/predictions"
            className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-500"
          >
            Check Predictions Now
          </Link>
        </div>
      </section>
    </>
  );
}
