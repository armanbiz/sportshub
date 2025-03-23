import React, { useState, useEffect } from 'react';
import { Menu, X, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button as MovingButton } from '@/components/ui/moving-border';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="fixed w-full top-0 z-50 border-b border-white/10 backdrop-blur-sm bg-dark">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center" onClick={() => window.scrollTo(0, 0)}>
              <img src="/SportsHub_Logo.png" alt="SportsHub" className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-white">SportsHub</span>
            </Link>
          </div>
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <div className="flex space-x-6">
              <Link to="/search" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">
                Search
              </Link>
              <Link to="/blog" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium" onClick={() => window.scrollTo(0, 0)}>
                Blog
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium" onClick={() => window.scrollTo(0, 0)}>
                About Us
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium" onClick={() => window.scrollTo(0, 0)}>
                Contact Us
              </Link>
              <Link to="/faq" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium" onClick={() => window.scrollTo(0, 0)}>
                FAQ
              </Link>
            </div>
            <div className="relative">
              <MovingButton
                borderRadius="0.5rem"
                containerClassName="w-[120px] h-12 ml-6"
                className="bg-neon-green hover:bg-neon-green/90 text-white/90 h-full px-4"
                onClick={handleDropdownClick}
              >
                <div className="flex items-center">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </div>
              </MovingButton>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <a
                      href="/login"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </a>
                    <a
                      href="/register"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create Account
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-dark-card"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1 bg-dark-card">
            <Link to="/search" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-dark" onClick={() => { setIsMenuOpen(false); window.scrollTo(0, 0); }}>
              Search
            </Link>
            <Link to="/blog" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-dark" onClick={() => { setIsMenuOpen(false); window.scrollTo(0, 0); }}>
              Blog
            </Link>
            <Link to="/about" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-dark" onClick={() => { setIsMenuOpen(false); window.scrollTo(0, 0); }}>
              About Us
            </Link>
            <Link to="/contact" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-dark" onClick={() => { setIsMenuOpen(false); window.scrollTo(0, 0); }}>
              Contact Us
            </Link>
            <Link to="/faq" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-dark" onClick={() => { setIsMenuOpen(false); window.scrollTo(0, 0); }}>
              FAQ
            </Link>
            <div className="px-3 py-2">
              <MovingButton
                borderRadius="0.5rem"
                containerClassName="w-[120px] h-12 mx-auto"
                className="bg-neon-green hover:bg-neon-green/90 text-white/90 h-full px-4"
              >
                <div className="flex items-center">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </div>
              </MovingButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}