// ============================================================
// ASMAE EL GASMI - DENO DEPLOY BACKEND
// ============================================================

import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";

const app = new Application();
const router = new Router();

// CORS Middleware
app.use(async (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  if (ctx.request.method === "OPTIONS") {
    ctx.response.status = 200;
    return;
  }

  await next();
});

// Sanitize input
function sanitizeString(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim()
    .slice(0, 2000);
}

function validateLanguage(lang: unknown): string {
  const validLanguages = ["en", "fr", "ar", "de"];
  return typeof lang === "string" && validLanguages.includes(lang) ? lang : "en";
}

// Health Check
router.get("/health", (ctx) => {
  ctx.response.body = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    runtime: "Deno Deploy"
  };
});

// Chat API
router.post("/api/chat", async (ctx) => {
  try {
    const body = await ctx.request.body({ type: "json" }).value;
    const { messages, language } = body;

    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

    if (!OPENAI_API_KEY) {
      ctx.response.status = 503;
      ctx.response.body = { error: "AI service not configured" };
      return;
    }

    if (!messages || !Array.isArray(messages)) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Invalid messages format" };
      return;
    }

    const validatedLanguage = validateLanguage(language);

    const sanitizedMessages = messages
      .filter((msg: unknown) => {
        if (typeof msg !== "object" || msg === null) return false;
        const m = msg as { role?: unknown; content?: unknown };
        return typeof m.role === "string" && typeof m.content === "string";
      })
      .map((msg: { role: string; content: string }) => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: sanitizeString(msg.content)
      }))
      .filter((msg: { content: string }) => msg.content.length > 0)
      .slice(-20);

    if (sanitizedMessages.length === 0) {
      ctx.response.status = 400;
      ctx.response.body = { error: "No valid messages" };
      return;
    }

    const systemPrompt = `You are DR. AI - SENIOR DOCTORAL-LEVEL AGENTIC SYSTEMS ARCHITECT for ASMAE EL GASMI.e.U.

EXPERTISE: Multi-agent architectures, RAG systems, workflow automation, AI integration, process optimization.

COMPANY: ASMAE EL GASMI.e.U | Vienna, Austria
Contact: asmaewarter5@gmail.com | WhatsApp: +4368120460618

SOLUTIONS PORTFOLIO:
1. MULTI-AGENT INTELLIGENCE - €10,000 (lifetime license)
2. RAG EL GASMI - €10,000 (lifetime license)
3. CODEGEN ENTERPRISE - €10,000 (lifetime license)
4. CUSTOM ENTERPRISE - From €15,000
5. STRATEGIC AI AUDIT - €2,500

Be proactive, show detailed automation possibilities, and always provide concrete solutions with fixed prices.

LANGUAGE: ${validatedLanguage === "fr" ? "French" : validatedLanguage === "ar" ? "Arabic" : validatedLanguage === "de" ? "German" : "English"}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...sanitizedMessages
        ],
        max_tokens: 1500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      ctx.response.status = 500;
      ctx.response.body = { error: "AI service unavailable" };
      return;
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || "Unable to generate response";

    ctx.response.body = { response: aiResponse };
  } catch (error) {
    console.error("Chat API error:", error);
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal server error" };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = parseInt(Deno.env.get("PORT") || "8000");
console.log(`Deno server running on port ${port}`);
await app.listen({ port });
