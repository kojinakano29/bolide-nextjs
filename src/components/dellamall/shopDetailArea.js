import styles from '@/styles/dellamall/components/shopDetailArea.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart, faBookmark, faReply, faFlag, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import dummy from '@/images/dellamall/shopDetail/siteImg.png'
import dummy2 from '@/images/dellamall/shopDetail/user-after.svg'
import dummy3 from '@/images/dellamall/shopDetail/user.svg'
import line from '@/images/dellamall/shopDetail/line.svg'
import facebook from '@/images/dellamall/shopDetail/facebook.svg'
import twitter from '@/images/dellamall/shopDetail/twitter.svg'
import instagram from '@/images/dellamall/shopDetail/instagram.svg'
import youtube from '@/images/dellamall/shopDetail/youtube.svg'
import Link from 'next/link'
import { useRef, useState } from 'react'

const ShopDetailArea = ({data}) => {
  console.log(data)

  const shop = data.shop
  const comments = shop.d_comments

  const ref = useRef()
  const [commentOpen, setCommentOpen] = useState(true)

  const handleClickComment = () => {
    setCommentOpen(prevState => !prevState)
  }

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
              <button type="button">
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
          <ul
            ref={ref}
            style={
              commentOpen ?
              {maxHeight: ref.current?.scrollHeight}
              : {maxHeight: "0px"}
            }
          >
            {comments.map((comment) => {
              <li>
                <div className={styles.user__img}>
                  <img src={dummy2.src} alt="ユーザー画像" />
                </div>
                <div className={styles.user__comment}>
                  <Link href="">
                    <a className={styles.name}>ニックネーム</a>
                  </Link>
                  <p className={styles.content}>コメントテキストサンプルテキストサンプル！</p>
                </div>
              </li>
            })}
          </ul>
          <div className={styles.comment__input}>
            <div className={styles.user__img}>
              <img src={dummy3.src} alt="ユーザー画像" />
            </div>
            <input placeholder="コメントを追加する" type="text" />
          </div>
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