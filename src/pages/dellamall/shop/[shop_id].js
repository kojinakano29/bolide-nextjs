import { MasonryGridComponent, ShopDetailArea } from '@/components/dellamall'
import Container from '@/components/dellamall/Layouts/container'
import PageLayoutDellamall from '@/components/Layouts/PageLayoutDellamall'
import styles from '@/styles/dellamall/components/shopDetail.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DELLAMALL}/shop/show/${params.shop_id}`)
  const data = await res.json()

  return {
      props: {
          posts: data
      }
  }
}

const ShopDetail = ({posts}) => {
  const router = useRouter()

  const connection = posts.kanren

  const handleClickBack = () => {
    router.back()
  }

  return (
    <>
      <section className="cont1">
        <Container>
          <button type="button" className={styles.back} onClick={handleClickBack}>
            <FontAwesomeIcon icon={faArrowLeft} size="xl" />
          </button>
        </Container>
        <Container small>
          <ShopDetailArea data={posts} />
        </Container>
      </section>

      <section className={styles.connectionShop}>
        <Container>
          <h2 className="ttl1 center">関連ショップ</h2>
          <MasonryGridComponent item={connection} />
        </Container>
      </section>
    </>
  );
}

export default ShopDetail;

ShopDetail.getLayout = function getLayout(page) {
  return <PageLayoutDellamall>{page}</PageLayoutDellamall>
}