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
  /** Überschrift der Prüfliste; ohne Angabe „Fragen an die Software“. */
  prueflisteTitel?: string;
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
  {
    slug: 'praxissoftware-wechseln-datenuebernahme',
    kategorie: 6,
    kurzTitel: 'Praxissoftware wechseln',
    prueflisteTitel: 'Prüfliste vor dem Wechsel',
    h1: 'Praxissoftware wechseln: was bei der Datenübernahme zählt',
    titleTag: 'Praxissoftware wechseln: was bei der Datenübernahme zählt',
    description:
      'Welche Daten eine Tierarztpraxis beim Softwarewechsel mitnehmen muss, welche ' +
      'Aufbewahrungsregeln gelten und was sie alten und neuen Anbieter fragen sollte.',
    definition:
      'Die Datenübernahme beim Wechsel der Praxissoftware ist das Überführen aller Daten einer ' +
      'Tierarztpraxis aus dem bisherigen in ein neues Programm: Tierhalter und Patienten, ' +
      'Behandlungsdokumentation, Arzneimittelnachweise, Rechnungen und Lager.',
    lead: [
      'Ein Wechsel der Praxissoftware endet nicht mit dem ersten Tag im neuen Programm. Viele ' +
        'Daten muss die Praxis noch Jahre später vorlegen können – dem Finanzamt, der ' +
        'Behörde für Tierarzneimittel oder dem Tierhalter.',
      'Diese Seite zeigt, welche Daten mitmüssen, was Abgabenordnung, GoBD, ' +
        'Hausapothekenverordnung und Datenschutz dazu sagen und welche Fragen vor der ' +
        'Kündigung des alten Vertrags geklärt sein sollten.',
    ],
    abschnitte: [
      {
        h2: 'Welche Daten mitmüssen',
        liste: [
          'Stammdaten: Tierhalter mit Kontaktdaten, Patienten mit Tierart, Rasse, Geburtsdatum ' +
            'und Kennzeichnung.',
          'Behandlungsdokumentation: Befunde, Diagnosen, Leistungen, Laborwerte, Bilder und ' +
            'angehängte Dokumente – mit Datum und Bezug zum Patienten.',
          'Arzneimittel: Abgabe und Anwendung. Als Nachweis gelten nach § 15 Abs. 4 TÄHAV ' +
            'insbesondere Aufzeichnungen im Tagebuch der Praxis oder in der Patientenkartei.',
          'Abrechnung: Rechnungen, Gutschriften, Zahlungen, offene Posten und Mahnungen.',
          'Lager: Bestände, Chargen, Verfallsdaten und die Lieferscheine oder Rechnungen zum ' +
            'Erwerb von Arzneimitteln (§ 15 Abs. 4 TÄHAV).',
          'Organisation: Termine, Erinnerungen, Vorlagen, Benutzer und Änderungsprotokolle.',
        ],
      },
      {
        h2: 'Was das Steuerrecht verlangt',
        absaetze: [
          '§ 147 AO nennt die Unterlagen, die geordnet aufzubewahren sind, und die Fristen ' +
            '(Abs. 3):',
        ],
        liste: [
          'zehn Jahre: Bücher, Aufzeichnungen, Inventare, Jahresabschlüsse und die zum ' +
            'Verständnis nötigen Organisationsunterlagen (Abs. 1 Nr. 1)',
          'acht Jahre: Buchungsbelege (Abs. 1 Nr. 4)',
          'sechs Jahre: empfangene und abgesandte Handels- oder Geschäftsbriefe sowie sonstige ' +
            'Unterlagen, soweit sie für die Besteuerung von Bedeutung sind (Abs. 1 Nr. 2, 3 und 5)',
        ],
      },
      {
        h2: 'Elektronisch aufbewahren heißt: lesbar und auswertbar',
        absaetze: [
          'Wer Unterlagen als Daten aufbewahrt, muss sicherstellen, dass sie während der ganzen ' +
            'Frist verfügbar sind, unverzüglich lesbar gemacht und maschinell ausgewertet werden ' +
            'können (§ 147 Abs. 2 Nr. 2 AO). Für Kaufleute nennt § 257 HGB dieselben Fristen von ' +
            'zehn, acht und sechs Jahren.',
          'Die GoBD des Bundesfinanzministeriums regeln den Systemwechsel ausdrücklich ' +
            '(Rz. 142). Die alte Hard- und Software muss nur dann nicht weiter vorgehalten werden, ' +
            'wenn zwei Bedingungen erfüllt sind: Die Daten – einschließlich Metadaten, Stammdaten, ' +
            'Bewegungsdaten und Verknüpfungen – werden vollständig und gleichwertig in das neue ' +
            'System oder ein Archiv überführt. Und das neue System ermöglicht die gleichen ' +
            'Auswertungen wie das alte.',
          'Andernfalls ist die alte Hard- und Software für die Dauer der Aufbewahrungsfrist ' +
            'vorzuhalten (Rz. 143).',
        ],
      },
      {
        h2: 'Was für Arzneimittelnachweise gilt',
        absaetze: [
          'Die Nachweise über Erwerb, Abgabe und Anwendung von Arzneimitteln und die ' +
            'tierärztlichen Verschreibungen sind übersichtlich und zeitlich geordnet zu führen und ' +
            'der Behörde auf Verlangen vorzulegen (§ 16 Abs. 1 TÄHAV).',
          'Sie dürfen elektronisch geführt und aufbewahrt werden. Dann muss sichergestellt sein, ' +
            'dass die Daten während der Aufbewahrungszeit jederzeit lesbar gemacht werden können ' +
            'und unveränderlich sind. Die Frist richtet sich nach Art. 103 Abs. 5 der Verordnung ' +
            '(EU) 2019/6; danach sind die Daten zu löschen, wenn sie nicht mehr erforderlich sind ' +
            '(§ 16 Abs. 2 TÄHAV).',
        ],
      },
      {
        h2: 'Datenschutz: Vertrag und Löschung',
        absaetze: [
          'Verarbeitet ein Anbieter personenbezogene Daten im Auftrag der Praxis, braucht es einen ' +
            'Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO. Er ist schriftlich abzufassen, ' +
            'was auch elektronisch geht (Art. 28 Abs. 9). Nach Auffassung der Datenschutzkonferenz ' +
            'gilt das auch für Fernwartung und Support, wenn dabei Zugriff auf personenbezogene ' +
            'Daten möglich ist.',
          'Endet der Auftrag, löscht der Auftragsverarbeiter alle personenbezogenen Daten oder gibt ' +
            'sie zurück – nach Wahl der Praxis –, sofern keine Pflicht zur Speicherung besteht ' +
            '(Art. 28 Abs. 3 Buchst. g DSGVO). Diese Wahl sollte die Praxis erst treffen, wenn die ' +
            'Übernahme geprüft ist.',
        ],
      },
      {
        h2: 'Fragen an den bisherigen Anbieter',
        liste: [
          'In welchen Formaten lassen sich die Daten exportieren – getrennt nach Stammdaten, ' +
            'Behandlungen, Rechnungen, Lager und Dokumenten?',
          'Enthält der Export die Verknüpfungen, etwa welcher Befund zu welchem Patienten und ' +
            'welche Rechnung zu welcher Behandlung gehört?',
          'Was kostet der Export, und wie lange dauert er?',
          'Gibt es nach Vertragsende einen Lesezugriff auf die alten Daten, wie lange und zu ' +
            'welchen Kosten?',
          'Wie bestätigt der Anbieter nach Vertragsende die Löschung oder Rückgabe der Daten?',
        ],
      },
      {
        h2: 'Fragen an den neuen Anbieter',
        liste: [
          'Welche Daten aus dem bisherigen System übernimmt er, und welche nicht?',
          'Wer führt die Übernahme durch, was kostet sie, und gibt es vorher eine Probeübernahme?',
          'Wie lange können altes und neues System parallel laufen?',
          'Lassen sich übernommene Daten im neuen System genauso auswerten wie im alten?',
          'Liegt ein Vertrag zur Auftragsverarbeitung vor, auch für die Übernahme selbst?',
        ],
      },
      {
        h2: 'Der Ablauf in acht Schritten',
        nummeriert: true,
        liste: [
          'Bestand aufnehmen: welche Daten in welchem Modul liegen und seit wann.',
          'Mit dem Steuerberater klären, welche Unterlagen wie lange aufzubewahren sind.',
          'Beim bisherigen Anbieter Exportweg, Kosten, Dauer und Kündigungsfrist schriftlich ' +
            'erfragen.',
          'Mit dem neuen Anbieter Umfang der Übernahme festlegen und den Vertrag zur ' +
            'Auftragsverarbeitung abschließen.',
          'Probeübernahme mit einer Kopie der Daten; Stichproben bei Patientenakten, ' +
            'Arzneimittelnachweisen, Rechnungen und Lager.',
          'Stichtag festlegen, Lagerbestand und offene Posten zum Stichtag abgleichen.',
          'Echte Übernahme; jede Umwandlung und jede Abweichung dokumentieren.',
          'Parallelphase oder Lesezugriff nutzen, Altdaten archivieren und erst dann Löschung ' +
            'oder Rückgabe beim bisherigen Anbieter veranlassen.',
        ],
      },
    ],
    pruefliste: [
      'Ist erfasst, welche Daten im bisherigen System liegen, getrennt nach Stammdaten, Behandlungen, Arzneimitteln, Rechnungen und Lager?',
      'Hat der Steuerberater bestätigt, welche Unterlagen wie lange aufzubewahren sind?',
      'Liegen Exportformat, Kosten und Dauer des Exports schriftlich vor?',
      'Enthält der Export die Verknüpfungen zwischen Patient, Behandlung, Arzneimittel und Rechnung?',
      'Sind die Arzneimittelnachweise nach der Übernahme vollständig, zeitlich geordnet und unveränderlich?',
      'Lassen sich die übernommenen Daten im neuen System so auswerten wie im alten?',
      'Gibt es einen Vertrag zur Auftragsverarbeitung mit dem neuen Anbieter – und, falls nötig, mit dem Dienstleister für die Übernahme?',
      'Ist geregelt, wie lange der Lesezugriff auf das alte System bleibt und wann die Löschung oder Rückgabe beim bisherigen Anbieter erfolgt?',
    ],
    fragen: [
      {
        frage: 'Wann beginnt die Aufbewahrungsfrist?',
        antwort:
          'Mit dem Schluss des Kalenderjahrs, in dem die Unterlage entstanden ist, etwa der ' +
          'Buchungsbeleg (§ 147 Abs. 4 AO). Sie läuft nicht ab, solange die Unterlagen für Steuern ' +
          'von Bedeutung sind, deren Festsetzungsfrist noch nicht abgelaufen ist (§ 147 Abs. 3 AO).',
      },
      {
        frage: 'Reicht es, alte Rechnungen als PDF zu sichern?',
        antwort:
          'Nach den GoBD nicht, wenn dabei nicht mehr alle aufzeichnungs- und ' +
          'aufbewahrungspflichtigen Daten übernommen werden. Eine Aufbewahrung nur als ' +
          'Datenextrakt, Report oder Druckdatei ist dann unzulässig (Rz. 144).',
      },
      {
        frage: 'Dürfen Daten bei der Übernahme verändert werden?',
        antwort:
          'Nur im Format, etwa beim Datums- oder Währungsformat. Inhaltliche Änderungen sind nicht ' +
          'zulässig, und die vorgenommenen Umwandlungen sind zu dokumentieren (GoBD, Rz. 142).',
      },
      {
        frage: 'Braucht auch ein Dienstleister, der nur die Daten umwandelt, einen Vertrag?',
        antwort:
          'Die Datenschutzkonferenz nennt Datenerfassung, Datenkonvertierung und das Einscannen ' +
          'von Dokumenten als Beispiele, die regelmäßig Auftragsverarbeitung sein können. Dann ist ' +
          'ein Vertrag nach Art. 28 DSGVO nötig.',
      },
    ],
    grenzen:
      'Keine Rechts- oder Steuerberatung. Wiedergegeben sind Gesetzes- und Verwaltungstexte mit ' +
      'Stand vom 28.11.2026; verbindlich ist die jeweils geltende Fassung. Welche Unterlage unter ' +
      'welche Aufbewahrungsfrist fällt und ob § 257 HGB für die Praxis gilt, klärt der ' +
      'Steuerberater. Ob die Berufsordnung der zuständigen Landestierärztekammer weitere Pflichten ' +
      'für die Behandlungsdokumentation vorsieht, ist hier nicht wiedergegeben; Auskunft gibt die ' +
      'Kammer. Keine Aussage darüber, welche Software welche Funktion bietet. Für Österreich und die ' +
      'Schweiz gelten andere Regelungen; sie sind nicht Gegenstand dieser Seite.',
    quellen: [
      {
        titel: 'Abgabenordnung (AO), § 147 Ordnungsvorschriften für die Aufbewahrung von Unterlagen',
        url: 'https://www.gesetze-im-internet.de/ao_1977/__147.html',
        abgerufen: '2026-11-28',
      },
      {
        titel: 'Handelsgesetzbuch (HGB), § 257 Aufbewahrung von Unterlagen, Aufbewahrungsfristen',
        url: 'https://www.gesetze-im-internet.de/hgb/__257.html',
        abgerufen: '2026-11-28',
      },
      {
        titel:
          'Bundesministerium der Finanzen: Schreiben vom 28.11.2019 zu den GoBD (IV A 4 - S 0316/19/10003 :001), Rz. 142–144, Abdruck der IHK München',
        url: 'https://www.ihk-muenchen.de/ihk/documents/Recht-Steuern/Steuerrecht/2019-11-28-GoBD.pdf',
        abgerufen: '2026-11-28',
      },
      {
        titel: 'Bundesministerium der Finanzen: Schreiben vom 11.03.2024, Änderung der GoBD',
        url: 'https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Weitere_Steuerthemen/Abgabenordnung/AO-Anwendungserlass/2024-03-11-aenderung-gobd.pdf?__blob=publicationFile',
        abgerufen: '2026-11-28',
      },
      {
        titel: 'Bundesministerium der Finanzen: Schreiben vom 14.07.2025, 2. Änderung der GoBD',
        url: 'https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Weitere_Steuerthemen/Abgabenordnung/2025-07-14-GoBD-2-aenderung.pdf?__blob=publicationFile&v=3',
        abgerufen: '2026-11-28',
      },
      {
        titel: 'Tierärztliche Hausapothekenverordnung (TÄHAV), § 15 Dokumentation über Erwerb, Abgabe und Anwendung',
        url: 'https://www.gesetze-im-internet.de/t_hav_2025/__15.html',
        abgerufen: '2026-11-28',
      },
      {
        titel: 'Tierärztliche Hausapothekenverordnung (TÄHAV), § 16 Allgemeine Dokumentationspflichten',
        url: 'https://www.gesetze-im-internet.de/t_hav_2025/__16.html',
        abgerufen: '2026-11-28',
      },
      {
        titel: 'Die Bundesbeauftragte für den Datenschutz und die Informationsfreiheit: DSGVO – BDSG, Texte und Erläuterungen (Stand März 2026), Art. 28 DSGVO',
        url: 'https://www.bfdi.bund.de/SharedDocs/Downloads/DE/Broschueren/INFO1.pdf?__blob=publicationFile',
        abgerufen: '2026-11-28',
      },
      {
        titel: 'Datenschutzkonferenz (DSK): Kurzpapier Nr. 13 – Auftragsverarbeitung, Art. 28 DS-GVO',
        url: 'https://www.datenschutzkonferenz-online.de/media/kp/dsk_kpnr_13.pdf',
        abgerufen: '2026-11-28',
      },
    ],
  },
];
