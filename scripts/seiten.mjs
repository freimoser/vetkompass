/**
 * Das Verzeichnis aller erzeugten Artikelseiten – eine Quelle für alle, die es
 * brauchen.
 *
 * Warum getrennt: `gen-artikel.mjs` schreibt die Seiten, `gen-seo.mjs` trägt
 * sie in die Sitemap ein, `check-launch.mjs` prüft beides gegeneinander. Stünde
 * die Liste an drei Stellen, würde sie an zwei davon veralten – und der
 * Livegang-Check meldete einen Widerspruch, den niemand verursacht hat.
 *
 * Alle Adressen tragen die Endung `.html`. GitHub Pages liefert die Seiten zwar
 * auch ohne aus, aber `/seite` und `/seite.html` sind für eine Suchmaschine
 * zwei Adressen mit demselben Inhalt.
 */
import { artikel, artikelPfad, HAUPTARTIKEL as HAUPT } from '../src/data/articles.ts';
import { categories } from '../src/data/categories.ts';
import { providers } from '../src/data/providers.ts';
import { zahlwort } from '../src/lib/zahlwort.ts';

/*
  Platzhalter in den Artikeltexten: {anzahl} und {Anzahl} (am Satzanfang) werden
  zur Zahl der Einträge der jeweiligen Kategorie, als Wort.

  Warum: In Kategorie 10 stand „Sieben Portale“ und „alle sieben durchgehen“ von
  Hand im Text. Mit dem nächsten Eintrag wäre beides falsch gewesen – dieselbe
  Fehlerklasse wie die „neun Kategorien“, die nach Kategorie 10 an sieben
  Stellen stehen blieben.

  Deshalb bricht der Build ab, wenn eine Zahl von Hand vor einem Wort steht, das
  eine Menge aus den Daten bezeichnet. „Anbieter“ ist bewusst ausgenommen: In
  Kategorie 5 steht „kamen neun Anbieter dazu“ – eine Aussage über das Feedback
  auf den ersten Beitrag, keine Zählung der Daten.
*/
const MENGENWORT = /\b(zwei|drei|vier|fünf|sechs|sieben|acht|neun|zehn|elf|zwölf|\d+)\s+(Kategorien|Lösungsfeldern?|Suchportale|Portale)\b/i;

function fuelle(wert, anzahl, ort) {
  if (typeof wert === 'string') {
    const treffer = wert.match(MENGENWORT);
    if (treffer) {
      throw new Error(
        `Von Hand geschriebene Zahl in ${ort}: „${treffer[0]}“. ` +
          '{anzahl} verwenden oder die Zahl aus den Daten ableiten.',
      );
    }
    const wort = zahlwort(anzahl);
    return wert
      .replaceAll('{Anzahl}', wort.charAt(0).toUpperCase() + wort.slice(1))
      .replaceAll('{anzahl}', wort);
  }
  if (Array.isArray(wert)) return wert.map((w, i) => fuelle(w, anzahl, `${ort}[${i}]`));
  if (wert && typeof wert === 'object') {
    return Object.fromEntries(Object.entries(wert).map(([k, v]) => [k, fuelle(v, anzahl, `${ort}.${k}`)]));
  }
  return wert;
}

/** Der Hauptartikel deckt Kategorie 6 (PIMS) ab und trägt den Begriffsteil. */
export const HAUPTARTIKEL = {
  kategorie: HAUPT.kategorie,
  datei: artikelPfad(HAUPT.slug),
  pfad: `/${artikelPfad(HAUPT.slug)}`,
  kurzTitel: 'Praxissoftware (PIMS) und Begriffe',
  prioritaet: '0.9',
};

/** Die Kategorie-Artikel, abgeleitet aus den redaktionellen Inhalten. */
export const KATEGORIE_ARTIKEL = artikel.map((a) => ({
  kategorie: a.kategorie,
  datei: artikelPfad(a.slug),
  pfad: `/${artikelPfad(a.slug)}`,
  kurzTitel: categories.find((c) => c.id === a.kategorie)?.title ?? a.h1,
  prioritaet: '0.8',
  inhalt: fuelle(a, providers.filter((p) => p.categories.includes(a.kategorie)).length, `Artikel ${a.slug}`),
}));

/**
 * Alle Artikel in Kategoriereihenfolge – so steht der Hauptartikel an
 * Position 6 und nicht am Ende. Die Reihenfolge ist die der Karte, damit
 * Leserinnen und Leser dieselbe Gliederung wiederfinden.
 */
export const ALLE_ARTIKEL = [HAUPTARTIKEL, ...KATEGORIE_ARTIKEL].sort(
  (a, b) => a.kategorie - b.kategorie,
);

/** Nachschlagen für Querverweise: Kategorie-Nummer → Artikelseite. */
export const ARTIKEL_NACH_KATEGORIE = new Map(ALLE_ARTIKEL.map((s) => [s.kategorie, s]));
