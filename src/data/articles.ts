/**
 * Redaktionelle Inhalte der Kategorie-Artikel.
 *
 * Getrennt vom Generator (`scripts/gen-artikel.mjs`), weil das hier Text ist
 * und dort Technik. Wer einen Artikel überarbeitet, soll kein HTML anfassen
 * müssen.
 *
 * Zwei Regeln, die den Unterschied zwischen einem Artikel und einer
 * automatisch befüllten Vorlage ausmachen:
 *
 *  1. **Kein Satz über einen einzelnen Anbieter.** Die Artikel beschreiben
 *     Lösungsfelder, nicht Produkte. Sobald hier stünde, wer etwas besonders
 *     gut macht, wäre es eine Bewertung – und die gibt diese Übersicht nicht.
 *  2. **Jeder Querverweis trägt einen Grund.** Ein Verweis ohne Begründung ist
 *     eine Linkliste; ein Verweis mit Begründung ist ein Argument. Deshalb
 *     steht in `abgrenzung` nicht nur die Ziel-Kategorie, sondern der Satz,
 *     der erklärt, warum man dort weiterlesen sollte.
 *
 * Kategorie 6 (PIMS) hat bewusst keinen Eintrag: Sie wird vom Hauptartikel
 * `tierarzt-software.html` abgedeckt. Zwei eigene Seiten auf dieselbe Frage
 * würden sich gegenseitig Konkurrenz machen.
 */

import { categories } from './categories.ts';

export interface ArtikelAbschnitt {
  h2: string;
  absaetze: string[];
}

export interface ArtikelAbgrenzung {
  /** Ziel-Kategorie. 6 verweist auf den Hauptartikel. */
  kategorie: number;
  /** Warum dort weiterlesen? Steht sichtbar als Verweistext. */
  grund: string;
}

export interface ArtikelFrage {
  frage: string;
  antwort: string;
}

export interface Artikel {
  kategorie: number;
  /** Dateiname ohne Endung. Entspricht dem Kategorie-Slug. */
  slug: string;
  h1: string;
  titleTag: string;
  description: string;
  /**
   * Ein Satz nach dem Muster „X ist …“, ganz oben im Kasten. Antwortmaschinen
   * übernehmen bevorzugt solche Sätze als Begriffserklärung; das GEO-Audit vom
   * 14.10.2026 fand auf keinem Artikel einen Einstieg mit Definition.
   */
  definition: string;
  /**
   * Die zwei Fragen in „Kurz beantwortet“, so formuliert, wie gesucht wird.
   * Vorher aus dem Kategorietitel gebaut – „Was versteht man unter Digitale
   * Sichtbarkeit“ ist kein Satz, den jemand tippt.
   */
  frageAnbieter: string;
  /**
   * Seit dem SEO-Audit vom 25.11.2026 nicht mehr in „Kurz beantwortet“:
   * Die Antwort war wörtlich die Definition, die direkt darüber steht.
   */
  frageBegriff: string;
  /**
   * Weitere Fragen in „Kurz beantwortet“, nach der Anbieterfrage. Regel aus
   * dem SEO-Audit vom 25.11.2026: Keine Antwort wiederholt Definition, Lead
   * oder eine Prüffrage – jede ergänzt eine Abgrenzung, eine Folge für den
   * Praxisalltag oder eine datierte Angabe, in ein bis drei Sätzen.
   */
  fragen: ArtikelFrage[];
  /**
   * Optionale Vergleichstabelle nach den Abschnitten – zitierfähiger als
   * Fließtext. Jede Zelle muss aus einer der genannten Quellen belegbar sein.
   */
  vergleich?: { titel: string; kopf: string[]; zeilen: string[][]; quelle: string };
  /** Der Kasten oben: die Antwort in zwei Sätzen, bevor irgendetwas erklärt wird. */
  lead: string[];
  abschnitte: ArtikelAbschnitt[];
  /** Konkrete Prüffragen. Das Nützlichste am ganzen Artikel. */
  worauf: string[];
  abgrenzung: ArtikelAbgrenzung[];
  /** Anker in den Begriffsteil des Hauptartikels. */
  begriffe: string[];
  /** Was der Artikel ausdrücklich nicht leistet. */
  grenzen: string;
}

/**
 * Adresse einer Artikelseite, relativ zum Seitenstamm.
 *
 * Die Endung steht hier und nirgends sonst. `scripts/seiten.mjs` und die
 * React-Anwendung lesen beide von hier – so meinen Canonical, Sitemap,
 * interne Verweise und die Livegang-Prüfung garantiert dieselbe Adresse.
 */
export const artikelPfad = (slug: string): string => `${slug}.html`;

/** Der Hauptartikel deckt Kategorie 6 (PIMS) ab und trägt den Begriffsteil. */
export const HAUPTARTIKEL = { kategorie: 6, slug: 'tierarzt-software' } as const;

export const artikel: Artikel[] = [
  /* ------------------------------------------------------------------ 1 */
  {
    kategorie: 1,
    slug: 'digitale-sichtbarkeit',
    frageAnbieter: 'Welche Anbieter gibt es für die digitale Sichtbarkeit von Tierarztpraxen?',
    frageBegriff: 'Was bedeutet digitale Sichtbarkeit für eine Tierarztpraxis?',
    fragen: [
      {
        frage: 'Was bringt Sichtbarkeit einer Praxis, die keine neuen Patienten aufnimmt?',
        antwort:
          'Weniger Anrufe, die ins Leere laufen. Wer im Profil vermerkt, dass derzeit keine neuen ' +
          'Patienten aufgenommen werden, und Tierarten und Leistungen klar nennt, filtert Anfragen, ' +
          'bevor sie am Empfang ankommen.',
      },
      {
        frage: 'Wie antwortet eine Praxis öffentlich auf eine Bewertung?',
        antwort:
          'Sachlich, kurz und ohne Behandlungsdetails. Schon die Bestätigung, dass ein Tier in der ' +
          'Praxis war, kann die Verschwiegenheit berühren; besser ist das Angebot, die Sache im ' +
          'direkten Gespräch zu klären.',
      },
      {
        frage: 'Kann sich ein Eintrag im Kartendienst ohne Zutun der Praxis ändern?',
        antwort:
          'Ja. Kartendienste nehmen auch Änderungsvorschläge von Nutzern an. Wer den Eintrag nicht ' +
          'regelmäßig ansieht – spätestens vor Feiertagen und Urlaubszeiten –, bemerkt eine falsche ' +
          'Angabe oft erst durch einen verärgerten Anruf.',
      },
    ],
    h1: 'Digitale Sichtbarkeit: Wie Tierhalter eine Tierarztpraxis finden',
    titleTag: 'Sichtbarkeit für Tierarztpraxen – Kanäle und Anbieter',
    description:
      'Wie Tierarztpraxen im DACH-Raum digital sichtbar werden – Kartendienst, Bewertungen, ' +
      'Communitys. Mit allen Anbietern der Marktübersicht, ohne Rangfolge.',
    definition:
      'Digitale Sichtbarkeit einer Tierarztpraxis heißt: Tierhalter finden sie online – im Kartendienst, in der Suche, in Portalen – und sehen dort die Angaben, die sie für einen Besuch brauchen.',
    lead: [
      'Sichtbarkeit entsteht heute an drei Stellen: im Kartendienst, in Bewertungen und in ' +
        'Communitys, in denen Tierhalter unterwegs sind. Eine eigene Website ist ' +
        'die Grundlage, aber selten der Ort, an dem die Suche beginnt.',
      'Vorweg eine unbequeme Frage: Viele Praxen im DACH-Raum sind ausgelastet und nehmen keine ' +
        'neuen Patienten an. Für sie ist Sichtbarkeit kein Wachstumsthema, sondern ein ' +
        'Steuerungsthema – gefunden werden will man trotzdem, aber von den richtigen Leuten.',
    ],
    abschnitte: [
      {
        h2: 'Was in dieser Kategorie zusammengefasst ist',
        absaetze: [
          'Plattformen und Dienste, die eine Praxis selbst einsetzt, um für Tierhalter auffindbar ' +
            'zu werden, die sie noch nicht kennen – etwa Community-Plattformen oder Angebote, die ' +
            'Praxisprofile bündeln. Reine Suchportale und Verzeichnisse stehen in einer eigenen ' +
            'Kategorie, den Tierärzte-Suchmaschinen: Dort kommt eine Praxis vor, ob sie will oder ' +
            'nicht, hier entscheidet sie sich dafür.',
          'Nicht in dieser Kategorie: Werkzeuge, die sich an bestehende Kundinnen und Kunden ' +
            'richten. Wer schon in der Kartei steht, wird nicht neu gewonnen, sondern gehalten – ' +
            'dafür sind Terminbuchung, Portal und Recall zuständig.',
          // Dieselbe Quelle wie der Hinweis in der gefilterten Übersicht.
          categories.find((c) => c.id === 1)!.aufnahme!,
        ],
      },
      {
        h2: 'Warum der Kartendienst meist wichtiger ist als die Website',
        absaetze: [
          'Viele Suchen sind lokal und dringend: ein Tier, ein Symptom, ein Ort. Was in ' +
            'diesem Moment zählt, sind Öffnungszeiten, Entfernung, Telefonnummer und ob überhaupt ' +
            'ein Termin zu bekommen ist. Diese Angaben stehen selten auf der Website – sie stehen ' +
            'im Kartendienst, im Verzeichnis oder im Portal.',
          'Praktische Folge: Ein gepflegter Eintrag mit korrekten Zeiten und einem funktionierenden ' +
            'Terminweg wirkt erfahrungsgemäß meist stärker als ein Website-Relaunch und kostet ' +
            'weniger. Das ist eine Einschätzung aus der Praxis, keine gemessene Wirkung.',
        ],
      },
      {
        h2: 'Bewertungen sind ein Kanal, kein Nebengeräusch',
        absaetze: [
          'Bewertungen beeinflussen sowohl die Auswahl als auch die Reihenfolge, in der Praxen ' +
            'angezeigt werden. Sie systematisch zu erbitten ist zulässig, solange man nicht ' +
            'vorsortiert – also nicht nur die Zufriedenen fragt. Gekaufte oder gefilterte ' +
            'Bewertungen sind wettbewerbsrechtlich riskant und werden von den Plattformen ' +
            'zunehmend erkannt.',
          'Für die Praxis ist der wertvollere Teil ohnehin nicht die Sternzahl, sondern der Text: ' +
            'Dort steht regelmäßig, woran es im Ablauf hakt – Wartezeit, Erreichbarkeit, ' +
            'Rückrufe. Das ist Rückmeldung, für die andere Branchen bezahlen.',
        ],
      },
    ],
    worauf: [
      'Sind Öffnungszeiten, Notdienstregelung und Urlaubszeiten überall gleich – und wer pflegt sie?',
      'Führt der Weg vom Eintrag zu einem tatsächlich buchbaren Termin oder nur zu einer Telefonnummer?',
      'Wem gehört das Profil? Ein von einem Anbieter angelegtes Profil, auf das die Praxis keinen Zugriff hat, ist ein Risiko.',
      'Was passiert mit dem Profil bei Kündigung – bleibt es bestehen, verwaist es, oder wird es übertragen?',
      'Werden über den Kanal personenbezogene Daten von Tierhaltern verarbeitet? Dann braucht es einen Auftragsverarbeitungsvertrag.',
    ],
    abgrenzung: [
      {
        kategorie: 10,
        grund:
          'Der Ort, an dem tatsächlich gesucht wird. Sichtbarkeit ist das, was eine Praxis tut – ' +
          'eine Suchmaschine ist der Kanal, in dem es ankommt.',
      },
      {
        kategorie: 2,
        grund:
          'Sichtbarkeit endet an dem Punkt, an dem jemand einen Termin will. Ob daraus ein Termin ' +
          'wird, entscheidet der nächste Schritt.',
      },
      {
        kategorie: 9,
        grund:
          'Wer einmal da war, wird über ein Portal gehalten, nicht über ein Verzeichnis. ' +
          'Sichtbarkeit gewinnt Kunden, Portale behalten sie.',
      },
      {
        kategorie: 5,
        grund:
          'Sichtbarkeit im Fachpublikum ist etwas anderes als Sichtbarkeit bei Tierhaltern – ' +
          'beides wird regelmäßig verwechselt.',
      },
    ],
    begriffe: ['patientenportal', 'recall'],
    grenzen:
      'Dieser Artikel nennt keine Preise, keine Reichweitenzahlen und keine Empfehlung, welcher ' +
      'Kanal sich für eine bestimmte Praxis lohnt. Reichweite hängt von Ort, Tierarten und ' +
      'Wettbewerbsdichte ab und lässt sich aus der Ferne nicht beurteilen.',
  },

  /* ------------------------------------------------------------------ 2 */
  {
    kategorie: 2,
    slug: 'online-terminvereinbarung',
    frageAnbieter: 'Welche Anbieter gibt es für die Online-Terminbuchung beim Tierarzt?',
    frageBegriff: 'Was ist Online-Terminvereinbarung in der Tierarztpraxis?',
    fragen: [
      {
        frage: 'Ersetzt die Online-Buchung das Telefon am Empfang?',
        antwort:
          'Nein, sie verschiebt nur einen Teil der Anrufe. Planbare Anlässe wandern ins Netz, ' +
          'dringende und unklare Fälle bleiben am Telefon – und die Buchungsseite sollte genau ' +
          'dorthin verweisen.',
      },
      {
        frage: 'Sollte die Online-Buchung auch neuen Kunden offenstehen?',
        antwort:
          'Das ist eine Steuerungsentscheidung, keine technische. Je nach System lassen sich ' +
          'Neukunden ganz ausschließen, auf bestimmte Terminarten begrenzen oder erst nach ' +
          'Bestätigung durch die Praxis zulassen. Für ausgelastete Praxen ist das ein einfacher ' +
          'Hebel, ohne die Buchung abzuschalten.',
      },
      {
        frage: 'Wie viel vom Kalender gibt man online frei?',
        antwort:
          'Selten den ganzen. Ein gangbarer Weg ist ein Kontingent je Tag oder je Terminart; der ' +
          'Rest bleibt für Telefon und Notfälle. Nach einigen Wochen lässt sich das Kontingent an ' +
          'der tatsächlichen Nutzung ausrichten.',
      },
    ],
    h1: 'Online-Terminvereinbarung in der Tierarztpraxis',
    titleTag: 'Online-Terminbuchung in der Tierarztpraxis – Anbieter',
    description:
      'Wie Online-Terminbuchung in Tierarztpraxen funktioniert, welche Anbieter es im DACH-Raum ' +
      'gibt und woran die Einführung in der Praxis scheitern kann.',
    definition:
      'Online-Terminvereinbarung ist die Buchung eines Praxistermins durch den Tierhalter selbst, über Website oder App und ohne Anruf – der Termin landet direkt im Kalender der Praxis.',
    lead: [
      'Online-Terminvereinbarung nimmt Anrufe vom Empfang und macht die Praxis außerhalb der ' +
        'Öffnungszeiten buchbar. Die eigentliche Entscheidung ist aber nicht das Buchungsfenster, ' +
        'sondern ob es in den vorhandenen Praxiskalender zurückschreibt.',
      'Eine Tierarztpraxis ist dabei kein Friseursalon: Termindauer hängt von Tierart, Anlass und ' +
        'Vorgeschichte ab, und Notfälle durchbrechen jeden Plan. Jedes System, das das nicht ' +
        'abbildet, erzeugt am Empfang mehr Arbeit, als es abnimmt.',
    ],
    abschnitte: [
      {
        h2: 'Die eine Frage, die alles entscheidet: eigenständig oder integriert?',
        absaetze: [
          'Eigenständige Buchungssysteme führen einen eigenen Kalender. Sie sind schnell ' +
            'eingerichtet und funktionieren unabhängig von der Praxissoftware – aber jemand muss ' +
            'die Buchungen in die Praxissoftware übertragen, und der Doppelkalender ist eine ' +
            'dauerhafte Fehlerquelle.',
          'Integrierte Lösungen schreiben direkt in den Kalender des Praxismanagementsystems. ' +
            'Damit verschwindet die Doppelpflege, aber die Auswahl ist auf das beschränkt, was ' +
            'zum eigenen System passt. Etliche Praxissoftware-Anbieter führen eine eigene ' +
            'Terminbuchung – in dieser Übersicht erscheinen sie deshalb in beiden Kategorien.',
          'Wer die Frage überspringt, trifft sie trotzdem: Die Antwort ergibt sich dann aus dem, ' +
            'was der erste Anbieter zufällig anbietet.',
        ],
      },
      {
        h2: 'Warum die Terminarten wichtiger sind als die Oberfläche',
        absaetze: [
          'Ein gut gepflegter Satz von Terminarten – Impftermin, Kontrolle, Zahnsanierung, ' +
            'Erstvorstellung, jeweils mit realistischer Dauer – entscheidet darüber, ob der Plan ' +
            'am Nachmittag noch stimmt. Lässt ein System nur eine Einheitsdauer zu, bucht sich der ' +
            'Tag voll und läuft dann über.',
          'Ebenso wichtig ist, was nicht online buchbar sein soll. Notfälle, Euthanasie und ' +
            'unklare Symptome gehören in das Gespräch, nicht in ein Formular. Ein System muss ' +
            'Anlässe ausschließen können, ohne Tierhalter im Regen stehen zu lassen.',
        ],
      },
      {
        h2: 'Nicht erschienene Termine',
        absaetze: [
          'Der messbare Nutzen einer Online-Buchung liegt meist weniger in der Neugewinnung als ' +
            'in weniger Ausfällen: Erinnerungen per E-Mail oder Nachricht, ein Weg zum Absagen, ' +
            'der keinen Anruf verlangt, und eine Warteliste, die frei gewordene Zeiten nachbesetzt.',
          'Ob eine Praxis Ausfallhonorare erhebt, ist eine vertragliche Frage und keine technische. ' +
            'Wer sie stellen will, braucht eine nachweisbare Vereinbarung – und sollte klären, ob ' +
            'das gewählte System diesen Nachweis überhaupt erzeugt.',
        ],
      },
    ],
    worauf: [
      'Schreibt die Buchung in den Kalender der Praxissoftware zurück – oder entsteht ein zweiter Kalender?',
      'Lassen sich Terminarten mit eigener Dauer und eigenen Regeln anlegen?',
      'Können Anlässe von der Online-Buchung ausgeschlossen werden, ohne den Tierhalter abzuweisen?',
      'Wie werden Erinnerungen versendet, und liegt für den Versandweg eine Einwilligung vor?',
      'Gibt es eine Warteliste, die kurzfristig frei gewordene Zeiten nachbesetzt?',
      'Was sieht die Praxis, wenn das System ausfällt – und wie kommt sie an die offenen Buchungen?',
    ],
    abgrenzung: [
      {
        kategorie: 6,
        grund:
          'Ob eine eigenständige Buchung überhaupt nötig ist, hängt davon ab, was die vorhandene ' +
          'Praxissoftware bereits kann.',
      },
      {
        kategorie: 3,
        grund:
          'Der Termin ist gebucht – die Daten fehlen noch. Der nächste Schritt ist die Aufnahme ' +
          'vor dem Besuch.',
      },
      {
        kategorie: 1,
        grund:
          'Eine Buchungsseite, die niemand findet, wird nicht genutzt. Sichtbarkeit kommt vor der ' +
          'Buchung.',
      },
    ],
    begriffe: ['pims', 'recall', 'schnittstelle'],
    grenzen:
      'Keine Aussage darüber, welches System für eine bestimmte Praxis passt, und keine Preise. ' +
      'Ob sich eine Integration lohnt, hängt an der vorhandenen Praxissoftware – das lässt sich ' +
      'nur im Einzelfall beantworten.',
  },

  /* ------------------------------------------------------------------ 3 */
  {
    kategorie: 3,
    slug: 'intake-self-checkin',
    frageAnbieter: 'Welche Anbieter gibt es für digitale Patientenaufnahme und Self-Check-in?',
    frageBegriff: 'Was versteht man unter Intake und Self-Check-in?',
    fragen: [
      {
        frage: 'Link vorab oder Tablet im Wartebereich?',
        antwort:
          'Der Link vor dem Termin bringt mehr, weil zu Hause in Ruhe ausgefüllt wird. Das Tablet ' +
          'fängt diejenigen auf, die den Link nicht genutzt haben – es braucht dann einen festen ' +
          'Platz, Reinigung und jemanden, der es nach jedem Tierhalter zurücksetzt. Meist braucht ' +
          'es beides.',
      },
      {
        frage: 'Was geschieht mit Fotos und Dokumenten, die Tierhalter hochladen?',
        antwort:
          'Vorbefunde anderer Praxen, Impfpass oder Fotos einer Wunde sind oft der nützlichste Teil ' +
          'eines Intake. Zu klären ist, ob sie an der richtigen Patientenakte ankommen und wer sie ' +
          'vor dem Termin ansieht – sonst liegen sie ungelesen in einem Postfach.',
      },
      {
        frage: 'Eignet sich Intake auch für Notfälle?',
        antwort:
          'Nur eingeschränkt. Im Notfall zählt die Zeit bis zur Behandlung, nicht ein vollständiger ' +
          'Datensatz. Sinnvoll ist ein sehr kurzer Bogen nach der Erstversorgung oder das Nachholen ' +
          'beim nächsten regulären Termin.',
      },
    ],
    h1: 'Intake und Self-Check-in: die Patientenaufnahme vor dem Termin',
    titleTag: 'Digitale Patientenaufnahme in der Tierarztpraxis',
    description:
      'Digitale Anamnesebögen und Self-Check-in für Tierarztpraxen: was sie leisten, woran sie ' +
      'scheitern und welche Anbieter es im DACH-Raum gibt.',
    definition:
      'Intake, die digitale Patientenaufnahme, sind die Angaben, die Tierhalter vor dem Termin selbst erfassen: Stammdaten, Anlass und Vorgeschichte. Self-Check-in ist die Anmeldung beim Eintreffen, ohne Schlange am Empfang.',
    lead: [
      'Intake verlagert das Ausfüllen nach vorne: Stammdaten, Vorgeschichte und Einwilligungen ' +
        'kommen vor dem Besuch, per Link oder am Tablet im Wartebereich. Der Empfang tippt ' +
        'weniger ab, und die Vorgeschichte ist vollständiger, bevor das Tier auf dem Tisch liegt.',
      'Der Nutzen steht und fällt mit einer einzigen Eigenschaft: ob die erfassten Daten in der ' +
        'Praxissoftware landen. Tun sie es nicht, ist das Formular nur ein weiterer Ort, von dem ' +
        'jemand abschreibt.',
    ],
    abschnitte: [
      {
        h2: 'Was Intake tatsächlich einspart',
        absaetze: [
          'Die Zeitersparnis am Empfang ist der sichtbare Teil. Der größere Effekt liegt woanders: ' +
            'Wer eine Vorgeschichte in Ruhe zu Hause ausfüllt, erinnert sich an mehr als jemand, ' +
            'der im Wartezimmer mit einem aufgeregten Tier an der Leine steht. Fütterung, ' +
            'Vorbehandlungen, Dauer der Symptome – diese Angaben werden im Gespräch selten ' +
            'vollständig.',
          'Gleichzeitig ist Intake der natürliche Ort für Einwilligungen und Aufklärungen, die ' +
            'sonst zwischen Tür und Angel unterschrieben werden.',
        ],
      },
      {
        h2: 'Die zwei Wege ins System – und warum das der Knackpunkt ist',
        absaetze: [
          'Entweder ein Anbieter schreibt die Antworten über eine Schnittstelle direkt in die ' +
            'Patientenakte, oder er erzeugt ein Dokument, das jemand anhängt. Der Unterschied ' +
            'klingt technisch, entscheidet aber über den gesamten Nutzen: Im ersten Fall sind die ' +
            'Angaben durchsuchbar und auswertbar, im zweiten sind sie ein PDF.',
          'Wer eine Anbindung prüft, sollte sich zeigen lassen, was konkret ankommt – nicht, dass ' +
            'eine Schnittstelle existiert. In der Praxis unterscheidet sich beides erheblich.',
        ],
      },
      {
        h2: 'Formulare, die niemand ausfüllt',
        absaetze: [
          'Ein typischer Fehler ist Länge. Ein Bogen mit vierzig Feldern wird abgebrochen, und ' +
            'dann steht der Empfang schlechter da als vorher, weil er nun mit halb ausgefüllten ' +
            'Datensätzen arbeitet. Wenige Pflichtfelder, alles andere optional – das ist ' +
            'unspektakulär und wirkt.',
          'Zweiter Fehler: Formulare, die bei jedem Besuch alles erneut abfragen. Wer beim dritten ' +
            'Termin wieder die Adresse eintippen soll, füllt nicht aus.',
        ],
      },
    ],
    worauf: [
      'Landen die Antworten als Daten in der Patientenakte oder nur als angehängtes Dokument?',
      'Werden vorhandene Stammdaten vorausgefüllt, oder beginnt jeder Bogen bei null?',
      'Lassen sich Einwilligungen rechtssicher und nachweisbar erfassen, mit Zeitstempel?',
      'Funktioniert der Bogen auf dem Telefon – dort wird er ausgefüllt, nicht am Schreibtisch?',
      'Wo liegen die Daten, und gibt es einen Auftragsverarbeitungsvertrag?',
      'Was passiert mit Bögen von Tierhaltern, die dann doch nicht erscheinen?',
    ],
    abgrenzung: [
      {
        kategorie: 2,
        grund:
          'Intake beginnt sinnvollerweise mit der Terminbestätigung. Wer beides getrennt einkauft, ' +
          'verschickt zwei Nachrichten statt einer.',
      },
      {
        kategorie: 6,
        grund:
          'Ob die erfassten Daten ankommen, entscheidet die Praxissoftware – nicht der ' +
          'Intake-Anbieter.',
      },
      {
        kategorie: 4,
        grund:
          'Beide reduzieren Tipparbeit, aber an verschiedenen Enden: Intake vor dem Termin, ' +
          'KI-Dokumentation währenddessen.',
      },
    ],
    begriffe: ['intake', 'schnittstelle', 'pims'],
    grenzen:
      'Keine Bewertung einzelner Formularlösungen und keine datenschutzrechtliche Prüfung. Ob eine ' +
      'konkrete Einwilligungsgestaltung trägt, gehört in eine rechtliche Prüfung, nicht in eine ' +
      'Marktübersicht.',
  },

  /* ------------------------------------------------------------------ 4 */
  {
    kategorie: 4,
    slug: 'ki-dokumentation',
    frageAnbieter: 'Welche KI-Assistenten gibt es für Tierarztpraxen?',
    frageBegriff: 'Was sind KI-Dokumentationsassistenten?',
    fragen: [
      {
        frage: 'Wissen Tierhalter, dass im Behandlungsraum mitgeschnitten wird?',
        antwort:
          'Das sollten sie vorher erfahren, etwa über einen Hinweis bei der Anmeldung. Praktisch ' +
          'braucht es außerdem einen Weg, die Aufnahme auf Wunsch auszuschalten. Die rechtliche ' +
          'Bewertung gehört in eine Datenschutzberatung.',
      },
      {
        frage: 'Spart KI-Dokumentation vom ersten Tag an Zeit?',
        antwort:
          'Selten. In den ersten Wochen liest das Team die Entwürfe genauer und passt Vorlagen an. ' +
          'Belastbar ist ein Vergleich erst nach der Eingewöhnung – und dann an denselben ' +
          'Terminarten wie vorher.',
      },
      {
        frage: 'Schreibt ein Assistent auch Berichte für Tierhalter oder Überweisungen?',
        antwort:
          'Das hängt am Produkt und steht, wenn überhaupt, in der Beschreibung des Anbieters. Für ' +
          'die Auswahl ist es zweitrangig: Aus dem Akteneintrag entstehen alle weiteren Texte, also ' +
          'muss zuerst er stimmen.',
      },
    ],
    h1: 'KI in der Tierarztpraxis: Dokumentation und Praxisassistenten',
    titleTag: 'KI in der Tierarztpraxis: Dokumentation, Diktat, Telefon',
    description:
      'Wie KI-Dokumentation in der Tierarztpraxis funktioniert, wo ihre Grenzen liegen und ' +
      'welche Anbieter es gibt – ohne Rangfolge, ohne Bewertung.',
    definition:
      'KI-Dokumentationsassistenten sind Programme, die das Gespräch in der Sprechstunde aufzeichnen und daraus einen Entwurf für die Patientenakte schreiben, oft im SOAP-Format; geprüft und freigegeben wird er von der Tierärztin oder dem Tierarzt.',
    lead: [
      'Ein Assistent hört das Gespräch mit und erzeugt daraus einen Entwurf des ' +
        'Behandlungseintrags. Die Tierärztin prüft und gibt frei. Das ist der Kern – alles andere ' +
        'ist Ausstattung.',
      'Die Kategorie wächst schnell, und sie ist noch nicht sortiert: Ambient-Dokumentation, ' +
        'reine Spracherkennung und KI-Telefonassistenz werden unter demselben Wort verkauft, ' +
        'lösen aber drei verschiedene Probleme.',
    ],
    abschnitte: [
      {
        h2: 'Drei Dinge, die alle „KI" heißen',
        absaetze: [
          'Ambient-Dokumentation hört das Gespräch mit und strukturiert es zu einem Eintrag. Reine ' +
            'Spracherkennung wandelt Diktiertes in Text um – hilfreich, aber etwas anderes: Hier ' +
            'spricht jemand bewusst für das Protokoll. KI-Telefonassistenz wiederum nimmt Anrufe ' +
            'an – eine dritte Aufgabe, auch wenn manche Anbieter sie mit der Dokumentation verbinden.',
          'Für die Auswahl ist die Unterscheidung entscheidend, weil sie an verschiedenen Stellen ' +
            'Zeit spart. Wer am Telefon ertrinkt, dem hilft auch ein guter Dokumentationsassistent ' +
            'nicht.',
          'Anmerkung zur Einordnung: Telefonassistenz war in dieser Kategorie eine bekannte ' +
            'Lücke. Seit dem 26.10.2026 stehen auch diese Anbieter in der Liste unten; welche der ' +
            'drei Aufgaben ein Anbieter übernimmt, steht in seiner Beschreibung.',
        ],
      },
      {
        h2: 'Die Freigabe ist kein Formalismus',
        absaetze: [
          'Ein erzeugter Entwurf ist ein Vorschlag. Die fachliche und rechtliche Verantwortung für ' +
            'den Eintrag in der Patientenakte bleibt bei der behandelnden Tierärztin oder dem ' +
            'behandelnden Tierarzt – daran ändert kein Werkzeug etwas.',
          'Praktisch heißt das: Ein System, das die Freigabe bequem macht, wird benutzt; eines, ' +
            'das sie umständlich macht, führt dazu, dass ungeprüft freigegeben wird. Das ist ein ' +
            'Auswahlkriterium, kein Randthema.',
        ],
      },
      {
        h2: 'Fachsprache und Mehrsprachigkeit',
        absaetze: [
          'Veterinärmedizinisches Vokabular unterscheidet sich vom humanmedizinischen, und ' +
            'Tiernamen, Rassebezeichnungen und Präparate sind für ein allgemeines Sprachmodell ' +
            'schwierig. Dazu kommen Dialekt und die Tatsache, dass im Behandlungsraum selten ' +
            'gestochen scharf gesprochen wird.',
          'Wer testet, sollte das mit echten Gesprächen tun – nicht mit einem vorgelesenen ' +
            'Beispielfall. Der Unterschied ist erheblich.',
        ],
      },
      {
        h2: 'Wo die Aufnahme hingeht',
        absaetze: [
          'Im Gespräch fallen personenbezogene Daten des Tierhalters und unter Umständen ' +
            'Gesundheitsangaben. Wo verarbeitet wird, wie lange Aufnahmen liegen und ob mit den ' +
            'Daten Modelle trainiert werden, gehört vor dem Test geklärt – und in einen ' +
            'Auftragsverarbeitungsvertrag.',
          'Ebenso zu klären: ob der fertige Eintrag in der Praxissoftware landet oder in einem ' +
            'zweiten System liegt, aus dem jemand kopiert.',
        ],
      },
    ],
    worauf: [
      'Ambient, Diktat oder Telefonassistenz – welches der drei Probleme soll das Werkzeug lösen?',
      'Wie kommt der freigegebene Eintrag in die Patientenakte: über eine Schnittstelle oder über die Zwischenablage?',
      'Wie gut kommt das System mit veterinärmedizinischem Vokabular und mit Dialekt zurecht? Mit echten Aufnahmen testen.',
      'Wo werden Aufnahmen verarbeitet und gespeichert, wie lange, und werden damit Modelle trainiert?',
      'Liegt ein Auftragsverarbeitungsvertrag vor, und nennt er Unterauftragnehmer?',
      'Wie viele Sekunden dauert die Freigabe eines durchschnittlichen Eintrags? Das entscheidet über die Nutzung im Alltag.',
    ],
    abgrenzung: [
      {
        kategorie: 6,
        grund:
          'Ein Dokumentationsassistent ohne Weg in die Praxissoftware verlagert Arbeit, statt sie ' +
          'abzunehmen.',
      },
      {
        kategorie: 3,
        grund:
          'Die Vorgeschichte vor dem Termin zu erfassen, ist der billigere Teil derselben ' +
          'Entlastung.',
      },
      {
        kategorie: 8,
        grund:
          'Für Videotermine stellt sich die Dokumentationsfrage anders – dort liegt die Aufnahme ' +
          'ohnehin digital vor.',
      },
    ],
    begriffe: ['ambient-dokumentation', 'pims', 'schnittstelle'],
    grenzen:
      'Keine Aussage über Erkennungsgenauigkeit, keine Messwerte, kein Vergleich. Solche Zahlen ' +
      'wären nur aus einem eigenen Test belastbar, und der hat nicht stattgefunden.',
  },

  /* ------------------------------------------------------------------ 5 */
  {
    kategorie: 5,
    slug: 'branchen-newsletter',
    frageAnbieter: 'Welche Newsletter und Fachmedien gibt es für Tierärzte?',
    frageBegriff: 'Was sind Branchen-Newsletter und Fachmedien?',
    fragen: [
      {
        frage: 'Woran erkennt man einen bezahlten Beitrag?',
        antwort:
          'An Kennzeichnungen wie „Anzeige“, „Advertorial“ oder „gesponsert“ – und daran, dass ein ' +
          'Text nur ein Produkt behandelt und auf eine Bestellseite führt. Fehlt die Kennzeichnung, ' +
          'zeigt das Impressum, wer das Medium herausgibt.',
      },
      {
        frage: 'Können Fachbeiträge als Fortbildung zählen?',
        antwort:
          'Teilweise. Einzelne Fachzeitschriften und Plattformen bieten Beiträge mit Lernkontrolle ' +
          'an, die als Fortbildung anerkannt sein können. Was angerechnet wird, regelt die ' +
          'Fortbildungsordnung der zuständigen Kammer.',
      },
      {
        frage: 'Wie viele Newsletter sollte ein Praxisteam abonnieren?',
        antwort:
          'So viele, wie tatsächlich gelesen werden. Ein Newsletter, der seit Monaten ungeöffnet ' +
          'bleibt, ist ein Zeichen zum Abmelden – er verdeckt nur die Ausgaben, die gebraucht werden.',
      },
    ],
    h1: 'Branchen-Newsletter und Fachmedien der deutschsprachigen Tiermedizin',
    titleTag: 'Fachmedien und Newsletter für Tierärzte im DACH-Raum',
    description:
      'Welche Newsletter und Fachmedien die deutschsprachige Veterinärbranche informieren – und ' +
      'warum sie in eine Marktübersicht digitaler Lösungen gehören.',
    definition:
      'Branchen-Newsletter und Fachmedien sind die Kanäle, über die Tierärztinnen, Tierärzte und Praxisteams von neuen Produkten, Fortbildungen und Entwicklungen erfahren – per E-Mail, Fachportal oder Magazin.',
    lead: [
      'Diese Kategorie fällt aus dem Rahmen: Sie enthält keine Software, sondern Medien. Sie ' +
        'steht trotzdem in der Übersicht, weil sie erklärt, wie der Markt überhaupt von neuen ' +
        'Lösungen erfährt.',
      'Für eine Praxis ist das ein Informationskanal. Für einen Anbieter ist es der wichtigste ' +
        'Verteiler, den es in dieser Branche gibt – und für diese Übersicht war es die Quelle ' +
        'mehrerer Einträge.',
    ],
    abschnitte: [
      {
        h2: 'Warum Medien in einer Software-Übersicht stehen',
        absaetze: [
          'Die Digitalisierung der Tierarztpraxis verbreitet sich zu einem guten Teil nicht über ' +
            'Suchmaschinen, sondern über Empfehlungen, Fachmedien und Messen. Von einem ' +
            'Dokumentationsassistenten erfährt eine Praxis erfahrungsgemäß oft nicht, weil sie danach ' +
            'gesucht hat, sondern weil jemand darüber geschrieben oder gesprochen hat – eine ' +
            'Einschätzung aus dem Markt, keine Erhebung.',
          'Wer die Kanäle nicht kennt, über die dieser Markt redet, versteht seine Bewegungen ' +
            'nicht. Deshalb gehören sie in eine Marktübersicht.',
        ],
      },
      {
        h2: 'Welche Arten von Fachmedien es gibt',
        absaetze: [
          'Fachzeitschriften mit wissenschaftlichem Anspruch bringen Übersichtsartikel, Fallberichte ' +
            'und Studien, oft nach Begutachtung durch Fachkolleginnen und -kollegen. Sie erscheinen ' +
            'in größeren Abständen und dienen dem medizinischen Wissen, nicht der Marktbeobachtung.',
          'Kammer- und Verbandsorgane berichten über Berufspolitik, Rechtsänderungen und ' +
            'Fortbildungstermine. Sie erreichen Mitglieder unabhängig davon, ob diese gerade nach ' +
            'etwas suchen – und sind deshalb oft der Ort, an dem eine Praxis zuerst von einer neuen ' +
            'Vorschrift erfährt.',
          'Branchennews und Newsletter haben die kürzeste Taktung. Sie melden neue Produkte, ' +
            'Übernahmen, Personalien und Messetermine. Neue digitale Lösungen tauchen erfahrungsgemäß ' +
            'hier zuerst auf, lange bevor eine Fachzeitschrift über sie schreibt.',
          'Dazu kommen Fortbildungsplattformen, Webinare und Podcasts, bei denen die Grenze zwischen ' +
            'Information und Fortbildung fließend ist, sowie Kundenmagazine von Herstellern und ' +
            'Großhandel. Letztere können nützlich sein, sind aber nicht unabhängig von dem, was ' +
            'der Herausgeber verkauft.',
        ],
      },
      {
        h2: 'Wie Praxen Fachmedien im Alltag nutzen',
        absaetze: [
          'Kaum ein Team liest alles. Praktikabel ist eine Aufteilung: Eine Person sichtet Medizin, ' +
            'eine Praxisorganisation und Technik, und was relevant ist, kommt in die nächste ' +
            'Teambesprechung. So hängt die Information nicht an der einen Kollegin, die zufällig ' +
            'den richtigen Newsletter abonniert hat.',
          'Bei Produktentscheidungen ist ein Bericht ein Anlass, keine Grundlage. Wer über eine neue ' +
            'Lösung liest, erfährt, dass es sie gibt – ob sie in die eigene Praxis passt, zeigen ' +
            'erst ein Test mit echten Abläufen und ein Gespräch mit einer Praxis, die sie schon ' +
            'einsetzt. Auch das Datum zählt: Ein Bericht beschreibt den Stand beim Schreiben, nicht ' +
            'den heutigen.',
          'Für Praxisinhaberinnen und -inhaber haben Fachmedien noch eine zweite Funktion: Sie zeigen, ' +
            'worüber andere Praxen gerade sprechen – Personalmangel, Übernahmen durch Gruppen, ' +
            'Gebührenfragen. Das hilft, die eigene Lage einzuordnen.',
        ],
      },
      {
        h2: 'Was diese Kategorie für die Übersicht selbst bedeutet',
        absaetze: [
          'Die Lücken dieser Übersicht werden nicht durch Recherchewerkzeuge geschlossen, sondern ' +
            'durch Hinweise aus der Branche. Allein auf die erste Veröffentlichung hin kamen neun ' +
            'Anbieter dazu, die keine Keyword-Liste gezeigt hätte.',
          'Das ist kein Nebensatz, sondern die Methode: Eine Marktübersicht im Nischenmarkt lebt ' +
            'von Korrekturen durch die, die darin vorkommen.',
        ],
      },
    ],
    worauf: [
      'Richtet sich das Medium an Praxen, an Tierhalter oder an die Industrie? Die drei werden oft vermischt.',
      'Erscheint es regelmäßig, und wie alt ist die letzte Ausgabe?',
      'Sind Anzeigen und redaktionelle Inhalte erkennbar getrennt?',
      'Deckt es den ganzen DACH-Raum ab oder nur ein Land? Die Marktlagen unterscheiden sich.',
    ],
    abgrenzung: [
      {
        kategorie: 1,
        grund:
          'Sichtbarkeit bei Tierhaltern und Sichtbarkeit im Fachpublikum sind zwei verschiedene ' +
          'Aufgaben – und werden ständig verwechselt.',
      },
      {
        kategorie: 6,
        grund:
          'Die vollständigste bekannte Anbieterliste des Marktes steht in einem dieser Fachmedien, ' +
          'nicht in einem Verzeichnis.',
      },
    ],
    begriffe: [],
    grenzen:
      'Keine Bewertung der redaktionellen Qualität, keine Reichweitenzahlen und keine Aussage ' +
      'darüber, welches Medium sich für Anzeigen eignet.',
  },

  /* ------------------------------------------------------------------ 7 */
  {
    kategorie: 7,
    slug: 'online-videosprechstunde',
    frageAnbieter: 'Welche Anbieter gibt es für den Online-Tierarzt per Video?',
    frageBegriff: 'Was ist ein Online-Tierarzt?',
    fragen: [
      {
        frage: 'Welche Angaben sollten Tierhalter für eine Online-Beratung bereithalten?',
        antwort:
          'Gewicht, aktuelle Medikamente, Impfstatus und, wenn vorhanden, die letzten Befunde. Die ' +
          'Plattform kennt die Akte nicht – was nicht genannt wird, fließt nicht in die ' +
          'Einschätzung ein.',
      },
      {
        frage: 'Können Tierärztinnen aus einer Praxis für eine Plattform beraten?',
        antwort:
          'Das hängt vom Anbieter und vom Arbeitsvertrag ab. Wer es erwägt, sollte vorher klären, ' +
          'ob daraus eine Konkurrenz zur eigenen Praxis entsteht und wem der Kontakt zum Tierhalter ' +
          'nach der Beratung gehört.',
      },
    ],
    h1: 'Online-Tierarzt: offene Videosprechstunden für Tierhalter',
    titleTag: 'Online-Tierarzt per Video – Anbieter für Tierhalter',
    description:
      'Plattformen, über die Tierhalter direkt einen Tierarzt per Video erreichen – was sie von ' +
      'praxiseigenen Angeboten trennt und was das für Praxen heißt.',
    definition:
      'Ein Online-Tierarzt, genauer eine offene Online-Videosprechstunde, ist eine tierärztliche Beratung per Video bei einem Anbieter mit eigenen Tierärztinnen und Tierärzten – unabhängig von der Praxis, in der das Tier sonst behandelt wird.',
    lead: [
      'Hier geht es um Plattformen mit eigenem Tierärzteteam, an die sich Tierhalter direkt ' +
        'wenden – ohne ihre Praxis. Das ist ein anderes Geschäftsmodell als eine Videosprechstunde, ' +
        'die eine Praxis ihren eigenen Kunden anbietet.',
      'Aus Sicht einer Praxis ist diese Kategorie deshalb zweideutig: teils Ergänzung außerhalb ' +
        'der Öffnungszeiten, teils Wettbewerb um den Erstkontakt. Die Übersicht bewertet das ' +
        'nicht, benennt aber den Unterschied.',
    ],
    abschnitte: [
      {
        h2: 'Wer hier der Kunde ist',
        absaetze: [
          'Offene Videosprechstunden verkaufen an Tierhalter, nicht an Praxen. Der Zugang läuft ' +
            'über eine App oder eine Website, das Team gehört dem Anbieter, und die Praxis ist am ' +
            'Vorgang nicht beteiligt – es sei denn, der Fall wird an sie weitergereicht.',
          'Ein Teil dieses Markts entsteht inzwischen an einer Stelle, die man nicht sofort dort ' +
            'sucht: bei Tierversicherungen, die eine Videosprechstunde als Leistungsbestandteil ' +
            'mitliefern. Funktional ist das dasselbe Angebot, verkauft wird es über den ' +
            'Versicherungsvertrag. Mit der Agria Tierversicherung steht seit Oktober 2026 ein erster ' +
            'solcher Versicherer in der Übersicht; weitere Versicherer sind noch nicht geprüft.',
        ],
      },
      {
        h2: 'Was eine Videosprechstunde leisten kann und was nicht',
        absaetze: [
          'Per Video lässt sich einordnen, beraten und beruhigen. Abtasten, Temperatur messen, ' +
            'Blut abnehmen und bildgebende Diagnostik gehen nicht. Der häufigste ehrliche Ausgang ' +
            'eines Videotermins ist deshalb eine Einschätzung, wie dringend ein Praxisbesuch ist – ' +
            'und das ist ein echter Nutzen, gerade nachts.',
          'Was tierärztlich per Video zulässig ist – insbesondere Diagnosestellung, Verschreibung ' +
            'und Arzneimittelabgabe – ist eine Rechtsfrage und wird hier bewusst nicht beantwortet. ' +
            'Zuständig sind die Tierärztekammern und die geltenden Vorschriften.',
        ],
      },
      {
        h2: 'Offene Plattform und praxiseigene Sprechstunde im Vergleich',
        absaetze: [
          'Technisch sehen beide gleich aus: ein Bildschirm, eine Kamera, ein Gespräch. Der ' +
            'Unterschied liegt darin, wem der Kontakt gehört. Bei einer offenen Plattform ist der ' +
            'Tierhalter Kunde des Anbieters. Er bucht dort, bezahlt dort und kommt beim nächsten ' +
            'Mal vermutlich wieder dorthin. Bei einer praxiseigenen Videosprechstunde bleibt die ' +
            'Beziehung bei der Praxis, die das Tier ohnehin betreut.',
          'Ebenso unterschiedlich ist, wo die Dokumentation liegt. Die Plattform führt eigene ' +
            'Aufzeichnungen in ihrem System. Die Haustierarztpraxis sieht davon nur, was der ' +
            'Tierhalter weitergibt oder was der Anbieter auf Wunsch übermittelt. Umgekehrt kennt die ' +
            'Tierärztin auf der Plattform in der Regel weder Vorbefunde noch Medikation – sie ' +
            'arbeitet mit dem, was ihr im Gespräch erzählt wird.',
        ],
      },
      {
        h2: 'Wann trotzdem eine Untersuchung nötig ist',
        absaetze: [
          'Allgemein gilt: Sobald ein Befund nur durch Anfassen, Abhören, Messen oder Bildgebung zu ' +
            'erheben ist, führt der Weg in eine Praxis. Dazu gehören Lahmheiten, deren Ursache ' +
            'unklar ist, Atemprobleme, Bauchschmerzen, Fieber und alles, was sich innerhalb weniger ' +
            'Stunden verschlechtert. Eine Videoberatung kann solche Fälle früher in die Praxis ' +
            'bringen, aber nicht abschließen.',
          'Für die weiterbehandelnde Praxis heißt das: Ein Tier, das nach einer Online-Beratung ' +
            'kommt, bringt eine Einschätzung mit, aber keinen Befund. Die Anamnese beginnt trotzdem ' +
            'von vorn, auch wenn der Tierhalter das Gefühl hat, alles schon erzählt zu haben.',
        ],
      },
      {
        h2: 'Was die Kategorie für eine Praxis bedeutet',
        absaetze: [
          'Für eine Praxis gibt es drei Haltungen zu diesem Markt. Sie kann ihn ignorieren, weil ihre ' +
            'Kundschaft ihn kaum nutzt. Sie kann eine eigene Videosprechstunde anbieten, damit ' +
            'Bestandskunden nicht zu einer Plattform ausweichen. Oder sie kann gezielt mit einer ' +
            'Plattform zusammenarbeiten, etwa als Anlaufstelle vor Ort.',
          'Welche Haltung passt, hängt davon ab, wie oft Tierhalter außerhalb der Öffnungszeiten ' +
            'anrufen und wie gut die Praxis selbst erreichbar ist. Das lässt sich am eigenen ' +
            'Anrufaufkommen besser ablesen als an jeder Marktbeschreibung.',
        ],
      },
    ],
    worauf: [
      'Wer behandelt: ein eigenes Team des Anbieters oder die Praxis des Tierhalters?',
      'Was geschieht mit dem Fall, wenn ein Praxisbesuch nötig wird – gibt es eine Übergabe?',
      'Bekommt die weiterbehandelnde Praxis eine Dokumentation des Videotermins?',
      'Wie wird abgerechnet, und wer trägt die Kosten – Tierhalter, Versicherung oder Praxis?',
      'Ist das Angebot rund um die Uhr besetzt oder nur zu Geschäftszeiten?',
    ],
    abgrenzung: [
      {
        kategorie: 8,
        grund:
          'Derselbe technische Vorgang, gegenteiliges Geschäftsmodell. Wer eigene Kunden per Video ' +
          'beraten will, ist dort richtig.',
      },
      {
        kategorie: 9,
        grund:
          'Ein Videotermin ohne Verbindung zur Akte des Tieres bleibt eine Einzelauskunft.',
      },
      {
        kategorie: 1,
        grund:
          'Für viele Tierhalter ist die offene Videosprechstunde der erste Kontakt überhaupt – ' +
          'damit ist sie auch ein Sichtbarkeitsthema.',
      },
    ],
    begriffe: ['videosprechstunde', 'patientenportal'],
    grenzen:
      'Keine Rechtsauskunft zur Fernbehandlung, keine Aussage zur medizinischen Qualität einzelner ' +
      'Anbieter und keine Preise. Diese Übersicht richtet sich an Praxen, nicht an Tierhalter auf ' +
      'der Suche nach einer Beratung.',
  },

  /* ------------------------------------------------------------------ 8 */
  {
    kategorie: 8,
    slug: 'praxiseigene-videosprechstunde',
    frageAnbieter: 'Welche Anbieter gibt es für eine praxiseigene Videosprechstunde?',
    frageBegriff: 'Was ist eine praxiseigene Videosprechstunde?',
    fragen: [
      {
        frage: 'Welche Ausstattung braucht die Praxis?',
        antwort:
          'Meist reichen ein Rechner mit Kamera, ein Headset und ein ruhiger Raum. Wichtiger als ' +
          'die Technik ist ein fester Platz, an dem der Empfang nicht mithört und an dem die Akte ' +
          'auf demselben Bildschirm offen sein kann.',
      },
      {
        frage: 'Wie bereiten Tierhalter einen Videotermin vor?',
        antwort:
          'Mit gutem Licht, einer zweiten Person, die das Tier hält, und Fotos oder kurzen Videos ' +
          'vorab – etwa vom Gangbild oder von einer Wunde. Eine kurze Anleitung mit der ' +
          'Terminbestätigung spart im Gespräch die ersten Minuten.',
      },
      {
        frage: 'Wie führt eine Praxis Videotermine im Team ein?',
        antwort:
          'Mit wenigen, klar benannten Anlässen, etwa Nachkontrollen nach Operationen, und einer ' +
          'Person, die die ersten Termine begleitet. Wer mit allen Anlässen zugleich startet, ' +
          'erkennt schwer, wo es hakt.',
      },
    ],
    h1: 'Praxiseigene Videosprechstunde: eigene Patienten per Video betreuen',
    titleTag: 'Videosprechstunde für die eigene Tierarztpraxis',
    description:
      'Wie eine Tierarztpraxis ihren eigenen Kunden Videotermine anbietet: Abgrenzung zu ' +
      'offenen Plattformen, Auswahlkriterien und Anbieter im DACH-Raum.',
    definition:
      'Eine praxiseigene Videosprechstunde ist ein Videotermin, den eine Tierarztpraxis ihren eigenen Patienten anbietet – mit dem eigenen Team und mit Zugriff auf die eigene Akte.',
    lead: [
      'Die Praxis berät ihre eigenen Patienten per Video, unter ihrem Namen und auf Basis der ' +
        'vorhandenen Akte. Das ist der entscheidende Unterschied zu offenen Plattformen: Hier ' +
        'kennt man das Tier bereits.',
      'Typische Anlässe sind Nachkontrollen, Wundbeurteilung, Verlaufsgespräche bei chronischen ' +
        'Erkrankungen und die Frage, ob ein Besuch überhaupt nötig ist. Für all das ist die ' +
        'Vorgeschichte der eigentliche Vorteil.',
    ],
    abschnitte: [
      {
        h2: 'Warum die Vorgeschichte den Unterschied macht',
        absaetze: [
          'Eine Nachkontrolle per Video funktioniert, weil bekannt ist, was zwei Wochen vorher war. ' +
            'Dieselbe Beratung ohne Akte wäre eine allgemeine Einschätzung. Der Wert liegt also ' +
            'nicht in der Videotechnik – die ist austauschbar – sondern in der Verbindung zur ' +
            'Patientenakte.',
          'Daraus folgt ein klares Auswahlkriterium: Eine Lösung, die neben der Praxissoftware ' +
            'steht und nichts von ihr weiß, liefert genau den Teil nicht, der den Unterschied ' +
            'ausmacht.',
        ],
      },
      {
        h2: 'Der Ablauf drumherum ist das eigentliche Produkt',
        absaetze: [
          'Ein Videotermin besteht aus mehr als einem Gespräch: Buchung, Bezahlung, Erinnerung, ' +
            'Wartebereich, Dokumentation, Rechnung. Lösungen unterscheiden sich vor allem darin, ' +
            'wie viel davon sie mitbringen und wie viel die Praxis von Hand ergänzt.',
          'Besonders zu prüfen ist der Zugang für den Tierhalter. Alles, was eine Installation, ' +
            'ein Konto oder ein Passwort verlangt, kostet Termine – gerade bei älteren ' +
            'Tierhaltern. Ein Link, der im Browser funktioniert, ist der verlässlichste Weg.',
        ],
      },
      {
        h2: 'Die Beziehung bleibt in der eigenen Praxis',
        absaetze: [
          'Bietet eine Praxis selbst keine Videotermine an, weichen manche Tierhalter für schnelle ' +
            'Fragen auf offene Plattformen aus. Dort berät ein fremdes Team ohne Kenntnis der Akte, ' +
            'und die Praxis erfährt davon oft erst, wenn das Tier doch vorgestellt wird. Eine ' +
            'eigene Videosprechstunde hält diese Fragen im Haus: Die Beratung kommt von Menschen, ' +
            'die das Tier kennen, und sie schließt an die bisherige Behandlung an.',
          'Das heißt nicht, dass jede Praxis Videotermine braucht. Es heißt, dass die Entscheidung ' +
            'dagegen eine Folge hat, die im Kalender nicht auftaucht.',
        ],
      },
      {
        h2: 'Wann aus dem Videotermin ein Praxisbesuch wird',
        absaetze: [
          'Ein Videotermin ersetzt keine Untersuchung. Sobald etwas abgetastet, abgehört, gemessen ' +
            'oder bildgebend dargestellt werden muss, braucht es den Termin vor Ort. Das gilt auch, ' +
            'wenn sich ein bekanntes Krankheitsbild anders entwickelt als erwartet.',
          'Hilfreich ist, die Grenze vorher im Team festzulegen statt im Gespräch zu entscheiden: ' +
            'Welche Anlässe sind für Video vorgesehen, und bei welchen Anzeichen wird jedenfalls ein ' +
            'Praxistermin vereinbart? Wer das schriftlich hat, entscheidet einheitlich – egal, wer ' +
            'gerade vor der Kamera sitzt. Und der Tierhalter bekommt den Folgetermin möglichst noch ' +
            'im selben Gespräch, nicht mit dem Hinweis, er möge anrufen.',
          'Was rechtlich per Video zulässig ist, beantworten die Tierärztekammern und die geltenden ' +
            'Vorschriften; diese Übersicht gibt dazu keine Auskunft.',
        ],
      },
      {
        h2: 'Wo der Videotermin dokumentiert wird',
        absaetze: [
          'Ein Videotermin gehört in dieselbe Akte wie jeder andere Termin – mit Anlass, ' +
            'Einschätzung, Empfehlung und der Information, dass die Beurteilung per Video erfolgte. ' +
            'Gerade dieser letzte Punkt ist wichtig, wenn später jemand nachvollziehen will, auf ' +
            'welcher Grundlage entschieden wurde.',
          'Fotos und kurze Videos, die der Tierhalter vorab oder im Gespräch schickt, sind Teil der ' +
            'Vorgeschichte. Sie sollten in der Patientenakte liegen, nicht im Postfach einer ' +
            'Mitarbeiterin oder auf einem Diensthandy. Ob das Gespräch selbst aufgezeichnet wird, ' +
            'ist eine eigene Entscheidung mit Datenschutzfolgen und sollte nicht stillschweigend ' +
            'durch die Voreinstellung einer Software getroffen werden.',
        ],
      },
      {
        h2: 'Abrechnung',
        absaetze: [
          'Ob und wie ein Videotermin abgerechnet wird, ist eine gebührenrechtliche Frage und ' +
            'gehört mit der zuständigen Tierärztekammer oder einer fachkundigen Beratung geklärt – ' +
            'nicht mit dem Softwareanbieter. Diese Übersicht trifft dazu keine Aussage.',
          'Technisch relevant bleibt: Erzeugt das System eine abrechenbare Leistung in der ' +
            'Praxissoftware, oder entsteht ein Vorgang, den jemand nachträgt?',
        ],
      },
    ],
    worauf: [
      'Greift die Lösung auf die Patientenakte zu, oder läuft sie daneben?',
      'Was muss der Tierhalter installieren? Je weniger, desto weniger Ausfälle.',
      'Sind Buchung, Bezahlung und Erinnerung enthalten oder getrennt einzukaufen?',
      'Entsteht aus dem Termin automatisch ein Eintrag und eine abrechenbare Leistung?',
      'Wo läuft die Videoverbindung, und liegt ein Auftragsverarbeitungsvertrag vor?',
      'Was passiert, wenn die Verbindung abbricht – gibt es einen definierten Rückfallweg?',
    ],
    abgrenzung: [
      {
        kategorie: 7,
        grund:
          'Die Gegenrichtung: Plattformen mit eigenem Team, an die sich Tierhalter ohne ihre ' +
          'Praxis wenden.',
      },
      {
        kategorie: 6,
        grund:
          'Die Verbindung zur Patientenakte entscheidet über den Nutzen – und die hängt an der ' +
          'Praxissoftware.',
      },
      {
        kategorie: 2,
        grund:
          'Ein Videotermin ist ein Termin. Buchung und Erinnerung sind dieselbe Aufgabe wie vor ' +
          'Ort.',
      },
    ],
    begriffe: ['videosprechstunde', 'pims', 'schnittstelle'],
    grenzen:
      'Keine Rechts- oder Gebührenauskunft und keine Empfehlung. Ob eine Videosprechstunde für ' +
      'eine bestimmte Praxis trägt, hängt von Patientengut und Arbeitsweise ab.',
  },

  /* ------------------------------------------------------------------ 9 */
  {
    kategorie: 9,
    slug: 'tierhalter-app',
    frageAnbieter: 'Welche Tierhalter-Apps und Patientenportale gibt es?',
    frageBegriff: 'Was ist eine Tierhalter-App oder ein Patientenportal?',
    fragen: [
      {
        frage: 'Wie kommen Tierhalter zum ersten Mal ins Portal?',
        antwort:
          'Über einen Anlass: Der Zugang wird beim Termin eingerichtet oder kommt mit der nächsten ' +
          'Impferinnerung. Ein Aushang im Wartezimmer bewegt wenig; mehr bewegt etwas, das im Portal ' +
          'sofort sichtbar ist und sonst einen Anruf kosten würde.',
      },
      {
        frage: 'Sollten Laborbefunde sofort im Portal erscheinen?',
        antwort:
          'Nicht unbedingt. Ein auffälliger Wert, den ein Tierhalter abends allein liest, erzeugt ' +
          'Sorge und Anrufe. Gangbar sind eine Freigabe durch die Tierärztin oder eine Freischaltung ' +
          'nach dem Befundgespräch – das System sollte beides zulassen.',
      },
      {
        frage: 'Was ist mit Tierhaltern, die kein Smartphone nutzen?',
        antwort:
          'Für sie bleiben Telefon, E-Mail und Papier. Ein Portal ist ein zusätzlicher Weg; Abläufe, ' +
          'die nur noch digital funktionieren, schließen einen Teil der Kundschaft aus.',
      },
    ],
    h1: 'Tierhalter-App und Patientenportal: der digitale Draht zum Kunden',
    titleTag: 'Tierhalter-App und Patientenportal für Tierarztpraxen',
    description:
      'Was ein Patientenportal für Tierarztpraxen leistet, worin es sich von einer Tierhalter-App ' +
      'unterscheidet und welche Anbieter es im DACH-Raum gibt.',
    definition:
      'Eine Tierhalter-App oder ein Patientenportal ist der digitale Zugang des Tierhalters zu seiner Praxis: Termine, Impfungen, Befunde, Rechnungen und Nachrichten an einem Ort.',
    lead: [
      'Ein Portal oder eine App gibt dem Tierhalter einen eigenen Zugang: Impfungen, Befunde, ' +
        'Rechnungen, Termine, Nachrichten. Für die Praxis ist es vor allem eine Entlastung des ' +
        'Telefons: Viele Anrufe sind Auskünfte, keine Beratung – eine Erfahrung aus dem ' +
        'Praxisalltag, keine gemessene Zahl.',
      'Das Wort „App" ist in diesem Markt allerdings unbrauchbar geworden: Es bezeichnet ebenso ' +
        'Endkundenangebote ohne jeden Praxisbezug. Die Kategorie meint ausdrücklich den Kanal ' +
        'zwischen Praxis und Tierhalter.',
    ],
    abschnitte: [
      {
        h2: 'Portal oder App – und warum die Antwort meist „Portal" lautet',
        absaetze: [
          'Ein Portal läuft im Browser, eine App muss installiert werden. Die Installationshürde ' +
            'ist der teuerste Teil: Wer für eine Impferinnerung eine App herunterladen und ein ' +
            'Konto anlegen soll, tut es nicht. Für eine einzelne Praxis mit ein paar tausend ' +
            'Kunden rechnet sich eine eigene App selten.',
          'Umgekehrt kann eine App mehr: Push-Nachrichten, Offline-Zugriff auf den Impfpass, ' +
            'Kamerafunktionen für Fotos. Ob das den Aufwand wert ist, hängt davon ab, wie oft ' +
            'Tierhalter tatsächlich hineinsehen.',
        ],
      },
      {
        h2: 'Wem gehört der Kanal?',
        absaetze: [
          'Das ist die strategische Frage hinter der Kategorie. Läuft die Kommunikation über ein ' +
            'Portal, das die Praxis kontrolliert, gehört die Beziehung der Praxis. Läuft sie über ' +
            'eine Plattform, die viele Praxen bündelt, ist sie bequemer eingerichtet – aber der ' +
            'Zugang zum Tierhalter liegt dann beim Plattformbetreiber.',
          'Beides kann richtig sein. Falsch ist nur, die Frage nicht zu stellen und sie später ' +
            'beim Anbieterwechsel beantwortet zu bekommen.',
        ],
      },
      {
        h2: 'Was tatsächlich benutzt wird',
        absaetze: [
          'Erfahrungsgemäß sind es wenige Funktionen, die ein Portal tragen: der Impfpass, offene ' +
            'Rechnungen, der nächste Termin und ein Nachrichtenkanal. Alles Weitere ist Zugabe.',
          'Ein Portal ohne Inhalt wird nicht genutzt. Wenn Befunde nicht automatisch aus der ' +
            'Praxissoftware erscheinen, sondern jemand sie hochladen muss, passiert es nach ' +
            'wenigen Wochen nicht mehr.',
        ],
      },
    ],
    worauf: [
      'Erscheinen Befunde, Impfungen und Rechnungen automatisch aus der Praxissoftware – oder muss jemand hochladen?',
      'Browser oder Installation? Jede Hürde kostet Nutzung.',
      'Wem gehört die Kundenbeziehung, und was passiert mit den Zugängen bei einem Anbieterwechsel?',
      'Können Tierhalter zurückschreiben, und wo landet die Nachricht – im Portal oder im E-Mail-Postfach des Empfangs?',
      'Gibt es einen Auftragsverarbeitungsvertrag, und wo liegen die Daten?',
      'Lassen sich die Daten exportieren, wenn die Praxis den Anbieter wechselt?',
    ],
    abgrenzung: [
      {
        kategorie: 2,
        grund:
          'Die meistgenutzte Portalfunktion ist der Termin. Wer beides trennt, betreibt zwei ' +
          'Zugänge für denselben Zweck.',
      },
      {
        kategorie: 6,
        grund:
          'Ein Portal ist nur so gut wie das, was automatisch aus der Praxissoftware hineinfließt.',
      },
      {
        kategorie: 8,
        grund:
          'Der Videotermin ist die natürliche Erweiterung eines Portals, in dem die Akte ohnehin ' +
          'schon liegt.',
      },
    ],
    begriffe: ['patientenportal', 'recall', 'pims', 'schnittstelle'],
    grenzen:
      'Keine Nutzungszahlen, keine Preise und keine Aussage darüber, ab welcher Praxisgröße sich ' +
      'ein Portal rechnet. Das hängt an Kundenstamm und Anrufaufkommen.',
  },

  /* ----------------------------------------------------------------- 10 */
  {
    kategorie: 10,
    slug: 'tieraerzte-suchmaschinen',
    frageAnbieter: 'Welche Portale gibt es, um einen Tierarzt zu finden?',
    frageBegriff: 'Was sind Tierärzte-Suchmaschinen?',
    fragen: [
      {
        frage: 'Kann eine Praxis ihren Eintrag in einem Portal löschen lassen?',
        antwort:
          'Das hängt vom Portal ab und ist rechtlich nicht einfach zu beantworten. Erreichbarer ist ' +
          'meist die Korrektur – ein gelöschter Eintrag kann zudem aus einer öffentlichen Quelle ' +
          'zurückkommen, dann wieder ungeprüft.',
      },
      {
        frage: 'Was ist nach einer Praxisübernahme oder einem Umzug zu tun?',
        antwort:
          'Bestehende Einträge umstellen statt neue anzulegen, damit Bewertungen und Verweise ' +
          'erhalten bleiben und keine Dubletten entstehen. Eine Liste der Portale mit Zugängen spart ' +
          'beim nächsten Mal die Suche.',
      },
      {
        frage: 'Wer in der Praxis sollte die Einträge pflegen?',
        antwort:
          'Eine benannte Person, nicht „der Empfang“ allgemein. Sie verwahrt die verbindliche ' +
          'Schreibweise und die Zugänge und erfährt Änderungen an Zeiten oder Nummern zur selben ' +
          'Zeit wie die Website.',
      },
    ],
    h1: 'Tierärzte-Suchmaschinen: Wo Tierhalter nach einer Praxis suchen',
    titleTag: 'Tierarzt finden: Suchportale und Verzeichnisse im DACH-Raum',
    description:
      'Welche Tierarzt-Suchportale es in Deutschland, Österreich und der Schweiz gibt – und was ' +
      'eine Praxis mit ihren oft veralteten Einträgen tun sollte.',
    definition:
      'Tierärzte-Suchmaschinen sind Portale und Verzeichnisse, in denen Tierhalter nach Ort, Fachrichtung oder Notdienst eine Tierarztpraxis suchen.',
    lead: [
      '{Anzahl} Portale, die meisten nur für Deutschland. Österreich hat eigene Portale, in ' +
        'der Schweiz ist die Suche des Berufsverbands GST das einzige eigene Verzeichnis. Dazu ' +
        'kommt für Deutschland die Suche des bpt. TASSO nimmt Praxen aus allen drei Ländern in ' +
        'seine Tierarztsuche auf.',
      'Für eine Praxis heißt das: Sie steht in mehreren dieser Portale, ob sie will oder nicht. ' +
        'Die Einträge stammen meist aus öffentlichen Quellen und wurden oft nie von der Praxis ' +
        'geprüft – und genau dort liegt die Arbeit.',
    ],
    abschnitte: [
      {
        h2: 'Warum die Kategorie von der Sichtbarkeit getrennt ist',
        absaetze: [
          'Eine Sichtbarkeitslösung ist etwas, das eine Praxis einsetzt. Eine Suchmaschine ist ' +
            'der Ort, an dem gesucht wird – sie existiert unabhängig davon, ob die Praxis sie ' +
            'kennt. Das ist ein Unterschied in der Richtung, nicht im Thema.',
          'Praktisch folgt daraus die wichtigste Erkenntnis dieser Kategorie: Hier gibt es nichts ' +
            'zu kaufen und nichts einzuführen. Es gibt etwas zu korrigieren.',
        ],
      },
      {
        h2: 'Die Einträge sind da – und oft falsch',
        absaetze: [
          'Die Portale nennen nach eigener Angabe teils fünfstellige Praxiszahlen, die Tabelle unten ' +
            'führt sie einzeln auf. Mengen dieser Größe entstehen erkennbar nicht ' +
            'dadurch, dass sich alle angemeldet haben, sondern durch Übernahme aus öffentlichen ' +
            'Quellen. Entsprechend häufig stehen dort alte Öffnungszeiten, überholte ' +
            'Telefonnummern, Vorgängernamen nach einer Übernahme oder Adressen, die seit einem ' +
            'Umzug nicht mehr stimmen.',
          'Das trifft ausgerechnet den Moment, in dem es am meisten zählt: Wer nachts nach einem ' +
            'Notdienst sucht, ruft die Nummer an, die dort steht. Ein falscher Eintrag ist in dem ' +
            'Moment schlimmer als kein Eintrag.',
        ],
      },
      {
        h2: 'Einheitliche Angaben schlagen viele Einträge',
        absaetze: [
          'Name, Adresse und Telefonnummer sollten in allen Portalen exakt gleich geschrieben ' +
            'sein – bis zur Rechtsform und zur Schreibweise der Straße. Suchmaschinen gleichen ' +
            'diese Angaben untereinander ab; uneinheitliche Varianten werden als verschiedene ' +
            'Betriebe behandelt und schwächen sich gegenseitig.',
          'Der lohnendste Arbeitsschritt ist deshalb unspektakulär: einmal eine verbindliche ' +
            'Schreibweise festlegen, aufschreiben, und dann alle Einträge darauf ziehen. Das ist ' +
            'in ein bis zwei Stunden erledigt und wirkt länger als jede Kampagne.',
        ],
      },
      {
        h2: 'Kommerziell oder vom Verband',
        absaetze: [
          'Die Verbandssuchen von bpt und GST listen Mitgliedspraxen. Ihre Daten sind in der ' +
            'Regel gepflegter, weil sie aus der Mitgliederverwaltung stammen, dafür ist die ' +
            'Abdeckung auf Mitglieder beschränkt. Die kommerziellen Portale decken mehr ab, ' +
            'finanzieren sich aber über Werbung oder hervorgehobene Einträge.',
          'Beides hat seine Berechtigung, und für die Praxis ist die Frage nicht, welches Modell ' +
            'besser ist, sondern in welchen Portalen die eigenen Tierhalter tatsächlich suchen. ' +
            'Das lässt sich am einfachsten herausfinden, indem man am Empfang danach fragt.',
        ],
      },
    ],
    worauf: [
      'In welchen der Portale steht die eigene Praxis schon? Einmal alle {anzahl} durchgehen und nachsehen.',
      'Stimmen Name, Adresse und Telefonnummer überall exakt – und exakt gleich?',
      'Sind Öffnungszeiten und Notdienstregelung aktuell? Das ist die Angabe, auf die es nachts ankommt.',
      'Lässt sich der Eintrag übernehmen oder korrigieren, und wie lange dauert das?',
      'Was kostet ein hervorgehobener Eintrag, und was bringt er nachweislich? Ohne Nachweis: erst die kostenlosen Einträge in Ordnung bringen.',
      'Steht dort eine veraltete Bewertung oder ein Vorgängername nach einer Übernahme?',
    ],
    abgrenzung: [
      {
        kategorie: 1,
        grund:
          'Die Gegenrichtung: Lösungen, die eine Praxis aktiv einsetzt, um sichtbar zu werden, ' +
          'statt Kanäle, in denen sie ohnehin vorkommt.',
      },
      {
        kategorie: 2,
        grund:
          'Ein gefundener Eintrag ist wertlos, wenn er nur zu einer Telefonnummer führt. Der Weg ' +
          'vom Fund zum Termin entscheidet.',
      },
      {
        kategorie: 9,
        grund:
          'Eine Suchmaschine bringt einen Tierhalter einmal. Gehalten wird er über einen eigenen ' +
          'Zugang zur Praxis.',
      },
    ],
    begriffe: [],
    grenzen:
      'Keine Reichweitenzahlen und keine Aussage darüber, welches Portal für eine bestimmte Praxis ' +
      'etwas bringt. Die genannten Mengen sind die Eigenangaben der Portale aus Titel oder ' +
      'Startseite – nicht nachgezählt und kein Qualitätsmerkmal.',
  },

  /* ----------------------------------------------------------------- 11 */
  {
    kategorie: 11,
    slug: 'klinisches-wissen',
    frageAnbieter: 'Welche Nachschlagewerke zu Tierarzneimitteln gibt es?',
    frageBegriff: 'Was sind klinische Wissens- und Arzneimitteldienste?',
    fragen: [
      {
        frage: 'Reicht die Packungsbeilage nicht aus?',
        antwort:
          'Für die zugelassene Anwendung oft schon. Bei einer anderen Tierart, einer Umwidmung oder ' +
          'einem Tier, das Lebensmittel liefert, nicht mehr – dann geht es um Regeln und ' +
          'Wartezeiten, die ein Beipackzettel nicht abdeckt.',
      },
      {
        frage: 'Wie hält man die Quelle einer Entscheidung in der Akte fest?',
        antwort:
          'Ein kurzer Vermerk genügt: Nachschlagewerk, Abrufdatum und die übernommene Angabe. Bei ' +
          'Umwidmungen ist das besonders sinnvoll, weil die Begründung später gefragt sein kann.',
      },
      {
        frage: 'Lässt sich ein Nachschlagewerk in die Praxissoftware einbinden?',
        antwort:
          'Das hängt an beiden Seiten. Ohne Anbindung hilft schon ein fester Platz in der ' +
          'Lesezeichenleiste am Behandlungsrechner – eine Suche, die drei Klicks entfernt ist, ' +
          'findet im Behandlungsraum seltener statt.',
      },
    ],
    h1: 'Klinisches Wissen und Arzneimittelinformation für die Tierarztpraxis',
    titleTag: 'Tierarzneimittel-Info und klinisches Wissen für Tierärzte',
    description:
      'Digitale Nachschlagewerke für Tierärzte im DACH-Raum zu Arzneimitteln und klinischen ' +
      'Fragen – und woran man eine belastbare Auskunft erkennt.',
    definition:
      'Klinische Wissens- und Arzneimitteldienste sind Nachschlagewerke für Tierärztinnen und Tierärzte – zu Zulassung, Dosierung, Wirkstoffen und Vergiftungen –, die während der Behandlung eine belastbare Antwort liefern.',
    lead: [
      '{Anzahl} Angebote mit sehr unterschiedlicher Herkunft: VETIDATA ist ein Informationsdienst ' +
        'der Universität Leipzig, das Tierarzneimittel-Kompendium der Schweiz kommt aus der ' +
        'Universität Zürich, PrimVeterinary ist eine englischsprachige Plattform aus den USA, die ' +
        'Antworten mit Literaturangaben erzeugt.',
      'Für die Praxis ist das selten ein Softwarekauf im üblichen Sinn. Es geht um die Frage, ' +
        'woher im Behandlungsalltag schnell eine Antwort kommt, auf die man sich verlassen kann – ' +
        'zur Zulassung, zur Dosierung, zur Anwendung bei einer Tierart, für die ein Präparat nicht ' +
        'zugelassen ist.',
    ],
    abschnitte: [
      {
        h2: 'Warum Arzneimittelinformation in der Tiermedizin eigene Werkzeuge braucht',
        absaetze: [
          'Ein Präparat ist für bestimmte Tierarten zugelassen, nicht für alle. Wer ein Tier einer ' +
            'anderen Art behandelt, braucht die Regeln für die Anwendung außerhalb der Zulassung – ' +
            'in der EU festgelegt in der Tierarzneimittelverordnung (EU) 2019/6, in der Schweiz in ' +
            'eigenem Recht. Bei Tieren, die Lebensmittel liefern, kommen Wartezeiten dazu.',
          'Diese Fragen hängen am Land. Eine Auskunft, die für Deutschland stimmt, muss es für die ' +
            'Schweiz nicht. Deshalb sind die nationalen Nachschlagewerke in dieser Kategorie so ' +
            'wichtig wie die internationalen.',
        ],
      },
      {
        h2: 'Universitätsdienst oder KI-Plattform',
        absaetze: [
          'Die beiden Universitätsangebote sind kuratierte Nachschlagewerke: Menschen pflegen den ' +
            'Bestand, und wer eine Frage hat, die dort nicht steht, findet bei beiden einen ' +
            'Beratungsdienst. Ihre Stärke ist die nationale Rechtslage.',
          'PrimVeterinary arbeitet anders. Die Plattform beantwortet Fragen in ganzen Sätzen und ' +
            'nennt die Quellen, aus denen die Antwort stammt. Das ist schnell – und verlangt, dass ' +
            'man die zitierten Stellen tatsächlich prüft, bevor eine Antwort in eine Behandlung ' +
            'eingeht. Zur Zulassungslage im DACH-Raum sagt eine internationale Plattform nichts.',
        ],
      },
      {
        h2: 'Wo das im Praxisalltag hilft',
        absaetze: [
          'Am meisten bei seltenen Fragen: der exotische Patient, das Präparat, das man selten ' +
            'einsetzt, die Vergiftung, bei der jede Minute zählt. Dort ersetzt ein gutes ' +
            'Nachschlagewerk den Anruf bei einer Kollegin, die man um diese Uhrzeit nicht erreicht.',
          'Und bei der Dokumentation: Wer festhält, auf welche Quelle sich eine Entscheidung stützt, ' +
            'kann sie später begründen.',
        ],
      },
    ],
    worauf: [
      'Bezieht sich die Auskunft auf die Zulassungslage im eigenen Land?',
      'Wer pflegt die Inhalte, und wann wurden sie zuletzt aktualisiert?',
      'Werden Quellen genannt, die sich nachprüfen lassen?',
      'Bei KI-erzeugten Antworten: Lässt sich jede Aussage auf eine zitierte Stelle zurückführen?',
      'Gibt es einen Beratungsdienst für Fälle, die das Nachschlagewerk nicht abdeckt?',
      'Wie ist der Zugang geregelt – Berufsnachweis, Lizenz je Person oder je Praxis?',
    ],
    abgrenzung: [
      {
        kategorie: 4,
        grund:
          'Dieselbe Technik, eine andere Aufgabe: KI-Assistenten, die dokumentieren, statt ' +
          'nachzuschlagen.',
      },
      {
        kategorie: 5,
        grund:
          'Fachmedien berichten über Neues. Ein Nachschlagewerk beantwortet eine konkrete Frage am ' +
          'Patienten.',
      },
      {
        kategorie: 6,
        grund:
          'Arzneimittel und Lager laufen in der Praxissoftware zusammen – dort beginnt die Frage ' +
          'nach der Schnittstelle zum Nachschlagewerk.',
      },
    ],
    begriffe: [],
    grenzen:
      'Keine Bewertung der fachlichen Qualität der Inhalte und keine Empfehlung im Einzelfall. Ob ' +
      'eine Auskunft eine Behandlung trägt, entscheidet die behandelnde Tierärztin oder der ' +
      'behandelnde Tierarzt.',
  },

  /* ----------------------------------------------------------------- 12 */
  {
    kategorie: 12,
    slug: 'heimtierregister',
    vergleich: {
      titel: 'Die Register im Vergleich',
      kopf: ['Register', 'Land', 'Betreiber', 'Für', 'Eintrag'],
      zeilen: [
        ['AMICUS', 'Schweiz', 'Identitas AG im Auftrag der Kantone', 'Hunde', 'vorgeschrieben'],
        ['ANIS', 'Schweiz', 'Identitas AG', 'sämtliche Heimtiere, vorwiegend Katzen', 'keine Angabe zur Pflicht auf anis.ch'],
        ['FINDEFIX', 'Deutschland', 'Deutscher Tierschutzbund', 'Haustiere', 'freiwillig, kostenlos'],
        ['Heimtierdatenbank', 'Österreich', 'Gesundheitsministerium (amtlich)', 'Hunde', 'für Hunde vorgeschrieben'],
        ['TASSO', 'Deutschland, Österreich, Schweiz', 'TASSO e.V.', 'Haustiere', 'freiwillig, kostenfrei'],
      ],
      quelle:
        'Angaben der Register auf amicus.ch, anis.ch, findefix.com, heimtierdatenbank.ehealth.gv.at ' +
        'und tasso.net, geprüft am 05.11. und 25.11.2026. In Deutschland gibt es keine bundesweite Pflicht.',
    },
    frageAnbieter: 'Welche Haustierregister gibt es im DACH-Raum?',
    frageBegriff: 'Was ist ein Heimtierregister?',
    fragen: [
      {
        frage: 'Was unterscheidet den Heimtierausweis von der Registrierung?',
        antwort:
          'Der EU-Heimtierausweis dokumentiert Chipnummer und Impfungen, etwa für Reisen, und liegt ' +
          'beim Halter. Ein Register ist die Datenbank, in der ein Finder die Nummer nachschlagen ' +
          'kann. Ein Tier kann einen Ausweis haben und trotzdem nirgends registriert sein.',
      },
      {
        frage: 'Lohnt sich in Deutschland ein Eintrag in mehreren Registern?',
        antwort:
          'Er kann sinnvoll sein, weil nicht jeder Finder und nicht jedes Tierheim in jedem Register ' +
          'sucht. Wichtiger als die Zahl der Einträge ist, dass jeder davon nach Umzug oder ' +
          'Halterwechsel aktualisiert wird.',
      },
      {
        frage: 'Was tun, wenn eine Chipnummer in den bekannten Registern fehlt?',
        antwort:
          'Die ersten drei Ziffern nennen nach ISO 11784 einen Ländercode oder einen Herstellercode – ' +
          'daraus ergibt sich, wo weitergesucht wird. Bleibt die Suche erfolglos, ist das Fundtier ' +
          'ein Fall für die örtliche Fundbehörde oder das Tierheim.',
      },
    ],
    h1: 'Heimtierregister: Wie ein Fundtier über den Chip nach Hause kommt',
    titleTag: 'Haustierregister und Heimtierregister in DE, AT und CH',
    description:
      'Welche Haustierregister es für gechippte Hunde und Katzen im DACH-Raum gibt, was amtlich ' +
      'und was freiwillig ist – und welche Rolle die Praxis spielt.',
    definition:
      'Ein Heimtierregister, oft auch Haustierregister genannt, ist eine Datenbank, die die Chipnummer eines Tieres mit seinem Halter verknüpft, damit ein entlaufenes oder gefundenes Tier zurückgegeben werden kann.',
    lead: [
      'Ein Chip allein bringt kein Tier nach Hause. Erst der Eintrag in einem Register verbindet ' +
        'die Chipnummer mit einem Menschen. In Österreich und der Schweiz ist dieser Eintrag für ' +
        'Hunde vorgeschrieben und läuft über amtliche Datenbanken; in Deutschland gibt es keine ' +
        'bundesweite Pflicht, dafür kostenfreie Register von Tierschutzorganisationen.',
      'Die Praxis ist der Ort, an dem beides zusammenkommt: Sie setzt den Chip, sie meldet ihn – ' +
        'und sie liest ihn aus, wenn jemand ein Fundtier bringt.',
    ],
    abschnitte: [
      {
        h2: 'Amtlich oder freiwillig',
        absaetze: [
          'Österreich führt eine amtliche Heimtierdatenbank des Gesundheitsministeriums. In der ' +
            'Schweiz werden Hunde in AMICUS registriert, im Auftrag der Kantone; für Katzen und ' +
            'andere Heimtiere gibt es ANIS. Beide betreibt die Identitas AG.',
          'In Deutschland sind die großen Register privat und für Halter kostenfrei: TASSO, ein ' +
            'eingetragener Verein, und FINDEFIX, das Register des Deutschen Tierschutzbundes, das ' +
            'früher „Deutsches Haustierregister“ hieß. ' +
            'Ein gechipptes Tier ist dort erst dann auffindbar, wenn jemand es angemeldet hat.',
        ],
      },
      {
        h2: 'Was die Praxis damit zu tun hat',
        absaetze: [
          'Nach dem Chippen fehlt oft genau ein Schritt: die Registrierung. Manche Register lassen ' +
            'sich direkt aus der Praxissoftware bedienen – FINDEFIX nennt Schnittstellen zu ' +
            'easyVET, Vetera, VETINF und Animana, TASSO eine eigene Schnittstelle. Dann wird aus ' +
            'der Patientenakte gemeldet, ohne dass jemand die Chipnummer abtippt.',
          'Der zweite Moment ist das Fundtier. Die Praxis liest den Chip aus und fragt die Nummer ' +
            'ab. Wer weiß, in welchen Registern er suchen muss, spart in diesem Moment die Zeit, ' +
            'die für das Tier und seine Familie zählt.',
        ],
      },
      {
        h2: 'Warum das in eine Übersicht digitaler Praxislösungen gehört',
        absaetze: [
          'Die Kategorie kam aus einem Kommentar: Der Moment des entlaufenen oder gefundenen Tiers ' +
            'kam in keinem Feld der Übersicht vor. Dabei ist er digital, er findet in der Praxis ' +
            'statt, und ob er gut ausgeht, hängt an einem Datensatz, den die Praxis anlegt.',
        ],
      },
    ],
    worauf: [
      'Gibt es aus der eigenen Praxissoftware eine Schnittstelle zu einem Register, damit nach dem Chippen nichts abgetippt werden muss?',
      'Erfährt der Halter beim Chippen, dass die Registrierung ein eigener Schritt ist – und wer ihn übernimmt?',
      'In welchem Register wird gemeldet, und wer aktualisiert den Eintrag nach Umzug oder Halterwechsel?',
      'Wie fragt das Team eine Chipnummer bei einem Fundtier ab, und wer benachrichtigt den Halter?',
      'Bei Tieren aus einem anderen Land: Welches Register führt diesen Chip?',
    ],
    abgrenzung: [
      {
        kategorie: 6,
        grund:
          'Ob aus der Patientenakte heraus registriert werden kann, entscheidet die Praxissoftware ' +
          'mit ihren Schnittstellen.',
      },
      {
        kategorie: 9,
        grund:
          'Ein Register verbindet Tier und Halter für den Notfall. Den laufenden Kontakt zwischen ' +
          'Praxis und Halter tragen Apps und Portale.',
      },
      {
        kategorie: 10,
        grund:
          'Die Gegenrichtung: Dort sucht der Halter die Praxis, hier sucht die Praxis den Halter. ' +
          'TASSO betreibt beides.',
      },
    ],
    begriffe: [],
    grenzen:
      'Keine Rechtsberatung zu Kennzeichnungs- und Meldepflichten. Die Regeln unterscheiden sich ' +
      'nach Land und Tierart, in Deutschland teils nach Bundesland. Kosten stehen hier nur, wo die ' +
      'Register sie selbst nennen.',
  },

  /* ----------------------------------------------------------------- 13 */
  {
    kategorie: 13,
    slug: 'praxismarketing',
    frageAnbieter: 'Welche Marketing-Agenturen und Beratungen gibt es für Tierarztpraxen?',
    frageBegriff: 'Was ist Praxismarketing für Tierarztpraxen?',
    h1: 'Praxismarketing und Beratung für Tierarztpraxen',
    titleTag: 'Praxismarketing für Tierarztpraxen – Agenturen, Beratung',
    description:
      'Was Agenturen und Beratungen für Tierarztpraxen leisten, welche es im DACH-Raum gibt und ' +
      'welche Fragen vor einem Auftrag geklärt sein sollten.',
    definition:
      'Praxismarketing ist alles, womit eine Tierarztpraxis bestimmt, wie Tierhalter und Bewerber sie wahrnehmen – von Positionierung und Erscheinungsbild über Website und Social Media bis zur Arbeitgebermarke.',
    lead: [
      'In dieser Kategorie stehen keine Werkzeuge, sondern Menschen: Agenturen, die Website und ' +
        'Social Media umsetzen, und Beratungen, die mit der Praxis klären, wofür sie stehen will. ' +
        'Beides wird oft in einem Atemzug genannt, ist aber nicht dasselbe.',
      'Viele Praxen suchen heute nicht in erster Linie Kunden, sondern Personal. Marketing für ' +
        'eine Tierarztpraxis richtet sich deshalb oft an zwei Zielgruppen: Tierhalter und Bewerber.',
    ],
    abschnitte: [
      {
        h2: 'Was in dieser Kategorie zusammengefasst ist',
        absaetze: [
          'Dienstleister, die Tierarztpraxen bei Positionierung, Erscheinungsbild, Website, Social ' +
            'Media, Anzeigen, Arbeitgebermarke oder Praxisentwicklung unterstützen – als Umsetzung, ' +
            'als Beratung oder als Coaching, bei dem das Team es selbst lernt.',
          'Nicht hier: Plattformen mit eigener Reichweite bei Tierhaltern. Sie stehen unter ' +
            'Digitale Sichtbarkeit, Verzeichnisse unter Tierärzte-Suchmaschinen. Eine Agentur hat ' +
            'keine eigene Reichweite – sie arbeitet mit den Kanälen, die es schon gibt.',
          categories.find((c) => c.id === 13)!.aufnahme!,
        ],
      },
      {
        h2: 'Umsetzen lassen, beraten lassen oder selbst lernen',
        absaetze: [
          'Eine Agentur liefert Ergebnisse: eine Website, ein Logo, eine Kampagne. Eine Beratung ' +
            'liefert Entscheidungen: Welche Leistungen sollen wachsen, welche Tierhalter will die ' +
            'Praxis erreichen, wie soll sie als Arbeitgeber wirken. Ein Coaching liefert Können: ' +
            'Das Team pflegt die Kanäle danach selbst.',
          'Welche Form passt, hängt davon ab, wer in der Praxis Zeit dafür hat. Ein Social-Media-' +
            'Auftritt, den niemand im Team weiterführt, endet mit dem Vertrag. Eine Website, die ' +
            'nur die Agentur ändern kann, macht jede Änderung der Öffnungszeiten zum Auftrag.',
        ],
      },
      {
        h2: 'Was bei Tierarztpraxen anders ist',
        absaetze: [
          'Werbung von Tierärztinnen und Tierärzten unterliegt den Berufsordnungen der jeweiligen ' +
            'Kammer, für Aussagen über Arzneimittel gelten zusätzliche Regeln. Eine Agentur aus ' +
            'einer anderen Branche kennt diese Grenzen nicht zwangsläufig. Ob eine Maßnahme zulässig ' +
            'ist, klärt im Zweifel die zuständige Kammer, nicht die Agentur.',
          'Dazu kommen Fotos von Tieren, Tierhaltern und Teammitgliedern. Wer sie veröffentlicht, ' +
            'braucht deren Einwilligung – das gilt für die Praxis, nicht nur für den Dienstleister.',
        ],
      },
    ],
    fragen: [
      {
        frage: 'Kann eine Agentur neue Patienten zusagen?',
        antwort:
          'Eine Agentur kann Auftritt und Auffindbarkeit verbessern. Ob Tierhalter dann kommen, ' +
          'hängt auch an Erreichbarkeit, freien Terminen und Bewertungen. Zusagen zu Patientenzahlen ' +
          'sind ein Anlass zu fragen, wie sie gemessen werden.',
      },
      {
        frage: 'Lohnt sich Marketing, wenn die Praxis keine neuen Patienten aufnimmt?',
        antwort:
          'Dann geht es meist um Personal: Arbeitgebermarke und Karriereseite richten sich an ' +
          'Bewerberinnen und Bewerber. Für Tierhalter genügt oft ein gepflegter Eintrag mit ' +
          'Öffnungszeiten und Leistungen.',
      },
      {
        frage: 'Wem sollten Social-Media-Konten und Domain gehören?',
        antwort:
          'Der Praxis. Laufen Konten oder Domain auf den Dienstleister, sind sie bei einem Wechsel ' +
          'schwer zurückzuholen. Das lässt sich vor Vertragsbeginn festhalten.',
      },
    ],
    worauf: [
      'Wem gehören am Ende Domain, Website, Texte, Bilder und Social-Media-Konten – der Praxis oder dem Dienstleister?',
      'Kann die Praxis Öffnungszeiten, Team und Leistungen auf der Website selbst ändern?',
      'Welche Referenzen aus Tierarztpraxen gibt es, und lassen sie sich ansehen?',
      'Woran wird Erfolg gemessen – und wer erhebt die Zahlen?',
      'Kennt der Dienstleister die Werberegeln der Berufsordnung, und wer haftet für Inhalte?',
      'Werden personenbezogene Daten von Tierhaltern oder Bewerbern verarbeitet? Dann braucht es einen Auftragsverarbeitungsvertrag.',
      'Wie lang ist die Vertragslaufzeit, und was passiert mit Website und Konten bei Kündigung?',
    ],
    abgrenzung: [
      {
        kategorie: 1,
        grund:
          'Dort stehen Plattformen mit eigener Reichweite. Eine Agentur hilft, sie zu nutzen – ' +
          'ersetzt sie aber nicht.',
      },
      {
        kategorie: 10,
        grund:
          'Ein gepflegter Eintrag in Verzeichnissen und Kartendiensten ist oft der erste Auftrag ' +
          'einer Agentur. Welche Portale es gibt, steht dort.',
      },
      {
        kategorie: 2,
        grund:
          'Marketing endet dort, wo jemand einen Termin will. Ob die Website buchbar ist, ' +
          'entscheidet die Terminlösung, nicht das Design.',
      },
      {
        kategorie: 14,
        grund:
          'Wer Marketing selbst lernen will statt es einzukaufen: Auch Praxismanagement gibt es ' +
          'als Online-Fortbildung.',
      },
    ],
    begriffe: [],
    grenzen:
      'Keine Preise, keine Erfolgsversprechen und keine Empfehlung für einen bestimmten ' +
      'Dienstleister. Keine Rechtsberatung zu Werberegeln: Maßgeblich ist die Berufsordnung der ' +
      'zuständigen Kammer.',
  },

  /* ----------------------------------------------------------------- 14 */
  {
    kategorie: 14,
    slug: 'online-fortbildung',
    frageAnbieter: 'Wo gibt es Online-Fortbildungen für Tierärzte und TFA?',
    frageBegriff: 'Was ist eine Online-Fortbildung in der Tiermedizin?',
    h1: 'Online-Fortbildung für Tierärzte und TFA',
    titleTag: 'Online-Fortbildung für Tierärzte und TFA – Plattformen',
    description:
      'Welche Plattformen Online-Fortbildung für Tierärzte und TFA anbieten, wie anerkannte ' +
      'Stunden ins Spiel kommen und worauf Praxisteams bei der Auswahl achten.',
    definition:
      'Eine Online-Fortbildung in der Tiermedizin ist ein Webinar, Online-Seminar oder E-Learning-Kurs, mit dem Tierärztinnen, Tierärzte und TFA sich ohne Anreise fortbilden – live zu einem festen Termin oder als Aufzeichnung.',
    lead: [
      'Online-Fortbildung ist für viele Praxisteams der Weg, Fortbildung neben Dienstplan und ' +
        'Notdienst unterzubringen. Die Plattformen unterscheiden sich weniger in der Technik als ' +
        'darin, wer sie betreibt, welche Stunden anerkannt werden und wie lange Inhalte abrufbar sind.',
      'Neben unabhängigen Plattformen bieten auch Hersteller aus der Tiergesundheit Webinare an, ' +
        'oft kostenfrei. Das ist kein Makel, aber ein Unterschied, den man kennen sollte.',
    ],
    abschnitte: [
      {
        h2: 'Was in dieser Kategorie zusammengefasst ist',
        absaetze: [
          'Plattformen, auf denen Tierärztinnen, Tierärzte und TFA Webinare, Online-Seminare und ' +
            'E-Learning-Kurse belegen können – live, auf Abruf oder als Mischung aus beidem. Dazu ' +
            'gehören Plattformen von Fachportalen, Dienstleistern und Herstellern.',
          'Nicht hier: Fachmedien und Newsletter, die über Fortbildungen informieren, ohne sie ' +
            'selbst anzubieten. Sie stehen unter Branchen-Newsletter.',
        ],
      },
      {
        h2: 'Anerkannte Stunden: ATF, AG TFA, ÖTK und GST',
        absaetze: [
          'In Deutschland werden Fortbildungen für Tierärztinnen und Tierärzte über die Akademie ' +
            'für tierärztliche Fortbildung (ATF) anerkannt, für TFA über die AG TFA. In Österreich ' +
            'zählen Bildungsstunden nach der Bildungsordnung der Österreichischen Tierärztekammer, ' +
            'in der Schweiz Bildungspunkte nach den Richtlinien der GST.',
          'Ob eine Fortbildung anerkannt ist, steht in der Regel beim Angebot – manchmal mit dem ' +
            'Zusatz „beantragt“. Wer Stunden nachweisen muss, sollte vor der Buchung prüfen, ob ' +
            'die Anerkennung schon erteilt ist und ob sie im eigenen Land gilt.',
        ],
      },
      {
        h2: 'Live, auf Abruf oder als Kurs mit Abschlusstest',
        absaetze: [
          'Live-Webinare erlauben Fragen an die Referentin oder den Referenten, verlangen aber ' +
            'einen festen Termin. Aufzeichnungen passen sich dem Dienstplan an. E-Learning-Kurse ' +
            'mit Modulen und Abschlusstest sind die Form, in der etwa Kurse zur Aktualisierung der ' +
            'Fachkunde im Strahlenschutz online angeboten werden.',
          'Für die Praxis als Ganzes zählt, ob sich Fortbildung für das Team organisieren lässt: ' +
            'gemeinsame Zugänge, Praxislizenzen oder Abos und eine Übersicht, wer welche Stunden ' +
            'schon hat.',
        ],
      },
    ],
    fragen: [
      {
        frage: 'Zählt eine Aufzeichnung genauso wie ein Live-Webinar?',
        antwort:
          'Das hängt von der Anerkennung ab: Manche Aufzeichnungen sind mit Lernerfolgskontrolle ' +
          'anerkannt, andere nur die Live-Teilnahme. Die Angabe steht in der Regel beim Angebot.',
      },
      {
        frage: 'Können TFA dieselben Plattformen nutzen?',
        antwort:
          'Viele Plattformen haben eigene Angebote für TFA, anerkannt über die AG TFA. Einzelne ' +
          'richten sich ausschließlich an TFA.',
      },
      {
        frage: 'Worauf achten bei kostenfreien Webinaren von Herstellern?',
        antwort:
          'Auch sie können anerkannt sein; das steht beim Angebot. Inhaltlich lohnt der Blick ' +
          'darauf, ob Produkte des Herstellers im Mittelpunkt stehen.',
      },
    ],
    worauf: [
      'Ist die Fortbildung bereits anerkannt oder erst beantragt – und gilt die Anerkennung im eigenen Land?',
      'Wird die Anerkennung für Tierärzte (ATF) oder für TFA (AG TFA) erteilt?',
      'Wie lange bleibt eine Aufzeichnung nach dem Kauf abrufbar?',
      'Wie wird die Teilnahme nachgewiesen, und wie kommt die Bescheinigung zur Praxis?',
      'Gibt es Praxis- oder Teamzugänge, oder braucht jede Person ein eigenes Konto?',
      'Wer betreibt die Plattform, und wer finanziert kostenfreie Angebote?',
    ],
    abgrenzung: [
      {
        kategorie: 5,
        grund:
          'Fachmedien berichten über Fortbildungen, hier werden sie belegt. Einzelne Anbieter ' +
          'stehen deshalb in beiden Kategorien.',
      },
      {
        kategorie: 11,
        grund:
          'Fortbildung baut Wissen auf Vorrat auf. Für die konkrete Frage am Patienten sind ' +
          'Nachschlagewerke und Arzneimittelinformation zuständig.',
      },
      {
        kategorie: 13,
        grund:
          'Praxismanagement und Marketing kann man lernen oder einkaufen. Wer es einkauft, ' +
          'findet die Dienstleister dort.',
      },
    ],
    begriffe: [],
    grenzen:
      'Keine Bewertung von Referentinnen, Referenten oder Inhalten und keine Preise. Ob eine ' +
      'Fortbildung für eine bestimmte Pflicht anerkannt wird, entscheidet die zuständige Stelle, ' +
      'nicht dieser Artikel.',
  },
];
