import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight, Eye } from 'lucide-react';
import { useI18n } from '../i18n';
import { WORK } from '../data/work';

const Portfolio: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  useEffect(() => {
    const elements: Element[] = [];

    if (titleRef.current) elements.push(titleRef.current);
    if (projectsRef.current) elements.push(...Array.from(projectsRef.current.children));

    // simple fade-in + scale-up on first reveal, without delays or scroll triggers
    gsap.fromTo(elements,
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out', stagger: 0.04 }
    );
  }, []);

  const allProjects = WORK;

  return (
    <section id="portfolio" ref={sectionRef} className="py-32 bg-gradient-to-br from-[#0f122b] via-[#13183e] to-[#1b1f4a] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Eye className="w-4 h-4" />
            {t('portfolio.badge')}
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white font-creato mb-6">
            {t('portfolio.title.line1')}
            <span className="block text-[#7546ed]">{t('portfolio.title.line2')}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-garet">
            {t('portfolio.subtitle')}
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={projectsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.map((project) => {
            const href = `/work/${project.slug}`;
            return (
              <a
                key={project.title}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, '', href);
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                className="group block relative rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7546ed]/40"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full object-cover aspect-[4/3] group-hover:scale-[1.02] transition-transform duration-500"
                  />

                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/90 border border-gray-200 text-[#12173b]">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#12173b] font-creato group-hover:text-[#7546ed] transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>

                <div className="absolute inset-0 rounded-3xl ring-1 ring-transparent group-hover:ring-[#7546ed]/15 transition-colors duration-300" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;