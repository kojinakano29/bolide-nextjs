import styles from '@/styles/liondor/components/form.module.scss'
import axios from '@/lib/axios'; // カスタムフック
import { useCallback, useEffect } from 'react';
import { useFormContext } from "react-hook-form"
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/auth';

const ConfirmContact = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth()

  const { handleSubmit, getValues, formState: { isValid } } = useFormContext()

  const values = getValues()

  useEffect(() => {
    if (!isValid) {
      router.push(`/liondor/contact`)
    }
  }, [])

  const handleBack = useCallback(() => {
    router.back()
  }, [router])

  const onPresentForm = useCallback(async (data) => {
    await csrf()

    await axios.post("/api/liondor/contact", data)
    .then((res) => {
      // console.log(res)
      sessionStorage.setItem('contact', true)
      router.push("/liondor/contact/thanks")
    })
    .catch((e) => {
      console.error(e)
    })
  }, [router])

  const onSubmit = useCallback(async (data) => {
    // console.log(data)

    onPresentForm({
      user_id: user?.id,
      content: values.content,
      name: values.name,
      furigana: values.furigana,
      mail: values.mail,
      storeName: values.storeName,
      tel: values.tel,
      message: values.message,
    })
  }, [onPresentForm, user])

  return (
    <>
      <p className={styles.desc}>入力内容をご確認ください。</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <article className={`${styles.formContent} ${styles.confirmContent}`}>
          <dl className={styles.dl}>
            <dt>
              お問い合わせ内容
              <span className="red">＊</span>
            </dt>
            <dd className={styles.checkArea}>
              <ul className={styles.ul}>
                {values.content?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt>
              氏名
              <span className="red">＊</span>
            </dt>
            <dd>{values.name}</dd>
          </dl>
          <dl className={styles.dl}>
            <dt>氏名カナ</dt>
            <dd>{values.furigana}</dd>
          </dl>
          <dl className={styles.dl}>
            <dt>
              メールアドレス
              <span className="red">＊</span>
            </dt>
            <dd>{values.mail}</dd>
          </dl>
          <dl className={styles.dl}>
            <dt>会社・店名</dt>
            <dd>{values.storeName}</dd>
          </dl>
          <dl className={styles.dl}>
            <dt>
              電話番号
              <span className="red">＊</span>
            </dt>
            <dd>{values.tel}</dd>
          </dl>
          <dl className={styles.dl}>
            <dt>メッセージ本文</dt>
            <dd>{values.message}</dd>
          </dl>
          <div className={styles.btnFlex}>
            <button type="button" className="btn3" onClick={handleBack}>修正する</button>
            <button type="submit" className="btn3">送信する</button>
          </div>
        </article>
      </form>
    </>
  );
}

export default ConfirmContact;