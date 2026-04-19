import { useLanguage, type Language } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Globe, Moon, Sun, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import logo from '@/assets/logo.png';

const languageOptions: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिंदी' },
  { value: 'mr', label: 'मराठी' },
  { value: 'gu', label: 'ગુજરાતી' },
  { value: 'pa', label: 'ਪੰਜਾਬੀ' },
  { value: 'te', label: 'తెలుగు' },
  { value: 'ta', label: 'தமிழ்' },
];

export function TopBar() {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const currentLabel = languageOptions.find(o => o.value === lang)?.label;

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-50 transition-colors duration-300">
      <div className="flex items-center justify-between px-4 py-2.5 max-w-lg mx-auto">
        <div className="flex items-center gap-2">
          <img src={logo} alt="CivicAI" className="w-8 h-8 rounded-sm object-contain" />
          <span className="font-semibold text-foreground text-sm">{t('app.title')}</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-sm border border-border bg-card text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Language selector */}
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="btn-civic-outline !px-2.5 !py-1.5 !text-xs"
            >
              <Globe size={14} />
              {currentLabel}
              <ChevronDown size={12} />
            </button>
            {showLangMenu && (
              <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-sm shadow-lg z-50 min-w-[120px]">
                {languageOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => { setLang(opt.value); setShowLangMenu(false); }}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-secondary ${
                      lang === opt.value ? 'text-primary font-medium' : 'text-foreground'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
