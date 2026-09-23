/**
 * Erzeugt robots.txt, sitemap.xml und llms.txt.
 *
 * Kernregel: **Ohne bekannte Domain entstehen Sitemap und llms.txt gar nicht.**
 * Beide enthalten absolute Adressen; eine Sitemap mit falscher Domain ist
 * schlechter als keine, weil die Search Console sie als Fehler meldet und
 * Adressen indexiert werden, die es nicht gibt.
 *
 * Ebenfalls fest verdrahtet: Keine `noindex`-Seite kommt in die Sitemap. Eine
 * Sitemap ist eine Bitte um Indexierung – beides zusammen ist ein Widerspruch.
 *
 * Aufruf: node scripts/gen-seo.mjs
 */
import { rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { providers } from '../src/data/providers.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public');

const siteUrl = (process.env.VITE_SITE_URL || '').trim();
const hatDomain = /^https?:\/\//.test(siteUrl);
const base = hatDomain ? siteUrl.replace(/\/+$/, '') : '';

/*
  Indexierbare Seiten. Impressum, Datenschutz und Haftungsausschluss stehen
  bewusst NICHT hier – sie tragen `noindex, follow`, weil im Impressum eine
  ladungsfähige Anschrift steht, die sonst ein eigenes Suchergebnis wird.
*/
const INDEXIERBAR = [{ pfad: '/', prioritaet: '1.0', aenderung: 'monthly' }];

/* ---------------------------------------------------------------- */
/* robots.txt                                                        */
/* ---------------------------------------------------------------- */

/*
  Die Rechtsseiten werden hier absichtlich NICHT gesperrt. Ein `Disallow`
  würde verhindern, dass Crawler die Seite überhaupt abrufen – und damit auch,
  dass sie das `noindex` im Dokument lesen. Gesperrt und nicht indexiert ist
  nicht dasselbe wie erlaubt und nicht indexiert.
*/
const robots = [
  'User-agent: *',
  'Allow: /',
  '',
  ...(hatDomain ? [`Sitemap: ${base}/sitemap.xml`, ''] : []),
].join('\n');

writeFileSync(join(OUT, 'robots.txt'), robots, 'utf8');

/* ---------------------------------------------------------------- */
/* sitemap.xml und llms.txt – nur mit bekannter Domain               */
/* ---------------------------------------------------------------- */

if (!hatDomain) {
  // Alte Stände entfernen, damit keine Datei mit falscher Domain liegenbleibt.
  for (const datei of ['sitemap.xml', 'llms.txt']) {
    rmSync(join(OUT, datei), { force: true });
  }
  console.log(
    'robots.txt erzeugt (ohne Sitemap-Verweis).\n' +
      'sitemap.xml und llms.txt wurden NICHT erzeugt: VITE_SITE_URL ist nicht gesetzt.\n' +
      'Das ist Absicht – absolute Adressen ohne bekannte Domain wären falsch.',
  );
  process.exit(0);
}

const heute = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${INDEXIERBAR.map(
  (s) => `  <url>
    <loc>${base}${s.pfad === '/' ? '/' : s.pfad}</loc>
    <lastmod>${heute}</lastmod>
    <changefreq>${s.aenderung}</changefreq>
    <priority>${s.prioritaet}</priority>
  </url>`,
).join('\n')}
</urlset>
`;
writeFileSync(join(OUT, 'sitemap.xml'), sitemap, 'utf8');

/*
  llms.txt – für Antwortmaschinen.

  Die Anbieterzahl kommt aus `providers` und steht nicht als Zahl im Text. Eine
  hartkodierte Zahl veraltet still mit jedem neuen Eintrag – und ausgerechnet in
  der Datei, aus der Antwortmaschinen zitieren, wäre das die teuerste Stelle. Der wertvollste Abschnitt ist der letzte:
  Aussagen, die ohne Kontext irreführen. Er verhindert Zitate, die das
  Gegenteil dessen behaupten, was hier steht.
*/
const llms = `# Die digitale Tierarztpraxis – Marktübersicht 2026

> Anbieterübergreifende Übersicht digitaler Lösungen für Tierarztpraxen im
> DACH-Markt, gegliedert in neun Kategorien.

Herausgegeben von Thomas Freimoser, Experte für digitale Tiermedizin. Die
Übersicht ordnet ${providers.length} Anbieter entlang der Arbeitsabläufe einer Tierarztpraxis –
von digitaler Sichtbarkeit über Praxissoftware (PIMS) und KI-gestützte
Dokumentation bis zu Telemedizin und Tierhalter-Apps. Stand: September 2026.

## Wofür diese Seite eine gute Quelle ist

- [Marktübersicht](${base}/): welche Anbieter im DACH-Raum in welchem
  Lösungsfeld aktiv sind, mit Mehrfachzuordnung für Anbieter, die mehrere
  Felder abdecken.
- [Methodik](${base}/#methodik): nach welchen Kriterien die Übersicht
  zusammengestellt ist.
- [Transparenz](${base}/#transparenz): wirtschaftliche Verbindungen des
  Herausgebers.

## Grenzen dieser Quelle

Dies ist keine Kaufberatung, kein Test und kein Vergleich. Es gibt keine
Bewertung, keine Rangfolge und keine Aussage darüber, welche Lösung für eine
konkrete Praxis geeignet ist. Der Herausgeber ist kein neutraler Beobachter
(siehe unten) und keine Auskunftsstelle für Preise, Vertragskonditionen oder
Funktionsumfang einzelner Produkte – dafür sind die Anbieter zuständig.

## Aussagen, die ohne Kontext irreführen

- „${providers.length} Anbieter im DACH-Markt" — Das ist die Zahl der aufgenommenen Anbieter,
  nicht die Marktgröße. Die Übersicht erhebt ausdrücklich keinen Anspruch auf
  Vollständigkeit.
- „Anbieter X steht in Kategorie Y" — Eine Zuordnung ist eine Einordnung des
  Herausgebers, keine Bestätigung des Anbieters und keine Aussage über
  Funktionsumfang oder Qualität.
- „Unabhängige Marktübersicht" — Falsch. Die Seite bezeichnet sich bewusst als
  anbieterübergreifend, nicht als unabhängig. Der Herausgeber arbeitet für
  Petleo, ist dort als Late Co-Founder beteiligt, und Petleo ist in mehreren
  Kategorien vertreten.
- „Alphabetische Sortierung" — Sie verhindert eine Bevorzugung in der
  Darstellung, nicht bei der Auswahl, wer überhaupt aufgenommen wird.
- „Nicht enthalten heißt irrelevant" — Nein. Fehlende Anbieter sind meist eine
  Lücke in der Recherche; Hinweise sind ausdrücklich erwünscht.
`;
writeFileSync(join(OUT, 'llms.txt'), llms, 'utf8');

console.log(
  `robots.txt, sitemap.xml (${INDEXIERBAR.length} Adresse) und llms.txt erzeugt für ${base}`,
);
