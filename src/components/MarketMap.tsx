import { CategoryCard } from './CategoryCard';
import { groupsForColumn, type CategoryGroup } from '../lib/market';
import type { ProviderEntry } from '../types/market';

interface MarketMapProps {
  groups: CategoryGroup[];
  onSelect: (entry: ProviderEntry) => void;
  /**
   * Räumliche Struktur der Original-Grafik verwenden.
   * Sinnvoll nur, wenn alle Kategorien sichtbar sind – gefiltert wirkt das
   * Raster sonst löchrig, weil einzelne Karten in ihrer Spalte allein stehen.
   */
  spatial: boolean;
}

export function MarketMap({ groups, onSelect, spatial }: MarketMapProps) {
  const renderCard = (group: CategoryGroup, className = '') => (
    <CategoryCard
      key={group.category.id}
      group={group}
      onSelect={onSelect}
      className={className}
    />
  );

  if (!spatial) {
    // Gefilterte Ansicht: schlichtes, gleichmäßiges Raster.
    return (
      <div className="grid items-start gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-5">
        {groups.map((group) => renderCard(group))}
      </div>
    );
  }

  const left = groupsForColumn(groups, 'left');
  const center = groupsForColumn(groups, 'center');
  const right = groupsForColumn(groups, 'right');

  /*
    Ab 1280px entsteht die Struktur der Grafik: breiter Block links
    (Kategorien 1–5), hohe Praxissoftware-Spalte in der Mitte, gestapelte
    Kategorien rechts. Darunter laufen alle Karten in einer Spalte.

    Die Karten existieren nur einmal im DOM: Die Spaltencontainer sind
    unterhalb des Breakpoints `display: contents`, sodass ihre Karten direkt
    Kinder des äußeren Rasters werden.
  */
  return (
    <div className="grid gap-4 xl:grid-cols-12 xl:items-start xl:gap-5">
      <div className="contents xl:col-span-5 xl:grid xl:grid-cols-2 xl:content-start xl:gap-5">
        {left.map((group) =>
          renderCard(group, group.category.placement.width === 'full' ? 'xl:col-span-2' : ''),
        )}
      </div>

      <div className="contents xl:col-span-3 xl:grid xl:content-start xl:gap-5">
        {center.map((group) => renderCard(group))}
      </div>

      <div className="contents xl:col-span-4 xl:grid xl:content-start xl:gap-5">
        {right.map((group) => renderCard(group))}
      </div>
    </div>
  );
}
