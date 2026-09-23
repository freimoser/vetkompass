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
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { providers } from '../src/data/providers.ts';
import { categories } from '../src/data/categories.ts';
import { ALLE_ARTIKEL, ARTIKEL_NACH_KATEGORIE, HAUPTARTIKEL } from './seiten.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public');

const siteUrl = (process.env.VITE_SITE_URL || '').trim().replace(/\/+$/, '');
const hatDomain = /^https?:\/\//.test(siteUrl);
const absolut = (pfad) => (hatDomain ? `${siteUrl}${pfad}` : '');

const EDITION = 'September 2026';
const STAND_ISO = '2026-09-23';
const AUTOR = 'Thomas Freimoser';
const ROLLE = 'Experte für digitale Tiermedizin';

/*
  ------------------------------------------------------------------------
  Verweise auf eigene und verbundene Angebote
  ------------------------------------------------------------------------

  `REL_VERBUNDEN` gilt für jeden Verweis auf ein Angebot, an dem der
  Herausgeber wirtschaftlich beteiligt ist.

  Warum `nofollow` und nicht ein gewöhnlicher Verweis: Google zählt Links, die
  jemand auf einer eigenen Seite zugunsten eines eigenen Angebots setzt, zu den
  Link-Schemata, wenn sie nicht gekennzeichnet sind. Der Schaden träfe beide
  Seiten – die Übersicht und das verlinkte Angebot.

  Wichtiger noch ist der inhaltliche Grund: Das einzige Kapital dieser Seite
  ist, dass sie keine Sonderbehandlung kennt. Ein ungekennzeichneter
  Werbeverweis auf den Anbieter, an dem der Herausgeber beteiligt ist, wäre
  genau die Sonderbehandlung, deren Abwesenheit die Seite behauptet.

  Die Anbieterverweise in den Tabellen tragen aus demselben Grund `nofollow` –
  für alle gleich, ohne Ausnahme.
*/
const REL_VERBUNDEN = 'nofollow noopener';
const REL_ANBIETER = 'nofollow noopener external';

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
const alphabetisch = (a, b) => a.name.localeCompare(b.name, 'de', { sensitivity: 'base' });

const kategorieVon = (id) => categories.find((c) => c.id === id);
const anbieterVon = (id) => providers.filter((p) => p.categories.includes(id)).sort(alphabetisch);

/** Eine Anbieterzeile. Der Name ist immer Text – ein Logo ist kein Name. */
function zeile(p) {
  const name = p.website
    ? `<a href="${esc(p.website)}" rel="${REL_ANBIETER}">${esc(p.name)}</a>`
    : esc(p.name);
  return `        <tr>
          <th scope="row">${name}</th>
          <td>${esc(p.description)}</td>
          <td class="nowrap">${esc(p.countries.map((c) => LAND[c]).join(', '))}</td>
        </tr>`;
}

const tabelle = (liste) => `      <table>
        <thead>
          <tr><th scope="col">Anbieter</th><th scope="col">Kurzbeschreibung</th><th scope="col">Märkte</th></tr>
        </thead>
        <tbody>
${liste.map(zeile).join('\n')}
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
        Die Übersicht trennt neun Lösungsfelder. Die Grenzen dazwischen sind der
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

  return `      <h2 id="weiterlesen">Alle neun Lösungsfelder</h2>
      <p>
        Die <a href="./">interaktive Marktübersicht</a> zeigt alle Anbieter auf einen Blick.
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
            <a href="${esc(a.url)}" rel="${REL_VERBUNDEN}">${esc(a.name)}</a> —
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
          Anbieter denselben Kriterien und ist kostenfrei. Alle Anbieterverweise auf dieser
          Seite sind als <code>nofollow</code> gekennzeichnet – für jeden Anbieter gleich.
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
        --brand: #1a7eb8;
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
      footer {
        margin-top: 3.5rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--line-soft);
        font-size: 0.875rem;
        color: var(--muted);
      }
      footer a { color: var(--muted); }
      @media (max-width: 34rem) {
        table, thead, tbody, tr, th, td { display: block; }
        thead { display: none; }
        tbody tr { border-bottom: 1px solid var(--line); padding: 0.75rem 0; }
        th, td { border: 0; padding: 0.15rem 0; }
      }`;

function seite({ pfad, titleTag, description, schema, koerper }) {
  const ld = JSON.stringify({ '@context': 'https://schema.org', '@graph': schema }, null, 2)
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
    <link rel="icon" href="favicon-32.png" sizes="32x32" type="image/png" />
    <link rel="apple-touch-icon" href="apple-touch-icon.png" />
    <meta name="theme-color" content="#2b9ad8" />

    <meta property="og:type" content="article" />
    <meta property="og:title" content="${esc(titleTag)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:locale" content="de_DE" />
${
  hatDomain
    ? `    <meta property="og:url" content="${esc(absolut(pfad))}" />\n    <meta property="og:image" content="${esc(absolut('/og/marktuebersicht-2026.png'))}" />\n`
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
      <a class="back" href="./">← Zur Marktübersicht</a>
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
          <a href="impressum.html">Impressum</a> ·
          <a href="datenschutz.html">Datenschutz</a> ·
          <a href="haftungsausschluss.html">Haftungsausschluss</a>
        </p>
      </footer>
    </main>
  </body>
</html>
`;
}

/** Article-Schema, für alle Seiten gleich aufgebaut. */
const artikelSchema = (pfad, headline, description) => ({
  '@type': 'Article',
  headline,
  description,
  inLanguage: 'de',
  datePublished: STAND_ISO,
  dateModified: STAND_ISO,
  author: { '@type': 'Person', name: AUTOR, jobTitle: ROLLE },
  publisher: { '@type': 'Person', name: AUTOR },
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
      'vollständige Liste steht in diesem Artikel, alphabetisch sortiert. Sie erhebt keinen ' +
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
    'Alle Praxissoftware-Anbieter für Tierarztpraxen in Deutschland, Österreich und der ' +
    'Schweiz – alphabetisch, ohne Rangfolge, ohne Preise. Dazu die Begriffe der digitalen ' +
    'Tierarztpraxis erklärt: PIMS, Cloud, Ambient-Dokumentation, Videosprechstunde.';

  const koerper = `
      <h1>${esc(titel)}</h1>
      <p class="meta">Von ${esc(AUTOR)}, ${esc(ROLLE)} · Stand: ${esc(EDITION)}</p>

      <div class="lead">
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

      <h2 id="anbieter">Praxissoftware für Tierarztpraxen: die Anbieter</h2>
      <p>
        ${esc(kategorie6.description)} Sortiert ist rein alphabetisch. Die Reihenfolge sagt nichts
        über Größe, Verbreitung oder Eignung aus, und die Aufnahme ist für alle Anbieter
        kostenfrei.
      </p>
${tabelle(kernPims)}

      <h3>${esc(kategorie6.subgroups[0].title)}</h3>
      <p>${esc(kategorie6.subgroups[0].description)}</p>
${tabelle(addOns)}

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
        <strong>Die ehrliche Antwort auf „Welche ist die beste?" lautet deshalb: „Hier sind alle,
        die es gibt."</strong> Den Rest entscheidet die Praxis – am besten mit zwei, drei
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

function kategorieArtikel(seiteInfo) {
  const a = seiteInfo.inhalt;
  const kat = kategorieVon(a.kategorie);
  const liste = anbieterVon(a.kategorie);

  const koerper = `
      <h1>${esc(a.h1)}</h1>
      <p class="meta">Von ${esc(AUTOR)}, ${esc(ROLLE)} · Stand: ${esc(EDITION)} ·
        Kategorie ${a.kategorie} der <a href="./#kategorie-${esc(kat.slug)}">Marktübersicht</a></p>

      <div class="lead">
${a.lead.map((p) => `        <p>${esc(p)}</p>`).join('\n')}
      </div>

${begriffsBlock(a.begriffe, seiteInfo.datei)}

${a.abschnitte
  .map(
    (s) => `      <h2>${esc(s.h2)}</h2>
${s.absaetze.map((p) => `      <p>${esc(p)}</p>`).join('\n')}`,
  )
  .join('\n\n')}

      <h2 id="worauf">Worauf Praxen bei der Auswahl achten</h2>
      <p>
        Fragen, die sich vor einer Entscheidung klären lassen – und die im Verkaufsgespräch
        selten von allein gestellt werden:
      </p>
      <ul class="pruefliste">
${a.worauf.map((f) => `        <li>${esc(f)}</li>`).join('\n')}
      </ul>

      <h2 id="anbieter">${esc(kat.title)}: die Anbieter</h2>
      <p>
        ${esc(kat.description)} Sortiert ist rein alphabetisch; die Reihenfolge sagt nichts über
        Größe, Verbreitung oder Eignung aus. Anbieter, die mehrere Lösungsfelder abdecken,
        erscheinen in mehreren Kategorien.
      </p>
${tabelle(liste)}
      <p class="muted">
        Kein Anspruch auf Vollständigkeit. Fehlt ein Anbieter, ist das fast immer eine Lücke in
        der Recherche – <a href="./#anbieter-vorschlagen">Hinweise sind erwünscht</a>.
      </p>

${abgrenzungsBlock(a.abgrenzung)}

      <h2 id="grenzen">Was dieser Artikel nicht leistet</h2>
      <p>${esc(a.grenzen)}</p>
      <p>
        <strong>Keine Rechtsauskunft.</strong> Rechts-, Gebühren- und berufsrechtliche Fragen
        werden hier nicht beantwortet. Zuständig sind die Tierärztekammern und die jeweils
        geltenden Vorschriften.
      </p>

${weiterlesen(seiteInfo.pfad)}

${offenlegung(a.kategorie)}`;

  return seite({
    pfad: seiteInfo.pfad,
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
    ],
    koerper,
  });
}

/* ================================================================== */
/* Schreiben                                                          */
/* ================================================================== */

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

for (const s of ALLE_ARTIKEL) {
  if (!s.inhalt) continue;
  const html = kategorieArtikel(s);
  writeFileSync(join(OUT, s.datei), html, 'utf8');
  gesamt += woerter(html);
  zeilen.push(`  ${s.datei.padEnd(36)} ${woerter(html)} Wörter`);
}

console.log(
  `${ALLE_ARTIKEL.length} Artikelseiten erzeugt, zusammen rund ${gesamt} Wörter:\n` +
    zeilen.join('\n') +
    (hatDomain ? '' : '\nOhne VITE_SITE_URL: keine Canonicals und keine og:url – das ist Absicht.'),
);
