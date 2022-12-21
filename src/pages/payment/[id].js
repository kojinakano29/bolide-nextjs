import { CheckoutForm } from '@/components/top';
import axios from '@/lib/axios';
import styles from '@/styles/top/components/form.module.scss'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subscription/${params.id}`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE)

const Payment = ({posts}) => {
  console.log(posts)

  const options = {
    clientSecret: "",
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );

  // const csrf = () => axios.get('/sanctum/csrf-cookie')

  // const { register, handleSubmit, formState: { errors } } = useForm({
  //   mode: 'onChange',
  // })

  // const onSubmit = useCallback(async (data) => {
  //   // console.log(data)
  //   await csrf()

  //   await axios.post(`/api`, {
  //     card_num: data.card_num,
  //     card_limit: `${data.limit_month}/${data.limit_year}`,
  //     card_name: data.card_name,
  //     card_code: data.card_code,
  //   }).then((res) => {
  //     console.log(res)
  //   }).catch(e => console.error(e))
  // }, [])

  // return (
  //   <section className={styles.paymentForm}>
  //     <h2>カード情報入力画面</h2>
  //     <form onSubmit={handleSubmit(onSubmit)}>
  //       <dl>
  //         <dt>
  //           <label htmlFor="card_num">カード情報</label>
  //         </dt>
  //         <dd>
  //           <input
  //             type="text"
  //             id="card_num"
  //             {...register("card_num", {required: true})}
  //             placeholder="0000000000000000"
  //           />
  //           {errors.card_num && <p className={styles.error}>必須項目を入力してください</p>}
  //         </dd>
  //       </dl>
  //       <dl>
  //         <dt>有効期限</dt>
  //         <dd>
  //           <select {...register("limit_month")}>
  //             <option value="7">07</option>
  //           </select>
  //           <select {...register("limit_year")}>
  //             <option value="2025">2025</option>
  //           </select>
  //         </dd>
  //       </dl>
  //       <dl>
  //         <dt>
  //           <label htmlFor="card_name">カード名義</label>
  //         </dt>
  //         <dd>
  //           <input
  //             type="text"
  //             id="card_name"
  //             {...register("card_name", {required: true})}
  //             placeholder="TARO YAMADA"
  //           />
  //           {errors.card_name && <p className={styles.error}>必須項目を入力してください</p>}
  //         </dd>
  //       </dl>
  //       <dl>
  //         <dt>
  //           <label htmlFor="card_code">セキュリティコード</label>
  //         </dt>
  //         <dd>
  //           <input
  //             type="text"
  //             id="card_code"
  //             {...register("card_code", {required: true})}
  //             placeholder="000"
  //           />
  //           {errors.card_code && <p className={styles.error}>必須項目を入力してください</p>}
  //         </dd>
  //       </dl>
  //       <button>送信する</button>
  //     </form>
  //   </section>
  // );
}

export default Payment;