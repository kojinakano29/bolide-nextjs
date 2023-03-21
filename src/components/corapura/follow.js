import axios from '@/lib/axios';
import styles from '@/styles/corapura/components/follow.module.scss'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader } from '@/components/corapura';

const Follow = ({handleClickOpen, userInfo, followType}) => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const [disabled, setDisabled] = useState(false)
  const [lists, setLists] = useState([])
  const [page, setPage] = useState(1)
  const [pageMax, setPageMax] = useState(1)

  const onMount = async () => {
    setDisabled(true)
    await csrf()

    if (followType === "following") {
      axios.get(`/api/corapura/mypage/following/${userInfo.id}`)
      .then((res) => {
        // console.log(res)
        setLists(res.data.follows)
        setPageMax(res.data.page_max)
      }).catch(e => console.error(e))
    } else if (followType === "follower") {
      axios.get(`/api/corapura/mypage/follower/${userInfo.id}`)
      .then((res) => {
        // console.log(res)
        setLists(res.data.follows)
        setPageMax(res.data.page_max)
      }).catch(e => console.error(e))
    }

    await setDisabled(false)
  }

  useEffect(() => {
    onMount()
  }, [])

  const handleClickMore = async () => {
    await csrf()

    if (followType === "following") {
      await axios.post(`/api/corapura/mypage/following/${userInfo.id}`, {
        page: parseInt(page) + 1,
      }).then((res) => {
        // console.log(res)
        setLists(lists.concat(res.data.follows))
      }).catch(e => console.error(e))
    } else if (followType === "follower") {
      await axios.post(`/api/corapura/mypage/follower/${userInfo.id}`, {
        page: parseInt(page) + 1,
      }).then((res) => {
        // console.log(res)
        setLists(lists.concat(res.data.follows))
      }).catch(e => console.error(e))
    }
  }

  return (
    <div className={styles.modalArea} onClick={() => handleClickOpen(null)}>
      <article className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.ttl}>{followType === "following" ? "フォロー" : "フォロワー"}一覧</h3>
        {!disabled ?
          <>
            {followType === "following" ?
              <ul>
                {lists.map((list, index) => (
                  <li key={index}>
                    <Link href={`/corapura/${list.followed.account_type === 1 ? "company" : "influencer"}/${list.followed_user_id}`}>
                      <a onClick={() => handleClickOpen(null)}>
                        <div className={styles.imgBox}>
                          {list.followed.c_profile?.thumbs ?
                            <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${list.followed.c_profile?.thumbs}`} alt="プロフィール画像" />
                          : null}
                        </div>
                        <span className={styles.name}>{list?.followed?.c_profile?.nicename ? list.followed.c_profile?.nicename : "プロフィール未設定"}</span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            :
              <ul>
                {lists.map((list, index) => (
                  <li key={index}>
                    <Link href={`/corapura/${list.following.account_type === 1 ? "company" : "influencer"}/${list.following_user_id}`}>
                      <a onClick={() => handleClickOpen(null)}>
                        <div className={styles.imgBox}>
                          {list.following.c_profile?.thumbs ?
                            <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${list.following.c_profile?.thumbs}`} alt="プロフィール画像" />
                          : null}
                        </div>
                        <span className={styles.name}>{list?.following?.c_profile?.nicename ? list.following.c_profile?.nicename : "プロフィール未設定"}</span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            }
            {pageMax !== 0 && parseInt(pageMax) !== parseInt(page) ?
              <button
                type="button"
                className={`${styles.moreBtn} hoverEffect`}
                onClick={handleClickMore}
              >さらに見る</button>
            : null}
          </>
        : <Loader />}
      </article>
    </div>
  );
}

export default Follow;