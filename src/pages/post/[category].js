import PageLayout from '@/components/Layouts/PageLayout'
import Container from '@/components/Layouts/container'
import { ArticleColumn, BlogPattern8, CatNavi, PageTitle, Sidebar } from "@/components";
import styles from '@/styles/components/pageSingle.module.scss'

export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/liondor/post/${params.category}`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const Post = ({posts}) => {
  const pickupData = posts.pickups

  const parentSlug = posts.posts[0].l_category.parent_slug
  const upperParentSlug = parentSlug?.toUpperCase()
  const slug = posts.posts[0].l_category.slug
  const upperSlug = slug?.toUpperCase()

  return (
    <section className="cont1">
      <PageTitle title={parentSlug !== null ? upperParentSlug : upperSlug} ivy mb0 />
      <CatNavi parentSlug={parentSlug !== null ? parentSlug : slug} />
      <Container>
        <section className={styles.section}>
          <div className={styles.flex}>
            <ArticleColumn posts={posts} />
            <Sidebar posts={posts} />
          </div>
        </section>
      </Container>
      <section className={styles.section2}>
        <div className={styles.wrapper}>
          <Container>
              <BlogPattern8 pattern={pickupData} must />
          </Container>
        </div>
      </section>
      <Container>
        <section className={styles.section3}>
          <div className={styles.flex}>
            <ArticleColumn posts={posts} type2 />
            <Sidebar posts={posts} />
          </div>
        </section>
      </Container>
      <section className={styles.section2}>
        <div className={styles.wrapper}>
          <Container>
              <BlogPattern8 pattern={pickupData} must />
          </Container>
        </div>
      </section>
    </section>
  );
}

export default Post;

Post.getLayout = function getLayout(page) {
  return <PageLayout>{page}</PageLayout>
}