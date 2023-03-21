import styles from '@/styles/top/components/form.module.scss'
import PageLayoutTop from '@/components/Layouts/pageLayoutTop';
import { CheckoutForm } from '@/components/top';
import Container from '@/components/top/Layout/container';
import { useAuth } from '@/hooks/auth';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';

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
  // console.log(posts)

  const router = useRouter()
  const { user } = useAuth({middleware: 'auth', type: 'register'})

  const loginCheck = async () => {
    alert("このページの閲覧権限がありません。")
    router.push({
      pathname: '/'
    })
  }

  useEffect(() => {
    if (user && parseInt(user?.id) !== parseInt(router.query.id)) {
      loginCheck()
    }
  }, [user])

  const options = {
    appearance: {
      theme: 'flat',
      rules: {}
    },
    clientSecret: posts.intent.client_secret,
  }

  return (
    <>
      <section className="cont1">
        <Container small900>
          <h2 className="ttl2">決済画面</h2>
          <div className="breadcrumbBox">
              <Link href="/">
              <a>トップ</a>
              </Link>
              <div><img src="/top/breadcrumb.svg" alt=">" /></div>
              <p>決済画面</p>
          </div>
        </Container>
      </section>

      <section className={styles.formArea}>
        <Container small900>
          <div className={styles.paymentArea}>
            <p className={styles.catch}>カード情報をご入力ください。</p>
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm user={user} />
            </Elements>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Payment;

Payment.getLayout = function getLayout(page) {
  return <PageLayoutTop>{page}</PageLayoutTop>
}