import styles from '@/styles/corapura/components/footer.module.scss'
import Container from './Layout/container';
import Image from 'next/image';
import bolide from '@/images/corapura/footer/bolides.svg'
import marchDor from '@/images/corapura/footer/marchDor.svg'
import liondor from '@/images/corapura/footer/liondor.svg'
import Dellamall from '@/images/corapura/footer/Dellamall.svg'
import logo from '@/images/corapura/footer/footer-logo.svg'
import topBack from '@/images/corapura/footer/top.svg'
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
          <p className={`${styles.footer1__title} en`}>Bolide's Japan Other Sites</p>
          <div className={styles.footer1__list}>
            <a className="hoverEffect" href="/" target="_blank" rel="noopener noreferrer">
              <Image
                src={bolide}
                alt="Bolide's Japan"
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
                alt="LIONDOR"
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
            <a href="/corapura" className={`${styles.footer__logo} hoverEffect`}>
              <Image
                src={logo}
                alt="CORAPURA"
                layout="responsive"
                sizes="316px"
                priority
              />
            </a>
            <ul className={styles.footer__cont1List}>
              <li className={`${styles.footer__cont1Item} hoverEffect`}>
                <a href="/corapura/company/matter">企業案件</a>
              </li>
              <li className={`${styles.footer__cont1Item} hoverEffect`}>
                <a href="/corapura/influencer/matter">インフルエンサー案件</a>
              </li>
              <li className={`${styles.footer__cont1Item} hoverEffect`}>
                <a href="/corapura/company">企業一覧</a>
              </li>
              <li className={`${styles.footer__cont1Item} hoverEffect`}>
                <a href="/corapura/influencer">インフルエンサー</a>
              </li>
              <li className={`${styles.footer__cont1Item} hoverEffect`}>
                <a href="/corapura/salon">オンラインサロン</a>
              </li>
              {/* <li className={`${styles.footer__cont1Item} hoverEffect`}>
                <a href="https://bolides.co.jp/company/" target="_blank" rel="noopener noreferrer">Bolide's Japanとは</a>
              </li> */}
              <li className={`${styles.footer__cont1Item} hoverEffect`}>
                <a href="/corapura/press_release">プレスリリース</a>
              </li>
              <li className={`${styles.footer__cont1Item} hoverEffect`}>
                <a href="/corapura/guide">CORAPURAとは</a>
              </li>
            </ul>
          </div>
          <div className={styles.footer__cont2}>
            <div className={styles.footer__cont2Left}>
              このサイトはreCAPTHAによって保護されており、<br />
              Googleの<a href="https://policies.google.com/privacy?hl=ja" target="_blank">プライバシーポリシー</a>と<a href="https://policies.google.com/terms?hl=ja" target="_blank">利用規約</a>が適応されます。
            </div>
            <div className={styles.footer__cont2Right}>© 2023 CORAPURA inc.</div>
          </div>
          <ul className={styles.footer__cont3}>
            <li className={`${styles.footer__cont3Item} hoverEffect`}><a href="https://bolides.co.jp/company/" target="_blank" rel="noopener noreferrer">運営会社</a></li>
            <li className={`${styles.footer__cont3Item} hoverEffect`}><a href="/corapura/terms">利用規約・コンテンツの基準</a></li>
            <li className={`${styles.footer__cont3Item} hoverEffect`}><a href="/tokushoho">特定商品取引法に基づく表記</a></li>
            <li className={`${styles.footer__cont3Item} hoverEffect`}><a href="/privacy">プライバシーポリシー</a></li>
            <li className={`${styles.footer__cont3Item} hoverEffect`}><a href="/ad">広告掲載について</a></li>
            <li className={`${styles.footer__cont3Item} hoverEffect`}><a href="/contact">お問い合わせ</a></li>
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