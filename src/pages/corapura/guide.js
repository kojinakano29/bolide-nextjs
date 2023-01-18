import styles from '@/styles/corapura/components/guide.module.scss'
import PageLayoutCorapura from "@/components/Layouts/pageLayoutCorapura";
import { Btn, Faq, Merit, Method } from '@/components/corapura';
import Container from '@/components/corapura/Layout/container';
import worries1 from '@/images/corapura/use/trouble1.svg'
import worries2 from '@/images/corapura/use/trouble2.svg'
import worries3 from '@/images/corapura/use/trouble3.svg'
import { faqCorapura } from '@/lib/corapura/constants';

const GuideCorapura = () => {
  return (
    <>
      <section className="cont1">
        <h2 className="ttl1">
          <span className="en">CORAPURA</span>
          とは？
        </h2>
        <p className={styles.desc}>
          Collaboration+Plusで組み合わせ、
          <br className="sp" />想いを込めて作った言葉。
          <br/>コラプラのプラットフォームの中で、
          <br className="sp" />携わるすべての人がプラスに進みますように…
        </p>
      </section>

      <section className={styles.meritArea}>
        <Merit detail />
      </section>

      <section className={styles.worriesArea}>
        <Container small>
          <h3 className={styles.ttl}>こんなお悩みを解決</h3>
          <ul>
            <li><img src={worries1.src} alt="お悩み" /></li>
            <li><img src={worries2.src} alt="お悩み" /></li>
            <li><img src={worries3.src} alt="お悩み" /></li>
          </ul>
          <div className={styles.triangle}></div>
          <p className={styles.txt}>
            独自のキャスティングツールで<br />
            <span>ユーザー様ごとに合ったマッチングをコラプラが担います！</span>
          </p>
        </Container>
      </section>

      <section className={styles.useArea}>
        <Container small>
          <h3 className={styles.ttl}>今すぐコラプラを利用する</h3>
          <p className={styles.midashi}>
            ＼たった<span className="en">5</span>分で簡単登録！／
          </p>
          <Btn txt="まずは新規会員登録" link="/register" />
        </Container>
      </section>

      <section className={styles.methodArea}>
        <Method />
      </section>

      <section className={styles.faqArea}>
        <Faq faqs={faqCorapura} />
      </section>
    </>
  );
}

export default GuideCorapura;

GuideCorapura.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}