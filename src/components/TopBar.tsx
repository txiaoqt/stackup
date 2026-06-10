import React from "react";
import { AppScreen } from "../types";
import { PlusCircle, Send, UserPlus } from "lucide-react";

interface TopBarProps {
  currentScreen: AppScreen;
  onNewIncident: () => void;
  onDeployRelease: () => void;
  onInviteMember: () => void;
}

export default function TopBar({ currentScreen, onNewIncident, onDeployRelease, onInviteMember }: TopBarProps) {
  const getBreadcrumb = () => {
    switch (currentScreen) {
      case "DASHBOARD":
        return <span className="text-slate-400 font-medium">Dashboard</span>;
      case "DEPLOYMENT_DETAIL":
        return (
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
            <span>Dashboard</span>
            <span>&gt;</span>
            <span>Deployments</span>
            <span>&gt;</span>
            <span className="text-white font-semibold font-mono">api-gateway v2.4.1</span>
          </div>
        );
      case "INCIDENT_DETAIL":
        return (
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
            <span>Dashboard</span>
            <span>&gt;</span>
            <span>Incidents</span>
            <span>&gt;</span>
            <span className="text-white font-semibold font-mono">INC-2041</span>
          </div>
        );
      case "MONITORING":
        return <span className="text-slate-400 font-medium">Monitoring</span>;
      case "COLLABORATION":
        return <span className="text-slate-400 font-medium">Team Collaboration</span>;
      case "AI_ASSISTANT":
        return <span className="text-slate-400 font-medium">AI Assistant</span>;
      case "INTEGRATIONS":
        return <span className="text-slate-400 font-medium">Integrations</span>;
      case "ACCESS_AUDIT":
        return <span className="text-slate-400 font-medium">Access &amp; Audit Logs</span>;
      default:
        return <span className="text-slate-400 font-medium">StackUp Control</span>;
    }
  };

  return (
    <header className="h-16 bg-[#1A2260] border-b border-slate-800/80 flex items-center justify-between px-8 select-none shrink-0" id="app-topbar">
      <div className="flex items-center space-x-2 text-sm text-slate-200">
        {getBreadcrumb()}
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={onInviteMember}
          id="topbar-invite-btn"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 hover:text-white transition-all border border-slate-700/60 active:scale-95 cursor-pointer font-medium"
        >
          <UserPlus size={13} />
          <span>Invite Member</span>
        </button>

        <button
          onClick={onDeployRelease}
          id="topbar-deploy-btn"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 hover:text-white transition-all border border-slate-700/60 active:scale-95 cursor-pointer font-medium"
        >
          <Send size={13} />
          <span>Deploy Release</span>
        </button>

        <button
          onClick={onNewIncident}
          id="topbar-incident-btn"
          className="flex items-center gap-1.5 px-4.5 py-1.5 text-xs bg-[#4F6EF7] text-slate-950 font-bold rounded-lg hover:bg-indigo-400 transition-all border border-indigo-400/20 active:scale-95 cursor-pointer shadow-md shadow-indigo-400/10"
        >
          <PlusCircle size={13} />
          <span>New Incident</span>
        </button>
      </div>
    </header>
  );
}

