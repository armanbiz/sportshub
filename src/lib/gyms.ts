import { supabase } from './supabase';
import { Gym, FacilityType } from '@/types';

interface GymData {
  id: string;
  gym_name: string;
  full_address: string;
  google_rating: number | null;
  reviews: number | null;
  longitude: number | null;
  latitude: number | null;
  type: string | null;
  price_range: string | null;
  logo_link: string | null;
  photo_link: string | null;
  website_link: string | null;
  country_code: string | null;
  neighborhood: string | null;
  postal_code: string | null;
  phone: string | null;
  gym_hours: Array<{ day: string; hours: string }>;
  gym_amenities: Array<{ amenity: string }>;
  gym_classes: Array<{ class_name: string }>;
}

export async function getGyms(filters?: {
  location?: string;
  facilityType?: string;
  priceRange?: string;
  multisport?: boolean;
  rating?: number;
  amenities?: string[];
  classes?: string[];
}) {
  try {
    console.log('Fetching gyms with filters:', filters);

    // Start building the query
    let query = supabase
      .from('gyms')
      .select(`
        id,
        gym_name,
        full_address,
        google_rating,
        reviews,
        longitude,
        latitude,
        type,
        price_range,
        logo_link,
        photo_link,
        website_link,
        country_code,
        neighborhood,
        postal_code,
        phone,
        gym_hours (
          day, 
          hours
        ),
        gym_amenities (
          amenity
        ),
        gym_classes (
          class_name
        )
      `);

    // Apply filters
    if (filters) {
      if (filters.location) {
        query = query.or(`full_address.ilike.%${filters.location}%,neighborhood.ilike.%${filters.location}%,postal_code.ilike.%${filters.location}%`);
      }
      if (filters.facilityType) {
        query = query.ilike('type', `%${filters.facilityType}%`);
      }
      if (filters.priceRange) {
        query = query.eq('price_range', filters.priceRange);
      }
      if (filters.rating) {
        query = query.gte('google_rating', filters.rating);
      }
    }

    // Execute the query
    const { data: gymsData, error } = await query;

    if (error) {
      console.error('Supabase query error:', error);
      throw error;
    }

    console.log('Raw gyms data:', gymsData);

    if (!gymsData) {
      console.log('No gyms found');
      return [];
    }

    // Post-query filtering for amenities and classes
    let filteredGyms = gymsData;
    if (filters?.amenities?.length) {
      filteredGyms = filteredGyms.filter(gym => 
        filters.amenities!.every(amenity =>
          gym.gym_amenities?.some(a => a.amenity === amenity)
        )
      );
    }
    if (filters?.classes?.length) {
      filteredGyms = filteredGyms.filter(gym =>
        filters.classes!.every(className =>
          gym.gym_classes?.some(c => c.class_name === className)
        )
      );
    }

    // Transform the filtered data
    return filteredGyms.map((gym: GymData): Gym => ({
      id: gym.id,
      name: gym.gym_name || 'Unknown Gym',
      imageUrl: gym.photo_link || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
      logo: gym.logo_link || '',
      latitude: gym.latitude,
      longitude: gym.longitude,
      rating: gym.google_rating || 0,
      reviews: gym.reviews || 0,
      address: gym.full_address || 'Address not available',
      priceRange: gym.price_range || 'Price not available',
      openingHours: gym.gym_hours?.reduce((acc: Record<string, string>, hour) => {
        acc[hour.day] = hour.hours;
        return acc;
      }, {}),
      amenities: gym.gym_amenities?.map(a => a.amenity) || [],
      neighborhood: gym.neighborhood || 'Location not specified',
      type: gym.type || 'General Gym',
      classes: gym.gym_classes?.map(c => c.class_name) || [],
      website: gym.website_link || '',
      phone: gym.phone || '',
      postalCode: gym.postal_code || 'Postal code not available'
    }));
  } catch (error) {
    console.error('Error in getGyms:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Stack trace:', error.stack);
    }
    return [];
  }
}

export async function getFacilityTypes(): Promise<FacilityType[]> {
  try {
    const { data, error } = await supabase
      .from('gyms')
      .select('type')
      .not('type', 'is', null)
      .order('type');

    if (error) throw error;

    // Get unique types and remove nulls
    const uniqueTypes = [...new Set(data.map(item => item.type))].filter(Boolean);
    
    return uniqueTypes.map(type => ({
      value: type,
      label: type.charAt(0).toUpperCase() + type.slice(1)
    }));
  } catch (error) {
    console.error('Error fetching facility types:', error);
    return [];
  }
}