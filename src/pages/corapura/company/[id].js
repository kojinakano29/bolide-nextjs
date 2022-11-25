import { DetailArea, DetailComment, DetailTabCompany } from '@/components/corapura'
import Container from '@/components/corapura/Layout/container'
import PageLayoutCorapura from '@/components/Layouts/pageLayoutCorapura'
import styles from '@/styles/corapura/components/detail.module.scss'

export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_CORAPURA}/company/show/${params.id}`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const CompanyDetail = ({posts}) => {
  // console.log(posts)

  const profile = posts.profile
  const userInfo = posts.user
  const businesses = posts.business
  const releases = posts.pr
  const matters = posts.posts
  const comments = posts.comments

  return (
    <>
      <section className="cont1">
        <Container small>
          <DetailArea profile={profile} userInfo={userInfo} />
        </Container>
      </section>

      <DetailTabCompany
        businesses={businesses}
        releases={releases}
        matters={matters}
        userInfo={userInfo}
      />

      <section className={styles.commentArea}>
        <Container small>
          <DetailComment comments={comments} />
        </Container>
      </section>
    </>
  );
}

export default CompanyDetail;

CompanyDetail.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}