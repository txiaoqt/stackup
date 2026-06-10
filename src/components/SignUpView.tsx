import React, { useState } from "react";
import { Lock, Mail, Server, User } from "lucide-react";
import { AppScreen } from "../types";
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
      setErrorSim("Please populate all credential fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorSim("Password validation check mismatch, parameters must match.");
      return;
    }

    if (password.length < 6) {
      setErrorSim("Password parameter too short. Use at least 6 characters.");
      return;
    }

    if (!agreeTerms) {
      setErrorSim("Please consent to the operational workspace terms.");
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
    <div className="min-h-screen bg-[#EEF2FF] text-[#1A2260] flex flex-col justify-between p-6 relative overflow-hidden select-none">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#EEF2FF_0%,#F8FAFF_48%,#E8ECFE_100%)] pointer-events-none" />

      <div className="flex items-center gap-2 max-w-md w-full mx-auto z-10">
        <div className="w-9 h-9 bg-white border border-[#C7D2FE] rounded-xl flex items-center justify-center shadow-sm">
          <img src={stackupLogo} alt="" className="w-7 h-7 object-contain" />
        </div>
        <span className="font-extrabold tracking-tight text-base text-[#1A2260]">
          Stack<span className="text-[#4F6EF7]">Up</span>
        </span>
      </div>

      <div className="max-w-md w-full bg-white border border-[#C7D2FE] rounded-2xl p-7 mx-auto my-auto z-10 shadow-[0_24px_70px_rgba(26,34,96,0.14)] space-y-5">
        <div>
          <span className="text-[10px] text-[#5B668F] uppercase tracking-widest font-bold font-mono">
            AUTHORIZED REGISTRATION
          </span>
          <h2 className="text-2xl font-extrabold text-[#1A2260] mt-1 tracking-tight">
            Setup operating center
          </h2>
          <p className="text-sm text-[#5B668F] mt-1.5">
            Acquire single-pane command observability.
          </p>
        </div>

        {errorSim && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 text-sm rounded-lg font-medium">
            {errorSim}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] text-[#2B48D4] uppercase tracking-widest font-extrabold">
              Full Operator Name
            </label>
            <div className="relative">
              <User size={15} className="absolute left-3.5 top-3.5 text-[#5B668F]" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Dani Martinez"
                id="signup-fullname-input"
                className="w-full h-11 text-sm bg-[#F8FAFF] border border-[#B8C4FF] px-3.5 pl-10 rounded-lg text-[#1A2260] placeholder-[#8190BE] outline-none hover:border-[#8EA2FF] focus:border-[#4F6EF7] focus:ring-4 focus:ring-[#4F6EF7]/15 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-[#2B48D4] uppercase tracking-widest font-extrabold">
              Work Email Address
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-3.5 text-[#5B668F]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@acme.dev"
                id="signup-email-input"
                className="w-full h-11 text-sm bg-[#F8FAFF] border border-[#B8C4FF] px-3.5 pl-10 rounded-lg text-[#1A2260] placeholder-[#8190BE] outline-none hover:border-[#8EA2FF] focus:border-[#4F6EF7] focus:ring-4 focus:ring-[#4F6EF7]/15 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-[10px] text-[#2B48D4] uppercase tracking-widest font-extrabold">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-3.5 text-[#5B668F]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  id="signup-password-input"
                  className="w-full h-11 text-sm bg-[#F8FAFF] border border-[#B8C4FF] px-3.5 pl-10 rounded-lg text-[#1A2260] placeholder-[#8190BE] outline-none hover:border-[#8EA2FF] focus:border-[#4F6EF7] focus:ring-4 focus:ring-[#4F6EF7]/15 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-[#2B48D4] uppercase tracking-widest font-extrabold">
                Verify Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Password"
                id="signup-confirmpassword-input"
                className="w-full h-11 text-sm bg-[#F8FAFF] border border-[#B8C4FF] px-3.5 rounded-lg text-[#1A2260] placeholder-[#8190BE] outline-none hover:border-[#8EA2FF] focus:border-[#4F6EF7] focus:ring-4 focus:ring-[#4F6EF7]/15 transition-all"
              />
            </div>
          </div>

          <label className="flex items-start gap-2 py-1 select-none text-sm text-[#5B668F] cursor-pointer">
            <input
              type="checkbox"
              id="signup-terms-check"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 accent-[#4F6EF7] w-4 h-4 rounded cursor-pointer"
            />
            <span>I agree to standard cloud pipeline audit procedures.</span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            id="signup-submit-btn"
            className="w-full h-11 bg-[#4F6EF7] text-white font-extrabold text-sm rounded-lg shadow-[0_12px_28px_rgba(79,110,247,0.28)] hover:bg-[#2B48D4] transition-all cursor-pointer flex items-center justify-center active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? "Generating command tokens..." : "Deploy Workspace Cabin"}
          </button>
        </form>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-[#D7DEFF]" />
          <span className="flex-shrink mx-3 text-[10px] text-[#5B668F] font-bold uppercase font-mono tracking-wider">
            or sign up with
          </span>
          <div className="flex-grow border-t border-[#D7DEFF]" />
        </div>

        <button
          onClick={handleSSO}
          disabled={isSubmitting}
          id="signup-sso-btn"
          className="w-full h-11 bg-[#F8FAFF] border border-[#B8C4FF] text-[#1A2260] hover:bg-[#EEF2FF] hover:border-[#4F6EF7] rounded-lg text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
        >
          <Server size={14} className="text-[#4F6EF7]" />
          <span>Continue with Google SSO</span>
        </button>

        <div className="text-center pt-1">
          <span className="text-sm text-[#5B668F]">Already registered? </span>
          <button
            onClick={() => setScreen("SIGN_IN")}
            className="text-sm text-[#2B48D4] hover:underline font-bold cursor-pointer"
          >
            Access existing room
          </button>
        </div>
      </div>

      <div className="text-[11px] font-mono text-[#5B668F] z-10 text-center font-semibold">
        StackUp Access Gateway | v1.0.0
      </div>
    </div>
  );
}
