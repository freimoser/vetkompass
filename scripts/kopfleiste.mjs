/**
 * Feste Kopfleiste für die statisch erzeugten Seiten (Artikel, Ratgeber,
 * Rechtstexte). Gegenstück zu src/components/TopBar.tsx auf der Startseite –
 * gleiche Links, gleiche Höhe (3.5rem), bleibt beim Scrollen oben.
 * Wunsch 25.11.2026: Die Titelleiste soll immer sichtbar bleiben.
 */
import { MARKE } from '../src/config/verbund.ts';

const STETHOSKOP =
  '<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M11 2v2"/><path d="M5 2v2"/><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/></svg>';

export const KOPFLEISTE_CSS = `
      html { scroll-padding-top: 4.5rem; }
      .kopfleiste {
        position: sticky; top: 0; z-index: 20;
        margin: -3rem -1.25rem 2rem; padding: 0 1.25rem;
        height: 3.5rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem;
        background: rgba(255, 255, 255, 0.95); border-bottom: 1px solid #dceffa;
        -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px);
      }
      .kopfleiste a { text-decoration: none; display: inline-flex; align-items: center; min-height: 24px; }
      .kopfleiste .marke { gap: 0.5rem; font-weight: 700; color: #0f1419; white-space: nowrap; }
      .kopfleiste .marke svg { color: #2b9ad8; flex-shrink: 0; }
      .kopfleiste nav { display: flex; gap: 1.25rem; font-size: 0.875rem; }
      .kopfleiste nav a { color: #333c45; font-weight: 500; }
      .kopfleiste nav a:hover, .kopfleiste .marke:hover { color: #1a7eb8; }
      @media (max-width: 40rem) { .kopfleiste .weg-mobil { display: none; } }
      @media print { .kopfleiste { display: none; } }`;

export const kopfleisteHtml = () => `      <header class="kopfleiste" data-seitenstand="aus">
        <a class="marke" href="./">${STETHOSKOP}${MARKE}</a>
        <nav aria-label="Hauptnavigation">
          <a href="./#marktuebersicht">Marktübersicht</a>
          <a class="weg-mobil" href="./#artikel">Artikel</a>
          <a class="weg-mobil" href="./#anbieter-vorschlagen">Anbieter ergänzen</a>
        </nav>
      </header>`;
