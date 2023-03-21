import styles from '@/styles/corapura/components/coupon.module.scss'
import dummy from '@/images/corapura/common/dummy2.svg'

const Coupon = ({data, detail = false, swiper = false}) => {
  return (
    <article className={`${styles.couponBox} ${swiper ? styles.swiper : null}`}>
      <div className={styles.imgBox}>
        <img src={data.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${data.thumbs}` : dummy.src} alt="クーポンの画像" />
      </div>
      <div className={styles.couponCont}>
        <p className={styles.name}>{data.title}</p>
        <p className={styles.limit}>期間：{data.limit}まで</p>
        {!detail ?
          <a
            href={`/corapura/${data.c_profile.user.account_type === 0 ? 'influencer' : 'company'}/${data.c_profile.user.id}`}
            className={`${styles.company} hoverEffect`}
          >
            <div className={styles.logoBox}>
              {data.c_profile.thumbs ? <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${data.c_profile.thumbs}`} alt="プロフィール画像" /> : null}
            </div>
            {data.c_profile.nicename}
          </a>
        : null}
      </div>
    </article>
  );
}

export default Coupon;