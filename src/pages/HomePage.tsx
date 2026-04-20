import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, ClipboardCheck, FileSearch, MapPin, FileText, GraduationCap, Wheat, Briefcase, Heart, Home, Stethoscope, ChevronRight } from 'lucide-react';
import { schemes, categories } from '@/data/schemes';
import type { Scheme } from '@/data/schemes';

interface HomePageProps {
  onNavigate: (tab: string) => void;
  onSelectScheme: (scheme: Scheme) => void;
  onSearch: (query: string) => void;
}

const categoryIcons: Record<string, any> = {
  education: GraduationCap,
  agriculture: Wheat,
  employment: Briefcase,
  women: Heart,
  housing: Home,
  health: Stethoscope,
};

export function HomePage({ onNavigate, onSelectScheme, onSearch }: HomePageProps) {
  const { t, lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const quickActions = [
    { key: 'home.eligibility', icon: ClipboardCheck, tab: 'eligibility' },
    { key: 'home.findSchemes', icon: FileSearch, tab: 'schemes' },
    { key: 'home.nearbyServices', icon: MapPin, tab: 'map' },
    { key: 'home.documents', icon: FileText, tab: 'schemes' },
  ];

  return (
    <div className="px-4 pb-6 space-y-6">
      {/* Hero */}
      <div className="bg-primary rounded-md p-5 text-primary-foreground">
        <h1 className="text-lg font-bold mb-1">{t('app.title')}</h1>
        <p className="text-sm opacity-90 mb-4">{t('app.tagline')}</p>
        <form onSubmit={handleSearch} className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t('home.search')}
            className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:shadow-[0_0_0_4px_hsl(var(--primary)/0.15)] focus:placeholder:opacity-0 placeholder:transition-opacity placeholder:duration-200 transition-all duration-200"
          />
        </form>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map(action => {
          const Icon = action.icon;
          return (
            <button
              key={action.key}
              onClick={() => onNavigate(action.tab)}
              className="card-civic p-4 flex flex-col items-center gap-2 text-center"
            >
              <Icon size={24} className="text-primary" />
              <span className="text-xs font-medium text-foreground">{t(action.key)}</span>
            </button>
          );
        })}
      </div>

      {/* Categories */}
      <section>
        <h2 className="text-sm font-semibold text-foreground mb-3">{t('home.categories')}</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
          {categories.map(cat => {
            const Icon = categoryIcons[cat.id];
            return (
              <button
                key={cat.id}
                onClick={() => onNavigate('schemes')}
                className="flex flex-col items-center gap-1.5 min-w-[72px] p-3 rounded-md bg-secondary"
              >
                <Icon size={22} className="text-primary" />
                <span className="text-[11px] font-medium text-foreground">{t(`cat.${cat.id}`)}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Popular Schemes */}
      <section>
        <h2 className="text-sm font-semibold text-foreground mb-3">{t('home.popular')}</h2>
        <div className="space-y-2">
          {schemes.slice(0, 4).map(scheme => (
            <button
              key={scheme.id}
              onClick={() => onSelectScheme(scheme)}
              className="card-civic w-full p-4 flex items-center justify-between text-left"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{scheme.name[lang]}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{scheme.description[lang]}</p>
              </div>
              <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
