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
export const getServerSideProps = async ({params, query}) => {
  let page = null
  if (query.page) {
    page = query.page
  } else {
    page = "1"
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/liondor/post/editor_index/${params.id}/?page=${page}`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const PostList = ({posts}) => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth({middleware: 'auth'})
  const [disabled, setDisabled] = useState(false)
  const list = posts.posts

  let current = null
  if (router.query.page) {
    current = parseInt(router.query.page)
  } else {
    current = 1
  }

  useEffect(() => {
    onLoadCheck()
  }, [user])

  const onLoadCheck = () => {
    if (user?.account_type < 1) {
      router.push(`/liondor`)
    }
  }

  const onClickDelete = async (post) => {
    setDisabled(true)
    await csrf()

    const userIdStr = String(user?.id)
    const postStr = String(post.user_id)

    if (userIdStr === postStr) {
      await axios.delete(`/api/liondor/post/delete/${post.id}`)
      .then((res) => {
        // console.log(res)
        alert("記事を削除しました。")
        router.push(`/liondor/post/editor_index/${user?.id}`)
      })
      .catch((e) => {
        console.error(e)
        alert("記事の削除に失敗しました。")
      })
    } else {
      await alert("この記事の削除権限がありません。")
    }

    await setDisabled(false)
  }

  const onClickNext = () => {
    const nextPage = current + 1
    router.push(`/liondor/post/editor_index/${router.query.id}/?page=${nextPage}`)
  }
  const onClickPrev = () => {
    const prevPage = current - 1
    router.push(`/liondor/post/editor_index/${router.query.id}/?page=${prevPage}`)
  }

  return (
    <section className="cont1">
      <PageTitle title="記事一覧" />
      {user ?
        <Container small900>
          <article className={styles.article}>
            <ul>
              {list?.map((item, index) => (
                <li key={index}>
                  <Link href={`/liondor/post/show/${item.id}`}>
                    <a className={styles.ttl}>{item.title}</a>
                  </Link>
                  <div className={styles.btnBox}>
                    <Link href={`/liondor/post/edit/${item.id}`}>
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

export default PostList;

PostList.getLayout = function getLayout(page) {
  return <PageLayout>{page}</PageLayout>
}