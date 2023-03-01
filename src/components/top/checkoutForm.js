import axios from '@/lib/axios';
import styles from '@/styles/top/components/form.module.scss'
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Btn1 from './btn1';

const CheckoutForm = ({user}) => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const [disabled, setDisabled] = useState(false)
  const [plan, setPlan] = useState("")
  const [name, setName] = useState("")
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      coupon: "",
    },
    mode: 'onChange',
    criteriaMode: "all",
  })
  const elements = useElements()
  const stripe = useStripe()

  const onLoadCheckParameter = async () => {
    if (router.query.plan === "corporate_plan") {
      setPlan(process.env.NEXT_PUBLIC_SUBSCRIPTION_COMPANY)
      setName("corporate")
    } else if (router.query.plan === "intrust_plan") {
      setPlan(process.env.NEXT_PUBLIC_SUBSCRIPTION_INTRUST)
      setName("intrust")
    } else if (router.query.plan === "option100") {
      setPlan(process.env.NEXT_PUBLIC_SUBSCRIPTION_FUND_100)
      setName("option100")
    } else if (router.query.plan === "option500") {
      setPlan(process.env.NEXT_PUBLIC_SUBSCRIPTION_FUND_500)
      setName("option500")
    } else if (router.query.plan === "option1000") {
      setPlan(process.env.NEXT_PUBLIC_SUBSCRIPTION_FUND_1000)
      setName("option1000")
    }
  }

  useEffect(() => {
    if (router) {
      onLoadCheckParameter()
    }
  }, [router])

  const onSuccessStripe = async (pm, data) => {
    await csrf()

    await axios.post(`/api/subscription/subscribe/${user?.id}`, {
      payment_method: pm,
      db_name: name,
      plan: plan,
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
        return_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/mypage`
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <article className={styles.formContent}>
        <PaymentElement />
        <dl>
          <dt>
            <label htmlFor="coupon">クーポンコード</label>
            <span className={styles.any}>任意</span>
          </dt>
          <dd>
            <input
              id="coupon"
              type="text"
              {...register("coupon")}
            />
          </dd>
        </dl>
        <Btn1 txt="確認する" submit disabled={disabled} />
      </article>
    </form>
  )
}

export default CheckoutForm;