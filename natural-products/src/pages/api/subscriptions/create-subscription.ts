import { NextApiRequest, NextApiResponse } from 'next';
import stripe from '../../../server/stripe';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { priceId } = req.body;

    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: 'http://localhost:3000/subscriptions/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:3000/subscriptions/cancel',
      });

      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      console.error('Error creating Stripe Checkout session:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
} 