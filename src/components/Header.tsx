import { Download, Stethoscope } from 'lucide-react';
import { anchors, asset, siteConfig } from '../config/site';

/**
 * Kopfbereich der Seite. Bewusst kein Marketing-Hero – die Marktübersicht
 * selbst soll im Mittelpunkt stehen.
 */
export function Header() {
  return (
    <header className="pb-8 pt-10 sm:pt-14">
      <div className="flex items-start gap-3 sm:gap-4">
        <Stethoscope
          aria-hidden="true"
          className="mt-1 h-8 w-8 shrink-0 text-brand-500 sm:h-10 sm:w-10"
          strokeWidth={1.75}
        />
        <div className="min-w-0">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-[2.75rem]">
            {siteConfig.title}
          </h1>
          <p className="mt-3 text-base text-ink-700 sm:text-lg">{siteConfig.subtitle}</p>
        </div>
      </div>

      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-500">{siteConfig.intro}</p>

      <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800">
        Stand: {siteConfig.edition}
      </p>

      {/*
        Offenlegung direkt im Kopfbereich statt nur im Footer: Der Initiator
        ist selbst Marktteilnehmer, das gehört sichtbar an den Anfang.
      */}
      <p className="mt-4 max-w-2xl text-xs leading-relaxed text-ink-500">
        {siteConfig.initiator.disclosure}
      </p>

      <div className="no-print mt-7 flex flex-wrap items-center gap-3">
        <a href={`#${anchors.marketMap}`} className="btn-primary">
          Marktübersicht entdecken
        </a>
        <a href={`#${anchors.submit}`} className="btn-secondary">
          Anbieter ergänzen
        </a>
        <a
          href={asset(siteConfig.downloadImage)}
          download={siteConfig.downloadFileName}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium
                     text-ink-700 underline-offset-4 hover:text-brand-700 hover:underline"
        >
          <Download aria-hidden="true" className="h-4 w-4" />
          Marktübersicht als Bild herunterladen
        </a>
      </div>
    </header>
  );
}
