import styles from '@/styles/corapura/components/editorMyPage.module.scss'
import PageLayoutCorapura from "@/components/Layouts/pageLayoutCorapura";
import Container from '@/components/corapura/Layout/container';
import { useAuth } from '@/hooks/auth';
import { Loader } from '@/components/corapura';
import Link from 'next/link';
import icon1 from '@/images/corapura/common/linkIcon1.svg'
import icon2 from '@/images/corapura/common/linkIcon2.svg'
import icon3 from '@/images/corapura/common/linkIcon3.svg'
import icon4 from '@/images/corapura/common/linkIcon4.svg'
import icon5 from '@/images/corapura/common/linkIcon5.svg'

const EditorMyPage = () => {
  const { user } = useAuth({middleware: 'auth', type: 'corapura'})
  // console.log(user)

  return (
    <>
      <section className={styles.mv}>
        <div className={styles.area}>
          <Container small>
            <h2 className={styles.ttl}>
              <span className={styles.sm}>マイページ</span>
              <span className={styles.big}>MY PAGE</span>
            </h2>
          </Container>
        </div>
      </section>

      {user ?
        <section className={styles.cont}>
          <Container small>
            <p className={styles.hello}>
              こんにちは、{user?.name}さん
            </p>
            <article className={styles.navFlex}>
              <Link href={`/corapura/editor/${user?.account_type > 0 ? "company" : "user"}/${user?.c_profile_id}`}>
                <a className={`${styles.linkBox} ${styles.green}`}>
                  <div className={styles.block}>
                    <p>基本情報設定</p>
                  </div>
                  <div className={styles.iconBox}>
                    <img src={icon1.src} alt="" />
                  </div>
                </a>
              </Link>
              <Link href={`/corapura/editor/matter`}>
                <a className={`${styles.linkBox} ${styles.orange}`}>
                  <div className={styles.block}>
                    <p>案件一覧・作成</p>
                  </div>
                  <div className={styles.iconBox}>
                    <img src={icon2.src} alt="" />
                  </div>
                </a>
              </Link>
              <Link href={`/corapura/company/matter/bookmark/${user?.id}`}>
                <a className={`${styles.linkBox} ${styles.yellow}`}>
                  <div className={styles.block}>
                    <p>お気に入り一覧</p>
                  </div>
                  <div className={styles.iconBox}>
                    <img src={icon3.src} alt="" />
                  </div>
                </a>
              </Link>
              <Link href={`/corapura/editor/press_release`}>
                <a className={`${styles.linkBox} ${styles.blue}`}>
                  <div className={styles.block}>
                    <p>
                      プレスリリース
                      <br />一覧・作成
                    </p>
                  </div>
                  <div className={styles.iconBox}>
                    <img src={icon4.src} alt="" />
                  </div>
                </a>
              </Link>
              <Link href={`/corapura/editor/salon`}>
                <a className={`${styles.linkBox} ${styles.pink}`}>
                  <div className={styles.block}>
                    <p>
                      オンラインサロン
                      <br/>一覧・作成
                    </p>
                  </div>
                  <div className={styles.iconBox}>
                    <img src={icon5.src} alt="" />
                  </div>
                </a>
              </Link>
            </article>
          </Container>
        </section>
      : <Loader />}
    </>
  );
}

export default EditorMyPage;

EditorMyPage.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}