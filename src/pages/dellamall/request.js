import Container from '@/components/dellamall/Layouts/container';
import PageLayoutDellamall from '@/components/Layouts/PageLayoutDellamall';
import styles from '@/styles/dellamall/components/request.module.scss'
import Image from 'next/image';
import item1 from '@/images/dellamall/shopRequest/cont1__item1.webp'
import item2 from '@/images/dellamall/shopRequest/cont1__item2.webp'
import item3 from '@/images/dellamall/shopRequest/cont1__item3.webp'
import graph from '@/images/dellamall/shopRequest/cont2_img.svg'
import graphSp from '@/images/dellamall/shopRequest/cont2_img__sp.svg'
import { Btn01 } from '@/components/dellamall';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

const Request = () => {
  return (
    <>
      <section className="cont1">
        <Container small>
          <h2 className="ttl2">公式ショップ申請</h2>
          <div className={styles.cont1__title}>公式ショップになるとできること</div>
          <ul className={styles.cont1__list}>
            <li className={styles.cont1__item}>
              <div className={styles.imgBox}>
                <Image
                  src={item1}
                  alt=""
                  layout="responsive"
                  sizes="(min-width: 1340px) 312px, (min-width: 768px) 180px, 100vw"
                  priority
                />
              </div>
              <div className={styles.cont1__item__text}>
                商品掲載でもっと<br id="pc" />
                ショップをアピール！
              </div>
            </li>
            <li className={styles.cont1__item}>
              <div className={styles.imgBox}>
                <Image
                  src={item2}
                  alt=""
                  layout="responsive"
                  sizes="(min-width: 1340px) 312px, (min-width: 768px) 180px, 100vw"
                  priority
                />
              </div>
              <div className={styles.cont1__item__text}>
                SNSを設置して<br id="pc" />
                リアルタイム情報を拡散可能
              </div>
            </li>
            <li className={styles.cont1__item}>
              <div className={styles.imgBox}>
                <Image
                  src={item3}
                  alt=""
                  layout="responsive"
                  sizes="(min-width: 1340px) 312px, (min-width: 768px) 180px, 100vw"
                  priority
                />
              </div>
              <div className={styles.cont1__item__text}>
                グループサイトと併せた<br id="pc" />
                活用で更なる販路拡大！！
              </div>
            </li>
          </ul>
        </Container>
      </section>

      <section className={styles.plan}>
        <Container small>
          <h3 className={styles.cont2__title}>Bolide's Japan 料金プラン</h3>
          <p className={styles.cont2__text}></p>
          <div className={`${styles.imgBox} pc`}>
            <Image
              src={graph}
              alt=""
              layout="responsive"
              sizes="(min-width: 1340px) 1000px, (min-width: 768px) 720px, 100vw"
              priority
            />
          </div>
          <div className={`${styles.imgBox} sp`}>
            <Image
              src={graphSp}
              alt=""
              layout="responsive"
              sizes="100vw"
              priority
            />
          </div>
        </Container>
      </section>

      <section className={styles.btnArea}>
        <Container small>
          <div className={styles.cont3__title}>まずは下のボタンから公式ショップ申請！</div>
          <Btn01 fa={faCircleCheck} txt="公式ショップ申請" link="/dellamall/officialRequest" />
        </Container>
      </section>
    </>
  );
}

export default Request;

Request.getLayout = function getLayout(page) {
  return <PageLayoutDellamall>{page}</PageLayoutDellamall>
}