import styles from '@/styles/corapura/components/detailTab.module.scss'
import { useCallback, useEffect, useState } from 'react';
import Container from './Layout/container';
import { Loader, MatterCard, Btn } from '@/components/corapura';
import axios from '@/lib/axios';
import dummy from '@/images/corapura/common/dummy1.svg'
import Link from 'next/link';
import { useAuth } from '@/hooks/auth';

const DetailTabUser = ({cards, likes, matters, userInfo}) => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const { user } = useAuth()
  const [disabled, setDisabled] = useState(false)
  const [tab1, setTab1] = useState(0)
  const [matter, setMatter] = useState([])
  const [matching, setMatching] = useState([])
  const [filterMatching, setFilterMatching] = useState([])
  const [bookmarkList, setBookmarkList] = useState([])

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

  useEffect(async () => {
    if (disabled) return
    setDisabled(true)

    if (user) {
      await onLoadCheck()
      await setMatter(matters?.filter((m, index) => {
        return index < 3
      }))
    }

    await setMatter(matters?.filter((m, index) => {
      return index < 3
    }))

    await setDisabled(false)
  }, [user])

  const handleClickMoreMatter = useCallback(async () => {
    setMatter(matters)
  }, [setMatter])

  const handleClickMoreMatching = useCallback(async () => {
    setFilterMatching(matching)
  }, [matching, setFilterMatching])

  const handleClickTabBox1 = useCallback(async () => {
    setDisabled(true)
    await csrf()

    await axios.post(`/api/corapura/matching_user/tab_return`, {
      user_id: userInfo.c_profile_id
    }).then((res) => {
      // console.log(res)
      setMatching(res.data.c_post_apps)
      setFilterMatching(res.data.c_post_apps.filter((d, index) => {
        return index < 4
      }))
    }).catch((e) => {
      console.error(e)
    })

    await setDisabled(false)
  }, [setMatching, setFilterMatching, setDisabled])

  const handleClickTab1 = useCallback(async (num) => {
    setTab1(num)

    if (num === 0) {
      setMatter(matters?.filter((m, index) => {
        return index < 3
      }))
    }

    if (num === 1) {
      handleClickTabBox1()
    }
  }, [setMatter, setTab1, handleClickTabBox1])

  return (
    <>
      <section className={styles.tabArea}>
        <Container small>
          <div className={styles.tabBtnBox}>
            <button
              type="button"
              className={`${tab1 === 0 ? styles.tabOn : null}`}
              onClick={() => handleClickTab1(0)}
            >この企業の案件一覧</button>
            <button
              type="button"
              className={`${tab1 === 1 ? styles.tabOn : null}`}
              onClick={() => handleClickTab1(1)}
            >コラプラした案件一覧</button>
          </div>
        </Container>
        <div className={styles.tabBox}>
          <Container small>
            {!disabled ?
              <>
                {tab1 === 0 ?
                  <>
                    <div className={styles.column3}>
                      {matter.map((matter, index) => (
                        <MatterCard matter={matter} user={user} bookmarkList={bookmarkList} key={index} detail />
                      ))}
                    </div>
                    {matter.length === 3 && matters.length > 3 ?
                      <div className="btnCover" onClick={handleClickMoreMatter}>
                        <Btn txt="さらに見る" />
                      </div>
                    : null}
                  </>
                : null}
                {tab1 === 1 ?
                  <>
                    <div className={styles.column4}>
                      {filterMatching.map((match, index) => (
                        <Link href={`/corapura/company/matter/${match.id}`} key={index}>
                          <a className={styles.matteredBox}>
                            <div className={styles.imgBox}>
                              <img src={match.thumbs ? match.thumbs : dummy.src} alt="" />
                            </div>
                            <p className={styles.ttl}>{match.title}</p>
                            <p className={styles.desc}>{match.content.substring(0, 25)}...</p>
                          </a>
                        </Link>
                      ))}
                    </div>
                    {filterMatching.length === 4 && matching.length > 4 ?
                      <div className="btnCover" onClick={handleClickMoreMatching}>
                        <Btn txt="さらに見る" />
                      </div>
                    : null}
                  </>
                : null}
              </>
            : <Loader />}
          </Container>
        </div>
      </section>
    </>
  );
}

export default DetailTabUser;