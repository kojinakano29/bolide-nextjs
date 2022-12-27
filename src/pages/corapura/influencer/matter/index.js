import PageLayoutCorapura from "@/components/Layouts/pageLayoutCorapura";
import { MatterList } from '@/components/corapura';

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_CORAPURA}/user_post`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const MatterListUser = ({posts}) => {

  return (
    <MatterList posts={posts} influencer />
  );
}

export default MatterListUser;

MatterListUser.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}