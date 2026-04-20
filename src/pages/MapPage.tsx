import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Building2, Landmark, Monitor, Navigation } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCMR961vwN6oeqV7wDzeDU0jnH9YI_r6Ns';

type ServiceType = 'government+offices' | 'banks' | 'cyber+cafe';

export function MapPage() {
  const { t } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeService, setActiveService] = useState<ServiceType>('government+offices');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const serviceTypes = [
    { key: 'map.govOffices', icon: Building2, query: 'government+offices' as ServiceType },
    { key: 'map.banks', icon: Landmark, query: 'banks' as ServiceType },
    { key: 'map.cyberCafe', icon: Monitor, query: 'cyber+cafe' as ServiceType },
  ];

  useEffect(() => {
    if ((window as any).google?.maps) {
      setMapLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setMapLoaded(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setUserLocation({ lat: 28.6139, lng: 77.2090 })
    );
  }, []);

  useEffect(() => {
    if (!mapLoaded || !userLocation || !mapRef.current) return;
    const g = (window as any).google;
    if (!g?.maps) return;

    const map = new g.maps.Map(mapRef.current, {
      center: userLocation,
      zoom: 14,
    });

    new g.maps.Marker({
      position: userLocation,
      map,
      title: 'You',
      icon: {
        path: g.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: '#2563EB',
        fillOpacity: 1,
        strokeColor: '#fff',
        strokeWeight: 2,
      },
    });

    const service = new g.maps.places.PlacesService(map);
    const searchQuery = activeService.replace(/\+/g, ' ');
    service.nearbySearch(
      { location: userLocation, radius: 5000, keyword: searchQuery },
      (results: any[], status: string) => {
        if (status === g.maps.places.PlacesServiceStatus.OK && results) {
          results.forEach((place: any) => {
            if (place.geometry?.location) {
              const marker = new g.maps.Marker({
                position: place.geometry.location,
                map,
                title: place.name,
              });
              const info = new g.maps.InfoWindow({
                content: `<div style="color:#111827;font-size:13px"><strong>${place.name}</strong><br/>${place.vicinity || ''}</div>`,
              });
              marker.addListener('click', () => info.open(map, marker));
            }
          });
        }
      }
    );
  }, [mapLoaded, userLocation, activeService]);

  return (
    <div className="px-4 pb-6 space-y-4">
      <h1 className="text-lg font-bold text-foreground">{t('map.title')}</h1>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {serviceTypes.map(service => {
          const Icon = service.icon;
          const isActive = activeService === service.query;
          return (
            <button
              key={service.key}
              onClick={() => setActiveService(service.query)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium whitespace-nowrap transition-colors ${
                isActive ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'
              }`}
            >
              <Icon size={14} />
              {t(service.key)}
            </button>
          );
        })}
      </div>

      <div ref={mapRef} className="w-full h-[400px] rounded-md border border-border bg-secondary" />

      {!userLocation && (
        <div className="card-civic p-4 flex items-center gap-3">
          <Navigation size={18} className="text-primary animate-pulse" />
          <p className="text-sm text-muted-foreground">Getting your location...</p>
        </div>
      )}
    </div>
  );
}
