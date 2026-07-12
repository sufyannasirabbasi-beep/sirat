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
  BookMarked
} from "lucide-react";
import { ActiveModule } from "../types";

interface SidebarProps {
  activeModule: ActiveModule;
  onSelectModule: (module: ActiveModule) => void;
  savedCount: number;
}

export default function Sidebar({
  activeModule,
  onSelectModule,
  savedCount
}: SidebarProps) {
  const menuItems = [
    {
      id: "ask-ai" as ActiveModule,
      label: "Ask AI",
      icon: Sparkles,
      description: "Islamic Scholarly Assistant",
      color: "text-amber-500 bg-amber-500/10"
    },
    {
      id: "quran" as ActiveModule,
      label: "Quran Research",
      icon: BookOpen,
      description: "Semantic & thematic analysis",
      color: "text-emerald-500 bg-emerald-500/10"
    },
    {
      id: "hadith" as ActiveModule,
      label: "Hadith Research",
      icon: Award,
      description: "Verification & chain study",
      color: "text-blue-500 bg-blue-500/10"
    },
    {
      id: "tafsir" as ActiveModule,
      label: "Tafsir Research",
      icon: FileText,
      description: "Classical Quranic commentary",
      color: "text-purple-500 bg-purple-500/10"
    },
    {
      id: "fiqh" as ActiveModule,
      label: "Comparative Fiqh",
      icon: Scale,
      description: "Four Sunni legal schools",
      color: "text-teal-500 bg-teal-500/10"
    },
    {
      id: "dars" as ActiveModule,
      label: "Dars Generator",
      icon: Users,
      description: "Structured lesson outlines",
      color: "text-rose-500 bg-rose-500/10"
    },
    {
      id: "khutbah" as ActiveModule,
      label: "Khutbah Generator",
      icon: Mic,
      description: "Formal Friday sermons",
      color: "text-orange-500 bg-orange-500/10"
    },
    {
      id: "library" as ActiveModule,
      label: "Islamic Library",
      icon: Library,
      description: "Curated classical references",
      color: "text-indigo-500 bg-indigo-500/10"
    },
    {
      id: "saved" as ActiveModule,
      label: "Saved Research",
      icon: Bookmark,
      description: "Bookmarks & personal notes",
      color: "text-pink-500 bg-pink-500/10",
      badge: savedCount > 0 ? savedCount : undefined
    },
    {
      id: "settings" as ActiveModule,
      label: "Settings",
      icon: Settings2,
      description: "Preferences & scholarly focus",
      color: "text-slate-500 bg-slate-500/10"
    }
  ];

  return (
    <aside className="w-80 bg-[#121c17] text-slate-200 border-r border-[#1e3026] flex flex-col h-full overflow-hidden">
      {/* Brand Header */}
      <div className="p-6 border-b border-[#1e3026] bg-[#0c130f]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-amber-500 flex items-center justify-center shadow-lg shadow-emerald-950/40">
            <BookMarked className="w-6 h-6 text-[#121c17] stroke-[2]" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-sans tracking-wide text-white leading-none">
              SIRAT
            </h1>
            <p className="text-[10px] font-mono tracking-widest text-emerald-400 mt-1 uppercase">
              Islamic AI Research
            </p>
          </div>
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 scrollbar-thin scrollbar-thumb-emerald-950">
        <p className="text-[10px] font-mono font-semibold text-emerald-500/50 uppercase tracking-widest px-3 mb-3">
          Research Modules
        </p>
        
        {menuItems.map((item) => {
          const isActive = activeModule === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              id={`sidebar-tab-${item.id}`}
              onClick={() => onSelectModule(item.id)}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 text-left group ${
                isActive
                  ? "bg-[#18291f] text-emerald-300 border-l-4 border-emerald-500 shadow-inner"
                  : "hover:bg-[#15231c] text-slate-400 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`p-2 rounded-lg transition-transform duration-200 ${
                    isActive ? "bg-emerald-500/15 text-emerald-400" : "bg-slate-800/20 text-slate-400 group-hover:scale-105"
                  }`}
                >
                  <Icon className="w-4 h-4 stroke-[2]" />
                </div>
                <div>
                  <div className={`text-xs font-semibold tracking-wide ${isActive ? "text-white" : "text-slate-300"}`}>
                    {item.label}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 leading-none">
                    {item.description}
                  </div>
                </div>
              </div>

              {item.badge !== undefined && (
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Details */}
      <div className="p-4 border-t border-[#1e3026] bg-[#0c130f]/60 text-center text-[10px] font-mono text-slate-500">
        <div>Prophetic Method & Authentic Sources</div>
        <div className="text-emerald-500/40 mt-1">Version 0.2 • Verified Academic Standard</div>
      </div>
    </aside>
  );
}
