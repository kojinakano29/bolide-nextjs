import styles from '@/styles/dellamall/components/mallComponent.module.scss'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import notSet from '@/images/dellamall/myPage/userImg.webp'
import { useCallback } from 'react';
import axios from '@/lib/axios';

const MallComponent = ({item}) => {
  console.log(item)
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const handleClickMall = useCallback(async (mallId) => {
    await csrf()

    await axios.post(`/api/dellamall/user/mall_click`, {
      d_mall_id: mallId,
    }).then((res) => {
      console.log(res)
    }).catch((e) => {
      console.error(e)
    })
  }, [])

  return (
    <div className={styles.flex}>
      {item.map((mall, index) => (
        <div className={styles.mallBox} key={index}>
          <button type="button" className={styles.mallBtn} onClick={() => {
            mall.lock === 0 ? handleClickMall(mall.id) : null
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
          <p className={styles.save}>保存：{mall.d_mall_in.length}件</p>
          <div className={styles.userArea}>
            <div className={styles.imgBox}>
              <img src={notSet.src} alt="" />
            </div>
            <p className={styles.nicename}>{mall.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MallComponent;