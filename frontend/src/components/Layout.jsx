// src/components/Layout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

export default function Layout() {
  return (
    // This uses Tailwind's flex-col and min-h-screen to ensure the footer
    // sticks to the bottom, even on short pages.
    <div className="bg-emerald-50 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* This is where your page components will be rendered */}
      </main>
      <Footer />
    </div>
  );
}