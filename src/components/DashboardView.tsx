import React from "react";
import { Deployment, Incident, Alert, AppScreen } from "../types";
import { Layers, AlertCircle, ShieldAlert, BadgeInfo, Play, Cpu, ArrowRight } from "lucide-react";

interface DashboardViewProps {
  deployments: Deployment[];
  incidents: Incident[];
  alerts: Alert[];
  setScreen: (screen: AppScreen) => void;
  setSelectedDeploymentId: (id: string | null) => void;
  setSelectedIncidentId: (id: string | null) => void;
  onDismissAI: () => void;
  showAISummary: boolean;
}

export default function DashboardView({
  deployments,
  incidents,
  alerts,
  setScreen,
  setSelectedDeploymentId,
  setSelectedIncidentId,
  onDismissAI,
  showAISummary
}: DashboardViewProps) {
  
  // Handlers for click routes
  const handleDeploymentClick = (dep: Deployment) => {
    // Force specific mock details for api-gateway v2.4.1 so the detail page reflects accurately
    setSelectedDeploymentId(dep.id);
    setScreen("DEPLOYMENT_DETAIL");
  };

  const handleIncidentClick = (inc: Incident) => {
    setSelectedIncidentId(inc.id);
    setScreen("INCIDENT_DETAIL");
  };

  // Compute stats on the fly based on current live state
  const activeIncidentsCount = incidents.filter(i => i.status !== "Resolved").length;
  const criticalIncidentsCount = incidents.filter(i => i.severity === "Critical" && i.status !== "Resolved").length;
  const openAlertsCount = alerts.filter(a => a.status === "Open").length;
  const needReviewAlertsCount = alerts.filter(a => a.status !== "Resolved").length;

  return (
    <div className="flex-1 p-8 space-y-6 overflow-y-auto" id="dashboard-view">
      {/* Stat Cards Grid Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Deployments */}
        <div className="bg-[#1630A8] p-5 rounded-xl border border-slate-800 shadow-sm hover:border-slate-700 transition-colors">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Deployments Today</span>
            <span className="p-1 rounded bg-indigo-500/10 text-indigo-400">
              <Layers size={13} />
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-white">12</span>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">+3 from yesterday</span>
          </div>
        </div>

        {/* Card 2: Active Incidents */}
        <div className="bg-[#1630A8] p-5 rounded-xl border border-slate-800 shadow-sm hover:border-slate-700 transition-colors">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Incidents</span>
            <span className="p-1 rounded bg-rose-500/10 text-rose-400">
              <AlertCircle size={13} />
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-white">{activeIncidentsCount}</span>
            {criticalIncidentsCount > 0 ? (
              <span className="text-[10px] text-rose-400 font-bold bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20">
                {criticalIncidentsCount} Critical
              </span>
            ) : (
              <span className="text-[10px] text-slate-500 font-medium bg-slate-800 px-1.5 py-0.5 rounded">All stable</span>
            )}
          </div>
        </div>

        {/* Card 3: Open Alerts */}
        <div className="bg-[#1630A8] p-5 rounded-xl border border-slate-800 shadow-sm hover:border-slate-700 transition-colors">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Open Alerts</span>
            <span className="p-1 rounded bg-amber-500/10 text-amber-400">
              <ShieldAlert size={13} />
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-white">{openAlertsCount}</span>
            <span className="text-[10px] text-amber-400 font-medium">{needReviewAlertsCount} need review</span>
          </div>
        </div>

        {/* Card 4: System Health */}
        <div className="bg-[#1630A8] p-5 rounded-xl border border-slate-800 shadow-sm hover:border-slate-700 transition-colors">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Services Monitored</span>
            <span className="p-1 rounded bg-emerald-500/10 text-emerald-400">
              <BadgeInfo size={13} />
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-white">24</span>
            <span className="text-[10px] text-slate-400 font-medium">98.2% healthy</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Deployments Table */}
        <div className="lg:col-span-8 bg-[#1630A8] rounded-xl border border-slate-800 overflow-hidden shadow-sm flex flex-col">
          <div className="px-6 py-4.5 border-b border-slate-800/80 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Layers size={15} className="text-indigo-400" />
              <h2 className="text-sm font-bold text-white">Deployment Status</h2>
            </div>
            <button 
              onClick={() => {
                setSelectedDeploymentId(deployments[0]?.id || null);
                setScreen("DEPLOYMENT_DETAIL");
              }}
              className="text-[10px] text-[#4F6EF7] hover:underline uppercase tracking-wider font-bold transition-all"
            >
              View Detail System
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/40 text-[10px] text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <th className="px-6 py-3 font-semibold">Release</th>
                  <th className="px-6 py-3 font-semibold">Environment</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Timestamp</th>
                  <th className="px-6 py-3 font-semibold text-right">Author</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-slate-800/60">
                {deployments.slice(0, 5).map((dep) => (
                  <tr 
                    key={dep.id} 
                    onClick={() => handleDeploymentClick(dep)}
                    className="hover:bg-slate-800/40 cursor-pointer transition-all group"
                  >
                    <td className="px-6 py-3.5 font-mono font-bold text-white group-hover:text-[#4F6EF7]">
                      {dep.name} <span className="font-semibold text-slate-400 ml-1">{dep.version}</span>
                    </td>
                    <td className="px-6 py-3.5 text-slate-300">{dep.environment}</td>
                    <td className="px-6 py-3.5">
                      <span className="flex items-center space-x-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          dep.status === "Success" ? "bg-emerald-500" :
                          dep.status === "Pending" ? "bg-amber-400" : "bg-rose-500"
                        }`} />
                        <span className={`font-semibold ${
                          dep.status === "Success" ? "text-emerald-400" :
                          dep.status === "Pending" ? "text-amber-400" : "text-rose-400"
                        }`}>
                          {dep.status}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-slate-400">{dep.timestamp}</td>
                    <td className="px-6 py-3.5 text-right text-slate-300 font-medium">{dep.author}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: System Health Status */}
        <div className="lg:col-span-4 bg-[#1630A8] rounded-xl border border-slate-800 p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-4.5 border-b border-slate-800/70 pb-3">
              <h2 className="text-sm font-bold text-white">System Service Health</h2>
              <span className="text-[10px] text-slate-500 font-mono">5 Channels</span>
            </div>
            
            <div className="space-y-4">
              {[
                { name: "API Gateway", status: "Healthy", score: 96, color: "bg-emerald-500" },
                { name: "Auth Service", status: "Healthy", score: 99, color: "bg-emerald-500" },
                { name: "Billing Worker", status: "Degraded", score: 82, color: "bg-rose-500" },
                { name: "Notification Service", status: "Healthy", score: 94, color: "bg-emerald-500" },
                { name: "Database Cluster", status: "Healthy", score: 98, color: "bg-emerald-500" }
              ].map((svc) => (
                <div key={svc.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{svc.name}</span>
                    <span className="text-slate-400 text-[11px] font-mono">{svc.score}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${svc.color}`} style={{ width: `${svc.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4.5 border-t border-slate-800 flex items-center justify-between text-[11px]">
            <span className="text-slate-500 uppercase tracking-widest font-bold text-[9px]">Active Cluster</span>
            <span className="text-[#4F6EF7] font-mono bg-[#4F6EF7]/10 px-2 py-0.5 rounded border border-[#4F6EF7]/20 font-bold">us-east-1</span>
          </div>
        </div>
      </div>

      {/* Active Incidents Feed Block */}
      <div className="bg-[#1630A8] rounded-xl border border-slate-800 shadow-sm p-6">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4.5 mb-4">
          <div className="flex items-center space-x-2">
            <AlertCircle size={15} className="text-[#4F6EF7]" />
            <h2 className="text-sm font-bold text-white">Active Incidents Feed</h2>
          </div>
          <span className="text-xs text-slate-400 block font-mono">Select to edit updates</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {incidents.filter(i => i.status !== "Resolved").map((inc) => (
            <div 
              key={inc.id}
              onClick={() => handleIncidentClick(inc)}
              className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 hover:bg-[#1630A8] cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-0.5 text-[9px] font-extrabold rounded-full tracking-wide uppercase border ${
                    inc.severity === "Critical" 
                      ? "bg-rose-500/10 text-rose-400 border-rose-500/20" 
                      : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  }`}>
                    {inc.severity}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono font-bold">{inc.id}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-200 mb-1 group-hover:text-[#4F6EF7]">
                  {inc.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                  Assigned Owner: <span className="text-slate-300 font-medium">{inc.assignedOwner}</span>
                </p>
              </div>

              <div className="mt-4 pt-3.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                <span>Opened: {inc.timeOpened}</span>
                <span className="text-[#4F6EF7] font-bold flex items-center gap-0.5 hover:underline">
                  Investigate <ArrowRight size={11} className="mt-0.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Assistant Summary Panel Banner */}
      {showAISummary && (
        <div className="bg-gradient-to-br from-[#1630A8] to-[#1630A8]/60 p-6 rounded-xl border border-[#4F6EF7]/30 shadow-lg relative overflow-hidden">
          {/* Ambient background glow */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-start space-x-4 relative z-10">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-[#4F6EF7] shrink-0 border border-indigo-400/20">
              <Cpu size={20} className="animate-pulse" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  AI Insight Summary <span className="text-[10px] uppercase font-mono font-bold text-slate-500">StackUp-GenAI</span>
                </h3>
                <span className="text-[9px] px-2 py-0.5 bg-[#4F6EF7]/10 text-[#4F6EF7] rounded-full border border-[#4F6EF7]/20 font-bold uppercase tracking-wider">
                  Analysis Active
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
                3 alert signals correlate perfectly with the <span className="text-[#4F6EF7] font-mono font-bold">api-gateway v2.4.1</span> deployment. Probable cause points to an increased backend request timeout constraint limiting downstream service connection channels.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <button 
                  onClick={() => {
                    setSelectedDeploymentId("dep-1");
                    setScreen("DEPLOYMENT_DETAIL");
                  }}
                  className="text-xs font-bold px-4 py-1.5 bg-[#4F6EF7] hover:bg-indigo-400 text-slate-900 rounded-lg shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  View System Logs
                </button>
                <button 
                  onClick={() => {
                    setSelectedDeploymentId("dep-1");
                    setScreen("DEPLOYMENT_DETAIL");
                  }}
                  className="text-xs font-bold px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg transition-all active:scale-95 cursor-pointer"
                >
                  Prepare Rollback
                </button>
                <button 
                  onClick={() => setScreen("AI_ASSISTANT")}
                  className="text-xs font-bold px-4 py-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all cursor-pointer"
                >
                  Open Chat Assistant
                </button>
                <button 
                  onClick={onDismissAI}
                  className="text-xs font-semibold px-3 py-1.5 text-slate-500 hover:text-rose-400 ml-auto transition-all cursor-pointer"
                >
                  Dismiss Insight
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

