import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Star } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { Gym } from '@/types';

export default function ComparisonPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const gyms = location.state?.gyms as Gym[];
  const fromSearch = location.state?.fromSearch;

  if (!gyms || gyms.length < 2) {
    return (
      <div className="pt-24 min-h-screen bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            Please select at least 2 gyms to compare
          </div>
          <Button
            onClick={() => navigate('/search')}
            className="mt-4 bg-neon-green hover:bg-neon-green/90 text-white/90"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>
        </div>
      </div>
    );
  }

  const factors = [
    { key: 'name', label: 'Name' },
    { key: 'type', label: 'Facility Type' },
    { key: 'rating', label: 'Rating' },
    { key: 'reviews', label: 'Reviews' },
    { key: 'priceRange', label: 'Price Range' },
    { key: 'multisport', label: 'Multisport Card' },
    { key: 'address', label: 'Location' },
    { key: 'neighborhood', label: 'Neighborhood' },
    { key: 'phone', label: 'Phone' },
    { key: 'amenities', label: 'Amenities' },
    { key: 'classes', label: 'Classes' }
  ];

  return (
    <div className="pt-24 min-h-screen bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-8">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/search', { 
                state: { selectedGyms: fromSearch ? gyms : [] }
              })}
              className="bg-neon-green hover:bg-neon-green/90 text-white/90"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Button>
            <h1 className="text-3xl font-bold text-white">
              Comparing {gyms.length} Gyms
            </h1>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-4 text-left text-gray-400 font-medium border-b border-white/10">
                  </th>
                  {gyms.map((gym) => (
                    <th
                      key={gym.id}
                      className="p-4 text-left text-gray-400 font-medium border-b border-white/10"
                    >
                      <img
                        src={gym.imageUrl}
                        alt={gym.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {factors.map((factor) => (
                  <tr key={factor.key} className="border-b border-white/10">
                    <td className="p-4 text-white font-medium">
                      {factor.label}
                    </td>
                    {gyms.map((gym) => (
                      <td key={gym.id} className="p-4 text-gray-300">
                        {factor.key === 'rating' ? (
                          <div className="flex items-center">
                            <Star className="h-5 w-5 text-yellow-400 mr-1" />
                            <span>{gym[factor.key]}</span>
                          </div>
                        ) : factor.key === 'multisport' ? (
                          gym[factor.key] ? 'Yes' : 'No'
                        ) : factor.key === 'amenities' || factor.key === 'classes' ? (
                          <ul className="list-disc list-inside">
                            {gym[factor.key].map((item: string) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          gym[factor.key]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}