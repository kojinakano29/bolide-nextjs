import styles from '@/styles/top/components/make.module.scss'
import Link from "next/link";
import Container from "./Layout/container";

const Make = () => {
  return (
    <section className={styles.makeArea}>
      <Container small>
        <div className={styles.midashiBox}>
          <img src="/top/t-min.svg" alt="" />
        </div>
        <h2 className="ttl1">
          <span className="big">Bolide's Japan</span>
          <span className="sm">を使ってみませんか？</span>
        </h2>
        <p className={styles.desc}>
          テキストサンプルテキストサンプルテキストサンプル、
          <br/>テキストサンプルテキストサンプルテキストサンプルテキストサンプル。
        </p>
        <h3 className={styles.ttl}>ご登録フォームはこちら</h3>
        <div className={styles.flex}>
          <Link href="/">
            <a className="hoverEffect">
              <span className={styles.txt}>企業・団体の方</span>
              <img src="/top/form1.svg" alt="" />
            </a>
          </Link>
          <Link href="/">
            <a className="hoverEffect">
              <span className={styles.txt}>
                フリーランス
                <br/>専門家・個人事業主の方
              </span>
              <img src="/top/form2.svg" alt="" />
            </a>
          </Link>
          <Link href="/">
            <a className="hoverEffect">
              <span className={styles.plan}>フリープラン</span>
              <span className={styles.txt}>一般ユーザーの方</span>
              <img src="/top/form3.svg" alt="" />
            </a>
          </Link>
          <Link href="/">
            <a className="hoverEffect">
              <span className={styles.plan}>プレミアムプラン</span>
              <span className={styles.txt}>一般ユーザーの方</span>
              <img src="/top/form4.svg" alt="" />
            </a>
          </Link>
          <Link href="/">
            <a className="hoverEffect">
              <span className={styles.txt}>地方自治体の方</span>
              <img src="/top/form5.svg" alt="" />
            </a>
          </Link>
          <Link href="/">
            <a className="hoverEffect">
              <span className={styles.txt}>メディアの方</span>
              <img src="/top/form6.svg" alt="" />
            </a>
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default Make;