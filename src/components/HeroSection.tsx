import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { Button } from './ui/button';
import SearchBar from './SearchBar';
import AnimatedSection from './AnimatedSection';
import { SearchFilters } from '@/types';

const BACKGROUND_IMAGES = [
  '/BackgroundImages/Image1.jpg',
  '/BackgroundImages/Image2.jpg'
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [filters, setFilters] = React.useState<SearchFilters>({
    location: '',
    facilityType: '',
    priceRange: '',
    distance: 5
  });

  const handleSearch = () => {
    console.log('Searching with filters:', filters);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === BACKGROUND_IMAGES.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <script type="application/ld+json">
        {`${JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "SportsHub",
          "url": "https://sportshub.cz",
          "description": "Compare gyms, prices, and amenities in Prague. Book your perfect gym instantly.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://sportshub.cz/search?q={q}",
            "query-input": "required name=q"
          }
        })}`}
      </script>
      <div className="absolute inset-0 overflow-hidden">
        {BACKGROUND_IMAGES.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Background ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-dark/80" />
      </div>
      
      <div className="relative max-w-7xl mx-auto text-center">
        <AnimatedSection>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 px-4">
            Find Your Perfect Gym in Prague Compare Prices & Amenities
          </h1>
        </AnimatedSection>
        
        <AnimatedSection>
          <p className="text-lg sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12 px-4">
            Search gyms by neighborhood, price, or amenities. Book instantly!
          </p>
        </AnimatedSection>
        
        <AnimatedSection>
          <SearchBar
            filters={filters}
            setFilters={setFilters}
            onSearch={handleSearch}
          />
        </AnimatedSection>
      </div>
    </div>
  );
}