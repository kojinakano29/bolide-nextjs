import styles from '@/styles/corapura/components/header.module.scss'
import Link from 'next/link';
import { useCallback, useState } from 'react';
import Image from 'next/image';
import logo from '@/images/corapura/common/logo.svg'
import login from '@/images/corapura/header/login.svg'
import login_sp from '@/images/corapura/header/login__sp.svg'

const Header = () => {
  const [humOpen, setHumOpen] = useState(false)

  const handleClickHum = useCallback(async () => {
    setHumOpen(prevState => !prevState)
  }, [setHumOpen])

  return (
    <header className={styles.header}>
      <div className={styles.flex}>
        <div className={styles.left}>
          <button
            type="button"
            className={`${styles.humBtn} ${humOpen ? styles.is_active : null}`}
            onClick={handleClickHum}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <h1>
            <Link href="/corapura">
              <a className="hoverEffect">
                <Image
                  src={logo}
                  alt="CORAPURA"
                  layout="responsive"
                  sizes="160px"
                  priority
                />
              </a>
            </Link>
          </h1>
        </div>
        <div className={styles.right}>
          <Link href="/corapura/login">
            <a className={`${styles.btn} ${styles.login} hoverEffect`}>
              <div className={styles.iconBox}>
                <Image
                  src={login}
                  alt="ログイン"
                  layout="responsive"
                  sizes="16px"
                  priority
                />
              </div>
              <span className="pc">ログイン</span>
            </a>
          </Link>
          <Link href="/register">
            <a className={`${styles.btn} ${styles.signUp} hoverEffect`}>
              <div className={styles.iconBox}>
                <Image
                  src={login}
                  alt="新規登録"
                  layout="responsive"
                  sizes="16px"
                  priority
                />
              </div>
              <span className="pc">新規登録</span>
            </a>
          </Link>
          {/* <li className="header__item signUp">
            <img className="pc" src="./assets/images/header/signUp.svg" alt="新規登録" />
            <img className="sp" src="./assets/images/header/signUp__sp.svg" alt="新規登録" />
            <p className="pc">新規登録</p>
          </li> */}
        </div>
      </div>
    </header>
  );
}

export default Header;

<div className="ham__container"></div>


        {/* <!-- is-active付与でメニュー展開 --> */}
        <ul className="ham__container_list">
          <li>
            <a href="">
              案件一覧
              <p>Project List</p>
            </a>
          </li>
          <li>
            <a href="">
              企業一覧
              <p>Company List</p>
            </a>
          </li>
          <li>
            <a href="">
              インフルエンサー/ユーザー一覧
              <p>Influencer User List</p>
            </a>
          </li>
          <li>
            <a href="">
              オンラインサロン一覧
              <p>Online Salon List</p>
            </a>
          </li>
          <li>
            <a href="">
              プレスリリース一覧
              <p>Press Releases List</p>
            </a>
          </li>
          <li>
            <a href="">
              CORAPURAとは？
              <p>About Of CORAPURA</p>
            </a>
          </li>
        </ul>
