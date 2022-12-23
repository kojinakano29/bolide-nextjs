import { CheckoutForm } from '@/components/top';
import { useAuth } from '@/hooks/auth';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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
    clientSecret: posts.intent.client_secret
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm user={user} />
    </Elements>
  );
}

export default Payment;