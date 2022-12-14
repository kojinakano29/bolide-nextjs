import styles from '@/styles/dellamall/components/headerNav.module.scss'
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBookmark, faQuestion } from '@fortawesome/free-solid-svg-icons'
import { faSquarePlus, faCircleUser } from '@fortawesome/free-regular-svg-icons'
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
          <FontAwesomeIcon icon={faBell} />
        </button>
        <Link href={`/dellamall/mypage/${user?.id}?state=4`}>
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
            <FontAwesomeIcon icon={faSquarePlus} />
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