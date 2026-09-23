/**
 * Erzeugt den Begriffs- und Anbieterartikel als statisches HTML.
 *
 * Warum dieser Artikel und warum statisch – beides ist gemessen begründet:
 *
 *  1. **Warum statisch.** Die Startseite ist eine React-Anwendung. Vor dem
 *     Vorrendern enthielt ihr HTML null Zeichen Text. Auch vorgerendert steht
 *     dort nur, was die Karte zeigt: Namen und Kategorien. Die Beschreibungen
 *     stecken im Anbieter-Dialog und entstehen erst per JavaScript. Dieser
 *     Artikel liefert den Fließtext, den eine Antwortmaschine zitieren kann,
 *     ohne JavaScript auszuführen.
 *
 *  2. **Warum dieses Thema.** Der Autocomplete-Sweep zum geplanten Begriffsteil
 *     ergab 192 Anfragen und nur 17 Vorschläge – nach „was ist ein pims" fragt
 *     praktisch niemand, der Begriff gehört in der Suche einem Cocktail. Der
 *     Begriffsteil ist deshalb ausdrücklich **keine** SEO-Maßnahme, sondern
 *     eine GEO-Maßnahme: Definitionen sind das, was zitiert wird, auch ohne
 *     dass jemand sie eintippt.
 *     Gemessene Nachfrage gibt es dagegen für „welche tierarzt software gibt
 *     es" – geprüfte SERP, **keine KI-Übersicht**, Klick also intakt. Deshalb
 *     beantwortet der Artikel diese Frage und trägt den Begriffsteil mit.
 *
 *  3. **Warum aus den Daten erzeugt.** Eine von Hand gepflegte Anbieterliste
 *     im Artikel wäre nach der nächsten Ergänzung falsch. Sie kommt aus
 *     `src/data/providers.ts` – dieselbe Quelle wie die Karte.
 *
 * Aufruf: node scripts/gen-artikel.mjs
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { providers } from '../src/data/providers.ts';
import { categories } from '../src/data/categories.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public');

/*
  Die Adresse steht an vier Stellen: Canonical hier, Sitemap in gen-seo.mjs,
  Verweis in src/config/site.ts und Prüfung in check-launch.mjs. Sie tragen
  alle die Endung .html – GitHub Pages liefert die Seite zwar auch ohne aus,
  aber zwei Schreibweisen für dieselbe Seite sind zwei Adressen für Google.
*/
export const ARTIKEL_PFAD = '/tierarzt-software.html';
const DATEI = 'tierarzt-software.html';

const siteUrl = (process.env.VITE_SITE_URL || '').trim().replace(/\/+$/, '');
const hatDomain = /^https?:\/\//.test(siteUrl);
const absolut = (pfad) => (hatDomain ? `${siteUrl}${pfad}` : '');

const EDITION = 'September 2026';
const STAND_ISO = '2026-09-23';
const AUTOR = 'Thomas Freimoser';
const TITEL = 'Welche Tierarzt-Software gibt es?';
const BESCHREIBUNG =
  'Alle Praxissoftware-Anbieter für Tierarztpraxen in Deutschland, Österreich und der ' +
  'Schweiz – alphabetisch, ohne Rangfolge, ohne Preise. Dazu die Begriffe der ' +
  'digitalen Tierarztpraxis erklärt: PIMS, Cloud, Ambient-Dokumentation, Videosprechstunde.';

const esc = (v) =>
  String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ---------------------------------------------------------------- */
/* Anbieter aus den Daten                                            */
/* ---------------------------------------------------------------- */

const LAND = { DE: 'Deutschland', AT: 'Österreich', CH: 'Schweiz' };
const alphabetisch = (a, b) => a.name.localeCompare(b.name, 'de', { sensitivity: 'base' });

const kategorie6 = categories.find((c) => c.id === 6);
const inPims = providers.filter((p) => p.categories.includes(6));
const kernPims = inPims.filter((p) => !p.subgroups?.includes('pims-addons')).sort(alphabetisch);
const addOns = inPims.filter((p) => p.subgroups?.includes('pims-addons')).sort(alphabetisch);

/**
 * Eine Anbieterzeile. Der Name ist immer Text, nie nur ein Logo – ein Bild ist
 * für eine Antwortmaschine kein Anbietername.
 */
function zeile(p) {
  const name = p.website
    ? `<a href="${esc(p.website)}" rel="nofollow noopener external">${esc(p.name)}</a>`
    : esc(p.name);
  const laender = p.countries.map((c) => LAND[c]).join(', ');
  return `        <tr>
          <th scope="row">${name}</th>
          <td>${esc(p.description)}</td>
          <td class="nowrap">${esc(laender)}</td>
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

/* ---------------------------------------------------------------- */
/* Begriffsteil                                                      */
/* ---------------------------------------------------------------- */

/*
  Bewusst nur Marktvokabular, keine Rechtsbegriffe. Was tierärztlich per Video
  erlaubt ist und wann ein Rezept ausgestellt werden darf, ist eine
  Rechtsfrage – der Herausgeber ist Fachmann für digitale Tiermedizin, nicht
  Jurist. Der Artikel benennt die Frage und beantwortet sie nicht.
*/
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
      'wird nicht mehr von Hand. Abzugrenzen von reiner Spracherkennung, die Diktiertes nur ' +
      'in Text umwandelt, und von KI-Telefonassistenz, die Anrufe annimmt statt zu dokumentieren.',
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

const begriffsListe = BEGRIFFE.map(
  (b) => `      <div class="begriff" id="begriff-${esc(b.id)}">
        <h3>${esc(b.term)} <span class="muted">— ${esc(b.kurz)}</span></h3>
        <p>${esc(b.text)}</p>
      </div>`,
).join('\n');

/* ---------------------------------------------------------------- */
/* Fragen, die die SERP tatsächlich stellt                            */
/* ---------------------------------------------------------------- */

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
      `Markt sowie ${addOns.length} Add-on-Anbieter, die bestehende Praxissoftware erweitern. ` +
      'Die vollständige Liste steht in diesem Artikel, alphabetisch sortiert. Sie erhebt ' +
      'keinen Anspruch auf Vollständigkeit.',
  },
  {
    frage: 'Welche Tierarzt-Software ist die beste?',
    antwort:
      'Diese Übersicht beantwortet das bewusst nicht. Es gibt keine Bewertung, keine Rangfolge ' +
      'und keine Empfehlung – welche Lösung passt, hängt von Praxisgröße, Tierarten, ' +
      'vorhandener Technik und Arbeitsweise ab. Die Übersicht zeigt, welche Anbieter es gibt; ' +
      'die Auswahl trifft die Praxis.',
  },
  {
    frage: 'Was kostet eine Praxissoftware für Tierärzte?',
    antwort:
      'Preise stehen hier nicht. Sie hängen von Arbeitsplätzen, Modulen und Vertragslaufzeit ab ' +
      'und veralten schneller, als eine Übersicht gepflegt werden kann. Preisauskünfte geben ' +
      'die Anbieter.',
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

const fragenListe = FRAGEN.map(
  (f) => `      <div class="frage">
        <h3>${esc(f.frage)}</h3>
        <p>${esc(f.antwort)}</p>
      </div>`,
).join('\n');

/* ---------------------------------------------------------------- */
/* Strukturierte Daten                                               */
/* ---------------------------------------------------------------- */

/*
  Drei Typen, jeder mit einem Zweck:
   - Article  → Urheberschaft und Datum, die Grundlage jeder Zitierung
   - DefinedTermSet → der Begriffsteil als maschinenlesbares Glossar
   - FAQPage  → die tatsächlich gestellten Fragen mit unseren Antworten
  Alles darin steht auch sichtbar auf der Seite. Strukturierte Daten, die etwas
  behaupten, was der Leser nicht sieht, sind ein Verstoß gegen Googles
  Richtlinien und fliegen früher oder später auf.
*/
const schema = [
  {
    '@type': 'Article',
    headline: TITEL,
    description: BESCHREIBUNG,
    inLanguage: 'de',
    datePublished: STAND_ISO,
    dateModified: STAND_ISO,
    author: { '@type': 'Person', name: AUTOR, jobTitle: 'Experte für digitale Tiermedizin' },
    publisher: { '@type': 'Person', name: AUTOR },
    ...(hatDomain ? { mainEntityOfPage: absolut(ARTIKEL_PFAD) } : {}),
    isAccessibleForFree: true,
  },
  {
    '@type': 'DefinedTermSet',
    name: 'Begriffe der digitalen Tierarztpraxis',
    inLanguage: 'de',
    hasDefinedTerm: BEGRIFFE.map((b) => ({
      '@type': 'DefinedTerm',
      name: b.term,
      description: b.text,
      ...(hatDomain ? { url: `${absolut(ARTIKEL_PFAD)}#begriff-${b.id}` } : {}),
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
];

/* ---------------------------------------------------------------- */
/* Seite                                                             */
/* ---------------------------------------------------------------- */

const html = `<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(TITEL)} ${kernPims.length} Anbieter im DACH-Markt</title>
    <meta name="description" content="${esc(BESCHREIBUNG)}" />
    <meta name="author" content="${esc(AUTOR)}" />
${hatDomain ? `    <link rel="canonical" href="${esc(absolut(ARTIKEL_PFAD))}" />\n` : ''}    <link rel="icon" href="favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="favicon-96.png" sizes="96x96" type="image/png" />
    <link rel="icon" href="favicon-32.png" sizes="32x32" type="image/png" />
    <link rel="apple-touch-icon" href="apple-touch-icon.png" />
    <meta name="theme-color" content="#2b9ad8" />

    <meta property="og:type" content="article" />
    <meta property="og:title" content="${esc(TITEL)}" />
    <meta property="og:description" content="${esc(BESCHREIBUNG)}" />
    <meta property="og:locale" content="de_DE" />
${hatDomain ? `    <meta property="og:url" content="${esc(absolut(ARTIKEL_PFAD))}" />\n    <meta property="og:image" content="${esc(absolut('/og/marktuebersicht-2026.png'))}" />\n` : ''}    <meta name="twitter:card" content="summary_large_image" />

    <script type="application/ld+json">
${JSON.stringify({ '@context': 'https://schema.org', '@graph': schema }, null, 2)
  .split('\n')
  .map((l) => `      ${l}`)
  .join('\n')}
    </script>

    <style>
      :root {
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
      table {
        border-collapse: collapse;
        width: 100%;
        margin: 0 0 1.5rem;
        font-size: 0.9375rem;
      }
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
      }
    </style>
  </head>
  <body>
    <main>
      <a class="back" href="./">← Zur Marktübersicht</a>

      <h1>${esc(TITEL)}</h1>
      <p class="meta">
        Von ${esc(AUTOR)}, Experte für digitale Tiermedizin · Stand: ${esc(EDITION)}
      </p>

      <div class="lead">
        <p>
          <strong>Kurz:</strong> Für Tierarztpraxen im deutschsprachigen Raum sind in dieser
          Übersicht ${kernPims.length} Praxissoftware-Anbieter erfasst, dazu ${addOns.length}
          Anbieter von Add-ons, die vorhandene Praxissoftware um digitale Services erweitern.
          Die vollständige Liste steht weiter unten, alphabetisch sortiert.
        </p>
        <p>
          <strong>Was hier nicht steht:</strong> keine Rangfolge, keine Bewertung, keine Preise,
          kein „Testsieger". Die Gründe dafür stehen
          <a href="#keine-beste">weiter unten</a> – sie sind eine Grundentscheidung, keine Lücke.
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
        Lage nicht glaubwürdig, gleich wie sie ausfiele. Was es stattdessen gibt: dieselben
        Kriterien für alle, alphabetische Sortierung und eine offengelegte Verbindung. Nachzulesen
        im Abschnitt <a href="./#transparenz">„Zur Transparenz"</a>.
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
${begriffsListe}

      <h2 id="fragen">Häufig gestellte Fragen</h2>
${fragenListe}

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

writeFileSync(join(OUT, DATEI), html, 'utf8');

const woerter = html
  .replace(/<script[\s\S]*?<\/script>/g, '')
  .replace(/<style[\s\S]*?<\/style>/g, '')
  .replace(/<[^>]+>/g, ' ')
  .split(/\s+/)
  .filter(Boolean).length;

console.log(
  `${DATEI} erzeugt: ${kernPims.length} PIMS-Anbieter, ${addOns.length} Add-ons, ` +
    `${BEGRIFFE.length} Begriffe, ${FRAGEN.length} Fragen, rund ${woerter} Wörter.` +
    (hatDomain ? '' : '\nOhne VITE_SITE_URL: kein Canonical und keine og:url – das ist Absicht.'),
);
