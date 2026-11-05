/**
 * Ratgeber – Seiten zu einer Frage, die quer zu den Lösungsfeldern liegt.
 *
 * Unterschied zu den Kategorie-Artikeln: Ein Ratgeber erklärt eine Regel oder
 * einen Ablauf, den eine Lösung abbilden muss, und listet dazu die passenden
 * Anbieter der Übersicht. Er gibt wieder, was in einer Quelle steht – keine
 * Rechts-, Gebühren- oder Kaufberatung.
 *
 * Jede Aussage hat eine Quelle in `quellen`. Was nicht belegt ist, steht nicht da.
 */

export interface RatgeberAbschnitt {
  h2: string;
  absaetze?: string[];
  /** Aufzählung, z. B. die Pflichtangaben einer Rechnung. */
  liste?: string[];
  /** Nummerierte Aufzählung statt Punkten. */
  nummeriert?: boolean;
}

export interface Ratgeber {
  slug: string;
  /** Lösungsfeld, dessen Anbieter am Ende stehen und dessen Vorschaubild gilt. */
  kategorie: number;
  h1: string;
  titleTag: string;
  description: string;
  /** Erster Absatz nach dem Muster „X ist …“ – für Antwortmaschinen. */
  definition: string;
  lead: string[];
  abschnitte: RatgeberAbschnitt[];
  pruefliste: string[];
  fragen: { frage: string; antwort: string }[];
  grenzen: string;
  quellen: { titel: string; url: string; abgerufen: string }[];
  /** Kurztitel für Listen und Brotkrume. */
  kurzTitel: string;
}

export const ratgeber: Ratgeber[] = [
  {
    slug: 'got-praxissoftware',
    kategorie: 6,
    kurzTitel: 'GOT in der Praxissoftware',
    h1: 'Die Gebührenordnung für Tierärzte (GOT) in der Praxissoftware',
    titleTag: 'GOT in der Praxissoftware: was die Abrechnung können muss',
    description:
      'Was die Gebührenordnung für Tierärzte (GOT) für die Rechnung vorschreibt, was 2026 ' +
      'evaluiert wird und was eine Praxis ihre Software fragen sollte.',
    definition:
      'Die Gebührenordnung für Tierärztinnen und Tierärzte (GOT) ist die bundesweit geltende ' +
      'Verordnung, nach der Tierarztpraxen in Deutschland ihre Leistungen abrechnen. Sie gilt in ' +
      'der aktuellen Fassung seit dem 22. November 2022.',
    lead: [
      'Die GOT legt keine Festpreise fest, sondern für jede Leistung einen einfachen Satz und ' +
        'einen Rahmen bis zum dreifachen Satz. Die Praxissoftware setzt das im Alltag um: Sie ' +
        'kennt das Gebührenverzeichnis, rechnet den gewählten Satz und schreibt die Rechnung so, ' +
        'wie § 7 GOT es verlangt.',
      'Für Ende 2026 erwartet das Bundesministerium die Ergebnisse einer Evaluierung der GOT. ' +
        'Ändert sich danach das Gebührenverzeichnis, muss jede Praxissoftware die neue Fassung ' +
        'übernehmen.',
    ],
    abschnitte: [
      {
        h2: 'Was die GOT vorschreibt',
        liste: [
          'Rahmen: einfacher bis dreifacher Satz, bemessen nach Schwierigkeit, Zeitaufwand, ' +
            'Zeitpunkt, Wert des Tieres und örtlichen Verhältnissen (§ 2 Abs. 1). Die Sätze ' +
            'verstehen sich ohne Umsatzsteuer (§ 1 Abs. 3).',
          'Unter- oder Überschreitung: nur im begründeten Einzelfall, vor der Leistung ' +
            'vereinbart, in Textform, mit Doppel für den Zahlungspflichtigen (§ 5 Abs. 1).',
          'Notdienst: bei Nacht (18 bis 8 Uhr), am Wochenende (Freitag 18 Uhr bis Montag 8 Uhr) ' +
            'und an Feiertagen im Rahmen eines Notdienstes zweifacher bis vierfacher Satz, dazu ' +
            'eine Notdienstgebühr von 50 Euro – je Angelegenheit nur einmal, auch bei mehreren ' +
            'Tieren (§ 2 Abs. 2, § 4 Abs. 1 und 2).',
          'Keine Doppelbewertung: Eine Leistung, die Teil einer anderen abgerechneten Leistung ' +
            'ist, wird nicht zusätzlich berechnet (§ 6).',
          'Arzneimittel: nach der Arzneimittelpreisverordnung, auch für angewandte Arzneimittel ' +
            '(§ 9).',
        ],
      },
      {
        h2: 'Was auf jeder Rechnung stehen muss',
        absaetze: ['§ 7 Abs. 4 GOT nennt sechs Mindestangaben:'],
        nummeriert: true,
        liste: [
          'Datum der Leistung',
          'Tierart',
          'Diagnose oder Grund der Konsultation',
          'die berechnete Leistung mit der laufenden Nummer des Gebührenverzeichnisses',
          'Rechnungsbetrag',
          'Umsatzsteuer',
        ],
      },
      {
        h2: 'Was daneben gilt',
        absaetze: [
          'Entschädigungen, Auslagen, Arzneimittel und Material sind gesondert auszuweisen. Auf ' +
            'Verlangen ist die Rechnung aufzugliedern. Fällig wird die Vergütung erst mit der ' +
            'Rechnung (§ 7 Abs. 3).',
          'Die Abrechnung kann die Praxis selbst stellen oder über eine Abrechnungsstelle – in ' +
            'jedem Fall auf Grundlage der GOT und mit der laufenden Nummer der Leistung, wie das ' +
            'Ministerium schreibt.',
        ],
      },
      {
        h2: 'Die Evaluierung 2026',
        absaetze: [
          'Bei der Novellierung 2022 wurde vorgesehen, sie vier Jahre später umfassend zu ' +
            'evaluieren. Das Ministerium hat die Evaluierung Mitte 2025 angestoßen; Ergebnisse ' +
            'werden für Ende 2026 erwartet. Geprüft werden der Leistungskatalog und die Höhe der ' +
            'Gebühren.',
          'Ob und wann sich daraus eine neue Fassung ergibt, ist offen. Für die Praxis lohnt ' +
            'die Frage an den Softwareanbieter schon jetzt: Wie schnell kommt ein geändertes ' +
            'Gebührenverzeichnis in das System, und was kostet das Update?',
        ],
      },
    ],
    pruefliste: [
      'Ist das Gebührenverzeichnis der GOT 2022 vollständig hinterlegt, mit laufender Nummer je Leistung?',
      'Wie schnell und zu welchen Kosten übernimmt die Software eine geänderte Fassung, etwa nach der Evaluierung 2026?',
      'Lässt sich der Satz je Position wählen, und wird die Begründung für einen höheren Satz mitgeführt?',
      'Erkennt die Software Notdienstzeiten und setzt die Notdienstgebühr je Angelegenheit nur einmal an – auch bei mehreren Tieren?',
      'Erzeugt sie die Vereinbarung in Textform nach § 5 und legt das Doppel ab?',
      'Stehen die sechs Pflichtangaben nach § 7 Abs. 4 auf jeder Rechnung, und werden Arzneimittel und Material getrennt ausgewiesen?',
      'Lassen sich Rechnungen auf Verlangen aufgliedern?',
      'Werden Arzneimittelpreise nach der Arzneimittelpreisverordnung berechnet?',
    ],
    fragen: [
      {
        frage: 'Seit wann gilt die aktuelle GOT?',
        antwort: 'Seit dem 22. November 2022 (§ 12 GOT). Sie ersetzt die Fassung von 1999.',
      },
      {
        frage: 'Gibt es in der GOT Festpreise?',
        antwort:
          'Nein. Die GOT nennt für jede Leistung den einfachen Satz und einen Rahmen bis zum ' +
          'Dreifachen (§ 2), im Notdienst bis zum Vierfachen (§ 4). Die Sätze verstehen sich ohne ' +
          'Umsatzsteuer.',
      },
      {
        frage: 'Was muss auf einer Tierarztrechnung stehen?',
        antwort:
          'Mindestens Datum der Leistung, Tierart, Diagnose oder Grund der Konsultation, die ' +
          'Leistung mit laufender Nummer des Gebührenverzeichnisses, Rechnungsbetrag und ' +
          'Umsatzsteuer (§ 7 Abs. 4 GOT).',
      },
      {
        frage: 'Wird die GOT wieder geändert?',
        antwort:
          'Das Bundesministerium evaluiert die Fassung von 2022; Ergebnisse werden für Ende 2026 ' +
          'erwartet. Ob und wann sich daraus Änderungen ergeben, ist offen.',
      },
    ],
    grenzen:
      'Keine Rechtsauskunft und keine Gebührenberatung. Wiedergegeben ist der Verordnungstext mit ' +
      'Stand vom 26.10.2026; verbindlich ist die jeweils geltende Fassung, Auskunft geben die ' +
      'Tierärztekammern. Keine Aussage darüber, welche Software welche Funktion bietet. Für ' +
      'Österreich und die Schweiz gelten andere Regelungen; sie sind nicht Gegenstand dieser Seite.',
    quellen: [
      {
        titel:
          'Gebührenordnung für Tierärztinnen und Tierärzte (GOT) vom 15.08.2022, BGBl. I S. 1401, geändert durch Art. 2 V v. 15.3.2023 I Nr. 70',
        url: 'https://www.gesetze-im-internet.de/got_2022/',
        abgerufen: '2026-10-26',
      },
      {
        titel: 'Bundesministerium für Landwirtschaft, Ernährung und Heimat: Gebührenordnung für Tierärztinnen und Tierärzte (GOT), Abschnitt Evaluierung',
        url: 'https://www.bmleh.de/DE/themen/tiere/got.html',
        abgerufen: '2026-10-26',
      },
      {
        titel: 'Bundestierärztekammer: Gebührenordnung (GOT)',
        url: 'https://www.bundestieraerztekammer.de/tieraerzte/beruf/got/index.php',
        abgerufen: '2026-10-26',
      },
    ],
  },
];
