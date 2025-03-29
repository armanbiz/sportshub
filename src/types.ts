export interface Gym {
  id: string;
  name: string; // maps to gym_name
  imageUrl: string; // maps to photo_link
  rating: number; // maps to google_rating
  reviews: number;
  address: string; // maps to full_address
  priceRange: string;
  openingHours: Record<string, string>;
  amenities: string[];
  neighborhood: string;
  type: string;
  classes: string[];
  latitude: number | null;
  longitude: number | null;
  website: string; // maps to website_link
  logo: string; // maps to logo_link
  phone: string;
  postalCode: string;
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

export interface FacilityType {
  value: string;
  label: string;
}