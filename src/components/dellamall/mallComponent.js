import styles from '@/styles/dellamall/components/mallComponent.module.scss'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import notSet from '@/images/dellamall/myPage/userImg.webp'
import { useCallback, useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { Loader, MasonryGridComponent } from '@/components/dellamall';

const MallComponent = ({item, user, save = false}) => {
  // console.log(item)
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const [processing, setProcessing] = useState(false)
  const [mallPopup, setMallPopup] = useState([])
  const [popupOpen, setPopupOpen] = useState(false)
  const [mallName, setMallName] = useState("")
  const [saveMallState, setSaveMallState] = useState([])

  const handleClickPopup = useCallback(async () => {
    setPopupOpen(prevState => !prevState)
  }, [])

  const handleClickMall = useCallback(async (mallId, mallName) => {
    await handleClickPopup()
    if (processing) return
    await setProcessing(true)
    await csrf()

    await axios.post(`/api/dellamall/user/mall_click`, {
      d_mall_id: mallId,
    }).then((res) => {
      // console.log(res)
      setMallPopup(res.data)
      setMallName(mallName)
    }).catch((e) => {
      console.error(e)
    })

    await setProcessing(false)
  }, [])

  const handleClickSaveMallAdd = async (mallId) => {
    if (processing) return
    await setProcessing(true)
    await csrf()

    await axios.post('/api/dellamall/mall_bookmark/store', {
      user_id: user?.id,
      d_mall_id: mallId,
    }).then((res) => {
      // console.log(res)
      alert("モールを保存しました。")
    }).catch((e) => {
      console.error(e)
    })

    await setProcessing(false)
  }

  const handleClickSaveMallDelete = async (mallId) => {
    if (processing) return
    await setProcessing(true)
    await csrf()

    await axios.delete('/api/dellamall/mall_bookmark/delete', {
      data: {
        user_id: user?.id,
        d_mall_id: mallId,
      }
    }).then((res) => {
      // console.log(res)
      alert("モールの保存を解除しました。")
    }).catch((e) => {
      console.error(e)
    })

    await setProcessing(false)
  }

  const handleChangeTab = async () => {
    await csrf()

    await axios.post('/api/dellamall/mallbookmark/mall_return', {
      user_id: user?.id,
    }).then((res) => {
      // console.log(res)
      setSaveMallState(res.data)
    }).catch((e) => {
      console.error(e)
    })
  }

  useEffect(() => {
    if (user) {
      handleChangeTab()
    }
  }, [processing])

  return (
    <>
      <div className={styles.flex}>
        {item.map((mall, index) => (
          <div className={styles.mallBox} key={index}>
            <button type="button" className={styles.mallBtn} onClick={() => {
              mall.lock === 0 ? handleClickMall(mall.id, mall.name) : null
            }} >
              <div className={styles.box}>
                {mall.d_mall_in?.[0]?.image_permission === 1 && mall.d_mall_in?.[0]?.thumbs ?
                  <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${mall.d_mall_in?.[0]?.thumbs}`} alt="モール画像１" />
                : null}
              </div>
              <div className={styles.box}>
                {mall.d_mall_in?.[1]?.image_permission === 1 && mall.d_mall_in?.[1]?.thumbs ?
                  <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${mall.d_mall_in?.[1]?.thumbs}`} alt="モール画像２" />
                : null}
              </div>
              <div className={styles.box}>
                {mall.d_mall_in?.[2]?.image_permission === 1 && mall.d_mall_in?.[2]?.thumbs ?
                  <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${mall.d_mall_in?.[2]?.thumbs}`} alt="モール画像３" />
                : null}
              </div>
              <div className={styles.box}>
                {mall.d_mall_in?.[3]?.image_permission === 1 && mall.d_mall_in?.[3]?.thumbs ?
                  <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${mall.d_mall_in?.[3]?.thumbs}`} alt="モール画像４" />
                : null}
              </div>
            </button>
            <div className={styles.nameArea}>
              <p className={styles.name}>{mall.name}</p>
              {mall.lock === 1 ?
                <FontAwesomeIcon icon={faLock} />
              : null}
            </div>
            <div className={styles.saveFlex}>
              <p className={styles.saveTxt}>保存：{mall.d_mall_in?.length}件</p>
              {user && mall.lock === 0 ?
                <button
                  className={`${styles.saveBtn} ${saveMallState.includes(mall.id) ? styles.on : null}`}
                  type="button"
                  onClick={() => {
                    if (saveMallState.includes(mall.id)) {
                      handleClickSaveMallDelete(mall.id)
                    } else {
                      handleClickSaveMallAdd(mall.id)
                    }
                  }}
                >{saveMallState.includes(mall.id) ? "モールの保存解除" : "モールを保存"}</button>
              : null}
            </div>
            {save ?
              <div className={styles.userArea}>
                <div className={styles.imgBox}>
                  <img src={mall.user.d_profile.thumbs ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${mall.user.d_profile.thumbs}` : notSet.src} alt="プロフィール画像" />
                </div>
                <p className={styles.nicename}>{mall.user.d_profile.nicename}</p>
              </div>
            : null}
          </div>
        ))}
      </div>

      {popupOpen ?
        <div className={styles.popupBox} onClick={handleClickPopup}>
          <div className={styles.mallArea} onClick={(e) => e.stopPropagation()}>
            {processing ? <Loader /> :
              <>
                <h3 className="ttl2">{mallName}</h3>
                {mallPopup.length !== 0 ?
                  <MasonryGridComponent item={mallPopup} />
                :
                  <p className={styles.nonTxt}>このモールにはショップが追加されていません。</p>
                }
              </>
            }
          </div>
        </div>
      : null}
    </>
  );
}

export default MallComponent;