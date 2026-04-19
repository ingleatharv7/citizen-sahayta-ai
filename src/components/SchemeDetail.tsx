import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useSavedSchemes } from '@/hooks/useSchemes';
import type { Scheme } from '@/data/schemes';
import { ArrowLeft, CheckCircle2, FileText, ListChecks, ClipboardList, Bookmark, BookmarkCheck } from 'lucide-react';
import { toast } from 'sonner';

interface SchemeDetailProps {
  scheme: Scheme;
  onBack: () => void;
}

export function SchemeDetail({ scheme, onBack }: SchemeDetailProps) {
  const { t, lang } = useLanguage();
  const { user } = useAuth();
  const { savedIds, toggle } = useSavedSchemes(user?.id);
  const isSaved = savedIds.has(scheme.id);

  const handleSave = async () => {
    if (!user) {
      toast.error('Sign in to save schemes');
      return;
    }
    const nowSaved = await toggle(scheme.id);
    toast.success(nowSaved ? 'Saved' : 'Removed');
  };

  const sections = [
    { key: 'scheme.benefits', icon: CheckCircle2, items: scheme.benefits[lang] },
    { key: 'scheme.eligibility', icon: ListChecks, items: scheme.eligibility[lang] },
    { key: 'scheme.documents', icon: FileText, items: scheme.documents[lang] },
    { key: 'scheme.process', icon: ClipboardList, items: scheme.process[lang] },
  ];

  return (
    <div className="px-4 pb-6 space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-primary font-medium">
          <ArrowLeft size={16} /> {t('scheme.back')}
        </button>
        <button
          onClick={handleSave}
          className="flex items-center gap-1 text-sm font-medium text-primary"
          aria-label={isSaved ? 'Unsave' : 'Save'}
        >
          {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        </button>
      </div>

      <div className="bg-primary rounded-md p-5 text-primary-foreground">
        <h1 className="text-lg font-bold">{scheme.name[lang]}</h1>
        <p className="text-sm opacity-90 mt-2">{scheme.description[lang]}</p>
      </div>

      {sections.map(section => {
        const Icon = section.icon;
        const items = section.items || [];
        return (
          <div key={section.key} className="card-civic p-4">
            <div className="flex items-center gap-2 mb-3">
              <Icon size={18} className="text-primary" />
              <h2 className="text-sm font-semibold text-foreground">{t(section.key)}</h2>
            </div>
            <ul className="space-y-2">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="w-5 h-5 rounded-full bg-secondary text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-medium">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
