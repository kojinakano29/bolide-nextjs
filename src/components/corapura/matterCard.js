import styles from '@/styles/corapura/components/matterCard.module.scss'
import dummy from '@/images/corapura/top/cont6_1.webp'
import Link from 'next/link';
import starB from '@/images/corapura/common/starB.svg'
import starA from '@/images/corapura/common/starA.svg'

const MatterCard = ({matter, detail = false}) => {
  return (
    <article className={`${styles.matterCard} ${detail ? styles.detail : null}`}>
      <Link href={`/corapura/${matter.id}`}>
        <a>
          <div className={`${styles.imgBox} matterThumbs`}>
            <img src={matter.thumbs ? matter.thumbs : dummy.src} alt="" />
          </div>
          <p className={styles.tag}>{matter.c_cat.name}</p>
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
                {matter.user.c_profile.thumbs ? <img src={matter.user.c_profile.thumbs} alt="" /> : null}
              </div>
              {matter.user.c_profile.nicename}
            </div>
          }
        </a>
      </Link>
      {detail ?
        <button
          type="button"
          className={styles.bookmarkBtn}
        >
          <img src={starB.src} alt="" />
        </button>
      : null}
    </article>
  );
}

export default MatterCard;