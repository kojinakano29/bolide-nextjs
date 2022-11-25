import styles from '@/styles/corapura/components/salon.module.scss'
import PageLayoutCorapura from "@/components/Layouts/pageLayoutCorapura";
import Container from '@/components/corapura/Layout/container';
import { useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';
import axios from '@/lib/axios';
import Link from 'next/link';
import dummy from '@/images/corapura/common/dummy5.svg'
import prev from '@/images/corapura/common/prev.svg'
import next from '@/images/corapura/common/next.svg'

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_CORAPURA}/salon`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const OnlineSalonList = ({posts}) => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')
  // console.log(posts)

  const [disabled, setDisabled] = useState(false)
  const [search, setSearch] = useState("")
  const [salons, setSalons] = useState(posts.salon)
  const [nowPage, setNowPage] = useState(posts.now_page)
  const [maxPage, setMaxPage] = useState(posts.page_max)
  const { handleSubmit, register } = useForm()

  const onSearchForm = useCallback(async (data) => {
    await csrf()

    await axios.post(`/api/corapura/salon?s=${data.s}&page=${nowPage}`)
    .then((res) => {
      // console.log(res)
      setSalons(res.data.salon)
      setNowPage(res.data.now_page)
      setMaxPage(res.data.page_max)
    }).catch((e) => {
      console.error(e)
    })
  }, [nowPage, setSalons, setNowPage, setMaxPage])

  const onSubmit = useCallback(async (data) => {
    // console.log(data)
    setSearch(data.search)

    onSearchForm({
      s: data.search,
    })
  }, [onSearchForm, setSearch])

  const handleClickNext = useCallback(async () => {
    if (disabled) return
    setDisabled(true)
    await csrf()

    await axios.post(`/api/corapura/salon?s=${search}&page=${nowPage+1}`)
    .then((res) => {
      // console.log(res)
      setSalons(res.data.salon)
      setNowPage(res.data.now_page)
      setMaxPage(res.data.page_max)
    }).catch((e) =>{
      console.error(e)
    })

    await setDisabled(false)
  }, [setDisabled, search, nowPage, setSalons, setNowPage, setMaxPage])

  const handleClickPrev = useCallback(async () => {
    if (disabled) return
    setDisabled(true)
    await csrf()

    await axios.post(`/api/corapura/salon?s=${search}&page=${nowPage-1}`)
    .then((res) => {
      // console.log(res)
      setSalons(res.data.salon)
      setNowPage(res.data.now_page)
      setMaxPage(res.data.page_max)
    }).catch((e) => {
      console.error(e)
    })

    await setDisabled(false)
  }, [setDisabled, search, nowPage, setSalons, setNowPage, setMaxPage])

  return (
    <section className="cont1">
      <Container small>
        <h2 className="ttl1">オンラインサロン一覧</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.searchBox}>
            <input
              type="text"
              {...register("search")}
              placeholder="気になるワードを検索"
            />
          </div>
        </form>
        <article className={styles.salonList}>
          {salons.map((salon, index) => (
            <Link href={`/corapura/salon/${salon.id}`} key={index}>
              <a>
                <div className={styles.imgBox}>
                  <img src={salon.thumbs ? salon.thumbs : dummy.src} alt="" />
                </div>
                <p className={styles.ttl}>{salon.title}</p>
                <p className={styles.desc}>{salon.content.substring(0, 45)}...</p>
                <div className={styles.tags}>
                  {salon.c_tags.map((tag, index) => (
                    <p className={styles.tag} key={index}>{tag.name}</p>
                  ))}
                    <p className={styles.tag}>スキルアップ</p>
                </div>
              </a>
            </Link>
          ))}
        </article>
        {maxPage !== 1 ?
          <div className={styles.pager}>
            {nowPage !== 1 ?
              <button
                type="button"
                className={styles.btn}
                onClick={handleClickPrev}
              >
                <img src={prev.src} alt="" />
                <span>前のページへ</span>
              </button>
            : null}
            <div className={styles.pagerBtn}>
              {nowPage !== 1 ?
                <button
                  type="button"
                  onClick={handleClickPrev}
                  className="hoverEffect"
                >{nowPage-1}</button>
              : null}
              <button type="button" className={styles.current}>{nowPage}</button>
              {maxPage !== nowPage && maxPage-1 !== nowPage ?
                <button
                  type="button"
                  onClick={handleClickNext}
                  className="hoverEffect"
                >{nowPage+1}</button>
              : null}
            </div>
            {nowPage !== maxPage ?
              <button
                type="button"
                className={styles.btn}
                onClick={handleClickNext}
              >
                <img src={next.src} alt="" />
                <span>次のページへ</span>
              </button>
            : null}
          </div>
        : null}
      </Container>
    </section>
  );
}

export default OnlineSalonList;

OnlineSalonList.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}