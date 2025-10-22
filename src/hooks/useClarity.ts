import { useEffect } from 'react';

// Declarar el tipo para Clarity en el objeto window
declare global {
  interface Window {
    clarity: (action: string, ...args: any[]) => void;
  }
}

interface ClarityConfig {
  projectId: string;
  enabled?: boolean;
}

export const useClarity = (config: ClarityConfig) => {
  const { projectId, enabled = true } = config;

  useEffect(() => {
    if (!enabled || !projectId) return;

    // Verificar si Clarity ya está cargado
    if (typeof window !== 'undefined' && window.clarity) {
      // Clarity ya está disponible, podemos usarlo inmediatamente
      console.log('Microsoft Clarity initialized');
      return;
    }

    // Si Clarity no está disponible, esperar a que se cargue
    let attempts = 0;
    const maxAttempts = 50; // 5 segundos máximo
    
    const checkClarity = () => {
      attempts++;
      
      if (window.clarity) {
        // Clarity está listo
        console.log('Microsoft Clarity initialized');
      } else if (attempts < maxAttempts) {
        // Reintentar en 100ms
        setTimeout(checkClarity, 100);
      } else {
        // Clarity no se pudo cargar (probablemente bloqueado por adblocker)
        console.warn('Microsoft Clarity could not be loaded. This might be due to an ad blocker.');
      }
    };

    // Iniciar verificación después de un breve delay
    setTimeout(checkClarity, 100);
  }, [projectId, enabled]);

  // Función para trackear eventos personalizados
  const trackEvent = (eventName: string, data?: any) => {
    if (typeof window !== 'undefined' && window.clarity) {
      window.clarity('event', eventName, data);
    }
  };

  // Función para trackear conversiones
  const trackConversion = (conversionName: string, value?: number) => {
    if (typeof window !== 'undefined' && window.clarity) {
      window.clarity('event', conversionName, value);
    }
  };

  // Función para identificar usuarios
  const identifyUser = (userId: string, sessionId?: string, pageId?: string, friendlyName?: string) => {
    if (typeof window !== 'undefined' && window.clarity) {
      window.clarity('identify', userId, sessionId, pageId, friendlyName);
    }
  };

  // Función para setear tags personalizados
  const setCustomTag = (key: string, value: string) => {
    if (typeof window !== 'undefined' && window.clarity) {
      window.clarity('set', key, value);
    }
  };

  return {
    trackEvent,
    trackConversion,
    identifyUser,
    setCustomTag,
    isReady: typeof window !== 'undefined' && !!window.clarity
  };
};
