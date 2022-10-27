import styles from '@/styles/liondor/components/createPost.module.scss'
import axios from '@/lib/axios'; // カスタムフック
import { useCallback, useEffect, useState } from 'react'
import { PageTitle, SidebarEditor } from '@/components/liondor';
import { useForm } from 'react-hook-form';
import Container from '@/components/Layouts/container';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/auth';
import PageLayout from '@/components/Layouts/PageLayout';

const CreateSidebar = () => {
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

  const [editorContent, setEditorContent] = useState()
  const [disabled, setDisabled] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onPostForm = useCallback(async (data) => {
    await csrf()

    const params = new FormData();
    Object.keys(data).forEach(function(key) {
      params.append(key, this[key])
    }, data)

    await axios.post('/api/liondor/sidebar/store', params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      // console.log(res)
      if (res.data.state === 0) {
        alert("下書きを作成しました。")
      } else {
        alert("サイドバーを作成しました。")
      }
      router.push({
        pathname: '/liondor/sidebar/edit/[sid]',
        query: { sid: res.data.id }
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
      title: data.title,
      content: editorContent,
      order: data.order,
      state: data.state,
    })
  }, [onPostForm, editorContent])

  const [state, setState] = useState(false)
  const handleState = useCallback(() => {
    setState((prevState) => !prevState)
  }, [])

  return (
    <section className={styles.createSection}>
      <PageTitle title="サイドバー作成" />
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
                    <input type="text" id="title" {...register("title", { required: state })} />
                    {errors.title && <p className={`red ${styles.error}`}>必須項目を入力してください</p>}
                  </dd>
                </dl>
                <dl className={styles.dl}>
                  <dt className={styles.dt}>本文</dt>
                  <dd className={styles.dd}>
                    <SidebarEditor setEditorContent={setEditorContent} />
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
                  <dt className={styles.dt}>
                    <label htmlFor="order">順番</label>
                  </dt>
                  <dd className={styles.dd}>
                    <input type="number" id="order" defaultValue="0" {...register("order")} />
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

export default CreateSidebar;

CreateSidebar.getLayout = function getLayout(page) {
  return <PageLayout>{page}</PageLayout>
}