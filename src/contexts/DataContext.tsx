import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { EventData, Category, JuknisItem, FaqItem, DataContextType, ContactInfo, SocialLinks, RegistrationFormData, TursoConfig } from '../types';
import { tursoService } from '../services/tursoService';

const STORAGE_KEY = 'SGC_APP_DATA_V9';

const INITIAL_EVENTS: EventData[] = [
  {
    id: '1',
    title: 'Olimpiade MIPA',
    category: Category.ACADEMIC,
    date: 'Sabtu, 6 Februari 2026',
    time: '07:30 - 12:30 WIB',
    location: 'SMP Negeri 1 Genteng',
    fee: 'Rp 65.000',
    description: 'Kompetisi Matematika & IPA. Terdiri dari Babak Penyisihan (Pilihan Ganda) dan Babak Final (Uraian) untuk 20 peserta terbaik.',
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
    description: 'Uji kemampuan Bahasa Inggris. Babak Penyisihan (60 Soal) dan Final (20 Soal Uraian) untuk memperebutkan juara.',
    iconName: 'Globe',
    details: ['Penyisihan: 60 Soal (90 Menit)', 'Final: 20 Soal Uraian', 'Biaya: Rp 65.000']
  },
  {
    id: '3',
    title: 'Menggambar Bercerita',
    category: Category.CREATIVE,
    date: 'Sabtu, 6 Februari 2026',
    time: '07:30 - 10:30 WIB',
    location: 'SMP Negeri 1 Genteng',
    fee: 'Rp 50.000',
    description: 'Tema: "7 Kebiasaan Anak Indonesia Hebat". Peserta kelas 4-6 SD. Wajib membawa meja lipat dan alat gambar sendiri.',
    iconName: 'Pencil',
    details: ['Kelas 4, 5, 6 SD', 'Durasi: 3 Jam', 'Media: A4 (Disediakan)']
  },
  {
    id: '4',
    title: 'Lomba Mewarnai',
    category: Category.CREATIVE,
    date: 'Sabtu, 6 Februari 2026',
    time: '07:30 - 09:30 WIB',
    location: 'SMP Negeri 1 Genteng',
    fee: 'Rp 50.000',
    description: 'Kategori Kelas 1-3 SD. Kriteria: Kerapian, Komposisi Warna, dan Kreativitas. Wajib membawa meja lipat dan tikar.',
    iconName: 'Palette',
    details: ['Kelas 1, 2, 3 SD', 'Durasi: 2 Jam', 'Wajib bawa meja lipat']
  },
  {
    id: '5',
    title: 'Try Out SD/MI',
    category: Category.ACADEMIC,
    date: 'Minggu, 7 Februari 2026',
    time: '07:30 - 09:30 WIB',
    location: 'SMP Negeri 1 Genteng',
    fee: 'Rp 50.000',
    description: 'Simulasi ujian dengan 100 Soal (Matematika, IPA, B.Indo, IPS). Durasi 120 menit.',
    iconName: 'BookOpen',
    details: ['100 Soal Pilihan Ganda', 'Durasi: 120 Menit', 'Semua Mapel Utama']
  },
];

const INITIAL_JUKNIS: JuknisItem[] = [
    {
        id: '1',
        title: 'Juknis Lengkap SGC 2026',
        description: 'Dokumen lengkap berisi tata tertib, silabus materi, dan rundown acara.',
        downloadUrl: 'https://drive.google.com/file/d/1sfm9IZ8sddmHggeykXDhSEhorDMkeORO/view?usp=sharing'
    }
];

const INITIAL_FAQS: FaqItem[] = [
    {
        id: '1',
        question: 'Kapan pelaksanaan lomba?',
        answer: 'Lomba dilaksanakan pada 6-7 Februari 2026. Olimpiade & Seni pada hari Sabtu (6 Feb), Try Out pada hari Minggu (7 Feb).'
    },
    {
        id: '2',
        question: 'Apakah perlengkapan menggambar disediakan?',
        answer: 'Panitia hanya menyediakan kertas gambar A4. Peserta WAJIB membawa alat gambar, meja lipat, tikar, dan bekal sendiri.'
    },
    {
        id: '3',
        question: 'Bagaimana sistem penilaian Olimpiade?',
        answer: 'Olimpiade menggunakan sistem Benar +4, Salah -1, Kosong 0 pada babak penyisihan. 20 peserta terbaik akan lolos ke babak Final (Uraian).'
    },
    {
        id: '4',
        question: 'Siapa Contact Person pendaftaran?',
        answer: 'Riski Murniasih (081 936 951 078) atau Luthfia Laili (082 337 446 950).'
    }
];

const INITIAL_REGISTRATION_URL = 'https://forms.gle/sykYzkquxY6DBwLS6';
const INITIAL_PUBLIC_PARTICIPANTS_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTnCzLsaBbh2F5_x0_s7i9m5wNcKwZvsEKcd09iP55k6UbMChdxg9ZhNCKvSuyOYruA08WHE-j-_zrA/pubhtml?gid=20648520&single=true';
const INITIAL_BROCHURE_URL = 'https://drive.google.com/file/d/1Y6bQrXLwRZpWAiUoFA4gfJ-x-qMw9ug5/view?usp=sharing';
const INITIAL_LOGO_URL = 'https://drive.google.com/file/d/1SnT37ISkjfMT9Nff0WJK3y_O1D40HRFI/view?usp=sharing';
const INITIAL_BANNER_URL = 'https://drive.google.com/file/d/1wAHp_r0aMa743kUnzGN0uAVApl5RHmJh/view?usp=sharing'; 
const INITIAL_JUKNIS_URL = 'https://drive.google.com/file/d/1sfm9IZ8sddmHggeykXDhSEhorDMkeORO/view?usp=sharing';
const INITIAL_ADMIN_PASSWORD = 'admin123';

const INITIAL_CONTACT_INFO: ContactInfo = {
    address: 'Jl. Bromo No. 49 Genteng - Banyuwangi',
    phone1: '081 936 951 078 (Riski)',
    phone2: '082 337 446 950 (Luthfia)',
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
    
    const [registrationUrl, setRegistrationUrl] = useState<string>(savedState?.registrationUrl || INITIAL_REGISTRATION_URL);
    const [publicParticipantsUrl, setPublicParticipantsUrl] = useState<string>(savedState?.publicParticipantsUrl || INITIAL_PUBLIC_PARTICIPANTS_URL);
    const [brochureUrl, setBrochureUrl] = useState<string>(savedState?.brochureUrl || INITIAL_BROCHURE_URL);
    const [logoUrl, setLogoUrl] = useState<string>(savedState?.logoUrl || INITIAL_LOGO_URL);
    const [bannerUrl, setBannerUrl] = useState<string>(savedState?.bannerUrl || INITIAL_BANNER_URL);
    const [juknisUrl, setJuknisUrl] = useState<string>(savedState?.juknisUrl || INITIAL_JUKNIS_URL);
    
    const [adminPassword, setAdminPassword] = useState<string>(savedState?.adminPassword || INITIAL_ADMIN_PASSWORD);
    const [contactInfo, setContactInfo] = useState<ContactInfo>(savedState?.contactInfo || INITIAL_CONTACT_INFO);
    const [socialLinks, setSocialLinks] = useState<SocialLinks>(savedState?.socialLinks || INITIAL_SOCIAL_LINKS);
    
    const [tursoConfig, setTursoConfig] = useState<TursoConfig>(savedState?.tursoConfig || INITIAL_TURSO_CONFIG);
    const [isSyncing, setIsSyncing] = useState(false);

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

    useEffect(() => {
        const fetchRemoteData = async () => {
            if (tursoConfig.enabled && tursoConfig.dbUrl && tursoConfig.authToken) {
                const remoteData = await tursoService.loadData(tursoConfig.dbUrl, tursoConfig.authToken);
                if (remoteData) {
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
        fetchRemoteData();
    }, []);

    const syncToTurso = async (overrideData?: any): Promise<boolean> => {
        const config = overrideData?.tursoConfig || tursoConfig;
        if (!config.enabled || !config.dbUrl || !config.authToken) return false;

        setIsSyncing(true);
        try {
            const currentState = { 
                events, juknisList, faqs, 
                registrationUrl, publicParticipantsUrl, brochureUrl, logoUrl, bannerUrl, juknisUrl,
                adminPassword, contactInfo, socialLinks, tursoConfig,
                ...overrideData
            };
            await tursoService.saveData(config.dbUrl, config.authToken, JSON.stringify(currentState));
            setIsSyncing(false);
            return true;
        } catch (error) {
            console.error("Failed to sync to Turso", error);
            setIsSyncing(false);
            return false;
        }
    };

    const testTursoConnection = async (config: TursoConfig): Promise<boolean> => {
        if (!config.dbUrl || !config.authToken) return false;
        return await tursoService.testConnection(config.dbUrl, config.authToken);
    };

    const initializeTurso = async (config: TursoConfig): Promise<boolean> => {
        if (!config.dbUrl || !config.authToken) return false;
        try {
            await tursoService.initTable(config.dbUrl, config.authToken);
            return true;
        } catch (e) {
            console.error("Failed to init Turso table", e);
            return false;
        }
    };

    const resetData = () => {
        if (window.confirm("PERINGATAN: Apakah Anda yakin ingin mereset seluruh data sistem?")) {
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

    const updateEvent = (updatedEvent: EventData) => setEvents(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
    const addEvent = (newEvent: EventData) => setEvents(prev => [...prev, newEvent]);
    const deleteEvent = (id: string) => setEvents(prev => prev.filter(e => e.id !== id));

    const updateJuknis = (updatedJuknis: JuknisItem) => setJuknisList(prev => prev.map(j => j.id === updatedJuknis.id ? updatedJuknis : j));
    const addJuknis = (newJuknis: JuknisItem) => setJuknisList(prev => [...prev, newJuknis]);
    const deleteJuknis = (id: string) => setJuknisList(prev => prev.filter(j => j.id !== id));

    const updateFaq = (updatedFaq: FaqItem) => setFaqs(prev => prev.map(f => f.id === updatedFaq.id ? updatedFaq : f));
    const addFaq = (newFaq: FaqItem) => setFaqs(prev => [...prev, newFaq]);
    const deleteFaq = (id: string) => setFaqs(prev => prev.filter(f => f.id !== id));

    const updateRegistrationUrl = (url: string) => setRegistrationUrl(url);
    const updatePublicParticipantsUrl = (url: string) => setPublicParticipantsUrl(url);
    const updateBrochureUrl = (url: string) => setBrochureUrl(url);
    const updateLogoUrl = (url: string) => setLogoUrl(url);
    const updateBannerUrl = (url: string) => setBannerUrl(url);
    const updateJuknisUrl = (url: string) => setJuknisUrl(url);
    
    const updateAdminPassword = (password: string) => setAdminPassword(password);
    const updateContactInfo = (info: ContactInfo) => setContactInfo(info);
    const updateSocialLinks = (links: SocialLinks) => setSocialLinks(links);
    const updateTursoConfig = (config: TursoConfig) => setTursoConfig(config);

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
            registerParticipant, resetData, syncToTurso, testTursoConnection, initializeTurso, isSyncing
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) throw new Error('useData must be used within a DataProvider');
    return context;
};