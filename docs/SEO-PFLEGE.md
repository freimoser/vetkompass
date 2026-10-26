# SEO- und GEO-Pflege

Protokoll der Pflegerunden nach der Skill `website-seo-pflege`. Je Runde: was
gemessen wurde, was gefunden wurde, warum es ein Fehler war und **welche Prüfung
jetzt verhindert, dass er wiederkommt**.

Befunde werden eingeordnet als **echt**, **Fehlalarm** (die Prüfung passt nicht
zu dieser Seite) oder **Werkzeugwunsch** (kein etablierter Standard).

---

## Runde 1 – 27.09.2026

### Vorbedingung nicht erfüllt: Die Seite ist noch nicht live

Domain `die-digitale-tierarztpraxis.de` nicht registriert, Repository privat,
GitHub Pages nicht aktiv. Gemessen wurde deshalb gegen den Produktions-Build
(`VITE_SITE_URL` gesetzt), lokal ausgeliefert.

| Quelle | Stand | Grund |
|---|---|---|
| Search Console | **nicht erhoben** | keine Daten ohne Livegang – kein Befund |
| GEO-Audit (`geo-optimizer`) | **nicht erhoben** | Das Werkzeug lehnt `localhost` ab (eingebauter Schutz gegen missbräuchliche Abrufe). Die Sperre wurde bewusst nicht umgangen. **Ausgangswert am Tag des Livegangs nehmen**, mit denselben Adressen wie am Ende der nächsten Runde |
| Build-Audit | erhoben | siehe unten |
| Projektprüfungen | erhoben | `verify`, `check:anbieter` |

Die bekannten GEO-Befunde aus der Skill-Referenz wurden von Hand am Build geprüft:

| Befund | Ergebnis |
|---|---|
| KI-Crawler per robots.txt blockiert | nein – `User-agent: *`, `Allow: /` |
| CDN sperrt KI-Crawler | entfällt – kein CDN vor GitHub Pages |
| `dateModified` fehlt | vorhanden, **aber falsch** – siehe Befund 3 |
| `FAQPage` auf Artikeln | nur auf dem Hauptartikel, dort mit sichtbaren Fragen. Die Prüffragen der Kategorie-Artikel haben keine Antworten und sind deshalb **kein** FAQ – richtig ohne Schema |
| `sameAs` / Autorenseite | fehlt – **nur mit Betreiberdaten lösbar**, siehe offene Punkte |

### Befunde

**1. Sachlicher Fehler in Kategorie 10 – echt.**
„Je ein kommerzielles Portal für Österreich *und die Schweiz*“. Für die Schweiz
gibt es keins; der einzige Eintrag ist die Suche des Berufsverbands GST.
→ Text nach der tatsächlichen Aufteilung neu gefasst.

**2. Von Hand geschriebene Zahlen – echt.**
„Sieben Portale“ und „alle sieben durchgehen“ – beim nächsten Eintrag falsch.
Dieselbe Fehlerklasse wie die „neun Kategorien“ der Livegang-Runde.
→ Platzhalter `{anzahl}` / `{Anzahl}` in `src/data/articles.ts`, aufgelöst in
`scripts/seiten.mjs`.
→ **Prüfung:** Der Build bricht ab, wenn vor „Kategorien“, „Lösungsfelder“,
„Portale“ eine Zahl von Hand steht. Gegentest mit „Acht Portale“: schlägt an.
„Anbieter“ ist ausgenommen – in Kategorie 5 steht „kamen neun Anbieter dazu“,
eine Aussage über das Feedback, keine Zählung.

**3. Datumsangaben nicht belegt – echt.**
`lastmod` in der Sitemap war bei jedem Build das heutige Datum; alle Artikel
trugen fest den 23.09.2026, auch der zu Kategorie 10, den es erst ab 27.09. gab.
→ `scripts/seitenstand.mjs` und `scripts/seitenstand.json`: Fingerabdruck des
sichtbaren Textes je Seite. Das Datum zieht nur bei inhaltlicher Änderung nach,
nicht bei geänderten Linkadressen oder Meta-Tags. Startwerte aus Git.
→ **Prüfung:** `check-launch` vergleicht Sitemap und `dateModified` mit dem
Register und meldet unmögliche Daten. Gegentests: späterer Build ohne Änderung,
nur Link geändert, Text geändert – alle drei verhalten sich richtig.

**4. Kategorie 1 widerspricht Kategorie 10 – echt.**
Kategorie 1 beschrieb sich als „von Verzeichnissen und Bewertungsportalen …“ –
genau die stehen seit dem 27.09. in Kategorie 10.
→ Beide Texte grenzen sich jetzt gegeneinander ab.

**5. Aussage widerspricht den eigenen Daten – echt.**
„Die Einträge … wurden **nie** von der Praxis geprüft“ – während der Datensatz
von Tierarzt-im-Netz.de sagt, Praxen können ihren Eintrag selbst pflegen.
→ „oft nie“.

**6. Erfahrungswissen als Tatsache – echt.**
„Ein gepflegter Eintrag wirkt fast immer stärker als ein Website-Relaunch“ –
nicht gemessen. → als Einschätzung gekennzeichnet.

### Fehlalarme – notiert, damit sie nicht wieder Zeit kosten

| Befund | Werkzeug | Ursache | Behandlung |
|---|---|---|---|
| Startseiten-Description „0 Zeichen“ | Build-Audit der Skill | Muster erwartete das Meta-Tag in einer Zeile | **Skill-Skript korrigiert** (`\s+`), Gegentest mit absichtlichen Fehlern |
| alle Artikel „0 eingehende Links“ | Build-Audit der Skill | zählte nur wurzelrelative Links ohne `.html` (Astro-Konvention) | **Skill-Skript korrigiert**, zählt jetzt relative und `.html`-Links; Astro-Schreibweise weiter geprüft |
| Digitail, VET7.well „Parkseite“ | `check:anbieter` | „sedo“ traf „mousedown“ | nur sichtbarer Text, Wortgrenzen |
| Dr. SAM, Petleo „Weiterleitung“ | `check:anbieter` | Hostname statt Domain verglichen | Vergleich der Domain |
| eine Adresse „nicht erreichbar“ | `check:anbieter` | einzelne Zeitüberschreitung | ein zweiter Versuch vor dem Urteil |
| VETINF „nicht erreichbar“ | `check:anbieter` | Zwischenzertifikat fehlt; Browser ergänzen es, Node nicht | eigene Einordnung „Kette unvollständig“, im Browser bestätigt |
| VET-MAGAZIN 403 | `check:anbieter` | Bot-Schutz gegen automatische Abrufe | im Browser bestätigt, lädt normal |

### Anbieterlinks – das Gegenstück zur Quellenprüfung

Diese Seite zitiert keine Studien; `check-quellen.mjs` der Skill greift hier
nicht. Für eine Marktübersicht sind die **Anbieterlinks** die Quellen: Ein toter
Link, eine geparkte Domain oder eine Weiterleitung auf eine fremde Firma ist
hier, was anderswo eine falsche PubMed-Nummer ist.

→ Neu: `npm run check:anbieter` (Netz nötig, deshalb nicht in `verify`).

Ergebnis: 44 Adressen, **42 in Ordnung**, zwei im Browser bestätigt (VETINF,
VET-MAGAZIN). Geprüfte Weiterleitungen im Skript hinterlegt:

- `vetat.work` → Seite des Herstellers WDT
- `vetsxl.com` → Anmeldeseite unter `myvetsxl.com`. Für eine Praxis wenig
  hilfreich, aber die eigene Adresse des Herstellers; eine öffentliche
  Produktseite gibt es dort nicht

Sieben Anbieter haben weiterhin keine Adresse: Hunderunde, JUST4VETS,
Katzenmedizin, Petla, Vemed, VetMeta, VetSOAP.

### Interne Verlinkung

Kein Handlungsbedarf nach dem Kriterium der Skill (≥ 3 eingehende Links): Die
schwächste Seite hat 9. Alle Verweise laufen allerdings über Navigation und
Abgrenzungsblöcke, keiner steht im Fließtext. Verweise im Satz wären der
nächste Hebel, sind aber kein Befund.

### Stand nach der Runde

| | vorher | nachher |
|---|---|---|
| Build-Audit | 2 Befunde (beide Fehlalarm) | keine |
| `check:launch` mit Domain | keine Blocker | keine Blocker, 15 Seiten, zwei neue Prüfungen |
| Anbieterlinks | nie geprüft | 42 von 44 in Ordnung, 2 im Browser bestätigt |
| GEO-Audit | nicht erhoben | nicht erhoben – Ausgangswert beim Livegang |

### Offen – nur mit Betreiberdaten lösbar

- **`sameAs` im Personen-Schema.** Ohne verlinktes Profil kann eine
  Antwortmaschine den Herausgeber keiner prüfbaren Person zuordnen. Gebraucht:
  die LinkedIn-Adresse.
- **Seite „Über den Herausgeber“.** Stützt die Glaubwürdigkeit und ist bisher
  nur als Transparenzabschnitt vorhanden. Gebraucht: kurze Vita, worauf
  „Experte für digitale Tiermedizin“ beruht, optional ein Foto.

### Nächste Runde

1. **Am Tag des Livegangs:** GEO-Audit mit Startseite und drei Artikeln als
   Ausgangswert, Search Console anmelden.
2. VET-MAGAZIN-Liste im Browser auswerten (dort liegen die 16 Anbieter-Kandidaten
   aus `KEYWORD-RECHERCHE.md`, 5.1).
3. Verweise im Fließtext erwägen.

---

## Runde 2 – 08.10.2026: Prüfung auf Abstrafungsrisiken

Vollprüfung nach 23 Punkten (dünne Seiten, Dubletten, Kannibalisierung,
Belege, Technik, Darstellung, Vertrauen) gegen den Produktions-Build.
Ergebnis: geringes Risiko, Schwerpunkt Ehrlichkeit.

| Befund | Behebung | Prüfung |
|---|---|---|
| **Länder bei 44 von 51 Anbietern geraten**, als Tatsache angezeigt; Länderfilter darauf | leer = „nicht geprüft“, Filter ausgeblendet bis belegt | Kommentar im Kopf von `providers.ts` |
| Zwei Titles mit „alle Anbieter“, Seite sagt „kein Anspruch auf Vollständigkeit“ | Titles umformuliert | `check-launch` 4d: Vollständigkeitsversprechen in Titel/Description ist Blocker (Gegentest: schlägt an) |
| Fünf Pauschalaussagen ohne Beleg („die meisten Anrufe …“) | als Einschätzung gekennzeichnet oder abgeschwächt | – (redaktionell) |
| Eigenangaben der Portale ohne Datum | „laut eigener Website (Stand 27.09.2026)“ | – |
| Vorlagentext: eigener Anteil der Artikel 49–81 % | Petleo je Kategorie beschrieben (`variants[].description`), Vorlagensätze gekürzt → 57–83 % | – |
| Kannibalisierung „Videosprechstunde“ | Tierhalter-Artikel führt mit „Online-Tierarzt“ | – |
| Rechtsseiten untereinander nicht verlinkt | gemeinsame Fußzeile | `check-launch` 4h: jede Seite verlinkt Impressum und Datenschutz (Gegentest: schlägt an) |
| Description 160 > 155 | gekürzt | Grenze in `check-launch` auf 155 |
| Startseite: erster Satz allgemein | Satz mit Anbieterzahl und Feldern aus den Daten | – |
| Lighthouse Barrierefreiheit 95–97 (Kontrast, Name-Abweichung) | dunklere Markenfarbe für Text, sr-only statt aria-label | Lighthouse: 100 auf allen drei Seiten |

Lighthouse mobil nach der Runde: Startseite 95/100/100/100, Tierarzt-Software
und KI-Dokumentation 100/100/100/100 (Performance/Barrierefreiheit/Best
Practices/SEO).

Erst live prüfbar: Weiterleitungen www/http, `/seite` neben `/seite.html`
(GitHub Pages liefert beide; Canonical fängt es ab).

---

## Runde 3 – 14.10.2026: erster Livegang, GEO-Ausgangswert

Seit 14.10.2026 live unter https://tiermedizin-in-digital.org (GitHub Pages,
HTTPS erzwungen; `www`, `http` und `freimoser.github.io/vetkompass/` leiten per
301 um). Live geprüft: alle 14 Sitemap-Adressen 200 für Googlebot, ohne
Weiterleitung, Canonical je auf sich selbst; `/seite` ohne `.html` liefert 200
mit Canonical auf die `.html`-Fassung.

### GEO-Audit (`geo-optimizer`, dieselben fünf Adressen vorher/nachher)

| Seite | vorher | nachher |
|---|---|---|
| Startseite | 76 | 78 |
| /tierarzt-software.html | 75 | 78 |
| /ki-dokumentation.html | 71 | 74 |
| /heimtierregister.html | 72 | 75 |
| /entwicklung.html | 73 | 74 |

Achtung beim Ablesen: Die erste „/100“-Zahl im Bericht ist „Chunk readiness“,
nicht der Gesamtwert. Der steht unter **FINAL GEO SCORE**. In der Runde selbst
wurde zunächst die falsche Zahl berichtet.

### Befunde

| Befund | Einordnung | Behandlung / Prüfung |
|---|---|---|
| „Prompt injection in HTML comments“ (kritisch) | **echt** – Entwicklernotizen im ausgeliefertem HTML | `scripts/html-bereinigen.mjs` als letzter Build-Schritt (React-Marker bleiben); check-launch 4i, Gegentest |
| Keine Knowledge-Graph-Links | **echt** | Person mit `sameAs` (LinkedIn, Person auf Tiermedizin in Zahlen) aus `HERAUSGEBER`; check-launch 4j, Gegentest |
| WebSite-Schema fehlt auf Artikeln, Marke uneinheitlich | **echt** | WebSite-Knoten „Tiermedizin in digital“ auf jeder Seite, `isPartOf` |
| Datum nur im Schema | **echt** (Google-Empfehlung) | sichtbares `<time data-geaendert>` aus dem Seitenstand-Register, vom Fingerabdruck ausgenommen |
| Kontakt fehlt | **echt** | Footer: Kontakt (Impressum#kontakt) und LinkedIn |
| Definition opening | **Fehlalarm** – das Muster kennt nur englische Verben („is“, „are“) | trotzdem umgesetzt: jeder Artikel beginnt nach der H1 mit einer Definition (`definition` in articles.ts) |
| ai.txt, summary.json, faq.json, RSS | **Werkzeugwunsch**, kein Standard | nicht gebaut |
| Organization-Schema, About-Seite | **Fehlalarm** – Herausgeber ist eine Person | – |
| FAQPage auf Kategorie-Artikeln | **Fehlalarm** – Prüffragen ohne Antworten sind kein FAQ | – |

### Daten

- Fünf fehlende Anbieteradressen gefunden und geprüft (Hunderunden, JUST4VETS,
  Katzenmedizin, VetMeta, VetSOAP); Vemed bleibt ohne – `vemed.de` ist eine
  andere Firma.
- `check:anbieter`: 61 von 64 in Ordnung; Bot-Schutz Petla und VET-MAGAZIN,
  Zertifikatskette VETINF – alle bekannt.

### Offen – nur mit dem Betreiber lösbar

- Search Console: Sitemap einreichen, Indexierung beantragen (Bestätigung per
  DNS liegt).
- Bing Webmaster Tools: Import aus der Search Console.
- Link zu Post 1 (20.09.) für das Archiv auf /entwicklung.html.
- Andreas Moll: Darstellung von Hunderunden und Katzenmedizin.

## Messung 26.10.2026: Lighthouse mobil (live)

Lighthouse 12.6 lokal gegen die Live-Seite, weil das Tageskontingent der
PageSpeed-Schnittstelle erschöpft war. Vergleichswert für spätere Runden.

| Seite | Leistung | Barrierefreiheit | Best Practices | SEO | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|---:|
| Startseite | 99 | 100 | 100 | 100 | 1,7 s | 0 | 0 ms |
| /tierarzt-software.html | 100 | 100 | 100 | 100 | 0,9 s | 0 | 0 ms |

Verbleibende Hinweise, eingeordnet:

- **Cache-Dauer der Dateien:** GitHub Pages liefert alles mit 10 Minuten
  aus und lässt sich nicht einstellen. Kein Handlungsbedarf, solange GitHub
  Pages der Hoster ist.
- **Bildgrößen (rund 110 KB):** Die Logos liegen größer vor als angezeigt,
  weil dieselben Dateien die 3840 px breite Karte speisen. Verkleinerte
  Web-Kopien wären möglich, bringen bei 99 Punkten und verzögertem Laden aber
  kaum etwas. Zurückgestellt.
- **Bilder ohne width/height:** Die Kachel hat eine feste Höhe, deshalb
  verschiebt sich nichts (CLS 0). Kein Befund.
