import axios from '@/lib/axios';
import { FollowPopupContext } from '@/pages/dellamall/mypage/[id]';
import styles from '@/styles/dellamall/components/follow.module.scss'
import { useContext, useEffect, useState } from 'react';
import { Btn01, Loader } from '@/components/dellamall';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';

const Follow = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const { handleClickOpen, followType, profile } = useContext(FollowPopupContext)
  const [disabled, setDisabled] = useState(false)
  const [lists, setLists] = useState([])
  const [page, setPage] = useState(1)
  const [pageMax, setPageMax] = useState(1)

  const onMount = async () => {
    setDisabled(true)
    await csrf()

    if (followType === "following") {
      axios.get(`/api/dellamall/mypage/following/${profile.id}`)
      .then((res) => {
        // console.log(res)
        setLists(res.data.follows)
        setPageMax(res.data.page_max)
      }).catch(e => console.error(e))
    } else if (followType === "follower") {
      axios.get(`/api/dellamall/mypage/follower/${profile.id}`)
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
      await axios.post(`/api/dellamall/mypage/following/${profile.id}`, {
        page: parseInt(page) + 1,
      }).then((res) => {
        // console.log(res)
        setLists(lists.concat(res.data.follows))
      }).catch(e => console.error(e))
    } else if (followType === "follower") {
      await axios.post(`/api/dellamall/mypage/follower/${profile.id}`, {
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
                    <Link href={`/dellamall/mypage/${list.followed_user_id}`}>
                      <a onClick={() => handleClickOpen(null)}>
                        <div className={styles.imgBox}>
                          {list.followed.d_profile?.thumbs ?
                            <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${list.followed.d_profile?.thumbs}`} alt="" />
                          : null}
                        </div>
                        <span className={styles.name}>{list?.followed?.d_profile?.nicename ? list.followed.d_profile?.nicename : "プロフィール未設定"}</span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            :
              <ul>
                {lists.map((list, index) => (
                  <li key={index}>
                    <Link href={`/dellamall/mypage/${list.following_user_id}`}>
                      <a onClick={() => handleClickOpen(null)}>
                        <div className={styles.imgBox}>
                          {list.following.d_profile?.thumbs ?
                            <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${list.following.d_profile?.thumbs}`} alt="" />
                          : null}
                        </div>
                        <span className={styles.name}>{list?.following?.d_profile?.nicename ? list.following.d_profile?.nicename : "プロフィール未設定"}</span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            }
            {lists.length !== 0 && pageMax > 1 && parseInt(pageMax) !== parseInt(page) ?
              <div className={`btnCover ${styles.btnCover}`} onClick={handleClickMore}>
                <Btn01 fa={faSquarePlus} txt="さらに見る" />
              </div>
            : null}
          </>
        : <Loader />}
      </article>
    </div>
  );
}

export default Follow;