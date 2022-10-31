import styles from '@/styles/dellamall/components/footer.module.scss'
import Container from '@/components/dellamall/Layouts/container';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/images/dellamall/parts/footer/footer__logo.svg'
import bolides from '@/images/dellamall/parts/footer/bolides.svg'
import marchedor from '@/images/dellamall/parts/footer/marchedor.svg'
import corapura from '@/images/dellamall/parts/footer/corapura.svg'
import liondor from '@/images/dellamall/parts/footer/liondor.svg'
import top from '@/images/dellamall/parts/common/to-top.svg'
import { animateScroll as scroll } from "react-scroll";
import { useCallback, useEffect, useState } from 'react';

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
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <button
        className={`
          ${styles.topBtn}
          ${show ? styles.active : ""}
          hoverEffect
        `}
        onClick={scrollTop}
      >
        <Image
          src={top}
          alt=""
          layout="responsive"
          sizes="56px"
          priority
        />
      </button>
      <footer className={styles.footer}>
        <Container small>
          <Link href="/dellamall">
            <a className={`${styles.logo} hoverEffect`}>
              <Image
                src={logo}
                alt="della mall"
                layout="responsive"
                sizes="144px"
                priority
              />
            </a>
          </Link>
          <div className={styles.footer__listPage}>
            <a className="hoverEffect" href="" target="_blank">運営会社</a>
            <Link href="">
              <a className="hoverEffect">利用規約</a>
            </Link>
            <Link href="">
              <a className="hoverEffect">プライバシーポリシー</a>
            </Link>
            <Link href="">
              <a className="hoverEffect">プレスリリース</a>
            </Link>
            <Link href="">
              <a className="hoverEffect">お問い合わせ</a>
            </Link>
          </div>
          <div className={styles.footer__listCompany}>
            <a href="" className="hoverEffect" target="_blank">
              <Image
                src={bolides}
                alt=""
                layout="responsive"
                sizes="240px"
                priority
              />
            </a>
            <a href="" className="hoverEffect" target="_blank">
              <Image
                src={marchedor}
                alt=""
                layout="responsive"
                sizes="240px"
                priority
              />
            </a>
            <a href="" className="hoverEffect" target="_blank">
              <Image
                src={corapura}
                alt=""
                layout="responsive"
                sizes="240px"
                priority
              />
            </a>
            <a href="" className="hoverEffect" target="_blank">
              <Image
                src={liondor}
                alt=""
                layout="responsive"
                sizes="240px"
                priority
              />
            </a>
          </div>
          <div className={styles.footer__text}>
            このサイトはreCAPTHAによって保護されており、
            <br />Googleの<a href="" target="_blank">プライバシーポリシー</a>と<a href="" target="_blank">利用規約</a>が適応されます。
          </div>
          <p className={`${styles.copy} en`}>© 2022 Della Moll inc.</p>
        </Container>
      </footer>
    </>
  );
}

export default Footer;