import type { Category, CategoryId } from '../types/market';

/**
 * Die neun Kategorien der Marktübersicht.
 *
 * `placement` bildet die räumliche Struktur der Original-Grafik ab:
 *  - left:   Kategorien 1–5 (breiter Block links)
 *  - center: Kategorie 6 (hohe Spalte in der Mitte)
 *  - right:  Kategorien 7–9 (gestapelt rechts)
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
    placement: { column: 'left', width: 'full' },
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
];

export const categoriesById = new Map<CategoryId, Category>(
  categories.map((category) => [category.id, category]),
);

export function getCategory(id: CategoryId): Category | undefined {
  return categoriesById.get(id);
}
