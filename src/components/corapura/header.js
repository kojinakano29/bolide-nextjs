import styles from '@/styles/corapura/components/header.module.scss'
import Link from 'next/link';
import { useCallback, useState } from 'react';
import logo from '@/images/corapura/common/logo.svg'
import login from '@/images/corapura/header/login.svg'
import signUp from '@/images/corapura/header/signUp.svg'
import bookmark from '@/images/corapura/header/bookmark.svg'
import mypage from '@/images/corapura/header/mypage.svg'
import { useAuth } from '@/hooks/auth';

const Header = () => {
  const { user } = useAuth()
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
                <img src={logo.src} alt="CORAPURA" />
              </a>
            </Link>
          </h1>
        </div>
        {!user ?
          <div className={styles.right}>
            <Link href="/corapura/login">
              <a className={`${styles.btn} ${styles.login} hoverEffect`}>
                <div className={styles.iconBox}>
                  <img src={login.src} alt="" />
                </div>
                <span className="pc">ログイン</span>
              </a>
            </Link>
            <Link href="/register">
              <a className={`${styles.btn} ${styles.signUp} hoverEffect`}>
                <div className={styles.iconBox}>
                  <img src={signUp.src} alt="" />
                </div>
                <span className="pc">新規登録</span>
              </a>
            </Link>
          </div>
        :
          <div className={styles.right}>
            <Link href={`/corapura/company/matter/bookmark/${user?.id}`}>
              <a className={`${styles.btn} ${styles.bookmark} hoverEffect`}>
                <div className={styles.iconBox}>
                  <img src={bookmark.src} alt="" />
                </div>
                <span className="pc">お気に入りリスト</span>
              </a>
            </Link>
            <Link href={`/corapura/editor`}>
              <a className={`${styles.btn} ${styles.mypage} hoverEffect`}>
                <div className={styles.iconBox}>
                  <img src={mypage.src} alt="" />
                </div>
                <span className="pc">マイページ</span>
              </a>
            </Link>
          </div>
        }
      </div>

      <div
        className={`${styles.hum__container} ${humOpen ? styles.is_active : null}`}
        onClick={handleClickHum}
      ></div>

      <ul
        className={`${styles.hum__container_list} ${humOpen ? styles.is_active : null}`}
        onClick={(e) => e.stopPropagation()}
      >
        <li>
          <Link href="/corapura/company/matter">
            <a onClick={handleClickHum}>
              <p className={styles.jp}>案件一覧</p>
              <p className={`en ${styles.en}`}>Project List</p>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/corapura/company">
            <a onClick={handleClickHum}>
              <p className={styles.jp}>企業一覧</p>
              <p className={`en ${styles.en}`}>Company List</p>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/corapura/influencer">
            <a onClick={handleClickHum}>
              <p className={styles.jp}>インフルエンサー/ユーザー一覧</p>
              <p className={`en ${styles.en}`}>Influencer User List</p>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/corapura/salon">
            <a onClick={handleClickHum}>
              <p className={styles.jp}>オンラインサロン一覧</p>
              <p className={`en ${styles.en}`}>Online Salon List</p>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/corapura/press_release">
            <a onClick={handleClickHum}>
              <p className={styles.jp}>プレスリリース一覧</p>
              <p className={`en ${styles.en}`}>Press Releases List</p>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/corapura/guide">
            <a onClick={handleClickHum}>
              <p className={styles.jp}>CORAPURAとは？</p>
              <p className={`en ${styles.en}`}>About Of CORAPURA</p>
            </a>
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;