import styles from '@/styles/liondor/components/humCont.module.scss'
import Link from 'next/link';
import Container from '@/components/liondor/Layouts/container';
import Image from 'next/image';
import corapura from '@/images/liondor/common/corapura_bannar.webp'
import dela from '@/images/liondor/common/della-mall_bannar.webp'
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
              <Link href="/liondor/post/fashion">
                <a className="ivy" onClick={clickHumClose}>Fashion</a>
              </Link>
            </li>
            <li>
              <Link href="/liondor/post/beauty">
                <a className="ivy" onClick={clickHumClose}>Beauty</a>
              </Link>
            </li>
            <li>
              <Link href="/liondor/post/trend">
                <a className="ivy" onClick={clickHumClose}>Trend</a>
              </Link>
            </li>
          </ul>
          <ul className={styles.humUl}>
            <li>
              <Link href="/liondor/post/lifestyle">
                <a className="ivy" onClick={clickHumClose}>Life Style</a>
              </Link>
            </li>
            <li>
              <Link href="/liondor/post/wedding">
                <a className="ivy" onClick={clickHumClose}>Wedding</a>
              </Link>
            </li>
            <li>
              <Link href="/liondor/post/topleader">
                <a className="ivy" onClick={clickHumClose}>Top Leader</a>
              </Link>
            </li>
          </ul>
          <ul className={styles.humUl}>
            <li>
              <Link href="/liondor/post/fortune">
                <a className="ivy" onClick={clickHumClose}>Fortune</a>
              </Link>
            </li>
            <li>
              <Link href="/liondor/post/video">
                <a className="ivy" onClick={clickHumClose}>Video</a>
              </Link>
            </li>
            <li>
              <Link href="/liondor/#pickUp">
                <a className="ivy" onClick={clickHumClose}>Pickup Infomation</a>
              </Link>
            </li>
          </ul>
        </nav>

        <nav className={`${styles.humNav2} ${humOpen ? styles.lazyIn : ''}`}>
          <ul>
            <li>
              <Link href="/liondor/contact">
                <a className="ivy" onClick={clickHumClose}>CONTACT</a>
              </Link>
            </li>
            <div className={styles.hr}></div>
            {/* <li>
              <Link href="/liondor/faq">
                <a className="ivy" onClick={clickHumClose}>FAQ</a>
              </Link>
            </li>
            <div className={styles.hr}></div> */}
            <li>
              <Link href="/liondor/sitemap">
                <a className="ivy" onClick={clickHumClose}>SITE MAP</a>
              </Link>
            </li>
            <div className={styles.hr}></div>
            <li>
              <a href="https://bolides.co.jp/company/" target="_blank" className="ivy" onClick={clickHumClose} rel="noopener noreferrer">COMPANY</a>
            </li>
            <div className={styles.hr}></div>
            <li>
              <Link href="/liondor/registration">
                <a className="ivy" onClick={clickHumClose}>ABOUT LIONDOR</a>
              </Link>
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
              <Link href="/corapura">
                <a target="_blank" rel="noopener noreferrer" onClick={clickHumClose}>
                  <Image
                    src={corapura}
                    alt="CORAPURA"
                    layout="responsive"
                    sizes="(min-width: 1340px) 228px, 100vw"
                  />
                </a>
              </Link>
              <Link href="/dellamall">
                <a target="_blank" rel="noopener noreferrer" onClick={clickHumClose}>
                  <Image
                    src={dela}
                    alt="Della Mall"
                    layout="responsive"
                    sizes="(min-width: 1340px) 228px, 100vw"
                  />
                </a>
              </Link>
            </div>
          </div>
          <div className={styles.bannerFlex}>
            <Link href="/liondor/present">
              <a className="hoverEffect" onClick={clickHumClose}>
                <img src="/liondor/present_banner1.webp" alt="プレゼントのバナー" />
              </a>
            </Link>
            <Link href="/corapura">
              <a className="hoverEffect" target="_blank" onClick={clickHumClose}>
                <img src="/liondor/present_banner2.webp" alt="オンラインサロンのバナー" />
              </a>
            </Link>
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
                      <Link href={`${item.link}${user?.id}`}>
                        <a onClick={clickHumClose}>{item.name}</a>
                      </Link>
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
                      <Link href={item.link}>
                        <a onClick={clickHumClose}>{item.name}</a>
                      </Link>
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