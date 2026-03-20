import { useLanguage } from '@/contexts/LanguageContext';
import { schemes, categories } from '@/data/schemes';
import type { Scheme } from '@/data/schemes';
import { GraduationCap, Wheat, Briefcase, Heart, Home, Stethoscope, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const categoryIcons: Record<string, any> = {
  education: GraduationCap,
  agriculture: Wheat,
  employment: Briefcase,
  women: Heart,
  housing: Home,
  health: Stethoscope,
};

interface SchemesPageProps {
  onSelectScheme: (scheme: Scheme) => void;
}

export function SchemesPage({ onSelectScheme }: SchemesPageProps) {
  const { t, lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? schemes.filter(s => s.category === activeCategory)
    : schemes;

  return (
    <div className="px-4 pb-6 space-y-4">
      <h1 className="text-lg font-bold text-foreground">{t('nav.schemes')}</h1>

      {/* Category filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 rounded-sm text-xs font-medium whitespace-nowrap transition-colors ${
            !activeCategory ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'
          }`}
        >
          All
        </button>
        {categories.map(cat => {
          const Icon = categoryIcons[cat.id];
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.id ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'
              }`}
            >
              <Icon size={14} />
              {t(`cat.${cat.id}`)}
            </button>
          );
        })}
      </div>

      {/* Scheme list */}
      <div className="space-y-2">
        {filtered.map(scheme => {
          const Icon = categoryIcons[scheme.category];
          return (
            <button
              key={scheme.id}
              onClick={() => onSelectScheme(scheme)}
              className="card-civic w-full p-4 flex items-start gap-3 text-left"
            >
              <div className="w-10 h-10 rounded-sm bg-secondary flex items-center justify-center flex-shrink-0">
                <Icon size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{scheme.name[lang]}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{scheme.description[lang]}</p>
              </div>
              <ChevronRight size={16} className="text-muted-foreground flex-shrink-0 mt-1" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
