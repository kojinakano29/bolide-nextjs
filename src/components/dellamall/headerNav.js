import styles from '@/styles/dellamall/components/headerNav.module.scss'
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faQuestion } from '@fortawesome/free-solid-svg-icons'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import { useAuth } from '@/hooks/auth';
import { useCallback, useState } from 'react';
import { NewShop } from '@/components/dellamall';


const HeaderNav = () => {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)

  const handleClickOpen = useCallback(async () => {
    setOpen(prevState => !prevState)
  }, [setOpen])

  return (
    <>
      <div className={styles.flex}>
        <button className={`${styles.btn1} hoverEffect`} onClick={handleClickOpen}>
          <img src="/dellamall/news.svg" alt="メガホンのアイコン" />
        </button>
        <Link href={user ? `/dellamall/mypage/${user?.id}?state=4` : "/dellamall/login"}>
          <a className={`${styles.btn1} hoverEffect`}>
            <FontAwesomeIcon icon={faBookmark} />
          </a>
        </Link>
        <Link href={`/dellamall/guide`}>
          <a className={`${styles.btn1} hoverEffect`}>
            <FontAwesomeIcon icon={faQuestion} />
          </a>
        </Link>
        <Link href="/dellamall/admin/shop/create">
          <a className={`${styles.btn2} hoverEffect`}>
            <img src="/dellamall/make.svg" alt="ショップを作るのアイコン" />
            <span className="pc">ショップを作る</span>
          </a>
        </Link>
        <Link href={`/dellamall/${user ? `mypage/${user?.id}` : 'login'}`}>
          <a className={`${styles.btn2} ${styles.rev} hoverEffect`}>
            <FontAwesomeIcon icon={faCircleUser} />
            <span className="pc">{user ? "マイページ" : "ログイン"}</span>
          </a>
        </Link>
      </div>

      {open ?
        <NewShop handleClickOpen={handleClickOpen} />
      : null}
    </>
  );
}

export default HeaderNav;