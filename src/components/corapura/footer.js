import styles from '@/styles/corapura/components/footer.module.scss'
import Container from './Layout/container';
import Image from 'next/image';
import bolide from '@/images/corapura/footer/bolides.svg'
import marchDor from '@/images/corapura/footer/marchDor.svg'
import liondor from '@/images/corapura/footer/liondor.svg'
import Dellamall from '@/images/corapura/footer/Dellamall.svg'
import logo from '@/images/corapura/footer/footer-logo.svg'
import topBack from '@/images/corapura/footer/top.svg'
import Link from 'next/link';
import { useCallback } from 'react';
import { animateScroll as scroll } from "react-scroll";

const Footer = () => {
  const scrollTop = useCallback(() => {
    scroll.scrollToTop()
  }, [])

  return (
    <footer className={styles.footer}>
      <div className={styles.footer1}>
        <Container small>
          <p className={`${styles.footer1__title} en`}>Bolide's Japan Other Site</p>
          <div className={styles.footer1__list}>
            <a className="hoverEffect" href="https://bolides.co.jp/" target="_blank" rel="noopener noreferrer">
              <Image
                src={bolide}
                alt="Bolide's"
                layout="responsive"
                sizes="274px"
                priority
              />
            </a>
            <a className="hoverEffect" href="https://marche-dor.jp/" target="_blank" rel="noopener noreferrer">
              <Image
                src={marchDor}
                alt="Marche Dor"
                layout="responsive"
                sizes="274px"
                priority
              />
            </a>
            <a className="hoverEffect" href="/liondor" target="_blank" rel="noopener noreferrer">
              <Image
                src={liondor}
                alt="Liondor"
                layout="responsive"
                sizes="274px"
                priority
              />
            </a>
            <a className="hoverEffect" href="/dellamall" target="_blank" rel="noopener noreferrer">
              <Image
                src={Dellamall}
                alt="Della Mall"
                layout="responsive"
                sizes="274px"
                priority
              />
            </a>
          </div>
        </Container>
      </div>
      <div className={styles.footer2}>
        <Container small>
          <div className={styles.footer__cont1}>
            <Link href="/corapura">
              <a className={`${styles.footer__logo} hoverEffect`}>
                <Image
                  src={logo}
                  alt="CORAPURA"
                  layout="responsive"
                  sizes="316px"
                  priority
                />
              </a>
            </Link>
            <ul className={styles.footer__cont1List}>
              <li className={styles.footer__cont1Item}>
                <Link href="/corapura/guide">
                  <a>CORAPRAとは</a>
                </Link>
              </li>
              <li className={styles.footer__cont1Item}>
                <Link href="/corapura/company/matter">
                  <a>企業案件</a>
                </Link>
              </li>
              <li className={styles.footer__cont1Item}>
                <Link href="/corapura/salon">
                  <a>オンラインサロン</a>
                </Link>
              </li>
              <li className={styles.footer__cont1Item}>
                <a href="https://bolides.co.jp/company/" target="_blank" rel="noopener noreferrer">Bolide's Japanとは</a>
              </li>
              <li className={styles.footer__cont1Item}>
                <Link href="/corapura/company/matter">
                  <a>インフルエンサー案件</a>
                </Link>
              </li>
              <li className={styles.footer__cont1Item}>
                <Link href="/corapura/press_release">
                  <a>プレスリリース</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.footer__cont2}>
            <div className={styles.footer__cont2Left}>
              このサイトはreCAPTHAによって保護されており、<br />
              Googleの<a href="https://policies.google.com/privacy?hl=ja" target="_blank">プライバシーポリシー</a>と<a href="https://policies.google.com/terms?hl=ja" target="_blank">利用規約</a>が適応されます。
            </div>
            <div className={styles.footer__cont2Right}>
              © 2022 CORAPRA inc.
            </div>
          </div>
          <ul className={styles.footer__cont3}>
            <li className={styles.footer__cont3Item}><a href="https://bolides.co.jp/company/" target="_blank" rel="noopener noreferrer">運営会社</a></li>
            <li className={styles.footer__cont3Item}><a href="/corapura/terms">利用規約</a></li>
            <li className={styles.footer__cont3Item}><a href="/corapura/tradeLaw">特定商品取引法に基づく表記</a></li>
            <li className={styles.footer__cont3Item}><a href="/corapura/privacy">プライバシーポリシー</a></li>
            <li className={styles.footer__cont3Item}><a href="">サイトマップ</a></li>
            <li className={styles.footer__cont3Item}><a href="">お問い合わせ</a></li>
          </ul>
        </Container>
      </div>
      <button
        type="button"
        className={`${styles.to__top} en hoverEffect`}
        onClick={scrollTop}
      >
        <Image
          src={topBack}
          alt="BACK TO TOP"
          layout="responsive"
          sizes="100px"
          priority
        />
      </button>
    </footer>
  );
}

export default Footer;