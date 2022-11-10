import styles from '@/styles/dellamall/components/saveMall.module.scss'
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { CreateMall, Loader } from '@/components/dellamall';
import { SaveMallContext } from './shopDetailArea';
import axios from '@/lib/axios';

export const CreateMallContext = createContext()

const SaveMall = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const { user, shop } = useContext(SaveMallContext)
  const [popupOpen, setPopupOpen] = useState(false)
  const [mallList, setMallList] = useState()

  const loadMall = async () => {
    await csrf()

    await axios.post("/api/dellamall/shop/mall_return", {
      user_id: user?.id,
    })
    .then((res) => {
      console.log(res)
      setMallList(res.data.mall)
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

  const handleClickMallAdd = useCallback(async (e) => {
    await csrf()

    await axios.post("/api/dellamall/mall_in/store", {
      user_id: user?.id,
      d_shop_id: shop.id,
    })
    .then((res) => {
      console.log(res)
    })
    .catch((e) => {
      console.error(e)
    })
  }, [user])

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
                  className={styles.saveMallBox__btn}
                  value={list.name}
                  key={index}
                  onClick={handleClickMallAdd}
                >
                  <div className={styles.imgBox}>
                    <img src="../../images/dellamall/shopDetail/saveMallBoxImg@del.png" alt="" />
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