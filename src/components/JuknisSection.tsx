import React from 'react';
import { FileText, Download } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const JuknisSection: React.FC = () => {
  const { juknisList } = useData();
  // Find the first juknis with a valid title and link
  const featuredJuknis = juknisList.find(j => j.title && j.downloadUrl && j.downloadUrl !== '#');

  const handleDownload = (e: React.MouseEvent, url: string) => {
    if (!url || url === '#' || url === '') {
        e.preventDefault();
        alert("Dokumen Juknis belum tersedia untuk diunduh. Silakan cek berkala.");
    }
  };

  return (
    <section id="juknis" className="py-20 bg-primary-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
             <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
             <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-secondary-500 rounded-full blur-3xl"></div>
        </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Petunjuk Teknis (Juknis)</h2>
        <p className="text-primary-100 text-lg mb-10 max-w-2xl mx-auto">
          Pastikan Anda telah membaca seluruh peraturan dan ketentuan teknis pendaftaran melalui dokumen juknis resmi SGC 2026.
        </p>

        {featuredJuknis ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all animate-fade-in">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-4 rounded-xl shadow-inner">
                    <FileText size={40} className="text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-white">{featuredJuknis.title}</h3>
                    <p className="text-primary-200 text-sm">{featuredJuknis.description}</p>
                  </div>
                </div>
                
                <a 
                  href={featuredJuknis.downloadUrl} 
                  onClick={(e) => handleDownload(e, featuredJuknis.downloadUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-secondary-500 hover:bg-secondary-400 text-slate-900 px-8 py-4 rounded-xl font-bold transition-all shadow-xl hover:scale-105 active:scale-95"
                >
                  <Download size={20} />
                  Download Juknis SGC 2026
                </a>
              </div>
            </div>
        ) : (
            <div className="bg-white/5 p-10 rounded-3xl border border-white/10 border-dashed">
                <div className="flex flex-col items-center gap-4 text-primary-200">
                    <FileText size={48} className="opacity-40" />
                    <p className="text-lg italic font-medium">Petunjuk teknis sedang dalam tahap finalisasi oleh panitia.</p>
                </div>
            </div>
        )}
        
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left text-sm">
             <div className="bg-primary-800/40 p-5 rounded-2xl border border-white/5">
                <p className="font-bold text-white mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary-400"></span>
                    Status Pelajar
                </p>
                <p className="text-xs text-primary-200 leading-relaxed">Terbuka untuk seluruh siswa SD/MI sederajat aktif tahun ajaran 2025/2026.</p>
             </div>
             <div className="bg-primary-800/40 p-5 rounded-2xl border border-white/5">
                <p className="font-bold text-white mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary-400"></span>
                    Daftar Ulang
                </p>
                <p className="text-xs text-primary-200 leading-relaxed">Dilakukan di lokasi H-30 menit sebelum jadwal sesi lomba masing-masing dimulai.</p>
             </div>
             <div className="bg-primary-800/40 p-5 rounded-2xl border border-white/5">
                <p className="font-bold text-white mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary-400"></span>
                    Keputusan Juri
                </p>
                <p className="text-xs text-primary-200 leading-relaxed">Hasil penilaian dewan juri bersifat mutlak, independen, dan tidak dapat diganggu gugat.</p>
             </div>
          </div>
      </div>
    </section>
  );
};

export default JuknisSection;