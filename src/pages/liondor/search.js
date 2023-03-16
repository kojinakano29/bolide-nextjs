import styles from '@/styles/liondor/components/search.module.scss'
import PageLayoutLiondor from "@/components/Layouts/PageLayoutLiondor";
import { ArticleColumn, PageTitle, Sidebar } from '@/components/liondor';
import Container from '@/components/liondor/Layouts/container';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/auth';

// SSR
export const getServerSideProps = async ({query}) => {
  let page = null
  if (query.page) {
    page = query.page
  } else {
    page = "1"
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_LIONDOR}/search/?s=${query.s}&page=${page}`)
  const data = await res.json()

  return {
    props: {
        posts: data
    }
  }
}

const Search = ({posts}) => {
  // console.log(posts)
  const router = useRouter(null)
  const { user } = useAuth({middleware: 'auth', type: 'liondor'})

  let current = null
  if (router.query.page) {
    current = parseInt(router.query.page)
  } else {
    current = 1
  }

  const post = posts.posts

  const sort3 = post.filter((e, index) => {
    return index < 30
  })

  const onClickNext = () => {
    const nextPage = current + 1
    router.push(`/liondor/search/?s=${router.query.s}&page=${nextPage}`)
  }
  const onClickPrev = () => {
    const prevPage = current - 1
    router.push(`/liondor/search/?s=${router.query.s}&page=${prevPage}`)
  }

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
        <div className="pagerBox">
          {current === 1 ? '' : <button className="pagerBtn pagerPrev" onClick={onClickPrev}></button>}
          <p className="pagerCurrent en">{current}/{posts.page_max !== 0 ? posts.page_max : "1"}</p>
          {posts.page_max === 0 || posts.page_max === current ? '' : <button className="pagerBtn pagerNext" onClick={onClickNext}></button>}
        </div>
      </Container>
    </section>
  );
}

export default Search;

Search.getLayout = function getLayout(page) {
  return <PageLayoutLiondor>{page}</PageLayoutLiondor>
}