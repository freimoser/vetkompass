import type { Category, CategoryId } from '../types/market';

/**
 * Die Kategorien der Marktübersicht.
 *
 * `placement` bildet die räumliche Struktur der Original-Grafik ab:
 *  - left:   Kategorien 1–5 und 10 (breiter Block links, zweispaltig)
 *  - center: Kategorie 6 (hohe Spalte in der Mitte), darunter 13
 *            (25.11.2026: links angehängt war der linke Block 900 px länger)
 *  - right:  Kategorien 7–9, 11, 12 und 14 (gestapelt rechts). 11 und 12 stehen
 *            rechts, weil der linke Block sonst über 1000 px länger war als
 *            die beiden anderen Spalten (gemessen am 14.10.2026 bei 1440 px).
 *
 * Die Reihenfolge in diesem Array ist die Darstellungsreihenfolge. Kategorie 10
 * steht deshalb am Ende und füllt im linken Block die Zeile neben Kategorie 5.
 *
 * Auf Tablet und Mobile wird `placement` ignoriert und alles gestapelt.
 */
/** Gilt für jede Kategorie ohne eigene Aufnahmekriterien. */
export const AUFNAHME_STANDARD =
  'Aufgenommen wird jede Lösung, die zu dieser Beschreibung passt und deren Funktion auf der Website ' +
  'des Anbieters beschrieben ist. Eine Mindestgröße gibt es hier nicht; die Aufnahme ist kostenfrei.';

export const categories: Category[] = [
  {
    id: 1,
    slug: 'digitale-sichtbarkeit',
    title: 'Digitale Sichtbarkeit & Neukundengewinnung',
    shortTitle: 'Sichtbarkeit',
    description:
      'Plattformen und Lösungen, über die Tierarztpraxen digital sichtbar werden und neue Tierhalter erreichen können.',
    // Kriterien vom Herausgeber festgelegt am 25.11.2026.
    aufnahme:
      'Hier stehen Plattformen mit eigener Reichweite bei Tierhaltern: Über sie erreicht eine Praxis ' +
      'Menschen, die sie noch nicht kennt, und gewinnt neue Patienten. Mindestgröße: 100.000 monatlich ' +
      'aktive Nutzerinnen und Nutzer und 1 Million registrierte Tierprofile. Lösungen, mit denen eine ' +
      'Praxis über eigene Kanäle sichtbar wird, etwa Terminbuchung, Messenger oder Tierhalter-App, ' +
      'stehen in dem Feld, das ihre Funktion beschreibt.',
    // Halbe Breite, seit die Verzeichnisse in Kategorie 10 stehen: Zwei Anbieter
    // füllen keine volle Zeile. So paaren sich im linken Block 1|2, 3|4, 5|10.
    placement: { column: 'left', width: 'half' },
    logoColumns: 2,
  },
  {
    id: 2,
    slug: 'online-terminvereinbarung',
    title: 'Online-Terminvereinbarung',
    shortTitle: 'Terminvereinbarung',
    description: 'Lösungen zur digitalen Buchung und Verwaltung von Tierarztterminen.',
    placement: { column: 'left', width: 'half' },
    logoColumns: 2,
  },
  {
    id: 3,
    slug: 'intake-self-checkin',
    title: 'Intake-Fragebögen & Self-Check-in',
    shortTitle: 'Intake',
    description:
      'Digitale Patientenaufnahme, Anamnesebögen, Registrierungsprozesse und Self-Check-in vor oder beim Praxisbesuch.',
    placement: { column: 'left', width: 'half' },
    logoColumns: 2,
  },
  {
    id: 4,
    slug: 'ki-dokumentation',
    title: 'KI-Dokumentations- & Praxisassistenten',
    shortTitle: 'KI-Assistenten',
    description:
      'KI-basierte Lösungen für Dokumentation, Sprachaufzeichnung, Zusammenfassungen, Telefonassistenz und Unterstützung im Praxisalltag.',
    placement: { column: 'left', width: 'half' },
    logoColumns: 2,
  },
  {
    id: 5,
    slug: 'branchen-newsletter',
    title: 'Branchen-Newsletter',
    shortTitle: 'Newsletter',
    description:
      'Digitale Medien, Newsletter und Informationsangebote für die deutschsprachige Veterinärbranche.',
    placement: { column: 'left', width: 'half' },
    logoColumns: 2,
  },
  {
    id: 6,
    slug: 'praxissoftware-pims',
    title: 'Praxissoftware (PIMS)',
    shortTitle: 'PIMS',
    description:
      'Zentrale Praxismanagementsysteme für Patientenakte, Termine, Abrechnung, Dokumentation und Praxisorganisation.',
    placement: { column: 'center', width: 'full' },
    logoColumns: 2,
    subgroups: [
      {
        id: 'pims-addons',
        title: 'PIMS – Add-ons für digitale Services',
        description:
          'Zusatzmodule und Schnittstellen, die bestehende Praxissoftware um digitale Services erweitern.',
      },
    ],
  },
  {
    id: 7,
    slug: 'online-videosprechstunde',
    title: 'Online-Videosprechstunde',
    shortTitle: 'Online-Videosprechstunde',
    description:
      'Anbieter, bei denen Tierhalter direkt einen digitalen Tierarzt bzw. eine veterinärmedizinische Online-Beratung erreichen können.',
    placement: { column: 'right', width: 'full' },
    logoColumns: 3,
  },
  {
    id: 8,
    slug: 'praxiseigene-videosprechstunde',
    title: 'Praxiseigene Videosprechstunde',
    shortTitle: 'Praxiseigene Videosprechstunde',
    description:
      'Lösungen, mit denen eine bestehende Tierarztpraxis ihren eigenen Kunden digitale Video- oder Telemedizin-Termine anbieten kann.',
    placement: { column: 'right', width: 'full' },
    logoColumns: 3,
  },
  {
    id: 9,
    slug: 'tierhalter-app',
    title: 'Tierhalter-App / Patientenportal',
    shortTitle: 'Tierhalter-App',
    description:
      'Digitale Schnittstellen zwischen Tierarztpraxis und Tierhalter für Kommunikation, Termine, Dokumente und weitere Services.',
    placement: { column: 'right', width: 'full' },
    logoColumns: 3,
  },
  {
    /*
      Nachgetragen am 27.09.2026. Vorher standen die Verzeichnisse in
      Kategorie 1 – dort passten sie nicht: Kategorie 1 sammelt Lösungen, die
      eine Praxis einsetzt, um sichtbar zu werden. Eine Suchmaschine ist
      dagegen der Ort, an dem gesucht wird. Für die Praxis ist das ein Kanal,
      den sie pflegt, kein Werkzeug, das sie kauft.
    */
    id: 10,
    slug: 'tieraerzte-suchmaschinen',
    title: 'Tierärzte-Suchmaschinen',
    shortTitle: 'Suchmaschinen',
    description:
      'Portale und Verzeichnisse, über die Tierhalter gezielt nach einer Tierarztpraxis oder Tierklinik suchen – kommerziell betrieben oder von Berufsverbänden.',
    placement: { column: 'left', width: 'half' },
    logoColumns: 2,
  },
  {
    /*
      Nachgetragen am 14.10.2026 aus den Kommentaren zum Update-Beitrag
      (Hinweis auf PrimVeterinary). Eigene Kategorie, weil Nachschlagen etwas
      anderes ist als Dokumentieren (Kategorie 4) oder Informieren
      (Kategorie 5): eine konkrete Frage am Patienten, meist zu Arzneimitteln.
    */
    id: 11,
    slug: 'klinisches-wissen',
    title: 'Klinisches Wissen & Arzneimittel',
    shortTitle: 'Wissen & Arzneimittel',
    description:
      'Nachschlagewerke, Arzneimittelinformation und Entscheidungshilfen für Tierärztinnen und Tierärzte im Behandlungsalltag.',
    placement: { column: 'right', width: 'full' },
    logoColumns: 3,
  },
  {
    /*
      Nachgetragen am 14.10.2026 aus den Kommentaren zum Update-Beitrag: Der
      Moment des entlaufenen oder gefundenen Tiers kam in keinem Feld vor. Die
      Praxis chippt, meldet und liest aus – deshalb gehören die Register in
      eine Übersicht digitaler Praxislösungen.
    */
    id: 12,
    slug: 'heimtierregister',
    title: 'Heimtierregister & Fundtiere',
    shortTitle: 'Heimtierregister',
    description:
      'Register, in denen gechippte Tiere mit ihrem Halter verknüpft sind – damit ein Fundtier über die Chipnummer nach Hause findet.',
    placement: { column: 'right', width: 'full' },
    logoColumns: 3,
  },
  {
    /*
      Nachgetragen am 25.11.2026 aus den LinkedIn-Kommentaren (Hinweis auf
      LISCA.vet). Eigene Kategorie, weil Kategorie 1 Plattformen mit eigener
      Reichweite sammelt; hier steht Dienstleistung: Menschen, die eine Praxis
      bei Marketing und Strategie beraten oder es für sie umsetzen.
    */
    id: 13,
    slug: 'praxismarketing',
    title: 'Praxismarketing & Beratung',
    shortTitle: 'Praxismarketing',
    description:
      'Agenturen und Beratungen, die Tierarztpraxen bei Marketing, Website, Social Media, Arbeitgebermarke und Praxisentwicklung unterstützen.',
    aufnahme:
      'Aufgenommen werden Agenturen und Beratungen, die auf ihrer eigenen Website ein Angebot ' +
      'ausdrücklich für Tierarztpraxen oder Tierkliniken ausweisen. Allgemeine Agenturen, die ' +
      'Tierarztpraxen nur als eine Branche unter vielen nennen, stehen nicht hier.',
    placement: { column: 'center', width: 'full' },
    logoColumns: 2,
  },
  {
    /*
      Nachgetragen am 25.11.2026 aus den LinkedIn-Kommentaren (Hinweis auf
      Myvetlearn). Abgrenzung zu Kategorie 5: Dort wird informiert, hier wird
      gelernt – mit Kurs, Nachweis und anerkannten Stunden.
    */
    id: 14,
    slug: 'online-fortbildung',
    title: 'Online-Fortbildung',
    shortTitle: 'Fortbildung',
    description:
      'Plattformen für Webinare, E-Learning und Online-Seminare, über die Tierärztinnen, Tierärzte und TFA sich fortbilden.',
    placement: { column: 'right', width: 'full' },
    logoColumns: 3,
    
  },
];

export const categoriesById = new Map<CategoryId, Category>(
  categories.map((category) => [category.id, category]),
);

export function getCategory(id: CategoryId): Category | undefined {
  return categoriesById.get(id);
}
