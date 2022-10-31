import styles from '@/styles/liondor/components/humCont.module.scss'
import Link from 'next/link';
import Container from '@/components/liondor/Layouts/container';
import Image from 'next/image';
import corapura from '@/images/liondor/common/corapura_bannar.png'
import dela from '@/images/liondor/common/della-mall_bannar.png'
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
              <Link href="/">
                <a className="ivy" onClick={clickHumClose}>CONTACT</a>
              </Link>
            </li>
            <div className={styles.hr}></div>
            <li>
              <Link href="/">
                <a className="ivy" onClick={clickHumClose}>FAQ</a>
              </Link>
            </li>
            <div className={styles.hr}></div>
            <li>
              <Link href="/">
                <a className="ivy" onClick={clickHumClose}>SITE MAP</a>
              </Link>
            </li>
            <div className={styles.hr}></div>
            <li>
              <Link href="/">
                <a className="ivy" onClick={clickHumClose}>COMPANY</a>
              </Link>
            </li>
            <div className={styles.hr}></div>
            <li>
              <Link href="/">
                <a className="ivy" onClick={clickHumClose}>ABOUT LIONDOR</a>
              </Link>
            </li>
          </ul>
        </nav>

        <div className={`${styles.flex} ${humOpen ? styles.lazyIn : ''}`}>
          <div className={styles.left}>
            <p className="ivy">Bolid's Japan Other Site</p>
            <div className={styles.bannarBox}>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <Image
                  src={corapura}
                  alt=""
                  layout="responsive"
                  sizes="(min-width: 1340px) 228px, 100vw"
                />
              </a>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <Image
                  src={dela}
                  alt=""
                  layout="responsive"
                  sizes="(min-width: 1340px) 228px, 100vw"
                />
              </a>
            </div>
          </div>
          <div className={styles.right}>
            <SnsFollow right />
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