import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { supabase } from '@/lib/supabase';
import { useNavigate, Link } from 'react-router-dom';

interface Neighborhood {
  name: string;
  count: number;
}

export default function LocalGyms() {
  const navigate = useNavigate();
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);

  useEffect(() => {
    const fetchNeighborhoods = async () => {
      const { data, error } = await supabase
        .from('gyms')
        .select('neighborhood')
        .not('neighborhood', 'is', null)
        .not('neighborhood', 'eq', '');

      if (error) {
        console.error('Error fetching neighborhoods:', error);
        return;
      }

      // Count gyms per neighborhood
      const counts = data.reduce((acc: Record<string, number>, gym) => {
        if (gym.neighborhood) {
          acc[gym.neighborhood] = (acc[gym.neighborhood] || 0) + 1;
        }
        return acc;
      }, {});

      // Convert to array and sort by count
      const neighborhoodArray = Object.entries(counts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6); // Only take top 6 neighborhoods

      setNeighborhoods(neighborhoodArray);
    };

    fetchNeighborhoods();
  }, []);

  const handleNeighborhoodClick = (neighborhood: string) => {
    navigate(`/search?location=${encodeURIComponent(neighborhood)}`);
  };

  return (
    <section className="py-24 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection delay={0.1}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4">
            Find Gyms Near You
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 text-center mb-8 sm:mb-16 max-w-2xl mx-auto">
            Explore fitness facilities in your neighborhood
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {neighborhoods.map((neighborhood, index) => (
            <Link
              to={`/search?location=${encodeURIComponent(neighborhood.name)}`}
              key={index}
              onClick={() => window.scrollTo(0, 0)}
              className="block"
              delay={0.1 * (index + 1)}
            >
              <AnimatedSection className="group relative overflow-hidden rounded-xl bg-dark-card border border-white/10 hover:border-neon-green/40 transition-all duration-300 p-4 sm:p-6 cursor-pointer">
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}