import Container from '@/components/Layouts/container'
import PageLayout from '@/components/Layouts/PageLayout'
import { PageTitle } from '@/components/liondor'
import { useAuth } from '@/hooks/auth'
import styles from '@/styles/liondor/components/adminList.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

// SSR
export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/liondor/admin/present/${params.id}`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const AdminPresentUserList = ({posts}) => {
  const router = useRouter()
  const { user } = useAuth({middleware: 'auth'})
  const present = posts.presents

  useEffect(() => {
    onLoadCheck()
  }, [user])

  const onLoadCheck = () => {
    if (user?.account_type < 2) {
      router.push(`/liondor`)
    }
  }

  return (
    <section className="cont1">
      <PageTitle title="プレゼント応募者一覧" />
      {user?.account_type > 2 ?
        <Container small900>
          <article className={styles.article}>
            <ul>
              {
                present.user.length ?
                present.user?.map((item, index) => (
                  <li key={index}>
                    ユーザ名：{item.name}
                    <br/>
                    メールアドレス：{item.email}
                  </li>
                ))
                : <li>このプレゼントにはまだ応募者はいません。</li>
              }
            </ul>
          </article>
          <Link href="/liondor/admin/present">
            <a className="btn3 ivy">back to list</a>
          </Link>
        </Container>
        : null
      }
    </section>
  );
}

export default AdminPresentUserList;

AdminPresentUserList.getLayout = function getLayout(page) {
  return <PageLayout>{page}</PageLayout>
}