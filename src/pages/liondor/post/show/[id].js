import { Button2, Date, Recommends, ShowEditor, Sidebar } from "@/components/liondor";
import Container from "@/components/Layouts/container";
import PageLayout from "@/components/Layouts/PageLayout";
import styles from '@/styles/liondor/components/postShow.module.scss'
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark as bookmarkRegular } from '@fortawesome/free-regular-svg-icons'
import { faBookmark as bookmarkSolid } from '@fortawesome/free-solid-svg-icons'
import { useCallback, useEffect, useState } from "react";
import axios from "@/lib/liondor/axios";
import { useAuth } from "@/hooks/liondor/auth";


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

  const [bookmarkClick, setBookmarkClick] = useState()
  const [font, setFont] = useState()

  useEffect(() => {
    if (bookmark.includes(user?.id)) {
      setBookmarkClick(() => handleBookmarkDelete)
      setFont(<FontAwesomeIcon icon={bookmarkSolid} />)
    } else {
      setBookmarkClick(() => handleBookmarkAdd)
      setFont(<FontAwesomeIcon icon={bookmarkRegular} />)
    }
  }, [user])

  const handleBookmarkAdd = useCallback(async () => {
    await axios.post(`/api/liondor/post/bookmark/${post.id}`, {
      user_id: user?.id,
      l_post_id: post.id,
    })
    .then((res) => {
      // console.log(res)
      setBookmarkClick(() => handleBookmarkDelete)
      setFont(<FontAwesomeIcon icon={bookmarkSolid} />)
    })
    .catch((e) => {
      console.error(e)
    })
  }, [user, post])

  const handleBookmarkDelete = useCallback(async () => {
    console.log(user?.id)
    await axios.delete(`/api/liondor/post/bookmark_remove/${post.id}`, {
      data: {
        user_id: user?.id,
        l_post_id: post.id,
      }
    })
    .then((res) => {
      // console.log(res)
      setBookmarkClick(() => handleBookmarkAdd)
      setFont(<FontAwesomeIcon icon={bookmarkRegular} />)
    })
    .catch((e) => {
      console.error(e)
    })
  }, [user, post])

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
            {/* {
              bookmark.includes(user?.id) ?
              <button className={styles.bookmarkBtn} onClick={handleBookmarkDelete}>
                <FontAwesomeIcon icon={bookmarkSolid} />
              </button>
              :
              <button className={styles.bookmarkBtn} onClick={handleBookmarkAdd}>
                <FontAwesomeIcon icon={bookmarkRegular} />
              </button>
            } */}
            <button className={styles.bookmarkBtn} onClick={bookmarkClick}>
              {font}
            </button>
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