import styles from '@/styles/dellamall/components/form.module.scss'
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Btn01 from './btn01';

const InputContact = () => {
  const router = useRouter()

  const furiganaRegExp = /^[ァ-ンヴー]*$/
  const mailRegExp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/
  const telRegExp = /^0\d{9,10}$/

  const { register, handleSubmit, setValue, formState: { errors, isValid } } = useFormContext()

  const onSubmit = useCallback(async (data) => {
    // console.log(data)

    router.push('/dellamall/contact/?confirm=1')
  }, [router])

  useEffect(() => {
    if (router.query.type === "spam") {
      setValue("type", ["コメントの通報"])
    } else if (router.query.type === "captcha") {
      setValue("type", ["ショップキャプチャ無料登録について"])
    }
  }, [router])

  return (
    <>
      <div className={styles.desc}>
        <p className={styles.big}>お気軽にお問い合わせください</p>
        <p className={styles.sm}>
          みなさまからのご質問・ご意見など幅広くお受けしています。<br />
          下記フォームに必須事項をご入力の上、送信してください。
        </p>
        <p className={styles.sm}><span className={styles.require}>必須</span> の項目は入力必須となっております。</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <article className={styles.formContent}>
          <dl className={styles.dl}>
            <dt className={styles.dt2}>
              <span className={styles.require}>必須</span>
              お問い合わせ種別
            </dt>
            <dd className={styles.checkArea}>
              <label>
                <input type="checkbox" value="ショップキャプチャ無料登録について" {...register("type", {required: true})} />
                ショップキャプチャ無料登録について
              </label>
              <label>
                <input type="checkbox" value="ショップの掲載について" {...register("type", {required: true})} />
                ショップの掲載について
              </label>
              <label>
                <input type="checkbox" value="ショップの削除依頼" {...register("type", {required: true})} />
                ショップの削除依頼
              </label>
              <label>
                <input type="checkbox" value="コメントの通報" {...register("type", {required: true})} />
                コメントの通報
              </label>
              <label>
                <input type="checkbox" value="その他" {...register("type", {required: true})} />
                その他
              </label>
              {errors.type && <p className={`orange ${styles.error}`}>※こちらの項目は入力必須です</p>}
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt>
              <span className={styles.require}>必須</span>
              URL
            </dt>
            <dd>
              <input type="text" {...register("url", {required: true})} placeholder="該当のショップURL" />
              {errors.url && <p className={`orange ${styles.error}`}>※こちらの項目は入力必須です</p>}
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt>
              <span className={styles.require}>必須</span>
              お名前
            </dt>
            <dd>
              <input type="text" {...register("name", {required: true})} placeholder="山田 太郎" />
              {errors.name && <p className={`orange ${styles.error}`}>※こちらの項目は入力必須です</p>}
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt>
              <span className={styles.any}>任意</span>
              フリガナ
            </dt>
            <dd>
              <input type="text" {...register("furigana", {pattern: furiganaRegExp})} placeholder="ヤマダ タロウ" />
              {errors.furigana && <p className={`orange ${styles.error}`}>※カタカナのみ入力してください。</p>}
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt>
              <span className={styles.any}>任意</span>
              会社名
            </dt>
            <dd className={styles.long}>
              <input type="text" {...register("company")} placeholder="株式会社サンプル" />
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt>
              <span className={styles.require}>必須</span>
              メールアドレス
            </dt>
            <dd className={styles.long}>
              <input
                type="email"
                {...register("mail", {
                  required: {
                    value: true,
                    message: "※こちらの項目は入力必須です",
                  },
                  pattern: {
                    value: mailRegExp,
                    message: "※メールアドレスの形式で入力してください",
                  }
                })}
                placeholder="youremail@example.com"
              />
              {errors.mail?.types.required && <p className={`orange ${styles.error}`}>{errors.mail.types.required}</p>}
              {errors.mail?.types.pattern && <p className={`orange ${styles.error}`}>{errors.mail.types.pattern}</p>}
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt>
              <span className={styles.require}>必須</span>
              電話番号
            </dt>
            <dd>
              <input
                type="tel"
                {...register("tel", {
                  required: {
                    value: true,
                    message: "※こちらの項目は入力必須です",
                  },
                  pattern: {
                    value: telRegExp,
                    message: "※電話番号の形式で入力してください",
                  }
                })}
                placeholder="0123456789"
              />
              {errors.tel?.types.required && <p className={`orange ${styles.error}`}>{errors.tel.types.required}</p>}
              {errors.tel?.types.pattern && <p className={`orange ${styles.error}`}>{errors.tel.types.pattern}</p>}
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt className={styles.dt2}>
              <span className={styles.require}>必須</span>
              お問い合わせ内容
            </dt>
            <dd>
              <textarea {...register("content", {required: true})}></textarea>
              {errors.content && <p className={`orange ${styles.error}`}>※こちらの項目は入力必須です</p>}
            </dd>
          </dl>
          <div className={styles.check}>
            <label>
              <span className={styles.require}>必須</span>
              <input type="checkbox" {...register("check", {required: true})} />
              個人情報保護方針に同意する
            </label>
            {errors.check && <p className={`orange ${styles.error} ${styles.error2}`}>※こちらの項目は入力必須です</p>}
          </div>
          <Btn01 txt="確認する" />
        </article>
        {!isValid && <p className={`orange ${styles.error} ${styles.error2}`}>※まだ全ての必須項目の入力が完了していません。</p>}
      </form>
    </>
  );
}

export default InputContact;