import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Megaphone, Palette, Code2, Video, Smartphone, BarChart3 } from 'lucide-react';
import { useI18n } from '../i18n';


type ServiceItem = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

const baseServices: ServiceItem[] = [
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Campaigns that drive traffic, engagement, and measurable growth.'
  },
  {
    icon: Palette,
    title: 'Brand & Design',
    description: 'Elegant visual systems and identities that resonate with audiences.'
  },
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Fast, accessible, and scalable web apps built with modern tech.'
  },
  {
    icon: Video,
    title: 'Video Production',
    description: 'Cinematic storytelling that elevates your brand presence.'
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Delightful iOS and Android experiences focused on usability.'
  },
  {
    icon: BarChart3,
    title: 'Analytics & SEO',
    description: 'Data-driven insights and optimization to scale what works.'
  }
];

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useI18n();

  useEffect(() => {
    const elements: Element[] = [];
    if (titleRef.current) elements.push(titleRef.current);
    if (gridRef.current) elements.push(...Array.from(gridRef.current.children));

    gsap.fromTo(
      elements,
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out', stagger: 0.05 }
    );
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
            const titleKeys = [
              'services.item.marketing.title',
              'services.item.design.title',
              'services.item.web.title',
              'services.item.video.title',
              'services.item.mobile.title',
              'services.item.analytics.title',
            ] as const;
            const descKeys = [
              'services.item.marketing.desc',
              'services.item.design.desc',
              'services.item.web.desc',
              'services.item.video.desc',
              'services.item.mobile.desc',
              'services.item.analytics.desc',
            ] as const;
            const title = (t as any)(titleKeys[idx]);
            const desc = (t as any)(descKeys[idx]);
            return (
            <div
              key={service.title}
              className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#7546ed]/5 to-[#dc89ff]/10" />

              <div className="p-8 relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7546ed] to-[#dc89ff] text-white flex items-center justify-center shadow-lg shadow-[#7546ed]/20">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-[#12173b] group-hover:text-[#7546ed] transition-colors">
                  {title}
                </h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  {desc}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 text-[#7546ed] font-semibold">
                  {t('services.learnMore')}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
