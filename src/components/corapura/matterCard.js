import styles from '@/styles/corapura/components/matterCard.module.scss'
import dummy from '@/images/corapura/top/cont6_1.webp'
import Link from 'next/link';

const MatterCard = ({matter}) => {
  return (
    <article className={styles.matterCard}>
      <Link href={`/corapura/${matter.id}`}>
        <a>
          <div className={`${styles.imgBox} matterThumbs`}>
            <img src={matter.thumbs ? matter.thumbs : dummy.src} alt="" />
          </div>
          <p className={styles.tag}>{matter.c_cat.name}</p>
          <p className={styles.ttl}>{matter.title}</p>
          <p className={styles.desc}>{matter.content.substring(0, 50)}...</p>
          <p className={styles.date}>
            <span className={styles.icon}>撮影日</span>
            {matter.date}
          </p>
          <p className={styles.date}>
            <span className={styles.icon}>募集期間</span>
            {matter.limite_date}
          </p>
          <div className={styles.company}>
            <div className={styles.logoBox}>
              {matter.user.c_profile.thumbs ? <img src={matter.user.c_profile.thumbs} alt="" /> : null}
            </div>
            {matter.user.c_profile.nicename}
          </div>
        </a>
      </Link>
    </article>
  );
}

export default MatterCard;