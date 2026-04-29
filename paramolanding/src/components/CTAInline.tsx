import React from 'react';
import { ArrowRight } from 'lucide-react';

const CTAInline: React.FC = () => {
  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-br from-[#12173b] via-[#3b2b86] to-[#7546ed] text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-3 items-center gap-8">
          <div className="md:col-span-2">
            <h3 className="text-3xl md:text-4xl font-creato font-bold">¿Listo para dar el siguiente paso?</h3>
            <p className="mt-3 text-white/90 font-garet">Conversemos sobre tu proyecto y cómo podemos acelerar resultados.</p>
          </div>
          <div className="flex md:justify-end">
            <a href="#contact" className="group bg-white text-[#12173b] px-6 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 inline-flex items-center gap-2">
              Comenzar ahora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full bg-[#dc89ff]/20 blur-2xl" />
    </section>
  );
};

export default CTAInline;


