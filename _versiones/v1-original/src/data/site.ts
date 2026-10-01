/**
 * Contenido del sitio. TODO lo marcado como `provisional` debe confirmarlo el cliente.
 * Cambia aquí textos, datos y enlaces: los componentes solo pintan.
 */
export const site = {
  name: 'El Olivo Tapería',
  short: 'El Olivo',
  city: 'Nerja · Málaga',
  title: 'El Olivo Tapería | Tapas en Nerja',
  description:
    'El Olivo Tapería en Nerja. Tapas, cocina mediterránea y una experiencia gastronómica para compartir. Consulta nuestra carta y visítanos.',
  address: { street: 'C. Fray Junípero Serra', postal: '29780', city: 'Nerja', region: 'Málaga', country: 'ES' },
  phone: '640 57 14 56',
  phoneHref: 'tel:+34640571456',
  // PROVISIONAL: sustituir por el enlace definitivo de Google Maps
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=El+Olivo+Taper%C3%ADa+Calle+Fray+Jun%C3%ADpero+Serra+Nerja',
  // PROVISIONAL: sustituir por el enlace definitivo a las reseñas de Google
  reviewsUrl: '#resenas',
  instagramUrl: '#', // PROVISIONAL
  rating: { value: '4,8', count: '+150' }, // PROVISIONAL
  hours: {
    provisional: true,
    open: { days: 'Miércoles — Domingo', slots: ['12:30 — 16:30', '20:00 — 00:00'] },
    closed: { days: 'Lunes — Martes', label: 'Cerrado' },
  },
};

export const award = {
  place: 'Segundo premio',
  number: '02',
  event: 'XII Ruta de la Tapa de Nerja · 2026',
  dish: ['Rollito de merluza', 'relleno de langostino', 'en salsa de puerros'],
  kicker: 'Un reconocimiento que sabe a Nerja.',
  text: 'Nuestra tapa fue una de las más votadas en la ruta que cada año reúne a Nerja alrededor de la mesa.', // PROVISIONAL
};

export const pillars = [
  { title: 'Tapas', text: 'Pequeños bocados para descubrir y compartir.' },
  { title: 'Mediterráneo', text: 'Producto, sabor y cocina cercana.' },
  { title: 'Para compartir', text: 'Platos pensados para poner en el centro.' },
  { title: 'Sin prisas', text: 'Porque una buena mesa también se disfruta con tiempo.' },
];

export const nav = [
  { label: 'Inicio', href: '/' },
  { label: 'Carta', href: '/carta' },
  { label: 'El Olivo', href: '/#el-olivo' },
  { label: 'Cómo llegar', href: '/#ven-a-vernos' },
];
