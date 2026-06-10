export type AppScreen =
  | "SPLASH"
  | "WELCOME_CAROUSEL"
  | "SIGN_UP"
  | "SIGN_IN"
  | "ACCOUNT_SETUP"
  | "DASHBOARD"
  | "DEPLOYMENT_DETAIL"
  | "INCIDENT_DETAIL"
  | "MONITORING"
  | "COLLABORATION"
  | "AI_ASSISTANT"
  | "INTEGRATIONS"
  | "ACCESS_AUDIT"
  | "NOT_FOUND";

export interface UserProfile {
  fullName: string;
  jobTitle: string;
  timezone: string;
  avatarUrl: string;
  teamName: string;
  teamSize: string;
}

export interface Deployment {
  id: string;
  name: string;
  version: string;
  environment: "Production" | "Staging" | "Development";
  status: "Success" | "Pending" | "Failed";
  timestamp: string;
  author: string;
  commitHash: string;
  affectedServices: string[];
}

export interface DeploymentLog {
  timestamp: string;
  level: "INFO" | "WARN" | "ERROR";
  message: string;
}

export interface ActionItem {
  id: string;
  task: string;
  assignedTo: string;
  dueTime: string;
  checked: boolean;
}

export interface IncidentTimelineEvent {
  time: string;
  event: string;
}

export interface Incident {
  id: string;
  title: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  status: "Investigating" | "Identified" | "Monitoring" | "Resolved";
  assignedOwner: string;
  timeOpened: string;
  timeline: IncidentTimelineEvent[];
  actionItems: ActionItem[];
  collaborators: string[];
  notes: string[];
  rootCause: string;
  resolution: string;
}

export interface Alert {
  id: string;
  name: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  triggeredTime: string;
  status: "Open" | "Monitoring" | "Resolved";
  linkedService: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  resource: string;
  ip: string;
}

export interface RoleMember {
  id: string;
  user: string;
  email: string;
  role: string;
  permissions: string;
  lastActive: string;
}

export interface IntegrationTool {
  id: string;
  name: string;
  category: "Code Repositories" | "CI/CD Pipelines" | "Communication";
  connected: boolean;
  description: string;
}

export interface TeamMemberPresence {
  name: string;
  status: "Online" | "Away" | "Offline";
  avatar: string;
}
