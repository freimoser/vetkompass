import type { Country } from '../types/market';
import { LEGAL } from './legal';

export { LEGAL } from './legal';
export type { LegalConfig } from './legal';

/**
 * Optionale Bausteine. Alles, was hier leer bleibt, erscheint nicht auf der
 * Seite – es gibt keinen Zustand "wird gerade eingerichtet".
 */
export const FEATURES = {
  /** Absolute Seiten-URL inkl. "/" am Ende. Leer = noch keine Domain. */
  siteUrl: import.meta.env.VITE_SITE_URL || '',
  /** Token für Cloudflare Web Analytics. Leer = keine Messung. */
  cloudflareAnalyticsToken: import.meta.env.VITE_CF_ANALYTICS_TOKEN || '',
} as const;

/**
 * Zentrale Seitenkonfiguration. Alles, was sich ohne Code-Änderung anpassen
 * lassen soll, steht hier.
 */

export const siteConfig = {
  title: 'Die digitale Tierarztpraxis – Marktübersicht 2026',
  subtitle: 'Digitale Lösungen für Tierarztpraxen im DACH-Markt',
  /*
    Bewusst "anbieterübergreifend" statt "unabhängig": Der Herausgeber ist an
    einem der gelisteten Anbieter beteiligt. Eine Unabhängigkeitsbehauptung
    wäre in dieser Konstellation angreifbar – siehe `transparency`.
  */
  intro:
    'Eine anbieterübergreifende Übersicht digitaler Lösungen entlang der modernen Tierarztpraxis.',
  metaDescription:
    'Marktübersicht digitaler Lösungen für Tierarztpraxen in Deutschland, Österreich und der Schweiz – von Praxissoftware und Online-Terminbuchung bis KI und Telemedizin.',

  /** Sichtbarer Redaktionsstand der Übersicht. */
  edition: 'September 2026',

  /**
   * Kontaktadresse für Anbieter-Hinweise, Korrekturen und Entfernungswünsche.
   * Kommt aus `LEGAL` – die Adresse steht nur an einer Stelle im Projekt.
   * Ist sie leer, erscheinen die Kontakt-Schaltflächen gar nicht erst.
   */
  contactEmail: LEGAL.email,

  /** Herausgeber der Übersicht. Privat betrieben, nicht von einem Anbieter. */
  publisher: {
    name: 'Thomas Freimoser',
    role: 'Experte für digitale Tiermedizin',
  },

  /*
    Offenlegung wirtschaftlicher Verbindungen.

    Bewusst ehrlich formuliert: Der Herausgeber ist an einem der gelisteten
    Anbieter beteiligt. Statt Neutralität zu behaupten, benennt die Seite die
    Einschränkung – das ist belastbarer und für Leserinnen und Leser fairer.
  */
  transparency: {
    heading: 'Zur Transparenz',
    affiliation:
      'Thomas Freimoser arbeitet für die Petleo GmbH und ist als Late Co-Founder an ihr beteiligt. Darüber hinaus ist er in der FleXchange-Medical GmbH aktiv.',
    limitation:
      'Petleo ist in mehreren Kategorien dieser Übersicht vertreten. Eine im strengen Sinne neutrale Marktübersicht kann sie deshalb nicht sein – das sollte man beim Lesen wissen.',
    safeguards:
      'Was dennoch gilt: Die Sortierung ist in allen Kategorien rein alphabetisch. Es gibt keine Rangfolge, keine Bewertung und keine bezahlten Platzierungen. Die Aufnahme folgt für alle Anbieter denselben Kriterien und ist kostenfrei.',
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

  /*
    Rechtliche Seiten. Werden von `scripts/gen-legal.mjs` aus `LEGAL` erzeugt
    und als statische Dateien ausgeliefert – so funktionieren sie auf
    GitHub Pages ohne Routing. Alle drei tragen `noindex, follow`.
  */
  legal: {
    imprintUrl: 'impressum.html',
    privacyUrl: 'datenschutz.html',
    disclaimerUrl: 'haftungsausschluss.html',
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
  transparency: 'transparenz',
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

/**
 * Löst einen konfigurierten Link auf: absolute URLs bleiben unverändert,
 * relative Pfade werden am Basispfad des Deployments ausgerichtet.
 */
export function resolveLink(url: string): string {
  return /^https?:\/\//.test(url) ? url : asset(url);
}

/** Gibt an, ob ein Link auf eine fremde Seite zeigt. */
export function isExternalLink(url: string): boolean {
  return /^https?:\/\//.test(url);
}

/**
 * Erzeugt einen vorausgefüllten mailto-Link – oder `null`, wenn keine
 * Kontaktadresse konfiguriert ist. Ein toter Link wäre schlechter als keiner:
 * Die Entfernungs-Schaltflächen sind eine Zusage an Rechteinhaber und nur so
 * viel wert wie das Postfach dahinter.
 */
export function mailtoLink(subject: string, body: string): string | null {
  if (!siteConfig.contactEmail) return null;
  const params = new URLSearchParams({ subject, body });
  // URLSearchParams kodiert Leerzeichen als "+", mailto erwartet %20.
  return `mailto:${siteConfig.contactEmail}?${params.toString().replace(/\+/g, '%20')}`;
}
