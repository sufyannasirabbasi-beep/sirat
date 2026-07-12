export type ActiveModule =
  | "ask-ai"
  | "quran"
  | "hadith"
  | "tafsir"
  | "fiqh"
  | "dars"
  | "khutbah"
  | "library"
  | "saved"
  | "settings";

export interface ResearchOptions {
  madhab: "Hanafi" | "Maliki" | "Shafi'i" | "Hanbali" | "Comparative";
  depth: "Standard" | "Advanced Academic" | "Brief Summary";
  language: string;
}

export interface SavedItem {
  id: string;
  module: ActiveModule;
  query: string;
  text: string;
  source: string;
  savedAt: string;
  notes?: string;
}
