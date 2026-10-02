/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  CARTA DE EL OLIVO TAPERÍA  ·  única fuente de datos
 * ═══════════════════════════════════════════════════════════════════════════
 *  Aquí viven TODOS los platos, precios, traducciones y categorías.
 *  La interfaz (src/components/carta, src/pages/carta) no contiene ningún plato ni precio.
 *
 *  CÓMO MODIFICAR LA CARTA
 *  ───────────────────────
 *  1. CAMBIAR UN PRECIO
 *     Busca el plato por su id (p. ej. id: 'tosta-salmon') y cambia el número:
 *         pricing: { type: 'single', price: 8.5 }   →   price: 9
 *     Los precios son NÚMEROS (8.5, no "8,50 €"): la web los muestra como "8,50 €".
 *     Se actualiza solo en las tres cartas, en "Mi selección" y en el total.
 *
 *  2. AÑADIR UN PLATO
 *     Copia un plato parecido dentro de `dishes`, cambia el id (debe ser único) y rellena:
 *       category      → id de una categoría de `categories` (más abajo)
 *       subcategory   → (opcional) id de una subcategoría de `subcategories`
 *       order         → posición dentro de su categoría (1, 2, 3…)
 *       translations  → name (obligatorio) y description (opcional) en es, en y de
 *       pricing       → uno de estos tres:
 *                         { type: 'single', price: 8.5 }
 *                         { type: 'sizes', half: 5.5, full: 7 }      (½ ración y ración)
 *                         { type: 'consult' }                         (precio "Consultar")
 *       selectable    → (opcional, por defecto true) false = sin botón [+]
 *       image         → (opcional) { src: '/images/plato.jpg', alt: '…' }
 *     Aparece solo en /carta/es, /carta/en y /carta/de, sin tocar ningún componente.
 *
 *  3. ELIMINAR UN PLATO
 *     Borra su bloque `{ id: '…', … },` de `dishes`. Nada más.
 *
 *  4. CAMBIAR UNA TRADUCCIÓN
 *     Edita `name` o `description` dentro de `translations` (es / en / de) del plato.
 *     Los textos de la interfaz (botones, avisos…) están en src/data/ui.ts.
 *
 *  5. CAMBIAR / AÑADIR UNA CATEGORÍA
 *     Edita `categories`: `order` define el orden, `translations` el nombre completo (title)
 *     y el nombre corto del menú de navegación (short). Para añadir una, copia un bloque
 *     con un id nuevo y úsalo en el `category` de los platos. Para ocultar una, bórrala
 *     (y mueve o borra sus platos: la validación avisa si queda alguno sin categoría).
 *     Foto de cabecera de la sección: `image: { src, alt }` (si no hay, se ve un placeholder).
 *
 *  6. AÑADIR UNA SUBCATEGORÍA (p. ej. Bocadillos dentro de "Entre panes")
 *     Añade un bloque a `subcategories` con `category` y `order`, y pon su id en el
 *     `subcategory` de los platos.
 *
 *  Si algo está mal (id repetido, categoría inexistente, precio no numérico, falta una
 *  traducción…) el proyecto NO compila y el error indica qué plato revisar.
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const LANGS = ['es', 'en', 'de'] as const;
export type Lang = (typeof LANGS)[number];

export type Pricing =
  | { type: 'single'; price: number }
  | { type: 'sizes'; half: number; full: number }
  | { type: 'consult' };

export interface Translation { name: string; description?: string }
export interface MenuImage { src?: string; alt?: string }

export interface Dish {
  id: string;
  category: string;
  subcategory?: string;
  order: number;
  translations: Record<Lang, Translation>;
  pricing: Pricing;
  selectable?: boolean; // por defecto true
  image?: MenuImage;
}

export interface Category {
  id: string;
  order: number;
  translations: Record<Lang, { title: string; short: string }>;
  image?: MenuImage;
}

export interface Subcategory {
  id: string;
  category: string;
  order: number;
  translations: Record<Lang, string>;
}

/* ─────────────────────────────── CATEGORÍAS ─────────────────────────────── */

export const categories: Category[] = [
  {
    id: 'tapas-extras', order: 1,
    translations: {
      es: { title: 'Tapas extras', short: 'Tapas extras' },
      en: { title: 'Extra tapas', short: 'Extra tapas' },
      de: { title: 'Extra-Tapas', short: 'Extra-Tapas' },
    },
  },
  {
    id: 'frescas', order: 2,
    translations: {
      es: { title: 'Frescas y con carácter', short: 'Frescas' },
      en: { title: 'Fresh with character', short: 'Fresh' },
      de: { title: 'Frisch und mit Charakter', short: 'Frisch' },
    },
  },
  {
    id: 'entre-panes', order: 3,
    translations: {
      es: { title: 'Entre panes y tentaciones', short: 'Entre panes' },
      en: { title: 'Between breads and temptations', short: 'Breads' },
      de: { title: 'Zwischen Broten und Versuchungen', short: 'Brote' },
    },
  },
  {
    id: 'solo-para-ti', order: 4,
    translations: {
      es: { title: 'Solo para ti', short: 'Solo para ti' },
      en: { title: 'Just for you', short: 'Just for you' },
      de: { title: 'Nur für dich', short: 'Nur für dich' },
    },
  },
  {
    id: 'aqui-se-comparte', order: 5,
    translations: {
      es: { title: 'Aquí se comparte', short: 'Aquí se comparte' },
      en: { title: 'Made for sharing', short: 'To share' },
      de: { title: 'Zum Teilen', short: 'Zum Teilen' },
    },
  },
  {
    id: 'dulce-pecado', order: 6,
    translations: {
      es: { title: 'Dulce pecado', short: 'Dulce pecado' },
      en: { title: 'Sweet sin', short: 'Sweet sin' },
      de: { title: 'Süße Sünde', short: 'Süße Sünde' },
    },
  },
];

export const subcategories: Subcategory[] = [
  { id: 'tostas', category: 'entre-panes', order: 1, translations: { es: 'Tostas', en: 'Toasts', de: 'Toasts' } },
  { id: 'hamburguesas', category: 'entre-panes', order: 2, translations: { es: 'Hamburguesas', en: 'Burgers', de: 'Burger' } },
  { id: 'sandwiches', category: 'entre-panes', order: 3, translations: { es: 'Sandwiches', en: 'Sandwiches', de: 'Sandwiches' } },
];

/* ───────────────────────────────── PLATOS ───────────────────────────────── */

export const dishes: Dish[] = [
  /* ── TAPAS EXTRAS ── */
  { id: 'montadito-pata-asada', category: 'tapas-extras', order: 1,
    translations: {
      es: { name: 'Montadito de pata asada con pimiento asado y alioli' },
      en: { name: 'Roasted pork montadito with roasted pepper and alioli' },
      de: { name: 'Montadito mit Schweinebraten, gerösteter Paprika und Aioli' },
    },
    pricing: { type: 'single', price: 2.4 } },
  { id: 'montadito-filetillo', category: 'tapas-extras', order: 2,
    translations: {
      es: { name: 'Montadito de filetillo de cerdo al ajillo' },
      en: { name: 'Garlic pork fillet montadito' },
      de: { name: 'Montadito mit Schweinefilet in Knoblauch' },
    },
    pricing: { type: 'single', price: 2.5 } },
  { id: 'montadito-salmon', category: 'tapas-extras', order: 3,
    translations: {
      es: { name: 'Montadito de salmón con queso crema' },
      en: { name: 'Salmon montadito with cream cheese' },
      de: { name: 'Montadito mit Lachs und Frischkäse' },
    },
    pricing: { type: 'single', price: 2.8 } },
  { id: 'mini-burger-ternera', category: 'tapas-extras', order: 4,
    translations: { es: { name: 'Mini burger de ternera con queso' }, en: { name: 'Mini beef burger with cheese' }, de: { name: 'Mini-Burger vom Rind mit Käse' } },
    pricing: { type: 'single', price: 2.8 } },
  { id: 'taco-pepe', category: 'tapas-extras', order: 5,
    translations: {
      es: { name: 'Taco Pepe', description: 'Taco de maíz con pollo, verduras y sweet chili' },
      en: { name: 'Pepe Taco', description: 'Corn taco with chicken, vegetables and sweet chili' },
      de: { name: 'Taco Pepe', description: 'Maistaco mit Hähnchen, Gemüse und Sweet Chili' },
    },
    pricing: { type: 'single', price: 2.8 } },
  { id: 'pan-bao-bbq', category: 'tapas-extras', order: 6,
    translations: { es: { name: 'Pan Bao BBQ' }, en: { name: 'BBQ Bao bun' }, de: { name: 'Bao-Brötchen BBQ' } },
    pricing: { type: 'single', price: 2.8 } },
  { id: 'pan-bao-solomillo', category: 'tapas-extras', order: 7,
    translations: {
      es: { name: 'Pan Bao de solomillo de cerdo con compota de pera' },
      en: { name: 'Pork tenderloin Bao bun with pear compote' },
      de: { name: 'Bao-Brötchen mit Schweinefilet und Birnenkompott' },
    },
    pricing: { type: 'single', price: 2.8 } },
  { id: 'patatas-bravas-tapa', category: 'tapas-extras', order: 8,
    translations: { es: { name: 'Patatas bravas' }, en: { name: 'Patatas bravas' }, de: { name: 'Patatas bravas' } },
    pricing: { type: 'single', price: 2 } },
  { id: 'patatas-gratinadas-tapa', category: 'tapas-extras', order: 9,
    translations: {
      es: { name: 'Patatas gratinadas con bacon y queso' },
      en: { name: 'Gratin potatoes with bacon and cheese' },
      de: { name: 'Kartoffelgratin mit Speck und Käse' },
    },
    pricing: { type: 'single', price: 2.5 } },
  { id: 'gambas-pilpil-tapa', category: 'tapas-extras', order: 10,
    translations: {
      es: { name: 'Tapa de gambas al pil-pil' },
      en: { name: 'Pil-pil prawns tapa' },
      de: { name: 'Tapa Garnelen al pil-pil' },
    },
    pricing: { type: 'single', price: 2.8 } },
  { id: 'gambas-cocidas-tapa', category: 'tapas-extras', order: 11,
    translations: { es: { name: 'Tapa de gambas cocidas' }, en: { name: 'Boiled prawns tapa' }, de: { name: 'Tapa gekochte Garnelen' } },
    pricing: { type: 'single', price: 2 } },
  { id: 'gilda', category: 'tapas-extras', order: 12,
    translations: {
      es: { name: 'Gilda' },
      en: { name: 'Gilda', description: 'Anchovy, olive and pickled pepper skewer' },
      de: { name: 'Gilda', description: 'Spieß mit Sardelle, Olive und eingelegter Peperoni' },
    },
    pricing: { type: 'single', price: 2 } },
  { id: 'boquerones-vinagre-tapa', category: 'tapas-extras', order: 13,
    translations: { es: { name: 'Boquerones en vinagre' }, en: { name: 'Anchovies in vinegar' }, de: { name: 'Marinierte Sardellen (Boquerones)' } },
    pricing: { type: 'single', price: 2.5 } },
  { id: 'gazpacho', category: 'tapas-extras', order: 14,
    translations: { es: { name: 'Gazpacho (temporada)' }, en: { name: 'Gazpacho (seasonal)' }, de: { name: 'Gazpacho (saisonal)' } },
    pricing: { type: 'single', price: 3 } },

  /* ── FRESCAS Y CON CARÁCTER ── */
  { id: 'ensaladilla-rusa', category: 'frescas', order: 1,
    translations: {
      es: { name: 'Ensaladilla rusa' },
      en: { name: 'Russian salad' },
      de: { name: 'Russischer Salat' },
    },
    pricing: { type: 'single', price: 6.5 } },
  { id: 'ensalada-huerta', category: 'frescas', order: 2,
    translations: {
      es: { name: 'Ensalada de la huerta', description: 'Lechuga iceberg, tomate, atún, zanahoria, cebolla, remolacha, maíz y huevo' },
      en: { name: 'Garden salad', description: 'Iceberg lettuce, tomato, tuna, carrot, onion, beetroot, corn and egg' },
      de: { name: 'Gartensalat', description: 'Eisbergsalat, Tomate, Thunfisch, Karotte, Zwiebel, Rote Bete, Mais und Ei' },
    },
    pricing: { type: 'sizes', half: 5.5, full: 7 } },
  { id: 'ensalada-rulo-cabra', category: 'frescas', order: 3,
    translations: {
      es: { name: 'Ensalada rulo de cabra', description: 'Mezclum de lechugas, tomate rosa, nueces, rulo de queso de cabra y vinagreta' },
      en: { name: 'Goat cheese log salad', description: 'Mixed lettuce, pink tomato, walnuts, goat cheese log and vinaigrette' },
      de: { name: 'Salat mit Ziegenkäserolle', description: 'Gemischter Blattsalat, Rosatomate, Walnüsse, Ziegenkäserolle und Vinaigrette' },
    },
    pricing: { type: 'single', price: 12 } },
  { id: 'coctel-gambas', category: 'frescas', order: 4,
    translations: {
      es: { name: 'Cóctel de gambas', description: 'Lechuga iceberg, bocas de mar, aguacate, piña, gambas y salsa rosa' },
      en: { name: 'Prawn cocktail', description: 'Iceberg lettuce, seafood sticks, avocado, pineapple, prawns and cocktail sauce' },
      de: { name: 'Garnelencocktail', description: 'Eisbergsalat, Surimi-Stäbchen, Avocado, Ananas, Garnelen und Cocktailsauce' },
    },
    pricing: { type: 'single', price: 6.9 } },
  { id: 'ensalada-cesar', category: 'frescas', order: 5,
    translations: {
      es: { name: 'Ensalada César', description: 'Lechuga iceberg, pollo, picatostes, tomate, queso parmesano y salsa César' },
      en: { name: 'Caesar salad', description: 'Iceberg lettuce, chicken, croutons, tomato, Parmesan cheese and Caesar dressing' },
      de: { name: 'Caesar-Salat', description: 'Eisbergsalat, Hähnchen, Croutons, Tomate, Parmesan und Caesar-Dressing' },
    },
    pricing: { type: 'single', price: 12 } },

  /* ── ENTRE PANES Y TENTACIONES · Tostas ── */
  { id: 'tosta-tataki', category: 'entre-panes', subcategory: 'tostas', order: 1,
    translations: { es: { name: 'Tosta de tataki de ternera' }, en: { name: 'Beef tataki toast' }, de: { name: 'Toast mit Rinder-Tataki' } },
    pricing: { type: 'single', price: 12 } },
  { id: 'tosta-pata-asada', category: 'entre-panes', subcategory: 'tostas', order: 2,
    translations: {
      es: { name: 'Tosta de pata asada', description: 'Pata al ajillo, pimiento asado' },
      en: { name: 'Roasted pork leg toast', description: 'Garlic pork leg and roasted pepper' },
      de: { name: 'Toast mit Schweinebraten', description: 'Schweinekeule mit Knoblauch und gerösteter Paprika' },
    },
    pricing: { type: 'single', price: 9 } },
  { id: 'tosta-filetillo', category: 'entre-panes', subcategory: 'tostas', order: 3,
    translations: {
      es: { name: 'Tosta de filetillo al ajillo' },
      en: { name: 'Garlic pork fillet toast' },
      de: { name: 'Toast mit Schweinefilet in Knoblauch' },
    },
    pricing: { type: 'single', price: 8 } },
  { id: 'tosta-salmon', category: 'entre-panes', subcategory: 'tostas', order: 4,
    translations: {
      es: { name: 'Tosta de salmón', description: 'Salmón ahumado y crema de queso' },
      en: { name: 'Salmon toast', description: 'Smoked salmon and cream cheese' },
      de: { name: 'Lachs-Toast', description: 'Geräucherter Lachs und Frischkäse' },
    },
    pricing: { type: 'single', price: 8.5 } },
  { id: 'tostallon-pollo', category: 'entre-panes', subcategory: 'tostas', order: 5,
    translations: {
      es: { name: 'Tostallón de pollo', description: 'Pollo, queso crema, queso fundido y nueces' },
      en: { name: 'Chicken tostallón', description: 'Chicken, cream cheese, melted cheese and walnuts' },
      de: { name: 'Tostallón mit Hähnchen', description: 'Hähnchen, Frischkäse, geschmolzener Käse und Walnüsse' },
    },
    pricing: { type: 'single', price: 8.5 } },
  { id: 'tosta-rulo-cabra', category: 'entre-panes', subcategory: 'tostas', order: 6,
    translations: {
      es: { name: 'Tosta rulo de cabra', description: 'Queso de cabra, cebolla caramelizada, mayonesa trufada y salsa agridulce' },
      en: { name: 'Goat cheese toast', description: 'Goat cheese, caramelized onion, truffle mayo and sweet-and-sour sauce' },
      de: { name: 'Toast mit Ziegenkäse', description: 'Ziegenkäse, karamellisierte Zwiebeln, Trüffelmayonnaise und Süßsauer-Sauce' },
    },
    pricing: { type: 'single', price: 10 } },
  { id: 'tosta-pilpil', category: 'entre-panes', subcategory: 'tostas', order: 7,
    translations: {
      es: { name: 'Tosta pil-pil' },
      en: { name: 'Pil-pil prawn toast' },
      de: { name: 'Pil-pil-Garnelen-Toast' },
    },
    pricing: { type: 'single', price: 9.5 } },

  /* ── ENTRE PANES Y TENTACIONES · Hamburguesas ── */
  { id: 'hamburguesa-angus', category: 'entre-panes', subcategory: 'hamburguesas', order: 1,
    translations: {
      es: { name: 'Hamburguesa Angus', description: 'Carne de ternera Angus, mezclum de lechugas y tomate natural' },
      en: { name: 'Angus burger', description: 'Angus beef, mixed lettuce and fresh tomato' },
      de: { name: 'Angus-Burger', description: 'Angus-Rindfleisch, gemischter Blattsalat und frische Tomate' },
    },
    pricing: { type: 'single', price: 9.5 } },
  { id: 'hamburguesa-angus-xl', category: 'entre-panes', subcategory: 'hamburguesas', order: 2,
    translations: {
      es: { name: 'Hamburguesa Angus XL', description: 'Carne de ternera Angus, mezclum de lechugas, tomate natural, cebolla, huevo frito, bacon y rulo de queso de cabra' },
      en: { name: 'Angus XL burger', description: 'Angus beef, mixed lettuce, tomato, onion, fried egg, bacon and goat cheese' },
      de: { name: 'Angus-XL-Burger', description: 'Angus-Rindfleisch, gemischter Blattsalat, Tomate, Zwiebel, Spiegelei, Speck und Ziegenkäse' },
    },
    pricing: { type: 'single', price: 12.5 } },

  /* ── ENTRE PANES Y TENTACIONES · Sandwiches ── */
  { id: 'sandwich-club', category: 'entre-panes', subcategory: 'sandwiches', order: 1,
    translations: {
      es: { name: 'Sandwich Club', description: 'Pollo, bacon, huevo frito, lechuga, tomate y mayonesa' },
      en: { name: 'Club sandwich', description: 'Chicken, bacon, fried egg, lettuce, tomato and mayonnaise' },
      de: { name: 'Club Sandwich', description: 'Hähnchen, Speck, Spiegelei, Salat, Tomate und Mayonnaise' },
    },
    pricing: { type: 'single', price: 10 } },
  { id: 'sandwich-atun', category: 'entre-panes', subcategory: 'sandwiches', order: 2,
    translations: {
      es: { name: 'Sandwich de atún', description: 'Atún, huevo cocido, lechuga y tomate' },
      en: { name: 'Tuna sandwich', description: 'Tuna, boiled egg, lettuce and tomato' },
      de: { name: 'Thunfisch-Sandwich', description: 'Thunfisch, gekochtes Ei, Salat und Tomate' },
    },
    pricing: { type: 'single', price: 7 } },

  /* ── SOLO PARA TI ── */
  { id: 'wok-pollo', category: 'solo-para-ti', order: 1,
    translations: { es: { name: 'Wok de pollo' }, en: { name: 'Chicken wok' }, de: { name: 'Wok mit Hähnchen' } },
    pricing: { type: 'single', price: 11 } },
  { id: 'wok-langostino', category: 'solo-para-ti', order: 2,
    translations: {
      es: { name: 'Wok de langostino' },
      en: { name: 'Prawn wok' },
      de: { name: 'Wok mit Garnelen' },
    },
    pricing: { type: 'single', price: 11 } },
  { id: 'jibia-plancha', category: 'solo-para-ti', order: 3,
    translations: { es: { name: 'Jibia a la plancha' }, en: { name: 'Grilled cuttlefish' }, de: { name: 'Gegrillte Sepia' } },
    pricing: { type: 'single', price: 11.4 } },
  { id: 'rosada-plancha', category: 'solo-para-ti', order: 4,
    translations: {
      es: { name: 'Rosada a la plancha' },
      en: { name: 'Grilled hake' },
      de: { name: 'Gegrillter Seehecht' },
    },
    pricing: { type: 'single', price: 11.4 } },
  { id: 'lomo-bacalao-ajillo', category: 'solo-para-ti', order: 5,
    translations: {
      es: { name: 'Lomo de bacalao al ajillo' },
      en: { name: 'Cod loin with garlic' },
      de: { name: 'Kabeljaufilet mit Knoblauch' },
    },
    pricing: { type: 'single', price: 15.5 } },
  { id: 'flamenquin-cerdo', category: 'solo-para-ti', order: 6,
    translations: { es: { name: 'Flamenquín de cerdo' }, en: { name: 'Pork flamenquín' }, de: { name: 'Schweine-Flamenquín' } },
    pricing: { type: 'single', price: 12 } },
  { id: 'nuggets-pollo', category: 'solo-para-ti', order: 7,
    translations: { es: { name: 'Nuggets de pollo caseros' }, en: { name: 'Homemade chicken nuggets' }, de: { name: 'Hausgemachte Hähnchen-Nuggets' } },
    pricing: { type: 'single', price: 9 } },
  { id: 'secreto-iberico', category: 'solo-para-ti', order: 8,
    translations: {
      es: { name: 'Secreto ibérico' },
      en: { name: 'Iberian pork "secreto"' },
      de: { name: 'Iberico-Secreto vom Schwein' },
    },
    pricing: { type: 'single', price: 17 } },
  { id: 'entrecot', category: 'solo-para-ti', order: 9,
    translations: {
      es: { name: 'Entrecot' },
      en: { name: 'Entrecôte steak' },
      de: { name: 'Entrecôte-Steak' },
    },
    pricing: { type: 'single', price: 22 } },
  { id: 'solomillo-ternera', category: 'solo-para-ti', order: 10,
    translations: { es: { name: 'Solomillo de ternera' }, en: { name: 'Beef tenderloin' }, de: { name: 'Rinderfilet' } },
    pricing: { type: 'single', price: 24 } },
  { id: 'pechuga-pollo', category: 'solo-para-ti', order: 11,
    translations: { es: { name: 'Pechuga de pollo' }, en: { name: 'Chicken breast' }, de: { name: 'Hähnchenbrust' } },
    pricing: { type: 'single', price: 11 } },
  { id: 'rabo-toro', category: 'solo-para-ti', order: 12,
    translations: {
      es: { name: 'Rabo de toro' },
      en: { name: 'Oxtail stew' },
      de: { name: 'Geschmorter Ochsenschwanz' },
    },
    pricing: { type: 'single', price: 18 } },
  { id: 'pez-espada-plancha', category: 'solo-para-ti', order: 13,
    translations: { es: { name: 'Pez espada a la plancha' }, en: { name: 'Grilled swordfish' }, de: { name: 'Gegrillter Schwertfisch' } },
    pricing: { type: 'consult' } },
  { id: 'lenguado-plancha', category: 'solo-para-ti', order: 14,
    translations: { es: { name: 'Lenguado a la plancha' }, en: { name: 'Grilled sole' }, de: { name: 'Gegrillte Seezunge' } },
    pricing: { type: 'consult' } },
  { id: 'calamar-plancha', category: 'solo-para-ti', order: 15,
    translations: { es: { name: 'Calamar a la plancha' }, en: { name: 'Grilled squid' }, de: { name: 'Gegrillter Kalmar' } },
    pricing: { type: 'consult' } },

  /* ── AQUÍ SE COMPARTE ── */
  { id: 'boquerones-vinagre-racion', category: 'aqui-se-comparte', order: 1,
    translations: { es: { name: 'Boquerones en vinagre' }, en: { name: 'Anchovies in vinegar' }, de: { name: 'Marinierte Sardellen (Boquerones)' } },
    pricing: { type: 'single', price: 7 } },
  { id: 'gambas-cocidas', category: 'aqui-se-comparte', order: 2,
    translations: { es: { name: 'Gambas cocidas' }, en: { name: 'Boiled prawns' }, de: { name: 'Gekochte Garnelen' } },
    pricing: { type: 'sizes', half: 8, full: 12 } },
  { id: 'gambas-pilpil', category: 'aqui-se-comparte', order: 3,
    translations: {
      es: { name: 'Gambas al pil-pil' },
      en: { name: 'Pil-pil prawns' },
      de: { name: 'Garnelen al pil-pil' },
    },
    pricing: { type: 'single', price: 12 } },
  { id: 'patatas-arrieras', category: 'aqui-se-comparte', order: 4,
    translations: {
      es: { name: 'Patatas arrieras', description: 'Huevo frito, patatas, pil-pil y alioli' },
      en: { name: 'Arrieras potatoes', description: 'Fried egg, potatoes, pil-pil sauce and alioli' },
      de: { name: 'Patatas arrieras', description: 'Spiegelei, Kartoffeln, Pil-pil-Sauce und Aioli' },
    },
    pricing: { type: 'single', price: 14 } },
  { id: 'patatas-bravas-racion', category: 'aqui-se-comparte', order: 5,
    translations: { es: { name: 'Patatas bravas' }, en: { name: 'Patatas bravas' }, de: { name: 'Patatas bravas' } },
    pricing: { type: 'single', price: 7 } },
  { id: 'patatas-gratinadas-racion', category: 'aqui-se-comparte', order: 6,
    translations: {
      es: { name: 'Patatas gratinadas con bacon y queso' },
      en: { name: 'Gratin potatoes with bacon and cheese' },
      de: { name: 'Kartoffelgratin mit Speck und Käse' },
    },
    pricing: { type: 'single', price: 10 } },
  { id: 'croquetas-puchero', category: 'aqui-se-comparte', order: 7,
    translations: {
      es: { name: 'Croquetas de puchero' },
      en: { name: 'Traditional stew croquettes' },
      de: { name: 'Traditionelle Eintopf-Kroketten' },
    },
    pricing: { type: 'single', price: 9 } },
  { id: 'croquetas-manzana-cebolla', category: 'aqui-se-comparte', order: 8,
    translations: {
      es: { name: 'Croquetas de manzana y cebolla caramelizada' },
      en: { name: 'Apple and caramelized onion croquettes' },
      de: { name: 'Kroketten mit Apfel und karamellisierten Zwiebeln' },
    },
    pricing: { type: 'single', price: 9 } },
  { id: 'boniatos-fritos', category: 'aqui-se-comparte', order: 9,
    translations: { es: { name: 'Boniatos fritos (temporada)' }, en: { name: 'Fried sweet potatoes (seasonal)' }, de: { name: 'Frittierte Süßkartoffeln (saisonal)' } },
    pricing: { type: 'single', price: 5.5 } },
  { id: 'nachos', category: 'aqui-se-comparte', order: 10,
    translations: { es: { name: 'Nachos con guacamole, pico de gallo y queso' }, en: { name: 'Nachos with guacamole, pico de gallo and cheese' }, de: { name: 'Nachos mit Guacamole, Pico de Gallo und Käse' } },
    pricing: { type: 'single', price: 8.5 } },
  { id: 'patatas-fritas', category: 'aqui-se-comparte', order: 11,
    translations: { es: { name: 'Patatas fritas' }, en: { name: 'French fries' }, de: { name: 'Pommes frites' } },
    pricing: { type: 'single', price: 5 } },
  { id: 'filetillos-ajillo', category: 'aqui-se-comparte', order: 12,
    translations: {
      es: { name: 'Filetillos al ajillo' },
      en: { name: 'Garlic pork fillets' },
      de: { name: 'Schweinefilets in Knoblauch' },
    },
    pricing: { type: 'single', price: 9 } },
  { id: 'pata-asada-jardinera', category: 'aqui-se-comparte', order: 13,
    translations: {
      es: { name: 'Pata asada en salsa jardinera' },
      en: { name: 'Roasted pork leg in garden sauce' },
      de: { name: 'Schweinekeule in Gartensauce (Jardinera)' },
    },
    pricing: { type: 'single', price: 9 } },
  { id: 'pulpo-gallega', category: 'aqui-se-comparte', order: 14,
    translations: { es: { name: 'Pulpo a la gallega' }, en: { name: 'Galician-style octopus' }, de: { name: 'Oktopus nach galicischer Art' } },
    pricing: { type: 'single', price: 14 } },
  { id: 'jamon', category: 'aqui-se-comparte', order: 15,
    translations: {
      es: { name: 'Jamón' },
      en: { name: 'Iberian ham' },
      de: { name: 'Iberischer Schinken' },
    },
    pricing: { type: 'consult' } },
  { id: 'queso', category: 'aqui-se-comparte', order: 16,
    translations: { es: { name: 'Queso' }, en: { name: 'Cheese' }, de: { name: 'Käse' } },
    pricing: { type: 'consult' } },

  /* ── DULCE PECADO ── */
  /* ⚠ La descripción de la tarta es INVENTADA (no figura en la carta física): confirmar con la clienta, también alérgenos. */
  { id: 'tarta-toblerone', category: 'dulce-pecado', order: 1,
    translations: {
      es: { name: 'Tarta de Toblerone', description: 'Tarta cremosa de Toblerone sobre base crujiente de galleta' },
      en: { name: 'Toblerone cake', description: 'Creamy Toblerone cake on a crunchy biscuit base' },
      de: { name: 'Toblerone-Torte', description: 'Cremige Toblerone-Torte auf knusprigem Keksboden' },
    },
    pricing: { type: 'single', price: 5 } },
];

/* ─────────────────────────────── VALIDACIÓN ───────────────────────────────
   Se ejecuta al compilar. Si hay un error, el proyecto no compila y el mensaje dice qué revisar. */
function validateMenu() {
  const errors: string[] = [];
  const catIds = new Set<string>();
  for (const c of categories) {
    if (catIds.has(c.id)) errors.push(`Categoría repetida: "${c.id}"`);
    catIds.add(c.id);
    if (!Number.isFinite(c.order)) errors.push(`Categoría "${c.id}": order no es un número`);
    for (const l of LANGS) {
      const t = c.translations?.[l];
      if (!t?.title || !t?.short) errors.push(`Categoría "${c.id}": falta title/short en "${l}"`);
    }
  }
  const subIds = new Map<string, string>();
  for (const s of subcategories) {
    if (subIds.has(s.id)) errors.push(`Subcategoría repetida: "${s.id}"`);
    subIds.set(s.id, s.category);
    if (!catIds.has(s.category)) errors.push(`Subcategoría "${s.id}": la categoría "${s.category}" no existe`);
    for (const l of LANGS) if (!s.translations?.[l]) errors.push(`Subcategoría "${s.id}": falta traducción "${l}"`);
  }
  const ids = new Set<string>();
  const isMoney = (n: unknown) => typeof n === 'number' && Number.isFinite(n) && n >= 0;
  for (const d of dishes) {
    const w = `Plato "${d.id}"`;
    if (!d.id || /[^a-z0-9-]/.test(d.id)) errors.push(`${w}: el id solo puede tener minúsculas, números y guiones`);
    if (ids.has(d.id)) errors.push(`${w}: id duplicado`);
    ids.add(d.id);
    if (!catIds.has(d.category)) errors.push(`${w}: la categoría "${d.category}" no existe`);
    if (d.subcategory) {
      if (!subIds.has(d.subcategory)) errors.push(`${w}: la subcategoría "${d.subcategory}" no existe`);
      else if (subIds.get(d.subcategory) !== d.category) errors.push(`${w}: la subcategoría "${d.subcategory}" no pertenece a "${d.category}"`);
    }
    if (!Number.isFinite(d.order)) errors.push(`${w}: order no es un número`);
    for (const l of LANGS) if (!d.translations?.[l]?.name?.trim()) errors.push(`${w}: falta el nombre en "${l}"`);
    const p = d.pricing as Pricing | undefined;
    if (!p) errors.push(`${w}: falta pricing`);
    else if (p.type === 'single') { if (!isMoney(p.price)) errors.push(`${w}: price debe ser un número (8.5, no "8,50 €")`); }
    else if (p.type === 'sizes') { if (!isMoney(p.half) || !isMoney(p.full)) errors.push(`${w}: sizes necesita half y full numéricos`); }
    else if (p.type !== 'consult') errors.push(`${w}: pricing.type desconocido ("${(p as { type: string }).type}")`);
  }
  if (errors.length) throw new Error(`\n\n[carta] Errores en src/data/menu.ts:\n - ${errors.join('\n - ')}\n`);
}
validateMenu();
