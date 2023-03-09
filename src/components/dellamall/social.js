import { socialNetworkingServiceIcons } from '@/lib/dellamall/constants';
import styles from '@/styles/dellamall/components/shopDetailArea.module.scss'

const Social = ({socials, salon}) => {
  // console.log(socials)
  // console.log(salon)

  return (
    <div className={styles.cont1__flexRight__bottom}>
      <p>公式SNS</p>
      {socials.length !== 0 || salon ?
        <ul>
          {socials.map((social, index) => (
            <li className={styles.socialList} key={index}>
              <a className="hoverEffect" href={social.link} target="_blank" rel="noopener noreferrer">
                <img src={socialNetworkingServiceIcons[social.name]} alt="" />
              </a>
            </li>
          ))}
          {salon ?
            <li className={styles.salonList}>
              <a href={`/corapura/salon/${salon.id}`} className="hoverEffect">オンラインサロン</a>
            </li>
          : null}
        </ul>
        :
        <p className={styles.noneSocial}>公式SNSがありません</p>
      }
    </div>
  );
}

export default Social;