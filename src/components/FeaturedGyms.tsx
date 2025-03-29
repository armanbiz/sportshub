import React, { useEffect, useState } from 'react';
import { Star, MapPin } from 'lucide-react';
import { Button as MovingButton } from './ui/moving-border';
import AnimatedSection from './AnimatedSection';
import { Gym } from '@/types';
import { getGyms } from '@/lib/gyms';

export default function FeaturedGyms() {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedGyms = async () => {
      const data = await getGyms({ rating: 4.5 });
      setGyms(data.slice(0, 2));
      setLoading(false);
    };
    fetchFeaturedGyms();
  }, []);

  return (
    <section className="py-24 bg-dark-lighter relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-16">
        <AnimatedSection delay={0.1}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4">
            Trending Gyms in Prague
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 text-center mb-8 sm:mb-16 max-w-2xl mx-auto">
            Discover the most popular fitness facilities loved by our community
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {loading ? (
            <div className="col-span-2 text-center text-gray-400">Loading featured gyms...</div>
          ) : gyms.map((gym) => (
            <AnimatedSection
              key={gym.id}
              delay={0.2}
              className="bg-dark rounded-2xl overflow-hidden border border-white/10 group hover:border-neon-green/40 transition-all duration-300"
            >
              <div className="relative h-48 sm:h-64">
                <img
                  src={gym.imageUrl}
                  alt={gym.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent" />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-white">{gym.name}</h3>
                  <div className="flex items-center bg-white/10 px-2 py-1 rounded">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-white">{gym.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-400 mb-4">{gym.description}</p>
                
                <div className="flex items-center text-gray-400 mb-6">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{gym.address}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-neon-green font-medium">{gym.priceRange}</span>
                  <MovingButton
                    borderRadius="0.5rem"
                    containerClassName="w-[120px] h-10"
                    className="bg-neon-green hover:bg-neon-green/90 text-white/90 h-full px-4"
                  >
                    View Details
                  </MovingButton>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}