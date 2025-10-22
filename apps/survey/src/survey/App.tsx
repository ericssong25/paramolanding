import React, { useMemo, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

type Rating = 1|2|3|4|5|6|7|8|9|10;

type SurveyData = {
  customerService: Rating | null;
  customerServiceComment?: string;
  designQuality: Rating | null;
  designQualityComment?: string;
  monthlyFriction?: string;
  npsLikelihood: Rating | null;
  improvements?: string;
};

const initialData: SurveyData = {
  customerService: null,
  designQuality: null,
  npsLikelihood: null,
};

const StepIndicator: React.FC<{ step: number; total: number }> = ({ step, total }) => {
  const width = useMemo(() => `${Math.round((step / total) * 100)}%`, [step, total]);
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Paso {step} de {total}</span>
        <span>{width}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-[#7546ed] transition-all duration-500" style={{ width }} />
      </div>
    </div>
  );
};

const ScalePicker: React.FC<{
  label: string;
  value: Rating | null;
  onChange: (v: Rating) => void;
  showLowComment: boolean;
  lowCommentLabel: string;
  lowCommentValue?: string;
  onLowCommentChange: (v: string) => void;
}> = ({ label, value, onChange, showLowComment, lowCommentLabel, lowCommentValue, onLowCommentChange }) => {
  const current = value ?? 5 as Rating;
  const percent = ((current - 1) / 9) * 100;
  return (
    <div>
      <label className="block text-xl font-bold mb-6 font-creato text-gray-800 leading-relaxed">{label}</label>
      
      <div className="flex items-center justify-between mb-6 text-sm font-medium text-gray-500">
        <span className="text-red-500">Mala</span>
        <span className="text-green-500">Excelente</span>
      </div>
      
      <div className="relative py-8 select-none">
        {/* Tooltip */}
        <div 
          className="absolute -top-14 transform -translate-x-1/2 transition-all duration-300 ease-out z-10"
          style={{ left: `${percent}%` }}
        >
          <div className="bg-[#7546ed] text-white px-4 py-2 rounded-full text-lg font-bold shadow-xl border-2 border-white">
            {current}
          </div>
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#7546ed] mx-auto"></div>
        </div>
        
        {/* Passive dots for visual guidance */}
        <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-4 flex justify-between items-center pointer-events-none">
          {Array.from({ length: 11 }, (_, i) => (
            <div 
              key={i} 
              className="w-2 h-2 rounded-full bg-gray-300 opacity-60"
            />
          ))}
        </div>
        
        {/* Interactive purple slider track */}
        <div className="relative h-4 bg-gradient-to-r from-[#7546ed] to-[#dc89ff] rounded-full overflow-hidden shadow-lg border-2 border-white">
          <div 
            className="absolute top-0 right-0 h-full bg-gray-200 transition-all duration-300 ease-out" 
            style={{ width: `${100 - percent}%` }} 
          />
          
          {/* Active thumb - positioned over the slider */}
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-xl border-4 border-[#7546ed] transition-all duration-300 ease-out cursor-pointer hover:scale-110 z-20"
            style={{ left: `calc(${percent}% - 16px)` }}
          />
        </div>
        
        <input
          type="range"
          min={1}
          max={10}
          step={1}
          value={current}
          onChange={(e) => onChange(Number(e.target.value) as Rating)}
          className="slider absolute inset-0 w-full h-4 appearance-none bg-transparent cursor-pointer"
          aria-label={label}
        />
      </div>
      
      {showLowComment && (
        <div className="mt-6 animate-fadeInUp">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {lowCommentLabel} <span className="text-gray-500 font-normal">(opcional)</span>
          </label>
          <textarea
            value={lowCommentValue ?? ''}
            onChange={(e) => onLowCommentChange(e.target.value)}
            placeholder="Cuéntanos cómo podríamos mejorar..."
            rows={4}
            className="w-full rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#7546ed]/30 focus:border-[#7546ed] p-4 transition-all duration-300 ease-out resize-none font-garet text-gray-700 placeholder-gray-400"
          />
        </div>
      )}
    </div>
  );
};

const Card: React.FC<React.PropsWithChildren<{ title?: string }>> = ({ title, children }) => (
  <div className="bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 rounded-3xl border border-purple-100/50 shadow-xl backdrop-blur-sm p-8 md:p-10 animate-fadeInUp">
    {title && <h2 className="text-2xl font-bold mb-2 font-creato">{title}</h2>}
    {children}
  </div>
);

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const total = 5;
  const [data, setData] = useState<SurveyData>(initialData);
  const canNext = useMemo(() => {
    if (step === 1) return data.customerService !== null;
    if (step === 2) return data.designQuality !== null;
    if (step === 3) return true; // open question
    if (step === 4) return data.npsLikelihood !== null;
    return true;
  }, [step, data]);

  const next = () => setStep((s) => Math.min(total + 1, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = async () => {
    // Placeholder: submit to your backend/Supabase/Forms service
    // For now we just simulate a delay
    await new Promise((r) => setTimeout(r, 600));
    setStep(total + 1);
  };

  if (step === total + 1) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-3xl mx-auto px-4 pt-24 pb-16">
          <Card>
            <div className="flex flex-col items-center text-center py-10">
              <CheckCircle2 className="w-16 h-16 text-[#7546ed] mb-4" />
              <h1 className="text-3xl font-bold font-creato mb-2">¡Gracias por tu tiempo!</h1>
              <p className="text-gray-600 font-garet max-w-xl">Tu respuesta nos ayuda a mejorar nuestro servicio cada mes.</p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header minimal para mantener identidad */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-3">
              <img src="/logoheader.svg" className="h-8 w-8" alt="Páramo Creativo" />
              <span className="font-creato font-bold">Encuesta</span>
            </a>
            <span className="text-sm text-gray-500">Toma ~2 minutos</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pt-32 pb-16">
        <div className="mb-6">
          <StepIndicator step={step} total={total} />
        </div>

        <Card>
          {step === 1 && (
            <ScalePicker
              label="En una escala del 1 al 10, ¿Cómo calificaría la atención al cliente de nuestro equipo?"
              value={data.customerService}
              onChange={(v) => setData((d) => ({ ...d, customerService: v }))}
              showLowComment={(data.customerService ?? 10) <= 5}
              lowCommentLabel="Si tu calificación fue 5 o menos, ¿qué podemos mejorar?"
              lowCommentValue={data.customerServiceComment}
              onLowCommentChange={(v) => setData((d) => ({ ...d, customerServiceComment: v }))}
            />
          )}

          {step === 2 && (
            <ScalePicker
              label="Valoración del diseño y edición (calidad y creatividad) del 1 al 10"
              value={data.designQuality}
              onChange={(v) => setData((d) => ({ ...d, designQuality: v }))}
              showLowComment={(data.designQuality ?? 10) <= 5}
              lowCommentLabel="Si tu calificación fue 5 o menos, ¿qué podemos mejorar en diseño/edición?"
              lowCommentValue={data.designQualityComment}
              onLowCommentChange={(v) => setData((d) => ({ ...d, designQualityComment: v }))}
            />
          )}

          {step === 3 && (
            <div>
              <label className="block text-lg font-semibold mb-4 font-creato">¿Qué es lo que más te supuso un reto o punto de fricción este mes?</label>
              <textarea
                value={data.monthlyFriction ?? ''}
                onChange={(e) => setData((d) => ({ ...d, monthlyFriction: e.target.value }))}
                placeholder="Opcional"
                rows={5}
                className="w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#7546ed]/30 focus:border-[#7546ed] p-3"
              />
            </div>
          )}

          {step === 4 && (
            <ScalePicker
              label="En una escala del 1 al 10, ¿qué tan probable es que recomiendes nuestra agencia a un colega o amigo?"
              value={data.npsLikelihood}
              onChange={(v) => setData((d) => ({ ...d, npsLikelihood: v }))}
              showLowComment={false}
              lowCommentLabel=""
              onLowCommentChange={() => {}}
            />
          )}

          {step === 5 && (
            <div>
              <label className="block text-lg font-semibold mb-4 font-creato">¿Qué aspectos te gustaría mejorar o que tengamos en cuenta a futuro?</label>
              <textarea
                value={data.improvements ?? ''}
                onChange={(e) => setData((d) => ({ ...d, improvements: e.target.value }))}
                placeholder="Opcional"
                rows={5}
                className="w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#7546ed]/30 focus:border-[#7546ed] p-3"
              />
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={back}
              className="px-4 py-2 rounded-full border border-gray-200 text-gray-700 hover:text-[#7546ed] hover:border-[#7546ed] transition-colors disabled:opacity-50"
              disabled={step === 1}
            >
              Atrás
            </button>

            {step < total && (
              <button
                type="button"
                onClick={next}
                disabled={!canNext}
                className="px-6 py-2 rounded-full bg-[#7546ed] text-white hover:bg-[#12173b] transition-colors disabled:opacity-50"
              >
                Siguiente
              </button>
            )}

            {step === total && (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2 rounded-full bg-[#7546ed] text-white hover:bg-[#12173b] transition-colors"
              >
                Enviar
              </button>
            )}
          </div>
        </Card>
      </main>

      <footer className="py-8 text-center text-sm text-gray-500">
        © Páramo Creativo
      </footer>
    </div>
  );
};

export default App;


