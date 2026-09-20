/**
 * Erzeugt Impressum, Datenschutzerklärung und Haftungsausschluss aus `LEGAL`.
 *
 * Die Seiten liegen danach als statisches HTML unter `public/` und werden von
 * Vite unverändert nach `dist/` kopiert – so funktionieren sie auf GitHub Pages
 * ohne Routing und ohne JavaScript.
 *
 * Zwei Regeln aus der Skill sind hier fest verdrahtet:
 *  - Was nicht konfiguriert ist, erscheint nicht. Ohne Analytics-Token gibt es
 *    keinen Mess-Abschnitt, und die Erklärung sagt ausdrücklich, dass nicht
 *    gemessen wird.
 *  - Abschnittsnummern werden zentral vergeben, nie von Hand an die
 *    Überschriften geschrieben. Bei bedingt gerenderten Abschnitten entstünden
 *    sonst doppelte Nummern.
 *
 * Aufruf: node scripts/gen-legal.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LEGAL, addressLines, missingLegalFields } from '../src/config/legal.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public');

const FEATURES = {
  cloudflareAnalytics: Boolean(process.env.VITE_CF_ANALYTICS_TOKEN),
  searchConsole: process.env.VITE_SEARCH_CONSOLE === '1',
};

const SITE_TITLE = 'Die digitale Tierarztpraxis – Marktübersicht 2026';
const EDITION = 'September 2026';
const HOSTER = {
  name: 'GitHub Pages',
  company: 'GitHub, Inc.',
  address: '88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA',
};

const esc = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const missing = missingLegalFields();
const gap = (label) =>
  `<mark class="luecke">[${esc(label)} fehlt – siehe src/config/legal.ts]</mark>`;

const mailLink = LEGAL.email
  ? `<a href="mailto:${esc(LEGAL.email)}">${esc(LEGAL.email)}</a>`
  : gap('E-Mail-Adresse');

/** Gemeinsames Seitengerüst. Alle Rechtsseiten tragen `noindex, follow`. */
function page({ title, intro, body }) {
  return `<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!--
      noindex, follow: § 5 DDG verlangt Erreichbarkeit, nicht Auffindbarkeit
      über Google. Im Impressum steht eine ladungsfähige Anschrift, die sonst
      als eigenständiges Suchergebnis auftaucht. "follow", damit die Seite
      weiter gecrawlt wird und Links weitergibt.
    -->
    <meta name="robots" content="noindex, follow" />
    <link rel="icon" href="favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="favicon-96.png" sizes="96x96" type="image/png" />
    <link rel="icon" href="favicon-32.png" sizes="32x32" type="image/png" />
    <link rel="apple-touch-icon" href="apple-touch-icon.png" />
    <meta name="theme-color" content="#2b9ad8" />
    <title>${esc(title)} – ${esc(SITE_TITLE)}</title>
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
      main { max-width: 44rem; margin: 0 auto; }
      h1 { font-size: 1.75rem; letter-spacing: -0.02em; margin: 0 0 0.75rem; }
      h2 {
        font-size: 1rem;
        margin: 2.75rem 0 0.75rem;
        padding-top: 1.25rem;
        border-top: 1px solid var(--line-soft);
      }
      h2:first-of-type { border-top: 0; padding-top: 0; }
      p, li { margin: 0 0 1rem; color: var(--ink-soft); }
      ul, ol { padding-left: 1.25rem; }
      a { color: var(--brand); }
      a:focus-visible, .back:focus-visible {
        outline: 2px solid var(--brand);
        outline-offset: 2px;
      }
      .back {
        display: inline-block;
        margin-bottom: 2rem;
        font-size: 0.875rem;
      }
      .lead {
        border: 1px solid var(--line);
        border-radius: 0.75rem;
        background: #f0f8fd;
        padding: 1.25rem 1.5rem;
        margin: 0 0 2.5rem;
      }
      .lead p:last-child { margin-bottom: 0; }
      .lead strong { color: var(--ink); }
      address { font-style: normal; }
      .luecke {
        background: #fdf6e3;
        border: 1px solid #f0c36d;
        border-radius: 0.25rem;
        padding: 0.1rem 0.4rem;
        font-size: 0.9em;
      }
      table { border-collapse: collapse; width: 100%; margin: 0 0 1.5rem; font-size: 0.9375rem; }
      th, td { text-align: left; padding: 0.6rem 0.75rem; border-bottom: 1px solid var(--line-soft); }
      th { color: var(--ink); font-weight: 600; }
      .muted { color: var(--muted); font-size: 0.875rem; }
      footer { margin-top: 3.5rem; padding-top: 1.5rem; border-top: 1px solid var(--line-soft); }
      @media print { .back { display: none; } }
    </style>
  </head>
  <body>
    <main>
      <a class="back" href="./">← Zurück zur Marktübersicht</a>
      <h1>${esc(title)}</h1>
${intro ? `      <div class="lead">\n${intro}\n      </div>` : ''}
${body}
      <footer>
        <p class="muted">Stand: ${esc(EDITION)}</p>
      </footer>
    </main>
  </body>
</html>
`;
}

/* ------------------------------------------------------------------ */
/* Impressum                                                           */
/* ------------------------------------------------------------------ */

const anschrift = addressLines();
const anschriftHtml =
  missing.length > 0 && (!LEGAL.street || !LEGAL.zip || !LEGAL.city)
    ? `        <address>\n          ${esc(LEGAL.operator)}<br />\n          ${gap(
        'Ladungsfähige Anschrift',
      )}<br />\n          ${esc(LEGAL.country)}\n        </address>`
    : `        <address>\n${anschrift
        .map((line) => `          ${esc(line)}<br />`)
        .join('\n')}\n        </address>`;

const steuer = LEGAL.vatId
  ? `      <h2>Umsatzsteuer-Identifikationsnummer</h2>
      <p>Umsatzsteuer-Identifikationsnummer nach § 27a UStG: ${esc(LEGAL.vatId)}</p>`
  : LEGAL.smallBusiness
    ? `      <h2>Umsatzsteuer</h2>
      <p>
        Als Kleinunternehmer im Sinne von § 19 UStG wird keine Umsatzsteuer
        berechnet und daher keine Umsatzsteuer-Identifikationsnummer geführt.
      </p>`
    : '';

const impressum = page({
  title: 'Impressum',
  intro: `        <p>
          Angaben nach § 5 DDG. Diese Seite ist ein <strong>privates,
          redaktionelles Informationsangebot</strong>: Sie verkauft nichts,
          vermittelt nichts und finanziert sich nicht über Werbung oder bezahlte
          Platzierungen.
        </p>`,
  body: `      <h2>Anbieter</h2>
${anschriftHtml}

      <h2>Kontakt</h2>
      <p>E-Mail: ${mailLink}${
        LEGAL.phone ? `<br />Telefon: ${esc(LEGAL.phone)}` : ''
      }</p>
${
  LEGAL.phone
    ? ''
    : `      <p class="muted">
        Eine Telefonnummer wird nicht angegeben. Nach der Rechtsprechung des
        Europäischen Gerichtshofs (C-298/07) genügt neben der E-Mail-Adresse ein
        zweiter schneller Kommunikationsweg; eine Telefonnummer ist nicht
        zwingend.
      </p>`
}
${steuer}

      <h2>Verantwortlich für den Inhalt</h2>
      <p>Nach § 18 Abs. 2 MStV: ${esc(LEGAL.responsible)}, Anschrift wie oben.</p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>
        ${
          LEGAL.disputeResolution
            ? 'Ich bin zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle bereit.'
            : 'Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.'
        }
      </p>

      <h2>Marken und Logos Dritter</h2>
      <p>
        Alle genannten Marken-, Produkt- und Unternehmensnamen sowie die
        abgebildeten Logos sind Eigentum der jeweiligen Rechteinhaber. Ihre
        Verwendung erfolgt ausschließlich zu Informationszwecken im Rahmen dieser
        Marktübersicht. Aus der Aufnahme in die Übersicht folgt keine
        geschäftliche Verbindung, Partnerschaft, Zusammenarbeit oder Empfehlung.
      </p>
      <p>
        Rechteinhaber, die eine Darstellung ihres Logos oder ihres Unternehmens
        nicht wünschen, erreichen mich unter ${mailLink}. Der Eintrag wird dann
        kurzfristig entfernt.
      </p>

      <h2>Offenlegung wirtschaftlicher Verbindungen</h2>
      <p>
        Ich bin an einem der in dieser Übersicht genannten Anbieter wirtschaftlich
        beteiligt. Die vollständige Offenlegung steht im Abschnitt
        <a href="./#transparenz">„Zur Transparenz“</a> auf der Startseite.
      </p>

      <h2>Haftung</h2>
      <p>
        Hinweise zur Haftung für Inhalte und Links stehen im
        <a href="haftungsausschluss.html">Haftungsausschluss</a>.
      </p>`,
});

/* ------------------------------------------------------------------ */
/* Datenschutzerklärung                                                */
/* ------------------------------------------------------------------ */

/*
  Abschnittsnummern zentral vergeben. Nur so bleiben sie bei bedingt
  gerenderten Abschnitten lückenlos und eindeutig.
*/
const ABSCHNITTE = [
  'verantwortlicher',
  'logfiles',
  ...(FEATURES.cloudflareAnalytics ? ['analytics'] : ['keineMessung']),
  ...(FEATURES.searchConsole ? ['searchConsole'] : []),
  'speicherung',
  'kontakt',
  'links',
  'rechte',
  'automatisiert',
];
const nr = (key) => ABSCHNITTE.indexOf(key) + 1;
const h2 = (key, text) => `      <h2>${nr(key)}. ${text}</h2>`;

const messAbschnitt = FEATURES.cloudflareAnalytics
  ? `${h2('analytics', 'Reichweitenmessung mit Cloudflare Web Analytics')}
      <p>
        Zur Messung der Reichweite dieser Website wird Cloudflare Web Analytics
        eingesetzt (Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107,
        USA).
      </p>
      <p>
        Dieser Dienst <strong>setzt keine Cookies</strong>, greift nicht auf
        Informationen in Ihrem Endgerät zu und bildet
        <strong>keinen Fingerabdruck</strong> Ihres Browsers. Erfasst werden
        ausschließlich aggregierte Angaben: aufgerufene Seite, Herkunftsseite,
        grobe Region, Gerätetyp und Ladezeit.
      </p>
      <p>
        <strong>Warum Sie dazu nicht gefragt werden:</strong> § 25 Abs. 1 TDDDG
        verlangt eine Einwilligung nur, wenn Informationen in Ihrem Endgerät
        gespeichert oder ausgelesen werden. Genau das findet hier nicht statt.
        Rechtsgrundlage ist deshalb Art. 6 Abs. 1 lit. f DSGVO – mein
        berechtigtes Interesse daran zu erkennen, welche Inhalte genutzt werden.
        Ein Einwilligungsbanner für eine Verarbeitung, die keine Einwilligung
        braucht, wäre eine Formalie ohne Schutzwirkung.
      </p>
      <p>Ihr Widerspruchsrecht nach Art. 21 DSGVO bleibt unberührt.</p>`
  : `${h2('keineMessung', 'Reichweitenmessung')}
      <p>
        <strong>Es findet keine Reichweitenmessung statt.</strong> Diese Website
        bindet kein Analyse-Werkzeug ein – weder Google Analytics noch einen
        anderen Dienst. Über die technisch notwendigen Server-Protokolle des
        Hosters hinaus wird Ihre Nutzung nicht ausgewertet.
      </p>`;

const searchConsoleAbschnitt = FEATURES.searchConsole
  ? `${h2('searchConsole', 'Google Search Console – eine Nicht-Verarbeitung')}
      <p>
        Diese Website ist in der Google Search Console angemeldet.
        <strong>Dabei wird nichts in Ihrem Browser geladen und nichts über Sie an
        mich übermittelt.</strong> Es gibt kein Skript, kein Cookie und keinen
        Zählpixel. Die Daten entstehen bei Google im Rahmen der Suche – also
        unabhängig davon, ob Sie diese Website je aufrufen – und ich sehe sie
        ausschließlich zusammengefasst.
      </p>
      <p>
        Der Nachweis, dass mir diese Website gehört, läuft über einen Eintrag im
        DNS der Domain, nicht über die Seite selbst. Ich führe die Search Console
        hier trotzdem auf, weil sie in vielen Datenschutzerklärungen
        fälschlicherweise als Datenverarbeitung über die Website beschrieben
        wird. Für eine Auskunft nach Art. 15 DSGVO zu Ihren Suchdaten ist Google
        der richtige Ansprechpartner.
      </p>`
  : '';

const datenschutz = page({
  title: 'Datenschutzerklärung',
  intro: `        <p><strong>Das Wichtigste in drei Sätzen:</strong></p>
        <p>
          Diese Website ist eine statische Seite ohne Nutzerkonto, ohne Formular
          und ohne Zahlungsfunktion. Sie setzt <strong>keine Cookies</strong> und
          lädt <strong>keine Schriften, Karten oder Skripte von
          Drittanbietern</strong> nach – alle Inhalte kommen von derselben
          Adresse${
            FEATURES.cloudflareAnalytics
              ? ', mit Ausnahme der cookiefreien Reichweitenmessung'
              : ''
          }.
          Personenbezogene Daten verarbeite ich nur, wenn Sie mir selbst
          schreiben.
        </p>`,
  body: `${h2('verantwortlicher', 'Verantwortlicher')}
      <p>Verantwortlich im Sinne von Art. 4 Nr. 7 DSGVO:</p>
${anschriftHtml}
      <p>E-Mail: ${mailLink}</p>

${h2('logfiles', 'Server-Protokolle und Hosting')}
      <p>
        Die Website wird über ${esc(HOSTER.name)} ausgeliefert
        (${esc(HOSTER.company)}, ${esc(HOSTER.address)}). Beim Abruf verarbeitet
        der Hoster technisch notwendige Daten, insbesondere:
      </p>
      <ul>
        <li>IP-Adresse des anfragenden Geräts</li>
        <li>Datum und Uhrzeit des Abrufs</li>
        <li>aufgerufene Datei und übertragene Datenmenge</li>
        <li>Browsertyp, Betriebssystem und gegebenenfalls die verweisende Seite</li>
      </ul>
      <p>
        Ohne diese Verarbeitung lässt sich eine Website technisch nicht
        ausliefern. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Die
        Verarbeitung umfasst eine Übermittlung in die USA; Einzelheiten zur
        Datenverarbeitung durch ${esc(HOSTER.company)} finden Sie in deren
        Datenschutzerklärung. Ich selbst habe auf diese Protokolle keinen
        Zugriff.
      </p>

${messAbschnitt}
${searchConsoleAbschnitt}

${h2('speicherung', 'Cookies und lokale Speicherung')}
      <table>
        <thead>
          <tr><th>Art</th><th>Einsatz auf dieser Website</th></tr>
        </thead>
        <tbody>
          <tr><td>Cookies</td><td>werden nicht gesetzt</td></tr>
          <tr><td>Local Storage / Session Storage</td><td>werden nicht genutzt</td></tr>
          <tr><td>Einwilligungsbanner</td><td>nicht erforderlich, da nichts einwilligungspflichtig ist</td></tr>
        </tbody>
      </table>

${h2('kontakt', 'Kontaktaufnahme per E-Mail')}
      <p>
        Die Schaltflächen „Anbieter vorschlagen“, „Korrektur melden“ und „Logo
        entfernen lassen“ öffnen Ihr E-Mail-Programm. Dabei werden keine Daten an
        diese Website übermittelt. Schreiben Sie mir, verarbeite ich die in der
        Nachricht enthaltenen Angaben ausschließlich zur Bearbeitung Ihres
        Anliegens (Art. 6 Abs. 1 lit. f DSGVO) und lösche sie, sobald sie nicht
        mehr benötigt werden und keine Aufbewahrungspflichten entgegenstehen.
      </p>

${h2('links', 'Verweise auf andere Websites')}
      <p>
        Die Übersicht verlinkt auf die Websites der genannten Anbieter. Mit dem
        Klick verlassen Sie diese Seite; für die Datenverarbeitung dort ist der
        jeweilige Anbieter verantwortlich. Die Logos werden von dieser Website
        ausgeliefert, nicht von den Servern der Anbieter – beim bloßen Betrachten
        der Übersicht erfahren diese also nichts von Ihrem Besuch.
      </p>

${h2('rechte', 'Ihre Rechte')}
      <p>
        Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung
        (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung
        (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) sowie ein
        Widerspruchsrecht gegen Verarbeitungen auf Grundlage von
        Art. 6 Abs. 1 lit. f DSGVO (Art. 21 DSGVO). Wenden Sie sich dafür an
        ${mailLink}.
      </p>
      <p>
        Unabhängig davon steht Ihnen ein Beschwerderecht bei einer
        Datenschutz-Aufsichtsbehörde zu, insbesondere in dem Mitgliedstaat Ihres
        Aufenthaltsorts oder des mutmaßlichen Verstoßes.
      </p>

${h2('automatisiert', 'Keine automatisierte Entscheidungsfindung')}
      <p>
        Eine automatisierte Entscheidungsfindung einschließlich Profiling nach
        Art. 22 DSGVO findet nicht statt.
      </p>`,
});

/* ------------------------------------------------------------------ */
/* Haftungsausschluss                                                  */
/* ------------------------------------------------------------------ */

const haftung = page({
  title: 'Haftungsausschluss',
  intro: `        <p>
          Die Marktübersicht erhebt <strong>keinen Anspruch auf
          Vollständigkeit</strong> und stellt keine Beratung dar. Sie enthält
          keine Bewertung, keine Rangfolge und keine Empfehlung einzelner
          Anbieter.
        </p>`,
  body: `      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter bin ich nach § 7 Abs. 1 DDG für eigene Inhalte auf
        diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Die Inhalte
        wurden mit Sorgfalt erstellt; für Richtigkeit, Vollständigkeit und
        Aktualität kann ich jedoch keine Gewähr übernehmen. Der Markt für
        digitale Lösungen verändert sich laufend, Zuordnungen und Angaben können
        daher veralten.
      </p>
      <p>
        Nach §§ 8 bis 10 DDG bin ich nicht verpflichtet, übermittelte oder
        gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
        forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen
        zur Entfernung oder Sperrung der Nutzung von Informationen nach den
        allgemeinen Gesetzen bleiben davon unberührt. Eine diesbezügliche Haftung
        ist erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
        möglich; bei Bekanntwerden entsprechender Rechtsverletzungen entferne ich
        diese Inhalte umgehend.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Diese Website verlinkt auf externe Websites Dritter, auf deren Inhalte
        ich keinen Einfluss habe. Für diese fremden Inhalte ist stets der
        jeweilige Anbieter oder Betreiber verantwortlich. Die verlinkten Seiten
        wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft;
        rechtswidrige Inhalte waren nicht erkennbar. Eine dauerhafte inhaltliche
        Kontrolle ist ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht
        zumutbar. Bei Bekanntwerden von Rechtsverletzungen entferne ich
        entsprechende Links umgehend.
      </p>

      <h2>Urheberrecht, Marken und Logos</h2>
      <p>
        Die von mir erstellten Inhalte und Werke unterliegen dem deutschen
        Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet.
      </p>
      <p>
        Alle genannten Marken-, Produkt- und Unternehmensnamen sowie die
        abgebildeten Logos sind Eigentum der jeweiligen Rechteinhaber. Ihre
        Verwendung erfolgt ausschließlich zu Informationszwecken im Rahmen dieser
        Marktübersicht und begründet keine geschäftliche Verbindung,
        Partnerschaft oder Empfehlung.
      </p>
      <p>
        Rechteinhaber, die eine Darstellung nicht wünschen, erreichen mich unter
        ${mailLink}. Der Eintrag wird dann kurzfristig entfernt.
      </p>`,
});

/* ------------------------------------------------------------------ */

mkdirSync(OUT, { recursive: true });
const dateien = [
  ['impressum.html', impressum],
  ['datenschutz.html', datenschutz],
  ['haftungsausschluss.html', haftung],
];
for (const [name, html] of dateien) {
  writeFileSync(join(OUT, name), html, 'utf8');
}

const status = missing.length > 0 ? `LÜCKEN: ${missing.join(', ')}` : 'vollständig';
console.log(
  `Rechtstexte erzeugt (${dateien.map(([n]) => n).join(', ')}) – ${status}` +
    `\nMessung: ${FEATURES.cloudflareAnalytics ? 'Cloudflare Web Analytics' : 'keine'}` +
    `, Search Console: ${FEATURES.searchConsole ? 'aufgeführt' : 'nicht aufgeführt'}`,
);
