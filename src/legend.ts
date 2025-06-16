export const legend: Record<
  string,
  { description: string; values?: Record<string | number, string> }
> = {
  LfNr: { description: "laufende Nummer" },
  Datum: { description: "Unfalldatum" },
  Zeit: { description: "Unfallzeit" },
  Kl: {
    description: "Straßenklasse",
    values: {
      1: "Autobahn",
      2: "Bundesstraße",
      3: "Landesstraße (nicht in Hamburg)",
      4: "Kreisstraße (nicht in Hamburg)",
      5: "Gemeindestraße",
    },
  },
  NrBu: { description: "Straßennummer (BAB oder Bundesstraße)" },
  Zif: { description: "Ortsteilnummer" },
  Gemeinde: { description: "Name der Gemeinde / Unfallort" },
  OL: {
    description: "Ortslage des Unfallortes",
    values: {
      1: "innerorts",
      2: "außerorts",
    },
  },
  Gt: { description: "Anzahl der bei dem Unfall getöteten Personen" },
  Sv: { description: "Anzahl der bei dem Unfall schwerverletzten Personen" },
  Lv: { description: "Anzahl der bei dem Unfall leichtverletzten Personen" },
  Bet: { description: "Anzahl der Unfallbeteiligten" },
  Art: {
    description: "Zusammenstoß mit Fz, dass",
    values: {
      1: "anhält, anfährt oder ruh. VK",
      2: "vorausfährt oder wartet",
      3: "seitl. in gleicher Rtg. fährt",
      4: "entgegenkommt",
      5: "abbiegt oder kreuzt",
      6: "Zusammenstoß Fz / Fußg.",
      7: "Aufprall auf Hindernis auf Fahrbahn",
      8: "Abkommen v. d. Fahrbahn n. rechts",
      9: "Abkommen v. d. Fahrbahn n. links",
      0: "Unfall anderer Art",
    },
  },
  Char1: {
    description: "Charakteristik der Unfallstelle",
    values: {
      0: "keine Charakteristik",
      1: "Kreuzung",
      2: "Einmündung",
      3: "Grundstücksein/-ausfahrt",
      4: "Steigung",
      5: "Gefälle",
      6: "Kurve",
      7: "Kreisverkehr, ausschließlich für Kreisverkehre, die mit VZ 215 beschildert sind",
    },
  },
  Beso1: {
    description: "Besonderheiten der Unfallstelle - 3 Angaben zulässig",
    values: {
      0: "Benutzungspflicht der Radverkehrsanlage (RVA)",
      2: "Schienengleicher Wegübergang",
      3: "Fußgängerüberweg (Zebrastreifen)",
      4: "Fußgängerfurt",
      5: "Haltestelle",
      6: "Arbeitsstelle",
      7: "Verkehrsberuhigter Bereich",
      8: "Radverkehrsanlage (RVA) auf der Fahrbahn oder nur durch Markierung davon getrennt",
      9: "Baulich von der Fahrbahn getrennte Radverkehrsanlage (RVA)",
    },
  },
  LZ: {
    description: "Lichtzeichenanlage an der Unfallstelle",
    values: {
      8: "in Betrieb",
      9: "außer Betrieb",
    },
  },
  L: {
    description: "Lichtverhältnisse - Schlüsselwerte",
    values: {
      0: "Tageslicht",
      1: "Dämmerung",
      2: "Dunkelheit",
    },
  },
  SZ: {
    description: "Straßenzustand - Schlüsselwerte",
    values: {
      0: "trocken",
      1: "nass/feucht",
      2: "winterglatt",
      5: "Schlüpfrigkeit",
    },
  },
  AH: {
    description: "Aufprall auf Hindernis neben der Fahrbahn",
    values: {
      0: "Baum",
      1: "Mast",
      2: "Widerlager",
      3: "Schutzplanke",
      4: "sonstiges Hindernis",
      5: "kein Aufprall",
    },
  },
  Kat: {
    description: "Unfallkategorie",
    values: {
      1: "Unfall mit Getöteten",
      2: "Unfall mit Schwerverletzten",
      3: "Unfall mit Leichtverletzten",
      4: "Unfall mit schwerem Sachschaden",
      5: "Sonstiger Sachschadensunfall ohne Alkoholeinwirkung / and. ber. Mittel",
      6: "Sonstiger Sachschadensunfall unter Alkoholeinwirkung / and. ber. Mittel",
    },
  },
  Typ: {
    description: "Unfalltyp",
    values: {
      1: "Fahrunfall",
      2: "Abbiegeunfall",
      3: "Einbiegen-/Kreuzen-Unfall",
      4: "Überschreiten-Unfall",
      5: "Unfall d. ruhenden Verkehr",
      6: "Unfall im Längsverkehr",
      7: "Sonstiger Unfall",
    },
  },
  Urs01: {
    description:
      "Hauptunfallursache des Hauptunfallverursachers - siehe Ursachenkatalog",
  },
  Urs02: {
    description:
      "weitere Unfallursache des Hauptunfallverursachers - siehe Ursachenkatalog",
  },
  Urs03: {
    description:
      "weitere Unfallursache des Hauptunfallverursachers - siehe Ursachenkatalog",
  },
  Licht: {
    description: "Lichtverhältnisse",
    values: {
      he: "hell",
      du: "dunkel",
      dä: "Dämmerung",
    },
  },
  Str_Zus: {
    description: "Straßenzustand",
    values: {
      tr: "trocken",
      na: "nass/feucht",
      wgl: "winterglatt",
      sch: "Schlüpfrigkeit",
    },
  },
  Unf_Typ: {
    description: "Unfalltyp",
    values: {
      F: "Fahrunfall",
      AB: "Abbiegeunfall",
      EK: "Einbiegen-/Kreuzen-Unfall",
      ÜS: "Überschreitenunfall",
      RV: "Unfall d. ruhenden Verkehr",
      LV: "Unfall im Längsverkehr",
      SO: "Sonstiger Unfall",
    },
  },
  BAB_Km: { description: "Autobahnkilometer" },
  M: { description: "Autobahnmeter (Bezug Autobahnkilometer)" },
  Geschl_01: { description: "Geschlecht" },
  Geschl_02: { description: "Geschlecht des/der 02" },
  Alter_01: { description: "Alter" },
  Alter_02: { description: "Alter des/der 02" },
  Kz_Bet1: { description: "Zulassungsbezirk" },
  Kz_Bet2: { description: "Zulassungsbezirk des 02" },
  Bet_01: {
    description: "Beteiligungsart",
    values: {
      RF: "Radfahrer",
      PKW: "PKW",
      LKW: "LKW",
      KRD: "Krad",
      FG: "Fußgänger",
      BUS: "Bus",
      SOF: "sonst. / unbek. Fzg.",
    },
  },
  Bet_02: {
    description: "Beteiligungsart des 02",
    values: {
      RF: "Radfahrer",
      PKW: "PKW",
      LKW: "LKW",
      KRD: "Krad",
      FG: "Fußgänger",
      BUS: "Bus",
      SOF: "sonst. / unbek. Fzg.",
    },
  },
  AV1: { description: "Verkehrsbeteiligung des Hauptunfallverursachers" },
  AV2: { description: "Verkehrsbeteiligung des nächsten Unfallbeteiligten" },
  // OrdNr	1	"Ordnungsnummer des Beteiligten
  // (Bezug Fahrtrichtung)"
  // Fahrtrichtung	absteigend	"Fahrtrichtung des zuvor genannten Beteiligten:
  // absteigend
  // aufsteigend"
};
