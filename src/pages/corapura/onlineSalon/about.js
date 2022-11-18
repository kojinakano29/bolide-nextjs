import styles from '@/styles/corapura/components/onlineSalonAbout.module.scss'
import PageLayoutCorapura from "@/components/Layouts/pageLayoutCorapura";
import Container from '@/components/corapura/Layout/container';
import { Faq } from '@/components/corapura'
import method1 from '@/images/corapura/openOnlineSalon/cont2_img1.webp'
import method2 from '@/images/corapura/openOnlineSalon/cont2_img2.webp'
import method3 from '@/images/corapura/openOnlineSalon/cont2_img3.webp'
import method4 from '@/images/corapura/openOnlineSalon/cont2_img4.webp'
import { faqSalon } from '@/lib/corapura/constants';

const OnlineSalonAbout = () => {
  return (
    <>
      <section className="cont1">
        <Container small>
          <h2 className="ttl1">
            <span>オンラインサロン</span>
            とは？
          </h2>
          <p className={styles.desc}>
            知識・ノウハウの発信や、趣味の交流で多くの人々と繋がれる
            <br/>コミュニティです。ホストにも、リスナーにもなれるコラプラの
            <br/>オンラインサロンで自由なコラボを楽しみましょう！
          </p>
        </Container>
      </section>

      <section className={styles.methodArea}>
        <Container small>
          <h3 className={styles.ttl}>ご利用方法</h3>
          <ul className={styles.list}>
            <li>
              <div className={styles.imgBox}>
                <img src={method1.src} alt="会員登録" />
              </div>
              <div className={styles.item_num}><span>1.</span>会員登録</div>
              <p>
                BolideJapanへの会員登録がお済でない方は、まずは会員登録をしてください。
              </p>
            </li>
            <li>
              <div className={styles.imgBox}>
                <img src={method2.src} alt="マイページ作成" />
              </div>
              <div className={styles.item_num}><span>2.</span>マイページ作成</div>
              <p>
                登録後あなたのマイページを登録しましょう
              </p>
            </li>
            <li>
              <div className={styles.imgBox}>
                <img src={method3.src} alt="サロン投稿" />
              </div>
              <div className={styles.item_num}><span>3.</span>サロン投稿</div>
              <p>
                マイページ内でサロン投稿ができます！投稿記事を書いて発信しましょう。
              </p>
            </li>
            <li>
              <div className={styles.imgBox}>
                <img src={method4.src} alt="サロン開催" />
              </div>
              <div className={styles.item_num}><span>4.</span>サロン開催</div>
              <p>
                あとは参加者を募って、開催を行うだけ！たくさんの方々との交流を楽しんでくださいね。
              </p>
            </li>
          </ul>
        </Container>
      </section>

      <section className={styles.faqArea}>
        <Faq faqs={faqSalon} />
      </section>
    </>
  );
}

export default OnlineSalonAbout;

OnlineSalonAbout.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}