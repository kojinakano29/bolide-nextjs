import styles from '@/styles/components/recommends.module.scss'
import 'swiper/css/bundle'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper'
import Image from 'next/image'
import dummy18 from '@/images/cms/dummy18.png'
import Link from 'next/link'
import { BlogTxt } from '@/components'

const Recommends = ({posts}) => {
  const pickup = posts.pickups

  return (
    <article className={styles.recoBox}>
      <h2 className="ttl1 ivy">RECOMMENDS</h2>
      <div className={styles.slideWrap}>
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={34}
          slidesPerView="auto"
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          loop={true}
        >
          {pickup.map((item, index) => (
            <SwiperSlide key={index}>
              <div className={styles.slideBox}>
                <Link href={`/post/show/${item.id}`}>
                  <a className={styles.blogLink}>
                    <div className={styles.imgBox}>
                      <Image
                        src={dummy18}
                        alt=""
                        layout="responsive"
                        sizes="(min-width: 1340px) 325px, (min-width: 768px) 180px, 25vw"
                        priority
                      />
                    </div>
                    <BlogTxt
                      cat="FASHION"
                      cat2="TREND & STORY"
                      ttl="【インフルエンサーインタビューvol.5】魅せるインスタブランディング×望む未来を創るコーチング・美容ライフ　梅宮翠さん"
                      name="ARATA HOMMA"
                      time="2022-09-26T04:54:36.000000Z"
                      smallMb
                    />
                  </a>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.slideNav}>
        <button className={`swiper-button-prev ${styles.prev}`}></button>
        <button className={`swiper-button-next ${styles.next}`}></button>
      </div>
    </article>
  );
}

export default Recommends;