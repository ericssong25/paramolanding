# Configuración de Favicons para Google

## Archivos necesarios para que Google reconozca tu logo

Para que tu logo aparezca en los resultados de Google, necesitas crear los siguientes archivos en la carpeta `public/`:

### 1. Favicons básicos (ya tienes favicon.svg)
- ✅ `favicon.svg` - Ya existe
- ⏳ `favicon-16x16.png` - 16x16 píxeles
- ⏳ `favicon-32x32.png` - 32x32 píxeles

### 2. Iconos para Apple
- ⏳ `apple-touch-icon.png` - 180x180 píxeles

### 3. Iconos para Android
- ⏳ `android-chrome-192x192.png` - 192x192 píxeles
- ⏳ `android-chrome-512x512.png` - 512x512 píxeles

### 4. Imagen para redes sociales
- ⏳ `og-image.jpg` - 1200x630 píxeles (para Facebook, Twitter, etc.)

## Cómo generar estos archivos

### Opción 1: Herramientas online
1. **Favicon.io** (https://favicon.io/) - Sube tu logo y genera todos los tamaños
2. **RealFaviconGenerator** (https://realfavicongenerator.net/) - Más opciones avanzadas

### Opción 2: Photoshop/Canva
1. Crea un cuadrado de 512x512 píxeles
2. Coloca tu logo centrado
3. Exporta en los diferentes tamaños requeridos

### Opción 3: Usar tu logo actual
Si ya tienes el archivo `logoheader.svg`, puedes:
1. Convertirlo a PNG en los tamaños necesarios
2. Asegurarte de que se vea bien en tamaños pequeños

## Especificaciones técnicas

### Favicons
- **Formato**: PNG (mejor compatibilidad)
- **Fondo**: Transparente o blanco
- **Contenido**: Tu logo centrado
- **Calidad**: Alta resolución

### OG Image (para redes sociales)
- **Tamaño**: 1200x630 píxeles
- **Formato**: JPG o PNG
- **Contenido**: Logo + texto "Páramo Creativo - Agencia de marketing"
- **Diseño**: Atractivo para compartir en redes sociales

## Verificación

Después de subir los archivos:
1. Espera 24-48 horas para que Google los indexe
2. Usa Google Search Console para verificar
3. Prueba con herramientas como:
   - https://developers.google.com/speed/pagespeed/insights/
   - https://search.google.com/test/rich-results

## Notas importantes

- Los favicons deben ser claros y reconocibles en tamaños pequeños
- El color principal debe ser consistente con tu marca
- Asegúrate de que el logo se vea bien en fondo blanco y oscuro
- Google puede tardar varios días en mostrar el favicon en los resultados
