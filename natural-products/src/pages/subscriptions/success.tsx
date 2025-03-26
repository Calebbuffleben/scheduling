'use client';

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import stripe from '../../server/stripe';

const SubscriptionSuccessPage = () => {
  const router = useRouter();
  const { session_id } = router.query;

  useEffect(() => {
    const updateSubscription = async () => {
      if (session_id) {
        try {
          const session = await stripe.checkout.sessions.retrieve(session_id as string);
          const subscriptionId = session.subscription;

          // Update the user's subscription in the database
          // ...

          router.push('/dashboard');
        } catch (error) {
          console.error('Error retrieving Stripe Checkout session:', error);
          // Handle the error appropriately
        }
      }
    };

    updateSubscription();
  }, [session_id]);

  return <div>Processing subscription...</div>;
};

export default SubscriptionSuccessPage; 