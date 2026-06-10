import React, { useState } from "react";
import { RoleMember, AuditLog, AppScreen } from "../types";
import { Users, History, UserPlus, X, Shield, Terminal, Send, Search } from "lucide-react";

interface AccessAuditViewProps {
  members: RoleMember[];
  auditLogs: AuditLog[];
  onInviteUser: (email: string, role: string) => void;
  onChangeRole: (id: string, role: string) => void;
  setScreen: (screen: AppScreen) => void;
}

export default function AccessAuditView({
  members,
  auditLogs,
  onInviteUser,
  onChangeRole,
  setScreen
}: AccessAuditViewProps) {
  const [activeTab, setActiveTab] = useState<"members" | "audit">("members");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Member");
  const [searchMemberQuery, setSearchMemberQuery] = useState("");
  const [searchAuditQuery, setSearchAuditQuery] = useState("");

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim() || !inviteEmail.includes("@")) return;
    onInviteUser(inviteEmail.trim(), inviteRole);
    setInviteEmail("");
    setShowInviteModal(false);
  };

  const filteredMembers = members.filter(m => 
    m.user.toLowerCase().includes(searchMemberQuery.toLowerCase()) ||
    m.email.toLowerCase().includes(searchMemberQuery.toLowerCase()) ||
    m.role.toLowerCase().includes(searchMemberQuery.toLowerCase())
  );

  const filteredAuditLogs = auditLogs.filter(log => 
    log.actor.toLowerCase().includes(searchAuditQuery.toLowerCase()) ||
    log.action.toLowerCase().includes(searchAuditQuery.toLowerCase()) ||
    log.resource.toLowerCase().includes(searchAuditQuery.toLowerCase()) ||
    log.ip.toLowerCase().includes(searchAuditQuery.toLowerCase())
  );

  return (
    <div className="flex-grow p-8 space-y-6 overflow-y-auto" id="access-audit-view">
      
      {/* Sub-nav tabs selector row */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("members")}
            className={`px-4 py-2 rounded-lg text-xs font-bold leading-none uppercase tracking-wider cursor-pointer transition-all ${
              activeTab === "members" 
                ? "bg-slate-800 text-white border border-[#38BDF8]/20 shadow-sm"
                : "text-slate-400 hover:text-slate-100"
            }`}
          >
            Team Roles &amp; Members
          </button>
          <button
            onClick={() => setActiveTab("audit")}
            className={`px-4 py-2 rounded-lg text-xs font-bold leading-none uppercase tracking-wider cursor-pointer transition-all ${
              activeTab === "audit" 
                ? "bg-slate-800 text-white border border-[#38BDF8]/20 shadow-sm"
                : "text-slate-400 hover:text-slate-100"
            }`}
          >
            Audit Trails &amp; Logs
          </button>
        </div>

        {/* Invite buttons context */}
        {activeTab === "members" ? (
          <button
            onClick={() => setShowInviteModal(true)}
            id="members-invite-trigger-btn"
            className="flex items-center gap-1.5 px-4.5 py-2 text-xs font-bold bg-[#38BDF8] text-slate-950 hover:bg-sky-400 rounded-lg transition-all active:scale-95 cursor-pointer shadow-md shadow-sky-400/10"
          >
            <UserPlus size={13} />
            <span>Invite Team Member</span>
          </button>
        ) : (
          <div className="relative w-48 sm:w-64">
            <input
              type="text"
              value={searchAuditQuery}
              onChange={(e) => setSearchAuditQuery(e.target.value)}
              placeholder="Filter audit logs..."
              id="audit-logs-search"
              className="w-full bg-slate-900 border border-slate-800 pl-9 py-1.8 text-xs rounded-xl text-slate-100 outline-none hover:border-slate-705 focus:border-[#38BDF8]"
            />
            <Search size={12} className="absolute left-3 top-2.5 text-slate-500" />
          </div>
        )}
      </div>

      {/* Main Section Content blocks conditional */}
      {activeTab === "members" ? (
        <div className="bg-[#1E293B] rounded-xl border border-slate-800 overflow-hidden shadow-sm">
          <div className="px-6 py-4.5 border-b border-slate-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Users size={15} className="text-blue-400" />
              <span>Workspace User Roles Management</span>
            </h3>

            <div className="relative w-48 sm:w-64">
              <input
                type="text"
                value={searchMemberQuery}
                onChange={(e) => setSearchMemberQuery(e.target.value)}
                placeholder="Search teammates..."
                id="members-search-query"
                className="w-full bg-slate-900 border border-slate-800/80 pl-9.5 pr-4 py-1.8 text-xs rounded-xl text-slate-100 outline-none hover:border-slate-700 focus:border-[#38BDF8]"
              />
              <Search size={12} className="absolute left-3.5 top-2.5 text-slate-500" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-900/35 text-[10px] text-slate-405 uppercase tracking-wider border-b border-slate-850 font-mono font-bold">
                  <th className="px-6 py-3">Member Name</th>
                  <th className="px-6 py-3">Email Address</th>
                  <th className="px-6 py-3">Assigned Role</th>
                  <th className="px-6 py-3">Workspace Permissions</th>
                  <th className="px-6 py-3 text-right">Last Active Time</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-slate-800/60 text-slate-350">
                {filteredMembers.map((mem) => (
                  <tr key={mem.id} className="hover:bg-slate-800/25 transition-all">
                    <td className="px-6 py-3.5 font-bold text-slate-200">{mem.user}</td>
                    <td className="px-6 py-3.5 font-mono text-slate-400">{mem.email}</td>
                    <td className="px-6 py-3.5">
                      <select
                        value={mem.role}
                        onChange={(e) => onChangeRole(mem.id, e.target.value)}
                        className="bg-slate-900 hover:border-slate-700 select-role-control border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-300 outline-none cursor-pointer"
                      >
                        <option value="Admin">Admin</option>
                        <option value="Member">Member</option>
                        <option value="Viewer">Viewer</option>
                      </select>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="text-[10px] bg-slate-900 text-[#38BDF8] border border-[#38BDF8]/15 px-2 py-0.5 rounded font-mono font-bold">
                        {mem.permissions}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-right font-medium text-slate-400 font-mono">{mem.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-[#1E293B] rounded-xl border border-slate-800 overflow-hidden shadow-sm">
          <div className="px-6 py-4.5 border-b border-slate-850 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Terminal size={15} className="text-[#38BDF8]" />
              <span>Team Operational Audit Stream Index</span>
            </h3>
            <span className="text-[10px] text-emerald-450 bg-emerald-500/10 px-2 py-0.5 rounded animate-pulse font-bold uppercase">
              Live Auditing Channel
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-900/35 text-[10px] text-slate-405 uppercase tracking-wider border-b border-slate-850 font-mono font-bold">
                  <th className="px-6 py-3">Timestamp Checks</th>
                  <th className="px-6 py-3">Account Actor</th>
                  <th className="px-6 py-3">Operation Action</th>
                  <th className="px-6 py-3">Target Resource</th>
                  <th className="px-6 py-3 text-right">Source IP Origin</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-slate-800/60 font-mono text-slate-350">
                {filteredAuditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/25 transition-all text-[11px] leading-relaxed">
                    <td className="px-6 py-3.5 text-slate-450">{log.timestamp}</td>
                    <td className="px-6 py-3.5 font-sans font-bold text-slate-200">{log.actor}</td>
                    <td className="px-6 py-3.5 text-slate-300 font-sans">{log.action}</td>
                    <td className="px-6 py-3.5 text-[#38BDF8] font-bold">{log.resource}</td>
                    <td className="px-6 py-3.5 text-right text-slate-500">{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Invite member modal overlay */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs select-none">
          <div className="bg-[#1E293B] border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-1.5 font-sans">
                <UserPlus size={16} className="text-[#38BDF8]" />
                <span>Invite teammate workspace</span>
              </h3>
              <button 
                onClick={() => setShowInviteModal(false)}
                className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Core Email Address</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="teammate@organization.com"
                  id="invite-member-email"
                  required
                  className="w-full text-xs bg-slate-900 border border-slate-850 p-2.5 rounded-lg text-slate-300 placeholder-slate-550 outline-none hover:border-slate-700/80 focus:border-[#38BDF8]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Assigned Resource Access Right</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  id="invite-member-role-selector"
                  className="w-full text-xs bg-slate-900 border border-slate-850 p-2.5 rounded-lg text-slate-305 outline-none hover:border-slate-705 focus:border-[#38BDF8] cursor-pointer"
                >
                  <option value="Admin">Admin (All writes &amp; releases)</option>
                  <option value="Member">Member (Incidents &amp; writes)</option>
                  <option value="Viewer">Viewer (Read logs only)</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2.5">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-bold text-xs rounded-lg border border-slate-700 hover:text-white hover:bg-slate-700 transition-all cursor-pointer animate-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="invite-member-submit-btn"
                  className="px-4.5 py-2 bg-[#38BDF8] text-slate-950 font-extrabold text-xs rounded-lg hover:bg-sky-400 transition-all shadow-md shadow-sky-400/10 cursor-pointer"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
