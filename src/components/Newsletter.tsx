import React from 'react';
import { Button } from './ui/button';
import AnimatedSection from './AnimatedSection';

export default function Newsletter() {  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = (e.target as HTMLFormElement).email.value;
    const timestamp = new Date().toISOString();
    
    try {
      const response = await fetch('https://hook.eu2.make.com/ek6thb6m50uqodzgx8fp0holw7s79ahi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, timestamp }),
      });
      
      if (response.ok) {
        alert('Thank you for subscribing!');
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      alert('Sorry, there was an error. Please try again later.');
    }
  };

  return (
    <section className="py-24 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="relative rounded-2xl bg-gradient-to-r from-neon-green/20 to-transparent p-6 sm:p-8 md:p-12 overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Get Weekly Updates on New Gyms & Exclusive Deals
            </h2>
            <p className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base">
              Subscribe to our newsletter and receive a free copy of our "Ultimate Guide to Prague Gyms 2025"
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 rounded-xl text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-neon-green/40 text-sm sm:text-base"
              />
              <Button
                type="submit"
                className="bg-neon-green hover:bg-neon-green/90 text-white/90"
              >
                Subscribe
              </Button>
            </form>
          </div>
          
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-neon-green/10 to-transparent" />
        </AnimatedSection>
      </div>
    </section>
  );
}