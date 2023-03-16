import styles from '@/styles/dellamall/components/adminList.module.scss'
import Container from "@/components/dellamall/Layouts/container";
import PageLayoutDellamall from "@/components/Layouts/PageLayoutDellamall";
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/auth';
import { useCallback, useEffect, useState } from 'react';
import { Btn01, Loader } from '@/components/dellamall';
import axios from '@/lib/axios';
import Link from 'next/link';

const PickupList = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth({middleware: 'auth', type: 'dellamall'})
  const [authCheck, setAuthCheck] = useState(false)
  const [lists, setLists] = useState([])

  const onLoadCheck = useCallback(async () => {
    if (user?.account_type > 2) {
      setAuthCheck(true)
    } else {
      setAuthCheck(false)
    }
  }, [user, setAuthCheck])

  const onLoadList = useCallback(async () => {
    await csrf()

    await axios.post('/api/dellamall/d_pickups/list')
    .then((res) => {
      // console.log(res)
      setLists(res.data)
    }).catch((e) => {
      console.error(e)
    })
  }, [])

  useEffect(async () => {
    await onLoadList()
    await onLoadCheck()

    if (user && user?.account_type < 3) {
      router.push('/dellamall')
    }
  }, [user])

  const handleClickDelete = async (id) => {
    await csrf()

    await axios.delete(`/api/dellamall/d_pickups/delete/${id}`)
    .then((res) => {
      // console.log(res)
      setLists(res.data)
      alert("ピックアップを削除しました。")
    }).catch((e) => {
      console.error(e)
      alert("ピックアップを削除できませんでした。")
    })
  }

  return (
    <section className="cont1">
      <Container small>
        <h2 className="ttl2">ピックアップリスト</h2>
        {authCheck ?
          <>
            <article className={styles.listBox}>
              {lists.length !== 0 ?
                lists?.map((list, index) => (
                  <div className={styles.list} key={index}>
                    <Link href={`/dellamall/shop/${list.d_shop.id}`}>
                      <a className={styles.link}>{list.d_shop.name}</a>
                    </Link>
                    <button
                      type="button"
                      className={styles.delete}
                      onClick={() => handleClickDelete(list.id)}
                    >削除</button>
                  </div>
                ))
              : <p className={styles.txt}>ピックアップされたショップがありません</p>}
            </article>
            <Btn01 txt="戻る" link="/dellamall/admin/control" />
          </>
        : <Loader />}
      </Container>
    </section>
  );
}

export default PickupList;

PickupList.getLayout = function getLayout(page) {
  return <PageLayoutDellamall>{page}</PageLayoutDellamall>
}