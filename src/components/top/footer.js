import styles from '@/styles/top/components/footer.module.scss'
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import Container from './Layout/container';
import { animateScroll as scroll } from "react-scroll";

const Footer = () => {
  const scrollTop = useCallback(() => {
    scroll.scrollToTop()
  }, [])

  const [show, setShow] = useState(false)

  const handleScroll = useCallback(() => {
    const nowPos = window.scrollY

    if (nowPos > 500) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [setShow])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <footer className={styles.footer}>
        <Container>
          <Link href="/">
            <a className={`${styles.logo} hoverEffect`}>
              <img src="/top/logo.svg" alt="" />
            </a>
          </Link>
          <ul className={styles.listFlex}>
            <li className="hoverEffect">
              <a href="">運営会社</a>
            </li>
            <li className="pc">|</li>
            <li className="hoverEffect">
              <Link href="/#faq">
                <a>よくある質問</a>
              </Link>
            </li>
            <li className="pc">|</li>
            <li className="hoverEffect">
              <Link href="/terms">
                <a>利用規約</a>
              </Link>
            </li>
            <li className="pc">|</li>
            <li className="hoverEffect">
              <Link href="/privacy">
                <a>プライバシーポリシー</a>
              </Link>
            </li>
            <li className="pc">|</li>
            <li className="hoverEffect">
              <a href="">お問い合わせ</a>
            </li>
          </ul>
          <p className={`${styles.copy} en`}>© 2023 Bolide's Japan inc.</p>
        </Container>
      </footer>

      <button
        type="button"
        className={`${styles.topBtn} ${show ? styles.active : null} hoverEffect`}
        onClick={scrollTop}
      >
        <img src="/top/pagetop.svg" alt="" />
      </button>
    </>
  );
}

export default Footer;