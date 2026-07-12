/**
 * Sirat Knowledge Source Registry (KSR) & Source Manager (Version 1.3)
 * Pure Architectural Models, Registry Records, and Pluggable Configuration Management
 */

export type SourceCategory =
  | "Quran"
  | "Hadith"
  | "Tafsir"
  | "Fiqh"
  | "Aqeedah"
  | "Seerah"
  | "Arabic Lexicons"
  | "Islamic History";

export type AuthenticityLevel =
  | "Divine_Revelation" // Reserved for Qur'an
  | "Mutawatir_Sahih"    // Highest authenticity Hadith
  | "Ahad_Sahih"        // Single-chain authentic Hadith
  | "Hasan"             // Good/acceptable narrative
  | "Da'if_With_Corroboration" // Weak but accepted in virtues/history with proper chains
  | "Scholarly_Standard" // Standard textbook/reference in law/language
  | "Historical_Sourcing"; // Standard historical reports

export interface DeathYear {
  hijri: number;
  gregorian?: number;
}

export interface RegistrySourceRecord {
  id: string;                     // Unique Source ID, e.g., "ksr_quran", "ksr_bukhari"
  title: string;                  // e.g., "Sahih al-Bukhari"
  originalAuthor: string;         // e.g., "Imam Muhammad ibn Ismail al-Bukhari"
  deathYear?: DeathYear;          // Death year of the author (AH / CE)
  language: string;               // Primary compilation language (e.g., "Arabic")
  school?: string;                // e.g., "Hanafi", "Maliki", "Shafi'i", "Hanbali", "Ahl al-Hadith", "None"
  category: SourceCategory;
  authenticityLevel: AuthenticityLevel;
  copyrightStatus: string;        // e.g., "Public Domain", "Creative Commons BY-SA", "Proprietary Academic"
  officialWebsite?: string;       // Digital repository link if available (e.g., "https://sunnah.com/bukhari")
  recommendedCitationFormat: string; // e.g., "Sahih al-Bukhari, Book [X], Hadith [Y]"
  supportedLanguages: string[];   // Array of translations supported, e.g., ["ar", "en", "ur"]
  searchPriority: number;         // Lower is higher priority (1 = highest, 10 = lowest)
  isEnabled: boolean;             // Dynamic flag managed by the Source Manager
}

/**
 * Pluggable Registry of Official Orthodox Sunni Islamic Knowledge Sources
 */
export const OFFICIAL_KNOWLEDGE_SOURCE_REGISTRY: RegistrySourceRecord[] = [
  {
    id: "ksr_quran",
    title: "Al-Qur'an al-Karim",
    originalAuthor: "Allah (Divine Revelation)",
    language: "Arabic",
    category: "Quran",
    authenticityLevel: "Divine_Revelation",
    copyrightStatus: "Public Domain (Unrestricted)",
    recommendedCitationFormat: "Surah [Name] ([Surah Number]:[Ayah Number])",
    supportedLanguages: ["ar", "en", "ur", "fr", "es", "id", "tr", "de"],
    searchPriority: 1,
    isEnabled: true
  },
  {
    id: "ksr_bukhari",
    title: "Sahih al-Bukhari (Al-Jami' al-Musnad al-Sahih)",
    originalAuthor: "Imam Muhammad ibn Isma'il al-Bukhari",
    deathYear: { hijri: 256, gregorian: 870 },
    language: "Arabic",
    school: "Ahl al-Hadith / Shafi'i aligned",
    category: "Hadith",
    authenticityLevel: "Mutawatir_Sahih",
    copyrightStatus: "Public Domain",
    officialWebsite: "https://sunnah.com/bukhari",
    recommendedCitationFormat: "Sahih al-Bukhari, Book [Book Number], Hadith [Hadith Number]",
    supportedLanguages: ["ar", "en", "ur", "id"],
    searchPriority: 2,
    isEnabled: true
  },
  {
    id: "ksr_muslim",
    title: "Sahih Muslim (Al-Musnad al-Sahih al-Mukhtasar)",
    originalAuthor: "Imam Muslim ibn al-Hajjaj al-Naysaburi",
    deathYear: { hijri: 261, gregorian: 875 },
    language: "Arabic",
    school: "Ahl al-Hadith",
    category: "Hadith",
    authenticityLevel: "Mutawatir_Sahih",
    copyrightStatus: "Public Domain",
    officialWebsite: "https://sunnah.com/muslim",
    recommendedCitationFormat: "Sahih Muslim, Book [Book Number], Hadith [Hadith Number]",
    supportedLanguages: ["ar", "en", "ur"],
    searchPriority: 2,
    isEnabled: true
  },
  {
    id: "ksr_tirmidhi",
    title: "Sunan at-Tirmidhi (Al-Jami' al-Mukhtasar)",
    originalAuthor: "Imam Abu 'Isa Muhammad at-Tirmidhi",
    deathYear: { hijri: 279, gregorian: 892 },
    language: "Arabic",
    school: "Ahl al-Hadith",
    category: "Hadith",
    authenticityLevel: "Ahad_Sahih",
    copyrightStatus: "Public Domain",
    officialWebsite: "https://sunnah.com/tirmidhi",
    recommendedCitationFormat: "Sunan at-Tirmidhi, Hadith [Hadith Number]",
    supportedLanguages: ["ar", "en", "ur"],
    searchPriority: 3,
    isEnabled: true
  },
  {
    id: "ksr_tafsir_kathir",
    title: "Tafsir al-Qur'an al-Azim",
    originalAuthor: "Al-Hafiz Abu al-Fida' Imad ad-Din Ibn Kathir",
    deathYear: { hijri: 774, gregorian: 1373 },
    language: "Arabic",
    school: "Shafi'i",
    category: "Tafsir",
    authenticityLevel: "Scholarly_Standard",
    copyrightStatus: "Public Domain",
    recommendedCitationFormat: "Tafsir Ibn Kathir, Vol. [Volume], Page [Page] (Commentary on Qur'an [Surah]:[Ayah])",
    supportedLanguages: ["ar", "en", "ur"],
    searchPriority: 3,
    isEnabled: true
  },
  {
    id: "ksr_tafsir_tabari",
    title: "Jami' al-Bayan 'an Ta'wil Ay al-Qur'an",
    originalAuthor: "Imam Abu Ja'far Muhammad ibn Jarir al-Tabari",
    deathYear: { hijri: 310, gregorian: 923 },
    language: "Arabic",
    school: "Jariri / Independent Mujtahid",
    category: "Tafsir",
    authenticityLevel: "Scholarly_Standard",
    copyrightStatus: "Public Domain",
    recommendedCitationFormat: "Tafsir al-Tabari, Vol. [Volume], Page [Page]",
    supportedLanguages: ["ar", "en"],
    searchPriority: 4,
    isEnabled: true
  },
  {
    id: "ksr_tafsir_qurtubi",
    title: "Al-Jami' li-Ahkam al-Qur'an",
    originalAuthor: "Imam Abu 'Abdullah al-Qurtubi",
    deathYear: { hijri: 671, gregorian: 1273 },
    language: "Arabic",
    school: "Maliki",
    category: "Tafsir",
    authenticityLevel: "Scholarly_Standard",
    copyrightStatus: "Public Domain",
    recommendedCitationFormat: "Tafsir al-Qurtubi, Vol. [Volume], Page [Page]",
    supportedLanguages: ["ar", "en"],
    searchPriority: 4,
    isEnabled: true
  },
  {
    id: "ksr_hidayah_hanafi",
    title: "Al-Hidayah fi Sharh Bidayat al-Mubtadi",
    originalAuthor: "Imam Burhan al-Din al-Marghinani",
    deathYear: { hijri: 593, gregorian: 1197 },
    language: "Arabic",
    school: "Hanafi",
    category: "Fiqh",
    authenticityLevel: "Scholarly_Standard",
    copyrightStatus: "Public Domain",
    recommendedCitationFormat: "Al-Hidayah, Kitab [Book], Bab [Chapter]",
    supportedLanguages: ["ar", "en", "ur"],
    searchPriority: 5,
    isEnabled: true
  },
  {
    id: "ksr_muwatta_maliki",
    title: "Al-Muwatta",
    originalAuthor: "Imam Malik ibn Anas",
    deathYear: { hijri: 179, gregorian: 795 },
    language: "Arabic",
    school: "Maliki",
    category: "Fiqh",
    authenticityLevel: "Mutawatir_Sahih",
    copyrightStatus: "Public Domain",
    recommendedCitationFormat: "Al-Muwatta of Imam Malik, Hadith [Hadith Number]",
    supportedLanguages: ["ar", "en", "ur"],
    searchPriority: 5,
    isEnabled: true
  },
  {
    id: "ksr_majmu_shafi",
    title: "Al-Majmu' Sharh al-Muhadhdhab",
    originalAuthor: "Imam Yahya ibn Sharaf an-Nawawi",
    deathYear: { hijri: 676, gregorian: 1277 },
    language: "Arabic",
    school: "Shafi'i",
    category: "Fiqh",
    authenticityLevel: "Scholarly_Standard",
    copyrightStatus: "Public Domain",
    recommendedCitationFormat: "Al-Majmu', Vol. [Volume], Page [Page]",
    supportedLanguages: ["ar"],
    searchPriority: 5,
    isEnabled: true
  },
  {
    id: "ksr_mughni_hanbali",
    title: "Al-Mughni",
    originalAuthor: "Imam Muwaffaq al-Din Ibn Qudamah al-Maqdisi",
    deathYear: { hijri: 620, gregorian: 1223 },
    language: "Arabic",
    school: "Hanbali",
    category: "Fiqh",
    authenticityLevel: "Scholarly_Standard",
    copyrightStatus: "Public Domain",
    recommendedCitationFormat: "Al-Mughni, Vol. [Volume], Page [Page]",
    supportedLanguages: ["ar"],
    searchPriority: 5,
    isEnabled: true
  },
  {
    id: "ksr_aqeedah_tahawiyyah",
    title: "Al-Aqeedah al-Tahawiyyah (Bayan al-Sunnah wal-Jama'ah)",
    originalAuthor: "Imam Abu Ja'far al-Tahawi",
    deathYear: { hijri: 321, gregorian: 933 },
    language: "Arabic",
    school: "Hanafi / Consensus Sunni",
    category: "Aqeedah",
    authenticityLevel: "Scholarly_Standard",
    copyrightStatus: "Public Domain",
    recommendedCitationFormat: "Al-Aqeedah al-Tahawiyyah, Paragraph [Paragraph Number]",
    supportedLanguages: ["ar", "en", "ur"],
    searchPriority: 4,
    isEnabled: true
  },
  {
    id: "ksr_sirat_hisham",
    title: "Sirat Ibn Hisham (Al-Sirah al-Nabawiyyah)",
    originalAuthor: "Abu Muhammad 'Abd al-Malik Ibn Hisham",
    deathYear: { hijri: 218, gregorian: 833 },
    language: "Arabic",
    category: "Seerah",
    authenticityLevel: "Historical_Sourcing",
    copyrightStatus: "Public Domain",
    recommendedCitationFormat: "Sirat Ibn Hisham, Vol. [Volume], Page [Page]",
    supportedLanguages: ["ar", "en"],
    searchPriority: 4,
    isEnabled: true
  },
  {
    id: "ksr_lexicon_lisan",
    title: "Lisan al-Arab",
    originalAuthor: "Ibn Manzur al-Ansari",
    deathYear: { hijri: 711, gregorian: 1311 },
    language: "Arabic",
    category: "Arabic Lexicons",
    authenticityLevel: "Scholarly_Standard",
    copyrightStatus: "Public Domain",
    recommendedCitationFormat: "Lisan al-Arab, Root [Root Letters]",
    supportedLanguages: ["ar"],
    searchPriority: 5,
    isEnabled: true
  },
  {
    id: "ksr_bidayah_nihayah",
    title: "Al-Bidayah wan-Nihayah",
    originalAuthor: "Al-Hafiz Ibn Kathir",
    deathYear: { hijri: 774, gregorian: 1373 },
    language: "Arabic",
    school: "Shafi'i",
    category: "Islamic History",
    authenticityLevel: "Historical_Sourcing",
    copyrightStatus: "Public Domain",
    recommendedCitationFormat: "Al-Bidayah wan-Nihayah, Vol. [Volume], Page [Page]",
    supportedLanguages: ["ar", "en"],
    searchPriority: 5,
    isEnabled: true
  }
];

/**
 * Knowledge Source Manager
 * Coordinates enabling/disabling individual sources, query prioritization,
 * and handles modular interface mapping for the research engine.
 */
export class KnowledgeSourceManager {
  private sources: Map<string, RegistrySourceRecord>;

  constructor(initialSources: RegistrySourceRecord[] = OFFICIAL_KNOWLEDGE_SOURCE_REGISTRY) {
    this.sources = new Map<string, RegistrySourceRecord>();
    initialSources.forEach((source) => {
      this.sources.set(source.id, { ...source });
    });
  }

  /**
   * Retrieves all registered sources
   */
  public getAllSources(): RegistrySourceRecord[] {
    return Array.from(this.sources.values());
  }

  /**
   * Retrieves all enabled sources
   */
  public getEnabledSources(): RegistrySourceRecord[] {
    return this.getAllSources().filter((s) => s.isEnabled);
  }

  /**
   * Retrieves sources filtered by category
   */
  public getSourcesByCategory(category: SourceCategory): RegistrySourceRecord[] {
    return this.getAllSources().filter((s) => s.category === category);
  }

  /**
   * Retrieves a single source record by its unique ID
   */
  public getSourceById(id: string): RegistrySourceRecord | null {
    return this.sources.get(id) || null;
  }

  /**
   * Programmatically enables a specific source record
   */
  public enableSource(id: string): boolean {
    const src = this.sources.get(id);
    if (src) {
      src.isEnabled = true;
      return true;
    }
    return false;
  }

  /**
   * Programmatically disables a specific source record
   */
  public disableSource(id: string): boolean {
    const src = this.sources.get(id);
    if (src) {
      src.isEnabled = false;
      return true;
    }
    return false;
  }

  /**
   * Dynamically alters the search priority of a specific source record
   */
  public setSourcePriority(id: string, priority: number): boolean {
    const src = this.sources.get(id);
    if (src) {
      src.searchPriority = Math.max(1, priority);
      return true;
    }
    return false;
  }

  /**
   * Retrieves enabled sources in sorted priority order
   */
  public getPrioritizedSources(): RegistrySourceRecord[] {
    return this.getEnabledSources().sort((a, b) => a.searchPriority - b.searchPriority);
  }

  /**
   * Interface placeholder preparing Sirat for future scalable dataset imports.
   * Can ingest parsed bulk datasets conforming to target category models.
   */
  public registerExternalDataset(
    datasetMeta: Omit<RegistrySourceRecord, "isEnabled">
  ): void {
    this.sources.set(datasetMeta.id, {
      ...datasetMeta,
      isEnabled: true
    });
    console.info(`[KSR-Registry] Scalable Registry registered external dataset: ${datasetMeta.title} (${datasetMeta.id})`);
  }
}
