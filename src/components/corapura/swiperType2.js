import styles from '@/styles/corapura/components/swiper.module.scss'
import { Swiper } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper'

const SwiperType2 = ({ children, gap }) => {
    return (
        <div className={styles.swiperType2}>
            <div className="swiperType2">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    spaceBetween={gap}
                    slidesPerView="auto"
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    loop={true}>
                    {children}
                </Swiper>
            </div>
        </div>
    )
}

export default SwiperType2
