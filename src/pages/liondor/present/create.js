import styles from '@/styles/liondor/components/createPost.module.scss'
import axios from '@/lib/axios'; // カスタムフック
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Container from '@/components/liondor/Layouts/container';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/auth';
import { PageTitle } from '@/components/liondor';
import PageLayoutLiondor from '@/components/Layouts/PageLayoutLiondor';

const CreatePresent = () => {
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

  const [disabled, setDisabled] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onPostForm = useCallback(async(data) => {
    await csrf()

    const params = new FormData();
    Object.keys(data).forEach(function(key) {
      params.append(key, this[key])
    }, data)

    await axios.post('/api/liondor/present/store', params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      // console.log(res)
      alert("プレゼントを作成しました。")
      router.push({
        pathname: '/liondor/present/edit/[pid]',
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
      thumbs: data.thumbs[0],
      title: data.title,
      offer: data.offer,
      limit: data.limit,
    })
  }, [onPostForm])

  const [preview, setPreview] = useState()
  const handleChangeFile = useCallback((e) => {
    const { files } = e.target
    if (files[0]) {
      setPreview(window.URL.createObjectURL(files[0]))
    } else {
      setPreview("")
    }
  }, [])

  return (
    <section className={styles.createSection}>
      <PageTitle title="プレゼント作成" />
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
                    <input id="thumbs" type="file" accept="image/*" {...register("thumbs", { required: true })} onChange={handleChangeFile} />
                    <img src={preview} alt="" />
                    {errors.thumbs && <p className={`red ${styles.error}`}>必須項目を入力してください</p>}
                  </dd>
                </dl>
              </div>
              <div className={styles.right}>
                <button className="btn2" disabled={disabled}>新規作成</button>
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

export default CreatePresent;

CreatePresent.getLayout = function getLayout(page) {
  return <PageLayoutLiondor>{page}</PageLayoutLiondor>
}