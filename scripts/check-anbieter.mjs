/**
 * Prüft jede Anbieteradresse der Übersicht gegen die Live-Seite.
 *
 * Für eine Marktübersicht sind die Anbieterlinks das, was für eine Fachseite
 * die Quellen sind: Ein toter Link, eine geparkte Domain oder eine
 * Weiterleitung auf eine ganz andere Firma lässt die Übersicht falsch
 * aussehen – und man sieht es dem Link nicht an. Beim Aufbau lief schon
 * einmal ein Skript über die Datensätze hinaus und ordnete Adressen den
 * falschen Anbietern zu; das fiel nur durch Nachprüfen auf.
 *
 * Braucht Netz und läuft deshalb nicht in `verify`, sondern als
 * `npm run check:anbieter` – vor jeder Ausgabe und in jeder Pflegerunde.
 *
 * Einordnung der Ergebnisse:
 *  - 2xx auf derselben Domain: in Ordnung
 *  - Weiterleitung auf eine andere Domain: ansehen – Umzug, Übernahme oder
 *    Parkseite
 *  - 403/429/503 mit Bot-Schutz: kein Befund, im Browser prüfen. Cloudflare
 *    und ähnliche Dienste blocken automatisierte Abrufe; wer das als Ausfall
 *    meldet, meldet sich einen Fehler, den es nicht gibt
 *  - 404, 410, DNS- oder TLS-Fehler: echt
 */
import { providers } from '../src/data/providers.ts';
import { SCHWESTER } from '../src/config/verbund.ts';

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';

/*
  Woran man Parkseiten und Domainverkäufe erkennt – nur im sichtbaren Text,
  mit Wortgrenzen. Die erste Fassung suchte „sedo“ im ganzen Quelltext und
  fand es in „mousedown“: Digitail und VET7.well galten als Parkseite.
*/
const GEPARKT =
  /\b(this domain (may be|is) for sale|domain (is |ist )?(for sale|zu verkaufen)|diese domain (steht zum verkauf|kaufen)|sedo\.com|sedoparking|dan\.com|parkingcrew|bodis\.com|hugedomains)\b/i;

/*
  Verglichen wird die Domain, nicht der Hostname: wf-3.drsam.de gehört zu
  drsam.de, pet.petleo.net zu petleo.net. Die letzten zwei Namensteile reichen
  für die Endungen dieser Übersicht (.de, .com, .net, .at, .ch, .io, .app).
*/
const basis = (url) => new URL(url).hostname.split('.').slice(-2).join('.');

/*
  Weiterleitungen, die geprüft und in Ordnung sind. Ein Fehlalarm, der jede
  Runde wiederkommt, kostet jede Runde Zeit – deshalb mit Datum und Grund.
*/
const BEKANNT = {
  // 27.09.2026: vetat.work leitet auf die Seite des Herstellers WDT weiter,
  // Titel „Software für Praxismanagement Ihrer WDT | vet@work“.
  'vetat-work': 'wdt.de',
  // 27.09.2026: vetsxl.com führt auf die Anmeldeseite unter myvetsxl.com
  // („Web-Anwendungen für die Tiermedizin“, VetZ). Eine öffentliche
  // Produktseite gibt es unter der Adresse nicht, und vetz.de verlinkt keine.
  vetsxl: 'myvetsxl.com',
};

/* Fehlende Zwischenzertifikate ergänzt ein Browser selbst, Node nicht. */
const KETTE_UNVOLLSTAENDIG = new Set(['UNABLE_TO_VERIFY_LEAF_SIGNATURE', 'UNABLE_TO_GET_ISSUER_CERT_LOCALLY']);

const sichtbar = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');

/*
  Bei Netzfehlern und Zeitüberschreitung ein zweiter Versuch, bevor „tot“
  gemeldet wird. Beim ersten Pflegelauf am 27.09.2026 meldete ein Durchgang
  eine Adresse als nicht erreichbar, der nächste fand alle erreichbar – ein
  einzelner langsamer Server ist kein toter Link. 404 und 410 zählen sofort.
*/
async function pruefe(p) {
  const erster = await versuch(p);
  if (erster.urteil !== 'tot' || erster.status >= 400) return erster;
  await new Promise((r) => setTimeout(r, 3000));
  return versuch(p);
}

async function versuch(p) {
  const steuerung = new AbortController();
  const zeit = setTimeout(() => steuerung.abort(), 20000);
  try {
    const r = await fetch(p.website, {
      headers: { 'User-Agent': UA, Accept: 'text/html' },
      redirect: 'follow',
      signal: steuerung.signal,
    });
    const text = (await r.text()).slice(0, 60000);
    const titel = text.match(/<title[^>]*>([^<]*)</i)?.[1]?.replace(/\s+/g, ' ').trim() ?? '';
    const ziel = basis(r.url);
    const woanders = ziel !== basis(p.website);

    let urteil = 'ok';
    if ([403, 429, 503].includes(r.status)) urteil = 'bot';
    else if (r.status >= 400) urteil = 'tot';
    else if (GEPARKT.test(sichtbar(text)) || GEPARKT.test(titel)) urteil = 'geparkt';
    else if (woanders && BEKANNT[p.id] !== ziel) urteil = 'umgezogen';

    return { p, status: r.status, urteil, titel, ziel: woanders ? r.url : '' };
  } catch (fehler) {
    const grund = fehler.cause?.code ?? fehler.name ?? String(fehler.message);
    const urteil = KETTE_UNVOLLSTAENDIG.has(grund) ? 'kette' : 'tot';
    return { p, status: 0, urteil, titel: '', ziel: '', grund };
  } finally {
    clearTimeout(zeit);
  }
}

// Die Schwesterseite wird mitgeprüft: Sie steht auf jeder Seite im Footer.
const mitAdresse = [
  ...providers.filter((p) => p.website),
  { id: 'schwester', name: SCHWESTER.name, website: SCHWESTER.url },
];
const ohne = providers.filter((p) => !p.website);

// Sechs gleichzeitig: schnell genug, ohne einen Anbieter mit Anfragen zu fluten.
const ergebnisse = [];
for (let i = 0; i < mitAdresse.length; i += 6) {
  ergebnisse.push(...(await Promise.all(mitAdresse.slice(i, i + 6).map(pruefe))));
}

const gruppe = (u) => ergebnisse.filter((e) => e.urteil === u);
const zeile = (e) =>
  `  ${String(e.status || '—').padEnd(4)}${e.p.name.padEnd(28)}${e.p.website}` +
  (e.ziel ? `\n      → ${e.ziel}` : '') +
  (e.grund ? `  (${e.grund})` : '') +
  (e.titel ? `\n      „${e.titel.slice(0, 90)}“` : '');

console.log(`${mitAdresse.length} Anbieteradressen geprüft, ${ohne.length} ohne Adresse.\n`);
for (const [urteil, ueberschrift] of [
  ['tot', 'NICHT ERREICHBAR – echt'],
  ['geparkt', 'PARKSEITE – echt'],
  ['umgezogen', 'WEITERLEITUNG AUF ANDERE DOMAIN – ansehen'],
  ['kette', 'ZERTIFIKATSKETTE UNVOLLSTÄNDIG – im Browser prüfen'],
  ['bot', 'BOT-SCHUTZ – kein Befund, im Browser prüfen'],
]) {
  const liste = gruppe(urteil);
  if (liste.length) console.log(`${ueberschrift} (${liste.length})\n${liste.map(zeile).join('\n')}\n`);
}
console.log(`In Ordnung: ${gruppe('ok').length}`);
if (ohne.length) console.log(`Ohne Adresse: ${ohne.map((p) => p.name).join(', ')}`);

process.exit(gruppe('tot').length + gruppe('geparkt').length > 0 ? 1 : 0);
