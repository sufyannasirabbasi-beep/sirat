export interface HistoryRecord {
  id: string;               // e.g., "history_yarmouk_battle"
  historicalPeriod: "Khulafa_Rashidun" | "Umayyad" | "Abbasid" | "Fatimid" | "Seljuk" | "Ayyubid" | "Mamluk" | "Ottoman" | "Mughal" | "Andalusian" | "Modern";
  eventName: string;        // e.g., "The Battle of Yarmouk"
  narrativeDescription: string; // The complete objective historical narrative
  timeline: {
    hijriYear: number;
    gregorianYear: number;
    centuryHijri: number;
  };
  keyFigures: string[];     // e.g., ["Khalid ibn al-Walid", "Abu Ubaydah ibn al-Jarrah"]
  impactLegacyNotes: string; // The strategic, geographic, and legal impact of the event
  sourcesAndReferences: string[]; // e.g., ["Tarikh al-Tabari", "Al-Bidayah wan-Nihayah by Ibn Kathir"]
  geography?: {
    modernCountry: string;
    historicalRegion: string;
  };
}
