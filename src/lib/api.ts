// ============================================================
// API SERVICE - ASMAE EL GASMI
// Security: Sanitization, Validation, Rate Limiting
// ============================================================

// Use VITE_API_URL or VITE_API_BASE_URL if set, otherwise use relative /api path (for Vercel serverless)
const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  response: string;
  error?: string;
}

// ============================================================
// INPUT SANITIZATION & VALIDATION
// ============================================================

// Sanitize user input to prevent XSS attacks
export function sanitizeInput(input: string): string {
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
    .slice(0, 2000); // Limit length
}

// Sanitize URL parameters
export function sanitizeURL(url: string): string {
  if (typeof url !== 'string') return '';

  try {
    const parsed = new URL(url, window.location.origin);
    // Only allow http/https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return '';
    }
    return parsed.href;
  } catch {
    return '';
  }
}

// Validate email format
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Validate phone number (international format)
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[1-9]\d{6,14}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Sanitize form data object
export function sanitizeFormData<T extends Record<string, unknown>>(data: T): T {
  const sanitized = {} as T;

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      (sanitized as Record<string, unknown>)[key] = sanitizeInput(value);
    } else if (typeof value === 'number') {
      (sanitized as Record<string, unknown>)[key] = Number.isFinite(value) ? value : 0;
    } else if (typeof value === 'boolean') {
      (sanitized as Record<string, unknown>)[key] = Boolean(value);
    } else {
      (sanitized as Record<string, unknown>)[key] = value;
    }
  }

  return sanitized;
}

// Validate required fields
export function validateRequired(data: Record<string, unknown>, fields: string[]): string[] {
  const errors: string[] = [];

  for (const field of fields) {
    const value = data[field];
    if (value === undefined || value === null || value === '') {
      errors.push(`${field} is required`);
    }
  }

  return errors;
}

// ============================================================
// CLIENT-SIDE RATE LIMITING
// ============================================================

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(endpoint: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
  const now = Date.now();
  const key = endpoint;
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

// ============================================================
// API FUNCTIONS
// ============================================================

export async function sendChatMessage(
  messages: ChatMessage[],
  language: string
): Promise<ChatResponse> {
  // Client-side rate limiting (20 requests per minute)
  if (!checkRateLimit('chat', 20, 60000)) {
    return {
      response: '',
      error: 'Too many requests. Please wait a moment.'
    };
  }

  // Validate language
  const validLanguages = ['en', 'fr', 'ar', 'de'];
  const sanitizedLanguage = validLanguages.includes(language) ? language : 'en';

  try {
    // Validate and sanitize all messages
    if (!Array.isArray(messages) || messages.length === 0) {
      return { response: '', error: 'Invalid messages' };
    }

    const sanitizedMessages = messages
      .filter(msg => msg && typeof msg.content === 'string')
      .map(msg => ({
        role: msg.role === 'user' ? 'user' as const : 'assistant' as const,
        content: sanitizeInput(msg.content)
      }))
      .slice(-20); // Limit conversation history

    if (sanitizedMessages.length === 0) {
      return { response: '', error: 'No valid messages' };
    }

    // Use API_URL if configured, otherwise use relative path for Vercel serverless
    const baseUrl = API_URL || '';
    const endpoint = baseUrl ? `${baseUrl}/api/chat` : '/api/chat';

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: sanitizedMessages,
        language: sanitizedLanguage
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Network error');
    }

    const data = await response.json();

    // Validate response
    if (typeof data.response !== 'string') {
      throw new Error('Invalid response format');
    }

    return { response: data.response };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unable to connect to AI service';
    console.error('Chat API error:', errorMessage);
    return {
      response: '',
      error: errorMessage
    };
  }
}

export async function checkApiHealth(): Promise<boolean> {
  if (!checkRateLimit('health', 5, 60000)) {
    return false;
  }

  try {
    const baseUrl = API_URL || '';
    const endpoint = baseUrl ? `${baseUrl}/health` : '/api/health';
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    return response.ok;
  } catch {
    return false;
  }
}
