export interface ScripturalExample {
  sourceType: "Quran" | "Hadith";
  referenceKey: string;     // e.g., "2:255"
  arabicContextText: string; // The phrase containing the word
  englishTranslation: string;
}

export interface DictionaryRecord {
  id: string;               // e.g., "dict_sabr"
  wordArabic: string;       // e.g., "صَبْر"
  wordTransliterated: string; // e.g., "Sabr"
  rootLetters: string;      // e.g., "ص-ب-ر"
  grammaticalForm: string;  // e.g., "Masdar (Verbal Noun), Form I"
  primaryDefinition: string; // Dynamic English meaning
  extendedDefinitions: {
    context: string;
    meaning: string;
  }[];
  classicalLexiconsConsulted: {
    lexiconName: string;    // e.g., "Lisan al-Arab by Ibn Manzur", "Taj al-Arus by al-Zabidi", "Al-Qamus al-Muhit"
    volumePageRef?: string;  // e.g., "Vol. 4, p. 12"
    extractedInsight: string;
  }[];
  scripturalExamples: ScripturalExample[];
}
