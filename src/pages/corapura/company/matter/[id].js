import PageLayoutCorapura from '@/components/Layouts/pageLayoutCorapura'
import { MatterDetail } from '@/components/corapura'

export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_CORAPURA}/post/show/${params.id}`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const CompanyMatter = ({posts}) => {
  // console.log(posts);

  return (
    <MatterDetail posts={posts} />
  );
}

export default CompanyMatter;

CompanyMatter.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}