import React from 'react';
import { Search, BarChart2, Calendar } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const steps = [
  {
    icon: Search,
    title: 'Search',
    description: 'Filter by location, budget, or amenities.'
  },
  {
    icon: BarChart2,
    title: 'Compare',
    description: 'View ratings, photos, and real user reviews.'
  },
  {
    icon: Calendar,
    title: 'Book',
    description: 'Reserve your spot or claim a free trial.'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            How It Works
          </h2>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <AnimatedSection
              key={step.title}
              className="relative p-6 rounded-2xl bg-dark-card border border-neon-green/20 hover:border-neon-green/40 transition-colors group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-neon-green/5 to-transparent rounded-2xl" />
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-neon-green/10 flex items-center justify-center mb-4 group-hover:bg-neon-green/20 transition-colors">
                  <step.icon className="w-6 h-6 text-neon-green" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}