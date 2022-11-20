import styles from '@/styles/corapura/components/companyCard.module.scss'
import Link from 'next/link';
import dummy from '@/images/corapura/common/userDummy.svg'

const CompanyCard = ({data}) => {
  return (
    <Link href={`/corapura/company/${data.id}`}>
      <a className={`hoverEffect ${styles.companyBox}`}>
        <div className={styles.company__top}>
          <div className={styles.company__topLeft}>
            <img src={dummy.src} alt="会社のイメージ画像" />
          </div>
          <div className={styles.company__topRight}>
            <div className={styles.companyInfo2}>
              <div className={styles.logoBox}>
                {data.c_profile.thumbs ? <img src={data.c_profile.thumbs} alt="" /> : null}
              </div>
              {data.c_profile.nicename}
            </div>
            <div className={styles.company__topRightList}>
              <p className={styles.tag}>飲食店</p>
              <p className={styles.tag}>グルメ</p>
              <p className={styles.tag}>料理</p>
            </div>
          </div>
        </div>
        <div className={styles.company__bottom}>{data.c_profile.profile}</div>
      </a>
    </Link>
  );
}

export default CompanyCard;