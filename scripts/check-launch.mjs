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
import { providers } from '../src/data/providers.ts';
import { categories } from '../src/data/categories.ts';
import { ZAHLWOERTER } from '../src/lib/zahlwort.ts';

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
      /*
        Nur `index.html` wird zum Verzeichnis aufgelöst. Die Endung bleibt
        sonst stehen, damit die Route dieselbe Zeichenkette ist wie im
        Canonical und in der Sitemap – `/seite` und `/seite.html` sind für
        Google zwei Adressen, und genau das soll hier auffallen.
      */
      const route =
        '/' +
        relative(DIST, pfad)
          .replace(/\/index\.html$/, '')
          .replace(/^index\.html$/, '');
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

const PFLICHTSEITEN = ['impressum.html', 'datenschutz.html', 'haftungsausschluss.html', '404.html'];
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

/* -- 4b. Eigene Domain braucht eine CNAME-Datei im Build ---------------- */

/*
  Die teuerste Fehlerklasse beim Livegang mit eigener Domain, und sie faellt
  lokal nie auf: GitHub Pages liest die Domain aus einer Datei im
  ausgelieferten Verzeichnis. Fehlt sie, antwortet die Domain nicht – und der
  Basispfad muss dazu passen, sonst sind live alle Skripte und Bilder 404.
*/
if (start) {
  const canonical = lies(start.pfad).match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? '';
  if (canonical) {
    const host = (() => {
      try {
        return new URL(canonical).hostname;
      } catch {
        return '';
      }
    })();
    const cnamePfad = join(DIST, 'CNAME');
    const eigeneDomain = host && !host.endsWith('.github.io');

    if (eigeneDomain) {
      if (!existsSync(cnamePfad)) {
        blocker.push(
          `Canonical zeigt auf ${host}, im Build fehlt aber die Datei CNAME. ` +
            'GitHub Pages liest die eigene Domain aus dieser Datei – ohne sie ' +
            'antwortet die Domain nicht.',
        );
      } else if (lies(cnamePfad).trim() !== host) {
        blocker.push(
          `CNAME enthält "${lies(cnamePfad).trim()}", das Canonical zeigt aber auf ${host}.`,
        );
      }

      // Bei eigener Domain liegt die Seite in der Wurzel.
      const assetPfad = lies(start.pfad).match(/<script[^>]+src="([^"]+)"/)?.[1] ?? '';
      if (assetPfad && !assetPfad.startsWith('/assets/') && assetPfad.startsWith('/')) {
        blocker.push(
          `Eigene Domain, aber die Skripte liegen unter "${assetPfad}". ` +
            'VITE_BASE muss bei eigener Domain "/" sein – sonst sind live alle ' +
            'Skripte, Stile und Logos 404.',
        );
      }
    } else if (existsSync(cnamePfad)) {
      hinweis.push(
        'Es gibt eine CNAME-Datei, das Canonical zeigt aber auf github.io. ' +
          'Eines von beidem ist veraltet.',
      );
    }
  }
}

/* -- 4c. Die Download-Grafik muss zu den Daten passen ------------------- */

/*
  Diese Prüfung gibt es, weil genau das schiefging: Die Grafik lag als von Hand
  gebaute Datei im Repository und blieb bei 35 Anbietern stehen, während die
  Seite 51 führte. Wer sie herunterlädt und weitergibt, verbreitet den alten
  Stand – und merkt es nicht.

  Geprüft wird gegen die Zeile, die die Grafik selbst trägt. Damit kann sie
  nicht mehr still veralten, ohne dass der Build abbricht.
*/
for (const datei of [
  'downloads/digitale-tierarztpraxis-marktuebersicht.svg',
  'downloads/digitale-tierarztpraxis-marktuebersicht.png',
]) {
  const pfad = join(DIST, datei);
  if (!existsSync(pfad)) {
    /*
      Auch das PNG ist ein Blocker, obwohl es `sharp` braucht: Der
      Download-Knopf auf der Startseite zeigt genau darauf. Fehlt es, liefert
      die Seite einen toten Link aus – schlimmer als ein abgebrochener Build.
    */
    blocker.push(
      `Die Download-Grafik ${datei} fehlt im Build. ` +
        (datei.endsWith('.png')
          ? 'Das PNG entsteht über sharp – ist es nicht installiert, `npm ci` prüfen.'
          : '`npm run gen` erzeugt sie.'),
    );
    continue;
  }
  if (!datei.endsWith('.svg')) continue;

  const svg = lies(pfad);
  const treffer = svg.match(/(\d+)\s+Anbieter in\s+(\d+)\s+Kategorien/);
  if (!treffer) {
    blocker.push(
      `${datei} nennt die Anbieterzahl nicht. Ohne sie lässt sich nicht prüfen, ` +
        'ob die Grafik zum aktuellen Datenstand gehört.',
    );
  } else if (
    Number(treffer[1]) !== providers.length ||
    Number(treffer[2]) !== categories.length
  ) {
    blocker.push(
      `Die Download-Grafik ist veraltet: Sie nennt ${treffer[1]} Anbieter in ` +
        `${treffer[2]} Kategorien, die Daten führen ${providers.length} in ` +
        `${categories.length}. \`npm run gen\` erzeugt sie neu.`,
    );
  }
}

/* -- 4d. Titel und Description, gemessen an Google --------------------- */

/*
  Die Grenzen stammen aus Googles Darstellung, nicht aus diesem Projekt: Titel
  werden bei etwa 580 px gekürzt, das sind rund 60 Zeichen; Descriptions bei
  etwa 920 px, rund 160 Zeichen.

  Warum das hier steht: In einem anderen Projekt erlaubten Erzeuger und Prüfer
  beide 70 Zeichen – derselbe Fehler an beiden Stellen, also fiel er nie auf,
  und 13 Titel waren in den Suchergebnissen abgeschnitten. In diesem Projekt
  lagen beim Audit am 27.09.2026 sechs Titel über 60 und acht Descriptions
  über 160 Zeichen, eine davon bei 246.

  Titel sind ein Blocker, weil man sie immer selbst bestimmt. Descriptions
  sind ein Hinweis: Google schreibt sie ohnehin oft um.

  Die Muster lesen mehrzeilige Meta-Tags mit – das erste Audit meldete die
  Startseiten-Description als fehlend, weil sie über drei Zeilen stand.
*/
const TITEL_MAX = 60;
const DESCRIPTION_MAX = 160;
const DESCRIPTION_MIN = 70;
const entities = (t) =>
  t.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

for (const seite of seiten) {
  const html = lies(seite.pfad);
  if (/<meta\s+name="robots"\s+content="[^"]*noindex/.test(html)) continue;

  const titel = entities(html.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim() ?? '');
  if (!titel) blocker.push(`${seite.route} hat keinen <title>.`);
  else if (titel.length > TITEL_MAX) {
    blocker.push(
      `${seite.route}: Titel hat ${titel.length} Zeichen, Google kürzt bei etwa ${TITEL_MAX} – „${titel}“`,
    );
  }

  const beschr = entities(
    html.match(/<meta\s+name="description"\s+content="([^"]*)"/)?.[1]?.replace(/\s+/g, ' ').trim() ?? '',
  );
  if (!beschr) blocker.push(`${seite.route} hat keine Meta-Description.`);
  else if (beschr.length > DESCRIPTION_MAX) {
    hinweis.push(`${seite.route}: Description hat ${beschr.length} Zeichen, Google kürzt bei etwa ${DESCRIPTION_MAX}.`);
  } else if (beschr.length < DESCRIPTION_MIN) {
    hinweis.push(`${seite.route}: Description hat nur ${beschr.length} Zeichen – Google ersetzt so kurze meist.`);
  }

  if (seite.route !== '/' && !/"BreadcrumbList"/.test(html)) {
    hinweis.push(`${seite.route} hat keine BreadcrumbList.`);
  }
}

/* -- 4e. Von Hand geschriebene Kategorienzahlen ------------------------- */

/*
  Nach der Aufnahme von Kategorie 10 stand an sieben Stellen noch „neun
  Kategorien“ oder „neun Lösungsfelder“ – in der llms.txt, in den Meta-Tags,
  auf allen Artikelseiten. Jede dieser Zahlen war von Hand geschrieben.

  Geprüft wird jede Zahl direkt vor „Kategorien“ oder „Lösungsfelder“, als
  Wort oder Ziffer, in allem, was ausgeliefert wird. Sie muss der Zahl der
  Kategorien entsprechen.
*/
const zahlAus = (wort) => {
  const i = ZAHLWOERTER.indexOf(wort.toLowerCase());
  return i >= 0 ? i : /^\d+$/.test(wort) ? Number(wort) : null;
};
const textDateien = [...seiten.map((s) => s.pfad), join(DIST, 'llms.txt'), join(DIST, 'llms-full.txt')].filter(existsSync);
for (const pfad of textDateien) {
  const text = lies(pfad).replace(/<[^>]+>/g, ' ');
  for (const m of text.matchAll(/(\S+)\s+(Kategorien|Lösungsfelder(?:n)?)\b/g)) {
    const zahl = zahlAus(m[1]);
    if (zahl !== null && zahl !== categories.length) {
      blocker.push(
        `${relative(DIST, pfad)}: „${m[1]} ${m[2]}“, die Daten führen ${categories.length}. ` +
          'Die Zahl aus categories.length ableiten (src/lib/zahlwort.ts), nicht von Hand schreiben.',
      );
    }
  }
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
