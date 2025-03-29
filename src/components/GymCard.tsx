import React from 'react';
import { Star, MapPin, Clock, Phone } from 'lucide-react';
import { Gym } from '../types';

interface GymCardProps {
  gym: Gym;
  onCompareToggle?: (gym: Gym) => void;
  isSelected?: boolean;
  isHighlighted?: boolean;
}

export default function GymCard({ gym, onCompareToggle, isSelected, isHighlighted }: GymCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
      isHighlighted ? 'ring-4 ring-neon-green' : ''
    }`}>
      <div className="relative">
        <img
          src={gym.imageUrl || gym.logo || '/default-gym.jpg'}
          alt={gym.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 group">
          <button
            className={`w-8 h-8 rounded-full ${
              isSelected ? 'bg-red-500' : 'bg-[#064E41]'
            } text-white flex items-center justify-center hover:opacity-90 transition-all duration-300 group-hover:w-24 group-hover:rounded-lg`}
            onClick={() => onCompareToggle?.(gym)}
          >
            <span className="text-xl leading-none flex items-center justify-center group-hover:hidden">
              {isSelected ? '×' : '+'}
            </span>
            <span className="hidden group-hover:block text-sm font-medium">
              {isSelected ? 'Remove' : 'Compare'}
            </span>
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{gym.name}</h3>
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="ml-1 text-gray-600">{gym.rating} ({gym.reviews} reviews)</span>
          </div>
        </div>
        <p className="mt-1 text-gray-500">{gym.type}</p>
        <div className="mt-4 flex items-center text-gray-500">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{gym.address}</span>
        </div>
        {gym.phone && (
          <div className="mt-2 flex items-center text-gray-500">
            <Phone className="h-4 w-4 mr-1" />
            <span className="text-sm">{gym.phone}</span>
          </div>
        )}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-indigo-600 font-medium">{gym.priceRange}</span>
          <a 
            href={gym.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#064E41] text-white rounded-md hover:bg-[#064E41]/90 border border-[#064E41]/20 shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#064E41]"
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  );
}