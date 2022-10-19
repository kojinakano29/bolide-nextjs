import styles from '@/styles/components/search.module.scss'
import PageLayout from "@/components/Layouts/PageLayout";
import { PageTitle } from '@/components';
import Container from '@/components/Layouts/container';

// SSR
export const getServerSideProps = async ({query}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/liondor/search/?s=${query.s}`)
  const data = await res.json()

  return {
    props: {
        posts: data
    }
  }
}

const Search = ({posts}) => {
  console.log(posts)

  return (
    <section className="cont1">
      <PageTitle title="SEARCH" ivy />
      <Container>
        {/* <article className={styles.section}>
          <div className={styles.flex}>
            <ArticleColumn posts={post} />
            <Sidebar posts={posts} />
          </div>
        </article> */}
      </Container>
    </section>
  );
}

export default Search;

Search.getLayout = function getLayout(page) {
  return <PageLayout>{page}</PageLayout>
}