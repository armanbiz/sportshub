import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

// Lazy load routes
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const BlogArticlePage = lazy(() => import('./pages/BlogArticlePage'));
const ComparisonPage = lazy(() => import('./pages/ComparisonPage'));
const ComingSoonPage = lazy(() => import('./pages/ComingSoon'));

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-dark-lighter relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon-green/40 via-transparent to-transparent animate-pulse" />
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-transform duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6,78,65,0.15), transparent 40%)`,
        }}
      />
      <Header />
      <main className="relative">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-white/60">Loading...</div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogArticlePage />} />
            <Route path="/compare" element={<ComparisonPage />} />
            <Route path="/coming-soon" element={<ComingSoonPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}