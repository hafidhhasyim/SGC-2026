import React, { useState } from 'react';
import { FileText, Download, ExternalLink, FolderOpen, BookOpen, Palette, CheckCircle, Clock, MapPin, AlertCircle, Building2 } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const JuknisPage: React.FC = () => {
  const { juknisList, juknisUrl } = useData();
  const [activeTab, setActiveTab] = useState<'akademik' | 'kreatif' | 'tryout'>('akademik');

  const handleDownload = (e: React.MouseEvent, url: string) => {
    if (url === '#' || url === '') {
        e.preventDefault();
        alert("Dokumen belum tersedia untuk diunduh.");
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
           <div className="inline-flex items-center justify-center p-3 bg-primary-100 text-primary-600 rounded-full mb-6">
                <FileText size={32} />
           </div>
           <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">Informasi & Juknis</h1>
           <p className="text-lg text-slate-600 max-w-2xl mx-auto">
             Unduh dokumen petunjuk teknis atau baca ringkasan peraturan lomba di bawah ini.
           </p>
        </div>

        {/* Top Actions: Master Folder & Registration Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto">
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
                        href={juknisUrl && juknisUrl.trim() !== '' ? juknisUrl : 'https://drive.google.com/file/d/1sfm9IZ8sddmHggeykXDhSEhorDMkeORO/view?usp=sharing'}
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

            {/* Offline Info Card */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 shadow-sm hover:border-primary-200 hover:shadow-lg transition-all relative overflow-hidden group">
                 <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-secondary-100 text-secondary-600 p-2 rounded-lg"><Building2 size={24} /></div>
                        <h3 className="font-bold text-xl text-slate-900">Pendaftaran Langsung</h3>
                    </div>
                    <p className="text-slate-600 mb-6">
                        Pendaftaran offline dapat dilakukan secara langsung dengan mengunjungi Sekretariat Panitia di Sekolah.
                    </p>
                    <div className="flex items-center gap-2 text-primary-700 font-bold">
                        <MapPin size={18} />
                        SMP Negeri 1 Genteng
                    </div>
                </div>
                 <div className="absolute right-0 bottom-0 opacity-5 transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform duration-500">
                    <Building2 size={200} />
                </div>
            </div>
        </div>

        {/* Detailed Info Section (Tabs) */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 mb-16">
            <div className="bg-slate-900 p-1 flex justify-center overflow-x-auto">
                <button 
                    onClick={() => setActiveTab('akademik')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-bold transition-all ${activeTab === 'akademik' ? 'bg-white text-primary-700' : 'text-slate-400 hover:text-white'}`}
                >
                    <BookOpen size={18} /> Olimpiade
                </button>
                <button 
                    onClick={() => setActiveTab('kreatif')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-bold transition-all ${activeTab === 'kreatif' ? 'bg-white text-secondary-600' : 'text-slate-400 hover:text-white'}`}
                >
                    <Palette size={18} /> Seni & Kreatif
                </button>
                <button 
                    onClick={() => setActiveTab('tryout')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-bold transition-all ${activeTab === 'tryout' ? 'bg-white text-green-600' : 'text-slate-400 hover:text-white'}`}
                >
                    <CheckCircle size={18} /> Try Out
                </button>
            </div>

            <div className="p-8 md:p-12">
                {activeTab === 'akademik' && (
                    <div className="animate-fade-in space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                                <span className="bg-primary-100 text-primary-600 p-2 rounded-lg"><BookOpen /></span>
                                Olimpiade MIPA & Bahasa Inggris
                            </h2>
                            <p className="text-slate-600 mb-6">
                                Kompetisi akademik bergengsi untuk menguji kemampuan logika, sains, dan bahasa.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                <h3 className="font-bold text-lg mb-4 text-slate-800">Mekanisme Lomba</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <div className="bg-white p-1 rounded border shadow-sm text-primary-600 font-bold text-xs mt-0.5">1</div>
                                        <p className="text-sm text-slate-600"><strong>Babak Penyisihan:</strong> Mengerjakan 60 Soal Pilihan Ganda dalam waktu 90 menit.</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-white p-1 rounded border shadow-sm text-primary-600 font-bold text-xs mt-0.5">2</div>
                                        <p className="text-sm text-slate-600"><strong>Sistem Skor:</strong> Benar (+4), Salah (-1), Kosong (0).</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-white p-1 rounded border shadow-sm text-primary-600 font-bold text-xs mt-0.5">3</div>
                                        <p className="text-sm text-slate-600"><strong>Babak Final:</strong> 20 Peserta terbaik penyisihan berhak maju ke babak final (20 Soal Uraian).</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                <h3 className="font-bold text-lg mb-4 text-slate-800">Jadwal (Sabtu, 6 Feb 2026)</h3>
                                <ul className="space-y-4">
                                    <li className="flex justify-between items-center border-b border-slate-200 pb-2">
                                        <span className="text-sm font-semibold text-slate-700">Penyisihan MIPA</span>
                                        <span className="text-sm bg-primary-100 text-primary-700 px-2 py-1 rounded">07.30 - 09.00 WIB</span>
                                    </li>
                                    <li className="flex justify-between items-center border-b border-slate-200 pb-2">
                                        <span className="text-sm font-semibold text-slate-700">Penyisihan B. Inggris</span>
                                        <span className="text-sm bg-primary-100 text-primary-700 px-2 py-1 rounded">09.15 - 10.45 WIB</span>
                                    </li>
                                    <li className="flex justify-between items-center border-b border-slate-200 pb-2">
                                        <span className="text-sm font-semibold text-slate-700">Final MIPA</span>
                                        <span className="text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded">11.30 - 12.30 WIB</span>
                                    </li>
                                    <li className="flex justify-between items-center">
                                        <span className="text-sm font-semibold text-slate-700">Final B. Inggris</span>
                                        <span className="text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded">12.45 - 13.45 WIB</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'kreatif' && (
                    <div className="animate-fade-in space-y-8">
                         <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                                <span className="bg-secondary-100 text-secondary-600 p-2 rounded-lg"><Palette /></span>
                                Lomba Menggambar & Mewarnai
                            </h2>
                            <p className="text-slate-600 mb-6">
                                Wadah kreativitas seni rupa. Menggambar Bercerita untuk kelas 4-6 dan Mewarnai untuk kelas 1-3.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                <h3 className="font-bold text-lg mb-4 text-slate-800">Ketentuan Umum</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle size={16} className="text-green-500 mt-1" />
                                        <p className="text-sm text-slate-600"><strong>Tema Menggambar:</strong> "7 Kebiasaan Anak Indonesia Hebat".</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle size={16} className="text-green-500 mt-1" />
                                        <p className="text-sm text-slate-600"><strong>Kertas:</strong> Disediakan panitia (Ukuran A4).</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle size={16} className="text-green-500 mt-1" />
                                        <p className="text-sm text-slate-600"><strong>Peralatan:</strong> Bawa sendiri (Meja lipat, tikar, crayon/acrylic marker/pensil warna).</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <AlertCircle size={16} className="text-red-500 mt-1" />
                                        <p className="text-sm text-slate-600"><strong>Dilarang:</strong> Mengandung unsur SARA, Pornografi, Provokatif, dan Politik.</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                <h3 className="font-bold text-lg mb-4 text-slate-800">Kriteria Penilaian</h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-700 mb-2">Menggambar Bercerita</h4>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-slate-600">Originalitas Cerita</span>
                                            <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-slate-600">Kreativitas</span>
                                            <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-slate-600">Kerapihan & Estetika</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-700 mb-2">Mewarnai</h4>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-slate-600">Kerapian & Kebersihan</span>
                                            <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-slate-600">Harmoni Warna</span>
                                            <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-slate-600">Kreativitas</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'tryout' && (
                    <div className="animate-fade-in space-y-8">
                         <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                                <span className="bg-green-100 text-green-600 p-2 rounded-lg"><CheckCircle /></span>
                                Try Out SD/MI
                            </h2>
                            <p className="text-slate-600 mb-6">
                                Simulasi ujian komprehensif untuk mengukur kesiapan akademik siswa.
                            </p>
                        </div>
                        
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                             <div className="flex flex-col md:flex-row gap-8">
                                <div className="flex-1 space-y-4">
                                    <h3 className="font-bold text-lg text-slate-800">Detail Pelaksanaan</h3>
                                    <div className="flex items-center gap-3">
                                        <Clock size={20} className="text-slate-400" />
                                        <span><strong>Waktu:</strong> Minggu, 7 Februari 2026 (07.30 - 09.30 WIB)</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <FileText size={20} className="text-slate-400" />
                                        <span><strong>Jumlah Soal:</strong> 100 Butir Pilihan Ganda</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle size={20} className="text-slate-400" />
                                        <span><strong>Skoring:</strong> Benar (+2), Salah (0), Kosong (0)</span>
                                    </div>
                                </div>
                                <div className="flex-1 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-8">
                                    <h3 className="font-bold text-lg text-slate-800 mb-4">Komposisi Soal</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white p-3 rounded-lg border text-center">
                                            <span className="block text-2xl font-bold text-primary-600">30</span>
                                            <span className="text-xs text-slate-500 uppercase">Matematika</span>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg border text-center">
                                            <span className="block text-2xl font-bold text-green-600">30</span>
                                            <span className="text-xs text-slate-500 uppercase">B. Indonesia</span>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg border text-center">
                                            <span className="block text-2xl font-bold text-blue-600">20</span>
                                            <span className="text-xs text-slate-500 uppercase">IPA</span>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg border text-center">
                                            <span className="block text-2xl font-bold text-orange-600">20</span>
                                            <span className="text-xs text-slate-500 uppercase">IPS</span>
                                        </div>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Detailed Juknis Items */}
        <div className="space-y-6 mb-16">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Dokumen Juknis Resmi</h2>
            {juknisList.map(item => (
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
                            href={item.downloadUrl}
                            onClick={(e) => handleDownload(e, item.downloadUrl)}
                            target="https://drive.google.com/file/d/1sfm9IZ8sddmHggeykXDhSEhorDMkeORO/view?usp=sharing"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-xl font-bold transition-colors shadow-sm"
                        >
                            <Download size={18} />
                            Download Juknis SGC 2026
                        </a>
                    </div>
                </div>
            ))}
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