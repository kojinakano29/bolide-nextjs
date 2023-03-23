import styles from '@/styles/top/components/login.module.scss'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import InputError from '@/components/InputError'
import { useAuth } from '@/hooks/auth'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Container from '@/components/top/Layout/container'
import PageLayoutTop from '@/components/Layouts/pageLayoutTop'
import { Btn1 } from '@/components/top'

const PasswordReset = () => {
    const router = useRouter()

    const { resetPassword } = useAuth({ middleware: 'guest' })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [view, setView] = useState(false)

    const submitForm = event => {
        event.preventDefault()

        resetPassword({
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
            setStatus,
        })
    }

    useEffect(() => {
        setEmail(router.query.email || '')
    }, [router.query.email])

    const handleClickView = useCallback(async () => {
        setView(prevState => !prevState)
    }, [setView])

    return (
        <>
            <section className="cont1">
                <Container small900>
                <h2 className="ttl2">パスワード再設定</h2>
                    <div className="breadcrumbBox">
                        <a href="/">トップ</a>
                        <div><img src="/top/breadcrumb.svg" alt=">" /></div>
                        <p>パスワード再設定</p>
                    </div>
                </Container>
            </section>

            <section className={styles.cont2}>
                <Container small900>
                    {/* Session Status */}
                    <AuthSessionStatus className="mb-4" status={status} />

                    <form onSubmit={submitForm}>
                        <article className={styles.loginBox}>
                            <div className={styles.inputBox}>
                                <label htmlFor="email" className="en">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    className={styles.email}
                                    onChange={event => setEmail(event.target.value)}
                                    required
                                    autoFocus
                                />
                                <InputError messages={errors.email} className="mt-2" />
                            </div>
                            <div className={styles.inputBox}>
                                <label htmlFor="password" className="en">Password</label>
                                <div className={styles.passwordBox}>
                                    <input
                                        id="password"
                                        type={view ? "text" : "password"}
                                        className={styles.password}
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
                            </div>
                            <div className={styles.inputBox}>
                                <label htmlFor="passwordConfirmation" className="en">Confirm Password</label>
                                <div className={styles.passwordBox}>
                                    <input
                                        id="passwordConfirmation"
                                        type={view ? "text" : "password"}
                                        className={styles.password}
                                        onChange={event => setPasswordConfirmation(event.target.value)}
                                        required
                                    />
                                    <p
                                        className={styles.view}
                                        onClick={handleClickView}
                                    >{view ? "非表示" : "表示"}</p>
                                </div>
                                <InputError
                                    messages={errors.passwordConfirmation}
                                    className="mt-2"
                                />
                            </div>
                            <Btn1 txt="再設定する" submit />
                        </article>
                    </form>
                </Container>
            </section>
        </>
    )
}

export default PasswordReset

PasswordReset.getLayout = function getLayout(page) {
    return <PageLayoutTop>{page}</PageLayoutTop>
}