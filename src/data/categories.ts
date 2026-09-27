import type { Category, CategoryId } from '../types/market';

/**
 * Die Kategorien der Marktübersicht.
 *
 * `placement` bildet die räumliche Struktur der Original-Grafik ab:
 *  - left:   Kategorien 1–5 und 10 (breiter Block links, zweispaltig)
 *  - center: Kategorie 6 (hohe Spalte in der Mitte)
 *  - right:  Kategorien 7–9 (gestapelt rechts)
 *
 * Die Reihenfolge in diesem Array ist die Darstellungsreihenfolge. Kategorie 10
 * steht deshalb am Ende und füllt im linken Block die Zeile neben Kategorie 5.
 *
 * Auf Tablet und Mobile wird `placement` ignoriert und alles gestapelt.
 */
export const categories: Category[] = [
  {
    id: 1,
    slug: 'digitale-sichtbarkeit',
    title: 'Digitale Sichtbarkeit & Neukundengewinnung',
    shortTitle: 'Sichtbarkeit',
    description:
      'Plattformen und Lösungen, über die Tierarztpraxen digital sichtbar werden und neue Tierhalter erreichen können.',
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
      'KI-basierte Lösungen für Dokumentation, Sprachaufzeichnung, Zusammenfassungen und Unterstützung im Praxisalltag.',
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
];

export const categoriesById = new Map<CategoryId, Category>(
  categories.map((category) => [category.id, category]),
);

export function getCategory(id: CategoryId): Category | undefined {
  return categoriesById.get(id);
}
