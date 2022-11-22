import styles from '@/styles/corapura/components/cardType2.module.scss'
import dummy from '@/images/corapura/common/userDummy.svg'

const CardType2 = ({data, detail = false}) => {
  return (
    <div className={styles.flex}>
      {data.map((item, index) => (
        <article className={styles.box} key={index}>
          <div className={styles.imgBox}>
            <img src={item.thumbs ? item.thumbs : dummy.src} alt="" />
          </div>
          <p className={styles.name}>{item.title}</p>
          <p className={styles.desc}>{item.text}</p>
          {!detail ?
            <div className={styles.company}>
              <div className={styles.logoBox}>
                {item.c_profile.thumbs ? <img src={item.c_profile.thumbs} alt="" /> : null}
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