import styles from '@/styles/top/components/form.module.scss'
import PageLayoutTop from "@/components/Layouts/pageLayoutTop";
import Container from "@/components/top/Layout/container";
import { ConfirmPlan, InputPlan } from '@/components/top';
import axios from '@/lib/axios';
import { useAuth } from '@/hooks/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';

export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subscription/status/${params.id}/corporate`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const PlanCheckChange = (posts) => {
  // console.log(posts)
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const [planInfo, setPlanInfo] = useState({})
  const { user } = useAuth({middleware: 'auth', type: 'bjc'})
  const isConfirm = router.query.confirm
  const plans = {
    plan_corporate: process.env.NEXT_PUBLIC_SUBSCRIPTION_COMPANY,
    plan_intrust: process.env.NEXT_PUBLIC_SUBSCRIPTION_INTRUST,
  }

  const methods = useForm({
    mode: "onChange",
    criteriaMode: "all",
  })

  const onLoadCheck = async () => {
    csrf()

    axios.post('/api/subscription/use_check/', {
      user_id: user?.id,
      db_name: "corporate",
    }).then((res) => {
      // console.log(res)
      setPlanInfo(res.data)
    }).catch(e => console.error(e))
  }

  useEffect(() => {
    if (user) {
      onLoadCheck()
    }

    if (user && user?.account_type === 0) {
      router.push('/mypage')
    }
  }, [user])

  return (
    <>
      <section className="cont1">
        <Container small900>
          <h2 className="ttl2">プラン確認・変更</h2>
          <div className="breadcrumbBox">
            <a href="/">トップ</a>
            <div><img src="/top/breadcrumb.svg" alt="" /></div>
            <a href="/mypage">マイページ</a>
            <div><img src="/top/breadcrumb.svg" alt="" /></div>
            <p>プラン確認・変更</p>
          </div>
        </Container>
      </section>

      <section className={styles.formArea}>
        <Container small900>
          <FormProvider {...methods}>
            {!isConfirm ?
              <InputPlan
                planInfo={planInfo}
                user={user}
                plans={plans}
              />
              :
              <ConfirmPlan
                planInfo={planInfo}
                user={user}
                plans={plans}
              />
            }
          </FormProvider>
        </Container>
      </section>
    </>
  );
}

export default PlanCheckChange;

PlanCheckChange.getLayout = function getLayout(page) {
  return <PageLayoutTop>{page}</PageLayoutTop>
}