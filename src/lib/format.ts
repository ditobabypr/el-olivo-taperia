/**
 * Formato de precios. ÚNICO sitio donde se decide cómo se escribe un precio.
 * Se usa en el servidor (carta) y en el navegador (Mi selección).
 * Los precios no se traducen: se muestran igual en las tres cartas ("8,50 €"), como en la carta física.
 */
export function formatPrice(n: number): string {
  return `${n.toFixed(2).replace('.', ',')} €`;
}

/** Suma segura en céntimos para evitar errores de coma flotante (0,1 + 0,2). */
export function sumCents(values: number[]): number {
  return values.reduce((acc, v) => acc + Math.round(v * 100), 0) / 100;
}
