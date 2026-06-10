import React, { useState } from "react";
import { AppScreen, UserProfile, Deployment, Incident, Alert, DeploymentLog, TeamMemberPresence, RoleMember, AuditLog } from "./types";
import { 
  initialDeployments, 
  deploymentLogs, 
  initialIncidents, 
  initialAlerts, 
  initialIntegrations, 
  initialRoleMembers, 
  initialAuditLogs, 
  initialTeamPresence 
} from "./data";

// Import custom views
import Splash from "./components/Splash";
import WelcomeCarousel from "./components/WelcomeCarousel";
import SignInView from "./components/SignInView";
import SignUpView from "./components/SignUpView";
import AccountSetup from "./components/AccountSetup";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import DashboardView from "./components/DashboardView";
import DeploymentsView from "./components/DeploymentsView";
import IncidentsView from "./components/IncidentsView";
import MonitoringView from "./components/MonitoringView";
import CollaborationView from "./components/CollaborationView";
import AIAssistantView from "./components/AIAssistantView";
import IntegrationsView from "./components/IntegrationsView";
import AccessAuditView from "./components/AccessAuditView";

export default function App() {
  // Screens state routing controller
  const [screen, setScreen] = useState<AppScreen>("SPLASH");

  // User details state
  const [user, setUser] = useState<UserProfile>({
    id: "u-1",
    fullName: "Aly D.",
    email: "aly@acme.dev",
    jobTitle: "DevOps Engineer",
    timezone: "UTC -4 (Eastern Time)",
    teamName: "Acme DevOps Squad",
    teamSize: "5 - 15 Members"
  });

  // State arrays populated with mock initial logs
  const [deployments, setDeployments] = useState<Deployment[]>(initialDeployments);
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [logs, setLogs] = useState<DeploymentLog[]>(deploymentLogs);
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [members, setMembers] = useState<RoleMember[]>(initialRoleMembers);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);
  const [teamPresence, setTeamPresence] = useState<TeamMemberPresence[]>(initialTeamPresence);

  // Selected item references for detail screens
  const [selectedDeploymentId, setSelectedDeploymentId] = useState<string | null>("dep-1");
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>("INC-2041");

  // AI Summary Banner display
  const [showAISummary, setShowAISummary] = useState(true);

  // Collaborative chat notifications
  const [mentions, setMentions] = useState([
    { id: "m-1", user: "@Dani", text: "mentioned you: Let us prepare rollback routes for api-gateway release fast.", time: "2 min ago", filter: "Mentions" },
    { id: "m-2", user: "@Nami", text: "assigned you: Please check transaction error outputs on billing-worker stack.", time: "8 min ago", filter: "Assignments" },
    { id: "m-3", user: "@Aly", text: "posted update: Initiated test deployments targeting secondary sandbox cluster.", time: "15 min ago", filter: "Updates" }
  ]);

  // AI Assistant chat logs
  const [aiChatHistory, setAiChatHistory] = useState<Array<{ role: "user" | "model"; content: string }>>([
    { 
      role: "model", 
      content: "Hello! I am your StackUp GenAI Assistant. I have analyzed INC-2041: API latency spike in production. All signals suggest an increased connection timeout during the newest gateway deploy. Let me know if you would like me to formulate a rollback proposal, analyze system logs, or inspect database metrics." 
    }
  ]);
  const [isGeneratingChat, setIsGeneratingChat] = useState(false);

  // General state modifiers:
  // 1. Rollback Deploy
  const handleRollback = (originalVersion: string, targetVersion: string) => {
    // Modify status of current deployment to success
    setDeployments((prev) => 
      prev.map(dep => {
        if (dep.id === "dep-1") {
          return { ...dep, status: "Success", version: targetVersion };
        }
        return dep;
      })
    );

    // Append successful roll-back events logs
    const newTimestamp = new Date().toLocaleTimeString();
    const newLogLines = [
      { timestamp: newTimestamp, level: "INFO" as const, message: `Emergency command executing: redirecting gateway context back to stable ${targetVersion}` },
      { timestamp: newTimestamp, level: "INFO" as const, message: `Canary group traffic shifted successfully` },
      { timestamp: newTimestamp, level: "INFO" as const, message: `Rollback completed. Service restored.` }
    ];
    setLogs((prev) => [...prev, ...newLogLines]);

    // Append audit item log
    const timestampLog = `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const newAudit: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: timestampLog,
      actor: user.fullName,
      action: `Executed emergency proxy rollback from ${originalVersion} to ${targetVersion}`,
      resource: "api-gateway",
      ip: "192.168.1.144"
    };
    setAuditLogs((prev) => [newAudit, ...prev]);

    // Modify active alert status on-the-fly
    setAlerts((prev) => 
      prev.map(al => al.id === "al-1" ? { ...al, status: "Resolved" } : al)
    );

    alert(`Rollback completed successfully! Transaction route successfully reassigned to stable ${targetVersion}.`);
  };

  // 2. Clear alert
  const handleClearAlert = (alertId: string) => {
    setAlerts((prev) => prev.map(al => al.id === alertId ? { ...al, status: "Resolved" } : al));
    
    const timestampLog = `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const newAudit: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: timestampLog,
      actor: user.fullName,
      action: `Cleared alert threshold marker`,
      resource: `Alert ID: ${alertId}`,
      ip: "192.168.1.144"
    };
    setAuditLogs((prev) => [newAudit, ...prev]);
  };

  // 3. Post incident note & timeline event
  const handlePostNote = (incidentId: string, noteText: string) => {
    const timestampText = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        return {
          ...inc,
          timeline: [
            ...inc.timeline,
            { time: timestampText, event: `Update: ${noteText}` }
          ],
          notes: [...inc.notes, noteText]
        };
      }
      return inc;
    }));

    // Post update to team collaboration chat as well!
    const newMention = {
      id: `m-${Date.now()}`,
      user: `@${user.fullName.split(" ")[0]}`,
      text: `posted notes on ${incidentId}: "${noteText}"`,
      time: "Just now",
      filter: "Updates"
    };
    setMentions(prev => [newMention, ...prev]);
  };

  // 4. Toggle incident task item check Box
  const handleToggleActionItem = (incidentId: string, itemId: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        return {
          ...inc,
          actionItems: inc.actionItems.map(item => 
            item.id === itemId ? { ...item, checked: !item.checked } : item
          )
        };
      }
      return inc;
    }));
  };

  // 5. Update incident status
  const handleUpdateStatus = (incidentId: string, itemStatus: Incident["status"]) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        return { ...inc, status: itemStatus };
      }
      return inc;
    }));

    const timestampLog = `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const newAudit: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: timestampLog,
      actor: user.fullName,
      action: `Updated status bounds to '${itemStatus}'`,
      resource: incidentId,
      ip: "192.168.1.144"
    };
    setAuditLogs((prev) => [newAudit, ...prev]);
  };

  // 6. Update incident owner
  const handleUpdateOwner = (incidentId: string, ownerName: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        return { ...inc, assignedOwner: ownerName };
      }
      return inc;
    }));
  };

  // 7. Team chat Composer
  const handleSendMessage = (messageText: string) => {
    const newMention = {
      id: `m-${Date.now()}`,
      user: `@${user.fullName.split(" ")[0]}`,
      text: messageText,
      time: "Just now",
      filter: "Updates"
    };
    setMentions(prev => [newMention, ...prev]);
  };

  // 8. Connecting integrations tool toggles
  const handleToggleToolConnection = (toolId: string, state: boolean) => {
    setIntegrations(prev => prev.map(tool => 
      tool.id === toolId ? { ...tool, connected: state } : tool
    ));

    const selectedToolName = integrations.find(t => t.id === toolId)?.name || "Service";
    const timestampLog = `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const newAudit: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: timestampLog,
      actor: user.fullName,
      action: state ? `Connected dynamic integration pipeline` : `Disconnected integration pipeline`,
      resource: selectedToolName,
      ip: "192.168.1.144"
    };
    setAuditLogs((prev) => [newAudit, ...prev]);
  };

  // 9. Change users roles
  const handleChangeRole = (memberId: string, chosenRole: string) => {
    setMembers(prev => prev.map(m => {
      if (m.id === memberId) {
        const derivedPerm = chosenRole === "Admin" ? "Full access" : chosenRole === "Member" ? "Incidents, Monitoring" : "Read-only";
        return { ...m, role: chosenRole, permissions: derivedPerm };
      }
      return m;
    }));

    const memberName = members.find(m => m.id === memberId)?.user || "User";
    const timestampLog = `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const newAudit: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: timestampLog,
      actor: user.fullName,
      action: `Modified workspace permissions to ${chosenRole}`,
      resource: memberName,
      ip: "192.168.1.144"
    };
    setAuditLogs((prev) => [newAudit, ...prev]);
  };

  // 10. Invite user
  const handleInviteUser = (email: string, targetRole: string) => {
    const baseName = email.split("@")[0];
    const uppercaseName = baseName.charAt(0).toUpperCase() + baseName.slice(1);
    const derivedPerm = targetRole === "Admin" ? "Full access" : targetRole === "Member" ? "Incidents, Monitoring" : "Read-only";
    
    const newMem: RoleMember = {
      id: `rm-${Date.now()}`,
      user: uppercaseName,
      email,
      role: targetRole,
      permissions: derivedPerm,
      lastActive: "Invited State"
    };

    setMembers(prev => [...prev, newMem]);

    const timestampLog = `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const newAudit: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: timestampLog,
      actor: user.fullName,
      action: `Issued workspace invitation role '${targetRole}'`,
      resource: email,
      ip: "192.168.1.144"
    };
    setAuditLogs((prev) => [newAudit, ...prev]);

    alert(`Invitation sent successfully to ${email}!`);
  };

  // 11. Custom Quick Actions
  const handleQuickDeploy = () => {
    const timestampText = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const successDeploy: Deployment = {
      id: `dep-${Date.now()}`,
      name: "api-gateway",
      version: `v2.4.${deployments.length + 1}`,
      environment: "Production",
      status: "Success",
      timestamp: "Just now",
      author: user.fullName.split(" ")[0],
      commitHash: `df${Math.floor(Math.random()*90000+10000)}`,
      affectedServices: ["api-gateway"]
    };

    setDeployments(prev => [successDeploy, ...prev]);

    const newLog = {
      timestamp: timestampText,
      level: "INFO" as const,
      message: `Manually triggered release build: api-gateway ${successDeploy.version} dispatched`
    };
    setLogs(prev => [newLog, ...prev]);

    const timestampLog = `Today, ${timestampText}`;
    const newAudit: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: timestampLog,
      actor: user.fullName,
      action: `Dispatched manual release api-gateway ${successDeploy.version}`,
      resource: "Release Pipeline",
      ip: "192.168.1.144"
    };
    setAuditLogs((prev) => [newAudit, ...prev]);

    alert(`Successfully launched manual production release build api-gateway ${successDeploy.version}!`);
  };

  const handleQuickIncident = () => {
    const timestampText = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newIncIdx = incidents.length + 2041;
    const itemInc: Incident = {
      id: `INC-${newIncIdx}`,
      title: "Unexpected downstream websocket disconnection",
      severity: "High",
      status: "Investigating",
      assignedOwner: user.fullName.split(" ")[0],
      timeOpened: timestampText,
      timeline: [
        { time: timestampText, event: "Incident logs opened manually" }
      ],
      actionItems: [
        { id: `act-${Date.now()}`, task: "Inspect webhook sockets", assignedTo: user.fullName.split(" ")[0], dueTime: "1 hour", checked: false }
      ],
      collaborators: [user.fullName.split(" ")[0]],
      notes: ["Manually triggered incident triage."],
      rootCause: "",
      resolution: ""
    };

    setIncidents(prev => [itemInc, ...prev]);

    const timestampLog = `Today, ${timestampText}`;
    const newAudit: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: timestampLog,
      actor: user.fullName,
      action: `Declared high severity incident ${itemInc.id}`,
      resource: itemInc.id,
      ip: "192.168.1.144"
    };
    setAuditLogs((prev) => [newAudit, ...prev]);

    setSelectedIncidentId(itemInc.id);
    setScreen("INCIDENT_DETAIL");
    alert(`New triage incident ${itemInc.id} opened. Re-routing view to detail stack.`);
  };

  const handleQuickInvite = () => {
    const targetAddr = prompt("Enter team member email address:", "teammate@organization.com");
    if (targetAddr) {
      handleInviteUser(targetAddr, "Member");
    }
  };

  // Convert recommended action cards buttons apply action to real functions
  const handleApplyRecommendation = (title: string) => {
    if (title.toLowerCase().includes("roll back") || title.toLowerCase().includes("v2.4.0")) {
      handleRollback("v2.4.1", "v2.4.0");
    } else {
      alert(`Recommendation applied successfully: "${title}"`);
    }
  };

  // 12. Conversational Gemini interactive model stream handler
  const handleSendAIChat = async (message: string) => {
    if (!message.trim()) return;

    // Append user message context
    const updatedHistory = [
      ...aiChatHistory,
      { role: "user" as const, content: message }
    ];
    setAiChatHistory(updatedHistory);
    setIsGeneratingChat(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });

      if (!response.ok) {
        throw new Error("Local endpoint mismatch");
      }

      const data = await response.json();
      setAiChatHistory(prev => [
        ...prev,
        { role: "model" as const, content: data.reply || "Diagnostic index calculated. All connections established." }
      ]);
    } catch (err) {
      // Local fallback simulator logic to maintain robust continuous action
      setTimeout(() => {
        let fallbackReply = "Simulated telemetry signal resolved. Connection status indicators are fully stable.";
        if (message.toLowerCase().includes("rollback") || message.toLowerCase().includes("v2.4")) {
          fallbackReply = "Acknowledged. Emergency Rollback of api-gateway yields stable proxy latencies of 45ms. Would you like me to initiate the rollback configuration now?";
        } else if (message.toLowerCase().includes("latency") || message.toLowerCase().includes("timeout")) {
          fallbackReply = "Review of api-gateway v2.4.1 diff shows line 42 modified PROXY_WRITE_TIMEOUT limit from 15000ms to 5000ms. High load exhausts response queues.";
        } else if (message.toLowerCase().includes("logs")) {
          fallbackReply = "Querying current stderr/stdout indexes reveals 12 instances of [HTTP 504 Gateway Timeout] starting at 10:45 AM. Connection backlog counts average 24.";
        }

        setAiChatHistory(prev => [
          ...prev,
          { role: "model" as const, content: fallbackReply }
        ]);
      }, 950);
    } finally {
      setIsGeneratingChat(false);
    }
  };

  // Routing Switchboard render selector
  const renderScreenContent = () => {
    switch (screen) {
      case "SPLASH":
        return <Splash onContinue={() => setScreen("SIGN_IN")} />;

      case "WELCOME_CAROUSEL":
        return (
          <WelcomeCarousel 
            userName={user.fullName.split(" ")[0]} 
            onSkip={() => setScreen("ACCOUNT_SETUP")} 
            onFinish={() => setScreen("ACCOUNT_SETUP")} 
          />
        );

      case "SIGN_IN":
        return (
          <SignInView 
            onSignIn={(email) => {
              setUser(prev => ({ ...prev, email }));
              setScreen("DASHBOARD");
            }} 
            setScreen={setScreen} 
          />
        );

      case "SIGN_UP":
        return (
          <SignUpView 
            onSignUp={(email, name) => {
              setUser(prev => ({ ...prev, email, fullName: name }));
              setScreen("WELCOME_CAROUSEL");
            }} 
            setScreen={setScreen} 
          />
        );

      case "ACCOUNT_SETUP":
        return (
          <AccountSetup 
            onFinishSetup={(profile) => {
              setUser(prev => ({ ...prev, ...profile }));
              setScreen("DASHBOARD");
            }} 
            onSkipSetup={() => setScreen("DASHBOARD")} 
          />
        );

      default:
        // Authenticated frames displaying left Sidebar & Top header navigation
        return (
          <div className="flex h-screen bg-[#0F172A] overflow-hidden font-sans text-slate-100" id="main-portal">
            {/* Left Sidebar Frame Nav */}
            <Sidebar 
              currentScreen={screen} 
              setScreen={setScreen} 
              user={user} 
              onLogout={() => setScreen("SIGN_IN")} 
            />

            {/* Right container frame */}
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
              {/* Top Bar Quick CTAs */}
              <TopBar 
                currentScreen={screen} 
                onNewIncident={handleQuickIncident}
                onDeployRelease={handleQuickDeploy}
                onInviteMember={handleQuickInvite}
              />

              {/* View body */}
              <div className="flex-1 flex flex-col overflow-hidden bg-[#0F172AD8]">
                {screen === "DASHBOARD" && (
                  <DashboardView 
                    deployments={deployments} 
                    incidents={incidents} 
                    alerts={alerts} 
                    setScreen={setScreen} 
                    setSelectedDeploymentId={setSelectedDeploymentId}
                    setSelectedIncidentId={setSelectedIncidentId}
                    showAISummary={showAISummary}
                    onDismissAI={() => setShowAISummary(false)}
                  />
                )}

                {screen === "DEPLOYMENT_DETAIL" && (
                  <DeploymentsView 
                    deployments={deployments} 
                    selectedDeploymentId={selectedDeploymentId} 
                    onRollback={handleRollback} 
                    logs={logs}
                    setScreen={setScreen}
                  />
                )}

                {screen === "INCIDENT_DETAIL" && (
                  <IncidentsView 
                    incidents={incidents} 
                    selectedIncidentId={selectedIncidentId} 
                    onPostNote={handlePostNote} 
                    onToggleActionItem={handleToggleActionItem} 
                    onUpdateStatus={handleUpdateStatus}
                    onUpdateOwner={handleUpdateOwner}
                    setScreen={setScreen}
                  />
                )}

                {screen === "MONITORING" && (
                  <MonitoringView 
                    alerts={alerts} 
                    logs={logs} 
                    setScreen={setScreen} 
                    onClearAlert={handleClearAlert}
                  />
                )}

                {screen === "AI_ASSISTANT" && (
                  <AIAssistantView 
                    onSendMessage={handleSendAIChat} 
                    aiChatHistory={aiChatHistory} 
                    isGeneratingChat={isGeneratingChat} 
                    onApplyRecommendation={handleApplyRecommendation}
                    setScreen={setScreen}
                  />
                )}

                {screen === "COLLABORATION" && (
                  <CollaborationView 
                    onSendMessage={handleSendMessage} 
                    mentions={mentions} 
                    teamPresence={teamPresence} 
                    setScreen={setScreen}
                  />
                )}

                {screen === "INTEGRATIONS" && (
                  <IntegrationsView 
                    initialTools={integrations} 
                    onToggleToolConnection={handleToggleToolConnection} 
                    setScreen={setScreen}
                  />
                )}

                {screen === "ACCESS_AUDIT" && (
                  <AccessAuditView 
                    members={members} 
                    auditLogs={auditLogs} 
                    onInviteUser={handleInviteUser} 
                    onChangeRole={handleChangeRole} 
                    setScreen={setScreen}
                  />
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full min-h-screen bg-[#0F172A] relative overflow-hidden text-slate-100 flex flex-col" id="stackup-root">
      {renderScreenContent()}
    </div>
  );
}
