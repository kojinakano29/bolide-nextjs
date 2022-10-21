import PageLayout from '@/components/Layouts/PageLayout'
import Container from '@/components/Layouts/container'
import { ArticleColumn, BlogPattern8, CatNavi, PageTitle, Sidebar } from "@/components/liondor";
import styles from '@/styles/liondor/components/pageSingle.module.scss'
import { useRouter } from 'next/router';

export const getServerSideProps = async ({params, query}) => {
  let page = null
  if (query.page) {
    page = query.page
  } else {
    page = "1"
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/liondor/post/${params.category}/?page=${page}`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const Post = ({posts}) => {
  const router = useRouter(null)
  let current = null
  if (router.query.page) {
    current = parseInt(router.query.page)
  } else {
    current = 1
  }

  const pickupData = posts.pickups
  const parentSlug = posts.posts[0].l_category.parent_slug
  const upperParentSlug = parentSlug?.toUpperCase()
  const slug = posts.posts[0].l_category.slug
  const upperSlug = slug?.toUpperCase()
  const post = posts.posts

  const sort1 = post.filter((e, index) => {
    return index < 15
  })

  const sort2 = post.filter((e, index) => {
    return index > 14 && index < 30
  })

  const onClickNext = () => {
    const nextPage = current + 1
    router.push(`/liondor/post/${router.query.category}/?page=${nextPage}`)
  }
  const onClickPrev = () => {
    const prevPage = current - 1
    router.push(`/liondor/post/${router.query.category}/?page=${prevPage}`)
  }

  return (
    <section className="cont1">
      <PageTitle title={parentSlug !== null ? upperParentSlug : upperSlug} ivy mb0 />
      <CatNavi parentSlug={parentSlug !== null ? parentSlug : slug} />
      <Container>
        <article className={styles.section}>
          <div className={styles.flex}>
            <ArticleColumn sort={sort1} />
            <Sidebar posts={posts} />
          </div>
        </article>
      </Container>
      <article className={styles.section2}>
        <div className={styles.wrapper}>
          <Container>
              <BlogPattern8 pattern={pickupData} must />
          </Container>
        </div>
      </article>
      {
        sort2.length !== 0 ?
        <Container>
          <article className={styles.section3}>
            <div className={styles.flex}>
              <ArticleColumn sort={sort2} />
              <Sidebar posts={posts} />
            </div>
          </article>
        </Container>
        : null
      }
      {
        sort2.length !== 0 ?
        <article className={styles.section2}>
          <div className={styles.wrapper}>
            <Container>
                <BlogPattern8 pattern={pickupData} must />
            </Container>
          </div>
        </article>
        : null
      }
      <div className="pagerBox">
        {current === 1 ? '' : <button className="pagerBtn pagerPrev" onClick={onClickPrev}></button>}
        <p className="pagerCurrent en">{current}/{posts.page_max}</p>
        {posts.page_max === current ? '' : <button className="pagerBtn pagerNext" onClick={onClickNext}></button>}
      </div>
    </section>
  );
}

export default Post;

Post.getLayout = function getLayout(page) {
  return <PageLayout>{page}</PageLayout>
}