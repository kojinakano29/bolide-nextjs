import styles from '@/styles/components/createPost.module.scss'
import axios from '@/lib/axios'; // カスタムフック
import { useCallback } from 'react'
import { useForm } from 'react-hook-form';
import Container from '@/components/Layouts/container';

// SSR
export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/liondor/faq/edit/${params.id}`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const FaqEdit = ({posts}) => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const post = posts

  const { register, handleSubmit, formState: { isDirty, errors } } = useForm({
    defaultValues: {
      question: post.question,
      answer: post.answer,
      type: post.type,
    }
  })

  const onPostForm = useCallback(async (data) => {
    await csrf()

    await axios.post(`/api/liondor/faq/update/${post.id}`, data)
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
      question: data.question,
      answer: data.answer,
      type: data.type,
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
                  <label htmlFor="question">質問</label>
                </dt>
                <dd className={styles.dd}>
                  <input type="text" id="question" {...register("question", { required: true })} />
                  {errors.question && <p className={`red ${styles.error}`}>必須項目を入力してください</p>}
                </dd>
              </dl>
              <dl className={styles.dl}>
                <dt className={styles.dt}>
                  <label htmlFor="answer">回答</label>
                </dt>
                <dd className={styles.dd}>
                  <textarea id="answer" {...register("answer", { required: true })}></textarea>
                  {errors.answer && <p className={`red ${styles.error}`}>必須項目を入力してください</p>}
                </dd>
              </dl>
            </div>
            <div className={styles.right}>
              <button className="btn2" disabled={!isDirty}>更新</button>
              <div className={styles.hr}></div>
              <dl className={styles.dl}>
                <dt className={styles.dt}>企業/ユーザー</dt>
                <dd className={styles.dd}>
                  <select {...register("type")}>
                    <option value="0">企業様向け</option>
                    <option value="1">ユーザー向け</option>
                  </select>
                </dd>
              </dl>
            </div>
          </article>
        </form>
      </Container>
    </section>
  );
}

export default FaqEdit;