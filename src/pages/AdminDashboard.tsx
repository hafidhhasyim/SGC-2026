import React, { useState, useEffect } from 'react';
import { useData } from '../contexts/DataContext';
import { EventData, Category, JuknisItem, FaqItem } from '../types';
import { Trash2, Edit2, Plus, LogOut, LayoutDashboard, FileText, HelpCircle, Save, X, RotateCcw, Settings, ExternalLink, Lock, Phone, Image, Database, Loader2, CheckCircle, AlertTriangle, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [activeTab, setActiveTab] = useState<'events' | 'database' | 'juknis' | 'faq' | 'settings'>('events');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    
    const { 
        events, addEvent, deleteEvent, updateEvent,
        juknisList, addJuknis, deleteJuknis, updateJuknis,
        faqs, addFaq, deleteFaq, updateFaq,
        registrationUrl, updateRegistrationUrl,
        publicParticipantsUrl, updatePublicParticipantsUrl,
        brochureUrl, updateBrochureUrl,
        logoUrl, updateLogoUrl,
        bannerUrl, updateBannerUrl,
        adminPassword, updateAdminPassword,
        contactInfo, updateContactInfo,
        socialLinks, updateSocialLinks,
        tursoConfig, updateTursoConfig,
        resetData, syncToTurso, isSyncing, testTursoConnection, initializeTurso
    } = useData();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [editId, setEditId] = useState<string | null>(null);

    const [newEvent, setNewEvent] = useState<Partial<EventData>>({ category: Category.ACADEMIC, iconName: 'BookOpen', details: [] });
    const [newJuknis, setNewJuknis] = useState<Partial<JuknisItem>>({});
    const [newFaq, setNewFaq] = useState<Partial<FaqItem>>({});
    
    const [urlInput, setUrlInput] = useState(registrationUrl);
    const [sheetUrlInput, setSheetUrlInput] = useState(publicParticipantsUrl);
    const [brochureUrlInput, setBrochureUrlInput] = useState(brochureUrl);
    const [logoUrlInput, setLogoUrlInput] = useState(logoUrl);
    const [bannerUrlInput, setBannerUrlInput] = useState(bannerUrl);
    
    const [newPassword, setNewPassword] = useState('');
    const [contactForm, setContactForm] = useState(contactInfo);
    const [socialForm, setSocialForm] = useState(socialLinks);

    const [tursoForm, setTursoForm] = useState(tursoConfig);
    const [isTestingTurso, setIsTestingTurso] = useState(false);
    const [tursoStatus, setTursoStatus] = useState<'idle' | 'success' | 'error'>('idle');
    
    useEffect(() => {
        setUrlInput(registrationUrl);
        setSheetUrlInput(publicParticipantsUrl);
        setBrochureUrlInput(brochureUrl);
        setLogoUrlInput(logoUrl);
        setBannerUrlInput(bannerUrl);
        setContactForm(contactInfo);
        setSocialForm(socialLinks);
        setTursoForm(tursoConfig);
    }, [registrationUrl, publicParticipantsUrl, brochureUrl, logoUrl, bannerUrl, contactInfo, socialLinks, tursoConfig]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordInput === adminPassword) setIsAuthenticated(true);
        else alert('Password salah!');
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditId(null);
        setNewEvent({ category: Category.ACADEMIC, iconName: 'BookOpen', details: [] });
        setNewJuknis({});
        setNewFaq({});
    };

    const openAddModal = () => {
        setModalMode('add');
        setEditId(null);
        setIsModalOpen(true);
    };

    const openEditModal = (id: string, data: any) => {
        setModalMode('edit');
        setEditId(id);
        if (activeTab === 'events') setNewEvent({ ...data });
        if (activeTab === 'juknis') setNewJuknis({ ...data });
        if (activeTab === 'faq') setNewFaq({ ...data });
        setIsModalOpen(true);
    };

    const handleNavClick = (tab: typeof activeTab) => {
        setActiveTab(tab);
        setIsSidebarOpen(false);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
                    <input 
                        type="password" 
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="Masukkan Password"
                        className="w-full p-3 border border-slate-300 rounded-lg mb-4"
                    />
                    <button type="submit" className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold">Masuk</button>
                    <button type="button" onClick={() => navigate('/')} className="w-full mt-2 text-slate-500 text-sm text-center">Kembali ke Beranda</button>
                </form>
            </div>
        );
    }

    const handleSaveEvent = () => {
        if (!newEvent.title || !newEvent.date) return;
        const eventData: EventData = {
            id: editId || Date.now().toString(),
            title: newEvent.title || '',
            description: newEvent.description || '',
            category: newEvent.category as Category,
            date: newEvent.date || '',
            time: newEvent.time || '',
            location: newEvent.location || '',
            fee: newEvent.fee || '',
            iconName: newEvent.iconName as any,
            details: (newEvent.details as string[]) || []
        };
        if (modalMode === 'edit') updateEvent(eventData);
        else addEvent(eventData);
        closeModal();
    };

    const handleSaveJuknis = () => {
        if (!newJuknis.title) return;
        const juknisData: JuknisItem = {
            id: editId || Date.now().toString(),
            title: newJuknis.title || '',
            description: newJuknis.description || '',
            downloadUrl: newJuknis.downloadUrl || '#'
        };
        if (modalMode === 'edit') updateJuknis(juknisData);
        else addJuknis(juknisData);
        closeModal();
    };

    const handleSaveFaq = () => {
        if (!newFaq.question) return;
        const faqData: FaqItem = {
            id: editId || Date.now().toString(),
            question: newFaq.question || '',
            answer: newFaq.answer || ''
        };
        if (modalMode === 'edit') updateFaq(faqData);
        else addFaq(faqData);
        closeModal();
    };

    const handleTestTurso = async () => {
        if (!tursoForm.dbUrl || !tursoForm.authToken) {
            alert("Mohon lengkapi URL dan Token");
            return;
        }
        setIsTestingTurso(true);
        setTursoStatus('idle');
        const success = await testTursoConnection(tursoForm);
        setIsTestingTurso(false);
        setTursoStatus(success ? 'success' : 'error');
    };

    const handleInitTurso = async () => {
         if (!tursoForm.dbUrl || !tursoForm.authToken) {
             alert("Mohon lengkapi URL dan Token terlebih dahulu.");
             return;
         }
         setIsTestingTurso(true);
         const success = await initializeTurso(tursoForm);
         setIsTestingTurso(false);
         if(success) alert("Tabel Database berhasil dibuat/diinisialisasi!");
         else alert("Gagal membuat tabel. Cek koneksi/token.");
    };
    
    const handleSaveSettings = async () => {
        updateRegistrationUrl(urlInput);
        updatePublicParticipantsUrl(sheetUrlInput);
        updateBrochureUrl(brochureUrlInput);
        updateLogoUrl(logoUrlInput);
        updateBannerUrl(bannerUrlInput);
        updateContactInfo(contactForm);
        updateSocialLinks(socialForm);
        updateTursoConfig(tursoForm);
        
        if (newPassword.trim() !== '') {
            updateAdminPassword(newPassword);
            setNewPassword('');
        }
        
        const newSettingsOverride = {
            registrationUrl: urlInput,
            publicParticipantsUrl: sheetUrlInput,
            brochureUrl: brochureUrlInput,
            logoUrl: logoUrlInput,
            bannerUrl: bannerUrlInput,
            contactInfo: contactForm,
            socialLinks: socialForm,
            tursoConfig: tursoForm,
            adminPassword: newPassword.trim() !== '' ? newPassword : adminPassword
        };

        if (tursoForm.enabled) {
            const success = await syncToTurso(newSettingsOverride);
            if (success) alert('Pengaturan berhasil diperbarui dan disinkronkan ke Database Turso!');
            else alert('Pengaturan disimpan lokal, TETAPI gagal sinkron ke Turso.');
        } else {
             alert('Pengaturan berhasil diperbarui (Disimpan di Browser).');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center z-30 sticky top-0">
                <span className="font-bold text-lg">SGC Admin</span>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}
            <aside className={`w-64 bg-slate-900 text-white fixed h-full z-40 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block`}>
                <div className="p-6 hidden md:block"><h2 className="text-2xl font-bold">SGC Admin</h2></div>
                <nav className="mt-6">
                    <button onClick={() => handleNavClick('events')} className={`w-full flex items-center gap-3 px-6 py-4 text-left ${activeTab === 'events' ? 'bg-primary-600' : 'hover:bg-slate-800'}`}><LayoutDashboard size={20} /> Events</button>
                    <button onClick={() => handleNavClick('database')} className={`w-full flex items-center gap-3 px-6 py-4 text-left ${activeTab === 'database' ? 'bg-primary-600' : 'hover:bg-slate-800'}`}><Database size={20} /> Database & Integrasi</button>
                    <button onClick={() => handleNavClick('juknis')} className={`w-full flex items-center gap-3 px-6 py-4 text-left ${activeTab === 'juknis' ? 'bg-primary-600' : 'hover:bg-slate-800'}`}><FileText size={20} /> Juknis</button>
                    <button onClick={() => handleNavClick('faq')} className={`w-full flex items-center gap-3 px-6 py-4 text-left ${activeTab === 'faq' ? 'bg-primary-600' : 'hover:bg-slate-800'}`}><HelpCircle size={20} /> FAQ</button>
                    <button onClick={() => handleNavClick('settings')} className={`w-full flex items-center gap-3 px-6 py-4 text-left ${activeTab === 'settings' ? 'bg-primary-600' : 'hover:bg-slate-800'}`}><Settings size={20} /> Pengaturan</button>
                </nav>
                <div className="p-6 border-t border-slate-800 mt-auto">
                    <button onClick={resetData} className="flex items-center gap-2 text-red-400 hover:text-red-300 mb-4 transition-colors w-full"><RotateCcw size={18} /> Reset Data</button>
                    <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"><LogOut size={18} /> Logout / Home</button>
                </div>
            </aside>
            <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
                <h1 className="text-3xl font-bold text-slate-800 mb-8 capitalize">{activeTab === 'database' ? 'Database & Integrasi' : `Manage ${activeTab}`}</h1>
                
                {activeTab === 'events' && (
                    <div className="space-y-8">
                        <button onClick={openAddModal} className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700 flex items-center gap-2 shadow-lg"><Plus size={18} /> Tambah Event</button>
                        <div className="space-y-4">
                            {events.map(event => (
                                <div key={event.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div><h4 className="font-bold text-lg">{event.title}</h4><p className="text-sm text-slate-500">{event.date} • {event.location}</p></div>
                                    <div className="flex gap-2"><button onClick={() => openEditModal(event.id, event)} className="text-blue-500 hover:bg-blue-50 p-2 rounded"><Edit2 size={20} /></button><button onClick={() => deleteEvent(event.id)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={20} /></button></div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="space-y-8 max-w-4xl">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-slate-800 border-b pb-4"><ExternalLink size={20} className="text-primary-600" /> Pengaturan Link & Aset</h3>
                            <div className="grid grid-cols-1 gap-6">
                                <div><label className="block text-sm font-medium text-slate-700 mb-2">Google Form Pendaftaran URL</label><input type="text" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} placeholder="https://docs.google.com/forms/..." className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500" /></div>
                                <div><label className="block text-sm font-medium text-slate-700 mb-2">Download Brosur/Banner URL</label><input type="text" value={brochureUrlInput} onChange={(e) => setBrochureUrlInput(e.target.value)} placeholder="https://drive.google.com/..." className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500" /></div>
                                <div><label className="block text-sm font-medium text-slate-700 mb-2">Link Daftar Peserta (Public Sheet URL)</label><input type="text" value={sheetUrlInput} onChange={(e) => setSheetUrlInput(e.target.value)} placeholder="https://docs.google.com/spreadsheets/..." className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500" /></div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div><label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2"><Image size={16} /> Logo URL</label><input type="text" value={logoUrlInput} onChange={(e) => setLogoUrlInput(e.target.value)} placeholder="https://drive.google.com/file/d/..." className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500" /></div>
                                    <div><label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2"><Image size={16} /> Banner Image URL</label><input type="text" value={bannerUrlInput} onChange={(e) => setBannerUrlInput(e.target.value)} placeholder="https://drive.google.com/file/d/..." className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500" /></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                             <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-slate-800 border-b pb-4"><Lock size={20} className="text-primary-600" /> Keamanan Akun</h3>
                            <div><label className="block text-sm font-medium text-slate-700 mb-2">Ganti Password Admin</label><input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Masukkan password baru" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 bg-slate-50" /></div>
                        </div>

                        <div className="sticky bottom-0 bg-slate-50 pt-4 pb-8"><button onClick={handleSaveSettings} className="w-full bg-primary-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30 flex items-center justify-center gap-2"><Save size={20} /> Simpan Semua Pengaturan</button></div>
                    </div>
                )}
                
                {activeTab === 'juknis' && (
                    <div className="space-y-8">
                         <button onClick={openAddModal} className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700 flex items-center gap-2 shadow-lg"><Plus size={18} /> Tambah Juknis</button>
                         <div className="space-y-4">
                            {juknisList.map(item => (
                                <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-lg">{item.title}</h4>
                                        <p className="text-sm text-slate-500">{item.description}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => openEditModal(item.id, item)} className="text-blue-500 hover:bg-blue-50 p-2 rounded"><Edit2 size={20} /></button>
                                        <button onClick={() => deleteJuknis(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={20} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'faq' && (
                    <div className="space-y-8">
                         <button onClick={openAddModal} className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700 flex items-center gap-2 shadow-lg"><Plus size={18} /> Tambah FAQ</button>
                        <div className="space-y-4">
                            {faqs.map(item => (
                                <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-lg">{item.question}</h4>
                                        <p className="text-sm text-slate-500 line-clamp-2">{item.answer}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => openEditModal(item.id, item)} className="text-blue-500 hover:bg-blue-50 p-2 rounded"><Edit2 size={20} /></button>
                                        <button onClick={() => deleteFaq(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={20} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h3 className="text-lg font-bold">
                                {modalMode === 'add' ? 'Tambah Data' : 'Edit Data'}
                            </h3>
                            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                                <X size={24} />
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-4">
                            {activeTab === 'events' && (
                                <>
                                    <input placeholder="Judul Event" className="w-full p-3 border rounded-lg" value={newEvent.title || ''} onChange={e => setNewEvent({...newEvent, title: e.target.value})} />
                                    <div className="grid grid-cols-2 gap-4">
                                        <select className="p-3 border rounded-lg" value={newEvent.category} onChange={e => setNewEvent({...newEvent, category: e.target.value as Category})}>
                                            <option value={Category.ACADEMIC}>Akademik</option>
                                            <option value={Category.CREATIVE}>Kreatif</option>
                                        </select>
                                        <input placeholder="Biaya" className="p-3 border rounded-lg" value={newEvent.fee || ''} onChange={e => setNewEvent({...newEvent, fee: e.target.value})} />
                                    </div>
                                    <input placeholder="Tanggal" className="w-full p-3 border rounded-lg" value={newEvent.date || ''} onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
                                    <textarea placeholder="Deskripsi Singkat" className="w-full p-3 border rounded-lg h-24" value={newEvent.description || ''} onChange={e => setNewEvent({...newEvent, description: e.target.value})} />
                                    <button onClick={handleSaveEvent} className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700">Simpan Event</button>
                                </>
                            )}
                            {activeTab === 'juknis' && (
                                <>
                                    <input placeholder="Judul Juknis" className="w-full p-3 border rounded-lg" value={newJuknis.title || ''} onChange={e => setNewJuknis({...newJuknis, title: e.target.value})} />
                                    <textarea placeholder="Deskripsi Singkat" className="w-full p-3 border rounded-lg h-24" value={newJuknis.description || ''} onChange={e => setNewJuknis({...newJuknis, description: e.target.value})} />
                                    <input placeholder="Link Download" className="w-full p-3 border rounded-lg" value={newJuknis.downloadUrl || ''} onChange={e => setNewJuknis({...newJuknis, downloadUrl: e.target.value})} />
                                    <button onClick={handleSaveJuknis} className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700">Simpan Juknis</button>
                                </>
                            )}
                             {activeTab === 'faq' && (
                                <>
                                    <input placeholder="Pertanyaan" className="w-full p-3 border rounded-lg" value={newFaq.question || ''} onChange={e => setNewFaq({...newFaq, question: e.target.value})} />
                                    <textarea placeholder="Jawaban" className="w-full p-3 border rounded-lg h-32" value={newFaq.answer || ''} onChange={e => setNewFaq({...newFaq, answer: e.target.value})} />
                                    <button onClick={handleSaveFaq} className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700">Simpan FAQ</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;