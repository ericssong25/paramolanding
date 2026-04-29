import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '../i18n';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const typingRef = useRef<HTMLSpanElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useI18n();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  // Particle system dimensions
  const PARTICLE_COUNT = 150; // More particles for better coverage
  const GEOMETRIC_COUNT = 50; // More geometric shapes for variety
  

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const handler = () => setIsMobile(mql.matches);
    handler();
    mql.addEventListener ? mql.addEventListener('change', handler) : window.addEventListener('resize', handler);
    return () => {
      mql.removeEventListener ? mql.removeEventListener('change', handler) : window.removeEventListener('resize', handler);
    };
  }, []);

  useEffect(() => {
    // Palabras para escribir (en minúsculas)
    const words = lang === 'es'
      ? ["marketing", "diseño", "desarrollo", "innovación", "resultados"]
      : ["marketing", "design", "development", "innovation", "results"];
    let currentWordIndex = 0;

    // Animación de entrada inicial
    const tl = gsap.timeline({ delay: 0.3 });
    
    // Fade in overlay and content
    tl.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" }
    )
    .fromTo(headingRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(subheadingRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(ctaRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(statsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );

    // Tipado robusto sin solapamientos
    let isMounted = true;
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    const typeAndEraseLoop = async () => {
      await delay(1200); // espera después de la animación inicial
      while (isMounted) {
        const word = words[currentWordIndex];
        if (typingRef.current) {
          typingRef.current.textContent = '';
        }

        // escribir
        for (let i = 0; i < word.length && isMounted; i++) {
          if (typingRef.current) {
            typingRef.current.textContent += word[i];
          }
          await delay(90);
        }

        await delay(1400);

        // borrar
        for (let i = word.length; i > 0 && isMounted; i--) {
          if (typingRef.current) {
            typingRef.current.textContent = word.slice(0, i - 1);
          }
          await delay(45);
        }

        currentWordIndex = (currentWordIndex + 1) % words.length;
      }
    };

    typeAndEraseLoop();

    // Particle and geometric animation system (desktop only)
    if (isMobile) {
      return () => { isMounted = false; };
    }
    let animationFrameId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const geometrics: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      rotation: number;
      rotationSpeed: number;
      type: 'triangle' | 'square' | 'diamond';
    }> = [];

    // Initialize particles with better distribution
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.8, // Faster for smoother motion
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 5 + 2, // Slightly larger range
        opacity: Math.random() * 0.35 + 0.1 // Range: 0.1 to 0.45
      });
    }

    // Initialize geometric shapes with better distribution
    for (let i = 0; i < GEOMETRIC_COUNT; i++) {
      geometrics.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.6, // Faster for smoother motion
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 25 + 12, // Larger size range
        opacity: Math.random() * 0.35 + 0.1, // Range: 0.1 to 0.45
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4, // Faster rotation for smoother effect
        type: ['triangle', 'square', 'diamond'][Math.floor(Math.random() * 3)] as 'triangle' | 'square' | 'diamond'
      });
    }

    const animateParticles = () => {
      const particleElements = heroRef.current?.querySelectorAll('.particle') as NodeListOf<HTMLElement>;
      const geometricElements = heroRef.current?.querySelectorAll('.geometric') as NodeListOf<HTMLElement>;
      
      if (!particleElements || !geometricElements) return;

      // Use transform3d for hardware acceleration
      const updateElement = (element: HTMLElement, x: number, y: number, size?: number, rotation?: number) => {
        element.style.transform = `translate3d(${x}px, ${y}px, 0)${rotation ? ` rotate(${rotation}deg)` : ''}`;
        if (size) {
          element.style.width = `${size}px`;
          element.style.height = `${size}px`;
        }
      };

      // Animate particles with optimized updates
      particles.forEach((particle, index) => {
        const element = particleElements[index];
        if (!element) return;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= window.innerWidth) particle.vx *= -1;
        if (particle.y <= 0 || particle.y >= window.innerHeight) particle.vy *= -1;

        // Apply position with hardware acceleration
        updateElement(element, particle.x, particle.y, particle.size);
      });

      // Animate geometric shapes with optimized updates
      geometrics.forEach((geometric, index) => {
        const element = geometricElements[index];
        if (!element) return;

        // Update position and rotation
        geometric.x += geometric.vx;
        geometric.y += geometric.vy;
        geometric.rotation += geometric.rotationSpeed;

        // Bounce off edges
        if (geometric.x <= 0 || geometric.x >= window.innerWidth) geometric.vx *= -1;
        if (geometric.y <= 0 || geometric.y >= window.innerHeight) geometric.vy *= -1;

        // Apply position, size, rotation with hardware acceleration
        updateElement(element, geometric.x, geometric.y, geometric.size, geometric.rotation);
        element.setAttribute('data-type', geometric.type);
      });

      animationFrameId = requestAnimationFrame(animateParticles);
    };

    animateParticles();

    // Remove mouse event listener since we don't need it anymore
    
    return () => {
      isMounted = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [lang, isMobile]);

  // Subtle parallax for blobs (desktop only)
  useEffect(() => {
    if (isMobile) return;
    const container = heroRef.current;
    if (!container) return;
    const wraps = container.querySelectorAll<HTMLElement>('.blob-wrap');

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewportH = window.innerHeight || document.documentElement.clientHeight;
      const progress = 1 - Math.min(Math.max((rect.top + rect.height / 2) / (viewportH + rect.height), 0), 1);
      wraps.forEach((el) => {
        const speedAttr = el.getAttribute('data-speed');
        const speed = speedAttr ? parseFloat(speedAttr) : 0.03;
        const translateY = (progress - 0.5) * 100 * speed; // small shift
        const translateX = (progress - 0.5) * 60 * speed;
        el.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMobile]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div ref={overlayRef} className="absolute inset-0 z-10">
        {/* Mobile: simple gradient for performance */}
        {isMobile ? (
          <div className="absolute inset-0 bg-gradient-to-b from-[#12173b] via-[#1b1f4a] to-[#7546ed]" />
        ) : (
          <>
        {/* Base */}
        <div className="absolute inset-0 bg-[#0f122b]" />
        {/* Blobs (distributed and lightly animated) */}
        <div className="blob-wrap pointer-events-none absolute -top-24 -left-24 w-[38vw] h-[38vw]" data-speed="0.10">
          <div
            className="hero-blob w-full h-full opacity-40 blur-3xl"
            style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(79,30,220,0.9) 0%, rgba(79,30,220,0) 70%)',
                     // @ts-ignore
                     ['--duration' as any]: '32s' }}
          />
        </div>
        <div className="blob-wrap pointer-events-none absolute top-[12vh] right-[-10vw] w-[30vw] h-[30vw]" data-speed="0.08">
          <div
            className="hero-blob w-full h-full opacity-35 blur-3xl"
            style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(106,63,224,0.85) 0%, rgba(106,63,224,0) 70%)',
                     // @ts-ignore
                     ['--duration' as any]: '28s' }}
          />
        </div>
        <div className="blob-wrap pointer-events-none absolute bottom-[-10vw] left-[8vw] w-[34vw] h-[34vw]" data-speed="0.06">
          <div
            className="hero-blob w-full h-full opacity-35 blur-3xl"
            style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(220,137,255,0.85) 0%, rgba(220,137,255,0) 70%)',
                     // @ts-ignore
                     ['--duration' as any]: '30s' }}
          />
        </div>
        <div className="blob-wrap pointer-events-none absolute bottom-[6vh] right-[6vw] w-[28vw] h-[28vw]" data-speed="0.09">
          <div
            className="hero-blob w-full h-full opacity-30 blur-3xl"
            style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(177,169,229,0.85) 0%, rgba(177,169,229,0) 70%)',
                     // @ts-ignore
                     ['--duration' as any]: '34s' }}
          />
        </div>
        {/* Center soft blob to unify background */}
        <div className="blob-wrap pointer-events-none absolute top-1/2 left-1/2 w-[30vw] h-[30vw] -translate-x-1/2 -translate-y-1/2" data-speed="0.05">
          <div
            className="hero-blob w-full h-full opacity-25 blur-2xl"
            style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(124,87,255,0.6) 0%, rgba(124,87,255,0) 70%)',
                     // @ts-ignore
                     ['--duration' as any]: '40s' }}
          />
        </div>
        {/* Extra lighter accents */}
        <div className="blob-wrap pointer-events-none absolute top-[10vh] left-[40vw] w-[18vw] h-[18vw]" data-speed="0.04">
          <div
            className="hero-blob w-full h-full opacity-20 blur-2xl"
            style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(236, 209, 255, 0.8) 0%, rgba(236,209,255,0) 70%)',
                     // @ts-ignore
                     ['--duration' as any]: '36s' }}
          />
        </div>
        {/* Soft vignette for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/45" />
          </>
        )}
      </div>

            {/* Animated Particle and Geometric System */}
      {!isMobile && (
        <div className="absolute inset-0 z-[15] overflow-hidden pointer-events-none">
          <div className="particle-container">
            {Array.from({ length: PARTICLE_COUNT }).map((_, index) => (
              <div 
                key={`particle-${index}`}
                className="particle"
                style={{ '--particle-index': index } as React.CSSProperties}
              />
            ))}
            {Array.from({ length: GEOMETRIC_COUNT }).map((_, index) => (
              <div 
                key={`geometric-${index}`}
                className="geometric"
                style={{ '--geometric-index': index } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
      )}

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-20">
        <div className="w-full">
          <div className="w-full lg:max-w-5xl">
            {/* Removed trust badge per request */}

            <h1 
              ref={headingRef}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight font-creato mb-6 whitespace-normal sm:whitespace-nowrap"
            >
              {t('hero.title.prefix')} {' '}
              <br className="md:hidden" />
              <span 
                ref={typingRef}
                className="animated-gradient-text inline-block md:inline whitespace-nowrap border-r-2 border-[#dc89ff] pr-1 align-baseline font-creato mt-1 md:mt-0"
              >
                
              </span>
            </h1>
            
            <p 
              ref={subheadingRef}
              className="text-xl text-white/90 leading-relaxed max-w-3xl mb-10 font-garet"
              dangerouslySetInnerHTML={{ __html: t('hero.subtitle') }}
            />

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-12">
              <a href="#contact" className="group bg-gradient-to-r from-[#7546ed] to-[#dc89ff] text-white px-8 py-4 rounded-full hover:from-[#8b66ff] hover:to-[#f0a7ff] hover:brightness-110 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 font-medium text-lg shadow-2xl">
                {t('hero.ctaPrimary')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* metrics removed per request */}
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 text-white/60 animate-bounce">
          <span className="text-sm">{t('hero.scroll')}</span>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;