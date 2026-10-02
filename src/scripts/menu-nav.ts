/**
 * Marca en la navegación de categorías la sección que se está leyendo.
 *
 * Diseñado para que la cabecera NO se mueva mientras se hace scroll:
 *  - la sección activa se calcula por posición (una sola vez por fotograma, sin IntersectionObserver
 *    que pueda alternar entre secciones),
 *  - la barra de categorías solo se desplaza si el botón activo queda fuera de la vista, y sin animación.
 */
const top = document.querySelector<HTMLElement>('.cm-top');
const nav = document.querySelector<HTMLElement>('.cm-nav__scroll');
const links = [...document.querySelectorAll<HTMLAnchorElement>('.cm-nav a')];
const sections = [...document.querySelectorAll<HTMLElement>('.cm-sec')];

if (top && nav && sections.length) {
  let current = '';
  let queued = false;

  const mark = (id: string) => {
    for (const a of links) {
      if (a.hash === `#${id}`) {
        a.setAttribute('aria-current', 'true');
        // solo se mueve la barra si el botón queda cortado o fuera de vista
        const pad = 12;
        const left = a.offsetLeft - pad;
        const right = a.offsetLeft + a.offsetWidth + pad;
        if (left < nav.scrollLeft) nav.scrollLeft = left;
        else if (right > nav.scrollLeft + nav.clientWidth) nav.scrollLeft = right - nav.clientWidth;
      } else {
        a.removeAttribute('aria-current');
      }
    }
  };

  const update = () => {
    queued = false;
    const line = top.getBoundingClientRect().bottom + 32; // justo bajo la cabecera
    let id = '';
    for (const s of sections) {
      if (s.getBoundingClientRect().top <= line) id = s.id;
      else break;
    }
    if (id !== current) {
      current = id;
      if (id) mark(id);
      else links.forEach((a) => a.removeAttribute('aria-current'));
    }
  };

  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('resize', () => { if (!queued) { queued = true; requestAnimationFrame(update); } });
  update();
}
