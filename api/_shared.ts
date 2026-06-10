import { GoogleGenAI } from "@google/genai";

type AnalyzeBody = {
  incidentId?: string;
  details?: string;
  files?: unknown[];
  customPrompt?: string;
};

type ChatBody = {
  message?: string;
  history?: Array<{ role?: string; content?: string }>;
};

type AnalyzeResponse = {
  summary: string;
  signalGroups: Array<{
    name: string;
    description: string;
    severity: "Critical" | "High" | "Medium" | "Low";
    signals: string[];
  }>;
  hypotheses: Array<{
    cause: string;
    confidence: number;
    description: string;
  }>;
  recommendations: Array<{
    id: string;
    title: string;
    description: string;
    type: "immediate" | "preventive" | "investigative";
  }>;
};

let ai: GoogleGenAI | null = null;

function getAiClient() {
  if (ai) {
    return ai;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }

  try {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    return ai;
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
    return null;
  }
}

function buildAnalyzePrompt(body: AnalyzeBody) {
  let prompt = `You are an expert DevOps assistant evaluating an incident for a small development team workspace named "StackUp".\n\n`;
  if (body.customPrompt) {
    prompt += `Analyze this custom query: "${body.customPrompt}"\n`;
  } else {
    prompt += `Incident ID: ${body.incidentId || "INC-2041"}\n`;
    prompt += `Details: ${body.details || "API latency spike in production"}\n`;
    if (body.files && body.files.length > 0) {
      prompt += `Related Logs/Files: ${JSON.stringify(body.files)}\n`;
    }
  }

  prompt += `
Please provide your analysis in clean JSON matching this schema:
{
  "summary": "String summarizing the alerts, correlation with any recent deployments (like api-gateway v2.4.1 completed 10:42 AM), and system impact.",
  "signalGroups": [
    {
      "name": "Group name, e.g., 'Deployment-related signals'",
      "description": "Short explanation of why these are correlated",
      "severity": "Critical | High | Medium | Low",
      "signals": ["list of signals or alerts in this group"]
    }
  ],
  "hypotheses": [
    {
      "cause": "Probable cause description, e.g., 'Misconfigured timeout value inside api-gateway configuration'",
      "confidence": 85,
      "description": "Short evidence or reasoning for this hypothesis"
    }
  ],
  "recommendations": [
    {
      "id": "rec-1",
      "title": "Action title, e.g., 'Roll back API Gateway to v2.4.0'",
      "description": "Explicit step-by-step recommendation description",
      "type": "immediate | preventive | investigative"
    }
  ]
}

Return ONLY standard JSON. No markdown wrappers. No backticks.
`;

  return prompt;
}

function fallbackAnalyzeResponse(): AnalyzeResponse {
  return {
    summary:
      `Multiple alerts are clustered around the API Gateway deployment. Latency increased shortly after release v2.4.1 (deployed by Nami at 10:42 AM), with related response timeout errors appearing in production billing-worker and api-gateway environments. This appears to have degraded the checkout system performance.`,
    signalGroups: [
      {
        name: "Deployment & Latency Signals",
        description: "Alarms triggered immediately succeeding the api-gateway upgrade.",
        severity: "Critical",
        signals: [
          "10:42 AM - Deployment api-gateway v2.4.1 completed",
          "10:45 AM - API Latency alarm triggered (>2000ms)",
          "10:48 AM - Billing billing-worker error rate exceeded threshold (8%)",
        ],
      },
      {
        name: "Downstream Database Performance",
        description: "Secondary metrics indicating stable hardware usage but elevated queuing context.",
        severity: "Medium",
        signals: [
          "10:50 AM - Database connection pool utilization near 82%",
          "10:52 AM - Staging environment auth-service latency normal",
        ],
      },
    ],
    hypotheses: [
      {
        cause: "Misconfigured timeout/deadline value in API Gateway v2.4.1 configuration",
        confidence: 86,
        description:
          "The v2.4.1 release modified the default backend proxy deadline to 5000ms. If billing dependencies take slightly longer, the gateway severs connection prematurely.",
      },
      {
        cause: "Stripe / Payment integration latency surge",
        confidence: 62,
        description:
          "The payment processor webhook endpoint might be responding slower, leading to database connection pool exhaustion while waiting.",
      },
      {
        cause: "Auth token validation latency",
        confidence: 48,
        description:
          "Authorization tokens are validated on every gateway proxy request, though auth logs show reasonable latency (20ms) in staging.",
      },
    ],
    recommendations: [
      {
        id: "rec-1",
        title: "Review diff between v2.4.0 and v2.4.1",
        description:
          "Examine configuration environment variables inside the deployment spec, focusing on PROXY_TIMEOUT and TIMEOUT_LIMIT variables.",
        type: "investigative",
      },
      {
        id: "rec-2",
        title: "Prepare rollback to v2.4.0",
        description:
          "If latency remains above 2000ms for more than 15 minutes, trigger rollback immediately to restore checkout availability.",
        type: "immediate",
      },
      {
        id: "rec-3",
        title: "Adjust billing-worker connection pool limit",
        description:
          "Increase db pool sizing in configuration to handle connection peaks when external API responses slow down.",
        type: "preventive",
      },
    ],
  };
}

function fallbackChatReply(message: string) {
  const defaultResponses: Record<string, string> = {
    rollback:
      "To restore services quickly, you can trigger a rollback by clicking the 'Rollback Deployment' CTA. This will automatically execute a Vercel-style instant rollback, routing all ingress traffic to api-gateway v2.4.0.",
    logs:
      "Evaluating the logs of api-gateway v2.4.1 reveals a repeated '[ERROR] Request timeout exceeded' on endpoint /api/v1/checkout. This perfectly correlates with the 86% probable timeout cause I identified.",
    default:
      `Hi there! I am your StackUp DevOps Assistant. It looks like we have an active incident (INC-2041) regarding a production latency spike. Let me know if you would like me to analyze deployment logs, trace database sessions, or prepare a rollback suggestion for your approval.`,
  };

  const key =
    Object.keys(defaultResponses).find((candidate) =>
      message.toLowerCase().includes(candidate),
    ) || "default";

  return defaultResponses[key];
}

export async function analyzeIncident(body: AnalyzeBody): Promise<AnalyzeResponse> {
  const client = getAiClient();
  const prompt = buildAnalyzePrompt(body);

  if (client) {
    try {
      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text || "";
      const parsed = JSON.parse(responseText.trim()) as AnalyzeResponse;
      return parsed;
    } catch (error) {
      console.error("Gemini analyze request failed, falling back to simulation:", error);
    }
  }

  return fallbackAnalyzeResponse();
}

export async function replyToChat(body: ChatBody) {
  const message = body.message || "";
  const client = getAiClient();

  if (client && message) {
    try {
      const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];
      if (body.history && body.history.length > 0) {
        body.history.forEach((entry) => {
          contents.push({
            role: entry.role === "user" ? "user" : "model",
            parts: [{ text: entry.content || "" }],
          });
        });
      }
      contents.push({
        role: "user",
        parts: [{ text: message }],
      });

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction:
            `You are a helpful, expert DevOps AI Assistant for "StackUp", a cloud-native SaaS collaboration workspace for development teams.
You provide clear, technical, yet friendly answers. Keep your explanations concise, professional, and action-oriented.
Help the user analyze logs, plan rollbacks, optimize CI/CD pipelines, configure Kubernetes/Docker, and solve live incident tickets.`,
        },
      });

      return response.text || "I am processing the telemetry files.";
    } catch (error) {
      console.error("Gemini chat request failed, falling back to simulation:", error);
    }
  }

  return fallbackChatReply(message);
}
