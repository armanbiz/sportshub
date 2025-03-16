import React from 'react';
import { Star } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { Review } from '@/types';

const TESTIMONIALS: Review[] = [
  {
    id: '1',
    author: 'Jan',
    content: 'Found my dream gym in 10 minutes! The comparison tool made it super easy to find exactly what I was looking for.',
    rating: 5,
    location: 'Prague'
  },
  {
    id: '2',
    author: 'Anna',
    content: 'Saved 30% with their price comparison tool. Now I have access to a great gym that fits my budget perfectly.',
    rating: 5,
    location: 'Prague'
  }
];

const STATS = [
  { label: 'Gyms Listed', value: '500+' },
  { label: 'Active Users', value: '10,000+' },
  { label: 'Avg Rating', value: '4.9/5' }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-dark-lighter relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-white mb-12">
              What Our Users Say
            </h2>
            
            <div className="space-y-8">
              {TESTIMONIALS.map((review) => (
                <AnimatedSection
                  key={review.id}
                  className="bg-dark rounded-xl p-6 border border-white/10"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">{review.content}</p>
                  <div className="text-sm text-gray-400">
                    {review.author}, {review.location}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
          
          <AnimatedSection className="bg-dark rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-8">
              SportsHub in Numbers
            </h3>
            
            <div className="grid grid-cols-1 gap-8">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-neon-green mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}