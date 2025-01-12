import styles from '@/styles/corapura/components/login.module.scss'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import InputError from '@/components/InputError'
import { useAuth } from '@/hooks/auth'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Btn } from '@/components/corapura'
import Container from '@/components/corapura/Layout/container'
import know from '@/images/corapura/login/know.svg'
import user from '@/images/corapura/login/user.svg'
import PageLayoutCorapura from '@/components/Layouts/pageLayoutCorapura'

const Login = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/corapura/editor',
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [view, setView] = useState(false)

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm = async event => {
        event.preventDefault()

        login({
            email,
            password,
            setErrors,
            setStatus,
        })
    }

    const handleClickView = useCallback(async () => {
        setView(prevState => !prevState)
    }, [setView])

    return (
        <>
            <section className="cont1">
                <Container small900>
                    <h2 className="ttl1">ログイン</h2>
                    <p className={styles.desc}>
                        ログインすると、好きな記事を保存することができる他、便利な機能を使って
                        <br />
                        CORAPURAをあなた専用にカスタマイズできます。
                    </p>
                    {/* Session Status */}
                    <AuthSessionStatus className="mb-4" status={status} />
                    <form onSubmit={submitForm}>
                        <article className={styles.loginBox}>
                            <div className={styles.inputBox}>
                                <label htmlFor="email" className="en">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className={styles.email}
                                    onChange={event =>
                                        setEmail(event.target.value)
                                    }
                                    required
                                    autoFocus
                                />
                                <InputError
                                    messages={errors.email}
                                    className="mt-2"
                                />
                            </div>
                            <div className={styles.inputBox}>
                                <label htmlFor="password" className="en">
                                    Password
                                </label>
                                <div className={styles.passwordBox}>
                                    <input
                                        id="password"
                                        type={view ? 'text' : 'password'}
                                        className={styles.password}
                                        onChange={event =>
                                            setPassword(event.target.value)
                                        }
                                        required
                                        autoComplete="current-password"
                                    />
                                    <p
                                        className={styles.view}
                                        onClick={handleClickView}>
                                        {view ? '非表示' : '表示'}
                                    </p>
                                </div>
                                <InputError
                                    messages={errors.password}
                                    className="mt-2"
                                />
                            </div>
                            <Btn txt="ログイン" submit />
                            <p className={styles.forgot}>
                                ※パスワードをお忘れの方は
                                <a href="/forgot-password">こちら</a>
                            </p>
                        </article>
                    </form>
                </Container>
            </section>

            <section className={styles.new}>
                <Container small>
                    <h3 className={styles.txt}>
                        まだ登録がお済みでない方はこちら
                    </h3>
                    <div className={styles.login__newList}>
                        <a href="/corapura/guide" className="hoverEffect">
                            <img src={know.src} alt="アイコン" />
                            <p>コラプラについて知る</p>
                        </a>
                        <a
                            href="/register"
                            className={`hoverEffect ${styles.rev}`}>
                            <img src={user.src} alt="アイコン" />
                            <p>新規会員登録</p>
                        </a>
                    </div>
                </Container>
            </section>
        </>
    )
}

export default Login

Login.getLayout = function getLayout(page) {
    return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}
