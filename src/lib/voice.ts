import type { Language } from '@/contexts/LanguageContext';

// Map our app languages to BCP-47 locale codes used by Web Speech API
export const LANG_LOCALE: Record<Language, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  mr: 'mr-IN',
  gu: 'gu-IN',
  pa: 'pa-IN',
  te: 'te-IN',
  ta: 'ta-IN',
};

export const LANG_LABELS: Record<Language, string> = {
  en: 'English',
  hi: 'हिंदी',
  mr: 'मराठी',
  gu: 'ગુજરાતી',
  pa: 'ਪੰਜਾਬੀ',
  te: 'తెలుగు',
  ta: 'தமிழ்',
};

// --- SpeechRecognition (STT) ---
type SRConstructor = new () => any;

export function getSpeechRecognition(): SRConstructor | null {
  if (typeof window === 'undefined') return null;
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

export interface STTHandle {
  stop: () => void;
}

export function startListening(opts: {
  lang: Language;
  onResult: (text: string, isFinal: boolean) => void;
  onError?: (err: string) => void;
  onEnd?: () => void;
}): STTHandle | null {
  const SR = getSpeechRecognition();
  if (!SR) {
    opts.onError?.('not-supported');
    return null;
  }
  const rec = new SR();
  rec.lang = LANG_LOCALE[opts.lang];
  rec.interimResults = true;
  rec.continuous = false;
  rec.maxAlternatives = 1;

  rec.onresult = (e: any) => {
    let interim = '';
    let final = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const res = e.results[i];
      if (res.isFinal) final += res[0].transcript;
      else interim += res[0].transcript;
    }
    if (final) opts.onResult(final.trim(), true);
    else if (interim) opts.onResult(interim.trim(), false);
  };
  rec.onerror = (e: any) => opts.onError?.(e.error || 'error');
  rec.onend = () => opts.onEnd?.();

  try {
    rec.start();
  } catch (err) {
    opts.onError?.(String(err));
    return null;
  }
  return { stop: () => { try { rec.stop(); } catch {} } };
}

// --- SpeechSynthesis (TTS) ---
export function speak(text: string, lang: Language) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = LANG_LOCALE[lang];
  utter.rate = 1;
  utter.pitch = 1;

  // Try to pick a matching voice if available
  const voices = window.speechSynthesis.getVoices();
  const match = voices.find(v => v.lang === LANG_LOCALE[lang])
    || voices.find(v => v.lang.startsWith(LANG_LOCALE[lang].split('-')[0]));
  if (match) utter.voice = match;

  window.speechSynthesis.speak(utter);
}

export function stopSpeaking() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
}

export function isVoiceSupported(): { stt: boolean; tts: boolean } {
  if (typeof window === 'undefined') return { stt: false, tts: false };
  return {
    stt: !!getSpeechRecognition(),
    tts: !!window.speechSynthesis,
  };
}
