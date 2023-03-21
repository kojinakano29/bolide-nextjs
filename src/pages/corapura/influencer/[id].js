import styles from '@/styles/corapura/components/detail.module.scss'
import PageLayoutCorapura from "@/components/Layouts/pageLayoutCorapura";
import Container from '@/components/corapura/Layout/container';
import { CardType2, DetailArea, DetailComment, DetailTabUser, NameCard } from '@/components/corapura';
import { useAuth } from '@/hooks/auth';

export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_CORAPURA}/user/show/${params.id}`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const InfluencerDetail = ({posts}) => {
  // console.log(posts)

  const { user } = useAuth({middleware: 'auth', type: 'corapura'})
  const profile = posts.profile
  const userInfo = posts.user
  const cards = posts.cards
  const comments = posts.comments
  const likes = posts.likes
  const matters = posts.posts

  return (
    <>
      <section className="cont1">
        <Container small>
          <DetailArea influencer profile={profile} userInfo={userInfo} />
        </Container>
      </section>

      <section className={styles.appealArea}>
        <Container small>
          <div className={styles.appealBox}>
            <div className={styles.left}>
              <p className={styles.ttl}>アピールポイント</p>
              <p className={styles.desc}>{profile.c_user_profile.appeal_text}</p>
            </div>
            <div className={styles.imgBox}>
              <img src={profile.c_user_profile.appeal_image ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile.c_user_profile.appeal_image}` : null} alt="アピールの画像" />
            </div>
          </div>
        </Container>
      </section>

      <DetailTabUser
        cards={cards}
        likes={likes}
        matters={matters}
        userInfo={userInfo}
      />

      {comments.length !== 0 ?
        <section className={styles.commentArea}>
          <Container small>
            <DetailComment comments={comments} />
          </Container>
        </section>
      : null}

      <section className={styles.cardArea}>
        <Container small>
          <h2 className="ttl2">名刺</h2>
          {cards.length !== 0 ?
            <div className={styles.column3}>
              {cards.map((card, index) => (
                <NameCard data={card} key={index} />
              ))}
            </div>
            :
            <p className={styles.noneText}>名刺がありません</p>
          }
        </Container>
      </section>

      <section className={styles.likeArea}>
        <Container small>
          <h2 className="ttl2">推し活・ホビー</h2>
          {likes.length !== 0 ?
            <CardType2 data={likes} detail />
            :
            <p className={styles.noneText}>推し活・ホビーがありません</p>
          }
        </Container>
      </section>
    </>
  );
}

export default InfluencerDetail;

InfluencerDetail.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}