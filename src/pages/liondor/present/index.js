import { ArticleColumn, PageTitle, Sidebar } from "@/components/liondor";
import Container from "@/components/Layouts/container";
import PageLayout from "@/components/Layouts/PageLayout";
import styles from '@/styles/liondor/components/present.module.scss'

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/liondor/present`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const Present = ({posts}) => {
  const postPresent = posts.presents

  const sort1 = postPresent.filter((e, index) => {
    return index < 15
  })

  return (
    <section className="cont1">
      <PageTitle title="PRESENT" ivy />
      <Container>
        <article className={styles.section}>
          <div className={styles.flex}>
            <ArticleColumn sort={sort1} present />
            <Sidebar posts={posts} />
          </div>
        </article>
      </Container>
    </section>
  );
}

export default Present;

Present.getLayout = function getLayout(page) {
  return <PageLayout>{page}</PageLayout>
}