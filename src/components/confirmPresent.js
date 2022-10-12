import styles from '@/styles/components/presentForm.module.scss'
import axios from '@/lib/axios'; // カスタムフック
import { useCallback } from 'react';
import { useFormContext } from "react-hook-form"
import { useRouter } from 'next/router';
import Link from 'next/link';

const ConfirmPresent = ({present}) => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()

  const { handleSubmit, getValues, formState: { isValid } } = useFormContext()

  const values = getValues()

  if (!isValid) {
    router.push(`/present/${present.id}`)
  }

  const handleBack = useCallback(() => {
    router.push(`/present/${present.id}`)
  }, [router])

  const onPresentForm = useCallback(async (data) => {
    await csrf()

    await axios.post(`/api/liondor/present/app/${present.id}`, data)
    .then((res) => {
      console.log(res)
      // router.push("/present/thanks")
    })
    .catch((e) => {
      console.error(e)
    })
  }, [router])

  const onSubmit = useCallback(async (data) => {
    console.log(data)

    onPresentForm({
      user_id: values.user_id,
      l_present_id: present.id,
      hobby: values.hobby,
      brand: values.brand,
      cosmetic: values.cosmetic,
      marriage: values.marriage,
      child: values.child,
      income: values.income,
    })
  }, [onPresentForm])

  return (
    <>
      <p className={styles.desc}>入力内容をご確認ください。</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <article className={`${styles.formContent} ${styles.confirmContent}`}>
          <dl className={styles.dl}>
            <dt>SNSアカウント</dt>
            <dd>
              <dl className={styles.inDl}>
                <dt>
                  <label htmlFor="facebookId">Facebook ID</label>
                </dt>
                <dd>{values.facebook}</dd>
              </dl>
              <dl className={styles.inDl}>
                <dt>
                  <label htmlFor="instaId">Instagram ID</label>
                </dt>
                <dd>{values.insta}</dd>
              </dl>
              <dl className={styles.inDl}>
                <dt>
                  <label htmlFor="twitterId">Twitter ID</label>
                </dt>
                <dd>{values.twitter}</dd>
              </dl>
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt>未婚/既婚</dt>
            <dd className={styles.radioArea}>{values.marriage}</dd>
          </dl>
          <dl className={styles.dl}>
            <dt>子ども</dt>
            <dd className={styles.radioArea}>{values.child}</dd>
          </dl>
          <dl className={styles.dl}>
            <dt>年収</dt>
            <dd className={styles.selectArea}>{values.income}</dd>
          </dl>
          <dl className={styles.dl}>
            <dt>趣味</dt>
            <dd className={styles.hobbyArea}>
              <ul className={styles.ul}>
                {values.hobby.map((hobby, index) => (
                  <li key={index}>{hobby}</li>
                ))}
              </ul>
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt>好きなブランド</dt>
            <dd>
              <ul className={styles.ul}>
                {values.brand.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt>好きなコスメブランド</dt>
            <dd>
              <ul className={styles.ul}>
                {values.cosmetic.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </dd>
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

export default ConfirmPresent;