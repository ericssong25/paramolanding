import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Layers, X } from 'lucide-react';
import { gsap } from 'gsap';
import { getWorkBySlug } from '../data/work';
import LoadingScreen from '../components/LoadingScreen';
import { useAssetLoader } from '../hooks/useAssetLoader';

type WorkDetailProps = {
  slug: string;
};

type LightboxState =
  | null
  | {
      type: 'image';
      title: string;
      slides: Array<{ src: string; alt?: string }>;
      index: number;
    }
  | {
      type: 'video';
      title: string;
      src: string;
      poster?: string;
    };

const WorkDetail: React.FC<WorkDetailProps> = ({ slug }) => {
  const work = useMemo(() => getWorkBySlug(slug), [slug]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const { isLoading, progress, startLoading } = useAssetLoader(work);

  useEffect(() => {
    // Scroll al inicio de la página cuando se navega a un proyecto
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll('[data-animate]');
    gsap.fromTo(items, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.04, ease: 'power2.out' });
  }, [slug]);

  useEffect(() => {
    if (work && !assetsLoaded) {
      startLoading();
      setAssetsLoaded(true);
    }
  }, [work, assetsLoaded, startLoading]);

  const navigateHome = (e: React.MouseEvent) => {
    e.preventDefault();
    // Regresar directo a Portafolio y hacer scroll a la sección.
    window.history.pushState({}, '', '/#portfolio');
    window.dispatchEvent(new PopStateEvent('popstate'));

    const scrollToPortfolio = () => {
      const el = document.getElementById('portfolio');
      if (!el) return false;

      // Header fijo => compensar altura aproximada.
      const headerOffset = 96;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
      return true;
    };

    // Reintentos por el render asíncrono del home.
    for (let i = 0; i < 10; i++) {
      window.setTimeout(() => {
        if (scrollToPortfolio()) return;
      }, i * 60);
    }
  };

  const scrollByViewport = (el: HTMLElement | null, direction: -1 | 1) => {
    if (!el) return;
    const amount = Math.max(280, Math.floor(el.clientWidth * 0.9));
    el.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!lightbox) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (lightbox.type === 'image' && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        setLightbox((prev) => {
          if (!prev || prev.type !== 'image') return prev;
          const dir = e.key === 'ArrowLeft' ? -1 : 1;
          const next = (prev.index + dir + prev.slides.length) % prev.slides.length;
          return { ...prev, index: next };
        });
      }
    };
    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox]);

  if (!work) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <button onClick={navigateHome} className="inline-flex items-center gap-2 text-[#7546ed] hover:text-[#12173b] font-semibold">
            <ArrowLeft className="w-4 h-4" /> Volver
          </button>
          <h1 className="mt-8 text-3xl md:text-5xl font-bold text-[#12173b] font-creato">Proyecto no encontrado</h1>
          <p className="mt-4 text-gray-700 font-garet">Revisa el enlace o vuelve al inicio.</p>
        </div>
      </main>
    );
  }

  // Mostrar pantalla de carga mientras se cargan los assets
  if (isLoading) {
    return (
      <LoadingScreen 
        message="Estamos preparando todo para que visualices el proyecto..."
        onComplete={() => {}}
      />
    );
  }

  return (
    <main className="min-h-screen bg-white" ref={containerRef}>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4f1edc]/10 via-[#b1a9e5]/20 to-[#dc89ff]/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-14 pb-14 relative">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div data-animate>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/80 border border-gray-200 text-[#12173b]">
                {work.category}
              </div>
              <h1 className="mt-4 text-4xl md:text-6xl font-bold text-[#12173b] font-creato">
                {work.title}
              </h1>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={navigateHome}
                  className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-gray-200 text-[#12173b] px-6 py-3 hover:border-[#7546ed]/30 hover:text-[#7546ed] transition-colors font-semibold"
                  aria-label="Volver al inicio"
                >
                  <ArrowLeft className="w-4 h-4" /> Volver
                </button>
                {work.instagramUrl && (
                  <a
                    href={work.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-[#7546ed] text-white px-6 py-3 rounded-full hover:bg-[#12173b] transition-colors font-semibold"
                  >
                    Ver Instagram <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            <div data-animate>
              <div className="rounded-3xl overflow-hidden bg-black shadow-2xl shadow-black/20 ring-1 ring-black/10">
                <img src={work.coverImage} alt={work.title} className="w-full h-auto object-cover max-h-[400px] lg:max-h-[500px]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      {work.sections.map((section, sectionIdx) => {
        const sectionId = `section-scroll-${sectionIdx}`;
        return (
        <section key={`${section.type}-${section.title}`} className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4" data-animate>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#12173b] font-creato">
                  {section.title}
                </h2>
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white hover:border-[#7546ed]/30 hover:text-[#7546ed] transition-colors"
                  aria-label="Anterior"
                  onClick={() => {
                    const scroller = document.getElementById(sectionId);
                    scrollByViewport(scroller, -1);
                  }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white hover:border-[#7546ed]/30 hover:text-[#7546ed] transition-colors"
                  aria-label="Siguiente"
                  onClick={() => {
                    const scroller = document.getElementById(sectionId);
                    scrollByViewport(scroller, 1);
                  }}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div
              id={sectionId}
              className="mt-8 flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory scroll-px-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              data-animate
            >
              {section.type === 'gallery'
                ? section.items.map((item, itemIdx) => {
                    const isCarousel = (item as any).type === 'carousel';
                    const coverSrc = isCarousel ? (item as any).coverSrc : (item as any).src;
                    const slides = isCarousel ? (item as any).slides : [{ src: (item as any).src, alt: (item as any).alt }];
                    return (
                      <button
                        type="button"
                        key={`${coverSrc}-${itemIdx}`}
                        className="snap-start shrink-0 w-[78%] sm:w-[52%] lg:w-[32%] rounded-2xl overflow-hidden border border-gray-200 bg-white relative text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7546ed]/40"
                        onClick={() => setLightbox({ type: 'image', title: section.title, slides, index: 0 })}
                        aria-label={isCarousel ? 'Abrir carrusel' : 'Abrir imagen'}
                      >
                        <img
                          src={coverSrc}
                          alt={(item as any).alt ?? section.title}
                          className="w-full h-full object-cover aspect-[4/5]"
                          loading="lazy"
                        />
                        {isCarousel && (
                          <span className="absolute top-3 right-3 inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/55 text-white">
                            <Layers className="w-5 h-5" />
                          </span>
                        )}
                      </button>
                    );
                  })
                : section.items.map((item) => (
                    <div
                      key={`${item.src}-${item.title ?? ''}`}
                      className="snap-start shrink-0 w-[74%] sm:w-[48%] lg:w-[28%] rounded-2xl overflow-hidden bg-black ring-1 ring-black/10 cursor-pointer"
                      role="button"
                      tabIndex={0}
                      onClick={() => setLightbox({ type: 'video', title: section.title, src: item.src, poster: item.poster })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setLightbox({ type: 'video', title: section.title, src: item.src, poster: item.poster });
                        }
                      }}
                      aria-label="Abrir video"
                    >
                      <video
                        src={item.src}
                        poster={item.poster}
                        playsInline
                        preload="metadata"
                        muted
                        loop
                        autoPlay
                        className="w-full h-full object-contain aspect-[9/16] bg-black pointer-events-none"
                      />
                    </div>
                  ))}
            </div>
          </div>
        </section>
        );
      })}

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setLightbox(null)} aria-label="Cerrar" />
          <div className="relative w-full max-w-5xl">
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-12 right-0 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>

            {lightbox.type === 'video' ? (
              <div className="rounded-3xl overflow-hidden bg-black ring-1 ring-white/10 shadow-2xl">
                <video
                  src={lightbox.src}
                  poster={lightbox.poster}
                  autoPlay
                  playsInline
                  controls
                  className="w-full h-full object-contain bg-black max-h-[82vh]"
                />
              </div>
            ) : (
              <div className="rounded-3xl overflow-hidden bg-black ring-1 ring-white/10 shadow-2xl relative">
                <img
                  src={lightbox.slides[lightbox.index]?.src}
                  alt={lightbox.slides[lightbox.index]?.alt ?? lightbox.title}
                  className="w-full h-full object-contain bg-black max-h-[82vh]"
                />

                {lightbox.slides.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                      aria-label="Anterior"
                      onClick={() =>
                        setLightbox((prev) => {
                          if (!prev || prev.type !== 'image') return prev;
                          const next = (prev.index - 1 + prev.slides.length) % prev.slides.length;
                          return { ...prev, index: next };
                        })
                      }
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                      aria-label="Siguiente"
                      onClick={() =>
                        setLightbox((prev) => {
                          if (!prev || prev.type !== 'image') return prev;
                          const next = (prev.index + 1) % prev.slides.length;
                          return { ...prev, index: next };
                        })
                      }
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                      {lightbox.slides.map((_, i) => (
                        <span
                          key={i}
                          className={`h-2 w-2 rounded-full ${i === lightbox.index ? 'bg-white' : 'bg-white/40'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#4f1edc] via-[#6a3fe0] to-[#dc89ff] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl md:text-4xl font-bold font-creato" data-animate>
            ¿Quieres algo similar para tu marca?
          </h3>
          <p className="mt-4 text-white/90 font-garet" data-animate>
            Cuéntanos qué necesitas y te proponemos un plan claro.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-white text-[#12173b] px-6 py-3 rounded-full mt-8 hover:bg-white/90 transition-colors font-semibold"
            data-animate
          >
            Contactar <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </main>
  );
};

export default WorkDetail;

