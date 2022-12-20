import styles from '@/styles/liondor/components/header.module.scss'
import Link from 'next/link';
import hLogo from '@/images/liondor/common/h-logo.png'
import Image from 'next/image';
import { Hum, SearchIcon, LoginBtn, PageNavi } from '@/components/liondor'
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth';

const Header = () => {
  const { logout } = useAuth()

  // ハンバーガーメニュー
  const [humOpen, setHumOpen] = useState(false)

  const clickHumOpen = () => {
    setHumOpen((prev) => !prev)
  }

  const clickHumClose = () => {
    setHumOpen(false)
  }
  // ハンバーガーメニュー

  // ヘッダースクロール時のイベント（上下スクロールで隠れたりするやつ）
  const [isHeaderShow, setIsHeaderShow] = useState(true)
  const [lastPosition, setLastPosition] = useState(0)
  const headerHeight = 222

  const scrollEvent = useCallback(() => {
    const offset = window.pageYOffset

    if (offset > headerHeight) {
      setIsHeaderShow(false)
    } else {
      setIsHeaderShow(true)
    }

    if (offset < lastPosition) {
      setIsHeaderShow(true)
    }

    setLastPosition(offset)
  }, [lastPosition])

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent)

    return () => {
      window.removeEventListener('scroll', scrollEvent)
    }
  }, [scrollEvent])
  // ヘッダースクロール時のイベント（上下スクロールで隠れたりするやつ）

  return (
    <header
      className={
        `
          ${styles.pageHeader}
          ${isHeaderShow ? '' : styles.headerHidden}
          ${humOpen ? styles.headerFixed : ''}
        `
      }
    >
      <div className={styles.topArea}>
        <h1>
          <Link href="/liondor">
            <a className={styles.logo}>
              <Image
                src={hLogo}
                alt=""
                layout="responsive"
                sizes="(min-width: 1340px) 300px, 100vw"
                priority
              />
            </a>
          </Link>
        </h1>
        <div className={styles.leftAbs}>
          <Hum humOpen={humOpen} clickHumOpen={clickHumOpen} clickHumClose={clickHumClose} />
          <SearchIcon humOpen={humOpen} />
          <button
            type="button"
            onClick={() => logout()}
          >ログアウト</button>
        </div>
        <div className={styles.rightAbs}>
          <LoginBtn humOpen={humOpen} clickHumClose={clickHumClose} />
        </div>
      </div>
      <div className={styles.bottomArea}>
        <PageNavi />
      </div>
    </header>
  );
}

export default Header;