import styles from '@/styles/liondor/components/form.module.scss'
import axios from '@/lib/liondor/axios'; // カスタムフック
import { useCallback, useEffect } from 'react';
import { useFormContext } from "react-hook-form"
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/liondor/auth';

const ConfirmPresent = ({present}) => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth()

  const { handleSubmit, getValues, formState: { isValid } } = useFormContext()

  const values = getValues()
  const marriageInt = parseInt(values.marriage)
  const childInt = parseInt(values.child)
  const marriage = marriageInt === 0 ? "未婚" : "既婚";
  const child = childInt === 0 ? "なし" : "あり";

  useEffect(() => {
    if (!isValid) {
      router.push(`/liondor/present/${present.id}`)
    }
  }, [])

  const handleBack = useCallback(() => {
    router.push(`/liondor/present/${present.id}`)
  }, [router])

  const onPresentForm = useCallback(async (data) => {
    await csrf()

    await axios.post(`/api/liondor/present/app/${present.id}`, data)
    .then((res) => {
      // console.log(res)
      sessionStorage.setItem('comp', true)
      router.push("/liondor/present/thanks")
    })
    .catch((e) => {
      console.error(e)
    })
  }, [router])

  const onSubmit = useCallback(async (data) => {
    // console.log(data)
    const sns = `${values.facebook ? values.facebook : ''},${values.insta ? values.insta : ''},${values.twitter ? values.twitter : ''}`

    onPresentForm({
      user_id: user?.id,
      l_present_id: present.id,
      account: sns,
      hobby: values.hobby,
      brand: values.brand,
      cosmetic: values.cosmetic,
      marriage: marriageInt,
      child: childInt,
      income: values.income,
    })
  }, [onPresentForm, user])

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
            <dd className={styles.radioArea}>{marriage}</dd>
          </dl>
          <dl className={styles.dl}>
            <dt>子ども</dt>
            <dd className={styles.radioArea}>{child}</dd>
          </dl>
          <dl className={styles.dl}>
            <dt>年収</dt>
            <dd className={styles.selectArea}>{values.income}</dd>
          </dl>
          <dl className={styles.dl}>
            <dt>趣味</dt>
            <dd className={styles.hobbyArea}>
              <ul className={styles.ul}>
                {values.hobby?.map((hobby, index) => (
                  <li key={index}>{hobby}</li>
                ))}
              </ul>
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt>好きなブランド</dt>
            <dd>
              <ul className={styles.ul}>
                {values.brand?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt>好きなコスメブランド</dt>
            <dd>
              <ul className={styles.ul}>
                {values.cosmetic?.map((item, index) => (
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