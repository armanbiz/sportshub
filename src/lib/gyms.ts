import { supabase } from './supabase';
import { Gym } from '@/types';

interface GymData {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  rating: number | null;
  address: string;
  price_range: string | null;
  neighborhood: string | null;
  multisport: boolean;
  facility_type: string | null;
  gym_hours: Array<{ day: string; open_time: string; close_time: string }>;
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
        *,
        gym_hours!inner (
          day,
          open_time,
          close_time
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
        query = query.or(`address.ilike.%${filters.location}%,neighborhood.ilike.%${filters.location}%`);
      }
      if (filters.facilityType) {
        query = query.eq('facility_type', filters.facilityType);
      }
      if (filters.priceRange) {
        query = query.eq('price_range', filters.priceRange);
      }
      if (filters.multisport) {
        query = query.eq('multisport', true);
      }
      if (filters.rating) {
        query = query.gte('rating', filters.rating);
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
      name: gym.name,
      description: gym.description || 'No description available',
      imageUrl: gym.image_url || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop',
      rating: gym.rating || 0,
      address: gym.address,
      priceRange: gym.price_range || 'Price not available',
      openingHours: gym.gym_hours?.reduce((acc: Record<string, string>, hour) => {
        acc[hour.day] = `${hour.open_time.slice(0, 5)}-${hour.close_time.slice(0, 5)}`;
        return acc;
      }, {}) || { 'Monday': '06:00-22:00' },
      amenities: gym.gym_amenities?.map(a => a.amenity) || [],
      neighborhood: gym.neighborhood || 'Location not specified',
      multisport: gym.multisport || false,
      facilityType: gym.facility_type || 'General Gym',
      classes: gym.gym_classes?.map(c => c.class_name) || []
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