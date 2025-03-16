export interface Gym {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  rating: number;
  address: string;
  priceRange: string;
  openingHours: Record<string, string>;
  amenities: string[];
  neighborhood: string;
}

export interface SearchFilters {
  location: string;
  facilityType: string;
  priceRange: string;
  distance: number;
}

export interface Review {
  id: string;
  author: string;
  content: string;
  rating: number;
  location: string;
}