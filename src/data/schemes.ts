import type { Language } from '@/contexts/LanguageContext';

export interface Scheme {
  id: string;
  name: Record<Language, string>;
  category: string;
  description: Record<Language, string>;
  benefits: Record<Language, string[]>;
  eligibility: Record<Language, string[]>;
  documents: Record<Language, string[]>;
  process: Record<Language, string[]>;
  criteria: {
    minAge?: number;
    maxAge?: number;
    maxIncome?: number;
    gender?: string[];
    categories?: string[];
    occupations?: string[];
  };
}

export const schemes: Scheme[] = [
  {
    id: 'pm-kisan',
    name: { en: 'PM-KISAN', hi: 'पीएम-किसान', mr: 'पीएम-किसान' },
    category: 'agriculture',
    description: {
      en: 'Financial help of ₹6,000 per year to farmer families. Money comes directly to your bank account in 3 parts of ₹2,000 each.',
      hi: 'किसान परिवारों को ₹6,000 प्रति वर्ष की आर्थिक सहायता। पैसा सीधे आपके बैंक खाते में ₹2,000 की 3 किस्तों में आता है।',
      mr: 'शेतकरी कुटुंबांना दरवर्षी ₹6,000 आर्थिक मदत. पैसे थेट तुमच्या बँक खात्यात ₹2,000 च्या 3 हप्त्यांमध्ये येतात.'
    },
    benefits: {
      en: ['₹6,000 per year directly in bank account', '₹2,000 every 4 months', 'No middlemen involved'],
      hi: ['₹6,000 प्रति वर्ष सीधे बैंक खाते में', 'हर 4 महीने में ₹2,000', 'कोई बिचौलिया नहीं'],
      mr: ['दरवर्षी ₹6,000 थेट बँक खात्यात', 'दर 4 महिन्यांनी ₹2,000', 'कोणताही मध्यस्थ नाही']
    },
    eligibility: {
      en: ['Must be a farmer family', 'Must own cultivable land', 'Family income should be reasonable'],
      hi: ['किसान परिवार होना चाहिए', 'खेती योग्य भूमि का मालिक होना चाहिए', 'परिवार की आय उचित होनी चाहिए'],
      mr: ['शेतकरी कुटुंब असावे', 'शेतीयोग्य जमीन असावी', 'कुटुंबाचे उत्पन्न योग्य असावे']
    },
    documents: {
      en: ['Aadhaar Card', 'Land ownership records', 'Bank account details', 'Mobile number linked to Aadhaar'],
      hi: ['आधार कार्ड', 'भूमि स्वामित्व रिकॉर्ड', 'बैंक खाता विवरण', 'आधार से जुड़ा मोबाइल नंबर'],
      mr: ['आधार कार्ड', 'जमीन मालकी नोंदी', 'बँक खाते तपशील', 'आधारशी जोडलेला मोबाइल नंबर']
    },
    process: {
      en: ['Visit pmkisan.gov.in or nearest CSC center', 'Fill the registration form', 'Submit Aadhaar and land details', 'Money will start coming in your bank account'],
      hi: ['pmkisan.gov.in या नज़दीकी CSC केंद्र पर जाएं', 'पंजीकरण फॉर्म भरें', 'आधार और भूमि विवरण जमा करें', 'पैसा आपके बैंक खाते में आने लगेगा'],
      mr: ['pmkisan.gov.in किंवा जवळच्या CSC केंद्रावर जा', 'नोंदणी फॉर्म भरा', 'आधार आणि जमीन तपशील जमा करा', 'पैसे तुमच्या बँक खात्यात येऊ लागतील']
    },
    criteria: { occupations: ['farmer'], minAge: 18 }
  },
  {
    id: 'pm-awas',
    name: { en: 'PM Awas Yojana', hi: 'पीएम आवास योजना', mr: 'पीएम आवास योजना' },
    category: 'housing',
    description: {
      en: 'Government helps you build your own house. Get up to ₹2.67 lakh subsidy for building a pucca house.',
      hi: 'सरकार आपको अपना घर बनाने में मदद करती है। पक्का घर बनाने के लिए ₹2.67 लाख तक की सब्सिडी पाएं।',
      mr: 'सरकार तुम्हाला स्वतःचे घर बांधण्यात मदत करते. पक्के घर बांधण्यासाठी ₹2.67 लाख पर्यंत अनुदान मिळवा.'
    },
    benefits: {
      en: ['Up to ₹2.67 lakh subsidy', 'Interest subsidy on home loans', 'Pucca house with basic amenities'],
      hi: ['₹2.67 लाख तक की सब्सिडी', 'होम लोन पर ब्याज सब्सिडी', 'बुनियादी सुविधाओं के साथ पक्का घर'],
      mr: ['₹2.67 लाख पर्यंत अनुदान', 'गृहकर्जावर व्याज अनुदान', 'मूलभूत सुविधांसह पक्के घर']
    },
    eligibility: {
      en: ['Annual income below ₹3 lakh (EWS)', 'Should not own a pucca house', 'First-time home buyer'],
      hi: ['वार्षिक आय ₹3 लाख से कम (EWS)', 'पक्का घर नहीं होना चाहिए', 'पहली बार घर खरीदने वाले'],
      mr: ['वार्षिक उत्पन्न ₹3 लाखांपेक्षा कमी (EWS)', 'पक्के घर नसावे', 'पहिल्यांदा घर खरेदी करणारे']
    },
    documents: {
      en: ['Aadhaar Card', 'Income certificate', 'BPL certificate (if applicable)', 'Bank account details', 'Land documents'],
      hi: ['आधार कार्ड', 'आय प्रमाण पत्र', 'BPL प्रमाण पत्र (यदि लागू हो)', 'बैंक खाता विवरण', 'भूमि दस्तावेज़'],
      mr: ['आधार कार्ड', 'उत्पन्न प्रमाणपत्र', 'BPL प्रमाणपत्र (लागू असल्यास)', 'बँक खाते तपशील', 'जमीन कागदपत्रे']
    },
    process: {
      en: ['Apply online at pmaymis.gov.in', 'Or visit nearest CSC / municipal office', 'Fill application with income and family details', 'Submit documents for verification', 'Subsidy credited after approval'],
      hi: ['pmaymis.gov.in पर ऑनलाइन आवेदन करें', 'या नज़दीकी CSC / नगरपालिका कार्यालय जाएं', 'आय और परिवार विवरण के साथ आवेदन भरें', 'सत्यापन के लिए दस्तावेज़ जमा करें', 'स्वीकृति के बाद सब्सिडी जमा की जाएगी'],
      mr: ['pmaymis.gov.in वर ऑनलाइन अर्ज करा', 'किंवा जवळच्या CSC / नगरपालिका कार्यालयात जा', 'उत्पन्न आणि कुटुंब तपशीलांसह अर्ज भरा', 'पडताळणीसाठी कागदपत्रे जमा करा', 'मंजुरीनंतर अनुदान जमा होईल']
    },
    criteria: { maxIncome: 300000, minAge: 18 }
  },
  {
    id: 'sukanya-samriddhi',
    name: { en: 'Sukanya Samriddhi Yojana', hi: 'सुकन्या समृद्धि योजना', mr: 'सुकन्या समृद्धी योजना' },
    category: 'women',
    description: {
      en: 'Savings scheme for girl child. Open account with just ₹250. Get high interest rate and tax benefits.',
      hi: 'बेटियों के लिए बचत योजना। सिर्फ ₹250 से खाता खोलें। ऊंची ब्याज दर और टैक्स लाभ पाएं।',
      mr: 'मुलींसाठी बचत योजना. फक्त ₹250 मध्ये खाते उघडा. उच्च व्याजदर आणि कर लाभ मिळवा.'
    },
    benefits: {
      en: ['High interest rate (~8%)', 'Tax benefits under Section 80C', 'Minimum ₹250 deposit', 'Maturity at age 21'],
      hi: ['ऊंची ब्याज दर (~8%)', 'धारा 80C के तहत टैक्स लाभ', 'न्यूनतम ₹250 जमा', '21 वर्ष की उम्र में परिपक्वता'],
      mr: ['उच्च व्याजदर (~8%)', 'कलम 80C अंतर्गत कर लाभ', 'किमान ₹250 ठेव', '21 व्या वर्षी परिपक्वता']
    },
    eligibility: {
      en: ['Girl child below 10 years', 'Only 2 accounts per family', 'Indian citizen'],
      hi: ['10 वर्ष से कम उम्र की बालिका', 'प्रति परिवार केवल 2 खाते', 'भारतीय नागरिक'],
      mr: ['10 वर्षांखालील मुलगी', 'प्रत्येक कुटुंबात फक्त 2 खाती', 'भारतीय नागरिक']
    },
    documents: {
      en: ['Birth certificate of girl child', 'Aadhaar of parent/guardian', 'Address proof', 'Passport size photos'],
      hi: ['बालिका का जन्म प्रमाण पत्र', 'माता-पिता/अभिभावक का आधार', 'पता प्रमाण', 'पासपोर्ट साइज़ फोटो'],
      mr: ['मुलीचे जन्म प्रमाणपत्र', 'पालकांचे आधार', 'पत्ता पुरावा', 'पासपोर्ट आकाराचे फोटो']
    },
    process: {
      en: ['Visit nearest post office or bank', 'Fill Sukanya Samriddhi account form', 'Submit girl child birth certificate', 'Deposit minimum ₹250', 'Account is opened immediately'],
      hi: ['नज़दीकी डाकघर या बैंक जाएं', 'सुकन्या समृद्धि खाता फॉर्म भरें', 'बालिका का जन्म प्रमाण पत्र जमा करें', 'न्यूनतम ₹250 जमा करें', 'खाता तुरंत खुल जाता है'],
      mr: ['जवळच्या पोस्ट ऑफिस किंवा बँकेत जा', 'सुकन्या समृद्धी खाते फॉर्म भरा', 'मुलीचे जन्म प्रमाणपत्र जमा करा', 'किमान ₹250 जमा करा', 'खाते लगेच उघडले जाते']
    },
    criteria: { gender: ['female'], maxAge: 10 }
  },
  {
    id: 'mudra-loan',
    name: { en: 'PM MUDRA Yojana', hi: 'पीएम मुद्रा योजना', mr: 'पीएम मुद्रा योजना' },
    category: 'employment',
    description: {
      en: 'Get loans up to ₹10 lakh to start or grow your small business. No collateral needed for small loans.',
      hi: 'अपना छोटा व्यवसाय शुरू करने या बढ़ाने के लिए ₹10 लाख तक का लोन पाएं। छोटे लोन के लिए कोई गारंटी नहीं।',
      mr: 'तुमचा छोटा व्यवसाय सुरू करण्यासाठी किंवा वाढवण्यासाठी ₹10 लाख पर्यंत कर्ज मिळवा. छोट्या कर्जासाठी तारण नाही.'
    },
    benefits: {
      en: ['Loans up to ₹10 lakh', 'No collateral for small loans', 'Low interest rates', 'Three categories: Shishu, Kishor, Tarun'],
      hi: ['₹10 लाख तक का लोन', 'छोटे लोन के लिए कोई गारंटी नहीं', 'कम ब्याज दरें', 'तीन श्रेणियां: शिशु, किशोर, तरुण'],
      mr: ['₹10 लाख पर्यंत कर्ज', 'छोट्या कर्जासाठी तारण नाही', 'कमी व्याजदर', 'तीन श्रेणी: शिशु, किशोर, तरुण']
    },
    eligibility: {
      en: ['Indian citizen', 'Non-farm small business owner', 'Small manufacturer or trader', 'Self-employed individuals'],
      hi: ['भारतीय नागरिक', 'गैर-कृषि छोटे व्यवसाय के मालिक', 'छोटे निर्माता या व्यापारी', 'स्वरोज़गार व्यक्ति'],
      mr: ['भारतीय नागरिक', 'शेतीव्यतिरिक्त लहान व्यवसाय मालक', 'लहान उत्पादक किंवा व्यापारी', 'स्वयंरोजगार व्यक्ती']
    },
    documents: {
      en: ['Aadhaar Card', 'PAN Card', 'Business plan', 'Address proof', 'Bank statements (6 months)'],
      hi: ['आधार कार्ड', 'पैन कार्ड', 'व्यवसाय योजना', 'पता प्रमाण', 'बैंक स्टेटमेंट (6 महीने)'],
      mr: ['आधार कार्ड', 'पॅन कार्ड', 'व्यवसाय योजना', 'पत्ता पुरावा', 'बँक स्टेटमेंट (6 महिने)']
    },
    process: {
      en: ['Visit any bank or NBFC', 'Fill MUDRA loan application', 'Submit business plan and documents', 'Bank verifies and approves', 'Loan disbursed to your account'],
      hi: ['किसी भी बैंक या NBFC में जाएं', 'मुद्रा लोन आवेदन भरें', 'व्यवसाय योजना और दस्तावेज़ जमा करें', 'बैंक सत्यापन और स्वीकृति', 'लोन आपके खाते में जमा'],
      mr: ['कोणत्याही बँकेत किंवा NBFC मध्ये जा', 'मुद्रा कर्ज अर्ज भरा', 'व्यवसाय योजना आणि कागदपत्रे जमा करा', 'बँक पडताळणी आणि मंजुरी', 'कर्ज तुमच्या खात्यात जमा']
    },
    criteria: { minAge: 18, occupations: ['selfEmployed'] }
  },
  {
    id: 'scholarship-nsp',
    name: { en: 'National Scholarship Portal', hi: 'राष्ट्रीय छात्रवृत्ति पोर्टल', mr: 'राष्ट्रीय शिष्यवृत्ती पोर्टल' },
    category: 'education',
    description: {
      en: 'Various scholarships for students from Class 1 to PhD. Get money for fees, books, and living expenses.',
      hi: 'कक्षा 1 से PhD तक के छात्रों के लिए विभिन्न छात्रवृत्तियां। फीस, किताबें और रहने के खर्च के लिए पैसे पाएं।',
      mr: 'इयत्ता 1 ते PhD पर्यंतच्या विद्यार्थ्यांसाठी विविध शिष्यवृत्त्या. फी, पुस्तके आणि राहणीमानाच्या खर्चासाठी पैसे मिळवा.'
    },
    benefits: {
      en: ['Tuition fee support', 'Maintenance allowance', 'Book allowance', 'Multiple schemes in one portal'],
      hi: ['ट्यूशन फीस सहायता', 'रखरखाव भत्ता', 'किताब भत्ता', 'एक पोर्टल में कई योजनाएं'],
      mr: ['शिक्षण शुल्क मदत', 'देखभाल भत्ता', 'पुस्तक भत्ता', 'एका पोर्टलवर अनेक योजना']
    },
    eligibility: {
      en: ['Students enrolled in recognized institutions', 'Family income criteria varies by scheme', 'SC/ST/OBC/Minority students get priority', 'Good academic performance'],
      hi: ['मान्यता प्राप्त संस्थानों में नामांकित छात्र', 'पारिवारिक आय मानदंड योजना के अनुसार', 'SC/ST/OBC/अल्पसंख्यक छात्रों को प्राथमिकता', 'अच्छा शैक्षणिक प्रदर्शन'],
      mr: ['मान्यताप्राप्त संस्थांमधील विद्यार्थी', 'कुटुंबाच्या उत्पन्नाचे निकष योजनेनुसार बदलतात', 'SC/ST/OBC/अल्पसंख्याक विद्यार्थ्यांना प्राधान्य', 'चांगली शैक्षणिक कामगिरी']
    },
    documents: {
      en: ['Aadhaar Card', 'Income certificate', 'Caste certificate (if applicable)', 'Previous marksheet', 'Bank account details', 'Institution verification'],
      hi: ['आधार कार्ड', 'आय प्रमाण पत्र', 'जाति प्रमाण पत्र (यदि लागू हो)', 'पिछली मार्कशीट', 'बैंक खाता विवरण', 'संस्थान सत्यापन'],
      mr: ['आधार कार्ड', 'उत्पन्न प्रमाणपत्र', 'जात प्रमाणपत्र (लागू असल्यास)', 'मागील गुणपत्रक', 'बँक खाते तपशील', 'संस्था पडताळणी']
    },
    process: {
      en: ['Register on scholarships.gov.in', 'Fill scholarship application form', 'Upload required documents', 'Get institution verification', 'Track application status online'],
      hi: ['scholarships.gov.in पर पंजीकरण करें', 'छात्रवृत्ति आवेदन फॉर्म भरें', 'आवश्यक दस्तावेज़ अपलोड करें', 'संस्थान सत्यापन प्राप्त करें', 'ऑनलाइन आवेदन स्थिति ट्रैक करें'],
      mr: ['scholarships.gov.in वर नोंदणी करा', 'शिष्यवृत्ती अर्ज भरा', 'आवश्यक कागदपत्रे अपलोड करा', 'संस्था पडताळणी मिळवा', 'ऑनलाइन अर्जाची स्थिती तपासा']
    },
    criteria: { occupations: ['student'], maxAge: 35 }
  },
  {
    id: 'ayushman-bharat',
    name: { en: 'Ayushman Bharat', hi: 'आयुष्मान भारत', mr: 'आयुष्मान भारत' },
    category: 'health',
    description: {
      en: 'Free health insurance of ₹5 lakh per family per year. Get free treatment at any empanelled hospital.',
      hi: 'प्रति परिवार प्रति वर्ष ₹5 लाख का मुफ्त स्वास्थ्य बीमा। किसी भी सूचीबद्ध अस्पताल में मुफ्त इलाज पाएं।',
      mr: 'प्रति कुटुंब दरवर्षी ₹5 लाख मोफत आरोग्य विमा. कोणत्याही सूचीबद्ध रुग्णालयात मोफत उपचार मिळवा.'
    },
    benefits: {
      en: ['₹5 lakh free health cover per year', 'Cashless treatment at hospitals', 'Covers 1,500+ medical procedures', 'No age limit'],
      hi: ['प्रति वर्ष ₹5 लाख मुफ्त स्वास्थ्य कवर', 'अस्पतालों में कैशलेस इलाज', '1,500+ चिकित्सा प्रक्रियाएं कवर', 'कोई उम्र सीमा नहीं'],
      mr: ['दरवर्षी ₹5 लाख मोफत आरोग्य कवर', 'रुग्णालयांमध्ये कॅशलेस उपचार', '1,500+ वैद्यकीय प्रक्रिया कव्हर', 'वयाची मर्यादा नाही']
    },
    eligibility: {
      en: ['Families listed in SECC 2011 database', 'BPL families', 'No existing health insurance', 'Both rural and urban families'],
      hi: ['SECC 2011 डेटाबेस में सूचीबद्ध परिवार', 'BPL परिवार', 'कोई मौजूदा स्वास्थ्य बीमा नहीं', 'ग्रामीण और शहरी दोनों परिवार'],
      mr: ['SECC 2011 डेटाबेसमध्ये सूचीबद्ध कुटुंबे', 'BPL कुटुंबे', 'विद्यमान आरोग्य विमा नसावा', 'ग्रामीण आणि शहरी दोन्ही कुटुंबे']
    },
    documents: {
      en: ['Aadhaar Card', 'Ration card', 'SECC listed family ID', 'Mobile number'],
      hi: ['आधार कार्ड', 'राशन कार्ड', 'SECC सूचीबद्ध परिवार ID', 'मोबाइल नंबर'],
      mr: ['आधार कार्ड', 'रेशन कार्ड', 'SECC सूचीबद्ध कुटुंब ID', 'मोबाइल नंबर']
    },
    process: {
      en: ['Check eligibility at mera.pmjay.gov.in', 'Visit nearest Ayushman Bharat center', 'Show Aadhaar and ration card', 'Get Ayushman card for free', 'Show card at hospital for free treatment'],
      hi: ['mera.pmjay.gov.in पर पात्रता जांचें', 'नज़दीकी आयुष्मान भारत केंद्र जाएं', 'आधार और राशन कार्ड दिखाएं', 'मुफ्त में आयुष्मान कार्ड प्राप्त करें', 'मुफ्त इलाज के लिए अस्पताल में कार्ड दिखाएं'],
      mr: ['mera.pmjay.gov.in वर पात्रता तपासा', 'जवळच्या आयुष्मान भारत केंद्रावर जा', 'आधार आणि रेशन कार्ड दाखवा', 'मोफत आयुष्मान कार्ड मिळवा', 'मोफत उपचारासाठी रुग्णालयात कार्ड दाखवा']
    },
    criteria: { maxIncome: 250000 }
  },
];

export const categories = [
  { id: 'education', icon: 'GraduationCap' },
  { id: 'agriculture', icon: 'Wheat' },
  { id: 'employment', icon: 'Briefcase' },
  { id: 'women', icon: 'Heart' },
  { id: 'housing', icon: 'Home' },
  { id: 'health', icon: 'Stethoscope' },
] as const;

export function checkEligibility(userProfile: {
  age: number;
  income: number;
  gender: string;
  category: string;
  occupation: string;
}): { eligible: Scheme[]; notEligible: { scheme: Scheme; reasons: Record<Language, string>[] }[] } {
  const eligible: Scheme[] = [];
  const notEligible: { scheme: Scheme; reasons: Record<Language, string>[] }[] = [];

  for (const scheme of schemes) {
    const reasons: Record<Language, string>[] = [];
    const c = scheme.criteria;

    if (c.minAge && userProfile.age < c.minAge) {
      reasons.push({ en: `Must be at least ${c.minAge} years old`, hi: `कम से कम ${c.minAge} वर्ष की उम्र होनी चाहिए`, mr: `किमान ${c.minAge} वर्षे वय असावे` });
    }
    if (c.maxAge && userProfile.age > c.maxAge) {
      reasons.push({ en: `Must be under ${c.maxAge} years old`, hi: `${c.maxAge} वर्ष से कम उम्र होनी चाहिए`, mr: `${c.maxAge} वर्षांपेक्षा कमी वय असावे` });
    }
    if (c.maxIncome && userProfile.income > c.maxIncome) {
      reasons.push({ en: `Annual income must be below ₹${c.maxIncome.toLocaleString()}`, hi: `वार्षिक आय ₹${c.maxIncome.toLocaleString()} से कम होनी चाहिए`, mr: `वार्षिक उत्पन्न ₹${c.maxIncome.toLocaleString()} पेक्षा कमी असावे` });
    }
    if (c.gender && !c.gender.includes(userProfile.gender)) {
      reasons.push({ en: `Only for ${c.gender.join('/')}`, hi: `केवल ${c.gender.join('/')} के लिए`, mr: `फक्त ${c.gender.join('/')} साठी` });
    }
    if (c.occupations && !c.occupations.includes(userProfile.occupation)) {
      reasons.push({ en: `Must be a ${c.occupations.join('/')}`, hi: `${c.occupations.join('/')} होना चाहिए`, mr: `${c.occupations.join('/')} असणे आवश्यक` });
    }

    if (reasons.length === 0) {
      eligible.push(scheme);
    } else {
      notEligible.push({ scheme, reasons });
    }
  }

  return { eligible, notEligible };
}
