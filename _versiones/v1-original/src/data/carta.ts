/**
 * Datos de la carta. Para actualizarla basta con editar este archivo:
 * añade/elimina secciones o platos. El diseño se genera solo.
 * Todo lo que ves ahora son PLACEHOLDERS.
 */
export interface Plato {
  nombre: string;
  descripcion?: string;
  precio: string; // texto libre: "9,50", "Según mercado", "3,00 / 5,50"
  etiquetas?: string[]; // p. ej. ['Sin gluten', 'Vegetariano', 'Premiado']
}
export interface Seccion {
  id: string;
  titulo: string;
  nota?: string;
  platos: Plato[];
}

const ph = (n: number, extra: Partial<Plato> = {}): Plato => ({
  nombre: `[ Plato ${n} ]`,
  descripcion: 'Descripción del plato: ingredientes, elaboración, alérgenos…',
  precio: '0,00',
  ...extra,
});

export const carta: Seccion[] = [
  { id: 'tapas', titulo: 'Tapas', nota: 'Pequeños bocados para descubrir.', platos: [
      ph(1, { etiquetas: ['Premiado'], nombre: '[ Rollito de merluza · placeholder ]' }), ph(2), ph(3), ph(4),
  ]},
  { id: 'para-compartir', titulo: 'Para compartir', nota: 'Al centro de la mesa.', platos: [ph(1), ph(2), ph(3)] },
  { id: 'del-mar', titulo: 'Del mar', platos: [ph(1, { etiquetas: ['Sin gluten'] }), ph(2), ph(3)] },
  { id: 'carnes', titulo: 'Carnes', platos: [ph(1), ph(2), ph(3)] },
  { id: 'postres', titulo: 'Postres', platos: [ph(1), ph(2)] },
  { id: 'bebidas', titulo: 'Bebidas', nota: 'Vinos, cervezas, refrescos y cafés.', platos: [
      { nombre: '[ Bebida 1 ]', precio: '0,00' }, { nombre: '[ Bebida 2 ]', precio: '0,00' }, { nombre: '[ Bebida 3 ]', precio: '0,00' },
  ]},
];

export const cartaAviso = 'Carta provisional · Precios e IVA incluidos · Consulta alérgenos al personal.';
