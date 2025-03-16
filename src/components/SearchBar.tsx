import React from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { Button as MovingButton, MovingBorder } from './ui/moving-border';
import { SearchFilters } from '../types';

interface SearchBarProps {
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  onSearch: () => void;
}

export default function SearchBar({ filters, setFilters, onSearch }: SearchBarProps) {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-3 bg-white/10 backdrop-blur-lg p-3 rounded-xl border border-neon-green/20 relative overflow-hidden">
        <div className="absolute inset-0">
          <MovingBorder duration={4000} rx="12px" ry="12px">
            <div className="h-32 w-32 opacity-[0.8] bg-[radial-gradient(var(--tw-gradient-stops))] from-neon-green via-neon-green/30 to-transparent blur-md" />
          </MovingBorder>
        </div>
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-white/60" />
          <input
            type="text"
            placeholder="Location in Prague"
            className="w-full pl-10 pr-3 py-3 bg-white/5 text-white placeholder-white/60 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-neon-green/30 transition-all"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          />
        </div>
        <div className="flex-1 relative">
          <Filter className="absolute left-3 top-3 h-5 w-5 text-white/60" />
          <select
            className="w-full pl-10 pr-3 py-3 bg-white/5 text-white border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-neon-green/30 transition-all appearance-none"
            value={filters.facilityType}
            onChange={(e) => setFilters({ ...filters, facilityType: e.target.value })}
          >
            <option value="">All Facilities</option>
            <option value="gym">Gym</option>
            <option value="yoga">Yoga Studio</option>
            <option value="pool">Swimming Pool</option>
            <option value="crossfit">CrossFit Box</option>
          </select>
        </div>
        <MovingButton
          borderRadius="0.5rem"
          containerClassName="w-[120px] h-12"
          className="bg-neon-green hover:bg-neon-green/90 text-white/90 h-full px-4"
          onClick={onSearch}
        >
          <div className="flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Search
          </div>
        </MovingButton>
      </div>
    </div>
  );
}