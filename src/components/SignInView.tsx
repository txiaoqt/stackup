import React, { useState } from "react";
import { AppScreen } from "../types";
import { Lock, Mail, Server, Sparkles, Check } from "lucide-react";
import stackupLogo from "../../assets/stackup-logo.png";

interface SignInViewProps {
  onSignIn: (email: string) => void;
  setScreen: (screen: AppScreen) => void;
}

export default function SignInView({ onSignIn, setScreen }: SignInViewProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorSim, setErrorSim] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorSim("Please fill in all requested credential parameters.");
      return;
    }

    if (password.length < 4) {
      setErrorSim("Password validation parameter is too short (min 4 bounds check).");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSignIn(email);
    }, 800);
  };

  const handleSSO = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSignIn("sso-user@organization.com");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#1A2260] text-slate-100 flex flex-col justify-between p-6 relative overflow-hidden select-none">
      {/* Background circular highlights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header logo bar */}
      <div className="flex items-center gap-2 max-w-4xl w-full mx-auto z-10">
        <div className="w-8 h-8 bg-[#E8ECFE] border border-[#4F6EF7]/35 rounded-lg flex items-center justify-center">
          <img src={stackupLogo} alt="" className="w-6.5 h-6.5 object-contain" />
        </div>
        <span className="font-bold tracking-tight text-sm">StackUp</span>
      </div>

      {/* Card context */}
      <div className="max-w-md w-full bg-[#1630A8] border border-slate-800 rounded-2xl p-7 mx-auto my-auto z-10 shadow-2xl space-y-5">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-mono">AUTHORIZED GATEWAY</span>
          <h2 className="text-xl font-extrabold text-slate-100 mt-0.5 tracking-tight">Sign In control room</h2>
          <p className="text-xs text-slate-400 mt-1">Connect your workspace pipeline variables database.</p>
        </div>

        {errorSim && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-lg font-medium">
            {errorSim}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@organization.com"
                id="signin-email-input"
                className="w-full text-xs bg-slate-900 border border-slate-800 p-2.5 pl-9.5 rounded-lg text-slate-200 placeholder-slate-550 outline-none hover:border-slate-700/80 focus:border-[#4F6EF7]"
              />
              <Mail size={13} className="absolute left-3.5 top-3 text-slate-550" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                id="signin-password-input"
                className="w-full text-xs bg-slate-900 border border-slate-800 p-2.5 pl-9.5 rounded-lg text-slate-300 placeholder-slate-550 outline-none hover:border-slate-700/80 focus:border-[#4F6EF7]"
              />
              <Lock size={13} className="absolute left-3.5 top-3 text-slate-550" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            id="signin-submit-btn"
            className="w-full py-2.8 bg-gradient-to-r from-indigo-600 to-indigo-600 text-white font-extrabold text-xs rounded-lg shadow-lg hover:from-indigo-500 hover:to-indigo-500 transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? "Authenticating control hashes..." : "Access Control Cabin"}
          </button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-800/80" />
          <span className="flex-shrink mx-3 text-[10px] text-slate-500 font-bold uppercase font-mono tracking-wider">or sign in with</span>
          <div className="flex-grow border-t border-slate-800/80" />
        </div>

        {/* SSO Button */}
        <button
          onClick={handleSSO}
          disabled={isSubmitting}
          id="signin-sso-btn"
          className="w-full py-2.5 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-850 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
        >
          <Server size={12} className="text-[#4F6EF7]" />
          <span>Continue with Google Single-Sign-On</span>
        </button>

        {/* Foot link code to Sign Up */}
        <div className="text-center pt-2">
          <span className="text-xs text-slate-450">Don't have an operating center? </span>
          <button
            onClick={() => setScreen("SIGN_UP")}
            className="text-xs text-[#4F6EF7] hover:underline font-bold cursor-pointer"
          >
            Create account
          </button>
        </div>
      </div>

      <div className="text-[11px] font-mono text-slate-500 z-10 text-center font-semibold">
        StackUp Access Gateway · v1.0.0
      </div>
    </div>
  );
}

