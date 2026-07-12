import { LegalEvidence } from "./fiqh.js";

export interface FatwaRecord {
  id: string;               // e.g., "fatwa_amja_2026_1"
  authorityName: string;    // e.g., "AMJA (Assembly of Muslim Jurists of America)", "Dar al-Ifta al-Misriyyah"
  muftiName?: string;       // Name of the specific issuing jurist
  dateIssuedHijri?: string; // e.g., "1447-02-15"
  dateIssuedGregorian?: string; // e.g., "2026-07-12"
  questionText: string;     // The original user or community inquiry
  rulingText: string;       // The definitive answer/verdict
  evidencesUsed: LegalEvidence[];
  contextRules: string[];   // Critical conditions, regional contexts, exceptions (e.g., European minority context)
  tags: string[];           // e.g., ["FinTech", "Cryptocurrency", "Medical Ethics"]
  references: string[];     // Published directories, websites, journals
}
