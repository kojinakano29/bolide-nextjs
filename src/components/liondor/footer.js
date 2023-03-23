import styles from '@/styles/liondor/components/footer.module.scss'
import Container from '@/components/liondor/Layouts/container';
import Image from 'next/image';
import { SnsFollow, PageNavi } from '@/components/liondor'
import { bannarData } from '@/lib/liondor/constants';

const Footer = () => {
  return (
    <>
      <article className={styles.bannarArea}>
        <Container>
          <p className="ivy">Bolide's Japan Other Sites</p>
          <div className={styles.bannarFlex}>
            {bannarData.map((items, index) => (
              <a href={items.link} key={index} className={styles.bannarLink} target="_blank" rel="noopener noreferrer">
                <Image
                  src={items.src}
                  alt={`バナー画像${index+1}`}
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
              <a href="/liondor" className={styles.logo}>
                <span className={`ivy ${styles.big}`}>LIONDOR</span>
                <span className={`ivy ${styles.small}`}>CREATED BY Bolide's Japan</span>
              </a>
              <SnsFollow />
            </div>
            <div className={styles.right}>
              <PageNavi white footer />
              <div className={styles.rightBox}>
                <div className={styles.bannerFlex}>
                  <a href="/liondor/present" className="hoverEffect">
                    <img src="/liondor/present_banner1.webp" alt="プレゼントのバナー" />
                  </a>
                  <a href="/corapura" className="hoverEffect" target="_blank">
                    <img src="/liondor/present_banner2.webp" alt="オンラインサロンのバナー" />
                  </a>
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
              {/* <a href="/liondor/copyright">著作権・免責事項について</a> */}
              <a href="/privacy">プライバシーポリシー</a>
              <a href="/liondor/terms">利用規約</a>
              <a href="/tokushoho">特定商取引法に基づく表示</a>
              <a href="/liondor/sitemap">サイトマップ</a>
              <a href="/liondor/faq">FAQ</a>
              <a href="/ad">広告掲載について</a>
              <a href="/liondor/contact?check=present">企業からのプレゼント募集</a>
              <a href="/liondor/registration">リオンドールについて</a>
              <a href="/liondor/contact">お問い合わせ</a>
            </nav>
            <p className={`en ${styles.copy}`}>© 2023 LIONDOR Inc.</p>
          </div>
        </Container>
      </footer>
    </>
  );
}

export default Footer;