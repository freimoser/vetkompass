import { useState } from 'react';
import { asset } from '../config/site';
import type { ProviderEntry } from '../types/market';

interface ProviderLogoProps {
  entry: ProviderEntry;
  onSelect: (entry: ProviderEntry) => void;
}

/**
 * Eine Anbieter-Kachel in der Marktübersicht.
 *
 * Liegt ein Logo vor, wird es mit `object-contain` in eine einheitlich hohe
 * Fläche gesetzt – die Originalproportionen bleiben erhalten, die optische
 * Wirkung innerhalb einer Kategorie bleibt trotzdem vergleichbar.
 * Fehlt das Logo (oder lädt es nicht), erscheint eine neutrale Text-Wortmarke.
 */
export function ProviderLogo({ entry, onSelect }: ProviderLogoProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(entry.logo) && !imageFailed;

  return (
    <button
      type="button"
      onClick={() => onSelect(entry)}
      aria-label={`${entry.label} – Details anzeigen`}
      className="group relative flex h-20 w-full items-center justify-center rounded-lg
                 px-2 py-2 transition duration-150 ease-out
                 hover:scale-[1.03] hover:shadow-[0_4px_16px_-4px_rgba(15,20,25,0.22)]
                 focus-visible:scale-[1.03]"
    >
      {showImage ? (
        <img
          src={asset(entry.logo as string)}
          alt={`Logo von ${entry.label}`}
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="max-h-14 max-w-full object-contain"
        />
      ) : (
        <span
          className="line-clamp-3 text-center text-[0.9375rem] font-semibold leading-tight
                     text-ink-900 break-words hyphens-auto"
        >
          {entry.label}
        </span>
      )}

      {/* Tooltip: nur auf Zeigegeräten, damit Touch-Nutzung nicht gestört wird. */}
      <span
        role="tooltip"
        aria-hidden="true"
        className="pointer-events-none absolute -top-1 left-1/2 z-20 hidden -translate-x-1/2
                   -translate-y-full whitespace-nowrap rounded-md bg-ink-900 px-2 py-1
                   text-xs font-medium text-white opacity-0 transition-opacity duration-150
                   group-hover:opacity-100 group-focus-visible:opacity-100
                   xl:block"
      >
        {entry.label}
      </span>
    </button>
  );
}
