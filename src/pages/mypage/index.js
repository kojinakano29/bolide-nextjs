import styles from '@/styles/top/components/mypage.module.scss'
import PageLayoutTop from '@/components/Layouts/pageLayoutTop'
import Container from '@/components/top/Layout/container'
import { useAuth } from '@/hooks/auth'

const BjcMypage = () => {
    const { logout, user } = useAuth({ middleware: 'auth', type: 'bjc' })

    return (
        <section className="cont1">
            <Container small900>
                <h2 className="ttl2">マイページ</h2>
                <div className="breadcrumbBox">
                    <a href="/">トップ</a>
                    <div>
                        <img src="/top/breadcrumb.svg" alt=">" />
                    </div>
                    <p>マイページ</p>
                </div>
                {user?.account_type > 2 ? (
                    <a href="/admin/user_list" className={styles.adminBtn}>
                        管理者
                    </a>
                ) : null}
                <div className={styles.smallMenuBox}>
                    <a href={`/mypage/plan/${user?.id}`}>
                        <div className={styles.iconBox}>
                            <img
                                src="/top/plan_check.svg"
                                alt="プラン確認のアイコン"
                            />
                        </div>
                        <div className={styles.txtBox}>
                            <p className={styles.big}>プラン確認</p>
                            <p className={styles.sm}>
                                こちらで現在お客様がご加入中のプランをご確認・ご変更いただけます。
                            </p>
                        </div>
                    </a>
                    <a href={`/mypage/option/${user?.id}`}>
                        <div className={styles.iconBox}>
                            <img
                                src="/top/option.svg"
                                alt="オプションのアイコン"
                            />
                        </div>
                        <div className={styles.txtBox}>
                            <p className={styles.big}>
                                サスティナブルオプション
                            </p>
                            <p className={styles.sm}>
                                社会貢献活動の一環として募金ができます。
                            </p>
                        </div>
                    </a>
                </div>
                <div className={styles.menuBox}>
                    <a href="/corapura">
                        <div className={styles.imgBox}>
                            <img src="/top/mypage_c.svg" alt="CORAPURA" />
                        </div>
                        <div className={styles.nameBox}>
                            <img src="/top/corapura-logo.svg" alt="CORAPURA" />
                        </div>
                    </a>
                    <a href="/liondor">
                        <div className={styles.imgBox}>
                            <img src="/top/mypage_l.svg" alt="LIONDOR" />
                        </div>
                        <div className={styles.nameBox}>
                            <img src="/top/liondor-logo.svg" alt="LIONDOR" />
                        </div>
                    </a>
                    <a href="/dellamall">
                        <div className={styles.imgBox}>
                            <img src="/top/mypage_d.svg" alt="Della Mall" />
                        </div>
                        <div className={styles.nameBox}>
                            <img src="/top/della-logo.svg" alt="Della Mall" />
                        </div>
                    </a>
                    <a
                        href="https://marche-dor.jp/"
                        target="_blank"
                        rel="noopener noreferrer">
                        <div className={styles.imgBox}>
                            <img src="/top/mypage_m.svg" alt="Marche Dor" />
                        </div>
                        <div className={styles.nameBox}>
                            <img src="/top/marche-logo.svg" alt="Marche Dor" />
                        </div>
                    </a>
                </div>
                <button
                    type="button"
                    className={`${styles.logout} hoverEffect`}
                    onClick={() => logout()}>
                    <img src="/top/logout.svg" alt="ログアウトのアイコン" />
                    ログアウト
                </button>
                <p className={styles.signOut}>
                    <a href="/mypage/sign_out">退会はこちら</a>
                </p>
            </Container>
        </section>
    )
}

export default BjcMypage

BjcMypage.getLayout = function getLayout(page) {
    return <PageLayoutTop>{page}</PageLayoutTop>
}
