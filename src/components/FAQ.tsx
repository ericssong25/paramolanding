import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Plus, Minus } from 'lucide-react';
import { useI18n } from '../i18n';

type QA = { q: string; a: string };

const useFaqs = (t: (k: any) => string): QA[] => [
  { q: t('faq.q1'), a: t('faq.a1') },
  { q: t('faq.q2'), a: t('faq.a2') },
  { q: t('faq.q3'), a: t('faq.a3') },
  { q: t('faq.q4'), a: t('faq.a4') },
  { q: t('faq.q5'), a: t('faq.a5') },
  { q: t('faq.q7'), a: t('faq.a7') },
];

const FAQ: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useI18n();
  const faqs = useFaqs(t as any);

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
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                <button
                  onClick={() => setOpenIndex(prev => (prev === idx ? null : idx))}
                  className="w-full flex items-center justify-between text-left px-6 py-5 hover:bg-white/10 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-creato text-xl leading-snug pr-6">{item.q}</span>
                  {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </button>
                <AnimatedAnswer open={isOpen}>
                  <p
                    className="text-white/80 font-garet leading-relaxed pl-6 pr-6 pb-5"
                    dangerouslySetInnerHTML={{ __html: item.a }}
                  />
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


