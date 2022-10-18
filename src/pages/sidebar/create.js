import styles from '@/styles/components/createPost.module.scss'
import axios from '@/lib/axios'; // カスタムフック
import { useCallback, useState } from 'react'
import { SidebarEditor } from '@/components';
import { useForm } from 'react-hook-form';
import Container from '@/components/Layouts/container';

const CreateSidebar = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const [editorContent, setEditorContent] = useState()

  const { register, handleSubmit, watch, formState: { errors } } = useForm()

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
    })
    .catch((e) => {
      console.error(e)
    })
  }, [])

  const onSubmit = useCallback((data) => {
    // console.log(data)

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
              <button className="btn2">新規作成</button>
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
    </section>
  );
}

export default CreateSidebar;