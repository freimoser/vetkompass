/**
 * Brücke zu Tiermedizin in Zahlen (Schwesterseite, vom selben Herausgeber):
 * je Lösungsfeld Statistiken, die zeigen, warum das Feld für Praxen zählt.
 *
 * Jede Zahl steht wörtlich im verlinkten Artikel (`beleg`, geprüft am
 * 26.11.2026 gegen die Live-Seite). Felder ohne passenden Artikel bleiben leer;
 * die Anfragen an die Schwesterseite stehen in docs/prompts-tiermedizin-in-zahlen.md.
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
      url: 'https://tiermedizin-in-zahlen.org/beitrag/tierarztmangel-deutschland.html',
      titel: 'Tierarztmangel in Deutschland: was die Zahlen zeigen',
      satz:
        '2025 kamen rechnerisch 2.291 Hunde und Katzen auf jeden Praxisinhaber (Bundestierärztekammer, IVH/ZZF), 2000 waren es 1.668. Online-Buchung nimmt einen Teil der Terminanfragen vom Telefon.',
      beleg: 'auf jeden kommen inzwischen 2.291 Hunde und Katzen statt 1.668',
    },
  ],
  3: [
    {
      url: 'https://tiermedizin-in-zahlen.org/beitrag/ueberstunden-tierarztpraxis.html',
      titel: 'Überstunden in der Tierarztpraxis: was die Zahlen zeigen',
      satz:
        'Praxisinhaber arbeiten laut Gutachten zur Gebührenordnung (Befragung 2020) rund 50 Stunden pro Woche, rund 22 davon in Verwaltung, Personal und Fahrten. Digitale Aufnahme verlagert Formulare vor den Besuch.',
      beleg: 'rund 22 Stunden gingen in Verwaltung, Personal und Fahrten',
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
  ],
};
