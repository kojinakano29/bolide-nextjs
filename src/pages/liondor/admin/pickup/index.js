import Container from '@/components/liondor/Layouts/container'
import PageLayoutLiondor from '@/components/Layouts/PageLayoutLiondor'
import { PageTitle } from '@/components/liondor'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import styles from '@/styles/liondor/components/adminList.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// SSR
export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_LIONDOR}/admin/pickup`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const AdminPickup = ({posts}) => {
  // console.log(posts)
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth({middleware: 'auth', type: 'liondor'})
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    onLoadCheck()
  }, [user])

  const onLoadCheck = () => {
    if (user?.account_type < 2) {
      alert("このページにはアクセスできません。")
      router.push(`/liondor`)
    }
  }

  const onClickDelete = async (post) => {
    setDisabled(true)
    await csrf()

    await axios.delete(`/api/liondor/pickup/delete/${post.id}`)
    .then((res) => {
      // console.log(res)
      alert("ピックアップから外しました。")
      router.reload()
    })
    .catch((e) => {
      console.error(e)
      alert("ピックアップを外せませんでした。")
    })

    await setDisabled(false)
  }

  return (
    <section className="cont1">
      <PageTitle title="ピックアップ一覧" />
      {user?.account_type > 2 ?
        <Container small900>
          <article className={styles.article}>
            <ul>
              {posts?.map((item, index) => (
                <li key={index}>
                  <Link href={`/liondor/post/show/${item.l_post_id}`}>
                    <a className={styles.ttl}>{item.l_post.title}</a>
                  </Link>
                  <div className={styles.btnBox}>
                    <Link href={`/liondor/post/edit/${item.l_post_id}`}>
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

export default AdminPickup;

AdminPickup.getLayout = function getLayout(page) {
  return <PageLayoutLiondor>{page}</PageLayoutLiondor>
}