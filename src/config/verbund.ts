/**
 * Seitenverbund: die Schwesterseite vom selben Herausgeber.
 *
 * Die beiden Adressen spiegeln sich bewusst – tiermedizin-in-zahlen.org liefert
 * die Zahlen, tiermedizin-in-digital.org die Lösungen. Die Verweise zwischen
 * beiden stehen offen als „vom selben Herausgeber“ da; ein Verweis auf die
 * eigene zweite Seite, der das verschweigt, wäre genau die Art Eigenwerbung,
 * die diese Übersicht sonst vermeidet.
 *
 * Reine Daten ohne `import.meta.env`, damit App und Build-Skripte (Node)
 * dieselbe Angabe lesen.
 */
export const MARKE = 'Tiermedizin in digital';

export const SCHWESTER = {
  name: 'Tiermedizin in Zahlen',
  url: 'https://tiermedizin-in-zahlen.org/',
  // Deckt sich mit der Beschreibung der Seite selbst (geprüft am 27.09.2026).
  beschreibung: 'Zahlen zu Tierärzten, Praxen und Haustieren in Deutschland, jede mit Quelle.',
} as const;
