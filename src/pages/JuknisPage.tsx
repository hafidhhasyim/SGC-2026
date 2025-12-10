import React from 'react';
import { FileText, Download, ExternalLink, FolderOpen } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const JuknisPage: React.FC = () => {
  const { juknisList, juknisUrl, offlineFormUrl } = useData();

  const handleDownload = (e: React.MouseEvent, url: string) => {
    if (url === '#' || url === '') {
        e.preventDefault();
        alert("Dokumen belum tersedia untuk diunduh.");
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
           <div className="inline-flex items-center justify-center p-3 bg-primary-100 text-primary-600 rounded-full mb-6">
                <FileText size={32} />
           </div>
           <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">Informasi & Juknis</h1>
           <p className="text-lg text-slate-600 max-w-2xl mx-auto">
             Unduh dokumen petunjuk teknis pelaksanaan lomba dan formulir pendaftaran. Harap dipelajari dengan seksama sebelum hari pelaksanaan.
           </p>
        </div>

        {/* Top Actions: Master Folder & Offline Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Master Juknis Card */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden group">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-white/20 p-2 rounded-lg"><FolderOpen size={24} /></div>
                        <h3 className="font-bold text-xl">Folder Juknis Lengkap</h3>
                    </div>
                    <p className="text-primary-100 mb-6">
                        Akses seluruh file juknis, materi, dan ketentuan lomba dalam satu folder Google Drive.
                    </p>
                    <a 
                        href={juknisUrl && juknisUrl.trim() !== '' ? juknisUrl : '#'}
                        onClick={(e) => handleDownload(e, juknisUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white text-primary-700 px-6 py-3 rounded-xl font-bold hover:bg-primary-50 transition-colors shadow-md"
                    >
                        <ExternalLink size={18} />
                        Buka Google Drive
                    </a>
                </div>
                <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform duration-500">
                    <FolderOpen size={200} />
                </div>
            </div>

            {/* Offline Form Card */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 shadow-sm hover:border-primary-200 hover:shadow-lg transition-all relative overflow-hidden group">
                 <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-secondary-100 text-secondary-600 p-2 rounded-lg"><FileText size={24} /></div>
                        <h3 className="font-bold text-xl text-slate-900">Formulir Offline</h3>
                    </div>
                    <p className="text-slate-600 mb-6">
                        Khusus pendaftaran kolektif (Sekolah). Unduh, isi, dan serahkan ke sekretariat panitia.
                    </p>
                    <a 
                        href={offlineFormUrl && offlineFormUrl.trim() !== '' ? offlineFormUrl : '#'}
                        onClick={(e) => handleDownload(e, offlineFormUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-secondary-500 text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-secondary-400 transition-colors shadow-md"
                    >
                        <Download size={18} />
                        Download Formulir
                    </a>
                </div>
                 <div className="absolute right-0 bottom-0 opacity-5 transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform duration-500">
                    <FileText size={200} />
                </div>
            </div>
        </div>

        {/* Specific Documents List */}
        <h3 className="text-xl font-bold text-slate-800 mb-6 border-l-4 border-primary-500 pl-4">Dokumen Pendukung Lainnya</h3>
        <div className="space-y-4 mb-16">
            {juknisList.length > 0 ? (
                juknisList.map(item => (
                    <div key={item.id} className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:bg-white hover:border-primary-200 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="bg-white p-3 rounded-lg border border-slate-100 text-slate-400 shrink-0">
                                <FileText size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">{item.title}</h4>
                                <p className="text-sm text-slate-500">{item.description}</p>
                            </div>
                        </div>
                        <a 
                            href={item.downloadUrl}
                            onClick={(e) => handleDownload(e, item.downloadUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 bg-white px-4 py-2 rounded-lg border border-slate-200 hover:border-primary-200 text-sm whitespace-nowrap"
                        >
                            <Download size={16} />
                            Unduh File
                        </a>
                    </div>
                ))
            ) : (
                <div className="text-center py-8 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    Belum ada dokumen tambahan yang diunggah.
                </div>
            )}
        </div>

        {/* Footer Notes */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div> Catatan Penting
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 list-disc list-inside text-blue-800">
                <li>Keputusan dewan juri bersifat mutlak dan tidak dapat diganggu gugat.</li>
                <li>Peserta wajib melakukan daftar ulang 30 menit sebelum lomba dimulai.</li>
                <li>Peserta diharapkan membawa perlengkapan alat tulis masing-masing.</li>
                <li>Setiap perubahan jadwal akan diinformasikan melalui Grup WhatsApp peserta.</li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default JuknisPage;