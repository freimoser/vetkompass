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
 * - `countries` ist nur dort gefüllt, wo die Länder belegt sind. Bis zum
 *   08.10.2026 stand bei fast allen Anbietern pauschal der ganze DACH-Raum –
 *   geraten, aber auf der Seite als Tatsache angezeigt, und der Länderfilter
 *   tat so, als wüsste er es. Leer heißt jetzt „noch nicht geprüft“, und der
 *   Länderfilter bleibt ausgeblendet, bis die Angaben belegt sind.
 *   `tierarzt software österreich` und `… schweiz` sind eigene Suchanfragen
 *   (siehe docs/KEYWORD-RECHERCHE.md, 3.3), die Prüfung lohnt sich also.
 * - Mit `// TODO: Website` markierte Anbieter haben noch keine hinterlegte URL.
 * - Die Logos unter `public/logos/` stammen aus zwei Quellen: die älteren
 *   wurden aus der Original-Grafik ausgeschnitten und liegen daher nur in
 *   Bildschirmauflösung vor; die am 27.09.2026 ergänzten zwölf stammen direkt
 *   von den Anbieterseiten (SVG, wo vorhanden) und sind dadurch schärfer.
 *   Alle SVG-Dateien wurden vor der Aufnahme auf eingebettete Skripte geprüft.
 *   Für Druck und große Darstellungen sollten sie durch die Originaldateien
 *   der Anbieter (bevorzugt SVG) ersetzt werden – siehe README.
 */

export const providers: Provider[] = [
  {
    // Kategorie 9 am 13.10.2026 ergänzt (Hinweis Dr. Heinrich Wilkes,
    // Mitgründer, LinkedIn): animalchat.net beschreibt neben der
    // Video-Beratung die Chat-Beratung zwischen Praxis und Tierhalter.
    // Kategorie 4 am 25.11.2026 ergänzt (Hinweis AnimalChat, LinkedIn):
    // business.animalchat.net beschreibt die Telefonassistenz „Nora“ und
    // Berichte aus dem Diktat, „auf Wunsch nach SOAP“ (geprüft 25.11.2026).
    // Logos auf Wunsch des Anbieters: orange AnimalChat-Logo für die
    // Tierhalter-App (animalchat.net/press), AnimalChat Business für die
    // Praxis-Kategorien (business.animalchat.net/ressourcen).
    // Kategorien 1, 3, 5, 7 und 10 aus demselben Hinweis: auf den Seiten
    // nicht belegt (geprüft 25.11.2026).
    id: 'animalchat',
    name: 'AnimalChat',
    logo: 'logos/animalchat.png',
    website: 'https://animalchat.net',
    countries: [],
    categories: [4, 8, 9],
    description:
      'Kommunikationslösung für Tierarztpraxen mit Nachrichten und Videosprechstunde, nach Anbieterangabe auf deutschen Servern gehostet.',
    variants: {
      4: {
        label: 'AnimalChat Business',
        logo: 'logos/animalchat-business.png',
        description:
          'KI-Assistenz für Tierarztpraxen: Telefonassistenz, die Anliegen außerhalb der Sprechzeit aufnimmt, und Berichte aus dem Diktat, auf Wunsch im SOAP-Format.',
      },
      8: { label: 'AnimalChat Business', logo: 'logos/animalchat-business.png' },
    },
    tags: ['Videosprechstunde', 'Kommunikation', 'Praxis', 'Anrufe', 'Diktat'],
  },
  {
    id: 'anidata',
    name: 'ANIDATA',
    logo: 'logos/anidata.png',
    website: 'https://www.anidata.de',
    countries: [],
    categories: [6],
    description:
      'Praxismanagementsystem für die Organisation von Patientendaten, Terminen, Dokumentation und Abrechnung in der Tierarztpraxis.',
    tags: ['PIMS', 'Praxissoftware', 'Patientenakte'],
  },
  {
    /*
      Verbandsangebot, kein Marktangebot – steht trotzdem hier. Die Kategorie
      fragt, wo Tierhalter nach einer Praxis suchen, nicht, wer damit Geld
      verdient. Für die Schweiz und in Teilen für Deutschland sind die
      Verbandssuchen die meistgenutzten Einstiege.
    */
    id: 'bpt-tierarztsuche',
    name: 'bpt-Tierarztsuche',
    logo: 'logos/bpt-tierarztsuche.svg',
    website: 'https://www.tieraerzteverband.de/bpt/ueber-den-bpt/tierarztsuche/',
    countries: ['DE'],
    merkmal: 'Praxissuche filterbar nach Tierart, von kleinen Heimtieren bis zu Pferden und Schweinen.',
    merkmalQuelle: 'https://www.tieraerzteverband.de/bpt/ueber-den-bpt/tierarztsuche/ (geprüft 25.11.2026)',
    categories: [10],
    description:
      'Praxissuche des Bundesverbands Praktizierender Tierärzte e.V. Gelistet werden Mitgliedspraxen.',
    tags: ['Suchmaschine', 'Berufsverband'],
  },
  {
    // Hinweis von Cosima L. L. Kronzucker (CoVet, LinkedIn, Anfang Oktober
    // 2026) mit der Bitte um Kategorie 4 und die PIMS-Add-ons. Add-on belegt:
    // co.vet/de/integrations nennt Provet Cloud als Integration und Animana
    // für den Import per Browser-Erweiterung (geprüft 12.10.2026). Logo:
    // co.vet/assets/brand/Covet-Logo-H-Color.svg, auf Skripte geprüft.
    id: 'covet',
    name: 'CoVet',
    logo: 'logos/covet.svg',
    website: 'https://www.co.vet/de',
    countries: [],
    merkmal: 'Schnittstellen u. a. zu ezyVet, Animana, Provet Cloud und Cornerstone; Protokolle gehen zurück in die Praxissoftware.',
    merkmalQuelle: 'https://co.vet/de/integrations/ (geprüft 25.11.2026)',
    categories: [4, 6],
    subgroups: ['pims-addons'],
    description:
      'KI-Assistent, der aus dem Behandlungsgespräch Patientenakte und SOAP-Bericht erstellt, mit Anbindung an bestehende Praxissoftware.',
    tags: ['KI', 'Dokumentation', 'SOAP', 'Add-on'],
  },
  {
    id: 'debevet',
    name: 'debevet',
    logo: 'logos/debevet.svg',
    website: 'https://www.debevet.de',
    countries: [],
    merkmal: 'Für Klein-, Nutztier- und Pferdepraxen, mit Anbindung an HI-Tier und QS-Vetproof.',
    merkmalQuelle: 'https://www.debevet.de (geprüft 25.11.2026)',
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
    countries: [],
    merkmal: 'Cloud-Praxissoftware mit eingebauter KI, u. a. SOAP-Diktat und Zusammenfassung der Krankenakte.',
    merkmalQuelle: 'https://digitail.com (geprüft 25.11.2026)',
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
    countries: [],
    merkmal: 'Video-Beratung für Hunde, Katzen, Vögel, Kaninchen, Nager, Reptilien und Amphibien.',
    merkmalQuelle: 'https://dr.fressnapf.de (geprüft 25.11.2026)',
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
    // Märkte geprüft 25.11.2026: https://dogorama.app/de-de/ – Länderauswahl Deutsch (DE), Deutsch (AT), Deutsch (CH)
    countries: ['DE', 'AT', 'CH'],
    merkmal: 'Radar mit Giftköder-Warnungen, Tierärzten und Hundewiesen in der Umgebung.',
    merkmalQuelle: 'https://dogorama.app/de-de/ (geprüft 25.11.2026)',
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
    countries: [],
    merkmal: 'Beratung ohne Termin per Chat, Telefon oder Video, dazu ein Shop für Gesundheitsprodukte.',
    merkmalQuelle: 'https://www.drsam.de (geprüft 25.11.2026)',
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
    countries: [],
    merkmal: 'Bestellschnittstellen zu heiland.com und zum WDT-Marktplatz; Bildverwaltung easyIMAGE in derselben Produktfamilie.',
    merkmalQuelle: 'https://www.vetz.de (geprüft 25.11.2026)',
    categories: [6],
    description:
      'Praxismanagementsystem für Patientenakte, Terminplanung, Dokumentation und Abrechnung.',
    tags: ['PIMS', 'Praxissoftware', 'Patientenakte'],
  },
  {
    id: 'evovell',
    name: 'Evovell',
    logo: 'logos/evovell.png',
    website: 'https://www.evovell.com',
    countries: [],
    merkmal: 'Hosting in Deutschland; die Tierarztansicht berücksichtigt GOT und STIKO Vet.',
    merkmalQuelle: 'https://www.evovell.com/tierarzt (geprüft 25.11.2026)',
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
    // Märkte geprüft 25.11.2026: https://felmo.de – „Mobiler Tierarzt Berlin … Hamburg … München“
    countries: ['DE'],
    merkmal: 'Hausbesuche für Hunde und Katzen, abgerechnet nach GOT, dazu eine Praxis für Chirurgie und Diagnostik.',
    merkmalQuelle: 'https://felmo.de (geprüft 25.11.2026)',
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
    // Märkte geprüft 25.11.2026: https://firstvet.com/de/preise-und-weiterfuehrende-informationen – Länderauswahl mit Germany
    countries: ['DE'],
    merkmal: 'Video-Sprechstunde täglich von 7 bis 24 Uhr.',
    merkmalQuelle: 'https://firstvet.com/de/preise-und-weiterfuehrende-informationen (geprüft 25.11.2026)',
    categories: [7],
    description:
      'Online-Videosprechstunde, über die Tierhalter direkt eine veterinärmedizinische Beratung erreichen können.',
    tags: ['Telemedizin', 'Videosprechstunde', 'Tierhalter'],
  },
  {
    id: 'gst-tierarzt-finder',
    // Ohne Logo: Auf gstsvs.ch war nur das App-Symbol auffindbar, nicht die
    // Wortmarke des Verbands. Ein blaues „V" ohne Namen hilft nicht weiter –
    // die Text-Wortmarke ist hier die bessere Darstellung.
    name: 'GST Tierarzt-Finder',
    website: 'https://www.gstsvs.ch/de/tierarzt-finder/praxissuche',
    countries: ['CH'],
    merkmal: 'Suche nach PLZ oder Ort im Umkreis bis 50 km, filterbar nach Tierart.',
    merkmalQuelle: 'https://www.gstsvs.ch/de/tierarzt-finder/praxissuche (geprüft 25.11.2026)',
    categories: [10],
    description:
      'Praxissuche der Gesellschaft Schweizer Tierärztinnen und Tierärzte (GST). Gelistet werden Mitgliedspraxen und -kliniken.',
    tags: ['Suchmaschine', 'Berufsverband'],
  },
  {
    id: 'haustierdocs',
    name: 'HaustierDocs',
    logo: 'logos/haustierdocs.png',
    website: 'https://www.haustierdocs.de',
    // Märkte geprüft 25.11.2026: https://haustierdocs.de – „bundesweites Netzwerk praktizierender Tierärzte in Deutschland“
    countries: ['DE'],
    merkmal: 'Videoberatung per Rückruf rund um die Uhr, abgerechnet nach GOT.',
    merkmalQuelle: 'https://haustierdocs.de (geprüft 25.11.2026)',
    categories: [7],
    description:
      'Online-Angebot, über das Tierhalter tierärztliche Beratung digital in Anspruch nehmen können.',
    tags: ['Telemedizin', 'Videosprechstunde', 'Tierhalter'],
  },
  {
    id: 'hunderunde',
    name: 'Hunderunde',
    logo: 'logos/hunderunde.png',
    website: 'https://hunderunden.de', // geprüft 14.10.2026: Mollmedia, „Hunderunden ist Teil von Just4Vets“
    countries: [],
    merkmal: 'Portal für Hundehalter mit Praxisfinder; gehört zum Veterinärportal Just4Vets.',
    merkmalQuelle: 'https://hunderunden.de (geprüft 25.11.2026)',
    categories: [5],
    description:
      'Digitales Informationsangebot mit Newsletter-Format für die deutschsprachige Tier- und Veterinärbranche.',
    tags: ['Newsletter', 'Branchenmedien'],
  },
  {
    id: 'idexx-animana',
    name: 'IDEXX Animana',
    logo: 'logos/idexx-animana.png',
    // software.idexx.de lieferte am 22.10.2026 dauerhaft 502; die Produktseite bei idexx.de ist erreichbar.
    website: 'https://www.idexx.de/de/veterinary/software-services/animana/',
    // Märkte geprüft 25.11.2026: https://www.idexx.de/de/veterinary/software-services/animana/ – deutsche Produktseite mit Referenzpraxis in Deutschland
    countries: ['DE'],
    merkmal: 'Cloudbasiert mit automatischen Updates, im Browser nutzbar.',
    merkmalQuelle: 'https://www.idexx.de/de/veterinary/software-services/animana/ (geprüft 25.11.2026)',
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
    // Märkte geprüft 25.11.2026: https://www.inbehandlung.de/funktionen/partner-und-schnittstellen/ – „Digitale Registrierkasse für Österreich“, Schweizer Schnittstelle IS ABV, HI-Tier (DE)
    countries: ['DE', 'AT', 'CH'],
    merkmal: 'Cloud-Software mit Servern in Deutschland; Schnittstellen u. a. zu HI-Tier, Barsoi, fiskaly und IS ABV.',
    merkmalQuelle: 'https://www.inbehandlung.de/funktionen/partner-und-schnittstellen/ (geprüft 25.11.2026)',
    categories: [2, 6, 8],
    description:
      'Praxissoftware mit zusätzlichen digitalen Services wie Online-Terminvereinbarung und praxiseigener Videosprechstunde.',
    tags: ['PIMS', 'Praxissoftware', 'Terminbuchung', 'Videosprechstunde'],
  },
  {
    id: 'just4vets',
    name: 'JUST4VETS',
    logo: 'logos/just4vets.png',
    website: 'https://just4vets.online', // geprüft 14.10.2026: „Fachportal für Tierärzt:innen“ (just4vets.com zeigt keinen Inhalt)
    countries: [],
    merkmal: 'Fachportal mit Fachbeiträgen, Fortbildungen, Branchen-News und Praxisfinder.',
    merkmalQuelle: 'https://hunderunden.de (geprüft 25.11.2026)',
    categories: [5],
    description:
      'Informations- und Newsletter-Angebot für Tierärztinnen, Tierärzte und Praxisteams.',
    tags: ['Newsletter', 'Branchenmedien'],
  },
  {
    id: 'katzenmedizin',
    name: 'Katzenmedizin',
    // katzenmedizin.de ist nicht abrufbar; die Katzenmedizin erscheint als
    // Bereich von Just4Vets (geprüft 14.10.2026).
    // TODO: Aufnahme bestätigen – Hinweis von Christian Salzmann (LinkedIn,
    // 21.09.2026); Andreas Moll soll noch festlegen, wie er erscheinen möchte.
    website: 'https://just4vets.online/katzenmedizin',
    countries: [],
    merkmal: 'Fachmagazin im Just4Vets-Portal, erscheint in nummerierten Ausgaben.',
    merkmalQuelle: 'https://just4vets.online/katzenmedizin (geprüft 25.11.2026)',
    categories: [5],
    description:
      'Fachportal und Informationsangebot zur Katzenmedizin für die deutschsprachige Veterinärbranche.',
    tags: ['Newsletter', 'Fachmedien', 'Katzenmedizin'],
  },
  {
    id: 'petla',
    name: 'Petla',
    // Hinweis von Christian J. Gabrielse (LinkedIn, 21.09.2026). Die Seite
    // liegt unter petla.app (Berlin), nicht unter petla.de oder petla.com –
    // beide geparkt. Logo am 12.10.2026 von petla.app übernommen
    // (Petla_Logo_blue.svg, auf Skripte und externe Verweise geprüft).
    //
    // Kategorie 1 am 27.09.2026 entfernt: Der Hinweis nannte beide Kategorien,
    // die Einordnung unter "Digitale Sichtbarkeit & Neukundengewinnung" trägt
    // aber nicht. Bleibt in Kategorie 2.
    logo: 'logos/petla.svg',
    website: 'https://petla.app',
    // Märkte geprüft 25.11.2026: https://petla.app/tierarzt – „über 15.000 Praxen in Deutschland“
    countries: ['DE'],
    merkmal: 'Server in Deutschland; App für iOS und Android.',
    merkmalQuelle: 'https://petla.app (geprüft 25.11.2026)',
    categories: [2],
    description: 'Lösung für die Online-Terminvereinbarung in Tierarztpraxen.',
    tags: ['Terminbuchung'],
  },
  {
    id: 'petleo',
    name: 'Petleo',
    logo: 'logos/petleo.png',
    website: 'https://www.petleo.net',
    countries: [],
    merkmal: 'App mit Online-Terminbuchung, Gesundheitsdaten, Kalender und Karte mit Praxen und gemeldeten Giftködern.',
    merkmalQuelle: 'https://pet.petleo.net (geprüft 25.11.2026)',
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
    // Je Kategorie beschrieben wird nur der Baustein, um den es dort geht –
    // abgeleitet aus der allgemeinen Beschreibung, ohne neue Behauptungen.
    variants: {
      1: { description: 'Baustein der Petleo-Plattform, mit dem Tierarztpraxen online sichtbar werden und neue Tierhalter erreichen.' },
      2: { description: 'Online-Terminvereinbarung als Baustein der Petleo-Plattform für Tierarztpraxen.' },
      3: { description: 'Digitale Patientenaufnahme vor dem Termin als Baustein der Petleo-Plattform.' },
      4: {
        label: 'Petleo.ai',
        logo: 'logos/petleo-ai.png',
        description: 'KI-Unterstützung für Tierarztpraxen als Baustein der Petleo-Plattform.',
      },
      5: {
        label: 'Petleo – News for Vets',
        logo: 'logos/petleo-news.png',
        description: 'Newsletter von Petleo für Tierärztinnen und Tierärzte.',
      },
      6: {
        logo: 'logos/petleo-pims.png',
        description: 'Bausteine der Petleo-Plattform, die eine bestehende Praxissoftware um digitale Services ergänzen.',
      },
      8: { description: 'Videosprechstunde für die eigenen Patienten einer Praxis als Baustein der Petleo-Plattform.' },
      9: { description: 'Tierhalter-App als Baustein der Petleo-Plattform – der direkte Kanal zwischen Praxis und Tierhalter.' },
    },
  },
  {
    id: 'petleo-dicom',
    name: 'Petleo DICOM',
    logo: 'logos/petleo-dicom.png',
    website: 'https://www.petleo.net',
    countries: [],
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
    countries: [],
    merkmal: 'Chat per SMS und WhatsApp, Buchung, Zahlung und KI-Protokoll; läuft parallel zur bestehenden Praxissoftware.',
    merkmalQuelle: 'https://petsapp.com (geprüft 25.11.2026)',
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
    countries: [],
    merkmal: 'QR-Check-in in der Praxis, digitale Patientenaufnahme und Online-Bezahlung von Rechnungen.',
    merkmalQuelle: 'https://www.petsxl.com (geprüft 25.11.2026)',
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
    countries: [],
    merkmal: 'Läuft im Browser ohne eigenen Server in der Praxis; nach ISO 27001 zertifiziert.',
    merkmalQuelle: 'https://www.provet.com (geprüft 25.11.2026)',
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
    // Märkte geprüft 25.11.2026: https://reportassistant.de/ – „geprüft auf den Praxisalltag in Deutschland“
    countries: ['DE'],
    merkmal: 'KI-Dokumentation und KI-Telefonassistent auf einer Plattform, Hosting in Deutschland.',
    merkmalQuelle: 'https://reportassistant.de/ (geprüft 25.11.2026)',
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
    countries: [],
    merkmal: 'Gesprochen werden kann in jeder Sprache, die Notizen entstehen auf Englisch.',
    merkmalQuelle: 'https://instinct.vet/products/scribblevet/ (geprüft 25.11.2026)',
    categories: [4],
    description:
      'KI-Assistent für die Dokumentation, der Gespräche in strukturierte Notizen überführt.',
    tags: ['KI', 'Dokumentation', 'Spracherkennung'],
  },
  {
    /*
      Alle Einträge dieser Kategorie am 27.09.2026 gegen die Live-Seite geprüft
      (HTTP 200). Die Mengenangaben sind die der Anbieter selbst, aus Titel oder
      Startseite übernommen – nicht nachgezählt.

      Länderangaben sind hier belegt, nicht pauschal: Die deutschen Portale
      führen keine Praxen aus AT oder CH.
    */
    id: 'tierarzt-im-netz',
    name: 'Tierarzt-im-Netz.de',
    logo: 'logos/tierarzt-im-netz.png',
    website: 'https://tierarzt-im-netz.de',
    // Märkte geprüft 25.11.2026: https://tierarzt-im-netz.de/ – „über 12.000 Tierärzten und Tierkliniken in ganz Deutschland“
    countries: ['DE'],
    merkmal: 'Verzeichnis mit Suche nach 24-Stunden-Notdiensten und Tierkliniken.',
    merkmalQuelle: 'https://tierarzt-im-netz.de/ (geprüft 25.11.2026)',
    categories: [10],
    description:
      'Suchportal für Tierarztpraxen und Tierkliniken, laut eigener Website (Stand 27.09.2026) mit über 12.000 Einträgen. Praxen können ihren Eintrag selbst anlegen und pflegen.',
    tags: ['Suchmaschine', 'Verzeichnis'],
  },
  {
    id: 'tierarztkompass',
    // Bewusst ohne Logo: Die Seite setzt ihre Wortmarke aus HTML-Text plus
    // favicon.svg zusammen, eine Logodatei gibt es nicht. Das Symbol allein –
    // eine Pfote im grünen Quadrat – sagt niemandem, wer das ist. Die
    // Text-Wortmarke, auf die die Karte dann zurückfällt, ist aussagekräftiger.
    name: 'Tierarztkompass',
    website: 'https://tierarztkompass.de',
    // Märkte geprüft 25.11.2026: https://tierarztkompass.de/ – „Dein Kompass für Tierärzte in Deutschland“
    countries: ['DE'],
    merkmal: 'Einträge mit Adresse, Telefon, Öffnungszeiten und Bewertungen; Suche ohne Anmeldung.',
    merkmalQuelle: 'https://tierarztkompass.de/ (geprüft 25.11.2026)',
    categories: [10],
    description:
      'Suchportal für Tierarztpraxen nach Ort und Bundesland, laut eigener Website (Stand 27.09.2026) mit 12.985 Praxen.',
    tags: ['Suchmaschine', 'Verzeichnis'],
  },
  {
    id: 'tierarztliste',
    name: 'TierarztListe',
    logo: 'logos/tierarztliste.svg',
    website: 'https://tierarztliste.online',
    // Märkte geprüft 25.11.2026: https://tierarztliste.online/ – „Alle Tierärzte Deutschlands auf einen Blick“
    countries: ['DE'],
    merkmal: 'Umkreissuche und Gliederung nach Bundesländern und Städten.',
    merkmalQuelle: 'https://tierarztliste.online/ (geprüft 25.11.2026)',
    categories: [10],
    description:
      'Suchportal für Tierarztpraxen mit Adressen, Öffnungszeiten und Bewertungen, laut eigener Website (Stand 27.09.2026) mit über 9.000 Einträgen.',
    tags: ['Suchmaschine', 'Verzeichnis', 'Bewertungen'],
  },
  {
    id: 'tierarzt-onlineverzeichnis',
    name: 'Tierarzt Onlineverzeichnis',
    logo: 'logos/tierarzt-onlineverzeichnis.svg',
    website: 'https://www.tierarzt-onlineverzeichnis.de',
    countries: ['DE'],
    merkmal: 'Bei vielen Einträgen mit Sprechzeiten, Notdienst und Leistungen.',
    merkmalQuelle: 'https://www.tierarzt-onlineverzeichnis.de/ (geprüft 25.11.2026)',
    categories: [10],
    description:
      'Suchportal für Tierärzte und Tierkliniken mit Sprechzeiten und Notdiensten, laut eigener Website (Stand 27.09.2026) mit 11.000 Einträgen.',
    tags: ['Suchmaschine', 'Verzeichnis', 'Notdienst'],
  },
  {
    id: 'tierarzt-online',
    name: 'tierarzt-online',
    logo: 'logos/tierarzt-online.svg',
    website: 'https://www.tierarzt-online.org',
    countries: [],
    merkmal: 'Videoberatung per App auf Smartphone, Tablet oder PC; Tierhalter können auch den eigenen Haustierarzt wählen.',
    merkmalQuelle: 'https://www.tierarzt-online.org/ (geprüft 25.11.2026)',
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
    // Märkte geprüft 25.11.2026: https://www.tierarztpluspartner.de/ – „In vielen Regionen Deutschlands …“
    countries: ['DE'],
    merkmal: 'Netzwerk aus Kleintierpraxen und -kliniken; Standorte nach Bundesland filterbar.',
    merkmalQuelle: 'https://www.tierarztpluspartner.de/ueber-uns/ (geprüft 25.11.2026)',
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
    countries: [],
    merkmal: 'Windows-Software, seit 1997 entwickelt; GoBD-konform, mit EC-Cash-Schnittstelle.',
    merkmalQuelle: 'https://www.tpv-systeme.de/ (geprüft 25.11.2026)',
    categories: [6],
    description:
      'Praxissoftware für die Verwaltung von Patientendaten, Terminen und Abrechnung in der Tierarztpraxis.',
    tags: ['PIMS', 'Praxissoftware'],
  },
  {
    id: 'vemed',
    name: 'Vemed',
    logo: 'logos/vemed.png',
    // Eigene Seite: „Vemed – Software für den Tierarzt“ (geprüft 22.10.2026).
    website: 'https://www.vemed.net',
    countries: [],
    merkmal: 'Für Kleintier-, Misch- und Großtierpraxen; Einsatz im Netzwerk oder als Einzelplatz.',
    merkmalQuelle: 'https://www.vemed.net/ (geprüft 25.11.2026)',
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
    countries: [],
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
    logo: 'logos/vet7well.jpg',
    website: 'https://www.vet7.net',
    // Länder laut vet7.net (geprüft 26.10.2026): „über 300 zufriedene Kunden aus
    // Österreich, Deutschland und der Schweiz“.
    // Märkte geprüft 25.11.2026: https://www.vet7.net/preise/ – „für Tierärzte in Österreich, Deutschland und der Schweiz verfügbar“
    countries: ['DE', 'AT', 'CH'],
    merkmal: 'Varianten für Kleintier-, Groß- und Nutztier- sowie Pferdepraxen, Tierphysiotherapie und -homöopathie.',
    merkmalQuelle: 'https://www.vet7.net/ (geprüft 25.11.2026)',
    categories: [6],
    description: 'Praxismanagementsystem für die tierärztliche Praxis.',
    tags: ['PIMS', 'Praxissoftware'],
  },
  {
    id: 'veterinaere-at',
    name: 'Veterinäre.at',
    logo: 'logos/veterinaere-at.png',
    website: 'https://www.veterinaere.at',
    // Märkte geprüft 25.11.2026: https://www.veterinaere.at/ – „Daten von mehr als 900 Tierärzten in Österreich“
    countries: ['AT'],
    merkmal: 'Filterbar nach Kleintieren, Pferden, Nutztieren und 24-Stunden-Dienst.',
    merkmalQuelle: 'https://www.veterinaere.at/ (geprüft 25.11.2026)',
    categories: [10],
    description:
      'Suchportal für österreichische Tierarztpraxen und Kliniken mit Notfalldienst-Übersicht, nach eigener Angabe mit über 900 Einträgen.',
    tags: ['Suchmaschine', 'Verzeichnis', 'Notdienst'],
  },
  {
    id: 'vetat-work',
    name: 'vet@work',
    logo: 'logos/vetat-work.png',
    website: 'https://vetat.work',
    countries: [],
    merkmal: 'Cloudbasiert; Daten in der WDT-Cloud mit Sitz in Deutschland.',
    merkmalQuelle: 'https://vetatwork.wdt.de/ueber-vetatwork/ (geprüft 25.11.2026)',
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
    // Länder laut vetdream.de, Meilensteine (geprüft 26.10.2026): „Offizieller
    // Launch Kleintiermedizin“ 2025 mit einer Klinik in Deutschland, „Herbst 2025
    // Launch Österreich“.
    // Kategorie 3 am 25.11.2026 ergänzt (Hinweis Lisa Anhoffer, K&M Vet IT,
    // LinkedIn): vetdream.de nennt „Digitale Patientenaufnahme inkl. digitale
    // Signatur“. Die genannte VetKI steht dort als „KI Features (coming
    // soon)“ – Kategorie 4 erst, wenn sie verfügbar ist.
    countries: ['DE', 'AT'],
    merkmal: 'Betrieb auf eigenem Server, in der Cloud oder hybrid.',
    merkmalQuelle: 'https://www.vetdream.de/ (geprüft 25.11.2026)',
    categories: [2, 3, 6],
    description:
      'Praxissoftware mit digitalen Zusatzfunktionen, unter anderem für die Online-Terminvereinbarung.',
    variants: {
      3: { description: 'Praxissoftware mit digitaler Patientenaufnahme einschließlich digitaler Unterschrift.' },
    },
    tags: ['PIMS', 'Praxissoftware', 'Terminbuchung', 'Patientenaufnahme'],
  },
  {
    id: 'vetera',
    name: 'Vetera',
    logo: 'logos/vetera.png',
    website: 'https://www.vetera.net',
    // Länder laut vetera.net (geprüft 26.10.2026): „Softwareanbieter für die
    // Tiermedizin in der DACH-Region“.
    // Märkte geprüft 25.11.2026: https://www.vetera.net/ – „Softwareanbieter für die Tiermedizin in der DACH-Region“
    countries: ['DE', 'AT', 'CH'],
    merkmal: 'Schnittstellen, u. a. zu internen und externen Laboren, ohne Aufpreis aktivierbar.',
    merkmalQuelle: 'https://www.vetera.net/ (geprüft 25.11.2026)',
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
    // Märkte geprüft 25.11.2026: https://www.vetguru.de/ – „vorläufig ausschließlich in Deutschland angeboten“
    countries: ['DE'],
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
    countries: [],
    categories: [6],
    description:
      'Praxissoftware für die tierärztliche Praxisverwaltung, Dokumentation und Abrechnung.',
    tags: ['PIMS', 'Praxissoftware'],
  },
  {
    id: 'vetmeta',
    name: 'VetMeta',
    logo: 'logos/vetmeta.png',
    website: 'https://vetmeta.com', // geprüft 14.10.2026: VetMeta GmbH, Hamburg, KI-Behandlungsdokumentation
    countries: [],
    merkmal: 'Server in Deutschland, keine Trainingsnutzung der Daten; Oberfläche Deutsch, Englisch und Spanisch.',
    merkmalQuelle: 'https://vetmeta.com/ (geprüft 25.11.2026)',
    categories: [4],
    description:
      'KI-gestützter Assistent für Dokumentation und Unterstützung im tierärztlichen Praxisalltag.',
    tags: ['KI', 'Dokumentation', 'Praxisassistent'],
  },
  {
    id: 'vetnio',
    name: 'Vetnio',
    logo: 'logos/vetnio.png',
    website: 'https://www.vetnio.com',
    // Märkte geprüft 25.11.2026: https://vetnio.com/contact – „For DACH, contact …“
    countries: ['DE', 'AT', 'CH'],
    merkmal: 'Verbindet KI-Dokumentation, Diagnoseunterstützung und Assistenz für Anrufe und Nachrichten; geräteunabhängig.',
    merkmalQuelle: 'https://vetnio.com/de/home (geprüft 25.11.2026)',
    categories: [4],
    description:
      'KI-Assistent für die tierärztliche Dokumentation, der Notizen automatisiert und bei Anrufen und Nachrichten unterstützt.',
    tags: ['KI', 'Dokumentation', 'Praxisassistent', 'Anrufe'],
  },
  {
    id: 'vetoffice-plus',
    name: 'VETOffice Plus',
    logo: 'logos/vetoffice-plus.png',
    website: 'https://www.vetoffice.de',
    countries: [],
    merkmal: 'Optionale Online-Terminvergabe für Tierhalter; Schnittstellen für Röntgenbilder und Befunde.',
    merkmalQuelle: 'https://www.vetoffice.de/ (geprüft 25.11.2026)',
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
    countries: [],
    categories: [6],
    description:
      'Praxissoftware für Organisation, Dokumentation und Abrechnung in der Tierarztpraxis.',
    tags: ['PIMS', 'Praxissoftware'],
  },
  {
    id: 'vetsoap',
    name: 'VetSOAP',
    logo: 'logos/vetsoap.png',
    website: 'https://www.vetsoap.ai', // geprüft 14.10.2026: Logo identisch, schärfere Fassung von dort übernommen
    countries: [],
    merkmal: 'Erstellt aus einer Audioaufnahme eine SOAP-Notiz; US-Anbieter.',
    merkmalQuelle: 'https://www.vetsoap.ai/ (geprüft 25.11.2026)',
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
    countries: [],
    merkmal: 'Web-Anwendung, Oberfläche u. a. auf Deutsch, Englisch, Französisch, Niederländisch und Italienisch.',
    merkmalQuelle: 'https://www.myvetsxl.com/de/Languages/default.aspx (geprüft 25.11.2026)',
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
    countries: [],
    merkmal: 'Modular aufgebaut, für Einzelplatz- oder Netzbetrieb.',
    merkmalQuelle: 'https://www.vetstar.de/ (geprüft 25.11.2026)',
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
    // Märkte geprüft 25.11.2026: https://www.vetstoria.com/integrations/ – Länderfilter Germany, Austria, Switzerland
    countries: ['DE', 'AT', 'CH'],
    merkmal: 'Echtzeit-Anbindung an Praxissoftware, u. a. Vetera und IDEXX Animana.',
    merkmalQuelle: 'https://www.vetstoria.com/integrations/ (geprüft 25.11.2026)',
    categories: [2],
    description:
      'Lösung für die Online-Terminvereinbarung, die sich in bestehende Praxissoftware integrieren lässt.',
    tags: ['Terminbuchung', 'Online-Booking'],
  },

  /*
    Aufgenommen am 14.10.2026 aus den Kommentaren zum Update-Beitrag vom
    12.10.2026 (dazu VETIDATA, Tierarzneimittel-Kompendium, Vetion und die
    Heimtierregister aus eigener Recherche für die neuen Kategorien). Jede
    Angabe ist auf der Website des Anbieters geprüft; Länder nur dort, wo die
    Seite sie selbst nennt. Logos von den Anbieterseiten, SVGs auf Skripte
    geprüft.
  */
  {
    // agriatierversicherung.de/digitale-tierarztliche-beratung: „triff unsere
    // Tierärzte live im Videocall“, „Für Versicherte bei Agria … inklusive“.
    id: 'agria',
    name: 'Agria Tierversicherung',
    logo: 'logos/agria.svg',
    website: 'https://www.agriatierversicherung.de/digitale-tierarztliche-beratung/',
    // Märkte geprüft 25.11.2026: https://www.agriatierversicherung.de/digitale-tierarztliche-beratung/ – „digitale tierärztliche Beratung in Deutschland“
    countries: ['DE'],
    merkmal: 'Videoberatung in der Agria-App täglich von 7 bis 24 Uhr, für Agria-Kunden ohne Begrenzung.',
    merkmalQuelle: 'https://www.agriatierversicherung.de/digitale-tierarztliche-beratung/ (geprüft 25.11.2026)',
    categories: [7],
    description:
      'Tierversicherung mit digitaler tierärztlicher Beratung im Videocall über die Agria-App, für Versicherte inklusive; für Hund, Katze und Pferd.',
    tags: ['Videosprechstunde', 'Versicherung', 'App'],
  },
  {
    // amicus.ch: „die nationale Datenbank zur Registrierung von Hunden in der
    // Schweiz“, betrieben von der Identitas AG im Auftrag der Kantone.
    id: 'amicus',
    name: 'AMICUS',
    logo: 'logos/amicus.png',
    website: 'https://www.amicus.ch',
    countries: ['CH'],
    merkmal: 'Führt die Hunderegistrierung im Auftrag der Kantone; Fundmeldungen gehen an die kantonale Meldestelle.',
    merkmalQuelle: 'https://www.amicus.ch (geprüft 25.11.2026)',
    categories: [12],
    description:
      'Nationale Datenbank zur Registrierung von Hunden in der Schweiz, im Auftrag der Kantone; registriert wird durch die Tierärztin oder den Tierarzt.',
    tags: ['Heimtierregister', 'Hund', 'Chip'],
  },
  {
    id: 'anis',
    name: 'ANIS',
    logo: 'logos/anis.png',
    website: 'https://www.anis.ch',
    countries: ['CH'],
    merkmal: 'Registriert Heimtiere außer Hunden; Hunde werden über Amicus registriert.',
    merkmalQuelle: 'https://www.anis.ch (geprüft 25.11.2026)',
    categories: [12],
    description:
      'Schweizer Datenbank zur Registrierung von Heimtieren, vorwiegend Katzen; gechippt und gemeldet wird über die Tierarztpraxis.',
    tags: ['Heimtierregister', 'Katze', 'Chip'],
  },
  {
    // findefix.com/service/fuer-tieraerzte: Schnittstellen zu easyVET, Vetera,
    // Vetinf und Animana – Registrierung „direkt aus der Patientenkarte heraus“.
    id: 'findefix',
    name: 'FINDEFIX',
    logo: 'logos/findefix.svg',
    website: 'https://www.findefix.com',
    // Land laut findefix.com (geprüft 25.11.2026): „das Haustierregister des Deutschen
    // Tierschutzbundes“ – so auch in der Vergleichstabelle auf /heimtierregister.html.
    countries: ['DE'],
    merkmal: 'Haustierregister des Deutschen Tierschutzbundes; Registrierung für Tierhalter kostenlos.',
    merkmalQuelle: 'https://www.findefix.com (geprüft 25.11.2026)',
    categories: [12],
    description:
      'Haustierregister des Deutschen Tierschutzbundes, kostenfrei; Praxen registrieren direkt aus der Praxissoftware, u. a. aus easyVET, Vetera, VETINF und Animana.',
    tags: ['Heimtierregister', 'Fundtier', 'Chip', 'Schnittstelle'],
  },
  {
    // Amtlich ist heimtierdatenbank.ehealth.gv.at („Eine Anwendung des
    // GESUNDHEITSMINISTERIUMS“) – nicht heimtierdatenbank.at, das ein privater
    // Dienst ist. Kein eigenes Produktlogo, deshalb die Wortmarke.
    id: 'heimtierdatenbank-at',
    name: 'Heimtierdatenbank Österreich',
    website: 'https://heimtierdatenbank.ehealth.gv.at',
    countries: ['AT'],
    merkmal: 'Anwendung des Gesundheitsministeriums; Zugang über ID Austria oder Handy-Signatur.',
    merkmalQuelle: 'https://heimtierdatenbank.ehealth.gv.at (geprüft 25.11.2026)',
    categories: [12],
    description:
      'Amtliche Heimtierdatenbank des österreichischen Gesundheitsministeriums; die Meldung kann der chippende Tierarzt im Auftrag des Halters übernehmen.',
    tags: ['Heimtierregister', 'Hund', 'Chip', 'amtlich'],
  },
  {
    // petsvetcheck.de/petsvetcheck-fuer-tierkliniken-und-kleintierpraxen:
    // „Strukturierte digitale Voranamnese“, „Digitale Übermittlung des
    // Gesprächsverlaufs an Praxis oder Klinik“. Hinweis Gisa Löwe (LinkedIn).
    id: 'petsvetcheck',
    name: 'PetsVetCheck',
    logo: 'logos/petsvetcheck.svg',
    website: 'https://petsvetcheck.de',
    countries: [],
    merkmal: 'Wissensdatenbank zu über 550 Erkrankungen beim Hund und über 570 bei der Katze, dazu ein Symptom-Checker ohne Diagnosen.',
    merkmalQuelle: 'https://petsvetcheck.de (geprüft 25.11.2026)',
    categories: [3],
    description:
      'Digitale Voranamnese mit Dringlichkeitseinschätzung für Tierhalter; der Gesprächsverlauf geht an Praxis oder Klinik, eingebunden über Website, QR-Code oder Schnittstelle.',
    tags: ['Voranamnese', 'Triage', 'Intake'],
  },
  {
    // primveterinary.com: „Evidence-based answers for veterinary
    // professionals“, Quellen aus Fachverlagen. Englischsprachig, Betreiber in
    // den USA. Hinweis Sarah Koll-Hampp (LinkedIn).
    id: 'primveterinary',
    name: 'PrimVeterinary',
    logo: 'logos/primveterinary.png',
    website: 'https://www.primveterinary.com',
    countries: [],
    merkmal: 'Für verifizierte Tierärzte kostenlos; englischsprachig, Antworten u. a. auf Basis von Fachverlagsinhalten.',
    merkmalQuelle: 'https://www.primveterinary.com (geprüft 25.11.2026)',
    categories: [11],
    description:
      'Englischsprachige Plattform mit evidenzbasierten Antworten für Tierärztinnen und Tierärzte, mit Quellenangaben aus der Fachliteratur; als Web und App.',
    tags: ['Wissen', 'Evidenz', 'KI', 'Literatur'],
  },
  {
    // tasso.net/…/Fuer-Tieraerzte: Registrierung per TASSO.Connect, Formular
    // oder Antrag, Transponderabfrage, kostenloser Eintrag in die
    // TASSO-Tierarztsuche. Länder laut dieser Seite: DE, AT, CH.
    id: 'tasso',
    name: 'TASSO',
    logo: 'logos/tasso.svg',
    website: 'https://www.tasso.net',
    countries: ['DE', 'AT', 'CH'],
    merkmal: 'Registrierung kostenlos; 24-Stunden-Notruf-Hotline und App für iOS und Android.',
    merkmalQuelle: 'https://www.tasso.net (geprüft 25.11.2026)',
    categories: [10, 12],
    description:
      'Kostenfreies Haustierregister; Praxen registrieren per Schnittstelle oder Formular und fragen Transpondernummern ab. Dazu eine Tierarztsuche mit kostenlosem Praxiseintrag.',
    tags: ['Heimtierregister', 'Fundtier', 'Chip', 'Tierarztsuche'],
  },
  {
    // tierarzneimittel.ch leitet auf das Kompendium des Instituts für
    // Veterinärpharmakologie und -toxikologie der Universität Zürich.
    id: 'tierarzneimittel-kompendium',
    name: 'Tierarzneimittel-Kompendium der Schweiz',
    website: 'https://www.vetpharm.uzh.ch/PERLDOCS/kompend3.htm',
    countries: ['CH'],
    merkmal: 'Dienstleistung des Instituts für Veterinärpharmakologie und -toxikologie der Universität Zürich.',
    merkmalQuelle: 'https://www.vetpharm.uzh.ch/PERLDOCS/kompend3.htm (geprüft 25.11.2026)',
    categories: [11],
    description:
      'Verzeichnis der Tierarzneimittel in der Schweiz, herausgegeben vom Institut für Veterinärpharmakologie und -toxikologie der Universität Zürich; Suche nach Wirkstoff, ATCvet-Code und Tierart.',
    tags: ['Arzneimittel', 'Kompendium', 'Schweiz'],
  },
  {
    id: 'vetidata',
    name: 'VETIDATA',
    logo: 'logos/vetidata.png',
    website: 'https://vetidata.de',
    countries: [],
    merkmal: 'Informationsdienst zu Arzneimittelanwendung, Toxikologie und Arzneimittelrecht; Zugang nach Registrierung.',
    merkmalQuelle: 'https://vetidata.de (geprüft 25.11.2026)',
    categories: [11],
    description:
      'Veterinärmedizinischer Informationsdienst der Universität Leipzig zu Arzneimittelanwendung, Toxikologie und Arzneimittelrecht; Zugang mit Berufsnachweis.',
    tags: ['Arzneimittel', 'Toxikologie', 'Arzneimittelrecht'],
  },
  {
    id: 'vetion',
    name: 'Vetion.de',
    logo: 'logos/vetion.png',
    website: 'https://www.vetion.de',
    // Märkte geprüft 25.11.2026: https://www.vetion.de/impressum/ – „Zulassungsstand in Deutschland“
    countries: ['DE'],
    merkmal: 'Portal mit News, Gesetzessammlung, Online-Fortbildungen, Terminkalender und Jobbörse.',
    merkmalQuelle: 'https://www.vetion.de (geprüft 25.11.2026)',
    categories: [5],
    description: 'Fachportal für die Tiermedizin mit News, Online-Fortbildungen, Jobs und Newsletter.',
    tags: ['Fachmedien', 'Newsletter', 'Fortbildung'],
  },
  {
    // vetstage.de/beitraege: „Fallbeispiele, Fachbeiträge und News“; dazu
    // Jobs, Fortbildung und Personalverwaltung (vetstage.de/personalverwaltung).
    // Hinweis Marie-Theres Mair (LinkedIn).
    id: 'vetstage',
    name: 'VetStage',
    logo: 'logos/vetstage.svg',
    website: 'https://www.vetstage.de',
    // Märkte geprüft 25.11.2026: https://www.vetstage.de – „Ausbildungspraxen des bpt – Deutschlandweit“
    countries: ['DE'],
    merkmal: 'Plattform für Jobs und Fortbildungen, mit Fortbildungs-Flatrate.',
    merkmalQuelle: 'https://www.vetstage.de (geprüft 25.11.2026)',
    categories: [5, 14],
    description:
      'Plattform für die Tiermedizin mit Fachbeiträgen, Fallbeispielen und News, dazu Jobs, Fortbildungen und Personalsoftware für Praxen.',
    variants: {
      14: { description: 'Fortbildungskalender für Tierärzte und TFA, filterbar nach ATF- und AG-TFA-Anerkennung, mit eigenen Online-Inhalten und Fortbildungs-Flatrate.' },
    },
    tags: ['Fachmedien', 'Jobs', 'Fortbildung', 'Personal'],
  },
  /*
    KI-Telefonassistenz, aufgenommen am 26.10.2026. Anlass: Auf die Frage nach
    KI-Assistenten für Tierarztpraxen nannte ChatGPT mit Websuche fünf
    Anbieter, die hier fehlten (docs/SUCHDATEN.md). Vier sind auf der eigenen
    Seite als Lösung für Tierarztpraxen belegt; PetKi nicht – die Seite ist
    branchenübergreifend und ohne JavaScript leer.
  */
  {
    // vetfox.ai: „KI Telefonassistenz in Tierarztpraxen und -kliniken“, „Anrufannahme … 24/7“.
    // Ohne Logo: Die Seite zeigt nur ein Symbol ohne Namen.
    id: 'vetfox',
    aufgenommen: '2026-10-26',
    name: 'VETFOX',
    website: 'https://www.vetfox.ai',
    countries: [],
    merkmal: 'KI-Telefonassistenz bucht Termine auch außerhalb der Sprechzeiten, nimmt Medikamentenbestellungen an und stuft Dringlichkeit ein.',
    merkmalQuelle: 'https://www.vetfox.ai (geprüft 25.11.2026)',
    categories: [4],
    description:
      'KI-Telefonassistenz für Tierarztpraxen und -kliniken: nimmt Anrufe rund um die Uhr an und ist auf tierärztliche Abläufe abgestimmt.',
    tags: ['KI', 'Telefonassistenz', 'Anrufannahme'],
  },
  {
    // heybello.de: „BetriebsKI macht aus einem Diktat fertige Dokumente … Optional:
    // Bello nimmt zusätzlich Ihre Anrufe entgegen.“
    // Ohne Logo: Keine Logodatei auf der Seite, nur ein Vorschaubild der Startseite.
    id: 'heybello',
    aufgenommen: '2026-10-26',
    name: 'HeyBello',
    website: 'https://www.heybello.de',
    countries: [],
    merkmal: 'Macht aus einem Diktat ein SOAP-Dokument oder einen Überweisungsschein; Server in Deutschland.',
    merkmalQuelle: 'https://www.heybello.de (geprüft 25.11.2026)',
    categories: [4],
    description:
      'KI für Tierarztpraxen, die aus Diktaten fertige Dokumente erstellt, Praxiswissen ordnet und den Dienstplan unterstützt; optional nimmt ein Sprachassistent Anrufe an.',
    tags: ['KI', 'Diktat', 'Telefonassistenz', 'Dokumentation'],
  },
  {
    // vetpal.de: „Emma geht ans Telefon und bucht, verschiebt und storniert Termine.
    // Sie beantwortet Fragen und leitet Notfälle intelligent weiter.“
    id: 'vetpal-emma',
    aufgenommen: '2026-10-26',
    name: 'Emma (Vetpal)',
    logo: 'logos/vetpal.svg',
    website: 'https://www.vetpal.de',
    // Märkte geprüft 25.11.2026: https://www.vetpal.de – „Über 400 Praxen und Kliniken in DACH“
    countries: ['DE', 'AT', 'CH'],
    merkmal: 'Bedient Telefon, WhatsApp und E-Mail; Termine landen direkt in der Praxissoftware.',
    merkmalQuelle: 'https://www.vetpal.de (geprüft 25.11.2026)',
    categories: [4],
    description:
      'KI-Rezeptionistin für Tierarztpraxen: nimmt Anrufe an, bucht, verschiebt und storniert Termine und leitet Notfälle weiter.',
    tags: ['KI', 'Telefonassistenz', 'Terminbuchung'],
  },
  {
    // manta.vet: KI-Telefonassistent, „Manta Scribe schreibt die Behandlung live mit“.
    // Land laut manta.vet (geprüft 26.10.2026): „für den Praxisalltag in Deutschland gebaut“.
    id: 'manta',
    aufgenommen: '2026-10-26',
    name: 'Manta',
    logo: 'logos/manta.svg',
    website: 'https://www.manta.vet',
    // Märkte geprüft 25.11.2026: https://www.manta.vet – „für den Praxisalltag in Deutschland gebaut“
    countries: ['DE'],
    merkmal: 'Anbindung u. a. an Vetera, vetpraxis.de, inBehandlung, Lupa, Provet Cloud und VetDream; Server in der EU.',
    merkmalQuelle: 'https://www.manta.vet (geprüft 25.11.2026)',
    categories: [4],
    description:
      'KI-Telefonassistent, der Anrufe annimmt, Notfälle erkennt und Termine bucht; dazu Manta Scribe für die automatische Dokumentation der Behandlung.',
    tags: ['KI', 'Telefonassistenz', 'Dokumentation', 'Scribe'],
  },
  {
    // lupapets.com/de: „KI-basierte Praxisverwaltungssoftware für Tierarztpraxen“,
    // mit deutscher Produktseite. Gefunden als angebundene Praxissoftware bei
    // Manta (manta.vet, Integrationen), geprüft 26.10.2026.
    id: 'lupa',
    aufgenommen: '2026-10-26',
    name: 'Lupa',
    logo: 'logos/lupa.png',
    website: 'https://lupapets.com/de/',
    countries: [],
    merkmal: 'Integrationen u. a. mit IDEXX, Heiland und DATEV.',
    merkmalQuelle: 'https://lupapets.com/de/pricing/ (geprüft 25.11.2026)',
    categories: [6],
    description:
      'Praxisverwaltungssoftware für Tierarztpraxen mit KI-Funktionen, unter anderem für klinische Notizen sowie Zahlungen und Rechnungsstellung.',
    tags: ['PIMS', 'Praxissoftware', 'KI', 'Cloud'],
  },
  /*
    Abgleich mit den Seiten, die ChatGPT statt dieser Übersicht nennt
    (26.10.2026): Petflare (tierarztsoftware-vergleich.de) und VET4.0
    (musterpraxis.de). Nicht aufgenommen: FreeVet (Website zeigt einen
    Serverfehler), PRAXISvet (keine Inhalte), deltavet, petware, tierdok,
    NOA-Solutions, InVetera – genannt auf tiernotdienst.de, aber ohne
    auffindbare Produktseite; deltavet.de ist geparkt.
  */
  {
    // petflare.io: „Praxissoftware für Tierärzte und Tierheilpraktiker“,
    // Tierakte, Termine, „Abrechnung und GOT“, Tierhalter-Portal.
    id: 'petflare',
    aufgenommen: '2026-10-26',
    name: 'Petflare',
    logo: 'logos/petflare.svg',
    website: 'https://petflare.io',
    countries: [],
    merkmal: 'Browserbasiert mit GOT-Abrechnung; Hosting in Deutschland (BSI-C5-testierte Infrastruktur).',
    merkmalQuelle: 'https://petflare.io/preise (geprüft 25.11.2026)',
    categories: [6],
    description:
      'Webbasierte Praxissoftware für Tierärzte und Tierheilpraktiker mit Tierakte, Terminkalender, GOT-Abrechnung und Tierhalter-Portal.',
    tags: ['PIMS', 'Praxissoftware', 'Cloud', 'GOT'],
  },
  {
    // vet40.de: „Diese grundlegend neu entwickelte Tierarztsoftware verwendet eine
    // Client/Server-Technologie“. Ohne Logo: Die Seite zeigt nur das Firmenlogo
    // der BTE GmbH, nicht den Produktnamen.
    id: 'vet40',
    aufgenommen: '2026-10-26',
    name: 'VET4.0',
    website: 'https://www.vet40.de',
    countries: [],
    merkmal: 'Client/Server-Software mit Tablet-Version, die offline arbeitet und sich bei Verbindung synchronisiert.',
    merkmalQuelle: 'https://www.vet40.de (geprüft 25.11.2026)',
    categories: [6],
    description:
      'Praxismanagementsystem der BTE GmbH mit Client/Server-Technik, ausgelegt auch für mobile Endgeräte.',
    tags: ['PIMS', 'Praxissoftware'],
  },
  {
    // pfotendoctor.de: „Online-Tierarztbesuch per Smartphone“, „24/7 per Videochat“.
    // Ohne Logo: Die Wortbildmarke liegt nur weiß auf transparent vor.
    id: 'pfotendoctor',
    aufgenommen: '2026-10-26',
    name: 'Pfotendoctor',
    website: 'https://pfotendoctor.de',
    countries: [],
    merkmal: 'Video-Sprechstunde rund um die Uhr; alle Tierärzte beraten zu Hunden und Katzen.',
    merkmalQuelle: 'https://pfotendoctor.de (geprüft 25.11.2026)',
    categories: [7],
    description:
      'Tierärztliche Beratung per Videochat rund um die Uhr, gebucht über Website oder App.',
    tags: ['Telemedizin', 'Videosprechstunde', 'Online-Tierarzt'],
  },
  {
    // go4vet.com: „Tierarzt-Finder – Tierärzte in deiner Nähe finden“. Länder laut
    // go4vet.com (geprüft 26.10.2026): „15.000+ Tierärzt:innen in Österreich und
    // Deutschland“. Ohne Logo: nur ein Bildschirmfoto als Vorschaubild.
    id: 'go4vet',
    aufgenommen: '2026-10-26',
    name: 'go4vet',
    website: 'https://www.go4vet.com',
    countries: ['DE', 'AT'],
    merkmal: 'Tierarztsuche, dazu ein KI-Assistent zur ersten Einschätzung von Symptomen.',
    merkmalQuelle: 'https://www.go4vet.com (geprüft 25.11.2026)',
    categories: [10],
    description:
      'Plattform für Tierhalter mit Tierarzt-Finder für Deutschland und Österreich, Notdienstsuche und Ratgeberartikeln.',
    tags: ['Tierarztsuche', 'Notdienst', 'Ratgeber'],
  },
  {
    // vetset.de: „Die Software für den Tierarzt“, Kunden- und Patientenverwaltung,
    // Rechnungen „auf Basis der GoT (bzw. der Honorarordnung für Österreich)“,
    // Impfkartei. Eigenes Produkt desselben Herstellers wie VetStar (vetstar.de:
    // „Beachten Sie auch unsere Tierarztsoftware VetStar“). Länder laut vetset.de
    // (geprüft 04.11.2026): Deutschland und Österreich; Schweiz nur „auf Anfrage“.
    // Gefunden in der Übersicht auf hundeportal24.eu. Ohne Logo: keine Logodatei.
    id: 'vetset',
    aufgenommen: '2026-11-04',
    name: 'VetSet',
    website: 'https://www.vetset.de',
    countries: ['DE', 'AT'],
    merkmal: 'Liest Medikamentenpreislisten für Deutschland und Österreich ein; für Kleintier-, Pferde- und Großtierpraxis.',
    merkmalQuelle: 'https://www.vetset.de (geprüft 25.11.2026)',
    categories: [6],
    description:
      'Praxissoftware für Windows mit Kunden- und Patientenverwaltung, Krankenblatt, Rechnungen nach GOT bzw. österreichischer Honorarordnung und Impfkartei; vom selben Hersteller wie VetStar.',
    tags: ['PIMS', 'Praxissoftware', 'GOT'],
  },
  {
    // Hinweis Benjamin Gürtl, VetNative Digital GmbH (LinkedIn). vetnative.com
    // (geprüft 25.11.2026): Praxissoftware elovet, Online-Buchung eltiga-Booking
    // („Ihre Kund:innen können rund um die Uhr online buchen“) und die
    // Tierhalter-App eltiga. Gewünscht waren zusätzlich 1, 3 und 4: Für 1
    // gelten die Aufnahmekriterien der Kategorie; Intake und KI sind auf der
    // Seite nicht beschrieben.
    id: 'vetnative',
    aufgenommen: '2026-11-25',
    name: 'VetNative',
    logo: 'logos/vetnative.png',
    website: 'https://www.vetnative.com',
    countries: [],
    merkmal: 'Bestellabwicklung und Lieferung im eltiga-Shop übernimmt Richter Pharma.',
    merkmalQuelle: 'https://www.vetnative.com (geprüft 25.11.2026)',
    categories: [2, 6, 9],
    description:
      'Cloudbasierte Plattform für Tierarztpraxen mit Praxissoftware (elovet), Online-Terminbuchung und Tierhalter-App (eltiga).',
    variants: {
      2: { description: 'Online-Terminbuchung rund um die Uhr mit Erfassung von Halter- und Tierdaten (eltiga-Booking).' },
      6: { label: 'VetNative elovet', description: 'Cloudbasierte Praxissoftware für Kunden und Patienten, Behandlungen, Termine, Kasse, Lager und Berichte.' },
      9: { description: 'Tierhalter-App eltiga, für Praxen und ihre Kundinnen und Kunden kostenlos.' },
    },
    tags: ['PIMS', 'Praxissoftware', 'Terminbuchung', 'Tierhalter-App'],
  },
  {
    // Hinweis Pierre Pivorius, Gründer (LinkedIn). petcario.com (geprüft
    // 25.11.2026): digitale Tierakte und QR-Tiermarke; „Du legst fest, welche
    // Angaben eine findende Person nach dem Scan sehen darf.“ Kein
    // Chip-Register und keine Praxisanbindung beschrieben – daher nur das
    // Fundtier-Feld.
    id: 'petcario',
    aufgenommen: '2026-11-25',
    name: 'Petcario',
    logo: 'logos/petcario.png',
    website: 'https://petcario.com',
    countries: [],
    merkmal: 'Digitales Tierprofil für Hunde und Katzen mit QR-Tiermarken aus Edelstahl.',
    merkmalQuelle: 'https://petcario.com (geprüft 25.11.2026)',
    categories: [12],
    description:
      'Plattform für Tierhalter mit digitaler Tierakte und QR-Tiermarke, über die eine findende Person den Halter erreichen kann.',
    tags: ['Fundtiere', 'QR-Tiermarke', 'Tierhalter'],
  },
  {
    // Hinweis Sonja Hegel (LinkedIn). lisca.vet: „Marketing für Tierarztpraxen und Tierkliniken“. Logo ohne Schriftzug – Name als Text.
    id: 'lisca',
    aufgenommen: '2026-11-25',
    name: 'LISCA.vet',
    website: 'https://lisca.vet',
    countries: [],
    categories: [13],
    description:
      'Agentur für Marketing von Tierarztpraxen und Tierkliniken: Strategieberatung, Websites, Arbeitgebermarke, Social-Media-Coaching und ein Instagram-Onlinekurs.',
    tags: ['Marketing', 'Beratung', 'Social Media'],
  },
  {
    // vet-site.de: „Professioneller Internetauftritt für Ihre Tierarztpraxis“. Quelle: eigene Website, geprüft 25.11.2026 (Recherche zu den LinkedIn-Hinweisen).
    id: 'vetsite',
    aufgenommen: '2026-11-25',
    name: 'VetSite',
    logo: 'logos/vetsite.png',
    website: 'https://vet-site.de',
    countries: [],
    categories: [13],
    description:
      'Websites, Social-Media-Betreuung und lokale Einträge für Tierarztpraxen, angeboten von einer Tierärztin und einem Webdesigner.',
    tags: ['Marketing', 'Website'],
  },
  {
    // tierarzt-website.de: „Website-Erstellung und Online-Marketing für Tierärzte, Tierkliniken …“. Quelle: eigene Website, geprüft 25.11.2026 (Recherche zu den LinkedIn-Hinweisen).
    id: 'tierarzt-website',
    aufgenommen: '2026-11-25',
    name: 'TIERARZT-WEBSITE',
    logo: 'logos/tierarzt-website.png',
    website: 'https://tierarzt-website.de',
    countries: [],
    categories: [13],
    description:
      'Website-Erstellung und Online-Marketing für Tierarztpraxen, Tierkliniken und weitere Berufe rund ums Tier.',
    tags: ['Marketing', 'Website'],
  },
  {
    // Logo nur in heller Fassung (weiße Schrift) – Name als Text. Quelle: eigene Website, geprüft 25.11.2026 (Recherche zu den LinkedIn-Hinweisen).
    id: 'digitalgrafik24',
    aufgenommen: '2026-11-25',
    name: 'digitalgrafik24',
    website: 'https://www.tierklinik-marketing.com',
    // Märkte geprüft 25.11.2026: https://www.tierklinik-marketing.com – „Tierklinik Marketing für Deutschland, Österreich und die Schweiz“
    countries: ['DE', 'AT', 'CH'],
    categories: [13],
    description:
      'Agentur mit eigenem Angebot für Tierkliniken und Tierarztpraxen: Webdesign, Suchmaschinenoptimierung, Werbung und Personalgewinnung.',
    tags: ['Marketing', 'Website', 'Recruiting'],
  },
  {
    // tieraerzteberatung.de/beratung/praxismarketing/: „Marketingkonzepte … der Tierarztpraxis“. Quelle: eigene Website, geprüft 25.11.2026 (Recherche zu den LinkedIn-Hinweisen).
    id: 'ivp-tieraerzteberatung',
    aufgenommen: '2026-11-25',
    name: 'IVP Tierärzteberatung',
    logo: 'logos/ivp-tieraerzteberatung.png',
    website: 'https://www.tieraerzteberatung.de',
    countries: [],
    categories: [13],
    description:
      'Unternehmensberatung für Tierärzte, unter anderem zu Existenzgründung, Praxisorganisation, Personal, Praxismarketing und Praxisabgabe.',
    tags: ['Beratung', 'Marketing'],
  },
  {
    // Quelle: eigene Website, geprüft 25.11.2026 (Recherche zu den LinkedIn-Hinweisen).
    id: 'ruhmservice',
    aufgenommen: '2026-11-25',
    name: 'RUHMservice',
    logo: 'logos/ruhmservice.png',
    website: 'https://www.ruhmservice.de',
    // Märkte geprüft 25.11.2026: https://www.ruhmservice.de – „Spezialisiert auf Tierarztpraxen & Tierkliniken im DACH-Raum“
    countries: ['DE', 'AT', 'CH'],
    categories: [13],
    description:
      'Strategieberatung für Tierarztpraxen und Tierkliniken zu Praxisführung, Wirtschaftlichkeit, Team und Marketing, mit einer Praxisanalyse als Einstieg.',
    tags: ['Beratung', 'Strategie'],
  },
  {
    // tvd-finanz.de: „Marketing für Ihre Tierarztpraxis“. Betreibt auch fortbildung.vet. Quelle: eigene Website, geprüft 25.11.2026 (Recherche zu den LinkedIn-Hinweisen).
    id: 'tvd-finanz',
    aufgenommen: '2026-11-25',
    name: 'TVD Finanz',
    logo: 'logos/tvd-finanz.png',
    website: 'https://www.tvd-finanz.de/leistungen/tierarztpraxis-marketing/',
    countries: [],
    categories: [13],
    description:
      'Dienstleister für Tierärzte mit Praxisberatung; die Marketingleistungen umfassen Praxiswebsite, Texte, Google-Profil und Anzeigen.',
    tags: ['Marketing', 'Beratung'],
  },
  {
    // Hinweis Vetion.de (LinkedIn). myvetlearn.de: „offizielle Plattform der Akademie für tierärztliche Fortbildung und Vetion.de“. Quelle: eigene Website, geprüft 25.11.2026 (Recherche zu den LinkedIn-Hinweisen).
    id: 'myvetlearn',
    aufgenommen: '2026-11-25',
    name: 'Myvetlearn.de',
    logo: 'logos/myvetlearn.png',
    website: 'https://www.myvetlearn.de',
    countries: [],
    categories: [14],
    description:
      'Online-Fortbildungsplattform der Akademie für tierärztliche Fortbildung und von Vetion.de mit E-Learning-Kursen sowie Online-Seminaren live und auf Abruf.',
    tags: ['Fortbildung', 'E-Learning', 'ATF'],
  },
  {
    // fortbildung.vet: „Fortbildungsplattform für Tiermedizinstudierende, Tierärzte und Tiermedizinische Fachangestellte“. Quelle: eigene Website, geprüft 25.11.2026 (Recherche zu den LinkedIn-Hinweisen).
    id: 'fortbildung-vet',
    aufgenommen: '2026-11-25',
    name: 'fortbildung.vet',
    logo: 'logos/fortbildung-vet.png',
    website: 'https://fortbildung.vet',
    countries: [],
    categories: [14],
    description:
      'Fortbildungsplattform für Tierärzte, TFA und Studierende mit Webinaren live und auf Abruf; betrieben von TVD Finanz.',
    tags: ['Fortbildung', 'Webinar'],
  },
  {
    // vetinare.de: „ATF-anerkannte Web-Seminare seit 2015 – live oder flexibel als Aufzeichnung.“ Länder nur aus Kundenstimmen – nicht gezählt. Quelle: eigene Website, geprüft 25.11.2026 (Recherche zu den LinkedIn-Hinweisen).
    id: 'vetinare',
    aufgenommen: '2026-11-25',
    name: 'vetinare',
    logo: 'logos/vetinare.png',
    website: 'https://www.vetinare.de',
    countries: [],
    categories: [14],
    description:
      'Web-Seminare für Tierärzte und TFA, live oder als Aufzeichnung, nach Fachgebieten von Anästhesie bis Zytologie geordnet.',
    tags: ['Fortbildung', 'Webinar', 'ATF'],
  },
  {
    // akademie.vet: „Online-Seminare für Tierärzte, Veterinärmediziner und TFA.“ Quelle: eigene Website, geprüft 25.11.2026 (Recherche zu den LinkedIn-Hinweisen).
    id: 'akademie-vet',
    aufgenommen: '2026-11-25',
    name: 'akademie.vet',
    logo: 'logos/akademie-vet.png',
    website: 'https://www.akademie.vet',
    countries: [],
    categories: [14],
    description:
      'Online-Seminare für praktizierende und amtliche Tierärzte sowie TFA, darunter Kurse zur Aktualisierung der Fachkunde im Strahlenschutz.',
    tags: ['Fortbildung', 'Strahlenschutz'],
  },
  {
    // Quelle: eigene Website, geprüft 25.11.2026 (Recherche zu den LinkedIn-Hinweisen).
    id: 'vet-webinar',
    aufgenommen: '2026-11-25',
    name: 'vet-webinar',
    logo: 'logos/vet-webinar.png',
    website: 'https://www.vet-webinar.com/de/',
    // Märkte geprüft 25.11.2026: https://www.vet-webinar.com/de/ – Anerkennung je Land: ATF, Bildungsordnung der Österreichischen Tierärztekammer, GST
    countries: ['DE', 'AT', 'CH'],
    categories: [14],
    description:
      'Plattform für Webinare und E-Learning-Kurse in der Veterinärmedizin, mit Anerkennung je nach Land über ATF, Österreichische Tierärztekammer oder GST.',
    tags: ['Fortbildung', 'Webinar', 'E-Learning'],
  },
  {
    // webinare-elanco.de: „Unsere Fortbildungen für Tierärzt/-innen sind selbstverständlich ATF-anerkannt.“ Quelle: eigene Website, geprüft 25.11.2026 (Recherche zu den LinkedIn-Hinweisen).
    id: 'elanco-webinare',
    aufgenommen: '2026-11-25',
    name: 'Webinare-Elanco.de',
    logo: 'logos/elanco-webinare.png',
    website: 'https://www.webinare-elanco.de',
    countries: [],
    categories: [14],
    description:
      'Webinarplattform des Tiergesundheitsunternehmens Elanco mit kostenfreien Live-Webinaren und Aufzeichnungen für Tierärzte und TFA.',
    tags: ['Fortbildung', 'Webinar', 'Hersteller'],
  },
  {
    // petcampus.de: „Fortbildungen speziell für Tiermedizinische Fachangestellte“. Quelle: eigene Website, geprüft 25.11.2026 (Recherche zu den LinkedIn-Hinweisen).
    id: 'petcampus',
    aufgenommen: '2026-11-25',
    name: 'PETCAMPUS',
    logo: 'logos/petcampus.png',
    website: 'https://www.petcampus.de',
    countries: [],
    categories: [14],
    description:
      'Fortbildungsangebot unter dem Namen MSD Academy für Tiermedizinische Fachangestellte, mit E-Learning, Live-Fortbildungen und Aufzeichnungen.',
    tags: ['Fortbildung', 'TFA', 'Hersteller'],
  },
];

export const providersById = new Map(providers.map((provider) => [provider.id, provider]));
