/**
 * Optimiza las fotos: lee fotos-originales/{carta,web}/ y escribe WebP ligero en public/fotos/{carta,web}/.
 * Uso: npm run fotos   (corrige la orientación EXIF, máx. 1400 px de ancho).
 * El nombre del fichero final = nombre del original sin espacios/acentos (según ALIAS) .webp
 */
import sharp from 'sharp';
import { readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join, parse } from 'node:path';

// nombre del original (sin extensión) → nombre final (id de la categoría en menu.ts)
const ALIAS = {
  compartir: 'aqui-se-comparte',
  dulcepecado: 'dulce-pecado',
  entrepanes: 'entre-panes',
  soloparati: 'solo-para-ti',
  tapasextra: 'tapas-extras',
};
const MAX_W = 1400;

for (const dir of ['carta', 'web']) {
  const src = join('fotos-originales', dir);
  const out = join('public', 'fotos', dir);
  if (!existsSync(src)) continue;
  mkdirSync(out, { recursive: true });
  for (const f of readdirSync(src).filter((n) => /\.(jpe?g|png|webp)$/i.test(n))) {
    const { name } = parse(f);
    const dest = join(out, `${ALIAS[name] ?? name}.webp`);
    const info = await sharp(join(src, f)).rotate().resize({ width: MAX_W, withoutEnlargement: true }).webp({ quality: 80 }).toFile(dest);
    console.log(`${dir}/${f} → ${dest} (${Math.round(info.size / 1024)} KB, ${info.width}×${info.height})`);
  }
}
