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

/**
 * Der Herausgeber als Person, für das Schema beider Seiten.
 *
 * `sameAs` verweist auf Profile, die belegt sind: das LinkedIn-Profil, das
 * Tiermedizin in Zahlen ebenfalls führt, und die Person dort. So erkennen
 * Antwortmaschinen, dass hinter beiden Seiten derselbe Mensch steht. Bis zum
 * 14.10.2026 fehlte das bewusst, weil das Profil noch nicht bestätigt war.
 */
export const HERAUSGEBER = {
  name: 'Thomas Freimoser',
  rolle: 'Experte für digitale Tiermedizin',
  url: 'https://tiermedizin-in-zahlen.org/ueber-das-projekt.html',
  sameAs: [
    'https://www.linkedin.com/in/thomas-freimoser',
    'https://tiermedizin-in-zahlen.org/ueber-das-projekt.html#thomas-freimoser',
  ],
} as const;
