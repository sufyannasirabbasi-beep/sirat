export interface Book {
  id: string;
  title: string;
  author: string;
  era: string;
  category: string;
  description: string;
  significance: string;
  keyThemes: string[];
}

export const ISLAMIC_LIBRARY: Book[] = [
  {
    id: "bukhari",
    title: "Sahih al-Bukhari",
    author: "Imam Muhammad ibn Ismail al-Bukhari",
    era: "194 – 256 AH (9th Century CE)",
    category: "Hadith",
    description: "The most authentic compilation of Hadith (prophetic traditions) in Islamic history. Imam al-Bukhari spent 16 years compiling it, selecting only 7,563 narrations from over 600,000 available, applying rigorous biographical and chain of transmission (isnad) checks.",
    significance: "Regarded as the most authentic book after the Quran in Sunni tradition. Serves as a primary legal, ethical, and historical pillar of Islamic life.",
    keyThemes: ["Purification of Intentions", "Revelation (Wahy)", "Belief (Iman)", "Ritual Prayers (Salah)", "Business Transactions (Buyu')"]
  },
  {
    id: "muslim",
    title: "Sahih Muslim",
    author: "Imam Muslim ibn al-Hajjaj",
    era: "206 – 261 AH (9th Century CE)",
    category: "Hadith",
    description: "The second of the two highly esteemed authentic collections (Sahihayn). Renowned among scholars for its exceptionally organized chains of narration, clustering multiple versions of Hadiths together to illuminate textual variations.",
    significance: "Slightly behind Bukhari in authority but celebrated for its superior thematic arrangement and technical Isnad layout.",
    keyThemes: ["Faith (Iman)", "Purity (Taharah)", "Zakah & Fasting", "The Laws of Inheritance", "Destiny (Qadr)"]
  },
  {
    id: "ibnkathir",
    title: "Tafsir al-Quran al-Azim",
    author: "Al-Hafiz Ibn Kathir al-Damascene",
    era: "701 – 774 AH (14th Century CE)",
    category: "Tafsir",
    description: "The quintessential 'Tafsir bil-Ma'thur' (commentary based on traditional reports). Ibn Kathir interprets verses by referencing first other Quranic verses, then authentic Hadiths, then declarations of the Prophet's companions (Sahaba) and early scholars.",
    significance: "The most widely studied classical Quranic commentary due to its robust reliance on authentic primary sources and avoidance of speculative stories.",
    keyThemes: ["Context of Revelation (Asbab al-Nuzul)", "Hadith Synthesis", "Creed & Beliefs", "Prophetic Histories"]
  },
  {
    id: "muwatta",
    title: "Al-Muwatta",
    author: "Imam Malik ibn Anas",
    era: "93 – 179 AH (8th Century CE)",
    category: "Hadith & Fiqh",
    description: "One of the earliest compiled legal works combining both prophetic Hadiths, traditions of the companions, and the consensus of the people of Madinah. It defines the foundation of the Maliki school of law.",
    significance: "Regarded by Imam al-Shafi'i as the most correct book on Earth before the compilation of Sahih al-Bukhari.",
    keyThemes: ["Amal Ahl al-Madinah (Practice of Madinah)", "Legal Precedents", "Purity & Rituals", "Societal Contracts"]
  },
  {
    id: "risala",
    title: "Al-Risala",
    author: "Imam Muhammad ibn Idris al-Shafi'i",
    era: "150 – 204 AH (8th/9th Century CE)",
    category: "Usul al-Fiqh",
    description: "The foundational text that established the discipline of Usul al-Fiqh (Principles of Islamic Jurisprudence). Imam al-Shafi'i systematically defines the framework of legal deduction, detailing the roles of the Quran, Sunnah, Ijma' (consensus), and Qiyas (analogy).",
    significance: "Universally acknowledged as the revolutionary work that synthesized textual literalism and rational analysis into a coherent methodology of law.",
    keyThemes: ["Abrogation (Naskh)", "The Authority of Sunnah", "Consensus (Ijma')", "Analogy (Qiyas)"]
  },
  {
    id: "ihya",
    title: "Ihya Ulum al-Din",
    author: "Hujjat al-Islam Abu Hamid al-Ghazali",
    era: "450 – 505 AH (11th/12th Century CE)",
    category: "Tazkiyah & Spirituality",
    description: "The Revival of the Religious Sciences. A monumental masterwork of 40 volumes that harmonizes exoteric ritual law (Shariah) with esoteric spiritual purification (Tariqah), addressing psychology, ethics, and theology.",
    significance: "Regarded as one of the most influential spiritual guides in Islamic history, redefining inner sincerity, character training, and moral philosophy.",
    keyThemes: ["Sincerity (Ikhlas)", "Curing the Diseased Heart", "The Manners of Companionship", "Fear and Hope", "Divine Monotheism"]
  },
  {
    id: "riyad",
    title: "Riyad as-Salihin",
    author: "Imam Yahya ibn Sharaf al-Nawawi",
    era: "631 – 676 AH (13th Century CE)",
    category: "Ethics & Character",
    description: "The Gardens of the Righteous. A highly popular curation of about 1,900 authentic Hadiths organized topically to aid individuals in perfecting their personal ethics, daily worship, and social conduct.",
    significance: "An indispensable guide found in almost every Muslim household due to its accessibility, high reliability, and deep focus on practical moral actions.",
    keyThemes: ["Patience & Steadfastness", "Truthfulness (Sidq)", "Repentance (Tawbah)", "Kindness to Kin", "Modesty & Etiquette"]
  }
];

export const STARTER_PROMPTS: Record<string, string[]> = {
  "ask-ai": [
    "What is the Islamic concept of Muraqabah (divine observation)?",
    "Explain the history of the compilation of the Quran.",
    "What are the maqasid (objectives) of Shariah regarding preservation of wealth?",
    "Describe the moral and ethical principles of trade in Islam."
  ],
  "quran": [
    "Explore the thematic structure of Surah Al-Kahf.",
    "Analyze the linguistic roots of the term 'Al-Furqan'.",
    "What is the historical context of Surah Al-Alaq (96:1-5)?",
    "Trace the themes of covenant (Mithaq) in the Quran."
  ],
  "hadith": [
    "Verify the authenticity of the narration 'Seeking knowledge is obligatory upon every Muslim.'",
    "Isnad breakdown of the Hadith of Gabriel (Jibril).",
    "What is the status and context of the Hadith of the 'seven under the shade of Allah'?",
    "Analyze Hadiths relating to kindness towards neighbors."
  ],
  "tafsir": [
    "Tafsir of Surah Al-Asr (103) in classic commentaries.",
    "Compare Ibn Kathir and Al-Qurtubi on Ayat al-Kursi (2:255).",
    "What is the commentary on Surah Ad-Duha regarding mental trial and relief?",
    "Summarize spiritual gems from the Tafsir of Surah Yusuf."
  ],
  "fiqh": [
    "Ruling on prayer behind a glass barrier or digital screen.",
    "Compare the definition of travel distance (Qasr) for shortening prayers among the four Madhahib.",
    "Rules of Zakāt on modern investments and digital assets across the schools of thought.",
    "Differences in the opening Takbeer and raising hands in Salah."
  ],
  "dars": [
    "The Ethics of Disagreement (Adab al-Ikhtilaf).",
    "Understanding and overcoming envy (Hasad).",
    "The character of the Prophet (PBUH) as a teacher.",
    "Nurturing Taqwa (God-consciousness) in the workspace."
  ],
  "khutbah": [
    "Cultivating gratitude (Shukr) in modern trials.",
    "The importance of truthfulness (Sidq) in personal and digital life.",
    "Building strong, loving families based on the prophetic sunnah.",
    "The value of time and self-accounting (Muhasabah)."
  ]
};
