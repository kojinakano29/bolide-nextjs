import styles from '@/styles/dellamall/components/headerNav.module.scss'
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBookmark, faQuestion } from '@fortawesome/free-solid-svg-icons'
import { faSquarePlus, faCircleUser } from '@fortawesome/free-regular-svg-icons'
import { useAuth } from '@/hooks/auth';


const HeaderNav = () => {
  const { user } = useAuth()

  return (
    <div className={styles.flex}>
      <button className={`${styles.btn1} hoverEffect`}>
        <FontAwesomeIcon icon={faBell} />
      </button>
      <button className={`${styles.btn1} hoverEffect`}>
        <FontAwesomeIcon icon={faBookmark} />
      </button>
      <button className={`${styles.btn1} hoverEffect`}>
        <FontAwesomeIcon icon={faQuestion} />
      </button>
      <Link href="/">
        <a className={`${styles.btn2} hoverEffect`}>
          <FontAwesomeIcon icon={faSquarePlus} />
          <span className="pc">ショップを作る</span>
        </a>
      </Link>
      <Link href={`dellamall/${user ? `mypage/${user?.id}` : 'login'}`}>
        <a className={`${styles.btn2} ${styles.rev} hoverEffect`}>
          <FontAwesomeIcon icon={faCircleUser} />
          <span className="pc">マイページ</span>
        </a>
      </Link>
    </div>
  );
}

export default HeaderNav;