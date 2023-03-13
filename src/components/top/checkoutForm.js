import axios from '@/lib/axios';
import styles from '@/styles/top/components/form.module.scss'
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Btn1 } from '@/components/top';

const CheckoutForm = ({user}) => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const [disabled, setDisabled] = useState(false)
  const [plan, setPlan] = useState("")
  const [name, setName] = useState("")
  const [stripeRoute, setStripeRoute] = useState("")
  const { register, handleSubmit, formState: { errors } } = useForm({
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
      setName("corporate")
    } else if (router.query.plan === "option100") {
      setPlan(process.env.NEXT_PUBLIC_SUBSCRIPTION_FUND_100)
      setName("option")
    } else if (router.query.plan === "option500") {
      setPlan(process.env.NEXT_PUBLIC_SUBSCRIPTION_FUND_500)
      setName("option")
    } else if (router.query.plan === "option1000") {
      setPlan(process.env.NEXT_PUBLIC_SUBSCRIPTION_FUND_1000)
      setName("option")
    }

    if (router.query.plan === "salon") {
      setPlan(router.query.salon_plan)
      setName(`salon${router.query.salon_id}`)
    }

    if (router.query.type === "subscribe") {
      setStripeRoute(`/api/subscription/subscribe/${user?.id}`)
    } else if (router.query.type === "plan_change") {
      setStripeRoute(`/api/subscription/change_plan/${user?.id}`)
    } else if (router.query.type === "resume") {
      setStripeRoute(`/api/subscription/resume/${user?.id}`)
    }
  }

  useEffect(() => {
    if (router && user) {
      onLoadCheckParameter()
    }
  }, [user])

  const onSuccessStripe = async (pm, data) => {
    await csrf()

    await axios.post(stripeRoute, {
      payment_method: pm,
      db_name: name,
      plan: plan,
      coupon: data.coupon ? data.coupon : "",
    }).then((res) => {
      // console.log(res)

      if (router.query.plan === "salon") {
        axios.post(`/api/corapura/salon_app/store`, {
          user_id: user?.id,
          c_salon_id: router.query.salon_id,
        }).then((res) => {
          // console.log(res)
          alert("オンランサロンに入会しました")
          router.push(`/corapura/salon/${router.query.salon_id}`)
        }).catch(e => console.error(e))
      }

      if (router.query.plan === "corporate_plan") {
        alert("サブスクリプションの登録が完了しました")
        router.push("/mypage")
      } else if (router.query.plan === "intrust_plan") {
        alert("おまかせプランに登録完了しました")
        router.push("/mypage")
      } else if (
        router.query.plan === "option100" ||
        router.query.plan === "option500" ||
        router.query.plan === "option1000"
      ) {
        sessionStorage.setItem('optionChange', true)
        alert(`社会貢献活動に参加しました(￥${router.query.plan.substring(6)}/月)`)
        router.push('/mypage/option/thanks')
      }
    }).catch((e) => {
      console.error(e)
    })

    setDisabled(false)
  }

  const onReturnStripe = async () => {
    await csrf()

    await axios.post(stripeRoute, {
      db_name: name,
    }).then((res) => {
      // console.log(res)

      if (router.query.plan === "corporate_plan") {
        alert("サブスクリプションの登録が完了しました")
        router.push("/mypage")
      } else if (router.query.plan === "intrust_plan") {
        alert("おまかせプランに登録完了しました")
        router.push("/mypage")
      } else if (
        router.query.plan === "option100" ||
        router.query.plan === "option500" ||
        router.query.plan === "option1000"
      ) {
        sessionStorage.setItem('optionChange', true)
        alert(`社会貢献活動に参加しました(￥${router.query.plan.substring(6)}/月)`)
        router.push('/mypage/option/thanks')
      }
    }).catch(e => console.error(e))

    setDisabled(false)
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
      if (router.query.type === "subscribe" || router.query.type === "plan_change") {
        onSuccessStripe(res.setupIntent.payment_method, data)
      } else if (router.query.type === "resume") {
        onReturnStripe()
      }
    }).catch((e) => {
      console.error(e)
      setDisabled(false)
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <article className={styles.formContent}>
        {router.query.type === "resume" ?
          <p className={styles.catch}>過去に登録したことのあるプランです。</p>
        :
          <>
            <PaymentElement />
            {
            router.query.type === "subscribe" &&
            router.query.plan === "corporate_plan" ||
            router.query.plan === "intrust_plan" ?
              <dl className={styles.paymentDl}>
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
            : null}
          </>
        }
        <Btn1 txt="登録する" submit disabled={disabled} />
      </article>
    </form>
  )
}

export default CheckoutForm;