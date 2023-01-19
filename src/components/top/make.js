import styles from '@/styles/top/components/make.module.scss'
import Container from "./Layout/container";
import { LinkList } from '@/components/top';

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
        <LinkList />
      </Container>
    </section>
  );
}

export default Make;