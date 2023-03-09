import styles from '@/styles/corapura/components/list.module.scss'
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from '@/lib/axios';
import Container from '@/components/corapura/Layout/container';
import prev from '@/images/corapura/common/prev.svg'
import next from '@/images/corapura/common/next.svg'
import sortIcon from '@/images/corapura/common/sort.svg'
import { Loader, MatterCard } from '@/components/corapura';
import { zips } from '@/lib/corapura/constants';
import { useAuth } from '@/hooks/auth';
import searchIcon from '@/images/corapura/common/search.svg'

const MatterList = ({posts, influencer = false}) => {
  // console.log(posts)
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const sorts = [
    {name: "登録日の新しい順", value: "new"},
    {name: "登録日の古い順", value: "old"},
    {name: "報酬順", value: "reward"},
    {name: "締切日が近い順", value: "limit_asc"},
    {name: "締切日が遠い順", value: "limit_desc"},
  ]

  const { user } = useAuth()
  const tagList = posts.tag_list
  const cats = posts.cat_list
  const [disabled, setDisabled] = useState(false)
  const [matters, setMatters] = useState([])
  const [nowPage, setNowPage] = useState(posts.now_page)
  const [maxPage, setMaxPage] = useState(posts.page_max)
  const [search, setSearch] = useState("")
  const [zip, setZip] = useState("")
  const [cat, setCat] = useState("")
  const [reward, setReward] = useState(0)
  const [tag, setTag] = useState("")
  const [sort, setSort] = useState("new")
  const [state, setState] = useState()
  const [page, setPage] = useState(1)
  const [openSort, setOpenSort] = useState(false)
  const [bookmarkList, setBookmarkList] = useState([])
  const { handleSubmit, register } = useForm()

  const onLoadCheck = async () => {
    await csrf()

    await axios.post('/api/corapura/post_bookmark/check', {
      user_id: user?.id,
    }).then((res) => {
      // console.log(res)
      setBookmarkList(res.data)
    }).catch((e) => {
      console.error(e)
    })
  }

  const handleSort = useCallback(async () => {
    await csrf()

    await axios.post(`/api/corapura/${influencer ? "user_post" : "post"}`, {
      s: search,
      zip: zip !== "都道府県" ? zip : "",
      cat: cat,
      reward: parseInt(reward),
      tag: tag,
      sort: sort,
      state: state ? 1 : 0,
      page: parseInt(page),
    }).then((res) => {
      // console.log(res)
      setMatters(res.data.post)
      setNowPage(res.data.now_page)
      setMaxPage(res.data.page_max)
    }).catch((e) => {
      console.error(e)
    })

  }, [
    setMatters,
    setNowPage,
    setMaxPage,
    search,
    zip,
    cat,
    reward,
    tag,
    sort,
    state,
    page,
  ])

  useEffect(async () => {
    if (user) {
      await onLoadCheck()
    }
  }, [user])

  useEffect(async () => {
    if (disabled) return
    setDisabled(true)
    setOpenSort(false)

    await onLoadCheck()
    await handleSort()

    await setDisabled(false)
  }, [
    zip,
    cat,
    reward,
    tag,
    sort,
    state,
    page,
  ])

  const handleChangeZip = useCallback(async (e) => {
    setZip(e.target.value)
  }, [setZip])

  const handleChangeCategory = useCallback(async (e) => {
    setCat(e.target.value)
  }, [setCat])

  const handleChangeReward = useCallback(async (e) => {
    setReward(e.target.value)
  }, [setReward])

  const handleClickRangeClear = useCallback(async () => {
    setReward(0)
  }, [setReward])

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

  const handleChangeState = useCallback(async (e) => {
    setState(e.target.checked)
  }, [setState])

  const handleClickPage = useCallback(async (e) => {
    setPage(e.currentTarget.value)
  }, [setPage])

  const onSortForm = useCallback(async (data) => {
    if (disabled) return
    setDisabled(true)
    setOpenSort(false)
    await csrf()

    await axios.post(`/api/corapura/${influencer ? "user_post" : "post"}`, {
      s: data.s ? data.s : "",
      zip: zip !== "都道府県" ? zip : "",
      cat: cat,
      reward: parseInt(reward),
      tag: tag,
      sort: sort,
      state: state ? 1 : 0,
      page: parseInt(page),
    })
    .then((res) => {
      // console.log(res)
      setMatters(res.data.post)
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
    setMatters,
    setNowPage,
    setMaxPage,
    zip,
    cat,
    reward,
    tag,
    sort,
    state,
    page,
    setSearch,
  ])

  return (
    <section className="cont1">
      <Container small>
        <h2 className="ttl1">{influencer ? "インフルエンサー/ユーザー" : "企業"}案件一覧</h2>
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

        <div className={styles.selectBox}>
          <p className={styles.midashi}>さらに絞り込む</p>
          <div className={styles.selectFlex}>
            <select onChange={handleChangeZip}>
              {zips.map((zip, index) => (
                <option value={zip} key={index}>{zip}</option>
              ))}
            </select>
            <select onChange={handleChangeCategory}>
              <option value="">案件カテゴリ</option>
              {cats.map((cat, index) => (
                <option value={cat.id} key={index}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.rewardRange}>
          <p className={styles.midashi}>報酬</p>
          <input
            type="range"
            min={0}
            max={1000000}
            step={100000}
            value={reward}
            onChange={handleChangeReward}
          />
          <div className={styles.rewardFlex}>
            <input
              type="number"
              value={reward}
              disabled
            />
            円～
            <button type="button" className="hoverEffect" onClick={handleClickRangeClear}>クリア</button>
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

        <div className={styles.sortFlex}>
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

          <button>
            <label className={styles.finishDisplay}>
              <input
                type="checkbox"
                onChange={handleChangeState}
              />
              募集中のみ表示
            </label>
          </button>
        </div>

        {!disabled ?
          <>
            <article className={`${styles.matterList}`}>
              {matters.map((matter, index) => (
                <MatterCard matter={matter} bookmarkList={bookmarkList} list key={index} />
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

export default MatterList;