import { categories, dishes, subcategories, type Dish, type Lang } from '../data/menu';

export interface MenuGroup { id: string | null; title: string | null; dishes: Dish[] }
export interface MenuSection {
  id: string;
  number: number;
  title: string;
  short: string;
  image?: { src?: string; alt?: string; position?: string };
  groups: MenuGroup[];
}

const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

/** Convierte los datos en secciones ordenadas y listas para pintar en un idioma. */
export function buildSections(lang: Lang): MenuSection[] {
  return [...categories].sort(byOrder).map((c, i) => {
    const subs = subcategories.filter((s) => s.category === c.id).sort(byOrder);
    const own = dishes.filter((d) => d.category === c.id).sort(byOrder);
    const groups: MenuGroup[] = [];
    const loose = own.filter((d) => !d.subcategory);
    if (loose.length) groups.push({ id: null, title: null, dishes: loose });
    for (const s of subs) {
      const list = own.filter((d) => d.subcategory === s.id);
      if (list.length) groups.push({ id: s.id, title: s.translations[lang], dishes: list });
    }
    return { id: c.id, number: i + 1, title: c.translations[lang].title, short: c.translations[lang].short, image: c.image, groups };
  }).filter((s) => s.groups.length > 0);
}
