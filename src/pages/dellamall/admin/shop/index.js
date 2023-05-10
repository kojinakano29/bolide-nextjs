import styles from '@/styles/dellamall/components/adminList.module.scss'
import Container from '@/components/dellamall/Layouts/container'
import PageLayoutDellamall from '@/components/Layouts/PageLayoutDellamall'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { Loader } from '@/components/dellamall'

const AdminShop = () => {
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const { user } = useAuth({ middleware: 'auth', type: 'dellamall' })
    const [createShop, setCreateShop] = useState([])
    const [processing, setProcessing] = useState(false)

    const onLoadList = async () => {
        await setProcessing(true)
        await csrf()

        await axios
            .post(`/api/dellamall/user/create_shop`, {
                user_id: user?.id,
            })
            .then(res => {
                // console.log(res)
                setCreateShop(
                    res.data.filter(shop => {
                        return (
                            !shop.official_user_id ||
                            shop.official_user_id === user?.id
                        )
                    }),
                )
            })
            .catch(e => {
                console.error(e)
            })

        await setProcessing(false)
    }

    useEffect(() => {
        if (user) {
            onLoadList()
        }
    }, [user])

    const handleClickDelete = async id => {
        if (processing) return
        await setProcessing(true)
        await csrf()

        await axios
            .delete(`/api/dellamall/shop/delete/${id}`)
            .then(res => {
                // console.log(res)
                onLoadList()
                alert('ショップを削除しました。')
            })
            .catch(e => {
                console.error(e)
            })

        await setProcessing(false)
    }

    return (
        <section className="cont1">
            <Container small>
                <h2 className="ttl2">作成したショップ一覧</h2>
                {user && !processing ? (
                    <article className={styles.listBox}>
                        {createShop?.map((shop, index) => (
                            <div className={styles.list} key={index}>
                                <a
                                    href={`/dellamall/shop/${shop.id}`}
                                    className={styles.link}>
                                    {shop.name}
                                </a>
                                <div className={styles.btnBox}>
                                    <a
                                        href={`/dellamall/admin/shop/edit/${shop.id}`}
                                        className={`${styles.btn} hoverEffect`}>
                                        基本情報
                                    </a>
                                    {shop.official_user_id ? (
                                        <>
                                            <a
                                                href={`/dellamall/admin/shop/official/${shop.id}`}
                                                className={`${styles.btn} hoverEffect`}>
                                                公式情報
                                            </a>
                                            <a
                                                href={`/dellamall/admin/shop/comment/${shop.id}`}
                                                className={`${styles.btn} hoverEffect`}>
                                                コメント
                                            </a>
                                        </>
                                    ) : null}
                                    <button
                                        type="button"
                                        className={styles.delete}
                                        onClick={() =>
                                            handleClickDelete(shop.id)
                                        }>
                                        削除
                                    </button>
                                </div>
                            </div>
                        ))}
                    </article>
                ) : (
                    <Loader />
                )}
            </Container>
        </section>
    )
}

export default AdminShop

AdminShop.getLayout = function getLayout(page) {
    return <PageLayoutDellamall>{page}</PageLayoutDellamall>
}
