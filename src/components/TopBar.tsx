import { Stethoscope } from 'lucide-react';
import { anchors } from '../config/site';
import { MARKE } from '../config/verbund';

/**
 * Feste Kopfleiste: bleibt beim Scrollen oben (Wunsch 25.11.2026).
 * Gegenstück auf den statischen Seiten: scripts/kopfleiste.mjs – gleiche
 * Links, gleiche Höhe (h-14 = 3.5rem, darauf beziehen sich FilterBar und
 * scroll-padding in index.css).
 */
export function TopBar() {
  return (
    <div className="no-print sticky top-0 z-40 h-14 border-b border-brand-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-full max-w-[1560px] items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#" className="inline-flex min-h-6 items-center gap-2 whitespace-nowrap font-bold text-ink-900 hover:text-brand-700">
          <Stethoscope aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-500" strokeWidth={1.75} />
          {MARKE}
        </a>
        <nav aria-label="Hauptnavigation" className="flex gap-5 text-sm font-medium text-ink-700">
          <a href={`#${anchors.marketMap}`} className="inline-flex min-h-6 items-center hover:text-brand-700">Marktübersicht</a>
          <a href={`#${anchors.articles}`} className="hidden min-h-6 items-center hover:text-brand-700 sm:inline-flex">Artikel</a>
          <a href={`#${anchors.submit}`} className="hidden min-h-6 items-center hover:text-brand-700 sm:inline-flex">Anbieter ergänzen</a>
        </nav>
      </div>
    </div>
  );
}
