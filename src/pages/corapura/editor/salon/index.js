import styles from '@/styles/corapura/components/editorList.module.scss'
import PageLayoutCorapura from "@/components/Layouts/pageLayoutCorapura";
import Container from '@/components/corapura/Layout/container';
import plus from '@/images/corapura/common/plusW.svg'
import { useAuth } from '@/hooks/auth';
import { useCallback, useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { DateFormat, Loader } from '@/components/corapura';
import dummy from '@/images/corapura/common/dummy1.svg'
import { useRouter } from 'next/router';

const AdminSalonList = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth({middleware: 'auth', type: 'corapura'})
  const [disabled, setDisabled] = useState(false)
  const [salons, setSalons] = useState([])
  const [nowPage, setNowPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [page, setPage] = useState(1)

  const handleSort = useCallback(async () => {
    await csrf()

    await axios.post(`/api/corapura/salon/mysalon`, {
      user_id: user?.id,
      page: parseInt(page),
    }).then((res) => {
      // console.log(res)
      setSalons(res.data.salon)
      setNowPage(res.data.now_page)
      setMaxPage(res.data.page_max)
    }).catch(e => console.error(e))
  }, [
    setSalons,
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

    await axios.delete(`/api/corapura/salon/delete`, {
      data: {
        c_salon_id: id,
      }
    }).then((res) => {
      // console.log(res)
      alert("このオンラインサロンを削除しました")
      router.reload()
    }).catch((e) => {
      console.error(e)
    })
  }, [])

  return (
    <section className="cont1">
      <Container small>
        <h2 className="ttl1">作成したオンラインサロン一覧</h2>
        <a href={`/corapura/editor/salon/create`} className={styles.createLink}>
          <img src={plus.src} alt="アイコン" />
          オンラインサロンを新規作成
        </a>
        {!disabled ?
          <>
            <article className={styles.itemList}>
              {salons.map((salon, index) => (
                <div className={styles.itemBox} key={index}>
                  <a href={`/corapura/salon/${salon.id}`} className={styles.imgBox}>
                    <img src={salon.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${salon.thumbs}` : dummy.src} alt="オンラインサロンのサムネイル画像" />
                  </a>
                  <p className={styles.stateIcon}>
                    {salon.state === 0 ? "下書き" : null}
                    {salon.state === 1 ? "公開" : null}
                  </p>
                  <p className={styles.ttl}>{salon.title}</p>
                  <div className={styles.btnFlex}>
                    <a href={`/corapura/editor/salon/${salon.id}`} className={`${styles.btn} hoverEffect`}>編集する</a>
                    <button
                      type="button"
                      className={`${styles.btn} ${styles.finishBtn} hoverEffect`}
                      onClick={() => handleClickDelete(salon.id)}
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

export default AdminSalonList;

AdminSalonList.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}