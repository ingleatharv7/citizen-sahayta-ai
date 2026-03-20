import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

export function TopBar() {
  const { lang, toggleLang, t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-50">
      <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">CA</span>
          </div>
          <span className="font-semibold text-foreground">{t('app.title')}</span>
        </div>
        <button
          onClick={toggleLang}
          className="btn-civic-outline !px-3 !py-1.5 !text-xs"
        >
          <Globe size={14} />
          {lang === 'en' ? 'हिंदी' : 'English'}
        </button>
      </div>
    </header>
  );
}
