import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import HowItWorks from './components/HowItWorks';
import FeaturedGyms from './components/FeaturedGyms';
import LocalGyms from './components/LocalGyms';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';

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
        <HeroSection />
        <HowItWorks />
        <FeaturedGyms />
        <LocalGyms />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}