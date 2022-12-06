import styles from '@/styles/corapura/components/releaseList.module.scss'
import Container from "@/components/corapura/Layout/container";
import PageLayoutCorapura from "@/components/Layouts/pageLayoutCorapura";
import { useAuth } from "@/hooks/auth";
import axios from "@/lib/axios";
import { useCallback, useEffect, useState } from "react";
import Link from 'next/link';
import dummy2 from '@/images/corapura/common/dummy5.svg'
import dummy from '@/images/corapura/common/dummy8.svg'
import view from '@/images/corapura/parts/material_view.svg'
import viewB from '@/images/corapura/common/view.svg'
import viewA from '@/images/corapura/common/view_a.svg'
import clock from '@/images/corapura/common/clock.svg'
import { Btn, Date } from '@/components/corapura';

export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_CORAPURA}/pr/show/${params.id}`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const PressReleaseDetail = ({posts}) => {
  // console.log(posts)
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const { user } = useAuth()

  const release = posts.pr
  const newRelease = posts.pr_new_list
  const profile = posts?.user?.c_profile

  const [disabled, setDisabled] = useState(false)
  const [viewCheck, setViewCheck] = useState(false)

  const onLoadCheck = async () => {
    await csrf()

    await axios.post('/api/corapura/pr/count/check', {
      user_id: user?.id,
      c_pr_id: release.id,
    }).then((res) => {
      // console.log(res)
      if (res.data) {
        setViewCheck(true)
        setDisabled(true)
      }
    }).catch((e) => {
      console.error(e)
    })
  }

  useEffect(() => {
    if (user) {
      onLoadCheck()
    }
  }, [user])

  const handleClickView = useCallback(async () => {
    if (disabled) return
    setDisabled(true)
    await csrf()

    await axios.post('/api/corapura/pr/count/add', {
      user_id: user?.id,
      c_pr_id: release.id,
    }).then((res) => {
      // console.log(res)
      setViewCheck(true)
    }).catch((e) => {
      console.error(e)
      setDisabled(false)
    })
  }, [disabled, setDisabled, setViewCheck, release, user])

  return (
    <section className="cont1">
      <Container small>
        <div className={styles.detailFlex}>
          <div className={styles.detailLeft}>
            <h2 className="ttl2">{release.title}</h2>
            <div className={styles.tags}>
              {release.c_tags.map((tag, index) => (
                <p className={styles.tag} key={index}>{tag.name}</p>
              ))}
              <p className={styles.tag}>スキルアップ</p>
            </div>
            <div className={styles.headFlex}>
              <div className={styles.txtBox}>
                <p className={styles.name}>{profile.nicename}</p>
                <div className={styles.date}>
                  <img src={clock.src} alt="" />
                  <Date dateString={release.created_at} />
                </div>
              </div>
              <button
                type="button"
                className={`hoverEffect ${viewCheck ? styles.on : null}`}
                onClick={handleClickView}
                disabled={disabled}
              >
                <img src={viewCheck ? viewB.src : viewA.src} alt="" />
              </button>
            </div>
            <div className={styles.imgBox}>
              <img src={release.thumbs ? release.thumbs : dummy.src} alt="" />
            </div>
          </div>
          <div className={styles.detailRight}>
            <p className={styles.midashi}>新着プレスリリース</p>
            <article className={styles.newRelease}>
              {newRelease.map((release, index) => (
                <Link href={`/corapura/press_release/${release.id}`} key={index}>
                  <a>
                    <div className={styles.thumbsBox}>
                      <img src={release.thumbs ? release.thumbs : dummy2.src} alt="" />
                    </div>
                    <div className={styles.newTxt}>
                      <p className={styles.newTtl}>{release.title}</p>
                      <div className={`${styles.newView} en`}>
                        <img src={view.src} alt="" />
                        {release.c_pr_counts_count}view
                      </div>
                      <p className={styles.newName}>{release.user.c_profile.nicename}</p>
                    </div>
                  </a>
                </Link>
              ) )}
            </article>
          </div>
        </div>
        <div className={styles.btnCover}>
          <Btn txt="一覧に戻る" link="/corapura/press_release/" />
        </div>
      </Container>
    </section>
  );
}

export default PressReleaseDetail;

PressReleaseDetail.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}