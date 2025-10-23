// src/components/Layout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

export default function Layout() {
  return (
    // This uses Tailwind's flex-col and min-h-screen to ensure the footer
    // sticks to the bottom, even on short pages. `grow` on main pushes footer down.
    <div className="bg-emerald-50 min-h-screen flex flex-col font-sans"> {/* Added default font */}
      <Navbar />
      {/* Main content area takes up remaining vertical space */}
      <main className="grow w-full"> {/* Correction: grow */}
        <Outlet /> {/* Child route components (pages) render here */}
      </main>
      <Footer />
    </div>
  );
}