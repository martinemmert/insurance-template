export const kontakt = {
  name: 'Helmut Emmert',
  rolle: 'Makler für private Krankenversicherung in Aschaffenburg',
  telefonAnzeige: '0176 4777 8704',
  telefonLink: 'tel:+4917647778704',
  email: 'versicherungen@helmutemmert.de',
  strasse: 'Burchardtstraße 14',
  ort: '63741 Aschaffenburg',
};

export const bewertungen = {
  sterne: '5,0',
  anzahl: 30,
};

/**
 * Versicherungspflichtgrenze (allgemeine Jahresarbeitsentgeltgrenze).
 * 2026: festgelegt. 2027: Entwurf der Sozialversicherungs-Rechengrößenverordnung 2027,
 * Kabinettsbeschluss 07.10.2026, Zustimmung des Bundesrats steht noch aus (Stand 03.11.2026).
 * Quelle: https://www.tk.de/firmenkunden/versicherung/beitraege-faq-und-mehr/zahlen-und-grenzwerte/sv-rechengroessen-2027-2227000
 * Jedes Jahr im Herbst prüfen und anpassen.
 */
export const versicherungspflichtgrenze = {
  aktuellesJahr: 2026,
  aktuellerBetrag: '77.400 €',
  naechstesJahr: 2027,
  naechsterBetrag: '84.150 €',
  naechsterBetragBeschlossen: false,
};
