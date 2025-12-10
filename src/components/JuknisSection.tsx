import React from 'react';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const JuknisSection: React.FC = () => {
  const { juknisList, juknisUrl } = useData();
  const featuredJuknis = juknisList[0]; // Just show the first one as featured

  const handleDownload = (e: React.MouseEvent, url: string) => {
    if (url === '#' || url === '') {
        e.preventDefault();
        alert("Dokumen Juknis belum tersedia untuk diunduh.");
    }
  };

  return (
    <section id="juknis" className="py-20 bg-primary-900 text-white relative overflow-hidden">
        {/* Abstract Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
             <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
             <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-secondary-500 rounded-full blur-3xl"></div>
        </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Petunjuk Teknis (Juknis)</h2>
        <p className="text-primary-100 text-lg mb-10 max-w-2xl mx-auto">
          Sebelum mendaftar, pastikan Anda telah membaca dan memahami seluruh peraturan dan ketentuan teknis setiap perlombaan melalui dokumen resmi di bawah ini.
        </p>

        {featuredJuknis ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-4 rounded-xl">
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
                  className="flex items-center gap-2 bg-secondary-500 hover:bg-secondary-400 text-slate-900 px-6 py-3 rounded-xl font-bold transition-colors w-full md:w-auto justify-center shadow-lg"
                >
                  <Download size={20} />
                  Unduh Juknis
                </a>
              </div>
            </div>
        ) : juknisUrl && juknisUrl.trim() !== '' ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-4 rounded-xl">
                    <FileText size={40} className="text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-white">Folder Juknis Lengkap</h3>
                    <p className="text-primary-200 text-sm">Akses seluruh dokumen petunjuk teknis di Google Drive.</p>
                  </div>
                </div>
                
                <a 
                  href={juknisUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-secondary-500 hover:bg-secondary-400 text-slate-900 px-6 py-3 rounded-xl font-bold transition-colors w-full md:w-auto justify-center shadow-lg"
                >
                  <ExternalLink size={20} />
                  Buka Folder Juknis
                </a>
              </div>
            </div>
        ) : null}
        
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
             <div className="bg-primary-800/50 p-4 rounded-lg">
                <p className="font-semibold text-white mb-1">Syarat Umum</p>
                <p className="text-xs text-primary-200">Peserta wajib berstatus pelajar aktif SD/MI.</p>
             </div>
             <div className="bg-primary-800/50 p-4 rounded-lg">
                <p className="font-semibold text-white mb-1">Registrasi Ulang</p>
                <p className="text-xs text-primary-200">Dilakukan 30 menit sebelum lomba dimulai.</p>
             </div>
             <div className="bg-primary-800/50 p-4 rounded-lg">
                <p className="font-semibold text-white mb-1">Keputusan Juri</p>
                <p className="text-xs text-primary-200">Mutlak dan tidak dapat diganggu gugat.</p>
             </div>
          </div>
      </div>
    </section>
  );
};

export default JuknisSection;