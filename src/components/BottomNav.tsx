import { useLanguage } from '@/contexts/LanguageContext';
import { Home, FileText, MessageCircle, MapPin, User } from 'lucide-react';

interface BottomNavProps {
  active: string;
  onNavigate: (tab: string) => void;
}

const tabs = [
  { id: 'home', icon: Home, labelKey: 'nav.home' },
  { id: 'schemes', icon: FileText, labelKey: 'nav.schemes' },
  { id: 'chat', icon: MessageCircle, labelKey: 'nav.chat' },
  { id: 'map', icon: MapPin, labelKey: 'nav.map' },
  { id: 'profile', icon: User, labelKey: 'nav.profile' },
];

export function BottomNav({ active, onNavigate }: BottomNavProps) {
  const { t } = useLanguage();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex justify-around max-w-lg mx-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`nav-tab ${isActive ? 'nav-tab-active' : ''}`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
              <span>{t(tab.labelKey)}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
