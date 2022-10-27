import styles from '@/styles/liondor/components/loginBtn.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';
import { useAuth } from '@/hooks/auth';
import { useEffect, useState } from 'react';

const LoginBtn = ({humOpen, clickHumClose}) => {
  const { user } = useAuth()
  const [link, setLink] = useState()

  useEffect(() => {
    if (user?.l_profile_id) {
      setLink(`mypage/edit/${user?.l_profile_id}`)
    } else if (user) {
      setLink("mypage/create")
    } else {
      setLink("login")
    }
  }, [user])

  return (
    <Link href={`/liondor/${link}`}>
      <a className={`${styles.iconBox} ${humOpen ? styles.open : ''}`} onClick={clickHumClose}>
        <p className="en">{user ? "Mypage" : "Login"}</p>
        <FontAwesomeIcon
          icon={faCircleUser}
          style={humOpen ? {color: "#fff"} : {color: "#000"}}
        />
      </a>
    </Link>
  );
}

export default LoginBtn;