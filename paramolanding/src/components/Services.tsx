import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Megaphone, Palette, Code2, Video, Smartphone, BarChart3 } from 'lucide-react';
import { useI18n } from '../i18n';


type ServiceItem = {
  icon: React.ComponentType<{ className?: string }>;
  titleKey: string;
  descKey: string;
  href?: string;
};

const baseServices: ServiceItem[] = [
  {
    icon: Megaphone,
    titleKey: 'services.item.marketing.title',
    descKey: 'services.item.marketing.desc',
    href: '#contact',
  },
  {
    icon: Palette,
    titleKey: 'services.item.design.title',
    descKey: 'services.item.design.desc',
    href: '#contact',
  },
  {
    icon: Code2,
    titleKey: 'services.item.web.title',
    descKey: 'services.item.web.desc',
    href: '#contact',
  },
  {
    icon: Video,
    titleKey: 'services.item.video.title',
    descKey: 'services.item.video.desc',
    href: '#contact',
  },
  {
    icon: Smartphone,
    titleKey: 'services.item.mobile.title',
    descKey: 'services.item.mobile.desc',
    href: '#contact',
  },
  {
    icon: BarChart3,
    titleKey: 'services.item.analytics.title',
    descKey: 'services.item.analytics.desc',
    href: '#contact',
  }
];

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  useEffect(() => {
    const animateIn = () => {
      const elements: Element[] = [];
      if (titleRef.current) elements.push(titleRef.current);
      if (gridRef.current) elements.push(...Array.from(gridRef.current.children));
      gsap.fromTo(
        elements,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out', stagger: 0.05 }
      );
    };

    const section = sectionRef.current;
    if (!section) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            animateIn();
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(section);
      return () => observer.disconnect();
    }

    // Fallback
    animateIn();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#7546ed]/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#dc89ff]/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#7546ed]/10 text-[#7546ed] px-4 py-2 rounded-full text-sm font-medium mb-6">
            {t('services.badge')}
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-[#12173b] font-creato">
            {t('services.title.line1')}
            <span className="block text-[#7546ed]">{t('services.title.line2')}</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mt-6 leading-relaxed font-garet">
            {t('services.subtitle')}
          </p>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {baseServices.map((service, idx) => {
            const title = (t as any)(service.titleKey);
            const desc = (t as any)(service.descKey);
            const titleId = `service-title-${idx}`;
            const descId = `service-desc-${idx}`;
            return (
              <a
                key={service.titleKey}
                href={service.href ?? '#contact'}
                aria-labelledby={titleId}
                aria-describedby={descId}
                className="group block relative bg-gradient-to-br from-[#4f1edc] via-[#6a3fe0] to-[#dc89ff] rounded-[2rem] border-2 border-b-0 border-white/30 shadow-xl hover:shadow-2xl transition-all duration-700 overflow-hidden transform hover:scale-105 hover:-translate-y-2 min-h-[20rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 flex flex-col"
              >
                {/* Geometric accent */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-all duration-700" />
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-white/5 rounded-full blur-lg group-hover:bg-white/15 transition-all duration-700" />

                <div className="relative p-8 flex-1">
                  {/* Icon container with unique shape */}
                  <div className="relative">
                    <div className="w-16 h-16 bg-white/15 backdrop-blur-md text-white flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-700 transform group-hover:scale-110 group-hover:rotate-12 border border-white/40 rounded-2xl">
                      <service.icon className="w-7 h-7" />
                    </div>
                    {/* Floating accent */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white/20 rounded-full blur-sm group-hover:bg-white/30 transition-all duration-700" />
                  </div>

                  <h3 id={titleId} className="mt-8 text-2xl font-bold text-white group-hover:text-white/90 transition-colors duration-700">
                    {title}
                  </h3>
                  <p id={descId} className="mt-4 text-white/80 leading-relaxed group-hover:text-white transition-colors duration-700">
                    {desc}
                  </p>

                </div>

                {/* CTA aligned to bottom */}
                <div className="mt-auto inline-flex items-center justify-center gap-3 text-white font-semibold group-hover:text-white/90 transition-colors duration-700 bg-white/5 group-hover:bg-white/10 backdrop-blur-sm py-4 rounded-b-[2rem] border-t border-white/20 group-hover:border-white/40">
                  {t('services.learnMore')}
                  <span className="transition-transform group-hover:scale-110 duration-700 ml-1">→</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
