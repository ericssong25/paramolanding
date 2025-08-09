import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Briefcase, Palette, Code2 } from 'lucide-react';
import { useI18n } from '../i18n';

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  gradient: string;
  initials: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const team: TeamMember[] = [
  {
    name: 'Gabriel Delgado',
    role: 'Project manager',
    bio: '',
    gradient: 'from-[#7546ed] to-[#dc89ff]',
    initials: 'GD',
    Icon: Briefcase,
  },
  {
    name: 'Gabriela Delgado',
    role: 'Graphic designer',
    bio: '',
    gradient: 'from-[#12173b] to-[#7546ed]',
    initials: 'GA',
    Icon: Palette,
  },
  {
    name: 'Ericsson Giannangeli',
    role: 'Developer',
    bio: '',
    gradient: 'from-[#dc89ff] to-[#b1a9e5]',
    initials: 'EG',
    Icon: Code2,
  },
];

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  useEffect(() => {
    const elements: Element[] = [];
    if (sectionRef.current) elements.push(sectionRef.current.querySelector('[data-title]') as Element);
    if (cardsRef.current) elements.push(...Array.from(cardsRef.current.children));

    gsap.fromTo(
      elements,
      { opacity: 0, y: 28, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out', stagger: 0.07 }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-28 bg-gray-50 text-[#12173b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-title className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-creato font-bold mb-4">{t('about.title')}</h2>
          <p className="text-lg text-gray-600 font-garet max-w-3xl mx-auto">{t('about.subtitle')}</p>
        </div>

        <div ref={cardsRef} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {team.map(({ name, role, bio, gradient, initials, Icon }) => (
            <article
              key={name}
              className="group relative rounded-3xl p-[2px] bg-gradient-to-br from-[#7546ed]/60 to-[#dc89ff]/60 hover:from-[#7546ed] hover:to-[#dc89ff] transition-all duration-300 h-full"
            >
              <div className="relative rounded-[calc(1.5rem-2px)] bg-white p-8 overflow-hidden shadow-sm group-hover:shadow-2xl transition-shadow h-full flex flex-col justify-start gap-5 min-h-[240px]">
                {/* decorative glow */}
                <div className={`pointer-events-none absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-30 bg-gradient-to-br ${gradient}`} />

                {/* header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    {/* avatar placeholder */}
                    <div className="relative">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} p-[2px]`}> 
                        <div className="w-full h-full rounded-[1rem] bg-white flex items-center justify-center">
                          <span className="font-creato font-bold text-lg text-[#12173b]">{initials}</span>
                        </div>
                      </div>
                      {/* subtle ring */}
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-creato font-bold leading-tight group-hover:text-[#7546ed] transition-colors">{name}</h3>
                      <div className="mt-1 inline-flex items-center gap-2 text-[#7546ed] font-medium">
                        <Icon className="w-4 h-4" />
                        <span>{role}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 font-garet leading-relaxed mt-auto">
                  {name === 'Gabriel Delgado'
                    ? t('about.bio.pm')
                    : name === 'Gabriela Delgado'
                    ? t('about.bio.designer')
                    : t('about.bio.dev')}
                </p>

                {/* hover lift */}
                <div className="absolute inset-0 rounded-[calc(1.5rem-2px)] transition-transform duration-300 group-hover:-translate-y-1" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;


