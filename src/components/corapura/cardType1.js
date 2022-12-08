import styles from '@/styles/corapura/components/cardType1.module.scss'
import dummy from '@/images/corapura/common/dummy3.svg'

const CardType1 = ({data, cat = false, detail = false}) => {
  return (
    <article className={styles.box}>
      <div className={styles.imgBox}>
        <img src={data.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${data.thumbs}` : dummy.src} alt="" />
      </div>
      {cat ? <p className={styles.cat}>{data?.category}</p> : null}
      <p className={styles.name}>{data.title}</p>
      {!detail ?
        <div className={styles.company}>
          <div className={styles.logoBox}>
            {data.c_profile.thumbs ? <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${data.c_profile.thumbs}`} alt="" /> : null}
          </div>
          {data.c_profile.nicename}
        </div>
      : null}
    </article>
  );
}

export default CardType1;