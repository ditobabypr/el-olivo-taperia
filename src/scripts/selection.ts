/**
 * "Mi selección" — lista temporal para apuntar lo que se quiere pedir.
 *
 * NO es un pedido y NO guarda nada: sin localStorage, sessionStorage, cookies, API ni backend.
 * El estado vive únicamente en esta variable en memoria; al recargar o salir se pierde (a propósito).
 * Los precios llegan desde el HTML (generado a partir de src/data/menu.ts); aquí no hay ningún precio.
 */
import { formatPrice, sumCents } from '../lib/format';

interface Line { key: string; name: string; label: string; price: number | null; qty: number }

const ui = JSON.parse(document.getElementById('cm-ui')!.textContent!);
const lines = new Map<string, Line>(); // orden de inserción = orden en que se añadieron

const bar = document.getElementById('cm-bar') as HTMLButtonElement;
const barCount = bar.querySelector<HTMLElement>('.cm-bar__count')!;
const barTotal = bar.querySelector<HTMLElement>('.cm-bar__total')!;
const sheet = document.getElementById('cm-sheet') as HTMLDialogElement;
const help = document.getElementById('cm-help') as HTMLDialogElement;
const rowsEl = document.getElementById('cm-rows')!;
const emptyEl = document.getElementById('cm-empty')!;
const totalLabel = document.getElementById('cm-total-label')!;
const totalValue = document.getElementById('cm-total-value')!;
const totalConsult = document.getElementById('cm-total-consult')!;
const live = document.getElementById('cm-live')!;

const fill = (tpl: string, vars: Record<string, string | number>) =>
  tpl.replace(/\{(\w+)\}/g, (_, k) => String(vars[k]));
const label = (l: Line) => (l.label ? `${l.name} (${l.label})` : l.name);

function totals() {
  let count = 0, consult = 0;
  const known: number[] = [];
  lines.forEach((l) => {
    count += l.qty;
    if (l.price === null) consult += l.qty;
    else known.push(l.price * l.qty);
  });
  return { count, consult, total: sumCents(known) };
}

function bump(el: Element | null) {
  if (!el) return;
  el.classList.remove('is-bump');
  void (el as HTMLElement).offsetWidth; // reinicia la microanimación
  el.classList.add('is-bump');
}

function change(key: string, delta: number, meta?: Omit<Line, 'qty'>) {
  let line = lines.get(key);
  if (!line) {
    if (delta < 0 || !meta) return;
    line = { ...meta, qty: 0 };
    lines.set(key, line);
  }
  line.qty += delta;
  if (line.qty <= 0) lines.delete(key);
  const { count } = totals();
  live.textContent = fill(delta > 0 ? ui.added : ui.removed, { name: label(line), n: count });
  render(key, delta > 0);
}

function render(changedKey?: string, added = false) {
  // controles [−] n [+] de la carta
  document.querySelectorAll<HTMLElement>('.cm-qty').forEach((el) => {
    const n = lines.get(el.dataset.key!)?.qty ?? 0;
    el.dataset.n = String(n);
    el.querySelector('.cm-qty__n')!.textContent = String(n);
    if (added && el.dataset.key === changedKey) bump(el.querySelector('.cm-qty__n'));
  });

  const { count, consult, total } = totals();

  // barra inferior
  bar.dataset.n = String(count);
  barCount.hidden = barTotal.hidden = count === 0;
  if (count > 0) {
    barCount.textContent = `${count} ${count === 1 ? ui.dishOne : ui.dishMany}`;
    barTotal.textContent = total === 0 && consult > 0 ? ui.consult : formatPrice(total) + (consult > 0 ? ' +' : '');
    if (added) bump(bar);
  }

  // panel
  emptyEl.hidden = count > 0;
  rowsEl.replaceChildren(...[...lines.values()].map(rowFor));
  totalLabel.textContent = consult > 0 ? ui.totalKnown : ui.total;
  totalValue.textContent = formatPrice(total);
  totalConsult.hidden = consult === 0;
  totalConsult.textContent = consult === 1 ? ui.plusConsultOne : fill(ui.plusConsultMany, { n: consult });
  (document.getElementById('cm-clear') as HTMLElement).hidden = count === 0;
}

function rowFor(l: Line): HTMLElement {
  const li = document.createElement('li');
  li.className = 'cm-row';
  li.dataset.key = l.key;
  const info = document.createElement('div');
  info.className = 'cm-row__info';
  const name = document.createElement('span');
  name.className = 'cm-row__name';
  name.textContent = l.name;
  info.append(name);
  if (l.label) {
    const sub = document.createElement('span');
    sub.className = 'cm-row__label';
    sub.textContent = l.label;
    info.append(sub);
  }
  const price = document.createElement('span');
  price.className = 'cm-row__price';
  price.textContent = l.price === null ? ui.consult : formatPrice(l.price * l.qty);
  info.append(price);

  const qty = document.createElement('div');
  qty.className = 'cm-qty cm-qty--row';
  qty.dataset.n = String(l.qty);
  const mk = (act: 'dec' | 'inc', aria: string, path: string) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = `cm-qty__btn cm-qty__${act}`;
    b.dataset.act = act;
    b.setAttribute('aria-label', `${aria}: ${label(l)}`);
    b.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}" /></svg>`;
    return b;
  };
  const n = document.createElement('span');
  n.className = 'cm-qty__n';
  n.textContent = String(l.qty);
  n.setAttribute('aria-hidden', 'true');
  qty.append(mk('dec', ui.remove, 'M6 12h12'), n, mk('inc', ui.add, 'M12 6v12M6 12h12'));

  const del = document.createElement('button');
  del.type = 'button';
  del.className = 'cm-link cm-row__del';
  del.dataset.act = 'del';
  del.textContent = ui.remove;
  del.setAttribute('aria-label', `${ui.remove}: ${label(l)}`);

  const controls = document.createElement('div');
  controls.className = 'cm-row__controls';
  controls.append(qty, del);
  li.append(info, controls);
  return li;
}

/* ── eventos ── */
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const btn = target.closest<HTMLElement>('[data-act]');
  if (btn) {
    const act = btn.dataset.act;
    const row = btn.closest<HTMLElement>('.cm-row');
    if (row) {
      const l = lines.get(row.dataset.key!);
      if (!l) return;
      if (act === 'del') change(l.key, -l.qty);
      else change(l.key, act === 'inc' ? 1 : -1);
    } else {
      const q = btn.closest<HTMLElement>('.cm-qty');
      if (!q) return;
      const price = q.dataset.price;
      change(q.dataset.key!, act === 'inc' ? 1 : -1, {
        key: q.dataset.key!, name: q.dataset.name!, label: q.dataset.label ?? '',
        price: price === '' || price === undefined ? null : Number(price),
      });
    }
    return;
  }
  if (target.closest('#cm-bar')) { sheet.showModal(); return; }
  if (target.closest('[data-close]')) { target.closest('dialog')?.close(); return; }
  if (target.closest('#cm-clear')) { lines.clear(); live.textContent = ''; render(); return; }
  if (target.closest('#cm-help-open')) { sheet.close(); help.showModal(); return; }
  if (target.closest('#cm-help-ok')) { help.close(); return; }
  if (target === sheet || target === help) (target as HTMLDialogElement).close(); // clic en el fondo
});

render();

/* Explicación inicial: una vez por carga de la carta (no se guarda nada para recordarlo). */
requestAnimationFrame(() => {
  try { help.showModal(); } catch { /* navegadores sin <dialog>: la carta funciona igual */ }
});
