import styles from '@/styles/corapura/components/merit.module.scss'
import Container from './Layout/container';
import merit1 from '@/images/corapura/top/cont5_1.webp'
import merit2 from '@/images/corapura/top/cont5_2.webp'
import merit3 from '@/images/corapura/top/cont5_3.webp'
import merit4 from '@/images/corapura/top/cont5_4.webp'
import merit5 from '@/images/corapura/top/cont5_5.webp'
import merit6 from '@/images/corapura/top/cont5_6.webp'
import merit7 from '@/images/corapura/top/cont5_7.webp'
import merit8 from '@/images/corapura/top/cont5_8.webp'
import Btn from './btn';

const Merit = ({detail = false}) => {
  return (
    <section className={styles.meritBox}>
      <Container small>
        <h2 className={styles.ttl}><span className="en">8</span>つのメリット</h2>
        <ul className={styles.list}>
          <li>
            <img src={merit1.src} alt="案件登録で気軽に依頼" />
            <div className={styles.height40}>案件登録で<span>気軽に依頼</span></div>
            <p>かんたん案件登録で多方面のユーザーに気軽に依頼。お仕事、売買、告知、拡散、求人、仲間募集など案件登録内容は自由。</p>
          </li>
          <li><img src={merit2.src} alt="スキマ時間を活用" />
            <div className={styles.height40}><span>スキマ時間</span>を活用</div>
            <p>フリーランスも個人ユーザーも専門家もスキマ時間を有効に活用してお仕事をかんたん受注。</p>
          </li>
          <li>
            <img src={merit3.src} alt="共創相手・コラボ相手を見つける" />
            <div className={styles.height40}><span>共創相手・<br className="sp" />コラボ相手</span><br />を見つける</div>
            <p>企業・個人・自治体などの中から共創相手・コラボ相手を見つける。パートナー探しに活用！</p>
          </li>
          <li>
            <img src={merit4.src} alt="＂直接つながる＂で中間マージンは一切なし" />
            <div className={styles.height40}><span>＂直接つながる＂</span>で<br />
              中間マージンは一切なし</div>
            <p>企業・個人・自治体などの中から共創相手・コラボ相手を見つける。パートナー探しに活用！</p>
          </li>
          <li>
            <img src={merit5.src} alt="12種の事業アピール自己アピール方法で認知拡大" />
            <div className={styles.height60}><span>12種の事業<br className="sp" />アピール<br />自己アピール方法</span><br />で認知拡大</div>
            <p>コラプラでできるアピール方法はなんと12種類。多方面からのアプローチで認知拡大。</p>
          </li>
          <li>
            <img src={merit6.src} alt="SDGS・NFTなど取り入れ企業力UP" />
            <div className={styles.height60}><span>SDGS・NFT</span><br className="sp" />など取り入れ<br />企業力<span>UP</span></div>
            <p>
              新しい価値観は重要なカギとなる時代。コラプラで取り組みを開示することで企業力が大幅UP。
            </p>
          </li>
          <li>
            <img src={merit7.src} alt="インフルエンサーはSNSアカウントの成長拡大へ" />
            <div className={styles.height60}>インフルエンサーは<br /><span>SNSアカウントの<br />成長拡大へ</span></div>
            <p>インスタで「お仕事依頼はDMまで」と待っているだけで良いですか？コラプラで自己アピールにて認知拡大。</p>
          </li>
          <li>
            <img src={merit8.src} alt="ライフスタイルで仲間とつながる" />
            <div className={styles.height60}>
              <span>ライフスタイル</span>
              で<br />仲間とつながる
            </div>
            <p>自分の推し活・趣味・特技をここぞとばかりに披露。そこから広がる・深まる・つながる仲間の輪。</p>
          </li>
        </ul>
        <div className={detail ? styles.detail : null}>
          <Btn txt="CORAPRAとは" link="/corapura" reverse />
        </div>
      </Container>
    </section>
  );
}

export default Merit;