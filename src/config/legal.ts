/**
 * Einzige Quelle für alle Rechtsangaben.
 *
 * Impressum, Datenschutzerklärung, Haftungsausschluss und der Footer lesen
 * ausschließlich von hier. Keine Adresse, keine Kontaktangabe steht ein zweites
 * Mal irgendwo im Projekt.
 *
 * Diese Datei ist bewusst reine Daten: keine Importe, kein `import.meta.env`.
 * Dadurch kann sie sowohl die App als auch ein Node-Buildskript lesen
 * (Node 24 versteht TypeScript direkt).
 */

export interface LegalConfig {
  /** Natürliche Person, die das Angebot betreibt. */
  operator: string;
  /**
   * Firmierung inklusive Rechtsform, z. B. "Muster GmbH".
   *
   * Leer lassen, solange keine Rechtsform existiert. Ein Geschäftsname ohne
   * Rechtsform ist nach § 5 DDG unvollständig; die natürliche Person allein
   * zu nennen ist dagegen immer korrekt.
   */
  companyName: string;
  /** Ladungsfähige Anschrift – ein Postfach genügt nicht. */
  street: string;
  zip: string;
  city: string;
  country: string;
  /** Pflichtkontakt. E-Mail allein genügt (EuGH C-298/07). */
  email: string;
  /** Optional. Keine Nummer erfinden – leer lassen ist zulässig. */
  phone: string;
  /** USt-IdNr. nach § 27a UStG, falls vorhanden. */
  vatId: string;
  /** Kleinunternehmerregelung nach § 19 UStG statt USt-IdNr. */
  smallBusiness: boolean;
  /** Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV. */
  responsible: string;
  /** Teilnahme an der Verbraucherstreitbeilegung nach § 36 VSBG. */
  disputeResolution: boolean;
}

/*
  Ausgefüllt am 24.09.2026, nach ausdrücklicher Freigabe.

  Es ist die Privatanschrift, denn das Angebot wird privat betrieben. Genau
  deshalb tragen Impressum, Datenschutz und Haftungsausschluss `noindex,
  follow`: § 5 DDG verlangt Erreichbarkeit, nicht Auffindbarkeit über Google.
  Erreichbar ja, eigenes Suchergebnis nein.

  Drei Felder bleiben bewusst leer:

  - `companyName`: Das Angebot wird als Privatperson betrieben, nicht über eine
    Firma. Ein Firmenname im Impressum nennt einen Betreiber, der nicht der
    Betreiber ist, und nähme die Firma für etwas in Haftung, das ihr nicht
    gehört. Aus demselben Grund steht hier eine private E-Mail-Adresse und
    keine auf einer Firmendomain – die würde genau den Firmenbezug herstellen,
    den es nicht gibt. Bei dieser Übersicht wiegt das besonders schwer, weil
    der Herausgeber an einem der gelisteten Anbieter beteiligt ist.
  - `phone`: Seit EuGH C-298/07 genügt ein zweiter schneller Kontaktweg; die
    E-Mail-Adresse erfüllt das. Keine Nummer erfinden.
  - `vatId`: Nur eintragen, wenn tatsächlich eine USt-IdNr. erteilt wurde. Eine
    Steuernummer ist nicht dasselbe und gehört nicht ins Impressum.
*/
export const LEGAL: LegalConfig = {
  operator: 'Thomas Freimoser',
  // Rein privates Angebot, kein Gewerbe – daher keine Firmierung.
  companyName: '',
  street: 'Schinkelstraße 15',
  zip: '80805',
  city: 'München',
  country: 'Deutschland',
  email: '91Serdar@gmail.com',
  phone: '',
  vatId: '',
  smallBusiness: false,
  responsible: 'Thomas Freimoser',
  // Zur Teilnahme weder bereit noch verpflichtet – so ist es zu erklären.
  disputeResolution: false,
};

/** Mehrzeilige Anschrift, wie sie im Impressum steht. */
export function addressLines(legal: LegalConfig = LEGAL): string[] {
  return [
    legal.companyName,
    legal.operator,
    legal.street,
    `${legal.zip} ${legal.city}`.trim(),
    legal.country,
  ].filter((line) => line.length > 0);
}

/** Prüft, ob alle Pflichtangaben nach § 5 DDG vorliegen. */
export function missingLegalFields(legal: LegalConfig = LEGAL): string[] {
  const required: Array<[keyof LegalConfig, string]> = [
    ['operator', 'Name des Betreibers'],
    ['street', 'Straße und Hausnummer'],
    ['zip', 'Postleitzahl'],
    ['city', 'Ort'],
    ['email', 'E-Mail-Adresse'],
  ];
  return required
    .filter(([key]) => String(legal[key] ?? '').trim() === '')
    .map(([, label]) => label);
}
