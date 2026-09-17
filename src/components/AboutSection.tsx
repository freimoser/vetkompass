import { anchors, siteConfig } from '../config/site';
import { categories } from '../data/categories';
import { providers } from '../data/providers';

/** Methodik-Abschnitt: Was diese Übersicht ist – und was sie nicht ist. */
export function AboutSection() {
  return (
    <section id={anchors.methodology} className="border-t border-brand-100 py-14">
      <h2 className="text-xl font-bold tracking-tight text-ink-900 sm:text-2xl">
        Über diese Marktübersicht
      </h2>

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
        <div className="max-w-2xl space-y-4 text-sm leading-relaxed text-ink-700">
          <p>
            Die <strong className="font-semibold">{siteConfig.title}</strong> soll Orientierung in
            einem zunehmend vielfältigen Markt für digitale Lösungen in der Veterinärmedizin
            schaffen.
          </p>
          <p>
            Die Übersicht konzentriert sich auf Lösungen, die für Tierarztpraxen und Tierhalter im
            DACH-Markt relevant sind. Einige Anbieter decken mehrere Bereiche ab und können daher
            mehreren Kategorien zugeordnet sein.
          </p>
          <p className="font-semibold text-ink-900">
            Die Übersicht erhebt keinen Anspruch auf Vollständigkeit.
          </p>
          <p className="text-ink-500">
            Die Darstellung innerhalb einer Kategorie erfolgt alphabetisch. Es gibt keine
            Rangfolge, keine Bewertung und keine bezahlten Platzierungen.
          </p>

          {/* Offenlegung: Der Initiator ist selbst Marktteilnehmer. */}
          <div className="rounded-xl border border-brand-200 bg-brand-50/50 p-5">
            <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-ink-700">
              Wer diese Übersicht erstellt
            </h3>
            <p className="mt-2 text-ink-700">
              Die Übersicht wird von{' '}
              <a
                href={siteConfig.initiator.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-brand-700"
              >
                {siteConfig.initiator.name}
              </a>{' '}
              initiiert und gepflegt. {siteConfig.initiator.name} ist selbst Anbieter und in
              mehreren Kategorien vertreten. Daraus entsteht keine Sonderplatzierung: Die
              Sortierung ist in allen Kategorien rein alphabetisch, und die Aufnahme folgt für
              alle Anbieter denselben Kriterien.
            </p>
          </div>

          <p className="text-ink-500">{siteConfig.noAffiliationNotice}</p>
        </div>

        <dl className="grid grid-cols-2 gap-x-10 gap-y-6 self-start text-sm lg:grid-cols-1">
          <div>
            <dt className="text-xs font-bold uppercase tracking-[0.08em] text-ink-500">
              Kategorien
            </dt>
            <dd className="mt-1 text-2xl font-bold tabular-nums text-brand-600">
              {categories.length}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-[0.08em] text-ink-500">Anbieter</dt>
            <dd className="mt-1 text-2xl font-bold tabular-nums text-brand-600">
              {providers.length}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-[0.08em] text-ink-500">Markt</dt>
            <dd className="mt-1 text-2xl font-bold text-brand-600">DACH</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-[0.08em] text-ink-500">Stand</dt>
            <dd className="mt-1 text-2xl font-bold text-brand-600">{siteConfig.edition}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
