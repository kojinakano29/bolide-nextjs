import styles from '@/styles/corapura/components/home.module.scss'
import PageLayoutCorapura from "@/components/Layouts/pageLayoutCorapura";
import mv from '@/images/corapura/top/mv.png'
import mv_sp from '@/images/corapura/top/mv_sp.png'
import mv_big from '@/images/corapura/top/mv_big.png'
import { Btn, Btn2, CanDo, CardType1, CardType2, CompanyCard, Coupon, Info, Merit, NameCard, Release, SwiperType1, SwiperType2, User } from '@/components/corapura';
import Container from '@/components/corapura/Layout/container';
import ttl from '@/images/corapura/common/corapura.svg'
import txt from '@/images/corapura/top/cont3_img.svg'
import reco from '@/images/corapura/top/cont4_img.webp'
import reco_sp from '@/images/corapura/top/cont4_img__sp.webp'
import { SwiperSlide } from 'swiper/react';
import dummy1 from '@/images/corapura/common/dummy1.svg'
import Link from 'next/link';

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
  // console.log(posts)

  const matters = posts.post
  const matterLimit = matters.filter((matter, index) => {
    return index < 10
  })
  const companies = posts.company
  const users = posts.user
  const releases = posts.pr
  const salons = posts.salon
  const salonLeft = salons.filter((salon, index) => {
    return index === 0
  })
  const salonRight = salons.filter((salon, index) => {
    return index > 0 && index < 5
  })
  const coupons = posts.coupon
  const presidents = posts.president
  const infos = posts.bi
  const nameCards = posts.card
  const nfts = posts.item
  const sdgs = posts.sust
  const sponsors = posts.sponsor
  const likes = posts.like

  return (
    <>
      <section className={styles.mv}>
        <div className={`${styles.mvBox} bigPc`}>
          <img src={mv_big.src} alt="メインビジュアル" />
        </div>
        <div className={`${styles.mvBox} smPc pc`}>
          <img src={mv.src} alt="メインビジュアル" />
        </div>
        <div className={`${styles.mvBox} sp`}>
          <img src={mv_sp.src} alt="メインビジュアル" />
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
            <br />コラプラのプラットフォームの中で、
            <br className="sp" />携わるすべての人がプラスに進みますように…
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

      <section className={styles.matchArea}>
        <Container small>
          <h2 className="ttl2">ビジネスマッチング</h2>
          <p className={styles.desc}>
            テキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプル、
            <br/>テキストサンプルテキストサンプルテキストサンプルテキストサンプル。
          </p>
          <SwiperType1 matters={matterLimit} />
          <div className={styles.btnFlex}>
            <Btn txt="企業案件一覧" link="/corapura/company/matter" />
            <Btn txt="インフルエンサー案件一覧" link="/corapura/influencer/matter" />
          </div>
        </Container>
      </section>

      <section className={styles.companyArea}>
        <Container small>
          <h2 className="ttl2">おすすめの企業</h2>
          <SwiperType2 gap={32}>
            {companies.map((company, index) => (
              <SwiperSlide key={index}>
                <CompanyCard data={company} />
              </SwiperSlide>
            ))}
          </SwiperType2>
          <Btn2 txt="企業一覧" link="/corapura/company" />
        </Container>
      </section>

      <section className={styles.userArea}>
        <Container small>
          <h2 className="ttl2">ユーザー/インフルエンサーマッチング</h2>
          <p className={styles.desc}>
            テキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプル、
            <br/>テキストサンプルテキストサンプルテキストサンプルテキストサンプル。
          </p>
          <User data={users} />
        </Container>
      </section>

      <section className={styles.releaseArea}>
        <Container small>
          <h2 className="ttl2">プレスリリース</h2>
          <SwiperType2 gap={24}>
            {releases.map((release, index) => (
              <SwiperSlide key={index}>
                <Release data={release} swiper />
              </SwiperSlide>
            ))}
          </SwiperType2>
          <Btn2 txt="プレスリリース一覧へ" link="/corapura/press_release" />
        </Container>
      </section>

      <section className={styles.salonArea}>
        <Container small>
          <h2 className="ttl2">注目のオンラインサロン</h2>
          <div className={styles.salonBox}>
            <div className={styles.left}>
              {salonLeft.map((salon, index) => (
                <Link href={`/corapura/salon/${salon.id}`} key={index}>
                  <a className={styles.imgBox}>
                    <img src={salon.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${salon.thumbs}` : dummy1.src} alt="" />
                    <div className={styles.contBox}>
                      <p className={styles.salonName}>{salon.title}</p>
                      <p className={styles.salonDesc}>
                        {salon.content.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, '').substring(0, 60)}
                      </p>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
            <div className={styles.right}>
              {salonRight.map((salon, index) => (
                <Link href={`/corapura/salon/${salon.id}`} key={index}>
                  <a className={styles.imgBox}>
                    <img src={salon.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${salon.thumbs}` : dummy1.src} alt="" />
                    <div className={styles.contBox}>
                      <p className={styles.salonName}>{salon.title}</p>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <Btn2 txt="オンラインサロン一覧へ" link="/corapura/salon" />
        </Container>
      </section>

      <section className={styles.couponArea}>
        <Container small>
          <h2 className="ttl2">クーポン</h2>
          <p className={styles.desc}>
            テキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプル、
            <br/>テキストサンプルテキストサンプルテキストサンプルテキストサンプル。
          </p>
          <SwiperType2 gap={24}>
            {coupons.map((coupon, index) => (
              <SwiperSlide key={index}>
                <Coupon data={coupon} swiper />
              </SwiperSlide>
            ))}
          </SwiperType2>
        </Container>
      </section>

      <section className={styles.presidentArea}>
        <Container small>
          <h2 className="ttl2">プレジデント</h2>
          <p className={styles.desc}>
            テキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプル、
            <br/>テキストサンプルテキストサンプルテキストサンプルテキストサンプル。
          </p>
          <SwiperType2 gap={24}>
            {presidents.map((president, index) => (
              <SwiperSlide key={index}>
                <CardType1 data={president} swiper />
              </SwiperSlide>
            ))}
          </SwiperType2>
        </Container>
      </section>

      <section className={styles.infoArea}>
        <Container small>
          <h2 className="ttl2">ビジネスインフォメーション</h2>
          <p className={styles.desc}>
            テキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプル、
            <br/>テキストサンプルテキストサンプルテキストサンプルテキストサンプル。
          </p>
          <Info data={infos} />
        </Container>
      </section>

      <section className={styles.nameCardArea}>
        <Container small>
          <h2 className="ttl2">名刺</h2>
          <p className={styles.desc}>
            テキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプル、
            <br/>テキストサンプルテキストサンプルテキストサンプルテキストサンプル。
          </p>
          <SwiperType2 gap={24}>
            {nameCards.map((card, index) => (
              <SwiperSlide key={index}>
                <NameCard data={card} />
              </SwiperSlide>
            ))}
          </SwiperType2>
        </Container>
      </section>

      <section className={styles.nftArea}>
        <Container small>
          <h2 className="ttl2">NFT／製品・商品／特許・技術</h2>
          <p className={styles.desc}>
            テキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプル、
            <br/>テキストサンプルテキストサンプルテキストサンプルテキストサンプル。
          </p>
          <SwiperType2 gap={24}>
            {nfts.map((nft, index) => (
              <SwiperSlide key={index}>
                <CardType1 data={nft} cat swiper />
              </SwiperSlide>
            ))}
          </SwiperType2>
        </Container>
      </section>

      <section className={styles.sdgsArea}>
        <Container small>
          <h2 className="ttl2">SDGs</h2>
          <p className={styles.desc}>
            テキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプル、
            <br/>テキストサンプルテキストサンプルテキストサンプルテキストサンプル。
          </p>
          <SwiperType2 gap={24}>
            {sdgs.map((sdgs, index) => (
              <SwiperSlide key={index}>
                <CardType1 data={sdgs} cat swiper />
              </SwiperSlide>
            ))}
          </SwiperType2>
        </Container>
      </section>

      <section className={styles.sponsorArea}>
        <Container small>
          <h2 className="ttl2">スポンサー・マスコット</h2>
          <p className={styles.desc}>
            テキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプル、
            <br/>テキストサンプルテキストサンプルテキストサンプルテキストサンプル。
          </p>
          <CardType2 data={likes} />
        </Container>
      </section>

      <section className={styles.hobbyArea}>
        <Container small>
          <h2 className="ttl2">推し活・ホビー</h2>
          <p className={styles.desc}>
            テキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプル、
            <br/>テキストサンプルテキストサンプルテキストサンプルテキストサンプル。
          </p>
          <CardType2 data={sponsors} />
        </Container>
      </section>
    </>
  );
}

export default Corapura;

Corapura.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}