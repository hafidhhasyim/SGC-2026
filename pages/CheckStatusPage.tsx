import React, { useState } from 'react';
import { Search, CheckCircle, Clock, XCircle, User } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Participant } from '../types';

const CheckStatusPage: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [foundParticipants, setFoundParticipants] = useState<Participant[]>([]);
  const { participants } = useData();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;

    const results = participants.filter(
      (p) => p.whatsappNumber === phoneNumber || p.whatsappNumber === phoneNumber.replace(/^0/, '62')
    );

    setFoundParticipants(results);
    setHasSearched(true);
  };

  const getStatusBadge = (status: Participant['status']) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
            <CheckCircle size={14} /> Terverifikasi
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
            <XCircle size={14} /> Ditolak
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
            <Clock size={14} /> Menunggu Verifikasi
          </span>
        );
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Cek Status Pendaftaran</h1>
          <p className="text-slate-600">
            Masukkan nomor WhatsApp yang Anda gunakan saat mendaftar untuk melihat status pendaftaran peserta.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-400 font-bold">+62</span>
                </div>
                <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="8123xxxxxxx (Tanpa 0 di depan)"
                    className="block w-full pl-12 rounded-xl border-slate-300 border py-3 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-lg"
                />
            </div>
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-bold transition-colors flex items-center gap-2"
            >
              <Search size={20} />
              <span className="hidden sm:inline">Cari Data</span>
            </button>
          </form>
        </div>

        {hasSearched && (
          <div className="animate-fade-in-up">
            {foundParticipants.length > 0 ? (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-800 mb-4">Ditemukan {foundParticipants.length} Data Pendaftaran:</h2>
                {foundParticipants.map((participant) => (
                  <div key={participant.id} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-start gap-4">
                        <div className="bg-primary-100 p-3 rounded-full text-primary-600 mt-1">
                            <User size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">{participant.fullName}</h3>
                            <p className="text-slate-500 text-sm mb-1">{participant.schoolOrigin} - Kelas {participant.grade}</p>
                            <p className="text-primary-600 font-medium text-sm">{participant.selectedEvent}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        {getStatusBadge(participant.status)}
                        <span className="text-xs text-slate-400">Terdaftar: {participant.registrationDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 border-dashed">
                <div className="inline-flex bg-slate-100 p-4 rounded-full text-slate-400 mb-4">
                    <Search size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-700">Data Tidak Ditemukan</h3>
                <p className="text-slate-500 max-w-sm mx-auto mt-2">
                    Pastikan nomor WhatsApp yang Anda masukkan benar dan sesuai dengan yang didaftarkan.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckStatusPage;