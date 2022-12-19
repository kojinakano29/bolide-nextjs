import { socialNetworkingServiceIcons } from '@/lib/dellamall/constants';
import styles from '@/styles/dellamall/components/shopDetailArea.module.scss'

const Social = ({socials}) => {
  return (
    <div className={styles.cont1__flexRight__bottom}>
      <p>公式SNS</p>
      <ul>
        {socials.map((social, index) => (
          <li key={index}>
            <a className="hoverEffect" href={social.link} target="_blank" rel="noopener noreferrer">
              <img src={socialNetworkingServiceIcons[social.name]} alt="" />
            </a>
          </li>
        ))}
        <a className={`${styles.salon} hoverEffect`}>オンラインサロン</a>
      </ul>
    </div>
  );
}

export default Social;