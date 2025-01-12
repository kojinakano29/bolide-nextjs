import styles from '@/styles/corapura/components/releaseList.module.scss'
import Container from '@/components/corapura/Layout/container'
import PageLayoutCorapura from '@/components/Layouts/pageLayoutCorapura'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import { useCallback, useEffect, useState } from 'react'
import dummy2 from '@/images/corapura/common/dummy5.svg'
import view from '@/images/corapura/parts/material_view.svg'
import viewB from '@/images/corapura/common/view.svg'
import viewA from '@/images/corapura/common/view_a.svg'
import clock from '@/images/corapura/common/clock.svg'
import { Btn, DateFormat, ShowEditor } from '@/components/corapura'

export const getServerSideProps = async ({ params }) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_CORAPURA}/pr/show/${params.id}`,
    )
    const data = await res.json()

    return {
        props: {
            posts: data,
        },
    }
}

const PressReleaseDetail = ({ posts }) => {
    // console.log(posts)
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const { user } = useAuth({ middleware: 'auth', type: 'corapura' })

    const release = posts.pr
    const newRelease = posts.pr_new_list
    const profile = posts?.user?.c_profile

    const [disabled, setDisabled] = useState(false)
    const [viewCheck, setViewCheck] = useState(false)

    const onLoadCheck = async () => {
        await csrf()

        await axios
            .post('/api/corapura/pr/count/check', {
                user_id: user?.id,
                c_pr_id: release.id,
            })
            .then(res => {
                // console.log(res)
                if (res.data) {
                    setViewCheck(true)
                    setDisabled(true)
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

    const handleClickView = useCallback(async () => {
        if (disabled) return
        setDisabled(true)
        await csrf()

        await axios
            .post('/api/corapura/pr/count/add', {
                user_id: user?.id,
                c_pr_id: release.id,
            })
            .then(res => {
                // console.log(res)
                setViewCheck(true)
            })
            .catch(e => {
                console.error(e)
                setDisabled(false)
            })
    }, [disabled, setDisabled, setViewCheck, release, user])

    return (
        <section className="cont1">
            <Container small>
                <div className={styles.detailFlex}>
                    <div className={styles.detailLeft}>
                        <h2 className="ttl2">{release.title}</h2>
                        <ul className={styles.tags}>
                            {release.c_tags.map((tag, index) => (
                                <li className={styles.tag} key={index}>
                                    <a
                                        href={`/corapura/press_release/?tag_id=${tag.id}`}
                                        className="hoverEffect">
                                        {tag.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className={styles.headFlex}>
                            <div className={styles.txtBox}>
                                <p className={styles.name}>
                                    {profile.nicename}
                                </p>
                                <div className={styles.date}>
                                    <img src={clock.src} alt="時計のアイコン" />
                                    <DateFormat
                                        dateString={release.created_at}
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                className={`hoverEffect ${
                                    viewCheck ? styles.on : null
                                }`}
                                onClick={handleClickView}
                                disabled={disabled}>
                                <img
                                    src={viewCheck ? viewB.src : viewA.src}
                                    alt="アイコン"
                                />
                            </button>
                        </div>
                        {/* <div className={styles.imgBox}>
              <img src={release.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${release.thumbs}` : dummy.src} alt="プレスリリースのMV画像" />
            </div> */}
                        <div className={styles.editBox}>
                            <ShowEditor value={release.content} />
                        </div>
                    </div>
                    <div className={styles.detailRight}>
                        <p className={styles.midashi}>新着プレスリリース</p>
                        <article className={styles.newRelease}>
                            {newRelease.map((release, index) => (
                                <a
                                    className="hoverEffect"
                                    href={`/corapura/press_release/${release.id}`}
                                    key={index}>
                                    <div className={styles.thumbsBox}>
                                        <img
                                            src={
                                                release.thumbs
                                                    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${release.thumbs}`
                                                    : dummy2.src
                                            }
                                            alt="プレスリリースのサムネイル画像"
                                        />
                                    </div>
                                    <div className={styles.newTxt}>
                                        <p className={styles.newTtl}>
                                            {release.title}
                                        </p>
                                        <div className={`${styles.newView} en`}>
                                            <img
                                                src={view.src}
                                                alt="アイコン"
                                            />
                                            {release.c_pr_counts_count}view
                                        </div>
                                        <p className={styles.newName}>
                                            {release.user.c_profile.nicename}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </article>
                    </div>
                </div>
                <div className={styles.btnCover}>
                    <Btn txt="一覧に戻る" link="/corapura/press_release/" />
                </div>
            </Container>
        </section>
    )
}

export default PressReleaseDetail

PressReleaseDetail.getLayout = function getLayout(page) {
    return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}
