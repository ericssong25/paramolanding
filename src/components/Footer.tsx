import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Instagram } from 'lucide-react';
import { useI18n } from '../i18n';

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useI18n();

  useEffect(() => {
    gsap.fromTo(contentRef.current!.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/paramo.creativo/', name: 'Instagram' }
  ];

  const services = [
    'marketing digital',
    'diseño gráfico',
    'edición de video',
    'desarrollo web',
    'aplicaciones móviles',
    'aplicaciones de escritorio'
  ];

  return (
    <footer id="contact" ref={footerRef} className="bg-[#12173b] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={contentRef}>
          {/* Main footer content */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12">
            {/* Información de la empresa */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold font-creato mb-4">Páramo Creativo</h3>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md font-garet">
                {t('footer.company.about')}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#dc89ff]" />
                  <span className="text-gray-300">contact@agenciaparamo.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#dc89ff]" />
                  <span className="text-gray-300">+56 9 5984 3111</span>
                </div>
                
              </div>
            </div>

            {/* Servicios */}
            <div>
              <h4 className="text-lg font-semibold mb-6">{t('footer.services')}</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <a 
                      href="#services" 
                      className="text-gray-300 hover:text-[#dc89ff] transition-colors"
                    >
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enlaces rápidos y CTA */}
            <div>
              <h4 className="text-lg font-semibold mb-6">{t('footer.getStarted')}</h4>
              <p className="text-gray-300 mb-6">{lang === 'es' ? '¿Listo para elevar tu presencia digital?' : 'Ready to elevate your digital presence?'}</p>
              <a href="#contact" className="w-full bg-gradient-to-r from-[#7546ed] to-[#dc89ff] text-white px-6 py-3 rounded-full hover:from-[#dc89ff] hover:to-[#7546ed] transition-all duration-300 transform hover:scale-105 font-medium text-center block">
                {t('footer.cta')}
              </a>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-gray-400 text-sm">© 2023 Páramo Creativo. {lang === 'es' ? t('footer.rights.es') : t('footer.rights.en')}</div>
              
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#7546ed] transition-colors duration-300 group"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5 text-gray-300 group-hover:text-white" />
                  </a>
                ))}
              </div>

              <div className="flex gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-[#dc89ff] transition-colors">{t('footer.privacy')}</a>
                <a href="#" className="hover:text-[#dc89ff] transition-colors">{t('footer.terms')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;