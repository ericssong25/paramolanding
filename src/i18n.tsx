import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Language = 'es' | 'en';

type Translations = Record<string, Record<Language, string>>;

const translations: Translations = {
  // Header
  // La marca no se traduce: permanece igual en ambos idiomas
  'header.brand': { es: 'Páramo Creativo', en: 'Páramo Creativo' },
  'header.nav.services': { es: 'Servicios', en: 'Services' },
  'header.nav.portfolio': { es: 'Portafolio', en: 'Portfolio' },
  'header.nav.about': { es: 'Acerca de', en: 'About us' },
  'header.nav.contact': { es: 'Contacto', en: 'Contact' },
  'header.nav.faq': { es: 'FAQ', en: 'FAQ' },
  'header.nav.team': { es: 'Equipo', en: 'Team' },
  'header.cta': { es: 'Comenzar', en: 'Get started' },
  'header.lang': { es: 'ES', en: 'EN' },

  // Hero
  'hero.title.prefix': { es: 'No es solo', en: "It's not just" },
  'hero.subtitle': {
    es: 'En <span class="font-creato text-[#dc89ff] underline decoration-[#dc89ff]/40 underline-offset-4">Páramo Creativo</span>, creamos experiencias digitales extraordinarias que transforman marcas, cautivan audiencias y potencian el crecimiento mediante innovación estratégica y excelencia creativa.',
    en: 'At <span class="font-creato text-[#dc89ff] underline decoration-[#dc89ff]/40 underline-offset-4">Páramo Creativo</span>, we craft extraordinary digital experiences that transform brands, captivate audiences, and drive growth through strategic innovation and creative excellence.',
  },
  'hero.ctaPrimary': { es: 'Comienza tu proyecto', en: 'Start your project' },
  'hero.scroll': { es: 'desplázate para explorar', en: 'scroll to explore' },
  'hero.metrics.projects': { es: 'Proyectos entregados', en: 'Projects delivered' },
  'hero.metrics.satisfaction': { es: 'Satisfacción de clientes', en: 'Client satisfaction' },
  'hero.metrics.experience': { es: 'Años de experiencia', en: 'Years of experience' },

  // Services
  'services.badge': { es: 'Nuestro expertise', en: 'Our expertise' },
  'services.title.line1': { es: 'Servicios que', en: 'Services that' },
  'services.title.line2': { es: 'generan impacto', en: 'deliver impact' },
  'services.subtitle': {
    es: 'Un equipo full‑stack para diseñar, construir y hacer crecer tus productos digitales y tu marca.',
    en: 'A full‑stack team to design, build, and grow your digital products and brand.',
  },
  'services.learnMore': { es: 'saber más', en: 'learn more' },
  'services.item.marketing.title': { es: 'Marketing digital', en: 'Digital marketing' },
  'services.item.marketing.desc': { es: 'Marketing digital y performance: SEO/SEM, redes sociales y email marketing para aumentar tráfico cualificado, engagement y conversiones.', en: 'Digital marketing and performance: SEO/SEM, social media and email marketing to grow qualified traffic, engagement and conversions.' },
  'services.item.design.title': { es: 'Marca y diseño', en: 'Brand & design' },
  'services.item.design.desc': { es: 'Branding y diseño gráfico: identidades visuales, logotipos y guías de estilo consistentes que fortalecen tu marca.', en: 'Branding and graphic design: visual identities, logos and brand guidelines that strengthen your brand.' },
  'services.item.web.title': { es: 'Desarrollo web', en: 'Web development' },
  'services.item.web.desc': { es: 'Desarrollo web y sitios: páginas web, landing pages y aplicaciones rápidas, accesibles y escalables.', en: 'Web development and websites: websites, landing pages and apps that are fast, accessible and scalable.' },
  'services.item.video.title': { es: 'Edición de videos', en: 'Video editing' },
  'services.item.video.desc': { es: 'Edición de videos profesional: montaje y corrección de color para anuncios, redes sociales y sitios web.', en: 'Professional video editing: editing and color grading for ads, social media and websites.' },
  'services.item.mobile.title': { es: 'Apps móviles', en: 'Mobile apps' },
  'services.item.mobile.desc': { es: 'Desarrollo de apps móviles: iOS y Android con UX/UI optimizada y rendimiento nativo.', en: 'Mobile app development: iOS and Android with optimized UX/UI and near‑native performance.' },
  'services.item.analytics.title': { es: 'Analytics y SEO', en: 'Analytics & SEO' },
  'services.item.analytics.desc': { es: 'Analytics y SEO técnico: medición, tracking, posicionamiento y optimización continua para crecer.', en: 'Analytics and technical SEO: measurement, tracking, search visibility and ongoing optimization for growth.' },

  // Portfolio
  'portfolio.badge': { es: 'Nuestras obras maestras', en: 'Our masterpieces' },
  'portfolio.title.line1': { es: 'Un portafolio que', en: 'A portfolio that' },
  'portfolio.title.line2': { es: 'habla por sí solo', en: 'speaks volumes' },
  'portfolio.subtitle': {
    es: 'Cada proyecto cuenta una historia de transformación. Descubre cómo hemos ayudado a las marcas a lograr resultados extraordinarios con creatividad e innovación estratégicas.',
    en: 'Every project tells a story of transformation. Discover how we help brands achieve extraordinary results through creativity and strategic innovation.',
  },
  'portfolio.viewProject': { es: 'ver proyecto', en: 'view project' },
  'portfolio.caseStudy': { es: 'explorar caso de estudio', en: 'explore case study' },

  // CTA Section
  'cta.title': { es: '¿Listo para transformar tu presencia digital?', en: 'Ready to transform your digital presence?' },
  'cta.subtitle': { es: 'Trabaja con un equipo comprometido y dedicado a ofrecer una experiencia impecable y satisfactoria que eleve tu marca al siguiente nivel.', en: 'Work with a committed team dedicated to delivering an impeccable and satisfying experience that elevates your brand to the next level.' },
  'cta.primary': { es: 'Comienza tu proyecto hoy', en: 'Start your project today' },
  'cta.secondary': { es: 'Agenda una llamada', en: 'Schedule a call' },
  'cta.note': { es: 'Sin compromiso • Consultoría gratuita • Tiempo de respuesta rápido', en: 'No commitment • Free consultation • Quick response time' },

  // Footer
  'footer.company.about': {
    es: 'Somos más que una agencia: somos una plataforma donde creadores, ideas rebeldes y negocios con sueños grandes se unen para construir marcas memorables desde la creatividad, la honestidad y la libertad.',
    en: 'We are more than an agency: we are a platform where creators, rebellious ideas and businesses with big dreams come together to build memorable brands from creativity, honesty and freedom.',
  },
  'footer.services': { es: 'Servicios', en: 'Services' },
  'footer.getStarted': { es: 'Comenzar', en: 'Get started' },
  'footer.cta': { es: 'Obtener consulta gratuita', en: 'Get free consultation' },
  'footer.privacy': { es: 'Política de privacidad', en: 'Privacy policy' },
  'footer.terms': { es: 'Términos del servicio', en: 'Terms of service' },
  'footer.rights.es': { es: 'Todos los derechos reservados.', en: 'Todos los derechos reservados.' },
  'footer.rights.en': { es: 'All rights reserved.', en: 'All rights reserved.' },

  // About
  'about.title': { es: '¿Quiénes somos?', en: 'Who we are' },
  'about.subtitle': {
    es: 'Un equipo apasionado que combina estrategia, diseño y tecnología para impulsar resultados reales.',
    en: 'A passionate team combining strategy, design and technology to drive real results.',
  },
  'about.role.pm': { es: 'Jefe de proyecto', en: 'Project manager' },
  'about.role.designer': { es: 'Diseñadora gráfica', en: 'Graphic designer' },
  'about.role.dev': { es: 'Desarrollador', en: 'Developer' },
  'about.role.cm': { es: 'Community Manager', en: 'Community Manager' },
  'about.role.designer2': { es: 'Diseñadora gráfica', en: 'Graphic designer' },
  'about.bio.pm': {
    es: 'Planifica, coordina y asegura la entrega a tiempo con foco en calidad.',
    en: 'Plans, coordinates and ensures on‑time delivery with a focus on quality.',
  },
  'about.bio.designer': {
    es: 'Diseña identidades y visuales memorables alineadas a la marca.',
    en: 'Designs memorable brand identities and visuals.',
  },
  'about.bio.dev': {
    es: 'Crea experiencias web rápidas, accesibles y escalables.',
    en: 'Builds fast, accessible and scalable web experiences.',
  },
  'about.bio.cm': {
    es: 'Gestiona y fortalece la presencia digital de las marcas en redes sociales.',
    en: 'Manages and strengthens brands digital presence on social media.',
  },
  'about.bio.designer2': {
    es: 'Crea diseños visuales impactantes que conectan emocionalmente con la audiencia.',
    en: 'Creates impactful visual designs that emotionally connect with the audience.',
  },

  // FAQ
  'faq.title': { es: 'Preguntas frecuentes', en: 'Frequently asked questions' },
  'faq.subtitle': { es: 'Resolvemos dudas sobre alcances, tiempos y forma de trabajo.', en: 'Answers about scope, timelines and how we work.' },
  // FAQ items (1..6)
  'faq.q1': { es: '¿Ofrecen facilidades de pago?', en: 'Do you offer payment facilities?' },
  'faq.a1': { es: 'Sí, permitimos pagos en cuotas para proyectos como páginas web o aplicaciones. Dependiendo del coste final del proyecto, se solicitará un pago inicial. Luego de eso se evaluará la cantidad de cuotas y el monto de cada una.', en: 'Yes, we allow installment payments for projects like websites or applications. Depending on the final cost of the project, an initial payment will be required. After that, the number of installments and the amount of each one will be evaluated.' },
  'faq.q2': { es: '¿Cómo comienzo a trabajar con ustedes?', en: 'How do I start working with you?' },
  'faq.a2': { es: 'Escríbenos por alguno de nuestros medios de contacto para agendar la primera reunión sin costo y allí te explicamos cómo comenzar. Puedes escribirnos por WhatsApp o llenar el formulario de contacto.', en: 'Write to us through any of our contact channels to schedule the first free meeting and there we will explain how to start. You can write to us via WhatsApp or fill out the contact form.' },
  'faq.q3': { es: '¿Trabajan con cualquier tipo de cliente?', en: 'Do you work with any type of client?' },
  'faq.a3': { es: 'Sí, tenemos experiencia trabajando con diferentes nichos, así que sabemos cómo crear una estrategia efectiva para tu negocio, sea cuál sea.', en: 'Yes, we have experience working with different niches, so we know how to create an effective strategy for your business, whatever it may be.' },
  'faq.q4': { es: '¿Qué tipo de aplicaciones desarrollan?', en: 'What types of applications do you build?' },
  'faq.a4': { es: 'Creamos sitios y apps web, móviles y de escritorio: inventarios, reservaciones hoteleras, sistemas de turnos, CRMs, gestión de proyectos, e‑commerce, landing pages y más.', en: 'We build web, mobile and desktop apps: inventory systems, hotel bookings, appointment systems, CRMs, project management, e‑commerce, landing pages and more.' },
  'faq.q5': { es: '¿Cuáles son los tiempos de entrega?', en: 'What are the delivery timelines?' },
  'faq.a5': { es: 'Dependen del alcance. Definimos hitos claros y un roadmap al iniciar. Para obtener una estimación personalizada, <a href="#contact" class="inline-block text-[#dc89ff] font-semibold underline underline-offset-2 decoration-white/40 hover:decoration-transparent hover:text-white transition-colors">contáctanos aquí</a>.', en: 'It depends on scope. We define clear milestones and a roadmap at kickoff. For a tailored estimate, <a href="#contact" class="inline-block text-[#dc89ff] font-semibold underline underline-offset-2 decoration-white/40 hover:decoration-transparent hover:text-white transition-colors">contact us here</a>.' },
  'faq.q6': { es: '¿Cómo gestionan la estrategia de contenido?', en: 'How do you manage content strategy?' },
  'faq.a6': { es: 'Desarrollamos una estrategia integral: investigamos tu audiencia objetivo, definimos el tono de voz y pilares temáticos, creamos un plan multicanal y optimizamos continuamente basándonos en métricas de rendimiento.', en: 'We develop a comprehensive strategy: research your target audience, define voice tone and thematic pillars, create a multichannel plan and continuously optimize based on performance metrics.' },

  // Contact
  'contact.title': { es: 'Hablemos de tu proyecto', en: 'Let’s talk about your project' },
  'contact.subtitle': { es: 'Cuéntanos qué necesitas y te contactaremos a la brevedad.', en: 'Tell us what you need and we’ll get back to you shortly.' },
  'contact.firstName': { es: 'Nombre', en: 'First name' },
  'contact.lastName': { es: 'Apellido', en: 'Last name' },
  'contact.phone': { es: 'Teléfono', en: 'Phone' },
  'contact.email': { es: 'Correo electrónico', en: 'Email' },
  'contact.message': { es: 'Tu mensaje', en: 'Your message' },
  'contact.submit': { es: 'Enviar solicitud', en: 'Send request' },
  'contact.whatsapp': { es: 'Contactar por WhatsApp', en: 'Contact via WhatsApp' },
  'contact.validation.required': { es: 'Este campo es obligatorio.', en: 'This field is required.' },
  'contact.validation.email': { es: 'Ingresa un correo válido.', en: 'Please enter a valid email.' },
  'contact.validation.phone': { es: 'Ingresa un teléfono válido.', en: 'Please enter a valid phone.' },
};

type I18nContextValue = {
  lang: Language;
  setLang: (l: Language) => void;
  toggleLang: () => void;
  t: (key: keyof typeof translations) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('es');

  useEffect(() => {
    const stored = (localStorage.getItem('lang') as Language | null) || 'es';
    setLang(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    // Dispatch evento para componentes que necesiten reaccionar al cambio
    window.dispatchEvent(new Event('i18n:changed'));
  }, [lang]);

  const value = useMemo<I18nContextValue>(() => ({
    lang,
    setLang,
    toggleLang: () => {
      const next = lang === 'es' ? 'en' : 'es';
      setLang(next);
      // Cambio dinámico sin recarga
      document.documentElement.lang = next;
      localStorage.setItem('lang', next);
    },
    t: (key) => translations[key]?.[lang] ?? String(key),
  }), [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
};


