import styles from '@/styles/liondor/components/createPost.module.scss'
import axios from '@/lib/axios'; // カスタムフック
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Container from '@/components/Layouts/container';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/auth';

const CreateFaq = () => {
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

  const [disabled, setDisabled] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onPostForm = useCallback(async (data) => {
    await csrf()

    await axios.post('/api/liondor/faq/store', data)
    .then((res) => {
      // console.log(res)
      alert("よくあるご質問を作成しました。")
      router.push({
        pathname: '/liondor/faq/edit/[faqid]',
        query: { faqid: res.data.id }
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
      question: data.question,
      answer: data.answer,
      type: data.type,
    })
  }, [onPostForm])

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
                <button className="btn2" disabled={disabled}>新規作成</button>
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
        : null
      }
    </section>
  );
}

export default CreateFaq;