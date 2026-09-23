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

/** Der Hauptartikel deckt Kategorie 6 (PIMS) ab und trägt den Begriffsteil. */
export const HAUPTARTIKEL = {
  kategorie: HAUPT.kategorie,
  datei: artikelPfad(HAUPT.slug),
  pfad: `/${artikelPfad(HAUPT.slug)}`,
  kurzTitel: 'Praxissoftware (PIMS) und Begriffe',
  prioritaet: '0.9',
};

/** Die neun Kategorie-Artikel, abgeleitet aus den redaktionellen Inhalten. */
export const KATEGORIE_ARTIKEL = artikel.map((a) => ({
  kategorie: a.kategorie,
  datei: artikelPfad(a.slug),
  pfad: `/${artikelPfad(a.slug)}`,
  kurzTitel: categories.find((c) => c.id === a.kategorie)?.title ?? a.h1,
  prioritaet: '0.8',
  inhalt: a,
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
