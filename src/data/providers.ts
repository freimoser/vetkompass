import type { Provider } from '../types/market';

/**
 * Zentrale Anbieterliste der Marktübersicht.
 *
 * Regeln für diese Datei
 * ----------------------
 * 1. Ein Anbieter = ein Datensatz. Mehrfachnennungen werden über
 *    `categories: [...]` abgebildet, niemals über Kopien des Datensatzes.
 * 2. Keine Wertungen, keine Rankings, keine Preise, keine Empfehlungen.
 * 3. Die Reihenfolge in diesem Array ist bedeutungslos – die Darstellung
 *    sortiert innerhalb jeder Kategorie alphabetisch.
 * 4. `logo` ist optional. Fehlt die Datei, zeigt die Seite automatisch eine
 *    neutrale Text-Wortmarke an. Logos gehören nach `public/logos/`.
 *
 * TODO (Datenpflege)
 * ------------------
 * - `countries` ist aktuell durchgängig auf den gesamten DACH-Raum gesetzt.
 *   Die länderspezifische Verfügbarkeit einzelner Anbieter ist nicht
 *   individuell verifiziert und sollte vor der Veröffentlichung geprüft werden.
 * - Mit `// TODO: Website` markierte Anbieter haben noch keine hinterlegte URL.
 * - Die Logos unter `public/logos/` wurden aus der Original-Grafik
 *   ausgeschnitten und sind daher nur in Bildschirmauflösung vorhanden.
 *   Für Druck und große Darstellungen sollten sie durch die Originaldateien
 *   der Anbieter (bevorzugt SVG) ersetzt werden – siehe README.
 */

/** Standard-Footprint, solange die Länderverfügbarkeit nicht geprüft ist. */
const DACH = ['DE', 'AT', 'CH'] as const;

export const providers: Provider[] = [
  {
    id: 'animalchat',
    name: 'AnimalChat',
    website: 'https://animalchat.net',
    countries: [...DACH],
    categories: [8],
    description:
      'Kommunikationslösung für Tierarztpraxen mit Nachrichten und Videosprechstunde, nach Anbieterangabe auf deutschen Servern gehostet.',
    tags: ['Videosprechstunde', 'Kommunikation', 'Praxis'],
  },
  {
    id: 'anidata',
    name: 'ANIDATA',
    logo: 'logos/anidata.png',
    website: 'https://www.anidata.de',
    countries: [...DACH],
    categories: [6],
    description:
      'Praxismanagementsystem für die Organisation von Patientendaten, Terminen, Dokumentation und Abrechnung in der Tierarztpraxis.',
    tags: ['PIMS', 'Praxissoftware', 'Patientenakte'],
  },
  {
    id: 'debevet',
    name: 'debevet',
    website: 'https://www.debevet.de',
    countries: [...DACH],
    categories: [6],
    description:
      'Cloudbasiertes Praxismanagementsystem für Kleintier-, Nutztier- und Pferdepraxen sowie Tiertherapie.',
    tags: ['PIMS', 'Praxissoftware', 'Cloud'],
  },
  {
    id: 'digitail',
    name: 'Digitail',
    logo: 'logos/digitail.png',
    website: 'https://www.digitail.com',
    countries: [...DACH],
    categories: [4],
    description:
      'Digitale Lösung mit KI-gestützten Funktionen für Dokumentation und Unterstützung im Praxisalltag.',
    tags: ['KI', 'Dokumentation', 'Praxisassistent'],
  },
  {
    id: 'doktor-fressnapf',
    name: 'Doktor Fressnapf',
    logo: 'logos/doktor-fressnapf.png',
    website: 'https://dr.fressnapf.de',
    countries: [...DACH],
    categories: [7],
    description:
      'Angebot für Tierhalter, über das eine veterinärmedizinische Online-Beratung per Video erreichbar ist.',
    tags: ['Telemedizin', 'Videosprechstunde', 'Tierhalter'],
  },
  {
    id: 'dogorama',
    name: 'DOGORAMA',
    logo: 'logos/dogorama.png',
    website: 'https://www.dogorama.app',
    countries: [...DACH],
    categories: [1],
    description:
      'Plattform rund um Hunde und Hundehalter, über die Tierarztpraxen digital sichtbar werden können.',
    tags: ['Sichtbarkeit', 'Community', 'Tierhalter'],
  },
  {
    id: 'dr-sam',
    name: 'Dr. SAM',
    logo: 'logos/dr-sam.png',
    website: 'https://drsam.de',
    countries: [...DACH],
    categories: [7],
    description:
      'Online-Tierarztangebot, über das Tierhalter eine veterinärmedizinische Beratung digital in Anspruch nehmen können.',
    tags: ['Telemedizin', 'Videosprechstunde', 'Tierhalter'],
  },
  {
    id: 'easyvet',
    name: 'easyVET',
    logo: 'logos/easyvet.png',
    website: 'https://www.vetz.de',
    countries: [...DACH],
    categories: [6],
    description:
      'Praxismanagementsystem für Patientenakte, Terminplanung, Dokumentation und Abrechnung.',
    tags: ['PIMS', 'Praxissoftware', 'Patientenakte'],
  },
  {
    id: 'evovell',
    name: 'Evovell',
    website: 'https://www.evovell.com',
    countries: [...DACH],
    categories: [9],
    description:
      'App für Tierhalter, die Gesundheitsdaten, Termine und tierärztliche Unterlagen für Hund, Katze und Pferd bündelt.',
    tags: ['Tierhalter-App', 'Patientenakte'],
  },
  {
    id: 'felmo',
    name: 'felmo',
    logo: 'logos/felmo.png',
    website: 'https://www.felmo.de',
    countries: [...DACH],
    categories: [7, 9],
    description:
      'Tierärztliches Angebot mit digitalen Services für Tierhalter, unter anderem Online-Beratung und App-Zugang zu Terminen und Dokumenten.',
    tags: ['Telemedizin', 'Tierhalter-App', 'Videosprechstunde'],
  },
  {
    id: 'firstvet',
    name: 'FirstVet',
    logo: 'logos/firstvet.png',
    website: 'https://firstvet.com/de',
    countries: [...DACH],
    categories: [7],
    description:
      'Online-Videosprechstunde, über die Tierhalter direkt eine veterinärmedizinische Beratung erreichen können.',
    tags: ['Telemedizin', 'Videosprechstunde', 'Tierhalter'],
  },
  {
    id: 'haustierdocs',
    name: 'HaustierDocs',
    logo: 'logos/haustierdocs.png',
    website: 'https://www.haustierdocs.de',
    countries: [...DACH],
    categories: [7],
    description:
      'Online-Angebot, über das Tierhalter tierärztliche Beratung digital in Anspruch nehmen können.',
    tags: ['Telemedizin', 'Videosprechstunde', 'Tierhalter'],
  },
  {
    id: 'hunderunde',
    name: 'Hunderunde',
    logo: 'logos/hunderunde.png',
    website: undefined, // TODO: Website ergänzen
    countries: [...DACH],
    categories: [5],
    description:
      'Digitales Informationsangebot mit Newsletter-Format für die deutschsprachige Tier- und Veterinärbranche.',
    tags: ['Newsletter', 'Branchenmedien'],
  },
  {
    id: 'idexx-animana',
    name: 'IDEXX Animana',
    logo: 'logos/idexx-animana.png',
    website: 'https://software.idexx.de',
    countries: [...DACH],
    categories: [6],
    description:
      'Cloudbasiertes Praxismanagementsystem für Patientendaten, Termine, Dokumentation und Abrechnung.',
    tags: ['PIMS', 'Praxissoftware', 'Cloud'],
  },
  {
    id: 'inbehandlung',
    name: 'inBehandlung',
    logo: 'logos/inbehandlung.png',
    website: 'https://www.inbehandlung.de',
    countries: [...DACH],
    categories: [2, 6, 8],
    description:
      'Praxissoftware mit zusätzlichen digitalen Services wie Online-Terminvereinbarung und praxiseigener Videosprechstunde.',
    tags: ['PIMS', 'Praxissoftware', 'Terminbuchung', 'Videosprechstunde'],
  },
  {
    id: 'just4vets',
    name: 'JUST4VETS',
    logo: 'logos/just4vets.png',
    website: undefined, // TODO: Website ergänzen
    countries: [...DACH],
    categories: [5],
    description:
      'Informations- und Newsletter-Angebot für Tierärztinnen, Tierärzte und Praxisteams.',
    tags: ['Newsletter', 'Branchenmedien'],
  },
  {
    id: 'katzenmedizin',
    name: 'Katzenmedizin',
    // TODO: Website ergänzen – katzenmedizin.de liefert ein fehlerhaftes
    // TLS-Zertifikat und ist derzeit nicht abrufbar.
    // TODO: Aufnahme bestätigen – Hinweis von Christian Salzmann (LinkedIn,
    // 21.09.2026); Andreas Moll soll noch festlegen, wie er erscheinen möchte.
    website: undefined,
    countries: [...DACH],
    categories: [5],
    description:
      'Fachportal und Informationsangebot zur Katzenmedizin für die deutschsprachige Veterinärbranche.',
    tags: ['Newsletter', 'Fachmedien', 'Katzenmedizin'],
  },
  {
    id: 'petla',
    name: 'Petla',
    // TODO: Name und Website bestätigen – Hinweis von Christian J. Gabrielse
    // (LinkedIn, 21.09.2026) für die Kategorien 1 und 2. petla.de und
    // petla.com sind geparkt, eine passende Seite war nicht auffindbar.
    website: undefined,
    countries: [...DACH],
    categories: [1, 2],
    description:
      'Lösung für digitale Sichtbarkeit von Tierarztpraxen und Online-Terminvereinbarung.',
    tags: ['Sichtbarkeit', 'Terminbuchung'],
  },
  {
    id: 'petleo',
    name: 'Petleo',
    logo: 'logos/petleo.png',
    website: 'https://www.petleo.net',
    countries: [...DACH],
    // Ein Datensatz, viele Kategorien – bewusst keine Kopien je Kategorie.
    categories: [1, 2, 3, 4, 5, 6, 8, 9],
    subgroups: ['pims-addons'],
    disclosureNote:
      'Offenlegung: Der Herausgeber dieser Übersicht ist an diesem Anbieter beteiligt und für ihn tätig. Eine Sonderplatzierung entsteht daraus nicht – die Sortierung ist in allen Kategorien rein alphabetisch.',
    description:
      'Digitale Plattform für Tierarztpraxen mit Bausteinen für Sichtbarkeit, Online-Terminvereinbarung, digitale Patientenaufnahme, KI-Unterstützung, Videosprechstunde und Tierhalter-App.',
    tags: [
      'Sichtbarkeit',
      'Terminbuchung',
      'Intake',
      'KI',
      'Videosprechstunde',
      'Tierhalter-App',
      'Newsletter',
    ],
    // Produktmarken, unter denen der Anbieter in einzelnen Kategorien auftritt.
    variants: {
      4: { label: 'Petleo.ai', logo: 'logos/petleo-ai.png' },
      5: { label: 'Petleo – News for Vets', logo: 'logos/petleo-news.png' },
      6: { logo: 'logos/petleo-pims.png' },
    },
  },
  {
    id: 'petleo-dicom',
    name: 'Petleo DICOM',
    logo: 'logos/petleo-dicom.png',
    website: 'https://www.petleo.net',
    countries: [...DACH],
    categories: [6],
    subgroups: ['pims-addons'],
    disclosureNote:
      'Offenlegung: Der Herausgeber dieser Übersicht ist an diesem Anbieter beteiligt und für ihn tätig. Eine Sonderplatzierung entsteht daraus nicht – die Sortierung ist in allen Kategorien rein alphabetisch.',
    description:
      'Add-on für die Anbindung bildgebender Verfahren (DICOM) an bestehende Praxissoftware.',
    tags: ['Add-on', 'DICOM', 'Bildgebung'],
  },
  {
    id: 'petsapp',
    name: 'PetsApp',
    logo: 'logos/petsapp.png',
    website: 'https://www.petsapp.com',
    countries: [...DACH],
    categories: [2, 9],
    description:
      'Kommunikations- und App-Lösung für die Interaktion zwischen Tierarztpraxis und Tierhalter, inklusive Terminfunktionen.',
    tags: ['Tierhalter-App', 'Kommunikation', 'Terminbuchung'],
  },
  {
    id: 'petsxl',
    name: 'petsXL',
    logo: 'logos/petsxl.png',
    website: 'https://www.petsxl.com',
    countries: [...DACH],
    categories: [2, 3, 9],
    description:
      'Digitale Services für Tierarztpraxen mit Online-Terminvereinbarung, digitaler Patientenaufnahme und Tierhalter-Portal.',
    tags: ['Terminbuchung', 'Intake', 'Tierhalter-App'],
  },
  {
    id: 'provet-cloud',
    name: 'Provet Cloud',
    logo: 'logos/provet-cloud.png',
    website: 'https://www.provet.com',
    countries: [...DACH],
    categories: [6],
    description:
      'Cloudbasiertes Praxismanagementsystem für Tierarztpraxen und Kliniken.',
    tags: ['PIMS', 'Praxissoftware', 'Cloud'],
  },
  {
    id: 'reportassistant',
    name: 'ReportAssistant',
    logo: 'logos/reportassistant.png',
    website: 'https://www.reportassistant.de',
    countries: [...DACH],
    categories: [4],
    description:
      'KI-gestützte Unterstützung beim Erstellen tiermedizinischer Berichte und Dokumentation.',
    tags: ['KI', 'Dokumentation', 'Befund'],
  },
  {
    id: 'scribblevet',
    name: 'ScribbleVet',
    logo: 'logos/scribblevet.png',
    website: 'https://www.scribblevet.com',
    countries: [...DACH],
    categories: [4],
    description:
      'KI-Assistent für die Dokumentation, der Gespräche in strukturierte Notizen überführt.',
    tags: ['KI', 'Dokumentation', 'Spracherkennung'],
  },
  {
    id: 'tierarzt-online',
    name: 'tierarzt-online',
    website: 'https://tierarzt-online.org',
    countries: [...DACH],
    categories: [7, 8],
    description:
      'Tierärztliche Beratung per Videochat – sowohl als Angebot für Tierhalter als auch für Praxen, die eigene Videotermine anbieten.',
    tags: ['Telemedizin', 'Videosprechstunde'],
  },
  {
    id: 'tierarzt-plus-partner',
    name: 'Tierarzt Plus Partner',
    logo: 'logos/tierarzt-plus-partner.png',
    website: 'https://www.tierarztpluspartner.de',
    countries: [...DACH],
    categories: [7],
    description:
      'Angebot mit veterinärmedizinischer Online-Beratung für Tierhalter.',
    tags: ['Telemedizin', 'Videosprechstunde'],
  },
  {
    id: 'tpv-systeme',
    name: 'TPV-Systeme',
    logo: 'logos/tpv-systeme.png',
    website: 'https://www.tpv-systeme.de',
    countries: [...DACH],
    categories: [6],
    description:
      'Praxissoftware für die Verwaltung von Patientendaten, Terminen und Abrechnung in der Tierarztpraxis.',
    tags: ['PIMS', 'Praxissoftware'],
  },
  {
    id: 'vemed',
    name: 'Vemed',
    logo: 'logos/vemed.png',
    website: undefined, // TODO: Website ergänzen
    countries: [...DACH],
    categories: [6],
    description:
      'Praxismanagementsystem für die tierärztliche Praxisorganisation und Dokumentation.',
    tags: ['PIMS', 'Praxissoftware'],
  },
  {
    id: 'vet-magazin',
    name: 'VET-MAGAZIN.de',
    logo: 'logos/vet-magazin.png',
    website: 'https://www.vet-magazin.de',
    countries: [...DACH],
    categories: [5],
    description:
      'Online-Fachmagazin und Newsletter für die deutschsprachige Veterinärbranche.',
    tags: ['Newsletter', 'Fachmedien', 'Branchenmedien'],
  },
  {
    id: 'vet7well',
    // Schreibweise und Adresse am 23.09.2026 geklärt: Die Seite unter vet7.net
    // antwortet mit HTTP 200 und trägt den Titel "VET7.well | Tierarzt Software
    // für Tierarztpraxis & Tierklinik". Der Hinweis kam von Christian J.
    // Gabrielse (LinkedIn, 21.09.2026), die Domain aus der Suche – unter
    // vet7well.de und vet7well.com gibt es weiterhin keine Seite.
    name: 'VET7.well',
    website: 'https://www.vet7.net',
    countries: [...DACH],
    categories: [6],
    description: 'Praxismanagementsystem für die tierärztliche Praxis.',
    tags: ['PIMS', 'Praxissoftware'],
  },
  {
    id: 'vetat-work',
    name: 'vet@work',
    website: 'https://vetat.work',
    countries: [...DACH],
    categories: [6],
    description:
      'Praxismanagementsystem der WDT Wirtschaftsgenossenschaft deutscher Tierärzte für Verwaltungsaufgaben und Praxisabläufe.',
    tags: ['PIMS', 'Praxissoftware', 'Genossenschaft'],
  },
  {
    id: 'vetdream',
    name: 'VetDream',
    logo: 'logos/vetdream.png',
    website: 'https://www.vetdream.de',
    countries: [...DACH],
    categories: [2, 6],
    description:
      'Praxissoftware mit digitalen Zusatzfunktionen, unter anderem für die Online-Terminvereinbarung.',
    tags: ['PIMS', 'Praxissoftware', 'Terminbuchung'],
  },
  {
    id: 'vetera',
    name: 'Vetera',
    logo: 'logos/vetera.png',
    website: 'https://www.vetera.net',
    countries: [...DACH],
    categories: [6],
    description:
      'Praxismanagementsystem für Patientenakte, Terminplanung, Dokumentation und Abrechnung.',
    tags: ['PIMS', 'Praxissoftware', 'Patientenakte'],
  },
  {
    id: 'vetguru',
    name: 'VetGuru',
    logo: 'logos/vetguru.png',
    website: 'https://www.vetguru.de',
    countries: [...DACH],
    categories: [8],
    description:
      'Lösung, mit der Tierarztpraxen ihren eigenen Kunden Video- und Telemedizin-Termine anbieten können.',
    tags: ['Videosprechstunde', 'Telemedizin', 'Praxis'],
  },
  {
    id: 'vetinf',
    name: 'VETINF',
    logo: 'logos/vetinf.png',
    website: 'https://www.vetinf.de',
    countries: [...DACH],
    categories: [6],
    description:
      'Praxissoftware für die tierärztliche Praxisverwaltung, Dokumentation und Abrechnung.',
    tags: ['PIMS', 'Praxissoftware'],
  },
  {
    id: 'vetmeta',
    name: 'VetMeta',
    logo: 'logos/vetmeta.png',
    website: undefined, // TODO: Website ergänzen
    countries: [...DACH],
    categories: [4],
    description:
      'KI-gestützter Assistent für Dokumentation und Unterstützung im tierärztlichen Praxisalltag.',
    tags: ['KI', 'Dokumentation', 'Praxisassistent'],
  },
  {
    id: 'vetnio',
    name: 'Vetnio',
    website: 'https://www.vetnio.com',
    countries: [...DACH],
    categories: [4],
    description:
      'KI-Assistent für die tierärztliche Dokumentation, der Notizen automatisiert und bei Anrufen und Nachrichten unterstützt.',
    tags: ['KI', 'Dokumentation', 'Praxisassistent'],
  },
  {
    id: 'vetoffice-plus',
    name: 'VETOffice Plus',
    logo: 'logos/vetoffice-plus.png',
    website: 'https://www.vetoffice.de',
    countries: [...DACH],
    categories: [6],
    description:
      'Software für die tierärztliche Praxis und Klinik mit Funktionen für Patientenakte, Termine und Abrechnung.',
    tags: ['PIMS', 'Praxissoftware', 'Klinik'],
  },
  {
    id: 'vetpraxis-de',
    name: 'vetpraxis.de',
    logo: 'logos/vetpraxis-de.png',
    website: 'https://www.vetpraxis.de',
    countries: [...DACH],
    categories: [6],
    description:
      'Praxissoftware für Organisation, Dokumentation und Abrechnung in der Tierarztpraxis.',
    tags: ['PIMS', 'Praxissoftware'],
  },
  {
    id: 'vetsoap',
    name: 'VetSOAP',
    logo: 'logos/vetsoap.png',
    website: undefined, // TODO: Website ergänzen
    countries: [...DACH],
    categories: [4],
    description:
      'KI-Assistent, der tierärztliche Gespräche in strukturierte Dokumentation im SOAP-Format überführt.',
    tags: ['KI', 'Dokumentation', 'SOAP'],
  },
  {
    id: 'vetsxl',
    name: 'vetsXL.com',
    logo: 'logos/vetsxl.png',
    website: 'https://www.vetsxl.com',
    countries: [...DACH],
    categories: [6],
    subgroups: ['pims-addons'],
    description:
      'Add-on-Angebot, das bestehende Praxissoftware um digitale Services erweitert.',
    tags: ['Add-on', 'Schnittstelle', 'Digitale Services'],
  },
  {
    id: 'vetstar',
    name: 'VetStar',
    logo: 'logos/vetstar.png',
    website: 'https://www.vetstar.de',
    countries: [...DACH],
    categories: [6],
    description:
      'Praxismanagementsystem für die Verwaltung von Patientendaten, Terminen und Abrechnung.',
    tags: ['PIMS', 'Praxissoftware'],
  },
  {
    id: 'vetstoria',
    name: 'Vetstoria',
    logo: 'logos/vetstoria.png',
    website: 'https://www.vetstoria.com',
    countries: [...DACH],
    categories: [2],
    description:
      'Lösung für die Online-Terminvereinbarung, die sich in bestehende Praxissoftware integrieren lässt.',
    tags: ['Terminbuchung', 'Online-Booking'],
  },
];

export const providersById = new Map(providers.map((provider) => [provider.id, provider]));
