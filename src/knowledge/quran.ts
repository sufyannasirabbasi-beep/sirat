export interface ArabicWordRoot {
  word: string;
  root: string;             // e.g., "ك-ت-ب"
  transliteration: string;  // e.g., "K-T-B"
  meaning: string;          // e.g., "To write"
  grammarForm: string;      // e.g., "Form I Verb, Past Tense"
}

export interface QuranTranslation {
  translator: string;       // e.g., "Sahih International", "Pickthall", "Yusuf Ali"
  text: string;
  language: string;         // e.g., "en", "ur", "fr"
}

export interface RevelationContext {
  contextText: string;
  narrators: string[];      // e.g., ["Ibn Abbas", "Jabir ibn Abdullah"]
  sources: string[];        // e.g., ["Tafsir al-Tabari", "Asbab al-Nuzul by al-Wahidi"]
  reliabilityGrade?: string; // e.g., "Sahih", "Hasan"
}

export interface AyahRecord {
  id: string;               // e.g., "2:255"
  ayahNumber: number;
  surahNumber: number;
  arabicText: string;       // Original Arabic with full Tashkeel
  translations: QuranTranslation[];
  rootWords: ArabicWordRoot[];
  topics: string[];         // Topics/Tags, e.g., ["Tawhid", "Al-Kursi", "Protection"]
  asbabAlNuzul?: RevelationContext;
  relatedAyatRefs: string[]; // Array of keys, e.g., ["3:2", "20:111"]
}

export interface SurahRecord {
  number: number;
  nameArabic: string;       // e.g., "الفاتحة"
  nameTransliterated: string; // e.g., "Al-Fatihah"
  nameEnglish: string;      // e.g., "The Opening"
  revelationType: "Makki" | "Madani";
  totalAyahCount: number;
  revelationOrder: number;
  ayahs: AyahRecord[];
}
