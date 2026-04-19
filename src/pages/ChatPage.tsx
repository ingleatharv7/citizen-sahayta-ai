import { useState, useRef, useEffect } from 'react';
import { useLanguage, type Language, type LocalizedText } from '@/contexts/LanguageContext';
import { Send, Bot, User, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { startListening, speak, stopSpeaking, isVoiceSupported, type STTHandle } from '@/lib/voice';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatPage() {
  const { t, lang } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: t('chat.welcome') }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingIdx, setSpeakingIdx] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const sttRef = useRef<STTHandle | null>(null);
  const support = isVoiceSupported();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    setMessages([{ role: 'assistant', content: t('chat.welcome') }]);
  }, [lang]);

  // Cleanup voice on unmount / lang change
  useEffect(() => {
    return () => {
      sttRef.current?.stop();
      stopSpeaking();
    };
  }, []);

  const sendQuery = (text: string) => {
    if (!text.trim() || isLoading) return;
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setIsLoading(true);
    setTimeout(() => {
      const response = generateLocalResponse(text, lang);
      setMessages(prev => {
        const next = [...prev, { role: 'assistant', content: response } as Message];
        // Auto-speak reply if user used voice
        if (isListeningRef.current) {
          isListeningRef.current = false;
          setSpeakingIdx(next.length - 1);
          speak(response, lang);
        }
        return next;
      });
      setIsLoading(false);
    }, 800);
  };

  // Track whether last input came from voice (so we auto-TTS reply)
  const isListeningRef = useRef(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput('');
    sendQuery(text);
  };

  const toggleMic = () => {
    if (isListening) {
      sttRef.current?.stop();
      sttRef.current = null;
      setIsListening(false);
      return;
    }
    stopSpeaking();
    setSpeakingIdx(null);
    isListeningRef.current = true;
    const handle = startListening({
      lang,
      onResult: (text, isFinal) => {
        setInput(text);
        if (isFinal) {
          setIsListening(false);
          sttRef.current = null;
          setInput('');
          sendQuery(text);
        }
      },
      onError: () => {
        setIsListening(false);
        sttRef.current = null;
        isListeningRef.current = false;
      },
      onEnd: () => {
        setIsListening(false);
        sttRef.current = null;
      },
    });
    if (handle) {
      sttRef.current = handle;
      setIsListening(true);
    } else {
      isListeningRef.current = false;
    }
  };

  const toggleSpeak = (idx: number, content: string) => {
    if (speakingIdx === idx) {
      stopSpeaking();
      setSpeakingIdx(null);
    } else {
      setSpeakingIdx(idx);
      speak(content, lang);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <div className="px-4 py-2 border-b border-border">
        <h1 className="text-sm font-semibold text-foreground">{t('chat.title')}</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-sm bg-primary flex items-center justify-center flex-shrink-0">
                <Bot size={14} className="text-primary-foreground" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-md px-3 py-2 text-sm ${
              msg.role === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-foreground'
            }`}>
              <div className="whitespace-pre-wrap">{msg.content}</div>
              {msg.role === 'assistant' && support.tts && (
                <button
                  onClick={() => toggleSpeak(i, msg.content)}
                  className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors"
                  aria-label={speakingIdx === i ? t('voice.stop') : t('voice.play')}
                >
                  {speakingIdx === i ? <VolumeX size={12} /> : <Volume2 size={12} />}
                  {speakingIdx === i ? t('voice.stop') : t('voice.play')}
                </button>
              )}
            </div>
            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-sm bg-muted flex items-center justify-center flex-shrink-0">
                <User size={14} className="text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-sm bg-primary flex items-center justify-center">
              <Bot size={14} className="text-primary-foreground" />
            </div>
            <div className="bg-secondary rounded-md px-3 py-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="px-4 py-3 border-t border-border flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={isListening ? `${t('voice.listen')}...` : t('chat.placeholder')}
          className="flex-1 px-3 py-2.5 rounded-sm border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {support.stt && (
          <button
            type="button"
            onClick={toggleMic}
            className={`px-3 rounded-sm border transition-colors flex items-center justify-center ${
              isListening
                ? 'bg-destructive text-destructive-foreground border-destructive animate-pulse'
                : 'bg-card text-foreground border-border hover:bg-secondary'
            }`}
            aria-label={isListening ? t('voice.stop') : t('voice.listen')}
            title={isListening ? t('voice.stop') : t('voice.listen')}
          >
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>
        )}
        <button type="submit" disabled={isLoading || !input.trim()} className="btn-civic !px-3">
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}

function pick(record: LocalizedText<string>, lang: Language): string {
  return record[lang] ?? record.en;
}

function generateLocalResponse(query: string, lang: Language): string {
  const q = query.toLowerCase();

  if (q.includes('awas') || q.includes('house') || q.includes('आवास') || q.includes('घर') || q.includes('આવાસ') || q.includes('ਘਰ') || q.includes('ఇల్లు') || q.includes('வீடு')) {
    return pick({
      en: 'PM Awas Yojana gives up to ₹2.67 lakh subsidy for building a house. Eligibility: Annual income below ₹3 lakh, first-time home buyer. Documents needed: Aadhaar Card, Income certificate, Bank account. Apply at pmaymis.gov.in.',
      hi: 'पीएम आवास योजना में ₹2.67 लाख तक की सब्सिडी मिलती है। पात्रता: वार्षिक आय ₹3 लाख से कम, पहली बार घर खरीदने वाले। आवश्यक दस्तावेज़: आधार कार्ड, आय प्रमाण पत्र, बैंक खाता। pmaymis.gov.in पर आवेदन करें।',
      mr: 'पीएम आवास योजनेत घर बांधण्यासाठी ₹2.67 लाख पर्यंत अनुदान मिळते. पात्रता: वार्षिक उत्पन्न ₹3 लाखांपेक्षा कमी, पहिल्यांदा घर खरेदी करणारे. आवश्यक कागदपत्रे: आधार कार्ड, उत्पन्न प्रमाणपत्र, बँक खाते. pmaymis.gov.in वर अर्ज करा.',
      gu: 'પીએમ આવાસ યોજનામાં ઘર બાંધવા માટે ₹2.67 લાખ સુધીની સબસિડી મળે છે. પાત્રતા: વાર્ષિક આવક ₹3 લાખથી ઓછી, પ્રથમ વખત ઘર ખરીદનાર. દસ્તાવેજો: આધાર કાર્ડ, આવક પ્રમાણપત્ર, બેંક ખાતું. pmaymis.gov.in પર અરજી કરો.',
      pa: 'ਪੀਐਮ ਆਵਾਸ ਯੋਜਨਾ ਘਰ ਬਣਾਉਣ ਲਈ ₹2.67 ਲੱਖ ਤੱਕ ਸਬਸਿਡੀ ਦਿੰਦੀ ਹੈ। ਯੋਗਤਾ: ਸਾਲਾਨਾ ਆਮਦਨ ₹3 ਲੱਖ ਤੋਂ ਘੱਟ, ਪਹਿਲੀ ਵਾਰ ਘਰ ਖਰੀਦਣ ਵਾਲੇ। ਦਸਤਾਵੇਜ਼: ਆਧਾਰ ਕਾਰਡ, ਆਮਦਨ ਸਰਟੀਫਿਕੇਟ, ਬੈਂਕ ਖਾਤਾ। pmaymis.gov.in ਉੱਤੇ ਅਰਜ਼ੀ ਦਿਓ।',
      te: 'పీఎం ఆవాస్ యోజన ఇల్లు నిర్మించడానికి ₹2.67 లక్షల వరకు సబ్సిడీ ఇస్తుంది. అర్హత: వార్షిక ఆదాయం ₹3 లక్షల కంటే తక్కువ, మొదటిసారి ఇంటి కొనుగోలుదారు. డాక్యుమెంట్లు: ఆధార్ కార్డ్, ఆదాయ ధ్రువీకరణ, బ్యాంక్ ఖాతా. pmaymis.gov.in లో దరఖాస్తు చేయండి.',
      ta: 'பிஎம் ஆவாஸ் யோஜனா வீடு கட்ட ₹2.67 லட்சம் வரை மானியம் வழங்குகிறது. தகுதி: ஆண்டு வருமானம் ₹3 லட்சத்துக்கு குறைவாக, முதல் முறை வீடு வாங்குபவர். ஆவணங்கள்: ஆதார் அட்டை, வருமான சான்றிதழ், வங்கி கணக்கு. pmaymis.gov.in இல் விண்ணப்பிக்கவும்.',
    }, lang);
  }

  if (q.includes('kisan') || q.includes('farmer') || q.includes('किसान') || q.includes('शेतकरी') || q.includes('ખેડૂત') || q.includes('ਕਿਸਾਨ') || q.includes('రైతు') || q.includes('விவசாயி')) {
    return pick({
      en: 'PM-KISAN gives farmers ₹6,000 per year in 3 installments of ₹2,000 each, directly in bank account. Register at pmkisan.gov.in. You need Aadhaar Card and land documents.',
      hi: 'पीएम-किसान योजना में किसानों को ₹6,000 प्रति वर्ष मिलते हैं। ₹2,000 की 3 किस्तों में सीधे बैंक खाते में। pmkisan.gov.in पर रजिस्टर करें।',
      mr: 'पीएम-किसान योजनेत शेतकऱ्यांना दरवर्षी ₹6,000 मिळतात. ₹2,000 च्या 3 हप्त्यांमध्ये थेट बँक खात्यात. pmkisan.gov.in वर नोंदणी करा.',
      gu: 'પીએમ-કિસાન યોજનામાં ખેડૂતોને દર વર્ષે ₹6,000 મળે છે. ₹2,000 ના 3 હપ્તામાં સીધા બેંક ખાતામાં. pmkisan.gov.in પર નોંધણી કરો.',
      pa: 'ਪੀਐਮ-ਕਿਸਾਨ ਯੋਜਨਾ ਕਿਸਾਨਾਂ ਨੂੰ ਹਰ ਸਾਲ ₹6,000 ਦਿੰਦੀ ਹੈ। ₹2,000 ਦੀਆਂ 3 ਕਿਸ਼ਤਾਂ ਵਿੱਚ ਸਿੱਧੇ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ। pmkisan.gov.in ਉੱਤੇ ਰਜਿਸਟਰ ਕਰੋ।',
      te: 'పీఎం-కిసాన్ రైతులకు సంవత్సరానికి ₹6,000 ఇస్తుంది. ₹2,000 చొప్పున 3 వాయిదాలలో నేరుగా బ్యాంక్ ఖాతాలోకి. pmkisan.gov.in లో నమోదు చేసుకోండి.',
      ta: 'பிஎம்-கிசான் விவசாயிகளுக்கு ஆண்டுக்கு ₹6,000 வழங்குகிறது. ₹2,000 வீதம் 3 தவணைகளில் நேரடியாக வங்கி கணக்கில். pmkisan.gov.in இல் பதிவு செய்யவும்.',
    }, lang);
  }

  if (q.includes('scholarship') || q.includes('छात्रवृत्ति') || q.includes('शिष्यवृत्ती') || q.includes('student') || q.includes('छात्र') || q.includes('विद्यार्थी') || q.includes('શિષ્યવૃત્તિ') || q.includes('ਵਜ਼ੀਫਾ') || q.includes('స్కాలర్‌షిప్') || q.includes('உதவித்தொகை')) {
    return pick({
      en: 'National Scholarship Portal (scholarships.gov.in) has many scholarships. Documents needed: Aadhaar Card, Income certificate, Marksheet, Caste certificate. Apply online.',
      hi: 'राष्ट्रीय छात्रवृत्ति पोर्टल (scholarships.gov.in) पर कई छात्रवृत्तियां उपलब्ध हैं। आवश्यक दस्तावेज़: आधार कार्ड, आय प्रमाण पत्र, मार्कशीट, जाति प्रमाण पत्र।',
      mr: 'राष्ट्रीय शिष्यवृत्ती पोर्टल (scholarships.gov.in) वर अनेक शिष्यवृत्त्या उपलब्ध आहेत. आवश्यक कागदपत्रे: आधार कार्ड, उत्पन्न प्रमाणपत्र, गुणपत्रक, जात प्रमाणपत्र.',
      gu: 'નેશનલ સ્કોલરશિપ પોર્ટલ (scholarships.gov.in) પર ઘણી શિષ્યવૃત્તિઓ ઉપલબ્ધ છે. દસ્તાવેજો: આધાર કાર્ડ, આવક પ્રમાણપત્ર, માર્કશીટ, જાતિ પ્રમાણપત્ર.',
      pa: 'ਨੈਸ਼ਨਲ ਸਕਾਲਰਸ਼ਿਪ ਪੋਰਟਲ (scholarships.gov.in) ਉੱਤੇ ਕਈ ਵਜ਼ੀਫੇ ਉਪਲਬਧ ਹਨ। ਦਸਤਾਵੇਜ਼: ਆਧਾਰ ਕਾਰਡ, ਆਮਦਨ ਸਰਟੀਫਿਕੇਟ, ਮਾਰਕਸ਼ੀਟ, ਜਾਤੀ ਸਰਟੀਫਿਕੇਟ।',
      te: 'నేషనల్ స్కాలర్‌షిప్ పోర్టల్ (scholarships.gov.in) లో అనేక స్కాలర్‌షిప్‌లు అందుబాటులో ఉన్నాయి. డాక్యుమెంట్లు: ఆధార్ కార్డ్, ఆదాయ ధ్రువీకరణ, మార్క్‌షీట్, కుల ధ్రువీకరణ.',
      ta: 'தேசிய உதவித்தொகை போர்ட்டலில் (scholarships.gov.in) பல உதவித்தொகைகள் உள்ளன. ஆவணங்கள்: ஆதார் அட்டை, வருமான சான்றிதழ், மதிப்பெண் பட்டியல், சாதி சான்றிதழ்.',
    }, lang);
  }

  if (q.includes('document') || q.includes('दस्तावेज़') || q.includes('कागदपत्र') || q.includes('દસ્તાવેજ') || q.includes('ਦਸਤਾਵੇਜ਼') || q.includes('డాక్యుమెంట్') || q.includes('ஆவணம்')) {
    return pick({
      en: 'Most government schemes need:\n1. Aadhaar Card\n2. Income Certificate\n3. Bank Account\n4. Ration Card\n5. Caste Certificate (if applicable)',
      hi: 'अधिकांश सरकारी योजनाओं के लिए ज़रूरी दस्तावेज़:\n1. आधार कार्ड\n2. आय प्रमाण पत्र\n3. बैंक खाता\n4. राशन कार्ड\n5. जाति प्रमाण पत्र',
      mr: 'बहुतेक सरकारी योजनांसाठी आवश्यक:\n1. आधार कार्ड\n2. उत्पन्न प्रमाणपत्र\n3. बँक खाते\n4. रेशन कार्ड\n5. जात प्रमाणपत्र',
      gu: 'મોટાભાગની સરકારી યોજનાઓ માટે જરૂરી:\n1. આધાર કાર્ડ\n2. આવક પ્રમાણપત્ર\n3. બેંક ખાતું\n4. રેશન કાર્ડ\n5. જાતિ પ્રમાણપત્ર',
      pa: 'ਜ਼ਿਆਦਾਤਰ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ ਲਈ ਲੋੜੀਂਦੇ:\n1. ਆਧਾਰ ਕਾਰਡ\n2. ਆਮਦਨ ਸਰਟੀਫਿਕੇਟ\n3. ਬੈਂਕ ਖਾਤਾ\n4. ਰਾਸ਼ਨ ਕਾਰਡ\n5. ਜਾਤੀ ਸਰਟੀਫਿਕੇਟ',
      te: 'చాలా ప్రభుత్వ పథకాలకు అవసరం:\n1. ఆధార్ కార్డ్\n2. ఆదాయ ధ్రువీకరణ\n3. బ్యాంక్ ఖాతా\n4. రేషన్ కార్డ్\n5. కుల ధ్రువీకరణ',
      ta: 'பெரும்பாலான அரசு திட்டங்களுக்கு தேவை:\n1. ஆதார் அட்டை\n2. வருமான சான்றிதழ்\n3. வங்கி கணக்கு\n4. ரேஷன் அட்டை\n5. சாதி சான்றிதழ்',
    }, lang);
  }

  if (q.includes('eligible') || q.includes('पात्र') || q.includes('योग्य') || q.includes('પાત્ર') || q.includes('ਯੋਗ') || q.includes('అర్హత') || q.includes('தகுதி')) {
    return pick({
      en: 'Tap the "Check Eligibility" button to find schemes you qualify for. Fill in your age, income, and occupation.',
      hi: 'पात्रता जांचने के लिए "पात्रता जांचें" बटन पर क्लिक करें।',
      mr: 'पात्रता तपासण्यासाठी "पात्रता तपासा" बटणावर क्लिक करा.',
      gu: 'પાત્રતા તપાસવા માટે "પાત્રતા તપાસો" બટન દબાવો.',
      pa: 'ਯੋਗਤਾ ਜਾਂਚਣ ਲਈ "ਯੋਗਤਾ ਜਾਂਚੋ" ਬਟਨ ਦਬਾਓ।',
      te: 'అర్హతను తనిఖీ చేయడానికి "అర్హత తనిఖీ" బటన్ నొక్కండి.',
      ta: 'தகுதியை சரிபார்க்க "தகுதியைச் சரிபார்" பொத்தானை அழுத்தவும்.',
    }, lang);
  }

  return pick({
    en: 'I can help you! Ask me about any government scheme, eligibility, or required documents. For example: "Tell me about PM Awas Yojana".',
    hi: 'मैं आपकी मदद कर सकता हूं! किसी भी सरकारी योजना, पात्रता या दस्तावेज़ के बारे में पूछें।',
    mr: 'मी तुम्हाला मदत करू शकतो! कोणत्याही सरकारी योजना, पात्रता किंवा कागदपत्रांबद्दल विचारा.',
    gu: 'હું તમારી મદદ કરી શકું છું! કોઈપણ સરકારી યોજના, પાત્રતા અથવા દસ્તાવેજો વિશે પૂછો.',
    pa: 'ਮੈਂ ਤੁਹਾਡੀ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ! ਕਿਸੇ ਵੀ ਸਰਕਾਰੀ ਯੋਜਨਾ, ਯੋਗਤਾ ਜਾਂ ਦਸਤਾਵੇਜ਼ਾਂ ਬਾਰੇ ਪੁੱਛੋ।',
    te: 'నేను మీకు సహాయం చేయగలను! ఏదైనా ప్రభుత్వ పథకం, అర్హత లేదా డాక్యుమెంట్ల గురించి అడగండి.',
    ta: 'நான் உங்களுக்கு உதவ முடியும்! எந்த அரசு திட்டம், தகுதி அல்லது ஆவணங்கள் பற்றியும் கேளுங்கள்.',
  }, lang);
}
