import Container from '@/components/corapura/Layout/container'
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
import { useRouter } from 'next/router'

const MatterDetail = ({posts}) => {
  // console.log(posts)
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const date = new Date()
  const year = date.getFullYear()
  const month = ("00" + (date.getMonth()+1)).slice(-2)
  const day = ("00" + date.getDate()).slice(-2)
  const today = `${year}-${month}-${day}`

  const router = useRouter()
  const { user } = useAuth()
  const [disabled, setDisabled] = useState(false)
  const [bookmark, setBookmark] = useState([])
  const [myMatter, setMyMatter] = useState(false)
  const [appList, setAppList] = useState([])
  const [state, setState] = useState([])
  const [check, setCheck] = useState(false)
  const [popup, setPopup] = useState(false)

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

    await axios.post('/api/corapura/post_app/check', {
      user_id: user?.id,
    }).then((res) => {
      // console.log(res)
      if (res.data?.includes(posts.id)) {
        setCheck(true)
      }
    }).catch(e => {
      console.error(e)
    })
  }

  const onMatterStatus = async () => {
    await csrf()
    setMyMatter(true)

    await axios.post(`/api/corapura/post_app/list`, {
      c_post_id: posts.id,
    }).then((res) => {
      // console.log(res)
      setAppList(res.data.c_post_apps)
      setState(res.data.c_post_apps.map((app) => {
        return app.pivot.state
      }))
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

  const handleClickMatterAdd = useCallback(async () => {
    if (check) return
    if (disabled) return
    setDisabled(true)
    await csrf()

    await axios.post(`/api/corapura/post_app/add`, {
      c_post_id: posts.id,
      user_id: user?.id,
      comment: `${user?.name}さんが案件に応募しました`,
    }).then((res) => {
      // console.log(res)
      setCheck(true)
      alert("案件に応募しました。")
    }).catch(e => {
      console.error(e)
      alert("案件に応募できませんでした。")
    })

    await setDisabled(false)
  }, [user, disabled, setDisabled, check])

  const handleClickFinish = useCallback(async () => {
    if (disabled) return
    setDisabled(true)
    await csrf()

    await axios.post(`/api/corapura/post/compleate/${posts.id}`, {
      state: 1,
    }).then((res) => {
      // console.log(res)
      alert("この案件の応募を終了しました。")
      router.reload()
    }).catch(e => console.error(e))

    await setDisabled(false)
    await setPopup(false)
  }, [disabled, setDisabled, setPopup])

  const handleClickBookmark = useCallback(async () => {
    if (disabled) return
    setDisabled(true)
    await csrf()

    if (bookmark?.includes(posts.id)) {
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

  const handleChangeState = useCallback(async (e, current) => {
    setState(state.map((st, index) => (index === current ? parseInt(e.target.value) : parseInt(st))))
  }, [state, setState])

  const handleClickState = useCallback(async (status, id, name) => {
    await csrf()

    if (parseInt(status) === parseInt(5)) {
      await axios.delete(`/api/corapura/post_app/delete`, {
        data: {
          app_id: id,
        }
      }).then((res) => {
        // console.log(res)
        setAppList(res.data.c_post_apps)
        setState(res.data.c_post_apps.map((app) => {
          return app.pivot.state
        }))
        alert(`${name}さんを不採用にしました。`)
      }).catch(e => console.error(e))
    } else {
      await axios.post(`/api/corapura/post_app/state_change/${id}`, {
        state: status,
      }).then((res) => {
        // console.log(res)
        if (parseInt(status) === 3) {
          alert(`${name}さんを採用しました。`)
        } else if (parseInt(status) === 0) {
          alert(`${name}さんを応募中にしました。`)
        } else if (parseInt(status) === 1) {
          alert(`案件を完了にしました。`)
        }
      }).catch(e => console.error(e))
    }
  }, [setAppList, setState])

  const handleClickPopup = useCallback(async () => {
    setPopup(prevState => !prevState)
  }, [setPopup])

  return (
    <>
      <section className="cont1">
        <Container small>
          <div className={styles.headFlex}>
            <div className={styles.headLeft}>
              <img src={posts.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${posts.thumbs}` : dummy.src} alt="案件のサムネイル画像" />
              <button
                type="button"
                className={`${styles.bookmarkBtn} hoverEffect`}
                onClick={handleClickBookmark}
              >
                <img src={bookmark?.includes(posts.id) ? starA.src : starB.src} alt="ブックマークのアイコン" />
              </button>
            </div>
            <div className={styles.headRight}>
              <p className={styles.cat}>{posts.c_cat.name}</p>
              <p className={styles.ttl}>{posts.title}</p>
              <ul className={styles.tags}>
                {posts.c_tags.map((tag, index) => (
                  <li className={styles.tag} key={index}>
                    <a href={`/corapura/${posts.user.account_type === 0 ? 'influencer' : 'company'}/matter/?tag_id=${tag.id}`} className="hoverEffect">{tag.name}</a>
                  </li>
                ))}
              </ul>
              <div className={styles.company}>
                <div className={styles.logoBox}>
                  {posts.user.c_profile.thumbs ? <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${posts.user.c_profile.thumbs}`} alt="プロフィール画像" /> : null}
                </div>
                {posts.user.c_profile.nicename}
              </div>
            </div>
          </div>

          <Conditions data={posts} />

          <div className={styles.editArea}>
            <ShowEditor value={posts.content} />
          </div>

          {myMatter ?
            <>
              {posts.state < 1 ?
                <div className="btnCover" onClick={handleClickPopup}>
                  <Btn txt="この案件を完了する" />
                </div>
              : null}
              {appList.length !== 0 && posts.state !== 1 ?
                <div className={styles.myMatterBox}>
                  <h3 className={styles.ttl2}>この案件に応募した企業・<br className="sp" />ユーザーステータス状況</h3>
                  {appList.map((list, index) => (
                    <div className={styles.list} key={index}>
                      <div className={styles.left}>
                        <div className={styles.imgBox}>
                          {list.c_profile.thumbs ? <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${list.c_profile.thumbs}`} alt="プロフィール画像" /> : null}
                        </div>
                        <a href={`/corapura/${list.account_type === 0 ? "influencer" : "company"}/${list.id}`} className={styles.name}>{list.c_profile.nicename}</a>
                      </div>
                      <div className={styles.right}>
                        <select value={state[index] !== 2 ? state[index] : 1} onChange={(e) => handleChangeState(e, index)}>
                          <option value="0">応募中</option>
                          <option value="3">採用</option>
                          <option value="5">不採用</option>
                          <option value="1">完了</option>
                        </select>
                        <button
                          className={`${styles.btn3} hoverEffect`}
                          onClick={() => handleClickState(state[index], list.pivot.id, list.c_profile.nicename)}
                        >更新する</button>
                      </div>
                    </div>
                  ))}
                </div>
              : null}
            </>
          :
            <>
              {posts.limite_date >= today ?
                <div className={styles.btnFlex}>
                  <button
                    type="button"
                    className={`${styles.btn} ${check ? styles.check : null}`}
                    onClick={handleClickMatterAdd}
                  >
                    <img src={mail.src} alt="メールのアイコン" />
                    <span>{check ? "応募済み" : "この案件に応募する"}</span>
                  </button>
                  <a href={`mailto:${posts.user.email}`} className={`${styles.btn} ${styles.btn2}`}>
                    <img src={question.src} alt="質問のアイコン" />
                    <span>質問する</span>
                  </a>
                </div>
              : null}
            </>
          }
        </Container>
      </section>

      {popup ?
        <section className={styles.popupArea} onClick={handleClickPopup}>
          <div className={styles.popupBox} onClick={(e) => e.stopPropagation()}>
            <p>本当にこの案件を完了にしていいですか？</p>
            <div className={styles.buttonFlex}>
              <button
                type="button"
                onClick={handleClickFinish}
              >はい</button>
              <button
                type="button"
                onClick={handleClickPopup}
              >いいえ</button>
            </div>
          </div>
        </section>
      : null}
    </>
  );
}

export default MatterDetail;