import styles from '@/styles/top/components/home.module.scss'
import PageLayoutTop from "@/components/Layouts/pageLayoutTop";
import Container from '@/components/top/Layout/container';
import { Faq, Make, Move, Plan } from '@/components/top';
import Link from 'next/link';
import { plans } from '@/lib/top/constants';

const BolideTop = () => {
  return (
    <>
      <section className={styles.mv}>
        <div className={styles.mvBox}>
          <img className="pc" src="/top/mv-text.svg" alt="" />
          <img className="sp" src="/top/mv-text__sp.svg" alt="" />
        </div>
        <div className={`${styles.mvBottom} sp`}>
          <img src="/top/mv-icons__sp.svg" alt="" />
        </div>
      </section>

      <section id="about" className={styles.aboutArea}>
        <Container small900>
          <h2 className="ttl1 bg_line center">
            <span className="big en">Bolide's Japan</span>
            <span className="sm">とは？</span>
          </h2>
          <p className={styles.desc}>
            1つのアカウント情報だけで
            <br className="sp" /><span>「繋がる、知る、探す、買う」</span>
            <br className="sp" />を同時に楽しめる
            <br className="pc" />新世代SNSプラットフォームです。
            <br className="sp" />ビジネスや個人の活動の場としても
            <br className="sp" />もちろん、認知拡大にも効果的。
            <br /><span>中間マージンは一切かかりません。</span>
            <br/>あなたの目的次第で何にでもなれる
            <br className="sp" />「BJ（通称 ビージェイ）」今始めてみませんか？
          </p>
          <div className={styles.imgBox}>
            <img className="pc" src="/top/about.svg" alt="" />
            <img className="sp" src="/top/about__sp.svg" alt="" />
          </div>
        </Container>
      </section>

      <Move />

      <section className={styles.bjcArea}>
        <Container small>
          <div className={styles.flexType1}>
            <div className={styles.left}>
              <h2 className="ttl1 bg_line bottom">
                <span className="big en">BJC</span>
                <span className="sm en">(Bolide's Japan Club)</span>
                <span className="sm">とは？</span>
              </h2>
              <p className={styles.desc}>
                BJCとはボリードジャパンのサイト内で個人や企業等が安心して活動できるように、
                <br/>ボリードジャパン側から「安心」「つながり」「貢献」という視点で選ばれた個人や企業等だけが
                <br/>参加できるクラブです。選ばれた個人や企業には個々の会員ページにBJC認定マークが付与されます。
                <br/>BJC認定マークは個人や企業等とつながる上で有意義な認定マークとなるようボリードジャパンも
                <br/>厳正かつ公平に選定、認定を行います。BJC詳細認定基準は非公開となります。
              </p>
            </div>
            <div className={styles.right}>
              <img src="/top/bjc__1.svg" alt="" />
            </div>
          </div>
          <div className={styles.flexType2}>
            <div className={styles.left}>
              <p className={styles.feature}>サービスの特徴が入ります</p>
              <h2 className="ttl1 bottom">
                <span className="big en">BJC</span>
                <span className="sm en">(Bolide's Japan Club)</span>
              </h2>
              <p className={styles.midashi}>BJCは全ての人や企業、地域とのつながりを重視し、安心して利用できるクラブを目指します。</p>
              <p className={styles.desc}>
                BJCは個と企業、個と地域、個と個という、まずは「個」を中心とした企業や地域とのつながりを大切にします。そして企業と企業、地域と地域、地域と企業という更なる発展を支援します。
                <br/>積極的なつながりの中で安心・信頼が自らの成長や発展につながるような取り組みをしていきます。
              </p>
            </div>
            <div className={styles.right}>
              <img src="/top/bjc__2.svg" alt="" />
            </div>
          </div>
          <div className={styles.flexType2}>
            <div className={styles.left}>
              <p className={styles.feature}>サービスの特徴が入ります</p>
              <h2 className="ttl1">
                <span className="sm">社会貢献活動</span>
              </h2>
              <p className={styles.midashi}>BJCは皆様の積極的な社会貢献活動、SDGsの取り組みを支援します。</p>
              <p className={styles.desc}>
                BJCはSDGsの前文にある「人間と地球、そして繁栄のための行動計画」を個人・企業が積極的に取り組む姿勢を支援します。
                <br/>「経済」と「社会」と「環境」のバランスを維持しつつ、世界の個人・企業等がよりよくつながり、変化することができるような取り組みをしていきます。
                <br/>ボリードジャパンでは社会貢献枠としての月額利用料金プランを設け、「人間」「平和」「繁栄」「地球環境」への貢献活動を皆様と共に支援していきます。
              </p>
            </div>
            <div className={styles.right}>
              <img src="/top/bjc__3.svg" alt="" />
            </div>
          </div>
        </Container>
      </section>

      <Make />

      <section id="plan" className={styles.planArea}>
        <Container small>
          <h2 className="ttl1 center">
            <span className="big en">Bolide's Japan</span>
            <span className="sm">料金プラン</span>
          </h2>
          <article className={styles.planSlide}>
            <div className={styles.planCard}>
              <img src="/top/premium-plan.svg" alt="" />
              <img src="/top/free-plan.svg" alt="" />
            </div>
            <div className={styles.planBox}>
              {plans.map((plan, index) => (
                <Plan plan={plan} num={index} key={index} />
              ))}
            </div>
          </article>
          <div className={styles.packBox}>
            <img className="pc" src="/top/pack.svg" alt="" />
            <img className="sp" src="/top/pack__sp.svg" alt="" />
          </div>
        </Container>
      </section>

      <Faq />

      <Make />

      <section className={styles.brandArea}>
        <Container small900>
          <h2 className="ttl1 center">
            <span className="big en">BRAND</span>
          </h2>
          <div className={styles.flex}>
            <Link href="/corapura">
              <a>
                <img className="pc" src="/top/corapura-banner.svg" alt="" />
                <img className="sp" src="/top/corapura-banner__sp.svg" alt="" />
                <p className={`${styles.eName} en`}>Corapura</p>
                <p className={styles.jName}>コラプラ</p>
              </a>
            </Link>
            <Link href="/liondor">
              <a>
                <img className="pc" src="/top/liondor-banner.svg" alt="" />
                <img className="sp" src="/top/liondor-banner__sp.svg" alt="" />
                <p className={`${styles.eName} en`}>Liondor</p>
                <p className={styles.jName}>リオンドール</p>
              </a>
            </Link>
            <Link href="/dellamall">
              <a>
                <img className="pc" src="/top/della-banner.svg" alt="" />
                <img className="sp" src="/top/della-banner__sp.svg" alt="" />
                <p className={`${styles.eName} en`}>Della Mall</p>
                <p className={styles.jName}>デラモール</p>
              </a>
            </Link>
            <a href="https://marche-dor.jp/" target="_blank" rel="noopener noreferrer">
              <img className="pc" src="/top/marche-banner.svg" alt="" />
              <img className="sp" src="/top/marche-banner__sp.svg" alt="" />
              <p className={`${styles.eName} en`}>Marche Dor</p>
              <p className={styles.jName}>マルシェドール</p>
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}

export default BolideTop;

BolideTop.getLayout = function getLayout(page) {
  return <PageLayoutTop>{page}</PageLayoutTop>
}