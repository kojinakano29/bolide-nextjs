import { PaymentElement } from "@stripe/react-stripe-js";
import styles from '@/styles/top/components/form.module.scss'

const CheckoutForm = () => {
  return (
    <form>
      <PaymentElement />
      <button>送信する</button>
    </form>
  );
}

export default CheckoutForm;