import styles from '@/styles/corapura/components/releaseList.module.scss'
import PageLayoutCorapura from "@/components/Layouts/pageLayoutCorapura";
import { useCallback, useEffect, useState } from "react";
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
import searchIcon from '@/images/corapura/common/search.svg'
import { useRouter } from 'next/router';

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

  const router = useRouter()
  const tags = posts.tags
  const tagFilter = tags.filter((tag, index) => {
    return index < 20 || parseInt(router.query.tag_id) === parseInt(tag.id)
  })
  const [disabled, setDisabled] = useState(false)
  const [releases, setReleases] = useState(posts.pr)
  const [nowPage, setNowPage] = useState(posts.now_page)
  const [maxPage, setMaxPage] = useState(posts.page_max)
  const [search, setSearch] = useState("")
  const [tag, setTag] = useState("")
  const [sort, setSort] = useState("new")
  const [page, setPage] = useState(1)
  const [openSort, setOpenSort] = useState(false)
  const { handleSubmit, register } = useForm()

  const onLoadSelectTag = async () => {
    const nowTag = tagFilter.filter((tag) => {
      return parseInt(tag.id) === parseInt(router.query.tag_id)
    })
    setTag(nowTag?.[0]?.id)
  }

  useEffect(() => {
    if (router) {
      onLoadSelectTag()
    }
  }, [router])

  const handleSort = useCallback(async () => {
    await csrf()

    await axios.post(`/api/corapura/pr`, {
      s: search,
      tag_id: tag,
      sort: sort,
      page: parseInt(page),
    })
    .then((res) => {
      // console.log(res)
      setReleases(res.data.pr)
      setNowPage(res.data.now_page)
      setMaxPage(res.data.page_max)
    }).catch((e) => {
      console.error(e)
    })
  }, [
    setReleases,
    setNowPage,
    setMaxPage,
    search,
    tag,
    sort,
    page,
  ])

  useEffect(async () => {
    // if (disabled) return
    setDisabled(true)
    setOpenSort(false)

    await handleSort()

    await setDisabled(false)
  }, [
    tag,
    sort,
    page,
  ])

  const handleClickTag = useCallback(async (e) => {
    if (parseInt(tag) === parseInt(e.target.value)) {
      setTag(null)
      return
    }
    setTag(e.target.value)
  }, [tag, setTag])

  const handleClickSort = useCallback(async (e) => {
    setSort(e.currentTarget.value)
  }, [setSort])

  const handleClickOpenSort = useCallback(async () => {
    setOpenSort(prevState => !prevState)
  }, [])

  const handleClickPage = useCallback(async (e) => {
    setPage(e.currentTarget.value)
  }, [setPage])

  const onSortForm = useCallback(async (data) => {
    if (disabled) return
    setDisabled(true)
    setOpenSort(false)
    await csrf()

    await axios.post(`/api/corapura/pr`, {
      s: data.s ? data.s : "",
      tag_id: tag,
      sort: sort,
      page: parseInt(page),
    })
    .then((res) => {
      // console.log(res)
      setReleases(res.data.pr)
      setNowPage(res.data.now_page)
      setMaxPage(res.data.page_max)
    }).catch((e) => {
      console.error(e)
    })

    setSearch(data.s)
    await setDisabled(false)
  }, [
    disabled,
    setDisabled,
    setReleases,
    setNowPage,
    setMaxPage,
    setSearch,
    tag,
    sort,
    page,
  ])

  return (
    <section className="cont1">
      <Container small>
        <h2 className="ttl1">プレスリリース一覧</h2>
        <form onSubmit={handleSubmit(onSortForm)}>
          <div className={styles.searchBox}>
            <input
              type="text"
              {...register("s")}
              placeholder="気になるワードを検索"
            />
            <button>
              <img src={searchIcon.src} alt="検索アイコン" />
            </button>
          </div>
        </form>

        <div className={styles.sort}>
          <button
            type="button"
            className={styles.btn}
            onClick={handleClickOpenSort}
          >
            <div className={styles.icon}>
              <img src={sortIcon.src} alt="アイコン" />
            </div>
            並べ替え
          </button>
          {openSort ?
            <div className={styles.box}>
              {sorts.map((item, index) => (
                <button
                  value={item.value}
                  className={sort === item.value ? styles.current : null}
                  onClick={handleClickSort}
                  key={index}
                >{item.name}</button>
              ))}
            </div>
          : null}
        </div>

        <div className={styles.tagBtnBox}>
          {tags.map((item, index) => (
            <button
            value={item.id}
            className={`${styles.tagBtn} ${item.id === parseInt(tag) ? styles.current : null}`}
              onClick={handleClickTag}
              key={index}
            >{item.name}</button>
          ))}
        </div>

        {!disabled ?
          <>
            <article className={styles.prList}>
              {releases.map((release, index) => (
                <Link href={`/corapura/press_release/${release.id}`} key={index}>
                  <a>
                    <div className={styles.imgBox}>
                      <img src={release.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${release.thumbs}` : dummy.src} alt="プレスリリースのサムネイル画像" />
                    </div>
                    <p className={styles.ttl}>{release.title}</p>
                    <div className={`${styles.view} en`}>
                      <img src={view.src} alt="アイコン" />
                      {release.c_pr_counts_count}view
                    </div>
                    <div className={styles.company}>
                      <div className={styles.logoBox}>
                        {release.user.c_profile.thumbs ? <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${release.user.c_profile.thumbs}`} alt="プロフィール画像" /> : null}
                      </div>
                      {release.user.c_profile.nicename}
                    </div>
                    <div className={styles.tags}>
                      {release.c_tags.map((tag, index) => (
                        <p className={styles.tag} key={index}>{tag.name}</p>
                      ))}
                    </div>
                  </a>
                </Link>
              ))}
            </article>
            {parseInt(maxPage) > 1 ?
              <div className={styles.pager}>
                {parseInt(nowPage) > 1 ?
                  <button
                    className={styles.btn}
                    value={nowPage-1}
                    onClick={handleClickPage}
                  >
                    <img src={prev.src} alt="アイコン" />
                    <span>前のページへ</span>
                  </button>
                : null}
                <div className={styles.pagerBtn}>
                  {parseInt(nowPage) > 1 ?
                    <button
                      className="hoverEffect"
                      value={nowPage-1}
                      onClick={handleClickPage}
                    >
                      {nowPage-1}
                    </button>
                  : null}
                  <button type="button" className={styles.current}>{nowPage}</button>
                  {parseInt(maxPage) !== parseInt(nowPage) ?
                    <button
                      className="hoverEffect"
                      value={nowPage+1}
                      onClick={handleClickPage}
                    >
                      {nowPage+1}
                    </button>
                  : null}
                </div>
                {parseInt(nowPage) !== parseInt(maxPage) ?
                  <button
                    className={styles.btn}
                    value={nowPage+1}
                    onClick={handleClickPage}
                  >
                    <img src={next.src} alt="アイコン" />
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