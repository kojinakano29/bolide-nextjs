import styles from '@/styles/corapura/components/detail.module.scss'
import PageLayoutCorapura from "@/components/Layouts/pageLayoutCorapura";
import Container from '@/components/corapura/Layout/container';
import { CardType2, DetailArea, DetailComment, DetailTabUser, NameCard } from '@/components/corapura';
import { useCallback, useState } from 'react';

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
  console.log(posts)

  const profile = posts.profile
  const userInfo = posts.user
  const cards = posts.cards
  const comments = posts.comments
  const likes = posts.likes
  const matters = posts.posts

  const [modal, setModal] = useState(false)
  const [active, setActive] = useState()

  const handleClickModal = useCallback(async (num) => {
    setModal(prevState => !prevState)
    setActive(num)
  }, [setModal])

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
              <img src={profile.c_user_profile.appeal_image ? profile.c_user_profile.appeal_image : null} alt="" />
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

      <section className={styles.commentArea}>
        <Container small>
          <DetailComment comments={comments} />
        </Container>
      </section>

      <section className={styles.cardArea}>
        <Container small>
          <h2 className="ttl2">名刺</h2>
          <div className={styles.column3}>
            {cards.map((card, index) => (
              <div key={index} onClick={() => handleClickModal(index)}>
                <NameCard data={card} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {modal ?
        <div className="modalArea" onClick={() => handleClickModal(active)}>
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <NameCard data={cards[active]} detail />
          </div>
        </div>
      : null}

      <section className={styles.likeArea}>
        <Container small>
          <h2 className="ttl2">推し活・ホビー</h2>
          <CardType2 data={likes} detail />
        </Container>
      </section>
    </>
  );
}

export default InfluencerDetail;

InfluencerDetail.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}