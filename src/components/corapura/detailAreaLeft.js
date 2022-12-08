import styles from '@/styles/corapura/components/detailArea.module.scss'
import { useCallback, useContext, useState } from 'react';
import dummy1 from '@/images/corapura/common/dummy1.svg'
import { CompanyContext } from './detailArea';

const DetailAreaLeft = ({influencer = false}) => {
  const { profile } = useContext(CompanyContext)
  const [currentImg, setCurrentImg] = useState(0)

  const handleClickSelectImg = useCallback(async (cur) => {
    setCurrentImg(cur)
  }, [setCurrentImg])

  return (
    <div className={`${styles.detailLeft} ${influencer ? styles.influencer : null}`}>
      <div className={styles.currentImg}>
        {currentImg === 0 ? <img src={profile.image1 ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile.image1}` : dummy1.src} alt="" /> : null}
        {currentImg === 1 ? <img src={profile.image2 ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile.image2}` : dummy1.src} alt="" /> : null}
        {currentImg === 2 ? <img src={profile.image3 ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile.image3}` : dummy1.src} alt="" /> : null}
      </div>
      <div className={styles.selectImg}>
        <button type="button" className="hoverEffect" onClick={() => handleClickSelectImg(0)}>
          <img src={profile.image1 ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile.image1}` : dummy1.src} alt="" />
        </button>
        <button type="button" className="hoverEffect" onClick={() => handleClickSelectImg(1)}>
          <img src={profile.image2 ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile.image2}` : dummy1.src} alt="" />
        </button>
        <button type="button" className="hoverEffect" onClick={() => handleClickSelectImg(2)}>
          <img src={profile.image3 ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${profile.image3}` : dummy1.src} alt="" />
        </button>
      </div>
    </div>
  );
}

export default DetailAreaLeft;