import { Mail, PencilLine } from 'lucide-react';
import { anchors, mailtoLink } from '../config/site';

const SUGGEST_BODY = [
  'Anbieter:',
  'Website:',
  'Passende Kategorie(n):',
  'Länder (DE/AT/CH):',
  'Kurzbeschreibung:',
  '',
].join('\n');

const CORRECTION_BODY = [
  'Anbieter:',
  'Was stimmt nicht?',
  'Korrekte Angabe:',
  '',
].join('\n');

/** Hinweis-CTA: Der Markt verändert sich schneller als eine statische Grafik. */
export function SubmitProviderSection() {
  return (
    <section id={anchors.submit} className="border-t border-brand-100 py-14">
      <div className="map-card bg-brand-50/50 p-6 sm:p-10">
        <h2 className="text-xl font-bold tracking-tight text-ink-900 sm:text-2xl">
          Fehlt ein Anbieter?
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-700">
          Der Markt entwickelt sich schnell. Wenn eine relevante Lösung fehlt oder eine Zuordnung
          nicht mehr aktuell ist, freuen wir uns über einen Hinweis.
        </p>

        <div className="no-print mt-7 flex flex-wrap gap-3">
          <a href={mailtoLink('Anbieter vorschlagen', SUGGEST_BODY)} className="btn-primary">
            <Mail aria-hidden="true" className="h-4 w-4" />
            Anbieter vorschlagen
          </a>
          <a href={mailtoLink('Korrektur melden', CORRECTION_BODY)} className="btn-secondary">
            <PencilLine aria-hidden="true" className="h-4 w-4" />
            Korrektur melden
          </a>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-ink-500">
          Hinweise werden redaktionell geprüft. Eine Aufnahme in die Übersicht ist kostenfrei und
          kann nicht gekauft werden.{' '}
          <a
            href={`#${anchors.methodology}`}
            className="underline underline-offset-2 hover:text-ink-700"
          >
            Mehr zur Methodik
          </a>
        </p>
      </div>
    </section>
  );
}
