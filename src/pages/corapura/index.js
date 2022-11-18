import styles from '@/styles/corapura/components/home.module.scss'
import PageLayoutCorapura from "@/components/Layouts/pageLayoutCorapura";
import Image from 'next/image';
import mv from '@/images/corapura/top/mv.webp'
import mv_sp from '@/images/corapura/top/mv__sp.webp'
import { CanDo, Merit } from '@/components/corapura';
import Container from '@/components/corapura/Layout/container';
import ttl from '@/images/corapura/common/corapura.svg'
import txt from '@/images/corapura/top/cont3_img.svg'
import reco from '@/images/corapura/top/cont4_img.webp'
import reco_sp from '@/images/corapura/top/cont4_img__sp.svg'

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_CORAPURA}`)
  const data = await res.json()

  return {
      props: {
          posts: data
      }
  }
}

const Corapura = ({posts}) => {
  console.log(posts)

  return (
    <>
      <section className={styles.mv}>
        <div className={`${styles.mvBox} pc`}>
          <Image
            src={mv}
            alt="メインビジュアル"
            layout="responsive"
            sizes="100vw"
            priority
          />
        </div>
        <div className={`${styles.mvBox} sp`}>
          <Image
            src={mv_sp}
            alt="メインビジュアル"
            layout="responsive"
            sizes="100vw"
            priority
          />
        </div>
      </section>

      <section className={styles.canDo}>
        <CanDo />
      </section>

      <section className={styles.whatArea}>
        <Container small900>
          <h2 className={styles.ttl}>
            <img src={ttl.src} alt="CORAPURA" />
            <span>とは？</span>
          </h2>
          <div className={styles.imgBox}>
            <img src={txt.src} alt="Collabolation + Plus" />
          </div>
          <p className={styles.txt}>
            Collaboration+Plusで組み合わせ、
            <br className="sp" />想いを込めて作った言葉。
            <br />コラプラのプラットフォームの中で、携わるすべての人がプラスに進みますように…
          </p>
          <p className={styles.txt}>
            企業・フリーランス・専門家・個人事業主・インフルエンサー・個人ユーザー
            <br className="pc" />・自治体・メディアと多種多様の繋がりが持てるプラットフォーム。
            <br />ビジネスから個人的な事まで無料で案件登録ができ、自由に依頼・やり取りができます。
            <br />コラプラを活用して＂価値あるつながり＂を見つけてみませんか？
          </p>
        </Container>
      </section>

      <section className={styles.recommendArea}>
        <Container small>
          <div className={styles.ttl}>＼ こんな人におすすめ！／</div>
          <div className={styles.imgBox}>
            <img className="pc" src={reco.src} alt="こんな人におすすめ" />
            <img className="sp" src={reco_sp.src} alt="こんな人におすすめ" />
          </div>
        </Container>
      </section>

      <section className={styles.meritArea}>
        <Merit />
      </section>
    </>
  );
}

export default Corapura;

Corapura.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}