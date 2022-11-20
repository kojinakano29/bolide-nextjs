import styles from '@/styles/corapura/components/release.module.scss'
import Link from 'next/link';
import dummy from '@/images/corapura/common/dummyRelease.svg'
import view from '@/images/corapura/parts/material_view.svg'

const Release = ({data}) => {
  return (
    <Link href={`/corapura`}>
      <a className={styles.releaseLink}>
        <div className={styles.imgBox}>
          <img src={data.thumbs ? data.thumbs : dummy.src} alt="" />
        </div>
        <p className={styles.ttl}>{data.title}</p>
        <div className={`${styles.view} en`}>
          <img src={view.src} alt="" />
          {data.c_pr_counts_count}view
        </div>
        <div className={styles.company}>
          <div className={styles.logoBox}>
            {data.user.c_profile.thumbs ? <img src={data.user.c_profile.thumbs} alt="" /> : null}
          </div>
          {data.user.c_profile.nicename}
        </div>
        <p className={styles.tag}>スキルアップ</p>
      </a>
    </Link>
  );
}

export default Release;