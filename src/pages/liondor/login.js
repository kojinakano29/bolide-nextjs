import styles from '@/styles/liondor/components/login.module.scss'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import InputError from '@/components/InputError'
import { useAuth } from '@/hooks/auth'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Container from '@/components/liondor/Layouts/container'
import PageLayoutLiondor from '@/components/Layouts/PageLayoutLiondor'
import { PageTitle } from '@/components/liondor'

const Login = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/liondor/',
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
        <section className="cont1">
            <PageTitle title="LOGIN" ivy />
            <Container small900>
                <p className={styles.desc}>
                    ログインすると、好きな記事を保存することができる他、便利な機能を使って
                    <br/>LIONDORをあなた専用にカスタマイズできます。
                </p>
                <p className={`${styles.desc} ${styles.desc2}`}>まだ登録がお済みでない方はこちら</p>
                <div className={styles.register}>
                    <a href="/register" className="btn5">企業様はこちら</a>
                    <a href="/register" className="btn5">一般ユーザーの方はこちら</a>
                </div>
                {/* Session Status */}
                <AuthSessionStatus className="mb-4" status={status} />
                <form onSubmit={submitForm}>
                    <article className={styles.loginBox}>
                        {/* Email Address */}
                        <dl className={styles.dl}>
                            <dt><span></span><label className="ivy" htmlFor="email">Email</label></dt>
                            <dd>
                                <input
                                    id="email"
                                    type="email"
                                    onChange={event => setEmail(event.target.value)}
                                    required
                                    autoFocus
                                />
                                <InputError messages={errors.email} className="mt-2" />
                            </dd>
                        </dl>
                        {/* Password */}
                        <dl className={styles.dl}>
                            <dt><span></span><label className="ivy" htmlFor="password">Password</label></dt>
                            <dd>
                                <div className={styles.passwordBox}>
                                    <input
                                        id="password"
                                        type={view ? "text" : "password"}
                                        onChange={event => setPassword(event.target.value)}
                                        required
                                        autoComplete="current-password"
                                    />
                                    <p
                                        className={styles.view}
                                        onClick={handleClickView}
                                    >{view ? "非表示" : "表示"}</p>
                                </div>
                                <InputError
                                    messages={errors.password}
                                    className="mt-2"
                                />
                            </dd>
                        </dl>
                        <div>
                            <button className="btn3 noto">ログインする</button>
                            <p className={styles.forgot}>
                                ※パスワードをお忘れの方は
                                <a href="/forgot-password">こちら</a>
                            </p>
                        </div>
                    </article>
                </form>
            </Container>
        </section>
    )
}

export default Login

Login.getLayout = function getLayout(page) {
    return <PageLayoutLiondor>{page}</PageLayoutLiondor>
}