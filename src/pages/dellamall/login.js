import styles from '@/styles/dellamall/components/login.module.scss'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import InputError from '@/components/InputError'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PageLayoutDellamall from '@/components/Layouts/PageLayoutDellamall'
import Container from '@/components/dellamall/Layouts/container'
import { Btn01 } from '@/components/dellamall'
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'

const Login = () => {
  const router = useRouter()

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dellamall',
  })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)

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

  return (
    <>
      <section className="cont1">
        <Container small900>
          <h2 className="ttl2">ログイン</h2>
          {/* Session Status */}
          <AuthSessionStatus className="mb-4" status={status} />
          <form onSubmit={submitForm}>
            <article className={styles.loginBox}>
              <div className={styles.inputBox}>
                <input
                  id="email"
                  type="email"
                  className={styles.email}
                  onChange={event => setEmail(event.target.value)}
                  required
                  autoFocus
                  placeholder="EMAIL"
                />
                <InputError messages={errors.email} className="mt-2" />
              </div>
              <div className={styles.inputBox}>
                <input
                  id="password"
                  type="password"
                  className={styles.password}
                  onChange={event => setPassword(event.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="PASSWORD"
                />
                <InputError
                  messages={errors.password}
                  className="mt-2"
                />
              </div>
              <Btn01 fa={faArrowRightToBracket} txt="ログイン" />
              <p className={styles.forgot}>
                ※パスワードをお忘れの方は
                <Link href="/forgot-password"><a>こちら</a></Link>
              </p>
            </article>
          </form>
        </Container>
      </section>

      <section className={styles.new}>
        <Container small>
          <h2 className="ttl1 center mb40">新規のお客様はこちら</h2>
          <div className={styles.login__newList}>
            <Link href="/dellamall/officialRequest">
              <a className={`${styles.login__newItem} btn4 hoverEffect`}>公式ショップ申請の方</a>
            </Link>
            <a className={`${styles.login__newItem} btn4 hoverEffect`} href="">
              無料キャプチャ申請の方
              <span>※ショップオーナー様</span>
            </a>
            <Link href="/register">
              <a className={`${styles.login__newItem} btn4 hoverEffect`}>個人利用の方</a>
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}

export default Login

Login.getLayout = function getLayout(page) {
  return <PageLayoutDellamall>{page}</PageLayoutDellamall>
}