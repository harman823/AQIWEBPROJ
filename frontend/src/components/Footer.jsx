// src/components/Footer.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import feather from 'feather-icons';

export default function Footer() {
  useEffect(() => {
    feather.replace();
  }, []);

  return (
    <footer className="bg-emerald-800 text-white pt-12 pb-8 px-4 mt-auto">
      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))]">
        
        {/* Section 1 */}
        <div className="footer-section">
          <h3 className="text-xl mb-4 text-emerald-300">AQI Predictor Pro</h3>
          <p className="text-emerald-100">Advanced air quality forecasting using machine learning algorithms for better health decisions.</p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="inline-flex items-center justify-center w-10 h-10 bg-white/10 rounded-full transition-colors duration-200 hover:bg-white/20">
              <i data-feather="twitter"></i>
            </a>
            <a href="#" className="inline-flex items-center justify-center w-10 h-10 bg-white/10 rounded-full transition-colors duration-200 hover:bg-white/20">
              <i data-feather="facebook"></i>
            </a>
            <a href="#" className="inline-flex items-center justify-center w-10 h-10 bg-white/10 rounded-full transition-colors duration-200 hover:bg-white/20">
              <i data-feather="linkedin"></i>
            </a>
            <a href="#" className="inline-flex items-center justify-center w-10 h-10 bg-white/10 rounded-full transition-colors duration-200 hover:bg-white/20">
              <i data-feather="github"></i>
            </a>
          </div>
        </div>
        
        {/* Section 2 */}
        <div className="footer-section">
          <h3 className="text-xl mb-4 text-emerald-300">Quick Links</h3>
          <ul className="list-none p-0 m-0 space-y-2">
            <li><Link to="/" className="text-emerald-100 no-underline transition-colors duration-200 hover:text-white">Home</Link></li>
            <li><Link to="/predictions" className="text-emerald-100 no-underline transition-colors duration-200 hover:text-white">Predictions</Link></li>
            <li><Link to="/about" className="text-emerald-100 no-underline transition-colors duration-200 hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="text-emerald-100 no-underline transition-colors duration-200 hover:text-white">Contact</Link></li>
          </ul>
        </div>
        
        {/* Section 3 */}
        <div className="footer-section">
          <h3 className="text-xl mb-4 text-emerald-300">Resources</h3>
          <ul className="list-none p-0 m-0 space-y-2">
            <li><a href="#" className="text-emerald-100 no-underline transition-colors duration-200 hover:text-white">Documentation</a></li>
            <li><a href="#" className="text-emerald-100 no-underline transition-colors duration-200 hover:text-white">API Reference</a></li>
            <li><a href="#" className="text-emerald-100 no-underline transition-colors duration-200 hover:text-white">Blog</a></li>
          </ul>
        </div>
        
        {/* Section 4 */}
        <div className="footer-section">
          <h3 className="text-xl mb-4 text-emerald-300">Contact Us</h3>
          <ul className="list-none p-0 m-0 space-y-2">
            <li className="text-emerald-100">Email: info@aqipredictor.com</li>
            <li className="text-emerald-100">Phone: +1 (555) 123-4567</li>
            <li className="text-emerald-100">Address: 123 Green St, Eco City</li>
          </ul>
        </div>
      </div>
      
      <div className="text-center pt-8 mt-8 border-t border-white/10 text-emerald-200 text-sm">
        &copy; 2025 AQI Predictor Pro. All rights reserved.
      </div>
    </footer>
  );
}