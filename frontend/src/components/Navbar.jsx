// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import feather from 'feather-icons';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    feather.replace();
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  }

  // Define styles as utility strings
  const navLinkClass = "text-emerald-800 no-underline font-semibold transition-colors duration-200 flex items-center gap-2 hover:text-emerald-600";
  const mobileMenuClasses = isMobileMenuOpen 
    ? "absolute top-full left-0 right-0 bg-white shadow-md flex-col p-4 md:hidden" 
    : "hidden";

  return (
    <nav className="bg-white p-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      <div className="text-emerald-600 font-extrabold text-2xl flex items-center">
        <span className="mr-2">🌍</span>
        AQI Predictor
      </div>
      
      <button 
        className="md:hidden bg-none border-none text-2xl cursor-pointer text-emerald-800" 
        onClick={toggleMobileMenu}
      >
        <i data-feather="menu"></i>
      </button>

      {/* Desktop Menu */}
      <ul className="hidden md:flex list-none gap-6 m-0 p-0">
        <li><Link to="/" className={navLinkClass}><i data-feather="home" className="w-4 h-4"></i> Home</Link></li>
        <li><Link to="/predictions" className={navLinkClass}><i data-feather="trending-up" className="w-4 h-4"></i> Predictions</Link></li>
        <li><Link to="/about" className={navLinkClass}><i data-feather="info" className="w-4 h-4"></i> About</Link></li>
        <li><Link to="/contact" className={navLinkClass}><i data-feather="mail" className="w-4 h-4"></i> Contact</Link></li>
      </ul>

      {/* Mobile Menu */}
      <div className={mobileMenuClasses}>
        <ul className="flex-col list-none p-0 m-0 gap-4">
          <li><Link to="/" className={navLinkClass} onClick={closeMobileMenu}><i data-feather="home" className="w-4 h-4"></i> Home</Link></li>
          <li><Link to="/predictions" className={navLinkClass} onClick={closeMobileMenu}><i data-feather="trending-up" className="w-4 h-4"></i> Predictions</Link></li>
          <li><Link to="/about" className={navLinkClass} onClick={closeMobileMenu}><i data-feather="info" className="w-4 h-4"></i> About</Link></li>
          <li><Link to="/contact" className={navLinkClass} onClick={closeMobileMenu}><i data-feather="mail" className="w-4 h-4"></i> Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}