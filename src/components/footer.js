import styles from '@/styles/components/footer.module.scss'
import Link from 'next/link';
import Container from '@/components/Layouts/container';
import Image from 'next/image';
import { SnsFollow, PageNavi } from '@/components'
import { bannarData } from '@/lib/constants';

const Footer = () => {
  return (
    <>
      <article className={styles.bannarArea}>
        <p className="ivy">Bolid's Japan Other Site</p>
        <div className={styles.bannarFlex}>
          {bannarData.map((items, index) => (
            <Link href={items.link} key={index}>
              <a className={styles.bannarLink}>
                <Image
                  src={items.src}
                  alt=""
                  layout="responsive"
                  sizes="(min-width: 1340px) 274px, (min-width: 768px) 180px, 100vw"
                  priority
                />
              </a>
            </Link>
          ))}
        </div>
      </article>

      <footer className={styles.pageFooter}>
        <Container>
          <div className={styles.topArea}>
            <div className={styles.left}>
              <Link href="/">
                <a className={styles.logo}>
                  <span className={`ivy ${styles.big}`}>Liondor</span>
                  <span className={`ivy ${styles.small}`}>CREATED BY Bolide's Japan</span>
                </a>
              </Link>
              <SnsFollow />
            </div>
            <div className={styles.right}>
              <PageNavi white />
              <p className={styles.privacy}>
                このサイトはrecapthaによって保護されており、
                <br/>Googleの
                <a href="https://policies.google.com/privacy?hl=ja" target="_blank">プライバシーポリシー</a>
                と
                <a href="https://policies.google.com/terms?hl=ja" target="_blank">利用規約</a>
                が適応されます。
              </p>
            </div>
          </div>

          <div className={styles.bottomArea}>
            <nav className={styles.bottomLeft}>
              <a href="/">運営会社</a>
              <Link href="/">
                <a>著作権・免責事項について</a>
              </Link>
              <Link href="/">
                <a>プライバシーポリシー</a>
              </Link>
              <Link href="/">
                <a>サイトマップ</a>
              </Link>
              <Link href="/">
                <a>FAQ</a>
              </Link>
              <Link href="/">
                <a>広告掲載について</a>
              </Link>
              <Link href="/">
                <a>企業からのプレゼント募集</a>
              </Link>
              <Link href="/">
                <a>リオンドールについて</a>
              </Link>
              <Link href="/">
                <a>お問い合わせ</a>
              </Link>
            </nav>
            <p className={`en ${styles.copy}`}>© 2022 Liondor Inc.</p>
          </div>
        </Container>
      </footer>
    </>
  );
}

export default Footer;