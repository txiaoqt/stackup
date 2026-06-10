import { motion } from "motion/react";

interface SplashProps {
  onContinue: () => void;
}

export default function Splash({ onContinue }: SplashProps) {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col justify-between items-center p-6 relative overflow-hidden select-none">
      {/* Background ambient circular gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

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
          <div className="absolute inset-0 rounded-2xl bg-blue-500/20 animate-ping opacity-70" />
          
          {/* Stacked Blocks Logo */}
          <div className="relative flex flex-col space-y-2 p-4 bg-[#1E293B] border border-blue-500/30 rounded-2xl shadow-xl shadow-blue-500/10 hover:border-blue-500/50 transition-colors">
            <div className="w-12 h-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-sm shadow-md" />
            <div className="w-12 h-3 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-sm transform translate-x-2 shadow-md" />
            <div className="w-12 h-3 bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-sm transform -translate-x-1 shadow-md" />
          </div>
        </motion.div>

        {/* Wordmark */}
        <motion.h1
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-extrabold tracking-tight font-sans text-slate-100 mb-2 flex items-center gap-1"
        >
          Stack<span className="text-blue-400 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Up</span>
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
              className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
            />
          </div>

          <button
            onClick={onContinue}
            id="splash-continue-btn"
            className="group px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-sm font-medium hover:from-blue-500 hover:to-blue-400 transform hover:-translate-y-0.5 transition-all outline-none border border-blue-400/30 shadow-lg shadow-blue-500/10 cursor-pointer active:scale-95"
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
