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

export interface Artikel {
  kategorie: number;
  /** Dateiname ohne Endung. Entspricht dem Kategorie-Slug. */
  slug: string;
  h1: string;
  titleTag: string;
  description: string;
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
    h1: 'Digitale Sichtbarkeit: Wie Tierhalter eine Tierarztpraxis finden',
    titleTag: 'Sichtbarkeit für Tierarztpraxen – Kanäle und Anbieter',
    description:
      'Wie Tierarztpraxen im DACH-Raum digital sichtbar werden – Kartendienst, Bewertungen, ' +
      'Portale. Mit allen Anbietern der Marktübersicht, ohne Rangfolge.',
    lead: [
      'Sichtbarkeit entsteht heute an drei Stellen: im Kartendienst, in Bewertungen und in ' +
        'Portalen oder Communitys, in denen Tierhalter unterwegs sind. Eine eigene Website ist ' +
        'die Grundlage, aber selten der Ort, an dem die Suche beginnt.',
      'Vorweg eine unbequeme Frage: Viele Praxen im DACH-Raum sind ausgelastet und nehmen keine ' +
        'neuen Patienten an. Für sie ist Sichtbarkeit kein Wachstumsthema, sondern ein ' +
        'Steuerungsthema – gefunden werden will man trotzdem, aber von den richtigen Leuten.',
    ],
    abschnitte: [
      {
        h2: 'Was in dieser Kategorie zusammengefasst ist',
        absaetze: [
          'Plattformen und Dienste, über die eine Praxis für Tierhalter auffindbar wird, die sie ' +
            'noch nicht kennen. Das reicht von Verzeichnissen und Bewertungsportalen über ' +
            'Community-Plattformen bis zu Angeboten, die Praxisprofile bündeln.',
          'Nicht in dieser Kategorie: Werkzeuge, die sich an bestehende Kundinnen und Kunden ' +
            'richten. Wer schon in der Kartei steht, wird nicht neu gewonnen, sondern gehalten – ' +
            'dafür sind Terminbuchung, Portal und Recall zuständig.',
        ],
      },
      {
        h2: 'Warum der Kartendienst meist wichtiger ist als die Website',
        absaetze: [
          'Die häufigste Suche ist lokal und dringend: ein Tier, ein Symptom, ein Ort. Was in ' +
            'diesem Moment zählt, sind Öffnungszeiten, Entfernung, Telefonnummer und ob überhaupt ' +
            'ein Termin zu bekommen ist. Diese Angaben stehen selten auf der Website – sie stehen ' +
            'im Kartendienst, im Verzeichnis oder im Portal.',
          'Praktische Folge: Ein gepflegter Eintrag mit korrekten Zeiten und einem funktionierenden ' +
            'Terminweg wirkt fast immer stärker als ein Website-Relaunch. Er kostet auch weniger.',
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
    h1: 'Online-Terminvereinbarung in der Tierarztpraxis',
    titleTag: 'Online-Terminbuchung für Tierarztpraxen – alle Anbieter',
    description:
      'Wie Online-Terminbuchung in Tierarztpraxen funktioniert, welche Anbieter es im DACH-Raum ' +
      'gibt und woran die Einführung in der Praxis meistens scheitert.',
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
    h1: 'Intake und Self-Check-in: die Patientenaufnahme vor dem Termin',
    titleTag: 'Digitale Patientenaufnahme in der Tierarztpraxis',
    description:
      'Digitale Anamnesebögen und Self-Check-in für Tierarztpraxen: was sie leisten, woran sie ' +
      'scheitern und welche Anbieter es im DACH-Raum gibt.',
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
          'Der häufigste Fehler ist Länge. Ein Bogen mit vierzig Feldern wird abgebrochen, und ' +
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
    h1: 'KI in der Tierarztpraxis: Dokumentation und Praxisassistenten',
    titleTag: 'KI-Dokumentation für Tierarztpraxen – Anbieter im DACH-Raum',
    description:
      'Wie KI-Dokumentation in der Tierarztpraxis funktioniert, wo ihre Grenzen liegen und ' +
      'welche Anbieter es gibt – ohne Rangfolge, ohne Bewertung.',
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
            'an und dokumentiert gar nichts.',
          'Für die Auswahl ist die Unterscheidung entscheidend, weil sie an verschiedenen Stellen ' +
            'Zeit spart. Wer am Telefon ertrinkt, dem hilft der beste Dokumentationsassistent ' +
            'nicht.',
          'Anmerkung zur Einordnung: Die Kategorie dieser Übersicht heißt „KI-Dokumentations- und ' +
            'Praxisassistenten" und deckt Telefonassistenz derzeit nicht eigenständig ab. Das ist ' +
            'eine bekannte Lücke.',
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
    h1: 'Branchen-Newsletter und Fachmedien der deutschsprachigen Tiermedizin',
    titleTag: 'Fachmedien und Newsletter für Tierärzte im DACH-Raum',
    description:
      'Welche Newsletter und Fachmedien die deutschsprachige Veterinärbranche informieren – und ' +
      'warum diese Kategorie in einer Marktübersicht digitaler Lösungen steht.',
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
          'Die Digitalisierung der Tierarztpraxis verbreitet sich nicht über Suchmaschinen, ' +
            'sondern über Empfehlungen, Fachmedien und Messen. Eine Praxis erfährt von einem ' +
            'Dokumentationsassistenten typischerweise nicht, weil sie danach gesucht hat, sondern ' +
            'weil jemand darüber geschrieben oder gesprochen hat.',
          'Wer die Kanäle nicht kennt, über die dieser Markt redet, versteht seine Bewegungen ' +
            'nicht. Deshalb gehören sie in eine Marktübersicht.',
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
    h1: 'Online-Tierarzt: offene Videosprechstunden für Tierhalter',
    titleTag: 'Online-Videosprechstunde für Tierhalter – alle Anbieter',
    description:
      'Plattformen, über die Tierhalter direkt einen Tierarzt per Video erreichen – was sie von ' +
      'praxiseigenen Angeboten trennt und was das für Praxen heißt.',
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
            'Versicherungsvertrag. Diese Übersicht bildet dieses Segment bislang nicht ab.',
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
    h1: 'Praxiseigene Videosprechstunde: eigene Patienten per Video betreuen',
    titleTag: 'Videosprechstunde für die eigene Tierarztpraxis',
    description:
      'Wie eine Tierarztpraxis ihren eigenen Kunden Videotermine anbietet: Abgrenzung zu ' +
      'offenen Plattformen, Auswahlkriterien und Anbieter im DACH-Raum.',
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
    h1: 'Tierhalter-App und Patientenportal: der digitale Draht zum Kunden',
    titleTag: 'Tierhalter-App und Patientenportal für Tierarztpraxen',
    description:
      'Was ein Patientenportal für Tierarztpraxen leistet, worin es sich von einer Tierhalter-App ' +
      'unterscheidet und welche Anbieter es im DACH-Raum gibt.',
    lead: [
      'Ein Portal oder eine App gibt dem Tierhalter einen eigenen Zugang: Impfungen, Befunde, ' +
        'Rechnungen, Termine, Nachrichten. Für die Praxis ist es vor allem eine Entlastung des ' +
        'Telefons – die meisten Anrufe sind Auskünfte, keine Beratung.',
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
    h1: 'Tierärzte-Suchmaschinen: Wo Tierhalter nach einer Praxis suchen',
    titleTag: 'Tierarzt-Suchmaschinen und Verzeichnisse im DACH-Raum',
    description:
      'Welche Tierarzt-Suchportale es in Deutschland, Österreich und der Schweiz gibt – und was ' +
      'eine Praxis mit ihren oft veralteten Einträgen tun sollte.',
    lead: [
      'Sieben Portale, keines davon DACH-weit. Der deutschsprachige Raum hat vier größere ' +
        'kommerzielle Suchportale für Deutschland, je eines für Österreich und die Schweiz, dazu ' +
        'die Suchen der Berufsverbände. Ein gemeinsames Verzeichnis gibt es nicht.',
      'Für eine Praxis heißt das: Sie steht in mehreren dieser Portale, ob sie will oder nicht. ' +
        'Die Einträge stammen meist aus öffentlichen Quellen und wurden nie von der Praxis ' +
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
          'Die Portale tragen zwischen 900 und knapp 13.000 Praxen. Diese Mengen entstehen nicht ' +
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
      'In welchen der Portale steht die eigene Praxis schon? Einmal alle sieben durchgehen und nachsehen.',
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
];
