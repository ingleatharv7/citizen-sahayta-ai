import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { checkEligibility } from '@/data/schemes';
import type { Scheme } from '@/data/schemes';
import { CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';

interface EligibilityPageProps {
  onSelectScheme: (scheme: Scheme) => void;
  onBack: () => void;
}

const states = ['Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'];

export function EligibilityPage({ onSelectScheme, onBack }: EligibilityPageProps) {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState({ age: '', income: '', state: '', category: '', occupation: '', gender: '' });
  const [results, setResults] = useState<ReturnType<typeof checkEligibility> | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsChecking(true);
    setTimeout(() => {
      const r = checkEligibility({
        age: parseInt(form.age) || 0,
        income: parseInt(form.income) || 0,
        gender: form.gender,
        category: form.category,
        occupation: form.occupation,
      });
      setResults(r);
      setIsChecking(false);
    }, 450);
  };

  const selectClass = "w-full p-2.5 rounded-sm border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-all duration-200";
  const inputClass = selectClass;

  if (results) {
    const noneEligible = results.eligible.length === 0;
    return (
      <div className="px-4 pb-6 space-y-4">
        <button onClick={() => setResults(null)} className="flex items-center gap-1 text-sm text-primary font-medium">
          <ArrowLeft size={16} /> {t('scheme.back')}
        </button>
        <h1 className={`text-lg font-bold text-foreground animate-fade-in-up ${noneEligible ? 'animate-subtle-shake' : ''}`}>
          {t('eligibility.results')}
        </h1>

        {results.eligible.length > 0 && (
          <div className="space-y-2">
            {results.eligible.map((scheme, i) => (
              <button
                key={scheme.id}
                onClick={() => onSelectScheme(scheme)}
                className="card-civic w-full p-4 flex items-center gap-3 text-left animate-scale-in border-l-2 border-l-success"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <CheckCircle2 size={20} className="text-success flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">{scheme.name[lang]}</p>
                  <p className="text-xs text-success font-medium">{t('eligibility.eligible')}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {results.notEligible.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground animate-fade-in">{t('eligibility.notEligible')}</h2>
            {results.notEligible.map(({ scheme, reasons }, i) => (
              <div
                key={scheme.id}
                className="card-civic p-4 animate-fade-in-up border-l-2 border-l-destructive"
                style={{ animationDelay: `${(results.eligible.length + i) * 70}ms` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <XCircle size={18} className="text-destructive" />
                  <p className="text-sm font-medium text-foreground">{scheme.name[lang]}</p>
                </div>
                <ul className="space-y-1 ml-7">
                  {reasons.map((r, idx) => (
                    <li key={idx} className="text-xs text-muted-foreground">• {r[lang]}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="px-4 pb-6 space-y-4">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-primary font-medium">
        <ArrowLeft size={16} /> {t('scheme.back')}
      </button>
      <h1 className="text-lg font-bold text-foreground">{t('eligibility.title')}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-medium text-foreground mb-1 block">{t('eligibility.age')}</label>
          <input type="number" value={form.age} onChange={e => setForm(p => ({ ...p, age: e.target.value }))} className={inputClass} required min={0} max={120} />
        </div>
        <div>
          <label className="text-xs font-medium text-foreground mb-1 block">{t('eligibility.gender')}</label>
          <select value={form.gender} onChange={e => setForm(p => ({ ...p, gender: e.target.value }))} className={selectClass} required>
            <option value="">{t('select')}</option>
            <option value="male">{t('male')}</option>
            <option value="female">{t('female')}</option>
            <option value="other">{t('other')}</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-foreground mb-1 block">{t('eligibility.income')}</label>
          <input type="number" value={form.income} onChange={e => setForm(p => ({ ...p, income: e.target.value }))} className={inputClass} required min={0} />
        </div>
        <div>
          <label className="text-xs font-medium text-foreground mb-1 block">{t('eligibility.state')}</label>
          <select value={form.state} onChange={e => setForm(p => ({ ...p, state: e.target.value }))} className={selectClass} required>
            <option value="">{t('select')}</option>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-foreground mb-1 block">{t('eligibility.category')}</label>
          <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className={selectClass} required>
            <option value="">{t('select')}</option>
            <option value="general">General</option>
            <option value="obc">OBC</option>
            <option value="sc">SC</option>
            <option value="st">ST</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-foreground mb-1 block">{t('eligibility.occupation')}</label>
          <select value={form.occupation} onChange={e => setForm(p => ({ ...p, occupation: e.target.value }))} className={selectClass} required>
            <option value="">{t('select')}</option>
            <option value="farmer">{t('farmer')}</option>
            <option value="student">{t('student')}</option>
            <option value="employed">{t('employed')}</option>
            <option value="selfEmployed">{t('selfEmployed')}</option>
            <option value="unemployed">{t('unemployed')}</option>
            <option value="homemaker">{t('homemaker')}</option>
          </select>
        </div>

        <button type="submit" className="btn-civic w-full">{t('eligibility.check')}</button>
      </form>
    </div>
  );
}
