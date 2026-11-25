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
  // Autorenseite auf dieser Domain seit 25.11.2026; die Schwesterseite bleibt in sameAs.
  url: 'https://tiermedizin-in-digital.org/ueber.html',
  sameAs: [
    'https://www.linkedin.com/in/thomas-freimoser',
    'https://freimoser.de/',
    'https://tiermedizin-in-zahlen.org/ueber-das-projekt.html#thomas-freimoser',
  ],
} as const;

/**
 * Seiten und Angebote, auf die der Kasten „Aus dem Verbund“ neben jedem
 * Artikel verweist (scripts/gen-artikel.mjs). Wunsch 25.11.2026.
 *
 * Beschreibungen decken sich mit den Seiten selbst (geprüft 25.11.2026).
 * `offenlegung` steht sichtbar am Eintrag, wenn es um ein Unternehmen geht,
 * an dem der Herausgeber beteiligt oder in dem er tätig ist.
 */
export const VERBUND = [
  {
    name: 'Tiermedizin in Zahlen',
    url: 'https://tiermedizin-in-zahlen.org/',
    rolle: 'Schwesterseite, vom selben Herausgeber',
    beschreibung:
      'Zahlen zu Tierärzten, Praxen und Haustieren in Deutschland – jede mit Quelle und Jahr.',
  },
  {
    name: 'Humanmedizin in Zahlen',
    url: 'https://humanmedizin-in-zahlen.org/',
    rolle: 'Unsere Mitmediziner, vom selben Herausgeber',
    beschreibung:
      'Welche Praxissoftware Arztpraxen nutzen, wer sie liefert und wie vernetzt die ambulante Versorgung ist.',
  },
  {
    name: 'FleXChange-Medical',
    url: 'https://www.flexchange-medical.de/',
    rolle: 'Schnittstellen in der Humanmedizin',
    beschreibung:
      'Einheitliche Schnittstelle, die Praxisverwaltungs- und Krankenhaussysteme an Patientenportale, ' +
      'Labore und digitale Gesundheitsanwendungen anbindet.',
    offenlegung: 'Der Herausgeber ist in der FleXChange-Medical GmbH aktiv.',
  },
] as const;
