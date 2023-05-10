import styles from '@/styles/dellamall/components/adminForm.module.scss'
import { Btn01, Loader } from '@/components/dellamall'
import Container from '@/components/dellamall/Layouts/container'
import PageLayoutDellamall from '@/components/Layouts/PageLayoutDellamall'
import { useAuth } from '@/hooks/auth'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import axios from '@/lib/axios'

const Control = () => {
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const router = useRouter()
    const { user } = useAuth({ middleware: 'auth', type: 'dellamall' })
    const [authCheck, setAuthCheck] = useState(false)
    const [popup, setPopup] = useState(false)
    const [type, setType] = useState('')
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
    })

    const onLoadCheck = useCallback(async () => {
        if (user?.account_type > 2) {
            setAuthCheck(true)
        } else {
            setAuthCheck(false)
        }
    }, [user, setAuthCheck])

    useEffect(() => {
        onLoadCheck()

        if (user && user?.account_type < 3) {
            router.push('/dellamall')
        }
    }, [user])

    const handleClickPopup = useCallback(async type => {
        setPopup(prevState => !prevState)
        setType(type)
    }, [])

    const onSubmitImage = useCallback(
        async data => {
            await csrf()

            let permission = 0
            if (data.permission) {
                permission = 1
            }

            await axios
                .post('/api/dellamall/admin/image_permission', {
                    d_shop_id: data.shop_id,
                    image_permission: permission,
                })
                .then(res => {
                    // console.log(res)
                    alert('画像表示を切り替えました。')
                    router.reload()
                })
                .catch(e => {
                    console.error(e)
                    alert('画像表示の切り替えに失敗しました。')
                })
        },
        [user],
    )

    const onSubmitOfficialAdd = useCallback(
        async data => {
            await csrf()

            await axios
                .post('/api/dellamall/admin/official_add', {
                    official_user_id: data.user_id,
                    d_shop_id: data.shop_id,
                })
                .then(res => {
                    // console.log(res)
                    alert('公式認証しました。')
                    router.reload()
                })
                .catch(e => {
                    console.error(e)
                    alert('公式認証できませんでした。')
                })
        },
        [user],
    )

    const onSubmitOfficialDelete = useCallback(
        async data => {
            await csrf()

            await axios
                .post('/api/dellamall/admin/official_cancel', {
                    official_user_id: data.user_id,
                    d_shop_id: data.shop_id,
                })
                .then(res => {
                    // console.log(res)
                    alert('公式を解除しました。')
                    router.reload()
                })
                .catch(e => {
                    console.error(e)
                    alert('公式を解除できませんでした。')
                })
        },
        [user],
    )

    return (
        <>
            <section className="cont1">
                <Container small>
                    <h2 className="ttl2">管理者</h2>
                    {authCheck ? (
                        <div className={styles.authBox}>
                            <div
                                className={`${styles.btnCover} btnCover`}
                                onClick={() => handleClickPopup('公式追加')}>
                                <Btn01 txt="公式認証" />
                            </div>
                            <div
                                className={`${styles.btnCover} btnCover`}
                                onClick={() => handleClickPopup('公式解除')}>
                                <Btn01 txt="公式認証解除" />
                            </div>
                            <div
                                className={`${styles.btnCover} btnCover`}
                                onClick={() => handleClickPopup('画像')}>
                                <Btn01 txt="画像表示/非表示" />
                            </div>
                            <Btn01
                                txt="ピックアップリスト"
                                link="/dellamall/admin/control/pickup"
                            />
                            <Btn01
                                txt="ショップ一覧"
                                link="/dellamall/admin/control/shop"
                            />
                        </div>
                    ) : (
                        <Loader />
                    )}
                </Container>
            </section>

            {popup ? (
                <div
                    className={styles.popupArea}
                    onClick={() => handleClickPopup(type)}>
                    <Container small900>
                        <div
                            className={`${styles.popupBox} ${styles.adminForm}`}
                            onClick={e => e.stopPropagation()}>
                            {type === '画像' ? (
                                <form onSubmit={handleSubmit(onSubmitImage)}>
                                    <h3 className={styles.midashi}>
                                        画像表示/非表示
                                    </h3>
                                    <dl>
                                        <dt>
                                            <label htmlFor="shop_id">
                                                ショップID
                                            </label>
                                        </dt>
                                        <dd>
                                            <input
                                                type="text"
                                                id="shop_id"
                                                {...register('shop_id', {
                                                    required: true,
                                                })}
                                                placeholder=""
                                            />
                                            {errors.shop_id && (
                                                <p className={styles.error}>
                                                    必須項目を入力してください
                                                </p>
                                            )}
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>
                                            <label htmlFor="permission">
                                                表示/非表示
                                            </label>
                                        </dt>
                                        <dd>
                                            <input
                                                type="checkbox"
                                                id="permission"
                                                {...register('permission')}
                                            />
                                        </dd>
                                    </dl>
                                    <button
                                        className={`${styles.btn} hoverEffect`}>
                                        送信
                                    </button>
                                </form>
                            ) : null}
                            {type === '公式追加' ? (
                                <form
                                    onSubmit={handleSubmit(
                                        onSubmitOfficialAdd,
                                    )}>
                                    <h3 className={styles.midashi}>公式認証</h3>
                                    <dl>
                                        <dt>
                                            <label htmlFor="shop_id">
                                                ショップID
                                            </label>
                                        </dt>
                                        <dd>
                                            <input
                                                type="text"
                                                id="shop_id"
                                                {...register('shop_id', {
                                                    required: true,
                                                })}
                                                placeholder=""
                                            />
                                            {errors.shop_id && (
                                                <p className={styles.error}>
                                                    必須項目を入力してください
                                                </p>
                                            )}
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>
                                            <label htmlFor="user_id">
                                                公式ユーザID
                                            </label>
                                        </dt>
                                        <dd>
                                            <input
                                                type="text"
                                                id="user_id"
                                                {...register('user_id', {
                                                    required: true,
                                                })}
                                                placeholder=""
                                            />
                                            {errors.user_id && (
                                                <p className={styles.error}>
                                                    必須項目を入力してください
                                                </p>
                                            )}
                                        </dd>
                                    </dl>
                                    <button
                                        className={`${styles.btn} hoverEffect`}>
                                        送信
                                    </button>
                                </form>
                            ) : null}
                            {type === '公式解除' ? (
                                <form
                                    onSubmit={handleSubmit(
                                        onSubmitOfficialDelete,
                                    )}>
                                    <h3 className={styles.midashi}>公式解除</h3>
                                    <dl>
                                        <dt>
                                            <label htmlFor="shop_id">
                                                ショップID
                                            </label>
                                        </dt>
                                        <dd>
                                            <input
                                                type="text"
                                                id="shop_id"
                                                {...register('shop_id', {
                                                    required: true,
                                                })}
                                                placeholder=""
                                            />
                                            {errors.shop_id && (
                                                <p className={styles.error}>
                                                    必須項目を入力してください
                                                </p>
                                            )}
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>
                                            <label htmlFor="user_id">
                                                公式ユーザID
                                            </label>
                                        </dt>
                                        <dd>
                                            <input
                                                type="text"
                                                id="user_id"
                                                {...register('user_id', {
                                                    required: true,
                                                })}
                                                placeholder=""
                                            />
                                            {errors.user_id && (
                                                <p className={styles.error}>
                                                    必須項目を入力してください
                                                </p>
                                            )}
                                        </dd>
                                    </dl>
                                    <button
                                        className={`${styles.btn} hoverEffect`}>
                                        送信
                                    </button>
                                </form>
                            ) : null}
                        </div>
                    </Container>
                </div>
            ) : null}
        </>
    )
}

export default Control

Control.getLayout = function getLayout(page) {
    return <PageLayoutDellamall>{page}</PageLayoutDellamall>
}
