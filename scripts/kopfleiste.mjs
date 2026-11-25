/**
 * Feste Kopfleiste für die statisch erzeugten Seiten (Artikel, Ratgeber,
 * Rechtstexte). Gegenstück zu src/components/TopBar.tsx auf der Startseite –
 * gleiche Links, gleiche Höhe (3.5rem), bleibt beim Scrollen oben.
 * Wunsch 25.11.2026: Die Titelleiste soll immer sichtbar bleiben.
 */
import { MARKE } from '../src/config/verbund.ts';

const STETHOSKOP =
  '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M11 2v2"/><path d="M5 2v2"/><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/></svg>';

export const KOPFLEISTE_CSS = `
      html { scroll-padding-top: 4.5rem; }
      /*
        Gleiche Maße wie TopBar.tsx auf der Startseite: volle Breite, Inhalt
        auf 1560px zentriert, Rand 1rem bzw. 1.5rem ab 640px, Höhe 3.5rem,
        Marke 16px fett, Links 14px. Sonst springt die Leiste beim Wechsel
        zwischen Startseite und Unterseite (Hinweis 25.11.2026).
      */
      .kopfleiste {
        position: sticky; top: 0; z-index: 20;
        margin: -3rem -1.25rem 3rem;
        height: 3.5rem; box-sizing: border-box;
        background: rgba(255, 255, 255, 0.95); border-bottom: 1px solid #dceffa;
        -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px);
        font-size: 1rem; line-height: 1.5;
      }
      .kopfleiste .innen {
        max-width: 1560px; height: 100%; margin: 0 auto; padding: 0 1rem; box-sizing: border-box;
        display: flex; align-items: center; justify-content: space-between; gap: 1rem;
      }
      @media (min-width: 40rem) { .kopfleiste .innen { padding: 0 1.5rem; } }
      .kopfleiste a { text-decoration: none; display: inline-flex; align-items: center; min-height: 24px; }
      .kopfleiste .marke { gap: 0.5rem; font-weight: 700; font-size: 1rem; color: #0f1419; white-space: nowrap; }
      .kopfleiste .marke svg { color: #2b9ad8; flex-shrink: 0; }
      .kopfleiste nav { display: flex; gap: 1.25rem; font-size: 0.875rem; line-height: 1.25rem; }
      .kopfleiste nav a { color: #333c45; font-weight: 500; }
      .kopfleiste nav a:hover, .kopfleiste .marke:hover { color: #1a7eb8; }
      @media (max-width: 39.99rem) { .kopfleiste .weg-mobil { display: none; } }
      @media print { .kopfleiste { display: none; } }`;

export const kopfleisteHtml = () => `    <header class="kopfleiste" data-seitenstand="aus"><div class="innen">
        <a class="marke" href="./">${STETHOSKOP}${MARKE}</a>
        <nav aria-label="Hauptnavigation">
          <a href="./#marktuebersicht">Marktübersicht</a>
          <a class="weg-mobil" href="./#artikel">Artikel</a>
          <a class="weg-mobil" href="./#anbieter-vorschlagen">Anbieter ergänzen</a>
        </nav>
    </div></header>`;
