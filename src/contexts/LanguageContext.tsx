import React, { createContext, useContext, useState, useCallback } from 'react';

export type Language = 'en' | 'hi' | 'mr' | 'gu' | 'pa' | 'te' | 'ta';

export type LocalizedText<T = string> = Partial<Record<Language, T>> & { en: T };

export function localize<T>(record: LocalizedText<T>, lang: Language): T {
  return (record[lang] ?? record.en) as T;
}

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, LocalizedText<string>> = {
  'app.title': { en: 'CivicAI Assistant', hi: 'सिविकAI सहायक', mr: 'सिविकAI सहाय्यक', gu: 'સિવિકAI સહાયક', pa: 'ਸਿਵਿਕAI ਸਹਾਇਕ', te: 'సివిక్AI సహాయకుడు', ta: 'சிவிக்AI உதவியாளர்' },
  'app.tagline': { en: 'Your Government Schemes Assistant', hi: 'आपका सरकारी योजना सहायक', mr: 'तुमचा सरकारी योजना सहाय्यक', gu: 'તમારો સરકારી યોજના સહાયક', pa: 'ਤੁਹਾਡਾ ਸਰਕਾਰੀ ਯੋਜਨਾ ਸਹਾਇਕ', te: 'మీ ప్రభుత్వ పథకాల సహాయకుడు', ta: 'உங்கள் அரசு திட்டங்கள் உதவியாளர்' },
  'nav.home': { en: 'Home', hi: 'होम', mr: 'मुख्यपृष्ठ', gu: 'હોમ', pa: 'ਹੋਮ', te: 'హోమ్', ta: 'முகப்பு' },
  'nav.schemes': { en: 'Schemes', hi: 'योजनाएं', mr: 'योजना', gu: 'યોજનાઓ', pa: 'ਯੋਜਨਾਵਾਂ', te: 'పథకాలు', ta: 'திட்டங்கள்' },
  'nav.chat': { en: 'Chat', hi: 'चैट', mr: 'चॅट', gu: 'ચેટ', pa: 'ਚੈਟ', te: 'చాట్', ta: 'அரட்டை' },
  'nav.map': { en: 'Map', hi: 'नक्शा', mr: 'नकाशा', gu: 'નકશો', pa: 'ਨਕਸ਼ਾ', te: 'మ్యాప్', ta: 'வரைபடம்' },
  'nav.profile': { en: 'Profile', hi: 'प्रोफ़ाइल', mr: 'प्रोफाइल', gu: 'પ્રોફાઇલ', pa: 'ਪ੍ਰੋਫਾਈਲ', te: 'ప్రొఫైల్', ta: 'சுயவிவரம்' },
  'home.search': { en: 'Ask about any government scheme...', hi: 'किसी भी सरकारी योजना के बारे में पूछें...', mr: 'कोणत्याही सरकारी योजनेबद्दल विचारा...', gu: 'કોઈપણ સરકારી યોજના વિશે પૂછો...', pa: 'ਕਿਸੇ ਵੀ ਸਰਕਾਰੀ ਯੋਜਨਾ ਬਾਰੇ ਪੁੱਛੋ...', te: 'ఏదైనా ప్రభుత్వ పథకం గురించి అడగండి...', ta: 'எந்த அரசு திட்டத்தைப் பற்றியும் கேளுங்கள்...' },
  'home.eligibility': { en: 'Check Eligibility', hi: 'पात्रता जांचें', mr: 'पात्रता तपासा', gu: 'પાત્રતા તપાસો', pa: 'ਯੋਗਤਾ ਜਾਂਚੋ', te: 'అర్హత తనిఖీ', ta: 'தகுதியைச் சரிபார்' },
  'home.findSchemes': { en: 'Find Schemes', hi: 'योजनाएं खोजें', mr: 'योजना शोधा', gu: 'યોજનાઓ શોધો', pa: 'ਯੋਜਨਾਵਾਂ ਲੱਭੋ', te: 'పథకాలు కనుగొనండి', ta: 'திட்டங்களைக் கண்டறி' },
  'home.nearbyServices': { en: 'Nearby Services', hi: 'नज़दीकी सेवाएं', mr: 'जवळच्या सेवा', gu: 'નજીકની સેવાઓ', pa: 'ਨੇੜਲੀਆਂ ਸੇਵਾਵਾਂ', te: 'సమీప సేవలు', ta: 'அருகிலுள்ள சேவைகள்' },
  'home.documents': { en: 'Document Guide', hi: 'दस्तावेज़ गाइड', mr: 'कागदपत्र मार्गदर्शक', gu: 'દસ્તાવેજ માર્ગદર્શિકા', pa: 'ਦਸਤਾਵੇਜ਼ ਗਾਈਡ', te: 'డాక్యుమెంట్ గైడ్', ta: 'ஆவண வழிகாட்டி' },
  'home.popular': { en: 'Popular Schemes', hi: 'लोकप्रिय योजनाएं', mr: 'लोकप्रिय योजना', gu: 'લોકપ્રિય યોજનાઓ', pa: 'ਪ੍ਰਸਿੱਧ ਯੋਜਨਾਵਾਂ', te: 'జనాదరణ పథకాలు', ta: 'பிரபலமான திட்டங்கள்' },
  'home.categories': { en: 'Categories', hi: 'श्रेणियां', mr: 'श्रेणी', gu: 'શ્રેણીઓ', pa: 'ਸ਼੍ਰੇਣੀਆਂ', te: 'వర్గాలు', ta: 'வகைகள்' },
  'cat.education': { en: 'Education', hi: 'शिक्षा', mr: 'शिक्षण', gu: 'શિક્ષણ', pa: 'ਸਿੱਖਿਆ', te: 'విద్య', ta: 'கல்வி' },
  'cat.agriculture': { en: 'Agriculture', hi: 'कृषि', mr: 'शेती', gu: 'કૃષિ', pa: 'ਖੇਤੀ', te: 'వ్యవసాయం', ta: 'விவசாயம்' },
  'cat.employment': { en: 'Employment', hi: 'रोज़गार', mr: 'रोजगार', gu: 'રોજગાર', pa: 'ਰੁਜ਼ਗਾਰ', te: 'ఉద్యోగం', ta: 'வேலைவாய்ப்பு' },
  'cat.women': { en: 'Women & Child', hi: 'महिला एवं बाल', mr: 'महिला व बाल', gu: 'મહિલા અને બાળ', pa: 'ਔਰਤ ਅਤੇ ਬੱਚਾ', te: 'మహిళలు & పిల్లలు', ta: 'பெண்கள் & குழந்தைகள்' },
  'cat.housing': { en: 'Housing', hi: 'आवास', mr: 'गृहनिर्माण', gu: 'આવાસ', pa: 'ਰਿਹਾਇਸ਼', te: 'గృహ', ta: 'வீடு' },
  'cat.health': { en: 'Health', hi: 'स्वास्थ्य', mr: 'आरोग्य', gu: 'આરોગ્ય', pa: 'ਸਿਹਤ', te: 'ఆరోగ్యం', ta: 'சுகாதாரம்' },
  'chat.placeholder': { en: 'Ask me about any government scheme...', hi: 'मुझसे किसी भी सरकारी योजना के बारे में पूछें...', mr: 'मला कोणत्याही सरकारी योजनेबद्दल विचारा...', gu: 'મને કોઈપણ સરકારી યોજના વિશે પૂછો...', pa: 'ਮੈਨੂੰ ਕਿਸੇ ਵੀ ਸਰਕਾਰੀ ਯੋਜਨਾ ਬਾਰੇ ਪੁੱਛੋ...', te: 'నన్ను ఏదైనా ప్రభుత్వ పథకం గురించి అడగండి...', ta: 'எந்த அரசு திட்டத்தைப் பற்றியும் என்னிடம் கேளுங்கள்...' },
  'chat.title': { en: 'CivicAI Assistant', hi: 'सिविकAI सहायक', mr: 'सिविकAI सहाय्यक', gu: 'સિવિકAI સહાયક', pa: 'ਸਿਵਿਕAI ਸਹਾਇਕ', te: 'సివిక్AI సహాయకుడు', ta: 'சிவிக்AI உதவியாளர்' },
  'chat.welcome': { en: 'Hello! I can help you find government schemes, check eligibility, and guide you through documents. Ask me anything!', hi: 'नमस्ते! मैं आपको सरकारी योजनाएं खोजने, पात्रता जांचने और दस्तावेज़ों में मदद कर सकता हूं। कुछ भी पूछें!', mr: 'नमस्कार! मी तुम्हाला सरकारी योजना शोधण्यात, पात्रता तपासण्यात आणि कागदपत्रांबद्दल मार्गदर्शन करू शकतो. काहीही विचारा!', gu: 'નમસ્તે! હું તમને સરકારી યોજનાઓ શોધવામાં, પાત્રતા તપાસવામાં અને દસ્તાવેજો માટે માર્ગદર્શન આપી શકું છું. કંઈપણ પૂછો!', pa: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਨੂੰ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ ਲੱਭਣ, ਯੋਗਤਾ ਜਾਂਚਣ ਅਤੇ ਦਸਤਾਵੇਜ਼ਾਂ ਬਾਰੇ ਮਾਰਗਦਰਸ਼ਨ ਕਰ ਸਕਦਾ ਹਾਂ। ਕੁਝ ਵੀ ਪੁੱਛੋ!', te: 'నమస్కారం! నేను మీకు ప్రభుత్వ పథకాలను కనుగొనడంలో, అర్హతను తనిఖీ చేయడంలో మరియు డాక్యుమెంట్ల ద్వారా మార్గనిర్దేశం చేయగలను. ఏదైనా అడగండి!', ta: 'வணக்கம்! அரசு திட்டங்களைக் கண்டறியவும், தகுதியை சரிபார்க்கவும், ஆவணங்கள் வழியாக உங்களை வழிநடத்தவும் உதவ முடியும். எதையும் கேளுங்கள்!' },
  'eligibility.title': { en: 'Check Your Eligibility', hi: 'अपनी पात्रता जांचें', mr: 'तुमची पात्रता तपासा' },
  'eligibility.age': { en: 'Age', hi: 'उम्र', mr: 'वय' },
  'eligibility.income': { en: 'Annual Income (₹)', hi: 'वार्षिक आय (₹)', mr: 'वार्षिक उत्पन्न (₹)' },
  'eligibility.state': { en: 'State', hi: 'राज्य', mr: 'राज्य' },
  'eligibility.category': { en: 'Category', hi: 'श्रेणी', mr: 'प्रवर्ग' },
  'eligibility.occupation': { en: 'Occupation', hi: 'व्यवसाय', mr: 'व्यवसाय' },
  'eligibility.gender': { en: 'Gender', hi: 'लिंग', mr: 'लिंग' },
  'eligibility.check': { en: 'Check Eligibility', hi: 'पात्रता जांचें', mr: 'पात्रता तपासा' },
  'eligibility.results': { en: 'Your Eligible Schemes', hi: 'आपकी पात्र योजनाएं', mr: 'तुमच्या पात्र योजना' },
  'eligibility.notEligible': { en: 'Not Eligible', hi: 'पात्र नहीं', mr: 'पात्र नाही' },
  'eligibility.eligible': { en: 'Eligible', hi: 'पात्र', mr: 'पात्र' },
  'scheme.benefits': { en: 'Benefits', hi: 'लाभ', mr: 'फायदे' },
  'scheme.eligibility': { en: 'Eligibility', hi: 'पात्रता', mr: 'पात्रता' },
  'scheme.documents': { en: 'Required Documents', hi: 'आवश्यक दस्तावेज़', mr: 'आवश्यक कागदपत्रे' },
  'scheme.process': { en: 'How to Apply', hi: 'आवेदन कैसे करें', mr: 'अर्ज कसा करावा' },
  'scheme.back': { en: 'Back', hi: 'वापस', mr: 'मागे' },
  'profile.title': { en: 'Profile', hi: 'प्रोफ़ाइल', mr: 'प्रोफाइल' },
  'profile.language': { en: 'Language', hi: 'भाषा', mr: 'भाषा' },
  'profile.savedSchemes': { en: 'Saved Schemes', hi: 'सहेजी गई योजनाएं', mr: 'जतन केलेल्या योजना' },
  'profile.recentSearches': { en: 'Recent Searches', hi: 'हाल की खोजें', mr: 'अलीकडील शोध' },
  'profile.theme': { en: 'Dark Mode', hi: 'डार्क मोड', mr: 'डार्क मोड' },
  'map.title': { en: 'Nearby Services', hi: 'नज़दीकी सेवाएं', mr: 'जवळच्या सेवा' },
  'map.govOffices': { en: 'Government Offices', hi: 'सरकारी कार्यालय', mr: 'सरकारी कार्यालये' },
  'map.banks': { en: 'Banks', hi: 'बैंक', mr: 'बँका' },
  'map.csc': { en: 'CSC Centers', hi: 'सीएससी केंद्र', mr: 'सीएससी केंद्रे' },
  'map.cyberCafe': { en: 'Cyber Cafes', hi: 'साइबर कैफे', mr: 'सायबर कॅफे' },
  'map.comingSoon': { en: 'Map integration coming soon! For now, search on Google Maps.', hi: 'नक्शा जल्द आ रहा है! अभी Google Maps पर खोजें।', mr: 'नकाशा लवकरच येत आहे! सध्या Google Maps वर शोधा.' },
  'select': { en: 'Select', hi: 'चुनें', mr: 'निवडा' },
  'male': { en: 'Male', hi: 'पुरुष', mr: 'पुरुष' },
  'female': { en: 'Female', hi: 'महिला', mr: 'स्त्री' },
  'other': { en: 'Other', hi: 'अन्य', mr: 'इतर' },
  'farmer': { en: 'Farmer', hi: 'किसान', mr: 'शेतकरी' },
  'student': { en: 'Student', hi: 'छात्र', mr: 'विद्यार्थी' },
  'employed': { en: 'Employed', hi: 'नौकरीपेशा', mr: 'नोकरदार' },
  'selfEmployed': { en: 'Self Employed', hi: 'स्वरोज़गार', mr: 'स्वयंरोजगार' },
  'unemployed': { en: 'Unemployed', hi: 'बेरोज़गार', mr: 'बेरोजगार' },
  'homemaker': { en: 'Homemaker', hi: 'गृहिणी', mr: 'गृहिणी' },
  'guest': { en: 'Guest User', hi: 'अतिथि उपयोगकर्ता', mr: 'अतिथी वापरकर्ता' },
  'noLogin': { en: 'No login required', hi: 'लॉगिन आवश्यक नहीं', mr: 'लॉगिन आवश्यक नाही' },
  'noSearches': { en: 'No recent searches', hi: 'कोई हाल की खोज नहीं', mr: 'अलीकडील शोध नाहीत' },
  'noSaved': { en: 'No saved schemes', hi: 'कोई सहेजी गई योजना नहीं', mr: 'जतन केलेल्या योजना नाहीत' },
  'all': { en: 'All', hi: 'सभी', mr: 'सर्व' },
  'voice.listen': { en: 'Speak', hi: 'बोलें', mr: 'बोला', gu: 'બોલો', pa: 'ਬੋਲੋ', te: 'మాట్లాడండి', ta: 'பேசு' },
  'voice.stop': { en: 'Stop', hi: 'रोकें', mr: 'थांबवा', gu: 'રોકો', pa: 'ਰੋਕੋ', te: 'ఆపు', ta: 'நிறுத்து' },
  'voice.play': { en: 'Play', hi: 'चलाएं', mr: 'प्ले करा', gu: 'ચલાવો', pa: 'ਚਲਾਓ', te: 'ప్లే', ta: 'இயக்கு' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const VALID_LANGS: Language[] = ['en', 'hi', 'mr', 'gu', 'pa', 'te', 'ta'];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('civicai-lang') as Language | null;
    return saved && VALID_LANGS.includes(saved) ? saved : 'en';
  });

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    localStorage.setItem('civicai-lang', l);
  }, []);

  const t = useCallback((key: string) => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] ?? entry.en;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
