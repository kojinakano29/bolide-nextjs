import styles from '@/styles/dellamall/components/storeCard.module.scss'
import dummyDefault from '@/images/dellamall/parts/store__item/defoult.webp'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

const StoreCard = ({item, swiper = false, none = false}) => {
    const url = `${item.url.substring(0, 11)}...`

    return (
        <div className={`${styles.cardBox} ${swiper ? styles.swiper : ""}`}>
            <Link href={`/dellamall/shop/${item.id}`}>
                <a className={styles.item}>
                    {item.image_permission === 0 ?
                        <img
                            className={styles.shopImg}
                            src={dummyDefault.src}
                            alt=""
                        />
                    :
                        <img
                            className={styles.shopImg}
                            src={item.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${item.thumbs}` : dummyDefault.src}
                            alt=""
                        />
                    }
                    {item.image_permission === 0 ?
                        <div className={`${styles.card} ${styles.default}`}>
                            <p className={styles.name}>{item.name}</p>
                            <p className={styles.sub}>
                                ショップオーナーHPキャプチャ画像
                                <br/>無料掲載はこちら
                            </p>
                            <div className={styles.flex}>
                                <p className={`${styles.link} en`}>
                                    <FontAwesomeIcon icon={faLink} />
                                    <span>{url}</span>
                                </p>
                                <div className={styles.flex2}>
                                    <div className={styles.box}>
                                        <button className={styles.icon}>
                                            <FontAwesomeIcon icon={faComment} />
                                        </button>
                                        <p className={`${styles.counter} en`}>{item.d_comments_count}</p>
                                    </div>
                                    <div className={styles.box}>
                                        <button className={styles.icon}>
                                            <FontAwesomeIcon icon={faHeart} />
                                        </button>
                                        <p className={`${styles.counter} en`}>{item.d_goods_count}</p>
                                    </div>
                                    <div className={styles.box}>
                                        <button className={styles.icon}>
                                            <FontAwesomeIcon icon={faBookmark} />
                                        </button>
                                        <p className={`${styles.counter} en`}>{item.d_malls_count}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    : null}
                    <div className={`${styles.card} ${styles.onMouse}`}>
                        <p className={styles.name}>{item.name}</p>
                        {item.image_permission === 0 && !item.official_user_id ?
                            <div className={`${styles.btnArea} ${styles.btnArea1}`}>
                                <p>ショップオーナーHP<br className="sp" />キャプチャ画像</p>
                                <p className={styles.type1}>無料掲載はこちら</p>
                            </div>
                        : null}
                        {item.image_permission !== 0 && !item.official_user_id ?
                            <div className={`${styles.btnArea} ${styles.btnArea2}`}>
                                <p className={styles.type1}>公式ショップ申請は<br className="sp" />こちら</p>
                            </div>
                        : null}
                        {item.official_user_id ?
                            <div className={`${styles.btnArea} ${styles.btnArea3}`}>
                                <p className={styles.type2}>
                                    <FontAwesomeIcon icon={faCircleCheck} />
                                    公式ページ
                                </p>
                            </div>
                        : null}
                        <div className={styles.flex}>
                            <p className={`${styles.link} en`}>
                                <FontAwesomeIcon icon={faLink} />
                                <span>{url}</span>
                            </p>
                            <div className={styles.flex2}>
                                <div className={styles.box}>
                                    <button className={styles.icon}>
                                        <FontAwesomeIcon icon={faComment} />
                                    </button>
                                    <p className={`${styles.counter} en`}>{item.d_comments_count}</p>
                                </div>
                                <div className={styles.box}>
                                    <button className={styles.icon}>
                                        <FontAwesomeIcon icon={faHeart} />
                                    </button>
                                    <p className={`${styles.counter} en`}>{item.d_goods_count}</p>
                                </div>
                                <div className={styles.box}>
                                    <button className={styles.icon}>
                                        <FontAwesomeIcon icon={faBookmark} />
                                    </button>
                                    <p className={`${styles.counter} en`}>{item.d_malls_count}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
            {none ?
                null :
                <p className={styles.title}>{item.name}</p>
            }
        </div>
    );
}

export default StoreCard;