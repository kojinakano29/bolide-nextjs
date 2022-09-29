import { useRouter } from "next/router";
import PageLayout from '@/components/Layouts/PageLayout'
import Container from '@/components/Layouts/container'
import { ArticleColumn, BlogPattern8, BlogSideBar, CatNavi, PageTitle } from "@/components";
import styles from '@/styles/components/pageSingle.module.scss'

export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.API_DOMAIN}/api/liondor/post/${params.category}`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const Post = ({posts}) => {
  const pickupData = posts.pickups

  const router = useRouter();
  const { category, cat } = router.query
  const upperCat = category.toUpperCase()

  return (
    <section className="cont1">
      <PageTitle title={upperCat} ivy mb0 />
      <CatNavi />
      <Container>
        <section className={styles.section}>
          <div className={styles.flex}>
            <ArticleColumn posts={posts} />
            <BlogSideBar pickup={pickupData} />
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
            <BlogSideBar pickup={pickupData} />
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