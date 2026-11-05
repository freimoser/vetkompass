import { Sparkles } from 'lucide-react';
import { resolveLink } from '../config/site';
import { artikel, artikelPfad, HAUPTARTIKEL } from '../data/articles';
import { categories } from '../data/categories';
import { providers } from '../data/providers';

const datumDe = (iso: string) => iso.split('-').reverse().join('.');

/** Artikelseite eines Lösungsfelds – der Hauptartikel deckt Kategorie 6 ab. */
function artikelVon(kategorie: number): string {
  if (kategorie === HAUPTARTIKEL.kategorie) return artikelPfad(HAUPTARTIKEL.slug);
  const a = artikel.find((x) => x.kategorie === kategorie);
  return a ? artikelPfad(a.slug) : './';
}

/**
 * Die zuletzt aufgenommenen Anbieter, mit Datum. Wer die Übersicht schon
 * kennt, sieht so ohne Suchen, was neu ist – und das Datum zeigt, dass sie
 * gepflegt wird. Nur Einträge mit belegtem Aufnahmedatum.
 */
export function NewProviders() {
  const neu = providers
    .filter((p) => p.aufgenommen)
    .sort((a, b) => (b.aufgenommen as string).localeCompare(a.aufgenommen as string) || a.name.localeCompare(b.name, 'de'))
    .slice(0, 10);
  if (neu.length === 0) return null;

  return (
    <section aria-labelledby="neu-titel" className="border-t border-brand-100 py-14">
      <h2 id="neu-titel" className="flex items-center gap-2 text-xl font-bold tracking-tight text-ink-900 sm:text-2xl">
        <Sparkles aria-hidden="true" className="h-5 w-5 text-brand-500" strokeWidth={1.75} />
        Neu in der Übersicht
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-700">
        Zuletzt aufgenommen, jeweils auf der Website des Anbieters geprüft. Alle Änderungen stehen auf der{' '}
        <a href={resolveLink('entwicklung.html')} className="underline underline-offset-2 hover:text-brand-700">
          Seite zur Entwicklung
        </a>{' '}
        und im{' '}
        <a href={resolveLink('feed.xml')} className="underline underline-offset-2 hover:text-brand-700">
          Feed
        </a>
        .
      </p>
      <ul className="mt-6 grid list-none gap-x-6 gap-y-2 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {neu.map((p) => {
          const kat = categories.find((c) => c.id === p.categories[0]);
          return (
            <li key={p.id} className="flex items-baseline justify-between gap-3 border-b border-brand-50 py-2 text-sm">
              <span className="min-w-0">
                <span className="font-semibold text-ink-900">{p.name}</span>{' '}
                <a
                  href={resolveLink(artikelVon(p.categories[0]))}
                  className="inline-flex min-h-6 items-center text-ink-500 underline-offset-2 hover:text-brand-700 hover:underline"
                >
                  {kat?.shortTitle}
                </a>
              </span>
              <time dateTime={p.aufgenommen} className="shrink-0 tabular-nums text-xs text-ink-500">
                {datumDe(p.aufgenommen as string)}
              </time>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
