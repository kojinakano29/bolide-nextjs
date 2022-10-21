import styles from '@/styles/liondor/components/search.module.scss'
import PageLayout from "@/components/Layouts/PageLayout";
import { ArticleColumn, PageTitle, Sidebar } from '@/components/liondor';
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
  const post = posts.posts

  const sort3 = post.filter((e, index) => {
    return index < 30
  })

  return (
    <section className="cont1">
      <PageTitle title="SEARCH" ivy />
      <Container>
        <article className={styles.section}>
          <div className={styles.flex}>
            <ArticleColumn sort={sort3} />
            <Sidebar posts={posts} />
          </div>
        </article>
      </Container>
    </section>
  );
}

export default Search;

Search.getLayout = function getLayout(page) {
  return <PageLayout>{page}</PageLayout>
}