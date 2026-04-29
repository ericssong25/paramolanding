import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onComplete, 
  message = "Estamos preparando todo para que lo visualices..." 
}) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animación de entrada
    tl.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    )
    .fromTo(textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4 },
      "-=0.2"
    )
    .fromTo(progressRef.current,
      { opacity: 0, scaleX: 0 },
      { opacity: 1, scaleX: 1, duration: 0.5, ease: "power2.out" },
      "-=0.2"
    );

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    // Simular carga progresiva de assets
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15 + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          // Animación de salida
          setTimeout(() => {
            gsap.to(containerRef.current, {
              opacity: 0,
              duration: 0.3,
              onComplete: () => {
                setIsLoading(false);
                onComplete();
              }
            });
          }, 200);
          return 100;
        }
        return Math.min(newProgress, 95);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    // Animar la barra de progreso
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX: progress / 100,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [progress]);

  if (!isLoading) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
    >
      <div className="max-w-md w-full px-6 text-center">
        <div ref={textRef} className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#7546ed] to-[#dc89ff] mb-6">
            <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-2xl font-bold text-[#12173b] font-creato mb-3">
            Preparando tu experiencia
          </h2>
          <p className="text-gray-600 font-garet">
            {message}
          </p>
        </div>
        
        <div className="relative">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              ref={progressRef}
              className="h-full bg-gradient-to-r from-[#7546ed] to-[#dc89ff] rounded-full transform origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
          <div className="mt-3 text-sm text-gray-500 font-garet">
            {Math.round(progress)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
