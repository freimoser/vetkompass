/**
 * Meldet die Adressen der Sitemap per IndexNow an Bing (und weitere
 * teilnehmende Suchmaschinen). ChatGPTs Websuche stützt sich auf den
 * Bing-Index; ohne Meldung wartet eine Änderung, bis Bing von selbst crawlt.
 *
 * Läuft nur, wenn die Repository-Variable INDEXNOW auf 1 steht (siehe
 * .github/workflows/deploy.yml). Ausgeschaltet ausgeliefert: Die Meldung
 * überträgt die öffentlichen Adressen an einen externen Dienst, deshalb
 * entscheidet der Betreiber, ob sie läuft.
 *
 * Der Schlüssel ist öffentlich und liegt als public/668c933c07bc96faa5a98997b95bba38.txt im Build –
 * so beweist IndexNow, dass die Meldung von der eigenen Domain kommt.
 *
 * Aufruf (nach dem Deploy): node scripts/indexnow.mjs
 */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SCHLUESSEL = '668c933c07bc96faa5a98997b95bba38';
const base = (process.env.VITE_SITE_URL || '').trim().replace(/\/+$/, '');
if (!/^https:\/\//.test(base)) {
  console.log('IndexNow übersprungen: VITE_SITE_URL fehlt.');
  process.exit(0);
}

// Nach dem Deploy die live ausgelieferte Sitemap, lokal die aus dem Build.
const lokal = join(ROOT, 'dist', 'sitemap.xml');
const sitemap = existsSync(lokal)
  ? readFileSync(lokal, 'utf8')
  : await (await fetch(`${base}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const antwort = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: new URL(base).host,
    key: SCHLUESSEL,
    keyLocation: `${base}/${SCHLUESSEL}.txt`,
    urlList,
  }),
});
console.log(`IndexNow: ${urlList.length} Adressen gemeldet, Antwort ${antwort.status}.`);
// 200 und 202 heißen angenommen; alles andere bricht den Deploy nicht ab.
