import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface AuthPageProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function AuthPage({ onBack, onSuccess }: AuthPageProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) onSuccess();
  }, [user, onSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { display_name: displayName || email.split('@')[0] },
          },
        });
        if (error) throw error;
        toast.success('Account created! Check your email to confirm.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success('Welcome back!');
        onSuccess();
      }
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full p-2.5 rounded-sm border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="px-4 pb-6 space-y-4">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-primary font-medium">
        <ArrowLeft size={16} /> {t('scheme.back')}
      </button>

      <h1 className="text-lg font-bold text-foreground">
        {mode === 'login' ? 'Sign In' : 'Create Account'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 card-civic p-4">
        {mode === 'signup' && (
          <div>
            <label className="text-xs font-medium text-foreground mb-1 block">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              className={inputClass}
              placeholder="Your name"
            />
          </div>
        )}
        <div>
          <label className="text-xs font-medium text-foreground mb-1 block">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className="text-xs font-medium text-foreground mb-1 block">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={inputClass}
            required
            minLength={6}
          />
        </div>
        <button type="submit" disabled={loading} className="btn-civic w-full flex items-center justify-center gap-2">
          {loading && <Loader2 size={16} className="animate-spin" />}
          {mode === 'login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>

      <button
        onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
        className="w-full text-sm text-primary font-medium"
      >
        {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
      </button>
    </div>
  );
}
