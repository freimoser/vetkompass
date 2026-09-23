/**
 * Rendert die Startseite zur Bauzeit in statisches HTML.
 *
 * Der Anlass war eine Messung, kein Bauchgefühl: Das ausgelieferte
 * `dist/index.html` enthielt **null Zeichen sichtbaren Text** und keinen
 * einzigen Anbieternamen. Googlebot rendert JavaScript nach und hätte die
 * Seite irgendwann erfasst – GPTBot, ClaudeBot und PerplexityBot tun das
 * überwiegend nicht. Das erklärte Ziel der Seite ist aber, von
 * Antwortmaschinen **zitiert** zu werden. Ohne diesen Schritt war es
 * unerreichbar, egal wie gut llms.txt formuliert ist.
 *
 * Ablauf:
 *  1. Vite baut `src/entry-server.tsx` als SSR-Bündel nach `dist-ssr/`.
 *  2. Dieses Bündel rendert die App zu einem HTML-String.
 *  3. Der String ersetzt das leere `<div id="root">` in `dist/index.html`.
 *  4. `src/main.tsx` erkennt den vorhandenen Inhalt und hydratisiert, statt
 *     ihn wegzuwerfen.
 *
 * Läuft nach `vite build`, weil es dessen `dist/index.html` bearbeitet.
 *
 * Aufruf: node scripts/prerender.mjs
 */
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const INDEX = join(ROOT, 'dist', 'index.html');
const SSR_OUT = join(ROOT, 'dist-ssr');

/*
  Der leere Wurzelknoten, wie Vite ihn ausliefert. Fest darauf zu prüfen ist
  Absicht: Ändert jemand `index.html`, schlägt der Schritt hörbar fehl, statt
  still nichts zu tun und eine leere Seite auszuliefern.
*/
const LEER = '<div id="root"></div>';

await build({
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: 'dist-ssr',
    emptyOutDir: true,
    copyPublicDir: false,
  },
  logLevel: 'warn',
});

const { render } = await import(pathToFileURL(join(SSR_OUT, 'entry-server.js')).href);
const markup = render();

const html = readFileSync(INDEX, 'utf8');
if (!html.includes(LEER)) {
  console.error(
    `Vorrendern abgebrochen: "${LEER}" steht nicht in dist/index.html.\n` +
      'Wurde der Wurzelknoten in index.html umbenannt? Ohne diesen Schritt ' +
      'liefert die Seite leeres HTML aus und ist für Antwortmaschinen unsichtbar.',
  );
  process.exit(1);
}

writeFileSync(INDEX, html.replace(LEER, `<div id="root">${markup}</div>`), 'utf8');
rmSync(SSR_OUT, { recursive: true, force: true });

/* Gemessen ausgeben, nicht behauptet – die Zahl ist der Beleg, dass es wirkte. */
const sichtbar = readFileSync(INDEX, 'utf8')
  .replace(/<script[\s\S]*?<\/script>/g, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim().length;

console.log(`Startseite vorgerendert: ${sichtbar} Zeichen sichtbarer Text im HTML.`);
