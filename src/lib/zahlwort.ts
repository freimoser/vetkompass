/**
 * Kleine Zahlen als Wort, wie im deutschen Fließtext üblich – ab 13 als Ziffer.
 *
 * Warum es das gibt: Nach der Aufnahme von Kategorie 10 stand an sieben
 * Stellen noch „neun Kategorien“ bzw. „neun Lösungsfelder“ im Text, darunter
 * in der `llms.txt`, aus der Antwortmaschinen zitieren. Die Zahl war jeweils
 * von Hand geschrieben. Wer eine Anzahl in einen Text setzt, leitet sie jetzt
 * aus den Daten ab und schreibt sie über diese Funktion aus –
 * `scripts/check-launch.mjs` prüft das im Build.
 *
 * Reine Funktion ohne Importe, damit sie App und Build-Skripte gleichermaßen
 * lesen können (Node versteht TypeScript direkt).
 */
const WOERTER = ['null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf'];

export function zahlwort(n: number): string {
  return Number.isInteger(n) && n >= 2 && n < WOERTER.length ? WOERTER[n] : String(n);
}

/** Alle Wortformen, damit eine Prüfung sie im Text wiederfindet. */
export const ZAHLWOERTER = WOERTER;
