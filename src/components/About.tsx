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
  image: string;
};

const team: TeamMember[] = [
  {
    name: 'Gabriel Delgado',
    role: 'Project manager',
    bio: '',
    gradient: 'from-[#7546ed] to-[#dc89ff]',
    initials: 'GD',
    Icon: Briefcase,
    image: '/images/team/gabo.webp',
  },
  {
    name: 'Gabriela Delgado',
    role: 'Graphic designer',
    bio: '',
    gradient: 'from-[#dc89ff] to-[#b1a9e5]',
    initials: 'GA',
    Icon: Palette,
    image: '/images/team/gaby.webp',
  },
  {
    name: 'Ericsson Giannangeli',
    role: 'Developer',
    bio: '',
    gradient: 'from-[#12173b] to-[#7546ed]',
    initials: 'EG',
    Icon: Code2,
    image: '/images/team/eric.webp',
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

        <div ref={cardsRef} className="grid gap-8 md:grid-cols-3 items-stretch">
          {team.map(({ name, role, bio, gradient, initials, Icon, image }) => (
            <article
              key={name}
              className="group relative rounded-3xl p-[3px] bg-gradient-to-br from-[#7546ed]/40 via-[#dc89ff]/30 to-[#b1a9e5]/50 hover:from-[#7546ed]/80 hover:via-[#dc89ff]/60 hover:to-[#b1a9e5]/70 transition-all duration-500 h-full shadow-lg hover:shadow-2xl"
            >
              <div className="relative rounded-[calc(1.5rem-3px)] bg-gradient-to-br from-white via-gray-50 to-white p-6 overflow-hidden shadow-sm group-hover:shadow-2xl transition-all duration-500 h-full flex flex-col justify-start gap-5 min-h-[320px]">
                {/* decorative glow principal */}
                <div className={`pointer-events-none absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20 bg-gradient-to-br ${gradient} group-hover:opacity-40 transition-opacity duration-500`} />
                {/* decorative glow secundario */}
                <div className={`pointer-events-none absolute -top-8 -left-8 w-32 h-32 rounded-full blur-2xl opacity-15 bg-gradient-to-br ${gradient} group-hover:opacity-30 transition-opacity duration-500`} />
                {/* Partículas flotantes decorativas */}
                <div className="pointer-events-none absolute top-4 right-4 w-2 h-2 rounded-full bg-[#7546ed]/30 group-hover:bg-[#7546ed]/50 transition-all duration-500"></div>
                <div className="pointer-events-none absolute bottom-6 left-6 w-1.5 h-1.5 rounded-full bg-[#dc89ff]/40 group-hover:bg-[#dc89ff]/60 transition-all duration-500 delay-100"></div>
                <div className="pointer-events-none absolute top-1/2 right-6 w-1 h-1 rounded-full bg-[#b1a9e5]/35 group-hover:bg-[#b1a9e5]/55 transition-all duration-500 delay-200"></div>

                {/* header vertical centrado */}
                <div className="flex flex-col items-center text-center mb-4">
                  {/* avatar grande */}
                  <div className="relative mb-4">
                    <div className={`w-36 h-36 rounded-3xl bg-gradient-to-br ${gradient} p-[4px] overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-500 animate-float group-hover:animate-gentle-pulse`}> 
                      <div className="w-full h-full rounded-[1.75rem] bg-transparent relative overflow-hidden">
                        <img 
                          src={image} 
                          alt={`${name} - ${role}`}
                          className="w-full h-full object-cover rounded-[1.75rem] bg-white shadow-sm transition-transform duration-300 group-hover:scale-110"
                          style={{
                            filter: 'contrast(1.1) brightness(1.05)',
                            backdropFilter: 'blur(0px)'
                          }}
                          onError={(e) => {
                            // Fallback a JPG si WebP falla
                            const target = e.target as HTMLImageElement;
                            if (target.src.endsWith('.webp')) {
                              target.src = target.src.replace('.webp', '.jpg');
                            } else {
                              // Fallback a placeholder con iniciales
                              target.style.display = 'none';
                              target.nextElementSibling?.classList.remove('hidden');
                            }
                          }}
                        />
                        {/* Overlay sutil para mejorar contraste */}
                        <div className="absolute inset-0 rounded-[1.75rem] bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
                        {/* Borde interno sutil */}
                        <div className="absolute inset-0 rounded-[1.75rem] ring-1 ring-white/60 pointer-events-none"></div>
                        {/* Fallback con iniciales si la imagen falla */}
                        <div className="absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-white via-gray-50 to-white flex items-center justify-center hidden">
                          <span className="font-creato font-bold text-3xl text-gray-600">{initials}</span>
                        </div>
                      </div>
                    </div>
                    {/* Efecto de brillo en el borde */}
                    <div className="absolute inset-0 rounded-3xl ring-1 ring-black/5 group-hover:ring-2 group-hover:ring-[#7546ed]/20 transition-all duration-500" />
                  </div>
                  <h3 className="text-2xl font-creato font-bold leading-tight group-hover:text-[#7546ed] transition-all duration-500 group-hover:scale-105">{name}</h3>
                  <div className="mt-1 inline-flex items-center justify-center gap-2 text-[#7546ed] font-medium group-hover:scale-105 transition-all duration-500">
                    <Icon className="w-4 h-4 group-hover:rotate-12 transition-transform duration-500" />
                    <span>
                      {name === 'Gabriel Delgado'
                        ? t('about.role.pm')
                        : name === 'Gabriela Delgado'
                        ? t('about.role.designer')
                        : t('about.role.dev')}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 font-garet leading-relaxed mt-2 text-center">
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


