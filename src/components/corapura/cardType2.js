import styles from '@/styles/corapura/components/cardType2.module.scss'
import dummy from '@/images/corapura/common/userDummy.svg'

const CardType2 = ({data, detail = false}) => {
  return (
    <div className={styles.flex}>
      {data.map((item, index) => (
        <article className={styles.box} key={index}>
          <div className={styles.imgBox}>
            <img src={item.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${item.thumbs}` : dummy.src} alt="" />
          </div>
          <p className={styles.name}>{item.title.substring(0, 18)}{item.title.length > 18 ? "..." : ""}</p>
          <p className={styles.desc}>{item.text.substring(0, 23)}{item.text.length > 23 ? "..." : ""}</p>
          {!detail ?
            <div className={styles.company}>
              <div className={styles.logoBox}>
                {item.c_profile.thumbs ? <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${item.c_profile.thumbs}`} alt="" /> : null}
              </div>
              {item.c_profile.nicename}
            </div>
          : null}
        </article>
      ))}
    </div>
  );
}

export default CardType2;