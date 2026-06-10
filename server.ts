import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini safely
let ai: GoogleGenAI | null = null;
const api_key = process.env.GEMINI_API_KEY;

if (api_key) {
  try {
    ai = new GoogleGenAI({
      apiKey: api_key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } catch (err) {
    console.error("Failed to initialize GoogleGenAI:", err);
  }
} else {
  console.warn("GEMINI_API_KEY is not set. AI operations will fall back to simulation mode.");
}

// 1. API Route: Analyze DevOps Incidents and Alerts
app.post("/api/ai/analyze", async (req, res) => {
  const { incidentId, details, files, customPrompt } = req.body;

  let prompt = `You are an expert DevOps assistant evaluating an incident for a small development team workspace named "StackUp".\n\n`;
  if (customPrompt) {
    prompt += `Analyze this custom query: "${customPrompt}"\n`;
  } else {
    prompt += `Incident ID: ${incidentId || "INC-2041"}\n`;
    prompt += `Details: ${details || "API latency spike in production"}\n`;
    if (files && files.length > 0) {
      prompt += `Related Logs/Files: ${JSON.stringify(files)}\n`;
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
      "confidence": 85, // percentage integer between 0 and 100
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

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text || "";
      try {
        const jsonOutput = JSON.parse(responseText.trim());
        return res.json(jsonOutput);
      } catch (jsonErr) {
        console.error("Failed to parse AI JSON response, text was:", responseText);
        // Fall back to clean up and send or simulated
      }
    } catch (apiErr: any) {
      console.error("Gemini API call failed:", apiErr);
    }
  }

  // Fallback / Simulation Mode if key missing or failed
  res.json({
    summary: `Multiple alerts are clustered around the API Gateway deployment. Latency increased shortly after release v2.4.1 (deployed by Nami at 10:42 AM), with related response timeout errors appearing in production billing-worker and api-gateway environments. This appears to have degraded the checkout system performance.`,
    signalGroups: [
      {
        name: "Deployment & Latency Signals",
        description: "Alarms triggered immediately succeeding the api-gateway upgrade.",
        severity: "Critical",
        signals: [
          "10:42 AM - Deployment api-gateway v2.4.1 completed",
          "10:45 AM - API Latency alarm triggered (>2000ms)",
          "10:48 AM - Billing billing-worker error rate exceeded threshold (8%)"
        ]
      },
      {
        name: "Downstream Database Performance",
        description: "Secondary metrics indicating stable hardware usage but elevated queuing context.",
        severity: "Medium",
        signals: [
          "10:50 AM - Database connection pool utilization near 82%",
          "10:52 AM - Staging environment auth-service latency normal"
        ]
      }
    ],
    hypotheses: [
      {
        cause: "Misconfigured timeout/deadline value in API Gateway v2.4.1 configuration",
        confidence: 86,
        description: "The v2.4.1 release modified the default backend proxy deadline to 5000ms. If billing dependencies take slightly longer, the gateway severs connection prematurely."
      },
      {
        cause: "Stripe / Payment integration latency surge",
        confidence: 62,
        description: "The payment processor webhook endpoint might be responding slower, leading to database connection pool exhaustion while waiting."
      },
      {
        cause: "Auth token validation latency",
        confidence: 48,
        description: "Authorization tokens are validated on every gateway proxy request, though auth logs show reasonable latency (20ms) in staging."
      }
    ],
    recommendations: [
      {
        id: "rec-1",
        title: "Review diff between v2.4.0 and v2.4.1",
        description: "Examine configuration environment variables inside the deployment spec, focusing on PROXY_TIMEOUT and TIMEOUT_LIMIT variables.",
        type: "investigative"
      },
      {
        id: "rec-2",
        title: "Prepare rollback to v2.4.0",
        description: "If latency remains above 2000ms for more than 15 minutes, trigger rollback immediately to restore checkout availability.",
        type: "immediate"
      },
      {
        id: "rec-3",
        title: "Adjust billing-worker connection pool limit",
        description: "Increase db pool sizing in configuration to handle connection peaks when external API responses slow down.",
        type: "preventive"
      }
    ]
  });
});

// 2. API Route: General DevOps Chat Support
app.post("/api/ai/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const systemInstruction = `You are a helpful, expert DevOps AI Assistant for "StackUp", a cloud-native SaaS collaboration workspace for development teams.
You provide clear, technical, yet friendly answers. Keep your explanations concise, professional, and action-oriented.
Help the user analyze logs, plan rollbacks, optimize CI/CD pipelines, configure Kubernetes/Docker, and solve live incident tickets.`;

  if (ai) {
    try {
      const contents = [];
      if (history && history.length > 0) {
        history.forEach((h: any) => {
          contents.push({
            role: h.role === "user" ? "user" : "model",
            parts: [{ text: h.content }]
          });
        });
      }
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
        }
      });

      return res.json({ reply: response.text || "I am processing the telemetry files." });
    } catch (apiErr: any) {
      console.error("Gemini Chat API call failed:", apiErr);
    }
  }

  // Fallback simulator for chatbot replies
  const defaultResponses: { [key: string]: string } = {
    rollback: "To restore services quickly, you can trigger a rollback by clicking the 'Rollback Deployment' CTA. This will automatically execute a Vercel-style instant rollback, routing all ingress traffic to api-gateway v2.4.0.",
    logs: "Evaluating the logs of api-gateway v2.4.1 reveals a repeated '[ERROR] Request timeout exceeded' on endpoint /api/v1/checkout. This perfectly correlates with the 86% probable timeout cause I identified.",
    default: `Hi there! I am your StackUp DevOps Assistant. It looks like we have an active incident (INC-2041) regarding a production latency spike. Let me know if you would like me to analyze deployment logs, trace database sessions, or prepare a rollback suggestion for your approval.`
  };

  const key = Object.keys(defaultResponses).find((k) =>
    message.toLowerCase().includes(k)
  ) || "default";

  setTimeout(() => {
    res.json({ reply: defaultResponses[key] });
  }, 400);
});

// 3. Vite or Static File Handling
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
