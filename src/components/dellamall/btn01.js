import styles from '@/styles/dellamall/components/btn01.module.scss'

const Btn01 = ({right = false}) => {
  return (
    <a className={`${styles.btn01} ${styles.pushdown} ${right ? styles.right : ""}`}>
      <div className={styles.logo}>
          {/* <img src="./assets/images/parts/ranking.svg" alt="ランキング"> */}
      </div>
      ランキングを見る
    </a>
  );
}

export default Btn01;