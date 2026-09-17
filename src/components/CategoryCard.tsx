import { useState, type CSSProperties } from 'react';
import { ChevronDown } from 'lucide-react';
import { ProviderLogo } from './ProviderLogo';
import { DESKTOP_QUERY, useMediaQuery } from '../lib/hooks';
import type { CategoryGroup } from '../lib/market';
import type { ProviderEntry } from '../types/market';

interface CategoryCardProps {
  group: CategoryGroup;
  onSelect: (entry: ProviderEntry) => void;
  /** Zusätzliche Rasterklassen aus dem Desktop-Layout (z. B. Spaltenbreite). */
  className?: string;
}

/**
 * Eine Kategorie-Box der Marktübersicht.
 *
 * Desktop: immer offen, entspricht der Kachel aus der Original-Grafik.
 * Mobile/Tablet: das Logo-Raster ist über die Überschrift einklappbar, damit
 * die Seite auf dem Smartphone navigierbar bleibt.
 */
export function CategoryCard({ group, onSelect, className = '' }: CategoryCardProps) {
  const { category, entries, subgroups, count } = group;
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const [collapsed, setCollapsed] = useState(false);

  const contentId = `kategorie-${category.slug}-inhalt`;
  const headingId = `kategorie-${category.slug}-titel`;
  const open = isDesktop || !collapsed;

  const titleClasses =
    'text-[0.78rem] font-bold uppercase leading-snug tracking-[0.09em] text-ink-900';

  return (
    <article
      id={`kategorie-${category.slug}`}
      aria-labelledby={headingId}
      className={`map-card flex h-full flex-col p-4 sm:p-5 ${className}`}
      style={{ '--logo-cols': category.logoColumns } as CSSProperties}
    >
      <header className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="shrink-0 text-[2.5rem] font-bold leading-[0.78] text-brand-400 tabular-nums"
        >
          {category.id}
        </span>

        <div className="min-w-0 flex-1 pt-0.5">
          <h3 id={headingId} className={isDesktop ? titleClasses : undefined}>
            <span className="sr-only">Kategorie {category.id}: </span>
            {isDesktop ? (
              category.title
            ) : (
              <button
                type="button"
                onClick={() => setCollapsed((value) => !value)}
                aria-expanded={open}
                aria-controls={contentId}
                className={`flex w-full items-start justify-between gap-2 rounded-lg text-left ${titleClasses}`}
              >
                <span className="min-w-0 flex-1">{category.title}</span>
                <span className="flex shrink-0 items-center gap-1 text-xs font-medium normal-case tracking-normal text-ink-500">
                  <span aria-hidden="true">{count}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`h-5 w-5 transition-transform duration-200 ${
                      open ? 'rotate-180' : ''
                    }`}
                  />
                  <span className="sr-only">
                    {count} Anbieter, {open ? 'einklappen' : 'ausklappen'}
                  </span>
                </span>
              </button>
            )}
          </h3>

          <p className="mt-1.5 text-xs leading-relaxed text-ink-500">{category.description}</p>
        </div>
      </header>

      <div id={contentId} hidden={!open} className="mt-4 flex flex-1 flex-col">
        <ul className="logo-grid list-none p-0">
          {entries.map((entry) => (
            <li key={entry.provider.id}>
              <ProviderLogo entry={entry} onSelect={onSelect} />
            </li>
          ))}
        </ul>

        {subgroups.map((subgroup) => (
          <section key={subgroup.id} className="mt-5 border-t border-brand-200 pt-4">
            <h4 className="text-[0.72rem] font-bold uppercase tracking-[0.09em] text-ink-700">
              {subgroup.title}
            </h4>
            {subgroup.description ? (
              <p className="mt-1.5 text-xs leading-relaxed text-ink-500">{subgroup.description}</p>
            ) : null}
            <ul className="logo-grid mt-3 list-none p-0">
              {subgroup.entries.map((entry) => (
                <li key={entry.provider.id}>
                  <ProviderLogo entry={entry} onSelect={onSelect} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}
