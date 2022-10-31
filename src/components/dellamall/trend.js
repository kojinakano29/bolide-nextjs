import styles from '@/styles/dellamall/components/trend.module.scss'

const Trend = ({mb40 = false}) => {
  return (
    <>
      <p className={`${styles.title} ${mb40 ? styles.mb40 : ""}`}>TREND</p>
      <ul className={styles.trend__list}>
        <li className={styles.keyWord__item}><a className="hoverEffect">ケーキ</a></li>
        <li className={styles.keyWord__item}><a className="hoverEffect">洗顔</a></li>
        <li className={styles.keyWord__item}><a className="hoverEffect">シフォンケーキ</a></li>
        <li className={styles.keyWord__item}><a className="hoverEffect">服</a></li>
        <li className={styles.keyWord__item}><a className="hoverEffect">和菓子</a></li>
        <li className={styles.keyWord__item}><a className="hoverEffect">スイーツ</a></li>
        <li className={styles.keyWord__item}><a className="hoverEffect">デリバリー</a></li>
        <li className={styles.keyWord__item}><a className="hoverEffect">食品</a></li>
        <li className={styles.keyWord__item}><a className="hoverEffect">靴</a></li>
        <li className={styles.keyWord__item}><a className="hoverEffect">パン</a></li>
        <li className={styles.keyWord__item}><a className="hoverEffect">眼鏡</a></li>
        <li className={styles.keyWord__item}><a className="hoverEffect">サングラス</a></li>
      </ul>
    </>
  );
}

export default Trend;