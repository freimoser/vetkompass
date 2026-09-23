import { useCallback, useEffect, useSyncExternalStore } from 'react';

/**
 * Reagiert auf eine CSS Media Query – z. B. um Desktop-Layout zu erkennen.
 *
 * Bewusst `useSyncExternalStore` statt `useState` + `useEffect`: Seit die
 * Startseite zur Bauzeit vorgerendert wird (scripts/prerender.mjs), gibt es
 * einen Server-Durchlauf ohne `window`. Läse der erste Client-Durchlauf schon
 * `matchMedia`, käme er auf einem breiten Bildschirm zu `true`, während im
 * vorgerenderten HTML `false` steht – React meldet das als
 * Hydration-Konflikt und verwirft den betroffenen Teilbaum.
 *
 * `useSyncExternalStore` löst genau das: Der dritte Parameter liefert den Wert
 * für Server und Hydration, danach gleicht React sofort auf den echten Wert ab.
 * Kein Konflikt, und trotzdem kein sichtbares Nachrücken erst nach dem Malen.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onChange);
      // Fallback: einzelne Umgebungen (u. a. Geräte-Emulation in DevTools)
      // liefern kein "change"-Event, wohl aber ein resize.
      window.addEventListener('resize', onChange);
      return () => {
        list.removeEventListener('change', onChange);
        window.removeEventListener('resize', onChange);
      };
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Breakpoint, ab dem die räumliche Map-Struktur der Grafik gezeigt wird. */
export const DESKTOP_QUERY = '(min-width: 1280px)';

/** Sperrt das Scrollen des Hintergrunds, solange ein Overlay offen ist. */
export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}
