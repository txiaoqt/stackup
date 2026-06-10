import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Layers, AlertTriangle, Cpu, Users, ChevronRight, ArrowRight } from "lucide-react";
import stackupLogo from "../../assets/stackup-logo.png";

interface WelcomeCarouselProps {
  onFinish: () => void;
  onSkip: () => void;
  userName?: string;
}

interface Slide {
  title: string;
  description: string;
  icon: any;
  colorClass: string;
  illustration: React.ReactNode;
}

export default function WelcomeCarousel({ onFinish, onSkip, userName = "Aly" }: WelcomeCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      title: "Unified Deployment Dashboard",
      description: "Track releases, environments, rollback history, and affected services in one place.",
      icon: Layers,
      colorClass: "from-indigo-500 to-[#E8ECFE]",
      illustration: (
        <div className="w-full h-full bg-[#1630A8] border border-indigo-500/20 rounded-xl p-4 flex flex-col justify-between text-xs font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400 font-semibold text-[10px]">DEPLOYMENTS</span>
            <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 scale-90">1 Failed</span>
          </div>
          <div className="space-y-2 my-2 flex-grow flex flex-col justify-center">
            <div className="p-2 rounded bg-slate-800/40 border border-slate-700/30 flex items-center justify-between">
              <div>
                <span className="text-slate-200">api-gateway v2.4.1</span>
                <span className="text-[10px] text-slate-500 block">Production · 2 min ago</span>
              </div>
              <span className="px-1.5 py-0.2 bg-red-950 text-red-400 rounded text-[9px] uppercase font-bold border border-red-500/35">Failed</span>
            </div>
            <div className="p-2 rounded bg-slate-800/20 border border-slate-700/10 flex items-center justify-between opacity-50">
              <div>
                <span className="text-slate-300">auth-service v1.8.0</span>
                <span className="text-[10px] text-slate-500 block">Staging · 9 min ago</span>
              </div>
              <span className="px-1.5 py-0.2 bg-yellow-950 text-yellow-400 rounded text-[9px] uppercase font-bold border border-yellow-500/35">Pending</span>
            </div>
          </div>
          <div className="text-[10px] text-indigo-400 flex items-center justify-end gap-1">
            <span>Click row for timelines</span>
            <ChevronRight size={10} />
          </div>
        </div>
      )
    },
    {
      title: "Incident Response Workspace",
      description: "Assign owners, update timelines, and resolve incidents with shared context.",
      icon: AlertTriangle,
      colorClass: "from-red-500 to-amber-500",
      illustration: (
        <div className="w-full h-full bg-[#1630A8] border border-red-500/20 rounded-xl p-4 flex flex-col justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5 text-red-400 border-b border-slate-800 pb-2">
            <span className="font-semibold text-[10px]">CRITICAL</span>
            <span className="text-slate-300">INC-2041: Latency Spike</span>
          </div>
          <div className="space-y-1.5 my-2 text-[10px] text-slate-300">
            <div className="flex gap-2">
              <span className="text-slate-500">10:45 AM</span>
              <span>Alert triggered: &gt; 2000ms response</span>
            </div>
            <div className="flex gap-2 text-amber-300">
              <span className="text-slate-500">10:47 AM</span>
              <span>Dani assigned as incident owner</span>
            </div>
            <div className="flex gap-2">
              <span className="text-slate-500">10:55 AM</span>
              <span>Team preparing emergency rollback</span>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-slate-800/60 pt-2 text-[10px]">
            <span className="text-slate-400">Commander: Dani M.</span>
            <span className="text-slate-500">Collaborators: 5 online</span>
          </div>
        </div>
      )
    },
    {
      title: "AI-Assisted Incident Support",
      description: "Summarize alerts, group signals, and get recommended next actions.",
      icon: Cpu,
      colorClass: "from-indigo-500 to-purple-400",
      illustration: (
        <div className="w-full h-full bg-[#1630A8] border border-indigo-500/30 rounded-xl p-4 flex flex-col justify-between text-xs font-sans">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <div className="p-1 rounded bg-indigo-500/10 text-indigo-400">
              <Cpu size={12} className="animate-pulse" />
            </div>
            <span className="text-slate-200 font-semibold text-[10px] tracking-wider uppercase font-mono">AI RECOMMENDER</span>
          </div>
          <div className="my-2 p-2 bg-indigo-500/5 rounded border border-indigo-500/10 space-y-1 text-[11px] text-slate-300">
            <p className="font-medium text-slate-200">Suggested Action:</p>
            <p className="text-slate-400 leading-relaxed font-mono text-[9px]">
              "Timeout increased shortly after v2.4.1. Rollback api-gateway to restore immediate checkout checkout flows."
            </p>
          </div>
          <div className="flex justify-end gap-1.5 text-[9px]">
            <button className="px-2 py-0.8 border border-slate-700 hover:border-slate-600 rounded text-slate-400">Dismiss</button>
            <button className="px-2 py-0.8 bg-indigo-600 rounded text-white font-medium">Apply Rule</button>
          </div>
        </div>
      )
    },
    {
      title: "Team Collaboration Tools",
      description: "Coordinate mentions, updates, shared notes, and action items across your team.",
      icon: Users,
      colorClass: "from-emerald-500 to-teal-400",
      illustration: (
        <div className="w-full h-full bg-[#1630A8] border border-emerald-500/20 rounded-xl p-4 flex flex-col justify-between text-xs font-sans">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400 font-semibold text-[10px] font-mono">TEAM UPDATES</span>
            <div className="flex -space-x-1">
              <span className="w-4 h-4 bg-indigo-500 text-white rounded-full flex items-center justify-center text-[8px] font-bold">AD</span>
              <span className="w-4 h-4 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[8px] font-bold">ND</span>
              <span className="w-4 h-4 bg-purple-500 text-white rounded-full flex items-center justify-center text-[8px] font-bold">DM</span>
            </div>
          </div>
          <div className="space-y-2 my-2 text-[10px]">
            <div className="p-1.5 rounded bg-slate-800/40">
              <span className="text-indigo-400 font-mono font-bold">@Dani:</span>
              <span className="text-slate-300 ml-1">"I have verified staging metrics represent healthy CPU margins."</span>
            </div>
            <div className="p-1.5 rounded bg-slate-800/40">
              <span className="text-emerald-400 font-mono font-bold">@Nami:</span>
              <span className="text-slate-300 ml-1">"Rollback preparation for gateway is now green-lit."</span>
            </div>
          </div>
          <div className="text-[9px] text-slate-500 italic">3 team members actively online</div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onFinish();
    }
  };

  const IconComponent = slides[currentSlide].icon;

  return (
    <div className="min-h-screen bg-[#1A2260] text-slate-100 flex flex-col justify-between p-6 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[110px] pointer-events-none" />

      {/* Header Row */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#E8ECFE] border border-[#4F6EF7]/35 rounded-lg flex items-center justify-center shadow">
            <img src={stackupLogo} alt="" className="w-6.5 h-6.5 object-contain" />
          </div>
          <span className="font-bold tracking-tight text-sm">StackUp</span>
        </div>

        <button
          onClick={onSkip}
          id="skip-onboarding-btn"
          className="text-xs text-slate-400 hover:text-white hover:bg-slate-800/60 px-3 py-1.5 rounded-lg font-medium transition-colors outline-none cursor-pointer"
        >
          Skip
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 max-w-4xl mx-auto my-auto z-10 w-full py-6">
        
        {/* Left Side: Text and Slides description */}
        <div className="w-full lg:w-1/2 flex flex-col space-y-4 text-center lg:text-left">
          <div className="text-xs font-mono font-bold tracking-wider text-indigo-400 uppercase bg-indigo-500/10 px-2 py-1 rounded inline-self-center lg:inline-self-start max-w-xs self-center lg:self-start">
            Step {currentSlide + 1} of 4
          </div>

          <h2 className="text-xl lg:text-3xl font-extrabold text-slate-100 leading-tight">
            Welcome to StackUp, {userName}
          </h2>

          <div className="min-h-[140px] flex flex-col justify-center lg:justify-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-center lg:justify-start gap-2.5">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${slides[currentSlide].colorClass} text-white shadow-md`}>
                    <IconComponent size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-200">
                    {slides[currentSlide].title}
                  </h3>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
                  {slides[currentSlide].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Stepper Dots & Navigation buttons */}
          <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
            {/* Dot Selectors */}
            <div className="flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? "w-6 bg-indigo-500" : "w-2.5 bg-slate-700 hover:bg-slate-600"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: High Fidelity visual illustration schematics */}
        <div className="w-full sm:w-[320px] md:w-[360px] h-[240px] flex-shrink-0 z-10 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-500 rounded-2xl opacity-[0.06] blur-xl" />
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full relative"
            >
              <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700/40 p-1 shadow-2xl">
                {slides[currentSlide].illustration}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Footer Navigation Buttons */}
      <div className="flex items-center justify-between z-10 mt-auto pt-6 border-t border-slate-800/50 max-w-4xl w-full mx-auto">
        <button
          onClick={() => currentSlide > 0 && setCurrentSlide(prev => prev - 1)}
          disabled={currentSlide === 0}
          className={`text-slate-400 px-4 py-2 rounded-lg text-xs font-semibold hover:text-slate-200 transition-colors cursor-pointer ${
            currentSlide === 0 ? "opacity-0 cursor-not-allowed" : "opacity-100"
          }`}
        >
          Previous
        </button>

        <button
          onClick={nextSlide}
          id="next-step-btn"
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
        >
          {currentSlide === slides.length - 1 ? (
            <>
              <span>Get Started</span>
              <ArrowRight size={14} className="animate-pulse" />
            </>
          ) : (
            <>
              <span>Next</span>
              <ChevronRight size={14} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

