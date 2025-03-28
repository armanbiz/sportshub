import React, { useState, useEffect } from 'react';
import { Star, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/AnimatedSection';
import { Gym } from '@/types';
import GymCard from '@/components/GymCard';
import { getGyms } from '@/lib/gyms';

interface SearchFilters {
  location: string;
  facilityType: string;
  priceRange: string;
  multisport: boolean;
  amenities: string[];
  classes: string[];
  rating: number;
}

const FACILITY_TYPES = ['Gym', 'Yoga Studio', 'CrossFit Box', 'Swimming Pool'];
const PRICE_RANGES = ['Under 700 Kč', '700-1200 Kč', '1200-2000 Kč', 'Over 2000 Kč'];
const AMENITIES = ['Sauna', 'Pool', 'Jacuzzi', 'Parking', 'Towels'];
const CLASSES = ['HIIT', 'Zumba', 'Spin', 'Yoga', 'Pilates', 'Boxing', 'CrossFit'];

export default function SearchPage() {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);

  const [expandedSections, setExpandedSections] = useState({
    amenities: false,
    classes: false
  });

  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    facilityType: '',
    priceRange: '',
    multisport: false,
    amenities: [],
    classes: [],
    rating: 0
  });

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleArrayFilter = (key: 'amenities' | 'classes', value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }));
  };

  const fetchGyms = async () => {
    setLoading(true);
    console.log('Applying filters:', filters);
    const data = await getGyms({
      location: filters.location,
      facilityType: filters.facilityType.toLowerCase(),
      priceRange: filters.priceRange,
      multisport: filters.multisport,
      rating: filters.rating,
      amenities: filters.amenities,
      classes: filters.classes
    });
    console.log('Transformed gym data:', data);
    setGyms(data);
    setLoading(false);
  };

  useEffect(() => {
    const initialFetch = async () => {
      setLoading(true);
      const data = await getGyms();
      console.log('Initial gym data:', data);
      setGyms(data);
      setLoading(false);
    };
    initialFetch();
  }, []);

  const handleApplyFilters = () => {
    console.log('Applying filters:', filters);
    fetchGyms();
  };

  return (
    <div className="pt-24 min-h-screen bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Search Gyms in Prague
          </h1>
          <p className="text-gray-400">
            Find the perfect gym that matches your preferences
          </p>
        </AnimatedSection>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Column */}
          <div className="w-full lg:w-1/3">
            <div className="bg-dark-card rounded-xl p-6 border border-white/10 sticky top-24">
              <h2 className="text-xl font-semibold text-white mb-6">Filters</h2>
              
              {/* Location */}
              <div className="mb-6">
                <label className="block text-white mb-2">Location</label>
                <input
                  type="text"
                  placeholder="Enter location"
                  className="w-full px-4 py-2 bg-white/10 rounded-lg text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-neon-green/40"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                />
              </div>

              {/* Facility Type */}
              <div className="mb-6">
                <label className="block text-white mb-2">Facility Type</label>
                <select
                  className="w-full px-4 py-2 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-neon-green/40"
                  value={filters.facilityType}
                  onChange={(e) => handleFilterChange('facilityType', e.target.value)}
                >
                  <option value="" style={{ color: 'black', backgroundColor: 'white' }}>All Types</option>
                  {FACILITY_TYPES.map(type => (
                    <option key={type} value={type} style={{ color: 'black', backgroundColor: 'white' }}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-white mb-2">Price Range</label>
                <select
                  className="w-full px-4 py-2 bg-white/10 rounded-lg text-white border border-white/20 focus:outline-none focus:border-neon-green/40"
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                >
                  <option value="" style={{ color: 'black', backgroundColor: 'white' }}>All Prices</option>
                  {PRICE_RANGES.map(range => (
                    <option key={range} value={range} style={{ color: 'black', backgroundColor: 'white' }}>{range}</option>
                  ))}
                </select>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <label className="block text-white mb-2">Minimum Rating</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-6 w-6 cursor-pointer ${
                        star <= filters.rating ? 'text-yellow-400' : 'text-gray-600'
                      }`}
                      onClick={() => handleFilterChange('rating', star)}
                    />
                  ))}
                </div>
              </div>

              {/* Multisport */}
              <div className="mb-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.multisport}
                    onChange={(e) => handleFilterChange('multisport', e.target.checked)}
                    className="form-checkbox rounded border-white/20 bg-white/10 text-[#064E41] focus:ring-0 focus:ring-offset-0"
                  />
                  <span className="text-white">Multisport Card</span>
                </label>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <button
                  className="flex items-center justify-between w-full text-white mb-2"
                  onClick={() => setExpandedSections(prev => ({ ...prev, amenities: !prev.amenities }))}
                >
                  <span>Amenities</span>
                  <span className="text-xl">{expandedSections.amenities ? '−' : '+'}</span>
                </button>
                <div className={`space-y-2 ${expandedSections.amenities ? '' : 'hidden'}`}>
                  {AMENITIES.map(amenity => (
                    <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.amenities.includes(amenity)}
                        onChange={() => handleArrayFilter('amenities', amenity)}
                        className="form-checkbox rounded border-white/20 bg-white/10 text-[#064E41] focus:ring-0 focus:ring-offset-0"
                      />
                      <span className="text-white">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Classes */}
              <div className="mb-6">
                <button
                  className="flex items-center justify-between w-full text-white mb-2"
                  onClick={() => setExpandedSections(prev => ({ ...prev, classes: !prev.classes }))}
                >
                  <span>Classes</span>
                  <span className="text-xl">{expandedSections.classes ? '−' : '+'}</span>
                </button>
                <div className={`space-y-2 ${expandedSections.classes ? '' : 'hidden'}`}>
                  {CLASSES.map(className => (
                    <label key={className} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.classes.includes(className)}
                        onChange={() => handleArrayFilter('classes', className)}
                        className="form-checkbox rounded border-white/20 bg-white/10 text-[#064E41] focus:ring-0 focus:ring-offset-0"
                      />
                      <span className="text-white">{className}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button
                className="w-full bg-neon-green hover:bg-neon-green/90 text-white/90"
                onClick={handleApplyFilters}
              >
                <Search className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Results Grid */}
          <div className="w-full lg:w-2/3">
            {loading ? (
              <div className="text-center text-gray-400">Loading gyms...</div>
            ) : gyms.length === 0 ? (
              <div className="text-center text-gray-400">No gyms found matching your criteria</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gyms.map((gym) => (
                  <AnimatedSection key={gym.id}>
                    <GymCard gym={gym} />
                  </AnimatedSection>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}