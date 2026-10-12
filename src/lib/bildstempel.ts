import { BILDSTEMPEL } from '../config/bildstempel';

const zweistellig = (n: number) => String(n).padStart(2, '0');

/**
 * Lädt das Bild der Marktübersicht und setzt oben rechts eine Plakette
 * „Heruntergeladen am …“ hinein.
 *
 * Eine Plakette statt einer weiteren Textzeile: Das Bild wird auf dem Server
 * mit DejaVu Sans gesetzt, der Browser hat diese Schrift nicht. Eine Zeile in
 * fremder Schrift unter den anderen sähe nach Fehler aus – eine Plakette in
 * der Markenfarbe ist erkennbar ein Stempel.
 */
export async function bildMitStempel(url: string, jetzt = new Date()): Promise<Blob> {
  const antwort = await fetch(url);
  if (!antwort.ok) throw new Error(`Bild nicht geladen (${antwort.status})`);
  const bild = await createImageBitmap(await antwort.blob());

  const leinwand = document.createElement('canvas');
  leinwand.width = bild.width;
  leinwand.height = bild.height;
  const ctx = leinwand.getContext('2d');
  if (!ctx) throw new Error('Kein Canvas-Kontext');
  ctx.drawImage(bild, 0, 0);

  const s = bild.width / BILDSTEMPEL.breite;
  const text =
    `Heruntergeladen am ${zweistellig(jetzt.getDate())}.${zweistellig(jetzt.getMonth() + 1)}.` +
    `${jetzt.getFullYear()} · ${zweistellig(jetzt.getHours())}:${zweistellig(jetzt.getMinutes())} Uhr`;

  ctx.font = `600 ${12 * s}px -apple-system, "Helvetica Neue", "Segoe UI", Arial, sans-serif`;
  const innen = 10 * s;
  const breite = ctx.measureText(text).width + 2 * innen;
  const hoehe = BILDSTEMPEL.hoehe * s;
  const x = BILDSTEMPEL.rechts * s - breite;
  const y = BILDSTEMPEL.oben * s;

  ctx.fillStyle = '#176595';
  ctx.beginPath();
  ctx.roundRect(x, y, breite, hoehe, hoehe / 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x + innen, y + hoehe / 2 + 0.5 * s);

  return new Promise((fertig, fehler) =>
    leinwand.toBlob((b) => (b ? fertig(b) : fehler(new Error('PNG nicht erzeugt'))), 'image/png'),
  );
}

/** Dateiname mit Datum, damit mehrere Downloads sich nicht überschreiben. */
export function dateinameMitDatum(name: string, jetzt = new Date()): string {
  const datum = `${jetzt.getFullYear()}-${zweistellig(jetzt.getMonth() + 1)}-${zweistellig(jetzt.getDate())}`;
  return name.replace(/(\.[a-z]+)$/i, `-${datum}$1`);
}
