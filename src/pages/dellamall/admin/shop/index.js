import styles from '@/styles/dellamall/components/adminList.module.scss'
import Container from "@/components/dellamall/Layouts/container";
import PageLayoutDellamall from "@/components/Layouts/PageLayoutDellamall";
import { useAuth } from "@/hooks/auth";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { Loader } from '@/components/dellamall';

const AdminShop = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const { user } = useAuth({middleware: 'auth'})
  const [createShop, setCreateShop] = useState([])
  const [processing, setProcessing] = useState(false)

  const onLoadList = async () => {
    await setProcessing(true)
    await csrf()

    await axios.post(`/api/dellamall/user/create_shop`, {
      user_id: user?.id,
    }).then((res) => {
      // console.log(res)
      setCreateShop(res.data)
    }).catch((e) => {
      console.error(e)
    })

    await setProcessing(false)
  }

  useEffect(() => {
    onLoadList()
  }, [user])

  const handleClickDelete = async (id) => {
    if (processing) return
    await setProcessing(true)
    await csrf()

    await axios.delete(`/api/dellamall/shop/delete/${id}`)
    .then((res) => {
      console.log(res)
      onLoadList()
      alert("ショップを削除しました。")
    }).catch((e) => {
      console.error(e)
    })

    await setProcessing(false)
  }

  // const [check, setCheck] = useState(false)

  // const handleClickCheck = (e) => {
  //   setCheck(e.target.checked)
  // }

  return (
    <section className="cont1">
      <Container small>
        <h2 className="ttl2">作成したショップ一覧</h2>
        {user && !processing ?
          <article className={styles.listBox}>
            {createShop?.map((shop, index) => (
              <div className={styles.list} key={index}>
                <Link href={`/dellamall/shop/${shop.id}`}>
                  <a className={styles.link}>{shop.name}</a>
                </Link>
                <div className={styles.btnBox}>
                  <Link href={`/dellamall/admin/shop/edit/${shop.id}`}>
                    <a className={`${styles.btn} hoverEffect`}>基本情報</a>
                  </Link>
                  {shop.official_user_id ?
                    <>
                      <Link href={`/dellamall/admin/shop/official/${shop.id}`}>
                        <a className={`${styles.btn} hoverEffect`}>公式情報</a>
                      </Link>
                      <Link href={`/dellamall/admin/shop/comment/${shop.id}`}>
                        <a className={`${styles.btn} hoverEffect`}>コメント</a>
                      </Link>
                    </>
                  : null}
                  <button
                    type="button"
                    className={styles.delete}
                    onClick={() => handleClickDelete(shop.id)}
                  >削除</button>
                </div>
              </div>
            ))}
          </article>
        : <Loader />}





        {/* <dl>
          <dt>
            <label htmlFor="permission">キャプチャの表示・非表示</label>
          </dt>
          <dd>
            <label htmlFor="permission" className={`${styles.checkBtn} ${check ? styles.on : null}`}>
              <span>表示</span>
              <span>非表示</span>
              <input
                type="checkbox"
                id="permission"
                {...register("image_permission")}
                onClick={handleClickCheck}
              />
            </label>
          </dd>
        </dl> */}
      </Container>
    </section>
  );
}

export default AdminShop;

AdminShop.getLayout = function getLayout(page) {
  return <PageLayoutDellamall>{page}</PageLayoutDellamall>
}