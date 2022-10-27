import styles from '@/styles/liondor/components/createPost.module.scss'
import axios from '@/lib/axios'; // カスタムフック
import { useCallback, useEffect, useState } from 'react'
import { PageTitle, PostEditor } from '@/components/liondor';
import { useForm } from 'react-hook-form';
import Container from '@/components/Layouts/container';
import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/router';
import PageLayout from '@/components/Layouts/PageLayout';

// SSR
export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/liondor/post/create`)
  const data = await res.json()

  return {
    props: {
        posts: data
    }
  }
}

const CreatePost = ({posts}) => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth({middleware: 'auth'})

  useEffect(() => {
    onLoadCheck()
  }, [user])

  const onLoadCheck = () => {
    if (user?.account_type < 1) {
      alert("このページにはアクセスできません。")
      router.push(`/liondor`)
    }
  }

  const [disabled, setDisabled] = useState(false)
  const [editorContent, setEditorContent] = useState()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const catArray = posts.category
  const seriesArray = posts.series

  const onPostForm = useCallback(async (data) => {
    await csrf()

    const params = new FormData();
    Object.keys(data).forEach(function(key) {
      params.append(key, this[key])
    }, data)

    await axios.post('/api/liondor/post/store', params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      // console.log(res)
      if (res.data.state === 0) {
        alert("下書きを作成しました。")
      } else {
        alert("記事を作成しました。")
      }
      router.push({
        pathname: '/liondor/post/edit/[pid]',
        query: { pid: res.data.id }
      })
    })
    .catch((e) => {
      console.error(e)
    })
  }, [])

  const onSubmit = useCallback((data) => {
    // console.log(data)
    setDisabled(true)

    onPostForm({
      user_id: user?.id,
      l_category_id: data.child_category,
      l_series_id: data.l_series_id,
      title: data.title,
      thumbs: data.thumbs[0],
      mv: data.mv[0],
      sub_title: data.sub_title,
      discription: data.discription,
      content: editorContent,
      state: data.state,
    })
  }, [onPostForm, editorContent, user])

  const [cat, setCat] = useState([catArray[0]])
  const handleCat = (e) => {
    setCat(catArray.filter((item) => {
      return item.id.toString() === e.target.value
    }))
  }

  const [state, setState] = useState(false)
  const handleState = useCallback(() => {
    setState((prevState) => !prevState)
  }, [])

  const [preview, setPreview] = useState()
  const handleChangeFile = useCallback((e) => {
    const { files } = e.target
    if (files[0]) {
      setPreview(window.URL.createObjectURL(files[0]))
    } else {
      setPreview("")
    }
  }, [])
  const [preview2, setPreview2] = useState()
  const handleChangeFile2 = useCallback((e) => {
    const { files } = e.target
    if (files[0]) {
      setPreview2(window.URL.createObjectURL(files[0]))
    } else {
      setPreview2("")
    }
  }, [])

  return (
    <section className={styles.createSection}>
      <PageTitle title="記事作成" />
      {
        user?.account_type > 1 ?
        <Container small>
          <form onSubmit={handleSubmit(onSubmit)}>
            <article className={styles.flex}>
              <div className={styles.left}>
                <dl className={styles.dl}>
                  <dt className={styles.dt}>
                    <label htmlFor="title">タイトル</label>
                  </dt>
                  <dd className={styles.dd}>
                    <input type="text" id="title" {...register("title", { required: state })} />
                    {errors.title && <p className={`red ${styles.error}`}>必須項目を入力してください</p>}
                  </dd>
                </dl>
                <dl className={styles.dl}>
                  <dt className={styles.dt}>
                    <label htmlFor="subtitle">サブタイトル</label>
                  </dt>
                  <dd className={styles.dd}>
                    <textarea id="subtitle" {...register("sub_title", { required: state })}></textarea>
                    {errors.sub_title && <p className={`red ${styles.error}`}>必須項目を入力してください</p>}
                  </dd>
                </dl>
                <dl className={styles.dl}>
                  <dt className={styles.dt}>
                    <label htmlFor="desc">ディスクリプション</label>
                  </dt>
                  <dd className={styles.dd}>
                    <textarea id="desc" {...register("discription", { required: state })}></textarea>
                    {errors.discription && <p className={`red ${styles.error}`}>必須項目を入力してください</p>}
                  </dd>
                </dl>
                <dl className={styles.dl}>
                  <dt className={styles.dt}>本文</dt>
                  <dd className={styles.dd}>
                    <PostEditor setEditorContent={setEditorContent} />
                  </dd>
                </dl>
                <dl className={styles.dl}>
                  <dt className={styles.dt}>
                    <label htmlFor="thumb">サムネイル画像</label>
                  </dt>
                  <dd className={styles.dd}>
                    <input id="thumb" type="file" accept="image/*" {...register("thumbs", { required: state })} onChange={handleChangeFile} />
                    <img src={preview} alt="" />
                    {errors.thumbs && <p className={`red ${styles.error}`}>必須項目を入力してください</p>}
                  </dd>
                </dl>
                <dl className={styles.dl}>
                  <dt className={styles.dt}>
                    <label htmlFor="mv">メインビジュアル</label>
                  </dt>
                  <dd className={styles.dd}>
                    <input id="mv" type="file" accept="image/*" {...register("mv", { required: state })} onChange={handleChangeFile2} />
                    <img src={preview2} alt="" />
                    {errors.mv && <p className={`red ${styles.error}`}>必須項目を入力してください</p>}
                  </dd>
                </dl>
              </div>
              <div className={styles.right}>
                <dl className={styles.dl}>
                  <dt className={styles.dt}>公開状態</dt>
                  <dd className={styles.dd}>
                    <select {...register("state")} onChange={handleState}>
                      <option value="0">下書き</option>
                      <option value="1">公開済み</option>
                    </select>
                  </dd>
                </dl>
                <button className="btn2" disabled={disabled}>新規作成</button>
                <div className={styles.hr}></div>
                <dl className={styles.dl}>
                  <dt className={styles.dt}>大カテゴリー</dt>
                  <dd className={styles.dd}>
                    <select {...register("l_category_id")} onChange={handleCat}>
                      {catArray.map((cat, index) => (
                        <option value={index+1} key={index+1}>{cat.name}</option>
                      ))}
                    </select>
                  </dd>
                </dl>
                <dl className={styles.dl}>
                  <dt className={styles.dt}>子カテゴリー</dt>
                  <dd className={styles.dd}>
                    <select {...register("child_category")}>
                      {cat[0].child_category.map((cat) => (
                        <option value={cat.id} key={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </dd>
                </dl>
                <dl className={styles.dl}>
                  <dt className={styles.dt}>シリーズ選択</dt>
                  <dd className={styles.dd}>
                    <select {...register("l_series_id")}>
                      {seriesArray.map((series, index) => (
                        <option value={index+1} key={index+1}>{series.name}</option>
                      ))}
                    </select>
                  </dd>
                </dl>
              </div>
            </article>
          </form>
        </Container>
        : null
      }
    </section>
  );
}

export default CreatePost;

CreatePost.getLayout = function getLayout(page) {
  return <PageLayout>{page}</PageLayout>
}