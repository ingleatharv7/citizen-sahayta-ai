import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type Language = 'en' | 'hi' | 'mr';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  'app.title': { en: 'CivicAI Assistant', hi: 'सिविकAI सहायक', mr: 'सिविकAI सहाय्यक' },
  'app.tagline': { en: 'Your Government Schemes Assistant', hi: 'आपका सरकारी योजना सहायक', mr: 'तुमचा सरकारी योजना सहाय्यक' },
  'nav.home': { en: 'Home', hi: 'होम', mr: 'मुख्यपृष्ठ' },
  'nav.schemes': { en: 'Schemes', hi: 'योजनाएं', mr: 'योजना' },
  'nav.chat': { en: 'Chat', hi: 'चैट', mr: 'चॅट' },
  'nav.map': { en: 'Map', hi: 'नक्शा', mr: 'नकाशा' },
  'nav.profile': { en: 'Profile', hi: 'प्रोफ़ाइल', mr: 'प्रोफाइल' },
  'home.search': { en: 'Ask about any government scheme...', hi: 'किसी भी सरकारी योजना के बारे में पूछें...', mr: 'कोणत्याही सरकारी योजनेबद्दल विचारा...' },
  'home.eligibility': { en: 'Check Eligibility', hi: 'पात्रता जांचें', mr: 'पात्रता तपासा' },
  'home.findSchemes': { en: 'Find Schemes', hi: 'योजनाएं खोजें', mr: 'योजना शोधा' },
  'home.nearbyServices': { en: 'Nearby Services', hi: 'नज़दीकी सेवाएं', mr: 'जवळच्या सेवा' },
  'home.documents': { en: 'Document Guide', hi: 'दस्तावेज़ गाइड', mr: 'कागदपत्र मार्गदर्शक' },
  'home.popular': { en: 'Popular Schemes', hi: 'लोकप्रिय योजनाएं', mr: 'लोकप्रिय योजना' },
  'home.categories': { en: 'Categories', hi: 'श्रेणियां', mr: 'श्रेणी' },
  'cat.education': { en: 'Education', hi: 'शिक्षा', mr: 'शिक्षण' },
  'cat.agriculture': { en: 'Agriculture', hi: 'कृषि', mr: 'शेती' },
  'cat.employment': { en: 'Employment', hi: 'रोज़गार', mr: 'रोजगार' },
  'cat.women': { en: 'Women & Child', hi: 'महिला एवं बाल', mr: 'महिला व बाल' },
  'cat.housing': { en: 'Housing', hi: 'आवास', mr: 'गृहनिर्माण' },
  'cat.health': { en: 'Health', hi: 'स्वास्थ्य', mr: 'आरोग्य' },
  'chat.placeholder': { en: 'Ask me about any government scheme...', hi: 'मुझसे किसी भी सरकारी योजना के बारे में पूछें...', mr: 'मला कोणत्याही सरकारी योजनेबद्दल विचारा...' },
  'chat.title': { en: 'CivicAI Assistant', hi: 'सिविकAI सहायक', mr: 'सिविकAI सहाय्यक' },
  'chat.welcome': { en: 'Hello! I can help you find government schemes, check eligibility, and guide you through documents. Ask me anything!', hi: 'नमस्ते! मैं आपको सरकारी योजनाएं खोजने, पात्रता जांचने और दस्तावेज़ों में मदद कर सकता हूं। कुछ भी पूछें!', mr: 'नमस्कार! मी तुम्हाला सरकारी योजना शोधण्यात, पात्रता तपासण्यात आणि कागदपत्रांबद्दल मार्गदर्शन करू शकतो. काहीही विचारा!' },
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
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('civicai-lang');
    return (saved === 'hi' || saved === 'mr' ? saved : 'en') as Language;
  });

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    localStorage.setItem('civicai-lang', l);
  }, []);

  const t = useCallback((key: string) => {
    return translations[key]?.[lang] ?? key;
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
