import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink, Info, X } from 'lucide-react';
import { asset, countryLabels, countryOrder, mailtoLink, siteConfig } from '../config/site';
import { categoriesById } from '../data/categories';
import { labelFor } from '../lib/market';
import { useBodyScrollLock } from '../lib/hooks';
import type { ProviderEntry } from '../types/market';

interface ProviderModalProps {
  entry: ProviderEntry | null;
  onClose: () => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Detailansicht eines Anbieters.
 * Bewusst rein informativ: keine Bewertung, kein Ranking, keine Empfehlung.
 */
export function ProviderModal({ entry, onClose }: ProviderModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  /*
    Merkt sich, für welchen Eintrag das Logo nicht geladen werden konnte.
    Als abgeleiteter Wert statt als Effekt – so setzt der Wechsel auf einen
    anderen Anbieter den Zustand ohne zusätzlichen Renderdurchlauf zurück.
  */
  const [failedFor, setFailedFor] = useState<string | null>(null);

  useBodyScrollLock(Boolean(entry));

  useEffect(() => {
    if (!entry) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      // Fokus im Dialog halten.
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((element) => element.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus();
    };
  }, [entry, onClose]);

  if (!entry) return null;

  const { provider } = entry;
  const entryKey = `${provider.id}:${entry.categoryId}`;
  const showImage = Boolean(entry.logo) && failedFor !== entryKey;
  const titleId = `anbieter-${provider.id}-titel`;

  const countries = countryOrder.filter((country) => provider.countries.includes(country));
  const isFullDach = countries.length === countryOrder.length;

  // Ohne konfigurierte Kontaktadresse entfallen beide Links, statt tot zu sein.
  const correctionLink = mailtoLink(
    `Korrektur: ${provider.name}`,
    `Anbieter: ${provider.name}\nWas sollte korrigiert werden?\n\n`,
  );
  const removalLink = mailtoLink(
    `Logo entfernen lassen: ${provider.name}`,
    [
      `Unternehmen: ${provider.name}`,
      'Ich bin berechtigt, für dieses Unternehmen zu handeln.',
      'Bitte entfernen: Logo / gesamter Eintrag',
      '',
    ].join('\n'),
  );

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        tabIndex={-1}
        aria-label="Dialog schließen"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink-900/40 backdrop-blur-[2px]"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 max-h-[90vh] w-full overflow-y-auto rounded-t-2xl bg-white
                   p-6 shadow-2xl sm:max-w-lg sm:rounded-2xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Schließen"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full
                     text-ink-500 hover:bg-brand-50 hover:text-ink-900"
        >
          <X aria-hidden="true" className="h-5 w-5" />
        </button>

        {/*
          Logo nur, wenn es eines gibt – sonst trägt die Überschrift den Namen
          allein und es entsteht keine doppelte Wortmarke.
        */}
        {showImage ? (
          <div className="flex h-20 items-center justify-start pr-10">
            <img
              src={asset(entry.logo as string)}
              alt={`Logo von ${entry.label}`}
              onError={() => setFailedFor(entryKey)}
              className="max-h-16 max-w-[70%] object-contain object-left"
            />
          </div>
        ) : null}

        <h2
          id={titleId}
          className={`pr-10 text-2xl font-bold tracking-tight text-ink-900 ${
            showImage ? 'mt-2 text-xl' : ''
          }`}
        >
          {provider.name}
        </h2>

        {entry.label !== provider.name ? (
          <p className="mt-1 text-sm text-ink-500">In dieser Kategorie als „{entry.label}“</p>
        ) : null}

        <p className="mt-3 text-sm leading-relaxed text-ink-700">{provider.description}</p>

        {/* Wirtschaftliche Verbindung offenlegen – Text kommt aus den Daten. */}
        {provider.disclosureNote ? (
          <p className="mt-4 flex gap-2 rounded-lg border border-brand-200 bg-brand-50 p-3 text-xs leading-relaxed text-ink-700">
            <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
            <span>{provider.disclosureNote}</span>
          </p>
        ) : null}

        <dl className="mt-6 space-y-5 text-sm">
          <div>
            <dt className="text-xs font-bold uppercase tracking-[0.08em] text-ink-500">
              Kategorien
            </dt>
            <dd className="mt-2">
              <ul className="flex list-none flex-wrap gap-2 p-0">
                {provider.categories.map((categoryId) => {
                  const category = categoriesById.get(categoryId);
                  if (!category) return null;
                  const variantLabel = labelFor(provider, categoryId);
                  return (
                    <li
                      key={categoryId}
                      className="inline-flex max-w-full items-start gap-1.5 rounded-full
                                 border border-brand-200 bg-brand-50 px-3 py-1 text-xs
                                 leading-relaxed text-ink-700"
                    >
                      <span aria-hidden="true" className="font-bold text-brand-600">
                        {category.id}
                      </span>
                      <span>
                        {category.title}
                        {variantLabel !== provider.name ? (
                          <span className="text-ink-500"> · {variantLabel}</span>
                        ) : null}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </dd>
          </div>

          <div>
            <dt className="text-xs font-bold uppercase tracking-[0.08em] text-ink-500">
              Verfügbarkeit im DACH-Raum
            </dt>
            <dd className="mt-2 text-ink-700">
              {countries.length === 0
                ? 'Keine Angabe'
                : `${countries.map((country) => countryLabels[country]).join(', ')}${
                    isFullDach ? ' (DACH)' : ''
                  }`}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-bold uppercase tracking-[0.08em] text-ink-500">Website</dt>
            <dd className="mt-2">
              {provider.website ? (
                <a
                  href={provider.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-brand-700 underline underline-offset-2 hover:text-brand-800"
                >
                  {provider.website.replace(/^https?:\/\//, '')}
                </a>
              ) : (
                <span className="text-ink-500">Noch nicht hinterlegt</span>
              )}
            </dd>
          </div>
        </dl>

        <div className="mt-7 flex flex-wrap gap-3">
          {provider.website ? (
            <a
              href={provider.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Website besuchen
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
            </a>
          ) : null}
          {correctionLink ? (
            <a href={correctionLink} className="btn-secondary">
              Angaben korrigieren
            </a>
          ) : null}
        </div>

        <div className="mt-5 space-y-2 text-xs leading-relaxed text-ink-500">
          <p>
            Die Angaben stammen aus der Marktübersicht (Stand: {siteConfig.edition}) und stellen
            keine Bewertung oder Empfehlung dar.
            {provider.disclosureNote ? '' : ` ${siteConfig.noAffiliationNotice}`}
          </p>
          {/*
            Bei einem verbundenen Anbieter ergäbe der Entfernungs-Hinweis keinen
            Sinn – dort läuft die Abstimmung ohnehin direkt.
          */}
          {provider.disclosureNote || !removalLink ? null : (
          <p>
            Sie vertreten {provider.name}?{' '}
            <a
              href={removalLink}
              className="underline underline-offset-2 hover:text-ink-700"
            >
              Eintrag entfernen lassen
            </a>
          </p>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
