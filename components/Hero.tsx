import React, { useState } from 'react';
import { ArrowRight, Star, ImageOff, Download } from 'lucide-react';
import { useData } from '../contexts/DataContext';

interface HeroProps {
  onRegisterClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onRegisterClick }) => {
  const [imgError, setImgError] = useState(false);
  const { brochureUrl, bannerUrl } = useData();

  const handleBrochureClick = (e: React.MouseEvent) => {
    if (brochureUrl && brochureUrl !== '#' && brochureUrl.trim() !== '') {
        window.open(brochureUrl, '_blank');
    } else {
        e.preventDefault();
        alert('Maaf, brosur belum tersedia saat ini.');
    }
  };

  const scrollToJuknis = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('juknis');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getGoogleDriveImageUrl = (url: string) => {
    if (!url) return '';
    // Check if it's a standard google drive sharing link
    const fileIdMatch = url.match(/\/d\/([^/]+)/) || url.match(/id=([^&]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
        return `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}&sz=w1920`;
    }
    return url;
  };

  const displayBannerUrl = getGoogleDriveImageUrl(bannerUrl);

  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary-100 blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-secondary-400 blur-3xl opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          
          <div className="mb-12 lg:mb-0 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold mb-6 border border-orange-200">
              <Star size={14} fill="currentColor" />
              <span>Pendaftaran: 8 Desember - 2 Februari 2026</span>
            </div>
            {/* Reduced text size from text-4xl lg:text-6xl to text-3xl lg:text-5xl */}
            <h1 className="text-3xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
              Tunjukkan Bakatmu di <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">
                Spensa Gemilang Competition 2026
              </span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Ajang kompetisi bergengsi untuk siswa SD/MI sederajat. 
              Uji kemampuan akademik, kreativitas, dan sportivitasmu bersama ratusan peserta lainnya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={onRegisterClick}
                className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary-500/40 transition-all transform hover:-translate-y-1"
              >
                Daftar Kompetisi
                <ArrowRight className="ml-2" size={20} />
              </button>
              
              {/* Show Brochure Download if link exists, otherwise show Juknis scroll */}
              {brochureUrl && brochureUrl !== '#' ? (
                  <button 
                    onClick={handleBrochureClick}
                    className="inline-flex items-center justify-center bg-white border-2 border-slate-200 hover:border-primary-200 text-slate-700 hover:text-primary-600 px-8 py-4 rounded-xl font-bold text-lg transition-colors"
                  >
                    <Download className="mr-2" size={20} />
                    Download Brosur
                  </button>
              ) : (
                  <button 
                    onClick={scrollToJuknis}
                    className="inline-flex items-center justify-center bg-white border-2 border-slate-200 hover:border-primary-200 text-slate-700 hover:text-primary-600 px-8 py-4 rounded-xl font-bold text-lg transition-colors"
                  >
                    Pelajari Juknis
                  </button>
              )}
            </div>
            
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-8 text-slate-500 grayscale opacity-70">
                <div className="flex flex-col items-center">
                    <span className="font-bold text-xl">500+</span>
                    <span className="text-xs uppercase tracking-wide">Peserta</span>
                </div>
                <div className="w-px h-8 bg-slate-300"></div>
                <div className="flex flex-col items-center">
                    <span className="font-bold text-xl">15+</span>
                    <span className="text-xs uppercase tracking-wide">Sekolah</span>
                </div>
                <div className="w-px h-8 bg-slate-300"></div>
                <div className="flex flex-col items-center">
                    <span className="font-bold text-xl">5</span>
                    <span className="text-xs uppercase tracking-wide">Cabang Lomba</span>
                </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-slate-100 aspect-video group">
              {!imgError && displayBannerUrl ? (
                <img 
                  src={displayBannerUrl} 
                  alt="SGC 2026 Official Banner" 
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                />
              ) : (
                 <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 text-primary-400">
                    <ImageOff size={48} className="mb-2" />
                    <span className="text-sm font-semibold">Gagal memuat banner</span>
                 </div>
              )}
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-4 animate-bounce-slow max-w-xs z-20">
                <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
                    <Star fill="currentColor" size={24} />
                </div>
                <div>
                    <p className="font-bold text-slate-800">Total Hadiah</p>
                    <p className="text-sm text-slate-500">Jutaan Rupiah + Trofi</p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;