import React, { useState } from "react";
import { Deployment, DeploymentLog, AppScreen } from "../types";
import { 
  ArrowLeft, 
  RotateCcw, 
  Layers, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  FileCode, 
  ExternalLink,
  Lock
} from "lucide-react";

interface DeploymentsViewProps {
  deployments: Deployment[];
  selectedDeploymentId: string | null;
  onRollback: (originalVersion: string, targetVersion: string) => void;
  logs: DeploymentLog[];
  setScreen: (screen: AppScreen) => void;
}

export default function DeploymentsView({
  deployments,
  selectedDeploymentId,
  onRollback,
  logs,
  setScreen
}: DeploymentsViewProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [targetVersion, setTargetVersion] = useState("v2.4.0");

  // Pick the deployment or fall back to the first failed one (api-gateway v2.4.1)
  const currentDeployment = deployments.find(d => d.id === selectedDeploymentId) || deployments[0];

  const handleRollbackClick = (version: string) => {
    setTargetVersion(version);
    setShowConfirmModal(true);
  };

  const handleConfirmRollback = () => {
    onRollback(currentDeployment.version, targetVersion);
    setShowConfirmModal(false);
  };

  return (
    <div className="flex-grow p-8 space-y-6 overflow-y-auto" id="deployments-view">
      {/* Return to Dashboard header line */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setScreen("DASHBOARD")}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all cursor-pointer"
          >
            <ArrowLeft size={14} />
          </button>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-1.5 font-sans">
              Deployment Inspector: <span className="font-mono text-[#4F6EF7]">{currentDeployment.name}</span>
            </h2>
            <p className="text-xs text-slate-500 font-mono">ID: {currentDeployment.id} · Commit: {currentDeployment.commitHash}</p>
          </div>
        </div>
        <span className="text-[10px] text-slate-500 font-mono uppercase bg-slate-800 px-3 py-1 rounded">Control Plane View</span>
      </div>

      {/* Main Release Block Header */}
      <div className="bg-[#1630A8] p-6 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <span className="text-lg font-bold text-white font-mono">{currentDeployment.name} {currentDeployment.version}</span>
            <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border uppercase tracking-wide flex items-center gap-1 ${
              currentDeployment.status === "Success" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
              currentDeployment.status === "Pending" ? "bg-amber-500/10 text-amber-400 border-[#4F6EF7]/20 animate-pulse" :
              "bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-md shadow-rose-950/20"
            }`}>
              {currentDeployment.status === "Success" ? <CheckCircle size={10} /> :
               currentDeployment.status === "Pending" ? <RotateCcw size={10} className="animate-spin" /> : 
               <XCircle size={10} />}
              <span>{currentDeployment.status}</span>
            </span>
          </div>

          <div className="text-xs text-slate-400 space-y-1 md:flex md:items-center md:space-x-4 md:space-y-0">
            <span>Author: <strong className="text-slate-300 font-medium">{currentDeployment.author}</strong></span>
            <span className="hidden md:inline text-slate-600">•</span>
            <span>Deploy time: <strong className="text-slate-300 font-medium">{currentDeployment.timestamp}</strong></span>
            <span className="hidden md:inline text-slate-600">•</span>
            <span>Ref: <strong className="text-slate-300 font-mono font-medium">{currentDeployment.commitHash}</strong></span>
          </div>
        </div>

        {/* Environment status chips list */}
        <div className="flex items-center gap-2">
          {[
            { env: "Production", active: currentDeployment.environment === "Production" },
            { env: "Staging", active: currentDeployment.environment === "Staging" },
            { env: "Development", active: currentDeployment.environment === "Development" }
          ].map((item) => (
            <span 
              key={item.env}
              className={`px-3 py-1 text-xs rounded-lg font-semibold tracking-wide uppercase border transition-all ${
                item.active 
                  ? "bg-slate-800 text-[#4F6EF7] border-[#4F6EF7]/30 font-bold shadow-sm shadow-indigo-500/5"
                  : "bg-slate-900/40 text-slate-500 border-slate-800/80"
              }`}
            >
              • {item.env}
            </span>
          ))}
        </div>
      </div>

      {/* Grid containing services list and rollback controller */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Affected Services & Timeline list */}
        <div className="lg:col-span-6 bg-[#1630A8] p-6 rounded-xl border border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-1.5 border-b border-slate-800 pb-2.5">
              <Layers size={14} className="text-indigo-400" />
              <span>Affected System Services</span>
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { name: "API Gateway", state: currentDeployment.status === "Success" ? "Stable" : "Failed", border: "border-rose-500/20 bg-rose-500/5 text-rose-400" },
                { name: "Auth Service", state: "Degraded", border: "border-amber-500/20 bg-amber-500/5 text-amber-400" },
                { name: "Notification Service", state: "Active", border: "border-emerald-500/20 bg-emerald-500/5 text-emerald-400" },
                { name: "Billing Worker", state: "At Risk", border: "border-rose-500/20 bg-rose-500/5 text-rose-400" }
              ].map((svc) => (
                <div key={svc.name} className={`p-3 rounded-lg border flex flex-col justify-between ${
                  currentDeployment.status === "Success" ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400" : svc.border
                }`}>
                  <span className="text-xs font-semibold text-slate-200 block mb-1">{svc.name}</span>
                  <span className="text-[10px] font-bold tracking-wider uppercase">
                    {currentDeployment.status === "Success" ? "Stable" : svc.state}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Rollback Trigger Area */}
          <div className="p-4 rounded-xl bg-[#F8FAFF] border border-[#C7D2FE] flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-[#1A2260] block">Emergency Rollback</span>
              <p className="text-[11px] text-[#5B668F] leading-normal max-w-xs">
                Instantly redirect proxy ingress routes to a certified checkpoint.
              </p>
            </div>
            
            <button
              onClick={() => handleRollbackClick("v2.4.0")}
              disabled={currentDeployment.status === "Success"}
              id="deployments-rollback-cta"
              className={`px-4 py-2 text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer ${
                currentDeployment.status === "Success"
                  ? "bg-[#E8ECFE] text-[#5B668F] border border-[#C7D2FE] cursor-not-allowed opacity-80"
                  : "bg-[#4F6EF7] text-white hover:bg-[#2B48D4]"
              }`}
            >
              <RotateCcw size={12} className={currentDeployment.status !== "Success" ? "animate-pulse" : ""} />
              <span>Rollback Deployment</span>
            </button>
          </div>
        </div>

        {/* Timeline history & Candidate releases */}
        <div className="lg:col-span-6 bg-[#1630A8] p-6 rounded-xl border border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-white mb-4.5 flex items-center gap-1.5 border-b border-slate-800 pb-2.5">
            <RotateCcw size={14} className="text-[#4F6EF7]" />
            <span>Rollback History Timeline</span>
          </h3>

          <div className="space-y-4">
            {[
              { version: "v2.4.0", state: "Stable (Running candidate)", author: "Nics", enabled: true },
              { version: "v2.3.9", state: "Stable (Archived)", author: "Dani", enabled: true },
              { version: "v2.3.8", state: "Deprecated", author: "Aly", enabled: false }
            ].map((rh, idx) => (
              <div key={rh.version} className="flex items-start justify-between p-3 rounded-lg bg-[#F8FAFF] border border-[#C7D2FE] hover:border-[#8EA2FF] transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-0.5" />
                  <div>
                    <span className="text-xs font-mono font-bold text-[#1A2260] block">{rh.version}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{rh.state} · Tagged by {rh.author}</span>
                  </div>
                </div>

                {rh.enabled ? (
                  <button
                    onClick={() => handleRollbackClick(rh.version)}
                    className="text-[10px] uppercase font-bold text-[#4F6EF7] hover:bg-[#4F6EF7]/10 px-2.5 py-1 rounded-md border border-[#4F6EF7]/20 transition-all cursor-pointer font-mono"
                  >
                    Select Rollback
                  </button>
                ) : (
                  <span className="text-[9px] text-[#5B668F] bg-[#EEF2FF] border border-[#C7D2FE] font-mono px-2 py-1 rounded inline-flex items-center gap-0.5">
                    <Lock size={10} /> Locked
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Embedded Live Log Viewer Output */}
      <div className="bg-[#1630A8] rounded-xl border border-slate-800 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <FileCode size={14} className="text-[#4F6EF7]" />
            <span>Deployment Logs Preview Console</span>
          </h3>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 font-bold uppercase px-2 py-0.5 rounded animate-pulse">
            Streaming
          </span>
        </div>

        <div className="p-5 bg-slate-950 font-mono text-xs text-slate-300 space-y-2 h-[220px] overflow-y-auto rounded-b-xl border-t border-slate-900 custom-scrollbar">
          {logs.map((log, index) => (
            <div key={index} className="flex items-start space-x-3 text-[11px] leading-relaxed">
              <span className="text-slate-500 shrink-0 font-medium select-none">[{log.timestamp}]</span>
              <span className={`px-1.5 py-0.1 rounded text-[9px] font-bold shrink-0 uppercase tracking-widest ${
                log.level === "ERROR" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" :
                log.level === "WARN" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
              }`}>
                {log.level}
              </span>
              <span className={log.level === "ERROR" ? "text-rose-300" : log.level === "WARN" ? "text-amber-200" : "text-slate-300"}>
                {log.message}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Rollback Modal Overlay */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs select-none">
          <div className="bg-[#1630A8] border border-slate-800/80 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl p-6 space-y-4">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
              <div className="p-1 rounded bg-[#4F6EF7]/10 text-[#4F6EF7]">
                <RotateCcw size={18} className="animate-spin" />
              </div>
              <h3 className="text-base font-bold text-white font-sans">Confirm Emergency Rollback</h3>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              Are you absolutely ready to rollback <strong className="text-white font-mono">{currentDeployment.name}</strong> from version <strong className="text-rose-400 font-mono">{currentDeployment.version}</strong> to version <strong className="text-emerald-400 font-mono">{targetVersion}</strong>? This action routes all production traffic weights instantly.
            </p>

            <div className="flex items-center space-x-2 pt-2 justify-end">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 font-bold text-xs rounded-lg border border-slate-700 hover:text-white hover:bg-slate-700 transition-all cursor-pointer"
              >
                Cancel Action
              </button>
              <button
                onClick={handleConfirmRollback}
                id="modal-confirm-rollback-btn"
                className="px-4.5 py-2 bg-[#4F6EF7] text-slate-950 font-extrabold text-xs rounded-lg hover:bg-indigo-400 transition-all shadow-md shadow-indigo-400/10 cursor-pointer"
              >
                Confirm &amp; Proceed Rollback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

