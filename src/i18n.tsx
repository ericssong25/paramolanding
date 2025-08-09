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
  'header.cta': { es: 'Comenzar', en: 'Get started' },
  'header.lang': { es: 'ES', en: 'EN' },

  // Hero
  'hero.title.prefix': { es: 'No es solo', en: "It's not just" },
  'hero.subtitle': {
    es: 'Creamos experiencias digitales extraordinarias que transforman marcas, cautivan audiencias y potencian el crecimiento mediante innovación estratégica y excelencia creativa.',
    en: 'We craft extraordinary digital experiences that transform brands, captivate audiences, and drive growth through strategic innovation and creative excellence.',
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
  'services.item.marketing.desc': { es: 'Campañas que impulsan tráfico, engagement y crecimiento.', en: 'Campaigns that drive traffic, engagement, and growth.' },
  'services.item.design.title': { es: 'Marca y diseño', en: 'Brand & design' },
  'services.item.design.desc': { es: 'Sistemas visuales elegantes que resuenan.', en: 'Elegant visual systems that resonate.' },
  'services.item.web.title': { es: 'Desarrollo web', en: 'Web development' },
  'services.item.web.desc': { es: 'Apps rápidas, accesibles y escalables.', en: 'Fast, accessible and scalable apps.' },
  'services.item.video.title': { es: 'Producción de video', en: 'Video production' },
  'services.item.video.desc': { es: 'Narrativa cinematográfica para tu marca.', en: 'Cinematic storytelling for your brand.' },
  'services.item.mobile.title': { es: 'Apps móviles', en: 'Mobile apps' },
  'services.item.mobile.desc': { es: 'Experiencias iOS y Android centradas en el usuario.', en: 'Delightful iOS and Android experiences.' },
  'services.item.analytics.title': { es: 'Analytics y SEO', en: 'Analytics & SEO' },
  'services.item.analytics.desc': { es: 'Insights y optimización impulsados por datos.', en: 'Data-driven insights and optimization.' },

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
  'cta.subtitle': { es: 'Únete a cientos de clientes satisfechos que han elevado sus marcas con nuestras soluciones digitales integrales.', en: 'Join hundreds of satisfied clients who have elevated their brands with our comprehensive digital solutions.' },
  'cta.primary': { es: 'Comienza tu proyecto hoy', en: 'Start your project today' },
  'cta.secondary': { es: 'Agenda una llamada', en: 'Schedule a call' },
  'cta.note': { es: 'Sin compromiso • Consultoría gratuita • Tiempo de respuesta rápido', en: 'No commitment • Free consultation • Quick response time' },

  // Footer
  'footer.company.about': {
    es: 'Somos una agencia digital integral dedicada a transformar negocios mediante diseño innovador, marketing estratégico y desarrollo de vanguardia.',
    en: 'We are a full‑service digital agency transforming businesses through innovative design, strategic marketing, and cutting‑edge development.',
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
  'about.role.pm': { es: 'Project manager', en: 'Project manager' },
  'about.role.designer': { es: 'Graphic designer', en: 'Graphic designer' },
  'about.role.dev': { es: 'Developer', en: 'Developer' },
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

  // FAQ
  'faq.title': { es: 'Preguntas frecuentes', en: 'Frequently asked questions' },
  'faq.subtitle': { es: 'Resolvemos dudas sobre alcances, tiempos y forma de trabajo.', en: 'Answers about scope, timelines and how we work.' },
  // FAQ items (1..7)
  'faq.q1': { es: '¿Qué tipo de aplicaciones desarrollan?', en: 'What types of applications do you build?' },
  'faq.a1': { es: 'Creamos sitios y apps web, móviles y de escritorio: inventarios, reservaciones hoteleras, sistemas de turnos, CRMs, gestión de proyectos, e‑commerce, landing pages y más.', en: 'We build web, mobile and desktop apps: inventory systems, hotel bookings, appointment systems, CRMs, project management, e‑commerce, landing pages and more.' },
  'faq.q2': { es: '¿Cómo trabajan y qué metodología usan?', en: 'How do you work and what methodology do you use?' },
  'faq.a2': { es: 'Usamos enfoques ágiles (Scrum/Kanban). Trabajamos por sprints cortos, demos semanales y comunicación abierta para iterar rápido y con transparencia.', en: 'We follow agile (Scrum/Kanban) with short sprints, weekly demos and open communication to iterate quickly and transparently.' },
  'faq.q3': { es: '¿Cuáles son los tiempos de entrega?', en: 'What are the delivery timelines?' },
  'faq.a3': { es: 'Dependen del alcance: una landing puede tomar 1–2 semanas; un CRM medio 6–10 semanas. Definimos hitos claros y un roadmap al iniciar.', en: 'It depends on scope: a landing page may take 1–2 weeks; a mid‑size CRM 6–10 weeks. We define clear milestones and a roadmap at kickoff.' },
  'faq.q4': { es: '¿Qué servicios de marketing ofrecen?', en: 'What marketing services do you offer?' },
  'faq.a4': { es: 'Estrategia de contenido, SEO/SEM, email marketing y campañas en redes: desde propuesta de valor hasta calendario editorial y optimización continua.', en: 'Content strategy, SEO/SEM, email marketing and social campaigns—from value proposition to editorial calendar and ongoing optimization.' },
  'faq.q5': { es: '¿Pueden ayudar con diseño gráfico y branding?', en: 'Can you help with graphic design and branding?' },
  'faq.a5': { es: 'Sí. Identidad visual, guías de estilo, UX/UI, material publicitario y assets para redes con consistencia de marca.', en: 'Yes. Visual identity, brand guidelines, UX/UI, marketing collateral and social assets with consistent branding.' },
  'faq.q6': { es: '¿Realizan edición de videos?', en: 'Do you provide video editing?' },
  'faq.a6': { es: 'Sí. Edición, motion graphics, subtitulado y formatos para anuncios, landings y redes sociales.', en: 'Yes. Editing, motion graphics, subtitling and formats for ads, landings and social media.' },
  'faq.q7': { es: '¿Cómo gestionan la estrategia de contenido?', en: 'How do you manage content strategy?' },
  'faq.a7': { es: 'Investigamos audiencia, definimos tono y pilares de contenido y plan multicanal con analítica para iterar lo que funciona.', en: 'We research audience, define tone and content pillars, build a multichannel plan and iterate using analytics.' },

  // Contact
  'contact.title': { es: 'Hablemos de tu proyecto', en: 'Let’s talk about your project' },
  'contact.subtitle': { es: 'Cuéntanos qué necesitas y te contactaremos a la brevedad.', en: 'Tell us what you need and we’ll get back to you shortly.' },
  'contact.firstName': { es: 'Nombre', en: 'First name' },
  'contact.lastName': { es: 'Apellido', en: 'Last name' },
  'contact.phone': { es: 'Teléfono', en: 'Phone' },
  'contact.email': { es: 'Correo electrónico (opcional)', en: 'Email (optional)' },
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
    // Forzar re-render global y refresco suave para textos estáticos fuera de React
    // (e.g., título del documento o formularios detectados en build)
    // Evitamos recarga completa si no es necesario.
    // window.location.reload(); // opción dura; preferimos dispatch de evento
    window.dispatchEvent(new Event('i18n:changed'));
  }, [lang]);

  const value = useMemo<I18nContextValue>(() => ({
    lang,
    setLang,
    toggleLang: () => {
      const next = lang === 'es' ? 'en' : 'es';
      setLang(next);
      // recarga completa solicitada
      setTimeout(() => window.location.reload(), 0);
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


