import React, { useState, useRef } from 'react';
import { X, CheckCircle, Loader2, Upload, FileImage } from 'lucide-react';
import { RegistrationFormData, EventData } from '../types';
import { useData } from '../contexts/DataContext';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEventTitle?: string;
  events: EventData[];
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, selectedEventTitle, events }) => {
  const { registerParticipant } = useData();
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    schoolOrigin: '',
    grade: '',
    parentName: '',
    whatsappNumber: '',
    selectedEvent: selectedEventTitle || '',
    paymentProof: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update selected event if prop changes
  React.useEffect(() => {
    if (selectedEventTitle) {
      setFormData(prev => ({ ...prev, selectedEvent: selectedEventTitle }));
    }
  }, [selectedEventTitle]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, paymentProof: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.paymentProof) {
        alert("Mohon lampirkan bukti pembayaran.");
        return;
    }

    setIsSubmitting(true);

    // Simulate API call and register
    setTimeout(() => {
      registerParticipant(formData);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      schoolOrigin: '',
      grade: '',
      parentName: '',
      whatsappNumber: '',
      selectedEvent: '',
      paymentProof: null,
    });
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg max-h-[90vh] overflow-y-auto">
          
          {/* Header */}
          <div className="bg-primary-600 px-4 py-4 sm:px-6 flex justify-between items-center sticky top-0 z-10">
            <h3 className="text-lg font-bold leading-6 text-white" id="modal-title">
              Formulir Pendaftaran SGC
            </h3>
            <button onClick={onClose} className="text-primary-100 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="px-4 py-6 sm:p-6">
            {isSuccess ? (
              <div className="text-center py-8">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Pendaftaran Berhasil!</h3>
                <p className="text-slate-600 text-sm mb-4">
                  Data dan bukti pembayaran Anda telah kami terima. Panitia akan memverifikasi data Anda.
                </p>
                <div className="bg-slate-100 p-4 rounded-lg mb-6 border border-slate-200">
                    <p className="font-bold text-slate-800">Cek Status Berkala</p>
                    <p className="text-sm text-slate-600 mt-1">Info kelolosan verifikasi akan dikirim via WhatsApp ke nomor:</p>
                    <p className="font-mono text-lg text-primary-700 font-bold mt-1">{formData.whatsappNumber}</p>
                </div>
                <button
                  onClick={resetForm}
                  className="inline-flex w-full justify-center rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
                >
                  Tutup
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap Peserta</label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="block w-full rounded-lg border-slate-300 border px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    placeholder="Contoh: Budi Santoso"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="schoolOrigin" className="block text-sm font-medium text-slate-700 mb-1">Asal Sekolah</label>
                        <input
                            type="text"
                            name="schoolOrigin"
                            id="schoolOrigin"
                            required
                            value={formData.schoolOrigin}
                            onChange={handleChange}
                            className="block w-full rounded-lg border-slate-300 border px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            placeholder="SDN 1..."
                        />
                    </div>
                    <div>
                        <label htmlFor="grade" className="block text-sm font-medium text-slate-700 mb-1">Kelas</label>
                        <select
                            name="grade"
                            id="grade"
                            required
                            value={formData.grade}
                            onChange={handleChange}
                            className="block w-full rounded-lg border-slate-300 border px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        >
                            <option value="">Pilih...</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                    </div>
                </div>

                <div>
                  <label htmlFor="selectedEvent" className="block text-sm font-medium text-slate-700 mb-1">Pilih Cabang Lomba</label>
                  <select
                    name="selectedEvent"
                    id="selectedEvent"
                    required
                    value={formData.selectedEvent}
                    onChange={handleChange}
                    className="block w-full rounded-lg border-slate-300 border px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  >
                    <option value="">Pilih Lomba...</option>
                    {events.map(event => (
                        <option key={event.id} value={event.title}>{event.title}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-2 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Kontak Orang Tua / Wali</p>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label htmlFor="parentName" className="block text-sm font-medium text-slate-700 mb-1">Nama Orang Tua</label>
                            <input
                                type="text"
                                name="parentName"
                                id="parentName"
                                required
                                value={formData.parentName}
                                onChange={handleChange}
                                className="block w-full rounded-lg border-slate-300 border px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="whatsappNumber" className="block text-sm font-medium text-slate-700 mb-1">Nomor WhatsApp Aktif</label>
                            <input
                                type="tel"
                                name="whatsappNumber"
                                id="whatsappNumber"
                                required
                                value={formData.whatsappNumber}
                                onChange={handleChange}
                                className="block w-full rounded-lg border-slate-300 border px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                placeholder="0812..."
                            />
                            <p className="text-xs text-slate-500 mt-1">*Info teknis akan dikirim ke nomor ini.</p>
                        </div>
                    </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Upload Bukti Pembayaran</label>
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-colors"
                    >
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {formData.paymentProof ? (
                            <div className="flex flex-col items-center text-primary-600">
                                <FileImage size={32} className="mb-2" />
                                <span className="text-sm font-medium break-all">{formData.paymentProof.name}</span>
                                <span className="text-xs text-slate-500 mt-1">Klik untuk ganti file</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-slate-500">
                                <Upload size={32} className="mb-2" />
                                <span className="text-sm font-medium">Klik untuk upload gambar</span>
                                <span className="text-xs mt-1">Format: JPG, PNG (Max 2MB)</span>
                            </div>
                        )}
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                        Silakan transfer ke <strong>Bank Jatim 0553010420 a.n. Lailatul Zuhro</strong> sebelum upload.
                    </p>
                </div>

                <div className="mt-5 sm:mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full justify-center rounded-lg bg-primary-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-primary-500/30 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                  >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="animate-spin mr-2" size={20} />
                            Memproses...
                        </>
                    ) : (
                        'Kirim Pendaftaran'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;