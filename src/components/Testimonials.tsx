import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { Review, Gym } from '@/types';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

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

export default function Testimonials() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalGyms: 0,
    avgRating: 0,
    totalReviews: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const { data, error } = await supabase
        .from('gyms')
        .select('google_rating, reviews');

      if (error) {
        console.error('Error fetching stats:', error);
        return;
      }

      const totalGyms = data.length;
      const totalReviews = data.reduce((sum, gym) => sum + (gym.reviews || 0), 0);
      const avgRating = data.reduce((sum, gym) => sum + (gym.google_rating || 0), 0) / totalGyms;

      setStats({
        totalGyms,
        avgRating: Number(avgRating.toFixed(1)),
        totalReviews
      });
    };

    fetchStats();
  }, []);

  return (
    <section className="py-24 bg-dark-lighter relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 sm:mb-12">
              What Our Users Say
            </h2>
            
            <div className="space-y-6 sm:space-y-8">
              {TESTIMONIALS.map((review) => (
                <AnimatedSection
                  key={review.id}
                  className="bg-dark rounded-xl p-4 sm:p-6 border border-white/10"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 text-sm sm:text-base">{review.content}</p>
                  <div className="text-xs sm:text-sm text-gray-400">
                    {review.author}, {review.location}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
          
          <AnimatedSection className="bg-dark rounded-2xl p-6 sm:p-8 border border-white/10">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">
              SportsHub in Numbers
            </h3>
            
            <div className="grid grid-cols-1 gap-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-neon-green mb-2">
                  {stats.totalGyms > 999 ? `${Math.floor(stats.totalGyms/1000)}K+` : `${stats.totalGyms}+`}
                </div>
                <div className="text-gray-400 text-sm sm:text-base">Gyms Listed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-neon-green mb-2">
                  {stats.avgRating}/5
                </div>
                <div className="text-gray-400 text-sm sm:text-base">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-neon-green mb-2">
                  {stats.totalReviews > 999 ? `${Math.floor(stats.totalReviews/1000)}K+` : `${stats.totalReviews}+`}
                </div>
                <div className="text-gray-400 text-sm sm:text-base">Total Reviews</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}