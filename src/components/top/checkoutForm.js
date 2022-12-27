import axios from '@/lib/axios';
import styles from '@/styles/top/components/form.module.scss'
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const CheckoutForm = ({user}) => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const [disabled, setDisabled] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      coupon: "",
    },
    mode: 'onChange',
  })
  const elements = useElements()
  const stripe = useStripe()

  const onSuccessStripe = async (pm, data) => {
    await csrf()

    await axios.post(`/api/subscription/subscribe/${user?.id}`, {
      name: data.name,
      payment_method: pm,
      db_name: "corporate",
      plan: "price_1MH4p7LPvAJPNlRsnSq9a5MR",
      coupon: data.coupon,
    }).then((res) => {
      // console.log(res)
      alert("サブスクリプションの登録が完了しました。")
    }).catch((e) => {
      console.error(e)
    })
  }

  const onSubmit = async (data) => {
    setDisabled(true)

    if (!stripe || !elements) return

    await stripe.confirmSetup({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: process.env.NEXT_PUBLIC_FRONTEND_URL
      },
    }).then((res) => {
      // console.log(res)
      onSuccessStripe(res.setupIntent.payment_method, data)
      setDisabled(false)
    }).catch((e) => {
      console.error(e)
      setDisabled(false)
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          カード名義人
          <input
            type="text"
            {...register("name", {required: true})}
            placeholder="TARO YAMADA"
          />
        </label>
        {errors.name && <p className={`orange ${styles.error}`}>※こちらの項目は入力必須です</p>}
        <PaymentElement />
        <label>
          クーポンコード
          <input
            type="text"
            {...register("coupon")}
          />
        </label>
        <button disabled={disabled}>送信する</button>
      </form>
    </div>
  )
}

export default CheckoutForm;