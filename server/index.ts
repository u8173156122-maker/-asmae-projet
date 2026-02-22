// ============================================================
// ASMAE EL GASMI - BACKEND API
// OpenAI Chat | Stripe | PayPal | Webhook | Security
// Deploy: Render (app.elgasmi-eu.com)
// ============================================================

import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const app = express();

// ----------------------
// STRIPE WEBHOOK (raw body needed BEFORE express.json)
// ----------------------
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req: Request, res: Response) => {
  try {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.log('Webhook received (no secret configured)');
      return res.status(200).json({ received: true });
    }

    try {
      const Stripe = (await import('stripe')).default;
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
      const event = stripe.webhooks.constructEvent(req.body, sig as string, webhookSecret);
      console.log(`Webhook verified: ${event.type}`);

      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object as { id: string; customer_email: string | null };
          console.log(`Payment completed: ${session.id}, email: ${session.customer_email}`);
          break;
        }
        case 'payment_intent.succeeded': {
          const pi = event.data.object as { id: string };
          console.log(`PaymentIntent succeeded: ${pi.id}`);
          break;
        }
        default:
          console.log(`Unhandled event: ${event.type}`);
      }
    } catch (err) {
      console.log('Webhook signature verification skipped or failed, accepting anyway');
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(200).json({ received: true });
  }
});

// Security Middleware (after webhook route)
app.use(express.json({ limit: '10kb' }));
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:5173', 'https://elgasmi-eu.com'],
  credentials: true
}));

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});

const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: 'Too many AI requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});

app.use('/api/', apiLimiter);

// ----------------------
// INPUT SANITIZATION
// ----------------------
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

// ----------------------
// STRIPE CHECKOUT SESSION
// ----------------------
app.post('/api/stripe', async (req: Request, res: Response) => {
  try {
    const { amount, currency, productName, customerEmail } = req.body;

    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(503).json({ error: 'Payment service not configured' });
    }

    if (!amount || typeof amount !== 'number' || amount < 100) {
      return res.status(400).json({ error: 'Invalid amount (minimum 1.00)' });
    }

    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const appUrl = process.env.APP_URL || 'https://elgasmi-eu.com';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency || 'eur',
            product_data: {
              name: productName || 'ASMAE EL GASMI - AI Solution',
              description: 'Enterprise AI Automation Solution - Lifetime License'
            },
            unit_amount: amount
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      customer_email: customerEmail,
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/cancel`,
      metadata: {
        productName,
        customerEmail
      }
    });

    return res.status(200).json({
      sessionId: session.id,
      url: session.url
    });
  } catch (error) {
    console.error('Stripe error:', error);
    return res.status(500).json({ error: 'Payment processing failed' });
  }
});

// ----------------------
// PAYPAL ORDER CREATE / CAPTURE
// ----------------------
app.post('/api/paypal', async (req: Request, res: Response) => {
  try {
    const { action, amount, currency, productName, orderId } = req.body;

    const paypalSecret = process.env.PAYPAL_CLIENT_SECRET || process.env.PAYPAL_SECRET;
    if (!process.env.PAYPAL_CLIENT_ID || !paypalSecret) {
      return res.status(503).json({ error: 'PayPal not configured' });
    }

    const isLive = process.env.PAYPAL_MODE === 'live' || process.env.NODE_ENV === 'production';
    const PAYPAL_API = isLive
      ? 'https://api-m.paypal.com'
      : 'https://api-m.sandbox.paypal.com';

    // Get access token
    const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${paypalSecret}`).toString('base64');
    const tokenRes = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });
    const tokenData = await tokenRes.json() as { access_token: string };
    const accessToken = tokenData.access_token;

    const appUrl = process.env.APP_URL || 'https://elgasmi-eu.com';

    if (action === 'create') {
      const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: currency || 'EUR',
                value: (amount / 100).toFixed(2)
              },
              description: productName || 'ASMAE EL GASMI - AI Solution'
            }
          ],
          application_context: {
            return_url: `${appUrl}/success`,
            cancel_url: `${appUrl}/cancel`
          }
        })
      });

      const order = await response.json() as { id: string };
      return res.status(200).json({ orderId: order.id });
    }

    if (action === 'capture') {
      if (!orderId) {
        return res.status(400).json({ error: 'Order ID required' });
      }

      const response = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      const capture = await response.json() as { status: string };
      return res.status(200).json({
        status: capture.status,
        details: capture
      });
    }

    return res.status(400).json({ error: 'Invalid action' });
  } catch (error) {
    console.error('PayPal error:', error);
    return res.status(500).json({ error: 'Payment processing failed' });
  }
});

// ----------------------
// OPENAI CHAT ENDPOINT
// ----------------------
app.post('/api/chat', aiLimiter, async (req: Request, res: Response) => {
  try {
    const { messages, language } = req.body;

    const groqKey = process.env.GROQ_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY || process.env.BUILT_IN_FORGE_API_KEY;
    const aiKey = groqKey || openaiKey;
    if (!aiKey) {
      console.error('No AI API key configured');
      return res.status(503).json({ error: 'AI service not configured' });
    }

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    if (messages.length === 0 || messages.length > 50) {
      return res.status(400).json({ error: 'Invalid message count' });
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
      return res.status(400).json({ error: 'No valid messages provided' });
    }

    const systemPrompt = `You are DR. AI - SENIOR DOCTORAL-LEVEL AGENTIC SYSTEMS ARCHITECT for ASMAE EL GASMI.e.U.

EXPERTISE: Multi-agent architectures, RAG systems, workflow automation, AI integration, process optimization.

COMPANY: ASMAE EL GASMI.e.U | Vienna, Austria
Website: https://elgasmi-eu.com
Contact: contact@elgasmi-eu.com | WhatsApp: +4368120460618

YOUR MISSION: Reveal automation opportunities clients never imagined. Be PROACTIVE, SPECIFIC, and VISIONARY.

SOLUTIONS PORTFOLIO (FIXED PRICES - NO NEGOTIATION):
1. Multi-Agent Intelligence: \u20AC10,000 (lifetime license)
2. RAG EL GASMI: \u20AC10,000 (lifetime license)
3. CodeGen Enterprise: \u20AC10,000 (lifetime license)
4. Custom Enterprise: From \u20AC15,000
5. Strategic AI Audit: \u20AC2,500

RESPONSE APPROACH:
1. INSTANT ANALYSIS of their sector/problem
2. DETAILED AUTOMATION LIST (5-10 specific automations with workflows)
3. AGENT ARCHITECTURE SCHEMA (draw the system)
4. CONCRETE EXAMPLES for their sector
5. SOLUTION + PRICE recommendation
6. BONUS AUTOMATIONS (3-5 more possibilities)
7. NEXT STEP: Contact contact@elgasmi-eu.com or WhatsApp +4368120460618

RULES:
- ALWAYS show FIXED prices (no negotiation)
- ALWAYS draw agent architecture schemas
- 100% in-house development by ASMAE EL GASMI.e.U
- Be visionary and inspiring

LANGUAGE: ${validatedLanguage === 'fr' ? 'French' : validatedLanguage === 'ar' ? 'Arabic' : validatedLanguage === 'de' ? 'German' : 'English'}`;

    const apiUrl = groqKey
      ? 'https://api.groq.com/openai/v1/chat/completions'
      : 'https://api.openai.com/v1/chat/completions';
    const model = groqKey ? 'llama-3.3-70b-versatile' : 'gpt-4o-mini';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${aiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          ...sanitizedMessages
        ],
        max_tokens: 1500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('AI API error:', errorData);
      return res.status(500).json({ error: 'AI service unavailable' });
    }

    const data = await response.json() as { choices: Array<{ message: { content: string } }> };
    const aiResponse = data.choices[0]?.message?.content || 'Unable to generate response';

    res.json({ response: aiResponse });
  } catch (error: unknown) {
    console.error('Chat API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ----------------------
// CONTACT FORM (Brevo Email)
// ----------------------
app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const brevoKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'contact@elgasmi-eu.com';
    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'contact@elgasmi-eu.com';

    if (!brevoKey) {
      console.log('Contact form received (Brevo not configured):', { name, email });
      return res.status(200).json({ success: true });
    }

    // Send via Brevo API
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': brevoKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: { name: 'EL GASMI Website', email: senderEmail },
        to: [{ email: notificationEmail, name: 'ASMAE EL GASMI' }],
        replyTo: { email, name },
        subject: `[elgasmi-eu.com] New contact from ${name}`,
        htmlContent: `<h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><em>Sent from elgasmi-eu.com contact form</em></p>`
      })
    });

    if (!response.ok) {
      console.error('Brevo error:', await response.text());
      return res.status(500).json({ error: 'Failed to send message' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Failed to send message' });
  }
});

// ----------------------
// ROOT & HEALTH CHECK
// ----------------------
app.get('/', (_req: Request, res: Response) => {
  res.json({ name: 'ASMAE EL GASMI API', status: 'online', health: '/api/health' });
});

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    services: {
      stripe: !!process.env.STRIPE_SECRET_KEY,
      paypal: !!(process.env.PAYPAL_CLIENT_ID && (process.env.PAYPAL_CLIENT_SECRET || process.env.PAYPAL_SECRET)),
      groq: !!process.env.GROQ_API_KEY,
      openai: !!(process.env.OPENAI_API_KEY || process.env.BUILT_IN_FORGE_API_KEY),
      brevo: !!process.env.BREVO_API_KEY
    }
  });
});

// ----------------------
// START SERVER
// ----------------------
const PORT = parseInt(process.env.PORT || '3001', 10);
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Groq configured: ${!!process.env.GROQ_API_KEY}`);
  console.log(`OpenAI configured: ${!!(process.env.OPENAI_API_KEY || process.env.BUILT_IN_FORGE_API_KEY)}`);
  console.log(`Stripe configured: ${!!process.env.STRIPE_SECRET_KEY}`);
  console.log(`PayPal configured: ${!!(process.env.PAYPAL_CLIENT_ID && (process.env.PAYPAL_CLIENT_SECRET || process.env.PAYPAL_SECRET))}`);
  console.log(`Brevo configured: ${!!process.env.BREVO_API_KEY}`);
});

export default app;
