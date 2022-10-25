import styles from '@/styles/liondor/components/loginBtn.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';
import { useAuth } from '@/hooks/auth';

const LoginBtn = ({humOpen}) => {
  const { user } = useAuth()

  return (
    <Link href={`/liondor/${user ? `mypage/edit/${user.l_profile_id}` : "login"}`}>
      <a className={`${styles.iconBox} ${humOpen ? styles.open : ''}`}>
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