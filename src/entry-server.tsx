/**
 * Einstiegspunkt für das Vorrendern zur Bauzeit (siehe scripts/prerender.mjs).
 *
 * Warum es das gibt: Ohne Vorrendern liefert die Seite ein leeres
 * `<div id="root">` aus. Googlebot führt JavaScript aus und käme damit zurecht –
 * die Crawler der Antwortmaschinen überwiegend nicht. Für das erklärte Ziel
 * „zitiert werden" wäre die Übersicht also unsichtbar gewesen: kein einziger
 * Anbietername stand im ausgelieferten HTML.
 *
 * Bewusst ohne `./index.css`: Das Stylesheet baut Vite aus dem Client-Bündel,
 * hier würde es nur den SSR-Lauf beschweren.
 */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { startFragen } from './data/startFragen';
import { providers } from './data/providers';

/**
 * Strukturdaten der Startseite, die aus den Daten entstehen und deshalb nicht
 * von Hand in index.html stehen können: die häufigen Fragen (sichtbar in
 * FaqSection) und die Liste aller Anbieter. Zuvor nannte das Schema der
 * Startseite keinen einzigen Anbieter.
 */
export function strukturdaten(siteUrl: string): object[] {
  const namen = [...providers].sort((a, b) => a.name.localeCompare(b.name, 'de', { sensitivity: 'base' }));
  return [
    {
      '@type': 'FAQPage',
      '@id': `${siteUrl}#fragen`,
      mainEntity: startFragen().map((f) => ({
        '@type': 'Question',
        name: f.frage,
        acceptedAnswer: { '@type': 'Answer', text: f.antwort },
      })),
    },
    {
      '@type': 'ItemList',
      '@id': `${siteUrl}#anbieter`,
      name: 'Anbieter in der Marktübersicht',
      numberOfItems: namen.length,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      itemListElement: namen.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.name,
        ...(p.website ? { url: p.website } : {}),
      })),
    },
  ];
}

export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
