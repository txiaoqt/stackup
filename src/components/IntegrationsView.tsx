import React, { useState } from "react";
import { IntegrationTool, AppScreen } from "../types";
import { Search, ToggleLeft, ToggleRight, CheckSquare, Sparkles } from "lucide-react";

interface IntegrationsViewProps {
  initialTools: IntegrationTool[];
  onToggleToolConnection: (id: string, connected: boolean) => void;
  setScreen: (screen: AppScreen) => void;
}

export default function IntegrationsView({
  initialTools,
  onToggleToolConnection,
  setScreen
}: IntegrationsViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Code Repositories", "CI/CD Pipelines", "Communication"];

  // Filter tools based on search query and category
  const filteredTools = initialTools.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const connectedCount = initialTools.filter(t => t.connected).length;

  return (
    <div className="flex-grow p-8 space-y-6 overflow-y-auto" id="integrations-view">
      
      {/* Search and Category Filter Options */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-1.5 overflow-x-auto custom-scrollbar uppercase tracking-wider text-[10px] font-bold">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-lg transition-all text-xs font-bold leading-none cursor-pointer ${
                selectedCategory === cat
                  ? "bg-slate-800 text-white border border-[#4F6EF7]/20"
                  : "text-slate-400 hover:text-slate-100"
              }`}
            >
              {cat.replace("Pipelines", "")}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search integrations..."
            id="integrations-search-query"
            className="w-full bg-slate-900 border border-slate-800 pl-9.5 pr-4 py-2 text-xs rounded-xl text-slate-100 outline-none hover:border-slate-705 focus:border-[#4F6EF7]"
          />
          <Search size={13} className="absolute left-3.5 top-2.5 text-slate-500" />
        </div>
      </div>

      {/* Connected Integrations Summary Banner Strip */}
      <div className="bg-[#1630A8] px-5.5 py-4 rounded-xl border border-slate-800/80 shadow-sm flex items-center justify-between">
        <span className="text-xs text-slate-300 font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active Connections: <strong className="text-white font-bold">{connectedCount} integrations</strong> are connected to Acme team.</span>
        </span>
        <span className="text-[10px] text-slate-500 font-mono hidden sm:inline uppercase">Control Plane Synchronized</span>
      </div>

      {/* Structured Grid List of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTools.map((tool) => (
          <div 
            key={tool.id}
            className={`p-5 rounded-xl bg-[#1630A8] border transition-all flex flex-col justify-between h-[180px] ${
              tool.connected ? "border-[#4F6EF7]/30 shadow-md shadow-indigo-500/5 hover:border-[#4F6EF7]/40" : "border-slate-800 hover:border-slate-700/80"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                {/* Simulated dynamic logo block */}
                <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-800 shadow text-xs font-mono font-extrabold text-[#4F6EF7]">
                  {tool.name.substring(0, 2).toUpperCase()}
                </div>

                <span className={`px-2 py-0.5 text-[9px] font-bold tracking-wider rounded uppercase ${
                  tool.connected ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-slate-900 text-slate-500 border border-slate-800/80"
                }`}>
                  {tool.connected ? "Connected" : "Not Linked"}
                </span>
              </div>

              <h4 className="text-xs font-extrabold text-slate-100 flex items-center gap-1.5">{tool.name}</h4>
              <p className="text-xs text-slate-400 leading-normal mt-1 max-w-xs">{tool.description}</p>
            </div>

            <div className="flex justify-between items-center border-t border-slate-850 pt-2 text-[10px] text-slate-400 font-medium">
              <span className="font-mono text-[9px] uppercase tracking-wide">{tool.category}</span>
              
              {/* Connect / Disconnect trigger toggle */}
              <button
                onClick={() => onToggleToolConnection(tool.id, !tool.connected)}
                className="text-slate-400 hover:text-white flex items-center gap-1 transition-all cursor-pointer font-bold"
              >
                {tool.connected ? (
                  <ToggleRight size={22} className="text-[#4F6EF7]" />
                ) : (
                  <ToggleLeft size={22} className="text-slate-500" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

