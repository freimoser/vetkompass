# Keyword-Recherche: Die digitale Tierarztpraxis

**Stand:** 23.09.2026 (Erstfassung 22.09.2026) · **Seite:** noch nicht live (keine Domain, keine Search Console)

Diese Datei trennt **gemessen** von **nicht erhoben**. Wer sie in einem Jahr
liest, muss sehen, worauf er sich verlassen darf. Es steht keine geschätzte Zahl
darin — wo keine Zahl erhoben wurde, steht „nicht erhoben".

---

## 1. Methode: welche Quelle liefert was — und was nicht

| Quelle | Status | Liefert | Liefert **nicht** |
|---|---|---|---|
| Google Autocomplete | ✅ erhoben, 296 Anfragen, 0 Fehler, 88 eindeutige Vorschläge | dass eine Formulierung gesucht wird; DE/AT/CH getrennt | wie oft. **Die Reihenfolge ist keine Volumenreihenfolge** |
| Google SERP (manuell) | ✅ 2 Begriffe geprüft | Absicht, Wettbewerber, AI-Overview-Präsenz, PAA | systematische Abdeckung |
| Google Trends | ❌ **HTTP 429** | — | Marktrichtung. **Bot-Prüfungen werden nicht gelöst** → Übergabe, siehe Abschnitt 7 |
| Search Console | ❌ nicht verfügbar | — | die einzigen echten Zahlen. Erst ab Livegang und Anmeldung, **nicht rückwirkend** |
| Keyword-Planer / Ahrefs | ❌ nicht erhoben | — | Absolutvolumina |
| Autocomplete-Sweep 2 (Begriffe) | ✅ 23.09.2026, 192 Anfragen, 0 Fehler, **17** eindeutige Vorschläge | dass nach Fachbegriffen **nicht** gesucht wird | siehe 3.5 |
| Eigene Auslieferung (curl, ohne JS) | ✅ gemessen | was ein Crawler ohne JavaScript sieht | siehe 2.4 |

**Konsequenz:** Diese Recherche kann Absicht und Wortwahl belegen, Größe nicht.
Priorisiert wird deshalb nach Absicht und Gewinnbarkeit, nicht nach Volumen.

Sweep-Skript: `scripts/` enthält es nicht — es lief einmalig, die Rohausgabe
liegt nicht im Repository. Seeds und Vorgehen stehen in Abschnitt 3.

---

## 2. Zentraler Befund

### 2.1 Der Klick ist bei genau dem Begriff weg, der am besten passt

Bei **`digitalisierung tierarztpraxis`** steht eine **KI-Übersicht** über den
Ergebnissen. Ihr Inhalt gliedert sich in:

> Online-Terminvergabe · Digitale Patientenakte · Cloud Computing ·
> Telemedizin & Videosprechstunden · Patienten-Apps · KI-gestützte Dokumentation

Das sind — bis auf die Reihenfolge — **die Kategorien dieser Marktübersicht**.
Die Frage, die diese Seite beantwortet, beantwortet Google bereits oberhalb der
Ergebnisse. Zitiert werden dort unter anderem **inBehandlung** und **VetZ** —
beides Anbieter aus unserer eigenen Übersicht.

**Daraus folgt die Zielgröße:** nicht Klicks, sondern **zitiert werden**. Das
ist eine andere Inhaltsform — kurze belegbare Aussagen, Tabellen, Definitionen,
klare Quellen. Der Hebel dafür liegt bereits im Projekt: `llms.txt` wird von
`scripts/gen-seo.mjs` erzeugt, sobald die Domain steht.

### 2.2 Es sind zwei Märkte, nicht einer

Der Sweep trennt sie scharf:

| | Formulierungen | Absicht |
|---|---|---|
| **Tierhalter (B2C)** | `tierarzt online termin berlin / bochum / hamburg / köln / münchen / essen / kiel / oldenburg`, `tierarzt app`, `tierarzt notdienst app` | lokal, transaktional |
| **Praxen (B2B)** | `praxissoftware tierarzt`, `tierarzt software vergleich`, `tierarzt software cloud`, `praxismanagement software tierarzt` | kommerziell-informational |

Die Marktübersicht bedient **ausschließlich B2B**. Die Masse der Anfragen liegt
erkennbar bei B2C — zu erkennen an der Dichte der Städtevarianten, die
Autocomplete nur bei häufigen Mustern ausspielt. **Diese Nachfrage wird bewusst
nicht bedient** (Abschnitt 6).

### 2.4 Die Seite war für Antwortmaschinen unsichtbar

**Nachtrag 23.09.2026.** Vor allem anderen stand ein Befund, der jede weitere
GEO-Überlegung erledigt hätte:

```
Sichtbarer Text im ausgelieferten dist/index.html: 0 Zeichen
Anbietername im HTML: keiner
```

Die Startseite ist eine React-Anwendung und lieferte ein leeres
`<div id="root">` aus. Googlebot rendert JavaScript nach und wäre damit
zurechtgekommen. **GPTBot, ClaudeBot und PerplexityBot überwiegend nicht.**

Das erklärte Ziel aus 2.1 lautet „zitiert werden". Eine `llms.txt` beschreibt
die Seite – zitiert wird aber die Seite selbst. Solange dort nichts stand, war
das Ziel unerreichbar, gleich wie gut die Datei formuliert war.

**Behoben** durch Vorrendern zur Bauzeit (`scripts/prerender.mjs`). Gemessen
nach der Änderung:

| | vorher | nachher |
|---|---|---|
| Startseite, Wörter ohne JavaScript | 0 | 734 |
| Artikel `/tierarzt-software.html` | existierte nicht | 1.295 |

Zwei Nebenbefunde aus derselben Prüfung:

- Die Kategorieüberschriften enthielten die Anbieterzahl zweimal – einmal
  sichtbar, einmal als Text für Hilfsmittel. Wer den Text ohne CSS ausliest,
  und das tut jede Antwortmaschine, las „**1919 Anbieter**". Behoben über
  `aria-label` statt eines zweiten Textknotens.
- Die Anbieterbeschreibungen stehen im Dialog und entstehen erst per Klick.
  Sie sind auch vorgerendert nicht im HTML. Genau diese Lücke schließt der
  neue Artikel.

### 2.3 Marktrichtung: nicht erhoben

Google Trends antwortete mit 429. Ob das Thema wächst oder schrumpft, ist damit
**offen**. Siehe Abschnitt 7 für die Übergabe.

Ein schwaches Indiz aus dem Sweep, ausdrücklich kein Beleg: 296 Anfragen
ergaben nur 88 eindeutige Vorschläge, und ein erheblicher Teil davon war
Ortsnamen-Rauschen. Für ein Verbraucherthema wären es hunderte. Das passt zu
einem **engen B2B-Nischenmarkt** — mehr lässt sich daraus nicht ableiten.

---

## 3. Die Wortwahl des Marktes

Seeds im Vollsweep (Seed + a–z + sieben Fragewörter, Markt DE):
`praxissoftware tierarzt`, `tierarzt software`, `tierarztpraxis digitalisierung`,
`online terminbuchung tierarzt`, `ki tierarzt`, `tierarzt app`,
`telemedizin tier`, `veterinär software`.
Flach zusätzlich zwölf Varianten; AT und CH mit sechs Seeds gegengeprüft.

### 3.1 Der Markt schreibt getrennt

**`tierarzt praxis software`** ist der einzige fachlich relevante Vorschlag, der
aus **drei** Seeds und in **allen drei Ländern** auftauchte — mehr als
`praxissoftware tierarzt` (ein Seed). Die Getrenntschreibung ist also nicht die
Ausnahme, sondern verbreitet.

**Konsequenz für Überschriften:** beide Schreibweisen im Text unterbringen,
nicht nur die zusammengesetzte.

### 3.2 „vet" allein zieht den englischen Markt

`vet software` liefert ausschließlich englische Vorschläge: `australia`, `nz`,
`uk`, `companies`, `jobs`, `login`, `hub`, `programs`, `systems`. Kein einziger
deutscher Treffer.

**Konsequenz für die Domain:** Ein Name mit „vet" ohne deutschen Zusatz
konkurriert in der Wahrnehmung mit dem englischsprachigen Markt. Ein reines
`vetsomething.com` scheidet damit aus — der zweite Bestandteil muss deutsch sein.

### 3.2.1 Nachtrag 23.09.2026: die Empfehlung `vetkompass.de` ist zurückgezogen

Die Domain ist bei DENIC frei. Der **Name** ist es nicht — im selben Feld stehen
bereits zwei Nachbarn:

- **tierarztkompass.de** ist aktiv und führt „12.985 Praxen". Ein B2C-Verzeichnis,
  gleiches Feld, gleicher Namensbaustein.
- **tieraerzteatlas.de** („Tierärzte Atlas Deutschland", Projekt des Dessauer
  Zukunftskreises, von den Branchenverbänden getragen) berichtet über Markt- und
  Personalentwicklung der Tiermedizin. Damit ist auch „Atlas" besetzt — und zwar
  von genau der Sorte Projekt, mit der eine Marktübersicht verwechselt würde.

Die beiden naheliegenden Metaphern sind also vergeben. Für die Zielgröße aus 2.1
— **zitiert werden** — ist Verwechselbarkeit der teuerste Fehler: Eine
Antwortmaschine, die „Kompass" und „Atlas" im Tierarztkontext bereits kennt,
sortiert eine dritte Quelle in denselben Topf.

Zur Einordnung: Eine Keyword-Domain bringt seit dem EMD-Update 2012 kaum
Ranking-Vorteil, und für Antwortmaschinen gar keinen — die zitieren nach Marke
und Belegbarkeit. Ein eigener Markenname bleibt die richtige Wahl; er muss nur
unverwechselbar sein.

Bei DENIC geprüft und **frei** (23.09.2026): `vetlotse.de` (auch `.com`),
`vetlandschaft.de`, `vetwegweiser.de`, `vetnavigator.de`, `vetatlas.de`,
`die-digitale-tierarztpraxis.de`, `tierarztpraxis-digital.de`.
Bereits **vergeben**: `tierarztkompass.de`, `vetdigital.de`, `digitalvet.de`,
`vetmarkt.de`, `praxisvet.de`, `praxisatlas.de`, `vetscope.de`.

**Eine Markenrecherche ist damit ausdrücklich nicht erledigt.** Geprüft wurde
DENIC-Verfügbarkeit und offene Websuche, nicht DPMAregister und nicht EUIPO.

### 3.3 DACH weicht ab

`tierarzt software österreich` und `tierarzt software schweiz` existieren als
eigene Vorschläge. Das stützt die Länderdimension der Übersicht — der
Länderfilter ist damit kein Selbstzweck, sondern bildet eine reale Suchfrage ab.
Voraussetzung: die `countries`-Daten müssen belastbar werden (siehe
`src/data/providers.ts`, dort steht derzeit pauschal DACH).

### 3.4 Rauschen, das ein Befund ist

`tierarzt app` liefert überwiegend Unbrauchbares: `appelhülsen`, `appenweier`,
`appenzell`, `approbation`, `tierarzt spiel app`, `tierarzt app für kinder`,
`tierarzt app höhle der löwen`. Deutsche Ortsnamen auf „App-" kapern den Begriff.

**Konsequenz:** „App" ist als Überschriften- oder Domainbestandteil unbrauchbar.
Die Kategorie heißt in der Übersicht ohnehin „Tierhalter-App / Patientenportal" —
der Zusatz rettet sie.

### 3.5 Nach Fachbegriffen fragt niemand — Sweep 2 vom 23.09.2026

Vor dem Schreiben des Begriffsteils wurde dessen Nachfrage geprüft: 22 Seeds
aus dem geplanten Glossar, je mit sieben Fragevarianten, DE plus AT und CH.

**192 Anfragen, 0 Fehler, 17 eindeutige Vorschläge.** Zum Vergleich: Sweep 1
ergab bei 296 Anfragen 88 Vorschläge.

Ohne jeden Vorschlag blieben: `pims tierarzt`, `praxismanagementsystem
tierarzt`, `ki dokumentation tierarzt`, `spracherkennung tierarzt`,
`gdt schnittstelle tierarzt`, `patientenportal tierarzt`,
`telemedizin tierarzt erlaubt`, `videosprechstunde tierarzt rechtlich`.

Und `was ist ein pims` führt zu:

> was ist ein pims **getränk** · was ist pimm's für ein **getränk** · wie
> funktioniert **pimsleur**

**Der Fachbegriff gehört in der Suche einem Cocktail.**

**Konsequenz, und sie ist unbequem:** Ein Begriffsteil lässt sich mit
Suchnachfrage **nicht** begründen. Er wurde trotzdem gebaut — aber als
GEO-Maßnahme, nicht als SEO-Maßnahme. Definitionen sind das, was
Antwortmaschinen zitieren, auch wenn niemand sie eintippt. Wer diese
Unterscheidung nicht macht, misst den Artikel später an Klicks und hält ihn
für gescheitert.

Der eine Cluster, der im Sweep kräftig feuerte, ist B2C und wird bewusst nicht
bedient (Abschnitt 6): `tierarzt online rezept` in fünf Formulierungen, alle
drei Länder. Die SERP dazu bestätigt es — Dr. SAM, Dr. Fressnapf, Pfotendoctor,
Online-Apotheken, keine KI-Übersicht. Reine Tierhalter-Nachfrage.

---

## 4. Cluster, nach Nutzen sortiert

### A. Vergleich und Auswahl von Praxissoftware — höchste Passung, größte Spannung

`tierarzt software vergleich` (AT+CH+DE, zwei Seeds), `praxissoftware tierarzt
kostenlos` (AT+CH+DE), `tierarzt software cloud`, `tierarzt software kostenlos`,
`praxismanagement software tierarzt`.

Die SERP zu `tierarzt software vergleich` zeigt: **Keine KI-Übersicht**,
dafür People Also Ask mit vier Fragen:

- Welche Tierarzt-Software gibt es?
- Welche Arztsoftware ist die beste?
- Welche Software benutzen Arztpraxen?
- Welche Praxissoftware ist der Marktführer?

**Die Spannung:** „Vergleich", „kostenlos", „Marktführer" und „die beste" sind
Rangfolge- und Preisfragen. Die Übersicht beantwortet bewusst **keine davon**.
Wer auf diesen Begriff optimiert, verspricht etwas, das die Seite nicht liefert
— und enttäuscht genau die Leser, die kommen.

**Empfehlung:** Den Cluster bedienen, aber die Frage umdeuten statt sie zu
beantworten. „Welche gibt es überhaupt?" ist eine legitime und ehrliche Antwort
auf „Welche ist die beste?" — und es ist die einzige, die diese Seite geben darf.

#### Nachtrag 23.09.2026: die SERP zu `welche tierarzt software gibt es`

Geprüft, weil das die Formulierung ist, die der Artikel bedienen sollte.

- **Keine KI-Übersicht.** Der Klick ist hier intakt — anders als bei
  `digitalisierung tierarztpraxis` (2.1). Das ist der Grund, warum dieser
  Begriff und nicht jener zur Überschrift wurde.
- **Platz 1: Medizinio** mit Bewertungssternen im Ergebnis (4,5 aus 14). Ein
  Verzeichnis, kein Anbieter.
- **Weitere Fragen:** „Welche Software benutzen Arztpraxen?" · „Welche
  Tierarzt-Apps gibt es?" · „Welche Arztsoftware ist die beste?" · „Gibt es
  eine kostenlose Arztsoftware?"
- **Anzeige** von vetpraxis.de — der Begriff ist kommerziell genug, dass Geld
  darauf gesetzt wird.
- **Wird auch oft gesucht:** neben den bekannten Varianten zweimal
  **„Erfahrungen"** (`FreeVet erfahrungen`, `Vetpraxis Software Erfahrungen`).
  Das ist ein eigener Bedarf, den die Übersicht nicht deckt und mangels
  Erhebungsgrundlage auch nicht decken sollte.

**Umgesetzt:** `/tierarzt-software.html` beantwortet die Frage wörtlich in H1
und Titel, listet alle PIMS-Anbieter als Fließtext und beantwortet die vier
Weitere-Fragen-Einträge sichtbar und als `FAQPage`. Die Frage nach „der besten"
wird ausdrücklich nicht beantwortet, sondern begründet abgelehnt — mit Verweis
auf die Beteiligung des Herausgebers.

### B. KI in der Tierarztpraxis — jung, unbesetzt, mit Produktnamen

`ki tierarzt`, `ki tierarztpraxis`, `online tierarzt ki`, `tierarzt
dokumentation ki` — dazu auffällig: **`ki telefonassistent tierarzt`** und
**`telefon ki tierarzt`** (beide AT+CH+DE, zwei Seeds).

Dass Produktnamen bereits in Autocomplete stehen (`manta ki tierarzt`,
`emma ki tierarzt`, `ki emma tierarzt`), heißt: Der Markt bildet sich gerade,
und einzelne Anbieter sind schon namentlich gesucht. Das ist der Zustand, in dem
eine Übersicht am meisten wert ist.

**KI-Telefonassistenz ist in unserer Kategorie 4 nicht abgebildet.** Kategorie 4
heißt „KI-Dokumentations- & Praxisassistenten" — Telefonannahme ist etwas
anderes als Dokumentation. Entweder Beschreibung erweitern oder eigene Kategorie.

### C. Telemedizin — mit einem übersehenen Segment

`telemedizin tierarzt`, `telemedizin tiere`, `telemedizin tiermedizin`,
`tierarzt videosprechstunde`.

Dabei traten drei **Versicherer** auf: `barmenia videosprechstunde tierarzt`,
`hansemerkur tierversicherung telemedizin`, `videosprechstunde tierarzt petolo`.

**Tierversicherungen mit eingebautem Telemedizin-Angebot sind ein Segment, das
die Übersicht komplett übersieht.** Sie sind für Tierhalter ein realer Zugang
zum Online-Tierarzt — funktional dasselbe wie Doktor Fressnapf, das bereits in
Kategorie 7 steht.

### D. Digitalisierung allgemein — nur noch für Zitierfähigkeit

`digitalisierung tierarztpraxis`, `digitalisierung tiermedizin` (AT+CH+DE).
Siehe Abschnitt 2.1: KI-Übersicht vorhanden, Klick weitgehend weg.

---

## 5. Lücken gegen den eigenen Bestand

### 5.1 Anbieter-Kandidaten, die die Recherche zutage gefördert hat

Alle **unbestätigt** — aus Autocomplete und SERP-Snippets, nicht gegen die
Anbieterseiten geprüft. Vor Aufnahme verifizieren.

| Kandidat | Vermutete Kategorie | Quelle |
|---|---|---|
| VET4.0 (vet40.de, BTE GmbH) | 6 PIMS | SERP `tierarzt software vergleich` |
| Focus Software GmbH | 6 PIMS | VET-MAGAZIN-Snippet |
| FreeVet | 6 PIMS | VET-MAGAZIN-Snippet |
| PRAXISvet | 6 PIMS | VET-MAGAZIN-Snippet |
| SK Informationssysteme e.K. | 6 PIMS | VET-MAGAZIN-Snippet |
| SUPER Lab | 6 PIMS | VET-MAGAZIN-Snippet |
| TierData | 6 PIMS | VET-MAGAZIN-Snippet |
| Manta | 4 KI | Autocomplete `manta ki tierarzt` |
| Emma | 4 KI (Telefonassistenz) | Autocomplete `emma ki tierarzt` |
| Petolo | 7 Videosprechstunde | Autocomplete |
| Barmenia | 7 Videosprechstunde | Autocomplete |
| HanseMerkur | 7 Videosprechstunde | Autocomplete |

Die VET-MAGAZIN-Liste stand unter `vet-magazin.de/software-tieraerzte` und
liefert inzwischen **404** — die Namen stammen aus dem Google-Snippet. Die Seite
ist offenbar umgezogen oder entfernt.

#### Nachtrag 23.09.2026

**VET-MAGAZIN ist wieder da**, unter
`vet-magazin.de/firmennews-deutschland/software-tieraerzte.html`. Der Abruf
antwortet allerdings mit **403 und einer Cloudflare-Bot-Prüfung**. Bot-Prüfungen
werden nicht gelöst — die Seite ist im Browser zu öffnen und auszuwerten,
Übergabe in Abschnitt 7.

Vier weitere Kandidaten aus der SERP, ebenfalls **unbestätigt**:

| Kandidat | Vermutete Kategorie | Quelle |
|---|---|---|
| vetpraxis.de | 6 PIMS | Anzeige und organisches Ergebnis |
| tiermedicus | 6 PIMS | VET-MAGAZIN-Snippet |
| TPV für Windows | 6 PIMS | VET-MAGAZIN-Snippet |
| V-IUS Veterinär | 6 PIMS | VET-MAGAZIN-Snippet |

Ausdrücklich **keine** Kandidaten, obwohl sie gut ranken: `medizinio.de`,
`appvizer.de`, `unomed.ch`, `musterpraxis.de`, `capterra`. Das sind
Vergleichsverzeichnisse, also Wettbewerber der Übersicht, keine Anbieter.

**Erledigt:** `Vet7Well` hatte keine Adresse und stand als TODO. Die SERP löste
es — die richtige Schreibweise ist **VET7.well**, die Seite liegt unter
`vet7.net` und antwortet mit HTTP 200. In `src/data/providers.ts` nachgetragen.

### 5.2 Struktur-Lücken

- **KI-Telefonassistenz** hat keine Heimat in den neun Kategorien (siehe 4B).
- **Versicherer mit Telemedizin** sind nicht abgebildet (siehe 4C).
- **Die Seite hat außer den Anbieterbeschreibungen keinen Text.** Für
  Zitierfähigkeit in Antwortmaschinen ist das zu dünn: Es gibt nichts zu
  zitieren außer Namen. Ein Begriffsteil („Was ist ein PIMS?", „Was unterscheidet
  praxiseigene von offener Videosprechstunde?") wäre der direkte Hebel — und
  passt zur `DefinedTermSet`-Empfehlung aus dem Livegang-Skill.

### 5.3 Wettbewerb: das Feld ist nicht leer

Für `tierarzt software vergleich` stehen bereits:

- **unomed.ch** — „Tierarzt-Software im Vergleich 2026", zwölf Entscheidungskriterien
- **Capterra** — Verzeichnis mit Vergleichswerkzeug
- **petflare.io** (23.07.2026) — „Kein Ranking, sondern eine Checkliste" — **fast
  identische Positionierung wie unsere**
- **musterpraxis.de** — Plattform zum Vergleich von Software und Anbietern
- **VET-MAGAZIN** — Anbieterliste (derzeit 404)

Bemerkenswert: **Tiermedizinportal** schreibt auf Platz 3, es gebe „Vergleichs-
oder Testportale für den sehr spezialisierten Markt der Tierarzt-Praxen-Software
nicht". Das stimmt so nicht mehr — und zeigt, wie jung das Feld ist.

**Der Unterschied unserer Seite bleibt:** Die anderen vergleichen Praxissoftware.
Unsere Übersicht bildet **neun Lösungsfelder entlang der Praxisabläufe** ab, nicht
nur PIMS. Das ist die Nische, und sie ist frei.

---

## 6. Nachfrage, die bewusst nicht bedient wird

Schriftlich festgehalten, damit es niemand in sechs Monaten als „übersehene
Chance" nachbaut.

| Nachfrage | Warum nicht |
|---|---|
| `tierarzt online termin <Stadt>` und alle lokalen B2C-Anfragen | Anderes Publikum. Die Übersicht richtet sich an Praxen, nicht an Tierhalter auf Terminsuche. Ein Verzeichnis zu bauen wäre ein anderes Produkt |
| `tierarzt software vergleich` im Wortsinn, `welche ist die beste`, `marktführer` | Die Übersicht trifft **keine Bewertung und keine Rangfolge**. Das ist eine Grundentscheidung, nicht eine Lücke — siehe README, Abschnitt „Redaktionelle Leitlinien" |
| `praxissoftware tierarzt kostenlos`, Preisfragen allgemein | **Keine Preise** in der Übersicht. Preise veralten schneller als jede Pflege und laden zum Vergleichen ein, der hier nicht stattfindet |
| `tierarzt app` als Begriff | Durch Ortsnamen und Kinderspiele unbrauchbar verrauscht (3.4) |

---

## 7. Offene Recherchefragen

Das, was diese Erhebung **nicht** beantworten konnte, und wer es kann.

1. **Wächst der Markt?** Google Trends antwortete mit 429. → **Thomas**: Trends
   im Browser öffnen, Vergleichsset `praxissoftware tierarzt` /
   `digitalisierung tierarztpraxis` / `ki tierarzt`, Zeitraum 5 Jahre, Geo DE.
   Auszuwerten sind **Jahresdurchschnitte**, nicht die Kurve, und der **Sockel
   nach Ausschlägen**. Wichtig: ein Ankerbegriff muss in jedem Vergleich
   mitlaufen, sonst sind zwei Abfragen nicht vergleichbar.
2. **Wie groß ist irgendetwas davon?** Keine Absolutzahl in diesem Dokument ist
   gemessen, weil keine erhoben werden konnte. → Search Console anmelden, sobald
   die Domain steht. Die Daten sind **nicht rückwirkend** — je später die
   Anmeldung, desto später die erste echte Zahl.
3. **Steht bei `praxissoftware tierarzt` eine KI-Übersicht?** Nur zwei SERPs
   wurden geprüft. Bei den übrigen Cluster-A-Begriffen ist es offen.
4. **Stimmen die Anbieter-Kandidaten aus 5.1?** Inzwischen sind es sechzehn.
   Geprüft ist keiner — außer VET7.well, das dabei herausfiel und bestätigt
   wurde.
5. **Wird der Artikel tatsächlich zitiert?** Die Wirkung einer GEO-Maßnahme
   lässt sich nicht über Rankings messen. Prüfbar wird sie nur durch
   Stichproben: dieselbe Frage in mehreren Antwortmaschinen stellen und
   nachsehen, welche Quellen genannt werden. Vorher-Messung fehlt, nachholbar
   ist sie nicht — ab jetzt vierteljährlich, mit Datum.
6. **Was fragen Praxen wirklich?** People Also Ask und Autocomplete zeigen, was
   getippt wird. Die wertvollsten Fragen stehen erfahrungsgemäß woanders — in
   Fachgruppen, unter LinkedIn-Posts, in Praxisgesprächen. **Die Kommentare unter
   Post 1 haben bereits neun Anbieter geliefert, die keine Keyword-Liste gezeigt
   hätte.** Diese Quelle ist für dieses Projekt ergiebiger als jedes Werkzeug und
   sollte systematisch ausgewertet werden.

---

## Nächster Schritt

Stand 23.09.2026. Erledigt ist, was durchgestrichen wäre — hier stattdessen
ausgewiesen:

**Erledigt:**

- ~~Begriffsteil anlegen~~ → `/tierarzt-software.html`, acht Begriffe als
  `DefinedTermSet`, vier Fragen als `FAQPage`, Anbieterliste aus den Daten
  erzeugt.
- ~~Seite für Antwortmaschinen lesbar machen~~ → Vorrendern, 0 → 734 Wörter
  (2.4). **Das war der eigentliche Hebel, nicht die Wortwahl.**
- ~~Vet7Well-Adresse klären~~ → VET7.well, `vet7.net`.

**Offen, nach Nutzen sortiert:**

1. **Die sechzehn Kandidaten aus 5.1 prüfen** — direkter Gewinn für die
   Übersicht, unabhängig von jeder SEO-Frage.
2. **Versicherer-Segment und KI-Telefonassistenz einordnen** — entweder
   Kategoriebeschreibung erweitern oder bewusst ausschließen und begründen.
3. **Die `countries`-Daten belastbar machen.** In `providers.ts` steht bei fast
   jedem Anbieter pauschal DACH. `tierarzt software österreich` und
   `… schweiz` sind belegte eigene Anfragen (3.3) — solange die Länderangaben
   geraten sind, ist der Filter Dekoration und die Länderdimension wertlos.
4. **Domain entscheiden und Search Console anmelden.** Ohne Domain entstehen
   Sitemap, `llms.txt` und alle Canonicals gar nicht erst, und die einzigen
   echten Zahlen bleiben unerreichbar. Die Daten sind nicht rückwirkend.
5. **Trends selbst abfragen** (Punkt 7.1) und das Ergebnis hier nachtragen.
6. **VET-MAGAZIN im Browser auswerten** (5.1, Nachtrag) — hinter der
   Bot-Prüfung liegt die vollständigste bekannte Anbieterliste des Marktes.
