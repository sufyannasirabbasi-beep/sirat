export interface LinkedRecordRef {
  modelType: "Quran" | "Tafsir" | "Hadith" | "Fiqh" | "Fatwa" | "Seerah" | "Aqeedah" | "History" | "Dictionary";
  recordId: string;         // The ID of the target record being cross-referenced
  displayLabel: string;     // e.g., "Sahih al-Bukhari #1" or "Surah Al-Baqarah (2:255)"
}

export interface ResearchNotesRecord {
  id: string;               // e.g., "note_user123_001"
  researcherId: string;     // ID of the user or scholar authoring the note
  dateCreated: string;      // ISO String format
  dateLastModified: string; // ISO String format
  title: string;
  notesContentMarkdown: string; // Rich text / markdown content of the research findings
  linkedRecords: LinkedRecordRef[]; // Bidirectional cross-indexing
  tags: string[];           // e.g., ["Tafsir Study", "My Thesis", "Comparative Law"]
  isPrivate: boolean;       // Privacy controls
}
