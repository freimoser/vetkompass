/**
 * Konsistenzprüfung der Daten – läuft gegen die Quelldateien, nicht gegen
 * den Build, und braucht kein Netz.
 *
 * Anlass: Die Seite erzeugt Karte, Artikel, llms.txt und Entwicklungsseite
 * aus denselben Daten. Ein Widerspruch in den Daten erscheint deshalb an
 * fünf Stellen zugleich – und fällt an keiner einzelnen auf.
 *
 * Aufruf: node scripts/check-daten.mjs   (Exit 1 bei Fehlern)
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { providers } from '../src/data/providers.ts';
import { categories } from '../src/data/categories.ts';
import { artikel, HAUPTARTIKEL } from '../src/data/articles.ts';
import { MEILENSTEINE, FASSUNGEN, AUS_HINWEISEN, BETEILIGUNG } from '../src/data/historie.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const fehler = [];
const hinweis = [];

const katIds = new Set(categories.map((c) => c.id));

// Anbieter
const ids = new Set();
const namen = new Map();
const adressen = new Map();
for (const p of providers) {
  if (ids.has(p.id)) fehler.push(`Doppelte ID: ${p.id}`);
  ids.add(p.id);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.id)) fehler.push(`${p.id}: ID ist nicht kebab-case.`);

  const n = p.name.toLowerCase().replace(/[^a-z0-9äöü]/g, '');
  if (namen.has(n)) fehler.push(`Gleicher Name: ${p.id} und ${namen.get(n)}`);
  namen.set(n, p.id);

  if (!p.categories.length) fehler.push(`${p.id}: keine Kategorie.`);
  if (new Set(p.categories).size !== p.categories.length) fehler.push(`${p.id}: Kategorie doppelt.`);
  for (const c of p.categories) if (!katIds.has(c)) fehler.push(`${p.id}: Kategorie ${c} gibt es nicht.`);

  for (const sg of p.subgroups ?? []) {
    const passt = p.categories.some((c) => categories.find((k) => k.id === c)?.subgroups?.some((s) => s.id === sg));
    if (!passt) fehler.push(`${p.id}: Untergruppe „${sg}“ gehört zu keiner seiner Kategorien.`);
  }
  for (const k of Object.keys(p.variants ?? {})) {
    if (!p.categories.includes(Number(k))) fehler.push(`${p.id}: Variante für Kategorie ${k}, in der er nicht steht.`);
  }

  for (const logo of [p.logo, ...Object.values(p.variants ?? {}).map((v) => v.logo)].filter(Boolean)) {
    if (!existsSync(join(ROOT, 'public', logo))) fehler.push(`${p.id}: Logo ${logo} fehlt.`);
  }

  if (!p.website) hinweis.push(`${p.id}: keine Website.`);
  else {
    if (!/^https:\/\//.test(p.website)) fehler.push(`${p.id}: Website ohne https (${p.website}).`);
    const host = new URL(p.website).host.replace(/^www\./, '') + new URL(p.website).pathname.replace(/\/$/, '');
    // Produktmarken desselben Anbieters (petleo, petleo-dicom) dürfen sich die Adresse teilen.
    const vorher = adressen.get(host);
    if (vorher && !p.id.startsWith(vorher) && !vorher.startsWith(p.id)) hinweis.push(`${p.id} und ${adressen.get(host)} teilen sich die Adresse ${host}.`);
    adressen.set(host, p.id);
  }

  const texte = [p.description, ...Object.values(p.variants ?? {}).map((v) => v.description).filter(Boolean)];
  for (const t of texte) {
    if (t.length < 40) hinweis.push(`${p.id}: Beschreibung sehr kurz (${t.length} Zeichen).`);
    if (t.length > 220) hinweis.push(`${p.id}: Beschreibung lang (${t.length} Zeichen).`);
    if (!/[.!?]$/.test(t.trim())) fehler.push(`${p.id}: Beschreibung endet ohne Satzzeichen.`);
    // Redaktionelle Leitlinie: keine Wertung, kein Marketing.
    const wertung = t.match(/\b(beste[nrs]?|führend\w*|marktführer\w*|innovativst\w*|einzigartig\w*|revolution\w*|nr\.\s?1)\b/i);
    if (wertung) fehler.push(`${p.id}: wertendes Wort „${wertung[0]}“ in der Beschreibung.`);
  }
}

// Kategorien
for (const k of categories) {
  const n = providers.filter((p) => p.categories.includes(k.id)).length;
  if (!n) fehler.push(`Kategorie ${k.id} ist leer.`);
  if (k.id !== HAUPTARTIKEL.kategorie && !artikel.some((a) => a.kategorie === k.id)) fehler.push(`Kategorie ${k.id} hat keinen Artikel.`);
}

// Artikel
const slugs = new Set();
for (const a of artikel) {
  if (slugs.has(a.slug)) fehler.push(`Artikel-Slug doppelt: ${a.slug}`);
  slugs.add(a.slug);
  if (!katIds.has(a.kategorie)) fehler.push(`Artikel ${a.slug}: Kategorie ${a.kategorie} gibt es nicht.`);
  for (const ab of a.abgrenzung) {
    if (!katIds.has(ab.kategorie)) fehler.push(`Artikel ${a.slug}: Abgrenzung auf Kategorie ${ab.kategorie}, die es nicht gibt.`);
    if (ab.kategorie === a.kategorie) fehler.push(`Artikel ${a.slug}: Abgrenzung auf sich selbst.`);
  }
  if (!/ (ist|sind|heißt)[ :]/.test(a.definition)) hinweis.push(`Artikel ${a.slug}: Definition ohne „… ist …“.`);
}

// Historie
const letzter = MEILENSTEINE.at(-1);
if (letzter.anbieter !== providers.length || letzter.kategorien !== categories.length) {
  hinweis.push(
    `Letzter Meilenstein (${letzter.datum}: ${letzter.anbieter}/${letzter.kategorien}) ≠ Daten ` +
      `(${providers.length}/${categories.length}). Neuen Meilenstein in historie.ts eintragen – ` +
      'bis dahin trägt die Entwicklungsseite das Baudatum.',
  );
}
for (let i = 1; i < MEILENSTEINE.length; i++) {
  if (MEILENSTEINE[i].datum < MEILENSTEINE[i - 1].datum) fehler.push(`Meilensteine nicht chronologisch bei ${MEILENSTEINE[i].datum}.`);
}
for (const f of FASSUNGEN) {
  if (!existsSync(join(ROOT, 'public', f.bild))) fehler.push(`Fassung ${f.datum}: Archivbild ${f.bild} fehlt.`);
  const m = MEILENSTEINE.find((x) => x.datum === f.datum);
  if (m && (m.anbieter !== f.anbieter || m.kategorien !== f.kategorien)) {
    fehler.push(`Fassung ${f.datum} (${f.anbieter}/${f.kategorien}) widerspricht dem Meilenstein (${m.anbieter}/${m.kategorien}).`);
  }
}
for (const [beitrag, liste] of Object.entries(AUS_HINWEISEN)) {
  for (const id of liste) if (!ids.has(id)) fehler.push(`AUS_HINWEISEN „${beitrag}“: ${id} gibt es nicht.`);
  if (new Set(liste).size !== liste.length) fehler.push(`AUS_HINWEISEN „${beitrag}“: ID doppelt.`);
}
for (const b of BETEILIGUNG) {
  if (b.mitAnbieterhinweis > b.personen) fehler.push(`Beteiligung ${b.beitrag}: mehr Hinweisgeber als Personen.`);
}

// Absolute Aussagen im Fließtext
/*
  „Gibt es nicht“, „einzige“, „bislang nicht“: Solche Sätze werden still falsch,
  sobald ein Anbieter dazukommt. Zweimal passiert (29.10.2026): „keines davon
  DACH-weit“ trotz TASSO, „Versicherer bildet die Übersicht nicht ab“ trotz
  Agria. Ob ein Satz noch stimmt, kann nur ein Mensch entscheiden – das Register
  merkt sich, bei welcher Anbieterzahl der Kategorie er zuletzt geprüft wurde,
  und legt ihn wieder vor, sobald sich die Zahl ändert.
  Nach der Durchsicht: node scripts/check-daten.mjs --aussagen-bestaetigen
*/
const REGISTER = join(ROOT, 'scripts', 'aussagen-register.json');
const ABSOLUT = /\b(gibt es nicht|gibt es kein\w*|keine[sr]? davon|keines|bislang nicht|noch nicht geprüft|einzige[nrs]?|als einzige|ein erster|eine erste)\b/i;
const register = existsSync(REGISTER) ? JSON.parse(readFileSync(REGISTER, 'utf8')) : {};
const neu = {};
const zurDurchsicht = [];
for (const a of artikel) {
  const anzahl = providers.filter((p) => p.categories.includes(a.kategorie)).length;
  const saetze = [a.definition, ...a.lead, ...a.abschnitte.flatMap((x) => x.absaetze)].flatMap((t) =>
    t.split(/(?<=[.!?])\s+/),
  );
  for (const satz of saetze) {
    if (!ABSOLUT.test(satz)) continue;
    const schluessel = `${a.slug}: ${satz.slice(0, 80)}`;
    neu[schluessel] = anzahl;
    if (register[schluessel] !== anzahl) {
      zurDurchsicht.push(
        `${a.slug} (jetzt ${anzahl} Anbieter${register[schluessel] ? `, geprüft bei ${register[schluessel]}` : ', noch nie geprüft'}): „${satz.slice(0, 140)}“`,
      );
    }
  }
}
if (process.argv.includes('--aussagen-bestaetigen')) {
  writeFileSync(REGISTER, JSON.stringify(neu, null, 2) + '\n', 'utf8');
  console.log(`Aussagen-Register geschrieben: ${Object.keys(neu).length} Sätze als geprüft vermerkt.`);
} else if (zurDurchsicht.length) {
  hinweis.push(
    `${zurDurchsicht.length} absolute Aussage(n) zur Durchsicht – die Kategorie hat sich geändert:\n      ` +
      zurDurchsicht.join('\n      '),
  );
}

// Ausgabe
const pro = categories.map((k) => `${k.id}:${providers.filter((p) => p.categories.includes(k.id)).length}`).join(' ');
console.log(`Daten: ${providers.length} Anbieter, ${categories.length} Kategorien, ${artikel.length} Artikel.`);
console.log(`Je Kategorie: ${pro}`);
console.log(
  `Mit Logo: ${providers.filter((p) => p.logo).length} · mit Website: ${providers.filter((p) => p.website).length} · ` +
    `Länder geprüft: ${providers.filter((p) => p.countries.length).length} · in mehreren Kategorien: ${providers.filter((p) => p.categories.length > 1).length}`,
);
if (hinweis.length) console.log(`\nHINWEISE (${hinweis.length}):\n  - ${hinweis.join('\n  - ')}`);
if (fehler.length) {
  console.log(`\nFEHLER (${fehler.length}):\n  - ${fehler.join('\n  - ')}`);
  process.exit(1);
}
console.log('\nDaten konsistent.');
