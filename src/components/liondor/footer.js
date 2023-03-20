import styles from '@/styles/liondor/components/footer.module.scss'
import Link from 'next/link';
import Container from '@/components/liondor/Layouts/container';
import Image from 'next/image';
import { SnsFollow, PageNavi } from '@/components/liondor'
import { bannarData } from '@/lib/liondor/constants';

const Footer = () => {
  return (
    <>
      <article className={styles.bannarArea}>
        <Container>
          <p className="ivy">Bolide's Japan Other Site</p>
          <div className={styles.bannarFlex}>
            {bannarData.map((items, index) => (
              <a href={items.link} key={index} className={styles.bannarLink} target="_blank" rel="noopener noreferrer">
                <Image
                  src={items.src}
                  alt=""
                  layout="responsive"
                  sizes="(min-width: 1340px) 274px, (min-width: 768px) 180px, 100vw"
                  priority
                />
              </a>
            ))}
          </div>
        </Container>
      </article>

      <footer className={styles.pageFooter}>
        <Container>
          <div className={styles.topArea}>
            <div className={styles.left}>
              <Link href="/liondor">
                <a className={styles.logo}>
                  <span className={`ivy ${styles.big}`}>Liondor</span>
                  <span className={`ivy ${styles.small}`}>CREATED BY Bolide's Japan</span>
                </a>
              </Link>
              <SnsFollow />
            </div>
            <div className={styles.right}>
              <PageNavi white />
              <div className={styles.rightBox}>
                <div className={styles.bannerFlex}>
                  <Link href="/liondor/present">
                    <a className="hoverEffect">
                      <img src="/liondor/present_banner1.webp" alt="" />
                    </a>
                  </Link>
                  <Link href="/corapura">
                    <a className="hoverEffect" target="_blank">
                      <img src="/liondor/present_banner2.webp" alt="" />
                    </a>
                  </Link>
                </div>
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
          </div>

          <div className={styles.bottomArea}>
            <nav className={styles.bottomLeft}>
              <a href="https://bolides.co.jp/company/" target="_blank">運営会社</a>
              <Link href="/liondor/copyright">
                <a>著作権・免責事項について</a>
              </Link>
              <Link href="/privacy">
                <a>プライバシーポリシー</a>
              </Link>
              <Link href="/liondor/terms">
                <a>利用規約</a>
              </Link>
              <Link href="/tokushoho">
                <a>特定商取引法に基づく表示</a>
              </Link>
              <Link href="/liondor/sitemap">
                <a>サイトマップ</a>
              </Link>
              {/* <Link href="/liondor/faq">
                <a>FAQ</a>
              </Link> */}
              <Link href="/ad">
                <a>広告掲載について</a>
              </Link>
              <Link href="/liondor/contact?check=present">
                <a>企業からのプレゼント募集</a>
              </Link>
              <Link href="/liondor/registration">
                <a>リオンドールについて</a>
              </Link>
              <Link href="/liondor/contact">
                <a>お問い合わせ</a>
              </Link>
            </nav>
            <p className={`en ${styles.copy}`}>© 2023 Liondor Inc.</p>
          </div>
        </Container>
      </footer>
    </>
  );
}

export default Footer;