import { NextApiRequest, NextApiResponse } from 'next';
import stripe from '../../../server/stripe';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { priceId } = req.body;

    try {
      // Create a Stripe Checkout session
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        // Specify the success and cancel URLs for the checkout flow
        success_url: 'http://localhost:3000/subscriptions/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:3000/subscriptions/cancel',
      });

      // Return the session ID to the client
      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      console.error('Error creating Stripe Checkout session:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
} 