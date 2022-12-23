import axios from '@/lib/axios';
import styles from '@/styles/top/components/form.module.scss'
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from 'react';

const CheckoutForm = ({user}) => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const [disabled, setDisabled] = useState(false)
  const [name, setName] = useState("")
  const elements = useElements()
  const stripe = useStripe()

  const onSuccessStripe = async (pm) => {
    await csrf()

    await axios.post(`/api/subscription/subscribe/${user?.id}`, {
      payment_method: pm,
      db_name: "corporate",
      plan: "price_1MH4p7LPvAJPNlRsnSq9a5MR",
    }).then((res) => {
      console.log(res)
    }).catch(e => console.error(e))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setDisabled(true)

    if (!stripe || !elements) return

    await stripe.confirmSetup({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: process.env.NEXT_PUBLIC_FRONTEND_URL
      },
    }).then((res) => {
      console.log(res)
      onSuccessStripe(res.setupIntent.payment_method)
    })

    await setDisabled(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          カード名義人
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="TARO YAMADA"
          />
        </label>
        <PaymentElement />
        <button disabled={disabled}>送信する</button>
      </form>
    </div>
  )
}

export default CheckoutForm;