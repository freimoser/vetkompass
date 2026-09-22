# Keyword-Recherche: Die digitale Tierarztpraxis

**Stand:** 22.09.2026 · **Seite:** noch nicht live (kein Domain, keine Search Console)

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
konkurriert in der Wahrnehmung mit dem englischsprachigen Markt. Für
`vetkompass.de` ist das verkraftbar — „Kompass" ist deutsch und die
Länderendung eindeutig. Ein reines `vetsomething.com` wäre es nicht.

Zur Einordnung: Eine Keyword-Domain bringt seit dem EMD-Update 2012 kaum
Ranking-Vorteil, und für Antwortmaschinen gar keinen — die zitieren nach Marke
und Belegbarkeit. Der Markenname ist hier die richtige Wahl.

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
4. **Stimmen die zwölf Anbieter-Kandidaten aus 5.1?** Keiner ist gegen die
   Anbieterseite geprüft.
5. **Was fragen Praxen wirklich?** People Also Ask und Autocomplete zeigen, was
   getippt wird. Die wertvollsten Fragen stehen erfahrungsgemäß woanders — in
   Fachgruppen, unter LinkedIn-Posts, in Praxisgesprächen. **Die Kommentare unter
   Post 1 haben bereits neun Anbieter geliefert, die keine Keyword-Liste gezeigt
   hätte.** Diese Quelle ist für dieses Projekt ergiebiger als jedes Werkzeug und
   sollte systematisch ausgewertet werden.

---

## Nächster Schritt

Nach Nutzen sortiert, nicht nach Aufwand:

1. **Die zwölf Kandidaten aus 5.1 prüfen** — direkter Gewinn für die Übersicht,
   unabhängig von jeder SEO-Frage.
2. **Versicherer-Segment und KI-Telefonassistenz einordnen** — entweder
   Kategoriebeschreibung erweitern oder bewusst ausschließen und begründen.
3. **Begriffsteil anlegen** — der einzige Hebel, der bei vorhandener KI-Übersicht
   noch wirkt, und er zahlt zugleich auf `llms.txt` ein.
4. **Trends selbst abfragen** (Punkt 7.1) und das Ergebnis hier nachtragen.
