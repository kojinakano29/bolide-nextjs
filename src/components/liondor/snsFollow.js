import styles from '@/styles/liondor/components/snsFollow.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faTwitter, faLine, faYoutube } from '@fortawesome/free-brands-svg-icons'

const SnsFollow = ({right = false, gray = false}) => {
  return (
    <div className={styles.followBox}>
      <p className={`en ${right ? styles.textRight : ''}`}>FOLLOW US</p>
      <div className={`${styles.flex} ${gray ? styles.gray : ''}`}>
        <a href="/" target="_blank">
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
        <a href="/" target="_blank">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="/" target="_blank">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="/" target="_blank">
          <FontAwesomeIcon icon={faLine} />
        </a>
        <a href="/" target="_blank">
          <FontAwesomeIcon icon={faYoutube} />
        </a>
      </div>
    </div>
  );
}

export default SnsFollow;