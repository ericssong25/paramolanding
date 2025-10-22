// Configuración de Microsoft Clarity
export const CLARITY_CONFIG = {
  // Project ID de Microsoft Clarity
  PROJECT_ID: 'ttyi2fszne',
  
  // Habilitar/deshabilitar Clarity (útil para desarrollo)
  ENABLED: process.env.NODE_ENV === 'production' || true, // Cambiar a false para deshabilitar en desarrollo
  
  // Configuración de eventos personalizados
  EVENTS: {
    PAGE_VIEW: 'page_view',
    FORM_SUBMISSION: 'form_submission',
    WHATSAPP_CLICK: 'whatsapp_click',
    CTA_CLICK: 'cta_click',
    SERVICE_VIEW: 'service_view',
    PORTFOLIO_VIEW: 'portfolio_view'
  },
  
  // Configuración de conversiones
  CONVERSIONS: {
    CONTACT_FORM: 'contact_form_submitted',
    WHATSAPP_CONTACT: 'whatsapp_contact',
    CTA_CONVERSION: 'cta_conversion'
  }
} as const;

// Función helper para obtener la configuración
export const getClarityConfig = () => ({
  projectId: CLARITY_CONFIG.PROJECT_ID,
  enabled: CLARITY_CONFIG.ENABLED
});
