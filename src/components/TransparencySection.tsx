import { ShieldCheck } from 'lucide-react';
import { anchors, siteConfig } from '../config/site';

/**
 * Offenlegung der wirtschaftlichen Verbindungen des Herausgebers.
 *
 * Bewusst als eigener Abschnitt und nicht als Kleingedrucktes: Der Herausgeber
 * ist an einem der gelisteten Anbieter beteiligt. Die Seite behauptet deshalb
 * keine Neutralität, sondern benennt die Einschränkung und erklärt, welche
 * Regeln trotzdem für alle Einträge gelten.
 */
export function TransparencySection() {
  const { transparency, publisher } = siteConfig;

  return (
    <section id={anchors.transparency} className="border-t border-brand-100 py-14">
      <div className="map-card max-w-3xl p-6 sm:p-10">
        <div className="flex items-start gap-3">
          <ShieldCheck
            aria-hidden="true"
            className="mt-0.5 h-6 w-6 shrink-0 text-brand-500"
            strokeWidth={1.75}
          />
          <div>
            <h2 className="text-xl font-bold tracking-tight text-ink-900 sm:text-2xl">
              {transparency.heading}
            </h2>
            <p className="mt-1 text-sm text-ink-500">
              Wer diese Übersicht herausgibt – und welche Interessen dabei im Spiel sind.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-700">
          <p>
            Diese Marktübersicht wird privat von{' '}
            <span className="font-semibold text-ink-900">{publisher.name}</span> herausgegeben,{' '}
            {publisher.role}. Sie ist kein Angebot eines Unternehmens.
          </p>

          <p>{transparency.affiliation}</p>

          <p className="rounded-lg border border-brand-200 bg-brand-50 p-4 font-medium text-ink-900">
            {transparency.limitation}
          </p>

          <p>{transparency.safeguards}</p>

          <p className="text-ink-500">
            Wer eine Zuordnung für falsch hält, meldet sich gerne –{' '}
            <a
              href={`#${anchors.submit}`}
              className="underline underline-offset-2 hover:text-ink-700"
            >
              hier entlang
            </a>
            . Korrekturen sind ausdrücklich erwünscht, gerade an dieser Stelle.
          </p>
        </div>
      </div>
    </section>
  );
}
