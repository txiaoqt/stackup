import {
  Deployment,
  DeploymentLog,
  Incident,
  Alert,
  AuditLog,
  RoleMember,
  IntegrationTool,
  TeamMemberPresence
} from "./types";

export const initialDeployments: Deployment[] = [
  {
    id: "dep-1",
    name: "api-gateway",
    version: "v2.4.1",
    environment: "Production",
    status: "Failed",
    timestamp: "2 min ago",
    author: "Nami",
    commitHash: "a7f9c21",
    affectedServices: ["api-gateway", "billing-worker", "auth-service"]
  },
  {
    id: "dep-2",
    name: "auth-service",
    version: "v1.8.0",
    environment: "Staging",
    status: "Pending",
    timestamp: "9 min ago",
    author: "Tadz",
    commitHash: "ab04f21",
    affectedServices: ["auth-service"]
  },
  {
    id: "dep-3",
    name: "billing-worker",
    version: "v3.1.2",
    environment: "Production",
    status: "Failed",
    timestamp: "18 min ago",
    author: "Aly",
    commitHash: "ff03bc8",
    affectedServices: ["billing-worker", "payment-gateway"]
  },
  {
    id: "dep-4",
    name: "notification-service",
    version: "v2.0.2",
    environment: "Production",
    status: "Success",
    timestamp: "2 hours ago",
    author: "Dani",
    commitHash: "d8ea7b0",
    affectedServices: ["notification-service"]
  },
  {
    id: "dep-5",
    name: "api-gateway",
    version: "v2.4.0",
    environment: "Production",
    status: "Success",
    timestamp: "1 day ago",
    author: "Nics",
    commitHash: "b3f820c",
    affectedServices: ["api-gateway"]
  }
];

export const deploymentLogs: DeploymentLog[] = [
  { timestamp: "10:42:01", level: "INFO", message: "Starting deployment of api-gateway v2.4.1" },
  { timestamp: "10:42:15", level: "INFO", message: "Vite dynamic SSR bundle transpiled successfully" },
  { timestamp: "10:42:30", level: "INFO", message: "Routing 10% of ingress canary traffic to node-457a1" },
  { timestamp: "10:43:10", level: "INFO", message: "Health checks returned 200 OK for live canary node" },
  { timestamp: "10:44:00", level: "INFO", message: "Expanding canary node group to 100% traffic weight" },
  { timestamp: "10:45:15", level: "ERROR", message: "[HTTP 504] Upstream endpoint timeout in /api/v1/checkout - limit 5000ms exceeded" },
  { timestamp: "10:45:22", level: "WARN", message: "API Gateway latency threshold breached: 2450ms (Warning trigger value: 2000ms)" },
  { timestamp: "10:45:50", level: "ERROR", message: "[HTTP 504] Connection refused from downstream billing-worker client pool" },
  { timestamp: "10:47:01", level: "INFO", message: "Dani assigned as internal incident commander for INC-2041" },
  { timestamp: "10:50:00", level: "INFO", message: "AI Assistant successfully correlated 3 alerts from gateway proxy configuration issues" },
  { timestamp: "10:55:00", level: "WARN", message: "Candidate stable rollback point identified: api-gateway v2.4.0" }
];

export const initialIncidents: Incident[] = [
  {
    id: "INC-2041",
    title: "API latency spike in production",
    severity: "Critical",
    status: "Investigating",
    assignedOwner: "Dani",
    timeOpened: "10:45 AM",
    timeline: [
      { time: "10:42 AM", event: "Deployment api-gateway v2.4.1 completed" },
      { time: "10:45 AM", event: "Latency alert triggered" },
      { time: "10:47 AM", event: "Dani assigned as incident owner" },
      { time: "10:50 AM", event: "AI grouped 3 related alerts" },
      { time: "10:55 AM", event: "Team preparing rollback plan" }
    ],
    actionItems: [
      { id: "act-1", task: "Review deployment logs", assignedTo: "Nami", dueTime: "11:15 AM", checked: false },
      { id: "act-2", task: "Compare production metrics", assignedTo: "Tadz", dueTime: "11:30 AM", checked: false },
      { id: "act-3", task: "Prepare rollback plan", assignedTo: "Dani", dueTime: "11:45 AM", checked: true },
      { id: "act-4", task: "Notify support team", assignedTo: "Aly", dueTime: "12:00 PM", checked: false }
    ],
    collaborators: ["Dani", "Nami", "Tadz", "Aly", "Nics"],
    notes: [
      "Initial assessment indicates that checkout calls are stalling in the gateway node itself, possibly due to a misaligned write block or database socket exhaustion."
    ],
    rootCause: "",
    resolution: ""
  },
  {
    id: "INC-2040",
    title: "Checkout service error rate increased",
    severity: "High",
    status: "Identified",
    assignedOwner: "Nics",
    timeOpened: "10:48 AM",
    timeline: [
      { time: "10:48 AM", event: "Error rate alarm triggered (above 8% limit)" },
      { time: "10:50 AM", event: "Nics self-assigned to investigate" }
    ],
    actionItems: [
      { id: "act-201", task: "Check Stripe webhook credentials error responses", assignedTo: "Nics", dueTime: "11:20 AM", checked: false },
      { id: "act-202", task: "Trace billing-worker DB session count", assignedTo: "Aly", dueTime: "11:40 AM", checked: true }
    ],
    collaborators: ["Nics", "Aly"],
    notes: [
      "Stripe reported connection timeouts which perfectly align with our internal billing queue congestion."
    ],
    rootCause: "",
    resolution: ""
  }
];
export const initialAlerts: Alert[] = [
  {
    id: "al-1",
    name: "High latency detected",
    severity: "Critical",
    triggeredTime: "10:45 AM",
    status: "Open",
    linkedService: "API Gateway"
  },
  {
    id: "al-2",
    name: "Error rate above threshold",
    severity: "High",
    triggeredTime: "10:48 AM",
    status: "Open",
    linkedService: "Billing Worker"
  },
  {
    id: "al-3",
    name: "Memory usage spike",
    severity: "Medium",
    triggeredTime: "10:52 AM",
    status: "Monitoring",
    linkedService: "Auth Service"
  },
  {
    id: "al-4",
    name: "Disk IOPS limit alert",
    severity: "Low",
    triggeredTime: "10:11 AM",
    status: "Resolved",
    linkedService: "Database Cluster"
  }
];

export const initialIntegrations: IntegrationTool[] = [
  { id: "int-1", name: "GitHub", category: "Code Repositories", connected: true, description: "Sync branches, trigger test runs, and resolve commits inside incident tickets." },
  { id: "int-2", name: "GitLab", category: "Code Repositories", connected: false, description: "Streamline issues, check staging pipelines, and link commit indicators easily." },
  { id: "int-3", name: "Bitbucket", category: "Code Repositories", connected: false, description: "Integrate pipelines directly with Jira tags and cluster release notes." },
  { id: "int-4", name: "Jenkins", category: "CI/CD Pipelines", connected: true, description: "Build automation reporting with interactive logs embedded on rollback fail states." },
  { id: "int-5", name: "GitHub Actions", category: "CI/CD Pipelines", connected: true, description: "Unify automation steps to fast-path release tracking and deployment status tables." },
  { id: "int-6", name: "CircleCI", category: "CI/CD Pipelines", connected: false, description: "Empower dev teams with robust unit testing summary outputs inside dashboards." },
  { id: "int-7", name: "Slack", category: "Communication", connected: true, description: "Push live severity incident alerts and deployment checklists to Acme team channel." },
  { id: "int-8", name: "Microsoft Teams", category: "Communication", connected: false, description: "Consolidate active deployment schedules and on-call rotations directly." },
  { id: "int-9", name: "PagerDuty", category: "Communication", connected: true, description: "Orchestrate live developer on-call schedules, escalate alerts, and open incident tickets." }
];

export const initialRoleMembers: RoleMember[] = [
  { id: "rm-1", user: "Aly D.", email: "aly@acme.dev", role: "Admin", permissions: "Full access", lastActive: "2 min ago" },
  { id: "rm-2", user: "Dani M.", email: "dani@acme.dev", role: "Member", permissions: "Incidents, Monitoring", lastActive: "8 min ago" },
  { id: "rm-3", user: "Nami D.", email: "nami@acme.dev", role: "Member", permissions: "Deployments, Monitoring", lastActive: "15 min ago" },
  { id: "rm-4", user: "Tadz S.", email: "tadz@acme.dev", role: "Viewer", permissions: "Read-only", lastActive: "1 hour ago" }
];

export const initialAuditLogs: AuditLog[] = [
  { id: "aud-1", timestamp: "Today, 10:55 AM", actor: "Dani M.", action: "Updated incident status to 'Investigating'", resource: "INC-2041", ip: "192.168.1.144" },
  { id: "aud-2", timestamp: "Today, 10:52 AM", actor: "Nami D.", action: "Viewed deployment logs", resource: "api-gateway v2.4.1", ip: "192.168.1.189" },
  { id: "aud-3", timestamp: "Today, 10:50 AM", actor: "AI Assistant", action: "Generated alert telemetry summary", resource: "Alert Signal Cluster", ip: "127.0.0.1" },
  { id: "aud-4", timestamp: "Today, 10:48 AM", actor: "Aly D.", action: "Connected Slack integration", resource: "Slack Integration Setup", ip: "192.168.1.12" },
  { id: "aud-5", timestamp: "Today, 10:45 AM", actor: "StackUp Watchdog", action: "Triggered alert trigger count excess", resource: "al-1: High latency detected", ip: "10.0.0.4" }
];

export const initialTeamPresence: TeamMemberPresence[] = [
  { name: "Aly", status: "Online", avatar: "AD" },
  { name: "Dani", status: "Online", avatar: "DM" },
  { name: "Nami", status: "Away", avatar: "ND" },
  { name: "Tadz", status: "Online", avatar: "TS" },
  { name: "Nics", status: "Offline", avatar: "NC" }
];

