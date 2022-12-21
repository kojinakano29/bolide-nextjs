import { PaymentElement } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  return (
    <form>
      <PaymentElement />
      <button>送信する</button>
    </form>
  );
}

export default CheckoutForm;