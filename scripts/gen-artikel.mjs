/**
 * Erzeugt alle Artikelseiten als statisches HTML.
 *
 * Zehn Seiten: ein Hauptartikel zu Praxissoftware samt Begriffsteil, dazu je
 * ein Artikel für die übrigen acht Kategorien der Karte. Die Karte bleibt das
 * Hauptthema – die Artikel erklären, was auf ihr steht.
 *
 * Warum statisch und nicht als Teil der React-Anwendung:
 *
 *  1. **Lesbarkeit ohne JavaScript.** Vor dem Vorrendern enthielt das
 *     ausgelieferte `index.html` null Zeichen Text. Googlebot rendert nach,
 *     GPTBot und ClaudeBot überwiegend nicht. Statische Seiten haben dieses
 *     Problem gar nicht erst.
 *  2. **Keine Routenlogik.** Auf GitHub Pages gibt es keinen Server, der eine
 *     unbekannte Adresse auf die Anwendung zurückführt. Eine Datei je Adresse
 *     ist die einzige Form, die dort zuverlässig funktioniert.
 *
 * Aufgabenteilung: Der Text steht in `src/data/articles.ts`, die Anbieter in
 * `src/data/providers.ts`, das Seitenverzeichnis in `scripts/seiten.mjs`.
 * Hier steht nur, wie daraus HTML wird.
 *
 * Aufruf: node scripts/gen-artikel.mjs
 */
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { providers } from '../src/data/providers.ts';
import { categories } from '../src/data/categories.ts';
import { ALLE_ARTIKEL, ARTIKEL_NACH_KATEGORIE, ENTWICKLUNG, HAUPTARTIKEL, meilensteinAnker } from './seiten.mjs';
import { AUS_HINWEISEN, BETEILIGUNG, FASSUNGEN, MEILENSTEINE } from '../src/data/historie.ts';
import { zahlwort } from '../src/lib/zahlwort.ts';
import { HERAUSGEBER, MARKE, SCHWESTER } from '../src/config/verbund.ts';
import { EDITION } from '../src/config/edition.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public');

const siteUrl = (process.env.VITE_SITE_URL || '').trim().replace(/\/+$/, '');
const hatDomain = /^https?:\/\//.test(siteUrl);
const absolut = (pfad) => (hatDomain ? `${siteUrl}${pfad}` : '');

const STAND_ISO = '2026-09-23';
const AUTOR = 'Thomas Freimoser';
const ROLLE = 'Experte für digitale Tiermedizin';

/*
  ------------------------------------------------------------------------
  Verweise nach außen
  ------------------------------------------------------------------------

  Entschieden am 24.09.2026: **Anbieterverweise folgen** – für alle Anbieter
  gleich, Petleo eingeschlossen. Eine Marktübersicht, die auf die Anbieter
  verweist, die sie beschreibt, ist ein redaktioneller Verweis und kein
  Link-Schema. Ihn zu entwerten, hätte nur den Zweck gehabt, Vorsicht zu
  demonstrieren.

  Die Gleichbehandlung trägt das: Jeder Anbieter bekommt genau einen Verweis je
  Kategorie, in der er steht, und die Sortierung ist alphabetisch. Es gibt
  keinen Anbieter mit mehr Verweisen, als seine Einordnung hergibt.

  **Eine Ausnahme bleibt, und sie ist der Grund, warum das trägt:** Der Verweis
  im Offenlegungskasten steht auf *jeder* Artikelseite. Ein seitenweit
  wiederholter Verweis auf das eigene Unternehmen ist genau das Muster, das
  Google als Eigenwerbung erkennt – und er wäre eine Bevorzugung, die die
  Tabellenverweise gerade nicht darstellen. Er trägt deshalb `nofollow`.
  Petleo profitiert damit wie jeder andere Anbieter, aber nicht darüber hinaus.
*/
const REL_OFFENLEGUNG = 'nofollow noopener';
const REL_ANBIETER = 'noopener external';

/*
  Angebote des Herausgebers, auf die die Artikel im Offenlegungskasten
  verweisen. Was hier nicht steht, erscheint nicht – es gibt keinen Zustand
  "kommt noch". Die Analyse-Seite wird ergänzt, sobald ihre Adresse feststeht.
*/
const VERBUNDENE_ANGEBOTE = [
  {
    name: 'Petleo',
    url: 'https://www.petleo.net',
    beschreibung:
      'Anbieter digitaler Lösungen für Tierarztpraxen. Der Herausgeber arbeitet für ' +
      'das Unternehmen und ist als Late Co-Founder an ihm beteiligt.',
  },
];

const esc = (v) =>
  String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/* ================================================================== */
/* Bausteine                                                          */
/* ================================================================== */

const LAND = { DE: 'Deutschland', AT: 'Österreich', CH: 'Schweiz' };
/* Leere Länderliste heißt „nicht geprüft“ – nie einen Markt behaupten, der nicht belegt ist. */
const maerkte = (p) => (p.countries.length ? p.countries.map((c) => LAND[c]).join(', ') : 'nicht geprüft');
const alphabetisch = (a, b) => a.name.localeCompare(b.name, 'de', { sensitivity: 'base' });

const kategorieVon = (id) => categories.find((c) => c.id === id);
const anbieterVon = (id) => providers.filter((p) => p.categories.includes(id)).sort(alphabetisch);

/** Eine Anbieterzeile. Der Name ist immer Text – ein Logo ist kein Name. */
/** Kurzbeschreibung in einer Kategorie – wie `descriptionFor` in src/lib/market.ts. */
const beschreibung = (p, id) => p.variants?.[id]?.description ?? p.description;

function zeile(p, id) {
  const name = p.website
    ? `<a href="${esc(p.website)}" rel="${REL_ANBIETER}">${esc(p.name)}</a>`
    : esc(p.name);
  return `        <tr>
          <th scope="row">${name}</th>
          <td>${esc(beschreibung(p, id))}</td>
          <td class="nowrap"><span class="nur-mobil">Märkte: </span>${esc(maerkte(p))}</td>
        </tr>`;
}

const tabelle = (liste, id) => `      <table>
        <thead>
          <tr><th scope="col">Anbieter</th><th scope="col">Kurzbeschreibung</th><th scope="col">Märkte</th></tr>
        </thead>
        <tbody>
${liste.map((p) => zeile(p, id)).join('\n')}
        </tbody>
      </table>`;

/**
 * Querverweise mit Begründung.
 *
 * Der Unterschied zu einer Linkliste ist der Satz dahinter: Er sagt, warum
 * dort weiterzulesen ist. Ohne ihn wäre das ein Linkteppich, und Google
 * behandelt Linkteppiche entsprechend.
 */
function abgrenzungsBlock(eintraege) {
  if (eintraege.length === 0) return '';
  const punkte = eintraege
    .map(({ kategorie, grund }) => {
      const ziel = ARTIKEL_NACH_KATEGORIE.get(kategorie);
      const kat = kategorieVon(kategorie);
      if (!ziel || !kat) return '';
      return `        <li>
          <a href="${esc(ziel.datei)}"><strong>${esc(kat.title)}</strong></a> —
          ${esc(grund)}
        </li>`;
    })
    .filter(Boolean)
    .join('\n');

  return `      <h2 id="abgrenzung">Wo die Kategorie aufhört</h2>
      <p>
        Die Übersicht trennt ${zahlwort(categories.length)} Lösungsfelder. Die Grenzen dazwischen sind der
        eigentliche Inhalt – hier verlaufen sie:
      </p>
      <ul class="verweise">
${punkte}
      </ul>`;
}

/** Verweise in den Begriffsteil des Hauptartikels. */
function begriffsBlock(ids, aktuelleDatei) {
  if (ids.length === 0) return '';
  const ziel = aktuelleDatei === HAUPTARTIKEL.datei ? '' : HAUPTARTIKEL.datei;
  const namen = {
    pims: 'PIMS',
    'cloud-on-premise': 'Cloud und On-Premise',
    'ambient-dokumentation': 'Ambient-Dokumentation',
    videosprechstunde: 'Praxiseigene und offene Videosprechstunde',
    intake: 'Intake und Self-Check-in',
    patientenportal: 'Patientenportal und Tierhalter-App',
    recall: 'Recall',
    schnittstelle: 'Schnittstelle',
  };
  const punkte = ids
    .filter((id) => namen[id])
    .map((id) => `<a href="${esc(ziel)}#begriff-${esc(id)}">${esc(namen[id])}</a>`)
    .join(' · ');
  return `      <p class="begriffe-verweis">
        <strong>Begriffe in diesem Artikel:</strong> ${punkte}
      </p>`;
}

/** Navigation über alle Artikel. Steht auf jeder Seite, unten. */
function weiterlesen(aktuellerPfad) {
  const punkte = ALLE_ARTIKEL.map((s) => {
    const aktiv = s.pfad === aktuellerPfad;
    const kat = kategorieVon(s.kategorie);
    const nr = `<span class="nr">${s.kategorie}</span>`;
    return aktiv
      ? `        <li class="aktiv">${nr} ${esc(kat?.title ?? s.kurzTitel)} <span class="muted">— Sie sind hier</span></li>`
      : `        <li>${nr} <a href="${esc(s.datei)}">${esc(kat?.title ?? s.kurzTitel)}</a></li>`;
  }).join('\n');

  return `      <h2 id="weiterlesen">Alle ${zahlwort(categories.length)} Lösungsfelder</h2>
      <p>
        Die <a href="./">interaktive Marktübersicht</a> zeigt alle aufgenommenen Anbieter auf einen Blick.
        Diese Artikel erklären die einzelnen Felder:
      </p>
      <ol class="artikelliste">
${punkte}
      </ol>`;
}

/**
 * Offenlegung. Steht am Ende jedes Artikels, nicht nur im Impressum.
 *
 * Eine Offenlegung, die man suchen muss, ist keine. Sie steht deshalb auf
 * jeder Seite, auf der ein verbundener Anbieter überhaupt vorkommen kann.
 */
function offenlegung(kategorieId) {
  const petleoDrin = kategorieId
    ? providers.some((p) => p.id === 'petleo' && p.categories.includes(kategorieId))
    : false;

  const angebote = VERBUNDENE_ANGEBOTE.map(
    (a) =>
      `          <li>
            <a href="${esc(a.url)}" rel="${REL_OFFENLEGUNG}">${esc(a.name)}</a> —
            ${esc(a.beschreibung)}
          </li>`,
  ).join('\n');

  return `      <aside class="offenlegung" aria-labelledby="offenlegung-titel">
        <h2 id="offenlegung-titel">Offenlegung</h2>
        <p>
          ${esc(AUTOR)} arbeitet für die Petleo GmbH und ist als Late Co-Founder an ihr
          beteiligt. Darüber hinaus ist er in der FleXchange-Medical GmbH aktiv.${
            petleoDrin
              ? ' <strong>Petleo ist in genau dieser Kategorie vertreten.</strong> Eine im strengen Sinne neutrale Darstellung kann dieser Artikel deshalb nicht sein – das sollte man beim Lesen wissen.'
              : ''
          }
        </p>
        <p>
          Was dennoch gilt: Die Sortierung ist rein alphabetisch, es gibt keine Rangfolge,
          keine Bewertung und keine bezahlten Platzierungen. Die Aufnahme folgt für alle
          Anbieter denselben Kriterien und ist kostenfrei. Jeder Anbieter erhält genau einen
          Verweis je Kategorie, in der er steht – auch der hier genannte.
        </p>
        <ul>
${angebote}
        </ul>
        <p class="muted">
          Ausführlich im Abschnitt <a href="./#transparenz">„Zur Transparenz"</a> der
          Marktübersicht.
        </p>
      </aside>`;
}

/* ================================================================== */
/* Seitengerüst                                                       */
/* ================================================================== */

const STIL = `      :root {
        color-scheme: light;
        --ink: #0f1419;
        --ink-soft: #333c45;
        --muted: #5b6874;
        --brand: #176595;
        --line: #bfe2f6;
        --line-soft: #dceffa;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        padding: 3rem 1.25rem 5rem;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
        color: var(--ink);
        background: #fff;
        line-height: 1.65;
        -webkit-font-smoothing: antialiased;
      }
      main { max-width: 48rem; margin: 0 auto; }
      h1 { font-size: 1.9rem; letter-spacing: -0.02em; margin: 0 0 0.5rem; line-height: 1.2; }
      h2 {
        font-size: 1.15rem;
        margin: 3rem 0 1rem;
        padding-top: 1.25rem;
        border-top: 1px solid var(--line-soft);
      }
      h3 { font-size: 1rem; margin: 0 0 0.4rem; }
      p, li { margin: 0 0 1rem; color: var(--ink-soft); }
      ul, ol { padding-left: 1.25rem; }
      a { color: var(--brand); }
      a:focus-visible { outline: 2px solid var(--brand); outline-offset: 2px; }
      /*
        Das Wachstumsdiagramm skaliert mit der Breite. Auf 375 px schrumpften
        die Beschriftungen auf rund 5 px – lesbar nur mit Lupe.
      */
      @media (max-width: 600px) { svg.wachstum text { font-size: 21px; } }
      /*
        Tippflächen mindestens 24 px (WCAG 2.2, 2.5.8). Gemessen waren in Listen
        und Tabellen 18–23 px – mit dem Daumen trifft man daneben. Links im
        Fließtext sind ausgenommen, wie es das Kriterium auch vorsieht.
      */
      .back, .verweise a, .artikelliste a, th a, footer a {
        display: inline-flex; align-items: center; min-height: 24px;
      }
      code { font-size: 0.9em; background: #f0f8fd; padding: 0.05rem 0.3rem; border-radius: 0.25rem; }
      .back { display: inline-block; margin-bottom: 2rem; font-size: 0.875rem; }
      .lead {
        border: 1px solid var(--line);
        border-radius: 0.75rem;
        background: #f0f8fd;
        padding: 1.25rem 1.5rem;
        margin: 0 0 2.5rem;
      }
      .lead p:last-child { margin-bottom: 0; }
      .lead .definition { color: var(--ink); font-weight: 600; }
      .lead strong { color: var(--ink); }
      table { border-collapse: collapse; width: 100%; margin: 0 0 1.5rem; font-size: 0.9375rem; }
      th, td {
        text-align: left;
        padding: 0.7rem 0.75rem;
        border-bottom: 1px solid var(--line-soft);
        vertical-align: top;
      }
      thead th { color: var(--ink); font-weight: 600; white-space: nowrap; }
      tbody th { font-weight: 600; color: var(--ink); white-space: nowrap; }
      td { color: var(--ink-soft); }
      .nowrap { white-space: nowrap; font-size: 0.875rem; color: var(--muted); }
      .begriff, .frage { margin: 0 0 1.75rem; }
      .begriff h3 span { font-weight: 400; }
      .muted { color: var(--muted); font-size: 0.9375rem; }
      .meta { color: var(--muted); font-size: 0.875rem; margin: 0 0 2rem; }
      .pruefliste li { margin-bottom: 0.6rem; }
      .verweise { list-style: none; padding: 0; }
      .verweise li {
        border-left: 3px solid var(--line);
        padding: 0.1rem 0 0.1rem 0.9rem;
        margin-bottom: 1rem;
      }
      .begriffe-verweis {
        font-size: 0.9375rem;
        background: #f7fbfe;
        border-radius: 0.5rem;
        padding: 0.8rem 1rem;
      }
      .begriffe-verweis strong { color: var(--ink); }
      .artikelliste { list-style: none; padding: 0; }
      .artikelliste li { margin-bottom: 0.55rem; }
      .artikelliste .nr {
        display: inline-block;
        min-width: 1.5rem;
        font-weight: 700;
        color: var(--brand);
        font-variant-numeric: tabular-nums;
      }
      .artikelliste .aktiv { color: var(--ink); font-weight: 600; }
      .offenlegung {
        margin-top: 3rem;
        border: 1px solid var(--line);
        border-radius: 0.75rem;
        background: #fbfdff;
        padding: 1.25rem 1.5rem;
      }
      .offenlegung h2 { margin: 0 0 0.75rem; border: 0; padding: 0; font-size: 1rem; }
      .offenlegung p:last-of-type { margin-bottom: 0; }
      .kennzahlen {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(7.5rem, 1fr));
        gap: 0.75rem;
        margin: 0 0 2.5rem;
        padding: 0;
        list-style: none;
      }
      .kennzahlen li {
        margin: 0;
        border: 1px solid var(--line);
        border-radius: 0.75rem;
        padding: 0.8rem 0.85rem;
        background: #fbfdff;
      }
      .kennzahlen strong {
        display: block;
        font-size: 1.6rem;
        line-height: 1.15;
        color: var(--brand);
        font-variant-numeric: tabular-nums;
      }
      .kennzahlen span { display: block; margin-top: 0.3rem; font-size: 0.8125rem; line-height: 1.35; color: var(--muted); }
      figure { margin: 0 0 2.5rem; }
      figure img { display: block; width: 100%; height: auto; border: 1px solid var(--line); border-radius: 0.5rem; }
      figcaption { font-size: 0.9375rem; color: var(--ink-soft); margin-top: 0.75rem; }
      figcaption strong { color: var(--ink); }
      .diagramm svg { width: 100%; height: auto; display: block; }
      .chronik { list-style: none; padding: 0; border-left: 2px solid var(--line); }
      .chronik li { position: relative; padding: 0 0 1.1rem 1.25rem; margin: 0; }
      .chronik li::before {
        content: '';
        position: absolute;
        left: -0.4rem;
        top: 0.5rem;
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 50%;
        background: var(--brand);
      }
      .chronik time { display: block; font-size: 0.8125rem; color: var(--muted); font-variant-numeric: tabular-nums; }
      .chronik strong { color: var(--ink); }
      .ueberleitung {
        margin: 3rem 0 0;
        border-radius: 0.75rem;
        background: #0f4c5c;
        color: #fff;
        padding: 1.5rem 1.6rem;
      }
      .ueberleitung h2 { margin: 0 0 0.6rem; border: 0; padding: 0; color: #fff; font-size: 1.15rem; }
      .ueberleitung p { color: #e6f0f2; }
      .ueberleitung p:last-child { margin-bottom: 0; }
      .ueberleitung a { color: #fff; font-weight: 600; }
      footer {
        margin-top: 3.5rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--line-soft);
        font-size: 0.875rem;
        color: var(--muted);
      }
      footer a { color: var(--muted); }
      .nur-mobil { display: none; }
      @media (max-width: 34rem) {
        table, thead, tbody, tr, th, td { display: block; }
        thead { display: none; }
        tbody tr { border-bottom: 1px solid var(--line); padding: 0.75rem 0; }
        th, td { border: 0; padding: 0.15rem 0; }
        /*
          Ohne Spaltenkopf stand unter jedem Anbieter nur „nicht geprüft“ – das
          las sich wie „Anbieter nicht geprüft“. Gemeint sind die Länder.
        */
        .nur-mobil { display: inline; }
      }`;

/*
  Vorschaubild je Lösungsfeld (scripts/gen-grafik.mjs, og/kategorie/<slug>.png).
  Ohne Kategorie – Entwicklungsseite – bleibt das Gesamtbild.
*/
function vorschau(kategorie) {
  const kat = kategorie ? kategorieVon(kategorie) : null;
  return kat
    ? { bild: `/og/kategorie/${kat.slug}.png`, alt: `${kat.title}: Anbieter im DACH-Markt, aus der Marktübersicht Die digitale Tierarztpraxis.` }
    : { bild: '/og/marktuebersicht.png', alt: 'Marktübersicht: digitale Lösungen für Tierarztpraxen im DACH-Markt, gegliedert nach Lösungsfeldern.' };
}

function seite({ pfad, titleTag, description, schema, koerper, krume, kategorie }) {
  const og = vorschau(kategorie);
  /*
    BreadcrumbList auf jeder Artikelseite: Marktübersicht → Artikel. Sie ordnet
    die Seite für Suchmaschinen ins Themenfeld ein und ersetzt in den
    Ergebnissen die nackte Adresse durch einen lesbaren Pfad. Nur mit Domain –
    die Einträge brauchen absolute Adressen, genau wie das Canonical.
  */
  const krumen = hatDomain
    ? [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Marktübersicht', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: krume ?? titleTag, item: absolut(pfad) },
          ],
        },
      ]
    : [];
  /*
    Die Website als eigene Einheit auf jeder Seite, nicht nur auf der
    Startseite: Das GEO-Audit vom 14.10.2026 fand auf den Artikeln keine
    Marke im Schema – dort stand nur „Die digitale Tierarztpraxis“ im Titel,
    „Tiermedizin in digital“ nur im og:site_name.
  */
  const website = hatDomain
    ? [{ '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: `${siteUrl}/`, name: MARKE, inLanguage: 'de' }]
    : [];
  // Google empfiehlt für Article ein Bild; es ist dasselbe wie die Social-Vorschau.
  const mitBild = schema.map((n) =>
    hatDomain && n['@type'] === 'Article' && !n.image
      ? { ...n, image: { '@type': 'ImageObject', url: absolut(og.bild), width: 1200, height: 630 } }
      : n,
  );
  const ld = JSON.stringify({ '@context': 'https://schema.org', '@graph': [...website, ...mitBild, ...krumen] }, null, 2)
    .split('\n')
    .map((l) => `      ${l}`)
    .join('\n');

  return `<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(titleTag)}</title>
    <meta name="description" content="${esc(description)}" />
    <meta name="author" content="${esc(AUTOR)}" />
${hatDomain ? `    <link rel="canonical" href="${esc(absolut(pfad))}" />\n` : ''}    <link rel="icon" href="favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="favicon-96.png" sizes="96x96" type="image/png" />
${hatDomain ? `    <link rel="alternate" type="application/atom+xml" title="${esc(MARKE)} – Änderungen" href="${esc(absolut('/feed.xml'))}" />\n` : ''}
    <link rel="icon" href="favicon-32.png" sizes="32x32" type="image/png" />
    <link rel="apple-touch-icon" href="apple-touch-icon.png" />
    <meta name="theme-color" content="#2b9ad8" />

    <meta property="og:type" content="article" />
    <meta property="og:title" content="${esc(titleTag)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:locale" content="de_DE" />
    <meta property="og:site_name" content="${esc(MARKE)}" />
${
  hatDomain
    ? `    <meta property="og:url" content="${esc(absolut(pfad))}" />\n    <meta property="og:image" content="${esc(absolut(og.bild))}" />\n    <meta property="og:image:width" content="1200" />\n    <meta property="og:image:height" content="630" />\n    <meta property="og:image:alt" content="${esc(og.alt)}" />\n    <meta name="twitter:image" content="${esc(absolut(og.bild))}" />\n`
    : ''
}    <meta name="twitter:card" content="summary_large_image" />

    <script type="application/ld+json">
${ld}
    </script>

    <style>
${STIL}
    </style>
  </head>
  <body>
    <main>
      <a class="back" href="./">← ${esc(MARKE)} · Zur Marktübersicht</a>
${koerper}

      <footer>
        <p>
          Alle genannten Marken-, Produkt- und Unternehmensnamen sind Eigentum der jeweiligen
          Rechteinhaber. Ihre Nennung erfolgt ausschließlich zu Informationszwecken im Rahmen
          dieser Marktübersicht; eine geschäftliche Verbindung entsteht daraus nicht.
        </p>
        <p>
          <a href="./">Marktübersicht</a> ·
          <a href="./#transparenz">Transparenz</a> ·
          <a href="entwicklung.html">Entwicklung</a> ·
          <a href="impressum.html#kontakt">Kontakt</a> ·
          <a href="impressum.html">Impressum</a> ·
          <a href="datenschutz.html">Datenschutz</a> ·
          <a href="haftungsausschluss.html">Haftungsausschluss</a>
        </p>
        <p>
          Herausgeber: <a href="${esc(HERAUSGEBER.sameAs[0])}" rel="me noopener">${esc(HERAUSGEBER.name)} auf LinkedIn</a>.
          Schwesterseite vom selben Herausgeber:
          <a href="${esc(SCHWESTER.url)}">${esc(SCHWESTER.name)}</a> –
          ${esc(SCHWESTER.beschreibung)}
        </p>
      </footer>
    </main>
  </body>
</html>
`;
}

/*
  Sichtbares Änderungsdatum. Google rät, das Datum auch auf der Seite zu zeigen,
  nicht nur im Schema (GEO-Audit vom 14.10.2026). Den endgültigen Wert setzt
  scripts/seitenstand.mjs nach dem Build aus dem Register – und lässt das
  Element beim Fingerabdruck außen vor, sonst würde das Datum sich selbst
  auslösen. Hier steht vorab der letzte bekannte Wert, damit auch die
  Entwicklungsvorschau ein Datum zeigt.
*/
const REGISTER_DATEI = join(ROOT, 'scripts', 'seitenstand.json');
const register = existsSync(REGISTER_DATEI) ? JSON.parse(readFileSync(REGISTER_DATEI, 'utf8')) : {};
const datumKurz = (iso) => iso.split('-').reverse().join('.');
const geaendertAm = (pfad) => {
  const iso = register[pfad]?.geaendert ?? STAND_ISO;
  return `aktualisiert am <time data-geaendert datetime="${iso}">${datumKurz(iso)}</time>`;
};

/** Der Herausgeber – dieselbe Person wie auf der Startseite und auf Tiermedizin in Zahlen. */
const PERSON = {
  '@type': 'Person',
  ...(hatDomain ? { '@id': `${siteUrl}/#herausgeber` } : {}),
  name: HERAUSGEBER.name,
  jobTitle: HERAUSGEBER.rolle,
  url: HERAUSGEBER.url,
  sameAs: [...HERAUSGEBER.sameAs],
};

/** Article-Schema, für alle Seiten gleich aufgebaut. */
const artikelSchema = (pfad, headline, description) => ({
  '@type': 'Article',
  headline,
  description,
  inLanguage: 'de',
  datePublished: STAND_ISO,
  dateModified: STAND_ISO,
  author: PERSON,
  publisher: PERSON,
  ...(hatDomain ? { isPartOf: { '@id': `${siteUrl}/#website` } } : {}),
  ...(hatDomain ? { mainEntityOfPage: absolut(pfad) } : {}),
  isAccessibleForFree: true,
});

/* ================================================================== */
/* Hauptartikel: Praxissoftware und Begriffsteil                      */
/* ================================================================== */

const BEGRIFFE = [
  {
    id: 'pims',
    term: 'PIMS',
    kurz: 'Practice Information Management System',
    text:
      'Die zentrale Verwaltungssoftware einer Tierarztpraxis. Ein PIMS führt Patientenakte, ' +
      'Terminkalender, Abrechnung, Warenwirtschaft und Kundenkommunikation in einem System ' +
      'zusammen. Im deutschsprachigen Markt wird meist von Praxissoftware oder ' +
      'Praxismanagementsystem gesprochen; das Kürzel PIMS stammt aus dem englischen Sprachraum ' +
      'und ist dort der übliche Fachbegriff.',
  },
  {
    id: 'cloud-on-premise',
    term: 'Cloud und On-Premise',
    kurz: 'zwei Betriebsarten derselben Software',
    text:
      'On-Premise heißt: Die Software läuft auf einem Rechner oder Server in der Praxis, die ' +
      'Daten liegen dort. Cloud heißt: Die Software läuft im Rechenzentrum des Anbieters und ' +
      'wird über den Browser genutzt. Der Unterschied betrifft nicht den Funktionsumfang, ' +
      'sondern wer Betrieb, Sicherung und Verfügbarkeit verantwortet – und was passiert, wenn ' +
      'die Internetverbindung ausfällt.',
  },
  {
    id: 'ambient-dokumentation',
    term: 'Ambient-Dokumentation',
    kurz: 'auch KI-Dokumentation oder Ambient Scribe',
    text:
      'Ein Assistent hört das Gespräch zwischen Tierarzt und Tierhalter mit und erzeugt daraus ' +
      'einen Entwurf des Behandlungseintrags. Die Tierärztin prüft und gibt frei; geschrieben ' +
      'wird nicht mehr von Hand. Abzugrenzen von reiner Spracherkennung, die Diktiertes nur in ' +
      'Text umwandelt, und von KI-Telefonassistenz, die Anrufe annimmt statt zu dokumentieren.',
  },
  {
    id: 'videosprechstunde',
    term: 'Praxiseigene und offene Videosprechstunde',
    kurz: 'zwei verschiedene Geschäftsmodelle',
    text:
      'Eine praxiseigene Videosprechstunde ist ein Werkzeug der Praxis: Die Praxis berät ihre ' +
      'eigenen Patienten per Video, unter ihrem Namen. Eine offene Videosprechstunde ist eine ' +
      'Plattform mit eigenem Tierärzteteam, an die sich Tierhalter direkt wenden, ohne ihre ' +
      'Praxis. Aus Sicht der Praxis ist das eine ein Angebot, das andere ein Wettbewerber – ' +
      'deshalb führt diese Übersicht beide als getrennte Kategorien.',
  },
  {
    id: 'intake',
    term: 'Intake und Self-Check-in',
    kurz: 'Erfassung vor dem Termin',
    text:
      'Der Tierhalter füllt Anamnese, Stammdaten und Einwilligungen vor dem Besuch digital aus, ' +
      'meist per Link oder am Tablet im Wartebereich. Ziel ist weniger Tippen am Empfang und ' +
      'eine vollständigere Vorgeschichte, bevor das Tier im Behandlungsraum steht.',
  },
  {
    id: 'patientenportal',
    term: 'Patientenportal und Tierhalter-App',
    kurz: 'der Zugang des Kunden',
    text:
      'Ein eigener Bereich für den Tierhalter: Impfungen, Befunde, Rechnungen, Termine, ' +
      'Nachrichten. Ein Portal läuft im Browser, eine App wird installiert. Der Begriff „App" ' +
      'allein ist im Markt mehrdeutig – er bezeichnet ebenso Endkundenangebote ohne jeden ' +
      'Praxisbezug.',
  },
  {
    id: 'recall',
    term: 'Recall',
    kurz: 'die automatische Erinnerung',
    text:
      'Die automatisierte Erinnerung an fällige Impfungen, Entwurmungen oder Kontrollen, per ' +
      'E-Mail, SMS oder Push. Recall ist meist Bestandteil des PIMS und einer der Gründe, warum ' +
      'sich ein Wechsel der Praxissoftware auf den Umsatz auswirkt.',
  },
  {
    id: 'schnittstelle',
    term: 'Schnittstelle',
    kurz: 'die Verbindung zwischen zwei Systemen',
    text:
      'Ein vereinbarter Weg, auf dem zwei Programme Daten austauschen. In der Tierarztpraxis ' +
      'betrifft das vor allem Labor, Bildgebung, Kassensystem und Zahlungsdienstleister. Ob ein ' +
      'Zusatzangebot ohne doppelte Eingabe nutzbar ist, entscheidet sich an dieser Stelle – ' +
      'nicht am Funktionsumfang des Zusatzangebots.',
  },
];

const kategorie6 = kategorieVon(6);
const inPims = anbieterVon(6);
const kernPims = inPims.filter((p) => !p.subgroups?.includes('pims-addons'));
const addOns = inPims.filter((p) => p.subgroups?.includes('pims-addons'));

/*
  Wortlaut aus „Weitere Fragen" zu `welche tierarzt software gibt es` und
  `tierarzt software vergleich`, am 23.09.2026 abgelesen. Nicht ausgedacht –
  und nur solche, die diese Seite ehrlich beantworten kann.
*/
const FRAGEN = [
  {
    frage: 'Welche Tierarzt-Software gibt es?',
    antwort:
      `Diese Übersicht führt ${kernPims.length} Praxissoftware-Anbieter für den deutschsprachigen ` +
      `Markt sowie ${addOns.length} Add-on-Anbieter, die bestehende Praxissoftware erweitern. Die ` +
      'Liste steht in diesem Artikel, alphabetisch sortiert. Sie erhebt keinen ' +
      'Anspruch auf Vollständigkeit.',
  },
  {
    frage: 'Welche Tierarzt-Software ist die beste?',
    antwort:
      'Diese Übersicht beantwortet das bewusst nicht. Es gibt keine Bewertung, keine Rangfolge ' +
      'und keine Empfehlung – welche Lösung passt, hängt von Praxisgröße, Tierarten, vorhandener ' +
      'Technik und Arbeitsweise ab. Die Übersicht zeigt, welche Anbieter es gibt; die Auswahl ' +
      'trifft die Praxis.',
  },
  {
    frage: 'Was kostet eine Praxissoftware für Tierärzte?',
    antwort:
      'Preise stehen hier nicht. Sie hängen von Arbeitsplätzen, Modulen und Vertragslaufzeit ab ' +
      'und veralten schneller, als eine Übersicht gepflegt werden kann. Preisauskünfte geben die ' +
      'Anbieter.',
  },
  {
    frage: 'Was bedeutet PIMS bei Tierarzt-Software?',
    antwort:
      'PIMS steht für Practice Information Management System und bezeichnet die zentrale ' +
      'Verwaltungssoftware einer Tierarztpraxis – Patientenakte, Termine, Abrechnung und ' +
      'Warenwirtschaft in einem System. Im deutschsprachigen Raum sagt man meist Praxissoftware ' +
      'oder Praxismanagementsystem.',
  },
];

function hauptartikel() {
  const titel = 'Welche Tierarzt-Software gibt es?';
  const beschreibung =
    'Praxissoftware-Anbieter für Tierarztpraxen im deutschsprachigen Raum – alphabetisch, ' +
    'ohne Rangfolge. Dazu PIMS, Add-ons und Auswahlfragen erklärt.';

  const koerper = `
      <h1>${esc(titel)}</h1>

      <div class="lead">
        <p class="definition">
          Tierarzt-Software – auch Praxissoftware oder PIMS genannt – ist das zentrale
          Verwaltungssystem einer Tierarztpraxis: Patientenakte, Termine, Abrechnung und
          Warenwirtschaft in einem System.
        </p>
        <p>
          <strong>Kurz:</strong> Für Tierarztpraxen im deutschsprachigen Raum sind in dieser
          Übersicht ${kernPims.length} Praxissoftware-Anbieter erfasst, dazu ${addOns.length}
          Anbieter von Add-ons, die vorhandene Praxissoftware um digitale Services erweitern.
          Die vollständige Liste steht weiter unten, alphabetisch sortiert.
        </p>
        <p>
          <strong>Was hier nicht steht:</strong> keine Rangfolge, keine Bewertung, keine Preise,
          kein „Testsieger". Die Gründe dafür stehen <a href="#keine-beste">weiter unten</a> –
          sie sind eine Grundentscheidung, keine Lücke.
        </p>
      </div>
      <p class="meta">Von ${esc(AUTOR)}, ${esc(ROLLE)} · Stand: ${esc(EDITION)}, ${geaendertAm(HAUPTARTIKEL.pfad)}</p>

      <h2 id="anbieter">Praxissoftware für Tierarztpraxen: die Anbieter</h2>
      <p>
        ${esc(kategorie6.description)} Sortiert ist rein alphabetisch. Die Reihenfolge sagt nichts
        über Größe, Verbreitung oder Eignung aus, und die Aufnahme ist für alle Anbieter
        kostenfrei.
      </p>
${tabelle(kernPims, 6)}

      <h3>${esc(kategorie6.subgroups[0].title)}</h3>
      <p>${esc(kategorie6.subgroups[0].description)}</p>
${tabelle(addOns, 6)}

      <p class="muted">
        Diese Liste erhebt keinen Anspruch auf Vollständigkeit. Fehlt ein Anbieter, ist das fast
        immer eine Lücke in der Recherche – Hinweise sind ausdrücklich erwünscht.
        <a href="./#anbieter-vorschlagen">Anbieter vorschlagen</a>.
      </p>

      <h2 id="keine-beste">Warum hier nicht steht, welche die beste ist</h2>
      <p>
        Die Frage wird oft gestellt, und sie ist berechtigt. Beantworten lässt sie sich trotzdem
        nicht seriös aus der Ferne: Welche Praxissoftware passt, hängt von Praxisgröße, Tierarten,
        vorhandener Technik, Laboranbindung und der Arbeitsweise des Teams ab. Zwei Praxen im
        selben Ort kommen bei denselben Anbietern zu gegensätzlichen Ergebnissen – beide zu Recht.
      </p>
      <p>
        Dazu kommt ein zweiter Grund, der hier offen genannt gehört: Der Herausgeber dieser
        Übersicht ist an einem der aufgeführten Anbieter beteiligt. Eine Rangfolge wäre in dieser
        Lage nicht glaubwürdig, gleich wie sie ausfiele.
      </p>
      <p>
        <strong>Die ehrliche Antwort auf „Welche ist die beste?" lautet deshalb: „Hier sind die,
        die es gibt – soweit sie bekannt sind."</strong> Den Rest entscheidet die Praxis – am besten mit zwei, drei
        Teststellungen.
      </p>

      <h2 id="begriffe">Begriffe der digitalen Tierarztpraxis</h2>
      <p>
        Die Begriffe, die in Gesprächen mit Anbietern regelmäßig fallen, kurz erklärt und
        voneinander abgegrenzt. Sie entsprechen den Kategorien der
        <a href="./#marktuebersicht">Marktübersicht</a>.
      </p>
${BEGRIFFE.map(
  (b) => `      <div class="begriff" id="begriff-${esc(b.id)}">
        <h3>${esc(b.term)} <span class="muted">— ${esc(b.kurz)}</span></h3>
        <p>${esc(b.text)}</p>
      </div>`,
).join('\n')}

      <h2 id="fragen">Häufig gestellte Fragen</h2>
${FRAGEN.map(
  (f) => `      <div class="frage">
        <h3>${esc(f.frage)}</h3>
        <p>${esc(f.antwort)}</p>
      </div>`,
).join('\n')}

      <h2 id="grenzen">Was diese Seite nicht leistet</h2>
      <p>
        <strong>Keine Rechtsauskunft.</strong> Ob und unter welchen Bedingungen tierärztlich per
        Video beraten, diagnostiziert oder verschrieben werden darf, ist eine Rechtsfrage. Sie
        wird hier bewusst nicht beantwortet: Der Herausgeber ist Fachmann für digitale
        Tiermedizin, nicht Jurist. Verbindliche Auskunft geben die zuständige Tierärztekammer und
        die jeweils geltenden Vorschriften.
      </p>
      <p>
        <strong>Keine Kaufberatung und kein Test.</strong> Kein Anbieter wurde im Praxisbetrieb
        geprüft. Die Kurzbeschreibungen fassen zusammen, wie ein Anbieter sein Angebot darstellt,
        und sind eine Einordnung des Herausgebers – keine Bestätigung des Anbieters und keine
        Aussage über Funktionsumfang oder Qualität.
      </p>
      <p>
        <strong>Keine Angebote für Tierhalter.</strong> Diese Übersicht richtet sich an Praxen.
        Wer als Tierhalter einen Termin, eine Online-Sprechstunde oder ein Rezept sucht, ist hier
        falsch.
      </p>

${weiterlesen(HAUPTARTIKEL.pfad)}

${offenlegung(6)}`;

  return seite({
    pfad: HAUPTARTIKEL.pfad,
    kategorie: HAUPTARTIKEL.kategorie,
    krume: 'Praxissoftware (PIMS)',
    titleTag: `${titel} ${kernPims.length} Anbieter im DACH-Markt`,
    description: beschreibung,
    schema: [
      artikelSchema(HAUPTARTIKEL.pfad, titel, beschreibung),
      {
        '@type': 'DefinedTermSet',
        name: 'Begriffe der digitalen Tierarztpraxis',
        inLanguage: 'de',
        hasDefinedTerm: BEGRIFFE.map((b) => ({
          '@type': 'DefinedTerm',
          name: b.term,
          description: b.text,
          ...(hatDomain ? { url: `${absolut(HAUPTARTIKEL.pfad)}#begriff-${b.id}` } : {}),
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: FRAGEN.map((f) => ({
          '@type': 'Question',
          name: f.frage,
          acceptedAnswer: { '@type': 'Answer', text: f.antwort },
        })),
      },
    ],
    koerper,
  });
}

/* ================================================================== */
/* Kategorie-Artikel                                                  */
/* ================================================================== */

/*
  „Kurz beantwortet“: drei Fragen je Artikel, deren Antworten ausschließlich
  aus den Daten und dem Artikel selbst stammen – Anbieterliste, Definition,
  Prüffragen. Nichts davon ist neu geschrieben, es ist dieselbe Aussage als
  abgeschlossener Absatz. Antwortmaschinen zitieren solche Absätze, weil sie
  ohne den Rest der Seite verständlich sind (GEO-Runde 26.10.2026).
*/
function kurzeFragen(a, kat, liste) {
  const namen = liste.map((p) => p.variants?.[kat.id]?.label ?? p.name);
  const aufzaehlung = namen.length > 1 ? `${namen.slice(0, -1).join(', ')} und ${namen.at(-1)}` : namen[0];
  return [
    {
      frage: `Welche Anbieter gibt es für ${kat.title}?`,
      antwort:
        `Die Marktübersicht führt in diesem Lösungsfeld ${zahlwort(namen.length)} Anbieter: ` +
        `${aufzaehlung}. Die Liste ist alphabetisch, ohne Rangfolge und ohne Anspruch auf ` +
        `Vollständigkeit (Stand: ${EDITION}).`,
    },
    { frage: `Was versteht man unter ${kat.title}?`, antwort: a.definition },
    {
      frage: 'Was sollte eine Praxis vor der Auswahl klären?',
      antwort: `Unter anderem diese Fragen: ${a.worauf.slice(0, 3).join(' ')} Die vollständige Prüfliste steht oben im Artikel.`,
    },
  ];
}

function kategorieArtikel(seiteInfo) {
  const a = seiteInfo.inhalt;
  const kat = kategorieVon(a.kategorie);
  const liste = anbieterVon(a.kategorie);
  const fragen = kurzeFragen(a, kat, liste);

  const koerper = `
      <h1>${esc(a.h1)}</h1>

      <div class="lead">
        <p class="definition">${esc(a.definition)}</p>
${a.lead.map((p) => `        <p>${esc(p)}</p>`).join('\n')}
      </div>
      <p class="meta">Von ${esc(AUTOR)}, ${esc(ROLLE)} · Stand: ${esc(EDITION)}, ${geaendertAm(seiteInfo.pfad)} ·
        Kategorie ${a.kategorie} der <a href="./#kategorie-${esc(kat.slug)}">Marktübersicht</a></p>

${begriffsBlock(a.begriffe, seiteInfo.datei)}

${a.abschnitte
  .map(
    (s) => `      <h2>${esc(s.h2)}</h2>
${s.absaetze.map((p) => `      <p>${esc(p)}</p>`).join('\n')}`,
  )
  .join('\n\n')}

      <h2 id="worauf">Worauf Praxen bei der Auswahl achten</h2>
      <ul class="pruefliste">
${a.worauf.map((f) => `        <li>${esc(f)}</li>`).join('\n')}
      </ul>

      <h2 id="anbieter">${esc(kat.title)}: die Anbieter</h2>
      <p>
        ${esc(kat.description)} Alphabetisch sortiert, ohne Rangfolge.
      </p>
${tabelle(liste, kat.id)}
      <p class="muted">
        Kein Anspruch auf Vollständigkeit. Fehlt ein Anbieter? <a href="./#anbieter-vorschlagen">Hinweise sind erwünscht</a>.
      </p>

      <h2 id="fragen">Kurz beantwortet</h2>
${fragen
  .map(
    (f) => `      <div class="frage">
        <h3>${esc(f.frage)}</h3>
        <p>${esc(f.antwort)}</p>
      </div>`,
  )
  .join('\n')}

${abgrenzungsBlock(a.abgrenzung)}

      <h2 id="grenzen">Was dieser Artikel nicht leistet</h2>
      <p>${esc(a.grenzen)}</p>${
        /*
          Der Standardsatz nur, wenn der Artikel die Rechtsfrage nicht schon
          selbst abgrenzt – sonst stand dieselbe Aussage zweimal untereinander.
        */
        /Recht/.test(a.grenzen)
          ? ''
          : `
      <p>
        <strong>Keine Rechtsauskunft.</strong> Rechts-, Gebühren- und berufsrechtliche Fragen
        werden hier nicht beantwortet. Zuständig sind die Tierärztekammern und die jeweils
        geltenden Vorschriften.
      </p>`
      }

${weiterlesen(seiteInfo.pfad)}

${offenlegung(a.kategorie)}`;

  return seite({
    pfad: seiteInfo.pfad,
    kategorie: a.kategorie,
    krume: kat.title,
    titleTag: a.titleTag,
    description: a.description,
    schema: [
      artikelSchema(seiteInfo.pfad, a.h1, a.description),
      {
        '@type': 'ItemList',
        name: `Anbieter: ${kat.title}`,
        description: kat.description,
        numberOfItems: liste.length,
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        itemListElement: liste.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: p.name,
          ...(p.website ? { url: p.website } : {}),
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: fragen.map((f) => ({
          '@type': 'Question',
          name: f.frage,
          acceptedAnswer: { '@type': 'Answer', text: f.antwort },
        })),
      },
    ],
    koerper,
  });
}

/* ================================================================== */
/* Schreiben                                                          */
/* ================================================================== */

/* ================================================================== */
/* Entwicklung: Fassungen, Wachstum, Beteiligung                      */
/* ================================================================== */

/*
  Diese Seite zeigt, wie die Übersicht entstanden ist. Zwei Gründe: Wer sie
  zitiert, soll sehen können, welche Fassung er vor sich hat – und die
  Entwicklung selbst ist eine Aussage über den Markt, der sich gerade
  sortiert. Alle Zahlen kommen aus src/data/historie.ts (aus der
  Git-Historie gezählt) oder, für heute, aus den Daten selbst.

  Historische Mengen stehen bewusst nicht als „neun Kategorien“ im Text:
  check-launch prüft jede Zahl vor „Kategorien“ gegen den heutigen Stand.
  Für frühere Stände heißt es deshalb „Felder“ oder die Zahl steht in einer
  Tabellenzelle.
*/
const datumDe = (iso) => iso.split('-').reverse().join('.');
const tausender = (n) => n.toLocaleString('de-DE');
const HEUTE = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Berlin' }).format(new Date());
/*
  Der letzte Punkt im Diagramm trägt den Tag der letzten Datenänderung, nicht
  den Bautag. Sonst ändert sich die Seite bei jedem Build, und Sitemap und
  dateModified melden Google eine Änderung, die es nicht gab. Stimmt der
  letzte Meilenstein mit den Daten überein, gilt sein Datum; sonst ist heute
  wirklich etwas neu.
*/
const LETZTER = MEILENSTEINE[MEILENSTEINE.length - 1];
const STAND =
  LETZTER.anbieter === providers.length && LETZTER.kategorien === categories.length ? LETZTER.datum : HEUTE;

for (const [beitrag, ids] of Object.entries(AUS_HINWEISEN)) {
  for (const id of ids) {
    if (!providers.some((p) => p.id === id)) {
      throw new Error(`historie.ts: „${id}“ (${beitrag}) gibt es in providers.ts nicht.`);
    }
  }
}

function wachstumsDiagramm() {
  const punkte = [];
  for (const m of MEILENSTEINE) {
    const letzter = punkte[punkte.length - 1];
    if (letzter && letzter.datum === m.datum) letzter.anbieter = m.anbieter;
    else punkte.push({ datum: m.datum, anbieter: m.anbieter });
  }
  if (punkte[punkte.length - 1].datum !== STAND) punkte.push({ datum: STAND, anbieter: providers.length });
  else punkte[punkte.length - 1].anbieter = providers.length;

  const B = 720, H = 300, L = 46, R = 24, O = 22, U = 40;
  const tag = (iso) => Date.parse(`${iso}T12:00:00Z`) / 864e5;
  const x0 = tag(punkte[0].datum) - 3;
  const x1 = tag(STAND) + 3;
  const yMax = Math.ceil((Math.max(...punkte.map((p) => p.anbieter)) + 8) / 10) * 10;
  const x = (iso) => L + ((tag(iso) - x0) / (x1 - x0)) * (B - L - R);
  const y = (n) => O + (1 - n / yMax) * (H - O - U);

  let pfad = `M${x(punkte[0].datum).toFixed(1)},${y(punkte[0].anbieter).toFixed(1)}`;
  for (let i = 1; i < punkte.length; i++) {
    pfad += ` H${x(punkte[i].datum).toFixed(1)} V${y(punkte[i].anbieter).toFixed(1)}`;
  }
  const flaeche = `${pfad} V${y(0).toFixed(1)} H${x(punkte[0].datum).toFixed(1)} Z`;

  const yTicks = [];
  for (let n = 0; n <= yMax; n += 20) yTicks.push(n);
  const xTicks = [];
  for (let t = Math.ceil(x0); t <= x1; t++) {
    const d = new Date(t * 864e5).toISOString().slice(0, 10);
    if (d.endsWith('-01') || d.endsWith('-15')) xTicks.push(d);
  }

  const marken = [
    ...FASSUNGEN.map((f, i) => ({ datum: f.datum, anbieter: f.anbieter, text: `${i === 0 ? '1. Fassung' : f.titel.split(' ')[0]} · ${f.anbieter}` })),
    { datum: STAND, anbieter: providers.length, text: `Heute · ${providers.length}` },
  ];

  const svg = `<svg class="wachstum" viewBox="0 0 ${B} ${H}" role="img" aria-labelledby="diagramm-titel diagramm-text" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system, 'Segoe UI', Roboto, Arial, sans-serif">
          <title id="diagramm-titel">Anbieter in der Marktübersicht im Zeitverlauf</title>
          <desc id="diagramm-text">Von ${punkte[0].anbieter} Anbietern am ${datumDe(punkte[0].datum)} auf ${providers.length} am ${datumDe(STAND)}. Die Werte stehen auch in der Chronik unten.</desc>
${yTicks
  .map(
    (n) =>
      `          <line x1="${L}" x2="${B - R}" y1="${y(n).toFixed(1)}" y2="${y(n).toFixed(1)}" stroke="#dceffa"/>
          <text x="${L - 8}" y="${(y(n) + 4).toFixed(1)}" text-anchor="end" font-size="12" fill="#5b6874">${n}</text>`,
  )
  .join('\n')}
${xTicks
  .map(
    (d) =>
      `          <text x="${x(d).toFixed(1)}" y="${H - U + 22}" text-anchor="middle" font-size="12" fill="#5b6874">${datumDe(d).slice(0, 6)}</text>`,
  )
  .join('\n')}
          <path d="${flaeche}" fill="#176595" opacity="0.08"/>
          <path d="${pfad}" fill="none" stroke="#176595" stroke-width="2.5" stroke-linejoin="round"/>
${marken
  .map((m, i) => {
    const mx = x(m.datum);
    const my = y(m.anbieter);
    const rechtsbuendig = mx > B - 160;
    // Liegt die Marke dicht neben der vorigen, steht ihre Beschriftung unter der Linie.
    const unten = i > 0 && mx - x(marken[i - 1].datum) < 110;
    return `          <circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="5" fill="${i === marken.length - 1 ? '#e36414' : '#176595'}" stroke="#fff" stroke-width="2"/>
          <text x="${(rechtsbuendig ? mx + 4 : mx + 9).toFixed(1)}" y="${(unten ? my + 24 : my - 11).toFixed(1)}" text-anchor="${rechtsbuendig ? 'end' : 'start'}" font-size="13" font-weight="600" fill="${i === marken.length - 1 ? '#b4470b' : '#0f1419'}">${esc(m.text)}</text>`;
  })
  .join('\n')}
        </svg>`;
  return svg;
}

function entwicklungsSeite() {
  const erste = FASSUNGEN[0];
  const personen = BETEILIGUNG.reduce((a, b) => a + b.personen, 0);
  const ausHinweisen = Object.values(AUS_HINWEISEN).reduce((a, ids) => a + ids.length, 0);
  const mitLinkedIn = FASSUNGEN.filter((f) => f.linkedin?.impressionen);
  const letzteKennzahl = mitLinkedIn[mitLinkedIn.length - 1];
  const titleTag = `Entwicklung der Marktübersicht – von ${erste.anbieter} auf ${providers.length} Anbieter`;
  const description =
    `Alle Fassungen der Marktübersicht digitale Tierarztpraxis seit dem ${datumDe(erste.datum)}: ` +
    'wie sie gewachsen ist und wie Hinweise aufgenommen werden.';

  const fassungen = FASSUNGEN.map((f) => {
    const vorschau = f.bild.replace(/\.png$/, '-vorschau.webp');
    const k = f.linkedin;
    const zahlen = k?.impressionen
      ? ` LinkedIn${k.stand ? ` (Stand ${datumDe(k.stand)})` : ''}: ${tausender(k.impressionen)} Impressionen, ` +
        `${k.reaktionen} Reaktionen, ${k.kommentare} Kommentare.`
      : '';
    return `      <figure>
        <a href="${esc(f.bild)}"><img src="${esc(vorschau)}" width="1600" height="${Math.round((1600 * f.bildHoehe) / f.bildBreite)}" loading="lazy" decoding="async" alt="${esc(`Marktübersicht vom ${datumDe(f.datum)}: ${f.anbieter} Anbieter`)}" /></a>
        <figcaption>
          <strong>${esc(f.titel)}, ${datumDe(f.datum)}</strong> – ${f.anbieter} Anbieter in ${f.kategorien} Feldern.
          ${esc(f.text)}${esc(zahlen)}
          <br /><a href="${esc(f.bild)}">Bild in voller Auflösung</a>${
            k ? ` · <a href="${esc(k.url)}" rel="noopener">Beitrag auf LinkedIn</a>` : ''
          }
        </figcaption>
      </figure>`;
  }).join('\n');

  const chronik = MEILENSTEINE.map(
    (m) => `        <li id="${meilensteinAnker(m)}">
          <time datetime="${m.datum}">${datumDe(m.datum)} · ${m.anbieter} Anbieter</time>
          <strong>${esc(m.titel)}.</strong> ${esc(m.text)}
        </li>`,
  ).join('\n');

  const beteiligung = BETEILIGUNG.map((b) => {
    const n = (AUS_HINWEISEN[b.beitrag] ?? []).length;
    return `          <tr>
            <th scope="row">${esc(b.beitrag)}</th>
            <td>${datumDe(b.datum)}</td>
            <td>${b.personen}</td>
            <td>${b.mitAnbieterhinweis}</td>
            <td>${n === 0 && b.beitrag !== FASSUNGEN[0].titel ? 'wird geprüft' : n}</td>
          </tr>`;
  }).join('\n');

  const koerper = `
      <h1>Wie die Marktübersicht gewachsen ist</h1>

      <div class="lead">
        <p class="definition">
          Die Marktübersicht „Die digitale Tierarztpraxis“ ist eine anbieterübergreifende
          Sammlung digitaler Lösungen für Tierarztpraxen im DACH-Raum, geordnet nach
          Lösungsfeldern und ohne Rangfolge.
        </p>
        <p>
          <strong>Am ${datumDe(erste.datum)} erschien die erste Fassung mit ${erste.anbieter} Anbietern.
          Heute führt die Übersicht ${providers.length} Anbieter in ${zahlwort(categories.length)} Lösungsfeldern.</strong>
          ${ausHinweisen} der ${providers.length - erste.anbieter} neuen Anbieter kamen über Hinweise von
          Tierärztinnen, Tierärzten und Anbietern unter den LinkedIn-Beiträgen, die übrigen aus
          eigener Recherche. Diese Seite hält jede Fassung fest, damit
          nachvollziehbar bleibt, welcher Stand wann galt.
        </p>
      </div>
      <p class="meta">Von ${esc(AUTOR)}, ${esc(ROLLE)} · Stand: ${esc(EDITION)}, ${geaendertAm(ENTWICKLUNG.pfad)}</p>

      <ul class="kennzahlen">
        <li><strong>${erste.anbieter} → ${providers.length}</strong><span>Anbieter seit der ersten Fassung</span></li>
        <li><strong>${erste.kategorien} → ${categories.length}</strong><span>Lösungsfelder</span></li>
        <li><strong>${personen}</strong><span>Kommentierende, je Beitrag gezählt</span></li>
        <li><strong>${ausHinweisen}</strong><span>Anbieter über Hinweise aufgenommen</span></li>${
          letzteKennzahl
            ? `\n        <li><strong>${tausender(letzteKennzahl.linkedin.impressionen)}</strong><span>Impressionen des ${esc(letzteKennzahl.titel === 'Update nach dem Feedback' ? 'Update-Beitrags' : 'Beitrags')}</span></li>`
            : ''
        }
      </ul>

      <h2 id="wachstum">Wachstum</h2>
      <div class="diagramm">
        ${wachstumsDiagramm()}
      </div>
      <p class="muted">
        Anbieter in der Übersicht je Tag. Ein Anbieter in mehreren Lösungsfeldern zählt einmal.
        Die Werte vor heute sind aus der Versionsgeschichte der Daten gezählt.
      </p>

      <h2 id="fassungen">Alle Fassungen</h2>
      <p>
        Jede veröffentlichte Fassung bleibt hier abrufbar, so wie sie damals geteilt wurde. Die
        aktuelle Karte steht immer auf der <a href="./">Startseite</a> und lässt sich dort mit
        Datumsstempel herunterladen.
      </p>
${fassungen}

      <h2 id="chronik">Was sich verbessert hat</h2>
      <ol class="chronik">
${chronik}
      </ol>

      <h2 id="aufnahme">So kommen Anbieter in die Übersicht</h2>
      <p>Für jeden Hinweis gilt dieselbe Regel, auch für den Anbieter, an dem der Herausgeber beteiligt ist:</p>
      <ul class="pruefliste">
        <li><strong>Ein digitales Produkt</strong> für Tierarztpraxen – oder für Tierhalter auf dem Weg zur Praxis. Dienstleistungen wie Steuerberatung gehören nicht hinein.</li>
        <li><strong>Angeboten im DACH-Raum.</strong> Länder stehen erst dann beim Anbieter, wenn sie belegt sind.</li>
        <li><strong>Eingeordnet wird nach der Website des Anbieters,</strong> nicht nach dem Hinweis. Eine Funktion, die dort nicht beschrieben ist, führt zu keiner zusätzlichen Kategorie.</li>
        <li><strong>Neue Lösungsfelder</strong> entstehen erst, wenn mehrere Anbieter sie belegen – sonst zerfasert die Karte.</li>
        <li><strong>Kostenfrei und ohne Rangfolge.</strong> Sortiert wird alphabetisch.</li>
      </ul>
      <p>
        Hinweise nimmt die <a href="./#anbieter-vorschlagen">Marktübersicht</a> jederzeit entgegen.
      </p>

      <h2 id="beteiligung">Beteiligung</h2>
      <table>
        <thead>
          <tr><th scope="col">Beitrag</th><th scope="col">Datum</th><th scope="col">Kommentierende</th><th scope="col">mit Anbieterhinweis</th><th scope="col">daraus aufgenommen</th></tr>
        </thead>
        <tbody>
${beteiligung}
        </tbody>
      </table>
      <p class="muted">
        Gezählt sind verschiedene Personen und Unternehmensseiten, ohne den Herausgeber. Namen
        stehen hier bewusst nicht: Ein Kommentar auf LinkedIn ist keine Einwilligung, auf einer
        anderen Seite genannt zu werden.
      </p>

      <aside class="ueberleitung" aria-labelledby="zahlen-titel">
        <h2 id="zahlen-titel">Wie groß ist der Markt, den diese Karte ordnet?</h2>
        <p>
          Wie viele Tierärztinnen und Tierärzte es gibt, wie viele Praxen und wie viele Haustiere
          sie versorgen: Diese Zahlen stehen auf der Schwesterseite
          <a href="${esc(SCHWESTER.url)}">${esc(SCHWESTER.name)}</a> – jede mit Quelle.
        </p>
        <p>Diese Übersicht zeigt, welche Lösungen es gibt. ${esc(SCHWESTER.name)} zeigt, für wen.</p>
      </aside>
${offenlegung(null)}`;

  return seite({
    pfad: ENTWICKLUNG.pfad,
    titleTag,
    description,
    krume: 'Entwicklung',
    schema: [artikelSchema(ENTWICKLUNG.pfad, 'Wie die Marktübersicht gewachsen ist', description)],
    koerper,
  });
}

const woerter = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;

let gesamt = 0;
const zeilen = [];

const haupt = hauptartikel();
writeFileSync(join(OUT, HAUPTARTIKEL.datei), haupt, 'utf8');
gesamt += woerter(haupt);
zeilen.push(`  ${HAUPTARTIKEL.datei.padEnd(36)} ${woerter(haupt)} Wörter`);

const entwicklung = entwicklungsSeite();
writeFileSync(join(OUT, ENTWICKLUNG.datei), entwicklung, 'utf8');
gesamt += woerter(entwicklung);
zeilen.push(`  ${ENTWICKLUNG.datei.padEnd(36)} ${woerter(entwicklung)} Wörter`);

for (const s of ALLE_ARTIKEL) {
  if (!s.inhalt) continue;
  const html = kategorieArtikel(s);
  writeFileSync(join(OUT, s.datei), html, 'utf8');
  gesamt += woerter(html);
  zeilen.push(`  ${s.datei.padEnd(36)} ${woerter(html)} Wörter`);
}

/* ================================================================== */
/* llms-full.txt                                                      */
/* ================================================================== */

/*
  Der Volltext aller Artikel für Antwortmaschinen. `llms.txt` sagt, wofür die
  Seite eine Quelle ist; diese Datei liefert den Text selbst, ohne HTML und
  ohne dass jemand zehn Seiten abrufen muss.

  Sie entsteht hier und nicht in gen-seo.mjs, weil nur hier alle Inhalte
  beisammen sind – Begriffsteil und Fragen des Hauptartikels eingeschlossen.
  Nur mit Domain: Jeder Abschnitt nennt seine Quelladresse absolut, und eine
  falsche Adresse wäre schlechter als keine.
*/
const md = (t) => String(t).replace(/\s+/g, ' ').trim();
const anbieterZeilen = (liste, id) =>
  liste
    .map((p) => `- ${p.name}: ${md(beschreibung(p, id))} (Märkte: ${maerkte(p)})`)
    .join('\n');

function volltext() {
  const teile = [
    '# Die digitale Tierarztpraxis – Marktübersicht: Volltext',
    '',
    `> Volltext aller Artikel der Marktübersicht, Stand ${EDITION}. ${providers.length} Anbieter ` +
      `in ${zahlwort(categories.length)} Lösungsfeldern für Tierarztpraxen in Deutschland, ` +
      'Österreich und der Schweiz. Alphabetisch sortiert, ohne Rangfolge, ohne Bewertung, ' +
      'ohne Preise, kein Anspruch auf Vollständigkeit.',
    '',
    `Herausgeber: ${AUTOR}, ${ROLLE}. Offenlegung: Der Herausgeber arbeitet für die Petleo GmbH ` +
      'und ist als Late Co-Founder an ihr beteiligt; Petleo ist in mehreren Kategorien vertreten. ' +
      'Eine im strengen Sinne neutrale Übersicht ist das deshalb nicht.',
    '',
    `Interaktive Übersicht: ${siteUrl}/`,
    '',
  ];

  for (const s of ALLE_ARTIKEL) {
    const kat = kategorieVon(s.kategorie);
    teile.push('---', '', `## ${s.kategorie}. ${kat.title}`, '', `Quelle: ${absolut(s.pfad)}`, '');

    if (!s.inhalt) {
      // Hauptartikel: Praxissoftware, Begriffe, Fragen
      teile.push(md(kat.description), '', '### Praxissoftware-Anbieter', '', anbieterZeilen(kernPims, 6), '');
      teile.push(`### ${kategorie6.subgroups[0].title}`, '', anbieterZeilen(addOns, 6), '');
      teile.push('### Begriffe', '');
      for (const b of BEGRIFFE) teile.push(`**${b.term}** (${b.kurz}): ${md(b.text)}`, '');
      teile.push('### Häufig gestellte Fragen', '');
      for (const f of FRAGEN) teile.push(`**${f.frage}** ${md(f.antwort)}`, '');
      continue;
    }

    const a = s.inhalt;
    teile.push(md(a.definition), '');
    for (const p of a.lead) teile.push(md(p), '');
    for (const ab of a.abschnitte) {
      teile.push(`### ${ab.h2}`, '');
      for (const p of ab.absaetze) teile.push(md(p), '');
    }
    teile.push('### Worauf Praxen bei der Auswahl achten', '', a.worauf.map((w) => `- ${md(w)}`).join('\n'), '');
    teile.push('### Anbieter', '', anbieterZeilen(anbieterVon(a.kategorie), a.kategorie), '');
    teile.push('### Was dieser Artikel nicht leistet', '', md(a.grenzen), '');
  }
  return teile.join('\n') + '\n';
}

if (hatDomain) {
  writeFileSync(join(OUT, 'llms-full.txt'), volltext(), 'utf8');
} else {
  rmSync(join(OUT, 'llms-full.txt'), { force: true });
}

console.log(
  `${ALLE_ARTIKEL.length} Artikelseiten erzeugt, zusammen rund ${gesamt} Wörter:\n` +
    zeilen.join('\n') +
    (hatDomain ? '' : '\nOhne VITE_SITE_URL: keine Canonicals und keine og:url – das ist Absicht.'),
);
