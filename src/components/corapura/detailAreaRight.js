import styles from '@/styles/corapura/components/detailArea.module.scss'
import { useCallback, useContext, useEffect, useState } from 'react'
import { CompanyContext } from './detailArea'
import dummy1 from '@/images/corapura/common/userDummy.svg'
import mail from '@/images/corapura/common/mail_icon.svg'
import axios from '@/lib/axios'
import { useAuth } from '@/hooks/auth'
import Social from './social'
import { Follow } from '@/components/corapura'

const DetailAreaRight = ({ influencer = false }) => {
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const { profile, userInfo } = useContext(CompanyContext)
    const { user } = useAuth()

    const companySocials = profile?.c_company_profile?.c_company_socials
    const userSocials = profile.c_user_profile?.c_user_socials
    const [disabled, setDisabled] = useState(false)
    const [followCheck, setFollowCheck] = useState(false)
    const [nowFollower, setNowFollower] = useState(userInfo.c_followeds_count)
    const [open, setOpen] = useState(false)
    const [followType, setFollowType] = useState(null)
    const [profileMore, setProfileMore] = useState(false)

    const onLoadCheck = async () => {
        await csrf()

        await axios
            .post('/api/corapura/follow/check', {
                user_id: user?.id,
            })
            .then(res => {
                // console.log(res)
                if (res.data?.includes(userInfo.id)) {
                    setFollowCheck(true)
                }
            })
            .catch(e => {
                console.error(e)
            })
    }

    useEffect(() => {
        if (user) {
            onLoadCheck()
        }
    }, [user])

    const handleClickFollow = useCallback(async () => {
        if (disabled) return
        setDisabled(true)
        await csrf()

        if (followCheck) {
            await axios
                .delete('/api/corapura/follow/delete', {
                    data: {
                        following_user_id: user?.id,
                        followed_user_id: userInfo.id,
                    },
                })
                .then(res => {
                    // console.log(res)
                    setFollowCheck(false)
                    setNowFollower(nowFollower - 1)
                })
                .catch(e => {
                    console.error(e)
                })
        } else {
            await axios
                .post('/api/corapura/follow/store', {
                    following_user_id: user?.id,
                    followed_user_id: userInfo.id,
                })
                .then(res => {
                    // console.log(res)
                    setFollowCheck(true)
                    setNowFollower(nowFollower + 1)
                })
                .catch(e => {
                    console.error(e)
                })
        }

        await setDisabled(false)
    }, [disabled, setDisabled, user, followCheck, setFollowCheck])

    const handleClickOpen = useCallback(
        async type => {
            setOpen(prevState => !prevState)
            setFollowType(type)
        },
        [setOpen, setFollowType],
    )

    const handleClickProfileMore = useCallback(async () => {
        setProfileMore(true)
    }, [setProfileMore])

    return (
        <>
            {!influencer ? (
                <div className={styles.detailRight}>
                    <div className={styles.detailHead}>
                        <div className={styles.headLeft}>
                            <img
                                src={
                                    profile.thumbs
                                        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile.thumbs}`
                                        : dummy1.src
                                }
                                alt="プロフィール画像"
                            />
                        </div>
                        <div className={styles.headRight}>
                            <p className={styles.type}>{profile.title}</p>
                            <p className={styles.name}>{profile.nicename}</p>
                            <ul className={styles.tags}>
                                {profile.c_tags.map((tag, index) => (
                                    <li className={styles.tag} key={index}>
                                        <a
                                            href={`/corapura/company/?tag_id=${tag.id}`}
                                            className="hoverEffect">
                                            {tag.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className={styles.followBox}>
                        <p className={styles.count}>
                            <button
                                type="button"
                                className="hoverEffect"
                                onClick={() => handleClickOpen('follower')}>
                                フォロワー
                            </button>
                            {nowFollower}人
                        </p>
                        <button
                            type="button"
                            className={`${styles.followBtn} hoverEffect`}
                            onClick={handleClickFollow}>
                            {followCheck ? 'フォロー中' : 'フォローする'}
                        </button>
                    </div>
                    <p className={styles.desc}>
                        <span>自己紹介</span>
                        <br />
                        {profileMore
                            ? profile.profile
                            : profile.profile?.substr(0, 60)}
                    </p>
                    {profileMore ? null : (
                        <button
                            type="button"
                            className={`${styles.profileMoreBtn} hoverEffect`}
                            onClick={handleClickProfileMore}>
                            もっと見る
                            <img
                                src="/corapura/common/more.svg"
                                alt="もっと見るのアイコン"
                            />
                        </button>
                    )}
                    <div className={styles.infoGraph}>
                        <dl>
                            <dt>プレジデント/リーダー</dt>
                            <dd>{profile.c_company_profile.president}</dd>
                        </dl>
                        <dl>
                            <dt>設立</dt>
                            <dd>{profile.c_company_profile.maked}</dd>
                        </dl>
                        <dl>
                            <dt>上場・非上場</dt>
                            <dd>{profile.c_company_profile.jojo}</dd>
                        </dl>
                        <dl>
                            <dt>資本金</dt>
                            <dd>{profile.c_company_profile.capital}</dd>
                        </dl>
                        <dl>
                            <dt>所在地</dt>
                            <dd>{profile.c_company_profile.address}</dd>
                        </dl>
                        <dl>
                            <dt>電話番号</dt>
                            <dd>{profile.c_company_profile.tel}</dd>
                        </dl>
                    </div>
                    <Social socials={companySocials} />
                    <div className={styles.siteUrl}>
                        {profile.c_company_profile.site_url ? (
                            <>
                                <p>メインサイト</p>
                                <a
                                    href={profile.c_company_profile.site_url}
                                    target="_balnk">
                                    {profile.c_company_profile.site_url}
                                </a>
                            </>
                        ) : null}
                        {profile.c_company_profile.shop_url ? (
                            <>
                                <p>ECサイト</p>
                                <a
                                    href={profile.c_company_profile.shop_url}
                                    target="_balnk">
                                    {profile.c_company_profile.shop_url}
                                </a>
                            </>
                        ) : null}
                    </div>
                    <a href={`mailto:${userInfo.email}`} className={styles.btn}>
                        <img src={mail.src} alt="メールのアイコン" />
                        <span>このユーザーにメッセージを送る</span>
                    </a>
                </div>
            ) : (
                <div className={styles.detailRight}>
                    <div className={styles.detailHead}>
                        <div className={styles.headLeft}>
                            <img
                                src={
                                    profile.thumbs
                                        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile.thumbs}`
                                        : dummy1.src
                                }
                                alt="プロフィール画像"
                            />
                        </div>
                        <div className={styles.headRight}>
                            <p className={styles.catch}>{profile.title}</p>
                            <p className={styles.name}>{profile.nicename}</p>
                            <p className={styles.type}>個人</p>
                            <ul className={styles.tags}>
                                {profile.c_tags.map((tag, index) => (
                                    <li className={styles.tag} key={index}>
                                        <a
                                            href={`/corapura/influencer/?tag_id=${tag.id}`}
                                            className="hoverEffect">
                                            {tag.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className={styles.skillBox}>
                        <p className={styles.skillName}>得意分野</p>
                        <div className={styles.skills}>
                            {profile.c_user_profile.c_user_skills.map(
                                (skill, index) => (
                                    <p className={styles.skill} key={index}>
                                        {skill.name}
                                    </p>
                                ),
                            )}
                        </div>
                    </div>
                    <div className={styles.followBox}>
                        <p className={styles.count}>
                            <button
                                type="button"
                                className="hoverEffect"
                                onClick={() => handleClickOpen('follower')}>
                                フォロワー
                            </button>
                            {nowFollower}人
                        </p>
                        <button
                            type="button"
                            className={`${styles.followBtn} hoverEffect`}
                            onClick={handleClickFollow}>
                            {followCheck ? 'フォロー中' : 'フォローする'}
                        </button>
                    </div>
                    <p className={styles.desc}>
                        <span>自己紹介</span>
                        <br />
                        {profileMore
                            ? profile.profile
                            : profile.profile?.substr(0, 60)}
                    </p>
                    {profileMore ? null : (
                        <button
                            type="button"
                            className={`${styles.profileMoreBtn} hoverEffect`}
                            onClick={handleClickProfileMore}>
                            もっと見る
                        </button>
                    )}
                    <Social socials={userSocials} user />
                    {profile.c_user_profile.brand ? (
                        <div className={styles.siteUrl}>
                            <p>プロデュースブランド</p>
                            <a
                                href={profile.c_user_profile.brand}
                                target="_blank">
                                {profile.c_user_profile.brand}
                            </a>
                        </div>
                    ) : null}
                    <a href={`mailto:${userInfo.email}`} className={styles.btn}>
                        <img src={mail.src} alt="メールのアイコン" />
                        <span>
                            このユーザーに
                            <br className="sp" />
                            メッセージを送る
                        </span>
                    </a>
                </div>
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

export default DetailAreaRight
