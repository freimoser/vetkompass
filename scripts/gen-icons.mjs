/**
 * Erzeugt alle Favicon-Größen aus einer einzigen Quelle: public/favicon.svg.
 *
 * Warum aus einer Quelle: Werden die Größen einzeln gepflegt, laufen sie
 * auseinander – irgendwann zeigt der Tab ein anderes Symbol als die Suche.
 *
 * Warum 96 und 48: Google verwendet ein Favicon in den Suchergebnissen nur,
 * wenn die Kantenlänge ein Vielfaches von 48 ist. Ein 32×32-Favicon wird
 * ignoriert, und in den Ergebnissen erscheint der graue Standard-Globus.
 *
 * Warum favicon.ico: Browser fragen diesen Pfad unaufgefordert ab. Ohne die
 * Datei erzeugt jeder Seitenaufruf einen 404 im Server-Protokoll.
 *
 * `sharp` ist bewusst keine Projekt-Abhängigkeit – das Skript läuft selten und
 * die Ergebnisse liegen im Repository. Zum Neuerzeugen:
 *
 *     npm i -D sharp && node scripts/gen-icons.mjs && npm un sharp
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const sharp = (await import('sharp')).default;

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'public');
const QUELLE = join(PUBLIC, 'favicon.svg');

/**
 * Minimaler ICO-Container um ein PNG. Seit Windows Vista zulässig und von
 * allen aktuellen Browsern unterstützt – spart eine Bitmap-Kodierung.
 */
function ico(pngBuf, size) {
  const kopf = Buffer.alloc(22);
  kopf.writeUInt16LE(0, 0); // reserviert
  kopf.writeUInt16LE(1, 2); // Typ 1 = Icon
  kopf.writeUInt16LE(1, 4); // ein Bild
  kopf.writeUInt8(size >= 256 ? 0 : size, 6); // 0 bedeutet 256
  kopf.writeUInt8(size >= 256 ? 0 : size, 7);
  kopf.writeUInt8(0, 8); // Palettengröße
  kopf.writeUInt8(0, 9); // reserviert
  kopf.writeUInt16LE(1, 10); // Farbebenen
  kopf.writeUInt16LE(32, 12); // Bit pro Pixel
  kopf.writeUInt32LE(pngBuf.length, 14);
  kopf.writeUInt32LE(22, 18); // Offset der Bilddaten
  return Buffer.concat([kopf, pngBuf]);
}

const svg = readFileSync(QUELLE);
const png = (size) =>
  sharp(svg, { density: 384 }).resize(size, size, { fit: 'contain' }).png({ compressionLevel: 9 });

const GROESSEN = [
  ['favicon-96.png', 96],
  ['favicon-48.png', 48],
  ['favicon-32.png', 32],
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
];

const erzeugt = [];
for (const [name, size] of GROESSEN) {
  await png(size).toFile(join(PUBLIC, name));
  erzeugt.push(`${name} (${size}px)`);
}

// favicon.ico aus der 48er-Variante – groß genug für jeden Browser-Tab.
const buf48 = await png(48).toBuffer();
writeFileSync(join(PUBLIC, 'favicon.ico'), ico(buf48, 48));
erzeugt.push('favicon.ico (48px)');

console.log(`Symbole aus favicon.svg erzeugt:\n  ${erzeugt.join('\n  ')}`);
