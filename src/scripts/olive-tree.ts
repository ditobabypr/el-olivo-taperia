/**
 * Reproduce el olivo una sola vez: cuando acaba la intro de marca y el arco entra en pantalla.
 * Al terminar el vídeo se queda en el último fotograma. Sin vídeo posible → último fotograma estático.
 */
const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll<HTMLElement>('[data-otg]').forEach((el) => {
  const video = el.querySelector('video');
  if (!video) return;
  const done = () => el.classList.add('otg--done');
  const fallback = () => el.classList.add('otg--static', 'otg--done');

  if (reduce || !('IntersectionObserver' in window)) { fallback(); return; }

  const delay = Number(el.dataset.delay ?? 0);
  const threshold = Number(el.dataset.threshold ?? 0.4);
  let started = false;
  let visible = false;
  let introDone = !root.classList.contains('intro-on');

  const start = () => {
    if (started || !visible || !introDone) return;
    started = true;
    setTimeout(() => {
      video.preload = 'auto';
      video.addEventListener('ended', done, { once: true });
      video.addEventListener('error', fallback, { once: true });
      video.play().catch(fallback); // p. ej. ahorro de batería en iOS
    }, delay);
  };

  new IntersectionObserver((entries, io) => {
    if (entries.some((e) => e.isIntersecting)) { visible = true; io.disconnect(); start(); }
  }, { threshold }).observe(el);

  if (!introDone) {
    // la intro de marca tiene prioridad: esperamos a que retire la clase "intro-on"
    const mo = new MutationObserver(() => {
      if (!root.classList.contains('intro-on')) { mo.disconnect(); introDone = true; start(); }
    });
    mo.observe(root, { attributes: true, attributeFilter: ['class'] });
  }
});
