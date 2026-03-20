import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Building2, Landmark, Monitor, ExternalLink } from 'lucide-react';

export function MapPage() {
  const { t } = useLanguage();

  const serviceTypes = [
    { key: 'map.govOffices', icon: Building2, query: 'government+offices+near+me' },
    { key: 'map.banks', icon: Landmark, query: 'banks+near+me' },
    { key: 'map.cyberCafe', icon: Monitor, query: 'cyber+cafe+near+me' },
  ];

  return (
    <div className="px-4 pb-6 space-y-4">
      <h1 className="text-lg font-bold text-foreground">{t('map.title')}</h1>

      <div className="card-civic p-4 flex items-center gap-3">
        <MapPin size={20} className="text-primary" />
        <p className="text-sm text-muted-foreground">{t('map.comingSoon')}</p>
      </div>

      <div className="space-y-2">
        {serviceTypes.map(service => {
          const Icon = service.icon;
          return (
            <a
              key={service.key}
              href={`https://www.google.com/maps/search/${service.query}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card-civic p-4 flex items-center gap-3 w-full"
            >
              <div className="w-10 h-10 rounded-sm bg-secondary flex items-center justify-center">
                <Icon size={20} className="text-primary" />
              </div>
              <span className="flex-1 text-sm font-medium text-foreground">{t(service.key)}</span>
              <ExternalLink size={16} className="text-muted-foreground" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
