import styles from '@/styles/dellamall/components/shopOfficial.module.scss'
import { useCallback, useEffect, useState } from 'react';
import dummy from '@/images/dellamall/shopDetail/onlineSalon.webp'
import dummy2 from '@/images/dellamall/shopDetail/instagram@del.png'
import { Btn01, Date } from '@/components/dellamall';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

const shopOfficial = ({info}) => {
  const overviews = info.d_overviews
  const coupons = info.d_coupons
  const infos = info.d_infos
  const items = info.d_items
  const instagramApi = info.d_insta_api_tokens

  const [current, setCurrent] = useState(1)
  const handleClickTab = useCallback((index) => {
    setCurrent(index)
  }, [])

  // useEffect(() => {
  //   const get_count = 8
  //   const user_name = instagramApi[0]?.account_name
  //   const access_token = instagramApi[0]?.api_token
  //   const user_id = instagramApi[0]?.user_name

  //   axios.get(`https://graph.facebook.com/v12.0/${user_id}?fields=business_discovery.username(${user_name}){id,followers_count,media_count,ig_id,media.limit(${get_count}){caption,media_url,like_count}}&access_token=${access_token}`)
  //   .then((res) => {
  //     console.log(res)
  //   })
  //   .catch((e) => {
  //     console.error(e)
  //   })
  // }, [])

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
              <div className={styles.overview}>
                {overviews.map((overview) => (
                  <dl key={overview.id}>
                    <dt>{overview.title}</dt>
                    <dd>{overview.content}</dd>
                  </dl>
                ))}
              </div>
            </article>
            : null
          }
          {current === 2 ?
            <article className={styles.box}>
              <ul className={styles.couponInfo}>
                {coupons.map((coupon) => (
                  <li key={coupon.id}>
                    <p className={styles.txt}>{coupon.title}</p>
                    <p className={styles.discount}>{coupon.content}</p>
                    <p className={styles.limit}>有効期限 <span>{coupon.limit}</span></p>
                  </li>
                ))}
              </ul>
            </article>
            : null
          }
          {current === 3 ?
            <article className={styles.box}>
              <div className={styles.onlineSalon}>
                <div className={styles.left}>
                  <img src={dummy.src} alt="" />
                </div>
                <div className={styles.right}>
                  <p className={styles.ttl}>akiicoコミニュケーション【アキコとユウジ】</p>
                  <p className={styles.desc}>
                    【田中亜希子/プロデューサー、美容家】【田中祐次/ヘアメイク】
                    小柄体型の小柄コーデ術、#おちびの輪を軸に女性誌等で活躍する2人が考えるスタイリングアイディアをもとにファッション、美容に関するお悩みを解決していきます。
                  </p>
                  <a className={styles.btn} href="" target="_blank">詳しく見る</a>
                </div>
              </div>
            </article>
            : null
          }
          {current === 4 ?
            <article className={styles.box}>
              <ul className={styles.news}>
                {infos.map((info) => (
                  <li key={info.id}>
                    <p className={styles.day}><Date dateString={info.title} /></p>
                    <p className={styles.txt}>{info.content}</p>
                  </li>
                ))}
              </ul>
            </article>
            : null
          }
        </div>
      </div>

      <div className={styles.instaArea}>
        <h2 className="ttl1 center">Instagram</h2>
        <ul className={styles.instaBox}>
          <li></li>
        </ul>
        <Btn01 fa={faInstagram} txt="Instagram" />
      </div>

      <div className={styles.itemArea}>
        <h2 className="ttl1 center">商品</h2>
        <ul className={styles.itemList}>
          {items.map((item) => (
            <li key={item.id}>
              <div className={styles.imgBox}>
                <img src={dummy2.src} alt="" />
              </div>
              <p className={styles.product}>{item.title}</p>
              <p className={styles.cost}>￥{item.price}<span>(税込)</span></p>
            </li>
          ))}
        </ul>
        <Btn01 fa={faBagShopping} txt="すべての商品を見る" />
      </div>
    </>
  );
}

export default shopOfficial;