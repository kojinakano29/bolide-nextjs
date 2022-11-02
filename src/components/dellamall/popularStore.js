import { StoreData } from '@/pages/dellamall'
import styles from '@/styles/dellamall/components/popularStore.module.scss'
import { useContext } from 'react'
import 'swiper/css/bundle'
import { Swiper, SwiperSlide } from 'swiper/react'
import { StoreCard } from '@/components/dellamall'

const PopularStore = () => {
  const { popular } = useContext(StoreData)

  return (
    <article className={styles.article}>
      <div className="popularBox">
        <Swiper
          spaceBetween={16}
          slidesPerView="auto"
          centeredSlides={true}
          loop={true}
        >
          {popular.map((item, index) => (
            <SwiperSlide key={index}>
              <StoreCard item={item} swiper none />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </article>
  );
}

export default PopularStore;