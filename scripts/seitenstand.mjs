/**
 * Ehrliche Datumsangaben: Eine Seite gilt nur dann als geändert, wenn sich ihr
 * sichtbarer Text geändert hat.
 *
 * Vorher standen zwei falsche Daten im Build:
 *  - `lastmod` in der Sitemap war bei jedem Build das heutige Datum. Google
 *    wertet `lastmod` nur, solange es verlässlich stimmt – ein Datum, das sich
 *    bei jedem Deploy bewegt, lernt Google zu ignorieren.
 *  - `datePublished` und `dateModified` waren in allen Artikeln der 23.09.2026,
 *    fest im Generator. Der Artikel zu Kategorie 10 entstand am 27.09. – er
 *    wäre also veröffentlicht worden, bevor es ihn gab.
 *
 * Wie es jetzt funktioniert: `scripts/seitenstand.json` hält je Seite einen
 * Fingerabdruck des sichtbaren Textes und zwei Daten. Nach jedem Build wird der
 * Fingerabdruck neu gebildet. Stimmt er, bleibt das Datum; weicht er ab, wird
 * die Seite auf heute gesetzt. Danach werden Sitemap und Schema im Build mit
 * diesen Daten überschrieben.
 *
 * Gezählt wird nur der sichtbare Text im <main>. Eine geänderte Linkadresse,
 * ein neues Meta-Tag oder ein anderes Schema verändern ihn nicht – genau so
 * soll es sein: Das Prüfdatum zieht nur bei inhaltlicher Änderung nach.
 *
 * Die Datei gehört ins Repository. Im CI-Build wird sie zwar fortgeschrieben,
 * aber nicht zurückgespielt – deshalb hier lokal laufen lassen und die Änderung
 * committen. Das Skript meldet, wenn es etwas geändert hat.
 *
 * Läuft nach `prerender.mjs`, weil erst dann die Startseite ihren Text hat.
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const REGISTER = join(ROOT, 'scripts', 'seitenstand.json');

/* Kalenderdatum in Deutschland, nicht in UTC – sonst springt es um Mitternacht. */
const heute =
  // Nur für den Gegentest: einen späteren Build simulieren, ohne auf morgen zu warten.
  process.env.SEITENSTAND_HEUTE ||
  new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Berlin' }).format(new Date());

const register = existsSync(REGISTER) ? JSON.parse(readFileSync(REGISTER, 'utf8')) : {};

function sichtbarerText(html) {
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? html;
  return main
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const aenderungen = [];
const gesehen = new Set();

for (const datei of readdirSync(DIST).filter((d) => d.endsWith('.html')).sort()) {
  const pfad = join(DIST, datei);
  let html = readFileSync(pfad, 'utf8');
  if (/<meta\s+name="robots"\s+content="[^"]*noindex/.test(html)) continue;

  const route = datei === 'index.html' ? '/' : `/${datei}`;
  gesehen.add(route);
  const hash = createHash('sha256').update(sichtbarerText(html)).digest('hex').slice(0, 16);

  let eintrag = register[route];
  if (!eintrag) {
    eintrag = { hash, veroeffentlicht: heute, geaendert: heute };
    aenderungen.push(`${route}: neu`);
  } else if (eintrag.hash === null) {
    // Startwert aus der Einführung: Daten stehen fest, Fingerabdruck wird übernommen.
    eintrag.hash = hash;
  } else if (eintrag.hash !== hash) {
    eintrag.hash = hash;
    if (eintrag.geaendert !== heute) aenderungen.push(`${route}: geändert`);
    eintrag.geaendert = heute;
  }
  register[route] = eintrag;

  // Schema im Build auf die belegten Daten setzen.
  html = html
    .replace(/"datePublished":\s*"[^"]*"/g, `"datePublished": "${eintrag.veroeffentlicht}"`)
    .replace(/"dateModified":\s*"[^"]*"/g, `"dateModified": "${eintrag.geaendert}"`);
  writeFileSync(pfad, html, 'utf8');
}

// Seiten, die es nicht mehr gibt, aus dem Register nehmen.
for (const route of Object.keys(register)) {
  if (!gesehen.has(route)) {
    delete register[route];
    aenderungen.push(`${route}: entfernt`);
  }
}

// Sitemap: lastmod je Adresse aus dem Register.
const sitemapPfad = join(DIST, 'sitemap.xml');
if (existsSync(sitemapPfad)) {
  const xml = readFileSync(sitemapPfad, 'utf8').replace(
    /<loc>([^<]+)<\/loc>(\s*)<lastmod>[^<]*<\/lastmod>/g,
    (ganz, loc, raum) => {
      const route = new URL(loc).pathname;
      const eintrag = register[route];
      return eintrag ? `<loc>${loc}</loc>${raum}<lastmod>${eintrag.geaendert}</lastmod>` : ganz;
    },
  );
  writeFileSync(sitemapPfad, xml, 'utf8');
}

const sortiert = Object.fromEntries(Object.entries(register).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(REGISTER, `${JSON.stringify(sortiert, null, 2)}\n`, 'utf8');

console.log(
  aenderungen.length
    ? `Seitenstand fortgeschrieben (${aenderungen.join(', ')}) – scripts/seitenstand.json committen.`
    : `Seitenstand unverändert: ${gesehen.size} Seiten, kein sichtbarer Text geändert.`,
);
