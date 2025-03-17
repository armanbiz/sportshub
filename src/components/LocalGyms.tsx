import React from 'react';
import { MapPin } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const NEIGHBORHOODS = [
  { id: '1', name: 'Vinohrady', count: 15 },
  { id: '2', name: 'Prague 1', count: 12 },
  { id: '3', name: 'Smíchov', count: 8 },
  { id: '4', name: 'Žižkov', count: 10 },
  { id: '5', name: 'Karlín', count: 7 },
  { id: '6', name: 'Holešovice', count: 9 }
];

export default function LocalGyms() {
  return (
    <section className="py-24 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4">
            Find Gyms Near You
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 text-center mb-8 sm:mb-16 max-w-2xl mx-auto">
            Explore fitness facilities in your neighborhood
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {NEIGHBORHOODS.map((neighborhood) => (
            <AnimatedSection
              as="a"
              key={neighborhood.id}
              href={`/gyms-${neighborhood.name.toLowerCase()}`}
              className="group relative overflow-hidden rounded-xl bg-dark-card border border-white/10 hover:border-neon-green/40 transition-all duration-300 p-4 sm:p-6"
            >
              <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-neon-green mr-2" />
                    <h3 className="text-base sm:text-lg font-medium text-white">
                      {neighborhood.name}
                    </h3>
                  </div>
                  <span className="text-gray-400 text-sm sm:text-base">{neighborhood.count} gyms</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-green/0 via-neon-green/5 to-neon-green/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}