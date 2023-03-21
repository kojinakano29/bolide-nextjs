import { useAuth } from '@/hooks/auth';
import axios from '@/lib/axios';
import styles from '@/styles/top/components/form.module.scss'
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Btn1 } from '@/components/top/';

const ConfirmAd = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth()

  const { handleSubmit, getValues, formState: { isValid } } = useFormContext()

  const values = getValues()

  useEffect(() => {
    if (!isValid) {
      router.push({
        pathname: "/ad"
      })
    }
  }, [])

  const handleBack = useCallback(async () => {
    router.back()
  }, [router])

  const onAdForm = useCallback(async (data) => {
    await csrf()

    await axios.post("/api/bolides_japan/ad_form", data)
    .then((res) => {
      // console.log(res)
      sessionStorage.setItem('ad', true)
      router.push({
        pathname: "/ad/thanks"
      })
    }).catch(e => console.error(e))
  }, [router])

  const onSubmit = useCallback(async (data) => {
    // console.log(data)

    onAdForm({
      user_id: user?.id,
      content: values.content,
      name: `${values.name1} ${values.name2}`,
      store_name: values.store_name,
      email: values.email,
      tel: values.tel,
      message: values.message,
    })
  }, [onAdForm, user])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <article className={styles.formContent}>
          <p className={styles.catch}>入力内容をご確認ください。</p>
          <dl>
            <dt>
              お問い合わせ内容
              <span className={styles.require}>必須</span>
            </dt>
            <dd className={styles.checkbox}>
              <ul className={styles.ul}>
                {values.content?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              お名前
              <span className={styles.require}>必須</span>
            </dt>
            <dd className={styles.inputFlex}>{`${values.name1}${values.name2}`}</dd>
          </dl>
          <dl>
            <dt>
              会社・店名
              <span className={styles.any}>任意</span>
            </dt>
            <dd>{values.store_name}</dd>
          </dl>
          <dl>
            <dt>
              メールアドレス
              <span className={styles.require}>必須</span>
            </dt>
            <dd>{values.email}</dd>
          </dl>
          <dl>
            <dt>
              電話番号
              <span className={styles.require}>必須</span>
            </dt>
            <dd>{values.tel}</dd>
          </dl>
          <dl>
            <dt>
              メッセージ本文
              <span className={styles.any}>任意</span>
            </dt>
            <dd>{values.message}</dd>
          </dl>
          <div className={styles.btnFlex}>
            <div className={styles.type2} onClick={handleBack}>
              <Btn1 txt="修正する" />
            </div>
            <div>
              <Btn1 txt="送信する" submit />
            </div>
          </div>
        </article>
      </form>
    </>
  );
}

export default ConfirmAd;