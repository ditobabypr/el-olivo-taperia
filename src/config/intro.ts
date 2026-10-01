/**
 * Configuración de la animación de entrada. Todo lo que se quiera iterar está aquí.
 * Tiempos en ms, medidos desde el inicio de la intro.
 */
export const intro = {
  /**
   * Cuándo se muestra:
   *  'always'  → en cada carga (modo desarrollo / pruebas)
   *  'session' → una vez por pestaña/sesión del navegador (sessionStorage)
   *  'once'    → una sola vez por dispositivo (localStorage)
   *  'never'   → desactivada
   */
  mode: 'always' as 'always' | 'session' | 'once' | 'never',
  storageKey: 'olivo-intro-seen',
  /** Rutas donde NO se muestra (p. ej. ['/carta'] si el QR de mesa debe ir directo a la carta). */
  excludePaths: [] as string[],

  // ── timeline ──
  treeIn: 600,          // árbol: fade + scale 0.96 → 1
  moveDelay: 500,       // árbol: empieza a desplazarse a la izquierda
  moveDuration: 750,
  textDelay: 500,       // texto: empieza a revelarse desde detrás del árbol
  textDuration: 850,
  holdUntil: 1800,      // composición final visible hasta aquí
  fadeOut: 300,         // fundido hacia la landing (acaba en holdUntil + fadeOut)

  // ── composición ──
  easing: 'cubic-bezier(.45, .05, .2, 1)', // salida suave + desaceleración al llegar
  shiftScale: 1,        // 1 = el árbol arranca exactamente centrado en pantalla; 0.4 = desplazamiento corto
  textSlide: '-1.5em',  // cuánto "viene de atrás" el texto antes de asentarse
};
