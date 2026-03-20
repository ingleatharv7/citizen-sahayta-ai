import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Send, Bot, User } from 'lucide-react';

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
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Reset welcome message when language changes
  useEffect(() => {
    setMessages([{ role: 'assistant', content: t('chat.welcome') }]);
  }, [lang]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    // Simple local AI response (will be replaced with Lovable AI later)
    setTimeout(() => {
      const response = generateLocalResponse(userMsg, lang);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 800);
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
              {msg.content}
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
          placeholder={t('chat.placeholder')}
          className="flex-1 px-3 py-2.5 rounded-sm border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button type="submit" disabled={isLoading || !input.trim()} className="btn-civic !px-3">
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}

function generateLocalResponse(query: string, lang: string): string {
  const q = query.toLowerCase();

  if (q.includes('awas') || q.includes('house') || q.includes('आवास') || q.includes('घर')) {
    return lang === 'hi'
      ? 'पीएम आवास योजना में ₹2.67 लाख तक की सब्सिडी मिलती है। पात्रता: वार्षिक आय ₹3 लाख से कम, पहली बार घर खरीदने वाले। आवश्यक दस्तावेज़: आधार कार्ड, आय प्रमाण पत्र, बैंक खाता। pmaymis.gov.in पर आवेदन करें।'
      : 'PM Awas Yojana gives up to ₹2.67 lakh subsidy for building a house. Eligibility: Annual income below ₹3 lakh, first-time home buyer. Documents needed: Aadhaar Card, Income certificate, Bank account. Apply at pmaymis.gov.in.';
  }

  if (q.includes('kisan') || q.includes('farmer') || q.includes('किसान') || q.includes('खेती')) {
    return lang === 'hi'
      ? 'पीएम-किसान योजना में किसानों को ₹6,000 प्रति वर्ष मिलते हैं। ₹2,000 की 3 किस्तों में सीधे बैंक खाते में। pmkisan.gov.in पर रजिस्टर करें। आधार कार्ड और भूमि दस्तावेज़ चाहिए।'
      : 'PM-KISAN gives farmers ₹6,000 per year in 3 installments of ₹2,000 each, directly in bank account. Register at pmkisan.gov.in. You need Aadhaar Card and land documents.';
  }

  if (q.includes('scholarship') || q.includes('छात्रवृत्ति') || q.includes('student') || q.includes('छात्र')) {
    return lang === 'hi'
      ? 'राष्ट्रीय छात्रवृत्ति पोर्टल (scholarships.gov.in) पर कई छात्रवृत्तियां उपलब्ध हैं। आवश्यक दस्तावेज़: आधार कार्ड, आय प्रमाण पत्र, मार्कशीट, जाति प्रमाण पत्र। ऑनलाइन आवेदन करें।'
      : 'National Scholarship Portal (scholarships.gov.in) has many scholarships. Documents needed: Aadhaar Card, Income certificate, Marksheet, Caste certificate. Apply online.';
  }

  if (q.includes('document') || q.includes('दस्तावेज़')) {
    return lang === 'hi'
      ? 'अधिकांश सरकारी योजनाओं के लिए ये दस्तावेज़ ज़रूरी हैं:\n1. आधार कार्ड\n2. आय प्रमाण पत्र\n3. बैंक खाता\n4. राशन कार्ड\n5. जाति प्रमाण पत्र (यदि लागू हो)\n\nकिसी विशेष योजना के बारे में पूछें!'
      : 'Most government schemes need these documents:\n1. Aadhaar Card\n2. Income Certificate\n3. Bank Account\n4. Ration Card\n5. Caste Certificate (if applicable)\n\nAsk about a specific scheme for detailed document list!';
  }

  if (q.includes('eligible') || q.includes('पात्र') || q.includes('योग्य')) {
    return lang === 'hi'
      ? 'पात्रता जांचने के लिए "पात्रता जांचें" बटन पर क्लिक करें। अपनी उम्र, आय, और व्यवसाय भरें - मैं बताऊंगा कि आप किन योजनाओं के लिए पात्र हैं!'
      : 'Click the "Check Eligibility" button to check your eligibility. Fill in your age, income, and occupation - I will tell you which schemes you are eligible for!';
  }

  return lang === 'hi'
    ? 'मैं आपकी मदद कर सकता हूं! आप मुझसे किसी भी सरकारी योजना, पात्रता, या दस्तावेज़ के बारे में पूछ सकते हैं। उदाहरण: "पीएम आवास योजना के बारे में बताओ" या "छात्रवृत्ति के लिए क्या दस्तावेज़ चाहिए?"'
    : 'I can help you! Ask me about any government scheme, eligibility, or documents. For example: "Tell me about PM Awas Yojana" or "What documents needed for scholarship?"';
}
