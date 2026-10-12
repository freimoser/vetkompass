/**
 * Wo der Download-Stempel im Bild der Marktübersicht sitzt.
 *
 * Das Bild entsteht beim Build (`scripts/gen-grafik.mjs`), der Stempel erst
 * beim Herunterladen im Browser (`src/lib/bildstempel.ts`). Beide lesen die
 * Lage von hier, damit der Stempel nicht in eine Zeile rutscht, wenn sich der
 * Kopf des Bildes ändert. Angaben in Bildkoordinaten (1920 breit); das PNG
 * ist doppelt so groß, der Browser rechnet den Faktor aus.
 */
export const BILDSTEMPEL = {
  /** Breite des Bildes in Bildkoordinaten. */
  breite: 1920,
  /** Rechte Kante – bündig mit den Zeilen „Stand der Übersicht“ usw. */
  rechts: 1920 - 56,
  /** Oberkante – unter der dritten Kopfzeile, über der Trennlinie. */
  oben: 106,
  hoehe: 24,
} as const;
