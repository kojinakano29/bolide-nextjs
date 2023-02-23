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
import { zips } from '@/lib/corapura/constants';
import searchIcon from '@/images/corapura/common/search.svg'

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
  // console.log(posts)
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const sorts = [
    {name: "登録日の新しい順", value: "new"},
    {name: "登録日の古い順", value: "old"},
    {name: "お気に入りが多い順", value: "follow"},
  ]

  const tagList = posts.tag_list
  const [disabled, setDisabled] = useState(false)
  const [company, setCompany] = useState(posts.company)
  const [nowPage, setNowPage] = useState(posts.now_page)
  const [maxPage, setMaxPage] = useState(posts.page_max)
  const [search, setSearch] = useState("")
  const [zip, setZip] = useState("")
  const [office, setOffice] = useState(false)
  const [president, setPresident] = useState(false)
  const [item, setItem] = useState(false)
  const [sust, setSust] = useState(false)
  const [card, setCard] = useState(false)
  const [like, setLike] = useState(false)
  const [businessInformation, setBusinessInformation] = useState(false)
  const [tag, setTag] = useState("")
  const [sort, setSort] = useState("new")
  const [page, setPage] = useState(1)
  const [openSort, setOpenSort] = useState(false)
  const { handleSubmit, register } = useForm()

  const handleSort = useCallback(async () => {
    await csrf()

    await axios.post('/api/corapura/company', {
      s: search,
      zip: zip !== "都道府県" ? zip : "",
      office: office ? 1 : 0,
      president: president ? 1 : 0,
      item: item ? 1 : 0,
      sust: sust ? 1 : 0,
      card: card ? 1 : 0,
      like: like ? 1 : 0,
      business_informaition: businessInformation ? 1 : 0,
      tag: tag,
      sort: sort,
      page: parseInt(page),
    }).then((res) => {
      // console.log(res)
      setCompany(res.data.company)
      setNowPage(res.data.now_page)
      setMaxPage(res.data.page_max)
    }).catch((e) => {
      console.error(e)
    })

  }, [
    setCompany,
    setNowPage,
    setMaxPage,
    search,
    zip,
    office,
    president,
    item,
    sust,
    card,
    like,
    businessInformation,
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
    office,
    president,
    item,
    sust,
    card,
    like,
    businessInformation,
    tag,
    sort,
    page,
  ])

  const handleChangeZip = useCallback(async (e) => {
    setZip(e.target.value)
  }, [setZip])

  const handleChangeOffice = useCallback(async (e) => {
    setOffice(e.target.checked)
  }, [setOffice])

  const handleChangePresident = useCallback(async (e) => {
    setPresident(e.target.checked)
  }, [setPresident])

  const handleChangeItem = useCallback(async (e) => {
    setItem(e.target.checked)
  }, [setItem])

  const handleChangeSust = useCallback(async (e) => {
    setSust(e.target.checked)
  }, [setSust])

  const handleChangeCard = useCallback(async (e) => {
    setCard(e.target.checked)
  }, [setCard])

  const handleChangeLike = useCallback(async (e) => {
    setLike(e.target.checked)
  }, [setLike])

  const handleChangeBusinessInformation = useCallback(async (e) => {
    setBusinessInformation(e.target.checked)
  }, [setBusinessInformation])

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

    await axios.post(`/api/corapura/company`, {
      s: data.s ? data.s : "",
      zip: zip !== "都道府県" ? zip : "",
      office: office,
      president: president,
      item: item,
      sust: sust,
      card: card,
      like: like,
      business_informaition: businessInformation,
      tag: tag,
      sort: sort,
      page: parseInt(page),
    }).then((res) => {
      // console.log(res)
      setCompany(res.data.company)
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
    setCompany,
    setNowPage,
    setMaxPage,
    setSearch,
    zip,
    office,
    president,
    item,
    sust,
    card,
    like,
    businessInformation,
    tag,
    sort,
    page,
  ])

  const sorts2 = [
    {
      name: "事業所・店舗",
      click: handleChangeOffice,
      state: office,
    },
    {
      name: "プレジデント",
      click: handleChangePresident,
      state: president,
    },
    {
      name: "NFT/製品・商品/特許・技術",
      click: handleChangeItem,
      state: item,
    },
    {
      name: "SDGs",
      click: handleChangeSust,
      state: sust,
    },
    {
      name: "名刺",
      click: handleChangeCard,
      state: card,
    },
    {
      name: "スポンサー",
      click: handleChangeLike,
      state: like,
    },
    {
      name: "ビジネスインフォメーション",
      click: handleChangeBusinessInformation,
      state: businessInformation,
    },
  ]

  return (
    <section className="cont1">
      <Container small>
        <h2 className="ttl1">企業一覧</h2>
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
          <select onChange={handleChangeZip}>
            {zips.map((zip, index) => (
              <option value={zip} key={index}>{zip}</option>
            ))}
          </select>
        </div>

        <div className={styles.checkSortBox}>
          {sorts2.map((item, index) => (
            <button key={index}>
              <label className={`${item.state ? styles.current : null}`}>
                {item.name}
                <input
                  type="checkbox"
                  onChange={item.click}
                />
              </label>
            </button>
          ))}
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
            <article className={styles.list}>
              {company.map((comp, index) => (
                <Link href={`/corapura/company/${comp?.user?.id}`} key={index}>
                  <a>
                    <div className={styles.imgBox}>
                      <img src={comp.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${comp.thumbs}` : dummy.src} alt="" />
                    </div>
                    <p className={styles.catch}>{comp.title}</p>
                    <p className={styles.name}>{comp.nicename}</p>
                    <p className={styles.desc}>{comp.profile.substring(0, 35)}...</p>
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

export default CompanyList;

CompanyList.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}