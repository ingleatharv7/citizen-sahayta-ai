import type { LocalizedText } from '@/contexts/LanguageContext';

export interface Scheme {
  id: string;
  name: LocalizedText<string>;
  category: string;
  description: LocalizedText<string>;
  benefits: LocalizedText<string[]>;
  eligibility: LocalizedText<string[]>;
  documents: LocalizedText<string[]>;
  process: LocalizedText<string[]>;
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
  {
    id: 'ujjwala',
    name: { en: 'PM Ujjwala Yojana', hi: 'पीएम उज्ज्वला योजना', mr: 'पीएम उज्ज्वला योजना' },
    category: 'women',
    description: {
      en: 'Free LPG gas connection for women from BPL families to replace harmful wood/coal cooking.',
      hi: 'BPL परिवारों की महिलाओं के लिए मुफ्त एलपीजी गैस कनेक्शन ताकि लकड़ी/कोयले से होने वाले धुएं से छुटकारा मिले।',
      mr: 'BPL कुटुंबातील महिलांना मोफत एलपीजी गॅस कनेक्शन, लाकूड/कोळसा वापर बंद करण्यासाठी.'
    },
    benefits: {
      en: ['Free LPG gas connection', 'Free first refill and stove', 'Subsidy on refills', 'Cleaner & safer cooking'],
      hi: ['मुफ्त एलपीजी कनेक्शन', 'पहली रिफिल और चूल्हा मुफ्त', 'रिफिल पर सब्सिडी', 'स्वच्छ और सुरक्षित खाना पकाना'],
      mr: ['मोफत एलपीजी कनेक्शन', 'पहिली रिफिल आणि शेगडी मोफत', 'रिफिलवर अनुदान', 'स्वच्छ व सुरक्षित स्वयंपाक']
    },
    eligibility: {
      en: ['Adult woman from BPL household', 'No existing LPG connection in household', 'Indian citizen'],
      hi: ['BPL परिवार की वयस्क महिला', 'घर में पहले से एलपीजी कनेक्शन न हो', 'भारतीय नागरिक'],
      mr: ['BPL कुटुंबातील प्रौढ महिला', 'घरात आधीच एलपीजी कनेक्शन नसावे', 'भारतीय नागरिक']
    },
    documents: {
      en: ['Aadhaar Card', 'BPL ration card', 'Bank account details', 'Passport size photo', 'Address proof'],
      hi: ['आधार कार्ड', 'BPL राशन कार्ड', 'बैंक खाता विवरण', 'पासपोर्ट साइज फोटो', 'पता प्रमाण'],
      mr: ['आधार कार्ड', 'BPL रेशन कार्ड', 'बँक खाते तपशील', 'पासपोर्ट आकाराचा फोटो', 'पत्ता पुरावा']
    },
    process: {
      en: ['Visit nearest LPG distributor or pmuy.gov.in', 'Fill KYC form with Aadhaar', 'Submit BPL proof', 'Receive connection within few days'],
      hi: ['नज़दीकी एलपीजी वितरक या pmuy.gov.in पर जाएं', 'आधार के साथ KYC फॉर्म भरें', 'BPL प्रमाण जमा करें', 'कुछ दिनों में कनेक्शन प्राप्त करें'],
      mr: ['जवळच्या एलपीजी वितरकाकडे किंवा pmuy.gov.in वर जा', 'आधारसह KYC फॉर्म भरा', 'BPL पुरावा द्या', 'काही दिवसांत कनेक्शन मिळेल']
    },
    criteria: { gender: ['female'], minAge: 18, maxIncome: 100000 }
  },
  {
    id: 'atal-pension',
    name: { en: 'Atal Pension Yojana', hi: 'अटल पेंशन योजना', mr: 'अटल पेंशन योजना' },
    category: 'employment',
    description: {
      en: 'Guaranteed monthly pension of ₹1,000 to ₹5,000 after age 60 for workers in unorganised sector.',
      hi: '60 वर्ष की आयु के बाद असंगठित क्षेत्र के श्रमिकों को ₹1,000 से ₹5,000 तक की मासिक पेंशन की गारंटी।',
      mr: '60 वर्षांनंतर असंघटित क्षेत्रातील कामगारांना ₹1,000 ते ₹5,000 मासिक पेन्शनची हमी.'
    },
    benefits: {
      en: ['Guaranteed pension ₹1,000–₹5,000/month after 60', 'Government co-contribution for eligible subscribers', 'Pension to spouse after death', 'Lump sum to nominee'],
      hi: ['60 के बाद ₹1,000–₹5,000 प्रति माह गारंटीड पेंशन', 'पात्र ग्राहकों के लिए सरकारी सह-योगदान', 'मृत्यु के बाद जीवनसाथी को पेंशन', 'नामिती को एकमुश्त राशि'],
      mr: ['60 नंतर ₹1,000–₹5,000 दरमहा हमी पेन्शन', 'पात्र ग्राहकांसाठी सरकारी सह-योगदान', 'मृत्यूनंतर जोडीदाराला पेन्शन', 'नामिनीला एकरकमी रक्कम']
    },
    eligibility: {
      en: ['Indian citizen aged 18–40', 'Must have a savings bank account', 'Should not be income tax payer (for govt co-contribution)'],
      hi: ['18–40 वर्ष का भारतीय नागरिक', 'बचत बैंक खाता होना चाहिए', 'आयकर दाता न हो (सरकारी सह-योगदान के लिए)'],
      mr: ['18–40 वयाचा भारतीय नागरिक', 'बचत बँक खाते आवश्यक', 'आयकर भरणारा नसावा (सरकारी सह-योगदानासाठी)']
    },
    documents: {
      en: ['Aadhaar Card', 'Savings bank account details', 'Mobile number', 'KYC documents'],
      hi: ['आधार कार्ड', 'बचत बैंक खाता विवरण', 'मोबाइल नंबर', 'KYC दस्तावेज़'],
      mr: ['आधार कार्ड', 'बचत बँक खाते तपशील', 'मोबाइल नंबर', 'KYC कागदपत्रे']
    },
    process: {
      en: ['Visit your bank or post office', 'Fill APY registration form', 'Choose pension amount', 'Auto-debit set up from bank account'],
      hi: ['अपने बैंक या डाकघर जाएं', 'APY पंजीकरण फॉर्म भरें', 'पेंशन राशि चुनें', 'बैंक खाते से ऑटो-डेबिट सेट करें'],
      mr: ['तुमच्या बँकेत किंवा पोस्ट ऑफिसमध्ये जा', 'APY नोंदणी फॉर्म भरा', 'पेन्शन रक्कम निवडा', 'बँक खात्यातून ऑटो-डेबिट सेट करा']
    },
    criteria: { minAge: 18, maxAge: 40 }
  },
  {
    id: 'svanidhi',
    name: { en: 'PM SVANidhi Yojana', hi: 'पीएम स्वनिधि योजना', mr: 'पीएम स्वनिधी योजना' },
    category: 'employment',
    description: {
      en: 'Collateral-free working capital loan up to ₹50,000 for street vendors to restart their business.',
      hi: 'रेहड़ी-पटरी विक्रेताओं को व्यवसाय फिर से शुरू करने के लिए ₹50,000 तक का बिना गारंटी कर्ज।',
      mr: 'रस्त्यावरील विक्रेत्यांना व्यवसाय पुन्हा सुरू करण्यासाठी ₹50,000 पर्यंत विनातारण कर्ज.'
    },
    benefits: {
      en: ['Loan up to ₹50,000 in 3 tranches (₹10K, ₹20K, ₹50K)', '7% interest subsidy', 'Cashback on digital transactions', 'No collateral required'],
      hi: ['3 चरणों में ₹50,000 तक का ऋण (₹10K, ₹20K, ₹50K)', '7% ब्याज सब्सिडी', 'डिजिटल लेनदेन पर कैशबैक', 'कोई गारंटी नहीं'],
      mr: ['3 टप्प्यांत ₹50,000 पर्यंत कर्ज (₹10K, ₹20K, ₹50K)', '7% व्याज अनुदान', 'डिजिटल व्यवहारांवर कॅशबॅक', 'तारण नाही']
    },
    eligibility: {
      en: ['Street vendor with vending certificate / ID card', 'Vending in urban / peri-urban area', 'Indian citizen aged 18+'],
      hi: ['वेंडिंग प्रमाणपत्र/ID कार्ड वाला रेहड़ी विक्रेता', 'शहरी/उप-शहरी क्षेत्र में बिक्री', '18+ भारतीय नागरिक'],
      mr: ['विक्रेता प्रमाणपत्र/ID कार्ड असलेला विक्रेता', 'शहरी/उप-शहरी भागात विक्री', '18+ भारतीय नागरिक']
    },
    documents: {
      en: ['Aadhaar Card', 'Vendor ID / certificate of vending', 'Bank account details', 'Mobile number'],
      hi: ['आधार कार्ड', 'विक्रेता ID / वेंडिंग प्रमाणपत्र', 'बैंक खाता विवरण', 'मोबाइल नंबर'],
      mr: ['आधार कार्ड', 'विक्रेता ID / विक्री प्रमाणपत्र', 'बँक खाते तपशील', 'मोबाइल नंबर']
    },
    process: {
      en: ['Apply at pmsvanidhi.mohua.gov.in or nearest bank/CSC', 'Submit vendor proof and Aadhaar', 'Bank verifies and disburses loan', 'Repay in 12 months to qualify for next tranche'],
      hi: ['pmsvanidhi.mohua.gov.in या नज़दीकी बैंक/CSC पर आवेदन करें', 'विक्रेता प्रमाण और आधार जमा करें', 'बैंक सत्यापन करके ऋण जारी करता है', 'अगली किस्त के लिए 12 महीने में चुकाएं'],
      mr: ['pmsvanidhi.mohua.gov.in किंवा जवळच्या बँकेत/CSC अर्ज करा', 'विक्रेता पुरावा व आधार द्या', 'बँक पडताळणी करून कर्ज देते', 'पुढील हप्त्यासाठी 12 महिन्यांत परतफेड करा']
    },
    criteria: { minAge: 18, occupations: ['vendor', 'self-employed'] }
  },
  {
    id: 'stand-up-india',
    name: { en: 'Stand-Up India Scheme', hi: 'स्टैंड-अप इंडिया योजना', mr: 'स्टँड-अप इंडिया योजना' },
    category: 'employment',
    description: {
      en: 'Bank loans between ₹10 lakh and ₹1 crore for SC/ST and women entrepreneurs to set up greenfield enterprises.',
      hi: 'अनुसूचित जाति/जनजाति और महिला उद्यमियों को नया उद्यम शुरू करने के लिए ₹10 लाख से ₹1 करोड़ तक का बैंक ऋण।',
      mr: 'SC/ST व महिला उद्योजकांना नवीन उद्योग सुरू करण्यासाठी ₹10 लाख ते ₹1 कोटीपर्यंत बँक कर्ज.'
    },
    benefits: {
      en: ['Loan ₹10 lakh – ₹1 crore', 'Composite loan (term + working capital)', 'Repayment up to 7 years', 'Handholding support'],
      hi: ['₹10 लाख – ₹1 करोड़ का ऋण', 'कंपोजिट लोन (टर्म + वर्किंग कैपिटल)', '7 साल तक चुकौती', 'सहायक मार्गदर्शन'],
      mr: ['₹10 लाख – ₹1 कोटी कर्ज', 'एकत्रित कर्ज (टर्म + खेळते भांडवल)', '7 वर्षांपर्यंत परतफेड', 'मार्गदर्शन सहाय्य']
    },
    eligibility: {
      en: ['SC/ST or woman entrepreneur aged 18+', 'For greenfield project in manufacturing/services/trading', '51%+ shareholding by SC/ST/woman in non-individual enterprise'],
      hi: ['18+ SC/ST या महिला उद्यमी', 'विनिर्माण/सेवा/व्यापार में ग्रीनफील्ड परियोजना के लिए', 'गैर-व्यक्तिगत उद्यम में SC/ST/महिला की 51%+ हिस्सेदारी'],
      mr: ['18+ SC/ST किंवा महिला उद्योजक', 'उत्पादन/सेवा/व्यापारातील नवीन प्रकल्पासाठी', 'गैर-व्यक्तिगत उद्योगात SC/ST/महिलेची 51%+ भागीदारी']
    },
    documents: {
      en: ['Aadhaar & PAN', 'Caste certificate (for SC/ST)', 'Project report / business plan', 'Bank statements', 'Address & identity proof'],
      hi: ['आधार और PAN', 'जाति प्रमाण पत्र (SC/ST के लिए)', 'प्रोजेक्ट रिपोर्ट / बिज़नेस प्लान', 'बैंक स्टेटमेंट', 'पता और पहचान प्रमाण'],
      mr: ['आधार व PAN', 'जात प्रमाणपत्र (SC/ST साठी)', 'प्रकल्प अहवाल / व्यवसाय योजना', 'बँक स्टेटमेंट', 'पत्ता व ओळख पुरावा']
    },
    process: {
      en: ['Register at standupmitra.in', 'Submit business plan', 'Bank evaluates the proposal', 'Loan sanctioned and disbursed'],
      hi: ['standupmitra.in पर पंजीकरण करें', 'बिज़नेस प्लान जमा करें', 'बैंक प्रस्ताव की जांच करता है', 'ऋण स्वीकृत और जारी किया जाता है'],
      mr: ['standupmitra.in वर नोंदणी करा', 'व्यवसाय योजना सादर करा', 'बँक प्रस्तावाचे मूल्यांकन करते', 'कर्ज मंजूर व वितरित होते']
    },
    criteria: { minAge: 18, categories: ['SC', 'ST'], gender: ['female'] }
  },
  {
    id: 'pmfby',
    name: { en: 'PM Fasal Bima Yojana', hi: 'पीएम फसल बीमा योजना', mr: 'पीएम फसल बीमा योजना' },
    category: 'agriculture',
    description: {
      en: 'Crop insurance scheme providing financial support to farmers in case of crop loss due to natural calamities, pests or diseases.',
      hi: 'प्राकृतिक आपदाओं, कीटों या बीमारियों से फसल नुकसान पर किसानों को वित्तीय सहायता देने वाली फसल बीमा योजना।',
      mr: 'नैसर्गिक आपत्ती, कीड किंवा रोगांमुळे पीक नुकसान झाल्यास शेतकऱ्यांना आर्थिक मदत देणारी पीक विमा योजना.'
    },
    benefits: {
      en: ['Low premium: 2% (Kharif), 1.5% (Rabi), 5% (commercial/horticulture)', 'Full sum insured payout on crop loss', 'Covers pre-sowing to post-harvest losses', 'Direct bank account claim payment'],
      hi: ['कम प्रीमियम: 2% (खरीफ), 1.5% (रबी), 5% (वाणिज्यिक/बागवानी)', 'फसल हानि पर पूरी बीमा राशि', 'बुवाई से पहले से कटाई के बाद तक कवरेज', 'सीधे बैंक खाते में दावा भुगतान'],
      mr: ['कमी प्रीमियम: 2% (खरीप), 1.5% (रब्बी), 5% (व्यापारी/फलोत्पादन)', 'पीक नुकसान झाल्यास पूर्ण विमा रक्कम', 'पेरणीपूर्व ते कापणी नंतरचे नुकसान कवच', 'थेट बँक खात्यात दावा भरणा']
    },
    eligibility: {
      en: ['All farmers (owner cultivators, tenants, sharecroppers)', 'Growing notified crops in notified areas', 'Loanee farmers auto-enrolled; non-loanee can apply voluntarily'],
      hi: ['सभी किसान (मालिक, किरायेदार, बटाईदार)', 'अधिसूचित क्षेत्रों में अधिसूचित फसलें उगाने वाले', 'ऋणी किसान स्वतः नामांकित; गैर-ऋणी स्वेच्छा से आवेदन कर सकते हैं'],
      mr: ['सर्व शेतकरी (मालक, भाडेकरू, वाटेकरी)', 'अधिसूचित क्षेत्रांत अधिसूचित पिके घेणारे', 'कर्जदार शेतकरी स्वयं नोंदणीकृत; गैर-कर्जदार स्वेच्छेने अर्ज करू शकतात']
    },
    documents: {
      en: ['Aadhaar Card', 'Land ownership / tenancy records', 'Bank account details', 'Sowing certificate / declaration', 'Khasra / Khatauni'],
      hi: ['आधार कार्ड', 'भूमि स्वामित्व/किरायेदारी रिकॉर्ड', 'बैंक खाता विवरण', 'बुवाई प्रमाण पत्र / घोषणा', 'खसरा / खतौनी'],
      mr: ['आधार कार्ड', 'जमीन मालकी/भाडे नोंदी', 'बँक खाते तपशील', 'पेरणी प्रमाणपत्र / घोषणा', 'खसरा / खतौनी']
    },
    process: {
      en: ['Apply at pmfby.gov.in or nearest bank/CSC/insurance agent', 'Submit crop & land details before cut-off date', 'Pay nominal premium', 'Insurance auto-applies; claim assessed after loss'],
      hi: ['pmfby.gov.in या नज़दीकी बैंक/CSC/बीमा एजेंट पर आवेदन करें', 'अंतिम तिथि से पहले फसल और भूमि विवरण जमा करें', 'मामूली प्रीमियम का भुगतान करें', 'बीमा स्वतः लागू होता है; नुकसान के बाद दावे का आकलन'],
      mr: ['pmfby.gov.in किंवा जवळच्या बँकेत/CSC/विमा एजंटकडे अर्ज करा', 'अंतिम तारखेपूर्वी पीक व जमीन तपशील द्या', 'अल्प प्रीमियम भरा', 'विमा स्वयं लागू; नुकसानानंतर दाव्याचे मूल्यांकन']
    },
    criteria: { occupations: ['farmer'], minAge: 18 }
  },
  {
    id: 'e-shram',
    name: { en: 'e-Shram Card', hi: 'ई-श्रम कार्ड', mr: 'ई-श्रम कार्ड' },
    category: 'employment',
    description: {
      en: 'National database of unorganised workers providing a Universal Account Number (UAN) and access to social security benefits.',
      hi: 'असंगठित श्रमिकों का राष्ट्रीय डेटाबेस, जो UAN और सामाजिक सुरक्षा लाभ प्रदान करता है।',
      mr: 'असंघटित कामगारांचे राष्ट्रीय डेटाबेस, जे UAN व सामाजिक सुरक्षा लाभ देते.'
    },
    benefits: {
      en: ['Free e-Shram card with UAN', 'Accident insurance ₹2 lakh under PMSBY', 'Access to govt welfare schemes', 'Portability across states'],
      hi: ['UAN के साथ मुफ्त ई-श्रम कार्ड', 'PMSBY के तहत ₹2 लाख दुर्घटना बीमा', 'सरकारी कल्याण योजनाओं तक पहुंच', 'राज्यों में पोर्टेबिलिटी'],
      mr: ['UAN सह मोफत ई-श्रम कार्ड', 'PMSBY अंतर्गत ₹2 लाख अपघात विमा', 'सरकारी कल्याण योजनांपर्यंत प्रवेश', 'राज्यांमध्ये पोर्टेबिलिटी']
    },
    eligibility: {
      en: ['Unorganised worker aged 16–59', 'Not a member of EPFO/ESIC/NPS', 'Indian citizen with Aadhaar-linked mobile'],
      hi: ['16–59 वर्ष का असंगठित श्रमिक', 'EPFO/ESIC/NPS का सदस्य न हो', 'आधार से जुड़े मोबाइल वाला भारतीय नागरिक'],
      mr: ['16–59 वर्षांचा असंघटित कामगार', 'EPFO/ESIC/NPS सदस्य नसावा', 'आधारशी जोडलेला मोबाइल असलेला भारतीय नागरिक']
    },
    documents: {
      en: ['Aadhaar Card', 'Aadhaar-linked mobile number', 'Bank account details'],
      hi: ['आधार कार्ड', 'आधार से जुड़ा मोबाइल नंबर', 'बैंक खाता विवरण'],
      mr: ['आधार कार्ड', 'आधारशी जोडलेला मोबाइल नंबर', 'बँक खाते तपशील']
    },
    process: {
      en: ['Visit eshram.gov.in or nearest CSC', 'Self-register using Aadhaar OTP', 'Fill occupation and bank details', 'Download e-Shram card instantly'],
      hi: ['eshram.gov.in या नज़दीकी CSC पर जाएं', 'आधार OTP से स्वयं पंजीकरण करें', 'व्यवसाय और बैंक विवरण भरें', 'तुरंत ई-श्रम कार्ड डाउनलोड करें'],
      mr: ['eshram.gov.in किंवा जवळच्या CSC वर जा', 'आधार OTP वापरून स्वतः नोंदणी करा', 'व्यवसाय व बँक तपशील भरा', 'त्वरित ई-श्रम कार्ड डाउनलोड करा']
    },
    criteria: { minAge: 16, maxAge: 59 }
  },
  {
    id: 'beti-bachao',
    name: { en: 'Beti Bachao Beti Padhao', hi: 'बेटी बचाओ बेटी पढ़ाओ', mr: 'बेटी बचाओ बेटी पढाओ' },
    category: 'women',
    description: {
      en: 'National initiative to address declining child sex ratio and promote education and empowerment of the girl child.',
      hi: 'गिरते बाल लिंगानुपात को रोकने और बालिकाओं की शिक्षा एवं सशक्तिकरण को बढ़ावा देने वाली राष्ट्रीय पहल।',
      mr: 'घटत्या बाल लिंग गुणोत्तराला तोंड देण्यासाठी व मुलींच्या शिक्षण व सक्षमीकरणाला चालना देणारी राष्ट्रीय मोहीम.'
    },
    benefits: {
      en: ['Awareness & advocacy for girl child', 'Linkage with Sukanya Samriddhi Yojana', 'Support for girl education programmes', 'Action against sex-selective practices'],
      hi: ['बालिकाओं के लिए जागरूकता और वकालत', 'सुकन्या समृद्धि योजना से जुड़ाव', 'बालिका शिक्षा कार्यक्रमों के लिए समर्थन', 'लिंग चयन प्रथाओं के विरुद्ध कार्रवाई'],
      mr: ['मुलींसाठी जनजागृती व वकिली', 'सुकन्या समृद्धी योजनेशी जोड', 'मुलींच्या शिक्षण कार्यक्रमांना पाठिंबा', 'लिंग निवड प्रथांविरुद्ध कारवाई']
    },
    eligibility: {
      en: ['All families with girl child', 'Special focus on districts with low child sex ratio', 'Girl child below 10 years (for SSY linkage)'],
      hi: ['बालिका वाले सभी परिवार', 'कम बाल लिंगानुपात वाले जिलों पर विशेष ध्यान', '10 वर्ष से कम बालिका (SSY जुड़ाव के लिए)'],
      mr: ['मुलगी असलेले सर्व कुटुंब', 'कमी बाल लिंग गुणोत्तर असलेल्या जिल्ह्यांवर विशेष लक्ष', '10 वर्षांखालील मुलगी (SSY जोडणीसाठी)']
    },
    documents: {
      en: ['Birth certificate of girl child', 'Aadhaar (parent & child)', 'Address proof', 'Bank account (for linked schemes)'],
      hi: ['बालिका का जन्म प्रमाण पत्र', 'आधार (माता-पिता व बच्चा)', 'पता प्रमाण', 'बैंक खाता (संबंधित योजनाओं के लिए)'],
      mr: ['मुलीचा जन्म प्रमाणपत्र', 'आधार (पालक व मुलगी)', 'पत्ता पुरावा', 'बँक खाते (संबंधित योजनांसाठी)']
    },
    process: {
      en: ['Contact local Anganwadi / Women & Child Development office', 'Register girl child for awareness programmes', 'Open SSY account for financial benefits', 'Avail linked education schemes'],
      hi: ['स्थानीय आंगनवाड़ी / महिला एवं बाल विकास कार्यालय से संपर्क करें', 'जागरूकता कार्यक्रमों के लिए बालिका को पंजीकृत करें', 'वित्तीय लाभ हेतु SSY खाता खोलें', 'संबंधित शिक्षा योजनाओं का लाभ लें'],
      mr: ['स्थानिक अंगणवाडी / महिला व बाल विकास कार्यालयाशी संपर्क करा', 'जागरूकता कार्यक्रमांसाठी मुलीची नोंदणी करा', 'आर्थिक लाभासाठी SSY खाते उघडा', 'संबंधित शिक्षण योजनांचा लाभ घ्या']
    },
    criteria: { gender: ['female'] }
  },
  {
    id: 'skill-india',
    name: { en: 'Skill India Mission (PMKVY)', hi: 'स्किल इंडिया मिशन (PMKVY)', mr: 'स्किल इंडिया मिशन (PMKVY)' },
    category: 'education',
    description: {
      en: 'Free short-term skill training and certification for youth under Pradhan Mantri Kaushal Vikas Yojana to improve employability.',
      hi: 'युवाओं की रोजगार क्षमता बढ़ाने के लिए प्रधानमंत्री कौशल विकास योजना के तहत मुफ्त अल्पकालिक कौशल प्रशिक्षण व प्रमाणन।',
      mr: 'युवकांच्या रोजगारक्षमतेसाठी प्रधानमंत्री कौशल्य विकास योजनेअंतर्गत मोफत अल्पकालीन कौशल्य प्रशिक्षण व प्रमाणपत्र.'
    },
    benefits: {
      en: ['Free industry-relevant training', 'Government-recognised certification', 'Placement assistance', 'Boarding & lodging support in some courses'],
      hi: ['मुफ्त उद्योग-प्रासंगिक प्रशिक्षण', 'सरकार द्वारा मान्यता प्राप्त प्रमाणन', 'प्लेसमेंट सहायता', 'कुछ पाठ्यक्रमों में आवास/भोजन सहायता'],
      mr: ['मोफत उद्योगाशी सुसंगत प्रशिक्षण', 'सरकारमान्य प्रमाणपत्र', 'नोकरी मिळवण्यासाठी मदत', 'काही अभ्यासक्रमांत निवास/भोजन सहाय्य']
    },
    eligibility: {
      en: ['Indian citizen aged 15–45', 'School/college dropout or unemployed youth', 'Should have basic literacy in chosen sector'],
      hi: ['15–45 वर्ष का भारतीय नागरिक', 'स्कूल/कॉलेज छोड़ चुका या बेरोज़गार युवा', 'चुने गए क्षेत्र में बुनियादी साक्षरता'],
      mr: ['15–45 वर्षांचा भारतीय नागरिक', 'शाळा/कॉलेज सोडलेले किंवा बेरोजगार युवक', 'निवडलेल्या क्षेत्रात मूलभूत साक्षरता']
    },
    documents: {
      en: ['Aadhaar Card', 'Educational certificates (if any)', 'Bank account details', 'Passport size photo'],
      hi: ['आधार कार्ड', 'शैक्षणिक प्रमाण पत्र (यदि हों)', 'बैंक खाता विवरण', 'पासपोर्ट साइज फोटो'],
      mr: ['आधार कार्ड', 'शैक्षणिक प्रमाणपत्रे (असल्यास)', 'बँक खाते तपशील', 'पासपोर्ट आकाराचा फोटो']
    },
    process: {
      en: ['Visit pmkvyofficial.org or skillindiadigital.gov.in', 'Choose course and nearest training centre', 'Register with Aadhaar', 'Complete training and assessment to get certificate'],
      hi: ['pmkvyofficial.org या skillindiadigital.gov.in पर जाएं', 'कोर्स और नज़दीकी प्रशिक्षण केंद्र चुनें', 'आधार से पंजीकरण करें', 'प्रशिक्षण व मूल्यांकन पूरा कर प्रमाणपत्र प्राप्त करें'],
      mr: ['pmkvyofficial.org किंवा skillindiadigital.gov.in वर जा', 'अभ्यासक्रम व जवळचे प्रशिक्षण केंद्र निवडा', 'आधारसह नोंदणी करा', 'प्रशिक्षण व मूल्यांकन पूर्ण करून प्रमाणपत्र मिळवा']
    },
    criteria: { minAge: 15, maxAge: 45 }
  },
  {
    id: 'naps',
    name: { en: 'National Apprenticeship Promotion Scheme', hi: 'राष्ट्रीय शिक्षुता प्रोत्साहन योजना', mr: 'राष्ट्रीय शिकाऊ प्रोत्साहन योजना' },
    category: 'employment',
    description: {
      en: 'Promotes apprenticeship training by sharing 25% of stipend (up to ₹1,500/month) paid to apprentices by employers.',
      hi: 'नियोक्ताओं द्वारा प्रशिक्षुओं को दिए जाने वाले स्टाइपेंड का 25% (अधिकतम ₹1,500/माह) सरकार वहन करती है।',
      mr: 'नियोक्ते शिकाऊंना देणाऱ्या स्टायपेंडच्या 25% (कमाल ₹1,500/महिना) सरकार भरते.'
    },
    benefits: {
      en: ['Monthly stipend during apprenticeship', '25% stipend share by Govt up to ₹1,500/month', 'On-the-job training in real industry', 'NCVET recognised certificate after completion'],
      hi: ['प्रशिक्षुता के दौरान मासिक स्टाइपेंड', '₹1,500/माह तक 25% स्टाइपेंड सरकार से', 'वास्तविक उद्योग में ऑन-द-जॉब प्रशिक्षण', 'पूर्णता पर NCVET मान्यता प्राप्त प्रमाणपत्र'],
      mr: ['शिकाऊ काळात मासिक स्टायपेंड', '₹1,500/महिना पर्यंत 25% स्टायपेंड सरकारकडून', 'वास्तविक उद्योगात ऑन-द-जॉब प्रशिक्षण', 'पूर्ण झाल्यावर NCVET मान्यता प्राप्त प्रमाणपत्र']
    },
    eligibility: {
      en: ['Indian citizen aged 14+ (18+ for hazardous industries)', 'Minimum educational qualification per trade', 'Not already engaged as apprentice elsewhere'],
      hi: ['14+ भारतीय नागरिक (खतरनाक उद्योगों के लिए 18+)', 'ट्रेड के अनुसार न्यूनतम शैक्षणिक योग्यता', 'पहले से कहीं प्रशिक्षु न हो'],
      mr: ['14+ भारतीय नागरिक (धोकादायक उद्योगांसाठी 18+)', 'ट्रेडनुसार किमान शैक्षणिक पात्रता', 'इतरत्र शिकाऊ म्हणून नसलेला']
    },
    documents: {
      en: ['Aadhaar Card', 'Educational qualification certificates', 'Bank account details', 'Passport size photo'],
      hi: ['आधार कार्ड', 'शैक्षणिक योग्यता प्रमाण पत्र', 'बैंक खाता विवरण', 'पासपोर्ट साइज फोटो'],
      mr: ['आधार कार्ड', 'शैक्षणिक पात्रता प्रमाणपत्रे', 'बँक खाते तपशील', 'पासपोर्ट आकाराचा फोटो']
    },
    process: {
      en: ['Register at apprenticeshipindia.gov.in', 'Search and apply for apprenticeship opportunities', 'Get selected by employer', 'Sign apprenticeship contract and start training'],
      hi: ['apprenticeshipindia.gov.in पर पंजीकरण करें', 'प्रशिक्षुता अवसर खोजें और आवेदन करें', 'नियोक्ता द्वारा चयन हो', 'अनुबंध पर हस्ताक्षर कर प्रशिक्षण शुरू करें'],
      mr: ['apprenticeshipindia.gov.in वर नोंदणी करा', 'शिकाऊ संधी शोधा व अर्ज करा', 'नियोक्त्याकडून निवड व्हा', 'करारावर सही करून प्रशिक्षण सुरू करा']
    },
    criteria: { minAge: 14, maxAge: 35 }
  },
  {
    id: 'jan-dhan',
    name: { en: 'PM Jan Dhan Yojana', hi: 'पीएम जन धन योजना', mr: 'पीएम जन धन योजना' },
    category: 'employment',
    description: {
      en: 'Zero-balance bank account for every household with RuPay debit card, accident insurance and overdraft facility.',
      hi: 'हर परिवार के लिए शून्य बैलेंस बैंक खाता, RuPay डेबिट कार्ड, दुर्घटना बीमा व ओवरड्राफ्ट सुविधा के साथ।',
      mr: 'प्रत्येक कुटुंबासाठी शून्य शिल्लक बँक खाते, RuPay डेबिट कार्ड, अपघात विमा व ओव्हरड्राफ्ट सुविधेसह.'
    },
    benefits: {
      en: ['Zero balance savings account', 'Free RuPay debit card', '₹2 lakh accident insurance cover', 'Overdraft up to ₹10,000', 'Direct benefit transfer of govt subsidies'],
      hi: ['शून्य बैलेंस बचत खाता', 'मुफ्त RuPay डेबिट कार्ड', '₹2 लाख दुर्घटना बीमा कवर', '₹10,000 तक ओवरड्राफ्ट', 'सरकारी सब्सिडी का सीधा हस्तांतरण'],
      mr: ['शून्य शिल्लक बचत खाते', 'मोफत RuPay डेबिट कार्ड', '₹2 लाख अपघात विमा कवच', '₹10,000 पर्यंत ओव्हरड्राफ्ट', 'सरकारी अनुदानांचे थेट हस्तांतरण']
    },
    eligibility: {
      en: ['Any Indian citizen aged 10+', 'No existing bank account preferred', 'Minor accounts via guardian'],
      hi: ['10+ कोई भी भारतीय नागरिक', 'पहले से बैंक खाता न होना बेहतर', 'नाबालिग के लिए अभिभावक के माध्यम से'],
      mr: ['10+ कोणताही भारतीय नागरिक', 'आधीच बँक खाते नसणे प्राधान्य', 'अल्पवयीनांसाठी पालकांमार्फत']
    },
    documents: {
      en: ['Aadhaar Card', 'PAN (if available)', 'Address proof', 'Passport size photo'],
      hi: ['आधार कार्ड', 'PAN (यदि उपलब्ध हो)', 'पता प्रमाण', 'पासपोर्ट साइज फोटो'],
      mr: ['आधार कार्ड', 'PAN (असल्यास)', 'पत्ता पुरावा', 'पासपोर्ट आकाराचा फोटो']
    },
    process: {
      en: ['Visit any bank branch or Bank Mitra', 'Fill PMJDY account opening form', 'Submit Aadhaar / KYC documents', 'Receive passbook and RuPay card'],
      hi: ['किसी भी बैंक शाखा या बैंक मित्र के पास जाएं', 'PMJDY खाता खोलने का फॉर्म भरें', 'आधार / KYC दस्तावेज़ जमा करें', 'पासबुक और RuPay कार्ड प्राप्त करें'],
      mr: ['कोणत्याही बँक शाखेत किंवा बँक मित्राकडे जा', 'PMJDY खाते उघडण्याचा फॉर्म भरा', 'आधार / KYC कागदपत्रे द्या', 'पासबुक व RuPay कार्ड मिळवा']
    },
    criteria: { minAge: 10 }
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
}): { eligible: Scheme[]; notEligible: { scheme: Scheme; reasons: LocalizedText<string>[] }[] } {
  const eligible: Scheme[] = [];
  const notEligible: { scheme: Scheme; reasons: LocalizedText<string>[] }[] = [];

  for (const scheme of schemes) {
    const reasons: LocalizedText<string>[] = [];
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
