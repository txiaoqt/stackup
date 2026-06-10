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
import stackupLogo from "../../assets/stackup-logo.png";

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
    <aside className="w-64 bg-[#1A2260] border-r border-slate-800 flex flex-col h-full select-none shrink-0" id="app-sidebar">
      {/* Brand logo header */}
      <div className="p-6 pb-4 flex items-center space-x-3 border-b border-slate-800/60">
        <button
          onClick={() => setScreen("DASHBOARD")}
          className="w-9 h-9 bg-[#E8ECFE] rounded-lg flex items-center justify-center shadow-md shadow-indigo-500/10 cursor-pointer hover:opacity-90 active:scale-95 transition-all border border-[#4F6EF7]/35"
          aria-label="Go to dashboard"
        >
          <img src={stackupLogo} alt="" className="w-7 h-7 object-contain" />
        </button>
        <div className="flex flex-col cursor-pointer" onClick={() => setScreen("DASHBOARD")}>
          <span className="text-lg font-extrabold text-[#1A2260] tracking-tight flex items-center gap-0.5">
            Stack<span className="text-[#4F6EF7]">Up</span>
          </span>
          <span className="text-[10px] text-[#51608B] font-mono tracking-wider -mt-1 font-semibold uppercase">Control Pane</span>
        </div>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 px-4 py-4 space-y-5 overflow-y-auto custom-scrollbar">
        {sections.map((sec) => (
          <div key={sec.title} className="space-y-1">
            <p className="px-3 text-[10px] font-bold text-[#5B668F] uppercase tracking-widest">{sec.title}</p>
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
                          ? "bg-[#E8ECFE] text-[#1A2260] border-l-2 border-[#4F6EF7] pl-2.5 shadow-sm"
                          : "text-[#46557F] hover:bg-[#EEF2FF] hover:text-[#1A2260]"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon size={16} className={active ? "text-[#4F6EF7]" : "text-[#6E7AA3] group-hover:text-[#4F6EF7] transition-colors"} />
                        <span>{item.label}</span>
                      </div>
                      
                      {item.id === "AI_ASSISTANT" && (
                        <span className="text-[9px] px-1.5 py-0.2 bg-[#4F6EF7]/10 text-[#4F6EF7] rounded font-semibold animate-pulse border border-[#4F6EF7]/20">
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
      <div className="p-4 border-t border-[#C7D2FE] bg-white/55 flex flex-col space-y-3">
        <div className="flex items-center space-x-3 justify-between">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#E8ECFE] flex items-center justify-center text-xs font-extrabold text-[#2B48D4] shadow-sm border border-[#B8C4FF]">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.fullName} className="w-full h-full rounded-full object-cover" />
              ) : (
                user.fullName.split(" ").map(n => n[0]).join("")
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#1A2260] truncate leading-tight">{user.fullName}</p>
              <p className="text-[9px] text-[#5B668F] font-medium truncate tracking-wide">{user.teamName}</p>
            </div>
          </div>

          <button 
            onClick={onLogout}
            title="Log Out Service"
            className="p-1.5 rounded-md text-[#5B668F] hover:text-rose-500 hover:bg-rose-500/10 transition-all cursor-pointer"
          >
            <LogOut size={14} />
          </button>
        </div>

        <div className="flex items-center justify-between text-[9px] text-[#5B668F] font-mono">
          <span>Status: <span className="text-emerald-600 font-bold">Live</span></span>
          <span>v1.0.0</span>
        </div>
      </div>
    </aside>
  );
}

