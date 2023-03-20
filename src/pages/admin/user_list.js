import styles from '@/styles/corapura/components/list.module.scss'
import PageLayoutTop from "@/components/Layouts/pageLayoutTop";
import Container from "@/components/top/Layout/container";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import searchIcon from '@/images/corapura/common/search.svg'
import axios from '@/lib/axios';
import { DateFormat, Loader } from '@/components/corapura';

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/administar/user`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const UserList = ({posts}) => {
  console.log(posts)
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth({middleware: 'auth', type: 'bjc'})
  const [disabled, setDisabled] = useState(false)
  const [search, setSearch] = useState("")
  const [users, setUsers] = useState(posts.users)
  const [nowPage, setNowPage] = useState(posts.now_page)
  const [maxPage, setMaxPage] = useState(posts.page_max)
  const [page, setPage] = useState(1)
  const [popup, setPopup] = useState(false)
  const [deleteType, setDeleteType] = useState("")
  const [id, setId] = useState()
  const { handleSubmit, register } = useForm()

  useEffect(() => {
    if (user && user?.account_type < 3) {
      router.push('/')
    }
  }, [user])

  const handleSort = useCallback(async () => {
    await csrf()

    await axios.post(`/api/administar/user`, {
      s: search,
      page: parseInt(page),
    }).then((res) => {
      // console.log(res)
      setUsers(res.data.users)
      setNowPage(res.data.now_page)
      setMaxPage(res.data.page_max)
    }).catch(e => console.error(e))
  }, [
    setUsers,
    setNowPage,
    setMaxPage,
    search,
    page,
  ])

  useEffect(async () => {
    if (disabled) return
    setDisabled(true)

    await handleSort()

    await setDisabled(false)
  }, [page])

  const handleClickPage = useCallback(async (e) => {
    setPage(e.currentTarget.value)
  }, [setPage])

  const onSortForm = useCallback(async (data) => {
    if (disabled) return
    setDisabled(true)
    await csrf()

    await axios.post(`/api/administar/user`, {
      s: data.s ? data.s : "",
      page: parseInt(page),
    }).then((res) => {
      // console.log(res)
      setUsers(res.data.users)
      setNowPage(res.data.now_page)
      setMaxPage(res.data.page_max)
    }).catch(e => console.error(e))

    setSearch(data.s)
    await setDisabled(false)
  }, [
    disabled,
    setDisabled,
    setUsers,
    setNowPage,
    setMaxPage,
    setSearch,
    page,
  ])

  const handleClickPopup = useCallback(async (type, id) => {
    setPopup(prevState => !prevState)
    setDeleteType(type)
    setId(id)
  }, [setPopup, setDeleteType])

  const handleClickDeleteUser = useCallback(async (id, type) => {
    await csrf()

    if (type === "hard" || type === "normal") {
      await axios.delete(`/api/${type === "hard" ? "hard_delete" : "delete"}/user/${id}`)
      .then((res) => {
        // console.log(res)
        alert(res.data)
        router.reload()
      }).catch(e => console.error(e))
    } else if (type === "restoration") {
      await axios.post(`/api/restore/user/${id}`)
      .then((res) => {
        // console.log(res)
        alert(res.data)
        router.reload()
      }).catch(e => console.error(e))
    }
  }, [router])

  return (
    <section className="cont1">
      <Container small900>
        <h2 className="ttl2">ユーザー一覧</h2>
        {/* <form onSubmit={handleSubmit(onSortForm)}>
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
        </form> */}
        {!disabled ?
          <>
            <article className={`${styles.adminList}`}>
              <ul>
                {users.map((use, index) => (
                  <li className={use.deleted_at ? styles.delete : null} key={index}>
                    <p className={styles.txt}>
                      登録日：<DateFormat dateString={use.created_at} />
                    </p>
                    <p className={styles.txt}>
                      ユーザー名：{use.name}
                    </p>
                    <p className={styles.txt}>
                      メールアドレス：<a href={`mailto:${use.email}`}>{use.email}</a>
                    </p>
                    <p className={styles.txt}>
                      LIONDOR：{use.l_profile ?
                        <a href={`/liondor/mypage/edit/${use.l_profile?.id}`}>{use.l_profile?.nicename}</a>
                        :
                        "未作成"
                      }
                    </p>
                    <p className={styles.txt}>
                      Della Mall：{use.d_profile ?
                        <a href={`/dellamall/mypage/${use.id}`}>{use.d_profile?.nicename}</a>
                      :
                        "未作成"
                      }
                    </p>
                    <p className={styles.txt}>
                      CORAPURA：{use.c_profile ?
                        <a href={`/corapura/${use.account_type === 1 ? "company" : "influencer"}/${use.id}`}>{use.c_profile?.nicename}</a>
                        :
                        "未作成"
                      }
                    </p>
                    <div className={styles.btnFlex}>
                      {use.deleted_at ?
                        <button
                          type="button"
                          onClick={() => handleClickPopup("restoration", use.id)}
                        >アカウント復旧</button>
                        :
                        <button
                          type="button"
                          onClick={() => handleClickPopup("normal", use.id)}
                        >アカウント凍結</button>
                      }
                      <button
                        type="button"
                        onClick={() => handleClickPopup("hard", use.id)}
                      >アカウント削除</button>
                    </div>
                    {popup ?
                      <div className={styles.popupArea} onClick={() => handleClickPopup(id, deleteType)}>
                        <div className={styles.popupBox} onClick={(e) => e.stopPropagation()}>
                          <p className={styles.check_ttl}>
                            本当にアカウントを
                            {deleteType === "normal" ? "凍結" : null}
                            {deleteType === "hard" ? "完全に削除" : null}
                            {deleteType === "restoration" ? "復旧" : null}
                            しますか？
                          </p>
                          <div className={styles.btnFlex2}>
                            <button
                              type="button"
                              onClick={() => handleClickDeleteUser(id, deleteType)}
                            >はい</button>
                            <button
                              type="button"
                              onClick={() => handleClickPopup(id, deleteType)}
                            >いいえ</button>
                          </div>
                        </div>
                      </div>
                    : null}
                  </li>
                ))}
              </ul>
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

export default UserList;

UserList.getLayout = function getLayout(page) {
  return <PageLayoutTop>{page}</PageLayoutTop>
}