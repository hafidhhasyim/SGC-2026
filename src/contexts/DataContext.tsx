import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { EventData, Category, JuknisItem, FaqItem, DataContextType, ContactInfo, SocialLinks, RegistrationFormData, TursoConfig } from '../types';
import { tursoService } from '../services/tursoService';

const STORAGE_KEY = 'SGC_APP_DATA_V5'; // Bumped version for Turso

// Initial Mock Data updated for SGC 2026
const INITIAL_EVENTS: EventData[] = [
  {
    id: '1',
    title: 'Tryout TKA + IPAS',
    category: Category.ACADEMIC,
    date: 'Minggu, 7 Februari 2026',
    time: '08:00 WIB',
    location: 'SMP Negeri 1 Genteng',
    fee: 'Rp 50.000',
    description: 'Simulasi Tes Kemampuan Akademik (Bhs. Indonesia, Matematika, IPAS) untuk persiapan jenjang selanjutnya.',
    iconName: 'BookOpen',
    details: ['Materi: B. Indo, MTK, IPAS', 'Minggu, 7 Februari 2026', 'Rp 50.000 / Peserta']
  },
  {
    id: '2',
    title: 'Olimpiade MIPA',
    category: Category.ACADEMIC,
    date: 'Sabtu, 6 Februari 2026',
    time: '07:30 WIB',
    location: 'SMP Negeri 1 Genteng',
    fee: 'Rp 65.000',
    description: 'Kompetisi Matematika dan IPA tingkat SD/MI. Uji kemampuan logikamu di sini!',
    iconName: 'Calculator',
    details: ['Sabtu, 6 Februari 2026', 'Rp 65.000 / Peserta', 'Piala & Uang Pembinaan']
  },
  {
    id: '3',
    title: 'Olimpiade Bahasa Inggris',
    category: Category.ACADEMIC,
    date: 'Sabtu, 6 Februari 2026',
    time: '09:00 WIB',
    location: 'SMP Negeri 1 Genteng',
    fee: 'Rp 65.000',
    description: 'Tunjukkan kemampuan Bahasa Inggrismu dalam ajang bergengsi ini.',
    iconName: 'Globe',
    details: ['Sabtu, 6 Februari 2026', 'Rp 65.000 / Peserta', 'Sertifikat & Doorprize']
  },
  {
    id: '4',
    title: 'Lomba Gambar Bercerita',
    category: Category.CREATIVE,
    date: 'Sabtu, 6 Februari 2026',
    time: '08:00 WIB',
    location: 'SMP Negeri 1 Genteng',
    fee: 'Rp 50.000',
    description: 'Tuangkan imajinasimu dalam gambar yang bercerita.',
    iconName: 'Pencil',
    details: ['Sabtu, 6 Februari 2026', 'Rp 50.000 / Peserta', 'Tema Kreatif']
  },
  {
    id: '5',
    title: 'Lomba Mewarnai',
    category: Category.CREATIVE,
    date: 'Sabtu, 6 Februari 2026',
    time: '08:30 WIB',
    location: 'SMP Negeri 1 Genteng',
    fee: 'Rp 50.000',
    description: 'Khusus untuk adik-adik yang gemar mewarnai. Salurkan bakat senimu!',
    iconName: 'Palette',
    details: ['Sabtu, 6 Februari 2026', 'Rp 50.000 / Peserta', 'Hadiah Menarik']
  },
];

const INITIAL_JUKNIS: JuknisItem[] = [
    {
        id: '1',
        title: 'Buku Panduan SGC 2026',
        description: 'Panduan lengkap seluruh cabang lomba, tata tertib, dan teknis pelaksanaan SGC 2026.',
        downloadUrl: '#'
    },
    {
        id: '2',
        title: 'Formulir Pendaftaran Offline',
        description: 'Bagi peserta yang mendaftar secara kolektif via sekolah, formulir dapat diunduh di sini.',
        downloadUrl: '#'
    }
];

const INITIAL_FAQS: FaqItem[] = [
    {
        id: '1',
        question: 'Kapan pendaftaran dibuka?',
        answer: 'Pendaftaran dibuka mulai 8 Desember sampai dengan 2 Februari 2026. Segera daftar sebelum kuota terpenuhi!'
    },
    {
        id: '2',
        question: 'Bagaimana cara pembayarannya?',
        answer: 'Pembayaran ditransfer ke Bank Jatim No. Rek 0553010420 a.n. Lailatul Zuhro.'
    },
    {
        id: '3',
        question: 'Apa saja fasilitas yang didapat?',
        answer: 'Peserta mendapatkan Sertifikat Peserta, berkesempatan memenangkan Trofi Juara, Uang Pembinaan, dan Doorprize (Total hadiah jutaan rupiah).'
    },
    {
        id: '4',
        question: 'Siapa yang bisa mendaftar?',
        answer: 'Siswa SD / MI Sederajat Tahun Pelajaran 2025/2026.'
    }
];

const INITIAL_REGISTRATION_URL = '#';
const INITIAL_PUBLIC_PARTICIPANTS_URL = '';
const INITIAL_BROCHURE_URL = '#';
const INITIAL_LOGO_URL = '';
const INITIAL_BANNER_URL = 'https://drive.google.com/thumbnail?id=1wAHp_r0aMa743kUnzGN0uAVApl5RHmJh&sz=w1920&v=2'; 
const INITIAL_JUKNIS_URL = '';
const INITIAL_ADMIN_PASSWORD = 'admin123';

const INITIAL_CONTACT_INFO: ContactInfo = {
    address: 'Jl. Bromo No. 49 Genteng - Banyuwangi',
    phone1: '0819-3695-1078 (Rizki Murni)',
    phone2: '0819-3695-1078 (Lutfhia Laili)',
    email: 'panitia@sgc-spensa.sch.id'
};

const INITIAL_SOCIAL_LINKS: SocialLinks = {
    instagram: 'https://instagram.com/smpnegeri1genteng',
    facebook: 'https://facebook.com/smpn1genteng'
};

const INITIAL_TURSO_CONFIG: TursoConfig = {
    dbUrl: 'libsql://database-sgc-vercel-icfg-gvxautgzlhsdxfc7sdwgogob.aws-us-east-1.turso.io',
    authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjUzNzI4NjYsImlkIjoiZjViZTIxZjItZDk1OC00MGRkLTkwZDMtODEzYTk2OTI4YTVhIiwicmlkIjoiZWE4NTE0YzAtMjMzYS00N2FjLTg1Y2UtNDFkOTMxZGM4NWIyIn0.e4aZM_GZRygAaBh9rcZmflhW7ZASYlMfcSsKShaba4vZSgNvLlQkvwogZ_HK_i6kPqDkPlIQ-pwtZp8USyPJBg',
    enabled: true
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    
    // Initial State Loader
    const loadState = () => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            console.error("Failed to load state", e);
            return null;
        }
    };

    const savedState = loadState();

    const [events, setEvents] = useState<EventData[]>(savedState?.events || INITIAL_EVENTS);
    const [juknisList, setJuknisList] = useState<JuknisItem[]>(savedState?.juknisList || INITIAL_JUKNIS);
    const [faqs, setFaqs] = useState<FaqItem[]>(savedState?.faqs || INITIAL_FAQS);
    
    // Config URLs
    const [registrationUrl, setRegistrationUrl] = useState<string>(savedState?.registrationUrl || INITIAL_REGISTRATION_URL);
    const [publicParticipantsUrl, setPublicParticipantsUrl] = useState<string>(savedState?.publicParticipantsUrl || INITIAL_PUBLIC_PARTICIPANTS_URL);
    const [brochureUrl, setBrochureUrl] = useState<string>(savedState?.brochureUrl || INITIAL_BROCHURE_URL);
    const [logoUrl, setLogoUrl] = useState<string>(savedState?.logoUrl || INITIAL_LOGO_URL);
    const [bannerUrl, setBannerUrl] = useState<string>(savedState?.bannerUrl || INITIAL_BANNER_URL);
    const [juknisUrl, setJuknisUrl] = useState<string>(savedState?.juknisUrl || INITIAL_JUKNIS_URL);
    
    // Settings
    const [adminPassword, setAdminPassword] = useState<string>(savedState?.adminPassword || INITIAL_ADMIN_PASSWORD);
    const [contactInfo, setContactInfo] = useState<ContactInfo>(savedState?.contactInfo || INITIAL_CONTACT_INFO);
    const [socialLinks, setSocialLinks] = useState<SocialLinks>(savedState?.socialLinks || INITIAL_SOCIAL_LINKS);
    
    // Turso Config
    const [tursoConfig, setTursoConfig] = useState<TursoConfig>(savedState?.tursoConfig || INITIAL_TURSO_CONFIG);
    const [isSyncing, setIsSyncing] = useState(false);

    // Persist to local storage whenever state changes
    useEffect(() => {
        try {
            const stateToSave = { 
                events, juknisList, faqs, 
                registrationUrl, publicParticipantsUrl, brochureUrl, logoUrl, bannerUrl, juknisUrl,
                adminPassword, contactInfo, socialLinks, tursoConfig
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
        } catch (e) {
            console.error("Failed to save state", e);
        }
    }, [events, juknisList, faqs, registrationUrl, publicParticipantsUrl, brochureUrl, logoUrl, bannerUrl, juknisUrl, adminPassword, contactInfo, socialLinks, tursoConfig]);

    // Attempt to load from Turso on mount if enabled
    useEffect(() => {
        const fetchRemoteData = async () => {
            if (tursoConfig.enabled && tursoConfig.dbUrl && tursoConfig.authToken) {
                console.log("Attempting to load data from Turso...");
                const remoteData = await tursoService.loadData(tursoConfig.dbUrl, tursoConfig.authToken);
                if (remoteData) {
                    console.log("Data loaded from Turso successfully.");
                    // Update state with remote data
                    if (remoteData.events) setEvents(remoteData.events);
                    if (remoteData.juknisList) setJuknisList(remoteData.juknisList);
                    if (remoteData.faqs) setFaqs(remoteData.faqs);
                    if (remoteData.registrationUrl) setRegistrationUrl(remoteData.registrationUrl);
                    if (remoteData.publicParticipantsUrl) setPublicParticipantsUrl(remoteData.publicParticipantsUrl);
                    if (remoteData.brochureUrl) setBrochureUrl(remoteData.brochureUrl);
                    if (remoteData.logoUrl) setLogoUrl(remoteData.logoUrl);
                    if (remoteData.bannerUrl) setBannerUrl(remoteData.bannerUrl);
                    if (remoteData.juknisUrl) setJuknisUrl(remoteData.juknisUrl);
                    if (remoteData.adminPassword) setAdminPassword(remoteData.adminPassword);
                    if (remoteData.contactInfo) setContactInfo(remoteData.contactInfo);
                    if (remoteData.socialLinks) setSocialLinks(remoteData.socialLinks);
                }
            }
        };
        
        // Only run once on mount if config exists
        fetchRemoteData();
    }, []); // Empty dependency array to run only on mount

    // Manual Sync function
    const syncToTurso = async (): Promise<boolean> => {
        if (!tursoConfig.enabled || !tursoConfig.dbUrl || !tursoConfig.authToken) {
            return false;
        }

        setIsSyncing(true);
        try {
            const currentState = { 
                events, juknisList, faqs, 
                registrationUrl, publicParticipantsUrl, brochureUrl, logoUrl, bannerUrl, juknisUrl,
                adminPassword, contactInfo, socialLinks, tursoConfig
            };
            await tursoService.saveData(tursoConfig.dbUrl, tursoConfig.authToken, JSON.stringify(currentState));
            setIsSyncing(false);
            return true;
        } catch (error) {
            console.error("Failed to sync to Turso", error);
            setIsSyncing(false);
            return false;
        }
    };

    // Reset Data Function
    const resetData = () => {
        if (window.confirm("PERINGATAN: Apakah Anda yakin ingin mereset seluruh data sistem? Semua data konten dan password admin akan kembali ke default.")) {
            localStorage.removeItem(STORAGE_KEY);
            setEvents(INITIAL_EVENTS);
            setJuknisList(INITIAL_JUKNIS);
            setFaqs(INITIAL_FAQS);
            setRegistrationUrl(INITIAL_REGISTRATION_URL);
            setPublicParticipantsUrl(INITIAL_PUBLIC_PARTICIPANTS_URL);
            setBrochureUrl(INITIAL_BROCHURE_URL);
            setLogoUrl(INITIAL_LOGO_URL);
            setBannerUrl(INITIAL_BANNER_URL);
            setJuknisUrl(INITIAL_JUKNIS_URL);
            setAdminPassword(INITIAL_ADMIN_PASSWORD);
            setContactInfo(INITIAL_CONTACT_INFO);
            setSocialLinks(INITIAL_SOCIAL_LINKS);
            setTursoConfig(INITIAL_TURSO_CONFIG);
            alert("Sistem berhasil direset ke pengaturan awal.");
        }
    };

    // Event Actions
    const updateEvent = (updatedEvent: EventData) => {
        setEvents(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
    };

    const addEvent = (newEvent: EventData) => {
        setEvents(prev => [...prev, newEvent]);
    };

    const deleteEvent = (id: string) => {
        setEvents(prev => prev.filter(e => e.id !== id));
    };

    // Juknis Actions
    const updateJuknis = (updatedJuknis: JuknisItem) => {
        setJuknisList(prev => prev.map(j => j.id === updatedJuknis.id ? updatedJuknis : j));
    };

    const addJuknis = (newJuknis: JuknisItem) => {
        setJuknisList(prev => [...prev, newJuknis]);
    };

    const deleteJuknis = (id: string) => {
        setJuknisList(prev => prev.filter(j => j.id !== id));
    };

    // FAQ Actions
    const updateFaq = (updatedFaq: FaqItem) => {
        setFaqs(prev => prev.map(f => f.id === updatedFaq.id ? updatedFaq : f));
    };

    const addFaq = (newFaq: FaqItem) => {
        setFaqs(prev => [...prev, newFaq]);
    };

    const deleteFaq = (id: string) => {
        setFaqs(prev => prev.filter(f => f.id !== id));
    };

    // URL Actions
    const updateRegistrationUrl = (url: string) => setRegistrationUrl(url);
    const updatePublicParticipantsUrl = (url: string) => setPublicParticipantsUrl(url);
    const updateBrochureUrl = (url: string) => setBrochureUrl(url);
    const updateLogoUrl = (url: string) => setLogoUrl(url);
    const updateBannerUrl = (url: string) => setBannerUrl(url);
    const updateJuknisUrl = (url: string) => setJuknisUrl(url);
    
    // Settings Actions
    const updateAdminPassword = (password: string) => setAdminPassword(password);
    const updateContactInfo = (info: ContactInfo) => setContactInfo(info);
    const updateSocialLinks = (links: SocialLinks) => setSocialLinks(links);
    const updateTursoConfig = (config: TursoConfig) => setTursoConfig(config);

    // Mock Registration
    const registerParticipant = (data: RegistrationFormData) => {
        console.log("Registered Participant:", data);
    };

    return (
        <DataContext.Provider value={{ 
            events, juknisList, faqs,
            registrationUrl, publicParticipantsUrl, brochureUrl, logoUrl, bannerUrl, juknisUrl,
            adminPassword, contactInfo, socialLinks, tursoConfig,
            
            updateEvent, addEvent, deleteEvent,
            updateJuknis, addJuknis, deleteJuknis,
            updateFaq, addFaq, deleteFaq,
            updateRegistrationUrl, updatePublicParticipantsUrl, updateBrochureUrl, updateLogoUrl, updateBannerUrl, updateJuknisUrl,
            updateAdminPassword, updateContactInfo, updateSocialLinks, updateTursoConfig,
            
            registerParticipant,
            resetData,
            syncToTurso,
            isSyncing
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};