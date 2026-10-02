/**
 * Textos de la INTERFAZ de la carta (botones, avisos, "Mi selección"…) en los tres idiomas.
 * Los platos, precios y categorías están en src/data/menu.ts.
 */
import type { Lang } from './menu';

export interface Ui {
  htmlLang: string;
  pageTitle: string;
  pageDescription: string;
  menuTitle: string;
  navLabel: string;
  changeLanguage: string;
  backToSite: string;
  consult: string;
  half: string;
  full: string;
  add: string;          // "Añadir" (aria)
  remove: string;       // "Quitar" (aria)
  mySelection: string;
  dishOne: string;
  dishMany: string;
  total: string;
  totalKnown: string;
  plusConsultOne: string;
  plusConsultMany: string; // usa {n}
  notAnOrder: string;
  keepBrowsing: string;
  close: string;
  empty: string;
  clear: string;
  howItWorks: string;
  added: string;        // aviso para lector de pantalla; usa {name} {n}
  removed: string;
  helpTitle: string;
  helpAsk: string;
  helpBody: string;
  helpNot: string;
  helpEnd: string;
  helpOk: string;
  skip: string;
  footerNote: string;
}

export const ui: Record<Lang, Ui> = {
  es: {
    htmlLang: 'es',
    pageTitle: 'Carta | El Olivo Tapería · Nerja',
    pageDescription: 'Carta de El Olivo Tapería en Nerja. Descubre nuestras tapas, platos para compartir, carnes, pescados y propuestas gastronómicas.',
    menuTitle: 'La carta',
    navLabel: 'Secciones de la carta',
    changeLanguage: 'Idioma',
    backToSite: 'Web de El Olivo',
    consult: 'Consultar',
    half: '½ ración',
    full: 'Ración',
    add: 'Añadir',
    remove: 'Quitar',
    mySelection: 'Mi selección',
    dishOne: 'plato',
    dishMany: 'platos',
    total: 'Total aproximado',
    totalKnown: 'Total conocido',
    plusConsultOne: '+ 1 producto con precio a consultar',
    plusConsultMany: '+ {n} productos con precio a consultar',
    notAnOrder: 'Esto no es un pedido. Cuando estés listo, pídeselo a nuestro equipo.',
    keepBrowsing: 'Seguir viendo la carta',
    close: 'Cerrar',
    empty: 'Todavía no has apuntado nada.',
    clear: 'Vaciar mi selección',
    howItWorks: '¿Cómo funciona?',
    added: '{name} añadido. Llevas {n} en tu selección.',
    removed: '{name} quitado. Llevas {n} en tu selección.',
    helpTitle: 'Apunta aquí lo que quieras pedir',
    helpAsk: '¿Sueles apuntar en las notas del móvil lo que quieres pedir?',
    helpBody: 'Aquí puedes guardar tus platos mientras miras la carta y ver cuánto llevas aproximadamente.',
    helpNot: 'NO ES UN PEDIDO.',
    helpEnd: 'Es simplemente tu lista para cuando llegue el momento de pedir.',
    helpOk: 'ENTENDIDO',
    skip: 'Saltar al contenido',
    footerNote: 'Precios en euros.',
  },
  en: {
    htmlLang: 'en',
    pageTitle: 'Menu | El Olivo Tapería · Nerja',
    pageDescription: 'Menu of El Olivo Tapería in Nerja. Discover our tapas, sharing plates, meat, fish and gastronomic suggestions.',
    menuTitle: 'The menu',
    navLabel: 'Menu sections',
    changeLanguage: 'Language',
    backToSite: 'El Olivo website',
    consult: 'Ask us',
    half: 'Half portion',
    full: 'Portion',
    add: 'Add',
    remove: 'Remove',
    mySelection: 'My selection',
    dishOne: 'dish',
    dishMany: 'dishes',
    total: 'Approximate total',
    totalKnown: 'Known total',
    plusConsultOne: '+ 1 item with price on request',
    plusConsultMany: '+ {n} items with price on request',
    notAnOrder: 'This is not an order. When you are ready, just tell our team.',
    keepBrowsing: 'Keep browsing the menu',
    close: 'Close',
    empty: 'You have not noted anything yet.',
    clear: 'Clear my selection',
    howItWorks: 'How does it work?',
    added: '{name} added. You have {n} in your selection.',
    removed: '{name} removed. You have {n} in your selection.',
    helpTitle: 'Note down what you would like to order',
    helpAsk: 'Do you usually write down your order in your phone notes?',
    helpBody: 'Here you can save your dishes while you browse the menu and see roughly how much you have so far.',
    helpNot: 'THIS IS NOT AN ORDER.',
    helpEnd: 'It is simply your list for when it is time to order.',
    helpOk: 'GOT IT',
    skip: 'Skip to content',
    footerNote: 'Prices in euros.',
  },
  de: {
    htmlLang: 'de',
    pageTitle: 'Speisekarte | El Olivo Tapería · Nerja',
    pageDescription: 'Speisekarte der El Olivo Tapería in Nerja. Entdecken Sie unsere Tapas, Gerichte zum Teilen, Fleisch, Fisch und weitere kulinarische Vorschläge.',
    menuTitle: 'Die Speisekarte',
    navLabel: 'Bereiche der Speisekarte',
    changeLanguage: 'Sprache',
    backToSite: 'Website von El Olivo',
    consult: 'Auf Anfrage',
    half: 'Halbe Portion',
    full: 'Portion',
    add: 'Hinzufügen',
    remove: 'Entfernen',
    mySelection: 'Meine Auswahl',
    dishOne: 'Gericht',
    dishMany: 'Gerichte',
    total: 'Ungefähre Summe',
    totalKnown: 'Bekannte Summe',
    plusConsultOne: '+ 1 Artikel mit Preis auf Anfrage',
    plusConsultMany: '+ {n} Artikel mit Preis auf Anfrage',
    notAnOrder: 'Das ist keine Bestellung. Wenn Sie bereit sind, sagen Sie es einfach unserem Team.',
    keepBrowsing: 'Weiter in der Speisekarte stöbern',
    close: 'Schließen',
    empty: 'Sie haben noch nichts notiert.',
    clear: 'Auswahl leeren',
    howItWorks: 'Wie funktioniert das?',
    added: '{name} hinzugefügt. Sie haben {n} in Ihrer Auswahl.',
    removed: '{name} entfernt. Sie haben {n} in Ihrer Auswahl.',
    helpTitle: 'Notieren Sie hier, was Sie bestellen möchten',
    helpAsk: 'Notieren Sie Ihre Bestellung sonst in den Notizen Ihres Handys?',
    helpBody: 'Hier können Sie Ihre Gerichte beim Stöbern in der Speisekarte merken und sehen, wie viel es ungefähr ist.',
    helpNot: 'DAS IST KEINE BESTELLUNG.',
    helpEnd: 'Es ist einfach Ihre Liste für den Moment, in dem Sie bestellen möchten.',
    helpOk: 'VERSTANDEN',
    skip: 'Zum Inhalt springen',
    footerNote: 'Preise in Euro.',
  },
};

/** Pantalla de bienvenida (/carta). Los nombres de idioma van en su propio idioma. */
export const languages: { code: Lang; label: string; short: string; primary?: boolean }[] = [
  { code: 'es', label: 'Español', short: 'ES', primary: true },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'de', label: 'Deutsch', short: 'DE' },
];
export const welcomeTitle = 'Elige tu idioma';
export const welcomeSubtitle = 'Choose your language · Sprache wählen';
