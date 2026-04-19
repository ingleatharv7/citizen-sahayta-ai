import { useLanguage, type Language } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Globe, History, Bookmark, User, Moon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const langOptions: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिंदी' },
  { value: 'mr', label: 'मराठी' },
  { value: 'gu', label: 'ગુજરાતી' },
  { value: 'pa', label: 'ਪੰਜਾਬੀ' },
  { value: 'te', label: 'తెలుగు' },
  { value: 'ta', label: 'தமிழ்' },
];

export function ProfilePage() {
  const { t, lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="px-4 pb-6 space-y-4">
      <h1 className="text-lg font-bold text-foreground">{t('profile.title')}</h1>

      {/* Avatar */}
      <div className="flex items-center gap-4 card-civic p-4">
        <div className="w-14 h-14 rounded-sm bg-primary flex items-center justify-center">
          <User size={28} className="text-primary-foreground" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{t('guest')}</p>
          <p className="text-xs text-muted-foreground">{t('noLogin')}</p>
        </div>
      </div>

      {/* Dark Mode */}
      <div className="card-civic p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon size={18} className="text-primary" />
            <span className="text-sm font-medium text-foreground">{t('profile.theme')}</span>
          </div>
          <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
        </div>
      </div>

      {/* Language */}
      <div className="card-civic p-4">
        <div className="flex items-center gap-2 mb-3">
          <Globe size={18} className="text-primary" />
          <span className="text-sm font-medium text-foreground">{t('profile.language')}</span>
        </div>
        <div className="flex gap-2">
          {langOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setLang(opt.value)}
              className={`px-3 py-1.5 rounded-sm text-xs font-medium transition-colors ${
                lang === opt.value ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Searches */}
      <div className="card-civic p-4">
        <div className="flex items-center gap-2 mb-3">
          <History size={18} className="text-primary" />
          <span className="text-sm font-medium text-foreground">{t('profile.recentSearches')}</span>
        </div>
        <p className="text-xs text-muted-foreground">{t('noSearches')}</p>
      </div>

      {/* Saved Schemes */}
      <div className="card-civic p-4">
        <div className="flex items-center gap-2 mb-3">
          <Bookmark size={18} className="text-primary" />
          <span className="text-sm font-medium text-foreground">{t('profile.savedSchemes')}</span>
        </div>
        <p className="text-xs text-muted-foreground">{t('noSaved')}</p>
      </div>
    </div>
  );
}
