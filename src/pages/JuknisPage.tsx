import React, { useState } from 'react';
// Added Clock to the imported icons from lucide-react
import { FileText, Download, BookOpen, Palette, CheckCircle, MapPin, AlertCircle, Building2, Clock } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const JuknisPage: React.FC = () => {
  const { juknisList } = useData();
  const [activeTab, setActiveTab] = useState<'akademik' | 'kreatif' | 'tryout'>('akademik');

  const handleDownload = (e: React.MouseEvent, url: string) => {
    if (!url || url === '#' || url === '') {
        e.preventDefault();
        alert("Dokumen Juknis belum tersedia untuk diunduh. Silakan hubungi panitia atau cek berkala.");
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
           <div className="inline-flex items-center justify-center p-3 bg-primary-100 text-primary-600 rounded-full mb-6">
                <FileText size={32} />
           </div>
           <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">Informasi & Juknis SGC 2026</h1>
           <p className="text-lg text-slate-600 max-w-2xl mx-auto">
             Unduh petunjuk teknis resmi pendaftaran dan pelaksanaan kompetisi di bawah ini.
           </p>
        </div>

        {/* Center aligned Pendaftaran card */}
        <div className="flex justify-center mb-16">
            <div className="w-full max-w-xl bg-white border-2 border-slate-200 rounded-3xl p-10 shadow-sm hover:border-primary-200 hover:shadow-xl transition-all relative overflow-hidden group">
                 <div className="relative z-10 text-center">
                    <div className="flex flex-col items-center gap-4 mb-6">
                        <div className="bg-secondary-100 text-secondary-600 p-4 rounded-2xl shadow-inner"><Building2 size={40} /></div>
                        <h3 className="font-bold text-2xl text-slate-900">Pendaftaran Langsung</h3>
                    </div>
                    <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                        Pendaftaran offline dapat dilakukan dengan mengunjungi Sekretariat Panitia SGC 2026 secara langsung di SMP Negeri 1 Genteng.
                    </p>
                    <div className="inline-flex items-center gap-3 text-primary-700 font-bold bg-primary-50 p-4 rounded-2xl">
                        <MapPin size={22} />
                        Sekretariat SMPN 1 Genteng (Jl. Bromo No. 49)
                    </div>
                </div>
                 <div className="absolute right-0 bottom-0 opacity-5 transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform duration-700 ease-out">
                    <Building2 size={260} />
                </div>
            </div>
        </div>

        {/* Detailed Juknis List */}
        <div className="space-y-6 mb-16">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 border-l-4 border-primary-600 pl-4">Dokumen Juknis Per Mata Lomba</h2>
            {juknisList.filter(item => item.title && item.title !== '').length > 0 ? (
                juknisList.filter(item => item.title && item.title !== '').map(item => (
                    <div key={item.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary-50 text-primary-600 p-3 rounded-xl"><FileText size={24} /></div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                                    <p className="text-sm text-slate-500">{item.description}</p>
                                </div>
                            </div>
                            <a 
                                href={item.downloadUrl || '#'}
                                onClick={(e) => handleDownload(e, item.downloadUrl)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-colors shadow-sm w-full md:w-auto justify-center ${item.downloadUrl ? 'bg-primary-600 hover:bg-primary-700 text-white' : 'bg-slate-200 text-slate-500 cursor-not-allowed'}`}
                            >
                                <Download size={18} />
                                Download Juknis
                            </a>
                        </div>
                    </div>
                ))
            ) : (
                <div className="p-12 bg-white rounded-2xl border-2 border-dashed border-slate-200 text-center">
                    <Clock className="mx-auto text-slate-300 mb-4" size={48} />
                    <p className="text-slate-500">Petunjuk teknis per mata lomba belum diunggah.</p>
                </div>
            )}
        </div>

        {/* Info Tabs */}
        {/* <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 mb-16">
            <div className="bg-slate-900 p-1 flex justify-center overflow-x-auto scrollbar-hide">
                <button 
                    onClick={() => setActiveTab('akademik')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-bold transition-all whitespace-nowrap ${activeTab === 'akademik' ? 'bg-white text-primary-700' : 'text-slate-400 hover:text-white'}`}
                >
                    <BookOpen size={18} /> Olimpiade
                </button>
                <button 
                    onClick={() => setActiveTab('kreatif')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-bold transition-all whitespace-nowrap ${activeTab === 'kreatif' ? 'bg-white text-secondary-600' : 'text-slate-400 hover:text-white'}`}
                >
                    <Palette size={18} /> Seni & Kreatif
                </button>
                <button 
                    onClick={() => setActiveTab('tryout')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-bold transition-all whitespace-nowrap ${activeTab === 'tryout' ? 'bg-white text-green-600' : 'text-slate-400 hover:text-white'}`}
                >
                    <CheckCircle size={18} /> Try Out
                </button>
            </div>

            <div className="p-8 md:p-12">
                {activeTab === 'akademik' && (
                    <div className="animate-fade-in space-y-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                            <span className="bg-primary-100 text-primary-600 p-2 rounded-lg"><BookOpen /></span>
                            Mekanisme Olimpiade SGC 2026
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                <h3 className="font-bold text-lg mb-4 text-slate-800">Sistem Lomba</h3>
                                <ul className="space-y-3 text-sm text-slate-600">
                                    <li className="flex items-start gap-2"><span className="text-primary-500 mt-1">•</span> Mengerjakan soal standar kompetisi nasional.</li>
                                    <li className="flex items-start gap-2"><span className="text-primary-500 mt-1">•</span> Sistem skoring: Benar (+4), Salah (-1), Kosong (0).</li>
                                    <li className="flex items-start gap-2"><span className="text-primary-500 mt-1">•</span> Terdiri dari babak penyisihan dan babak final.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'kreatif' && (
                    <div className="animate-fade-in space-y-8">
                         <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                            <span className="bg-secondary-100 text-secondary-600 p-2 rounded-lg"><Palette /></span>
                            Lomba Kreativitas Seni
                        </h2>
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                            <h3 className="font-bold text-lg mb-4 text-slate-800">Ketentuan Umum</h3>
                            <ul className="space-y-3 text-sm text-slate-600">
                                <li className="flex items-start gap-2"><span className="text-secondary-500 mt-1">•</span> <strong>Media:</strong> Kertas A4 (disediakan panitia).</li>
                                <li className="flex items-start gap-2"><span className="text-secondary-500 mt-1">•</span> <strong>Peralatan:</strong> Peserta wajib membawa meja lipat dan alat warna sendiri.</li>
                                <li className="flex items-start gap-2"><span className="text-secondary-500 mt-1">•</span> <strong>Tema:</strong> Akan diumumkan saat hari pelaksanaan sesuai juknis.</li>
                            </ul>
                        </div>
                    </div>
                )}

                {activeTab === 'tryout' && (
                    <div className="animate-fade-in space-y-8">
                         <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                            <span className="bg-green-100 text-green-600 p-2 rounded-lg"><CheckCircle /></span>
                            Try Out Simulasi SGC 2026
                        </h2>
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                            <p className="text-slate-700 leading-relaxed italic">
                                Simulasi pengerjaan soal standar nasional untuk mengukur kesiapan akademik siswa SD/MI. Hasil akan diberikan beserta skor detail evaluasi untuk bahan pembelajaran.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div> */}

        {/* Important Notes */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <AlertCircle size={20} /> Informasi Penting
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 list-disc list-inside text-blue-800 text-sm">
                <li>Daftar ulang dilakukan 30 menit sebelum jadwal mata lomba.</li>
                <li>Membawa alat tulis (pensil 2B, penghapus) sendiri.</li>
                <li>Pendaftaran offline dilayani di sekolah pada hari kerja.</li>
                <li>Keputusan dewan juri bersifat mutlak.</li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default JuknisPage;