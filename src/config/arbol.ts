/**
 * Escena del olivo que crece (vídeo en el arco del hero). Todo lo ajustable está aquí.
 * Medidas del vídeo (854×480): el árbol final ocupa ≈49 % del ancho, centrado en x = 0.492, y va de y = 0.09 a 0.917.
 * Las posiciones usan "cqw" (1 cqw = 1 % del ANCHO del arco), así la composición escala igual en móvil y escritorio.
 */
export const arbol = {
  video: '/fotos/web/videoarbol.mp4',
  /** Último fotograma (WebP). Se usa con "reducir movimiento" o si el vídeo no puede reproducirse. */
  finalFrame: '/fotos/web/arbol-final.webp',
  alt: 'Un olivo que crece desde la tierra',

  // ── composición ──
  /** Ancho del vídeo en % del ancho del arco. Más = árbol más grande (160 → el árbol ocupa ≈78 % del arco). */
  scale: 160,
  /** Posición horizontal del centro del árbol dentro del vídeo (0–1). No tocar salvo que cambie el vídeo. */
  treeCenterX: 0.492,
  /** Distancia del borde superior del vídeo al borde superior del arco, en % del ancho del arco. Más = árbol más abajo. */
  top: 20,
  /** Opacidad final del árbol (1 = tal cual el vídeo). */
  opacity: 1,
  /** Fondo mate del arco (el vídeo se funde con él mediante "multiply"). */
  background: '#ece4cf',
  /** Intensidad del grano mate (0 = sin textura). */
  grain: 0.1,
  /** Difuminado de los bordes del vídeo, en % de su tamaño (evita cortes visibles). */
  edgeFade: 8,
  /** Sube el blanco del vídeo (≈ #f5f5f5) a 255 para que, al multiplicarse, el fondo coincida exacto con `background`. */
  whiteBoost: 1.045,

  // ── animación ──
  /** Espera (ms) tras acabar la intro de marca y entrar en pantalla antes de arrancar el crecimiento. */
  startDelay: 350,
  /** Fracción del arco que debe verse para arrancar. */
  threshold: 0.4,

  // ── frase ──
  phrase: { show: true, text: 'De la tierra a la mesa.', fadeIn: 900 },
};
