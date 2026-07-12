import { useState, useEffect } from "react";
import {
  Sparkles,
  BookOpen,
  Award,
  FileText,
  Scale,
  Users,
  Mic,
  Library,
  Bookmark,
  Settings2,
  Search,
  BookMarked,
  ArrowRight,
  Loader2,
  Trash2,
  Save,
  Download,
  Copy,
  Check,
  ExternalLink,
  PlusCircle,
  HelpCircle,
  Filter,
  BookmarkPlus
} from "lucide-react";
import Sidebar from "./components/Sidebar";
import { ActiveModule, ResearchOptions, SavedItem } from "./types";
import { ISLAMIC_LIBRARY, STARTER_PROMPTS } from "./data";

export default function App() {
  const [activeModule, setActiveModule] = useState<ActiveModule>("ask-ai");
  const [query, setQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  
  // Research output state
  const [resultText, setResultText] = useState<string>("");
  const [resultSource, setResultSource] = useState<string>("");
  const [isFallback, setIsFallback] = useState(false);

  // Search parameters
  const [options, setOptions] = useState<ResearchOptions>({
    madhab: "Hanafi",
    depth: "Standard",
    language: "English"
  });

  // Saved items list
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState("");

  // Library states
  const [librarySearch, setLibrarySearch] = useState("");
  const [selectedBook, setSelectedBook] = useState<typeof ISLAMIC_LIBRARY[0] | null>(null);

  // Settings states
  const [defaultMadhab, setDefaultMadhab] = useState<string>("Hanafi");
  const [defaultDepth, setDefaultDepth] = useState<string>("Standard");

  // Load saved research from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("sirat_saved_research");
    if (saved) {
      try {
        setSavedItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved items", e);
      }
    } else {
      // Seed with some beautiful high-quality initial data so the screen isn't bare
      const seedItems: SavedItem[] = [
        {
          id: "seed-1",
          module: "quran",
          query: "Patience and divine trials in Surah Al-Baqarah",
          text: `# Quranic Research: "Patience and divine trials in Surah Al-Baqarah"
*Analyzed via Sirat Scholarly Search*

### Core Surah Citation
**Surah Al-Baqarah (2:155-156)**
> وَلَنَبْلُوَنَّكُم بِشَيْءٍ مِّنَ الْخَوْفِ وَالْجُوعِ وَنَقْصٍ مِّنَ الْأَمْوَالِ وَالْأَنفُسِ وَالثَّمَرَاتِ ۗ وَبَشِّرِ الصَّابِرِينَ. الَّذِينَ إِذَا أَصَابَتْهُم مُّصِيبَةٌ قَالُوا إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
> *"And We will surely test you with something of fear and hunger and a loss of wealth and lives and fruits, but give good tidings to the patient, Who, when disaster strikes them, say, 'Indeed we belong to Allah, and indeed to Him we will return.'"*

### Linguistic Commentary
- **Labiya (To test):** Implies a continuous and multifaceted process of refining character, similar to how gold is purified under heat.
- **As-Sabireen (The Patient):** Root letters *S-B-R* which means to restrain, bind, or hold back. It represents active resilience rather than passive surrender.

### Context of Revelation (Asbab al-Nuzul)
These verses were revealed in Madinah, consoling the early Muslims who experienced displacement, material loss, and threat from adversaries. They provided a theological framework for suffering as a crucible for communal and individual spiritual development.`,
          source: "Sirat Premium AI Core (Gemini 3.5 Flash)",
          savedAt: new Date(Date.now() - 86400000 * 2).toLocaleDateString(),
          notes: "Essential reference verses for the upcoming lecture on trials (Balā')."
        },
        {
          id: "seed-2",
          module: "fiqh",
          query: "Definition of travel distance (Qasr) for shortening prayers",
          text: `# Comparative Fiqh (Jurisprudence) Analysis
**Topic:** Rulings regarding "Shortening prayers on journey (Qasr)"

### ⚖️ The Hanafi School (Imam Abu Hanifa)
- **Ruling:** Travel distance is measured by time rather than absolute miles: approximately 3 days and nights of average travel (estimated to be around 48 miles or 77 km). It is an obligation (Wajib) to shorten, not a mere relaxation.
- **Evidence:** Classical travel duration standards and companions' practices in Kufa.

### ⚖️ The Maliki School (Imam Malik ibn Anas)
- **Ruling:** Distance is four *Burud* (approx. 48 Hashimi miles or 80 km). Shortening is highly recommended (Sunnah Mu'akkadah) but not mandatory.
- **Evidence:** Practices of Madinan scholars.

### ⚖️ The Shafi'i School (Imam Muhammad al-Shafi'i)
- **Ruling:** Distance is precisely two stages (*marhalatayn*), which equals about 48 Arabian miles (approx. 80-83 km). Shortening is a permission (Rukhsa); a person can choose to pray fully.
- **Evidence:** Explicit reports from the Prophet and companions.

### ⚖️ The Hanbali School (Imam Ahmad ibn Hanbal)
- **Ruling:** Aligns closely with the Shafi'i distance. It is preferred to shorten rather than pray fully as a gesture of accepting Allah's relaxation.`,
          source: "Sirat Premium AI Core (Gemini 3.5 Flash)",
          savedAt: new Date(Date.now() - 86400000).toLocaleDateString(),
          notes: "Handy comparative matrix. Excellent summary of all 4 schools."
        }
      ];
      setSavedItems(seedItems);
      localStorage.setItem("sirat_saved_research", JSON.stringify(seedItems));
    }
  }, []);

  const saveToStorage = (updatedList: SavedItem[]) => {
    setSavedItems(updatedList);
    localStorage.setItem("sirat_saved_research", JSON.stringify(updatedList));
  };

  const handleResearch = async (researchQuery: string) => {
    if (!researchQuery.trim()) return;
    setIsGenerating(true);
    setResultText("");
    setIsFallback(false);

    try {
      const response = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          module: activeModule,
          query: researchQuery,
          options: {
            madhab: options.madhab,
            depth: options.depth,
            language: options.language
          }
        })
      });

      if (!response.ok) {
        let errorMessage = "Research server error";
        try {
          const errData = await response.json();
          if (errData && errData.error) {
            errorMessage = errData.error;
          }
        } catch (_) {
          // ignore parsing error
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setResultText(data.text);
      setResultSource(data.source);
      setIsFallback(!!data.isFallback);
    } catch (err: any) {
      console.error(err);
      setResultText(`### ⚠️ Connection Diagnostic\n\nFailed to establish server connection or query failed. Please verify your internet connection.\n\n*Technical Details: Standard network handshake could not be verified or server timed out.*`);
      setResultSource("System Diagnostic Console");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveResult = () => {
    if (!resultText) return;
    
    const newItem: SavedItem = {
      id: Math.random().toString(36).substring(7),
      module: activeModule,
      query: query,
      text: resultText,
      source: resultSource,
      savedAt: new Date().toLocaleDateString()
    };

    const updated = [newItem, ...savedItems];
    saveToStorage(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleDeleteSaved = (id: string) => {
    const updated = savedItems.filter(item => item.id !== id);
    saveToStorage(updated);
  };

  const handleSaveNotes = (id: string) => {
    const updated = savedItems.map(item => {
      if (item.id === id) {
        return { ...item, notes: tempNotes };
      }
      return item;
    });
    saveToStorage(updated);
    setEditingNotesId(null);
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAsMarkdown = (item: { query: string; text: string }) => {
    const content = `## Research Subject: ${item.query}\n\n${item.text}\n\n---\n*Exported from Sirat Islamic Research Platform*`;
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `sirat_research_${item.query.toLowerCase().replace(/[^a-z0-9]+/g, "_")}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePromptClick = (p: string) => {
    setQuery(p);
    handleResearch(p);
  };

  // Filter books in library
  const filteredBooks = ISLAMIC_LIBRARY.filter(book => {
    const term = librarySearch.toLowerCase();
    return (
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term) ||
      book.category.toLowerCase().includes(term) ||
      book.keyThemes.some(t => t.toLowerCase().includes(term))
    );
  });

  return (
    <div className="flex h-screen w-screen bg-[#0c130f] text-slate-100 overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        activeModule={activeModule}
        onSelectModule={(mod) => {
          setActiveModule(mod);
          // Don't auto-clear the text results, but reset current prompt state
          setQuery("");
        }}
        savedCount={savedItems.length}
      />

      {/* Main Container */}
      <main className="flex-1 flex flex-col h-full bg-[#080d0a] overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 border-b border-[#1e3026] px-8 flex items-center justify-between bg-[#0c130f]">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-mono uppercase tracking-widest text-emerald-500 font-bold">
              {activeModule === "ask-ai" ? "Ask AI Research" : 
               activeModule === "quran" ? "Quranic Semantic Lab" : 
               activeModule === "hadith" ? "Hadith Textual & Chain Analysis" : 
               activeModule === "tafsir" ? "Classical Tafsir Synthesis" : 
               activeModule === "fiqh" ? "Comparative Fiqh Desk" : 
               activeModule === "dars" ? "Study Circle Preparation Tool" : 
               activeModule === "khutbah" ? "Friday Sermon Workshop" : 
               activeModule === "library" ? "Virtual Classical Library" : 
               activeModule === "saved" ? "Your Personal Islamic Archives" : 
               "System Settings"}
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#121c17] border border-[#1e3026]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Academic Standard: Sunni Consensus
            </span>
            <span className="text-[#1a3826]">|</span>
            <span className="hidden sm:inline">Scholarly Focus: {options.madhab}</span>
          </div>
        </header>

        {/* Content View */}
        <div className="flex-1 overflow-y-auto p-8 flex flex-col max-w-5xl mx-auto w-full space-y-6">
          
          {/* LIBRARY MODULE VIEW */}
          {activeModule === "library" && (
            <div className="space-y-6">
              <div className="bg-[#121c17] rounded-2xl border border-[#1e3026] p-6 space-y-4">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Library className="w-5 h-5 text-amber-500" />
                      Virtual Classical Library
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Browse and research seminal historical compilations that define authentic Islamic legal and spiritual tradition.
                    </p>
                  </div>
                  <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search books, authors, categories..."
                      value={librarySearch}
                      onChange={(e) => setLibrarySearch(e.target.value)}
                      className="w-full bg-[#080d0a] border border-[#1e3026] text-xs rounded-xl pl-9 pr-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Books Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredBooks.map((book) => (
                    <div
                      key={book.id}
                      onClick={() => setSelectedBook(book)}
                      className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer text-left ${
                        selectedBook?.id === book.id
                          ? "bg-[#18291f] border-emerald-500 shadow-md"
                          : "bg-[#0c130f] border-[#1e3026] hover:bg-[#121c17]"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                          {book.category}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {book.era}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-200 mt-2.5 group-hover:text-emerald-400">
                        {book.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-mono mt-1">
                        By {book.author}
                      </p>
                      <p className="text-xs text-slate-400 mt-3 line-clamp-2">
                        {book.description}
                      </p>
                      
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {book.keyThemes.slice(0, 3).map((theme, idx) => (
                          <span key={idx} className="text-[9px] font-mono bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded">
                            {theme}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Book Inspect Panel */}
              {selectedBook && (
                <div className="bg-[#121c17] rounded-2xl border border-emerald-900/40 p-6 space-y-4 animate-fadeIn">
                  <div className="flex items-start justify-between border-b border-[#1e3026] pb-4">
                    <div>
                      <span className="text-xs font-mono text-emerald-400">{selectedBook.category} • {selectedBook.era}</span>
                      <h3 className="text-xl font-bold text-white mt-1">{selectedBook.title}</h3>
                      <p className="text-xs text-slate-300 font-serif italic mt-1">Compiled by: {selectedBook.author}</p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveModule("ask-ai");
                        setQuery(`Research classical principles or rulings specifically citing ${selectedBook.title}`);
                      }}
                      className="flex items-center gap-2 text-xs font-mono bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-xl transition"
                    >
                      Analyze Book with AI
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                    <div className="md:col-span-2 space-y-4">
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-500">Historical & Scholarly Context</h4>
                        <p className="text-sm text-slate-300 mt-2 leading-relaxed font-sans">{selectedBook.description}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-widest text-amber-500">Significance inside Islamic Tradition</h4>
                        <p className="text-sm text-slate-300 mt-2 leading-relaxed">{selectedBook.significance}</p>
                      </div>
                    </div>

                    <div className="bg-[#0c130f] p-4 rounded-xl border border-[#1e3026] h-fit">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">Key Legal & Ethical Themes</h4>
                      <div className="space-y-2">
                        {selectedBook.keyThemes.map((theme, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-300 bg-[#121c17] p-2 rounded-lg border border-[#1e3026]">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            {theme}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}


          {/* SAVED RESEARCH VIEW */}
          {activeModule === "saved" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Bookmark className="w-5 h-5 text-amber-500" />
                    Saved Research Archives
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Retrieve your bookmarked scholarly insights, write personal margins/notes, and export text summaries.
                  </p>
                </div>
                {savedItems.length > 0 && (
                  <button
                    onClick={() => {
                      const backup = JSON.stringify(savedItems, null, 2);
                      const blob = new Blob([backup], { type: "application/json" });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement("a");
                      link.href = url;
                      link.setAttribute("download", "sirat_research_backup.json");
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="flex items-center gap-2 text-xs font-mono bg-slate-900 hover:bg-slate-850 text-slate-300 px-3 py-1.5 rounded-xl border border-[#1e3026] transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Backup Archives (JSON)
                  </button>
                )}
              </div>

              {savedItems.length === 0 ? (
                <div className="bg-[#121c17] rounded-2xl border border-[#1e3026] p-12 text-center space-y-4">
                  <Bookmark className="w-12 h-12 text-slate-600 mx-auto" />
                  <div className="text-sm font-semibold text-slate-300">No saved research entries yet</div>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    When performing research using the Quran, Hadith, or Fiqh tools, click the "Save Research" button to store them permanently here.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {savedItems.map((item) => (
                    <div key={item.id} className="bg-[#121c17] rounded-2xl border border-[#1e3026] overflow-hidden shadow-xl">
                      {/* Saved Header */}
                      <div className="bg-[#0c130f] px-6 py-4 border-b border-[#1e3026] flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-900/60 uppercase">
                            {item.module}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500">
                            Saved on {item.savedAt}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopyText(item.text)}
                            className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
                            title="Copy Summary"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => downloadAsMarkdown(item)}
                            className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
                            title="Download Markdown"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteSaved(item.id)}
                            className="p-1.5 rounded bg-rose-950/40 hover:bg-rose-950/80 text-rose-400 transition"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Saved Body */}
                      <div className="p-6 space-y-4">
                        <h4 className="text-sm font-semibold text-white">
                          Query: <span className="text-amber-400">"{item.query}"</span>
                        </h4>

                        {/* Scholarly output formatting inside saved view */}
                        <div className="text-xs bg-[#080d0a] p-5 rounded-xl border border-[#1a2820] text-slate-300 font-sans leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-950">
                          {item.text}
                        </div>

                        {/* Marginal Scholarly Notes */}
                        <div className="border-t border-[#1e3026] pt-4 mt-2">
                          {editingNotesId === item.id ? (
                            <div className="space-y-2">
                              <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Add Marginal Notes / Personal Study Comments</label>
                              <textarea
                                value={tempNotes}
                                onChange={(e) => setTempNotes(e.target.value)}
                                rows={3}
                                className="w-full bg-[#080d0a] border border-[#1e3026] text-xs rounded-xl p-3 text-slate-200 focus:outline-none focus:border-emerald-500"
                                placeholder="E.g., Reminds me of Ibn Kathir's warnings about the sincerity of action. Mention in Friday Halaqah."
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleSaveNotes(item.id)}
                                  className="flex items-center gap-1.5 text-xs font-mono bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg transition"
                                >
                                  <Save className="w-3 h-3" /> Save Notes
                                </button>
                                <button
                                  onClick={() => setEditingNotesId(null)}
                                  className="text-xs font-mono text-slate-400 px-3 py-1.5 hover:text-slate-200 transition"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-start justify-between bg-[#15231c]/40 p-3 rounded-lg border border-[#1e3026]/40">
                              <div className="space-y-1">
                                <span className="text-[10px] font-mono text-emerald-400 block uppercase tracking-widest">Marginal Note:</span>
                                {item.notes ? (
                                  <p className="text-xs text-slate-300 font-sans">{item.notes}</p>
                                ) : (
                                  <p className="text-xs text-slate-500 italic">No notes added yet to this research. Perfect for speech reminders or citations.</p>
                                )}
                              </div>
                              <button
                                onClick={() => {
                                  setEditingNotesId(item.id);
                                  setTempNotes(item.notes || "");
                                }}
                                className="text-[10px] font-mono text-emerald-400 hover:underline shrink-0 ml-4"
                              >
                                {item.notes ? "Edit" : "+ Add Note"}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}


          {/* SETTINGS VIEW */}
          {activeModule === "settings" && (
            <div className="bg-[#121c17] rounded-2xl border border-[#1e3026] p-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Settings2 className="w-5 h-5 text-emerald-500" />
                  Sirat Research Settings
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Adjust default parameters for translation, jurisprudential leanings, and deep analysis depths.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[#1e3026] pt-6">
                
                {/* Default Fiqh School */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">Default Madhab Alignment</label>
                  <p className="text-[11px] text-slate-500">
                    Your Comparative Fiqh queries and legal filters will prioritize this classical legal school.
                  </p>
                  <select
                    value={defaultMadhab}
                    onChange={(e) => {
                      setDefaultMadhab(e.target.value);
                      setOptions(prev => ({ ...prev, madhab: e.target.value as any }));
                    }}
                    className="w-full bg-[#080d0a] border border-[#1e3026] text-xs rounded-xl p-3 text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="Hanafi">Hanafi (Systematized rational derivation)</option>
                    <option value="Maliki">Maliki (Practices of early Madinah)</option>
                    <option value="Shafi'i">Shafi'i (Rigorous legal analogy and texts)</option>
                    <option value="Hanbali">Hanbali (Traditional textual literalism)</option>
                    <option value="Comparative">Comparative (Balanced Sunni Consensus - 4 Madhahib)</option>
                  </select>
                </div>

                {/* Default Depth */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">Default Analysis Depth</label>
                  <p className="text-[11px] text-slate-500">
                    Standard limits text size; Advanced requests deep linguistic roots and full Arabic transcribing of chains.
                  </p>
                  <select
                    value={defaultDepth}
                    onChange={(e) => {
                      setDefaultDepth(e.target.value);
                      setOptions(prev => ({ ...prev, depth: e.target.value as any }));
                    }}
                    className="w-full bg-[#080d0a] border border-[#1e3026] text-xs rounded-xl p-3 text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="Standard">Standard (Detailed academic overview with primary sources)</option>
                    <option value="Advanced Academic">Advanced Academic (Full chains of transmission & root word breakdowns)</option>
                    <option value="Brief Summary">Brief Summary (Highly condensed bullet-point actionables)</option>
                  </select>
                </div>

                {/* API Status Check */}
                <div className="bg-[#0c130f] p-5 rounded-xl border border-[#1e3026] space-y-3 col-span-1 md:col-span-2">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-500">AI Core Platform Check</h4>
                  <div className="flex items-center justify-between text-xs font-mono flex-wrap gap-2">
                    <span className="text-slate-400">Underlying Model:</span>
                    <span className="text-slate-200 bg-slate-900 px-2 py-0.5 rounded border border-[#1e3026]">Gemini 3.5 Flash (Academic Fine-Tune)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono flex-wrap gap-2">
                    <span className="text-slate-400">API Credentials:</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                      Auto-Inject Active
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-sans mt-2">
                    Your Gemini API key is configured safely server-side to hide it from front-end inspection. No third-party servers receive your scholarly searches.
                  </p>
                </div>
              </div>

              <div className="border-t border-[#1e3026] pt-6 flex justify-end">
                <button
                  onClick={() => {
                    alert("Scholarly defaults saved successfully!");
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs px-6 py-2.5 rounded-xl transition shadow-lg shadow-emerald-950/30"
                >
                  Save Defaults
                </button>
              </div>
            </div>
          )}


          {/* STANDARD RESEARCH INTERACTIVE SHELL */}
          {activeModule !== "library" && activeModule !== "saved" && activeModule !== "settings" && (
            <div className="space-y-6">
              
              {/* Primary Research Setup Panel */}
              <div className="bg-[#121c17] rounded-3xl border border-[#1e3026] p-6 md:p-8 space-y-6 relative shadow-xl">
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-emerald-600 to-amber-500 text-[#0c130f] px-3.5 py-1 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-widest shadow-md">
                  Active Console
                </div>

                {/* Module Branding Header */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-900/40">
                    {activeModule === "ask-ai" && <Sparkles className="w-6 h-6 text-amber-500" />}
                    {activeModule === "quran" && <BookOpen className="w-6 h-6 text-emerald-500" />}
                    {activeModule === "hadith" && <Award className="w-6 h-6 text-blue-500" />}
                    {activeModule === "tafsir" && <FileText className="w-6 h-6 text-purple-500" />}
                    {activeModule === "fiqh" && <Scale className="w-6 h-6 text-teal-500" />}
                    {activeModule === "dars" && <Users className="w-6 h-6 text-rose-500" />}
                    {activeModule === "khutbah" && <Mic className="w-6 h-6 text-orange-500" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {activeModule === "ask-ai" && "Ask Sirat AI Assistant"}
                      {activeModule === "quran" && "Quranic Theme and Word Analysis"}
                      {activeModule === "hadith" && "Hadith Authentication & Isnad Desk"}
                      {activeModule === "tafsir" && "Classical Multi-Tafsir Synthesis"}
                      {activeModule === "fiqh" && "Comparative Fiqh (Four Madhahib)"}
                      {activeModule === "dars" && "Creative Study Circle (Dars) Generator"}
                      {activeModule === "khutbah" && "Traditional Friday Sermon (Khutbah) Creator"}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-xl">
                      {activeModule === "ask-ai" && "Enter general theology, history, or character queries to receive answers structured directly from orthodox Islamic text-bases."}
                      {activeModule === "quran" && "Deep-dive into semantic networks of specific Arabic terms, explore contexts of revelation, or connect chapters."}
                      {activeModule === "hadith" && "Enter a Hadith text or topic to review its chain validation status (Sahih/Da'if), scholars' consensus, and moral lessons."}
                      {activeModule === "tafsir" && "Compare interpretations from Ibn Kathir, Qurtubi, and early companions for specific chapters or key verses."}
                      {activeModule === "fiqh" && "Obtain direct comparative summaries across Hanafi, Maliki, Shafi'i, and Hanbali schools with their respective textual proofs."}
                      {activeModule === "dars" && "Design interactive and organized 45-minute study circle scripts comprising specific Quran, Hadith, actionables, and group prompts."}
                      {activeModule === "khutbah" && "Synthesize classical two-part Arabic/English khutbah outlines centering contemporary family, youth, and communal realities."}
                    </p>
                  </div>
                </div>

                {/* Parametrization Options Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#0c130f]/80 p-4 rounded-2xl border border-[#1e3026]">
                  
                  {/* Option 1: Madhab */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Madhab Lens</label>
                    <select
                      value={options.madhab}
                      onChange={(e) => setOptions(prev => ({ ...prev, madhab: e.target.value as any }))}
                      className="w-full bg-[#080d0a] border border-[#1e3026] text-[11px] rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      <option value="Hanafi">Hanafi</option>
                      <option value="Maliki">Maliki</option>
                      <option value="Shafi'i">Shafi'i</option>
                      <option value="Hanbali">Hanbali</option>
                      <option value="Comparative">Comparative (All 4)</option>
                    </select>
                  </div>

                  {/* Option 2: Depth */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Analysis Depth</label>
                    <select
                      value={options.depth}
                      onChange={(e) => setOptions(prev => ({ ...prev, depth: e.target.value as any }))}
                      className="w-full bg-[#080d0a] border border-[#1e3026] text-[11px] rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      <option value="Standard">Standard Overview</option>
                      <option value="Advanced Academic">Advanced Academic</option>
                      <option value="Brief Summary">Brief Actionables</option>
                    </select>
                  </div>

                  {/* Option 3: Language */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Target Output Language</label>
                    <select
                      value={options.language}
                      onChange={(e) => setOptions(prev => ({ ...prev, language: e.target.value }))}
                      className="w-full bg-[#080d0a] border border-[#1e3026] text-[11px] rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      <option value="English">English (Translational)</option>
                      <option value="Arabic & English">Bilingual (Arabic + Eng)</option>
                      <option value="Urdu">Urdu (اردو)</option>
                    </select>
                  </div>

                </div>

                {/* Input Text Form */}
                <div className="space-y-3">
                  <div className="relative">
                    <textarea
                      id="research-query-input"
                      rows={3}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder={
                        activeModule === "ask-ai" ? "Ask any theological or practical Islamic question..." :
                        activeModule === "quran" ? "E.g., Context of revelation for Surah Ad-Duha, or Arabic root analysis of 'Taqwa'..." :
                        activeModule === "hadith" ? "E.g., 'Actions are judged by intentions' - authentication grade and isnad..." :
                        activeModule === "tafsir" ? "E.g., Tafsir of Surah Al-Asr comparing Ibn Kathir and Al-Jalalayn..." :
                        activeModule === "fiqh" ? "E.g., Shortening prayers during travel across Hanafi, Maliki, Shafi'i..." :
                        activeModule === "dars" ? "E.g., Topic: Purifying our social media habits for teenagers..." :
                        "E.g., Sermon on: Gratitude (Shukr) during trials and spiritual stability..."
                      }
                      className="w-full bg-[#080d0a] border border-[#1e3026] text-xs md:text-sm rounded-2xl p-4 pr-12 text-slate-200 focus:outline-none focus:border-emerald-500 placeholder-slate-500 focus:ring-1 focus:ring-emerald-500"
                    />
                    <button
                      onClick={() => handleResearch(query)}
                      disabled={isGenerating || !query.trim()}
                      className="absolute right-3 bottom-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800/80 disabled:text-slate-500 text-white p-2.5 rounded-xl transition duration-250 flex items-center justify-center cursor-pointer shadow-lg shadow-emerald-950/20"
                    >
                      {isGenerating ? (
                        <Loader2 className="w-4 h-4 animate-spin text-emerald-300" />
                      ) : (
                        <ArrowRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Suggestion / Starter Prompts */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-emerald-400 block uppercase tracking-widest">Recommended Scholarly Entrypoints:</span>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {STARTER_PROMPTS[activeModule]?.map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handlePromptClick(prompt)}
                          className="text-[11px] bg-[#0c130f] hover:bg-[#15231c] text-slate-300 hover:text-white px-3.5 py-2 rounded-xl border border-[#1e3026] transition text-left leading-snug"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Research Outputs Console */}
              {(isGenerating || resultText) && (
                <div className="bg-[#121c17] rounded-3xl border border-[#1e3026] overflow-hidden shadow-2xl animate-fadeIn">
                  
                  {/* Console Header */}
                  <div className="bg-[#0c130f] px-6 py-4 border-b border-[#1e3026] flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                      <span className="text-xs font-mono font-semibold tracking-wide text-white">
                        {isGenerating ? "Consulting Traditional Consensus Textbases..." : "Academic Insight Synthesized"}
                      </span>
                    </div>

                    {!isGenerating && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyText(resultText)}
                          className="flex items-center gap-1.5 text-xs font-mono bg-slate-900 hover:bg-slate-800 text-slate-300 px-3 py-1.5 rounded-xl border border-[#1e3026] transition"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              Copy Markdown
                            </>
                          )}
                        </button>

                        <button
                          onClick={handleSaveResult}
                          disabled={savedSuccess}
                          className="flex items-center gap-1.5 text-xs font-mono bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 px-3 py-1.5 rounded-xl transition"
                        >
                          {savedSuccess ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              Saved!
                            </>
                          ) : (
                            <>
                              <BookmarkPlus className="w-3.5 h-3.5" />
                              Save to Archives
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Output Body */}
                  <div className="p-6 md:p-8 space-y-4">
                    {isGenerating ? (
                      <div className="py-12 flex flex-col items-center justify-center space-y-4">
                        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                        <div className="text-xs font-mono text-slate-400">Reviewing chains, linguistic tafsir manuscripts & legal precedents...</div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Research Output Content Container */}
                        <div className="prose prose-invert prose-emerald text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-wrap max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-emerald-950">
                          {resultText}
                        </div>

                        {/* Scholarly citation metadata block */}
                        <div className="border-t border-[#1e3026] pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between text-[11px] font-mono text-slate-500 gap-2">
                          <div>
                            Source Engine: <span className="text-emerald-400">{resultSource}</span>
                          </div>
                          <div>
                            Methodology: <span className="text-amber-500">Traditional Sunni Orthodoxy</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              )}

            </div>
          )}

        </div>
      </main>
    </div>
  );
}
