import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ExternalLink, ArrowUpRight, Eye } from 'lucide-react';
import { useI18n } from '../i18n';

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

  // filtros eliminados

  const projects = [
    {
      category: "Marketing",
      title: "Revolución digital TechCorp",
      description: "Transformación de marca con un aumento del 400% en engagement",
      image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "from-[#7546ed] to-[#dc89ff]",
      stats: "+400% engagement",
      featured: true
    },
    {
      category: "Desarrollo",
      title: "Potencia e‑commerce",
      description: "Experiencia de compra de próxima generación con recomendaciones por IA",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "from-[#12173b] to-[#7546ed]",
      stats: "2M+ usuarios",
      featured: true
    },
    {
      category: "Diseño",
      title: "Identidad de marca de lujo",
      description: "Sistema visual sofisticado para mercado premium",
      image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "from-[#dc89ff] to-[#b1a9e5]",
      stats: "premio ganador",
      featured: false
    },
    {
      category: "Video",
      title: "Narrativa corporativa",
      description: "Videos de marca cinematográficos que cautivan audiencias",
      image: "https://images.pexels.com/photos/3205738/pexels-photo-3205738.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "from-[#b1a9e5] to-[#7546ed]",
      stats: "10M+ vistas",
      featured: false
    },
    {
      category: "Desarrollo",
      title: "App móvil fintech",
      description: "Aplicación bancaria segura con autenticación biométrica",
      image: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "from-[#032c7d] to-[#12173b]",
      stats: "seguridad bancaria",
      featured: false
    },
    {
      category: "Marketing",
      title: "Lanzamiento de campaña viral",
      description: "Estrategia en redes sociales que rompió internet",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "from-[#7546ed] to-[#032c7d]",
      stats: "50M+ alcance",
      featured: false
    }
  ];

  const allProjects = projects;

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    
    // Animate filter change
    gsap.to(projectsRef.current!.children, {
      opacity: 0,
      y: 30,
      duration: 0.3,
      stagger: 0.05,
      onComplete: () => {
        gsap.fromTo(projectsRef.current!.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
        );
      }
    });
  };

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
          {allProjects.map((project, index) => (
            <div
              key={project.title}
              className={`group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2`}
            >
              <div className={`relative overflow-hidden h-64`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-90 transition-opacity duration-500 flex items-center justify-center`}>
                  <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <ExternalLink className="w-12 h-12 mx-auto mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200" />
                     <p className="text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
                      {t('portfolio.viewProject')}
                    </p>
                  </div>
                </div>

                {/* Stats Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#12173b] px-3 py-1 rounded-full text-sm font-semibold">
                  {project.stats}
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-[#dc89ff] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                )}
              </div>

              <div className="p-8">
                 <div className="text-sm text-[#7546ed] font-medium mb-3 uppercase tracking-wider">
                  {project.category}
                </div>
                <h3 className="text-2xl font-bold text-[#12173b] mb-4 group-hover:text-[#7546ed] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {project.description}
                </p>
                 <button className="flex items-center gap-2 text-[#7546ed] font-semibold hover:text-[#12173b] transition-colors group-hover:gap-3 duration-300">
                  {t('portfolio.caseStudy')}
                  <ArrowUpRight className="w-5 h-5 transform group-hover:rotate-45 transition-transform duration-300" />
                </button>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#7546ed]/30 rounded-3xl transition-colors duration-500"></div>
            </div>
          ))}
        </div>

        {/* CTA Section removed per request */}
      </div>
    </section>
  );
};

export default Portfolio;