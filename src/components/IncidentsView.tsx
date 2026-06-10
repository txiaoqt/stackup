import React, { useState } from "react";
import { Incident, AppScreen, ActionItem } from "../types";
import { 
  ArrowLeft, 
  Plus, 
  Send,
  AlertCircle,
  Clock,
  User,
  Users,
  CheckSquare,
  Lock,
  Unlock,
  ClipboardList
} from "lucide-react";

interface IncidentsViewProps {
  incidents: Incident[];
  selectedIncidentId: string | null;
  onPostNote: (id: string, note: string) => void;
  onToggleActionItem: (incidentId: string, itemId: string) => void;
  onUpdateStatus: (incidentId: string, status: Incident["status"]) => void;
  onUpdateOwner: (incidentId: string, owner: string) => void;
  setScreen: (screen: AppScreen) => void;
}

export default function IncidentsView({
  incidents,
  selectedIncidentId,
  onPostNote,
  onToggleActionItem,
  onUpdateStatus,
  onUpdateOwner,
  setScreen
}: IncidentsViewProps) {
  const [newNoteText, setNewNoteText] = useState("");
  const [incidentOwnerText, setIncidentOwnerText] = useState("");
  const [rootCause, setRootCause] = useState("");
  const [resolutionText, setResolutionText] = useState("");

  const currentIncident = incidents.find(i => i.id === selectedIncidentId) || incidents[0];

  const handlePostNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    onPostNote(currentIncident.id, newNoteText.trim());
    setNewNoteText("");
  };

  const isResolved = currentIncident.status === "Resolved";

  return (
    <div className="flex-grow p-8 space-y-6 overflow-y-auto" id="incidents-view">
      
      {/* Incident sub header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setScreen("DASHBOARD")}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-[#0F172A] cursor-pointer"
          >
            <ArrowLeft size={14} />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase bg-rose-500/10 border border-rose-500/15 px-2.5 py-0.5 rounded">
                INCIDENT RESPONSE
              </span>
              <span className="text-xs font-mono text-slate-400">{currentIncident.id}</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1 leading-tight">{currentIncident.title}</h2>
          </div>
        </div>
        <span className="text-[10px] text-slate-500 font-mono font-bold uppercase">Control Plane View</span>
      </div>

      {/* Details Box: Status dropdown, assigned owner, collaborators */}
      <div className="bg-[#1E293B] p-5 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status state change */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Incident Status State</label>
          <div className="relative">
            <select
              value={currentIncident.status}
              onChange={(e) => onUpdateStatus(currentIncident.id, e.target.value as Incident["status"])}
              id="incident-status-selector"
              className="w-full text-xs font-semibold bg-slate-900 border border-slate-800 px-3.5 py-2.5 rounded-xl text-slate-200 outline-none hover:border-slate-700 focus:border-[#38BDF8] cursor-pointer"
            >
              <option value="Investigating">Investigating</option>
              <option value="Identified">Identified</option>
              <option value="Monitoring">Monitoring</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Commander Owner change */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Assigned Incident Commander</label>
          <div className="relative">
            <select
              value={currentIncident.assignedOwner}
              onChange={(e) => onUpdateOwner(currentIncident.id, e.target.value)}
              id="incident-owner-selector"
              className="w-full text-xs font-semibold bg-slate-900 border border-slate-800 px-3.5 py-2.5 rounded-xl text-slate-200 outline-none hover:border-slate-700 focus:border-[#38BDF8] cursor-pointer"
            >
              <option value="Dani">Dani M.</option>
              <option value="Nami">Nami D.</option>
              <option value="Aly">Aly D.</option>
              <option value="Tadz">Tadz S.</option>
              <option value="Nics">Nics D.</option>
            </select>
          </div>
        </div>

        {/* Collaborators row */}
        <div className="space-y-1.5 flex flex-col justify-center">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Active Collaborators</label>
          <div className="flex items-center space-x-1.5">
            <div className="flex -space-x-1.5">
              {currentIncident.collaborators.map((name) => (
                <div 
                  key={name}
                  title={name}
                  className="w-7 h-7 rounded-full bg-slate-700 text-white flex items-center justify-center text-[10px] font-bold border border-slate-800/80 shadow cursor-pointer hover:z-10 transition-all font-mono"
                >
                  {name.substring(0, 2).toUpperCase()}
                </div>
              ))}
            </div>
            <span className="text-[11px] text-slate-400 font-medium ml-2">{currentIncident.collaborators.length} online</span>
          </div>
        </div>
      </div>

      {/* Notes checklist and timeline layout columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Event timeline logs */}
        <div className="lg:col-span-7 bg-[#1E293B] p-6 rounded-xl border border-slate-800 shadow-sm space-y-5">
          <h3 className="text-sm font-bold text-white mb-4.5 flex items-center gap-1.5 border-b border-slate-800 pb-2.5">
            <Clock size={14} className="text-[#38BDF8]" />
            <span>Incident Response Chronological Log</span>
          </h3>

          <div className="relative border-l border-slate-800/80 pl-4 space-y-4 font-mono text-[11px]">
            {currentIncident.timeline.map((evt, index) => (
              <div key={index} className="relative">
                {/* timeline point dot */}
                <div className="absolute -left-[20px] top-1.5 w-2 h-2 rounded-full bg-slate-700 border border-slate-[#111827] z-10" />
                <span className="text-slate-550 mr-2.5 font-bold font-mono">{evt.time}</span>
                <span className="text-slate-300 font-sans">{evt.event}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800">
            <form onSubmit={handlePostNote} className="space-y-2.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Rich Status Update Composer</span>
              <div className="relative">
                <textarea
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Record an incident notebook detail or diagnostic outcome note..."
                  id="incident-update-input"
                  className="w-full text-xs bg-slate-900 border border-slate-800 p-3 rounded-lg text-slate-200 placeholder-slate-500 outline-none hover:border-slate-700 focus:border-[#38BDF8] resize-none min-h-[70px]"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  id="incident-post-btn"
                  className="px-4.5 py-2 text-xs font-bold bg-[#38BDF8] hover:bg-sky-400 text-slate-950 rounded-lg transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <Send size={11} />
                  <span>Post Notebook Update</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right column: Action checklist items */}
        <div className="lg:col-span-5 bg-[#1E293B] p-6 rounded-xl border border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-1.5 border-b border-slate-800 pb-2.5">
              <ClipboardList size={14} className="text-blue-400" />
              <span>Remediation Action Checklist</span>
            </h3>

            <div className="space-y-3">
              {currentIncident.actionItems.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => onToggleActionItem(currentIncident.id, item.id)}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-900/30 border border-slate-800/80 hover:border-slate-700 transition-colors cursor-pointer select-none"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => {}} // handled by div click
                      className="accent-[#38BDF8] w-4 h-4 rounded border-slate-800 cursor-pointer text-[#38BDF8]"
                    />
                    <span className={`text-xs text-slate-200 transition-all font-medium ${item.checked ? "line-through text-slate-500" : ""}`}>
                      {item.task}
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-400 font-mono bg-slate-810 px-2 py-0.5 rounded uppercase">
                    {item.assignedTo} · {item.dueTime}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/60 mt-4 text-[11px] text-slate-400 font-medium">
            Checked tasks automatically log to current system audit indexes.
          </div>
        </div>
      </div>

      {/* Post-Incident summary block */}
      <div className="bg-[#1E293B] rounded-xl border border-slate-800 shadow-sm p-6 relative overflow-hidden">
        {!isResolved && (
          <div className="absolute inset-0 z-10 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center select-none">
            <Lock size={20} className="text-slate-500 mb-2" />
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Locked Until Status Resolved</h4>
            <p className="text-[11px] text-slate-500 mt-1 max-w-sm">
              Please change the incident status to "Resolved" inside the dropdown above to unlock post-incident evaluations.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            {isResolved ? <Unlock size={14} className="text-emerald-400" /> : <Lock size={14} className="text-slate-500" />}
            <span>Post-Incident Outpost Debrief</span>
          </h3>
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest font-mono">INC-2041</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <span className="text-[10px] text-slate-550 uppercase tracking-widest font-bold">Root Cause Summary</span>
            <input
              type="text"
              value={rootCause}
              onChange={(e) => setRootCause(e.target.value)}
              placeholder="API gateway timeout mismatches during high-load concurrency queues..."
              id="incident-root-cause"
              className="w-full text-xs bg-slate-900 border border-slate-850 p-2.5 rounded-lg text-slate-300 outline-none hover:border-slate-700 focus:border-[#38BDF8]"
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] text-slate-550 uppercase tracking-widest font-bold">Remediation Action Taken</span>
            <input
              type="text"
              value={resolutionText}
              onChange={(e) => setResolutionText(e.target.value)}
              placeholder="Rolled back deployment to active state v2.4.0 restoring normal checks."
              id="incident-remediation-taken"
              className="w-full text-xs bg-slate-900 border border-slate-850 p-2.5 rounded-lg text-slate-300 outline-none hover:border-slate-700 focus:border-[#38BDF8]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
