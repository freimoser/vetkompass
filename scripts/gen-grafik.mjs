/**
 * Erzeugt die herunterladbare Marktübersicht als Bild – aus den Daten.
 *
 * Der Anlass: Die bisherige Datei war von Hand gebaut und blieb beim Stand von
 * 35 Anbietern stehen, während die Seite längst 51 führte. Ein Bild, das
 * jemand herunterlädt und weitergibt, ist die Fassung, die im Umlauf bleibt –
 * es darf nicht die veraltete sein. Deshalb entsteht es jetzt bei jedem Build
 * neu, und `scripts/check-launch.mjs` bricht ab, wenn die Anbieterzahl im Bild
 * nicht zu den Daten passt.
 *
 * Ausgabe:
 *  - `public/downloads/<name>.svg`  – die Quelle, scharf in jeder Größe
 *  - `public/downloads/<name>.png`  – 3840 px breit (doppelt), zum Hineinzoomen
 *  - `public/og/marktuebersicht.png` – dasselbe Bild als Social-Vorschau
 *
 * Ohne `sharp` entsteht nur das SVG, und der Download verweist darauf. Das ist
 * kein Fehlerfall: Ein SVG lässt sich überall öffnen und ist schärfer. Für
 * LinkedIn und Präsentationen ist das PNG aber das brauchbarere Format,
 * deshalb ist `sharp` im Projekt als Entwicklungsabhängigkeit eingetragen.
 *
 * Aufruf: node scripts/gen-grafik.mjs
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { providers } from '../src/data/providers.ts';
import { categories } from '../src/data/categories.ts';
import { MARKE } from '../src/config/verbund.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'public');
const BASISNAME = 'digitale-tierarztpraxis-marktuebersicht';

const EDITION = 'September 2026';
const AUTOR = 'Thomas Freimoser';
const ROLLE = 'Experte für digitale Tiermedizin';

/* ================================================================== */
/* Maße                                                               */
/* ================================================================== */

const W = 1920;
const PAD = 56;
const KOPF = 168;
const FUSS = 78;

/*
  Drei Spalten wie in der Karte auf dem Bildschirm. Die linke ist zweispaltig
  unterteilt, deshalb ist sie die breiteste.
*/
const SPALTEN = {
  left: { x: PAD, w: 620, sub: 2 },
  center: { x: PAD + 620 + 40, w: 440, sub: 1 },
  right: { x: PAD + 620 + 40 + 440 + 40, w: 668, sub: 1 },
};
const SUB_GAP = 24;
const KARTEN_GAP = 24;
const KARTEN_PAD = 18;
const KACHEL_GAP = 10;

const FARBE = {
  ink: '#0f1419',
  soft: '#333c45',
  muted: '#5b6874',
  brand: '#1a7eb8',
  brandHell: '#7cc3e8',
  linie: '#dceffa',
  kartenRand: '#cfe7f7',
  hintergrund: '#f4fafd',
};

/*
  Schriftstapel mit DejaVu Sans vorn: Der Rasterer auf dem Build-Server kennt
  Helvetica und Arial nicht, DejaVu ist dort vorhanden. Lokal auf macOS greift
  der zweite Eintrag. Beides ist lesbar, die Zeilenumbrüche können minimal
  abweichen.
*/
const SCHRIFT = "'DejaVu Sans','Helvetica Neue',Arial,sans-serif";

const esc = (v) =>
  String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ================================================================== */
/* Textumbruch                                                        */
/* ================================================================== */

/*
  SVG bricht Text nicht selbst um. Die Breitenschätzung ist bewusst grob –
  sie muss nur verhindern, dass eine Zeile aus dem Kasten läuft. Großbuchstaben
  und Sperrung brauchen mehr Platz, deshalb der Zuschlag über `faktor`.
*/
function umbruch(text, maxBreite, groesse, faktor = 0.55) {
  const proZeichen = groesse * faktor;
  const maxZeichen = Math.max(4, Math.floor(maxBreite / proZeichen));
  const woerter = String(text).split(/\s+/);
  const zeilen = [];
  let aktuell = '';
  for (const wort of woerter) {
    const versuch = aktuell ? `${aktuell} ${wort}` : wort;
    if (versuch.length <= maxZeichen) {
      aktuell = versuch;
    } else {
      if (aktuell) zeilen.push(aktuell);
      aktuell = wort;
    }
  }
  if (aktuell) zeilen.push(aktuell);
  return zeilen;
}

/* ================================================================== */
/* Logos als Daten einbetten                                          */
/* ================================================================== */

const MIME = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
};

const cache = new Map();

/** Liest eine Logodatei als data-URI. Fehlt sie, kommt null zurück. */
function datenUri(pfad) {
  if (!pfad) return null;
  if (cache.has(pfad)) return cache.get(pfad);
  const voll = join(PUBLIC, pfad);
  const typ = MIME[extname(pfad).toLowerCase()];
  let ergebnis = null;
  if (typ && existsSync(voll)) {
    ergebnis = `data:${typ};base64,${readFileSync(voll).toString('base64')}`;
  }
  cache.set(pfad, ergebnis);
  return ergebnis;
}

/* ================================================================== */
/* Formate, die der Rasterer nicht einbetten kann                     */
/* ================================================================== */

/*
  Der SVG-Rasterer von sharp stellt eingebettetes WebP und GIF nicht dar – die
  Kachel bleibt dann einfach leer, ohne Fehlermeldung. So fehlte AnimalChat in
  zwei Fassungen der Grafik, bevor es jemand bemerkte.

  Deshalb werden diese Formate vorab in PNG umgewandelt und im Zwischenspeicher
  hinterlegt. Die Website behält ihre Originaldateien; Browser können WebP.
*/
let sharpModul = null;
try {
  sharpModul = (await import('sharp')).default;
} catch {
  // Ohne sharp entsteht nur das SVG – und im Browser funktioniert WebP.
}

const alleLogos = new Set(
  providers.flatMap((p) => [p.logo, ...Object.values(p.variants ?? {}).map((v) => v.logo)]).filter(Boolean),
);
const umgewandelt = [];
for (const pfad of alleLogos) {
  if (!/\.(webp|gif)$/i.test(pfad) || !sharpModul) continue;
  const voll = join(PUBLIC, pfad);
  if (!existsSync(voll)) continue;
  const png = await sharpModul(voll).png().toBuffer();
  cache.set(pfad, `data:image/png;base64,${png.toString('base64')}`);
  umgewandelt.push(pfad);
}

/* ================================================================== */
/* Layout-Engine                                                      */
/* ================================================================== */

/*
  Wie die Engine vorgeht – und warum in dieser Reihenfolge.

  Die erste Fassung übernahm die Spaltenzuordnung der Website stur. Das ergab
  einen schmalen, überlangen Turm links (Kategorie 10 unter 1, 3 und 5), neben
  dem rechts ein Drittel der Fläche leer blieb. Beim Reinzoomen waren die
  Logos zu klein, weil der Platz nicht dort war, wo die Logos standen.

  Jetzt in vier Schritten:

   1. Messen    – jede Kategorie weiß, wie hoch sie bei gegebener Breite und
                  Kachelhöhe wird.
   2. Packen    – Kategorien in ihre Bahnen: links zwei, Mitte eine, rechts
                  eine. Links reihum, damit die Reihenfolge der Website gilt.
   3. Bänder    – Solange eine Bahn deutlich länger ist als die übrigen, prüft
                  die Engine, ob ihre unterste Karte als Band über die volle
                  Breite kürzer wird. Ein Band legt die Logos nebeneinander
                  statt übereinander – bei sieben Logos eine Reihe statt vier.
                  Übernommen wird der Schritt nur, wenn das Gesamtbild dadurch
                  kürzer wird. Kein fest verdrahteter Sonderfall: Kommt eine
                  elfte Kategorie dazu, entscheidet die Engine neu.
   4. Angleichen – Kürzere Bahnen wachsen, bis alle auf derselben Linie enden.
                  Der Zuwachs geht in die Kachelhöhe, also in die Logos, nicht
                  in Leerraum. Gedeckelt, damit kein Logo aufgebläht wirkt; was
                  darüber hinaus fehlt, streckt die letzte Karte der Bahn.
*/

const KACHEL_H_BASIS = 60;
const KACHEL_H_MAX = 96;
const BAND_KACHEL_H = 78;
const BAND_KOPF_B = 400;
const BAND_KACHEL_MIN_B = 150;
const UNTERGRUPPE_KOPF = 30;
const GRUPPEN_ABSTAND = 16;

const alphabetisch = (a, b) => a.name.localeCompare(b.name, 'de', { sensitivity: 'base' });
const labelFor = (p, id) => p.variants?.[id]?.label ?? p.name;
const logoFor = (p, id) => p.variants?.[id]?.logo ?? p.logo;

/**
 * Die Einträge einer Kategorie, aufgeteilt in Hauptgruppe und Untergruppen.
 *
 * Gleiche Regel wie auf der Website (`src/lib/market.ts`): Ein Anbieter, der
 * einer Untergruppe der Kategorie angehört, erscheint nur dort, nicht
 * zusätzlich in der Hauptgruppe. Die erste Fassung der Grafik hat das
 * ignoriert und die PIMS-Add-ons unter die Praxissoftware gemischt.
 */
function gruppenVon(kategorie) {
  const eintrag = (p) => ({
    label: labelFor(p, kategorie.id),
    uri: datenUri(logoFor(p, kategorie.id)),
  });
  const alle = providers.filter((p) => p.categories.includes(kategorie.id)).sort(alphabetisch);
  const untergruppen = kategorie.subgroups ?? [];
  const ids = new Set(untergruppen.map((u) => u.id));

  const gruppen = [
    { titel: null, eintraege: alle.filter((p) => !p.subgroups?.some((s) => ids.has(s))).map(eintrag) },
  ];
  for (const u of untergruppen) {
    const drin = alle.filter((p) => p.subgroups?.includes(u.id)).map(eintrag);
    if (drin.length > 0) gruppen.push({ titel: u.title, eintraege: drin });
  }
  return gruppen.filter((g) => g.eintraege.length > 0);
}

/** Titel- und Beschreibungszeilen samt ihrer Y-Positionen. */
function kopfVon(kategorie, innenBreite) {
  const titelZeilen = umbruch(kategorie.title.toUpperCase(), innenBreite - 44, 12, 0.72);
  /*
    Vier Zeilen, und wenn es dann immer noch nicht reicht, ein Auslassungs-
    zeichen. Ein Satz, der mitten im Wort endet, sieht aus wie ein Fehler –
    ein gekürzter Satz sieht aus wie eine Kürzung.
  */
  const alle = umbruch(kategorie.description, innenBreite, 10.5);
  const beschrZeilen = alle.slice(0, 4);
  if (alle.length > 4) beschrZeilen[3] = `${beschrZeilen[3].replace(/[\s–-]+$/, '')} …`;

  const titelY = KARTEN_PAD + 14;
  const beschrY = Math.max(titelY + (titelZeilen.length - 1) * 15 + 20, KARTEN_PAD + 48);
  const hoehe = beschrY + (beschrZeilen.length - 1) * 13 + 20;
  return { titelZeilen, beschrZeilen, titelY, beschrY, hoehe };
}

/** Höhe eines Kachelrasters mit Untergruppen. */
function rasterHoehe(gruppen, spalten, kachelH) {
  let h = 0;
  gruppen.forEach((g, i) => {
    if (i > 0) h += GRUPPEN_ABSTAND;
    if (g.titel) h += UNTERGRUPPE_KOPF;
    const reihen = Math.ceil(g.eintraege.length / spalten);
    h += reihen * (kachelH + KACHEL_GAP) - KACHEL_GAP;
  });
  return h;
}

/** Anzahl Kachelreihen – dorthin fließt beim Angleichen der Zuwachs. */
const reihenVon = (gruppen, spalten) =>
  gruppen.reduce((n, g) => n + Math.ceil(g.eintraege.length / spalten), 0);

/* ---- 1. Messen ------------------------------------------------------ */

function messeKarte(kategorie, breite, kachelH = KACHEL_H_BASIS) {
  const innen = breite - 2 * KARTEN_PAD;
  const spalten = kategorie.logoColumns ?? 2;
  const gruppen = gruppenVon(kategorie);
  const kopf = kopfVon(kategorie, innen);
  const hoehe = kopf.hoehe + rasterHoehe(gruppen, spalten, kachelH) + KARTEN_PAD;
  return { art: 'karte', kategorie, breite, spalten, gruppen, kopf, kachelH, hoehe };
}

function messeBand(kategorie) {
  const breite = W - 2 * PAD;
  const gruppen = gruppenVon(kategorie);
  const kopf = kopfVon(kategorie, BAND_KOPF_B - 2 * KARTEN_PAD);

  // So viele Kacheln nebeneinander, wie bei Mindestbreite passen.
  const logoBreite = breite - BAND_KOPF_B - KARTEN_PAD;
  const meiste = Math.max(...gruppen.map((g) => g.eintraege.length));
  const spalten = Math.max(1, Math.min(meiste, Math.floor(logoBreite / BAND_KACHEL_MIN_B)));

  const raster = rasterHoehe(gruppen, spalten, BAND_KACHEL_H);
  const hoehe = Math.max(kopf.hoehe, raster + KARTEN_PAD) + KARTEN_PAD;
  return { art: 'band', kategorie, breite, spalten, gruppen, kopf, kachelH: BAND_KACHEL_H, hoehe, logoBreite };
}

/* ---- 2. Packen ------------------------------------------------------ */

const LINKS_B = (SPALTEN.left.w - SUB_GAP) / 2;
const BAHNEN = [
  { name: 'links-1', spalte: 'left', x: SPALTEN.left.x, breite: LINKS_B },
  { name: 'links-2', spalte: 'left', x: SPALTEN.left.x + LINKS_B + SUB_GAP, breite: LINKS_B },
  { name: 'mitte', spalte: 'center', x: SPALTEN.center.x, breite: SPALTEN.center.w },
  { name: 'rechts', spalte: 'right', x: SPALTEN.right.x, breite: SPALTEN.right.w },
];

const bahnHoehe = (karten) =>
  karten.reduce((h, k, i) => h + k.hoehe + (i > 0 ? KARTEN_GAP : 0), 0);

function packe(ausgenommen) {
  const bahnen = BAHNEN.map((b) => ({ ...b, karten: [] }));
  for (const kategorie of categories) {
    if (ausgenommen.has(kategorie.id)) continue;
    const kandidaten = bahnen.filter((b) => b.spalte === kategorie.placement.column);
    /*
      Links zwei Bahnen, reihum belegt – 1|2, 3|4, 5 – genau wie das Raster
      der Website. Die erste Fassung legte jede Karte in die gerade kürzere
      Bahn. Das balanciert minimal besser, stellte aber Kategorie 2 in die
      linke obere Ecke und 1 daneben. Den Ausgleich übernimmt ohnehin
      Schritt 4, die Reihenfolge nicht.
    */
    const bisher = kandidaten.reduce((n, b) => n + b.karten.length, 0);
    const ziel = kandidaten[bisher % kandidaten.length];
    ziel.karten.push(messeKarte(kategorie, ziel.breite));
  }
  for (const b of bahnen) b.hoehe = bahnHoehe(b.karten);
  return bahnen;
}

const blockHoehe = (bahnen) => Math.max(...bahnen.map((b) => b.hoehe));
const baenderHoehe = (baender) => baender.reduce((h, b) => h + b.hoehe + KARTEN_GAP, 0);

/* ---- 3. Bänder ------------------------------------------------------ */

function waehleBaender() {
  const ausgenommen = new Set();
  const baender = [];
  let bahnen = packe(ausgenommen);

  for (let versuch = 0; versuch < 3; versuch++) {
    const sortiert = [...bahnen].sort((a, b) => b.hoehe - a.hoehe);
    const laengste = sortiert[0];
    const zweite = sortiert[1];

    // Ausgeglichen genug: Die längste Bahn überragt die zweite um weniger als 12 %.
    if (laengste.hoehe <= zweite.hoehe * 1.12 || laengste.karten.length < 2) break;

    const kandidat = laengste.karten[laengste.karten.length - 1].kategorie;
    const band = messeBand(kandidat);
    const neuAusgenommen = new Set([...ausgenommen, kandidat.id]);
    const neueBahnen = packe(neuAusgenommen);

    const vorher = blockHoehe(bahnen) + baenderHoehe(baender);
    const nachher = blockHoehe(neueBahnen) + baenderHoehe([...baender, band]);
    if (nachher >= vorher) break;

    ausgenommen.add(kandidat.id);
    baender.push(band);
    bahnen = neueBahnen;
  }
  // Bänder in Kategoriereihenfolge, nicht in der Reihenfolge, in der sie fielen.
  baender.sort((a, b) => a.kategorie.id - b.kategorie.id);
  return { bahnen, baender };
}

/* ---- 4. Angleichen -------------------------------------------------- */

function gleicheAn(bahnen) {
  const ziel = blockHoehe(bahnen);
  for (const bahn of bahnen) {
    const fehlt = ziel - bahn.hoehe;
    if (fehlt <= 0) continue;

    const reihen = bahn.karten.reduce((n, k) => n + reihenVon(k.gruppen, k.spalten), 0);
    const proReihe = Math.min(fehlt / reihen, KACHEL_H_MAX - KACHEL_H_BASIS);

    bahn.karten = bahn.karten.map((k) => messeKarte(k.kategorie, k.breite, KACHEL_H_BASIS + proReihe));
    bahn.hoehe = bahnHoehe(bahn.karten);

    // Was die Deckelung übrig lässt, streckt die letzte Karte bis zur Linie.
    const rest = ziel - bahn.hoehe;
    if (rest > 0.5) {
      const letzte = bahn.karten[bahn.karten.length - 1];
      letzte.gestreckt = letzte.hoehe + rest;
      bahn.hoehe = ziel;
    }
  }
  return ziel;
}

/* ================================================================== */
/* Zeichnen                                                           */
/* ================================================================== */

function zeichneKopf(k, x, y) {
  const teile = [
    `<text x="${x + KARTEN_PAD}" y="${y + KARTEN_PAD + 27}" font-size="32" font-weight="700" fill="${FARBE.brandHell}">${k.kategorie.id}</text>`,
  ];
  k.kopf.titelZeilen.forEach((zeile, i) =>
    teile.push(
      `<text x="${x + KARTEN_PAD + 44}" y="${y + k.kopf.titelY + i * 15}" font-size="12" font-weight="700" letter-spacing="1.1" fill="${FARBE.ink}">${esc(zeile)}</text>`,
    ),
  );
  k.kopf.beschrZeilen.forEach((zeile, i) =>
    teile.push(
      `<text x="${x + KARTEN_PAD}" y="${y + k.kopf.beschrY + i * 13}" font-size="10.5" fill="${FARBE.muted}">${esc(zeile)}</text>`,
    ),
  );
  return teile;
}

function zeichneRaster(gruppen, x, y, breite, spalten, kachelH) {
  const kachelB = (breite - KACHEL_GAP * (spalten - 1)) / spalten;
  const teile = [];
  let cy = y;

  gruppen.forEach((g, gi) => {
    if (gi > 0) cy += GRUPPEN_ABSTAND;
    if (g.titel) {
      teile.push(
        `<line x1="${x}" y1="${cy}" x2="${x + breite}" y2="${cy}" stroke="${FARBE.linie}" stroke-width="1.5"/>`,
        `<text x="${x}" y="${cy + 20}" font-size="10.5" font-weight="700" letter-spacing="0.9" fill="${FARBE.soft}">${esc(g.titel.toUpperCase())}</text>`,
      );
      cy += UNTERGRUPPE_KOPF;
    }

    g.eintraege.forEach((e, i) => {
      const kx = x + (i % spalten) * (kachelB + KACHEL_GAP);
      const ky = cy + Math.floor(i / spalten) * (kachelH + KACHEL_GAP);
      // Luft ringsum wächst mit der Kachel, damit große Logos nicht anstoßen.
      const luft = Math.round(kachelH * 0.12);
      if (e.uri) {
        teile.push(
          `<image x="${kx + luft}" y="${ky + luft}" width="${kachelB - 2 * luft}" height="${kachelH - 2 * luft}" preserveAspectRatio="xMidYMid meet" href="${e.uri}"/>`,
        );
      } else {
        // Ohne Logodatei die Wortmarke setzen – genau wie auf der Seite.
        const groesse = Math.min(15, 11 + (kachelH - KACHEL_H_BASIS) / 10);
        const zeilen = umbruch(e.label, kachelB - 12, groesse).slice(0, 2);
        const start = ky + kachelH / 2 - ((zeilen.length - 1) * (groesse + 2)) / 2 + groesse * 0.35;
        zeilen.forEach((zeile, z) =>
          teile.push(
            `<text x="${kx + kachelB / 2}" y="${start + z * (groesse + 2)}" text-anchor="middle" font-size="${groesse.toFixed(1)}" font-weight="600" fill="${FARBE.soft}">${esc(zeile)}</text>`,
          ),
        );
      }
    });
    cy += Math.ceil(g.eintraege.length / spalten) * (kachelH + KACHEL_GAP) - KACHEL_GAP;
  });
  return teile;
}

function zeichneKarte(k, x, y) {
  const h = k.gestreckt ?? k.hoehe;
  return [
    `<rect x="${x}" y="${y}" width="${k.breite}" height="${h}" rx="14" fill="#ffffff" stroke="${FARBE.kartenRand}" stroke-width="1"/>`,
    ...zeichneKopf(k, x, y),
    ...zeichneRaster(k.gruppen, x + KARTEN_PAD, y + k.kopf.hoehe, k.breite - 2 * KARTEN_PAD, k.spalten, k.kachelH),
  ].join('\n  ');
}

function zeichneBand(b, x, y) {
  const rasterH = rasterHoehe(b.gruppen, b.spalten, b.kachelH);
  // Logos senkrecht mittig zum Kopfbereich, wenn der höher ist.
  const rasterY = y + Math.max(KARTEN_PAD, (b.hoehe - rasterH) / 2);
  const trennX = x + BAND_KOPF_B;
  return [
    `<rect x="${x}" y="${y}" width="${b.breite}" height="${b.hoehe}" rx="14" fill="#ffffff" stroke="${FARBE.kartenRand}" stroke-width="1"/>`,
    ...zeichneKopf(b, x, y),
    `<line x1="${trennX}" y1="${y + KARTEN_PAD}" x2="${trennX}" y2="${y + b.hoehe - KARTEN_PAD}" stroke="${FARBE.linie}" stroke-width="1.5"/>`,
    ...zeichneRaster(b.gruppen, trennX + KARTEN_PAD, rasterY, b.logoBreite - KARTEN_PAD, b.spalten, b.kachelH),
  ].join('\n  ');
}

/* ================================================================== */
/* Seite setzen                                                       */
/* ================================================================== */

const { bahnen, baender } = waehleBaender();
const inhaltsHoehe = gleicheAn(bahnen);

const kartenSvg = bahnen
  .flatMap((bahn) => {
    let y = KOPF;
    return bahn.karten.map((k) => {
      const teil = zeichneKarte(k, bahn.x, y);
      y += (k.gestreckt ?? k.hoehe) + KARTEN_GAP;
      return teil;
    });
  })
  .join('\n  ');

let bandY = KOPF + inhaltsHoehe + KARTEN_GAP;
const baenderSvg = baender
  .map((b) => {
    const teil = zeichneBand(b, PAD, bandY);
    bandY += b.hoehe + KARTEN_GAP;
    return teil;
  })
  .join('\n  ');

const H = Math.round(bandY - KARTEN_GAP + FUSS);

const heute = new Date();
const datumDe = heute.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
const anzahl = providers.length;
const kategorienAnzahl = categories.length;

/*
  Kopfzeile rechts: Stand, Erstellungsdatum und die Mengen. Das Datum ist der
  Grund, warum diese Datei existiert – wer das Bild weitergibt, soll sehen
  können, wie alt es ist.
*/
const kopfRechts = [
  { text: `Stand der Übersicht: ${EDITION}`, groesse: 15, gewicht: 700, farbe: FARBE.ink },
  { text: `Bild erstellt am ${datumDe}`, groesse: 13, gewicht: 400, farbe: FARBE.muted },
  { text: `${anzahl} Anbieter in ${kategorienAnzahl} Kategorien`, groesse: 13, gewicht: 400, farbe: FARBE.muted },
];

const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="${SCHRIFT}">
  <rect width="${W}" height="${H}" fill="${FARBE.hintergrund}"/>

  <text x="${PAD}" y="62" font-size="38" font-weight="700" fill="${FARBE.ink}">Die digitale Tierarztpraxis</text>
  <text x="${PAD}" y="97" font-size="21" font-weight="400" fill="${FARBE.brand}">Marktübersicht ${EDITION.split(' ')[1]} · Digitale Lösungen für Tierarztpraxen im DACH-Markt</text>
  <text x="${PAD}" y="126" font-size="13" fill="${FARBE.muted}">Herausgegeben von ${esc(AUTOR)} · ${esc(ROLLE)} · Keine Rangfolge, keine Bewertung, kein Anspruch auf Vollständigkeit</text>

${kopfRechts
  .map(
    (z, i) =>
      `  <text x="${W - PAD}" y="${52 + i * 22}" text-anchor="end" font-size="${z.groesse}" font-weight="${z.gewicht}" fill="${z.farbe}">${esc(z.text)}</text>`,
  )
  .join('\n')}

  <line x1="${PAD}" y1="${KOPF - 22}" x2="${W - PAD}" y2="${KOPF - 22}" stroke="${FARBE.linie}" stroke-width="2"/>

  ${kartenSvg}

  ${baenderSvg}

  <line x1="${PAD}" y1="${H - FUSS + 16}" x2="${W - PAD}" y2="${H - FUSS + 16}" stroke="${FARBE.linie}" stroke-width="2"/>
  <text x="${PAD}" y="${H - FUSS + 42}" font-size="12" fill="${FARBE.muted}">Alle Marken-, Produkt- und Unternehmensnamen sowie Logos sind Eigentum der jeweiligen Rechteinhaber. Nennung ausschließlich zu Informationszwecken; eine geschäftliche Verbindung entsteht daraus nicht.</text>
  <text x="${PAD}" y="${H - FUSS + 60}" font-size="12" fill="${FARBE.muted}">Sortierung innerhalb jeder Kategorie rein alphabetisch. Der Herausgeber ist an einem der genannten Anbieter beteiligt – Offenlegung im Abschnitt „Zur Transparenz“ der Website.</text>
</svg>
`;

/** Für die Ausgabe: was die Engine entschieden hat. */
const entscheidung = {
  baender: baender.map((b) => b.kategorie.id),
  kachelHoehen: bahnen.map((b) => `${b.name} ${Math.round(b.karten[0]?.kachelH ?? 0)}px`),
};

/* ================================================================== */
/* Schreiben                                                          */
/* ================================================================== */

mkdirSync(join(PUBLIC, 'downloads'), { recursive: true });
mkdirSync(join(PUBLIC, 'og'), { recursive: true });

const svgPfad = join(PUBLIC, 'downloads', `${BASISNAME}.svg`);
writeFileSync(svgPfad, svg, 'utf8');

let png = false;
try {
  const sharp = (await import('sharp')).default;
  /*
    Doppelte Auflösung, damit man hineinzoomen kann. Die Dichte liegt bewusst
    über dem Nötigen und wird dann auf 3840 px verkleinert – je nach
    Rasterer-Version gilt 72 oder 96 dpi als 1:1, und ein zu klein gerastertes
    Bild würde beim Hochskalieren unscharf.
  */
  const puffer = await sharp(Buffer.from(svg), { density: 220 })
    .resize({ width: W * 2 })
    .png({ compressionLevel: 9 })
    .toBuffer();
  writeFileSync(join(PUBLIC, 'downloads', `${BASISNAME}.png`), puffer);

  /*
    Die Social-Vorschau ist eine eigene Komposition, kein Ausschnitt. Der
    frühere obere Ausschnitt schnitt die Karten mitten durch und ließ
    Kategorie 10 ganz weg – geteilt sah die Übersicht unvollständig aus.
    Jetzt: links groß lesbar, worum es geht (LinkedIn zeigt das Bild mit rund
    550 px Breite, kleine Schrift verschwindet), rechts die ganze Karte.
  */
  const OG_W = 1200;
  const OG_H = 630;
  const KARTE_B = 744;
  const KARTE_H = Math.round((H * KARTE_B) / W);
  const KARTE_X = OG_W - 40 - KARTE_B;
  const KARTE_Y = Math.round((OG_H - KARTE_H) / 2);
  const karte = await sharp(puffer).resize({ width: KARTE_B * 2 }).png().toBuffer();
  const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W * 2}" height="${OG_H * 2}" viewBox="0 0 ${OG_W} ${OG_H}" font-family="${SCHRIFT}">
  <defs><filter id="schatten" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="10"/></filter></defs>
  <rect width="${OG_W}" height="${OG_H}" fill="${FARBE.hintergrund}"/>
  <rect x="0" y="0" width="10" height="${OG_H}" fill="${FARBE.brand}"/>
  <text x="52" y="92" font-size="17" font-weight="700" letter-spacing="2.5" fill="${FARBE.brand}">${esc(MARKE.toUpperCase())}</text>
  <text x="52" y="160" font-size="46" font-weight="700" fill="${FARBE.ink}">Die digitale</text>
  <text x="52" y="214" font-size="46" font-weight="700" fill="${FARBE.ink}">Tierarztpraxis</text>
  <text x="52" y="258" font-size="25" fill="${FARBE.soft}">Marktübersicht ${EDITION.split(' ')[1]} · DACH</text>
  <text x="52" y="372" font-size="64" font-weight="700" fill="${FARBE.brand}">${anzahl}</text>
  <text x="52" y="404" font-size="20" fill="${FARBE.soft}">Anbieter</text>
  <text x="206" y="372" font-size="64" font-weight="700" fill="${FARBE.brand}">${kategorienAnzahl}</text>
  <text x="206" y="404" font-size="20" fill="${FARBE.soft}">Lösungsfelder</text>
  <text x="52" y="500" font-size="17" fill="${FARBE.muted}">Ohne Rangfolge, alphabetisch</text>
  <text x="52" y="526" font-size="17" fill="${FARBE.muted}">Stand ${EDITION} · Bild vom ${datumDe}</text>
  <rect x="${KARTE_X}" y="${KARTE_Y + 6}" width="${KARTE_B}" height="${KARTE_H}" rx="6" fill="#0f4c75" opacity="0.18" filter="url(#schatten)"/>
  <rect x="${KARTE_X - 1}" y="${KARTE_Y - 1}" width="${KARTE_B + 2}" height="${KARTE_H + 2}" rx="6" fill="#ffffff" stroke="${FARBE.kartenRand}"/>
</svg>`;
  // Zwei Schritte: sharp skaliert sonst vor dem Einsetzen, nicht danach.
  const ogGross = await sharp(Buffer.from(ogSvg))
    .composite([{ input: karte, left: KARTE_X * 2, top: KARTE_Y * 2 }])
    .png()
    .toBuffer();
  await sharp(ogGross)
    .resize({ width: OG_W, height: OG_H })
    .png({ compressionLevel: 9 })
    .toFile(join(PUBLIC, 'og', 'marktuebersicht.png'));

  png = true;
} catch (fehler) {
  console.log(
    `Kein PNG erzeugt (${String(fehler.message).slice(0, 60)}).\n` +
      'Das SVG steht bereit und der Download funktioniert. Für PNG: npm i -D sharp',
  );
}

console.log(
  `Marktübersicht erzeugt: ${W}×${H} (PNG ${W * 2}×${H * 2}), ${anzahl} Anbieter in ${kategorienAnzahl} Kategorien, Stand ${datumDe}.\n` +
    `  Bänder: ${entscheidung.baender.length ? entscheidung.baender.map((id) => `Kategorie ${id}`).join(', ') : 'keine'}\n` +
    `  Kachelhöhen: ${entscheidung.kachelHoehen.join(' · ')}\n` +
    (umgewandelt.length ? `  Für den Rasterer in PNG gewandelt: ${umgewandelt.join(', ')}\n` : '') +
    `  downloads/${BASISNAME}.svg${png ? `\n  downloads/${BASISNAME}.png\n  og/marktuebersicht.png` : ''}`,
);
