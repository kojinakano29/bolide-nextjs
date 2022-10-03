import { useRouter } from "next/router";

// SSR
export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.API_DOMAIN}/api/liondor/post/show/${params.id}`)
  const data = await res.json()
  console.log(data);

  return {
    props: {
      posts: data
    }
  }
}

const Id = ({posts}) => {
  const router = useRouter();
  const { id } = router.query
  return (
    <p>Post: {id}</p>
  );
}

export default Id;