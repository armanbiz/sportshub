import React, { useState, useEffect, useCallback } from 'react';
import { Star, Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/AnimatedSection';
import { Gym, FacilityType } from '@/types';
import GymMap from '@/components/GymMap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GymCard from '@/components/GymCard';
import { PRICE_RANGES, AMENITIES, CLASSES } from '@/lib/constants';
import { getGyms, getFacilityTypes } from '@/lib/gyms';

interface SearchFilters {
  location: string;
  gymName: string;
  facilityType: string;
  priceRange: string;
  multisport: boolean;
  amenities: string[];
  classes: string[];
  rating: number;
}

export default function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGyms, setSelectedGyms] = useState<Gym[]>(
    location.state?.selectedGyms || []
  );
  const [showWarning, setShowWarning] = useState(false);
  const [facilityTypes, setFacilityTypes] = useState<FacilityType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const gymsPerPage = 8;
  const [showFilters, setShowFilters] = useState(false);
  const urlSearchParams = new URLSearchParams(window.location.search);
  const [selectedGymId, setSelectedGymId] = useState<string | null>(null);

  useEffect(() => {
    const loadFacilityTypes = async () => {
      const types = await getFacilityTypes();
      setFacilityTypes(types);
    };
    loadFacilityTypes();
  }, []);

  const [expandedSections, setExpandedSections] = useState({
    amenities: false,
    classes: false
  });

  const [filters, setFilters] = useState<SearchFilters>({
    location: urlSearchParams.get('location') || '',
    gymName: '',
    facilityType: urlSearchParams.get('facilityType') || '',
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
      gymName: filters.gymName,
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
      // Apply URL parameters to initial fetch
      const data = await getGyms({
        location: filters.location,
        facilityType: filters.facilityType.toLowerCase()
      });
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

  const handleCompareToggle = (gym: Gym) => {
    setSelectedGyms(prev => {
      const isSelected = prev.some(g => g.id === gym.id);
      
      if (isSelected) {
        return prev.filter(g => g.id !== gym.id);
      }
      
      if (prev.length >= 3) {
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 3000);
        return prev;
      }
      
      return [...prev, gym];
    });
  };

  const handleCompare = () => {
    console.log('Comparing gyms:', selectedGyms);
    navigate('/compare', { 
      state: { 
        gyms: selectedGyms,
        fromSearch: true 
      } 
    });
  };

  // Get current gyms
  const indexOfLastGym = currentPage * gymsPerPage;
  const indexOfFirstGym = indexOfLastGym - gymsPerPage;
  const currentGyms = gyms.slice(indexOfFirstGym, indexOfLastGym);
  const totalPages = Math.ceil(gyms.length / gymsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-24 min-h-screen bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Search Gyms in Prague
          </h1>
          {showWarning && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-2 rounded-lg mb-4">
              You cannot select more than 3 items to compare.
            </div>
          )}
          <p className="text-gray-400 mb-4">
            Find the perfect gym that matches your preferences
          </p>
          <Button
            className="lg:hidden w-full bg-neon-green hover:bg-neon-green/90 text-white/90"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </AnimatedSection>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Column */}
          <div className={`w-full lg:w-1/3 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            {selectedGyms.length >= 2 && (
              <div className="mb-4">
                <Button
                  className="w-full bg-neon-green hover:bg-neon-green/90 text-white/90"
                  onClick={handleCompare}
                >
                  Compare {selectedGyms.length} Gyms
                </Button>
              </div>
            )}
            <div className="bg-dark-card rounded-xl p-6 border border-white/10 sticky top-24">
              <h2 className="text-xl font-semibold text-white mb-6">Filters</h2>
              
              {/* Gym Name */}
              <div className="mb-6">
                <label className="block text-white mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Search by gym name"
                  className="w-full px-4 py-2 bg-white/10 rounded-lg text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-neon-green/40"
                  value={filters.gymName}
                  onChange={(e) => handleFilterChange('gymName', e.target.value)}
                />
              </div>
              
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
                  {facilityTypes.map(type => (
                    <option key={type.value} value={type.value} style={{ color: 'black', backgroundColor: 'white' }}>
                      {type.label.charAt(0).toUpperCase() + type.label.slice(1)}
                    </option>
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
              <>
                <AnimatedSection className="mb-8">
                  <GymMap
                    gyms={gyms}
                    onGymSelect={(gym) => setSelectedGymId(gym.id)}
                    onCompareToggle={handleCompareToggle}
                    selectedGyms={selectedGyms}
                  />
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {currentGyms.map((gym) => (
                    <AnimatedSection key={gym.id}>
                      <GymCard
                        gym={gym}
                        onCompareToggle={handleCompareToggle}
                        isSelected={selectedGyms.some(g => g.id === gym.id)}
                        isHighlighted={gym.id === selectedGymId}
                      />
                    </AnimatedSection>
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-4">
                    <Button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="text-black bg-white hover:bg-white/90 border-white/20"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    <div className="flex items-center space-x-2">
                      {/* First page */}
                      <Button
                        onClick={() => paginate(1)}
                        variant={currentPage === 1 ? "default" : "outline"}
                        className={`w-10 h-10 ${
                          currentPage === 1
                           ? "!bg-[#064E41] hover:!bg-[#064E41]/90 !text-white"
                            : "border-white/20"
                        } text-black bg-white hover:bg-white/90`}
                      >
                        1
                      </Button>

                      {/* Left ellipsis */}
                      {currentPage > 3 && <span className="text-white">...</span>}

                      {/* Pages around current page */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(number => {
                          if (number === 1 || number === totalPages) return false;
                          return Math.abs(currentPage - number) <= 1;
                        })
                        .map(number => (
                          <Button
                            key={number}
                            onClick={() => paginate(number)}
                            variant={currentPage === number ? "default" : "outline"}
                            className={`w-10 h-10 ${
                              currentPage === number
                               ? "!bg-[#064E41] hover:!bg-[#064E41]/90 !text-white"
                                : "border-white/20"
                            } text-black bg-white hover:bg-white/90`}
                          >
                            {number}
                          </Button>
                        ))}

                      {/* Right ellipsis */}
                      {currentPage < totalPages - 2 && <span className="text-white">...</span>}

                      {/* Last page */}
                      {totalPages > 1 && (
                        <Button
                          onClick={() => paginate(totalPages)}
                          variant={currentPage === totalPages ? "default" : "outline"}
                          className={`w-10 h-10 ${
                            currentPage === totalPages
                             ? "!bg-[#064E41] hover:!bg-[#064E41]/90 !text-white"
                              : "border-white/20"
                          } text-black bg-white hover:bg-white/90`}
                        >
                          {totalPages}
                        </Button>
                      )}
                    </div>
                    
                    <Button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="text-black bg-white hover:bg-white/90 border-white/20"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}