import { useEffect, useState } from 'react';
import { useLanguage, type Language } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useSavedSchemes } from '@/hooks/useSchemes';
import { schemes as localSchemes } from '@/data/schemes';
import type { Scheme } from '@/data/schemes';
import { Globe, History, Bookmark, User, Moon, LogIn, LogOut, ChevronRight } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const langOptions: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिंदी' },
  { value: 'mr', label: 'मराठी' },
  { value: 'gu', label: 'ગુજરાતી' },
  { value: 'pa', label: 'ਪੰਜਾਬੀ' },
  { value: 'te', label: 'తెలుగు' },
  { value: 'ta', label: 'தமிழ்' },
];

interface ProfilePageProps {
  onNavigate: (tab: string) => void;
  onSelectScheme: (scheme: Scheme) => void;
}

export function ProfilePage({ onNavigate, onSelectScheme }: ProfilePageProps) {
  const { t, lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const { savedIds } = useSavedSchemes(user?.id);
  const [displayName, setDisplayName] = useState<string>('');
  const [allSchemes, setAllSchemes] = useState<Scheme[]>(localSchemes);

  // Load profile + persist language preference for signed-in users
  useEffect(() => {
    if (!user) return;
    supabase
      .from('profiles')
      .select('display_name, language')
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setDisplayName(data.display_name || user.email || '');
          if (data.language && data.language !== lang) {
            setLang(data.language as Language);
          }
        }
      });
  }, [user]);

  // Load schemes for the saved list
  useEffect(() => {
    supabase.from('schemes').select('*').then(({ data }) => {
      if (data && data.length) {
        setAllSchemes(data.map((row: any) => ({
          id: row.id, category: row.category, name: row.name,
          description: row.description, benefits: row.benefits,
          eligibility: row.eligibility, documents: row.documents,
          process: row.process, criteria: row.criteria || {},
        })));
      }
    });
  }, []);

  const handleLangChange = async (l: Language) => {
    setLang(l);
    if (user) {
      await supabase.from('profiles').update({ language: l }).eq('user_id', user.id);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out');
  };

  const savedSchemes = allSchemes.filter(s => savedIds.has(s.id));

  return (
    <div className="px-4 pb-6 space-y-4">
      <h1 className="text-lg font-bold text-foreground">{t('profile.title')}</h1>

      {/* Avatar + auth */}
      <div className="card-civic p-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-sm bg-primary flex items-center justify-center">
            <User size={28} className="text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              {user ? (displayName || user.email) : t('guest')}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user ? user.email : t('noLogin')}
            </p>
          </div>
        </div>
        {user ? (
          <button onClick={handleSignOut} className="btn-civic-outline w-full mt-3 !py-2 !text-xs flex items-center justify-center gap-2">
            <LogOut size={14} /> Sign Out
          </button>
        ) : (
          <button onClick={() => onNavigate('auth')} className="btn-civic w-full mt-3 !py-2 !text-xs flex items-center justify-center gap-2">
            <LogIn size={14} /> Sign In / Sign Up
          </button>
        )}
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
        <div className="flex flex-wrap gap-2">
          {langOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => handleLangChange(opt.value)}
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
        {!user && <p className="text-xs text-muted-foreground">Sign in to save schemes</p>}
        {user && savedSchemes.length === 0 && <p className="text-xs text-muted-foreground">{t('noSaved')}</p>}
        {user && savedSchemes.length > 0 && (
          <div className="space-y-2">
            {savedSchemes.map(s => (
              <button
                key={s.id}
                onClick={() => onSelectScheme(s)}
                className="w-full flex items-center justify-between p-2 rounded-sm bg-secondary text-left"
              >
                <span className="text-xs font-medium text-foreground truncate">{s.name[lang] || s.name.en}</span>
                <ChevronRight size={14} className="text-muted-foreground flex-shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
