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

/** Lage eines Stempels in Bildkoordinaten (`breite` = logische Bildbreite). */
export interface Stempellage {
  breite: number;
  rechts: number;
  oben: number;
  hoehe: number;
}

/**
 * Die Formate zum Herunterladen. Original ist die ganze Karte in voller
 * Auflösung; 16:9 und 1:1 sind eigene Kompositionen für Posts und Folien
 * (Kopf links bzw. oben, Karte daneben bzw. darunter). Erzeugt in
 * scripts/gen-grafik.mjs, gestempelt in src/lib/bildstempel.ts – beide lesen
 * die Stempellage von hier.
 */
export const BILDFORMATE = [
  {
    id: '16x9',
    label: '16:9',
    titel: 'Querformat 16:9 – für Folien und Link-Posts',
    datei: 'downloads/digitale-tierarztpraxis-marktuebersicht-16x9.png',
    /** Logische Größe (Bildkoordinaten) und Breite des PNG in Pixeln. */
    w: 2400,
    h: 1350,
    px: 3840,
    stempel: { breite: 2400, rechts: 2400 - 64, oben: 130, hoehe: 28 },
  },
  {
    id: '1x1',
    label: '1:1',
    titel: 'Quadrat 1:1 – für Feed-Posts',
    datei: 'downloads/digitale-tierarztpraxis-marktuebersicht-1x1.png',
    w: 1440,
    h: 1440,
    px: 2160,
    stempel: { breite: 1440, rechts: 1440 - 48, oben: 114, hoehe: 22 },
  },
  {
    id: 'original',
    label: 'Original',
    titel: 'Ganze Karte in voller Auflösung – zum Hineinzoomen',
    datei: 'downloads/digitale-tierarztpraxis-marktuebersicht.png',
    w: BILDSTEMPEL.breite,
    h: 0,
    px: BILDSTEMPEL.breite * 2,
    stempel: BILDSTEMPEL as Stempellage,
  },
] as const;
