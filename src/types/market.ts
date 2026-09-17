/**
 * Typen der Marktübersicht "Die digitale Tierarztpraxis".
 *
 * Grundregel: Die UI kennt keine einzelnen Anbieter. Alles, was auf der Seite
 * erscheint, kommt aus `src/data/providers.ts` und `src/data/categories.ts`.
 */

/** DACH-Markt. Die Übersicht bildet bewusst nur diese drei Länder ab. */
export type Country = 'DE' | 'AT' | 'CH';

/** Kategorie-Nummern wie in der Original-Grafik (1–9). */
export type CategoryId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/**
 * Spalte im Desktop-Layout. Bildet die räumliche Struktur der Original-Grafik
 * ab, ohne dass die Komponenten einzelne Kategorien hardcodieren müssen.
 */
export type LayoutColumn = 'left' | 'center' | 'right';

/** Breite einer Kategorie innerhalb ihrer Spalte. */
export type LayoutWidth = 'full' | 'half';

/**
 * Untergruppe innerhalb einer Kategorie – z. B. "PIMS – Add-ons für digitale
 * Services" innerhalb der Kategorie Praxissoftware.
 */
export interface Subgroup {
  id: string;
  title: string;
  description?: string;
}

export interface Category {
  id: CategoryId;
  /** Anker-/Filter-Slug, z. B. "praxissoftware-pims". */
  slug: string;
  /** Vollständiger Titel, wie in der Grafik. */
  title: string;
  /** Kurzform für Filter-Chips. */
  shortTitle: string;
  /** Erklärt neutral, was die Kategorie umfasst. */
  description: string;
  /** Position im Desktop-Raster. */
  placement: {
    column: LayoutColumn;
    width: LayoutWidth;
  };
  /** Anzahl Logo-Spalten im Desktop-Raster dieser Kategorie. */
  logoColumns: number;
  /** Optionale Untergruppen, z. B. Add-ons. */
  subgroups?: Subgroup[];
}

/**
 * Optionale, kategoriespezifische Darstellung eines Anbieters.
 *
 * Hintergrund: Einige Anbieter treten je Kategorie unter einer eigenen
 * Produktmarke auf (z. B. eine eigene KI- oder Newsletter-Marke). Statt dafür
 * mehrere unabhängige Anbieter-Datensätze anzulegen, bleibt es ein Datensatz
 * mit einer abweichenden Beschriftung/Logo-Datei je Kategorie.
 */
export interface ProviderVariant {
  /** Abweichender Anzeigename in dieser Kategorie. */
  label?: string;
  /** Abweichende Logodatei in dieser Kategorie (Pfad relativ zu /public). */
  logo?: string;
}

export interface Provider {
  /** Stabile, kebab-case ID. Wird für Logo-Dateinamen und Deep-Links genutzt. */
  id: string;
  /** Anzeigename in der Schreibweise des Anbieters. */
  name: string;
  /**
   * Pfad zur Logodatei relativ zu /public, z. B. "logos/vetstoria.svg".
   * Fehlt das Logo, rendert `ProviderLogo` automatisch eine neutrale
   * Text-Wortmarke – das Layout bleibt in beiden Fällen identisch.
   */
  logo?: string;
  /** Offizielle Website inkl. Protokoll. Fehlt sie, wird kein Link angezeigt. */
  website?: string;
  /** Länder im DACH-Raum, in denen die Lösung angeboten wird. */
  countries: Country[];
  /** Eine oder mehrere Kategorien. Mehrfachnennungen sind ausdrücklich erwünscht. */
  categories: CategoryId[];
  /** Zugehörigkeit zu Untergruppen (IDs aus `Category.subgroups`). */
  subgroups?: string[];
  /** Neutrale Kurzbeschreibung – keine Wertung, kein Marketing. */
  description: string;
  /** Freie Schlagworte, werden auch von der Suche berücksichtigt. */
  tags?: string[];
  /** Kategoriespezifische Abweichungen von Name/Logo. */
  variants?: Partial<Record<CategoryId, ProviderVariant>>;
  /**
   * Kennzeichnet den Initiator der Übersicht. Wird in der Detailansicht offen
   * ausgewiesen, damit die Doppelrolle "Herausgeber und Anbieter" transparent
   * ist. Bewusst als Datenfeld, damit die UI keinen Anbieter hardcodiert.
   */
  isInitiator?: boolean;
}

/** Aktiver Zustand der Toolbar über der Marktübersicht. */
export interface MarketFilters {
  query: string;
  category: CategoryId | 'all';
  country: Country | 'all';
}

/** Ein Anbieter-Eintrag, so wie er in genau einer Kategorie dargestellt wird. */
export interface ProviderEntry {
  provider: Provider;
  categoryId: CategoryId;
  /** Anzeigename inkl. kategoriespezifischer Variante. */
  label: string;
  /** Logopfad inkl. kategoriespezifischer Variante. */
  logo?: string;
}
