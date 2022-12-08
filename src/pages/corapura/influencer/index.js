import styles from '@/styles/corapura/components/list.module.scss'
import PageLayoutCorapura from "@/components/Layouts/pageLayoutCorapura";
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from '@/lib/axios';
import Container from '@/components/corapura/Layout/container';
import prev from '@/images/corapura/common/prev.svg'
import next from '@/images/corapura/common/next.svg'
import sortIcon from '@/images/corapura/common/sort.svg'
import dummy from '@/images/corapura/common/dummy1.svg'
import { Loader } from '@/components/corapura';
import Link from 'next/link';
import { zips, socialNetworkingService, followers } from '@/lib/corapura/constants';

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_CORAPURA}/user`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const InfluencerList = ({posts}) => {
  // console.log(posts)
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const sorts = [
    {name: "登録日の新しい順", value: "new"},
    {name: "登録日の古い順", value: "old"},
    {name: "お気に入りが多い順", value: "follow"},
    {name: "フォロワー数が多い順", value: "sns_follower"},
  ]

  const tagList = posts.tag_list
  const skills = posts.skill
  const [disabled, setDisabled] = useState(false)
  const [influencer, setInfluencer] = useState(posts.user)
  const [nowPage, setNowPage] = useState(posts.now_page)
  const [maxPage, setMaxPage] = useState(posts.page_max)
  const [search, setSearch] = useState("")
  const [zip, setZip] = useState("")
  const [skill, setSkill] = useState("")
  const [sns, setSns] = useState("")
  const [follower, setFollower] = useState("")
  const [tag, setTag] = useState("")
  const [sort, setSort] = useState("new")
  const [page, setPage] = useState(1)
  const [openSort, setOpenSort] = useState(false)
  const { handleSubmit, register } = useForm()

  const handleSort = useCallback(async () => {
    await csrf()

    await axios.post('/api/corapura/user', {
      s: search,
      zip: zip !== "都道府県" ? zip : "",
      skill: skill,
      sns: sns,
      sns_follower: parseInt(follower),
      tag: tag,
      sort: sort,
      page: parseInt(page),
    }).then((res) => {
      // console.log(res)
      setInfluencer(res.data.user)
      setNowPage(res.data.now_page)
      setMaxPage(res.data.page_max)
    }).catch((e) => {
      console.error(e)
    })
  }, [
    setInfluencer,
    setNowPage,
    setMaxPage,
    search,
    zip,
    skill,
    sns,
    follower,
    tag,
    sort,
    page,
  ])

  useEffect(async () => {
    if (disabled) return
    setDisabled(true)
    setOpenSort(false)

    await handleSort()

    await setDisabled(false)
  }, [
    zip,
    skill,
    sns,
    follower,
    tag,
    sort,
    page,
  ])

  const handleChangeZip = useCallback(async (e) => {
    setZip(e.target.value)
  }, [setZip])

  const handleChangeSkill = useCallback(async (e) => {
    setSkill(e.target.value)
  }, [setSkill])

  const handleChangeSns = useCallback(async (e) => {
    setSns(e.target.value)
  }, [setSns])

  const handleChangeFollower = useCallback(async (e) => {
    setFollower(e.target.value)
  }, [setFollower])

  const handleClickTag = useCallback(async (e) => {
    setTag(e.target.value)
  }, [setTag])

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

    await axios.post(`/api/corapura/user`, {
      s: data.s ? data.s : "",
      zip: zip !== "都道府県" ? zip : "",
      skill: skill,
      sns: sns,
      sns_follower: parseInt(follower),
      tag: tag,
      sort: sort,
      page: parseInt(page),
    }).then((res) => {
      // console.log(res)
      setInfluencer(res.data.user)
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
    setInfluencer,
    setNowPage,
    setMaxPage,
    setSearch,
    zip,
    skill,
    sns,
    follower,
    tag,
    sort,
    page,
  ])

  return (
    <section className="cont1">
      <Container small>
        <h2 className="ttl1">インフルエンサー/ユーザー一覧</h2>
        <form onSubmit={handleSubmit(onSortForm)}>
          <div className={styles.searchBox}>
            <input
              type="text"
              {...register("s")}
              placeholder="気になるワードを検索"
            />
          </div>
        </form>

        <div className={styles.selectBox}>
          <p className={styles.midashi}>さらに絞り込む</p>
          <div className={styles.selectFlex}>
            <select onChange={handleChangeZip}>
              {zips.map((zip, index) => (
                <option value={zip} key={index}>{zip}</option>
              ))}
            </select>
            <select onChange={handleChangeSkill}>
              <option value="">得意分野</option>
              {skills.map((skill, index) => (
                <option value={skill} key={index}>{skill}</option>
              ))}
            </select>
            <select onChange={handleChangeSns}>
              <option value="">SNS</option>
              {socialNetworkingService.map((sns, index) => (
                <option value={sns} key={index}>{sns}</option>
              ))}
            </select>
            <select onChange={handleChangeFollower}>
              <option value="0">SNSフォロワー数</option>
              {followers.map((follower, index) => (
                <option value={follower} key={index}>{follower}人以上</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.tagBtnArea}>
          <p className={styles.midashi}>タグから探す</p>
          <div className={styles.tagBtnBox}>
            {tagList.map((item, index) => (
              <button
                value={item.id}
                className={`${styles.tagBtn} ${item.id === parseInt(tag) ? styles.current : null}`}
                onClick={handleClickTag}
                key={index}
              >{item.name}</button>
            ))}
          </div>
        </div>

        <div className={styles.sort}>
          <button
            type="button"
            className={styles.btn}
            onClick={handleClickOpenSort}
          >
            <div className={styles.icon}>
              <img src={sortIcon.src} alt="" />
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

        {!disabled ?
          <>
            <article className={`${styles.list} ${styles.influencerList}`}>
              {influencer.map((item, index) => (
                <Link href={`/corapura/influencer/${item.user.id}`} key={index}>
                  <a>
                    <div className={styles.imgBox}>
                      <img src={item.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${item.thumbs}` : dummy.src} alt="" />
                    </div>
                    <p className={styles.catch}>{item.title}</p>
                    <p className={styles.name}>{item.nicename}</p>
                    <p className={styles.desc}>{item.profile.substring(0, 35)}...</p>
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
                    <img src={prev.src} alt="" />
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

export default InfluencerList;

InfluencerList.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}