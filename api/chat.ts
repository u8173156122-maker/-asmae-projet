// Vercel Serverless Function - Chat API
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Input sanitization
function sanitizeString(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/`/g, '&#96;')
    .replace(/\\/g, '&#92;')
    .trim()
    .slice(0, 2000);
}

function validateLanguage(lang: unknown): string {
  const validLanguages = ['en', 'fr', 'ar', 'de'];
  return typeof lang === 'string' && validLanguages.includes(lang) ? lang : 'en';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, language } = req.body;

    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({ error: 'AI service not configured' });
    }

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    const validatedLanguage = validateLanguage(language);

    const sanitizedMessages = messages
      .filter((msg: unknown) => {
        if (typeof msg !== 'object' || msg === null) return false;
        const m = msg as { role?: unknown; content?: unknown };
        return typeof m.role === 'string' && typeof m.content === 'string';
      })
      .map((msg: { role: string; content: string }) => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: sanitizeString(msg.content)
      }))
      .filter(msg => msg.content.length > 0)
      .slice(-20);

    if (sanitizedMessages.length === 0) {
      return res.status(400).json({ error: 'No valid messages' });
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

Be proactive, show detailed automation possibilities, draw agent architecture schemas, and always provide concrete solutions with fixed prices.

LANGUAGE: ${validatedLanguage === 'fr' ? 'French' : validatedLanguage === 'ar' ? 'Arabic' : validatedLanguage === 'de' ? 'German' : 'English'}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...sanitizedMessages
        ],
        max_tokens: 1500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      return res.status(500).json({ error: 'AI service unavailable' });
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || 'Unable to generate response';

    return res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
