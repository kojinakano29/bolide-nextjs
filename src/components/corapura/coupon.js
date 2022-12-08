import styles from '@/styles/corapura/components/coupon.module.scss'
import dummy from '@/images/corapura/common/dummy2.svg'

const Coupon = ({data, detail = false}) => {
  return (
    <article className={styles.couponBox}>
      <div className={styles.imgBox}>
        <img src={data.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${data.thumbs}` : dummy.src} alt="クーポンの画像" />
      </div>
      <div className={styles.couponCont}>
        <p className={styles.name}>{data.title}</p>
        <p className={styles.limit}>期間：{data.limit}まで</p>
        {!detail ?
          <div className={styles.company}>
            <div className={styles.logoBox}>
              {data.c_profile.thumbs ? <img src={data.c_profile.thumbs} alt="" /> : null}
            </div>
            {data.c_profile.nicename}
          </div>
        : null}
      </div>
    </article>
  );
}

export default Coupon;