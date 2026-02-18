// Vercel Serverless Function - Contact Form (Brevo)
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const brevoKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'contact@elgasmi-eu.com';
    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'contact@elgasmi-eu.com';

    if (!brevoKey) {
      console.log('Contact form (Brevo not configured):', { name, email });
      return res.status(200).json({ success: true });
    }

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
    console.error('Contact error:', error);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
