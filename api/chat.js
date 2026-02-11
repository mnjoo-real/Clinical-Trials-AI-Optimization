import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

const ipHits = new Map();

function getClientIp(req) {
  const xff = req.headers["x-forwarded-for"];
  if (xff) return xff.split(",")[0].trim();
  const realIp = req.headers["x-real-ip"];
  return realIp || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const hits = ipHits.get(ip) || [];
  const recent = hits.filter((t) => t > windowStart);

  if (recent.length >= RATE_LIMIT_MAX) {
    ipHits.set(ip, recent);
    return true;
  }

  recent.push(now);
  ipHits.set(ip, recent);
  return false;
}

function validateMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0) return false;
  for (const msg of messages) {
    if (!msg || typeof msg !== "object") return false;
    if (!["user", "assistant", "system"].includes(msg.role)) return false;
    if (typeof msg.content !== "string" || msg.content.trim().length === 0) {
      return false;
    }
  }
  return true;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      res.status(500).json({ error: "Missing OPENAI_API_KEY." });
      return;
    }

    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      res.status(429).json({ error: "Rate limit exceeded." });
      return;
    }

    const { messages } = req.body || {};
    if (!validateMessages(messages)) {
      res.status(400).json({ error: "Invalid messages payload." });
      return;
    }

    const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

    const systemMessage = {
      role: "system",
      content:
        "You are a clinical trial optimization research assistant. Provide concise, research-oriented responses. Avoid medical advice and avoid making clinical decisions."
    };

    const response = await client.responses.create({
      model,
      input: [systemMessage, ...messages],
      max_output_tokens: 800
    });

    res.status(200).json({ text: response.output_text || "" });
  } catch (err) {
    console.error("/api/chat error:", err);
    res.status(500).json({ error: "Unexpected server error." });
  }
}
