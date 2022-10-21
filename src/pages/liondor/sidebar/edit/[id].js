import styles from '@/styles/liondor/components/createPost.module.scss'
import axios from '@/lib/liondor/axios'; // カスタムフック
import { useCallback, useState } from 'react'
import { SidebarEditor } from '@/components/liondor';
import { useForm } from 'react-hook-form';
import Container from '@/components/Layouts/container';

// SSR
export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/liondor/sidebar/edit/${params.id}`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const SidebarEdit = ({posts}) => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const [editorContent, setEditorContent] = useState()
  const [disabled, setDisabled] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: posts.title,
      state: posts.state,
      order: posts.order,
    }
  })

  const onPostForm = useCallback(async (data) => {
    await csrf()

    const params = new FormData();
    Object.keys(data).forEach(function(key) {
      params.append(key, this[key])
    }, data)

    await axios.post(`/api/liondor/sidebar/update/${posts.id}`, params, {
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
      title: data.title,
      content: editorContent,
      order: data.order,
      state: data.state,
    })
  }, [onPostForm, editorContent])

  const [state, setState] = useState(() => {
    return posts.state === 1 ? true : false
  })
  const handleState = useCallback(() => {
    setState((prevState) => !prevState)
  }, [])

  return (
    <section className={styles.createSection}>
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
                  <SidebarEditor setEditorContent={setEditorContent} content={posts.content} edit />
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
              <button className="btn2" disabled={disabled}>更新</button>
              <div className={styles.hr}></div>
              <dl className={styles.dl}>
                <dt className={styles.dt}>
                  <label htmlFor="order">順番</label>
                </dt>
                <dd className={styles.dd}>
                  <input type="number" id="order" {...register("order")} />
                </dd>
              </dl>
            </div>
          </article>
        </form>
      </Container>
    </section>
  );
}

export default SidebarEdit;