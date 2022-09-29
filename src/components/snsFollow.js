import styles from '@/styles/components/snsFollow.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import Image from 'next/image';
import line from '@/images/common/line.svg'

const SnsFollow = ({right = false}) => {
  return (
    <div className={styles.followBox}>
      <p className={`en ${right ? styles.textRight : ''}`}>FOLLOW US</p>
      <div className={styles.flex}>
        <a href="/" target="_blank">
          <FontAwesomeIcon
            icon={faFacebookF}
            style={{color: "#fff"}}
          />
        </a>
        <a href="/" target="_blank">
          <FontAwesomeIcon
            icon={faInstagram}
            style={{color: "#fff"}}
          />
        </a>
        <a href="/" target="_blank">
          <FontAwesomeIcon
            icon={faTwitter}
            style={{color: "#fff"}}
          />
        </a>
        <a href="/" target="_blank">
          <span>
            <Image
              src={line}
              alt=""
              layout="responsive"
              sizes="28px"
            />
          </span>
        </a>
        <a href="/" target="_blank">
          <FontAwesomeIcon
            icon={faYoutube}
            style={{color: "#fff"}}
          />
        </a>
      </div>
    </div>
  );
}

export default SnsFollow;