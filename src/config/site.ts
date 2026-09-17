import type { Country } from '../types/market';

/**
 * Zentrale Seitenkonfiguration. Alles, was sich ohne Code-Änderung anpassen
 * lassen soll, steht hier.
 */

export const siteConfig = {
  title: 'Die digitale Tierarztpraxis – Marktübersicht 2026',
  subtitle: 'Digitale Lösungen für Tierarztpraxen im DACH-Markt',
  /*
    Bewusst "anbieterübergreifend" statt "unabhängig": Der Initiator ist selbst
    Marktteilnehmer und in mehreren Kategorien vertreten. Eine
    Unabhängigkeitsbehauptung wäre in dieser Konstellation angreifbar.
  */
  intro:
    'Eine anbieterübergreifende Übersicht digitaler Lösungen entlang der modernen Tierarztpraxis.',
  metaDescription:
    'Marktübersicht digitaler Lösungen für Tierarztpraxen in Deutschland, Österreich und der Schweiz – von Praxissoftware und Online-Terminbuchung bis KI und Telemedizin.',

  /** Sichtbarer Redaktionsstand der Übersicht. */
  edition: 'September 2026',

  /**
   * Kontaktadresse für Anbieter-Hinweise und Korrekturen.
   *
   * TODO: Vor dem Livegang durch ein real existierendes Postfach ersetzen.
   */
  contactEmail: 'marktuebersicht@petleo.net',

  /** Initiator der Übersicht – dezent dargestellt, aber offen benannt. */
  initiator: {
    name: 'Petleo',
    url: 'https://www.petleo.net',
    /** Transparenzhinweis, direkt im Kopfbereich sichtbar. */
    disclosure:
      'Initiiert von Petleo. Petleo ist selbst Anbieter und in mehreren Kategorien vertreten – ohne Sonderplatzierung.',
  },

  /*
    Rechtliche Hinweise zur Nennung fremder Marken und Logos.
    Die Nutzung erfolgt als referierende Markennutzung im Rahmen einer
    Marktübersicht. Wichtig ist, dass daraus kein Eindruck einer
    Geschäftsbeziehung entsteht und Rechteinhaber einen einfachen Weg zur
    Entfernung haben.
  */
  trademarkNotice:
    'Alle genannten Marken-, Produkt- und Unternehmensnamen sowie die abgebildeten Logos sind Eigentum der jeweiligen Rechteinhaber. Ihre Verwendung erfolgt ausschließlich zu Informationszwecken im Rahmen dieser Marktübersicht.',
  noAffiliationNotice:
    'Aus der Aufnahme in diese Übersicht folgt keine geschäftliche Verbindung, Partnerschaft, Zusammenarbeit oder Empfehlung.',
  removalNotice:
    'Rechteinhaber, die eine Darstellung ihres Logos oder ihres Unternehmens hier nicht wünschen, melden sich bitte – wir entfernen den Eintrag kurzfristig.',

  /** Download der Original-Grafik. Pfade relativ zu /public. */
  downloadImage: 'downloads/digitale-tierarztpraxis-marktuebersicht-2026.png',
  downloadFileName: 'digitale-tierarztpraxis-marktuebersicht-2026.png',
  ogImage: 'og/marktuebersicht-2026.png',

  /** Rechtliche Seiten. TODO: durch echte URLs ersetzen. */
  legal: {
    imprintUrl: 'https://www.petleo.net/impressum',
    privacyUrl: 'https://www.petleo.net/datenschutz',
  },
} as const;

/** Anzeigenamen der DACH-Länder. */
export const countryLabels: Record<Country, string> = {
  DE: 'Deutschland',
  AT: 'Österreich',
  CH: 'Schweiz',
};

export const countryOrder: Country[] = ['DE', 'AT', 'CH'];

/** Anker-IDs für die Sprungmarken der Seite. */
export const anchors = {
  marketMap: 'marktuebersicht',
  methodology: 'methodik',
  submit: 'anbieter-vorschlagen',
} as const;

/**
 * Baut einen Pfad relativ zum Deployment-Basispfad.
 * Nötig, weil GitHub Pages die Seite unter /<repo>/ ausliefert.
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

/** Erzeugt einen vorausgefüllten mailto-Link. */
export function mailtoLink(subject: string, body: string): string {
  const params = new URLSearchParams({ subject, body });
  // URLSearchParams kodiert Leerzeichen als "+", mailto erwartet %20.
  return `mailto:${siteConfig.contactEmail}?${params.toString().replace(/\+/g, '%20')}`;
}
