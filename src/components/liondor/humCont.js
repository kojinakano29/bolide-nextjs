import styles from '@/styles/liondor/components/humCont.module.scss'
import Container from '@/components/liondor/Layouts/container';
import Image from 'next/image';
import bolide from '@/images/liondor/common/bolide_banner.svg'
import marche from '@/images/liondor/common/marchedor_banner.svg'
import corapura from '@/images/liondor/common/corapura_bannar.svg'
import dela from '@/images/liondor/common/della-mall_bannar.svg'
import { SnsFollow } from '@/components/liondor'
import { editorNaviData } from '@/lib/liondor/constants';
import { adminNaviData } from '@/lib/liondor/constants';
import { useAuth } from '@/hooks/auth';

const HumCont = ({humOpen, clickHumClose}) => {
  const { user } = useAuth()

  return (
    <div className={`${styles.humBox} ${humOpen ? styles.slideIn : ''}`}>
      <Container>
        <nav className={`${styles.humNav} ${humOpen ? styles.lazyIn : ''}`}>
          <ul className={styles.humUl}>
            <li>
              <a href="/liondor/post/fashion" className="ivy" onClick={clickHumClose}>Fashion</a>
            </li>
            <li>
              <a href="/liondor/post/beauty" className="ivy" onClick={clickHumClose}>Beauty</a>
            </li>
            <li>
              <a href="/liondor/post/trend" className="ivy" onClick={clickHumClose}>Trend</a>
            </li>
          </ul>
          <ul className={styles.humUl}>
            <li>
              <a href="/liondor/post/lifestyle" className="ivy" onClick={clickHumClose}>Life Style</a>
            </li>
            <li>
              <a href="/liondor/post/wedding" className="ivy" onClick={clickHumClose}>Wedding</a>
            </li>
            <li>
              <a href="/liondor/post/topleader" className="ivy" onClick={clickHumClose}>Top Leader</a>
            </li>
          </ul>
          <ul className={styles.humUl}>
            <li>
              <a href="/liondor/post/fortune" className="ivy" onClick={clickHumClose}>Fortune</a>
            </li>
            <li>
              <a href="/liondor/post/video" className="ivy" onClick={clickHumClose}>Video</a>
            </li>
            <li>
              <a href="/liondor/#pickUp" className="ivy" onClick={clickHumClose}>Pickup Infomation</a>
            </li>
          </ul>
        </nav>

        <nav className={`${styles.humNav2} ${humOpen ? styles.lazyIn : ''}`}>
          <ul>
            <li>
              <a href="/liondor/contact" className="ivy" onClick={clickHumClose}>CONTACT</a>
            </li>
            <div className={styles.hr}></div>
            {/* <li>
              <a href="/liondor/faq" className="ivy" onClick={clickHumClose}>FAQ</a>
            </li>
            <div className={styles.hr}></div> */}
            <li>
              <a href="/liondor/sitemap" className="ivy" onClick={clickHumClose}>SITE MAP</a>
            </li>
            <div className={styles.hr}></div>
            <li>
              <a href="https://bolides.co.jp/company/" target="_blank" className="ivy" onClick={clickHumClose} rel="noopener noreferrer">COMPANY</a>
            </li>
            <div className={styles.hr}></div>
            <li>
              <a href="/liondor/registration" className="ivy" onClick={clickHumClose}>ABOUT LIONDOR</a>
            </li>
          </ul>
        </nav>

        <nav className={`${styles.humNav2} ${humOpen ? styles.lazyIn : ''}`}>
          <ul>
            <li>
              <a href="/liondor/contact?check=present" className={styles.jp} onClick={clickHumClose}>企業からのプレゼント募集</a>
            </li>
            <div className={styles.hr}></div>
            <li>
              <a href="/ad" className={styles.jp} onClick={clickHumClose}>媒体資料・広告掲載について</a>
            </li>
          </ul>
        </nav>

        <div className={`${styles.flex} ${humOpen ? styles.lazyIn : ''}`}>
          <div className={styles.left}>
            <div className={styles.snsCover}>
              <SnsFollow />
            </div>
            <p className="ivy">Bolid's Japan Other Site</p>
            <div className={styles.bannarBox}>
              <a href="/" target="_blank" rel="noopener noreferrer" onClick={clickHumClose}>
                <Image
                  src={bolide}
                  alt="Bolide's Japan"
                  layout="responsive"
                  sizes="(min-width: 1340px) 228px, 100vw"
                />
              </a>
              <a href="https://marche-dor.jp/" target="_blank" rel="noopener noreferrer" onClick={clickHumClose}>
                <Image
                  src={marche}
                  alt="marche dor"
                  layout="responsive"
                  sizes="(min-width: 1340px) 228px, 100vw"
                />
              </a>
            </div>
            <div className={styles.bannarBox}>
              <a href="/corapura" target="_blank" rel="noopener noreferrer" onClick={clickHumClose}>
                <Image
                  src={corapura}
                  alt="CORAPURA"
                  layout="responsive"
                  sizes="(min-width: 1340px) 228px, 100vw"
                />
              </a>
              <a href="/dellamall" target="_blank" rel="noopener noreferrer" onClick={clickHumClose}>
                <Image
                  src={dela}
                  alt="Della Mall"
                  layout="responsive"
                  sizes="(min-width: 1340px) 228px, 100vw"
                />
              </a>
            </div>
          </div>
          <div className={styles.bannerFlex}>
            <a href="/liondor/present" className="hoverEffect" onClick={clickHumClose}>
              <img src="/liondor/present_banner1.webp" alt="プレゼントのバナー" />
            </a>
            <a href="/corapura" className="hoverEffect" target="_blank" onClick={clickHumClose}>
              <img src="/liondor/present_banner2.webp" alt="オンラインサロンのバナー" />
            </a>
          </div>
        </div>

        {
          user?.account_type > 1 ?
          <div className={`${styles.userBox} ${humOpen ? styles.lazyIn : ''}`}>
            <h3>編集者</h3>
            <nav>
              <ul>
                {
                  editorNaviData.map((item, index) => (
                    <li key={index}>
                      <a href={`${item.link}${index === 0 ? user?.id : ''}`} onClick={clickHumClose}>{item.name}</a>
                    </li>
                  ))
                }
              </ul>
            </nav>
          </div>
          : null
        }

        {
          user?.account_type > 2 ?
          <div className={`${styles.userBox} ${humOpen ? styles.lazyIn : ''}`}>
            <h3>管理者</h3>
            <nav>
              <ul>
                {
                  adminNaviData.map((item, index) => (
                    <li key={index}>
                      <a href={item.link} onClick={clickHumClose}>{item.name}</a>
                    </li>
                  ))
                }
              </ul>
            </nav>
          </div>
          : null
        }
      </Container>
    </div>
  );
}

export default HumCont;