import styles from '@/styles/top/components/mypage.module.scss'
import PageLayoutTop from "@/components/Layouts/pageLayoutTop";
import Container from "@/components/top/Layout/container";
import Link from "next/link";

const BjcMypage = () => {
  return (
    <section className="cont1">
      <Container small900>
        <h2 className="ttl2">マイページ</h2>
        <div className="breadcrumbBox">
          <Link href="/">
            <a>トップ</a>
          </Link>
          <div><img src="/top/breadcrumb.svg" alt="" /></div>
          <p>マイページ</p>
        </div>

        <div className={styles.menuBox}>
          <Link href="/corapura">
            <a>
              <div className={styles.imgBox}>
                <img src="/top/mypage_c.svg" alt="" />
              </div>
              <div className={styles.nameBox}>
                <img src="/top/corapura-logo.svg" alt="" />
              </div>
            </a>
          </Link>
          <Link href="/liondor">
            <a>
              <div className={styles.imgBox}>
                <img src="/top/mypage_l.svg" alt="" />
              </div>
              <div className={styles.nameBox}>
                <img src="/top/liondor-logo.svg" alt="" />
              </div>
            </a>
          </Link>
          <Link href="/dellamall">
            <a>
              <div className={styles.imgBox}>
                <img src="/top/mypage_d.svg" alt="" />
              </div>
              <div className={styles.nameBox}>
                <img src="/top/della-logo.svg" alt="" />
              </div>
            </a>
          </Link>
          <a href="https://marche-dor.jp/" target="_blank" rel="noopener noreferrer">
            <div className={styles.imgBox}>
              <img src="/top/mypage_m.svg" alt="" />
            </div>
            <div className={styles.nameBox}>
              <img src="/top/marche-logo.svg" alt="" />
            </div>
          </a>
        </div>
      </Container>
    </section>
  );
}

export default BjcMypage;

BjcMypage.getLayout = function getLayout(page) {
  return <PageLayoutTop>{page}</PageLayoutTop>
}