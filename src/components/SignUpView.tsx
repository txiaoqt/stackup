import React, { useState } from "react";
import { AppScreen } from "../types";
import { Lock, Mail, User, Server, Check } from "lucide-react";
import stackupLogo from "../../assets/stackup-logo.png";

interface SignUpViewProps {
  onSignUp: (email: string, name: string) => void;
  setScreen: (screen: AppScreen) => void;
}

export default function SignUpView({ onSignUp, setScreen }: SignUpViewProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errorSim, setErrorSim] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password || !confirmPassword) {
      setErrorSim("Please populate all credential indices.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorSim("Password validation check mismatch, parameters must match.");
      return;
    }

    if (password.length < 6) {
      setErrorSim("Password parameter too short (requires at least 6 keys).");
      return;
    }

    if (!agreeTerms) {
      setErrorSim("Please consent to the operational workspace terms above.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSignUp(email, fullName);
    }, 850);
  };

  const handleSSO = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSignUp("sso-user@organization.com", "DevOps Engineer");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#1A2260] text-slate-100 flex flex-col justify-between p-6 relative overflow-hidden select-none">
      {/* Background soft lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header logo */}
      <div className="flex items-center gap-2 max-w-4xl w-full mx-auto z-10">
        <div className="w-8 h-8 bg-[#E8ECFE] border border-[#4F6EF7]/35 rounded-lg flex items-center justify-center">
          <img src={stackupLogo} alt="" className="w-6.5 h-6.5 object-contain" />
        </div>
        <span className="font-bold tracking-tight text-sm">StackUp</span>
      </div>

      {/* Card body block */}
      <div className="max-w-md w-full bg-[#1630A8] border border-slate-800 rounded-2xl p-6.5 mx-auto my-auto z-10 shadow-2xl space-y-4">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-mono">AUTHORIZED REGISTRATION</span>
          <h2 className="text-xl font-extrabold text-slate-100 mt-0.5 tracking-tight font-sans">Setup Operating Center</h2>
          <p className="text-xs text-slate-400 mt-1">Acquire single-pane command observability.</p>
        </div>

        {errorSim && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-450 text-[11px] rounded-lg font-medium font-sans">
            {errorSim}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Full Operator Name</label>
            <div className="relative">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Dani Martinez"
                id="signup-fullname-input"
                className="w-full text-xs bg-slate-900 border border-slate-850 p-2.5 pl-9.5 rounded-lg text-slate-200 placeholder-slate-550 outline-none hover:border-slate-705 focus:border-[#4F6EF7]"
              />
              <User size={13} className="absolute left-3.5 top-3 text-slate-550" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Work Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@acme.dev"
                id="signup-email-input"
                className="w-full text-xs bg-slate-900 border border-slate-850 p-2.5 pl-9.5 rounded-lg text-slate-205 placeholder-slate-555 outline-none hover:border-slate-705 focus:border-[#4F6EF7]"
              />
              <Mail size={13} className="absolute left-3.5 top-3 text-slate-550" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  id="signup-password-input"
                  className="w-full text-xs bg-slate-900 border border-slate-850 p-2.5 pl-4.5 rounded-lg text-slate-350 placeholder-slate-555 outline-none hover:border-slate-705 focus:border-[#4F6EF7]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Verify Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  id="signup-confirmpassword-input"
                  className="w-full text-xs bg-slate-905 bg-slate-900 border border-slate-850 p-2.5 pl-4.5 rounded-lg text-slate-350 placeholder-slate-555 outline-none hover:border-slate-705 focus:border-[#4F6EF7]"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 py-1 select-none">
            <input
              type="checkbox"
              id="signup-terms-check"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="accent-[#4F6EF7] w-4 h-4 text-[#4F6EF7] rounded cursor-pointer"
            />
            <label htmlFor="signup-terms-check" className="text-[11px] text-slate-400 leading-normal cursor-pointer font-medium font-sans">
              I agree to standard cloud pipeline audit procedures.
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            id="signup-submit-btn"
            className="w-full py-2.8 bg-gradient-to-r from-indigo-600 to-indigo-600 text-white font-extrabold text-xs rounded-lg shadow-lg hover:from-indigo-500 hover:to-indigo-500 transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? "Generating command tokens..." : "Deploy Workspace Cabin"}
          </button>
        </form>

        <div className="relative flex py-1.5 items-center">
          <div className="flex-grow border-t border-slate-800/80" />
          <span className="flex-shrink mx-3 text-[10px] text-slate-500 font-bold uppercase font-mono tracking-wider">or sign up with</span>
          <div className="flex-grow border-t border-slate-800/80" />
        </div>

        {/* SSO */}
        <button
          onClick={handleSSO}
          disabled={isSubmitting}
          id="signup-sso-btn"
          className="w-full py-2.5 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-850 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
        >
          <Server size={12} className="text-[#4F6EF7]" />
          <span>Continue with Google SSO</span>
        </button>

        <div className="text-center pt-1.5">
          <span className="text-xs text-slate-450">Already registered? </span>
          <button
            onClick={() => setScreen("SIGN_IN")}
            className="text-xs text-[#4F6EF7] hover:underline font-bold cursor-pointer"
          >
            Access existing room
          </button>
        </div>
      </div>

      <div className="text-[11px] font-mono text-slate-500 z-10 text-center font-semibold">
        StackUp Access Gateway · v1.0.0
      </div>
    </div>
  );
}

