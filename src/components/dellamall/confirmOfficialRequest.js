import axios from '@/lib/axios';
import styles from '@/styles/dellamall/components/form.module.scss'
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import Btn01 from './btn01';

const ConfirmOfficialRequest = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { handleSubmit, getValues, formState: { isValid } } = useFormContext()
  const values = getValues()

  useEffect(() => {
    if (!isValid) {
      router.push("/dellamall/officialRequest")
    }
  }, [])

  const handleBack = useCallback(() => {
    router.back()
  }, [router])

  const onContactForm = useCallback(async (data) => {
    await csrf()

    await axios.post("/api/dellamall/officialRequest", data)
    .then((res) => {
      // console.log(res)
      sessionStorage.setItem('officialRequest', true)
      router.push("/dellamall/officialRequest/thanks")
    })
    .catch((e) => {
      console.error(e)
    })
  }, [router])

  const onSubmit = useCallback(async (data) => {
    // console.log(data)

    onContactForm({
      content: values.content,
      url: values.url,
      type: values.type,
      company: values.company,
      furiganaCompany: values.furiganaCompany,
      tel: values.tel,
      mail: values.mail,
      zipcode: values.zipcode,
      zip: values.zip,
      zip2: values.zip2,
      name: values.name,
      furigana: values.furigana,
      contact: values.contact,
      mail2: values.mail2,
      tel2: values.tel2,
      remarks: values.remarks,
    })
  }, [onContactForm, values])

  return (
    <>
      <div className={styles.desc}>
        <p className={styles.big}>入力内容をご確認ください。</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <article className={`${styles.formContent} ${styles.confirmContent}`}>
          <dl className={styles.dl}>
            <dt>
              <span className={styles.require}>必須</span>
              申請内容
            </dt>
            <dd>
              <ul className={styles.ul}>
                {values.content?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt>
              <span className={styles.require}>必須</span>
              URL
            </dt>
            <dd>{values.url}</dd>
          </dl>
          <h3 className={styles.ttl}>会社情報</h3>
          <dl className={styles.dl}>
            <dt>
              <span className={styles.require}>必須</span>
              事業形態
            </dt>
            <dd>
              <ul className={styles.ul}>
                {values.type?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt>
              <span className={styles.require}>必須</span>
              会社名
            </dt>
            <dd>{values.company}</dd>
          </dl>
          <dl className={styles.dl}>
            <dt>
              <span className={styles.any}>任意</span>
              会社名フリガナ
            </dt>
            <dd>{values.furiganaCompany}</dd>
          </dl>
          <dl className={styles.dl}>
            <dt>
              <span className={styles.require}>必須</span>
              電話番号
            </dt>
            <dd>{values.tel}</dd>
          </dl>
          <dl className={styles.dl}>
            <dt>
              <span className={styles.require}>必須</span>
              メールアドレス
            </dt>
            <dd>{values.mail}</dd>
          </dl>
          <dl className={styles.dl}>
            <dt>
              <span className={styles.require}>必須</span>
              郵便番号
            </dt>
            <dd>{values.zipcode}</dd>
          </dl>
          <dl className={styles.dl}>
            <dt>
              <span className={styles.require}>必須</span>
              都道府県
            </dt>
            <dd>{values.zip}</dd>
          </dl>
          <dl className={styles.dl}>
            <dt>
              <span className={styles.require}>必須</span>
              番地・建物名・部屋番号
            </dt>
            <dd>{values.zip2}</dd>
          </dl>
          <h3 className={styles.ttl}>担当者情報</h3>
          <dl className={styles.dl}>
            <dt>
              <span className={styles.require}>必須</span>
              お名前
            </dt>
            <dd>{values.name}</dd>
          </dl>
          <dl className={styles.dl}>
            <dt>
              <span className={styles.any}>任意</span>
              フリガナ
            </dt>
            <dd>{values.furigana}</dd>
          </dl>
          <dl className={styles.dl}>
            <dt>
              <span className={styles.require}>必須</span>
              連絡先
            </dt>
            <dd>{values.contact}</dd>
          </dl>
          {values.contact === "担当者連絡先を個別に設定する" ?
            <div className={styles.otherAddress}>
              <dl className={styles.dl}>
                <dt>
                  <span className={styles.require}>必須</span>
                  メールアドレス
                </dt>
                <dd>{values.mail2}</dd>
              </dl>
              <dl className={styles.dl}>
                <dt>
                  <span className={styles.require}>必須</span>
                  電話番号
                </dt>
                <dd>{values.tel2}</dd>
              </dl>
            </div>
            : null
          }
          <dl className={styles.dl}>
            <dt>
              <span className={styles.any}>任意</span>
              備考
            </dt>
            <dd>{values.remarks}</dd>
          </dl>
          <Btn01 txt="送信する" />
          <button type="button" className={styles.backBtn} onClick={handleBack}>戻る</button>
        </article>
      </form>
    </>
  );
}

export default ConfirmOfficialRequest;