import styles from '@/styles/top/components/login.module.scss'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import InputError from '@/components/InputError'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Container from '@/components/corapura/Layout/container'
import PageLayoutTop from '@/components/Layouts/pageLayoutTop'
import { Btn1, LinkList } from '@/components/top'

const Login = () => {
  const router = useRouter()

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/mypage',
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
          <h2 className="ttl2">ログイン</h2>
          <div className="breadcrumbBox">
            <Link href="/">
              <a>トップ</a>
            </Link>
            <div><img src="/top/breadcrumb.svg" alt="" /></div>
            <p>ログイン</p>
          </div>
          <p className={styles.desc}>IDとパスワードを入力して「ログイン」ボタンをクリックしてください。</p>
          {/* Session Status */}
          <AuthSessionStatus className="mb-4" status={status} />
          <form onSubmit={submitForm}>
            <article className={styles.loginBox}>
              <div className={styles.inputBox}>
                <label htmlFor="email" className="en">Email</label>
                <input
                  id="email"
                  type="email"
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
              <Btn1 txt="ログイン" submit />
              <p className={styles.forgot}>
                ※パスワードをお忘れの方は
                <Link href="/forgot-password"><a>こちら</a></Link>
              </p>
            </article>
          </form>
        </Container>
        <Container small>
          <div className={styles.bottomArea}>
            <p className={styles.desc}>まだご登録がお済みでない方はこちら</p>
            <LinkList />
          </div>
        </Container>
      </section>
    </>
  )
}

export default Login

Login.getLayout = function getLayout(page) {
  return <PageLayoutTop>{page}</PageLayoutTop>
}