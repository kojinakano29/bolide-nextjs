import Container from '@/components/corapura/Layout/container'
import PageLayoutCorapura from '@/components/Layouts/pageLayoutCorapura'
import styles from '@/styles/corapura/components/matterDetail.module.scss'
import starB from '@/images/corapura/common/starB.svg'
import starA from '@/images/corapura/common/starA.svg'
import dummy from '@/images/corapura/common/dummy1.svg'
import { Conditions, ShowEditor } from '@/components/corapura'
import { useAuth } from '@/hooks/auth'
import { useCallback, useEffect, useState } from 'react'
import axios from '@/lib/axios'
import mail from '@/images/corapura/common/mail_icon.svg'
import question from '@/images/corapura/common/question_icon.svg'

export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_CORAPURA}/post/show/${params.id}`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const CompanyMatter = ({posts}) => {
  // console.log(posts)
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const { user } = useAuth()
  const [disabled, setDisabled] = useState(false)
  const [bookmark, setBookmark] = useState([])

  const onLoadCheck = async () => {
    await csrf()

    await axios.post('/api/corapura/post_bookmark/check', {
      user_id: user?.id,
    }).then((res) => {
      // console.log(res)
      setBookmark(res.data)
    }).catch((e) => {
      console.error(e)
    })
  }

  useEffect(() => {
    if (user) {
      onLoadCheck()
    }
  }, [user])

  const handleClickBookmark = useCallback(async () => {
    if (disabled) return
    setDisabled(true)
    await csrf()

    if (bookmark.includes(posts.id)) {
      await axios.delete('/api/corapura/post_bookmark/delete', {
        data: {
          user_id: user?.id,
          c_post_id: posts.id,
        }
      }).then((res) => {
        // console.log(res)
        setBookmark(res.data)
      }).catch((e) => {
        console.error(e)
      })
    } else {
      await axios.post('/api/corapura/post_bookmark/store', {
        user_id: user?.id,
        c_post_id: posts.id,
      }).then((res) => {
        // console.log(res)
        setBookmark(res.data)
      }).catch((e) => {
        console.error(e)
      })
    }

    await setDisabled(false)
  }, [disabled, setDisabled, user, bookmark, setBookmark])

  return (
    <section className="cont1">
      <Container small>
        <div className={styles.headFlex}>
          <div className={styles.headLeft}>
            <img src={posts.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${posts.thumbs}` : dummy.src} alt="" />
            <button
              type="button"
              className={`${styles.bookmarkBtn} hoverEffect`}
              onClick={handleClickBookmark}
            >
              <img src={bookmark.includes(posts.id) ? starA.src : starB.src} alt="" />
            </button>
          </div>
          <div className={styles.headRight}>
            <p className={styles.cat}>{posts.c_cat.name}</p>
            <p className={styles.ttl}>{posts.title}</p>
            <div className={styles.tags}>
              {posts.c_tags.map((tag, index) => (
                <p className={styles.tag} key={index}>{tag.name}</p>
              ))}
            </div>
            <div className={styles.company}>
              <div className={styles.logoBox}>
                {posts.user.c_profile.thumbs ? <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${posts.user.c_profile.thumbs}`} alt="" /> : null}
              </div>
              {posts.user.c_profile.nicename}
            </div>
          </div>
        </div>

        <Conditions data={posts} />

        <div className={styles.editArea}>
          <ShowEditor data={posts} />
        </div>

        <div className={styles.btnFlex}>
          <a href={`mailto:${posts.user.email}`} className={styles.btn}>
            <img src={mail.src} alt="" />
            <span>この企業にメッセージを送る</span>
          </a>
          <a href={`/corapura`} className={`${styles.btn} ${styles.btn2}`}>
            <img src={question.src} alt="" />
            <span>質問する</span>
          </a>
        </div>
      </Container>
    </section>
  );
}

export default CompanyMatter;

CompanyMatter.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}