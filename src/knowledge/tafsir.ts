export interface TafsirCitation {
  volume?: number;
  page?: number;
  publisher?: string;
  edition?: string;
  scholarlyIdentifier?: string; // Standardized reference system
}

export interface CommentaryBlock {
  scholarName: string;      // e.g., "Ibn Kathir", "Al-Tabari", "Al-Qurtubi", "Al-Jalalayn"
  scholarDeathAH: number;   // Hijri death year, e.g., 774 for Ibn Kathir
  text: string;             // Detailed markdown commentary text
  language: string;         // e.g., "en", "ar", "ur"
  references: TafsirCitation[];
}

export interface TafsirRecord {
  id: string;               // e.g., "tafsir_2_255"
  surahNumber: number;
  ayahNumber: number;
  ibnKathir: CommentaryBlock;
  alTabari?: CommentaryBlock;
  alQurtubi?: CommentaryBlock;
  alJalalayn?: CommentaryBlock;
  additionalCommentaries?: CommentaryBlock[]; // For any other classical Tafsirs
  lastUpdated?: string;
}
