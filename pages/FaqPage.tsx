import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FaqPage: React.FC = () => {
  const { faqs } = useData();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
           <div className="inline-flex items-center justify-center p-3 bg-primary-100 text-primary-600 rounded-full mb-6">
                <HelpCircle size={32} />
           </div>
           <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">Frequently Asked Questions</h1>
           <p className="text-lg text-slate-600">
             Jawaban atas pertanyaan yang sering diajukan oleh calon peserta dan orang tua.
           </p>
        </div>

        <div className="space-y-4">
            {faqs.map((faq, index) => (
                <div 
                    key={faq.id} 
                    className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 overflow-hidden ${
                        openIndex === index ? 'border-primary-500 ring-2 ring-primary-500/10' : 'border-slate-200 hover:border-primary-200'
                    }`}
                >
                    <button 
                        onClick={() => toggleFaq(index)}
                        className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                    >
                        <h3 className={`text-lg font-bold transition-colors ${openIndex === index ? 'text-primary-600' : 'text-slate-900'}`}>
                            {faq.question}
                        </h3>
                        <div className={`p-2 rounded-full transition-colors ${openIndex === index ? 'bg-primary-50 text-primary-600' : 'text-slate-400'}`}>
                            {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                    </button>
                    
                    <div 
                        className={`transition-all duration-300 ease-in-out ${
                            openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    >
                        <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-50 mt-2 pt-4">
                            {faq.answer}
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="mt-12 text-center text-slate-500">
            <p>Masih punya pertanyaan? Hubungi kami via WhatsApp atau Sosial Media kami.</p>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;