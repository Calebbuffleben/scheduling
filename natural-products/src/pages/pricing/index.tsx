import Checkout from '../../components/Checkout/Checkout';

const PricingPage = () => {
  const basicPriceId = 'price_basic';
  const proPriceId = 'price_pro';

  return (
    <div>
      <h1>Pricing Plans</h1>
      <div>
        <h2>Basic Plan</h2>
        <p>$9.99/month</p>
        <Checkout priceId={basicPriceId} />
      </div>
      <div>
        <h2>Pro Plan</h2>
        <p>$19.99/month</p>
        <Checkout priceId={proPriceId} />
      </div>
    </div>
  );
};

export default PricingPage; 