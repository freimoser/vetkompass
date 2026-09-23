import { useMemo, useState } from 'react';
import { SearchX } from 'lucide-react';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { MarketMap } from './components/MarketMap';
import { ProviderModal } from './components/ProviderModal';
import { ArticleSection } from './components/ArticleSection';
import { AboutSection } from './components/AboutSection';
import { TransparencySection } from './components/TransparencySection';
import { SubmitProviderSection } from './components/SubmitProviderSection';
import { Footer } from './components/Footer';
import { categories } from './data/categories';
import { providers } from './data/providers';
import { buildCategoryGroups, countUniqueProviders } from './lib/market';
import { anchors } from './config/site';
import type { MarketFilters, ProviderEntry } from './types/market';

const initialFilters: MarketFilters = { query: '', category: 'all', country: 'all' };

export default function App() {
  const [filters, setFilters] = useState<MarketFilters>(initialFilters);
  const [selected, setSelected] = useState<ProviderEntry | null>(null);

  const groups = useMemo(
    () => buildCategoryGroups(categories, providers, filters),
    [filters],
  );

  const providerCount = useMemo(() => countUniqueProviders(groups), [groups]);

  const resultSummary =
    groups.length === 0
      ? 'Keine Treffer'
      : `${providerCount} Anbieter in ${groups.length} ${
          groups.length === 1 ? 'Kategorie' : 'Kategorien'
        }`;

  return (
    <>
      <a
        href="#inhalt"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50
                   focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm
                   focus:font-semibold focus:text-white"
      >
        Zum Inhalt springen
      </a>

      <div className="mx-auto max-w-[1560px] px-4 sm:px-6">
        <Header />

        <main id="inhalt">
          <section id={anchors.marketMap}>
            <h2 className="sr-only">Marktübersicht</h2>

            <FilterBar filters={filters} onChange={setFilters} resultSummary={resultSummary} />

            <div className="pb-14 pt-5">
              {groups.length > 0 ? (
                <MarketMap
                  groups={groups}
                  onSelect={setSelected}
                  spatial={groups.length === categories.length}
                />
              ) : (
                <div className="map-card flex flex-col items-center gap-4 px-6 py-16 text-center">
                  <SearchX aria-hidden="true" className="h-8 w-8 text-brand-300" />
                  <p className="text-sm font-semibold text-ink-900">
                    Für diese Filter gibt es keine Treffer.
                  </p>
                  <p className="max-w-md text-sm text-ink-500">
                    Passen Sie Suche, Kategorie oder Land an – oder schlagen Sie den fehlenden
                    Anbieter für die nächste Ausgabe vor.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFilters(initialFilters)}
                    className="btn-secondary"
                  >
                    Filter zurücksetzen
                  </button>
                </div>
              )}
            </div>
          </section>

          <ArticleSection />
          <AboutSection />
          <TransparencySection />
          <SubmitProviderSection />
        </main>

        <Footer />
      </div>

      <ProviderModal entry={selected} onClose={() => setSelected(null)} />
    </>
  );
}
