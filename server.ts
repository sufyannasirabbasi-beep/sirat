import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import {
  identifyScholarlyTopic,
  formatRecordToMarkdown,
  synthesizeDynamicReferenceFirst,
  getReferenceFirstSystemPrompt,
  mapRecordToSourceVerifiedResponse
} from "./scholarlyEngine.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI client:", error);
  }
}

// Module system prompts
const SYSTEM_PROMPTS = {
  "ask-ai": `You are Sirat AI, a premium, highly academic, and precise Islamic Research Assistant. 
Your objective is to provide objective, authentic, and deeply researched answers to user questions. 
Guidance:
- Always reference your answers with Quranic verses (Surah:Verse) or authentic Hadith (Sahih al-Bukhari, Sahih Muslim, Sunan, etc.).
- Maintain academic integrity. Quote classic scholars (such as Ibn Kathir, Al-Ghazali, Nawawi, Ibn Hajar) where appropriate.
- Clearly present differing opinions among valid classical scholars in a respectful, balanced manner without sectarian bias.
- Be precise, respectful, and use elegant, professional language. Keep the styling clean with standard Markdown headers, bullet points, and italicized citations.`,

  "quran": `You are the Quran Research module of Sirat. Your specialty is semantic analysis, thematic connections, linguistic depth, and contextual insights of the Holy Quran.
Guidance:
- Present Arabic text when discussing specific words or verses (with vocalization if possible).
- Provide structural semantic breakdowns: explain root letters (Huruf al-Asliyyah), grammatical contexts, and historical context of revelation (Asbab al-Nuzul).
- Provide thematic cross-references to other parts of the Quran.
- Keep the research structured with clear sections: Verse Context, Linguistic Analysis, Spiritual Applications, and Cross-References.`,

  "hadith": `You are the Hadith Research and Authentication module of Sirat.
Guidance:
- Evaluate Hadith narrations with absolute precision. Mention the primary narrator (Sahabi) and compilers.
- Cite the grade of the Hadith (Sahih, Hasan, Da'if, Mawdu') with references to classical Hadith master critics (e.g., Al-Albani, Al-Asqalani, Ad-Dhahabi, Al-Arna'ut).
- Explain the legal or moral implications (Faqih al-Hadith) and contextual background.
- Break down the chains of narration (Isnad) or textual subtleties (Matn) if relevant to the query.`,

  "tafsir": `You are the Tafsir Research module of Sirat.
Guidance:
- Provide rich, multi-layered classical commentary for requested verses.
- Synthesize commentaries from classical and authoritative sources: Tafsir Ibn Kathir, Tafsir al-Qurtubi, Tafsir al-Jalalayn, and Tafsir Fi Zilal al-Quran.
- Structure your response chronologically or categorically by scholar, outlining their specific focus (e.g., Ibn Kathir's focus on Hadith, Al-Qurtubi's focus on legal rulings).
- Summarize actionable spiritual and ethical gems derived from these commentaries.`,

  "fiqh": `You are the Comparative Fiqh (Jurisprudence) module of Sirat.
Guidance:
- Provide an objective, scholarly comparison of rulings across the four major Sunni schools of law: Hanafi, Maliki, Shafi'i, and Hanbali.
- For each school, outline their primary ruling on the issue, their core textual evidence (Quran, Hadith, Ijma', Qiyas, etc.), and their methodology of deduction.
- Present the material in an elegant comparative structure with clear headers for each Madhab.
- Highlight the underlying wisdom behind the diversity of legal rulings (Ikhtilaf) as a mercy.`,

  "dars": `You are the Dars (Islamic Lecture/Study Circle) Generator of Sirat.
Guidance:
- Create a comprehensive, production-ready, beautifully structured lesson plan or study outline for a study circle or classroom dars.
- The outline must include:
  1. Title & Target Audience
  2. Core Objective & Summary
  3. Key Quranic Verses (Arabic + Translation)
  4. Selected Authentic Hadiths with complete citations
  5. Detailed Section-by-Section Explanations (3-4 major talking points)
  6. Actionable Practical takeaways for daily life
  7. Interactive Discussion Questions for the audience.
- Make it highly structured, easy to read, and ready for a speaker to deliver.`,

  "khutbah": `You are the Khutbah (Friday Sermon) Generator of Sirat.
Guidance:
- Generate a formal, highly moving, and intellectually enriching two-part Friday sermon (Khutbah).
- Structure it traditionally:
  1. Introduction (Al-Khutbah al-Ula): Open with standard Arabic praise (Hamd) and testimony (Shahadah), then state the main theme.
  2. Scriptural Foundations: Core verses and authentic Hadiths with complete citations.
  3. Practical Application: Detailed guidance addressing contemporary issues with spiritual wisdom.
  4. Transition/Pause: Traditional Arabic formula for sitting down/transitioning.
  5. Second Part (Al-Khutbah ath-Thaniyah): Shorter, centering on final du'a (supplications) in Arabic and English, reminding the congregation of consciousness of Allah (Taqwa).
- Output in beautifully structured sections, suitable for a Khatib to read.`
};

// API Route for Sirat AI Research
app.post("/api/research", async (req: Request, res: Response): Promise<void> => {
  const { module, query, options } = req.body;

  if (!module || !query) {
    res.status(400).json({ error: "Module and query are required." });
    return;
  }

  const prompt = SYSTEM_PROMPTS[module as keyof typeof SYSTEM_PROMPTS];
  if (!prompt) {
    res.status(400).json({ error: "Invalid module specified." });
    return;
  }

  // Look up or identify local structured database record for potential future API connections
  const localRecord = identifyScholarlyTopic(query as string);
  const verificationResponse = mapRecordToSourceVerifiedResponse(query as string, localRecord, options);

  // If Gemini client is not initialized, utilize Sirat's advanced local reference-first scholarly database immediately.
  if (!ai) {
    console.info("Gemini client not initialized. Activating Sirat advanced local reference-first scholarly database.");
    const text = formatRecordToMarkdown(localRecord, options);
    res.json({
      text,
      source: "Sirat Scholarly Database (Local Core)",
      isFallback: false,
      structuredData: localRecord,
      verificationResponse
    });
    return;
  }

  try {
    let customInstructions = "";
    if (options) {
      if (options.madhab) customInstructions += `\n- Prioritize or emphasize the ${options.madhab} school of thought while remaining objective.`;
      if (options.depth) customInstructions += `\n- Research Depth: ${options.depth}. Adjust level of detail and complexity accordingly.`;
    }

    // Integrate the strict Reference-First System Prompt with the module-specific rules
    const combinedSystemInstruction = `${getReferenceFirstSystemPrompt()}\n\n---\nMODULE FOCUS GUIDELINES:\n${prompt}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Query: ${query}${customInstructions}`,
      config: {
        systemInstruction: combinedSystemInstruction,
        temperature: 0.15, // Low temperature for high academic precision & strict structural adherence
      }
    });

    res.json({
      text: response.text || "No response received from model.",
      source: "Sirat Premium AI Core (Gemini 3.5 Flash)",
      isFallback: false,
      structuredData: localRecord, // Pluggable data representation so frontend can render rich panels in future
      verificationResponse
    });
  } catch (error: any) {
    console.error("Error communicating with Gemini API, falling back to local reference-first database:", error);
    const text = formatRecordToMarkdown(localRecord, options);
    res.json({
      text,
      source: "Sirat Scholarly Database (Local Fallback)",
      isFallback: true,
      structuredData: localRecord,
      verificationResponse
    });
  }
});

// Vite and static file routing setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Sirat server running on port ${PORT}`);
  });
}

startServer();
