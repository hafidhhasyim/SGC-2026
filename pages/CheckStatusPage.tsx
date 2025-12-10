import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const CheckStatusPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex bg-yellow-100 p-4 rounded-full text-yellow-600 mb-6">
            <AlertTriangle size={48} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Halaman Tidak Ditemukan</h1>
        <p className="text-slate-600 mb-8">
          Fitur Cek Status Pendaftaran telah dipindahkan atau dinonaktifkan. Silakan cek daftar peserta melalui menu yang tersedia.
        </p>
        <Link 
            to="/participants" 
            className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors"
        >
            Lihat Daftar Peserta
        </Link>
      </div>
    </div>
  );
};

export default CheckStatusPage;
