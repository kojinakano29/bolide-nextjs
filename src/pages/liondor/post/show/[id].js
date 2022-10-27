import { Button2, Date, Recommends, ShowEditor, Sidebar } from "@/components/liondor";
import Container from "@/components/Layouts/container";
import PageLayout from "@/components/Layouts/PageLayout";
import styles from '@/styles/liondor/components/postShow.module.scss'
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark as bookmarkRegular } from '@fortawesome/free-regular-svg-icons'
import { faBookmark as bookmarkSolid } from '@fortawesome/free-solid-svg-icons'
import { faStar as starRegular } from '@fortawesome/free-regular-svg-icons'
import { faStar as starSolid } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/router";


// SSR
export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/liondor/post/show/${params.id}`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const DetailPage = ({posts}) => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth()

  const post = posts.posts
  const parentSlug = post.l_category.parent_slug
  const upperParentSlug = parentSlug?.toUpperCase()
  const slugName = post.l_category.name
  const upperSlugName = slugName?.toUpperCase()
  const slug = post.l_category.slug
  const ttl = post.title
  const subTtl = post.sub_title
  const desc = post.discription
  const seriesPrevPost = posts.series?.prev_post
  const seriesNextPost = posts.series?.next_post
  const seriesName = posts.series.series_info.name
  const userName = post.user.name
  const createAt = post.created_at
  const bookmark = posts.bookmarks
  const pickup = post.l_pickup

  const [disabled, setDisabled] = useState(false)

  // ブックマーク
  const [bookmarkState, setBookmarkState] = useState(false)

  // ピックアップ
  const [pickupState, setPickupState] = useState(false)

  useEffect(() => {
    if (bookmark.includes(user?.id)) {
      setBookmarkState(true)
    } else {
      setBookmarkState(false)
    }

    if (pickup) {
      setPickupState(true)
    } else {
      setPickupState(false)
    }
  }, [user])

  const handleClickBookmark = async () => {
    setDisabled(true)
    await csrf()

    if (bookmarkState) {
      await axios.delete(`/api/liondor/post/bookmark_remove/${post.id}`, {
        data: {
          user_id: user?.id,
          l_post_id: post.id,
        }
      })
      .then((res) => {
        // console.log(res)
        alert(res.data)
        setBookmarkState(false)
      })
      .catch((e) => {
        console.error(e)
        alert("エラーが発生しました。")
      })
    } else {
      await axios.post(`/api/liondor/post/bookmark/${post.id}`, {
        user_id: user?.id,
        l_post_id: post.id,
      })
      .then((res) => {
        // console.log(res)
        alert(res.data)
        setBookmarkState(true)
      })
      .catch((e) => {
        console.error(e)
        alert("エラーが発生しました。")
      })
    }

    await setDisabled(false)
  }

  const handleClickPickup = async () => {
    setDisabled(true)
    await csrf()

    if (pickupState) {
      await axios.delete(`/api/liondor/pickup/delete/${pickup.id}`)
      .then((res) => {
        // console.log(res)
        alert(res.data)
        setPickupState(false)
      })
      .catch((e) => {
        console.error(e)
        alert("エラーが発生しました。")
      })
    } else {
      await axios.post(`/api/liondor/pickup/store/${post.id}`)
      .then((res) => {
        // console.log(res)
        alert(res.data)
        setPickupState(true)
      })
      .catch((e) => {
        console.error(e)
        alert("エラーが発生しました。")
      })
    }

    await router.reload()

    await setDisabled(false)
  }

  return (
    <>
      <section className={styles.headline}>
        <Container>
          <div className={styles.headlineMv}>
            <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${post.mv}`} alt="" />
          </div>
          <div className={styles.headlineWrap}>
            <div className={styles.headlineBox}>
              <p className={styles.cat}>
                <span className={`en ${parentSlug !== null ? '' : 'none'}`}>{upperParentSlug}</span>
                <span className={parentSlug !== null ? styles.hr : 'none'}></span>
                <span className="en">{upperSlugName}</span>
              </p>
              <h2 className={styles.ttl}>{ttl}</h2>
              <h3 className={styles.subTtl}>{subTtl}</h3>
              <p className={styles.desc}>{desc}</p>
              <div className={styles.series}>
                {
                  seriesPrevPost !== null
                  ?
                  <Link href={`/liondor/post/show/${seriesPrevPost.id}`}>
                    <a className={styles.seriesLink}>{seriesName}</a>
                  </Link>
                  :
                  ''
                }
                {
                  seriesNextPost !== null
                  ?
                  <Link href={`/liondor/post/show/${seriesNextPost.id}`}>
                    <a className={styles.seriesLink}>{seriesName}</a>
                  </Link>
                  :
                  ''
                }
              </div>
              <p className={styles.name}>
                <span className="en">BY</span>
                <span className="space"></span>
                <span className="en">{userName}</span>
              </p>
              <p className={`en ${styles.time}`}><Date dateString={createAt} /></p>
            </div>
            {
              user ?
              <button
                className={styles.bookmarkBtn}
                onClick={handleClickBookmark}
                disabled={disabled}
              >
                {
                  bookmarkState ?
                  <FontAwesomeIcon icon={bookmarkSolid} />
                  :
                  <FontAwesomeIcon icon={bookmarkRegular} />
                }
              </button>
              : null
            }
            {
              user?.account_type > 2 ?
              <button
                className={styles.pickupBtn}
                onClick={handleClickPickup}
                disabled={disabled}
              >
                {
                  pickupState ?
                  <FontAwesomeIcon icon={starSolid} style={{color: "#ffbb00"}} />
                  :
                  <FontAwesomeIcon icon={starRegular} />
                }
              </button>
              : null
            }
          </div>
        </Container>
      </section>

      <section className={styles.showBody}>
        <Container>
          <div className={styles.bodyFlex}>
            <ShowEditor posts={posts} />
            <Sidebar posts={posts} />
          </div>
          <Button2 link={`/liondor/post/${slug}`} name="back to list" left />
        </Container>
      </section>

      <section className={styles.recoCont}>
        <Container>
          <Recommends posts={posts} />
        </Container>
      </section>
    </>
  );
}

export default DetailPage;

DetailPage.getLayout = function getLayout(page) {
  return <PageLayout>{page}</PageLayout>
}