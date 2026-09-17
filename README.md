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

---

## Projektstruktur

```
src/
  components/      UI-Bausteine (Header, MarketMap, CategoryCard, …)
  config/site.ts   Titel, Herausgeber, Kontakt, Rechtstexte, Downloads
  data/
    categories.ts  Die 9 Kategorien inkl. Desktop-Platzierung
    providers.ts   Zentrale Anbieterliste – die einzige Quelle für Anbieterdaten
  lib/             Filter-/Gruppierungslogik und Hooks
  types/market.ts  Provider, Category, Country
public/
  logos/           Anbieterlogos
  downloads/       Original-Grafik zum Download
  og/              Social-Preview-Bild
  impressum.html   Rechtsseite (Entwurf, statisch – kein Routing nötig)
  datenschutz.html Rechtsseite (Entwurf)
```

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

> **Vor dem Livegang erledigen:**
>
> 1. `contactEmail` steht auf `kontakt@example.com` – einer von der IANA für
>    Platzhalter reservierten Domain. Dort kommt nichts an. Alle drei
>    Hinweis-Schaltflächen sind nur so viel wert wie das Postfach dahinter.
> 2. `public/impressum.html` und `public/datenschutz.html` sind Entwürfe. Das
>    Impressum braucht eine **ladungsfähige Anschrift** (§ 5 DDG) – ein Postfach
>    genügt nicht. Bei privatem Betrieb ohne Geschäftsadresse ist das die
>    Privatanschrift.
> 3. Die Datenschutzerklärung beschreibt Hosting über GitHub Pages (US-Anbieter).
>    Wer das vermeiden will, wechselt auf einen Hoster in der EU und passt den
>    Abschnitt an.

### Umgebungsvariablen

`.env` (Vorlage: `.env.example`):

| Variable         | Bedeutung                                                     |
| ---------------- | ------------------------------------------------------------- |
| `VITE_BASE`      | Basispfad des Deployments. `/` lokal, `/<repo>/` für Pages.    |
| `VITE_SITE_URL`  | Absolute Seiten-URL inkl. `/` am Ende, für canonical und OG.   |

Beide werden im Deploy-Workflow automatisch gesetzt; lokal reichen die
Standardwerte.

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
