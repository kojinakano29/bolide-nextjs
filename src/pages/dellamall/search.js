import { Btn01, Loader, MasonryGridComponent, ShopSortSearch } from "@/components/dellamall";
import Container from "@/components/dellamall/Layouts/container";
import PageLayoutDellamall from "@/components/Layouts/PageLayoutDellamall";
import axios from "@/lib/axios";
import { createContext, useEffect, useRef, useState } from "react";
import useSWRInfinite from "swr/infinite"
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'

export const SortContextSearch = createContext()

export const getServerSideProps = async ({query}) => {
  return {
      props: {
          posts: query,
      }
  }
}

const SearchDellamall = ({posts}) => {
  // console.log(posts)
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const [sort, setSort] = useState({
    name: "新着順",
    value: "new",
  })
  const [account, setAccount] = useState({
    name: "すべて",
    value: "all",
  })

  /* 二度押し監視 */
  const processing = useRef(false)

  /* もっと見る useSWRInfinite */
  const limit = 28;
  const getKey = (pageIndex, previousPageData) => {
    csrf()
    if (previousPageData && !previousPageData.length) return null
    if (pageIndex === 0) return `/api/dellamall/shop/search/1/${sort.value}/${account.value}`
    return `/api/dellamall/shop/search/${pageIndex+1}/${sort.value}/${account.value}`
  }

  const fetcher = url => axios.post(url, {
    s: posts.s,
  }).then(res => res.data.shop)

  const {
    data,
    error,
    size,
    setSize,
  } = useSWRInfinite(getKey, fetcher)

  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data?.[data?.length - 1]?.length < limit)
  if (error) return "failed"
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
    <section className="cont1">
      <Container>
        <h2 className="ttl2">検索一覧</h2>
        <SortContextSearch.Provider value={{sort, setSort, account, setAccount}}>
          <ShopSortSearch />
        </SortContextSearch.Provider>
        <MasonryGridComponent item={pics} />
        {!data ? <Loader /> : null}
        {processing.current ? <Loader /> : null}
        {data && !isReachingEnd && !processing.current ?
          <div className="btnCover" onClick={handleClickMore}>
            <Btn01 fa={faSquarePlus} txt="さらに見る" />
          </div>
        : null}
      </Container>
    </section>
  );
}

export default SearchDellamall;

SearchDellamall.getLayout = function getLayout(page) {
  return <PageLayoutDellamall>{page}</PageLayoutDellamall>
}