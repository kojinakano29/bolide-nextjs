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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_CORAPURA}/user`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const InfluencerList = ({posts}) => {
  console.log(posts)
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
  const [sort, setSort] = useState("new")
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

    await axios.post(`/api/corapura/user`, data)
    .then((res) => {
      console.log(res)
      setInfluencer(res.data.user)
      setNowPage(res.data.now_page)
      setMaxPage(res.data.page_max)
    }).catch((e) => {
      console.error(e)
    })

    await setDisabled(false)
  }, [disabled, setDisabled, setInfluencer, setNowPage, setMaxPage])

  const onSubmit = useCallback(async (data) => {
    console.log(data)
    setSort(data.sort)
    setTags(data.tag)

    onSortForm({
      s: data.s ? data.s : "",
      zip: data.zip,
      skill: data.skill,
      sns: data.sns,
      sns_follower: data.sns_follower,
      tag: data.tag ? data.tag : "",
      sort: data.sort,
      page: data.page ? parseInt(data.page) : parseInt(nowPage),
    })
  }, [setSort, setTags, onSortForm, nowPage])

  return (
    <section className="cont1">
      <Container small>
        <h2 className="ttl1">インフルエンサー/ユーザー一覧</h2>
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
                <select {...register("skill")}>
                  <option value="得意分野">得意分野</option>
                  {skills.map((skill, index) => (
                    <option value={skill} key={index}>{skill}</option>
                  ))}
                </select>
              </button>
              <button>
                <select {...register("sns")}>
                  <option value="SNS">SNS</option>
                </select>
              </button>
              <button>
                <select {...register("sns_follower")}>
                  <option value="SNSフォロワー数">SNSフォロワー数</option>
                </select>
              </button>
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
              <article className={`${styles.list} ${styles.influencerList}`}>
                {influencer.map((influ, index) => (
                  <Link href={`/corapura/influencer/${influ.id}`} key={index}>
                    <a>
                      <div className={styles.imgBox}>
                        <img src={influ.thumbs ? influ.thumbs : dummy.src} alt="" />
                      </div>
                      <p className={styles.catch}>{influ.title}</p>
                      <p className={styles.name}>{influ.nicename}</p>
                      <p className={styles.desc}>{influ.profile.substring(0, 35)}...</p>
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

export default InfluencerList;

InfluencerList.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}