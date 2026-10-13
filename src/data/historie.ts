/**
 * Die Entwicklung der Marktübersicht – Grundlage der Seite /entwicklung.html.
 *
 * Belegt, nicht erinnert: Die Anbieter- und Kategorienzahlen der Meilensteine
 * sind am 14.10.2026 aus der Git-Historie von `src/data/providers.ts` und
 * `categories.ts` gezählt worden, je Commit. Der heutige Stand wird nicht hier
 * eingetragen, sondern beim Erzeugen aus den Daten gezählt – sonst veraltet
 * genau die Zahl, auf die es ankommt.
 *
 * LinkedIn-Kennzahlen stehen nur dort, wo sie vorliegen, jeweils mit dem Tag,
 * an dem sie abgelesen wurden. Was fehlt, erscheint nicht – keine Platzhalter.
 */

export interface Fassung {
  /** Veröffentlichungstag, ISO. */
  datum: string;
  titel: string;
  anbieter: number;
  kategorien: number;
  /** Archivbild, Pfad relativ zu /public. Die Vorschau heißt gleich mit -vorschau.webp. */
  bild: string;
  bildBreite: number;
  bildHoehe: number;
  text: string;
  linkedin?: {
    url: string;
    /** Abgelesen am (ISO). */
    stand?: string;
    impressionen?: number;
    reaktionen?: number;
    kommentare?: number;
    reposts?: number;
  };
}

export const FASSUNGEN: Fassung[] = [
  {
    datum: '2026-09-20',
    titel: 'Erste Fassung',
    anbieter: 35,
    kategorien: 9,
    bild: 'archiv/marktuebersicht-2026-09-20.png',
    bildBreite: 1920,
    bildHoehe: 1080,
    text:
      'Von Hand gestaltet, vorgestellt in einem LinkedIn-Beitrag. Ausdrücklich mit der Bitte, ' +
      'fehlende Anbieter zu ergänzen – und mit der Offenlegung, dass der Herausgeber an Petleo ' +
      'beteiligt ist.',
  },
  {
    datum: '2026-10-12',
    titel: 'Update nach dem Feedback',
    anbieter: 52,
    kategorien: 10,
    bild: 'archiv/marktuebersicht-2026-10-12.png',
    bildBreite: 3840,
    bildHoehe: 2518,
    text:
      'Zehn Anbieter aus den Kommentaren zur ersten Fassung, eine neue Kategorie für ' +
      'Tierärzte-Suchmaschinen und erstmals aus den Daten erzeugt statt von Hand gezeichnet.',
    linkedin: {
      url: 'https://lnkd.in/p/gcbxriDV',
      stand: '2026-10-13',
      impressionen: 2875,
      reaktionen: 24,
      kommentare: 14,
      reposts: 1,
    },
  },
];

export interface Meilenstein {
  datum: string;
  /** Anbieter nach diesem Schritt, aus der Git-Historie. */
  anbieter: number;
  kategorien: number;
  titel: string;
  text: string;
}

/**
 * Was sich verändert hat, in der Reihenfolge, in der es passiert ist. Nur
 * Schritte, die man von außen sieht – keine reinen Umbauten im Code.
 */
export const MEILENSTEINE: Meilenstein[] = [
  {
    datum: '2026-09-17',
    anbieter: 35,
    kategorien: 9,
    titel: 'Die Grafik wird zur Website',
    text: 'Aus dem Bild wird eine durchsuchbare Übersicht mit Filter nach Kategorie und einer Detailansicht je Anbieter.',
  },
  {
    datum: '2026-09-20',
    anbieter: 35,
    kategorien: 9,
    titel: 'Erste Fassung auf LinkedIn',
    text: 'Vorstellung mit der Bitte um Ergänzungen.',
  },
  {
    datum: '2026-09-22',
    anbieter: 44,
    kategorien: 9,
    titel: 'Neun Anbieter aus den Kommentaren',
    text: 'Jeder Hinweis wurde auf der Website des Anbieters geprüft und dort eingeordnet, wo die Funktion beschrieben ist.',
  },
  {
    datum: '2026-09-23',
    anbieter: 44,
    kategorien: 9,
    titel: 'Ein Artikel je Lösungsfeld',
    text: 'Was das Feld umfasst, woran die Einführung scheitern kann, welche Fragen vor einer Entscheidung zu klären sind.',
  },
  {
    datum: '2026-09-27',
    anbieter: 51,
    kategorien: 10,
    titel: 'Kategorie 10: Tierärzte-Suchmaschinen',
    text: 'Die Portale, über die Tierhalter eine Praxis finden – getrennt von der Sichtbarkeit, die eine Praxis selbst gestaltet. Dazu zwölf fehlende Logos.',
  },
  {
    datum: '2026-09-27',
    anbieter: 51,
    kategorien: 10,
    titel: 'Das Bild entsteht aus den Daten',
    text: 'Die herunterladbare Karte wird bei jeder Änderung neu erzeugt und trägt ihr Erstellungsdatum. Vorher blieb sie beim Stand von 35 Anbietern stehen.',
  },
  {
    datum: '2026-10-08',
    anbieter: 51,
    kategorien: 10,
    titel: 'Ehrlicher statt vollständiger',
    text: 'Länderangaben, die nur angenommen waren, stehen jetzt als „nicht geprüft“ da. Keine Überschrift verspricht mehr „alle Anbieter“.',
  },
  {
    datum: '2026-10-12',
    anbieter: 52,
    kategorien: 10,
    titel: 'Update auf LinkedIn',
    text: 'CoVet aus den Kommentaren aufgenommen, Petla mit Website und Logo, Stand Oktober 2026.',
  },
  {
    datum: '2026-10-14',
    anbieter: 64,
    kategorien: 12,
    titel: 'Zwei neue Lösungsfelder aus den Kommentaren',
    text:
      'Klinisches Wissen & Arzneimittel sowie Heimtierregister & Fundtiere, angeregt unter dem ' +
      'Update-Beitrag. Dazu Agria, PetsVetCheck, PrimVeterinary und VetStage aus den Hinweisen, ' +
      'jeweils auf der eigenen Website geprüft. Zwei Vorschläge passten nicht: eine Lösung für ' +
      'Humanmedizin und eine reine Tierhalter-App.',
  },
];

/**
 * Beteiligung: wie viele Menschen sich mit Hinweisen eingebracht haben.
 * Gezählt sind verschiedene Personen und Unternehmensseiten, die unter den
 * Beiträgen kommentiert haben – ohne den Herausgeber. Namen stehen bewusst
 * nicht auf der Website: Ein Kommentar auf LinkedIn ist keine Einwilligung,
 * auf einer anderen Seite genannt zu werden.
 */
export const BETEILIGUNG = [
  { beitrag: 'Erste Fassung', datum: '2026-09-20', personen: 9, mitAnbieterhinweis: 7 },
  { beitrag: 'Update', datum: '2026-10-12', personen: 9, mitAnbieterhinweis: 6, stand: '2026-10-13' },
];

/**
 * Anbieter, die über Hinweise aus den Kommentaren in die Übersicht kamen –
 * je Beitrag. Die Seite zählt diese Listen, statt Zahlen von Hand zu führen;
 * eine ID, die es in den Daten nicht gibt, bricht den Build ab.
 */
export const AUS_HINWEISEN: Record<string, string[]> = {
  'Erste Fassung': [
    'animalchat',
    'covet',
    'debevet',
    'evovell',
    'katzenmedizin',
    'petla',
    'tierarzt-online',
    'vet7well',
    'vetat-work',
    'vetnio',
  ],
  Update: ['agria', 'petsvetcheck', 'primveterinary', 'vetstage'],
};
