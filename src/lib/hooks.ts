import { useEffect, useState } from 'react';

/** Reagiert auf eine CSS Media Query – z. B. um Desktop-Layout zu erkennen. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const list = window.matchMedia(query);
    const sync = () => setMatches(list.matches);
    sync();
    list.addEventListener('change', sync);
    // Fallback: einzelne Umgebungen (u. a. Geräte-Emulation in DevTools)
    // liefern kein "change"-Event, wohl aber ein resize.
    window.addEventListener('resize', sync);
    return () => {
      list.removeEventListener('change', sync);
      window.removeEventListener('resize', sync);
    };
  }, [query]);

  return matches;
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
