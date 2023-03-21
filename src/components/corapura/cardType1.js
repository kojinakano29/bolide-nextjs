import styles from '@/styles/corapura/components/cardType1.module.scss'
import dummy from '@/images/corapura/common/dummy3.svg'

const CardType1 = ({data, cat = false, detail = false, swiper = false}) => {
  // console.log(data)

  return (
    <article className={`${styles.box} ${swiper ? styles.swiper : null}`}>
      <div className={styles.imgBox}>
        <img src={data.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${data.thumbs}` : dummy.src} alt={data.title} />
      </div>
      {cat ? <p className={styles.cat}>{data?.category}</p> : null}
      <p className={styles.name}>{data.title}</p>
      {!detail ?
        <a
          href={`/corapura/company/${data.c_profile.user.id}`}
          className={`${styles.company} hoverEffect`}
        >
          <div className={styles.logoBox}>
            {data.c_profile.thumbs ? <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${data.c_profile.thumbs}`} alt="プロフィール画像" /> : null}
          </div>
          {data.c_profile.nicename}
        </a>
      : null}
    </article>
  );
}

export default CardType1;