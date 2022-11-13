import styles from '@/styles/dellamall/components/mallComponent.module.scss'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import notSet from '@/images/dellamall/myPage/userImg.webp'
import { useCallback, useState } from 'react';
import axios from '@/lib/axios';
import { Loader, MasonryGridComponent } from '@/components/dellamall';

const MallComponent = ({item, user}) => {
  // console.log(item)
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const [processing, setProcessing] = useState(false)
  const [mallPopup, setMallPopup] = useState([])
  const [popupOpen, setPopupOpen] = useState(false)
  const [mallName, setMallName] = useState("")
  const [saveMallState, setSaveMallState] = useState(false)

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
      console.log(res)
      setMallPopup(res.data)
      setMallName(mallName)
    }).catch((e) => {
      console.error(e)
    })

    await setProcessing(false)
  }, [])

  const handleClickSaveMall = async (mallId) => {
    if (processing) return
    await setProcessing(true)
    await csrf()

    if (saveMallState) {
      await axios.delete('/api/dellamall/mall_bookmark/delete', {
        data: {
          user_id: user?.id,
          d_mall_id: mallId,
        }
      }).then((res) => {
        // console.log(res)
        setSaveMallState(false)
        alert("モールの保存を解除しました。")
      }).catch((e) => {
        console.error(e)
      })
    } else {
      await axios.post('/api/dellamall/mall_bookmark/store', {
        user_id: user?.id,
        d_mall_id: mallId,
      }).then((res) => {
        // console.log(res)
        setSaveMallState(true)
        alert("モールを保存しました。")
      }).catch((e) => {
        console.error(e)
      })
    }

    await setProcessing(false)
  }

  return (
    <>
      <div className={styles.flex}>
        {item.map((mall, index) => (
          <div className={styles.mallBox} key={index}>
            <button type="button" className={styles.mallBtn} onClick={() => {
              mall.lock === 0 ? handleClickMall(mall.id, mall.name) : null
            }} >
              <div className={styles.box}>
                {mall.d_mall_in.image_permission === 1 && mall.d_mall_in?.[0]?.thumbs ?
                  <img src={mall.d_mall_in?.[0]?.thumbs} alt="" />
                : null}
              </div>
              <div className={styles.box}>
                {mall.d_mall_in.image_permission === 1 && mall.d_mall_in?.[1]?.thumbs ?
                  <img src={mall.d_mall_in?.[1]?.thumbs} alt="" />
                : null}
              </div>
              <div className={styles.box}>
                {mall.d_mall_in.image_permission === 1 && mall.d_mall_in?.[2]?.thumbs ?
                  <img src={mall.d_mall_in?.[2]?.thumbs} alt="" />
                : null}
              </div>
              <div className={styles.box}>
                {mall.d_mall_in.image_permission === 1 && mall.d_mall_in?.[3]?.thumbs ?
                  <img src={mall.d_mall_in?.[3]?.thumbs} alt="" />
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
              <p className={styles.saveTxt}>保存：{mall.d_mall_in.length}件</p>
              {mall.lock === 0 ?
                <button
                  className={styles.saveBtn}
                  type="button"
                  onClick={() => handleClickSaveMall(mall.id)}
                >保存</button>
              : null}
            </div>
            <div className={styles.userArea}>
              <div className={styles.imgBox}>
                <img src={notSet.src} alt="" />
              </div>
              <p className={styles.nicename}>{mall.name}</p>
            </div>
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