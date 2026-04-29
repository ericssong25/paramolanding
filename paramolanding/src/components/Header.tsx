import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';
import { useI18n } from '../i18n';
import { FEATURES } from '../config';

// Componente para las banderas SVG
const FlagIcon = ({ country }: { country: 'es' | 'en' }) => {
  if (country === 'es') {
    return (
      <svg width="20" height="15" viewBox="0 0 20 15" className="inline-block">
        {/* Bandera de España - diseño mejorado */}
        <rect width="20" height="15" fill="#c60b1e"/>
        <rect width="20" height="5" y="5" fill="#ffc400"/>
        <rect width="20" height="5" y="10" fill="#c60b1e"/>
        
        {/* Escudo simplificado */}
        <rect x="7" y="4" width="6" height="7" fill="#ffc400"/>
        <rect x="7.5" y="4.5" width="5" height="6" fill="#c60b1e"/>
        <rect x="8" y="5" width="4" height="5" fill="#ffc400"/>
        
        {/* Corona simplificada */}
        <rect x="8.5" y="3.5" width="3" height="1" fill="#ffc400"/>
        <rect x="9" y="3" width="2" height="1" fill="#ffc400"/>
        <rect x="9.5" y="2.5" width="1" height="1" fill="#ffc400"/>
      </svg>
    );
  }
  return (
    <svg width="20" height="15" viewBox="0 0 20 15" className="inline-block">
      {/* Bandera de Estados Unidos - diseño correcto */}
      <rect width="20" height="15" fill="#fff"/>
      
      {/* Franjas rojas */}
      <rect width="20" height="1.15" y="0" fill="#B22234"/>
      <rect width="20" height="1.15" y="2.3" fill="#B22234"/>
      <rect width="20" height="1.15" y="4.6" fill="#B22234"/>
      <rect width="20" height="1.15" y="6.9" fill="#B22234"/>
      <rect width="20" height="1.15" y="9.2" fill="#B22234"/>
      <rect width="20" height="1.15" y="11.5" fill="#B22234"/>
      <rect width="20" height="1.15" y="13.8" fill="#B22234"/>
      
      {/* Union Jack (esquina superior izquierda) */}
      <rect width="8" height="6" fill="#3C3B6E"/>
      
      {/* Estrellas simplificadas */}
      <circle cx="2" cy="1.5" r="0.3" fill="#fff"/>
      <circle cx="4" cy="1.5" r="0.3" fill="#fff"/>
      <circle cx="6" cy="1.5" r="0.3" fill="#fff"/>
      <circle cx="1.5" cy="3" r="0.3" fill="#fff"/>
      <circle cx="3.5" cy="3" r="0.3" fill="#fff"/>
      <circle cx="5.5" cy="3" r="0.3" fill="#fff"/>
      <circle cx="2" cy="4.5" r="0.3" fill="#fff"/>
      <circle cx="4" cy="4.5" r="0.3" fill="#fff"/>
      <circle cx="6" cy="4.5" r="0.3" fill="#fff"/>
    </svg>
  );
};

const Header: React.FC = () => {
  const headerRef = useRef<HTMLHeaderElement>(null);
  const { t, lang, toggleLang } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power3.out" }
    );
  }, []);

  const navigation = [
    { name: t('header.nav.services'), href: '#services' },
    ...(FEATURES.portfolioEnabled ? [{ name: t('header.nav.portfolio'), href: '#portfolio' }] : []),
    { name: t('header.nav.team'), href: '#about' },
    { name: t('header.nav.faq'), href: '#faq' },
    { name: t('header.nav.contact'), href: '#contact' }
  ];

  return (
    <header 
      ref={headerRef} 
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-8">
            <img
              src="/logoheader.svg"
              alt="Páramo Creativo logo"
              className="h-8 w-8 rounded-md object-contain select-none"
              draggable={false}
            />
            
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-[#7546ed] transition-colors duration-300 font-medium cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(item.href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleLang}
                aria-label="Toggle language"
                className="px-3 py-2 rounded-full border border-gray-200 text-gray-700 hover:text-[#7546ed] hover:border-[#7546ed] transition-colors flex items-center gap-2"
              >
                <FlagIcon country={lang} />
                {t('header.lang')}
              </button>
              <a href="#contact" className="bg-[#7546ed] text-white px-6 py-2 rounded-full hover:bg-[#12173b] transition-all duration-300 transform hover:scale-105 font-medium">
                {t('header.cta')}
              </a>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#7546ed] transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-6 space-y-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-gray-700 hover:text-[#7546ed] transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleLang}
                aria-label="Toggle language"
                className="px-3 py-2 rounded-full border border-gray-200 text-gray-700 hover:text-[#7546ed] hover:border-[#7546ed] transition-colors w-full flex items-center justify-center gap-2"
              >
                <FlagIcon country={lang} />
                {t('header.lang')}
              </button>
              <a 
                href="#contact" 
                className="w-full bg-[#7546ed] text-white px-6 py-2 rounded-full hover:bg-[#12173b] transition-all duration-300 font-medium text-center block"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  const element = document.querySelector('#contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                {t('header.cta')}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;