# Imágenes del Equipo - Páramo Creativo

## Archivos necesarios

Reemplaza los siguientes archivos con las imágenes reales del equipo:

### Gabriel Delgado (Project Manager)
- `gabo.webp` - Formato WebP optimizado (recomendado)
- `gabo.jpg` - Formato JPG como respaldo

### Gabriela Delgado (Graphic Designer)  
- `gaby.webp` - Formato WebP optimizado (recomendado)
- `gaby.jpg` - Formato JPG como respaldo

### Ericsson Giannangeli (Developer)
- `eric.webp` - Formato WebP optimizado (recomendado)
- `eric.jpg` - Formato JPG como respaldo

## Especificaciones recomendadas

### Tamaño y formato
- **Resolución**: 400x400 píxeles (cuadrada)
- **Formato principal**: WebP (mejor compresión)
- **Formato respaldo**: JPG (compatibilidad universal)
- **Calidad**: 80-85% (balance entre calidad y tamaño)

### Optimización
- **Tamaño máximo**: 50KB por imagen
- **Compresión**: Optimizada para web
- **Fondo**: Preferiblemente transparente, blanco o degradado sutil
- **Estilo**: Profesional, con buena iluminación
- **Contraste**: Asegurar que la persona se destaque del fondo

### Herramientas recomendadas
- **Online**: TinyPNG, Squoosh.app, ImageOptim
- **Desktop**: ImageOptim (Mac), FileOptimizer (Windows)
- **Photoshop**: Exportar como WebP con calidad 80-85%
- **Remoción de fondo**: Remove.bg, Photoshop, Canva Pro

## Estructura de archivos
```
public/images/team/
├── gabo.webp     # Gabriel Delgado (WebP)
├── gabo.jpg      # Gabriel Delgado (JPG respaldo)
├── gaby.webp     # Gabriela Delgado (WebP)
├── gaby.jpg      # Gabriela Delgado (JPG respaldo)
├── eric.webp     # Ericsson Giannangeli (WebP)
├── eric.jpg      # Ericsson Giannangeli (JPG respaldo)
└── README.md     # Este archivo
```

## Notas técnicas
- El código está configurado para usar WebP primero
- Si WebP falla, automáticamente usa JPG
- Si ambas fallan, muestra las iniciales como fallback
- Las imágenes se muestran con `object-cover` para mantener proporciones
- Se aplican filtros de contraste y brillo para mejorar la visibilidad
- Overlay sutil para mejorar el contraste con fondos ocupados
