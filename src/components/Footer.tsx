import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark text-white/90 relative z-10">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">SportsHub</h3>
            <p className="text-gray-400 text-sm sm:text-base select-text">Find the perfect gym or sports facility in Prague.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li><Link to="/search" className="text-gray-400 hover:text-white transition-colors inline-block cursor-pointer select-text" onClick={() => window.scrollTo(0, 0)}>Search Gyms</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors inline-block cursor-pointer select-text" onClick={() => window.scrollTo(0, 0)}>Blog</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors inline-block cursor-pointer select-text" onClick={() => window.scrollTo(0, 0)}>About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors inline-block cursor-pointer select-text" onClick={() => window.scrollTo(0, 0)}>Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors inline-block cursor-pointer select-text" onClick={() => window.scrollTo(0, 0)}>FAQ</Link></li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li><a href="mailto:info@sportshub.com" className="text-gray-400 hover:text-white transition-colors inline-block cursor-pointer select-text">info@sportshub.com</a></li>
              <li><a href="tel:+420123456789" className="text-gray-400 hover:text-white transition-colors inline-block cursor-pointer select-text">+420 123 456 789</a></li>
              <li><span className="text-gray-400 select-text">Prague, Czech Republic</span></li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 select-text">
          <p>&copy; {new Date().getFullYear()} SportsHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}