import React from 'react';
import { useData } from '../contexts/DataContext';
import { Users, ExternalLink, Search } from 'lucide-react';

const ParticipantListPage: React.FC = () => {
    const { participants, publicParticipantsUrl } = useData();
    const [filter, setFilter] = React.useState('');

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

                {/* Conditional Rendering: If URL is present, show Iframe, otherwise show Internal Table */}
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
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                            <h3 className="font-bold text-lg text-slate-800">Data Internal ({participants.length} Peserta)</h3>
                            <div className="relative w-full md:w-64">
                                <input 
                                    type="text" 
                                    placeholder="Cari Nama / Sekolah..." 
                                    className="pl-10 p-2 border border-slate-300 rounded-lg w-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                />
                                <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                            </div>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-bold tracking-wider">
                                    <tr>
                                        <th className="p-4 border-b border-slate-100">No</th>
                                        <th className="p-4 border-b border-slate-100">Nama Lengkap</th>
                                        <th className="p-4 border-b border-slate-100">Asal Sekolah</th>
                                        <th className="p-4 border-b border-slate-100">Kelas</th>
                                        <th className="p-4 border-b border-slate-100">Cabang Lomba</th>
                                        <th className="p-4 border-b border-slate-100">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {participants
                                        .filter(p => 
                                            p.fullName.toLowerCase().includes(filter.toLowerCase()) || 
                                            p.schoolOrigin.toLowerCase().includes(filter.toLowerCase()) || 
                                            p.selectedEvent.toLowerCase().includes(filter.toLowerCase())
                                        )
                                        .map((p, index) => (
                                        <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="p-4 text-slate-500">{index + 1}</td>
                                            <td className="p-4 font-semibold text-slate-900">{p.fullName}</td>
                                            <td className="p-4 text-slate-600">{p.schoolOrigin}</td>
                                            <td className="p-4 text-slate-600">{p.grade}</td>
                                            <td className="p-4 text-primary-600 font-medium">{p.selectedEvent}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                                    p.status === 'verified' ? 'bg-green-100 text-green-700' : 
                                                    p.status === 'rejected' ? 'bg-red-100 text-red-700' : 
                                                    'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                    {p.status === 'verified' ? 'Terverifikasi' : p.status === 'rejected' ? 'Ditolak' : 'Proses'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {participants.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="p-12 text-center text-slate-400">Belum ada peserta terdaftar.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ParticipantListPage;