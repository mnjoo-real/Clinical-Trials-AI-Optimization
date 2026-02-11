import OpenAI from "openai";
import { kv } from "@vercel/kv";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

const MAX_MESSAGES = 8;
const MAX_INPUT_CHARS = 2000;
const MAX_OUTPUT_TOKENS = 300;
const SUMMARY_MAX_TOKENS = 120;

const inMemoryHits = new Map();

function getClientIp(req) {
  const xff = req.headers["x-forwarded-for"];
  if (xff) return xff.split(",")[0].trim();
  const realIp = req.headers["x-real-ip"];
  return realIp || "unknown";
}

async function isRateLimited(ip) {
  const kvReady = Boolean(
    process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
  );

  if (!kvReady) {
    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW_MS;
    const hits = inMemoryHits.get(ip) || [];
    const recent = hits.filter((t) => t > windowStart);

    if (recent.length >= RATE_LIMIT_MAX) {
      inMemoryHits.set(ip, recent);
      return true;
    }

    recent.push(now);
    inMemoryHits.set(ip, recent);
    return false;
  }

  const key = `rate:${ip}`;
  const count = await kv.incr(key);
  if (count === 1) {
    await kv.expire(key, Math.ceil(RATE_LIMIT_WINDOW_MS / 1000));
  }
  return count > RATE_LIMIT_MAX;
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

function sanitizeMessages(messages) {
  const systemSummary = messages.find(
    (msg) => msg.role === "system" && msg.content.startsWith("Summary memo:")
  );

  const trimmed = messages
    .filter((msg) => msg.role !== "system")
    .map((msg) => ({
      role: msg.role,
      content: msg.content.slice(0, MAX_INPUT_CHARS)
    }))
    .slice(-MAX_MESSAGES);

  if (systemSummary) {
    return [
      {
        role: "system",
        content: systemSummary.content.slice(0, MAX_INPUT_CHARS)
      },
      ...trimmed
    ];
  }

  return trimmed;
}

function stripSystem(messages) {
  return messages.filter((msg) => msg.role !== "system");
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
    if (await isRateLimited(ip)) {
      res.status(429).json({ error: "Rate limit exceeded." });
      return;
    }

    const { messages } = req.body || {};
    if (!validateMessages(messages)) {
      res.status(400).json({ error: "Invalid messages payload." });
      return;
    }

    const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
    const streamEnabled = String(req.query?.stream || "") === "1";
    const summaryMode = String(req.query?.summary || "") === "1";

    const systemMessage = {
      role: "system",
      content:
        "You are a clinical trial optimization research assistant. Provide concise, research-oriented responses in 3–5 sentences. Avoid medical advice and avoid making clinical decisions."
    };

    if (summaryMode) {
      const summarySystem = {
        role: "system",
        content:
          "Summarize the conversation into a single short memo (4–6 sentences). Focus on goals, constraints, and decisions. Use neutral research language. Do not include medical advice."
      };
      const summaryInput = [
        summarySystem,
        ...stripSystem(messages).map((msg) => ({
          role: msg.role,
          content: msg.content.slice(0, MAX_INPUT_CHARS)
        }))
      ];

      const summaryResponse = await client.responses.create({
        model,
        input: summaryInput,
        max_output_tokens: SUMMARY_MAX_TOKENS
      });

      res.status(200).json({
        summary: `Summary memo: ${summaryResponse.output_text || ""}`.trim()
      });
      return;
    }

    const sanitized = sanitizeMessages(messages);
    const input = [systemMessage, ...sanitized];

    if (streamEnabled) {
      res.writeHead(200, {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no"
      });

      const stream = await client.responses.create({
        model,
        input,
        max_output_tokens: MAX_OUTPUT_TOKENS,
        stream: true
      });

      for await (const event of stream) {
        if (event.type === "response.output_text.delta") {
          const payload = JSON.stringify({ type: "delta", text: event.delta });
          res.write(`data: ${payload}\n\n`);
        }
      }

      res.write("data: [DONE]\n\n");
      res.end();
      return;
    }

    const response = await client.responses.create({
      model,
      input,
      max_output_tokens: MAX_OUTPUT_TOKENS
    });

    res.status(200).json({ text: response.output_text || "" });
  } catch (err) {
    console.error("/api/chat error:", err);
    res.status(500).json({ error: "Unexpected server error." });
  }
}
