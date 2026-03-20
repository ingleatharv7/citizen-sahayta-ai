import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, History, Bookmark, User } from 'lucide-react';

export function ProfilePage() {
  const { t, lang, toggleLang } = useLanguage();

  return (
    <div className="px-4 pb-6 space-y-4">
      <h1 className="text-lg font-bold text-foreground">{t('profile.title')}</h1>

      {/* Avatar */}
      <div className="flex items-center gap-4 card-civic p-4">
        <div className="w-14 h-14 rounded-sm bg-primary flex items-center justify-center">
          <User size={28} className="text-primary-foreground" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            {lang === 'hi' ? 'अतिथि उपयोगकर्ता' : 'Guest User'}
          </p>
          <p className="text-xs text-muted-foreground">
            {lang === 'hi' ? 'लॉगिन आवश्यक नहीं' : 'No login required'}
          </p>
        </div>
      </div>

      {/* Language */}
      <div className="card-civic p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe size={18} className="text-primary" />
            <span className="text-sm font-medium text-foreground">{t('profile.language')}</span>
          </div>
          <button onClick={toggleLang} className="btn-civic-outline !px-3 !py-1.5 !text-xs">
            {lang === 'en' ? 'हिंदी' : 'English'}
          </button>
        </div>
      </div>

      {/* Recent Searches */}
      <div className="card-civic p-4">
        <div className="flex items-center gap-2 mb-3">
          <History size={18} className="text-primary" />
          <span className="text-sm font-medium text-foreground">{t('profile.recentSearches')}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {lang === 'hi' ? 'कोई हाल की खोज नहीं' : 'No recent searches'}
        </p>
      </div>

      {/* Saved Schemes */}
      <div className="card-civic p-4">
        <div className="flex items-center gap-2 mb-3">
          <Bookmark size={18} className="text-primary" />
          <span className="text-sm font-medium text-foreground">{t('profile.savedSchemes')}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {lang === 'hi' ? 'कोई सहेजी गई योजना नहीं' : 'No saved schemes'}
        </p>
      </div>
    </div>
  );
}
