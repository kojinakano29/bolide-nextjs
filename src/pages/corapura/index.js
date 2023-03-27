import styles from '@/styles/corapura/components/home.module.scss'
import PageLayoutCorapura from "@/components/Layouts/pageLayoutCorapura";
import mv from '@/images/corapura/top/mv.png'
import mv_sp from '@/images/corapura/top/mv_sp.png'
import mv_big from '@/images/corapura/top/mv_big.png'
import { Btn, Btn2, CanDo, CardType1, CardType2, CompanyCard, Coupon, Info, NameCard, Release, SwiperType1, SwiperType2, User } from '@/components/corapura';
import Container from '@/components/corapura/Layout/container';
import { SwiperSlide } from 'swiper/react';
import dummy1 from '@/images/corapura/common/dummy1.svg'

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

  const matters = posts?.post
  const matterLimit = matters.filter((matter, index) => {
    return index < 10
  })
  const companies = posts?.company
  const users = posts?.user
  const releases = posts?.pr
  const salons = posts?.salon
  const salonLeft = salons.filter((salon, index) => {
    return index === 0
  })
  const salonRight = salons.filter((salon, index) => {
    return index > 0 && index < 5
  })
  const coupons = posts?.coupon
  const presidents = posts?.president
  const infos = posts?.bi
  const nameCards = posts?.card
  const nfts = posts?.item
  const sdgs = posts?.sust
  const sponsors = posts?.sponsor
  const likes = posts?.like

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
      <Btn txt="詳しくはこちら" link="/corapura/guide" />

      <section className={styles.matchArea}>
        <Container small>
          <h2 className="ttl2">マッチング（案件一覧）</h2>
          <p className={styles.desc}>案件を掲載して自由にやり取りが可能。新たなビジネスパートナーやクライアント・インフルエンサーを見つけたり、個人ユーザーとのマッチングでスクール会員や趣味仲間などを見つけることができます。攻めの姿勢で活躍の場拡大につながります。</p>
          {matterLimit.length !== 0 ?
            <>
              <SwiperType1 matters={matterLimit} />
              <div className={styles.btnFlex}>
                <Btn txt="企業案件一覧" link="/corapura/company/matter" />
                <Btn txt="インフルエンサー/ユーザー案件一覧" link="/corapura/influencer/matter" />
              </div>
            </>
            :
            <p className={styles.noneLength}>ビジネスマッチングがありません</p>
          }
        </Container>
      </section>

      <section className={styles.companyArea}>
        <Container small>
          <h2 className="ttl2">おすすめの企業/ビジネスユーザー/自治体</h2>
          {companies.length !== 0 ?
            <>
              <SwiperType2 gap={32}>
                {companies?.map((company, index) => (
                  <SwiperSlide key={index}>
                    <CompanyCard data={company} />
                  </SwiperSlide>
                ))}
              </SwiperType2>
              <Btn2 txt="企業/ビジネスユーザー/自治体一覧" link="/corapura/company" />
            </>
            :
            <p className={styles.noneLength}>おすすめの企業/ビジネスユーザー/自治体がありません</p>
          }
        </Container>
      </section>

      <section className={styles.userArea}>
        <Container small>
          <h2 className="ttl2">おすすめのユーザー/インフルエンサー</h2>
          {/* <p className={styles.desc}></p> */}
          {users.length !== 0 ?
            <User data={users} />
            :
            <p className={styles.noneLength}>おすすめのユーザー/インフルエンサーがありません</p>
          }
        </Container>
      </section>

      <section className={styles.releaseArea}>
        <Container small>
          <h2 className="ttl2">プレスリリース</h2>
          <p className={styles.desc}>自社の新商品や新サービスを自由に何度でも無制限で掲載できます。</p>
          {releases.length !== 0 ?
            <>
              <SwiperType2 gap={24}>
                {releases?.map((release, index) => (
                  <SwiperSlide key={index}>
                    <Release data={release} swiper />
                  </SwiperSlide>
                ))}
              </SwiperType2>
              <Btn2 txt="プレスリリース一覧へ" link="/corapura/press_release" />
            </>
            :
            <p className={styles.noneLength}>プレスリリースがありません</p>
          }
        </Container>
      </section>

      <section className={styles.salonArea}>
        <Container small>
          <h2 className="ttl2">注目のオンラインサロン</h2>
          <p className={styles.desc}>オンラインサロンのメンバー募集・入会ができます。</p>
          {salons.length !== 0 ?
            <div className={styles.salonBox}>
              <div className={styles.left}>
                {salonLeft.map((salon, index) => (
                  <a href={`/corapura/salon/${salon.id}`} key={index} className={styles.imgBox}>
                    <img src={salon.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${salon.thumbs}` : dummy1.src} alt="オンラインサロンのサムネイル画像" />
                    <div className={styles.contBox}>
                      <p className={styles.salonName}>{salon.title}</p>
                      <p className={styles.salonDesc}>
                        {salon.content?.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, '').substring(0, 60)}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
              <div className={styles.right}>
                {salonRight.map((salon, index) => (
                  <a href={`/corapura/salon/${salon.id}`} key={index} className={styles.imgBox}>
                    <img src={salon.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${salon.thumbs}` : dummy1.src} alt="オンラインサロンのサムネイル画像" />
                    <div className={styles.contBox}>
                      <p className={styles.salonName}>{salon.title}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            :
            <p className={styles.noneLength}>注目のオンラインサロンがありません</p>
          }
          {salons.length > 4 ?
            <Btn2 txt="オンラインサロン一覧へ" link="/corapura/salon" />
          : null}
        </Container>
      </section>

      <section className={styles.couponArea}>
        <Container small>
          <h2 className="ttl2">クーポン</h2>
          <p className={styles.desc}>クーポンを掲載できます。興味や関心を持ってもらいやすくなります。</p>
          {coupons.length !== 0 ?
            <SwiperType2 gap={24}>
              {coupons.map((coupon, index) => (
                <SwiperSlide key={index}>
                  <Coupon data={coupon} swiper />
                </SwiperSlide>
              ))}
            </SwiperType2>
            :
            <p className={styles.noneLength}>クーポンがありません</p>
          }
        </Container>
      </section>

      <section className={styles.presidentArea}>
        <Container small>
          <h2 className="ttl2">プレジデント/リーダー</h2>
          <p className={styles.desc}>社長やリーダーの紹介ができます。</p>
          {presidents.length !== 0 ?
            <SwiperType2 gap={24}>
              {presidents.map((president, index) => (
                <SwiperSlide key={index}>
                  <CardType1 data={president} swiper />
                </SwiperSlide>
              ))}
            </SwiperType2>
            :
            <p className={styles.noneLength}>プレジデント/リーダーがありません</p>
          }
        </Container>
      </section>

      <section className={styles.infoArea}>
        <Container small>
          <h2 className="ttl2">ニュース/イベント</h2>
          <p className={styles.desc}>お知らせを随時更新できます。信頼やイメージの向上に繋がります。</p>
          {infos.length !== 0 ?
            <Info data={infos} />
            :
            <p className={styles.noneLength}>ニュース/イベントがありません</p>
          }
        </Container>
      </section>

      <section className={styles.nameCardArea}>
        <Container small>
          <h2 className="ttl2">名刺</h2>
          <p className={styles.desc}>名刺を掲載できます。仕事の獲得やコミュニケーションの糸口にご活用ください。</p>
          {nameCards.length !== 0 ?
            <SwiperType2 gap={24}>
              {nameCards.map((card, index) => (
                <SwiperSlide key={index}>
                  <NameCard data={card} slider />
                </SwiperSlide>
              ))}
            </SwiperType2>
            :
            <p className={styles.noneLength}>名刺がありません</p>
          }
        </Container>
      </section>

      <section className={styles.nftArea}>
        <Container small>
          <h2 className="ttl2">NFT／製品・商品／特許・技術</h2>
          <p className={styles.desc}>自社の魅力を思う存分紹介できます。</p>
          {nfts.length !== 0 ?
            <SwiperType2 gap={24}>
              {nfts.map((nft, index) => (
                <SwiperSlide key={index}>
                  <CardType1 data={nft} cat swiper />
                </SwiperSlide>
              ))}
            </SwiperType2>
            :
            <p className={styles.noneLength}>NFT／製品・商品／特許・技術がありません</p>
          }
        </Container>
      </section>

      <section className={styles.sdgsArea}>
        <Container small>
          <h2 className="ttl2">SDGs/社会貢献</h2>
          <p className={styles.desc}>活動内容を紹介できます。新たな市場機会を創出する可能性を生み出しましょう。</p>
          {sdgs.length !== 0 ?
            <SwiperType2 gap={24}>
              {sdgs.map((sdgs, index) => (
                <SwiperSlide key={index}>
                  <CardType1 data={sdgs} cat swiper />
                </SwiperSlide>
              ))}
            </SwiperType2>
            :
            <p className={styles.noneLength}>SDGs/社会貢献がありません</p>
          }
        </Container>
      </section>

      <section className={styles.sponsorArea}>
        <Container small>
          <h2 className="ttl2">スポンサー・マスコット</h2>
          <p className={styles.desc}>自社のスポンサーやマスコットを紹介できます。ブランドイメージが伝わりやすくなります。</p>
          {likes.length !== 0 ?
            <CardType2 data={likes} />
            :
            <p className={styles.noneLength}>スポンサー・マスコットがありません</p>
          }
        </Container>
      </section>

      <section className={styles.hobbyArea}>
        <Container small>
          <h2 className="ttl2">推し活・ホビー</h2>
          <p className={styles.desc}>あなたの推しや趣味を教えてください。仲間と共有してみませんか？</p>
          {sponsors.length !== 0 ?
            <CardType2 data={sponsors} />
            :
            <p className={styles.noneLength}>推し活・ホビーがありません</p>
          }
        </Container>
      </section>
    </>
  );
}

export default Corapura;

Corapura.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}