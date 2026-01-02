import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { EventData, Category, JuknisItem, FaqItem, DataContextType, ContactInfo, SocialLinks, RegistrationFormData, TursoConfig } from '../types';
import { tursoService } from '../services/tursoService';

// Bumped to V17 to remove juknisUrl completely
const STORAGE_KEY = 'SGC_APP_DATA_V17';

const INITIAL_EVENTS: EventData[] = [
  {
    id: '1',
    title: 'Olimpiade MIPA',
    category: Category.ACADEMIC,
    date: 'Sabtu, 6 Februari 2026',
    time: '07:30 - 12:30 WIB',
    location: 'SMP Negeri 1 Genteng',
    fee: 'Rp 65.000',
    description: 'Kompetisi Matematika & IPA tingkat SD/MI. Terdiri dari Babak Penyisihan dan Babak Final.',
    iconName: 'Calculator',
    details: ['Penyisihan: 60 Soal (90 Menit)', 'Final: 20 Soal Uraian', 'Biaya: Rp 65.000']
  },
  {
    id: '2',
    title: 'Olimpiade B. Inggris',
    category: Category.ACADEMIC,
    date: 'Sabtu, 6 Februari 2026',
    time: '09:15 - 13:45 WIB',
    location: 'SMP Negeri 1 Genteng',
    fee: 'Rp 65.000',
    description: 'Uji kemampuan Bahasa Inggris. Meliputi grammar, vocabulary, dan reading comprehension.',
    iconName: 'Globe',
    details: ['Penyisihan: 60 Soal (90 Menit)', 'Final: 20 Soal Uraian', 'Biaya: Rp 65.000']
  }
];

const INITIAL_JUKNIS: JuknisItem[] = [
    {
        id: '1',
        title: 'Juknis Utama SGC 2026',
        description: 'Panduan pendaftaran dan teknis umum pelaksanaan Spensa Gemilang Competition.',
        downloadUrl: ''
    }
];

const INITIAL_FAQS: FaqItem[] = [
    {
        id: '1',
        question: 'Kapan pendaftaran ditutup?',
        answer: 'Pendaftaran ditutup pada 2 Februari 2026 atau ketika kuota peserta terpenuhi.'
    }
];

const INITIAL_CONTACT_INFO: ContactInfo = {
    address: 'Jl. Bromo No. 49 Genteng - Banyuwangi',
    phone1: '081 936 951 078 (Riski)',
    phone2: '082 337 446 950 (Luthfia)',
    email: 'panitia@sgc-spensa.sch.id'
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const loadFromStorage = () => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : null;
        } catch (e) { return null; }
    };

    const savedState = loadFromStorage();

    const [events, setEvents] = useState<EventData[]>(savedState?.events || INITIAL_EVENTS);
    const [juknisList, setJuknisList] = useState<JuknisItem[]>(savedState?.juknisList || INITIAL_JUKNIS);
    const [faqs, setFaqs] = useState<FaqItem[]>(savedState?.faqs || INITIAL_FAQS);
    
    const [registrationUrl, setRegistrationUrl] = useState<string>(savedState?.registrationUrl || 'https://forms.gle/sykYzkquxY6DBwLS6');
    const [publicParticipantsUrl, setPublicParticipantsUrl] = useState<string>(savedState?.publicParticipantsUrl || '');
    const [brochureUrl, setBrochureUrl] = useState<string>(savedState?.brochureUrl || '');
    const [logoUrl, setLogoUrl] = useState<string>(savedState?.logoUrl || '');
    const [bannerUrl, setBannerUrl] = useState<string>(savedState?.bannerUrl || '');
    
    const [adminPassword, setAdminPassword] = useState<string>(savedState?.adminPassword || 'admin123');
    const [contactInfo, setContactInfo] = useState<ContactInfo>(savedState?.contactInfo || INITIAL_CONTACT_INFO);
    const [socialLinks, setSocialLinks] = useState<SocialLinks>(savedState?.socialLinks || { instagram: '', facebook: '' });
    
    const [tursoConfig, setTursoConfig] = useState<TursoConfig>(savedState?.tursoConfig || { dbUrl: '', authToken: '', enabled: false });
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        const stateToSave = { 
            events, juknisList, faqs, 
            registrationUrl, publicParticipantsUrl, brochureUrl, logoUrl, bannerUrl,
            adminPassword, contactInfo, socialLinks, tursoConfig
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    }, [events, juknisList, faqs, registrationUrl, publicParticipantsUrl, brochureUrl, logoUrl, bannerUrl, adminPassword, contactInfo, socialLinks, tursoConfig]);

    useEffect(() => {
        const fetchRemote = async () => {
            if (tursoConfig.enabled && tursoConfig.dbUrl && tursoConfig.authToken) {
                const data = await tursoService.loadData(tursoConfig.dbUrl, tursoConfig.authToken);
                if (data) {
                    if (data.events) setEvents(data.events);
                    if (data.juknisList) setJuknisList(data.juknisList);
                    if (data.faqs) setFaqs(data.faqs);
                    if (data.registrationUrl) setRegistrationUrl(data.registrationUrl);
                    if (data.publicParticipantsUrl) setPublicParticipantsUrl(data.publicParticipantsUrl);
                    if (data.brochureUrl) setBrochureUrl(data.brochureUrl);
                    if (data.logoUrl) setLogoUrl(data.logoUrl);
                    if (data.bannerUrl) setBannerUrl(data.bannerUrl);
                    if (data.adminPassword) setAdminPassword(data.adminPassword);
                    if (data.contactInfo) setContactInfo(data.contactInfo);
                    if (data.socialLinks) setSocialLinks(data.socialLinks);
                }
            }
        };
        fetchRemote();
    }, []);

    const syncToTurso = async (overrideData?: any): Promise<boolean> => {
        const config = overrideData?.tursoConfig || tursoConfig;
        if (!config.enabled || !config.dbUrl || !config.authToken) return false;
        setIsSyncing(true);
        try {
            const state = { 
                events, juknisList, faqs, 
                registrationUrl, publicParticipantsUrl, brochureUrl, logoUrl, bannerUrl,
                adminPassword, contactInfo, socialLinks, tursoConfig,
                ...overrideData
            };
            await tursoService.saveData(config.dbUrl, config.authToken, JSON.stringify(state));
            setIsSyncing(false);
            return true;
        } catch (error) {
            setIsSyncing(false);
            return false;
        }
    };

    const resetData = () => {
        if (window.confirm("Reset semua data?")) {
            localStorage.removeItem(STORAGE_KEY);
            window.location.reload();
        }
    };

    return (
        <DataContext.Provider value={{ 
            events, juknisList, faqs,
            registrationUrl, publicParticipantsUrl, brochureUrl, logoUrl, bannerUrl,
            adminPassword, contactInfo, socialLinks, tursoConfig,
            updateEvent: (upd) => setEvents(prev => prev.map(e => e.id === upd.id ? upd : e)),
            addEvent: (evt) => setEvents(prev => [...prev, evt]),
            deleteEvent: (id) => setEvents(prev => prev.filter(e => e.id !== id)),
            updateJuknis: (upd) => setJuknisList(prev => prev.map(j => j.id === upd.id ? upd : j)),
            addJuknis: (juk) => setJuknisList(prev => [...prev, juk]),
            deleteJuknis: (id) => setJuknisList(prev => prev.filter(j => j.id !== id)),
            updateFaq: (upd) => setFaqs(prev => prev.map(f => f.id === upd.id ? upd : f)),
            addFaq: (fq) => setFaqs(prev => [...prev, fq]),
            deleteFaq: (id) => setFaqs(prev => prev.filter(f => f.id !== id)),
            updateRegistrationUrl: setRegistrationUrl,
            updatePublicParticipantsUrl: setPublicParticipantsUrl,
            updateBrochureUrl: setBrochureUrl,
            updateLogoUrl: setLogoUrl,
            updateBannerUrl: setBannerUrl,
            updateAdminPassword: setAdminPassword,
            updateContactInfo: setContactInfo,
            updateSocialLinks: setSocialLinks,
            updateTursoConfig: setTursoConfig,
            registerParticipant: (d) => console.log("Registering:", d),
            resetData, syncToTurso, isSyncing,
            testTursoConnection: (c) => tursoService.testConnection(c.dbUrl, c.authToken),
            initializeTurso: (c) => tursoService.initTable(c.dbUrl, c.authToken)
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) throw new Error('useData must be used within a DataProvider');
    return context;
};