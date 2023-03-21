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
              <img src="/top/logo.svg" alt="Bolide's Japan" />
            </a>
          </Link>
          <ul className={styles.listFlex}>
            <li className="hoverEffect">
              <a href="https://bolides.co.jp/company/" target="_blank" rel="noopener noreferrer">運営会社</a>
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
              <Link href="/ad">
                <a>広告掲載費について</a>
              </Link>
            </li>
            <li className="pc">|</li>
            <li className="hoverEffect">
              <Link href="/tokushoho">
                <a>特定商取引法に基づく表示</a>
              </Link>
            </li>
            <li className="pc">|</li>
            <li className="hoverEffect">
              <Link href="/contact">
                <a>お問い合わせ</a>
              </Link>
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
        <img src="/top/pagetop.svg" alt="TOPへ戻るアイコン" />
      </button>
    </>
  );
}

export default Footer;