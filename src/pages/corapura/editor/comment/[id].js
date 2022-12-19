import styles from '@/styles/corapura/components/comment.module.scss'
import { Loader } from "@/components/corapura";
import Container from "@/components/corapura/Layout/container";
import PageLayoutCorapura from "@/components/Layouts/pageLayoutCorapura";
import { useAuth } from "@/hooks/auth";
import axios from "@/lib/axios";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_CORAPURA}/mypost/compleate/${params.id}`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const EditorComment = ({posts}) => {
  // console.log(posts)
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth({middleware: 'auth', type: 'corapura'})
  const [matters, setMatters] = useState(posts)
  const [currentMatter, setCurrentMatter] = useState()
  const [disabled, setDisabled] = useState(false)
  const [popup, setPopup] = useState(false)
  const { handleSubmit, register, formState: { errors } } = useForm({
    mode: "onChange",
  })

  const onLoad = useCallback(async () => {
    alert("このページの閲覧権限がありません。")
    router.push({
      pathname: '/corapura/editor'
    })
  }, [])

  useEffect(() => {
    if (user && parseInt(user?.id) !== parseInt(router.query.id)) {
      onLoad()
    }
  }, [user])

  const handleClickPopup = useCallback(async (matter) => {
    setPopup(prevState => !prevState)
    setCurrentMatter(matter)
  }, [setPopup, setCurrentMatter])

  const onSubmit = useCallback(async (data) => {
    // console.log(data)
    setDisabled(true)
    await csrf()

    await axios.post(`/api/corapura/comment/store`, {
      user_id: user?.id,
      to_user_id: currentMatter.c_post.user_id,
      title: currentMatter.c_post.title,
      content: data.content,
    }).then((res) => {
      // console.log(res)
      axios.post(`/api/corapura/c_post_app/state_change_comment_compleate/${currentMatter.id}`)
      .then((res) => {
        // console.log(res)
        setMatters(res.data)
        setPopup(false)
        alert("コメントを送信しました。")
      }).catch(e => console.error(e))
    }).catch(e => console.error(e))

    await setDisabled(false)
  }, [setDisabled, user, currentMatter, setMatters, setPopup])

  return (
    <>
      <section className="cont1">
        <Container small>
          <h2 className="ttl1">完了した案件一覧</h2>
          {!disabled ?
            <article className={styles.listBox}>
              {matters.map((matter, index) => (
                <div className={styles.listItem} key={index}>
                  <Link href={`/corapura/company/matter/${matter.c_post.id}`}>
                    <a className={styles.ttl}>{matter.c_post.title}</a>
                  </Link>
                  <button
                    type="button"
                    className={`${styles.btn} hoverEffect`}
                    onClick={() => handleClickPopup(matter)}
                  >コメントする</button>
                </div>
              ))}
            </article>
          : <Loader />}
        </Container>
      </section>

      {popup ?
        <section className={styles.modalArea} onClick={handleClickPopup}>
          <Container small>
            <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <h3 className="ttl1">コメントする</h3>
                <dl>
                  <dt>
                    <label htmlFor="content">コメント内容</label>
                  </dt>
                  <dd>
                    <textarea
                      id="content"
                      {...register("content", {required: true})}
                    ></textarea>
                    {errors.content && <p className={styles.error}>必須項目を入力してください</p>}
                  </dd>
                </dl>
                <button className={styles.btn} disabled={disabled}>送信する</button>
              </form>
            </div>
          </Container>
        </section>
      : null}
    </>
  );
}

export default EditorComment;

EditorComment.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}