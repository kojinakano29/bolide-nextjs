import styles from '@/styles/corapura/components/matterCard.module.scss'
import dummy from '@/images/corapura/common/dummy1.svg'
import Link from 'next/link';
import starB from '@/images/corapura/common/starB.svg'
import starA from '@/images/corapura/common/starA.svg'
import check from '@/images/corapura/common/check.svg'
import { useAuth } from '@/hooks/auth';
import { useCallback, useState } from 'react';
import axios from '@/lib/axios';
import { DateFormat } from '@/components/corapura';

const MatterCard = ({matter, bookmarkList, detail = false, list = false}) => {
  // console.log(matter)
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const date = new Date()
  const year = date.getFullYear()
  const month = ("00" + (date.getMonth()+1)).slice(-2)
  const day = ("00" + date.getDate()).slice(-2)
  const today = `${year}-${month}-${day}`

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
          <Link href={`/corapura/matter/${matter.id}`}>
            <a>
              <div className={`${styles.imgBox} matterThumbs`}>
                <img src={matter.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${matter.thumbs}` : dummy.src} alt="" />
                {matter.state === 1 || matter.limite_date <= today ?
                  <div className={styles.finishMatter}>
                    <img src={check.src} alt="" />
                    <p>
                      この募集は
                      <br/>終了しました
                    </p>
                  </div>
                  : null
                }
              </div>
              <p className={styles.ttl}>{matter.title}</p>
              <p className={styles.desc}>
                {matter.content.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, '').substring(0, 50)}
              </p>
              {matter.created_at ?
                <p className={styles.iconBox}>
                  <span className={styles.icon}>掲載日</span>
                  <DateFormat dateString={matter.created_at} />
                </p>
              : null}
              {matter.limite_date ?
                <p className={styles.iconBox}>
                  <span className={styles.icon}>募集終了日</span>
                  {matter.limite_date.replace(/-/g, '.')}
                </p>
              : null}
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
          <Link href={`/corapura/matter/${matter.id}`}>
            <a>
              <div className={`${styles.imgBox} matterThumbs`}>
                <img src={matter.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${matter.thumbs}` : dummy.src} alt="" />
              </div>
              <p className={styles.tag}>{matter.c_cat?.name}</p>
              <p className={styles.ttl}>{matter.title}</p>
              <p className={styles.desc}>
                {matter.content.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, '').substring(0, 50)}
              </p>
              {matter.created_at ?
                <p className={styles.iconBox}>
                  <span className={styles.icon}>掲載日</span>
                  <DateFormat dateString={matter.created_at} />
                </p>
              : null}
              {matter.limite_date ?
                <p className={styles.iconBox}>
                  <span className={styles.icon}>募集終了日</span>
                  {matter.limite_date.replace(/-/g, '.')}
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