import { motion } from "motion/react";
import stackupLogo from "../../assets/stackup-logo.png";

interface SplashProps {
  onContinue: () => void;
}

export default function Splash({ onContinue }: SplashProps) {
  return (
    <div className="min-h-screen bg-[#1A2260] text-slate-100 flex flex-col justify-between items-center p-6 relative overflow-hidden select-none">
      {/* Background ambient circular gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-indigo-300/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Top spacing */}
      <div className="invisible text-xs">v1.0.0</div>

      {/* Main Centered Brand Block */}
      <div className="flex flex-col items-center text-center max-w-md z-10 my-auto">
        {/* Glowing Logo Block */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-24 h-24 mb-6 flex items-center justify-center"
        >
          {/* Pulsing ring */}
          <div className="absolute inset-0 rounded-2xl bg-indigo-500/20 animate-ping opacity-70" />
          
          <div className="relative w-24 h-24 p-3 bg-[#E8ECFE] border border-[#4F6EF7]/40 rounded-2xl shadow-xl shadow-indigo-500/10 hover:border-[#4F6EF7]/70 transition-colors">
            <img src={stackupLogo} alt="StackUp logo" className="w-full h-full object-contain" />
          </div>
        </motion.div>

        {/* Wordmark */}
        <motion.h1
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-extrabold tracking-tight font-sans text-slate-100 mb-2 flex items-center gap-1"
        >
          Stack<span className="text-indigo-400 bg-gradient-to-r from-indigo-400 to-[#E8ECFE] bg-clip-text text-transparent">Up</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-slate-400 text-sm font-medium tracking-wide mb-8 max-w-xs"
        >
          “Unified DevOps visibility for fast-moving teams.”
        </motion.p>

        {/* Pulsing Ring & Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full flex flex-col items-center space-y-4"
        >
          <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ left: "-100%" }}
              animate={{ left: "100%" }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-indigo-500 to-[#E8ECFE] rounded-full"
            />
          </div>

          <button
            onClick={onContinue}
            id="splash-continue-btn"
            className="group px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg text-sm font-medium hover:from-indigo-500 hover:to-indigo-400 transform hover:-translate-y-0.5 transition-all outline-none border border-indigo-400/30 shadow-lg shadow-indigo-500/10 cursor-pointer active:scale-95"
          >
            Continue to Portal
          </button>
        </motion.div>
      </div>

      {/* Footer Version Details */}
      <div className="text-[11px] font-mono text-slate-500 z-10 flex flex-col items-center gap-1">
        <div>StackUp Control Plane</div>
        <div className="opacity-70">v1.0.0 · Region: Cloud-Native</div>
      </div>
    </div>
  );
}

