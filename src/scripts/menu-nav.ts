/** Resalta en la navegación de categorías la sección que se está leyendo y la mantiene a la vista. */
const nav = document.querySelector<HTMLElement>('.cm-nav__scroll');
const links = [...document.querySelectorAll<HTMLAnchorElement>('.cm-nav a')];
const sections = [...document.querySelectorAll<HTMLElement>('.cm-sec')];

if (nav && 'IntersectionObserver' in window) {
  const setCurrent = (id: string) => {
    for (const a of links) {
      const on = a.hash === `#${id}`;
      if (on) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
      if (on) {
        const left = a.offsetLeft - (nav.clientWidth - a.offsetWidth) / 2;
        nav.scrollTo({ left, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      }
    }
  };
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id)),
    { rootMargin: '-30% 0px -60% 0px' },
  );
  sections.forEach((s) => io.observe(s));
}
