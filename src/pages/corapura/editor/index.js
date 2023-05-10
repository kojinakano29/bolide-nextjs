import styles from '@/styles/corapura/components/editorMyPage.module.scss'
import PageLayoutCorapura from '@/components/Layouts/pageLayoutCorapura'
import Container from '@/components/corapura/Layout/container'
import { useAuth } from '@/hooks/auth'
import { Btn, Follow, Loader } from '@/components/corapura'
import icon1 from '@/images/corapura/common/linkIcon1.svg'
import icon2 from '@/images/corapura/common/linkIcon2.svg'
import icon3 from '@/images/corapura/common/linkIcon3.svg'
import icon4 from '@/images/corapura/common/linkIcon4.svg'
import icon5 from '@/images/corapura/common/linkIcon5.svg'
import icon6 from '@/images/corapura/common/linkIcon6.svg'
import { useCallback, useEffect, useState } from 'react'
import axios from '@/lib/axios'

const EditorMyPage = () => {
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const { user, logout } = useAuth({ middleware: 'auth', type: 'corapura' })
    const [nowFollower, setNowFollower] = useState('0')
    const [nowFollowing, setNowFollowing] = useState('0')
    const [open, setOpen] = useState(false)
    const [followType, setFollowType] = useState('')
    const [userInfo, setUserInfo] = useState({})

    const getProfile = async () => {
        await csrf()

        await axios
            .post('/api/c_profile_get', {
                id: user?.id,
            })
            .then(res => {
                // console.log(res)
                setNowFollower(res.data.user.c_followeds_count)
                setNowFollowing(res.data.user.c_followings_count)
                setUserInfo(res.data.user)
            })
            .catch(e => console.error(e))
    }

    useEffect(() => {
        if (user) {
            getProfile()
        }
    }, [user])

    const handleClickOpen = useCallback(
        async type => {
            setOpen(prevState => !prevState)
            setFollowType(type)
        },
        [setOpen, setFollowType],
    )

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

            {user ? (
                <section className={styles.cont}>
                    <Container small>
                        <p className={styles.hello}>
                            こんにちは、{user?.name}さん
                        </p>
                        <div className={styles.followArea}>
                            <button
                                type="button"
                                className="hoverEffect"
                                onClick={() => handleClickOpen('following')}>
                                フォロー{nowFollowing}人
                            </button>
                            <button
                                type="button"
                                className="hoverEffect"
                                onClick={() => handleClickOpen('follower')}>
                                フォロワー{nowFollower}人
                            </button>
                        </div>
                        <article
                            className={`${styles.navFlex} ${
                                user?.account_type === 0 ? styles.column2 : null
                            }`}>
                            {user?.c_profile_id ? (
                                <>
                                    <a
                                        href={`/corapura/editor/${
                                            user?.account_type > 0
                                                ? 'company'
                                                : 'user'
                                        }/${user?.c_profile_id}`}
                                        className={`${styles.linkBox} ${styles.green}`}>
                                        <div className={styles.block}>
                                            <p>基本情報設定</p>
                                        </div>
                                        <div className={styles.iconBox}>
                                            <img
                                                src={icon1.src}
                                                alt="基本情報設定アイコン"
                                            />
                                        </div>
                                    </a>
                                    <a
                                        href={`/corapura/editor/matter`}
                                        className={`${styles.linkBox} ${styles.orange}`}>
                                        <div className={styles.block}>
                                            <p>案件一覧・作成</p>
                                        </div>
                                        <div className={styles.iconBox}>
                                            <img
                                                src={icon2.src}
                                                alt="案件一覧・作成アイコン"
                                            />
                                        </div>
                                    </a>
                                    <a
                                        href={`/corapura/company/matter/bookmark/${user?.id}`}
                                        className={`${styles.linkBox} ${styles.yellow}`}>
                                        <div className={styles.block}>
                                            <p>お気に入り一覧</p>
                                        </div>
                                        <div className={styles.iconBox}>
                                            <img
                                                src={icon3.src}
                                                alt="お気に入り一覧アイコン"
                                            />
                                        </div>
                                    </a>
                                    {user?.account_type !== 0 ? (
                                        <>
                                            <a
                                                href={`/corapura/editor/press_release`}
                                                className={`${styles.linkBox} ${styles.blue}`}>
                                                <div className={styles.block}>
                                                    <p>
                                                        プレスリリース
                                                        <br />
                                                        一覧・作成
                                                    </p>
                                                </div>
                                                <div className={styles.iconBox}>
                                                    <img
                                                        src={icon4.src}
                                                        alt="プレスリリース一覧・作成アイコン"
                                                    />
                                                </div>
                                            </a>
                                            <a
                                                href={`/corapura/editor/salon`}
                                                className={`${styles.linkBox} ${styles.pink}`}>
                                                <div className={styles.block}>
                                                    <p>
                                                        オンラインサロン
                                                        <br />
                                                        一覧・作成
                                                    </p>
                                                </div>
                                                <div className={styles.iconBox}>
                                                    <img
                                                        src={icon5.src}
                                                        alt="オンラインサロン一覧・作成アイコン"
                                                    />
                                                </div>
                                            </a>
                                        </>
                                    ) : null}
                                    <a
                                        href={`/corapura/editor/comment/${user?.id}`}
                                        className={`${styles.linkBox} ${styles.blue2}`}>
                                        <div className={styles.block}>
                                            <p>応募・完了した案件</p>
                                        </div>
                                        <div className={styles.iconBox}>
                                            <img
                                                src={icon6.src}
                                                alt="応募・完了した案件アイコン"
                                            />
                                        </div>
                                    </a>
                                </>
                            ) : (
                                <a
                                    href={`/corapura/editor/create`}
                                    className={`${styles.linkBox} ${styles.green}`}>
                                    <div className={styles.block}>
                                        <p>基本情報設定</p>
                                    </div>
                                    <div className={styles.iconBox}>
                                        <img
                                            src={icon1.src}
                                            alt="基本情報設定アイコン"
                                        />
                                    </div>
                                </a>
                            )}
                        </article>
                        {user?.account_type === 0 ? (
                            <div className={styles.userBtnFlex}>
                                <Btn
                                    txt="プレスリリース記事を見る"
                                    link="/corapura/press_release"
                                />
                                <Btn
                                    txt="オンラインサロンを見る"
                                    link="/corapura/salon"
                                />
                            </div>
                        ) : null}
                        <div className={styles.privacyArea}>
                            <a href="/corapura/terms">利用規約</a>
                            <p>※2023年2月22日時点</p>
                        </div>
                        <button
                            type="button"
                            className={`${styles.logout} hoverEffect`}
                            onClick={() => logout()}>
                            ログアウト
                        </button>
                    </Container>
                </section>
            ) : (
                <Loader />
            )}

            {open ? (
                <Follow
                    handleClickOpen={handleClickOpen}
                    userInfo={userInfo}
                    followType={followType}
                />
            ) : null}
        </>
    )
}

export default EditorMyPage

EditorMyPage.getLayout = function getLayout(page) {
    return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}
