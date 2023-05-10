import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import styles from '@/styles/dellamall/components/newShop.module.scss'
import { useCallback, useEffect, useState } from 'react'
import { Btn01, DateFormat, Loader } from '@/components/dellamall'

const NewShop = ({ handleClickOpen }) => {
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const { user } = useAuth()
    const [disabled, setDisabled] = useState(false)
    const [news, setNews] = useState([])

    const handleMount = useCallback(async () => {
        if (disabled) return
        setDisabled(true)
        await csrf()

        await axios
            .post(`/api/dellamall/mynews`, {
                user_id: user?.id,
            })
            .then(res => {
                // console.log(res)
                setNews(res.data)
            })
            .catch(e => console.error(e))

        await setDisabled(false)
    }, [disabled, setDisabled, user])

    useEffect(() => {
        if (user) {
            handleMount()
        }
    }, [user])

    return (
        <div className={styles.modalArea} onClick={handleClickOpen}>
            <article
                className={styles.modalBox}
                onClick={e => e.stopPropagation()}>
                <h2 className={styles.ttl}>新着情報</h2>
                {!disabled ? (
                    <>
                        {news.map((item, index) => (
                            <a
                                href={`/dellamall/shop/${item.d_shop_id}`}
                                key={index}
                                className={`hoverEffect ${styles.newLink}`}
                                onClick={handleClickOpen}>
                                <p className={styles.content}>{item.content}</p>
                                <p className={styles.time}>
                                    <DateFormat dateString={item.title} />
                                </p>
                            </a>
                        ))}
                    </>
                ) : (
                    <Loader />
                )}
                {!user ? (
                    <div className="hoverCover" onClick={handleClickOpen}>
                        <Btn01 txt="ログインする" link="/dellamall/login" />
                    </div>
                ) : null}
            </article>
        </div>
    )
}

export default NewShop
