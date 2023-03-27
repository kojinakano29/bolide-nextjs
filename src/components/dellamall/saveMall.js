import styles from '@/styles/dellamall/components/saveMall.module.scss'
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { CreateMall, Loader } from '@/components/dellamall';
import { SaveMallContext } from './shopDetailArea';
import axios from '@/lib/axios';

export const CreateMallContext = createContext()

const SaveMall = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const processing = useRef(false)
  const { handleClickSaveMall, countMall, setCountMall, user, shop } = useContext(SaveMallContext)
  const [popupOpen, setPopupOpen] = useState(false)
  const [mallList, setMallList] = useState()
  const [mallIn, setMallIn] = useState([])

  const loadMall = async () => {
    await csrf()

    await axios.post("/api/dellamall/shop/mall_return", {
      user_id: user?.id,
      d_shop_id: shop.id,
    })
    .then((res) => {
      // console.log(res)
      setMallList(res.data.mall)
      setMallIn(res.data.mall_in)
    })
    .catch((e) => {
      console.error(e)
    })
  }

  useEffect(() => {
    if (user) {
      loadMall()
    }
  }, [])

  const handleClickPopup = useCallback(async () => {
    setPopupOpen(prevState => !prevState)
  }, [])

  const handleClickSaveMallToggle = useCallback(async (mallId, mallName) => {
    if (processing.current) return
    processing.current = true
    await csrf()

    if (mallIn?.includes(mallId)) {
      await axios.delete('/api/dellamall/mall_in/delete', {
        data: {
          d_mall_id: mallId,
          d_shop_id: shop.id,
          user_id: user?.id,
        }
      })
      .then((res) => {
        // console.log(res)
        setCountMall(countMall - 1)
        alert(`${mallName}から削除しました。`)
        handleClickSaveMall()
      })
      .catch((e) => {
        console.error(e)
      })
    } else {
      await axios.post('/api/dellamall/mall_in/store', {
        d_mall_id: mallId,
        d_shop_id: shop.id,
        user_id: user?.id,
      })
      .then((res) => {
        // console.log(res)
        setCountMall(countMall + 1)
        alert(`${mallName}に追加しました。`)
        handleClickSaveMall()
      })
      .catch((e) => {
        console.error(e)
      })
    }

    processing.current = false
  }, [user, mallIn])

  return (
    <>
      <div className={styles.saveMallBox} onClick={(e) => e.stopPropagation()}>
        <p className={styles.saveMallBox__title}>保存先のモール</p>
        <div className={styles.saveMallBox__cont}>
          <p className={styles.saveMallBox__text}>モール</p>
          <div className={styles.saveMallBox__list}>
            {mallList ?
              mallList?.map((list, index) => (
                <button
                  className={`${styles.saveMallBox__btn} ${mallIn?.includes(list.id) ? styles.saveOn : null}`}
                  key={index}
                  onClick={() => handleClickSaveMallToggle(list.id, list.name)}
                >
                  <div className={styles.imgBox}>
                    {list.d_mall_in?.[0]?.thumbs && list.d_mall_in?.[0]?.image_permission === 1 ?
                      <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${list.d_mall_in?.[0]?.thumbs}`} alt="モールの画像" />
                    : null}
                  </div>
                  <span className={styles.saveMallBox__name}>{list.name}</span>
                  <div className={styles.plus}>
                    <span className={styles.line1}></span>
                    <span className={styles.line2}></span>
                  </div>
                </button>
              ))
            : <Loader />}
          </div>
        </div>
        <a className={styles.saveMallBox__create} onClick={handleClickPopup}>
          <div className={styles.plus}>
            <span className={styles.line1}></span>
            <span className={styles.line2}></span>
          </div>
          モールを作成する
        </a>
      </div>

      {popupOpen ?
        <CreateMallContext.Provider value={{handleClickPopup, setMallList, user, shop}}>
          <CreateMall />
        </CreateMallContext.Provider>
      : null}
    </>
  );
}

export default SaveMall;