import React, { useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, ShoppingCart, DollarSign, BarChart3, History } from 'lucide-react';
import { gsap } from 'gsap';
import { useI18n } from '../i18n';

type CaseSectionProps = {
  title: string;
  description: React.ReactNode;
  mediaSrc: string;
  mediaType?: 'gif' | 'video';
  posterSrc?: string;
  reverse?: boolean;
  variant?: 'light' | 'dark' | 'soft';
  layout?: 'side-by-side' | 'stacked';
  titleAboveMedia?: boolean;
};

const CaseSection: React.FC<CaseSectionProps> = ({ title, description, mediaSrc, mediaType = 'gif', posterSrc, reverse, variant = 'light', layout = 'side-by-side', titleAboveMedia = false }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const items = el.querySelectorAll('[data-animate]');
    gsap.fromTo(items, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power2.out' });
  }, []);

  const baseBg = variant === 'dark'
    ? 'relative bg-gradient-to-br from-[#0f122b] via-[#13183e] to-[#1b1f4a] text-white'
    : variant === 'soft'
    ? 'relative bg-gradient-to-br from-[#f7f2ff] via-white to-[#f7f2ff]'
    : 'relative bg-white';

  return (
    <section ref={sectionRef as any} className={`${baseBg} py-20 overflow-hidden`}>
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(117,70,237,0.6) 0%, rgba(117,70,237,0) 70%)' }} />
      <div className="pointer-events-none absolute -bottom-24 right-[-5rem] w-[30rem] h-[30rem] rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(220,137,255,0.6) 0%, rgba(220,137,255,0) 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {layout === 'stacked' ? (
          <>
            <div data-animate>
              {titleAboveMedia && (
                <h3 className={`text-3xl md:text-4xl font-bold font-creato text-center mb-6 ${variant === 'dark' ? 'text-white' : 'text-[#12173b]'}`}>{title}</h3>
              )}
              <div className="rounded-2xl overflow-hidden bg-black shadow-2xl shadow-black/30 ring-1 ring-black/10">
                {mediaType === 'video' ? (
                  <video
                    src={mediaSrc}
                    poster={posterSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-auto object-contain"
                  />
                ) : (
                  <img src={mediaSrc} alt={title} className="w-full h-auto object-contain" />
                )}
              </div>
            </div>
            <div className="mt-10" data-animate>
              {!titleAboveMedia && (
                <h3 className={`text-3xl md:text-4xl font-bold font-creato ${variant === 'dark' ? 'text-white' : 'text-[#12173b]'} mb-4`}>{title}</h3>
              )}
              <div className={`text-lg leading-relaxed font-garet ${variant === 'dark' ? 'text-white/85' : 'text-gray-700'}`}>{description}</div>
            </div>
          </>
        ) : (
          <div className={`grid md:grid-cols-2 gap-10 items-center ${reverse ? 'md:[&>div:first-child]:order-2 md:[&>div:last-child]:order-1' : ''}`}>
            <div data-animate>
              <h3 className={`text-3xl md:text-4xl font-bold font-creato ${variant === 'dark' ? 'text-white' : 'text-[#12173b]'} mb-4`}>{title}</h3>
              <div className={`text-lg leading-relaxed font-garet ${variant === 'dark' ? 'text-white/85' : 'text-gray-700'}`}>{description}</div>
            </div>
            <div data-animate>
              <div className="rounded-2xl overflow-hidden bg-black shadow-2xl shadow-black/30 ring-1 ring-black/10" style={{ aspectRatio: '16 / 9' }}>
                {mediaType === 'video' ? (
                  <video
                    src={mediaSrc}
                    poster={posterSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img src={mediaSrc} alt={title} className="w-full h-full object-contain" />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const CaseStudyWebApp: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll('[data-animate]');
    gsap.fromTo(
      items,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power2.out' }
    );
  }, []);

  const navigateHome = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Top hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4f1edc]/10 via-[#b1a9e5]/20 to-[#dc89ff]/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <button
            onClick={navigateHome}
            className="inline-flex items-center gap-2 text-[#7546ed] hover:text-[#12173b] font-semibold mb-8"
            aria-label="Volver al inicio"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </button>
          <h1 className="text-4xl md:text-6xl font-bold text-[#12173b] font-creato" data-animate>
            Aplicación web — Gestión de procesos
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-3xl font-garet" data-animate>
            Optimizamos el flujo de trabajo, reducimos tareas repetitivas y centralizamos la información para una gestión más ordenada y eficiente.
          </p>
          <div className="mt-8" data-animate>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#7546ed] text-white px-6 py-3 rounded-full hover:bg-[#12173b] transition-colors"
            >
              Hablar sobre tu proyecto <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Alternating sections */}
      <CaseSection
        title="El reto y objetivos"
        description={(
          <>
            <p>
              Partimos de procesos manuales y desordenados: planillas duplicadas, seguimiento por chat y poca visibilidad del estado.
            </p>
            <p className="mt-4">
              Definimos objetivos claros: consolidar la operación en un solo lugar, estandarizar los flujos y medir cada etapa.
            </p>
          </>
        )}
        mediaSrc="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3d4aWtwcXhqcjJ6M2tkb2x2NDg4eWxlcTJmM2I0aHJmMWN0NnZkbiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/13HgwGsXF0aiGY/giphy.gif"
        variant="soft"
      />

      <CaseSection
        title="Dashboard de pedidos en tiempo real"
        description={(
          <div className="grid sm:grid-cols-2 gap-8 max-w-5xl">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#7546ed] text-white flex items-center justify-center"><ShoppingCart className="w-5 h-5" /></div>
              <div>
                <h4 className="text-xl font-bold text-inherit">Cantidad de pedidos</h4>
                <p className="mt-1 text-base">Conteo actualizado de pedidos nuevos, en proceso y completados para priorizar el trabajo.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#12173b] text-white flex items-center justify-center"><DollarSign className="w-5 h-5" /></div>
              <div>
                <h4 className="text-xl font-bold text-inherit">Total de dinero movido</h4>
                <p className="mt-1 text-base">Sumatoria por período con filtros por estado y método de pago para seguimiento financiero.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#6a3fe0] text-white flex items-center justify-center"><BarChart3 className="w-5 h-5" /></div>
              <div>
                <h4 className="text-xl font-bold text-inherit">KPIs y tendencias</h4>
                <p className="mt-1 text-base">Gráficas de conversión, ticket promedio y tiempos de ciclo para detectar cuellos de botella.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#b1a9e5] text-[#12173b] flex items-center justify-center"><History className="w-5 h-5" /></div>
              <div>
                <h4 className="text-xl font-bold text-inherit">Historial de pedidos</h4>
                <p className="mt-1 text-base">Timeline de eventos con auditoría y búsqueda por cliente, fecha, monto o estado.</p>
              </div>
            </div>
          </div>
        )}
        mediaSrc="/videos/flujo-optimizado.mp4"
        mediaType="video"
        layout="stacked"
        reverse
        variant="dark"
        titleAboveMedia
      />

      <CaseSection
        title="Automatizaciones y roles"
        description={(
          <>
            <p>
              Reducimos tareas repetitivas con notificaciones, recordatorios y asignaciones automáticas. Configuramos roles y permisos finos para seguridad.
            </p>
            <ul className="mt-4 list-disc pl-5">
              <li>Recordatorios por correo al vencer plazos.</li>
              <li>Asignación automática según tipo y prioridad.</li>
              <li>Exportación y reportes listos para compartir.</li>
            </ul>
          </>
        )}
        mediaSrc="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2hhZ2o3c2d0d2lybDV6bHExYWV4cHR4cGUzMGJqNHJ5NzJ4b3J0dCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oEjI6SIIHBdRxXI40/giphy.gif"
        variant="light"
      />

      <CaseSection
        title="Resultados medibles"
        description={(
          <>
            <p>
              Con la nueva plataforma, el equipo trabaja con menos fricción y más visibilidad.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              {[
                { label: 'Tiempo ahorrado', value: '−45%' },
                { label: 'Productividad', value: '+30%' },
                { label: 'Errores de registro', value: '−60%' },
              ].map(m => (
                <div key={m.label} className="rounded-xl border border-[#e8e6ff] bg-white/90 p-4">
                  <div className="text-sm text-[#7546ed] font-semibold">{m.label}</div>
                  <div className="text-2xl font-bold text-[#12173b]">{m.value}</div>
                </div>
              ))}
            </div>
          </>
        )}
        mediaSrc="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWQ2eHZoNjhnbG90b2ZqN2w5eHpmZ3JkbXQ4dHg0M2ZmcDVpZ2Y5NiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xT9DPpf0zTqRASyzTi/giphy.gif"
        reverse
        variant="soft"
      />

      {/* CTA final */}
      <section className="py-20 bg-gradient-to-br from-[#4f1edc] via-[#6a3fe0] to-[#dc89ff] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl md:text-4xl font-bold font-creato" data-animate>
            ¿Quieres un flujo de trabajo más ordenado y medible?
          </h3>
          <p className="mt-4 text-white/90 font-garet" data-animate>
            Te mostramos una demo adaptada a tu proceso.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 bg-white text-[#12173b] px-6 py-3 rounded-full mt-8 hover:bg-white/90 transition-colors" data-animate>
            Solicitar demo <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </main>
  );
};

export default CaseStudyWebApp;


