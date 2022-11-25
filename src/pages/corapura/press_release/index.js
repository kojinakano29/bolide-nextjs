import styles from '@/styles/corapura/components/releaseList.module.scss'
import PageLayoutCorapura from "@/components/Layouts/pageLayoutCorapura";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Container from '@/components/corapura/Layout/container';
import dummy from '@/images/corapura/common/dummy7.svg'
import prev from '@/images/corapura/common/prev.svg'
import next from '@/images/corapura/common/next.svg'
import view from '@/images/corapura/parts/material_view.svg'
import sortIcon from '@/images/corapura/common/sort.svg'
import Link from 'next/link';
import axios from '@/lib/axios';
import { Loader } from '@/components/corapura';

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_CORAPURA}/pr`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const PressReleaseList = ({posts}) => {
  // console.log(posts)
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const sorts = [
    {name: "新着順", value: "new"},
    {name: "保存数が多い順", value: "bookmark"},
  ]

  const tags = posts.tags
  const [disabled, setDisabled] = useState(false)
  const [search, setSearch] = useState("")
  const [releases, setReleases] = useState(posts.pr)
  const [nowPage, setNowPage] = useState(posts.now_page)
  const [maxPage, setMaxPage] = useState(posts.page_max)
  const [sort, setSort] = useState("new")
  const [tag, setTag] = useState("")
  const [openSort, setOpenSort] = useState(false)
  const { handleSubmit, register } = useForm()

  const handleClickTags = useCallback(async (e) => {
    if (disabled) return
    setDisabled(true)
    await setOpenSort(false)
    await csrf()

    await axios.post(`/api/corapura/pr?s=${search}&sort=${sort}&tag_id=${e.target.value}&page=1`)
    .then((res) => {
      // console.log(res)
      setReleases(res.data.pr)
      setNowPage(res.data.now_page)
      setMaxPage(res.data.page_max)
      setTag(res.data.tag_id)
    }).catch((e) => {
      console.error(e)
    })

    await setDisabled(false)
  }, [disabled, setDisabled, search, sort, setReleases, setNowPage, setMaxPage, setTag])

  const handleClickOpenSort = useCallback(async () => {
    setOpenSort(prevState => !prevState)
  }, [])

  const handleClickSort = useCallback(async (e) => {
    if (disabled) return
    setDisabled(true)
    await setOpenSort(false)
    await csrf()

    await axios.post(`/api/corapura/pr?s=${search}&sort=${e.target.value}&tag_id=${tag}&page=1`)
    .then((res) => {
      // console.log(res)
      setReleases(res.data.pr)
      setNowPage(res.data.now_page)
      setMaxPage(res.data.page_max)
      setSort(res.data.sort)
    }).catch((e) => {
      console.error(e)
    })

    await setDisabled(false)
  }, [disabled, setDisabled, setSort, search, tag, setReleases, setNowPage, setMaxPage])

  const onSearchForm = useCallback(async (data) => {
    if (disabled) return
    setDisabled(true)
    await setOpenSort(false)
    await csrf()

    await axios.post(`/api/corapura/pr?s=${data.s}&sort=${sort}&tag_id=${tag}&page=${nowPage}`)
    .then((res) => {
      // console.log(res)
      setReleases(res.data.pr)
      setNowPage(res.data.now_page)
      setMaxPage(res.data.page_max)
    }).catch((e) => {
      console.error(e)
    })
    await setDisabled(false)
  }, [disabled, setDisabled, nowPage, sort, tag, setReleases, setNowPage, setMaxPage])

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

    await axios.post(`/api/corapura/pr?s=${search}&sort=${sort}&tag_id=${tag}&page=${parseInt(nowPage)+1}`)
    .then((res) => {
      // console.log(res)
      setReleases(res.data.pr)
      setNowPage(res.data.now_page)
      setMaxPage(res.data.page_max)
    }).catch((e) =>{
      console.error(e)
    })

    await setDisabled(false)
  }, [disabled, setDisabled, search, nowPage, sort, tag, setReleases, setNowPage, setMaxPage])

  const handleClickPrev = useCallback(async () => {
    if (disabled) return
    setDisabled(true)
    await csrf()

    await axios.post(`/api/corapura/pr?s=${search}&sort=${sort}&tag_id=${tag}&page=${parseInt(nowPage)-1}`)
    .then((res) => {
      // console.log(res)
      setReleases(res.data.pr)
      setNowPage(res.data.now_page)
      setMaxPage(res.data.page_max)
    }).catch((e) => {
      console.error(e)
    })

    await setDisabled(false)
  }, [disabled, setDisabled, search, nowPage, sort, tag, setReleases, setNowPage, setMaxPage])

  return (
    <section className="cont1">
      <Container small>
        <h2 className="ttl1">プレスリリース一覧</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.searchBox}>
            <input
              type="text"
              {...register("search")}
              placeholder="気になるワードを検索"
            />
          </div>
        </form>

        <div className={styles.sort}>
          <button type="button" className={styles.btn} onClick={handleClickOpenSort}>
            <div className={styles.icon}>
              <img src={sortIcon.src} alt="" />
            </div>
            並べ替え
          </button>
          {openSort ?
            <div className={styles.box}>
              {sorts.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  className={sort === item.value ? styles.current : ""}
                  value={item.value}
                  onClick={handleClickSort}
                >{item.name}</button>
              ))}
            </div>
          : null}
        </div>

        <div className={styles.tagBtnBox}>
          {tags.map((tag, index) => (
            <button
              type="button"
              className={`${styles.tagBtn}`}
              value={tag.id}
              onClick={handleClickTags}
              key={index}
            >{tag.name}</button>
          ))}
          <button
            type="button"
            className={`${styles.tagBtn}`}
            value="2"
            onClick={handleClickTags}
          >ビューティー</button>
        </div>

        {!disabled ?
          <>
            <article className={styles.prList}>
              {releases.map((release, index) => (
                <Link href={`/corapura/press_release/${release.id}`} key={index}>
                  <a>
                    <div className={styles.imgBox}>
                      <img src={release.thumbs ? release.thumbs : dummy.src} alt="" />
                    </div>
                    <p className={styles.ttl}>{release.title}</p>
                    <div className={`${styles.view} en`}>
                      <img src={view.src} alt="" />
                      {release.c_pr_counts_count}view
                    </div>
                    <div className={styles.company}>
                      <div className={styles.logoBox}>
                        {release.user.c_profile.thumbs ? <img src={release.user.c_profile.thumbs} alt="" /> : null}
                      </div>
                      {release.user.c_profile.nicename}
                    </div>
                    <div className={styles.tags}>
                      {release.c_tags.map((tag, index) => (
                        <p className={styles.tag} key={index}>{tag.name}</p>
                      ))}
                        <p className={styles.tag}>スキルアップ</p>
                    </div>
                  </a>
                </Link>
              ))}
            </article>
            {parseInt(maxPage) !== 1 ?
              <div className={styles.pager}>
                {parseInt(nowPage) !== 1 ?
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
                  {parseInt(nowPage) !== 1 ?
                    <button
                      type="button"
                      onClick={handleClickPrev}
                      className="hoverEffect"
                    >{parseInt(parseInt(nowPage))-1}</button>
                  : null}
                  <button type="button" className={styles.current}>{parseInt(nowPage)}</button>
                  {parseInt(maxPage) !== parseInt(nowPage) ?
                    <button
                      type="button"
                      onClick={handleClickNext}
                      className="hoverEffect"
                    >{parseInt(parseInt(nowPage))+1}</button>
                  : null}
                </div>
                {parseInt(nowPage) !== parseInt(maxPage) ?
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
          </>
        : <Loader />}
      </Container>
    </section>
  );
}

export default PressReleaseList;

PressReleaseList.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}