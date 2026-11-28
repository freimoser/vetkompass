/**
 * Brücke zu Tiermedizin in Zahlen (Schwesterseite, vom selben Herausgeber):
 * je Lösungsfeld Statistiken, die zeigen, warum das Feld für Praxen zählt.
 *
 * Jede Zahl steht wörtlich im verlinkten Artikel (`beleg`, geprüft am
 * 26.11.2026 gegen die Live-Seite). Seit 28.11.2026 sind alle 14 Felder
 * abgedeckt (neue Artikel der Schwesterseite zu Fachmedien, Telemedizin,
 * Tierarztbesuchen und TFA).
 */
export interface ZahlenVerweis {
  url: string;
  titel: string;
  satz: string;
  /** Wörtliches Zitat aus dem Artikel, das die Zahl belegt. */
  beleg: string;
}

export const ZAHLEN_BRUECKE: Record<number, ZahlenVerweis[]> = {
  1: [
    {
      url: 'https://tiermedizin-in-zahlen.org/beitrag/heimtierbedarf-online-handel.html',
      titel: 'Haustierbedarf online: Umsatz 2013 bis 2025',
      satz:
        'Tierhalter kaufen zunehmend im Netz: 2025 setzte der Online-Handel mit Heimtierbedarf laut ZZF und IVH 1.521 Mio. Euro um, 2013 waren es 400 Mio. Ein Hinweis darauf, wie viel Tierhalter schon online erledigen.',
      beleg: 'Der Online-Handel mit Heimtierbedarf setzte 2025 in Deutschland 1.521 Mio. Euro um',
    },
  ],
  2: [
    {
      url: 'https://tiermedizin-in-zahlen.org/beitrag/tiermedizinische-fachangestellte.html',
      titel: 'Tiermedizinische Fachangestellte: Zahl, Ausbildung, Gehalt',
      satz:
        'Rechnerisch kommen auf jede Tierarztpraxis gut zweieinhalb TFA (2025, Bundesagentur für Arbeit und Kammerstatistik). Auf so kleine Teams verteilen sich auch die Terminanfragen.',
      beleg: 'Rechnerisch kommen auf jede Tierarztpraxis gut zweieinhalb TFA (27.198 auf 10.385 Praxen',
    },
    {
      url: 'https://tiermedizin-in-zahlen.org/beitrag/tierarztmangel-deutschland.html',
      titel: 'Tierarztmangel in Deutschland: was die Zahlen zeigen',
      satz:
        '2025 kamen rechnerisch 2.291 Hunde und Katzen auf jeden Praxisinhaber (Bundestierärztekammer, IVH/ZZF), 2000 waren es 1.668. Online-Buchung nimmt einen Teil der Terminanfragen vom Telefon.',
      beleg: 'auf jeden kommen inzwischen 2.291 Hunde und Katzen statt 1.668',
    },
    {
      url: 'https://tiermedizin-in-zahlen.org/beitrag/tiermedizinische-fachangestellte.html',
      titel: 'Tiermedizinische Fachangestellte: Zahl, Ausbildung, Gehalt',
      satz:
        'Neue Ausbildungsverträge für Tiermedizinische Fachangestellte sanken laut Statistischem Bundesamt von 3.102 (2021) auf 2.466 (2025). Wenn am Empfang Personal fehlt, nimmt Online-Buchung Anfragen vom Telefon.',
      beleg: 'Neue Ausbildungsverträge stiegen bis 2021 auf 3.102 und sinken seitdem: 2025 waren es 2.466',
    },
  ],
  3: [
    {
      url: 'https://tiermedizin-in-zahlen.org/beitrag/tiermedizinische-fachangestellte.html',
      titel: 'Tiermedizinische Fachangestellte: Zahl, Ausbildung, Gehalt',
      satz:
        '2025 wurden 2.466 neue TFA-Ausbildungsverträge geschlossen, nach 3.102 im Jahr 2021 (Statistisches Bundesamt). Weniger Nachwuchs ist ein Grund, die Aufnahme am Empfang schlanker zu organisieren.',
      beleg: 'Neue Ausbildungsverträge stiegen bis 2021 auf 3.102 und sinken seitdem: 2025 waren es 2.466',
    },
    {
      url: 'https://tiermedizin-in-zahlen.org/beitrag/ueberstunden-tierarztpraxis.html',
      titel: 'Überstunden in der Tierarztpraxis: was die Zahlen zeigen',
      satz:
        'Praxisinhaber arbeiten laut Gutachten zur Gebührenordnung (Befragung 2020) rund 50 Stunden pro Woche, rund 22 davon in Verwaltung, Personal und Fahrten. Digitale Aufnahme verlagert Formulare vor den Besuch.',
      beleg: 'rund 22 Stunden gingen in Verwaltung, Personal und Fahrten',
    },
    {
      url: 'https://tiermedizin-in-zahlen.org/beitrag/tiermedizinische-fachangestellte.html',
      titel: 'Tiermedizinische Fachangestellte: Zahl, Ausbildung, Gehalt',
      satz:
        '32,2 Prozent der Tiermedizinischen Fachangestellten arbeiten laut Bundesagentur für Arbeit in Teilzeit (2025), 2013 waren es 24,8 Prozent. Digitale Aufnahme verlagert Formulare vor den Besuch und entlastet den Empfang.',
      beleg: '32,2 Prozent arbeiten in Teilzeit (2013: 24,8 Prozent)',
    },
  ],
  4: [
    {
      url: 'https://tiermedizin-in-zahlen.org/beitrag/ueberstunden-tierarztpraxis.html',
      titel: 'Überstunden in der Tierarztpraxis: was die Zahlen zeigen',
      satz:
        '70 Prozent der angestellten Tierärztinnen und Tierärzte machen laut Befragung des Bundes angestellter Tierärzte (Ende 2025) Überstunden. Weniger Schreibarbeit nach der Behandlung entlastet genau dort.',
      beleg: '70 Prozent der befragten angestellten Tierärztinnen und Tierärzte machen Überstunden',
    },
    {
      url: 'https://tiermedizin-in-zahlen.org/beitrag/tierarztmangel-deutschland.html',
      titel: 'Tierarztmangel in Deutschland: was die Zahlen zeigen',
      satz:
        'Ende 2025 gab es laut Bundestierärztekammer 803 Praxisinhaber weniger als 2019. Weniger Inhaber tragen Dokumentation, Telefon und Notdienst; Assistenzsysteme setzen an diesen Stunden an.',
      beleg: 'Seit dem Höchststand 2019 gibt es 803 Praxisinhaber weniger',
    },
  ],
  5: [
    {
      url: 'https://tiermedizin-in-zahlen.org/beitrag/fachmedien-tiermedizin.html',
      titel: 'Fachmedien für Tierärzte: Auflagen und Reichweiten',
      satz:
        'Der Newsletter von vetline.de erreichte im Juli 2025 rund 5.300 Empfänger je Versand, 2021 waren es 2.850 (Mediadaten Schlütersche). Das zeigt die Größenordnung eines Branchen-Newsletters, ist aber Verlagsangabe.',
      beleg: 'Newsletter von vetline.de: rund 2.850 Empfänger je Versand im Juli 2021, 5.300 im Juli 2025',
    },
    {
      url: 'https://tiermedizin-in-zahlen.org/beitrag/fachmedien-tiermedizin.html',
      titel: 'Fachmedien für Tierärzte: Auflagen und Reichweiten',
      satz:
        'Der Newsletter von vetline.de erreichte laut Verlag im Juli 2025 rund 5.300 Empfänger je Versand, im Juli 2021 waren es 2.850. Gedruckte Fachzeitschriften verkaufen dagegen weniger; alle Zahlen sind Angaben der Verlage.',
      beleg: 'Newsletter von vetline.de: rund 2.850 Empfänger je Versand im Juli 2021, 5.300 im Juli 2025',
    },
  ],
  6: [
    {
      url: 'https://tiermedizin-in-zahlen.org/beitrag/nachfolge-tierarztpraxis.html',
      titel: 'Nachfolge in der Tierarztpraxis: wer übernimmt?',
      satz:
        'Laut Tierärzte Atlas 2026 müssen in den nächsten zehn Jahren mindestens 3.000, eher 5.000 Praxen eine Nachfolge finden. Bei jeder Übergabe steht auch die Praxissoftware zur Prüfung.',
      beleg: 'mindestens 3.000, eher 5.000 Praxen',
    },
    {
      url: 'https://tiermedizin-in-zahlen.org/beitrag/anteil-tierarztketten-deutschland.html',
      titel: 'Anteil der Tierarztketten in Deutschland: rund 4,5 Prozent',
      satz:
        'Im August 2024 gehörten laut Tierärzte Atlas rund 450 Standorte zu 16 Praxisketten. Wechselt eine Praxis in eine Gruppe, steht oft auch die Praxissoftware zur Entscheidung.',
      beleg: 'rund 450 Standorte zu 16 Praxisketten',
    },
  ],
  7: [
    {
      url: 'https://tiermedizin-in-zahlen.org/beitrag/ueberstunden-tierarztpraxis.html',
      titel: 'Überstunden in der Tierarztpraxis: was die Zahlen zeigen',
      satz:
        '75 Prozent der angestellten Tierärzte leisten Nacht- oder Wochenenddienste (Befragung des Bundes angestellter Tierärzte, Ende 2025). Online-Sprechstunden können Fragen nach Praxisschluss vorsortieren.',
      beleg: '75 Prozent leisten Nacht- oder Wochenenddienste',
    },
  ],
  8: [
    {
      url: 'https://tiermedizin-in-zahlen.org/beitrag/telemedizin-tierarzt.html',
      titel: 'Videosprechstunde beim Tierarzt: Recht, Kosten, Anbieter',
      satz:
        'Eine eigene GOT-Position für Videosprechstunden gibt es nicht: Nach GOT 2022 wird sie als Beratung ohne Untersuchung abgerechnet, 11,26 Euro im einfachen Satz. Das ist der Rahmen für die Kalkulation.',
      beleg: 'GOT 2022: Beratung ohne Untersuchung, auch telefonisch (Nr. 1), 11,26 Euro im einfachen Satz',
    },
    {
      url: 'https://tiermedizin-in-zahlen.org/beitrag/telemedizin-tierarzt.html',
      titel: 'Telemedizin beim Tierarzt: was erlaubt ist, was es kostet',
      satz:
        'Eine Videoberatung rechnet die Praxis nach GOT 2022 als Beratung ohne Untersuchung ab: 11,26 Euro im einfachen, 33,78 Euro im dreifachen Satz. Wie viele Praxen Videosprechstunden anbieten, erhebt in Deutschland niemand repräsentativ.',
      beleg: '11,26 Euro im einfachen Satz, 33,78 Euro im dreifachen',
    },
  ],
  9: [
    {
      url: 'https://tiermedizin-in-zahlen.org/beitrag/tierarztbesuche-hund-katze.html',
      titel: 'Wie oft muss ein Hund zum Tierarzt? Empfehlung und Zahlen',
      satz:
        'In einer Online-Umfrage der LMU München (Dissertation 2021) waren nur 46,8 Prozent der Hunde nach Leitlinie aktuell geimpft. Ein direkter Kanal zum Halter kann an fällige Termine erinnern.',
      beleg: 'nach den Intervallen der Impfleitlinie aktuell geschützt aber nur 46,8 Prozent',
    },
    {
      url: 'https://tiermedizin-in-zahlen.org/beitrag/tierarztbesuche-hund-katze.html',
      titel: 'Wie oft gehen Hunde und Katzen zum Tierarzt?',
      satz:
        'Fast alle Hunde waren irgendwann geimpft, nach den Intervallen der Impfleitlinie aktuell aber nur 46,8 Prozent (Online-Umfrage der LMU München). Erinnerungen an Impf- und Vorsorgetermine setzen genau dort an.',
      beleg: 'aktuell nach Leitlinie aber nur 46,8 Prozent',
    },
  ],
  10: [
    {
      url: 'https://tiermedizin-in-zahlen.org/beitrag/anzahl-tieraerzte-deutschland.html',
      titel: 'Wie viele Tierärzte gibt es in Deutschland? Zahlen 2025',
      satz:
        'Rund 10.000 Tierarztpraxen und Tierkliniken nennt der Tierärzte Atlas Deutschland 2024. Bei dieser Zahl brauchen Tierhalter ein Verzeichnis, um eine passende Praxis in der Nähe zu finden.',
      beleg: 'Rund 10.000 Tierarztpraxen und Tierkliniken nennt der Tierärzte Atlas Deutschland 2024',
    },
    {
      url: 'https://tiermedizin-in-zahlen.org/beitrag/niedergelassene-tieraerzte-deutschland.html',
      titel: 'Niedergelassene Tierärzte in Deutschland 2025: 11.216',
      satz:
        'Ende 2025 führten laut Bundestierärztekammer 5.930 Inhaberinnen und Inhaber eine reine Kleintierpraxis, 1.932 eine reine Nutztier- oder Pferdepraxis. Verzeichnisse helfen Haltern, nach Tierart zu filtern.',
      beleg: '5.930 von ihnen führten eine reine Kleintierpraxis',
    },
  ],
  11: [
    {
      url: 'https://tiermedizin-in-zahlen.org/beitrag/tiergesundheitsmarkt-deutschland.html',
      titel: 'Tierarzneimittelmarkt Deutschland: 1.098 Mio. Euro 2025',
      satz:
        'Der Tierarzneimittelmarkt wuchs 2025 laut Bundesverband für Tiergesundheit auf 1.098 Mio. Euro, 60,6 Prozent davon für Heimtiere und Pferde. Entsprechend breit ist, was Praxen nachschlagen.',
      beleg: 'wuchs 2025 um 4,7 Prozent auf 1.098 Mio. Euro',
    },
    {
      url: 'https://tiermedizin-in-zahlen.org/beitrag/antibiotika-tierhaltung.html',
      titel: 'Antibiotika in der Tierhaltung: 562 Tonnen, minus 67 Prozent',
      satz:
        '2024 gingen laut BVL 562,1 Tonnen Antibiotika an Tierärztinnen und Tierärzte, 67 Prozent weniger als 2011. Gezielter Einsatz setzt aktuelle Informationen zu Wirkstoffen und Resistenzen voraus.',
      beleg: '562,1 Tonnen Antibiotika an Tierärztinnen und Tierärzte',
    },
  ],
  12: [
    {
      url: 'https://tiermedizin-in-zahlen.org/beitrag/anzahl-haustiere-deutschland.html',
      titel: 'Anzahl Haustiere in Deutschland 2025 – Entwicklung seit 1991',
      satz:
        '2025 lebten laut IVH und ZZF 15,7 Millionen Katzen und 10,0 Millionen Hunde in Deutschland. Wer davon ein Fundtier wird, findet nur über einen registrierten Chip nach Hause.',
      beleg: 'Das häufigste Haustier ist die Katze mit 15,7 Millionen',
    },
  ],
  13: [
    {
      url: 'https://tiermedizin-in-zahlen.org/beitrag/anzahl-tieraerzte-deutschland.html',
      titel: 'Wie viele Tierärzte gibt es in Deutschland? Zahlen 2025',
      satz:
        'Ende 2025 arbeiteten laut Bundestierärztekammer 12.125 angestellte Tierärztinnen und Tierärzte in Praxen, mehr als die 11.216 Inhaber. Praxen müssen sich damit stärker als Arbeitgeber zeigen.',
      beleg: 'In den Praxen arbeiteten 12.125 Angestellte und 11.216 Inhaberinnen und Inhaber',
    },
    {
      url: 'https://tiermedizin-in-zahlen.org/beitrag/gehalt-tierarzt.html',
      titel: 'Gehalt Tierarzt 2025: brutto und netto nach Berufsjahren',
      satz:
        'Zum Berufseinstieg verdienen angestellte Tierärztinnen und Tierärzte laut Befragung des Bundes angestellter Tierärzte (Ende 2025) im Median 3.701 Euro brutto. Wer Personal sucht, muss mehr bieten als Gehalt.',
      beleg: '3.701 Euro brutto im Monat',
    },
  ],
  14: [
    {
      url: 'https://tiermedizin-in-zahlen.org/beitrag/ueberstunden-tierarztpraxis.html',
      titel: 'Überstunden in der Tierarztpraxis: was die Zahlen zeigen',
      satz:
        '54,6 Prozent der angestellten Tierärztinnen und Tierärzte arbeiten laut Befragung des Bundes angestellter Tierärzte (Ende 2025) in Teilzeit. Fortbildung, die sich zeitlich frei einteilen lässt, passt dazu.',
      beleg: 'gut die Hälfte der Befragten (54,6 Prozent) arbeitet in Teilzeit',
    },
    {
      url: 'https://tiermedizin-in-zahlen.org/beitrag/tiermedizinische-fachangestellte.html',
      titel: 'Tiermedizinische Fachangestellte: Zahl, Ausbildung, Gehalt',
      satz:
        'Laut Bundesagentur für Arbeit arbeiten 27.198 Tiermedizinische Fachangestellte sozialversicherungspflichtig (Juni 2025), 2013 waren es 14.591. Fortbildung, die sich zeitlich frei einteilen lässt, erreicht auch das Praxisteam neben den Tierärzten.',
      beleg: 'In Deutschland arbeiten 27.198 Tiermedizinische Fachangestellte (TFA) sozialversicherungspflichtig',
    },
  ],
};
