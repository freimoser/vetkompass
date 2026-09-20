import { Mail, PencilLine, Trash2 } from 'lucide-react';
import { anchors, mailtoLink, siteConfig } from '../config/site';

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

/*
  Rechteinhabern einen niedrigschwelligen Weg zur Entfernung geben. Das
  entschärft Konflikte um Logo- und Markennutzung, bevor sie entstehen.
*/
const REMOVAL_BODY = [
  'Unternehmen:',
  'Ich bin berechtigt, für dieses Unternehmen zu handeln.',
  'Bitte entfernen: Logo / gesamter Eintrag',
  '',
].join('\n');

/** Hinweis-CTA: Der Markt verändert sich schneller als eine statische Grafik. */
export function SubmitProviderSection() {
  // Ohne Kontaktadresse gibt es keine Schaltflächen – kein toter mailto-Link.
  const suggest = mailtoLink('Anbieter vorschlagen', SUGGEST_BODY);
  const correction = mailtoLink('Korrektur melden', CORRECTION_BODY);
  const removal = mailtoLink('Logo entfernen lassen', REMOVAL_BODY);
  const hasContact = Boolean(suggest && correction && removal);

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

        {hasContact ? (
          <div className="no-print mt-7 flex flex-wrap gap-3">
            <a href={suggest as string} className="btn-primary">
              <Mail aria-hidden="true" className="h-4 w-4" />
              Anbieter vorschlagen
            </a>
            <a href={correction as string} className="btn-secondary">
              <PencilLine aria-hidden="true" className="h-4 w-4" />
              Korrektur melden
            </a>
            <a href={removal as string} className="btn-secondary">
              <Trash2 aria-hidden="true" className="h-4 w-4" />
              Logo entfernen lassen
            </a>
          </div>
        ) : null}

        <div className="mt-6 max-w-2xl space-y-2 text-xs leading-relaxed text-ink-500">
          <p>
            Hinweise werden redaktionell geprüft. Eine Aufnahme in die Übersicht ist kostenfrei und
            kann nicht gekauft werden.{' '}
            <a
              href={`#${anchors.methodology}`}
              className="underline underline-offset-2 hover:text-ink-700"
            >
              Mehr zur Methodik
            </a>
          </p>
          {hasContact ? <p>{siteConfig.removalNotice}</p> : null}
        </div>
      </div>
    </section>
  );
}
