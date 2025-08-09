import React, { useEffect, useRef } from 'react';
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

    // Parallax effect for background
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = heroRef.current?.querySelector('.hero-bg') as HTMLElement;
      if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      isMounted = false;
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lang]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="hero-bg absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Creative workspace"
          className="w-full h-full object-cover scale-110"
        />
      </div>
      
      {/* Gradient Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-br from-[#12173b]/90 via-[#12173b]/80 to-[#7546ed]/70 z-10"
      ></div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-[#dc89ff]/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-32 left-16 w-24 h-24 bg-[#b1a9e5]/30 rounded-full blur-lg animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-[#7546ed]/25 rounded-full blur-md animate-pulse delay-500"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="w-full">
          <div className="w-full lg:max-w-5xl">
            {/* Removed trust badge per request */}

            <h1 
              ref={headingRef}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight font-creato mb-6 whitespace-normal sm:whitespace-nowrap"
            >
              {t('hero.title.prefix')} {' '}
              <span 
                ref={typingRef}
                className="text-[#dc89ff] whitespace-nowrap border-r-2 border-[#dc89ff] animate-pulse pr-1 align-baseline font-creato"
              >
                
              </span>
            </h1>
            
            <p 
              ref={subheadingRef}
              className="text-xl text-white/90 leading-relaxed max-w-3xl mb-10 font-garet"
            >
              {t('hero.subtitle')}
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="group bg-gradient-to-r from-[#7546ed] to-[#dc89ff] text-white px-8 py-4 rounded-full hover:from-[#8b66ff] hover:to-[#f0a7ff] hover:brightness-110 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 font-medium text-lg shadow-2xl">
                {t('hero.ctaPrimary')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
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