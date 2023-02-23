import styles from '@/styles/corapura/components/editorList.module.scss'
import PageLayoutCorapura from "@/components/Layouts/pageLayoutCorapura";
import Container from '@/components/corapura/Layout/container';
import Link from 'next/link';
import plus from '@/images/corapura/common/plusW.svg'
import { useAuth } from '@/hooks/auth';
import { useCallback, useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { Date, Loader } from '@/components/corapura';
import dummy from '@/images/corapura/common/dummy1.svg'
import { useRouter } from 'next/router';

const AdminPressReleaseList = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth({middleware: 'auth', type: 'corapura'})
  const [disabled, setDisabled] = useState(false)
  const [releases, setReleases] = useState([])
  const [nowPage, setNowPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [page, setPage] = useState(1)

  const handleSort = useCallback(async () => {
    await csrf()

    await axios.post(`/api/corapura/pr/mypr`, {
      user_id: user?.id,
      page: parseInt(page),
    }).then((res) => {
      // console.log(res)
      setReleases(res.data.pr)
      setNowPage(res.data.now_page)
      setMaxPage(res.data.page_max)
    }).catch(e => console.error(e))
  }, [
    setReleases,
    setNowPage,
    setMaxPage,
    user,
    page,
  ])

  useEffect(async () => {
    if (disabled) return
    setDisabled(true)

    if (user) {
      await handleSort()
    }

    await setDisabled(false)
  }, [user, page])

  const handleClickPage = useCallback(async (e) => {
    setPage(e.currentTarget.value)
  }, [setPage])

  const handleClickDelete = useCallback(async (id) => {
    await csrf()

    await axios.delete(`/api/corapura/pr/delete`, {
      data: {
        c_pr_id: id,
      }
    }).then((res) => {
      // console.log(res)
      alert("このプレスリリースを削除しました")
      router.reload()
    }).catch((e) => {
      console.error(e)
    })
  }, [])

  return (
    <section className="cont1">
      <Container small>
        <h2 className="ttl1">作成したプレスリリース一覧</h2>
        <Link href={`/corapura/editor/press_release/create`}>
          <a className={styles.createLink}>
            <img src={plus.src} alt="" />
            プレスリリースを新規作成
          </a>
        </Link>
        {!disabled ?
          <>
            <article className={styles.itemList}>
              {releases.map((pr, index) => (
                <div className={styles.itemBox} key={index}>
                  <Link href={`/corapura/press_release/${pr.id}`}>
                    <a className={styles.imgBox}>
                      <img src={pr.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${pr.thumbs}` : dummy.src} alt="" />
                    </a>
                  </Link>
                  {pr.state === 0 ?
                    <p className={styles.stateIcon}>下書き</p>
                  : null}
                  <p className={styles.ttl}>{pr.title}</p>
                  <div className={styles.btnFlex}>
                    <Link href={`/corapura/editor/press_release/${pr.id}`}>
                      <a className={`${styles.btn} hoverEffect`}>編集する</a>
                    </Link>
                    <button
                      type="button"
                      className={`${styles.btn} ${styles.finishBtn} hoverEffect`}
                      onClick={() => handleClickDelete(pr.id)}
                    >削除</button>
                  </div>
                </div>
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

export default AdminPressReleaseList;

AdminPressReleaseList.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}