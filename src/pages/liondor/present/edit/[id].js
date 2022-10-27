import styles from '@/styles/liondor/components/createPost.module.scss'
import axios from '@/lib/axios'; // カスタムフック
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Container from '@/components/Layouts/container';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/auth';

// SSR
export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/liondor/present/edit/${params.id}`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const PresentEdit = ({posts}) => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth({middleware: 'auth'})

  useEffect(() => {
    onLoadCheck()
  }, [user])

  const onLoadCheck = () => {
    if (user?.account_type < 2) {
      alert("このページにはアクセスできません。")
      router.push(`/liondor`)
    }
  }

  const [defaultThumb, setDefaultThumb] = useState(posts.thumbs)
  const [disabled, setDisabled] = useState(false)

  const formatDate = useCallback((date) => {
    return date.substr(0, 10)
  }, [])

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: posts.title,
      offer: posts.offer,
      limit: formatDate(posts.limit),
    }
  })


  const onPostForm = useCallback(async(data) => {
    await csrf()

    const params = new FormData();
    Object.keys(data).forEach(function(key) {
      params.append(key, this[key])
    }, data)

    await axios.post(`/api/liondor/present/update/${posts.id}`, params, {
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
      thumbs: defaultThumb,
      title: data.title,
      offer: data.offer,
      limit: data.limit,
    })
  }, [onPostForm, defaultThumb])

  const defaultThumbsPreview = `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${posts.thumbs}`
  const [preview, setPreview] = useState(defaultThumbsPreview)
  const handleChangeFile = useCallback((e) => {
    const { files } = e.target

    if (files[0] !== undefined) {
      setPreview(window.URL.createObjectURL(files[0]))
      setDefaultThumb(files[0])
    }
  }, [])

  return (
    <section className={styles.createSection}>
      {
        user?.account_type > 2 ?
        <Container small>
          <form onSubmit={handleSubmit(onSubmit)}>
            <article className={styles.flex}>
              <div className={styles.left}>
                <dl className={styles.dl}>
                  <dt className={styles.dt}>
                    <label htmlFor="title">タイトル</label>
                  </dt>
                  <dd className={styles.dd}>
                    <input type="text" id="title" {...register("title", { required: true })} />
                    {errors.title && <p className={`red ${styles.error}`}>必須項目を入力してください</p>}
                  </dd>
                </dl>
                <dl className={styles.dl}>
                  <dt className={styles.dt}>
                    <label htmlFor="offer">オファー</label>
                  </dt>
                  <dd className={styles.dd}>
                    <input type="text" id="offer" {...register("offer", { required: true })} />
                    {errors.offer && <p className={`red ${styles.error}`}>必須項目を入力してください</p>}
                  </dd>
                </dl>
                <dl className={styles.dl}>
                  <dt className={styles.dt}>
                    <label htmlFor="thumbs">サムネイル画像</label>
                  </dt>
                  <dd className={styles.dd}>
                    <input id="thumbs" type="file" accept="image/*" {...register("thumbs")} onChange={handleChangeFile} />
                    <img src={preview} alt="" />
                  </dd>
                </dl>
              </div>
              <div className={styles.right}>
                <button className="btn2" disabled={disabled}>更新</button>
                <div className={styles.hr}></div>
                <dl className={styles.dl}>
                  <dt className={styles.dt}>
                    <label htmlFor="limit">期限</label>
                  </dt>
                  <dd className={styles.dd}>
                    <input type="date" id="limit" {...register("limit", { required: true })} />
                    {errors.limit && <p className={`red ${styles.error}`}>必須項目を入力してください</p>}
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

export default PresentEdit;