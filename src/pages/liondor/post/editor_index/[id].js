import styles from '@/styles/liondor/components/adminList.module.scss'
import Container from '@/components/liondor/Layouts/container'
import PageLayoutLiondor from '@/components/Layouts/PageLayoutLiondor'
import { DateFormat, PageTitle } from '@/components/liondor'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

// SSR
export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_LIONDOR}/post/editor_index/${params.id}`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const PostList = ({posts}) => {
  // console.log(posts)
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth({middleware: 'auth', type: 'liondor'})

  useEffect(() => {
    onLoadCheck()
  }, [user])

  const onLoadCheck = () => {
    if (user?.account_type < 2) {
      alert("このページにはアクセスできません。")
      router.push(`/liondor`)
    }
  }

  const cats = posts.category
  const bigCat = cats.filter((cat, index) => {
    return index < 8
  })
  const fashionCat = cats.filter((cat) => {
    return cat.parent_slug === "fashion"
  })
  const beautyCat = cats.filter((cat) => {
    return cat.parent_slug === "beauty"
  })
  const trendCat = cats.filter((cat) => {
    return cat.parent_slug === "trend"
  })
  const lifestyleCat = cats.filter((cat) => {
    return cat.parent_slug === "lifestyle"
  })
  const weddingCat = cats.filter((cat) => {
    return cat.parent_slug === "wedding"
  })
  const topleaderCat = cats.filter((cat) => {
    return cat.parent_slug === "topleader"
  })
  const fortuneCat = cats.filter((cat) => {
    return cat.parent_slug === "fortune"
  })
  const videoCat = cats.filter((cat) => {
    return cat.parent_slug === "video"
  })
  const catArray = {
    All: [],
    fashion: fashionCat,
    beauty: beautyCat,
    trend: trendCat,
    lifestyle: lifestyleCat,
    wedding: weddingCat,
    topleader: topleaderCat,
    fortune: fortuneCat,
    video: videoCat,
  }
  const [catName, setCatName] = useState("All")
  const [lists, setLists] = useState(posts.posts)
  const [currentId, setCurrentId] = useState()
  const [nowPage, setNowPage] = useState(1)
  const [maxPage, setMaxPage] = useState(posts.page_max)
  const [disabled, setDisabled] = useState(false)

  const handleClickCat = useCallback(async (id, name) => {
    await csrf()

    await axios.post(`/api/liondor/post/editor_index/${user?.id}`, {
      l_category_id: id,
      page: 1
    }).then((res) => {
      // console.log(res)
      setLists(res.data.posts)
      setCatName(name)
      setCurrentId(id)
      setNowPage(res.data.now_page)
      setMaxPage(res.data.page_max)
    }).catch(e => console.error(e))
  }, [user, setCatName, setCurrentId, setNowPage, setMaxPage])

  const handleClickPage = useCallback(async (page) => {
    await csrf()

    await axios.post(`/api/liondor/post/editor_index/${user?.id}`, {
      l_category_id: currentId,
      page: parseInt(page)
    }).then((res) => {
      // console.log(res)
      setLists(res.data.posts)
      setNowPage(res.data.now_page)
      setMaxPage(res.data.page_max)
    }).catch(e => console.error(e))
  }, [user, setLists, currentId, setNowPage, setMaxPage])

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
        router.reload()
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

  return (
    <section className="cont1">
      <PageTitle title="記事一覧" />
      {user?.account_type > 1 ?
        <Container small900>
          <h3 className={styles.catTtl}>カテゴリー絞り込み</h3>
          <div className={styles.bigCatBox}>
            <button
              type="button"
              className={`${styles.bigCat} ${catName === "All" ? styles.current : null}`}
              onClick={() => handleClickCat("", "All")}
            >All</button>
            {bigCat.map((cat, index) => (
              <button
                type="button"
                className={`${styles.bigCat} ${cat.slug === catName ? styles.current : null}`}
                onClick={() => handleClickCat(cat.id, cat.slug)}
                key={index}
              >{cat.name}</button>
            ))}
          </div>
          <div className={styles.smCatBox}>
            {catArray[catName].map((cat, index) => (
              <button
                type="button"
                className={`${styles.smCat} ${cat.id === currentId ? styles.current : null}`}
                onClick={() => handleClickCat(cat.id, cat.parent_slug)}
                key={index}
              >{cat.name}</button>
            ))}
          </div>
          <h3 className={styles.catTtl}>
            {catName.toUpperCase()}
            <Link href="/liondor/post/create">
              <a className={`btn2 ${styles.create}`}>新規作成</a>
            </Link>
          </h3>
          <article className={styles.article}>
            <ul>
              {lists?.map((list, index) => (
                <li key={index}>
                  {list.state === 0 ?
                    <p  className={styles.iconP}>下書き</p>
                  : null}
                  <p className={styles.time}><DateFormat dateString={list.view_date} />{list.view_date.substr(11, 5).replace(":", "時")}分</p>
                  <Link href={`/liondor/post/show/${list.id}`}>
                    <a className={styles.ttl}>{list.title ? list.title : "タイトル未入力"}</a>
                  </Link>
                  <div className={styles.btnBox}>
                    <Link href={`/liondor/post/edit/${list.id}`}>
                      <a className={styles.edit}>編集</a>
                    </Link>
                    <button className={styles.delete} onClick={() => onClickDelete(list)} disabled={disabled}>削除</button>
                    {list.state === 0 ?
                      <Link href={`/liondor/post/show/${list.id}/?preview=1`}>
                        <a className={styles.edit} target="_blank" rel="noopener noreferrer">プレビュー</a>
                      </Link>
                    : null}
                  </div>
                </li>
              ))}
            </ul>
          </article>
          {parseInt(maxPage) > 0 ?
            <div className="pagerBox">
              {nowPage === 1 ? null : <button className="pagerBtn pagerPrev" onClick={() => handleClickPage(nowPage-1)}></button>}
              <p className="pagerCurrent en">{nowPage}/{maxPage}</p>
              {maxPage === nowPage ? null : <button className="pagerBtn pagerNext" onClick={() => handleClickPage(nowPage+1)}></button>}
            </div>
          : null}
        </Container>
        : null
      }
    </section>
  );
}

export default PostList;

PostList.getLayout = function getLayout(page) {
  return <PageLayoutLiondor>{page}</PageLayoutLiondor>
}