import { ArrowRight } from 'lucide-react';
import { AUFNAHME_STANDARD } from '../data/categories';
import { artikel, artikelPfad, HAUPTARTIKEL, HAUPTARTIKEL_DEFINITION } from '../data/articles';
import { resolveLink } from '../config/site';
import type { Category } from '../types/market';

/**
 * Erklärung über der gefilterten Karte: was das Lösungsfeld umfasst, wer
 * aufgenommen wird, und der Weg zum ausführlichen Artikel (Wunsch 25./26.11.2026).
 * Definition und Aufnahmeregel kommen aus denselben Daten wie der Artikel –
 * Kasten und Artikel können sich deshalb nicht widersprechen.
 */
export function KategorieErklaerung({ kategorie }: { kategorie: Category }) {
  const eintrag = artikel.find((a) => a.kategorie === kategorie.id);
  const slug = kategorie.id === HAUPTARTIKEL.kategorie ? HAUPTARTIKEL.slug : eintrag?.slug;
  const definition = kategorie.id === HAUPTARTIKEL.kategorie ? HAUPTARTIKEL_DEFINITION : eintrag?.definition;
  const titelId = `erklaerung-${kategorie.slug}`;

  return (
    <section
      aria-labelledby={titelId}
      className="mb-4 max-w-3xl rounded-xl border border-brand-100 bg-brand-50/60 px-4 py-4 text-sm leading-relaxed text-ink-700 sm:px-5"
    >
      <h3 id={titelId} className="text-base font-semibold text-ink-900">
        Was wir unter „{kategorie.title}“ verstehen
      </h3>
      {definition ? <p className="mt-2">{definition}</p> : null}
      <p className="mt-2">
        <strong className="font-semibold text-ink-900">Wer aufgenommen wird: </strong>
        {kategorie.aufnahme ?? AUFNAHME_STANDARD}
      </p>
      {slug ? (
        <a
          href={resolveLink(artikelPfad(slug))}
          className="mt-3 inline-flex min-h-6 items-center gap-1.5 font-semibold text-brand-700 underline-offset-4 hover:underline"
        >
          Mehr zu {kategorie.shortTitle}: Abgrenzung, Prüffragen und alle Anbieter
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </a>
      ) : null}
    </section>
  );
}
