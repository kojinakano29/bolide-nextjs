import { Btn01, PopularStore, Trend } from '@/components/dellamall';
import Container from '@/components/dellamall/Layouts/container';
import PageLayoutDellamall from '@/components/Layouts/PageLayoutDellamall';
import styles from '@/styles/dellamall/components/home.module.scss'
import fv_text from '@/images/dellamall/top/fv_text.svg'
import fv_text__sp from '@/images/dellamall/top/fv_text__sp.svg'
import Image from 'next/image';
import { createContext } from 'react';

export const StoreData = createContext()

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DELLAMALL}`)
  const data = await res.json()

  return {
      props: {
          posts: data
      }
  }
}

const Home = ({posts}) => {
  console.log(posts)

  const popular = posts.popular

  return (
    <>
      <section className={styles.mv}>
        <Container small>
          <h1 className={`${styles.sitename} pc`}>
            <Image
              src={fv_text}
              alt="della mall"
              layout="responsive"
              sizes="416px"
              priority
            />
          </h1>
          <h1 className={`${styles.sitename} sp`}>
            <Image
              src={fv_text__sp}
              alt="della mall"
              layout="responsive"
              sizes="416px"
              priority
            />
          </h1>
          <div className={styles.trend}>
            <Trend />
          </div>
        </Container>
      </section>

      <section className={styles.popular}>
        <Container small>
          <h2 className="ttl1">人気のストア</h2>
        </Container>
        <div className={styles.popularWrap}>
          <StoreData.Provider value={{popular}}>
            <PopularStore />
          </StoreData.Provider>
        </div>
        <Container>
          <Btn01 right />
        </Container>
      </section>

      <section className={styles.pickup}>
        <Container>
          <h2 className="ttl1">PICKUP</h2>
        </Container>
      </section>

      <section className={styles.storeList}>
        <Container>
          <h2 className="ttl1">ストア一覧</h2>
        </Container>
      </section>
    </>
  );
}

export default Home;

Home.getLayout = function getLayout(page) {
  return <PageLayoutDellamall>{page}</PageLayoutDellamall>
}
