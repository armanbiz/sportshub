import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { Button as MovingButton } from './ui/moving-border';
import AnimatedSection from './AnimatedSection';
import { Gym } from '@/types';

const FEATURED_GYMS: Gym[] = [
  {
    id: '1',
    name: 'Form Factory Smíchov',
    description: 'Modern gym with state-of-the-art equipment and group classes',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop',
    rating: 4.8,
    address: 'Karla Engliše 3221/2, Prague 5',
    priceRange: '€30-50/month',
    openingHours: { Monday: '6:00-22:00' },
    amenities: ['Parking', 'Sauna', 'Personal Training'],
    neighborhood: 'Smíchov'
  },
  {
    id: '2',
    name: 'WorldClass Wenceslas Square',
    description: 'Premium fitness center in the heart of Prague',
    imageUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1375&auto=format&fit=crop',
    rating: 4.9,
    address: 'Václavské nám. 846/1, Prague 1',
    priceRange: '€50-80/month',
    openingHours: { Monday: '6:00-23:00' },
    amenities: ['Pool', 'Spa', 'Group Classes'],
    neighborhood: 'Prague 1'
  }
];

export default function FeaturedGyms() {
  return (
    <section className="py-24 bg-dark-lighter relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="text-4xl font-bold text-center text-white mb-4">
            Trending Gyms in Prague
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Discover the most popular fitness facilities loved by our community
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FEATURED_GYMS.map((gym) => (
            <AnimatedSection
              key={gym.id}
              className="bg-dark rounded-2xl overflow-hidden border border-white/10 group hover:border-neon-green/40 transition-all duration-300"
            >
              <div className="relative h-64">
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