import Container from '@/components/corapura/Layout/container'
import PageLayoutCorapura from '@/components/Layouts/pageLayoutCorapura'
import styles from '@/styles/corapura/components/matterDetail.module.scss'
import starB from '@/images/corapura/common/starB.svg'
import starA from '@/images/corapura/common/starA.svg'
import dummy from '@/images/corapura/common/dummy1.svg'
import { Btn, Conditions, ShowEditor } from '@/components/corapura'
import { useAuth } from '@/hooks/auth'
import { useCallback, useEffect, useState } from 'react'
import axios from '@/lib/axios'
import mail from '@/images/corapura/common/mail_icon.svg'
import question from '@/images/corapura/common/question_icon.svg'
import Link from 'next/link'

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
  console.log(posts);
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const { user } = useAuth()
  const [disabled, setDisabled] = useState(false)
  const [bookmark, setBookmark] = useState([])
  const [myMatter, setMyMatter] = useState(false)
  const [appList, setAppList] = useState([])
  const [state, setState] = useState()

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

  const onMatterStatus = async () => {
    await csrf()
    setMyMatter(true)

    await axios.post(`/api/corapura/post_app/list`, {
      c_post_id: posts.id,
    }).then((res) => {
      console.log(res)
      setAppList(res.data.c_post_apps)
    }).catch(e => console.error(e))
  }

  useEffect(() => {
    if (user) {
      onLoadCheck()
    }

    if (user && parseInt(user?.id) === parseInt(posts.user_id)) {
      onMatterStatus()
    }
  }, [user])

  const handleClickMatterFinish = useCallback(async () => {
    await csrf()

    await axios.post(`/api`, {

    }).then((res) => {
      console.log(res)
    }).catch(e => console.error(e))
  }, [])

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

  const handleChangeState = useCallback(async (e) => {
    setState(e.target.value)
  }, [setState])

  const handleClickState = useCallback(async (e, id) => {
    await csrf()

    await axios.post(`/api/corapura/post_app/state_change/${id}`, {
      state: e.target.value,
    }).then((res) => {
      console.log(res)
    }).catch(e => console.error(e))
  }, [])

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

        {myMatter ?
          <div className={styles.myMatterBox}>
            <h3 className={styles.ttl2}>この案件に応募した企業・ユーザーステータス状況</h3>
            {appList.map((list, index) => (
              <div className={styles.list} key={index}>
                <div className={styles.left}>
                  <div className={styles.imgBox}>
                    {list.c_profile.thumbs ? <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${list.c_profile.thumbs}`} alt="" /> : null}
                  </div>
                  <Link href={`/corapura/${list.account_type === 0 ? "influencer" : "company"}/${list.id}`}>
                    <a className={styles.name}>テストテスト</a>
                  </Link>
                </div>
                <div className={styles.right}>
                  <select onChange={(e) => handleChangeState(e)}>
                    <option value="0">応募中</option>
                    <option value="4">不採用</option>
                    <option value="3">採用</option>
                  </select>
                  {state === "3" ?
                    <button
                      className={styles.btn2}
                    >採用する</button>
                  : null}
                  {state === "4" ?
                    <button
                      className={styles.btn2}
                    >更新する</button>
                  : null}
                </div>
              </div>
            ))}
            <div className="btnCover">
              <Btn txt="この案件を完了にする" />
            </div>
          </div>
        :
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
        }
      </Container>
    </section>
  );
}

export default CompanyMatter;

CompanyMatter.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}