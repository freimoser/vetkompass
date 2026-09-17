import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

/** Freitextsuche über Anbieternamen und Schlagworte. */
export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <label htmlFor="anbieter-suche" className="sr-only">
        Anbieter suchen
      </label>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300"
      />
      <input
        id="anbieter-suche"
        type="search"
        inputMode="search"
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Anbieter suchen …"
        className="w-full rounded-lg border border-brand-200 bg-white py-2 pl-9 pr-9 text-sm
                   text-ink-900 placeholder:text-ink-300 hover:border-brand-300
                   focus:border-brand-500 focus:outline-none
                   [&::-webkit-search-cancel-button]:hidden"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Suche zurücksetzen"
          className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center
                     justify-center rounded-full text-ink-500 hover:bg-brand-50 hover:text-ink-900"
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
