// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom"; // Use NavLink for active styling
import feather from "feather-icons";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to close mobile menu (e.g., on link click)
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Replace feather icons after render or when menu state changes
  useEffect(() => {
    feather.replace();
  }, [isMobileMenuOpen]); // Dependency ensures icons update if menu visibility changes them

  // Define base styles for navigation links
  const baseNavLinkClass =
    "no-underline font-semibold transition-colors duration-200 flex items-center gap-1.5 px-3 py-2 rounded-md"; // Added padding and rounded corners

  // Function to determine link class, including active state for NavLink
  const getNavLinkClass = ({ isActive }) =>
    `${baseNavLinkClass} ${
      isActive
        ? "bg-emerald-100 text-emerald-700" // Active state: light green bg, darker green text
        : "text-emerald-800 hover:text-emerald-600 hover:bg-emerald-50" // Default state: dark green text, lighter green hover
    }`;

  // Mobile menu container classes
  const mobileMenuContainerClasses = `absolute top-full left-0 right-0 bg-white shadow-lg md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
    isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
  }`; // Smooth transition

  return (
    <nav className="bg-white p-4 flex justify-between items-center shadow-md sticky top-0 z-50 w-full">
      {/* Logo/Brand Name */}
      <Link
        to="/"
        className="text-emerald-600 font-extrabold text-2xl flex items-center focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
        onClick={closeMobileMenu}
      >
        <span className="mr-2 text-3xl">🌍</span> {/* Emoji Icon */}
        AQI Predictor
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-800 hover:bg-emerald-100" // Added padding, focus ring, hover bg
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu" // Accessibility
        aria-expanded={isMobileMenuOpen} // Accessibility
      >
        {/* Conditionally render Menu or X icon */}
        <i
          data-feather={isMobileMenuOpen ? "x" : "menu"}
          className="w-6 h-6"
        ></i>
      </button>

      {/* Desktop Menu (hidden on small screens) */}
      <ul className="hidden md:flex list-none gap-2 m-0 p-0">
        {" "}
        {/* Reduced gap */}
        <li>
          <NavLink to="/" className={getNavLinkClass}>
            <i data-feather="home" className="w-4 h-4"></i> Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/predictions" className={getNavLinkClass}>
            <i data-feather="trending-up" className="w-4 h-4"></i> Predictions
          </NavLink>
        </li>
        <li>
          <NavLink to="/trends" className={getNavLinkClass}>
            <i data-feather="bar-chart-2" className="w-4 h-4"></i> Trends
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={getNavLinkClass}>
            <i data-feather="info" className="w-4 h-4"></i> About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={getNavLinkClass}>
            <i data-feather="mail" className="w-4 h-4"></i> Contact
          </NavLink>
        </li>
      </ul>

      {/* Mobile Menu Dropdown */}
      <div className={mobileMenuContainerClasses}>
        <ul className="flex flex-col list-none p-4 gap-2">
          {" "}
          {/* Padding and gap for mobile items */}
          {/* Use NavLink here too for consistency, close menu on click */}
          <li>
            <NavLink
              to="/"
              className={getNavLinkClass}
              onClick={closeMobileMenu}
            >
              <i data-feather="home" className="w-4 h-4"></i> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/predictions"
              className={getNavLinkClass}
              onClick={closeMobileMenu}
            >
              <i data-feather="trending-up" className="w-4 h-4"></i> Predictions
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/trends"
              className={getNavLinkClass}
              onClick={closeMobileMenu}
            >
              <i data-feather="bar-chart-2" className="w-4 h-4"></i> Trends
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={getNavLinkClass}
              onClick={closeMobileMenu}
            >
              <i data-feather="info" className="w-4 h-4"></i> About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={getNavLinkClass}
              onClick={closeMobileMenu}
            >
              <i data-feather="mail" className="w-4 h-4"></i> Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
