/**
 * Sirat Source Verification Engine (Version 1.2)
 * Pure Architectural Models, Data Interfaces, and Pluggable Verification Helpers
 */

/**
 * 1. Verification Levels
 * Every scholarly response or record must match one of these strict criteria
 */
export type VerificationLevel =
  | "Verified"
  | "Partially Verified"
  | "Requires Further Verification"
  | "Opinion Based"
  | "Classical Scholarly Difference";

/**
 * 2. Detailed Citation Object
 * Every citation must have complete tracking details to prevent fabrication.
 */
export interface ScholarlyCitation {
  id: string;                     // Unique lookup identifier
  bookName: string;               // e.g., "Fath al-Bari", "Sahih Muslim", "Al-Mughni"
  author: string;                 // e.g., "Ibn Hajar al-Asqalani", "Ibn Qudamah"
  volume?: string | number;       // Volume number
  page?: string | number;         // Page or Section number
  hadithNumber?: string;          // Specific Hadith number (if available)
  publisher?: string;             // Optional publisher information
  language: string;               // Language, e.g., "Arabic", "English", "Urdu"
  sourceType: SourceType;         // Linked source type for ranking
  urn?: string;                   // Unified Resource Name for programmatic lookups
  isDigitized: boolean;           // True if online/scanned scan is available
}

/**
 * 6. Source Ranking Priority
 * Hierarchical order of authority in orthodox Sunni methodology
 */
export enum SourceType {
  QURAN = 1,                      // Highest: Divine revelation (Qur'an)
  AUTHENTIC_HADITH = 2,           // Prophetic Sunnah (Mutawatir / Sahih)
  CLASSICAL_TAFSIR = 3,           // Classical commentaries (Ibn Kathir, Al-Qurtubi)
  CLASSICAL_FIQH = 4,             // Primary Madhab legal manuals (Hanafi, Maliki, etc.)
  SCHOLARLY_CONSENSUS = 5,        // Established historical consensus (Ijma')
  CONTEMPORARY_FATWA = 6          // Contemporary collective and individual legal verdicts (AMJA, etc.)
}

/**
 * 9. Scholar Review Framework
 * Prepares the application for peer review, crowd-sourced scholarly audits, and expert endorsement.
 */
export interface ScholarReviewer {
  scholarId: string;
  name: string;
  title: string;                  // e.g., "Mufti", "Professor of Hadith Studies"
  affiliation: string;            // e.g., "Al-Azhar University", "AMJA", "Madinah University"
  credentials: string[];          // List of verified academic and traditional ijazat
}

export interface ScholarAuditTrail {
  reviewId: string;
  reviewer: ScholarReviewer;
  auditDate: string;              // ISO String
  decision: "Approved" | "Requires_Modification" | "Flagged_Inaccuracy";
  reviewerComments: string;
  contestedPoints?: {
    pointText: string;
    suggestedAlternative: string;
    supportingCitations: ScholarlyCitation[];
  }[];
}

/**
 * 5. Verification Objects
 * Bundles the verification status, confidence score, citations, and scholarly audit trails.
 */
export interface VerificationResult {
  status: VerificationLevel;
  confidenceScore: number;         // Percentage 0-100% computed from source ranking & verifications
  citations: ScholarlyCitation[];
  audits: ScholarAuditTrail[];
  isFullyConsensusBacked: boolean;
  requiresSpecialistReview: boolean;
}

/**
 * 8. Structural Distinctions
 * Separates raw text, interpretation layers, legal schools, and practical applications.
 * Prevents AI from blending speculative commentary with authentic sacred texts.
 */
export interface ScripturalElement {
  id: string;
  textArabic: string;             // Original Arabic with full Tashkeel
  translationText: string;        // Verified standard translation
  referenceLabel: string;         // e.g., "Surah Al-Baqarah (2:255)" or "Sahih al-Bukhari #1"
}

export interface VerificationSegment {
  /**
   * Section I: Authentic Text
   * Absolute sacred primary sources only (Qur'an text, absolute authentic Prophetic Matn).
   */
  authenticText: ScripturalElement[];

  /**
   * Section II: AI Explanation
   * Pure linguistic analysis, structured summarization, and direct objective descriptions.
   */
  aiExplanation: string;

  /**
   * Section III: Scholarly Opinion
   * Traditional views of classical commentators, opinions, and school-specific legal conclusions.
   */
  scholarlyOpinion: string;

  /**
   * Section IV: Practical Summary
   * Actionable, contemporary everyday guidance for the modern practitioner.
   */
  practicalSummary: string;
}

export interface SourceVerifiedResponse {
  query: string;
  segmentation: VerificationSegment;
  verification: VerificationResult;
  metadata: {
    processedAt: string;
    processingEngine: string;      // e.g., "Sirat Source Verification Engine v1.2"
    sourceCount: number;
  };
}

/**
 * Source Ranking Helper and Score Calculator
 */
export class SourceRanker {
  /**
   * Computes confidence score (0-100) based on source types, citation completeness, and scholar reviews
   */
  public static calculateConfidenceScore(
    citations: ScholarlyCitation[],
    audits: ScholarAuditTrail[]
  ): number {
    if (citations.length === 0) return 0;

    let baseScore = 40; // Default baseline for any sourced response

    // Calculate score contribution from source types
    const uniqueSourceTypes = new Set(citations.map((c) => c.sourceType));
    
    // Quranic and authentic Hadith sources add significant authority
    if (uniqueSourceTypes.has(SourceType.QURAN)) {
      baseScore += 20;
    }
    if (uniqueSourceTypes.has(SourceType.AUTHENTIC_HADITH)) {
      baseScore += 15;
    }
    if (uniqueSourceTypes.has(SourceType.CLASSICAL_TAFSIR)) {
      baseScore += 10;
    }
    if (uniqueSourceTypes.has(SourceType.CLASSICAL_FIQH)) {
      baseScore += 5;
    }

    // Reward citation completeness (bookName, author, volume, page)
    let completenessCount = 0;
    for (const citation of citations) {
      if (citation.bookName && citation.author) {
        completenessCount += 1;
        if (citation.volume && citation.page) {
          completenessCount += 1;
        }
      }
    }
    
    const completenessBonus = Math.min(10, (completenessCount / (citations.length * 2)) * 10);
    baseScore += completenessBonus;

    // Scholar audit boosts or decreases confidence
    let auditAdjustment = 0;
    for (const audit of audits) {
      if (audit.decision === "Approved") {
        auditAdjustment += 10;
      } else if (audit.decision === "Requires_Modification") {
        auditAdjustment -= 10;
      } else if (audit.decision === "Flagged_Inaccuracy") {
        auditAdjustment -= 25;
      }
    }

    baseScore += auditAdjustment;

    // Bound the score between 0 and 100
    return Math.max(0, Math.min(100, Math.round(baseScore)));
  }

  /**
   * Automatically resolves overall verification status level from citations and audits
   */
  public static determineVerificationLevel(
    citations: ScholarlyCitation[],
    audits: ScholarAuditTrail[]
  ): VerificationLevel {
    if (citations.length === 0) {
      return "Requires Further Verification";
    }

    // Look for any severe flags in reviewer audits
    const hasFlags = audits.some((a) => a.decision === "Flagged_Inaccuracy");
    if (hasFlags) {
      return "Requires Further Verification";
    }

    const uniqueTypes = Array.from(new Set(citations.map((c) => c.sourceType)));
    
    // If we only have contemporary fatwa or single opinions
    const hasPrimarySources = uniqueTypes.some(
      (t) => t === SourceType.QURAN || t === SourceType.AUTHENTIC_HADITH
    );

    if (!hasPrimarySources) {
      return "Opinion Based";
    }

    const isApproved = audits.length > 0 && audits.every((a) => a.decision === "Approved");

    if (isApproved && uniqueTypes.includes(SourceType.QURAN) && uniqueTypes.includes(SourceType.AUTHENTIC_HADITH)) {
      return "Verified";
    }

    // Check if there is scholarly variance indicated in citations
    const isVarianceIndicated = citations.some(
      (c) => c.sourceType === SourceType.CLASSICAL_FIQH || c.sourceType === SourceType.CONTEMPORARY_FATWA
    );

    if (isVarianceIndicated) {
      return "Classical Scholarly Difference";
    }

    return "Partially Verified";
  }
}
