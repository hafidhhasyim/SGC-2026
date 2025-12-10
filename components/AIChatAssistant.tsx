import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { useData } from '../contexts/DataContext';

const AIChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Halo! 👋 Saya SGC Bot. Ada yang bisa saya bantu mengenai info lomba, jadwal, atau pendaftaran?',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Get latest data from context
  const { events, juknisList, faqs } = useData();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const generateSystemInstruction = () => {
    const eventList = events.map(e => 
        `- ${e.title} (${e.category}): ${e.date} jam ${e.time} di ${e.location}. Biaya: ${e.fee}. Info: ${e.description} | ${e.details.join(', ')}`
    ).join('\n');

    const faqList = faqs.map(f => `- Q: ${f.question} A: ${f.answer}`).join('\n');
    
    const juknisInfo = juknisList.map(j => `- ${j.title}: ${j.description}`).join('\n');

    return `
Anda adalah Asisten Virtual Cerdas untuk "SGC - Spensa Gemilang Competition".
Tugas Anda adalah membantu calon peserta, orang tua, dan guru untuk mengetahui informasi tentang kompetisi ini berdasarkan data berikut.

DATA ACARA:
${eventList}

DATA FAQ (PERTANYAAN UMUM):
${faqList}

INFO JUKNIS:
${juknisInfo}

Gaya Bicara:
- Ramah, antusias, dan informatif.
- Gunakan Bahasa Indonesia yang baik dan mudah dipahami.
- Jika ditanya hal di luar konteks SGC, jawab dengan sopan bahwa Anda hanya melayani pertanyaan seputar SGC.
- Ajak user untuk segera mendaftar jika mereka bertanya tentang jadwal.

Jawablah dengan ringkas (maksimal 3 paragraf).
`;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const history = messages.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));

        const systemInstruction = generateSystemInstruction();
        const responseText = await sendMessageToGemini(userMessage.text, history, systemInstruction);

        const botMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            text: responseText,
        };
        setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
        setMessages((prev) => [...prev, {
            id: Date.now().toString(),
            role: 'assistant',
            text: 'Maaf, terjadi kesalahan saat menghubungkan ke server. Silakan coba lagi nanti.',
            isError: true
        }]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-gradient-to-r from-primary-600 to-indigo-600 text-white px-5 py-4 rounded-full shadow-2xl hover:shadow-primary-600/40 transition-all transform hover:scale-110 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Sparkles size={20} className="animate-pulse" />
        <span className="font-bold">Tanya AI</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-[360px] md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden h-[500px] animate-fade-in-up">
          <div className="bg-primary-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
                <div className="bg-white/20 p-1.5 rounded-lg">
                    <Bot size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-sm">Asisten SGC</h3>
                    <p className="text-xs text-primary-200 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-400"></span>
                        Online
                    </p>
                </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-200' : 'bg-primary-100 text-primary-600'}`}>
                    {msg.role === 'user' ? <User size={16} className="text-slate-600" /> : <Bot size={16} />}
                </div>
                
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary-600 text-white rounded-tr-none'
                      : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                  } ${msg.isError ? 'bg-red-50 text-red-600 border-red-200' : ''}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs ml-10">
                <Loader2 size={12} className="animate-spin" />
                <span>Sedang mengetik...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-slate-100">
            <div className="flex items-center gap-2 bg-slate-50 rounded-full border border-slate-200 px-4 py-2 focus-within:ring-2 focus-within:ring-primary-500/50 focus-within:border-primary-500 transition-all">
              <input
                type="text"
                placeholder="Tulis pertanyaan..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-slate-800 placeholder-slate-400"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="text-primary-600 disabled:text-slate-300 hover:scale-110 transition-transform"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatAssistant;
