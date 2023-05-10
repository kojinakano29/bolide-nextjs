import styles from '@/styles/corapura/components/list.module.scss'
import Container from '@/components/corapura/Layout/container'
import PageLayoutCorapura from '@/components/Layouts/pageLayoutCorapura'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import searchIcon from '@/images/corapura/common/search.svg'
import prev from '@/images/corapura/common/prev.svg'
import next from '@/images/corapura/common/next.svg'
import { DateFormat, Loader } from '@/components/corapura'

export const getServerSideProps = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_CORAPURA}/post`)
    const data = await res.json()

    return {
        props: {
            posts: data,
        },
    }
}

const AdminMatter = ({ posts }) => {
    // console.log(posts)
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const router = useRouter()
    const { user } = useAuth({ middleware: 'auth', type: 'corapura' })
    const cats = posts.cat_list
    const [disabled, setDisabled] = useState(false)
    const [matters, setMatters] = useState([])
    const [nowPage, setNowPage] = useState(posts.now_page)
    const [maxPage, setMaxPage] = useState(posts.page_max)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const { handleSubmit, register } = useForm()

    useEffect(() => {
        if (user && user?.account_type < 3) {
            router.push('/corapura')
        }
    }, [user])

    const handleSort = useCallback(async () => {
        await csrf()

        await axios
            .post(
                `/api/corapura/${
                    router.query.type === 'company' ? 'post' : 'user_post'
                }`,
                {
                    s: search,
                    page: parseInt(page),
                },
            )
            .then(res => {
                // console.log(res)
                setMatters(res.data.post)
                setNowPage(res.data.now_page)
                setMaxPage(res.data.page_max)
            })
            .catch(e => console.error(e))
    }, [setMatters, setNowPage, setMaxPage, search, page])

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
                .post(
                    `/api/corapura/${
                        router.query.type === 'company' ? 'post' : 'user_post'
                    }`,
                    {
                        s: data.s ? data.s : '',
                        page: parseInt(page),
                    },
                )
                .then(res => {
                    // console.log(res)
                    setMatters(res.data.post)
                    setNowPage(res.data.now_page)
                    setMaxPage(res.data.page_max)
                })
                .catch(e => console.error(e))

            setSearch(data.s)
            await setDisabled(false)
        },
        [
            disabled,
            setDisabled,
            setMatters,
            setNowPage,
            setMaxPage,
            page,
            setSearch,
        ],
    )

    const handleClickDeleteMatter = async id => {
        await csrf()

        await axios
            .delete(`/api/corapura/post/delete`, {
                data: {
                    c_post_id: id,
                },
            })
            .then(res => {
                // console.log(res)
                alert('この案件を削除しました')
                router.reload()
            })
            .catch(e => console.error(e))
    }

    return (
        <>
            <section className="cont1">
                <Container small>
                    <h2 className="ttl1">
                        {router.query.type === 'company'
                            ? '企業'
                            : 'インフルエンサー/ユーザー'}
                        案件一覧
                    </h2>
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
                            <article className={`${styles.adminList}`}>
                                <ul>
                                    {matters.map((matter, index) => (
                                        <li key={index}>
                                            <div className={styles.flex}>
                                                <p className={styles.date}>
                                                    <DateFormat
                                                        dateString={
                                                            matter.created_at
                                                        }
                                                    />
                                                </p>
                                                <p className={styles.state}>
                                                    {matter.state === 0
                                                        ? '応募中'
                                                        : null}
                                                    {matter.state === 1
                                                        ? '掲載終了'
                                                        : null}
                                                    {matter.state === 2
                                                        ? 'コメント送信済'
                                                        : null}
                                                    {matter.state === 3
                                                        ? 'マッチング'
                                                        : null}
                                                    {matter.state === 4
                                                        ? '下書き'
                                                        : null}
                                                </p>
                                            </div>
                                            <p className={styles.txt}>
                                                案件名：
                                                <a
                                                    href={`/corapura/matter/${matter.id}`}>
                                                    {matter.title}
                                                </a>
                                            </p>
                                            <p className={styles.txt}>
                                                案件カテゴリ：
                                                {cats[matter.c_cat_id - 1].name}
                                            </p>
                                            <p className={styles.txt}>
                                                作成者：
                                                <a
                                                    href={`/corapura/${
                                                        router.query.type ===
                                                        'company'
                                                            ? 'company'
                                                            : 'influencer'
                                                    }/${matter.user?.id}`}>
                                                    {
                                                        matter.user?.c_profile
                                                            ?.nicename
                                                    }
                                                </a>
                                            </p>
                                            <div className={styles.btnFlex}>
                                                {/* <a className={`${styles.btn} hoverEffect`} href={`/corapura/editor/matter/${matter.id}`}>編集</a> */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleClickDeleteMatter(
                                                            matter.id,
                                                        )
                                                    }>
                                                    削除
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </article>

                            {parseInt(maxPage) > 1 ? (
                                <div className={styles.pager}>
                                    {parseInt(nowPage) > 1 ? (
                                        <button
                                            className={styles.btn}
                                            value={nowPage - 1}
                                            onClick={handleClickPage}>
                                            <img
                                                src={prev.src}
                                                alt="前のページへ"
                                            />
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
                                        {parseInt(maxPage) !==
                                        parseInt(nowPage) ? (
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
                                            <img
                                                src={next.src}
                                                alt="次のページへ"
                                            />
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
        </>
    )
}

export default AdminMatter

AdminMatter.getLayout = function getLayout(page) {
    return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}
