import styles from '@/styles/dellamall/components/adminList.module.scss'
import Container from '@/components/dellamall/Layouts/container'
import PageLayoutDellamall from '@/components/Layouts/PageLayoutDellamall'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'
import { createContext, useEffect, useState } from 'react'
import { Btn01, CreateOfficial, EditOfficial } from '@/components/dellamall'
import axios from '@/lib/axios'

export const OfficialContext = createContext()

export const getServerSideProps = async ({ params }) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DELLAMALL}/shop/official/${params.id}`,
    )
    const data = await res.json()

    return {
        props: {
            posts: data,
        },
    }
}

const OfficialShop = ({ posts }) => {
    // console.log(posts)
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const router = useRouter()
    const { user } = useAuth({ middleware: 'auth', type: 'dellamall' })
    const [disabled, setDisabled] = useState(false)
    const [officialCheck, setOfficialCheck] = useState(true)
    const [popup, setPopup] = useState(false)
    const [mode, setMode] = useState()
    const [type, setType] = useState('')
    const [overviews, setOverviews] = useState(posts.overview)
    const [coupons, setCoupons] = useState(posts.coupon)
    const [socials, setSocials] = useState(posts.social)
    const [infos, setInfos] = useState(posts.info)
    const [instagram, setInstagram] = useState(posts.insta_api)
    const [items, setItems] = useState(posts.item)
    const [editData, setEditData] = useState({})

    const shop = posts.shop

    useEffect(() => {
        if (user) {
            if (
                parseInt(user?.id) === parseInt(shop.official_user_id) ||
                user?.account_type > 2
            ) {
                setOfficialCheck(false)
            } else {
                router.push({
                    pathname: '/dellamall/admin/shop',
                })
            }
        }
    }, [user])

    const handleClickCreate = async type => {
        setMode('create')
        setPopup(prevState => !prevState)
        setType(type)
    }

    const handleClickEdit = async (type, id) => {
        setMode('edit')
        setPopup(prevState => !prevState)
        setType(type)

        if (disabled) return
        setDisabled(true)
        await csrf()

        if (type === 'overview') {
            await axios
                .post(`/api/dellamall/d_overviews/edit/${id}`)
                .then(res => {
                    // console.log(res)
                    setEditData(res.data)
                })
                .catch(e => {
                    console.error(e)
                })
        } else if (type === 'coupon') {
            await axios
                .post(`/api/dellamall/d_coupons/edit/${id}`)
                .then(res => {
                    // console.log(res)
                    setEditData(res.data)
                })
                .catch(e => {
                    console.error(e)
                })
        } else if (type === 'social') {
            await axios
                .post(`/api/dellamall/d_socials/edit/${id}`)
                .then(res => {
                    // console.log(res)
                    setEditData(res.data)
                })
                .catch(e => {
                    console.error(e)
                })
        } else if (type === 'info') {
            await axios
                .post(`/api/dellamall/d_infos/edit/${id}`)
                .then(res => {
                    // console.log(res)
                    setEditData(res.data)
                })
                .catch(e => {
                    console.error(e)
                })
        } else if (type === 'instagram') {
            await axios
                .post(`/api/dellamall/d_insta/edit/${id}`)
                .then(res => {
                    // console.log(res)
                    setEditData(res.data)
                })
                .catch(e => {
                    console.error(e)
                })
        } else if (type === 'item') {
            await axios
                .post(`/api/dellamall/d_items/edit/${id}`)
                .then(res => {
                    // console.log(res)
                    setEditData(res.data)
                })
                .catch(e => {
                    console.error(e)
                })
        }

        await setDisabled(false)
    }

    const handleClickDelete = async (type, id) => {
        if (disabled) return
        setDisabled(true)
        await csrf()

        if (type === 'overview') {
            await axios
                .delete(`/api/dellamall/d_overviews/delete/${id}`)
                .then(res => {
                    // console.log(res)
                    alert('削除しました。')
                    setOverviews(res.data)
                })
                .catch(e => {
                    console.error(e)
                    alert('削除できませんでした。')
                })
        } else if (type === 'coupon') {
            await axios
                .delete(`/api/dellamall/d_coupons/delete/${id}`)
                .then(res => {
                    // console.log(res)
                    alert('削除しました。')
                    setCoupons(res.data)
                })
                .catch(e => {
                    console.error(e)
                    alert('削除できませんでした。')
                })
        } else if (type === 'social') {
            await axios
                .delete(`/api/dellamall/d_socials/delete/${id}`)
                .then(res => {
                    // console.log(res)
                    alert('削除しました。')
                    setSocials(res.data)
                })
                .catch(e => {
                    console.error(e)
                    alert('削除できませんでした。')
                })
        } else if (type === 'info') {
            await axios
                .delete(`/api/dellamall/d_infos/delete/${id}`)
                .then(res => {
                    // console.log(res)
                    alert('削除しました。')
                    setInfos(res.data)
                })
                .catch(e => {
                    console.error(e)
                    alert('削除できませんでした。')
                })
        } else if (type === 'instagram') {
            await axios
                .delete(`/api/dellamall/d_insta/delete/${id}`)
                .then(res => {
                    // console.log(res)
                    alert('削除しました。')
                    setInstagram([])
                })
                .catch(e => {
                    console.error(e)
                    alert('削除できませんでした。')
                })
        } else if (type === 'item') {
            await axios
                .delete(`/api/dellamall/d_items/delete/${id}`)
                .then(res => {
                    // console.log(res)
                    alert('削除しました。')
                    setItems(res.data)
                })
                .catch(e => {
                    console.error(e)
                    alert('削除できませんでした。')
                })
        }

        await setDisabled(false)
    }

    return (
        <>
            <section className={`cont1 ${styles.officialArea}`}>
                <h2 className="ttl2">公式情報</h2>
                <h3 className={styles.ttl}>{shop.name}</h3>
                <Container small>
                    <div className={styles.officialBox}>
                        <div className={styles.ttlFlex}>
                            <h4 className={styles.ttl2}>ショップ情報</h4>
                            <button
                                type="button"
                                className={`${styles.btn} hoverEffect`}
                                onClick={() => handleClickCreate('overview')}>
                                新規作成
                            </button>
                        </div>
                        <article className={styles.listBox}>
                            {overviews?.map((overview, index) => (
                                <div className={styles.list} key={index}>
                                    <p className={styles.txt}>
                                        {overview.title}
                                    </p>
                                    <div className={styles.btnBox}>
                                        <button
                                            type="button"
                                            className={`${styles.btn} hoverEffect`}
                                            onClick={() =>
                                                handleClickEdit(
                                                    'overview',
                                                    overview.id,
                                                )
                                            }>
                                            編集
                                        </button>
                                        <button
                                            type="button"
                                            className={styles.delete}
                                            onClick={() =>
                                                handleClickDelete(
                                                    'overview',
                                                    overview.id,
                                                )
                                            }>
                                            削除
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </article>
                    </div>
                    <div className={styles.officialBox}>
                        <div className={styles.ttlFlex}>
                            <h4 className={styles.ttl2}>クーポン情報</h4>
                            <button
                                type="button"
                                className={`${styles.btn} hoverEffect`}
                                onClick={() => handleClickCreate('coupon')}>
                                新規作成
                            </button>
                        </div>
                        <article className={styles.listBox}>
                            {coupons?.map((coupon, index) => (
                                <div className={styles.list} key={index}>
                                    <p className={styles.txt}>{coupon.title}</p>
                                    <div className={styles.btnBox}>
                                        <button
                                            type="button"
                                            className={`${styles.btn} hoverEffect`}
                                            onClick={() =>
                                                handleClickEdit(
                                                    'coupon',
                                                    coupon.id,
                                                )
                                            }>
                                            編集
                                        </button>
                                        <button
                                            type="button"
                                            className={styles.delete}
                                            onClick={() =>
                                                handleClickDelete(
                                                    'coupon',
                                                    coupon.id,
                                                )
                                            }>
                                            削除
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </article>
                    </div>
                    <div className={styles.officialBox}>
                        <div className={styles.ttlFlex}>
                            <h4 className={styles.ttl2}>公式SNS</h4>
                            <button
                                type="button"
                                className={`${styles.btn} hoverEffect`}
                                onClick={() => handleClickCreate('social')}>
                                新規作成
                            </button>
                        </div>
                        <article className={styles.listBox}>
                            {socials?.map((social, index) => (
                                <div className={styles.list} key={index}>
                                    <p className={styles.txt}>{social.name}</p>
                                    <div className={styles.btnBox}>
                                        <button
                                            type="button"
                                            className={`${styles.btn} hoverEffect`}
                                            onClick={() =>
                                                handleClickEdit(
                                                    'social',
                                                    social.id,
                                                )
                                            }>
                                            編集
                                        </button>
                                        <button
                                            type="button"
                                            className={styles.delete}
                                            onClick={() =>
                                                handleClickDelete(
                                                    'social',
                                                    social.id,
                                                )
                                            }>
                                            削除
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </article>
                    </div>
                    <div className={styles.officialBox}>
                        <div className={styles.ttlFlex}>
                            <h4 className={styles.ttl2}>お知らせ</h4>
                            <button
                                type="button"
                                className={`${styles.btn} hoverEffect`}
                                onClick={() => handleClickCreate('info')}>
                                新規作成
                            </button>
                        </div>
                        <article className={styles.listBox}>
                            {infos?.map((info, index) => (
                                <div className={styles.list} key={index}>
                                    <p className={styles.txt}>{info.content}</p>
                                    <div className={styles.btnBox}>
                                        <button
                                            type="button"
                                            className={`${styles.btn} hoverEffect`}
                                            onClick={() =>
                                                handleClickEdit('info', info.id)
                                            }>
                                            編集
                                        </button>
                                        <button
                                            type="button"
                                            className={styles.delete}
                                            onClick={() =>
                                                handleClickDelete(
                                                    'info',
                                                    info.id,
                                                )
                                            }>
                                            削除
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </article>
                    </div>
                    <div className={styles.officialBox}>
                        <div className={styles.ttlFlex}>
                            <h4 className={styles.ttl2}>Instagram連携</h4>
                            {instagram.length > 0 ? null : (
                                <button
                                    type="button"
                                    className={`${styles.btn} hoverEffect`}
                                    onClick={() =>
                                        handleClickCreate('instagram')
                                    }>
                                    新規作成
                                </button>
                            )}
                        </div>
                        <article className={styles.listBox}>
                            {instagram?.map((insta, index) => (
                                <div className={styles.list} key={index}>
                                    <p className={styles.txt}>連携済みです</p>
                                    <div className={styles.btnBox}>
                                        <button
                                            type="button"
                                            className={`${styles.btn} hoverEffect`}
                                            onClick={() =>
                                                handleClickEdit(
                                                    'instagram',
                                                    insta.id,
                                                )
                                            }>
                                            編集
                                        </button>
                                        <button
                                            type="button"
                                            className={styles.delete}
                                            onClick={() =>
                                                handleClickDelete(
                                                    'instagram',
                                                    insta.id,
                                                )
                                            }>
                                            削除
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </article>
                    </div>
                    <div className={styles.officialBox}>
                        <div className={styles.ttlFlex}>
                            <h4 className={styles.ttl2}>商品情報</h4>
                            <button
                                type="button"
                                className={`${styles.btn} hoverEffect`}
                                onClick={() => handleClickCreate('item')}>
                                新規作成
                            </button>
                        </div>
                        <article className={styles.listBox}>
                            {items?.map((item, index) => (
                                <div className={styles.list} key={index}>
                                    <p className={styles.txt}>{item.title}</p>
                                    <div className={styles.btnBox}>
                                        <button
                                            type="button"
                                            className={`${styles.btn} hoverEffect`}
                                            onClick={() =>
                                                handleClickEdit('item', item.id)
                                            }>
                                            編集
                                        </button>
                                        <button
                                            type="button"
                                            className={styles.delete}
                                            onClick={() =>
                                                handleClickDelete(
                                                    'item',
                                                    item.id,
                                                )
                                            }>
                                            削除
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </article>
                    </div>
                    <Btn01 txt="一覧に戻る" link="/dellamall/admin/shop" />
                </Container>
            </section>

            {popup ? (
                <OfficialContext.Provider
                    value={{
                        shop,
                        type,
                        setOverviews,
                        setCoupons,
                        setSocials,
                        setInfos,
                        setInstagram,
                        setItems,
                        handleClickCreate,
                        handleClickEdit,
                        disabled,
                        setDisabled,
                        setEditData,
                        editData,
                    }}>
                    {mode === 'create' ? <CreateOfficial /> : <EditOfficial />}
                </OfficialContext.Provider>
            ) : null}
        </>
    )
}

export default OfficialShop

OfficialShop.getLayout = function getLayout(page) {
    return <PageLayoutDellamall>{page}</PageLayoutDellamall>
}
