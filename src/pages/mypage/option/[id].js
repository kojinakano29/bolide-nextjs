import styles from '@/styles/top/components/option.module.scss'
import PageLayoutTop from "@/components/Layouts/pageLayoutTop";
import Container from "@/components/top/Layout/container";
import Link from "next/link";
import { ConfirmOption, InputOption } from '@/components/top';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/auth';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subscription/${params.id}`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const MypageOption = ({posts}) => {
  console.log(posts)

  const router = useRouter()
  const { user } = useAuth({middleware: 'auth', type: 'register'})
  const isConfirm = router.query.confirm

  const methods = useForm({
    mode: "onChange",
    criteriaMode: "all",
  })

  const loginCheck = async () => {
    alert("このページの閲覧権限がありません。")
    router.push({
      pathname: '/',
    })
  }

  useEffect(() => {
    if (user && parseInt(user?.id) !== parseInt(router.query.id)) {
      loginCheck()
    }
  }, [user])

  return (
    <>
      <section className="cont1">
        <Container small900>
          <h2 className="ttl2">オプション</h2>
          <div className="breadcrumbBox">
            <Link href="/">
              <a>トップ</a>
            </Link>
            <div><img src="/top/breadcrumb.svg" alt="" /></div>
            <Link href="/mypage">
              <a>マイページ</a>
            </Link>
            <div><img src="/top/breadcrumb.svg" alt="" /></div>
            <p>オプション</p>
          </div>
        </Container>
      </section>

      <section className={styles.optionArea}>
        <Container small900>
          <FormProvider {...methods}>
            {!isConfirm ? <InputOption user={user} /> : <ConfirmOption user={user} />}
          </FormProvider>
        </Container>
      </section>
    </>
  );
}

export default MypageOption;

MypageOption.getLayout = function getLayout(page) {
  return <PageLayoutTop>{page}</PageLayoutTop>
}