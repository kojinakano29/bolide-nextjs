import styles from '@/styles/dellamall/components/login.module.scss'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import InputError from '@/components/InputError'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PageLayoutDellamall from '@/components/Layouts/PageLayoutDellamall'
import Container from '@/components/dellamall/Layouts/container'
import { Btn01, NewBtn } from '@/components/dellamall'
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
                <div className={styles.passwordBox}>
                  <input
                    id="password"
                    type={view ? "text" : "password"}
                    className={styles.password}
                    onChange={event => setPassword(event.target.value)}
                    required
                    autoComplete="current-password"
                    placeholder="PASSWORD"
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
              <Btn01 fa={faArrowRightToBracket} txt="ログイン" />
              <p className={styles.forgot}>
                ※パスワードをお忘れの方は
                <Link href="/forgot-password"><a>こちら</a></Link>
              </p>
            </article>
          </form>
        </Container>
      </section>

      <section className={styles.bjcArea}>
        <Container small900>
          <h3>新規のお客様はこちら</h3>
          <p className={styles.desc}>
            DellaMall以外にも、Bolide's Japanには様々な機能がございます。
            <br className="pc" />詳しいコンテンツ内容は下記よりご確認ください！
          </p>
          <Link href="/">
            <a className={`${styles.bjcLink} hoverEffect`}>
              <img src="/dellamall/bjc_banner.svg" alt="" />
            </a>
          </Link>
        </Container>
      </section>

      <NewBtn />

      <section className={styles.downloadArea}>
        <Container small900>
          <h3>
            公式ショップ・無料キャプチャに関する
            <br/>資料はこちら
          </h3>
          <a className={styles.downloadBtn} href="/dellamall/files/white_paper.pdf" target="_blank">資料をダウンロード</a>
        </Container>
      </section>
    </>
  )
}

export default Login

Login.getLayout = function getLayout(page) {
  return <PageLayoutDellamall>{page}</PageLayoutDellamall>
}