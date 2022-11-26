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
import { Loader } from '@/components/corapura';
import Link from 'next/link';
import { zip } from '@/lib/corapura/constants';

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_CORAPURA}/company`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const CompanyList = ({posts}) => {
  console.log(posts)
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const sorts = [
    {name: "登録日の新しい順", value: "new"},
    {name: "登録日の古い順", value: "old"},
    {name: "お気に入りが多い順", value: "follow"},
  ]

  const sorts2 = [
    {name: "事業所・店舗", value: "office"},
    {name: "プレジデント", value: "president"},
    {name: "NFT/製品・商品/特許・技術", value: "item"},
    {name: "SDGs", value: "sust"},
    {name: "名刺", value: "card"},
    {name: "スポンサー", value: "like"},
    {name: "ビジネスインフォメーション", value: "business_information"},
  ]

  const tagList = posts.tag_list
  const [disabled, setDisabled] = useState(false)
  const [company, setCompany] = useState(posts.company)
  const [nowPage, setNowPage] = useState(posts.now_page)
  const [maxPage, setMaxPage] = useState(posts.page_max)
  const [sort, setSort] = useState("new")
  const [sort2, setSort2] = useState([])
  const [tags, setTags] = useState()
  const [openSort, setOpenSort] = useState(false)
  const { handleSubmit, register } = useForm()

  const handleClickOpenSort = useCallback(async () => {
    setOpenSort(prevState => !prevState)
  }, [])

  const onSortForm = useCallback(async (data) => {
    if (disabled) return
    setDisabled(true)
    setOpenSort(false)
    await csrf()

    await axios.post(`/api/corapura/company`, data)
    .then((res) => {
      console.log(res)
      setCompany(res.data.company)
      setNowPage(res.data.now_page)
      setMaxPage(res.data.page_max)
    }).catch((e) => {
      console.error(e)
    })

    await setDisabled(false)
  }, [disabled, setDisabled, setCompany, setNowPage, setMaxPage])

  const onSubmit = useCallback(async (data) => {
    console.log(data)
    setSort(data.sort)
    setSort2([
      data.type0,
      data.type1,
      data.type2,
      data.type3,
      data.type4,
      data.type5,
      data.type6,
    ])
    setTags(data.tag)

    onSortForm({
      s: data.s ? data.s : "",
      zip: data.zip,
      office: data.type0 ? data.type0 : "",
      president: data.type1 ? data.type1 : "",
      item: data.type2 ? data.type2 : "",
      sust: data.type3 ? data.type3 : "",
      card: data.type4 ? data.type4 : "",
      like: data.type5 ? data.type5 : "",
      business_informaition: data.type6 ? data.type6 : "",
      tag: data.tag ? data.tag : "",
      sort: data.sort,
      page: parseInt(data.page),
    })
  }, [setSort, setSort2, setTags, onSortForm])

  return (
    <section className="cont1">
      <Container small>
        <h2 className="ttl1">企業一覧</h2>
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
            <button>
              <select {...register("zip")}>
                {zip.map((zip, index) => (
                  <option value={zip} key={index}>{zip}</option>
                ))}
              </select>
            </button>
          </div>

          <div className={styles.checkSortBox}>
            {sorts2.map((item, index) => (
              <button key={index}>
                <label className={`${sort2.includes(item.value) ? styles.current : null}`}>
                  {item.name}
                  <input
                    type="checkbox"
                    value={item.value}
                    {...register(`type${index}`)}
                  />
                </label>
              </button>
            ))}
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

          {!disabled ?
            <>
              <article className={styles.list}>
                {company.map((comp, index) => (
                  <Link href={`/corapura/company/${comp.id}`} key={index}>
                    <a>
                      <div className={styles.imgBox}>
                        <img src={comp.thumbs ? comp.thumbs : dummy.src} alt="" />
                      </div>
                      <p className={styles.catch}>{comp.title}</p>
                      <p className={styles.name}>{comp.nicename}</p>
                      <p className={styles.desc}>{comp.profile.substring(0, 35)}...</p>
                    </a>
                  </Link>
                ))}
              </article>
              {parseInt(maxPage) !== 1 ?
                <div className={styles.pager}>
                  {parseInt(nowPage) !== 1 ?
                    <button className={styles.btn} >
                      <label>
                        <input
                          type="submit"
                          value={nowPage-1}
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
                            value={nowPage-1}
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
                            value={nowPage+1}
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
                          value={nowPage+1}
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

export default CompanyList;

CompanyList.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}