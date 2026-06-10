import { motion } from "motion/react";
import stackupLogo from "../../assets/stackup-logo.png";

interface SplashProps {
  onContinue: () => void;
}

export default function Splash({ onContinue }: SplashProps) {
  return (
    <div className="min-h-screen bg-[#EEF2FF] text-[#1A2260] flex flex-col justify-between items-center p-6 relative overflow-hidden select-none">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#EEF2FF_0%,#F8FAFF_52%,#E8ECFE_100%)] pointer-events-none" />

      <div className="invisible text-xs">v1.0.0</div>

      <div className="flex flex-col items-center text-center max-w-md z-10 my-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-24 h-24 mb-6 flex items-center justify-center"
        >
          <div className="absolute inset-0 rounded-2xl bg-[#4F6EF7]/15 animate-ping opacity-60" />
          <div className="relative w-24 h-24 p-3 bg-white border border-[#B8C4FF] rounded-2xl shadow-[0_18px_46px_rgba(43,72,212,0.18)] hover:border-[#4F6EF7]/70 transition-colors">
            <img src={stackupLogo} alt="StackUp logo" className="w-full h-full object-contain" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-extrabold tracking-tight font-sans text-[#1A2260] mb-2 flex items-center gap-1"
        >
          Stack<span className="text-[#4F6EF7]">Up</span>
        </motion.h1>

        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-[#4B5A86] text-sm font-semibold tracking-wide mb-8 max-w-xs"
        >
          Unified DevOps visibility for fast-moving teams.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full flex flex-col items-center space-y-4"
        >
          <div className="w-48 h-1.5 bg-white border border-[#D7DEFF] rounded-full overflow-hidden relative shadow-sm">
            <motion.div
              initial={{ left: "-100%" }}
              animate={{ left: "100%" }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-[#4F6EF7] to-[#2B48D4] rounded-full"
            />
          </div>

          <button
            onClick={onContinue}
            id="splash-continue-btn"
            className="group px-6 py-2.5 bg-[#4F6EF7] text-white rounded-lg text-sm font-extrabold hover:bg-[#2B48D4] transform hover:-translate-y-0.5 transition-all outline-none border border-[#2B48D4]/20 shadow-[0_12px_28px_rgba(79,110,247,0.28)] cursor-pointer active:scale-95"
          >
            Continue to Portal
          </button>
        </motion.div>
      </div>

      <div className="text-[11px] font-mono text-[#5B668F] z-10 flex flex-col items-center gap-1">
        <div>StackUp Control Plane</div>
        <div className="opacity-80">v1.0.0 | Region: Cloud-Native</div>
      </div>
    </div>
  );
}
