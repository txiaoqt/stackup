import React, { useState } from "react";
import { Cpu, Send, ThumbsUp, ThumbsDown, Sparkles, MessageSquare, AlertCircle, ChevronRight, Check } from "lucide-react";
import { AppScreen } from "../types";

interface AIAssistantViewProps {
  onSendMessage: (msg: string) => void;
  aiChatHistory: Array<{ role: "user" | "model"; content: string }>;
  isGeneratingChat: boolean;
  onApplyRecommendation: (title: string) => void;
  setScreen: (screen: AppScreen) => void;
}

export default function AIAssistantView({
  onSendMessage,
  aiChatHistory,
  isGeneratingChat,
  onApplyRecommendation,
  setScreen
}: AIAssistantViewProps) {
  const [chatInput, setChatInput] = useState("");
  const [likedSuggestions, setLikedSuggestions] = useState<Record<string, "up" | "down" | null>>({});
  const [dismissedSuggestions, setDismissedSuggestions] = useState<Record<string, boolean>>({});
  const [appliedSuggestions, setAppliedSuggestions] = useState<Record<string, boolean>>({});

  const handleSendChatChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    onSendMessage(chatInput.trim());
    setChatInput("");
  };

  const handleFeedback = (id: string, dir: "up" | "down") => {
    setLikedSuggestions(prev => ({
      ...prev,
      [id]: prev[id] === dir ? null : dir
    }));
  };

  const handleDismiss = (id: string) => {
    setDismissedSuggestions(prev => ({ ...prev, [id]: true }));
  };

  const handleApply = (id: string, title: string) => {
    onApplyRecommendation(title);
    setAppliedSuggestions(prev => ({ ...prev, [id]: true }));
  };

  const defaultHypotheses = [
    { id: "hyp-1", cause: "Misconfigured timeout value in API Gateway", confidence: 86, text: "The v2.4.1 release modified proxy deadline timeouts to 5000ms. High resource load triggers abrupt gateway termination." },
    { id: "hyp-2", cause: "Database query connection pool saturation", confidence: 62, text: "Wait times for payment webhook callbacks exhaust connection availability groups." },
    { id: "hyp-3", cause: "Auth service dependency response delays", confidence: 48, text: "Token validations on gateway requests indicate mild staging delay margins." }
  ];

  const defaultRecommendations = [
    { id: "rec-1", title: "Review diff between v2.4.0 and v2.4.1", text: "Inspect server configuration maps to trace newly appended PROXY_TIMEOUT constraints." },
    { id: "rec-2", title: "Roll back api-gateway to v2.4.0", text: "Instantly route user transaction traffic to previous stable deploy checkpoint." },
    { id: "rec-3", title: "Adjust billing-worker connection pools", text: "Increase concurrent session capacity tags inside relational client settings." }
  ];

  return (
    <div className="flex-grow p-8 space-y-6 overflow-y-auto" id="ai-assistant-view">
      
      {/* Alarm Alert Summary Header Card */}
      <div className="bg-[#1E293B] p-6 rounded-xl border border-slate-805/85 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-sky-500/20 flex items-center justify-center text-[#38BDF8] border border-sky-450/20 shrink-0">
            <Cpu size={20} className="animate-pulse" />
          </div>

          <div className="space-y-1.5 grow">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Alert Cluster Overview</span>
              <span className="text-[10px] font-mono font-bold bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/15 px-2 py-0.5 rounded uppercase">
                Active Telemetry Cluster
              </span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Multiple log alarms are clustered around the newest API Gateway Canary build revision. Transaction throughput latency escalated directly following Nami's v2.4.1 production release context.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Cause hypotheses lists & recommended action cards */}
        <div className="lg:col-span-7 space-y-6">
          {/* Confidences Cause Section */}
          <div className="bg-[#1E293B] p-5.5 rounded-xl border border-slate-800 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider border-b border-slate-850 pb-2.5">
              Hypothetical Diagnostic Probable Causes
            </h3>

            <div className="space-y-3.5">
              {defaultHypotheses.map((item) => (
                <div key={item.id} className="p-3.5 bg-slate-900/30 border border-slate-850 rounded-lg space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">{item.cause}</span>
                    <span className="text-xs font-bold font-mono text-[#38BDF8] bg-[#38BDF8]/10 border border-[#38BDF8]/20 px-2 py-0.5 rounded">
                      {item.confidence}% confidence
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium leading-normal">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI recommendations checklists with applying state toggles */}
          <div className="bg-[#1E293B] p-5.5 rounded-xl border border-slate-800 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 mb-4.5 uppercase tracking-wider border-b border-slate-850 pb-2.5">
              Recommended Incident Actions
            </h3>

            <div className="space-y-3.5">
              {defaultRecommendations
                .filter(rec => !dismissedSuggestions[rec.id])
                .map((rec) => {
                  const applied = appliedSuggestions[rec.id];
                  const feedback = likedSuggestions[rec.id];

                  return (
                    <div key={rec.id} className="p-4 bg-slate-900/40 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-[#0F172A] flex flex-col justify-between gap-3 relative">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-xs font-extrabold text-slate-200 block mb-0.5">{rec.title}</span>
                          <p className="text-xs text-slate-400 leading-normal max-w-md">{rec.text}</p>
                        </div>
                        
                        {/* Feedbacks up down */}
                        <div className="flex items-center space-x-1.5 ml-2">
                          <button
                            onClick={() => handleFeedback(rec.id, "up")}
                            title="Helpful recommendation"
                            className={`p-1 rounded cursor-pointer transition-colors ${
                              feedback === "up" ? "bg-emerald-500/10 text-emerald-400" : "text-slate-500 hover:text-slate-300"
                            }`}
                          >
                            <ThumbsUp size={12} />
                          </button>
                          <button
                            onClick={() => handleFeedback(rec.id, "down")}
                            title="Unhelpful recommendation"
                            className={`p-1 rounded cursor-pointer transition-colors ${
                              feedback === "down" ? "bg-rose-500/10 text-rose-450" : "text-slate-500 hover:text-slate-300"
                            }`}
                          >
                            <ThumbsDown size={12} />
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 text-[10px] pt-1">
                        <button
                          onClick={() => handleDismiss(rec.id)}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 rounded-md transition-all font-semibold cursor-pointer"
                        >
                          Dismiss suggestion
                        </button>
                        
                        <button
                          onClick={() => handleApply(rec.id, rec.title)}
                          disabled={applied}
                          className={`px-3 py-1 font-extrabold rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                            applied 
                              ? "bg-slate-800 text-emerald-450 border border-emerald-500/20" 
                              : "bg-[#38BDF8] text-slate-950 hover:bg-sky-400"
                          }`}
                        >
                          {applied ? (
                            <>
                              <Check size={10} />
                              <span>Applied state</span>
                            </>
                          ) : (
                            <span>Apply Recommendation</span>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Right column: Conversational server side Gemini chat assistant stream */}
        <div className="lg:col-span-5 bg-[#1E293B] p-6 rounded-xl border border-slate-800 flex flex-col justify-between h-[650px] shadow-sm">
          <div className="flex-grow flex flex-col justify-between overflow-hidden">
            <div className="h-10 border-b border-slate-800 pb-3 flex items-center space-x-2 shrink-0">
              <Sparkles size={14} className="text-[#38BDF8]" />
              <h3 className="text-xs font-bold text-white uppercase font-mono">Live DevOps Chat Sandbox</h3>
            </div>

            {/* Chat message logs scroll */}
            <div className="flex-grow my-4 p-3 bg-slate-950/50 rounded-xl border border-slate-900/60 overflow-y-auto space-y-3.5 custom-scrollbar text-xs">
              {aiChatHistory.map((item, idx) => (
                <div key={idx} className={`flex items-start gap-2 max-w-[85%] ${
                  item.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}>
                  <div className={`p-1.5 rounded-lg shrink-0 ${
                    item.role === "user" ? "bg-blue-600 text-white" : "bg-slate-800 text-[#38BDF8]"
                  }`}>
                    {item.role === "user" ? "U" : "AI"}
                  </div>

                  <div className={`p-3 rounded-xl border ${
                    item.role === "user" 
                      ? "bg-blue-500/10 border-blue-500/20 text-slate-100" 
                      : "bg-slate-900 border-slate-850 text-slate-300 leading-relaxed font-sans"
                  }`}>
                    {item.content}
                  </div>
                </div>
              ))}

              {isGeneratingChat && (
                <div className="flex items-center space-x-2 text-slate-500 animate-pulse text-[11px] font-mono leading-none">
                  <div className="w-2 h-2 bg-[#38BDF8] rounded-full animate-bounce" />
                  <span>AI assistant is formulating telemetry response...</span>
                </div>
              )}
            </div>
          </div>

          {/* Form input messaging */}
          <form onSubmit={handleSendChatChat} className="flex gap-2 border-t border-slate-800/80 pt-4.5">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask AI assistant about INC-2041 logs analysis..."
              id="ai-chat-input"
              className="flex-1 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-slate-100 placeholder-slate-550 text-xs outline-none hover:border-slate-700 focus:border-[#38BDF8]"
            />
            <button
              type="submit"
              id="ai-submit-chat-btn"
              className="p-2.5 bg-[#38BDF8] hover:bg-sky-400 text-slate-950 rounded-lg transition-all cursor-pointer shadow-md shadow-sky-400/10"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
