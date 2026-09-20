# Die digitale Tierarztpraxis – Marktübersicht 2026

Eine anbieterübergreifende, datengetriebene Marktübersicht digitaler Lösungen
für Tierarztpraxen im DACH-Markt. Statische Single-Page-Anwendung, gebaut mit React,
TypeScript, Vite und Tailwind CSS, deploybar über GitHub Pages.

- 9 Kategorien von digitaler Sichtbarkeit bis Tierhalter-App
- Suche, Kategorien- und Länderfilter
- Detailansicht je Anbieter
- Responsives Layout: räumliche Market Map auf Desktop, gestapelte Karten auf
  Tablet und Smartphone
- Keine Rangfolge, keine Bewertungen, keine bezahlten Platzierungen

---

## Setup

Voraussetzung: Node.js 20 oder neuer.

```bash
npm install
```

Entwicklungsserver starten:

```bash
npm run dev
```

Produktionsbuild erzeugen (führt zuerst die TypeScript-Prüfung aus):

```bash
npm run build
```

Build lokal ansehen:

```bash
npm run preview
```

Linting:

```bash
npm run lint
```

Alles zusammen vor einem Release:

```bash
npm run verify
```

---

## Projektstruktur

```
scripts/
  gen-legal.mjs    erzeugt Impressum, Datenschutz, Haftungsausschluss aus LEGAL
  gen-seo.mjs      erzeugt robots.txt, sitemap.xml, llms.txt
  gen-icons.mjs    erzeugt alle Favicon-Größen aus favicon.svg
  check-launch.mjs Livegang-Prüfung gegen dist/
src/
  components/      UI-Bausteine (Header, MarketMap, CategoryCard, …)
  config/legal.ts  einzige Quelle für Anschrift und Kontaktangaben
  config/site.ts   Titel, Herausgeber, Texte, LEGAL- und FEATURES-Re-Export
  data/
    categories.ts  Die 9 Kategorien inkl. Desktop-Platzierung
    providers.ts   Zentrale Anbieterliste – die einzige Quelle für Anbieterdaten
  lib/             Filter-/Gruppierungslogik und Hooks
  types/market.ts  Provider, Category, Country
public/
  logos/           Anbieterlogos
  downloads/       Original-Grafik zum Download
  og/              Social-Preview-Bild
  favicon.*        aus favicon.svg erzeugt (npm run icons)
  impressum.html   erzeugt – nicht von Hand bearbeiten
  datenschutz.html erzeugt – nicht von Hand bearbeiten
  haftungsausschluss.html  erzeugt – nicht von Hand bearbeiten
```

Die erzeugten Dateien stehen in `.gitignore`. `npm run dev` und `npm run build`
erzeugen sie vorab neu, sie können also nicht veralten.

Grundregel: **Anbieterdaten stehen niemals in Komponenten.** Die UI rendert
ausschließlich, was aus `src/data/` kommt.

---

## Anbieter hinzufügen

Einen neuen Eintrag in `src/data/providers.ts` ergänzen:

```ts
{
  id: 'beispiel-vet',                    // stabile kebab-case ID
  name: 'BeispielVet',                   // Schreibweise des Anbieters
  logo: 'logos/beispiel-vet.svg',        // optional, Pfad relativ zu /public
  website: 'https://www.beispiel.vet',   // optional
  countries: ['DE', 'AT', 'CH'],
  categories: [2, 9],                    // Mehrfachnennung ist erwünscht
  description: 'Neutrale Kurzbeschreibung in ein bis zwei Sätzen.',
  tags: ['Terminbuchung'],               // fließt in die Suche ein
}
```

Wichtig:

- **Ein Anbieter = ein Datensatz.** Wer in mehreren Kategorien vorkommt, bekommt
  mehrere Einträge in `categories`, keine Kopien des Datensatzes.
- Die Reihenfolge im Array spielt keine Rolle – die Darstellung sortiert
  innerhalb jeder Kategorie alphabetisch.
- Tritt ein Anbieter in einer Kategorie unter einer eigenen Produktmarke auf,
  wird das über `variants` abgebildet statt über einen zweiten Datensatz:

  ```ts
  variants: {
    4: { label: 'BeispielVet.ai', logo: 'logos/beispiel-vet-ai.svg' },
  }
  ```

- Für die Untergruppe „PIMS – Add-ons für digitale Services“ zusätzlich
  `subgroups: ['pims-addons']` setzen.

---

## Logo hinzufügen

1. Datei nach `public/logos/` legen, benannt nach der Anbieter-ID
   (z. B. `public/logos/beispiel-vet.svg`).
2. Im Datensatz `logo: 'logos/beispiel-vet.svg'` eintragen.

Hinweise:

- SVG mit transparentem Hintergrund ist die beste Wahl; PNG funktioniert
  ebenfalls.
- Die Originalproportionen bleiben erhalten (`object-fit: contain`). Die Höhe
  wird auf eine einheitliche Fläche begrenzt, damit Logos innerhalb einer
  Kategorie ähnlich stark wirken.
- Fehlt das Logo oder lässt es sich nicht laden, zeigt die Seite automatisch
  eine neutrale Text-Wortmarke. Das Layout bleibt in beiden Fällen intakt.

> **Aktueller Stand:** Die Logos unter `public/logos/` wurden aus der
> Original-Grafik ausgeschnitten und liegen daher nur in Bildschirmauflösung
> vor. Für Druck und große Darstellungen sollten sie nach und nach durch die
> Originaldateien der Anbieter ersetzt werden.

---

## Kategorie hinzufügen

1. In `src/types/market.ts` die neue Nummer zum Typ `CategoryId` ergänzen.
2. In `src/data/categories.ts` einen Eintrag anlegen:

   ```ts
   {
     id: 10,
     slug: 'neue-kategorie',
     title: 'Neue Kategorie',
     shortTitle: 'Neu',                   // Beschriftung des Filter-Chips
     description: 'Was diese Kategorie umfasst.',
     placement: { column: 'right', width: 'full' },
     logoColumns: 3,
   }
   ```

`placement` steuert nur das Desktop-Raster ab 1280 px:

- `column: 'left'` – breiter Block links, `width: 'half'` stellt zwei Karten
  nebeneinander
- `column: 'center'` – hohe mittlere Spalte
- `column: 'right'` – gestapelte Karten rechts

Darunter werden alle Karten gestapelt; `placement` wird dann ignoriert.

---

## Konfiguration

`src/config/site.ts` enthält alles, was ohne Code-Änderung anpassbar sein soll:

| Feld                  | Bedeutung                                                    |
| --------------------- | ------------------------------------------------------------ |
| `edition`             | Sichtbarer Redaktionsstand, z. B. „September 2026“            |
| `contactEmail`        | Empfänger aller Hinweis-, Korrektur- und Entfernungs-Mails    |
| `legal`               | Links zu Impressum und Datenschutz                            |
| `downloadImage`       | Pfad zur Original-Grafik unter `public/`                      |
| `publisher`           | Herausgeber der Seite (Name und Rolle, erscheint als Byline)   |
| `transparency`        | Offenlegung wirtschaftlicher Verbindungen des Herausgebers     |
| `trademarkNotice`     | Hinweis zu fremden Marken und Logos                           |
| `noAffiliationNotice` | Klarstellung, dass keine Geschäftsbeziehung besteht           |
| `removalNotice`       | Hinweis für Rechteinhaber auf den Entfernungs-Weg             |

Die Kontaktadresse kommt aus `src/config/legal.ts`, nicht aus `site.ts` – sie
steht nur an einer Stelle im Projekt. Ist sie leer, erscheinen die
Kontakt-Schaltflächen gar nicht erst, statt als toter Link zu enden.

### Umgebungsvariablen

`.env` (Vorlage: `.env.example`). Alles Optionale gilt: **Was nicht gesetzt ist,
erscheint nicht.** Es gibt keinen Zustand „wird gerade eingerichtet".

| Variable                  | Wirkung, wenn leer                                          |
| ------------------------- | ----------------------------------------------------------- |
| `VITE_BASE`               | `/` – lokal richtig, im Workflow automatisch gesetzt         |
| `VITE_SITE_URL`           | keine Sitemap, keine `llms.txt`, kein Canonical → Blocker     |
| `VITE_CF_ANALYTICS_TOKEN` | keine Messung, kein Skript, Datenschutz sagt das ausdrücklich |
| `VITE_SEARCH_CONSOLE`     | Search-Console-Abschnitt entfällt                            |

---

## Livegang

```bash
npm run verify     # lint + build + Livegang-Prüfung
```

`check:launch` läuft **gegen `dist/`**, nicht gegen den Quelltext – geprüft
wird, was ausgeliefert wird. Die Prüfung trennt Blocker (Exit 1) von Hinweisen
und ist im Deploy-Workflow vorgeschaltet: Sind Pflichtangaben offen, wird nicht
deployt.

### Blocker

- Pflichtangaben nach § 5 DDG fehlen in `src/config/legal.ts`
- Firmenname ohne Rechtsform
- unausgefüllte Stellen in den Rechtsseiten
- Rechtsseite ohne `noindex`
- Startseite ohne Canonical, oder Canonical auf `localhost` / `.pages.dev` / `example.*`
- `noindex`-Seite in der Sitemap, oder indexierbare Seite fehlt darin
- Messung eingebunden, aber in der Datenschutzerklärung nicht beschrieben — und umgekehrt

### Entscheidungen, die dahinterstehen

**Kein Einwilligungsbanner.** Cloudflare Web Analytics setzt keine Cookies und
liest nichts aus dem Endgerät, fällt also nicht unter § 25 Abs. 1 TDDDG.
Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Ein Banner für eine
Verarbeitung, die keine Einwilligung braucht, hat keine Schutzwirkung und
gewöhnt Besucher daran, ungelesen zuzustimmen.

**`noindex, follow` auf den Rechtsseiten.** Nicht wegen SEO: Im Impressum steht
eine ladungsfähige Anschrift, bei privatem Betrieb die Privatadresse. Ohne
`noindex` wird sie ein eigenständiges Google-Ergebnis. § 5 DDG verlangt
Erreichbarkeit, nicht Auffindbarkeit über eine Suchmaschine. `follow`, damit die
Seiten weiter gecrawlt werden und Links weitergeben. In `robots.txt` sind sie
bewusst **nicht** gesperrt – sonst könnten Crawler das `noindex` nicht lesen.

**Keine AGB.** AGB sind nie gesetzlich vorgeschrieben, sondern vorformulierte
Vertragsbedingungen. Diese Seite verkauft nichts und schließt keine Verträge –
AGB für ein Angebot, das es nicht gibt, wären toter Text.

**Favicon in 96 und 48.** Google verwendet ein Favicon in den Suchergebnissen
nur bei einer Kantenlänge, die ein Vielfaches von 48 ist; ein 32×32-Favicon wird
ignoriert. `favicon.ico` liegt zusätzlich im Wurzelverzeichnis, weil Browser
diesen Pfad unaufgefordert abfragen.

### Nach dem Deploy auf der echten Domain prüfen

```bash
curl -s -o /dev/null -w '%{http_code} -> %{redirect_url}\n' https://DOMAIN/
curl -s https://DOMAIN/ | grep -o '<link rel="canonical"[^>]*>'
curl -s -o /dev/null -w '%{http_code}\n' \
  -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" \
  https://DOMAIN/
```

Beim Nachmessen immer ein Browser-Kennzeichen mitgeben – sonst meldet man sich
selbst einen Ausfall, den es nicht gibt.

---

## Deployment auf GitHub Pages

1. Repository auf GitHub anlegen und den Code auf `main` pushen.
2. Unter **Settings → Pages → Build and deployment** als Source
   **GitHub Actions** wählen.
3. Fertig: Jeder Push auf `main` löst `.github/workflows/deploy.yml` aus.

Der Workflow bestimmt den Basispfad selbst:

- Repository `marktuebersicht` → `VITE_BASE=/marktuebersicht/`
- Repository `<user>.github.io` → `VITE_BASE=/`

Abweichende Fälle – etwa eine eigene Domain – lassen sich über
Repository-Variablen überschreiben
(**Settings → Secrets and variables → Actions → Variables**):

- `VITE_BASE`, z. B. `/`
- `VITE_SITE_URL`, z. B. `https://marktuebersicht.example.de/`

Bei eigener Domain zusätzlich eine Datei `public/CNAME` mit der Domain anlegen.

---

## Redaktionelle Leitlinien

Diese Übersicht ist bewusst neutral angelegt:

- keine Rangfolge, keine Bewertungen, keine Preise
- keine Formulierungen wie „beste Software“
- keine bezahlten Platzierungen
- alphabetische Sortierung innerhalb jeder Kategorie
- Anbieter dürfen mehreren Kategorien angehören
- der Redaktionsstand wird sichtbar genannt
- „Kein Anspruch auf Vollständigkeit“ wird sichtbar kommuniziert

Die Übersicht wird privat von Thomas Freimoser herausgegeben, nicht von einem
Unternehmen.

### Rechtliche Vorkehrungen

Die Seite nennt fremde Marken und zeigt fremde Logos. Das ist als referierende
Markennutzung im Rahmen einer Marktübersicht grundsätzlich zulässig (§ 23
MarkenG), setzt aber voraus, dass kein Eindruck einer Geschäftsbeziehung
entsteht. Dafür sind eingebaut:

- **Markenhinweis** und **Klarstellung ohne Geschäftsbeziehung** im Footer sowie
  im Detaildialog jedes Anbieters
- **Entfernungs-Weg für Rechteinhaber** – als eigener Button im CTA-Abschnitt,
  als Link im Footer und im Detaildialog jedes Anbieters. Alle drei erzeugen
  eine vorausgefüllte Mail an `contactEmail`.
- **Offenlegung wirtschaftlicher Verbindungen** im eigenen Abschnitt
  „Zur Transparenz“ (`#transparenz`), verlinkt aus Footer und Methodik. Der
  Abschnitt behauptet keine Neutralität, sondern benennt die Einschränkung
  ausdrücklich.
- **Offenlegung am einzelnen Anbieter** über das Datenfeld `disclosureNote`.
  Der Text steht in `src/data/providers.ts`, nicht in einer Komponente – die UI
  kennt keinen Anbieter namentlich. Wo ein Hinweis gesetzt ist, entfallen
  automatisch der Satz „keine geschäftliche Verbindung“ und der
  Entfernungs-Link, weil beides dort widersprüchlich wäre.
- Bewusst **„anbieterübergreifend" statt „unabhängig"**: Der Herausgeber ist an
  einem der gelisteten Anbieter beteiligt. Eine Unabhängigkeitsbehauptung wäre
  in dieser Konstellation wettbewerbsrechtlich angreifbar (§ 5 UWG).

Auch als privates Angebot handelt es sich um geschäftlichen Verkehr, weil der
Herausgeber an einem gelisteten Anbieter beteiligt ist. Die genannten Texte
liegen zentral in `src/config/site.ts` und lassen sich nach anwaltlicher Prüfung
ohne Code-Änderung anpassen. Eine solche Prüfung wird vor dem Livegang
empfohlen; dieses Repository ersetzt sie nicht.

### Offene Datenpflege

- `countries` ist derzeit bei allen Anbietern auf den gesamten DACH-Raum
  gesetzt. Die länderspezifische Verfügbarkeit ist nicht einzeln verifiziert.
- Einzelne Anbieter haben noch keine hinterlegte Website – im Datensatz mit
  `// TODO: Website ergänzen` markiert.

---

## Barrierefreiheit

- durchgängig sichtbare Fokus-Zustände und ein Skip-Link
- Dialog mit Fokus-Falle, Escape zum Schließen und Fokus-Rückgabe
- Kategorien auf kleinen Bildschirmen über `aria-expanded` bedienbar
- Alt-Texte für alle Logos, Kategorienummern zusätzlich als Text für
  Screenreader
- `prefers-reduced-motion` wird respektiert
- keine Information wird ausschließlich über Farbe vermittelt

## Datenschutz

Die Seite lädt keine externen Ressourcen: keine Web-Fonts von Drittanbietern,
kein Tracking, keine Cookies. Verwendet wird der System-Schriftstack.

---

## Lizenz und Marken

Der Code dieses Repositories steht dem Projekt zur Verfügung. Alle genannten
Marken- und Produktnamen sowie die Logos sind Eigentum der jeweiligen
Rechteinhaber. Die Nennung erfolgt ausschließlich zu Informationszwecken.
