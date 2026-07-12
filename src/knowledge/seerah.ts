export interface SeerahRecord {
  id: string;               // e.g., "seerah_hijrah_1"
  era: "Pre-Islamic" | "EarlyLife_PreProphethood" | "Makkan_EarlyProphethood" | "Makkan_BoycottAndHardship" | "Madinan_Establishment" | "Madinan_TreatiesAndBattles" | "Madinan_LatePeriod";
  eventTitle: string;       // e.g., "The Treaty of Hudaybiyyah"
  description: string;      // Comprehensive summary of the historical event
  timeline: {
    islamicYearAH?: number;  // Year Hijri, e.g., 6 AH
    gregorianYear?: number;  // Gregorian Year, e.g., 628 CE
    isPreHijrah: boolean;    // True if before Migration
    yearOfProphethood?: number; // e.g., Year 10 of Prophethood
  };
  keyFiguresInvolved: string[]; // e.g., ["Prophet Muhammad (PBUH)", "Suhayl ibn Amr", "Ali ibn Abi Talib"]
  classicalReferences: string[]; // e.g., ["Sirat Ibn Hisham", "Al-Raheeq Al-Makhtum", "Zad al-Ma'ad"]
  locationCoordinates?: {
    latitude: number;
    longitude: number;
    placeName: string;      // e.g., "Hudaybiyyah"
  };
  relatedAyatIds?: string[];  // e.g., ["48:1"] (Surah Al-Fath)
}
