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
export const getServerSideProps = async ({query}) => {
  let page = null
  if (query.page) {
    page = query.page
  } else {
    page = "1"
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_LIONDOR}/admin/present/?page=${page}`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const AdminPresent = ({posts}) => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth({middleware: 'auth'})

  useEffect(() => {
    onLoadCheck()
  }, [user])

  const onLoadCheck = () => {
    if (user?.account_type < 2) {
      alert("このページにはアクセスできません。")
      router.push(`/liondor`)
    }
  }

  const [disabled, setDisabled] = useState(false)
  const presents = posts.presents

  let current = null
  if (router.query.page) {
    current = parseInt(router.query.page)
  } else {
    current = 1
  }

  const onClickDelete = async (post) => {
    setDisabled(true)
    await csrf()

    await axios.delete(`/api/liondor/present/delete/${post.id}`)
    .then((res) => {
      // console.log(res)
      alert("プレゼントを削除しました。")
      router.reload()
    })
    .catch((e) => {
      console.error(e)
      alert("プレゼントの削除に失敗しました。")
    })

    await setDisabled(false)
  }

  const onClickNext = () => {
    const nextPage = current + 1
    router.push(`/liondor/admin/present/?page=${nextPage}`)
  }
  const onClickPrev = () => {
    const prevPage = current - 1
    router.push(`/liondor/admin/present/?page=${prevPage}`)
  }

  return (
    <section className="cont1">
      <PageTitle title="プレゼント一覧" />
      {user?.account_type > 2 ?
        <Container small900>
          <Link href="/liondor/present/create">
            <a className={`btn2 ${styles.create}`}>新規作成</a>
          </Link>
          <article className={styles.article}>
            <ul>
              {presents?.map((item, index) => (
                <li key={index}>
                  <Link href={`/liondor/admin/present/${item.id}`}>
                    <a className={styles.ttl}>{item.title}</a>
                  </Link>
                  <div className={styles.btnBox}>
                    <Link href={`/liondor/present/edit/${item.id}`}>
                      <a className={styles.edit}>編集</a>
                    </Link>
                    <button className={styles.delete} onClick={() => onClickDelete(item)} disabled={disabled}>削除</button>
                  </div>
                </li>
              ))}
            </ul>
          </article>
          <div className="pagerBox">
            {current === 1 ? '' : <button className="pagerBtn pagerPrev" onClick={onClickPrev}></button>}
            <p className="pagerCurrent en">{current}/{posts.page_max}</p>
            {posts.page_max === current ? '' : <button className="pagerBtn pagerNext" onClick={onClickNext}></button>}
          </div>
        </Container>
        : null
      }
    </section>
  );
}

export default AdminPresent;

AdminPresent.getLayout = function getLayout(page) {
  return <PageLayoutLiondor>{page}</PageLayoutLiondor>
}