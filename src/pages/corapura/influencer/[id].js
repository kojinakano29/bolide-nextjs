import styles from '@/styles/corapura/components/detail.module.scss'
import PageLayoutCorapura from "@/components/Layouts/pageLayoutCorapura";
import Container from '@/components/corapura/Layout/container';
import { DetailArea } from '@/components/corapura';

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

  return (
    <section className="cont1">
      <Container small>
        <DetailArea influencer profile={profile} userInfo={userInfo} />
      </Container>
    </section>
  );
}

export default InfluencerDetail;

InfluencerDetail.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}