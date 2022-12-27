import styles from '@/styles/top/components/header.module.scss'
import Link from 'next/link';
import { Link as Scroll } from 'react-scroll';
import Container from './Layout/container';

const Header = () => {
  return (
    <header className={styles.header}>
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
            <li className={styles.type1}>
              <Scroll
                to="about"
                smooth={true}
                duration={100}
                offset={-50}
                className="hoverEffect"
              >Bolide's Japanとは？</Scroll>
            </li>
            <li className={styles.type1}>
              <Scroll
                to="plan"
                smooth={true}
                duration={100}
                offset={-50}
                className="hoverEffect"
              >料金プラン</Scroll>
            </li>
            <li className={styles.type1}>
              <Scroll
                to="faq"
                smooth={true}
                duration={100}
                offset={-50}
                className="hoverEffect"
              >よくあるご質問</Scroll>
            </li>
            <li className={styles.type2}>
              <Link href="/">
                <a className={`${styles.btn} hoverEffect`}>
                  <img src="/top/mail-icon.svg" alt="" />
                  お問い合わせ
                </a>
              </Link>
              <Link href="/login">
                <a className={`${styles.btn} ${styles.color1} hoverEffect`}>
                  <img src="" alt="" />
                  ログイン
                </a>
              </Link>
              <Link href="/register">
                <a className={`${styles.btn} ${styles.color2} hoverEffect`}>
                  <img src="/top/registar-icon.svg" alt="" />
                  会員登録
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </header>
  );
}

export default Header;