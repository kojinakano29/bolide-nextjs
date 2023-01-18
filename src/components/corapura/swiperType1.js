import styles from '@/styles/corapura/components/swiper.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper'
import { MatterCard } from '@/components/corapura';
import { useState } from 'react';
import left from '@/images/corapura/top/arrowIcon-left.svg'
import right from '@/images/corapura/top/arrowIcon-right.svg'


const SwiperType1 = ({matters}) => {
  const [current, setCurrent] = useState(

  )
  return (
    <>
      <div className={styles.swiperType1}>
        <div className="swiperType1">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            slidesPerView="auto"
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            onSlideChange={(swiperCore) => {
              const { realIndex } = swiperCore
              setCurrent(realIndex+1)
            }}
          >
            {matters.map((matter, index) => (
              <SwiperSlide key={index}>
                <MatterCard matter={matter} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={styles.slideNav}>
          <div className={styles.currentBox}>
            <p className="en">{current}</p>
            <div
              className={`
                ${current === 2 ? styles.c2 : null}
                ${current === 3 ? styles.c3 : null}
                ${current === 4 ? styles.c4 : null}
                ${current === 5 ? styles.c5 : null}
                ${current === 6 ? styles.c6 : null}
                ${current === 7 ? styles.c7 : null}
                ${current === 8 ? styles.c8 : null}
                ${current === 9 ? styles.c9 : null}
                ${current === 10 ? styles.c10 : null}
              `}
            ></div>
            <p className="en">{matters.length}</p>
          </div>
          <div className={styles.btnBox}>
            <button type="button" className={`swiper-button-prev ${styles.prev} hoverEffect`}>
              <img src={left.src} alt="" />
            </button>
            <button type="button" className={`swiper-button-next ${styles.next} hoverEffect`}>
              <img src={right.src} alt="" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SwiperType1;