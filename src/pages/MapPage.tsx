import { useLanguage } from '@/contexts/LanguageContext';
import { Building2, Landmark, Monitor, Navigation, Star } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCMR961vwN6oeqV7wDzeDU0jnH9YI_r6Ns';

// Nashik, Maharashtra default
const NASHIK_LOCATION = { lat: 19.9975, lng: 73.7898 };

type ServiceKey = 'banks' | 'csc' | 'cyber';

interface ServiceConfig {
  key: ServiceKey;
  labelKey: string;
  icon: typeof Building2;
  type?: string;
  keywords: string[];
}

const SERVICES: ServiceConfig[] = [
  { key: 'banks', labelKey: 'map.banks', icon: Landmark, type: 'bank', keywords: ['bank'] },
  {
    key: 'csc',
    labelKey: 'map.csc',
    icon: Building2,
    keywords: ['common service center', 'csc', 'maha e seva kendra'],
  },
  { key: 'cyber', labelKey: 'map.cyberCafe', icon: Monitor, keywords: ['cyber cafe', 'internet cafe'] },
];

interface PlaceResult {
  name: string;
  address: string;
  rating?: number;
}

export function MapPage() {
  const { t } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeService, setActiveService] = useState<ServiceKey>('banks');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [places, setPlaces] = useState<PlaceResult[]>([]);
  const [usingDefault, setUsingDefault] = useState(true);

  // Load Google Maps script
  useEffect(() => {
    if ((window as any).google?.maps) {
      setMapLoaded(true);
      return;
    }
    const existing = document.querySelector('script[data-gmaps="1"]');
    if (existing) {
      existing.addEventListener('load', () => setMapLoaded(true));
      return;
    }
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.dataset.gmaps = '1';
    script.onload = () => setMapLoaded(true);
    document.head.appendChild(script);
  }, []);

  // Default to Nashik, then try to override with user location
  useEffect(() => {
    setUserLocation(NASHIK_LOCATION);
    setUsingDefault(true);
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setUsingDefault(false);
      },
      () => {
        // Keep Nashik as fallback
      },
      { timeout: 5000 }
    );
  }, []);

  // Initialize map once
  useEffect(() => {
    if (!mapLoaded || !userLocation || !mapRef.current) return;
    const g = (window as any).google;
    if (!g?.maps) return;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new g.maps.Map(mapRef.current, {
        center: userLocation,
        zoom: 13,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });
    } else {
      mapInstanceRef.current.setCenter(userLocation);
    }

    new g.maps.Marker({
      position: userLocation,
      map: mapInstanceRef.current,
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
  }, [mapLoaded, userLocation]);

  // Search places when service or location changes
  useEffect(() => {
    if (!mapLoaded || !userLocation || !mapInstanceRef.current) return;
    const g = (window as any).google;
    if (!g?.maps?.places) return;

    // Clear previous markers
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
    setPlaces([]);

    const config = SERVICES.find((s) => s.key === activeService)!;
    const service = new g.maps.places.PlacesService(mapInstanceRef.current);

    const collected: any[] = [];
    let pending = config.keywords.length;

    const finalize = () => {
      // Deduplicate by place_id, keep top results
      const seen = new Set<string>();
      const unique = collected.filter((p) => {
        const id = p.place_id || `${p.name}-${p.vicinity}`;
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
      });

      // Sort by rating desc when available
      unique.sort((a, b) => (b.rating || 0) - (a.rating || 0));

      const top = unique.slice(0, 12);
      top.forEach((place: any) => {
        if (!place.geometry?.location) return;
        const marker = new g.maps.Marker({
          position: place.geometry.location,
          map: mapInstanceRef.current,
          title: place.name,
        });
        const info = new g.maps.InfoWindow({
          content: `<div style="color:#111827;font-size:13px;max-width:220px"><strong>${place.name}</strong><br/>${place.vicinity || ''}${place.rating ? `<br/>★ ${place.rating}` : ''}</div>`,
        });
        marker.addListener('click', () => info.open(mapInstanceRef.current, marker));
        markersRef.current.push(marker);
      });

      setPlaces(
        top.slice(0, Math.max(3, top.length)).map((p: any) => ({
          name: p.name,
          address: p.vicinity || '',
          rating: p.rating,
        }))
      );
    };

    config.keywords.forEach((kw) => {
      const request: any = {
        location: userLocation,
        radius: 5000,
        keyword: kw,
      };
      if (config.type) request.type = config.type;

      service.nearbySearch(request, (results: any[], status: string) => {
        if (status === g.maps.places.PlacesServiceStatus.OK && results) {
          collected.push(...results);
        }
        pending -= 1;
        if (pending === 0) finalize();
      });
    });
  }, [mapLoaded, userLocation, activeService]);

  return (
    <div className="px-4 pb-6 space-y-4">
      <h1 className="text-lg font-bold text-foreground">{t('map.title')}</h1>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          const isActive = activeService === service.key;
          return (
            <button
              key={service.key}
              onClick={() => setActiveService(service.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium whitespace-nowrap transition-colors ${
                isActive ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'
              }`}
            >
              <Icon size={14} />
              {t(service.labelKey)}
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

      {places.length > 0 && (
        <div className="space-y-2">
          {places.map((p, idx) => (
            <div
              key={`${p.name}-${idx}`}
              className="card-civic p-3 animate-fade-in-up"
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{p.name}</p>
                  {p.address && (
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{p.address}</p>
                  )}
                </div>
                {typeof p.rating === 'number' && (
                  <div className="flex items-center gap-1 text-xs text-foreground shrink-0">
                    <Star size={12} className="text-primary fill-primary" />
                    {p.rating.toFixed(1)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {usingDefault && (
        <p className="text-[11px] text-muted-foreground text-center">Showing results near Nashik, Maharashtra</p>
      )}
    </div>
  );
}
