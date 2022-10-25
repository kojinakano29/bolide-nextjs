import styles from '@/styles/liondor/components/createPost.module.scss'
import axios from '@/lib/axios'; // カスタムフック
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form';
import Container from '@/components/Layouts/container';

// SSR
export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/liondor/series/edit/${params.id}`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const EditSeries = ({posts}) => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const [disabled, setDisabled] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: posts.name,
    }
  })


  const onPostForm = useCallback(async(data) => {
    await csrf()

    await axios.post(`/api/liondor/series/update/${posts.id}`, data)
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
              <button className="btn2" disabled={disabled}>更新</button>
            </div>
          </article>
        </form>
      </Container>
    </section>
  );
}

export default EditSeries;