import { SurahRecord, AyahRecord, ArabicWordRoot, QuranTranslation, RevelationContext } from "./quran.js";
import { TafsirRecord, CommentaryBlock, TafsirCitation } from "./tafsir.js";
import { HadithRecord, IsnadNarrator, HadithGrade } from "./hadith.js";
import { FiqhRecord, MadhabRuling, LegalEvidence } from "./fiqh.js";
import { FatwaRecord } from "./fatwa.js";
import { SeerahRecord } from "./seerah.js";
import { AqeedahRecord, AqeedahCommentary } from "./aqeedah.js";
import { HistoryRecord } from "./history.js";
import { DictionaryRecord, ScripturalExample } from "./dictionary.js";
import { ResearchNotesRecord, LinkedRecordRef } from "./notes.js";
import { VerificationLevel, ScholarlyCitation, SourceType, ScholarReviewer, ScholarAuditTrail, VerificationResult, ScripturalElement, VerificationSegment, SourceVerifiedResponse } from "./verification.js";
import { SourceCategory, AuthenticityLevel, DeathYear, RegistrySourceRecord, KnowledgeSourceManager } from "./registry.js";

// Re-export all modular models so they can be consumed cleanly as an NPM package or unified folder imports
export * from "./quran.js";
export * from "./tafsir.js";
export * from "./hadith.js";
export * from "./fiqh.js";
export * from "./fatwa.js";
export * from "./seerah.js";
export * from "./aqeedah.js";
export * from "./history.js";
export * from "./dictionary.js";
export * from "./notes.js";
export * from "./verification.js";
export * from "./registry.js";

/**
 * Highly scalable, pluggable repository/database connector interface.
 * Implements standard patterns for millions of records (pagination, cursors, indexing, semantic vector searches).
 */
export interface IslamicDatabaseConnector {
  // 1. Quran Methods
  getSurah(surahNumber: number): Promise<SurahRecord | null>;
  getAyah(surahNumber: number, ayahNumber: number): Promise<AyahRecord | null>;
  searchQuran(query: string, limit?: number, offset?: number): Promise<AyahRecord[]>;
  getAyatByTopic(topic: string): Promise<AyahRecord[]>;

  // 2. Tafsir Methods
  getTafsir(surahNumber: number, ayahNumber: number): Promise<TafsirRecord | null>;
  getTafsirByScholar(surahNumber: number, ayahNumber: number, scholarName: string): Promise<CommentaryBlock | null>;

  // 3. Hadith Methods
  getHadithById(id: string): Promise<HadithRecord | null>;
  getHadithByNumber(bookName: string, hadithNumber: string): Promise<HadithRecord | null>;
  searchHadith(query: string, options?: { book?: string; grade?: string; limit?: number; cursor?: string }): Promise<{ records: HadithRecord[]; nextCursor?: string }>;

  // 4. Fiqh Methods
  getFiqhRecord(id: string): Promise<FiqhRecord | null>;
  getFiqhRecordsByCategory(category: "Ibadah" | "Mu'amalat" | "Munakahat" | "Jinayat" | "Siyayah"): Promise<FiqhRecord[]>;
  searchFiqh(query: string): Promise<FiqhRecord[]>;

  // 5. Fatwa Methods
  getFatwaById(id: string): Promise<FatwaRecord | null>;
  searchFatwas(query: string, tags?: string[]): Promise<FatwaRecord[]>;

  // 6. Seerah Methods
  getSeerahEvent(id: string): Promise<SeerahRecord | null>;
  getSeerahByEra(era: string): Promise<SeerahRecord[]>;
  getSeerahTimeline(): Promise<SeerahRecord[]>;

  // 7. Aqeedah Methods
  getAqeedahSubject(id: string): Promise<AqeedahRecord | null>;
  getAqeedahByCreed(creed: "Athari" | "Ash'ari" | "Maturidi"): Promise<AqeedahRecord[]>;

  // 8. Islamic History Methods
  getHistoryEvent(id: string): Promise<HistoryRecord | null>;
  getHistoryByPeriod(period: string): Promise<HistoryRecord[]>;

  // 9. Arabic Dictionary Methods
  getDictionaryWord(wordArabicOrTransliterated: string): Promise<DictionaryRecord | null>;
  getWordsByRoot(rootLetters: string): Promise<DictionaryRecord[]>;

  // 10. Research Notes Methods
  getResearchNotes(researcherId: string): Promise<ResearchNotesRecord[]>;
  saveResearchNote(note: ResearchNotesRecord): Promise<void>;
  deleteResearchNote(id: string): Promise<void>;

  // Core Semantic Vector search across millions of items (pluggable with pgvector or Firestore Vector Search)
  semanticUnifiedSearch(vectorQuery: string, modules: string[], limit?: number): Promise<UnifiedSearchResult[]>;
}

export interface UnifiedSearchResult {
  score: number; // Relevance score
  modelType: "Quran" | "Tafsir" | "Hadith" | "Fiqh" | "Fatwa" | "Seerah" | "Aqeedah" | "History" | "Dictionary" | "Notes";
  recordId: string;
  title: string;
  arabicSnippet?: string;
  textSnippet: string;
}
