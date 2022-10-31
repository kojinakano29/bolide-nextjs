import { Trend } from '@/components/dellamall';
import Container from '@/components/dellamall/Layouts/container';
import PageLayoutDellamall from '@/components/Layouts/PageLayoutDellamall';
import styles from '@/styles/dellamall/components/home.module.scss'
import fv_text from '@/images/dellamall/top/fv_text.svg'
import fv_text__sp from '@/images/dellamall/top/fv_text__sp.svg'
import Image from 'next/image';

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

  return (
    <>
      <section className={styles.mv}>
        <Container small900>
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
    </>
  );
}

export default Home;

Home.getLayout = function getLayout(page) {
  return <PageLayoutDellamall>{page}</PageLayoutDellamall>
}
