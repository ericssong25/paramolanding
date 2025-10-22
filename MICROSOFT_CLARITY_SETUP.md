# Configuración de Microsoft Clarity

Este proyecto está configurado para usar Microsoft Clarity para análisis de comportamiento de usuarios.

## Pasos para completar la configuración

### 1. Obtener el Project ID de Microsoft Clarity

1. Ve a [Microsoft Clarity](https://clarity.microsoft.com/)
2. Inicia sesión con tu cuenta de Microsoft
3. Crea un nuevo proyecto o selecciona uno existente
4. Copia el **Project ID** que aparece en la configuración

### 2. Actualizar la configuración

Reemplaza `TU_PROJECT_ID_AQUI` en los siguientes archivos con tu Project ID real:

#### Archivo: `index.html`
```html
<!-- Microsoft Clarity -->
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "TU_PROJECT_ID_AQUI");
</script>
```

#### Archivo: `src/config/clarity.ts`
```typescript
export const CLARITY_CONFIG = {
  PROJECT_ID: 'TU_PROJECT_ID_AQUI', // ← Reemplaza aquí
  // ... resto de la configuración
};
```

### 3. Verificar la implementación

Una vez actualizado el Project ID:

1. Ejecuta el proyecto: `npm run dev`
2. Abre las herramientas de desarrollador (F12)
3. Ve a la pestaña "Console"
4. Deberías ver el mensaje: "Microsoft Clarity initialized"
5. Ve a la pestaña "Network" y busca requests a `clarity.ms`

### 4. Eventos que se trackean automáticamente

El proyecto está configurado para trackear:

- **Vista de página**: Cuando se carga la página principal
- **Envío de formulario de contacto**: Cuando los usuarios envían el formulario
- **Clic en WhatsApp**: Cuando los usuarios hacen clic en el botón de WhatsApp
- **Errores de formulario**: Cuando hay errores al enviar el formulario

### 5. Personalizar eventos adicionales

Puedes agregar más eventos usando el hook `useClarity` en cualquier componente:

```typescript
import { useClarity } from '../hooks/useClarity';
import { getClarityConfig, CLARITY_CONFIG } from '../config/clarity';

const MiComponente = () => {
  const { trackEvent, trackConversion } = useClarity(getClarityConfig());
  
  const handleClick = () => {
    trackEvent(CLARITY_CONFIG.EVENTS.CTA_CLICK, {
      button: 'mi_boton',
      section: 'hero'
    });
  };
  
  return <button onClick={handleClick}>Mi Botón</button>;
};
```

### 6. Configuración de desarrollo vs producción

Por defecto, Clarity está habilitado en producción. Para deshabilitarlo en desarrollo, modifica `src/config/clarity.ts`:

```typescript
ENABLED: process.env.NODE_ENV === 'production', // Solo en producción
```

## Verificación en Microsoft Clarity

Después de desplegar tu sitio:

1. Ve a tu dashboard de Microsoft Clarity
2. Selecciona tu proyecto
3. Deberías empezar a ver datos de usuarios en las siguientes 24-48 horas
4. Los eventos personalizados aparecerán en la sección "Custom Events"

## Troubleshooting

### Clarity no se inicializa
- Verifica que el Project ID sea correcto
- Asegúrate de que no haya errores de JavaScript en la consola
- Verifica que el script esté en el `<head>` del HTML

### No aparecen eventos personalizados
- Verifica que `window.clarity` esté disponible antes de llamar a `trackEvent`
- Usa `isReady` del hook para verificar que Clarity esté listo
- Revisa la consola para errores de JavaScript

### Datos no aparecen en el dashboard
- Los datos pueden tardar hasta 48 horas en aparecer
- Verifica que el sitio esté en producción (no localhost)
- Asegúrate de que el Project ID sea correcto
