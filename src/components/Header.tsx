import { useState, type MouseEvent } from 'react';
import { Download, Stethoscope } from 'lucide-react';
import { anchors, asset, resolveLink, siteConfig } from '../config/site';
import { providers } from '../data/providers';
import { categories } from '../data/categories';
import { zahlwort } from '../lib/zahlwort';
import { bildMitStempel, dateinameMitDatum } from '../lib/bildstempel';

/**
 * Kopfbereich der Seite. Bewusst kein Marketing-Hero – die Marktübersicht
 * selbst soll im Mittelpunkt stehen.
 */
/** Löst einen Download aus, ohne die Seite zu verlassen. */
function speichere(href: string, dateiname: string) {
  const link = document.createElement('a');
  link.href = href;
  link.download = dateiname;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function Header() {
  const [erstelltGerade, setErstelltGerade] = useState(false);
  const bildUrl = asset(siteConfig.downloadImage);

  /*
    Beim Herunterladen kommt ein Zeitstempel ins Bild. Ohne Canvas-Unterstützung
    oder bei einem Fehler gibt es das Bild ohne Stempel – der Download klappt
    in jedem Fall.
  */
  const herunterladen = async (event: MouseEvent<HTMLAnchorElement>) => {
    if (typeof createImageBitmap !== 'function' || erstelltGerade) return;
    event.preventDefault();
    setErstelltGerade(true);
    const jetzt = new Date();
    try {
      const blob = await bildMitStempel(bildUrl, jetzt);
      const objekt = URL.createObjectURL(blob);
      speichere(objekt, dateinameMitDatum(siteConfig.downloadFileName, jetzt));
      setTimeout(() => URL.revokeObjectURL(objekt), 10_000);
    } catch {
      speichere(bildUrl, siteConfig.downloadFileName);
    } finally {
      setErstelltGerade(false);
    }
  };

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

      {/* Byline: Die Übersicht wird von einer Person herausgegeben, nicht von einem Anbieter. */}
      <p className="mt-5 text-sm text-ink-700">
        Herausgegeben von{' '}
        <span className="font-semibold text-ink-900">{siteConfig.publisher.name}</span>
        <span className="text-ink-500"> · {siteConfig.publisher.role}</span>
      </p>

      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-500">{siteConfig.intro(providers.length, zahlwort(categories.length))}</p>

      <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800">
        Stand: {siteConfig.edition}
        <span aria-hidden="true">·</span>
        <a href={resolveLink('entwicklung.html')} className="underline underline-offset-2 hover:text-brand-900">
          Entwicklung & alle Fassungen
        </a>
      </p>

      <div className="no-print mt-7 flex flex-wrap items-center gap-3">
        <a href={`#${anchors.marketMap}`} className="btn-primary">
          Marktübersicht entdecken
        </a>
        <a href={`#${anchors.submit}`} className="btn-secondary">
          Anbieter ergänzen
        </a>
        <a
          href={bildUrl}
          download={siteConfig.downloadFileName}
          onClick={herunterladen}
          aria-busy={erstelltGerade}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium
                     text-ink-700 underline-offset-4 hover:text-brand-700 hover:underline"
        >
          <Download aria-hidden="true" className="h-4 w-4" />
          {erstelltGerade ? 'Bild wird erstellt …' : 'Marktübersicht als Bild herunterladen'}
        </a>
      </div>
    </header>
  );
}
