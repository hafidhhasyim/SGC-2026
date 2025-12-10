import React from 'react';
import { FileText, Download } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const JuknisPage: React.FC = () => {
  const { juknisList } = useData();

  const handleDownload = (e: React.MouseEvent, url: string) => {
    if (url === '#' || url === '') {
        e.preventDefault();
        alert("Dokumen Juknis belum tersedia untuk diunduh.");
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
           <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">Informasi & Juknis</h1>
           <p className="text-lg text-slate-600">
             Unduh dokumen petunjuk teknis pelaksanaan lomba. Harap dipelajari dengan seksama sebelum hari pelaksanaan.
           </p>
        </div>

        <div className="space-y-6">
            {juknisList.map(item => (
                <div key={item.id} className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-primary-100 p-4 rounded-xl text-primary-600 shrink-0">
                                <FileText size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-600">{item.description}</p>
                            </div>
                        </div>
                        <a 
                            href={item.downloadUrl}
                            onClick={(e) => handleDownload(e, item.downloadUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-bold transition-colors w-full md:w-auto justify-center shrink-0"
                        >
                            <Download size={20} />
                            Unduh PDF
                        </a>
                    </div>
                </div>
            ))}
        </div>

        <div className="mt-16 bg-blue-50 border border-blue-100 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Catatan Penting:</h3>
            <ul className="list-disc list-inside space-y-2 text-blue-800">
                <li>Keputusan dewan juri bersifat mutlak dan tidak dapat diganggu gugat.</li>
                <li>Peserta wajib melakukan daftar ulang 30 menit sebelum lomba dimulai.</li>
                <li>Setiap perubahan jadwal akan diinformasikan melalui Grup WhatsApp peserta.</li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default JuknisPage;