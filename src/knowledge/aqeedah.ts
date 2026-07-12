export interface AqeedahCommentary {
  scholarName: string;      // e.g., "Ibn Abil-Izz al-Hanafi", "Imam al-Ghazali"
  sourceBookName: string;   // e.g., "Sharh al-Aqeedah al-Tahawiyyah", "Al-Iqtisad fil-I'tiqad"
  text: string;             // Excerpt or summary of commentary
}

export interface AqeedahRecord {
  id: string;               // e.g., "aqeedah_qadar_1"
  subject: "Tawhid_Asma_Sifat" | "Tawhid_Rububiyyah" | "Tawhid_Uluhiyyah" | "Qadar_Predestination" | "Angels" | "Resurrection_Akhirah" | "Prophethood_Risalah" | "Divine_Books" | "Companions_Imamah";
  creedName: "Athari" | "Ash'ari" | "Maturidi" | "Consensus_General"; // Theological traditions
  statementOfBelief: string; // The specific core article or statement
  scripturalProofs: {
    type: "Quran" | "Hadith";
    referenceKey: string;   // Link to AyahRecord id ("2:255") or HadithRecord id ("bukhari_1")
    textSnippet: string;    // Verification snippet
  }[];
  classicalCommentaries: AqeedahCommentary[];
  relatedTerms: string[];   // e.g., ["Qadar", "Iradah", "Mash'iah"]
}
