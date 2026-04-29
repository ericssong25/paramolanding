import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useI18n } from '../i18n';

const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  useEffect(() => {
    gsap.fromTo(contentRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const benefits: string[] = [];

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-[#12173b] via-[#7546ed] to-[#dc89ff] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div ref={contentRef}>
          <h2 className="text-4xl md:text-5xl font-bold font-creato mb-6">{t('cta.title')}</h2>
          
          <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto leading-relaxed">{t('cta.subtitle')}</p>

          {benefits.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 text-left">
                  <CheckCircle className="w-5 h-5 text-[#dc89ff] flex-shrink-0" />
                  <span className="opacity-90">{benefit}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="group bg-white text-[#12173b] px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
              {t('cta.primary')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a href="#contact" className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-[#12173b] transition-all duración-300">
              {t('cta.secondary')}
            </a>
          </div>

          <p className="text-sm opacity-75 mt-6">{t('cta.note')}</p>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#dc89ff]/20 rounded-full"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#b1a9e5]/10 rounded-full"></div>
    </section>
  );
};

export default CTASection;