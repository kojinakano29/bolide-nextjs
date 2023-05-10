import styles from '@/styles/corapura/components/salon.module.scss'
import PageLayoutCorapura from '@/components/Layouts/pageLayoutCorapura'
import Container from '@/components/corapura/Layout/container'
import { useForm } from 'react-hook-form'
import { useCallback, useEffect, useState } from 'react'
import axios from '@/lib/axios'
import dummy from '@/images/corapura/common/dummy5.svg'
import prev from '@/images/corapura/common/prev.svg'
import next from '@/images/corapura/common/next.svg'
import { Loader } from '@/components/corapura'
import searchIcon from '@/images/corapura/common/search.svg'

export const getServerSideProps = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_CORAPURA}/salon`)
    const data = await res.json()

    return {
        props: {
            posts: data,
        },
    }
}

const OnlineSalonList = ({ posts }) => {
    // console.log(posts)
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const [disabled, setDisabled] = useState(false)
    const [search, setSearch] = useState('')
    const [salons, setSalons] = useState(posts.salon)
    const [nowPage, setNowPage] = useState(posts.now_page)
    const [maxPage, setMaxPage] = useState(posts.page_max)
    const [page, setPage] = useState(1)
    const { handleSubmit, register } = useForm()

    const handleSort = useCallback(async () => {
        await csrf()

        await axios
            .post('/api/corapura/salon', {
                s: search,
                page: parseInt(page),
            })
            .then(res => {
                // console.log(res)
                setSalons(res.data.salon)
                setNowPage(res.data.now_page)
                setMaxPage(res.data.page_max)
            })
            .catch(e => {
                console.error(e)
            })
    }, [setSalons, setNowPage, setMaxPage, search, page])

    useEffect(async () => {
        if (disabled) return
        setDisabled(true)

        await handleSort()

        await setDisabled(false)
    }, [page])

    const handleClickPage = useCallback(
        async e => {
            setPage(e.currentTarget.value)
        },
        [setPage],
    )

    const onSortForm = useCallback(
        async data => {
            if (disabled) return
            setDisabled(true)
            await csrf()

            await axios
                .post(`/api/corapura/salon`, {
                    s: data.s ? data.s : '',
                    page: parseInt(page),
                })
                .then(res => {
                    // console.log(res)
                    setSalons(res.data.salon)
                    setNowPage(res.data.now_page)
                    setMaxPage(res.data.page_max)
                })
                .catch(e => {
                    console.error(e)
                })

            setSearch(data.s)
            await setDisabled(false)
        },
        [
            disabled,
            setDisabled,
            setSalons,
            setNowPage,
            setMaxPage,
            setSearch,
            page,
        ],
    )

    return (
        <section className="cont1">
            <Container small>
                <h2 className="ttl1">オンラインサロン一覧</h2>
                <form onSubmit={handleSubmit(onSortForm)}>
                    <div className={styles.searchBox}>
                        <input
                            type="text"
                            {...register('s')}
                            placeholder="気になるワードを検索"
                        />
                        <button>
                            <img src={searchIcon.src} alt="検索アイコン" />
                        </button>
                    </div>
                </form>
                {!disabled ? (
                    <>
                        <article className={styles.salonList}>
                            {salons.map((salon, index) => (
                                <a
                                    href={`/corapura/salon/${salon.id}`}
                                    key={index}>
                                    <div className={styles.imgBox}>
                                        <img
                                            src={
                                                salon.thumbs
                                                    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${salon.thumbs}`
                                                    : dummy.src
                                            }
                                            alt="オンラインサロンのサムネイル画像"
                                        />
                                    </div>
                                    <p className={styles.ttl}>{salon.title}</p>
                                    <p className={styles.desc}>
                                        {salon.content
                                            ?.replace(/<[^>]+>/g, '')
                                            ?.replace(/&nbsp;/g, '')
                                            ?.substring(0, 45)}
                                    </p>
                                    <div className={styles.tags}>
                                        {salon.c_tags.map((tag, index) => (
                                            <p
                                                className={styles.tag}
                                                key={index}>
                                                {tag.name}
                                            </p>
                                        ))}
                                    </div>
                                </a>
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

export default OnlineSalonList

OnlineSalonList.getLayout = function getLayout(page) {
    return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}
