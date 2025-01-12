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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_CORAPURA}/salon`)
    const data = await res.json()

    return {
        props: {
            posts: data,
        },
    }
}

const AdminSalon = ({ posts }) => {
    // console.log(posts)
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const router = useRouter()
    const { user } = useAuth({ middleware: 'auth', type: 'corapura' })
    const [disabled, setDisabled] = useState(false)
    const [search, setSearch] = useState('')
    const [salons, setSalons] = useState(posts.salon)
    const [nowPage, setNowPage] = useState(posts.now_page)
    const [maxPage, setMaxPage] = useState(posts.page_max)
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
            .post(`/api/corapura/salon`, {
                s: search,
                page: parseInt(page),
            })
            .then(res => {
                // console.log(res)
                setSalons(res.data.salon)
                setNowPage(res.data.now_page)
                setMaxPage(res.data.page_max)
            })
            .catch(e => console.error(e))
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
                .catch(e => console.error(e))

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

    const handleClickDeleteSalon = async id => {
        await csrf()

        await axios
            .delete(`/api/corapura/salon/delete`, {
                data: {
                    c_salon_id: id,
                },
            })
            .then(res => {
                // console.log(res)
                alert('このオンラインサロンを削除しました')
                router.reload()
            })
            .catch(e => console.error(e))
    }

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
                        <article className={`${styles.adminList}`}>
                            <ul>
                                {salons.map((salon, index) => (
                                    <li key={index}>
                                        <p className={styles.date}>
                                            <DateFormat
                                                dateString={salon.created_at}
                                            />
                                        </p>
                                        <p className={styles.txt}>
                                            記事タイトル：
                                            <a
                                                href={`/corapura/salon/${salon.id}`}>
                                                {salon.title}
                                            </a>
                                        </p>
                                        <p className={styles.txt}>
                                            作成者：
                                            <a
                                                href={`/corapura/${
                                                    salon.user?.account_type ===
                                                    1
                                                        ? 'company'
                                                        : 'influencer'
                                                }/${salon.user?.id}`}>
                                                {
                                                    salon.user?.c_profile
                                                        ?.nicename
                                                }
                                            </a>
                                        </p>
                                        <div className={styles.btnFlex}>
                                            {/* <a className={`${styles.btn} hoverEffect`} href={`/corapura/editor/salon/${salon.id}`}>編集</a> */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleClickDeleteSalon(
                                                        salon.id,
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

export default AdminSalon

AdminSalon.getLayout = function getLayout(page) {
    return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}
