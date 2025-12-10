import React, { useState, useEffect } from 'react';
import { Menu, X, Award } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useData } from '../contexts/DataContext';

interface NavbarProps {
  onRegisterClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onRegisterClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { logoUrl } = useData();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getGoogleDriveImageUrl = (url: string) => {
    if (!url) return '';
    const fileIdMatch = url.match(/\/d\/([^/]+)/) || url.match(/id=([^&]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
        return `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}&sz=w200`;
    }
    return url;
  };
  
  const displayLogoUrl = getGoogleDriveImageUrl(logoUrl);

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Kategori Lomba', href: '/categories' },
    { name: 'Daftar Peserta', href: '/participants' },
    { name: 'Informasi Juknis', href: '/juknis' },
    { name: 'FAQ', href: '/faq' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-white/50 backdrop-blur-sm py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {displayLogoUrl ? (
                <img 
                    src={displayLogoUrl} 
                    alt="SGC Logo" 
                    className="h-10 w-auto object-contain rounded-md"
                    referrerPolicy="no-referrer"
                />
            ) : (
                <div className="bg-primary-600 p-2 rounded-lg text-white">
                    <Award size={24} strokeWidth={2.5} />
                </div>
            )}
            <span className="text-2xl font-bold tracking-tight text-primary-900">
              SGC <span className="text-primary-600">2026</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`${isActive(link.href) ? 'text-primary-600 font-bold' : 'text-slate-600 hover:text-primary-600 font-medium'} transition-colors text-sm uppercase tracking-wider`}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={onRegisterClick}
              className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-primary-500/30 text-sm"
            >
              Daftar Sekarang
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-primary-600 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-xl absolute w-full border-t border-slate-100">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md font-medium ${isActive(link.href) ? 'bg-primary-50 text-primary-600' : 'text-slate-600 hover:text-primary-600 hover:bg-primary-50'}`}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                onRegisterClick();
              }}
              className="w-full text-center bg-primary-600 text-white px-3 py-3 rounded-lg font-semibold shadow-md mt-4"
            >
              Daftar Sekarang
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;