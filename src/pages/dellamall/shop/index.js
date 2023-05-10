import styles from '@/styles/dellamall/components/shopSearch.module.scss'
import {
    Btn01,
    Loader,
    MasonryGridComponent,
    ShopSort,
    Trend,
} from '@/components/dellamall'
import Container from '@/components/dellamall/Layouts/container'
import PageLayoutDellamall from '@/components/Layouts/PageLayoutDellamall'
import axios from '@/lib/axios'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { createContext, useEffect, useRef, useState } from 'react'
import useSWRInfinite from 'swr/infinite'
import { useRouter } from 'next/router'

export const SortContext = createContext()

const ShopSearch = () => {
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const router = useRouter()
    const [sort, setSort] = useState({
        name: '新着順',
        value: 'new',
    })
    const [account, setAccount] = useState({
        name: 'すべて',
        value: 'all',
    })

    /* 二度押し監視 */
    const processing = useRef(false)

    /* もっと見る useSWRInfinite */
    const limit = 28
    const getKey = (pageIndex, previousPageData) => {
        csrf()
        if (previousPageData && !previousPageData.length) return null
        if (pageIndex === 0)
            return `/api/dellamall/shop/sort/1/${sort.value}/${
                account.value
            }?tag_id=${router.query.tag_id ? router.query.tag_id : '0'}`
        return `/api/dellamall/shop/sort/${pageIndex + 1}/${sort.value}/${
            account.value
        }?tag_id=${router.query.tag_id ? router.query.tag_id : '0'}`
    }

    const fetcher = url => axios.post(url).then(res => res.data.shop)

    const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher)

    const isEmpty = data?.[0]?.length === 0
    const isReachingEnd = isEmpty || data?.[data?.length - 1]?.length < limit
    if (error) return 'failed'
    const pics = data?.flat()

    const handleClickMore = async () => {
        if (processing.current) return
        processing.current = true
        await setSize(size + 1)
    }

    useEffect(() => {
        processing.current = false
    }, [handleClickMore])
    /* もっと見る useSWRInfinite */

    return (
        <>
            <section className={`cont1 ${styles.cont1}`}>
                <Container small>
                    <div className={styles.trend}>
                        <Trend sp />
                    </div>
                </Container>
            </section>

            <section className={styles.storeList}>
                <Container>
                    <SortContext.Provider
                        value={{ sort, setSort, account, setAccount }}>
                        <ShopSort />
                    </SortContext.Provider>
                    <MasonryGridComponent item={pics} />
                    {!data ? <Loader /> : null}
                    {processing.current ? <Loader /> : null}
                    {data && !isReachingEnd && !processing.current ? (
                        <div className="btnCover" onClick={handleClickMore}>
                            <Btn01 fa={faSquarePlus} txt="さらに見る" />
                        </div>
                    ) : null}
                </Container>
            </section>
        </>
    )
}

export default ShopSearch

ShopSearch.getLayout = function getLayout(page) {
    return <PageLayoutDellamall>{page}</PageLayoutDellamall>
}
