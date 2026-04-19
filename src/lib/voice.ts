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
// Heuristic: names commonly associated with male TTS voices across platforms.
const MALE_VOICE_HINTS = [
  'male', 'man', 'guy',
  'david', 'mark', 'george', 'james', 'daniel', 'alex', 'fred', 'oliver',
  'thomas', 'rishi', 'ravi', 'hemant', 'aaron', 'arthur', 'diego', 'jorge',
  'google हिन्दी', 'google हिंदी', // Google Hindi default tends to be male on Android
];

function pickMaleVoice(locale: string): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return undefined;
  const langCode = locale.split('-')[0];
  const localeMatches = voices.filter(v => v.lang === locale || v.lang.startsWith(langCode));
  const pool = localeMatches.length ? localeMatches : voices;

  const isMale = (v: SpeechSynthesisVoice) => {
    const n = v.name.toLowerCase();
    if (MALE_VOICE_HINTS.some(h => n.includes(h.toLowerCase()))) return true;
    // Explicitly avoid known female voices
    const female = ['female', 'woman', 'samantha', 'victoria', 'karen', 'tessa', 'fiona', 'zira', 'susan', 'lekha', 'veena', 'rishi'];
    if (female.some(h => n.includes(h))) return false;
    return false;
  };

  return pool.find(isMale)
    || pool.find(v => v.lang === locale)
    || pool.find(v => v.lang.startsWith(langCode));
}

export function speak(text: string, lang: Language) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  const locale = LANG_LOCALE[lang];
  const doSpeak = () => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = locale;
    utter.rate = 1;
    utter.pitch = 0.9; // Slightly lower pitch reinforces male timbre as a fallback
    const voice = pickMaleVoice(locale);
    if (voice) utter.voice = voice;
    window.speechSynthesis.speak(utter);
  };

  // Voices may load asynchronously
  if (!window.speechSynthesis.getVoices().length) {
    const handler = () => {
      window.speechSynthesis.removeEventListener('voiceschanged', handler);
      doSpeak();
    };
    window.speechSynthesis.addEventListener('voiceschanged', handler);
    // Safety fallback in case the event never fires
    setTimeout(doSpeak, 250);
  } else {
    doSpeak();
  }
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
