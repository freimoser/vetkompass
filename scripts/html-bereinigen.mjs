/**
 * Entfernt Entwickler-Kommentare aus dem ausgelieferten HTML.
 *
 * Die Quelltexte sind ausführlich kommentiert, und Vite und die Generatoren
 * reichen HTML-Kommentare unverändert durch. Das GEO-Audit vom 14.10.2026
 * meldete das als kritisch: Antwortmaschinen lesen Kommentare mit, und Sätze
 * wie „Keine Anzahl in den statischen Texten dieser Datei“ sehen für sie aus
 * wie Anweisungen an sie selbst.
 *
 * Entfernt werden nur Kommentare mit Text. Die leeren `<!-- -->` und die
 * Suspense-Marken (`<!--$-->`) setzt React beim Vorrendern; ohne sie passt das
 * HTML beim Hydrieren nicht mehr zum Client.
 *
 * Läuft als letzter Build-Schritt über alle HTML-Dateien in dist/.
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const KOMMENTAR = /<!--([\s\S]*?)-->\n?/g;
/** Ein Kommentar mit Wörtern darin – kein React-Marker. */
export const istTextkommentar = (inhalt) => /[A-Za-zÄÖÜäöüß]/.test(inhalt) && !/^\s*\/?\$/.test(inhalt);

function htmlDateien(dir, liste = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) htmlDateien(p, liste);
    else if (e.endsWith('.html')) liste.push(p);
  }
  return liste;
}

let anzahl = 0;
for (const datei of htmlDateien(DIST)) {
  const html = readFileSync(datei, 'utf8');
  let treffer = 0;
  const neu = html.replace(KOMMENTAR, (ganz, inhalt) => (istTextkommentar(inhalt) ? (treffer++, '') : ganz));
  if (treffer) {
    writeFileSync(datei, neu, 'utf8');
    anzahl += treffer;
  }
}
console.log(`HTML bereinigt: ${anzahl} Entwickler-Kommentare entfernt.`);
