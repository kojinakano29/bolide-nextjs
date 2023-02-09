import Container from '@/components/dellamall/Layouts/container';
import PageLayoutDellamall from '@/components/Layouts/PageLayoutDellamall';
import styles from '@/styles/dellamall/components/mypage.module.scss'
import notSet from '@/images/dellamall/myPage/userImg.webp'
import { Btn01, CreateMallMypage, Follow, Loader, MallComponent, MasonryGridComponent } from '@/components/dellamall';
import { faSquarePlus, faTableCellsLarge, faGear } from '@fortawesome/free-solid-svg-icons'
import { createContext, useCallback, useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/router';

export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DELLAMALL}/mypage/${params.id}`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

export const CreateMallContext = createContext()
export const FollowPopupContext = createContext()

const Mypage = ({posts}) => {
  // console.log(posts)
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user, logout } = useAuth({type: 'dellamall'})
  const profile = posts.profile
  const dProfile = profile.d_profile
  const create_shop = posts.create_shop
  const [processing, setProcessing] = useState(false)
  const [tabState, setTabState] = useState(1)
  const [popupOpen, setPopupOpen] = useState(false)
  const [createShop, setCreateShop] = useState(create_shop)
  const [createMall, setCreateMall] = useState([])
  const [saveShop, setSaveShop] = useState([])
  const [saveMall, setSaveMall] = useState([])
  const [comment, setComment] = useState([])
  const [follow, setFollow] = useState(false)
  const [open, setOpen] = useState(false)
  const [followType, setFollowType] = useState(null)
  const [followCount, setFollowCount] = useState(profile.d_followed_count)

  const tabItems = [
    "作成ショップ",
    "作成モール",
    "保存ショップ",
    "保存モール",
    "コメント",
  ]

  useEffect(() => {
    if (user && router.query.state === "4") {
      handleClickTab(4)
      handleClickTabShow(4)
    }
  }, [user, router.query.state])

  const loadFollowCheck = useCallback(async () => {
    await csrf()

    await axios.post('/api/dellamall/follow/check', {
      user_id: profile.id,
    }).then((res) => {
      // console.log(res)
      if (res.data.includes(user?.id)) {
        setFollow(true)
      }
    }).catch((e) => {
      console.error(e)
    })
  }, [user])

  useEffect(() => {
    if (user) {
      loadFollowCheck()
    }
  }, [user])

  const handleClickFollowToggle = async () => {
    if (processing) return
    await setProcessing(true)
    await csrf()

    if (follow) {
      await axios.delete('/api/dellamall/follow/delete', {
        data: {
          followed_user_id: profile.id,
          following_user_id: user?.id,
        }
      }).then((res) => {
        // console.log(res)
        setFollow(false)
        setFollowCount(prevState => prevState - 1)
        alert("フォロー解除しました。")
      }).catch((e) => {
        console.error(e)
      })
    } else {
      await axios.post('/api/dellamall/follow/store', {
        followed_user_id: profile.id,
        following_user_id: user?.id,
      }).then((res) => {
        // console.log(res)
        setFollow(true)
        setFollowCount(prevState => prevState + 1)
        alert("フォローしました。")
      }).catch((e) => {
        console.error(e)
      })
    }

    await setProcessing(false)
  }

  const handleClickTab = useCallback(async (state) => {
    setTabState(state)
  }, [])

  const handleClickTabShow = useCallback(async (state) => {
    if (processing) return
    await setProcessing(true)
    await csrf()

    if (state === 1) {
      await axios.post(`/api/dellamall/user/create_shop`, {
        user_id: profile.id
      }).then((res) => {
        // console.log(res)
        setCreateShop(res.data)
      }).catch((e) => {
        console.error(e)
      })
    } else if (state === 2) {
      await axios.post(`/api/dellamall/user/create_mall`, {
        user_id: profile.id
      }).then((res) => {
        // console.log(res)
        setCreateMall(res.data)
      }).catch((e) => {
        console.error(e)
      })
    } else if (state === 3) {
      await axios.post(`/api/dellamall/user/save_shop`, {
        user_id: profile.id
      }).then((res) => {
        // console.log(res)
        setSaveShop(res.data)
      }).catch((e) => {
        console.error(e)
      })
    } else if (state === 4) {
      await axios.post(`/api/dellamall/user/save_mall`, {
        user_id: profile.id
      }).then((res) => {
        // console.log(res)
        setSaveMall(res.data.d_mall_bookmark)
      }).catch((e) => {
        console.error(e)
      })
    } else if (state === 5) {
      await axios.post(`/api/dellamall/user/send_comments`, {
        user_id: profile.id
      }).then((res) => {
        // console.log(res)
        setComment(res.data)
      }).catch((e) => {
        console.error(e)
      })
    }

    await setProcessing(false)
  }, [user])

  const handleClickPopup = useCallback(async () => {
    setPopupOpen(prevState => !prevState)
  }, [])

  const handleClickOpen = useCallback(async (type) => {
    setOpen(prevState => !prevState)
    setFollowType(type)
  }, [setOpen, setFollowType])

  return (
    <>
      <section className="cont1">
        <Container small>
          <div className={styles.user__info}>
            <div className={styles.user__info__img}>
              <img src={dProfile?.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${dProfile.thumbs}` : notSet.src} alt="プロフィール画像" />
            </div>
            <div className={styles.user__info__name}>{dProfile?.nicename}</div>
            <div className={styles.user__info__id}>{profile.name}</div>
            <ul className={styles.user__info__follow}>
              <li>投稿 {create_shop.length} 件</li>
              <li>
                <button
                  type="button"
                  className="hoverEffect"
                  onClick={() => handleClickOpen("following")}
                >フォロー</button> {profile.d_following_count} 件
              </li>
              <li>
                <button
                  type="button"
                  className="hoverEffect"
                  onClick={() => handleClickOpen("follower")}
                >フォロワー</button> {followCount} 件
              </li>
            </ul>
            <p className={styles.user__info__text}>{dProfile?.profile}</p>
            <button
              type="button"
              className={`${styles.logout} hoverEffect`}
              onClick={() => logout()}
            >ログアウト</button>
          </div>
          <div className={styles.user__buttonList}>
            {user ?
              <>
                {user?.id === profile.id ?
                  <>
                    <div className={`btnCover ${styles.btnCover}`}>
                      <Btn01 fa={faSquarePlus} txt="ショップを作成する" link="/dellamall/admin/shop/create" />
                    </div>
                    <div className={`btnCover ${styles.btnCover}`} onClick={handleClickPopup}>
                      <Btn01 fa={faTableCellsLarge} txt="モールを作成する" />
                    </div>
                    <div className={`btnCover ${styles.btnCover}`}>
                      <Btn01 fa={faGear} txt="プロフィールを編集する" link="/dellamall/mypage/edit" />
                    </div>
                  </>
                  :
                  <div className={`btnCover ${styles.btnCover}`} onClick={handleClickFollowToggle}>
                    <Btn01 txt={follow ? "フォロー中" : "フォローする"} />
                  </div>
                }
              </>
            : null}
          </div>
        </Container>
      </section>

      {open ?
        <FollowPopupContext.Provider value={{handleClickOpen, followType, profile}}>
          <Follow />
        </FollowPopupContext.Provider>
      : null}

      {popupOpen ?
        <CreateMallContext.Provider value={{handleClickPopup, setCreateMall, user}}>
          <CreateMallMypage />
        </CreateMallContext.Provider>
      : null}

      <section className={styles.tabArea}>
        <div className={styles.tabBox}>
          <Container>
            <div className={styles.tabFlex}>
              {tabItems.map((item, index) => (
                <button
                  type="button"
                  className={`${styles.tabBtn} ${index+1 === tabState ? styles.on : null}`}
                  onClick={() => {
                    handleClickTab(index+1)
                    handleClickTabShow(index+1)
                  }}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </Container>
        </div>
        <div className={styles.tabContent}>
          <Container>
            {processing ? <Loader /> :
              <>
                {tabState === 1 ?
                  <article className={styles.article}>
                    <MasonryGridComponent item={createShop} />
                    <Btn01 fa={faGear} txt="ショップを編集する" link="/dellamall/admin/shop" />
                  </article>
                : null}
                {tabState === 2 ?
                  <article className={styles.article}>
                    <MallComponent item={createMall} user={user} />
                  </article>
                : null}
                {tabState === 3 ?
                  <article className={styles.article}>
                    <MasonryGridComponent item={saveShop} />
                  </article>
                : null}
                {tabState === 4 ?
                  <article className={styles.article}>
                    <MallComponent item={saveMall} user={user} save />
                  </article>
                : null}
                {tabState === 5 ?
                  <article className={styles.article}>
                    <ul className={styles.commentList}>
                      <li className={styles.head}>
                        <p className={styles.shopName}>ショップ名</p>
                        <p className={styles.shopContent}>コメント内容</p>
                        <p className={styles.shopGood}>役に立った数</p>
                      </li>
                      {comment.map((item, index) => (
                        <li key={index}>
                          <p className={styles.shopName}>{item.d_shop.name}</p>
                          <p className={styles.shopContent}>{item.content}</p>
                          <p className={styles.shopGood}>{item.d_comment_goods_count}</p>
                        </li>
                      ))}
                    </ul>
                  </article>
                : null}
              </>
            }
          </Container>
        </div>
      </section>
    </>
  );
}

export default Mypage;

Mypage.getLayout = function getLayout(page) {
  return <PageLayoutDellamall>{page}</PageLayoutDellamall>
}