import { startFragen } from '../data/startFragen';

/**
 * Häufige Fragen zur Übersicht. Dieselben Fragen stehen als FAQPage im Schema
 * (scripts/prerender.mjs) – Google wertet nur Fragen, die sichtbar sind.
 */
export function FaqSection() {
  return (
    <section id="fragen" className="border-t border-brand-100 py-14">
      <h2 className="text-xl font-bold tracking-tight text-ink-900 sm:text-2xl">Häufige Fragen</h2>
      <div className="mt-6 max-w-3xl space-y-6">
        {startFragen().map((f) => (
          <div key={f.frage}>
            <h3 className="text-base font-semibold text-ink-900">{f.frage}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-700">{f.antwort}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
