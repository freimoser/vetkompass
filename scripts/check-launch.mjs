/**
 * Livegang-Prüfung. Läuft gegen `dist/`, nicht gegen den Quelltext – geprüft
 * wird, was tatsächlich ausgeliefert wird.
 *
 * Getrennt nach Blockern (Exit 1) und Hinweisen (Exit 0).
 *
 * Die Prüfungen sind auf **Fehlerklassen** formuliert, nicht auf konkrete
 * Altwerte. Eine Prüfung auf eine bestimmte Platzhalter-Domain schlüge nach
 * deren Entfernung nie wieder an und wäre stiller toter Code.
 *
 * Aufruf: npm run check:launch
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LEGAL, missingLegalFields } from '../src/config/legal.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

const blocker = [];
const hinweis = [];

if (!existsSync(DIST)) {
  console.error('dist/ fehlt. Zuerst `npm run build` ausführen.');
  process.exit(1);
}

/** Alle HTML-Dateien im Build, mit ihrer ausgelieferten Route. */
function htmlSeiten(dir = DIST, gesammelt = []) {
  for (const eintrag of readdirSync(dir)) {
    const pfad = join(dir, eintrag);
    if (statSync(pfad).isDirectory()) {
      htmlSeiten(pfad, gesammelt);
    } else if (eintrag.endsWith('.html')) {
      // Beide Ausgabeformen abdecken: seite/index.html und seite.html
      const route =
        '/' +
        relative(DIST, pfad)
          .replace(/\/index\.html$/, '')
          .replace(/index\.html$/, '')
          .replace(/\.html$/, '');
      gesammelt.push({ pfad, route: route.replace(/\/{2,}/g, '/') });
    }
  }
  return gesammelt;
}

const seiten = htmlSeiten();
const lies = (p) => readFileSync(p, 'utf8');
const start = seiten.find((s) => s.route === '/');

/* -- 1. Pflichtangaben nach § 5 DDG ------------------------------------ */

const fehlend = missingLegalFields();
if (fehlend.length > 0) {
  blocker.push(
    `Pflichtangaben fehlen in src/config/legal.ts: ${fehlend.join(', ')}. ` +
      'Eine ladungsfähige Anschrift ist nach § 5 DDG zwingend; ein Postfach genügt nicht.',
  );
}
if (LEGAL.companyName && !/\b(GmbH|UG|AG|KG|OHG|e\.K\.|mbH|GbR)\b/i.test(LEGAL.companyName)) {
  blocker.push(
    `companyName "${LEGAL.companyName}" nennt keine Rechtsform. ` +
      'Ein Geschäftsname ohne Rechtsform ist nach § 5 DDG unvollständig – ' +
      'entweder Rechtsform ergänzen oder das Feld leer lassen.',
  );
}

/* -- 2. Pflichtseiten vorhanden und ohne Lücken ------------------------ */

const PFLICHTSEITEN = ['impressum.html', 'datenschutz.html', 'haftungsausschluss.html'];
for (const datei of PFLICHTSEITEN) {
  const pfad = join(DIST, datei);
  if (!existsSync(pfad)) {
    blocker.push(`Pflichtseite /${datei} fehlt im Build.`);
    continue;
  }
  const html = lies(pfad);
  if (/class="luecke"|\[TODO|TODO:|Platzhalter/i.test(html)) {
    blocker.push(`/${datei} enthält noch unausgefüllte Stellen.`);
  }
  if (!/<meta name="robots" content="noindex/.test(html)) {
    blocker.push(
      `/${datei} trägt kein noindex. Dort steht eine ladungsfähige Anschrift, ` +
        'die sonst als eigenes Suchergebnis auftaucht.',
    );
  }
}

/* -- 3. Canonical der Startseite --------------------------------------- */

if (!start) {
  blocker.push('Keine Startseite im Build gefunden.');
} else {
  const html = lies(start.pfad);
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? '';
  if (!canonical) {
    blocker.push('Startseite hat kein Canonical. VITE_SITE_URL beim Deploy prüfen.');
  } else if (/localhost|127\.0\.0\.1|\.pages\.dev|example\.(com|org|de)/i.test(canonical)) {
    blocker.push(`Canonical zeigt auf ${canonical} statt auf die Live-Domain.`);
  }

  if (/<meta name="robots" content="[^"]*noindex/.test(html)) {
    blocker.push('Die Startseite trägt noindex und würde nicht indexiert.');
  }
}

/* -- 4. Sitemap gegen noindex, in beide Richtungen ---------------------- */

const sitemapPfad = join(DIST, 'sitemap.xml');
if (existsSync(sitemapPfad)) {
  const xml = lies(sitemapPfad);
  // Pfad sauber aus der URL ziehen, nicht am "//" in https:// raten.
  const inSitemap = new Set(
    [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (m) => new URL(m[1]).pathname.replace(/\/$/, '') || '/',
    ),
  );

  for (const seite of seiten) {
    const route = seite.route.replace(/\/$/, '') || '/';
    const noindex = /<meta name="robots" content="[^"]*noindex/.test(lies(seite.pfad));
    if (noindex && inSitemap.has(route)) {
      blocker.push(`${route} steht in der Sitemap, trägt aber noindex.`);
    }
    if (!noindex && !inSitemap.has(route)) {
      blocker.push(`${route} ist indexierbar, fehlt aber in der Sitemap.`);
    }
  }
} else {
  hinweis.push(
    'Keine Sitemap im Build. Das ist korrekt, solange VITE_SITE_URL nicht gesetzt ist – ' +
      'eine Sitemap mit falscher Domain wäre schlechter als keine.',
  );
}

/* -- 5. Symbole --------------------------------------------------------- */

for (const datei of ['favicon.svg', 'favicon.ico', 'favicon-96.png', 'apple-touch-icon.png']) {
  if (!existsSync(join(DIST, datei))) {
    hinweis.push(`${datei} fehlt im Build (npm run icons).`);
  }
}
if (start && !/favicon-96\.png/.test(lies(start.pfad))) {
  hinweis.push(
    'Startseite verweist nicht auf favicon-96.png. Google zeigt ein Favicon in den ' +
      'Suchergebnissen nur bei einer Kantenlänge, die ein Vielfaches von 48 ist.',
  );
}

/* -- 6. Messung und Datenschutzerklärung müssen zusammenpassen ---------- */

const hatToken = Boolean((process.env.VITE_CF_ANALYTICS_TOKEN || '').trim());
const startHtml = start ? lies(start.pfad) : '';
const bindetBeaconEin = /static\.cloudflareinsights\.com/.test(startHtml);
const datenschutzHtml = existsSync(join(DIST, 'datenschutz.html'))
  ? lies(join(DIST, 'datenschutz.html'))
  : '';
const erklaertMessung = /Cloudflare Web Analytics/.test(datenschutzHtml);

if (bindetBeaconEin !== erklaertMessung) {
  blocker.push(
    bindetBeaconEin
      ? 'Die Seite bindet Cloudflare Web Analytics ein, die Datenschutzerklärung beschreibt es aber nicht.'
      : 'Die Datenschutzerklärung beschreibt Cloudflare Web Analytics, eingebunden ist es aber nicht.',
  );
}
if (!hatToken && !bindetBeaconEin) {
  hinweis.push('Keine Reichweitenmessung konfiguriert (VITE_CF_ANALYTICS_TOKEN ist leer).');
}

/* -- 7. Keine Einwilligung nötig, also auch kein Banner ---------------- */

if (/cookie|consent/i.test(startHtml.replace(/<!--[\s\S]*?-->/g, ''))) {
  hinweis.push(
    'Die Startseite erwähnt Cookies oder Einwilligung. Ohne einwilligungspflichtige ' +
      'Verarbeitung gehört dort kein Banner hin.',
  );
}

/* -- Ausgabe ------------------------------------------------------------ */

const zeile = (s) => `  - ${s}`;
if (hinweis.length > 0) {
  console.log(`\nHinweise (${hinweis.length}):`);
  console.log(hinweis.map(zeile).join('\n'));
}
if (blocker.length > 0) {
  console.error(`\nBLOCKER (${blocker.length}) – kein Livegang:`);
  console.error(blocker.map(zeile).join('\n'));
  console.error('');
  process.exit(1);
}

console.log(`\nKeine Blocker. ${seiten.length} Seiten geprüft, Livegang möglich.\n`);
