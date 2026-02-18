// Vercel Serverless Function - Stripe Webhook
import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
  api: {
    bodyParser: false
  }
};

async function getRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const rawBody = await getRawBody(req);
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (webhookSecret && sig) {
      try {
        const Stripe = (await import('stripe')).default;
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
        const event = stripe.webhooks.constructEvent(rawBody, sig as string, webhookSecret);
        console.log(`Webhook verified: ${event.type}`);

        switch (event.type) {
          case 'checkout.session.completed': {
            const session = event.data.object;
            console.log(`Payment completed: ${session.id}, email: ${session.customer_email}`);
            break;
          }
          case 'payment_intent.succeeded': {
            console.log(`PaymentIntent succeeded: ${event.data.object.id}`);
            break;
          }
          default:
            console.log(`Unhandled event: ${event.type}`);
        }
      } catch (err) {
        console.log('Webhook signature verification failed:', err);
      }
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(200).json({ received: true });
  }
}
