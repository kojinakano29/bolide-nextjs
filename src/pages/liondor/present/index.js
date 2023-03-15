import { ArticleColumn, PageTitle, Sidebar } from "@/components/liondor";
import Container from "@/components/liondor/Layouts/container";
import PageLayoutLiondor from "@/components/Layouts/PageLayoutLiondor";
import styles from '@/styles/liondor/components/present.module.scss'
import { useRouter } from "next/router";

export const getServerSideProps = async ({query}) => {
  let page = null
  if (query.page) {
    page = query.page
  } else {
    page = "1"
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_LIONDOR}/present/?page=${page}`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const Present = ({posts}) => {
  const router = useRouter(null)

  let current = null
  if (router.query.page) {
    current = parseInt(router.query.page)
  } else {
    current = 1
  }

  const postPresent = posts.presents

  const sort1 = postPresent.filter((e, index) => {
    return index < 15
  })

  const onClickNext = () => {
    const nextPage = current + 1
    router.push(`/liondor/present/?page=${nextPage}`)
  }
  const onClickPrev = () => {
    const prevPage = current - 1
    router.push(`/liondor/present/?page=${prevPage}`)
  }

  const date = new Date()
  const year = date.getFullYear()
  const month = ("00" + (date.getMonth()+1)).slice(-2)
  const day = ("00" + date.getDate()).slice(-2)
  const today = `${year}-${month}-${day}`

  return (
    <section className="cont1">
      <PageTitle title="PRESENT" ivy />
      {sort1.length !== 0 ?
        <Container>
          <article className={styles.section}>
            <div className={styles.flex}>
              <ArticleColumn sort={sort1} present today={today} />
              <Sidebar posts={posts} />
            </div>
          </article>
          {posts.page_max > 0 ?
            <div className="pagerBox">
              {current === 1 ? '' : <button className="pagerBtn pagerPrev" onClick={onClickPrev}></button>}
              <p className="pagerCurrent en">{current}/{posts.page_max}</p>
              {posts.page_max === current ? '' : <button className="pagerBtn pagerNext" onClick={onClickNext}></button>}
            </div>
          : null}
        </Container>
        :
        <p className={`${styles.noneLength} ivy`}>PRESENTがありません</p>
      }
    </section>
  );
}

export default Present;

Present.getLayout = function getLayout(page) {
  return <PageLayoutLiondor>{page}</PageLayoutLiondor>
}