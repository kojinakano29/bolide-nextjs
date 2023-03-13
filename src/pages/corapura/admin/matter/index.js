import Container from "@/components/corapura/Layout/container";
import PageLayoutCorapura from "@/components/Layouts/pageLayoutCorapura";
import { useAuth } from "@/hooks/auth";
import axios from "@/lib/axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_CORAPURA}/post`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const AdminMatter = ({posts}) => {
  console.log(posts)
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth()
  const [disabled, setDisabled] = useState(false)
  const [matters, setMatters] = useState([])
  const [nowPage, setNowPage] = useState(posts.now_page)
  const [maxPage, setMaxPage] = useState(posts.page_max)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const { handleSubmit, register } = useForm()

  const handleSort = useCallback(async () => {
    await csrf()

    await axios.post(`/api/corapura/${router.query.type === "company" ? "post" : "user_post"}`, {
      s: search,
      page: parseInt(page),
    }).then((res) => {
      console.log(res)
      setMatters(res.data.post)
      setNowPage(res.data.now_page)
      setMaxPage(res.data.page_max)
    }).catch(e => console.error(e))
  }, [
    setMatters,
    setNowPage,
    setMaxPage,
    search, page
  ])

  useEffect(async () => {
    if (disabled) return
    setDisabled(true)

    await handleSort()

    await setDisabled(false)
  }, [page])

  const handleClickPage = useCallback(async (e) => {
    setPage(e.currentTarget.value)
  }, [setPage])

  const onSortForm = useCallback(async (data) => {
    if (disabled) return
    setDisabled(true)
    await csrf()

    await axios.post(`/api/corapura/${router.query.type === "company" ? "post" : "user_post"}`, {
      s: data.s ? data.s : "",
      page: parseInt(page)
    }).then((res) => {
      console.log(res)
      setMatters(res.data.post)
      setNowPage(res.data.now_page)
      setMaxPage(res.data.page_max)
    }).catch(e => console.error(e))

    setSearch(data.s)
    await setDisabled(false)
  }, [
    disabled,
    setDisabled,
    setMatters,
    setNowPage,
    setMaxPage,
    page,
    setSearch,
  ])

  return (
    <>
      <section className="cont1">
        <Container small>
          <h2 className="ttl1">
            {router.query.type === "company" ? "企業" : "インフルエンサー/ユーザー"}案件一覧
          </h2>
          <form onSubmit={handleSubmit(onSortForm)}></form>
        </Container>
      </section>
    </>
  );
}

export default AdminMatter;

AdminMatter.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}