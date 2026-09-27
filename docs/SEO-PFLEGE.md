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
