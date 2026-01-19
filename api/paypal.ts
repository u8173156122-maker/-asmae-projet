// Vercel Serverless Function - PayPal Payment
import type { VercelRequest, VercelResponse } from '@vercel/node';

const PAYPAL_API = process.env.NODE_ENV === 'production'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
  ).toString('base64');

  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });

  const data = await response.json();
  return data.access_token;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
    const { action, amount, currency, productName, orderId } = req.body;

    if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_SECRET) {
      return res.status(503).json({ error: 'PayPal not configured' });
    }

    const accessToken = await getAccessToken();

    // Create Order
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
                value: (amount / 100).toFixed(2) // Convert cents to euros
              },
              description: productName || 'ASMAE EL GASMI - AI Solution'
            }
          ],
          application_context: {
            return_url: `${process.env.APP_URL || 'https://asmae-projet.vercel.app'}/success`,
            cancel_url: `${process.env.APP_URL || 'https://asmae-projet.vercel.app'}/cancel`
          }
        })
      });

      const order = await response.json();
      return res.status(200).json({ orderId: order.id });
    }

    // Capture Order
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

      const capture = await response.json();
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
}
