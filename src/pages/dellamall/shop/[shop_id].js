import styles from '@/styles/dellamall/components/shopDetail.module.scss'

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
  console.log(posts)

  return (
    <div>
      Enter
    </div>
  );
}

export default ShopDetail;