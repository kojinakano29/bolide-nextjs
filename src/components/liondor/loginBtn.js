import styles from '@/styles/liondor/components/loginBtn.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

const LoginBtn = ({humOpen}) => {
  return (
    <div className={`${styles.iconBox} ${humOpen ? styles.open : ''}`}>
      <p className="en">Login</p>
      <FontAwesomeIcon
        icon={faCircleUser}
        style={humOpen ? {color: "#fff"} : {color: "#000"}}
      />
    </div>
  );
}

export default LoginBtn;