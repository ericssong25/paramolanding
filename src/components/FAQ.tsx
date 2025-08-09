import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Plus, Minus } from 'lucide-react';
import { useI18n } from '../i18n';

type QA = { q: string; a: string };

const faqs: QA[] = [
  {
    q: '¿Qué tipo de aplicaciones desarrollan?',
    a: 'Creamos sitios y apps web, móviles y de escritorio: inventarios, reservaciones hoteleras, sistemas de turnos, CRMs, gestión de proyectos, e‑commerce, landing pages y más.',
  },
  {
    q: '¿Cómo trabajan y qué metodología usan?',
    a: 'Usamos enfoques ágiles (Scrum/Kanban). Trabajamos por sprints cortos, demos semanales y comunicación abierta para iterar rápido y con transparencia.',
  },
  {
    q: '¿Cuáles son los tiempos de entrega?',
    a: 'Dependen del alcance: una landing puede tomar 1–2 semanas; un CRM medio 6–10 semanas. Definimos milestones claros y un roadmap al iniciar.',
  },
  {
    q: '¿Qué servicios de marketing ofrecen?',
    a: 'Estrategia de contenido, SEO/SEM, email marketing y campañas en redes: desde propuesta de valor hasta calendario editorial y optimización continua.',
  },
  {
    q: '¿Pueden ayudar con diseño gráfico y branding?',
    a: 'Sí. Identidad visual, guías de estilo, diseño UX/UI, material publicitario y assets para redes con consistencia de marca.',
  },
  {
    q: '¿Realizan edición de videos?',
    a: 'Sí. Edición, motion graphics, subtitulado y formatos para anuncios sociales, landing pages y reels.',
  },
  {
    q: '¿Cómo gestionan la estrategia de contenido?',
    a: 'Investigación de audiencia, definición de tono, pilares de contenido y un plan multicanal con analítica para iterar lo que funciona.',
  },
];

const FAQ: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());
  const { t } = useI18n();

  useEffect(() => {
    const elements: Element[] = [];
    if (sectionRef.current) elements.push(sectionRef.current.querySelector('[data-title]') as Element);
    if (listRef.current) elements.push(...Array.from(listRef.current.children));
    gsap.fromTo(elements, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power2.out' });
  }, []);

  return (
    <section id="faq" ref={sectionRef} className="py-28 bg-gradient-to-b from-[#0f122b] via-[#13183e] to-[#1b1f4a] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-title className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-creato font-bold mb-4">{t('faq.title')}</h2>
          <p className="text-lg text-white/80 font-garet">{t('faq.subtitle')}</p>
        </div>
        <div ref={listRef} className="space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = openSet.has(idx);
            return (
              <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                <button
                  onClick={() =>
                    setOpenSet(prev => {
                      const next = new Set(prev);
                      if (next.has(idx)) next.delete(idx); else next.add(idx);
                      return next;
                    })
                  }
                  className="w-full flex items-center justify-between text-left px-6 py-5 hover:bg-white/10 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-creato text-xl leading-snug pr-6">{item.q}</span>
                  {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </button>
                <AnimatedAnswer open={isOpen}>
                  <p className="text-white/80 font-garet leading-relaxed pl-6 pr-6 pb-5">{item.a}</p>
                </AnimatedAnswer>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const AnimatedAnswer: React.FC<{ open: boolean; children: React.ReactNode }> = ({ open, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        height: open ? 'auto' : 0,
        duration: 0.3,
        ease: 'power2.out',
        onStart: () => { if (open) el.style.height = 'auto'; },
      });
      gsap.to(el, { opacity: open ? 1 : 0, duration: 0.2 });
    }, ref);
    return () => ctx.revert();
  }, [open]);
  return <div ref={ref} style={{ height: 0, opacity: 0, overflow: 'hidden' }}>{children}</div>;
};

export default FAQ;


