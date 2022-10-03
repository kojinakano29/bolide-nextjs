import { Date, ShowEditor } from "@/components";
import Container from "@/components/Layouts/container";
import PageLayout from "@/components/Layouts/PageLayout";
import styles from '@/styles/components/postShow.module.scss'
import Link from "next/link";

// SSR
export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/liondor/post/show/${params.id}`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const DetailPage = ({posts}) => {
  const parentSlug = posts.posts.l_category.parent_slug
  const upperParentSlug = parentSlug?.toUpperCase()
  const slugName = posts.posts.l_category.name
  const upperSlugName = slugName?.toUpperCase()
  const ttl = posts.posts.title
  const subTtl = posts.posts.sub_title
  const desc = posts.posts.discription
  const seriesPrevPost = posts.series?.prev_post
  const seriesNextPost = posts.series?.next_post
  const seriesName = posts.series.series_info.name
  const userName = posts.posts.user.name
  const createAt = posts.posts.created_at

  return (
    <>
      <section className={styles.headline}>
        <Container>
          <div className={styles.headlineMv}>
            <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${posts.posts.mv}`} alt="" />
          </div>
          <div className={styles.headlineBox}>
            <p className={styles.cat}>
              <span className={`en ${parentSlug !== null ? '' : 'none'}`}>{upperParentSlug}</span>
              <span className={parentSlug !== null ? styles.hr : 'none'}></span>
              <span className="en">{upperSlugName}</span>
            </p>
            <h2 className={styles.ttl}>{ttl}</h2>
            <h3 className={styles.subTtl}>{subTtl}</h3>
            <p className={styles.desc}>{desc}</p>
            <div className={styles.series}>
              {
                seriesPrevPost !== null
                ?
                <Link href={`/post/show/${seriesPrevPost.id}`}>
                  <a className={styles.seriesLink}>{seriesName}</a>
                </Link>
                :
                ''
              }
              {
                seriesNextPost !== null
                ?
                <Link href={`/post/show/${seriesNextPost.id}`}>
                  <a className={styles.seriesLink}>{seriesName}</a>
                </Link>
                :
                ''
              }
            </div>
            <p className={styles.name}>
              <span className="en">BY</span>
              <span className="space"></span>
              <span className="en">{userName}</span>
            </p>
            <p className={`en ${styles.time}`}><Date dateString={createAt} /></p>
          </div>
        </Container>
      </section>

      <section className={styles.showBody}>
        <Container>
          <div className={styles.bodyFlex}>
            <ShowEditor posts={posts} />
          </div>
        </Container>
      </section>
    </>
  );
}

export default DetailPage;

DetailPage.getLayout = function getLayout(page) {
  return <PageLayout>{page}</PageLayout>
}