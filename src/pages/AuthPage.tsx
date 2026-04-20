import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable/index';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Loader2, Eye, EyeOff, Mail, Lock, Sparkles, Fingerprint, AlertCircle, User } from 'lucide-react';
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
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (user) onSuccess();
  }, [user, onSuccess]);

  const validate = () => {
    if (!email.trim()) return 'Please enter your email or mobile number.';
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const isMobile = /^[+]?[0-9]{10,15}$/.test(email.trim().replace(/\s|-/g, ''));
    if (!isEmail && !isMobile) return 'Enter a valid email address or mobile number.';
    if (!isEmail && mode === 'signup') return 'Please use a valid email address to sign up.';
    if (!password) return 'Password is required.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const v = validate();
    if (v) { setFormError(v); return; }
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
      setFormError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setFormError(null);
    try {
      const result = await lovable.auth.signInWithOAuth('google', {
        redirect_uri: window.location.origin,
      });
      if (result.error) throw result.error;
      if (result.redirected) return;
      toast.success('Welcome!');
      onSuccess();
    } catch (err: any) {
      setFormError(err?.message || 'Google sign-in failed');
      setLoading(false);
    }
  };

  const handleForgot = async () => {
    if (!email.trim()) {
      setFormError('Enter your email above first, then tap Forgot Password.');
      return;
    }
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/`,
      });
      if (error) throw error;
      toast.success('Password reset link sent to your email.');
    } catch (err: any) {
      setFormError(err.message || 'Could not send reset email');
    }
  };

  const handleBiometric = () => {
    toast.info('Biometric login coming soon — use your password for now.');
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4 py-8 animate-fade-in"
      style={{
        background:
          'linear-gradient(135deg, hsl(217 91% 96%) 0%, hsl(0 0% 100%) 55%, hsl(217 91% 97%) 100%)',
      }}
    >
      <div className="w-full max-w-md">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-primary font-medium mb-4 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft size={16} /> {t('scheme.back')}
        </button>

        {/* Logo / Title */}
        <div className="text-center mb-6 animate-fade-in">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-3 shadow-sm">
            <Sparkles className="text-primary" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Citizen Sahayta AI
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === 'login' ? 'Welcome back — sign in to continue' : 'Create your account to get started'}
          </p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-2xl shadow-xl border border-border p-6 sm:p-7 animate-scale-in">
          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 h-11 rounded-lg border border-border bg-card text-foreground text-sm font-medium hover:bg-secondary hover:shadow-sm transition-all duration-200 disabled:opacity-60"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground my-4">
            <div className="flex-1 h-px bg-border" />
            <span>or {mode === 'login' ? 'sign in' : 'sign up'} with email</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Error alert */}
          {formError && (
            <div
              role="alert"
              className="flex items-start gap-2 p-3 mb-4 rounded-lg border border-destructive/30 bg-destructive/5 text-destructive text-sm animate-fade-in"
            >
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Display Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    placeholder="Your name"
                    className="w-full h-11 pl-9 pr-3 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Email or Mobile Number</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="username"
                  className="w-full h-11 pl-9 pr-3 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  className="w-full h-11 pl-9 pr-10 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {mode === 'login' && (
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-foreground cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring accent-primary"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={handleForgot}
                  className="text-primary font-medium hover:underline transition-all"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 hover:shadow-md active:scale-[0.99] transition-all duration-200 disabled:opacity-70"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>

            {/* Biometric simulation */}
            {mode === 'login' && (
              <button
                type="button"
                onClick={handleBiometric}
                className="w-full flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <Fingerprint size={16} />
                Use biometric login
              </button>
            )}
          </form>
        </div>

        {/* Switch mode */}
        <button
          onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setFormError(null); }}
          className="w-full text-sm text-muted-foreground mt-5 hover:text-primary transition-colors"
        >
          {mode === 'login' ? (
            <>Don't have an account? <span className="text-primary font-semibold">Sign up</span></>
          ) : (
            <>Already have an account? <span className="text-primary font-semibold">Sign in</span></>
          )}
        </button>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Secured by Citizen Sahayta AI · Your data stays private
        </p>
      </div>
    </div>
  );
}
