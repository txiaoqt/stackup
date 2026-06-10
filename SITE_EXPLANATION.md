# StackUp Site Explanation

StackUp is a mock DevOps control dashboard for monitoring deployments, incidents, alerts, team activity, integrations, and AI-assisted recommendations. The data shown in the site is mostly demo/mock data, so the app can be used for presentation or portfolio purposes without connecting real production systems.

## Main Flow

When the site opens, users see a splash screen with the StackUp logo and a `Continue to Portal` button. From there, users can sign in, create an account, complete a short setup flow, and enter the main dashboard.

The authentication screens are simulated. They are meant to demonstrate the user flow and UI only.

## Sidebar Navigation

The sidebar is the main navigation area of the app.

- `Dashboard` shows the main overview with deployment counts, active incidents, alerts, service health, and AI insight summaries.
- `Deployments` opens the deployment detail view where users can inspect a release, view affected services, read deployment logs, and trigger rollback actions.
- `Incidents` opens the incident workspace where users can review an incident timeline, assign owners, update status, add notes, and manage action items.
- `Monitoring` shows service alerts, CPU/memory style metrics, active host alerts, logs, and alert details.
- `AI Assistant` opens the mock AI recommendation and chat area for incident support.
- `Collaboration` shows team mentions, updates, online teammates, and shared action items.
- `Integrations` displays connected tools and lets users toggle mock service integrations.
- `Access & Audit` shows role management and audit logs for workspace activity.

At the bottom of the sidebar, the profile panel shows the current mock user, team name, app status, and logout button.

## Top Bar Buttons

The top bar contains quick actions:

- `Invite Member` opens or triggers the team invite flow.
- `Deploy Release` creates a simulated new release entry.
- `New Incident` creates a mock incident and routes the user to the incident detail view.

These actions update the local demo state only.

## Dashboard Panels

The dashboard is the main overview page. It includes:

- Summary cards for deployments, active incidents, open alerts, and monitored services.
- A `Deployment Status` table showing recent releases and their status.
- A `System Service Health` panel showing mock service health percentages.
- An `Active Incidents Feed` with incident cards and investigation links.
- An AI summary panel with mock recommended next steps.

## Deployment And Rollback

The deployment view focuses on one selected release. It shows deployment metadata, environment chips, affected services, rollback history, and live-style logs.

The rollback buttons are simulated. Clicking rollback updates the mock deployment state, adds log entries, and records an audit event.

## Monitoring And Alerts

The monitoring screen includes service tabs, a degraded system banner, metric cards, alert tables, and log streams. Clicking an alert opens a detail drawer with related signals and suggested actions.

The CPU/memory, request rate, and error rate panels are visual mock charts, not connected to real telemetry.

## AI Assistant

The AI Assistant page contains:

- A summary card for the current alert cluster.
- Probable cause cards with confidence percentages.
- Recommended incident actions.
- A chat sandbox for asking questions about the mock incident.

If no Gemini API key is provided, the app uses fallback/mock responses, which is enough for demo mode.

## Integrations, Collaboration, And Audit

These sections are also mock UI flows:

- `Collaboration` demonstrates team updates and mentions.
- `Integrations` shows connected service cards and connection toggles.
- `Access & Audit` demonstrates member roles, invitations, permission changes, and audit log history.

## Deployment Note

For a mock/demo deployment, the site can run without a real Gemini API key. The UI and fallback AI responses will still work using demo data.
