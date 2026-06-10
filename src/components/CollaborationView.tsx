import React, { useState } from "react";
import { TeamMemberPresence, AppScreen } from "../types";
import { 
  Users, 
  Send,
  MessageSquare,
  AtSign,
  UserCheck,
  CheckCircle2
} from "lucide-react";

interface CollaborationViewProps {
  onSendMessage: (message: string) => void;
  mentions: Array<{ id: string; user: string; text: string; time: string; filter: string }>;
  teamPresence: TeamMemberPresence[];
  setScreen: (screen: AppScreen) => void;
}

export default function CollaborationView({
  onSendMessage,
  mentions,
  teamPresence,
  setScreen
}: CollaborationViewProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [composeText, setComposeText] = useState("");

  const filters = ["All", "Mentions", "Assignments", "Updates"];

  const handleComposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeText.trim()) return;
    onSendMessage(composeText.trim());
    setComposeText("");
  };

  const filteredMentions = mentions.filter((item) => {
    if (selectedFilter === "All") return true;
    return item.filter.toLowerCase() === selectedFilter.toLowerCase();
  });

  return (
    <div className="flex-grow p-8 space-y-6 overflow-y-auto" id="collaboration-view">
      
      {/* Filtering control row */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-1.5 uppercase tracking-wider text-[10px] font-bold">
          {filters.map((fil) => (
            <button
              key={fil}
              onClick={() => setSelectedFilter(fil)}
              className={`px-4 py-2 rounded-lg transition-all text-xs font-bold leading-none cursor-pointer ${
                selectedFilter === fil
                  ? "bg-slate-800 text-white border border-[#4F6EF7]/20 shadow-sm"
                  : "text-slate-400 hover:text-slate-100"
              }`}
            >
              {fil}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-500 font-mono hidden md:inline">Channel: #acme-ops-room</span>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Composer and Mentions Feed */}
        <div className="lg:col-span-8 flex flex-col space-y-5">
          {/* Status Update Composer */}
          <div className="bg-[#1630A8] p-5.5 rounded-xl border border-slate-800 shadow-sm space-y-3">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Public Status Update Composer</span>
            <form onSubmit={handleComposeSubmit} className="flex gap-2.5">
              <input
                type="text"
                value={composeText}
                onChange={(e) => setComposeText(e.target.value)}
                placeholder="Share a diagnostics result, pipeline review note, or check-off item update with your team..."
                id="collab-status-composer"
                className="flex-1 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-slate-200 placeholder-slate-550 text-xs outline-none hover:border-slate-700 focus:border-[#4F6EF7]"
              />
              <button
                type="submit"
                id="collab-post-update-btn"
                className="px-4.5 bg-[#4F6EF7] hover:bg-indigo-400 text-slate-950 font-extrabold text-xs rounded-lg transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                <Send size={11} />
                <span>Post Update</span>
              </button>
            </form>
          </div>

          {/* Mentions / Activity Feed */}
          <div className="space-y-3.5">
            {filteredMentions.map((item) => (
              <div 
                key={item.id}
                className="bg-[#1630A8] p-4.5 rounded-xl border border-slate-800 shadow-sm flex items-start space-x-3.5 hover:border-slate-700 transition-[#1A2260]"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold flex items-center justify-center shrink-0 self-start text-xs font-mono">
                  {item.user.replace("@", "").substring(0, 2).toUpperCase()}
                </div>
                
                <div className="flex-grow space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white font-mono">{item.user}</span>
                    <span className="text-[9px] text-slate-500 font-mono font-bold align-middle">{item.time}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {item.text}
                  </p>
                  
                  <div className="flex items-center space-x-2 pt-1">
                    <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border ${
                      item.filter === "Mentions" ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/15" :
                      item.filter === "Assignments" ? "bg-amber-500/10 text-amber-400 border-amber-500/15" :
                      "bg-indigo-500/10 text-indigo-400 border-indigo-500/15"
                    }`}>
                      {item.filter}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Team Presence and Shared action item tracking */}
        <div className="lg:col-span-4 space-y-5">
          {/* Team presence list */}
          <div className="bg-[#1630A8] p-5.5 rounded-xl border border-slate-800 shadow-sm">
            <h3 className="text-xs font-bold text-white mb-4 uppercase tracking-widest border-b border-slate-850 pb-2.5">
              Active Team Presence
            </h3>

            <div className="space-y-3.5">
              {teamPresence.map((member) => (
                <div key={member.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="relative">
                      <div className="w-8.5 h-8.5 rounded-full bg-slate-850 text-slate-300 flex items-center justify-center text-xs font-bold hover:opacity-90 cursor-pointer select-none font-mono">
                        {member.avatar}
                      </div>
                      <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-[#1A2260] ${
                        member.status === "Online" ? "bg-emerald-400" :
                        member.status === "Away" ? "bg-amber-400" : "bg-slate-600"
                      }`} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-200 block">{member.name}</span>
                      <span className="text-[9px] text-slate-500 font-medium font-mono">{member.status}</span>
                    </div>
                  </div>

                  <span className={`text-[10px] ${member.status === "Online" ? "text-emerald-400 font-bold" : "text-slate-550"}`}>
                    {member.status === "Online" ? "● Active" : "Offline"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Core action tracker checkoffs cross-incident */}
          <div className="bg-[#1630A8] p-5.5 rounded-xl border border-slate-800 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-slate-850 pb-2.5">
              Cross-Incident Action
            </h3>

            <div className="space-y-3">
              {[
                { task: "Prepare rollback communication", checked: true },
                { task: "Validate API Gateway metrics stability", checked: false },
                { task: "Export incident INC-2041 summary logs", checked: false }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-1">
                  <CheckCircle2 size={13} className={item.checked ? "text-emerald-400" : "text-slate-600"} />
                  <span className={`text-xs ${item.checked ? "line-through text-slate-500 font-medium" : "text-slate-350"}`}>
                    {item.task}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

