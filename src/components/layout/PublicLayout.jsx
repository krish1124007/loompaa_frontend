import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import CustomCursor from '../ui/CustomCursor.jsx';
import { useSiteContent } from '../../hooks/useSiteContent.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';

export default function PublicLayout() {
  const { pathname } = useLocation();
  useSiteContent();
  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="theme-cream bg-base text-ink min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-pill focus:bg-tangerine focus:text-ink-on-cream focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>
      <CustomCursor />
      <Navbar />
      <main id="main-content" className="flex-1 pt-16 md:pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
