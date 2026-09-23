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

export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
