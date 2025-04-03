import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Gym } from '@/types';
import L from 'leaflet';
import { Button } from './ui/button';

// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface GymMapProps {
  gyms: Gym[];
  onGymSelect?: (gym: Gym) => void;
  onCompareToggle?: (gym: Gym) => void;
  selectedGyms?: Gym[];
}

export default function GymMap({ gyms, onGymSelect, onCompareToggle, selectedGyms = [] }: GymMapProps) {
  // Filter out gyms without coordinates
  const gymsWithCoordinates = gyms.filter(
    gym => gym.latitude !== null && gym.longitude !== null
  );

  const handleMarkerClick = (gym: Gym) => {
    if (onGymSelect) {
      onGymSelect(gym);
    }
  };

  // Calculate center of the map based on first gym or default to Prague center
  const defaultCenter: [number, number] = [50.0755, 14.4378]; // Prague center coordinates
  const center = gymsWithCoordinates.length > 0
    ? [gymsWithCoordinates[0].latitude, gymsWithCoordinates[0].longitude] as [number, number]
    : defaultCenter;

  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden border border-white/10 relative z-0">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        className="map-dark"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {gymsWithCoordinates.map((gym) => (
          <Marker
            key={gym.id}
            position={[gym.latitude!, gym.longitude!]}
            eventHandlers={{
              click: () => handleMarkerClick(gym)
            }}
          >
            <Popup className="dark-popup">
              <div className="p-3 bg-dark text-white rounded-lg">
                <h3 className="font-semibold text-base mb-2">{gym.name}</h3>
                <p className="text-sm text-gray-300 mb-1">{gym.address}</p>
                <p className="text-sm text-gray-300 mb-2">Rating: {gym.rating}/5</p>
                <div className="flex flex-col gap-2">
                  {onCompareToggle && (
                    <Button
                      onClick={() => onCompareToggle(gym)}
                      className={`w-full ${
                        selectedGyms.some(g => g.id === gym.id)
                          ? 'bg-red-500 hover:bg-red-600'
                          : 'bg-neon-green hover:bg-neon-green/90'
                      } text-white/90`}
                    >
                      {selectedGyms.some(g => g.id === gym.id) ? 'Remove from Compare' : 'Add to Compare'}
                    </Button>
                  )}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${gym.latitude},${gym.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neon-green hover:text-neon-green/80 text-center"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}