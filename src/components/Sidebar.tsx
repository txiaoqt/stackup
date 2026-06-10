import React from "react";
import { AppScreen, UserProfile } from "../types";
import { 
  LayoutDashboard, 
  Layers, 
  AlertTriangle, 
  Activity, 
  Cpu, 
  Users, 
  Settings2, 
  ShieldAlert, 
  LogOut 
} from "lucide-react";

interface SidebarProps {
  currentScreen: AppScreen;
  setScreen: (screen: AppScreen) => void;
  user: UserProfile;
  onLogout: () => void;
}

export default function Sidebar({ currentScreen, setScreen, user, onLogout }: SidebarProps) {
  const sections = [
    {
      title: "Main",
      items: [
        { id: "DASHBOARD", label: "Dashboard", icon: LayoutDashboard, screen: "DASHBOARD" as AppScreen },
        { id: "DEPLOYMENTS", label: "Deployments", icon: Layers, screen: "DEPLOYMENT_DETAIL" as AppScreen },
        { id: "INCIDENTS", label: "Incidents", icon: AlertTriangle, screen: "INCIDENT_DETAIL" as AppScreen },
      ]
    },
    {
      title: "Ops",
      items: [
        { id: "MONITORING", label: "Monitoring", icon: Activity, screen: "MONITORING" as AppScreen },
        { id: "AI_ASSISTANT", label: "AI Assistant", icon: Cpu, screen: "AI_ASSISTANT" as AppScreen },
      ]
    },
    {
      title: "Team",
      items: [
        { id: "COLLABORATION", label: "Collaboration", icon: Users, screen: "COLLABORATION" as AppScreen },
      ]
    },
    {
      title: "Settings",
      items: [
        { id: "INTEGRATIONS", label: "Integrations", icon: Settings2, screen: "INTEGRATIONS" as AppScreen },
        { id: "ACCESS_AUDIT", label: "Access & Audit", icon: ShieldAlert, screen: "ACCESS_AUDIT" as AppScreen },
      ]
    }
  ];

  const handleNavClick = (screen: AppScreen) => {
    setScreen(screen);
  };

  const isItemActive = (screen: AppScreen) => {
    if (screen === "DASHBOARD" && currentScreen === "DASHBOARD") return true;
    if (screen === "DEPLOYMENT_DETAIL" && currentScreen === "DEPLOYMENT_DETAIL") return true;
    if (screen === "INCIDENT_DETAIL" && currentScreen === "INCIDENT_DETAIL") return true;
    if (screen === "MONITORING" && currentScreen === "MONITORING") return true;
    if (screen === "AI_ASSISTANT" && currentScreen === "AI_ASSISTANT") return true;
    if (screen === "COLLABORATION" && currentScreen === "COLLABORATION") return true;
    if (screen === "INTEGRATIONS" && currentScreen === "INTEGRATIONS") return true;
    if (screen === "ACCESS_AUDIT" && currentScreen === "ACCESS_AUDIT") return true;
    return false;
  };

  return (
    <aside className="w-64 bg-[#111827] border-r border-slate-800 flex flex-col h-full select-none shrink-0" id="app-sidebar">
      {/* Brand logo header */}
      <div className="p-6 pb-4 flex items-center space-x-3 border-b border-slate-800/60">
        <div 
          onClick={() => setScreen("DASHBOARD")}
          className="w-8 h-8 bg-[#38BDF8] rounded flex flex-col items-center justify-center space-y-0.5 shadow-md shadow-blue-500/10 cursor-pointer hover:opacity-90 active:scale-95 transition-all"
        >
          <div className="w-5 h-1 bg-white rounded-full opacity-40"></div>
          <div className="w-5 h-1 bg-white rounded-full"></div>
          <div className="w-5 h-1 bg-white rounded-full opacity-40"></div>
        </div>
        <div className="flex flex-col cursor-pointer" onClick={() => setScreen("DASHBOARD")}>
          <span className="text-lg font-bold text-white tracking-tight flex items-center gap-0.5">
            Stack<span className="text-[#38BDF8]">Up</span>
          </span>
          <span className="text-[10px] text-slate-500 font-mono tracking-wider -mt-1 font-semibold uppercase">Control Pane</span>
        </div>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 px-4 py-4 space-y-5 overflow-y-auto custom-scrollbar">
        {sections.map((sec) => (
          <div key={sec.title} className="space-y-1">
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">{sec.title}</p>
            <ul className="space-y-0.5">
              {sec.items.map((item) => {
                const Icon = item.icon;
                const active = isItemActive(item.screen);
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.screen)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer group ${
                        active 
                          ? "bg-slate-800 text-white border-l-2 border-[#38BDF8] pl-2.5 shadow-sm"
                          : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon size={16} className={active ? "text-[#38BDF8]" : "text-slate-500 group-hover:text-slate-300 transition-colors"} />
                        <span>{item.label}</span>
                      </div>
                      
                      {item.id === "AI_ASSISTANT" && (
                        <span className="text-[9px] px-1.5 py-0.2 bg-[#38BDF8]/10 text-[#38BDF8] rounded font-semibold animate-pulse border border-[#38BDF8]/20">
                          Active
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User Information & Settings Box */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/25 flex flex-col space-y-3">
        <div className="flex items-center space-x-3 justify-between">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow-md border border-blue-500/30">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.fullName} className="w-full h-full rounded-full object-cover" />
              ) : (
                user.fullName.split(" ").map(n => n[0]).join("")
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate leading-tight">{user.fullName}</p>
              <p className="text-[9px] text-slate-500 font-medium truncate tracking-wide">{user.teamName}</p>
            </div>
          </div>

          <button 
            onClick={onLogout}
            title="Log Out Service"
            className="p-1.5 rounded-md text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
          >
            <LogOut size={14} />
          </button>
        </div>

        <div className="flex items-center justify-between text-[9px] text-slate-600 font-mono">
          <span>Status: <span className="text-emerald-500 font-bold">● Live</span></span>
          <span>v1.0.0</span>
        </div>
      </div>
    </aside>
  );
}
