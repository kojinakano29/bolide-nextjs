import { Loader, MatterCard } from '@/components/corapura'
import Container from '@/components/corapura/Layout/container'
import PageLayoutCorapura from '@/components/Layouts/pageLayoutCorapura'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import { useCallback, useEffect, useState } from 'react'
import styles from '@/styles/corapura/components/list.module.scss'
import prev from '@/images/corapura/common/prev.svg'
import next from '@/images/corapura/common/next.svg'

export const getServerSideProps = async ({ params }) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_CORAPURA}/post_bookmark/${params.id}`,
    )
    const data = await res.json()

    return {
        props: {
            posts: data,
        },
    }
}

const CompanyBookmark = ({ posts }) => {
    // console.log(posts)
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const { user } = useAuth({ middleware: 'auth', type: 'corapura' })
    const [disabled, setDisabled] = useState(false)
    const [matters, setMatters] = useState([])
    const [nowPage, setNowPage] = useState(posts.now_page)
    const [maxPage, setMaxPage] = useState(posts.page_max)
    const [page, setPage] = useState(1)
    const [bookmarkList, setBookmarkList] = useState([])

    const onLoadCheck = async () => {
        await csrf()

        await axios
            .post('/api/corapura/post_bookmark/check', {
                user_id: user?.id,
            })
            .then(res => {
                // console.log(res)
                setBookmarkList(res.data)
            })
            .catch(e => {
                console.error(e)
            })
    }

    const handleSort = useCallback(async () => {
        await csrf()

        await axios
            .post(`/api/corapura/post_bookmark/${user?.id}`, {
                page: parseInt(page),
            })
            .then(res => {
                // console.log(res)
                setMatters(res.data.post)
                setNowPage(res.data.now_page)
                setMaxPage(res.data.page_max)
            })
            .catch(e => {
                console.error(e)
            })
    }, [setMatters, setNowPage, setMaxPage, page, user])

    useEffect(async () => {
        if (disabled) return
        setDisabled(true)

        if (user) {
            await onLoadCheck()
            await handleSort()
        }

        await setDisabled(false)
    }, [user, page])

    const handleClickPage = useCallback(
        async e => {
            setPage(e.currentTarget.value)
        },
        [setPage],
    )

    return (
        <section className="cont1">
            <Container small>
                <h2 className="ttl1">お気に入り案件一覧</h2>

                {!disabled ? (
                    <>
                        <article className={styles.matterList}>
                            {matters.map((matter, index) => (
                                <MatterCard
                                    matter={matter}
                                    bookmarkList={bookmarkList}
                                    list
                                    key={index}
                                />
                            ))}
                        </article>
                        {parseInt(maxPage) > 1 ? (
                            <div className={styles.pager}>
                                {parseInt(nowPage) > 1 ? (
                                    <button
                                        className={styles.btn}
                                        value={nowPage - 1}
                                        onClick={handleClickPage}>
                                        <img src={prev.src} alt="アイコン" />
                                        <span>前のページへ</span>
                                    </button>
                                ) : null}
                                <div className={styles.pagerBtn}>
                                    {parseInt(nowPage) > 1 ? (
                                        <button
                                            className="hoverEffect"
                                            value={nowPage - 1}
                                            onClick={handleClickPage}>
                                            {nowPage - 1}
                                        </button>
                                    ) : null}
                                    <button
                                        type="button"
                                        className={styles.current}>
                                        {nowPage}
                                    </button>
                                    {parseInt(maxPage) !== parseInt(nowPage) ? (
                                        <button
                                            className="hoverEffect"
                                            value={nowPage + 1}
                                            onClick={handleClickPage}>
                                            {nowPage + 1}
                                        </button>
                                    ) : null}
                                </div>
                                {parseInt(nowPage) !== parseInt(maxPage) ? (
                                    <button
                                        className={styles.btn}
                                        value={nowPage + 1}
                                        onClick={handleClickPage}>
                                        <img src={next.src} alt="アイコン" />
                                        <span>次のページへ</span>
                                    </button>
                                ) : null}
                            </div>
                        ) : null}
                    </>
                ) : (
                    <Loader />
                )}
            </Container>
        </section>
    )
}

export default CompanyBookmark

CompanyBookmark.getLayout = function getLayout(page) {
    return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}
