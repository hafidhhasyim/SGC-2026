import React from 'react';
import { Award, Mail, Phone, MapPin, Instagram, Facebook, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';

const Footer: React.FC = () => {
  const { contactInfo, socialLinks, logoUrl } = useData();

  const preventDefault = (e: React.MouseEvent) => {
    // If href is #, prevent default
    if (e.currentTarget.getAttribute('href') === '#') {
        e.preventDefault();
    }
  };

  const getGoogleDriveImageUrl = (url: string) => {
    if (!url) return '';
    const fileIdMatch = url.match(/\/d\/([^/]+)/) || url.match(/id=([^&]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
        return `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}&sz=w200`;
    }
    return url;
  };

  const displayLogoUrl = getGoogleDriveImageUrl(logoUrl);

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
                {displayLogoUrl ? (
                    <img 
                        src={displayLogoUrl} 
                        alt="SGC Logo" 
                        className="h-10 w-auto object-contain rounded-md bg-white/10 p-1" 
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <div className="bg-primary-600 p-2 rounded-lg text-white">
                        <Award size={24} />
                    </div>
                )}
                <span className="text-2xl font-bold tracking-tight">
                SGC <span className="text-primary-500">2026</span>
                </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Platform resmi kompetisi Spensa Gemilang. Wadah bagi siswa berprestasi untuk mengasah kemampuan akademik dan kreativitas.
            </p>
            <div className="flex space-x-4">
              <a 
                href={socialLinks.instagram || '#'} 
                target={socialLinks.instagram !== '#' ? "_blank" : "_self"}
                rel="noopener noreferrer"
                onClick={preventDefault} 
                className="text-slate-400 hover:text-white transition-colors"
              >
                  <Instagram size={20} />
              </a>
              <a 
                href={socialLinks.facebook || '#'} 
                target={socialLinks.facebook !== '#' ? "_blank" : "_self"}
                rel="noopener noreferrer"
                onClick={preventDefault} 
                className="text-slate-400 hover:text-white transition-colors"
              >
                  <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-primary-100">Kategori Lomba</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/categories" className="hover:text-primary-400 transition-colors">Tryout TKA + IPAS</Link></li>
              <li><Link to="/categories" className="hover:text-primary-400 transition-colors">Olimpiade MIPA</Link></li>
              <li><Link to="/categories" className="hover:text-primary-400 transition-colors">Olimpiade Bahasa Inggris</Link></li>
              <li><Link to="/categories" className="hover:text-primary-400 transition-colors">Gambar Bercerita</Link></li>
              <li><Link to="/categories" className="hover:text-primary-400 transition-colors">Lomba Mewarnai</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-primary-100">Tautan Penting</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/participants" className="hover:text-primary-400 transition-colors">Daftar Peserta</Link></li>
              <li><Link to="/juknis" className="hover:text-primary-400 transition-colors">Download Juknis</Link></li>
              <li><Link to="/faq" className="hover:text-primary-400 transition-colors">Pertanyaan Umum (FAQ)</Link></li>
              <li><a href="#" onClick={preventDefault} className="hover:text-primary-400 transition-colors">Galeri Kegiatan</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-primary-100">Kontak Panitia</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-primary-500 shrink-0" />
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary-500 shrink-0" />
                <span>{contactInfo.phone1}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary-500 shrink-0" />
                <span>{contactInfo.phone2}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary-500 shrink-0" />
                <span>{contactInfo.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; 2026 Spensa Gemilang Competition. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="#" onClick={preventDefault} className="hover:text-white">Privacy Policy</a>
            <a href="#" onClick={preventDefault} className="hover:text-white">Terms of Service</a>
            <Link to="/admin" className="flex items-center gap-1 hover:text-white transition-colors" title="Admin Login">
                <Lock size={12} />
                <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
