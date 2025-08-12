import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';
import { useI18n } from '../i18n';
import { FEATURES } from '../config';

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
          <div className="flex items-center gap-3">
            <img
              src="/logoheader.svg"
              alt="Páramo Creativo logo"
              className="h-8 w-8 rounded-md object-contain select-none"
              draggable={false}
            />
            <h1 className="text-2xl font-bold text-[#12173b] font-creato">{t('header.brand')}</h1>
          </div>
          
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

          <div className="hidden md:block">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleLang}
                aria-label="Toggle language"
                className="px-3 py-2 rounded-full border border-gray-200 text-gray-700 hover:text-[#7546ed] hover:border-[#7546ed] transition-colors"
              >
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
                className="px-3 py-2 rounded-full border border-gray-200 text-gray-700 hover:text-[#7546ed] hover:border-[#7546ed] transition-colors w-full"
              >
                {t('header.lang')}
              </button>
              <button className="w-full bg-[#7546ed] text-white px-6 py-2 rounded-full hover:bg-[#12173b] transition-all duration-300 font-medium">
                {t('header.cta')}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;