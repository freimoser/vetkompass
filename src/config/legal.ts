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
  TODO – BLOCKER VOR DEM LIVEGANG
  --------------------------------
  `street`, `zip`, `city` und `email` sind leer und müssen ausgefüllt werden.

  Eine Anschrift wird NICHT erfunden und nicht durch einen Platzhalter ersetzt.
  Solange die Felder leer sind, meldet `npm run check:launch` einen Blocker und
  bricht ab. Das ist Absicht: § 5 DDG verlangt eine ladungsfähige Anschrift,
  ein Postfach genügt nicht.

  Bei rein privatem Betrieb ohne Geschäftsadresse ist das die Privatanschrift.
  Deshalb tragen Impressum, Datenschutz und Haftungsausschluss `noindex` –
  erreichbar ja, über Google auffindbar nein.
*/
export const LEGAL: LegalConfig = {
  operator: 'Thomas Freimoser',
  // Rein privates Angebot, kein Gewerbe – daher keine Firmierung.
  companyName: '',
  street: '',
  zip: '',
  city: '',
  country: 'Deutschland',
  email: '',
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
