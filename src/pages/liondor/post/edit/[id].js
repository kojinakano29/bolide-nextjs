import styles from '@/styles/liondor/components/createPost.module.scss'
import axios from '@/lib/axios'; // カスタムフック
import { useCallback, useEffect, useState } from 'react'
import { Button2, PageTitle, PostEditor } from '@/components/liondor';
import { useForm } from 'react-hook-form';
import Container from '@/components/liondor/Layouts/container';
import { useAuth } from '@/hooks/auth';
import PageLayoutLiondor from '@/components/Layouts/PageLayoutLiondor';
import { useRouter } from 'next/router';

// SSR
export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_LIONDOR}/post/edit/${params.id}`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const PostEdit = ({posts}) => {
  // console.log(posts)
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth({middleware: 'auth', type: 'liondor'})

  useEffect(() => {
    onLoadCheck()
  }, [user])

  const onLoadCheck = () => {
    if (user?.account_type < 2) {
      alert("このページにはアクセスできません。")
      router.push(`/liondor`)
    }
  }

  const catArray = posts.category
  const seriesArray = posts.series
  const post = posts.posts
  const parentCat = posts.parent_category
  const content = posts.posts.content

  const [disabled, setDisabled] = useState(false)
  const [editorContent, setEditorContent] = useState(content)
  const [defaultThumb, setDefaultThumb] = useState(post.thumbs)
  const [defaultMv, setDefaultMv] = useState(post.mv)

  const parentNum = parseInt(parentCat.id)
  const arrayNum = parentNum - 1
  const [cat, setCat] = useState([catArray[arrayNum]])

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: post.title,
      sub_title: post.sub_title,
      discription: post.discription,
      state: post.state,
      l_category_id: parentNum,
      child_category: post.l_category_id,
      l_series_id: post.l_series_id,
      view_date: post.view_date,
    }
  })

  const handleCat = (e) => {
    setCat(catArray.filter((item) => {
      setValue("child_category", e.target.value)
      return item.id.toString() === e.target.value
    }))
  }

  const onPostForm = useCallback(async (data) => {
    await csrf()

    const params = new FormData();
    Object.keys(data).forEach(function(key) {
      params.append(key, this[key])
    }, data)

    await axios.post(`/api/liondor/post/update/${post.id}`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      // console.log(res)
      alert("更新しました。")
      setDisabled(false)
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
      l_series_id: data.l_series_id ? data.l_series_id : 0,
      title: data.title,
      thumbs: defaultThumb,
      mv: defaultMv,
      sub_title: data.sub_title,
      discription: data.discription,
      content: editorContent,
      state: data.state,
      view_date: data.view_date,
    })
  }, [onPostForm, editorContent, defaultThumb, defaultMv, user])

  const [state, setState] = useState(() => {
    return post.state === 1 ? true : false
  })
  const handleState = useCallback(() => {
    setState((prevState) => !prevState)
  }, [])

  const defaultThumbsPreview = `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${post.thumbs}`
  const [preview, setPreview] = useState(post.thumbs ? defaultThumbsPreview : null)
  const handleChangeFile = useCallback((e) => {
    const { files } = e.target

    if (files[0] !== undefined) {
      setPreview(window.URL.createObjectURL(files[0]))
      setDefaultThumb(files[0])
    }
  }, [])

  const defaultMvPreview = `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${post.mv}`
  const [preview2, setPreview2] = useState(post.mv ? defaultMvPreview : null)
  const handleChangeFile2 = useCallback((e) => {
    const { files } = e.target

    if (files[0] !== undefined) {
      setPreview2(window.URL.createObjectURL(files[0]))
      setDefaultMv(files[0])
    }
  }, [])

  return (
    <section className={styles.createSection}>
      <PageTitle title="記事編集" />
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
                    <textarea id="desc" {...register("discription")}></textarea>
                  </dd>
                </dl>
                <dl className={styles.dl}>
                  <dt className={styles.dt}>本文</dt>
                  <dd className={styles.dd}>
                    <PostEditor
                      handleChange={(editorContent) => {
                        setEditorContent(editorContent)
                      }}
                      value={editorContent}
                      uploadPath={`/api/liondor/post/imagesave`}
                    />
                  </dd>
                </dl>
                <dl className={styles.dl}>
                  <dt className={styles.dt}>
                    <label htmlFor="thumb">サムネイル画像</label>
                  </dt>
                  <dd className={styles.dd}>
                    <input id="thumb" type="file" accept="image/*" {...register("thumbs")} onChange={handleChangeFile} />
                    {preview ? <img src={preview} alt="プレビュー画像" />: null}
                  </dd>
                </dl>
                <dl className={styles.dl}>
                  <dt className={styles.dt}>
                    <label htmlFor="mv">メインビジュアル</label>
                  </dt>
                  <dd className={styles.dd}>
                    <input id="mv" type="file" accept="image/*" {...register("mv")} onChange={handleChangeFile2} />
                    {preview2 ? <img src={preview2} alt="プレビュー画像" /> : null}
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
                <dl className={styles.dl}>
                  <dt className={styles.dt}>
                    <label htmlFor="view_date">日付</label>
                  </dt>
                  <dd className={styles.dd}>
                    <input
                      type="datetime-local"
                      id="view_date"
                      {...register("view_date", { required: state })}
                    />
                    {errors.view_date && <p className={`red ${styles.error}`}>必須項目を入力してください</p>}
                  </dd>
                </dl>
                <button className="btn2" disabled={disabled}>更新</button>
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
                      <option value={0}>選択しない</option>
                      {seriesArray.map((series, index) => (
                        <option value={index+1} key={index+1}>{series.name}</option>
                      ))}
                    </select>
                  </dd>
                </dl>
                <a href={`/liondor/post/editor_index/${user?.id}`} className="btn2">一覧へ戻る</a>
              </div>
            </article>
          </form>
        </Container>
        : null
      }

      <Button2 link={`/liondor/post/editor_index/${user?.id}`} name="一覧へ戻る" noto />
    </section>
  );
}

export default PostEdit;

PostEdit.getLayout = function getLayout(page) {
  return <PageLayoutLiondor>{page}</PageLayoutLiondor>
}