import React from 'react';
import { BookOpen, Calculator, Globe, Palette, Pencil, Calendar, MapPin, Tag } from 'lucide-react';
import { EventData, Category } from '../types';

interface EventCardProps {
  event: EventData;
  onRegister: (eventName: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onRegister }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'BookOpen': return <BookOpen size={32} />;
      case 'Calculator': return <Calculator size={32} />;
      case 'Globe': return <Globe size={32} />;
      case 'Palette': return <Palette size={32} />;
      case 'Pencil': return <Pencil size={32} />;
      default: return <BookOpen size={32} />;
    }
  };

  const isAcademic = event.category === Category.ACADEMIC;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-primary-900/5 transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
      <div className={`h-2 w-full ${isAcademic ? 'bg-primary-500' : 'bg-secondary-500'}`}></div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-xl ${isAcademic ? 'bg-primary-50 text-primary-600' : 'bg-secondary-50 text-secondary-600'}`}>
            {getIcon(event.iconName)}
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isAcademic ? 'bg-primary-100 text-primary-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {event.category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
          {event.title}
        </h3>
        <p className="text-slate-600 text-sm mb-6 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-3 mb-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-slate-400" />
            <span>{event.date} • {event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-slate-400" />
            <span>{event.location}</span>
          </div>
           <div className="flex items-center gap-2">
            <Tag size={16} className="text-slate-400" />
            <span className="font-semibold text-slate-700">{event.fee}</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100">
            <ul className="space-y-1 mb-4">
                {event.details.map((detail, idx) => (
                    <li key={idx} className="text-xs text-slate-500 flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 rounded-full bg-slate-400"></span>
                        {detail}
                    </li>
                ))}
            </ul>
          <button 
            onClick={() => onRegister(event.title)}
            className="w-full py-2.5 rounded-lg border border-primary-600 text-primary-600 font-semibold hover:bg-primary-600 hover:text-white transition-colors"
          >
            Daftar Mata Lomba
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;