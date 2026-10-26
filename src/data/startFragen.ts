import { siteConfig } from '../config/site';
import { categories } from './categories';
import { providers } from './providers';
import { zahlwort } from '../lib/zahlwort';

/**
 * Häufige Fragen der Startseite – sichtbar (FaqSection) und als FAQPage im
 * Schema (scripts/prerender.mjs). Eine Quelle für beides, weil Google nur
 * Fragen gelten lässt, die auch auf der Seite stehen.
 *
 * Die Antworten sagen nichts Neues: Zahlen kommen aus den Daten, die
 * Offenlegung wörtlich aus siteConfig.transparency. Antwortmaschinen zitieren
 * abgeschlossene Absätze; hier stehen die Aussagen der Seite in dieser Form.
 */
export interface Frage {
  frage: string;
  antwort: string;
}

export function startFragen(): Frage[] {
  const { transparency, edition, title } = siteConfig;
  const felder = categories.map((c) => c.title);
  return [
    {
      frage: `Was ist „${title}“?`,
      antwort:
        `Eine anbieterübergreifende Übersicht digitaler Lösungen für Tierarztpraxen in ` +
        `Deutschland, Österreich und der Schweiz. Sie ordnet ${providers.length} Anbieter in ` +
        `${zahlwort(categories.length)} Lösungsfelder ein – alphabetisch, ohne Rangfolge und ohne ` +
        `Anspruch auf Vollständigkeit. Stand: ${edition}.`,
    },
    {
      frage: 'Welche Lösungsfelder umfasst die Übersicht?',
      antwort: `${felder.slice(0, -1).join(', ')} sowie ${felder.at(-1)}. Zu jedem Feld gibt es einen eigenen Artikel mit Anbieterliste und Prüffragen.`,
    },
    {
      frage: 'Ist die Marktübersicht unabhängig?',
      antwort: `Nein, und das steht ausdrücklich so da. ${transparency.affiliation} ${transparency.limitation} ${transparency.safeguards}`,
    },
    {
      frage: 'Wie kommt ein Anbieter in die Übersicht?',
      antwort:
        'Über einen Hinweis per E-Mail oder in den Kommentaren zu den LinkedIn-Beiträgen. Jeder ' +
        'Hinweis wird auf der Website des Anbieters geprüft und dort eingeordnet, wo die Funktion ' +
        'beschrieben ist. Die Aufnahme ist kostenfrei; bezahlte Platzierungen gibt es nicht.',
    },
  ];
}
