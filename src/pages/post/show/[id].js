import { useRouter } from "next/router";

const Id = () => {
  const router = useRouter();
  const { id } = router.query
  return (
    <p>Post: {id}</p>
  );
}

export default Id;