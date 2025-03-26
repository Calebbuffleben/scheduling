import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../api-connection/service';

interface CheckoutProps {
  priceId: string;
}

const Checkout: React.FC<CheckoutProps> = ({ priceId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await api.post('/api/subscriptions/create-subscription', { priceId });
      const { sessionId } = response.data;
      
      // Redirect to the Stripe Checkout page
      window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
    } catch (error) {
      console.error('Error creating Stripe Checkout session:', error);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className="bg-[#55624c] hover:bg-[#45524c] text-white font-bold py-2 px-4 rounded"
    >
      {isLoading ? 'Loading...' : 'Subscribe'}
    </button>
  );
};

export default Checkout; 