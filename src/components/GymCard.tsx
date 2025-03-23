import React from 'react';
import { Star, MapPin, Clock } from 'lucide-react';
import { Gym } from '../types';

interface GymCardProps {
  gym: Gym;
}

export default function GymCard({ gym }: GymCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={gym.imageUrl}
        alt={gym.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{gym.name}</h3>
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="ml-1 text-gray-600">{gym.rating}</span>
          </div>
        </div>
        <p className="mt-1 text-gray-500">{gym.description}</p>
        <div className="mt-4 flex items-center text-gray-500">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{gym.address}</span>
        </div>
        <div className="mt-2 flex items-center text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          <span className="text-sm">Open today: {gym.openingHours['Monday']}</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-indigo-600 font-medium">{gym.priceRange}</span>
          <button className="px-4 py-2 bg-[#064E41] text-white rounded-md hover:bg-[#064E41]/90 border border-[#064E41]/20 shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#064E41]">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}