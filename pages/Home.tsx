import React, { useState } from 'react';
import Hero from '../components/Hero';
import EventCard from '../components/EventCard';
import JuknisSection from '../components/JuknisSection';
import { useData } from '../contexts/DataContext';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

interface HomeProps {
  onRegisterClick: (eventName?: string) => void;
}

const Home: React.FC<HomeProps> = ({ onRegisterClick }) => {
  const { events, faqs } = useData();
  const featuredEvents = events.slice(0, 3); // Show first 3 events
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <Hero onRegisterClick={() => onRegisterClick()} />

      {/* Featured Events */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Kategori Unggulan</h2>
                    <p className="text-slate-600">Beberapa kompetisi yang paling diminati tahun ini.</p>
                </div>
                <Link to="/categories" className="hidden md:flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700">
                    Lihat Semua
                    <ArrowRight size={20} />
                </Link>
            </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onRegister={onRegisterClick} 
              />
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
             <Link to="/categories" className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-200">
                Lihat Semua Lomba
                <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <JuknisSection />

      {/* FAQ Preview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-12">Pertanyaan Umum</h2>
            <div className="space-y-4 text-left">
                {faqs.slice(0, 3).map((faq, index) => (
                     <div 
                        key={faq.id} 
                        className={`bg-white rounded-xl shadow-sm border transition-all duration-300 overflow-hidden ${
                            openIndex === index ? 'border-primary-500 ring-2 ring-primary-500/10' : 'border-slate-200 hover:border-primary-200'
                        }`}
                    >
                        <button 
                            onClick={() => toggleFaq(index)}
                            className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                        >
                            <h3 className={`font-bold transition-colors ${openIndex === index ? 'text-primary-600' : 'text-slate-900'}`}>
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
            <div className="mt-10">
                <Link to="/faq" className="text-primary-600 font-bold hover:underline">Lihat Selengkapnya &rarr;</Link>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;