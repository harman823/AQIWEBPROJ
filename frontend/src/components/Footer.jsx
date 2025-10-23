// src/components/Footer.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import feather from 'feather-icons';

export default function Footer() {
  useEffect(() => {
    feather.replace();
  }, []);

  return (
    <footer className="bg-emerald-800 text-white pt-12 pb-8 px-4 mt-auto"> {/* Ensures footer is at bottom */}
      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"> {/* Responsive columns */}

        {/* Section 1: Brand and Social */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-emerald-300 flex items-center">
            <span className="mr-2 text-2xl">🌍</span> {/* Emoji Icon */}
             AQI Predictor
          </h3>
          <p className="text-emerald-100 text-sm leading-relaxed mb-4"> {/* Smaller text, better spacing */}
            Advanced air quality forecasting using machine learning algorithms for better health decisions.
          </p>
          <div className="flex gap-3"> {/* Reduced gap */}
            <a href="#" aria-label="Twitter" className="inline-flex items-center justify-center w-8 h-8 bg-white/10 rounded-full transition-colors duration-200 hover:bg-white/20 text-emerald-100 hover:text-white">
              <i data-feather="twitter" className="w-4 h-4"></i> {/* Smaller icons */}
            </a>
            <a href="#" aria-label="Facebook" className="inline-flex items-center justify-center w-8 h-8 bg-white/10 rounded-full transition-colors duration-200 hover:bg-white/20 text-emerald-100 hover:text-white">
              <i data-feather="facebook" className="w-4 h-4"></i>
            </a>
            <a href="#" aria-label="LinkedIn" className="inline-flex items-center justify-center w-8 h-8 bg-white/10 rounded-full transition-colors duration-200 hover:bg-white/20 text-emerald-100 hover:text-white">
              <i data-feather="linkedin" className="w-4 h-4"></i>
            </a>
            <a href="#" aria-label="Github" className="inline-flex items-center justify-center w-8 h-8 bg-white/10 rounded-full transition-colors duration-200 hover:bg-white/20 text-emerald-100 hover:text-white">
              <i data-feather="github" className="w-4 h-4"></i>
            </a>
          </div>
        </div>

        {/* Section 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-emerald-300">Quick Links</h3> {/* Slightly smaller heading */}
          <ul className="list-none p-0 m-0 space-y-2 text-sm"> {/* Smaller text */}
            <li><Link to="/" className="text-emerald-100 no-underline transition-colors duration-200 hover:text-white hover:underline">Home</Link></li>
            <li><Link to="/predictions" className="text-emerald-100 no-underline transition-colors duration-200 hover:text-white hover:underline">Predictions</Link></li>
            <li><Link to="/about" className="text-emerald-100 no-underline transition-colors duration-200 hover:text-white hover:underline">About Us</Link></li>
            <li><Link to="/contact" className="text-emerald-100 no-underline transition-colors duration-200 hover:text-white hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Section 3: Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-emerald-300">Resources</h3>
          <ul className="list-none p-0 m-0 space-y-2 text-sm">
            <li><a href="#" className="text-emerald-100 no-underline transition-colors duration-200 hover:text-white hover:underline">Documentation</a></li>
            <li><a href="#" className="text-emerald-100 no-underline transition-colors duration-200 hover:text-white hover:underline">API Reference</a></li>
            <li><a href="#" className="text-emerald-100 no-underline transition-colors duration-200 hover:text-white hover:underline">Blog</a></li>
             <li><a href="#" className="text-emerald-100 no-underline transition-colors duration-200 hover:text-white hover:underline">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Section 4: Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-emerald-300">Contact Us</h3>
          <ul className="list-none p-0 m-0 space-y-2 text-sm">
            <li className="text-emerald-100 flex items-center">
              <i data-feather="mail" className="w-4 h-4 mr-2 shrink-0"></i> {/* Correction: shrink-0 */}
              info@aqipredictor.com
            </li>
            <li className="text-emerald-100 flex items-center">
              <i data-feather="phone" className="w-4 h-4 mr-2 shrink-0"></i> {/* Correction: shrink-0 */}
              +1 (555) 123-4567
            </li>
            <li className="text-emerald-100 flex items-start"> {/* Align items start for multi-line */}
              <i data-feather="map-pin" className="w-4 h-4 mr-2 mt-1 shrink-0"></i> {/* Correction: shrink-0 */}
              123 Green St, Eco City, 98765
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center pt-8 mt-8 border-t border-white/10 text-emerald-200 text-xs"> {/* Smaller text */}
        &copy; {new Date().getFullYear()} AQI Predictor. All rights reserved.
      </div>
    </footer>
  );
}