import { useAuth } from '@/hooks/auth';
import styles from '@/styles/top/components/header.module.scss'
import Link from 'next/link';
import { useCallback, useState } from 'react';
import Container from './Layout/container';

const Header = () => {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)

  const handleClickHum = useCallback(async () => {
    setOpen(prevState => !prevState)
  }, [setOpen])

  return (
    <header className={styles.header}>
      <div className={`${styles.humBox} ${open ? styles.active : null}`}>
        <Container>
          <div className={styles.headerFlex}>
            <h1 className={styles.logo}>
              <Link href="/">
                <a className="hoverEffect">
                  <img src="/top/logo.svg" alt="" />
                </a>
              </Link>
            </h1>
            <ul className={styles.nav}>
              <li className={`${styles.type1} pc`}>
                <Link href="/#about">
                  <a className="hoverEffect">Bolide's Japanとは？</a>
                </Link>
              </li>
              <li className={`${styles.type1} pc`}>
                <Link href="/#plan">
                  <a className="hoverEffect">料金プラン</a>
                </Link>
              </li>
              <li className={`${styles.type1} pc`}>
                <Link href="/#faq">
                  <a className="hoverEffect">よくあるご質問</a>
                </Link>
              </li>
              <li className={styles.type2}>
                <Link href="/contact">
                  <a className={`${styles.btn} hoverEffect`}>
                    <img src="/top/mail-icon.svg" alt="" />
                    <span>お問い合わせ</span>
                  </a>
                </Link>
                <Link href={user ? "/mypage" : "/login"}>
                  <a className={`${styles.btn} ${styles.color1} hoverEffect`}>
                    <img src={`/top/${user ? "mypage-icon.svg" : "login-icon.svg"}`} alt="" />
                    <span>{user ? "マイページ" : "ログイン"}</span>
                  </a>
                </Link>
                <Link href="/register">
                  <a className={`${styles.btn} ${styles.color2} hoverEffect`}>
                    <img src="/top/registar-icon.svg" alt="" />
                    <span>会員登録</span>
                  </a>
                </Link>
              </li>
              <li className={`${styles.type3} sp`}>
                <button
                  type="button"
                  className={open ? styles.active : null}
                  onClick={handleClickHum}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </li>
            </ul>
          </div>
          <ul className={styles.humNav}>
            <li>
              <Link href="/#about">
                <a>Bolide's Japanとは？</a>
              </Link>
            </li>
            <li>
              <Link href="/#plan">
                <a>料金プラン</a>
              </Link>
            </li>
            <li>
              <Link href="/#faq">
                <a>よくあるご質問</a>
              </Link>
            </li>
          </ul>
        </Container>
      </div>
    </header>
  );
}

export default Header;