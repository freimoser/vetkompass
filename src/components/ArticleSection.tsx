import { ArrowUpRight } from 'lucide-react';
import { anchors, resolveLink } from '../config/site';
import { artikel, artikelPfad, HAUPTARTIKEL } from '../data/articles';
import { categories } from '../data/categories';

/**
 * Verweise auf die Artikelseiten.
 *
 * Die Karte bleibt das Hauptthema der Seite – dieser Abschnitt steht deshalb
 * unter ihr, nicht darüber. Er erfüllt aber zwei Aufgaben, die die Karte allein
 * nicht kann: Er erklärt die Lösungsfelder in Fließtext, und er verlinkt die
 * Artikel von der Startseite aus. Eine Seite, auf die niemand verlinkt, wird
 * selten gecrawlt – gleich wie gut sie ist.
 */

/* Der Hauptartikel hat keinen Eintrag in `artikel` (Kategorie 6 deckt er ab). */
const seiten = [
  ...artikel.map((a) => ({ kategorie: a.kategorie, slug: a.slug, titel: a.h1 })),
  {
    kategorie: HAUPTARTIKEL.kategorie,
    slug: HAUPTARTIKEL.slug,
    titel: 'Welche Tierarzt-Software gibt es? Anbieter und Begriffe',
  },
].sort((a, b) => a.kategorie - b.kategorie);

export function ArticleSection() {
  return (
    <section id={anchors.articles} className="border-t border-brand-100 py-14">
      <h2 className="text-xl font-bold tracking-tight text-ink-900 sm:text-2xl">
        Die neun Lösungsfelder im Detail
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-700">
        Zu jeder Kategorie der Übersicht gibt es einen Artikel: was das Lösungsfeld umfasst,
        woran die Einführung in der Praxis üblicherweise scheitert, welche Fragen vor einer
        Entscheidung zu klären sind – und alle Anbieter als Liste mit Kurzbeschreibung.
      </p>

      <ul className="mt-8 grid list-none gap-x-6 gap-y-px p-0 sm:grid-cols-2 lg:grid-cols-3">
        {seiten.map((seite) => {
          const kategorie = categories.find((c) => c.id === seite.kategorie);
          return (
            <li key={seite.slug}>
              <a
                href={resolveLink(artikelPfad(seite.slug))}
                className="group flex h-full items-start gap-3 rounded-lg border border-transparent
                           px-3 py-3.5 transition-colors hover:border-brand-100 hover:bg-brand-50/60"
              >
                <span
                  aria-hidden="true"
                  className="mt-px shrink-0 text-base font-bold tabular-nums text-brand-400"
                >
                  {seite.kategorie}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-bold uppercase tracking-[0.08em] text-ink-500">
                    {kategorie?.title}
                  </span>
                  <span className="mt-1 block text-sm font-medium leading-snug text-ink-900">
                    {seite.titel}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-300 transition-colors group-hover:text-brand-600"
                />
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
