import styles from '@/styles/top/components/login.module.scss'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import InputError from '@/components/InputError'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import Container from '@/components/top/Layout/container'
import PageLayoutTop from '@/components/Layouts/pageLayoutTop'
import { Btn1 } from '@/components/top'

const ForgotPassword = () => {
    const { forgotPassword } = useAuth({ middleware: 'guest' })

    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = event => {
        event.preventDefault()

        forgotPassword({ email, setErrors, setStatus })
    }

    return (
        <>
            <section className="cont1">
                <Container small900>
                    <h2 className="ttl2">パスワード忘れた方</h2>
                    <div className="breadcrumbBox">
                        <a href="/">トップ</a>
                        <div><img src="/top/breadcrumb.svg" alt=">" /></div>
                        <p>パスワード忘れた方</p>
                    </div>
                </Container>
            </section>

            <section className={styles.cont2}>
                <Container small900>
                <p className={styles.desc}>パスワードをリセットするには、ご登録のメールアドレスを入力してください。 </p>

                {/* Session Status */}
                <AuthSessionStatus className="mb-4" status={status} />

                <form onSubmit={submitForm}>
                    <article className={styles.loginBox}>
                        <div className={styles.inputBox}>
                            <label htmlFor="email" className="en">Email</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                className={styles.email}
                                onChange={event => setEmail(event.target.value)}
                                required
                                autoFocus
                            />
                            <InputError messages={errors.email} className="mt-2" />
                        </div>
                        <Btn1 txt="送信する" submit />
                    </article>
                </form>
                </Container>
            </section>
        </>
    )
}

export default ForgotPassword

ForgotPassword.getLayout = function getLayout(page) {
    return <PageLayoutTop>{page}</PageLayoutTop>
}