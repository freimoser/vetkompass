import { Globe, RotateCcw } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { categories } from '../data/categories';
import { countryLabels, countryOrder } from '../config/site';
import type { CategoryId, Country, MarketFilters } from '../types/market';

interface FilterBarProps {
  filters: MarketFilters;
  onChange: (filters: MarketFilters) => void;
  /** Für die Live-Region: Wie viele Anbieter/Kategorien sind gerade sichtbar? */
  resultSummary: string;
}

const emptyFilters: MarketFilters = { query: '', category: 'all', country: 'all' };

/**
 * Toolbar über der Marktübersicht: Suche, Kategorienfilter, Länderfilter.
 * Klebt am oberen Rand, damit Filter auch beim Scrollen erreichbar bleiben.
 */
export function FilterBar({ filters, onChange, resultSummary }: FilterBarProps) {
  const hasActiveFilters =
    filters.query !== '' || filters.category !== 'all' || filters.country !== 'all';

  const setCategory = (category: CategoryId | 'all') => onChange({ ...filters, category });

  return (
    <div className="no-print sticky top-0 z-30 -mx-4 border-b border-brand-100 bg-white/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
      <div className="mx-auto flex max-w-[1560px] flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <SearchBar
            value={filters.query}
            onChange={(query) => onChange({ ...filters, query })}
          />

          <div className="relative flex items-center">
            <Globe
              aria-hidden="true"
              className="pointer-events-none absolute left-3 h-4 w-4 text-ink-300"
            />
            <label htmlFor="land-filter" className="sr-only">
              Land filtern
            </label>
            <select
              id="land-filter"
              value={filters.country}
              onChange={(event) =>
                onChange({ ...filters, country: event.target.value as Country | 'all' })
              }
              className="appearance-none rounded-lg border border-brand-200 bg-white py-2 pl-9 pr-8
                         text-sm font-medium text-ink-900 hover:border-brand-300
                         focus:border-brand-500 focus:outline-none"
            >
              <option value="all">DACH (alle)</option>
              {countryOrder.map((country) => (
                <option key={country} value={country}>
                  {countryLabels[country]}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters ? (
            <button
              type="button"
              onClick={() => onChange(emptyFilters)}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm
                         font-medium text-brand-700 hover:bg-brand-50"
            >
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              Filter zurücksetzen
            </button>
          ) : null}

          <p aria-live="polite" className="ml-auto text-sm text-ink-500">
            {resultSummary}
          </p>
        </div>

        {/*
          Mobil eine horizontal scrollbare Leiste, ab md umbrechend – so bleibt
          die Sticky-Toolbar auf dem Smartphone flach.
        */}
        <div
          role="group"
          aria-label="Nach Kategorie filtern"
          className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:flex-wrap md:overflow-visible
                     md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <button
            type="button"
            onClick={() => setCategory('all')}
            aria-pressed={filters.category === 'all'}
            className={`chip shrink-0 ${filters.category === 'all' ? 'chip-active' : 'chip-idle'}`}
          >
            Alle
          </button>
          {categories.map((category) => {
            const active = filters.category === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setCategory(category.id)}
                aria-pressed={active}
                className={`chip shrink-0 ${active ? 'chip-active' : 'chip-idle'}`}
              >
                <span aria-hidden="true" className="font-bold opacity-60">
                  {category.id}
                </span>
                {category.shortTitle}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
