import styles from '@/styles/corapura/components/list.module.scss'
import PageLayoutCorapura from "@/components/Layouts/pageLayoutCorapura";
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from '@/lib/axios';
import Container from '@/components/corapura/Layout/container';
import prev from '@/images/corapura/common/prev.svg'
import next from '@/images/corapura/common/next.svg'
import sortIcon from '@/images/corapura/common/sort.svg'
import dummy from '@/images/corapura/common/dummy1.svg'
import { Loader, MatterCard } from '@/components/corapura';
import Link from 'next/link';
import { zip } from '@/lib/corapura/constants';

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_CORAPURA}/post`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const MatterList = ({posts}) => {
  console.log(posts)
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const sorts = [
    {name: "登録日の新しい順", value: "new"},
    {name: "登録日の古い順", value: "old"},
    {name: "報酬順", value: "reward"},
    {name: "締切日が近い順", value: "limit_asc"},
    {name: "締切日が遠い順", value: "limit_desc"},
  ]

  const tagList = posts.tag_list
  const cats = posts.cat_list
  const [disabled, setDisabled] = useState(false)
  const [matters, setMatters] = useState(posts.post)
  const [nowPage, setNowPage] = useState(posts.now_page)
  const [maxPage, setMaxPage] = useState(posts.page_max)
  const [sort, setSort] = useState("new")
  const [tags, setTags] = useState()
  const [openSort, setOpenSort] = useState(false)
  const [range, setRange] = useState(0)
  const { handleSubmit, register } = useForm()

  const handleChangeRange = useCallback(async (e) => {
    setRange(e.target.value)
  }, [setRange])

  const handleClickRangeClear = useCallback(async () => {
    setRange(0)
  }, [setRange])

  const handleClickOpenSort = useCallback(async () => {
    setOpenSort(prevState => !prevState)
  }, [])

  const onSortForm = useCallback(async (data) => {
    if (disabled) return
    setDisabled(true)
    setOpenSort(false)
    await csrf()

    await axios.post(`/api/corapura/post`, data)
    .then((res) => {
      console.log(res)
      setMatters(res.data.post)
      setNowPage(res.data.now_page)
      setMaxPage(res.data.page_max)
    }).catch((e) => {
      console.error(e)
    })

    await setDisabled(false)
  }, [disabled, setDisabled, setMatters, setNowPage, setMaxPage])

  const onSubmit = useCallback(async (data) => {
    console.log(data)
    setSort(data.sort)
    setTags(data.tag)

    onSortForm({
      s: data.s ? data.s : "",
      zip: data.zip,
      cat: data.cat,
      tag: data.tag ? data.tag : "",
      sort: data.sort,
      state: data.state ? 1 : 0,
      page: data.page ? parseInt(data.page) : parseInt(nowPage),
    })
  }, [setSort, setTags, onSortForm, nowPage])

  return (
    <section className="cont1">
      <Container small>
        <h2 className="ttl1">企業案件一覧</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.searchBox}>
            <input
              type="text"
              {...register("search")}
              placeholder="気になるワードを検索"
            />
          </div>

          <div className={styles.selectBox}>
            <p className={styles.midashi}>さらに絞り込む</p>
            <div className={styles.selectFlex}>
              <button>
                <select {...register("zip")}>
                  {zip.map((zip, index) => (
                    <option value={zip} key={index}>{zip}</option>
                  ))}
                </select>
              </button>
              <button>
                <select {...register("cat")}>
                  <option value="案件カテゴリ">案件カテゴリ</option>
                  {cats.map((cat, index) => (
                    <option value={cat.id} key={index}>{cat.name}</option>
                  ))}
                </select>
              </button>
            </div>
          </div>

          <div className={styles.rewardRange}>
            <p className={styles.midashi}>報酬</p>
            <input
              type="range"
              min={0}
              max={1000000}
              step={100000}
              value={range}
              onChange={handleChangeRange}
            />
            <div className={styles.rewardFlex}>
              <input type="number" defaultValue={range} disabled />
              円～
              <button type="button" className="hoverEffect" onClick={handleClickRangeClear}>クリア</button>
            </div>
          </div>

          <div className={styles.tagBtnArea}>
            <p className={styles.midashi}>タグから探す</p>
            <div className={styles.tagBtnBox}>
              {tagList.map((tag, index) => (
                <button key={index}>
                  <label className={`${styles.tagBtn} ${tag.id === parseInt(tags) ? styles.current : null}`}>
                    {tag.name}
                    <input
                      type="radio"
                      value={tag.id}
                      {...register("tag")}
                    />
                  </label>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.sortFlex}>
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
                    <button key={index} className={sort === item.value ? styles.current : null}>
                      <label>
                        {item.name}
                        <input
                          type="radio"
                          value={item.value}
                          {...register("sort")}
                        />
                      </label>
                    </button>
                  ))}
                </div>
              : null}
            </div>

            <button>
              <label className={styles.finishDisplay}>
                <input
                  type="checkbox"
                  {...register("state")}
                />
                募集中のみ表示
              </label>
            </button>
          </div>

          {!disabled ?
            <>
              <article className={`${styles.matterList}`}>
                {matters.map((matter, index) => (
                  <MatterCard matter={matter} list key={index} />
                ))}
              </article>

              {parseInt(maxPage) !== 1 ?
                <div className={styles.pager}>
                  {parseInt(nowPage) !== 1 ?
                    <button className={styles.btn} >
                      <label>
                        <input
                          type="submit"
                          value={parseInt(nowPage)-1}
                          {...register("page")}
                        />
                        <img src={prev.src} alt="" />
                        <span>前のページへ</span>
                      </label>
                    </button>
                  : null}
                  <div className={styles.pagerBtn}>
                    {parseInt(nowPage) !== 1 ?
                      <button className="hoverEffect" >
                        <label>
                          <input
                            type="submit"
                            value={parseInt(nowPage)-1}
                            {...register("page")}
                          />
                          {parseInt(nowPage)-1}
                        </label>
                      </button>
                    : null}
                    <button type="button" className={styles.current}>{parseInt(nowPage)}</button>
                    {parseInt(maxPage) !== parseInt(nowPage) ?
                      <button className="hoverEffect" >
                        <label>
                          <input
                            type="submit"
                            value={parseInt(nowPage)+1}
                            {...register("page")}
                          />
                          {parseInt(nowPage)+1}
                        </label>
                      </button>
                    : null}
                  </div>
                  {parseInt(nowPage) !== parseInt(maxPage) ?
                    <button className={styles.btn} >
                      <label>
                        <input
                          type="submit"
                          value={parseInt(nowPage)+1}
                          {...register("page")}
                        />
                        <img src={next.src} alt="" />
                        <span>次のページへ</span>
                      </label>
                    </button>
                  : null}
                </div>
              : null}
            </>
          : <Loader />}
        </form>
      </Container>
    </section>
  );
}

export default MatterList;

MatterList.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}