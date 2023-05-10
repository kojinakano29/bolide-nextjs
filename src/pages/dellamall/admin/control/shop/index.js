import styles from '@/styles/dellamall/components/list.module.scss'
import Container from '@/components/dellamall/Layouts/container'
import PageLayoutDellamall from '@/components/Layouts/PageLayoutDellamall'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import searchIcon from '@/images/corapura/common/search.svg'
import { Btn01, DateFormat, Loader } from '@/components/dellamall'
import prev from '@/images/corapura/common/prev.svg'
import next from '@/images/corapura/common/next.svg'

const AdminShopList = () => {
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const router = useRouter()
    const { user } = useAuth({ middleware: 'auth', type: 'dellamall' })
    const [disabled, setDisabled] = useState(false)
    const [search, setSearch] = useState('')
    const [shops, setShops] = useState([])
    const [nowPage, setNowPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [page, setPage] = useState(1)
    const { handleSubmit, register } = useForm()

    useEffect(() => {
        if (user && user?.account_type < 3) {
            router.push('/dellamall')
        }
    }, [user])

    const handleSort = useCallback(async () => {
        await csrf()

        await axios
            .post(`/api/dellamall/shop/search/${page}/new/all`, {
                s: search,
            })
            .then(res => {
                // console.log(res)
                setShops(res.data.shop)
                setNowPage(res.data.now_page)
                setMaxPage(res.data.page_max)
            })
            .catch(e => console.error(e))
    }, [setShops, setNowPage, setMaxPage, search, page])

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
                .post(`/api/dellamall/shop/search/1/new/all`, {
                    s: data.s ? data.s : '',
                })
                .then(res => {
                    // console.log(res)
                    setShops(res.data.shop)
                    setNowPage(res.data.now_page)
                    setMaxPage(res.data.page_max)
                })
                .catch(e => console.error(e))

            setSearch(data.s)
            await setDisabled(false)
        },
        [disabled, setDisabled, setShops, setNowPage, setMaxPage, setSearch],
    )

    const handleClickDeleteShop = async id => {
        if (disabled) return
        setDisabled(true)
        await csrf()

        await axios
            .delete(`/api/dellamall/shop/delete/${id}`)
            .then(res => {
                // console.log(res)
                alert('ショップを削除しました')
                router.reload()
            })
            .catch(e => console.error(e))

        await setDisabled(false)
    }

    return (
        <section className="cont1">
            <Container small>
                <h2 className="ttl2">管理者用ショップ一覧</h2>
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
                                {shops.map((shop, index) => (
                                    <li key={index}>
                                        <p className={styles.txt}>
                                            登録日：
                                            <DateFormat
                                                dateString={shop.created_at}
                                            />
                                        </p>
                                        <p className={styles.txt}>
                                            ショップ名：
                                            <a
                                                href={`/dellamall/shop/${shop.id}`}>
                                                {shop.name}
                                            </a>
                                        </p>
                                        <p className={styles.txt}>
                                            作成者：
                                            <a
                                                href={`/dellamall/mypage/${shop.user.id}`}>
                                                {shop?.user?.d_profile?.nicename
                                                    ? shop.user.d_profile
                                                          .nicename
                                                    : 'プロフィール未作成'}
                                            </a>
                                        </p>
                                        <p className={styles.txt}>
                                            公式ユーザー：
                                            {shop.official_user_id ? (
                                                <a
                                                    href={`/dellamall/mypage/${shop.user.id}`}>
                                                    {shop?.d_official?.d_profile
                                                        ?.nicename
                                                        ? shop.d_official
                                                              .d_profile
                                                              .nicename
                                                        : 'プロフィール未作成'}
                                                </a>
                                            ) : (
                                                '非公式'
                                            )}
                                        </p>
                                        <div className={styles.btnFlex}>
                                            <a
                                                className={`${styles.btn} hoverEffect`}
                                                href={`/dellamall/admin/shop/edit/${shop.id}`}>
                                                編集
                                            </a>
                                            {shop.official_user_id ? (
                                                <>
                                                    <a
                                                        className={`${styles.btn} hoverEffect`}
                                                        href={`/dellamall/admin/shop/official/${shop.id}`}>
                                                        公式情報編集
                                                    </a>
                                                </>
                                            ) : null}
                                            <a
                                                className={`${styles.btn} hoverEffect`}
                                                href={`/dellamall/admin/shop/comment/${shop.id}`}>
                                                コメント
                                            </a>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleClickDeleteShop(
                                                        shop.id,
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
                        <Btn01 txt="戻る" link="/dellamall/admin/control" />
                    </>
                ) : (
                    <Loader />
                )}
            </Container>
        </section>
    )
}

export default AdminShopList

AdminShopList.getLayout = function getLayout(page) {
    return <PageLayoutDellamall>{page}</PageLayoutDellamall>
}
