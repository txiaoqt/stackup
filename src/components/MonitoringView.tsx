import React, { useState } from "react";
import { Alert, DeploymentLog, AppScreen } from "../types";
import { 
  Activity, 
  X, 
  ChevronRight, 
  Cpu, 
  CheckCircle,
  Database,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  History
} from "lucide-react";

interface MonitoringViewProps {
  alerts: Alert[];
  logs: DeploymentLog[];
  setScreen: (screen: AppScreen) => void;
  onClearAlert: (id: string) => void;
}

export default function MonitoringView({
  alerts,
  logs,
  setScreen,
  onClearAlert
}: MonitoringViewProps) {
  const [selectedTab, setSelectedTab] = useState<string>("All Services");
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const tabs = [
    { name: "All Services" },
    { name: "API Gateway" },
    { name: "Auth Service" },
    { name: "Billing Worker" },
    { name: "Notification Service" },
    { name: "Database" }
  ];

  // Filtering alerts based on tab selection
  const filteredAlerts = alerts.filter(alert => {
    if (selectedTab === "All Services") return true;
    if (selectedTab === "Database" && alert.linkedService === "Database Cluster") return true;
    return alert.linkedService.toLowerCase().includes(selectedTab.toLowerCase().replace("service", "").trim());
  });

  return (
    <div className="flex-grow p-8 space-y-6 overflow-y-auto relative" id="monitoring-view">
      
      {/* Tab Selectors */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-1 overflow-x-auto custom-scrollbar uppercase tracking-wider text-[10px] font-bold">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setSelectedTab(tab.name)}
              className={`px-4 py-2 rounded-lg transition-all text-xs font-bold leading-none cursor-pointer ${
                selectedTab === tab.name
                  ? "bg-slate-800 text-white border border-[#4F6EF7]/20 shadow-sm"
                  : "text-slate-400 hover:text-slate-100"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-500 font-mono hidden md:inline">Timeframe: Last 24 Hours</span>
      </div>

      {/* Degradation State Banner */}
      <div className="bg-[#1630A8] border border-rose-500/25 p-5.5 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse inline-block" />
            <span>Overall System Health: <strong className="text-rose-400">Degraded</strong></span>
          </h3>
          <p className="text-xs text-slate-400 leading-normal mt-1.5 max-w-xl">
            API Gateway latency and Billing Worker error rate thresholds require remediation. Downstream connection queues show temporary packet backpressure.
          </p>
        </div>

        <button 
          onClick={() => setScreen("AI_ASSISTANT")}
          className="px-4 py-2 text-xs font-bold bg-[#4F6EF7] text-slate-950 rounded-lg hover:bg-indigo-400 font-sans transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
        >
          <Cpu size={12} className="animate-spin" />
          <span>Consult AI Recommendation</span>
        </button>
      </div>

      {/* Metrics Simulated Visual Plot Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: "CPU / Memory Usage (%)", val: "78.2%", color: "text-indigo-400", path: "M5,42 Q30,12 60,35 T120,8 T180,24 T240,15 T300,10" },
          { name: "Request Rate (RPS)", val: "1.4k /s", color: "text-emerald-400", path: "M5,45 Q40,30 80,11 T140,43 T200,10 T260,32 T300,5" },
          { name: "Error Rate (%)", val: "8.4% Max", color: "text-rose-400", path: "M5,10 Q35,42 70,22 T120,41 T180,30 T240,45 T300,5" }
        ].map((chart) => (
          <div key={chart.name} className="bg-[#1630A8] p-5 rounded-xl border border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{chart.name}</span>
              <span className={`text-base font-mono font-bold ${chart.color}`}>{chart.val}</span>
            </div>

            {/* Simulated mini line chart with elegant vector plotting */}
            <div className="h-16 w-full bg-slate-950/40 rounded-lg border border-slate-900/60 flex items-center justify-center p-1 relative overflow-hidden">
              <svg className="w-full h-full bottom-0 left-0 absolute overflow-visible" preserveAspectRatio="none" viewBox="0 0 300 50">
                <path 
                  d={chart.path} 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  className={chart.color}
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Grid: Alerts & Logs Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Alerts Section */}
        <div className="lg:col-span-12 bg-[#1630A8] rounded-xl border border-slate-800 overflow-hidden shadow-sm">
          <div className="px-6 py-4.5 border-b border-slate-800/80 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <AlertTriangle size={15} className="text-rose-400" />
              <h3 className="text-sm font-bold text-white">Triggered Active Host Alerts</h3>
            </div>
            <span className="text-[10px] text-slate-400 uppercase font-bold text-right font-mono tracking-wider">
              {filteredAlerts.length} alarm matches
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-900/30 text-[10px] text-slate-400 uppercase tracking-widest border-b border-slate-800">
                  <th className="px-6 py-3 font-semibold">Alert Indicator</th>
                  <th className="px-6 py-3 font-semibold">Severity</th>
                  <th className="px-6 py-3 font-semibold">Time Triggered</th>
                  <th className="px-6 py-3 font-semibold">Linked Host Node</th>
                  <th className="px-6 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-slate-800/50">
                {filteredAlerts.map((al) => (
                  <tr 
                    key={al.id}
                    onClick={() => setSelectedAlert(al)}
                    className="hover:bg-slate-800/30 cursor-pointer transition-all group"
                  >
                    <td className="px-6 py-3.5 font-bold text-slate-200 group-hover:text-[#4F6EF7]">{al.name}</td>
                    <td className="px-6 py-3.5">
                      <span className={`px-2 py-0.5 text-[9px] font-extrabold rounded uppercase tracking-wider border ${
                        al.severity === "Critical" ? "bg-rose-500/10 text-rose-400 border-rose-500/20" :
                        al.severity === "High" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                        "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                      }`}>
                        {al.severity}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-slate-400 font-mono">{al.triggeredTime}</td>
                    <td className="px-6 py-3.5 text-slate-300 font-mono">{al.linkedService}</td>
                    <td className="px-6 py-3.5 text-right font-semibold text-[#4F6EF7] text-[10px] uppercase font-sans">
                      Inspect Alert &gt;
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Streaming live logs feed */}
      <div className="bg-[#1630A8] rounded-xl border border-slate-800 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <History size={14} className="text-[#4F6EF7]" />
            <h3 className="text-sm font-bold text-white">System Metrics &amp; Host Logs</h3>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Live Ingress Stream</span>
        </div>

        <div className="p-5 bg-slate-950 font-mono text-xs text-slate-400 space-y-2 max-h-[220px] overflow-y-auto rounded-b-xl custom-scrollbar border-t border-slate-900">
          {logs.map((log, index) => (
            <div key={index} className="flex items-start space-x-2 leading-relaxed">
              <span className="text-slate-500 font-medium select-none">[{log.timestamp}]</span>
              <span className={`text-[9px] font-bold uppercase ${
                log.level === "ERROR" ? "text-rose-400" : log.level === "WARN" ? "text-amber-400" : "text-indigo-400"
              }`}>
                [{log.level}]
              </span>
              <span className="text-slate-300">{log.message}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Alert Detail Drawer Context right-side overlays */}
      {selectedAlert && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-[420px] bg-[#1A2260] border-l border-slate-800/80 z-50 overflow-y-auto shadow-2xl p-6 flex flex-col justify-between select-none">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4.5 mb-6">
              <h3 className="text-sm font-bold text-white uppercase font-mono">Alarm Spec Viewer</h3>
              <button 
                onClick={() => setSelectedAlert(null)}
                className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            <div className="space-y-5">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Alert Name</span>
                <p className="text-base font-bold text-white">{selectedAlert.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Severity Status</span>
                  <div>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 block w-max uppercase font-mono">
                      {selectedAlert.severity}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Linked Entity</span>
                  <p className="text-xs text-slate-300 font-mono mt-0.5">{selectedAlert.linkedService}</p>
                </div>
              </div>

              <div className="space-y-1 bg-slate-900 p-4.5 rounded-lg border border-slate-850">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Simulated Related Signals</span>
                <ul className="text-xs text-slate-300 space-y-1.5 font-mono">
                  <li>• API Gateway metric check exceeded: 2.45s limits (10:45 AM)</li>
                  <li>• Stripe payment socket refusal timeout in production (10:48 AM)</li>
                  <li>• 504 proxy response error state mapped (10:52 AM)</li>
                </ul>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Suggested Actions</span>
                <div className="p-3 bg-indigo-500/5 rounded-lg border border-indigo-500/15 text-xs text-slate-300 leading-relaxed font-semibold">
                  Analyze current environment state variables config immediately or prepare fallback rollback targeting active stable releases to restore transactional service uptime.
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-850 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                onClearAlert(selectedAlert.id);
                setSelectedAlert(null);
              }}
              className="px-4.5 py-2.5 text-xs font-bold bg-slate-800 text-rose-400 hover:bg-slate-700/60 rounded-lg border border-slate-700 transition-all cursor-pointer grow text-center"
            >
              Clear Alarm Alert
            </button>
            <button
              onClick={() => {
                setSelectedAlert(null);
                setScreen("AI_ASSISTANT");
              }}
              className="px-4.5 py-2.5 text-xs font-bold bg-[#4F6EF7] text-slate-950 hover:bg-indigo-400 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 grow"
            >
              <span>Consult AI Recommender</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

