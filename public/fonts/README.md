# Fuentes Personalizadas - Creato Display y Garet

## Archivos necesarios

### 1. Coloca los archivos de fuentes aquí:
```
public/fonts/
├── CreatoDisplay-Regular.woff2
├── CreatoDisplay-Medium.woff2
├── CreatoDisplay-Bold.woff2
├── Garet-Book.woff2
└── Garet-Heavy.woff2
```

### 2. Formatos recomendados:
- **WOFF2**: Mejor compresión, más rápido
- **WOFF**: Buena compatibilidad
- **TTF**: Compatibilidad universal

### 3. Configuración ya implementada:
Las fuentes ya están configuradas en `src/index.css` con:
- **Creato Display**: Para títulos y elementos destacados (`.font-creato`)
- **Garet**: Para texto y contenido (`.font-garet`)

### 4. Uso en el código:
```css
/* Para títulos */
.font-creato {
  font-family: 'Creato Display', serif;
}

/* Para texto */
.font-garet {
  font-family: 'Garet', sans-serif;
}
```

### 5. Pesos disponibles:
- **Book** (400/500): Para texto normal y semi-bold
- **Heavy** (700): Para títulos y elementos destacados
