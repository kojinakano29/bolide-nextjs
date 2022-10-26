import Container from '@/components/Layouts/container'
import PageLayout from '@/components/Layouts/PageLayout'
import { PageTitle } from '@/components/liondor'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import styles from '@/styles/liondor/components/adminList.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// SSR
export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/liondor/admin/sidebar`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const AdminSidebar = ({posts}) => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth({middleware: 'auth'})
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    onLoadCheck()
  }, [user])

  const onLoadCheck = () => {
    if (user?.account_type < 2) {
      router.push(`/liondor`)
    }
  }

  const onClickDelete = async (post) => {
    setDisabled(true)
    await csrf()

    await axios.delete(`/api/liondor/sidebar/delete/${post.id}`)
    .then((res) => {
      // console.log(res)
      alert("サイドバーを削除しました。")
      router.reload()
    })
    .catch((e) => {
      console.error(e)
      alert("サイドバーの削除に失敗しました。")
    })

    await setDisabled(false)
  }

  return (
    <section className="cont1">
      <PageTitle title="サイドバー一覧" />
      {user?.account_type > 2 ?
        <Container small900>
          <article className={styles.article}>
            <ul>
              {posts?.map((item, index) => (
                <li key={index}>
                  <Link href={`/liondor/sidebar/edit/${item.id}`}>
                    <a className={styles.ttl}>{item.title}</a>
                  </Link>
                  <div className={styles.btnBox}>
                    <Link href={`/liondor/sidebar/edit/${item.id}`}>
                      <a className={styles.edit}>編集</a>
                    </Link>
                    <button className={styles.delete} onClick={() => onClickDelete(item)} disabled={disabled}>削除</button>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </Container>
        : null
      }
    </section>
  );
}

export default AdminSidebar;

AdminSidebar.getLayout = function getLayout(page) {
  return <PageLayout>{page}</PageLayout>
}