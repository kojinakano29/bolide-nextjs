import {
    MasonryGridComponent,
    ShopDetailArea,
    ShopOfficial,
} from '@/components/dellamall'
import Container from '@/components/dellamall/Layouts/container'
import PageLayoutDellamall from '@/components/Layouts/PageLayoutDellamall'
import styles from '@/styles/dellamall/components/shopDetail.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/auth'

export const getServerSideProps = async ({ params }) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DELLAMALL}/shop/show/${params.shop_id}`,
    )
    const data = await res.json()

    return {
        props: {
            posts: data,
        },
    }
}

const ShopDetail = ({ posts }) => {
    // console.log(posts)

    const router = useRouter()
    const { user } = useAuth({ middleware: 'auth', type: 'dellamall' })

    const connection = posts.kanren
    const shop = posts.shop

    const handleClickBack = () => {
        router.back()
    }

    return (
        <>
            <section className="cont1">
                <Container>
                    <button
                        type="button"
                        className={styles.back}
                        onClick={handleClickBack}>
                        <FontAwesomeIcon icon={faArrowLeft} size="xl" />
                    </button>
                </Container>
                <Container small>
                    <ShopDetailArea data={posts} user={user} />
                </Container>
            </section>

            {shop.official_user_id ? (
                <section className={styles.shopOfficial}>
                    <Container small>
                        <ShopOfficial info={shop} salon={posts.salon?.[0]} />
                    </Container>
                </section>
            ) : null}

            {!shop.official_user_id ? (
                <section className={styles.connectionShop}>
                    <Container>
                        <h2 className="ttl1 center">関連ショップ</h2>
                        {connection.length !== 0 ? (
                            <MasonryGridComponent item={connection} />
                        ) : (
                            <p className={styles.noneText}>
                                関連ショップがありません
                            </p>
                        )}
                    </Container>
                </section>
            ) : null}
        </>
    )
}

export default ShopDetail

ShopDetail.getLayout = function getLayout(page) {
    return <PageLayoutDellamall>{page}</PageLayoutDellamall>
}
