import styles from '@/styles/dellamall/components/shopDetailArea.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart, faBookmark, faReply, faFlag, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import dummy from '@/images/dellamall/shopDetail/siteImg.png'
import notSet from '@/images/dellamall/shopDetail/user-after.svg'
import notSet2 from '@/images/dellamall/shopDetail/user.svg'
import line from '@/images/dellamall/shopDetail/line.svg'
import facebook from '@/images/dellamall/shopDetail/facebook.svg'
import twitter from '@/images/dellamall/shopDetail/twitter.svg'
import instagram from '@/images/dellamall/shopDetail/instagram.svg'
import youtube from '@/images/dellamall/shopDetail/youtube.svg'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from '@/lib/axios'
import { useRouter } from 'next/router'

const ShopDetailArea = ({data, user}) => {
  console.log(data)
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const shop = data.shop
  const comments = shop.d_comments
  const goods = shop.d_goods
  const ref = useRef()
  const [commentOpen, setCommentOpen] = useState(true)
  const processing = useRef(false)
  const [userThumbs, setUserThumbs] = useState({
    url: notSet2.src,
  })
  const [goodState, setGoodState] = useState(false)

  useEffect(() => {
    const filter = goods.filter((item) => {
      return item.id === user?.id
    })

    if (filter.length === 1) {
      setGoodState(true)
    } else {
      setGoodState(false)
    }
  }, [goodState, user])

  const handleClickGood = async () => {
    if (processing.current) return
    processing.current = true
    await csrf()

    if (goodState) {
      await axios.delete("/api/dellamall/shop/good/delete", {
        data: {
          user_id: user?.id,
          d_shop_id: shop.id,
        }
      })
      .then((res) => {
        console.log(res)
        setGoodState(false)
      })
      .catch((e) => {
        console.error(e)
        alert("エラーが発生しました。")
      })
    } else {
      await axios.post("/api/dellamall/shop/good/store", {
        user_id: user?.id,
        d_shop_id: shop.id,
      })
      .then((res) => {
        console.log(res)
        setGoodState(true)
      })
      .catch((e) => {
        console.error(e)
        alert("エラーが発生しました。")
      })
    }

    processing.current = false
  }

  const handleClickComment = () => {
    setCommentOpen(prevState => !prevState)
  }

  const getUser = useCallback(async () => {
    await csrf()

    await axios.post("/api/d_profile_get", {
      id: user?.id,
    })
    .then((res) => {
      console.log(res)
      if (res.data.thumbs) {
        setUserThumbs({
          url: res.data.thumbs,
        })
      }
    })
    .catch((e) => {
      console.error(e)
    })
  }, [user])

  useEffect(() => {
    if (user) {
      getUser()
    }
  }, [user])

  const { register, handleSubmit } = useForm()
  const onSubmit = useCallback(async (data) => {
    if (processing.current) return
    processing.current = true
    console.log(data)

    await csrf()

    await axios.post(`/api/dellamall/shop/comment_add/${shop.id}`, {
      user_id: user?.id,
      content: data.comment,
    })
    .then((res) => {
      console.log(res)
      router.reload()
    })
    .catch((e) => {
      console.error(e)
    })

    processing.current = false
  }, [user])

  return (
    <div className={styles.cont1__flex}>
      <div className={styles.cont1__flexLeft}>
        <div className={styles.cont1__imgBox}>
          {shop.image_permission === 1 ?
            <img src={dummy.src} alt="" />
            :
            <div className={styles.imgNone}></div>
          }
        </div>
      </div>
      <div className={styles.cont1__flexRight}>
        <div className={styles.cont1__flexRight__icon}>
          <ul className={styles.cont1__flexRight__iconLeft}>
            <li>
              <button className="hoverNone" type="button">
                <FontAwesomeIcon icon={faComment} />
              </button>
              <p className={`${styles.num} en`}>{data.comments_count}</p>
            </li>
            <li>
              <button className={goodState ? styles.on : ""} type="button" onClick={handleClickGood}>
                <FontAwesomeIcon icon={faHeart} />
              </button>
              <p className={`${styles.num} en`}>{data.good_count}</p>
            </li>
            <li>
              <button type="button">
                <FontAwesomeIcon icon={faBookmark} />
              </button>
              <p className={`${styles.num} en`}>{data.mall_count}</p>
            </li>
          </ul>
          <ul className={styles.cont1__flexRight__iconRight}>
            <li>
              <button type="button">
                <FontAwesomeIcon icon={faReply} transform="flip-h" />
              </button>
            </li>
            <li>
              <button type="button">
                <FontAwesomeIcon icon={faFlag} />
              </button>
            </li>
          </ul>
        </div>
        <div className={styles.cont1__flexRight__topUrl}>
          <a href={shop.url} target="_blank">{shop.url}</a>
        </div>
        <p className={styles.cont1__flexRight__topName}>{shop.name}</p>
        <ul className={styles.cont1__flexRight__topWords}>
          <li className={styles.keyWord__item}><a className="hoverEffect">服</a></li>
          <li className={styles.keyWord__item}><a className="hoverEffect">靴</a></li>
          <li className={styles.keyWord__item}><a className="hoverEffect">アパレル</a></li>
          <li className={styles.keyWord__item}><a className="hoverEffect">バッグ</a></li>
        </ul>
        <p className={styles.cont1__flexRight__middleText}>{shop.description}</p>
        <div className={styles.cont1__flexRight__middleComment}>
          <p className={styles.total} >
            コメント：<span>{data.comments_count}</span>件
            <button type="button" onClick={handleClickComment}>
              <FontAwesomeIcon icon={faChevronDown} size="xs" transform={commentOpen ? null : "rotate-270"} />
            </button>
          </p>
          <div className={styles.comment__box}>
            <ul
              ref={ref}
              style={
                commentOpen ?
                {maxHeight: ref.current?.scrollHeight}
                : {maxHeight: "0px"}
              }
            >
              {comments.map((comment) => (
                <li key={comment.id}>
                  <div className={styles.user__img}>
                  <img
                    src={
                      comment.user.d_profile.thumbs ?
                      comment.user.d_profile.thumbs :
                      notSet.src
                    }
                    alt=""
                  />
                  </div>
                  <div className={styles.user__comment}>
                    <Link href="">
                      <a className={styles.name}>{comment.user.d_profile.nicename}</a>
                    </Link>
                    <p className={styles.content}>{comment.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.comment__input}>
              <div className={styles.user__img}>
                <img
                  src={userThumbs.url}
                  alt=""
                />
              </div>
                <input
                  type="text"
                  {...register("comment", {required: true})}
                  placeholder="コメントを追加する"
                />
            </div>
          </form>
        </div>
        <div className={styles.cont1__flexRight__bottom}>
          <p>公式SNS</p>
          <ul>
            <li>
              <a className="hoverEffect" href="" target="_blank">
                <img src={line.src} alt="" />
              </a>
            </li>
            <li>
              <a className="hoverEffect" href="" target="_blank">
                <img src={facebook.src} alt="" />
              </a>
            </li>
            <li>
              <a className="hoverEffect" href="" target="_blank">
                <img src={twitter.src} alt="" />
              </a>
            </li>
            <li>
              <a className="hoverEffect" href="" target="_blank">
                <img src={instagram.src} alt="" />
              </a>
            </li>
            <li>
              <a className="hoverEffect" href="" target="_blank">
                <img src={youtube.src} alt="" />
              </a>
            </li>
            <a className={`${styles.salon} hoverEffect`}>オンラインサロン</a>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ShopDetailArea;