import React from 'react';
import { useData } from '../contexts/DataContext';
import { Users, ExternalLink, Search, Clock } from 'lucide-react';

const ParticipantListPage: React.FC = () => {
    const { publicParticipantsUrl } = useData();

    return (
        <div className="pt-32 pb-20 min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3 bg-primary-100 text-primary-600 rounded-full mb-6">
                        <Users size={32} />
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Daftar Peserta SGC 2026</h1>
                    <p className="text-lg text-slate-600">
                        Berikut adalah daftar peserta yang telah resmi terdaftar. Data diperbarui secara berkala.
                    </p>
                </div>

                {/* Conditional Rendering: If URL is present, show Iframe, otherwise show Empty State */}
                {publicParticipantsUrl && publicParticipantsUrl.trim() !== '' ? (
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
                        <div className="p-4 bg-slate-100 border-b border-slate-200 flex justify-between items-center text-sm text-slate-500">
                            <span>Menampilkan data eksternal</span>
                            <a href={publicParticipantsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary-600">
                                Buka di Tab Baru <ExternalLink size={14} />
                            </a>
                        </div>
                        <iframe 
                            src={publicParticipantsUrl} 
                            width="100%" 
                            height="800" 
                            className="w-full border-0"
                            title="Daftar Peserta"
                        >
                            Browser Anda tidak mendukung iframe. Silakan klik link di atas.
                        </iframe>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                         <div className="inline-flex bg-slate-100 p-4 rounded-full text-slate-400 mb-6">
                            <Clock size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-700 mb-2">Data Belum Tersedia</h3>
                        <p className="text-slate-500 max-w-md mx-auto">
                            Link data peserta belum dikonfigurasi oleh panitia. Mohon cek kembali secara berkala.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ParticipantListPage;
