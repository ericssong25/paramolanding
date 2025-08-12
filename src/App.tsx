import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import { FEATURES } from './config';
import About from './components/About';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import CTAInline from './components/CTAInline';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Desplazamiento suave al cargar
    gsap.to(window, {duration: 0.5, scrollTo: 0});
    
    // Animación de entrada de página
    gsap.fromTo(mainRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1, ease: "power2.out" }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="bg-white text-gray-900 overflow-x-hidden">
      <Header />
      <Hero />
      <Services />
      <CTAInline />
      {FEATURES.portfolioEnabled && <Portfolio />}
      <About />
      <FAQ />
      <Contact />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;