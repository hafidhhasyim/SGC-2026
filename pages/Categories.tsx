import React from 'react';
import EventCard from '../components/EventCard';
import { useData } from '../contexts/DataContext';

interface CategoriesProps {
  onRegisterClick: (eventName?: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onRegisterClick }) => {
  const { events } = useData();

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Kategori Perlombaan
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Temukan bakatmu dan jadilah juara. Berikut adalah daftar lengkap kompetisi yang diselenggarakan di SGC 2024.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard 
              key={event.id} 
              event={event} 
              onRegister={onRegisterClick} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
