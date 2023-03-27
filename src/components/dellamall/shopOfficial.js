import styles from '@/styles/dellamall/components/shopOfficial.module.scss'
import { useCallback, useEffect, useState } from 'react';
import dummy from '@/images/dellamall/shopDetail/dummy.webp'
import { Btn01, DateFormat } from '@/components/dellamall';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import axios from 'axios';

const shopOfficial = ({info, salon}) => {
  // console.log(info)
  // console.log(salon)

  const overviews = info.d_overviews
  const coupons = info.d_coupons
  const infos = info.d_infos
  const items = info.d_items
  const instagramApi = info.d_insta_api_tokens

  const [instagramItem, setInstagramItem] = useState([])
  const [current, setCurrent] = useState(1)
  const handleClickTab = useCallback((index) => {
    setCurrent(index)
  }, [])

  useEffect(() => {
    const user_name = instagramApi[0]?.user_name
    const access_token = instagramApi[0]?.api_token
    const user_id = instagramApi[0]?.account_name
    const get_count = 8
    const media = `id,caption,media_url,permalink,media_type,like_count,comments_count,timestamp`
    const fields = `business_discovery.username(${user_name}){profile_picture_url,follows_count,biography,name,username,followers_count,media_count,website,media.limit(${get_count}){${media}}}`

    axios.get(`https://graph.facebook.com/v14.0/${user_id}?fields=${fields}&access_token=${access_token}`)
    .then((res) => {
      // console.log(res)
      setInstagramItem(res.data.business_discovery)
    })
    .catch((e) => {
      console.error(e)
    })
  }, [])

  return (
    <>
      <div className={styles.tabArea}>
        <div className={styles.tabBtnBox}>
          <button
            type="button"
            className={`${styles.tabBtn} ${current === 1 ? styles.current : ""}`}
            onClick={() => handleClickTab(1)}
          >ショップ情報</button>
          <button
            type="button"
            className={`${styles.tabBtn} ${current === 2 ? styles.current : ""}`}
            onClick={() => handleClickTab(2)}
          >クーポン情報</button>
          <button
            type="button"
            className={`${styles.tabBtn} ${current === 3 ? styles.current : ""}`}
            onClick={() => handleClickTab(3)}
          >オンラインサロン</button>
          <button
            type="button"
            className={`${styles.tabBtn} ${current === 4 ? styles.current : ""}`}
            onClick={() => handleClickTab(4)}
          >お知らせ</button>
        </div>
        <div className={styles.tabBox}>
          {current === 1 ?
            <article className={styles.box}>
              {overviews.length !== 0 ?
                <div className={styles.overview}>
                  {overviews.map((overview) => (
                    <dl key={overview.id}>
                      <dt>{overview.title}</dt>
                      <dd>{overview.content}</dd>
                    </dl>
                  ))}
                </div>
                :
                <p className={styles.noneLength}>ショップ情報がありません</p>
              }
            </article>
            : null
          }
          {current === 2 ?
            <article className={styles.box}>
              {coupons.length !== 0 ?
                <ul className={styles.couponInfo}>
                  {coupons.map((coupon) => (
                    <li key={coupon.id}>
                      <p className={styles.txt}>{coupon.title}</p>
                      <p className={styles.discount}>{coupon.content}</p>
                      <p className={styles.limit}>有効期限 <span>{coupon.limit}</span></p>
                    </li>
                  ))}
                </ul>
                :
                <p className={styles.noneLength}>クーポン情報がありません</p>
              }
            </article>
            : null
          }
          {current === 3 ?
            <article className={styles.box}>
              {salon ?
                <div className={styles.onlineSalon}>
                  <div className={styles.left}>
                    <img src={salon.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${salon.thumbs}` : dummy.src} alt="オンラインサロンのサムネイル" />
                  </div>
                  <div className={styles.right}>
                    <p className={styles.ttl}>{salon.title}</p>
                    <p className={styles.desc}>
                      {salon.content?.replace(/<[^>]+>/g, '')?.replace(/&nbsp;/g, '')?.substring(0, 123)}
                      {salon.content?.replace(/<[^>]+>/g, '')?.replace(/&nbsp;/g, '')?.length > 123 ?
                        "..."
                      : null}
                    </p>
                    <a className={styles.btn} href={`/corapura/salon/${salon.id}`} target="_blank">詳しく見る</a>
                  </div>
                </div>
                :
                <p className={styles.noneLength}>オンラインサロンがありません</p>
              }
            </article>
            : null
          }
          {current === 4 ?
            <article className={styles.box}>
              {infos.length !== 0 ?
                <ul className={styles.news}>
                  {infos.map((info) => (
                    <li key={info.id}>
                      <p className={styles.day}><DateFormat dateString={info.title} /></p>
                      <p className={styles.txt}>{info.content}</p>
                    </li>
                  ))}
                </ul>
                :
                <p className={styles.noneLength}>お知らせがありません</p>
              }
            </article>
            : null
          }
        </div>
      </div>

      <div className={styles.instaArea}>
        <h2 className="ttl1 center">Instagram</h2>
        {instagramItem.length !== 0 ?
          <>
            <ul className={styles.instaBox}>
              {instagramItem?.media?.data?.map((item, index) => (
                <li key={index}>
                  <a href={item?.permalink} target="_blank" rel="noopener noreferrer">
                    <img src={item?.media_url} alt="SNSアイコン" />
                    <div className={styles.hoverBox}>
                      <div>
                        <FontAwesomeIcon icon={faHeart} />
                        {item?.like_count ? item.like_count : 0}
                      </div>
                      {item?.comments_count || item?.comments_count === 0 ?
                        <div>
                          <FontAwesomeIcon icon={faComment} />
                          {item.comments_count}
                        </div>
                      : null}
                    </div>
                    {/* <div className={styles.type}>
                      <img src={`${item.media_type === "VIDEO" ? 'bb' : ''}${item.media_type === "CAROUSEL_ALBUM" ? 'cc' : ''}`} alt="アイコン" />
                    </div> */}
                  </a>
                </li>
              ))}
            </ul>
            <Btn01 fa={faInstagram} txt="Instagram" link={`https://www.instagram.com/${instagramItem.username}`} blank />
          </>
          :
          <p className={styles.noneLength}>Instagramがありません</p>
        }
      </div>

      <div className={styles.itemArea}>
        <h2 className="ttl1 center">商品</h2>
        {items.length !== 0 ?
          <>
            <ul className={styles.itemList}>
              {items.map((item) => (
                <li key={item.id}>
                  <div className={styles.imgBox}>
                    <img src={item.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${item.thumbs}` : null} alt="商品の画像" />
                  </div>
                  <p className={styles.product}>{item.title}</p>
                  <p className={styles.cost}>￥{item.price}<span>(税込)</span></p>
                </li>
              ))}
            </ul>
            <Btn01 fa={faBagShopping} txt="すべての商品を見る" link={info.url} blank />
          </>
          :
          <p className={styles.noneLength}>商品がありません</p>
        }
      </div>
    </>
  );
}

export default shopOfficial;