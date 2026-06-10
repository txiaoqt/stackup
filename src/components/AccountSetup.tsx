import React, { useState } from "react";
import { UserProfile, AppScreen } from "../types";
import { ChevronRight, Settings2, Sparkles, Check, CheckCircle2 } from "lucide-react";
import stackupLogo from "../../assets/stackup-logo.png";

interface AccountSetupProps {
  onFinishSetup: (profile: Partial<UserProfile>) => void;
  onSkipSetup: () => void;
}

export default function AccountSetup({ onFinishSetup, onSkipSetup }: AccountSetupProps) {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [timezone, setTimezone] = useState("UTC -4 (Eastern Time)");
  const [teamName, setTeamName] = useState("");
  const [teamSize, setTeamSize] = useState("5 - 15 Members");
  const [selectedTools, setSelectedTools] = useState<Record<string, boolean>>({
    github: true,
    slack: true,
    jenkins: false,
    pagerduty: false
  });
  const [selectedTheme, setSelectedTheme] = useState("Clean Minimalism");

  const toggleTool = (toolId: string) => {
    setSelectedTools(prev => ({ ...prev, [toolId]: !prev[toolId] }));
  };

  const handleNextStep = () => {
    if (step < 4) {
      setStep(prev => prev + 1);
    } else {
      onFinishSetup({
        fullName: fullName || "Aly D.",
        jobTitle: jobTitle || "DevOps Engineer",
        timezone,
        teamName: teamName || "Acme Dev Team",
        teamSize
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#1A2260] text-slate-100 flex flex-col justify-between p-6 relative overflow-hidden select-none">
      {/* Background soft highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[90px] pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-center justify-between z-10 max-w-4xl w-full mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#E8ECFE] border border-[#4F6EF7]/35 rounded-lg flex items-center justify-center">
            <img src={stackupLogo} alt="" className="w-6.5 h-6.5 object-contain" />
          </div>
          <span className="font-bold tracking-tight text-sm">StackUp</span>
        </div>

        <button
          onClick={onSkipSetup}
          id="skip-setup-btn"
          className="text-xs text-slate-400 hover:text-white font-medium transition-colors cursor-pointer"
        >
          Skip Setup
        </button>
      </div>

      {/* Main card box */}
      <div className="max-w-lg w-full bg-[#1630A8] border border-slate-800 rounded-2xl p-6.5 mx-auto my-auto z-10 shadow-2xl relative overflow-hidden space-y-5">
        
        {/* Step circles info bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] text-slate-550 uppercase tracking-widest font-bold">Workspace Onboarding</span>
            <h2 className="text-sm font-bold text-slate-200 mt-0.5">
              {step === 1 && "Confirm Profile Credentials"}
              {step === 2 && "Setup Dev Team Context"}
              {step === 3 && "Connect Communication Tools"}
              {step === 4 && "Choose Control Preferences"}
            </h2>
          </div>
          <span className="text-xs font-semibold font-mono text-[#4F6EF7] bg-[#4F6EF7]/10 border border-[#4F6EF7]/15 px-2.5 py-0.5 rounded uppercase">
            Step {step} of 4
          </span>
        </div>

        {/* STEP 1: profile information */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Full Operational Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Aly D."
                id="setup-fullname-input"
                className="w-full text-xs bg-slate-905 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-slate-200 placeholder-slate-500 outline-none hover:border-slate-700 focus:border-[#4F6EF7]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Job Title / Role</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="DevOps Architect / Release Manager"
                id="setup-jobtitle-input"
                className="w-full text-xs bg-slate-900 border border-slate-850 p-2.5 rounded-lg text-slate-300 placeholder-slate-550 outline-none hover:border-slate-705 focus:border-[#4F6EF7]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Workstation Timezone Offset</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                id="setup-timezone-selector"
                className="w-full text-xs bg-slate-900 border border-slate-850 p-2.5 rounded-lg text-slate-300 outline-none cursor-pointer hover:border-slate-705 focus:border-[#4F6EF7]"
              >
                <option value="UTC -4 (Eastern Time)">UTC -4 (Eastern Time)</option>
                <option value="UTC -5 (Central Time)">UTC -5 (Central Time)</option>
                <option value="UTC +0 (Greenwich Mean)">UTC +0 (Greenwich Mean)</option>
                <option value="UTC +8 (China Standard)">UTC +8 (China Standard)</option>
              </select>
            </div>
          </div>
        )}

        {/* STEP 2: team context details */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Teammate Group Name</label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Acme DevOps Squad"
                id="setup-teamname-input"
                className="w-full text-xs bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-slate-200 placeholder-slate-500 outline-none hover:border-slate-700 focus:border-[#4F6EF7]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Operational Team Sizing</label>
              <select
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                id="setup-teamsize-selector"
                className="w-full text-xs bg-slate-900 border border-slate-850 p-2.5 rounded-lg text-slate-300 outline-none cursor-pointer hover:border-slate-705 focus:border-[#4F6EF7]"
              >
                <option value="1 - 5 Members">1 - 5 Members</option>
                <option value="5 - 15 Members">5 - 15 Members</option>
                <option value="15+ Members">15+ Members</option>
              </select>
            </div>
          </div>
        )}

        {/* STEP 3: connecting tools selection list */}
        {step === 3 && (
          <div className="space-y-3.5">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold mb-1">Select tools to pre-sync</span>
            {[
              { id: "github", label: "GitHub Code Repos", syncState: "Recommended" },
              { id: "slack", label: "Slack Communication Hub", syncState: "Canary Channels" },
              { id: "jenkins", label: "Jenkins CI/CD Automations", syncState: "Optional" },
              { id: "pagerduty", label: "PagerDuty Live Rotations", syncState: "Optional" }
            ].map((tool) => (
              <div 
                key={tool.id}
                onClick={() => toggleTool(tool.id)}
                className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer select-none transition-all ${
                  selectedTools[tool.id] 
                    ? "border-[#4F6EF7]/40 bg-[#4F6EF7]/5 text-[#4F6EF7]" 
                    : "border-slate-800 bg-slate-900/30 text-slate-400 hover:border-slate-750"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4F6EF7]" />
                  <div>
                    <span className="text-xs font-bold text-slate-200 block">{tool.label}</span>
                    <span className="text-[9px] text-slate-500 font-mono font-medium">{tool.syncState}</span>
                  </div>
                </div>

                <div className={`p-1 rounded-full border ${
                  selectedTools[tool.id] ? "bg-[#4F6EF7] border-indigo-450 text-slate-950" : "border-slate-800 text-transparent"
                }`}>
                  <Check size={10} className="stroke-[3.5]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STEP 4: Preferences selector */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Assigned Interface Theme Preset</label>
              <div className="p-3.5 bg-slate-900 border border-[#4F6EF7]/30 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">Clean Minimalism</span>
                  <p className="text-[11px] text-slate-400 leading-normal mt-0.5">High-contrast, elegant off-whites and dark slate grays.</p>
                </div>
                <CheckCircle2 size={16} className="text-[#4F6EF7]" />
              </div>
            </div>

            <div className="space-y-1 bg-slate-900/30 p-3.5 rounded-xl border border-slate-850/70">
              <span className="text-[10px] text-[#4F6EF7] font-bold uppercase tracking-wider block mb-1 flex items-center gap-1">
                <Sparkles size={11} className="animate-pulse" /> Welcome Ready
              </span>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                StackUp onboarding complete. Proceeding compiles your customized telemetry channels dashboard and access memberships!
              </p>
            </div>
          </div>
        )}

        {/* footer back/next action row */}
        <div className="flex items-center justify-between pt-4.5 border-t border-slate-800/80">
          <button
            onClick={() => step > 1 && setStep(prev => prev - 1)}
            disabled={step === 1}
            className={`text-xs text-slate-400 hover:text-white transition-colors cursor-pointer ${
              step === 1 ? "opacity-0 cursor-not-allowed" : "opacity-100"
            }`}
          >
            Back Step
          </button>

          <button
            onClick={handleNextStep}
            id="setup-next-step-btn"
            className="px-5 py-2.5 bg-[#4F6EF7] text-slate-950 font-extrabold text-xs rounded-lg hover:bg-indigo-400 hover:text-slate-900 transition-all flex items-center gap-1 select-none cursor-pointer"
          >
            <span>{step === 4 ? "Complete Setup" : "Next Step"}</span>
            <ChevronRight size={13} />
          </button>
        </div>
      </div>

      <div className="text-[11px] font-mono text-slate-500 z-10 text-center font-semibold">
        StackUp Onboarding Wizard · v1.0.0
      </div>
    </div>
  );
}

