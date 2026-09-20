import { anchors, isExternalLink, mailtoLink, resolveLink, siteConfig } from '../config/site';

/** Minimalistischer Footer mit Herausgeber-, Marken- und Rechtshinweisen. */
export function Footer() {
  const removal = mailtoLink(
    'Logo entfernen lassen',
    [
      'Unternehmen:',
      'Ich bin berechtigt, für dieses Unternehmen zu handeln.',
      'Bitte entfernen: Logo / gesamter Eintrag',
      '',
    ].join('\n'),
  );

  const links = [
    { label: 'Über die Marktübersicht', href: `#${anchors.methodology}` },
    { label: 'Transparenz', href: `#${anchors.transparency}` },
    { label: 'Anbieter ergänzen', href: `#${anchors.submit}` },
    { label: 'Impressum', href: resolveLink(siteConfig.legal.imprintUrl) },
    { label: 'Datenschutz', href: resolveLink(siteConfig.legal.privacyUrl) },
    { label: 'Haftungsausschluss', href: resolveLink(siteConfig.legal.disclaimerUrl) },
  ];

  return (
    <footer className="border-t border-brand-100 py-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-ink-900">{siteConfig.title}</p>
          <p className="mt-1 text-xs text-ink-500">
            Stand: {siteConfig.edition} · Kein Anspruch auf Vollständigkeit
          </p>
          <p className="mt-3 text-xs text-ink-500">
            Herausgegeben von {siteConfig.publisher.name} · {siteConfig.publisher.role}.{' '}
            <a
              href={`#${anchors.transparency}`}
              className="underline underline-offset-2 hover:text-ink-700"
            >
              Zur Transparenz
            </a>
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex list-none flex-wrap gap-x-6 gap-y-2 p-0 text-sm text-ink-700">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(isExternalLink(link.href)
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="underline-offset-4 hover:text-brand-700 hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-8 max-w-4xl space-y-2 text-xs leading-relaxed text-ink-500">
        <p>{siteConfig.trademarkNotice}</p>
        <p>{siteConfig.noAffiliationNotice}</p>
        {removal ? (
          <p>
            {siteConfig.removalNotice}{' '}
            <a href={removal} className="underline underline-offset-2 hover:text-ink-700">
              Eintrag entfernen lassen
            </a>
          </p>
        ) : null}
      </div>
    </footer>
  );
}
