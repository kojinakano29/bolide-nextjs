import styles from '@/styles/corapura/components/matterCard.module.scss'
import dummy from '@/images/corapura/common/dummy1.svg'
import Link from 'next/link';
import starB from '@/images/corapura/common/starB.svg'
import starA from '@/images/corapura/common/starA.svg'
import check from '@/images/corapura/common/check.svg'
import { useAuth } from '@/hooks/auth';
import { useCallback, useState } from 'react';
import axios from '@/lib/axios';

const MatterCard = ({matter, bookmarkList, detail = false, list = false}) => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const { user } = useAuth()
  const [disabled, setDisabled] = useState(false)
  const [bookmark, setBookmark] = useState(bookmarkList)

  const handleClickBookmark = useCallback(async () => {
    if (disabled) return
    setDisabled(true)
    await csrf()

    if (bookmark.includes(matter.id)) {
      await axios.delete('/api/corapura/post_bookmark/delete', {
        data: {
          user_id: user?.id,
          c_post_id: matter.id,
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
        c_post_id: matter.id,
      }).then((res) => {
        // console.log(res)
        setBookmark(res.data)
      }).catch((e) => {
        console.error(e)
      })
    }

    await setDisabled(false)
  }, [disabled, setDisabled, user, bookmark, setBookmark, matter])

  return (
    <>
      {list ?
        <article className={`${styles.matterCard} ${styles.list}`}>
          <Link href={`/corapura/company/matter/${matter.id}`}>
            <a>
              <div className={`${styles.imgBox} matterThumbs`}>
                <img src={matter.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${matter.thumbs}` : dummy.src} alt="" />
                {matter.state === 0 ? null :
                  <div className={styles.finishMatter}>
                    <img src={check.src} alt="" />
                    <p>
                      この募集は
                      <br/>終了しました
                    </p>
                  </div>
                }
              </div>
              <p className={styles.ttl}>{matter.title}</p>
              <p className={styles.desc}>{matter.content.substring(0, 50)}...</p>
              <p className={styles.iconBox}>
                <span className={styles.icon}>掲載日</span>
                {matter.date}
              </p>
              <p className={styles.iconBox}>
                <span className={styles.icon}>募集期間</span>
                {matter.limite_date}
              </p>
              <p className={styles.iconBox}>
                <span className={styles.icon}>報酬</span>
                {matter.reward}
              </p>
              <div className={styles.company}>
                <div className={styles.logoBox}>
                  {matter.user.c_profile.thumbs ? <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${matter.user.c_profile.thumbs}`} alt="" /> : null}
                </div>
                {matter.user.c_profile.nicename}
              </div>
            </a>
          </Link>
          <button
            type="button"
            className={`${styles.bookmarkBtn} hoverEffect`}
            onClick={handleClickBookmark}
          >
            <img src={bookmark.includes(matter.id) ? starA.src : starB.src} alt="" />
          </button>
        </article>
      :
        <article className={`${styles.matterCard} ${detail ? styles.detail : null}`}>
          <Link href={`/corapura/company/matter/${matter.id}`}>
            <a>
              <div className={`${styles.imgBox} matterThumbs`}>
                <img src={matter.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${matter.thumbs}` : dummy.src} alt="" />
              </div>
              <p className={styles.tag}>{matter.c_cat?.name}</p>
              <p className={styles.ttl}>{matter.title}</p>
              <p className={styles.desc}>{matter.content.substring(0, 50)}...</p>
              <p className={styles.iconBox}>
                <span className={styles.icon}>{detail ? "実施日" : "撮影日"}</span>
                {matter.date}
              </p>
              <p className={styles.iconBox}>
                <span className={styles.icon}>募集期間</span>
                {matter.limite_date}
              </p>
              {detail ?
                <p className={styles.iconBox}>
                  <span className={styles.icon}>報酬</span>
                  {matter.reward}
                </p>
              : null}
              {detail ? null :
                <div className={styles.company}>
                  <div className={styles.logoBox}>
                    {matter.user.c_profile.thumbs ? <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${matter.user.c_profile.thumbs}`} alt="" /> : null}
                  </div>
                  {matter.user.c_profile.nicename}
                </div>
              }
            </a>
          </Link>
          {detail ?
            <button
              type="button"
              className={`${styles.bookmarkBtn} hoverEffect`}
              onClick={handleClickBookmark}
            >
              <img src={bookmark.includes(matter.id) ? starA.src : starB.src} alt="" />
            </button>
          : null}
        </article>
      }
    </>
  );
}

export default MatterCard;