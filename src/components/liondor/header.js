import styles from '@/styles/liondor/components/header.module.scss'
import Link from 'next/link';
import hLogo from '@/images/liondor/common/h-logo.svg'
import Image from 'next/image';
import { Hum, SearchIcon, LoginBtn, PageNavi } from '@/components/liondor'
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (user && !user?.l_profile_id) {
      router.push('/liondor/mypage/create')
    }
  }, [user, router.asPath])

  // ハンバーガーメニュー
  const [humOpen, setHumOpen] = useState(false)

  const clickHumOpen = () => {
    setHumOpen((prev) => !prev)

    if (!humOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.height = '100vh'
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.height = 'unset'
    }
  }

  const clickHumClose = () => {
    setHumOpen(false)

    document.body.style.overflow = 'unset'
    document.body.style.height = 'unset'
  }
  // ハンバーガーメニュー

  // ヘッダースクロール時のイベント（上下スクロールで隠れたりするやつ）
  const [isHeaderShow, setIsHeaderShow] = useState(true)
  const [lastPosition, setLastPosition] = useState(0)
  const headerHeight = 178

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
          ${
            router.route === "/liondor/post/create" ||
            router.route === `/liondor/post/edit/[id]`
            ? styles.stickyNone : ''
          }
        `
      }
    >
      <div className={styles.topArea}>
        <h1>
          <Link href="/liondor">
            <a className={styles.logo}>
              <Image
                src={hLogo}
                alt="LIONDOR"
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