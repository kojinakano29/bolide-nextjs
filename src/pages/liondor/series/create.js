import styles from '@/styles/liondor/components/createPost.module.scss'
import axios from '@/lib/axios'; // カスタムフック
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form';
import Container from '@/components/Layouts/container';
import { useRouter } from 'next/router';

const CreateSeries = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const [disabled, setDisabled] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onPostForm = useCallback(async(data) => {
    await csrf()

    await axios.post('/api/liondor/series/store', data)
    .then((res) => {
      // console.log(res)
      alert("シリーズを作成しました。")
      router.push(`/liondor/series/edit/${res.data.id}`)
    })
    .catch((e) => {
      console.error(e)
    })
  }, [])

  const onSubmit = useCallback((data) => {
    // console.log(data)
    setDisabled(true)

    onPostForm({
      name: data.name,
    })
  }, [onPostForm])

  return (
    <section className={styles.createSection}>
      <Container small>
        <form onSubmit={handleSubmit(onSubmit)}>
          <article className={styles.flex}>
            <div className={styles.left}>
              <dl className={styles.dl}>
                <dt className={styles.dt}>
                  <label htmlFor="name">シリーズ名</label>
                </dt>
                <dd className={styles.dd}>
                  <input type="text" id="name" {...register("name", { required: true })} />
                  {errors.name && <p className={`red ${styles.error}`}>必須項目を入力してください</p>}
                </dd>
              </dl>
            </div>
            <div className={styles.right}>
              <button className="btn2" disabled={disabled}>新規作成</button>
            </div>
          </article>
        </form>
      </Container>
    </section>
  );
}

export default CreateSeries;