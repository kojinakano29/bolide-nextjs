import Container from '@/components/dellamall/Layouts/container';
import PageLayoutDellamall from '@/components/Layouts/PageLayoutDellamall';
import styles from '@/styles/dellamall/components/mypage.module.scss'
import notSet from '@/images/dellamall/myPage/userImg.webp'
import Image from 'next/image';
import { Btn01 } from '@/components/dellamall';
import { faSquarePlus, faTableCellsLarge, faGear } from '@fortawesome/free-solid-svg-icons'
import { useCallback, useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { useAuth } from '@/hooks/auth';

const Mypage = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const { user } = useAuth()
  const [mypage, setMypage] = useState()

  const mypageLoad = useCallback(async () => {
    await csrf()

    await axios.post('/api/dellamall/mypage', {
      user_id: user?.id
    })
    .then((res) => {
      console.log(res)
      setMypage(res.data)
    })
    .catch((e) => {
      console.error(e)
    })
  }, [user])

  useEffect(() => {
    if (user) {
      mypageLoad()
    }
  }, [user])

  return (
    <>
      <section className="cont1">
        <Container small>
          <div className={styles.user__info}>
            <div className={styles.user__info__img}>
              <Image
                src={notSet}
                alt=""
                layout="responsive"
                sizes="150px"
                priority
              />
            </div>
            <div className={styles.user__info__name}>ニックネーム</div>
            <div className={styles.user__info__id}>username000</div>
            <ul className={styles.user__info__follow}>
              <li>投稿 {mypage.create_shop.length} 件</li>
              <li>フォロー 124 件</li>
              <li>フォロワー 157 件</li>
            </ul>
            <p className={styles.user__info__text}>
              自己紹介が入ります。テキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプル。
            </p>
          </div>
          <div className={styles.user__buttonList}>
            <div className="btnCover">
              <Btn01 fa={faSquarePlus} txt="ショップを作成する" />
            </div>
            <div className="btnCover">
              <Btn01 fa={faTableCellsLarge} txt="モールを作成する" />
            </div>
            <div className="btnCover">
              <Btn01 fa={faGear} txt="プロフィールを編集する" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Mypage;

Mypage.getLayout = function getLayout(page) {
  return <PageLayoutDellamall>{page}</PageLayoutDellamall>
}