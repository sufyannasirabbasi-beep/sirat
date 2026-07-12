export interface LegalEvidence {
  sourceType: "Quran" | "Hadith" | "Ijma" | "Qiyas" | "Amal" | "Istihsan" | "Maslahah" | "Sadd_Dhara'i";
  description: string;
  referenceKey?: string;     // Reference key linking to AyahRecord id ("2:255") or HadithRecord id ("bukhari_1")
}

export interface MadhabRuling {
  rulingValue: "Mandub_Mustahabb" | "Wajib_Fard" | "Mubah" | "Makruh" | "Haram";
  textDetails: string;       // Explanation of the school's position
  evidences: LegalEvidence[];
  scholarlyNotes: string[];  // Sub-discussions, nuances, and exceptions
}

export interface FiqhRecord {
  id: string;                // e.g., "fiqh_business_riba"
  topic: string;             // e.g., "Riba in Digital Transactions"
  category: "Ibadah" | "Mu'amalat" | "Munakahat" | "Jinayat" | "Siyayah"; // Major legal classifications
  hanafi: MadhabRuling;
  maliki: MadhabRuling;
  shafii: MadhabRuling;
  hanbali: MadhabRuling;
  scholarlyConsensus?: {     // Summary of agreement (Ijma') or major disagreement structures
    isConsensusReached: boolean;
    summaryText: string;
    dissentingScholars?: string[];
  };
  references: string[];      // Classical Fiqh manuals consulted (e.g., Al-Hidayah, Al-Mughni, Al-Mudawwanah, Al-Majmu')
}
