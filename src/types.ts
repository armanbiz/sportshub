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

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  published: boolean;
  featured_image?: string;
  author_id: string;
  created_at: string;
  updated_at: string;
  categories?: Category[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}