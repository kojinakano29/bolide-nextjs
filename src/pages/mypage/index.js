import styles from '@/styles/top/components/mypage.module.scss'
import PageLayoutTop from "@/components/Layouts/pageLayoutTop";
import Container from "@/components/top/Layout/container";
import Link from "next/link";
import { useAuth } from '@/hooks/auth';

const BjcMypage = () => {
  const { logout, user } = useAuth({middleware: 'auth', type: 'bjc'})

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
        <div className={styles.smallMenuBox}>
          <Link href="/mypage/plan">
            <a>
              <div className={styles.iconBox}>
                <img src="/top/plan_check.svg" alt="プラン確認のアイコン" />
              </div>
              <div className={styles.txtBox}>
                <p className={styles.big}>プラン確認</p>
                <p className={styles.sm}>こちらで現在お客様がご加入中のプランをご確認・ご変更いただけます。</p>
              </div>
            </a>
          </Link>
          <Link href={`/mypage/option/${user?.id}`}>
            <a>
              <div className={styles.iconBox}>
                <img src="/top/option.svg" alt="オプションのアイコン" />
              </div>
              <div className={styles.txtBox}>
                <p className={styles.big}>サスティナブルオプション</p>
                <p className={styles.sm}>社会貢献活動の一環として募金ができます。</p>
              </div>
            </a>
          </Link>
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
        <button
          type="button"
          className={`${styles.logout} hoverEffect`}
          onClick={() => logout()}
        >
          <img src="/top/logout.svg" alt="" />
          ログアウト
        </button>
        <p className={styles.signOut}>
          <a href="/mypage/sign_out">退会はこちら</a>
        </p>
      </Container>
    </section>
  );
}

export default BjcMypage;

BjcMypage.getLayout = function getLayout(page) {
  return <PageLayoutTop>{page}</PageLayoutTop>
}