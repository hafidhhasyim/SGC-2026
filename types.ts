import { LucideIcon } from 'lucide-react';

export enum Category {
  ACADEMIC = 'Akademik',
  CREATIVE = 'Kreatif',
}

export interface EventData {
  id: string;
  title: string;
  description: string;
  category: Category;
  date: string;
  time: string;
  location: string;
  fee: string;
  iconName: 'BookOpen' | 'Calculator' | 'Globe' | 'Palette' | 'Pencil';
  details: string[];
}

export interface JuknisItem {
    id: string;
    title: string;
    description: string;
    downloadUrl: string;
}

export interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

export interface RegistrationFormData {
  fullName: string;
  schoolOrigin: string;
  grade: string;
  parentName: string;
  whatsappNumber: string;
  selectedEvent: string;
  paymentProof: File | null;
}

export interface Participant {
  id: string;
  fullName: string;
  schoolOrigin: string;
  grade: string;
  parentName: string;
  whatsappNumber: string;
  selectedEvent: string;
  status: 'pending' | 'verified' | 'rejected';
  registrationDate: string;
  hasPaymentProof: boolean;
}

export interface ContactInfo {
    address: string;
    phone1: string;
    phone2: string;
    email: string;
}

export interface SocialLinks {
    instagram: string;
    facebook: string;
}

export interface DataContextType {
    events: EventData[];
    juknisList: JuknisItem[];
    faqs: FaqItem[];
    participants: Participant[];
    
    // Configurable URLs
    registrationUrl: string;
    publicParticipantsUrl: string;
    brochureUrl: string;
    logoUrl: string;
    bannerUrl: string;

    // Settings
    adminPassword: string;
    contactInfo: ContactInfo;
    socialLinks: SocialLinks;
    
    // CRUD Actions
    updateEvent: (event: EventData) => void;
    addEvent: (event: EventData) => void;
    deleteEvent: (id: string) => void;
    
    updateJuknis: (juknis: JuknisItem) => void;
    addJuknis: (juknis: JuknisItem) => void;
    deleteJuknis: (id: string) => void;
    
    updateFaq: (faq: FaqItem) => void;
    addFaq: (faq: FaqItem) => void;
    deleteFaq: (id: string) => void;

    registerParticipant: (data: RegistrationFormData) => void;
    updateParticipantStatus: (id: string, status: 'pending' | 'verified' | 'rejected') => void;

    updateRegistrationUrl: (url: string) => void;
    updatePublicParticipantsUrl: (url: string) => void;
    updateBrochureUrl: (url: string) => void;
    updateLogoUrl: (url: string) => void;
    updateBannerUrl: (url: string) => void;
    
    updateAdminPassword: (password: string) => void;
    updateContactInfo: (info: ContactInfo) => void;
    updateSocialLinks: (links: SocialLinks) => void;

    resetData: () => void;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  isError?: boolean;
}