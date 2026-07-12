export interface IsnadNarrator {
  name: string;
  generation: "Sahabi" | "Tabi'i" | "Atba al-Tabi'in" | "Later Narrator";
  reliabilityRating?: string; // Evaluated by Ilm ar-Rijal (e.g., Thiqah, Saduq)
  deathYearAH?: number;
}

export interface HadithGrade {
  gradeValue: "Sahih" | "Hasan" | "Da'if" | "Mawdu'" | "Shadh" | "Munkar" | "Unknown";
  scholarlyAuthority: string; // e.g., "Imam al-Bukhari", "Imam Muslim", "Al-Albani", "Imam at-Tirmidhi"
  explanation?: string;       // Context of grading (e.g., weak because of interrupted chain)
}

export interface HadithRecord {
  id: string;                 // Unified ID, e.g., "bukhari_1"
  bookName: string;           // e.g., "Sahih al-Bukhari", "Sahih Muslim", "Sunan Abi Dawud"
  chapterName: string;         // e.g., "The Book of Revelation", "The Book of Faith"
  hadithNumber: string;       // e.g., "1", "256a"
  arabicText: string;         // Arabic text (Matn) with Tashkeel
  translationText: string;    // English or default translation
  additionalTranslations?: {
    language: string;
    text: string;
    translator?: string;
  }[];
  isnadChain: IsnadNarrator[]; // Ordered list of narrators from the Compiler down to the Prophet (PBUH)
  primaryNarrator: string;    // e.g., "Umar ibn al-Khattab"
  grades: HadithGrade[];      // Hadith may have been graded differently by various scholars
  keywords: string[];         // For deep keyword indexing and semantic search
  relatedHadithIds?: string[]; // Inter-connected related hadiths
}
