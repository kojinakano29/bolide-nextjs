import styles from '@/styles/corapura/components/companyCard.module.scss'
import dummy from '@/images/corapura/common/userDummy.svg'

const CompanyCard = ({data}) => {
  // console.log(data)

  return (
    <a href={`/corapura/company/${data?.id}`} className={`hoverEffect ${styles.companyBox}`}>
      <div className={styles.company__top}>
        <div className={styles.company__topLeft}>
          <img src={data?.c_profile?.image1 ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${data?.c_profile?.image1}` : dummy.src} alt="会社のイメージ画像" />
        </div>
        <div className={styles.company__topRight}>
          <div className={styles.companyInfo2}>
            <div className={styles.logoBox}>
              {data?.c_profile?.thumbs ? <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${data?.c_profile?.thumbs}`} alt="プロフィール画像" /> : null}
            </div>
            {data?.c_profile?.nicename}
          </div>
          <div className={styles.company__topRightList}>
            {data?.c_profile?.c_tags.map((tag, index) => (
              <p className={styles.tag} key={index}>{tag.name}</p>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.company__bottom}>
        {data?.c_profile?.profile.substring(0, 62)}
        {data?.c_profile?.profile.length > 63 ? "..." : null}
      </div>
    </a>
  );
}

export default CompanyCard;