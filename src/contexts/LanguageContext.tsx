import React, { createContext, useContext, useState, useCallback } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  'app.title': { en: 'CivicAssist AI', hi: 'सिविकअसिस्ट AI' },
  'app.tagline': { en: 'Your Government Schemes Assistant', hi: 'आपका सरकारी योजना सहायक' },
  'nav.home': { en: 'Home', hi: 'होम' },
  'nav.schemes': { en: 'Schemes', hi: 'योजनाएं' },
  'nav.chat': { en: 'Chat', hi: 'चैट' },
  'nav.map': { en: 'Map', hi: 'नक्शा' },
  'nav.profile': { en: 'Profile', hi: 'प्रोफ़ाइल' },
  'home.search': { en: 'Ask about any government scheme...', hi: 'किसी भी सरकारी योजना के बारे में पूछें...' },
  'home.eligibility': { en: 'Check Eligibility', hi: 'पात्रता जांचें' },
  'home.findSchemes': { en: 'Find Schemes', hi: 'योजनाएं खोजें' },
  'home.nearbyServices': { en: 'Nearby Services', hi: 'नज़दीकी सेवाएं' },
  'home.documents': { en: 'Document Guide', hi: 'दस्तावेज़ गाइड' },
  'home.popular': { en: 'Popular Schemes', hi: 'लोकप्रिय योजनाएं' },
  'home.categories': { en: 'Categories', hi: 'श्रेणियां' },
  'cat.education': { en: 'Education', hi: 'शिक्षा' },
  'cat.agriculture': { en: 'Agriculture', hi: 'कृषि' },
  'cat.employment': { en: 'Employment', hi: 'रोज़गार' },
  'cat.women': { en: 'Women & Child', hi: 'महिला एवं बाल' },
  'cat.housing': { en: 'Housing', hi: 'आवास' },
  'cat.health': { en: 'Health', hi: 'स्वास्थ्य' },
  'chat.placeholder': { en: 'Ask me about any government scheme...', hi: 'मुझसे किसी भी सरकारी योजना के बारे में पूछें...' },
  'chat.title': { en: 'CivicAssist AI', hi: 'सिविकअसिस्ट AI' },
  'chat.welcome': { en: 'Hello! I can help you find government schemes, check eligibility, and guide you through documents. Ask me anything!', hi: 'नमस्ते! मैं आपको सरकारी योजनाएं खोजने, पात्रता जांचने और दस्तावेज़ों में मदद कर सकता हूं। कुछ भी पूछें!' },
  'eligibility.title': { en: 'Check Your Eligibility', hi: 'अपनी पात्रता जांचें' },
  'eligibility.age': { en: 'Age', hi: 'उम्र' },
  'eligibility.income': { en: 'Annual Income (₹)', hi: 'वार्षिक आय (₹)' },
  'eligibility.state': { en: 'State', hi: 'राज्य' },
  'eligibility.category': { en: 'Category', hi: 'श्रेणी' },
  'eligibility.occupation': { en: 'Occupation', hi: 'व्यवसाय' },
  'eligibility.gender': { en: 'Gender', hi: 'लिंग' },
  'eligibility.check': { en: 'Check Eligibility', hi: 'पात्रता जांचें' },
  'eligibility.results': { en: 'Your Eligible Schemes', hi: 'आपकी पात्र योजनाएं' },
  'eligibility.notEligible': { en: 'Not Eligible', hi: 'पात्र नहीं' },
  'eligibility.eligible': { en: 'Eligible', hi: 'पात्र' },
  'scheme.benefits': { en: 'Benefits', hi: 'लाभ' },
  'scheme.eligibility': { en: 'Eligibility', hi: 'पात्रता' },
  'scheme.documents': { en: 'Required Documents', hi: 'आवश्यक दस्तावेज़' },
  'scheme.process': { en: 'How to Apply', hi: 'आवेदन कैसे करें' },
  'scheme.back': { en: 'Back', hi: 'वापस' },
  'profile.title': { en: 'Profile', hi: 'प्रोफ़ाइल' },
  'profile.language': { en: 'Language', hi: 'भाषा' },
  'profile.savedSchemes': { en: 'Saved Schemes', hi: 'सहेजी गई योजनाएं' },
  'profile.recentSearches': { en: 'Recent Searches', hi: 'हाल की खोजें' },
  'map.title': { en: 'Nearby Services', hi: 'नज़दीकी सेवाएं' },
  'map.govOffices': { en: 'Government Offices', hi: 'सरकारी कार्यालय' },
  'map.banks': { en: 'Banks', hi: 'बैंक' },
  'map.cyberCafe': { en: 'Cyber Cafes', hi: 'साइबर कैफे' },
  'map.comingSoon': { en: 'Map integration coming soon! For now, search on Google Maps.', hi: 'नक्शा जल्द आ रहा है! अभी Google Maps पर खोजें।' },
  'select': { en: 'Select', hi: 'चुनें' },
  'male': { en: 'Male', hi: 'पुरुष' },
  'female': { en: 'Female', hi: 'महिला' },
  'other': { en: 'Other', hi: 'अन्य' },
  'farmer': { en: 'Farmer', hi: 'किसान' },
  'student': { en: 'Student', hi: 'छात्र' },
  'employed': { en: 'Employed', hi: 'नौकरीपेशा' },
  'selfEmployed': { en: 'Self Employed', hi: 'स्वरोज़गार' },
  'unemployed': { en: 'Unemployed', hi: 'बेरोज़गार' },
  'homemaker': { en: 'Homemaker', hi: 'गृहिणी' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('en');

  const toggleLang = useCallback(() => {
    setLang(prev => prev === 'en' ? 'hi' : 'en');
  }, []);

  const t = useCallback((key: string) => {
    return translations[key]?.[lang] ?? key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
