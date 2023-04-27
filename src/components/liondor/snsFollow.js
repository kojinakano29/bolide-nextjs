import styles from '@/styles/liondor/components/snsFollow.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faTwitter, faLine, faYoutube } from '@fortawesome/free-brands-svg-icons'

const SnsFollow = ({right = false, gray = false}) => {
  return (
    <div className={styles.followBox}>
      <p className={`en ${right ? styles.textRight : ''}`}>FOLLOW US</p>
      <div className={`${styles.flex} ${gray ? styles.gray : ''}`}>
        <a href="https://www.facebook.com/liondor.bj" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
        <a href="https://www.instagram.com/liondor_bj/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://twitter.com/liondor_bj" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        {/* <a href="/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLine} />
        </a>
        <a href="/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faYoutube} />
        </a> */}
      </div>
    </div>
  );
}

export default SnsFollow;