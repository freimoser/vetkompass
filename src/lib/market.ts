import type {
  Category,
  CategoryId,
  MarketFilters,
  Provider,
  ProviderEntry,
} from '../types/market';

/** Eine Kategorie inkl. der aktuell sichtbaren Anbieter. */
export interface CategoryGroup {
  category: Category;
  /** Anbieter im Hauptbereich der Kategorie. */
  entries: ProviderEntry[];
  /** Anbieter je Untergruppe, in der Reihenfolge von `category.subgroups`. */
  subgroups: Array<{
    id: string;
    title: string;
    description?: string;
    entries: ProviderEntry[];
  }>;
  /** Gesamtzahl sichtbarer Anbieter in dieser Kategorie. */
  count: number;
}

const collator = new Intl.Collator('de', { sensitivity: 'base', numeric: true });

/** Kleinschreibung ohne Diakritika – damit "Osterreich" auch "Österreich" findet. */
function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/** Anzeigename eines Anbieters in einer konkreten Kategorie. */
export function labelFor(provider: Provider, categoryId: CategoryId): string {
  return provider.variants?.[categoryId]?.label ?? provider.name;
}

/** Logopfad eines Anbieters in einer konkreten Kategorie. */
export function logoFor(provider: Provider, categoryId: CategoryId): string | undefined {
  return provider.variants?.[categoryId]?.logo ?? provider.logo;
}

/** Sucht über Anzeigename, Anbietername und Schlagworte. */
function matchesQuery(provider: Provider, categoryId: CategoryId, query: string): boolean {
  if (!query) return true;
  const needle = normalize(query);
  const haystack = [
    provider.name,
    labelFor(provider, categoryId),
    ...(provider.tags ?? []),
  ].map(normalize);
  return haystack.some((value) => value.includes(needle));
}

function matchesCountry(provider: Provider, filters: MarketFilters): boolean {
  return filters.country === 'all' || provider.countries.includes(filters.country);
}

function toEntry(provider: Provider, categoryId: CategoryId): ProviderEntry {
  return {
    provider,
    categoryId,
    label: labelFor(provider, categoryId),
    logo: logoFor(provider, categoryId),
  };
}

function sortEntries(entries: ProviderEntry[]): ProviderEntry[] {
  // Neutrale Reihenfolge: rein alphabetisch, keine Bevorzugung einzelner Anbieter.
  return [...entries].sort((a, b) => collator.compare(a.label, b.label));
}

/**
 * Baut die Kategoriegruppen für die aktuelle Filterkombination.
 * Kategorien ohne Treffer werden nicht zurückgegeben.
 */
export function buildCategoryGroups(
  categories: Category[],
  providers: Provider[],
  filters: MarketFilters,
): CategoryGroup[] {
  const groups: CategoryGroup[] = [];

  for (const category of categories) {
    if (filters.category !== 'all' && filters.category !== category.id) continue;

    const matching = providers.filter(
      (provider) =>
        provider.categories.includes(category.id) &&
        matchesCountry(provider, filters) &&
        matchesQuery(provider, category.id, filters.query),
    );

    const subgroupIds = new Set((category.subgroups ?? []).map((group) => group.id));

    const main: ProviderEntry[] = [];
    const bySubgroup = new Map<string, ProviderEntry[]>();

    for (const provider of matching) {
      const entry = toEntry(provider, category.id);
      // Gehört der Anbieter zu einer Untergruppe dieser Kategorie, erscheint er
      // ausschließlich dort – nicht zusätzlich im Hauptbereich.
      const memberOf = provider.subgroups?.find((id) => subgroupIds.has(id));
      if (memberOf) {
        const bucket = bySubgroup.get(memberOf) ?? [];
        bucket.push(entry);
        bySubgroup.set(memberOf, bucket);
      } else {
        main.push(entry);
      }
    }

    const subgroups = (category.subgroups ?? [])
      .map((group) => ({
        id: group.id,
        title: group.title,
        description: group.description,
        entries: sortEntries(bySubgroup.get(group.id) ?? []),
      }))
      .filter((group) => group.entries.length > 0);

    const count = main.length + subgroups.reduce((sum, group) => sum + group.entries.length, 0);
    if (count === 0) continue;

    groups.push({ category, entries: sortEntries(main), subgroups, count });
  }

  return groups;
}

/** Zahl der eindeutigen Anbieter über alle sichtbaren Kategorien hinweg. */
export function countUniqueProviders(groups: CategoryGroup[]): number {
  const ids = new Set<string>();
  for (const group of groups) {
    for (const entry of group.entries) ids.add(entry.provider.id);
    for (const subgroup of group.subgroups) {
      for (const entry of subgroup.entries) ids.add(entry.provider.id);
    }
  }
  return ids.size;
}

/** Gruppen einer Layout-Spalte, für das Desktop-Raster. */
export function groupsForColumn(
  groups: CategoryGroup[],
  column: Category['placement']['column'],
): CategoryGroup[] {
  return groups.filter((group) => group.category.placement.column === column);
}
