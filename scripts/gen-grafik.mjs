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
 *  - `public/downloads/<name>.png`  – 1920 px breit, nur wenn `sharp` vorhanden
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
const KACHEL_H = 52;
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
/* Karten aufbauen                                                    */
/* ================================================================== */

const alphabetisch = (a, b) => a.name.localeCompare(b.name, 'de', { sensitivity: 'base' });
const labelFor = (p, id) => p.variants?.[id]?.label ?? p.name;
const logoFor = (p, id) => p.variants?.[id]?.logo ?? p.logo;

/** Bereitet eine Kategorie zur Ausgabe vor und berechnet ihre Höhe. */
function karte(kategorie, breite) {
  const eintraege = providers
    .filter((p) => p.categories.includes(kategorie.id))
    .sort(alphabetisch)
    .map((p) => ({
      label: labelFor(p, kategorie.id),
      uri: datenUri(logoFor(p, kategorie.id)),
    }));

  const innen = breite - 2 * KARTEN_PAD;
  const spalten = kategorie.logoColumns ?? 2;
  const kachelB = (innen - KACHEL_GAP * (spalten - 1)) / spalten;

  // Der Titel steht rechts neben der großen Ziffer.
  const titelBreite = innen - 44;
  const titelZeilen = umbruch(kategorie.title.toUpperCase(), titelBreite, 12, 0.72);
  /*
    Vier Zeilen, und wenn es dann immer noch nicht reicht, ein Auslassungs-
    zeichen. Ein Satz, der mitten im Wort endet, sieht aus wie ein Fehler –
    ein gekürzter Satz sieht aus wie eine Kürzung.
  */
  const alleBeschrZeilen = umbruch(kategorie.description, innen, 10.5);
  const beschrZeilen = alleBeschrZeilen.slice(0, 4);
  if (alleBeschrZeilen.length > 4) {
    beschrZeilen[3] = `${beschrZeilen[3].replace(/[\s–-]+$/, '')} …`;
  }

  /*
    Die Y-Werte einmal hier ausrechnen und weiterreichen, statt sie beim
    Zeichnen noch einmal herzuleiten. Bei der ersten Fassung liefen beide
    Rechnungen auseinander, und zweizeilige Titel schoben sich in die
    Beschreibung.
  */
  const titelY = KARTEN_PAD + 14;
  const titelEndeY = titelY + (titelZeilen.length - 1) * 15;
  const beschrY = Math.max(titelEndeY + 20, KARTEN_PAD + 48);
  const kopfH = beschrY + (beschrZeilen.length - 1) * 13 + 20;

  const reihen = Math.ceil(eintraege.length / spalten);
  const hoehe = kopfH + reihen * (KACHEL_H + KACHEL_GAP) - KACHEL_GAP + KARTEN_PAD;

  return {
    kategorie, eintraege, breite, spalten, kachelB,
    titelZeilen, beschrZeilen, titelY, beschrY, kopfH, hoehe,
  };
}

/** Zeichnet eine vorbereitete Karte an Position (x, y). */
function zeichneKarte(k, x, y) {
  const { kategorie, eintraege, breite, spalten, kachelB } = k;
  const { titelZeilen, beschrZeilen, titelY, beschrY, kopfH } = k;
  const teile = [
    `<rect x="${x}" y="${y}" width="${breite}" height="${k.hoehe}" rx="14" fill="#ffffff" stroke="${FARBE.kartenRand}" stroke-width="1"/>`,
    `<text x="${x + KARTEN_PAD}" y="${y + KARTEN_PAD + 27}" font-family="${SCHRIFT}" font-size="32" font-weight="700" fill="${FARBE.brandHell}">${kategorie.id}</text>`,
  ];

  titelZeilen.forEach((zeile, i) => {
    teile.push(
      `<text x="${x + KARTEN_PAD + 44}" y="${y + titelY + i * 15}" font-family="${SCHRIFT}" font-size="12" font-weight="700" letter-spacing="1.1" fill="${FARBE.ink}">${esc(zeile)}</text>`,
    );
  });

  beschrZeilen.forEach((zeile, i) => {
    teile.push(
      `<text x="${x + KARTEN_PAD}" y="${y + beschrY + i * 13}" font-family="${SCHRIFT}" font-size="10.5" fill="${FARBE.muted}">${esc(zeile)}</text>`,
    );
  });

  eintraege.forEach((e, i) => {
    const sp = i % spalten;
    const reihe = Math.floor(i / spalten);
    const kx = x + KARTEN_PAD + sp * (kachelB + KACHEL_GAP);
    const ky = y + kopfH + reihe * (KACHEL_H + KACHEL_GAP);

    if (e.uri) {
      // 8 px Luft ringsum, damit die Marken nicht aneinanderstoßen.
      teile.push(
        `<image x="${kx + 6}" y="${ky + 6}" width="${kachelB - 12}" height="${KACHEL_H - 12}" preserveAspectRatio="xMidYMid meet" href="${e.uri}"/>`,
      );
    } else {
      // Ohne Logodatei die Wortmarke setzen – genau wie auf der Seite.
      const zeilen = umbruch(e.label, kachelB - 10, 11.5).slice(0, 2);
      const start = ky + KACHEL_H / 2 - ((zeilen.length - 1) * 13) / 2 + 4;
      zeilen.forEach((zeile, z) => {
        teile.push(
          `<text x="${kx + kachelB / 2}" y="${start + z * 13}" text-anchor="middle" font-family="${SCHRIFT}" font-size="11.5" font-weight="600" fill="${FARBE.soft}">${esc(zeile)}</text>`,
        );
      });
    }
  });

  return teile.join('\n  ');
}

/* ================================================================== */
/* Seite setzen                                                       */
/* ================================================================== */

const heute = new Date();
const datumDe = heute.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });

const nachSpalte = (name) => categories.filter((c) => c.placement.column === name);

/* Linke Spalte: zwei Unterspalten, Karten wandern immer in die kürzere. */
function setzeLinks(x, gesamtBreite) {
  const breite = (gesamtBreite - SUB_GAP) / SPALTEN.left.sub;
  const hoehen = new Array(SPALTEN.left.sub).fill(0);
  const stuecke = [];
  for (const kategorie of nachSpalte('left')) {
    const k = karte(kategorie, breite);
    const ziel = hoehen.indexOf(Math.min(...hoehen));
    const kx = x + ziel * (breite + SUB_GAP);
    stuecke.push(zeichneKarte(k, kx, KOPF + hoehen[ziel]));
    hoehen[ziel] += k.hoehe + KARTEN_GAP;
  }
  return { svg: stuecke.join('\n  '), hoehe: Math.max(...hoehen) };
}

function setzeGestapelt(spalte, x, breite) {
  let y = 0;
  const stuecke = [];
  for (const kategorie of nachSpalte(spalte)) {
    const k = karte(kategorie, breite);
    stuecke.push(zeichneKarte(k, x, KOPF + y));
    y += k.hoehe + KARTEN_GAP;
  }
  return { svg: stuecke.join('\n  '), hoehe: y };
}

const links = setzeLinks(SPALTEN.left.x, SPALTEN.left.w);
const mitte = setzeGestapelt('center', SPALTEN.center.x, SPALTEN.center.w);
const rechts = setzeGestapelt('right', SPALTEN.right.x, SPALTEN.right.w);

const inhaltsHoehe = Math.max(links.hoehe, mitte.hoehe, rechts.hoehe);
const H = Math.round(KOPF + inhaltsHoehe + FUSS);

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

  ${links.svg}

  ${mitte.svg}

  ${rechts.svg}

  <line x1="${PAD}" y1="${H - FUSS + 16}" x2="${W - PAD}" y2="${H - FUSS + 16}" stroke="${FARBE.linie}" stroke-width="2"/>
  <text x="${PAD}" y="${H - FUSS + 42}" font-size="12" fill="${FARBE.muted}">Alle Marken-, Produkt- und Unternehmensnamen sowie Logos sind Eigentum der jeweiligen Rechteinhaber. Nennung ausschließlich zu Informationszwecken; eine geschäftliche Verbindung entsteht daraus nicht.</text>
  <text x="${PAD}" y="${H - FUSS + 60}" font-size="12" fill="${FARBE.muted}">Sortierung innerhalb jeder Kategorie rein alphabetisch. Der Herausgeber ist an einem der genannten Anbieter beteiligt – Offenlegung im Abschnitt „Zur Transparenz“ der Website.</text>
</svg>
`;

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
  const puffer = await sharp(Buffer.from(svg), { density: 96 })
    .resize({ width: W })
    .png({ compressionLevel: 9 })
    .toBuffer();
  writeFileSync(join(PUBLIC, 'downloads', `${BASISNAME}.png`), puffer);

  /*
    Die Social-Vorschau muss 1200×630 sein und beschnitten werden – ein
    3000 px hohes Bild zeigt LinkedIn als briefmarkengroßen Streifen. Deshalb
    der obere Ausschnitt mit Titel, Datum und den ersten Kategorien.
  */
  await sharp(Buffer.from(svg), { density: 96 })
    .resize({ width: 1200 })
    .extract({ left: 0, top: 0, width: 1200, height: Math.min(630, Math.round((H * 1200) / W)) })
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
  `Marktübersicht erzeugt: ${W}×${H} px, ${anzahl} Anbieter in ${kategorienAnzahl} Kategorien, Stand ${datumDe}.\n` +
    `  downloads/${BASISNAME}.svg${png ? `\n  downloads/${BASISNAME}.png\n  og/marktuebersicht.png` : ''}`,
);
