import styles from '@/styles/liondor/components/form.module.scss'
import { useRouter } from "next/router"
import { useCallback } from "react"
import { useFormContext } from "react-hook-form"
import Link from 'next/link'

const InputAd = () => {
  const router = useRouter()

  const furiganaRegExp = /^[ァ-ンヴー]*$/
  const mailRegExp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/
  const telRegExp = /^0\d{9,10}$/

  const { register, handleSubmit, formState: { errors, isValid } } = useFormContext()

  const onSubmit = useCallback(async (data) => {
    // console.log(data)

    router.push(`/liondor/ad/?confirm=1`)
  }, [router])

  return (
    <>
      <div className={styles.adBox}>
        <p className={styles.adTxt}>広告掲載企業様・ブランド様を募集しております。</p>
        <p className={`${styles.adTxt2} ${styles.gray}`}>
          LIONDORでは、プレスリリース、広告掲載、情報掲載に関するお問い合わせを常に受け付けています。
          <br/>ブランドのニュースやコレクション情報、プロフィール紹介などや、ショップ情報の掲載を希望される
          <br/>企業様・ブランド様は下記までご連絡下さい。
        </p>
        <p className={styles.adTxt2}>詳細の注意事項はこちらをご覧ください</p>
        <a href="" target="_blank" className="btn3 noto">PDFをDLする</a>
      </div>
      <p className={styles.desc}>
        お申込みは下記のフォームをご利用ください。
        <br/>担当よりご連絡いたします。
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <article className={styles.formContent}>
          <dl className={styles.dl}>
            <dt>
              お問い合わせ内容
              <span className="red">＊</span>
            </dt>
            <dd className={styles.checkArea}>
              <label>
                <input type="checkbox" value="掲載内容について" {...register("content", {required: true})} />
                掲載内容について
              </label>
              <label>
                <input type="checkbox" value="掲載希望について" {...register("content", {required: true})} />
                掲載希望について
              </label>
              <label>
                <input type="checkbox" value="その他" {...register("content", {required: true})} />
                その他
              </label>
              {errors.content && <p className={`red ${styles.error}`}>必須項目を選択してください</p>}
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt className={styles.inputDt}>
              <label htmlFor="name">
                氏名
                <span className="red">＊</span>
              </label>
            </dt>
            <dd>
              <input type="text" id="name" {...register("name", {required: true})} placeholder="山田 太郎" />
              {errors.name && <p className={`red ${styles.error}`}>必須項目を入力してください。</p>}
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt className={styles.inputDt}>
              <label htmlFor="furigana">氏名カナ</label>
            </dt>
            <dd>
              <input type="text" id="furigana" {...register("furigana", {pattern: furiganaRegExp})} placeholder="ヤマダ タロウ" />
              {errors.furigana && <p className={`red ${styles.error}`}>カタカナのみ入力してください。</p>}
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt className={styles.inputDt}>
              <label htmlFor="mail">
                メールアドレス
                <span className="red">＊</span>
              </label>
            </dt>
            <dd>
              <input
                type="email"
                id="mail"
                {...register("mail", {
                  required: {
                    value: true,
                    message: "必須項目を入力してください。",
                  },
                  pattern: {
                    value: mailRegExp,
                    message: "メールアドレスの形式で入力してください",
                  }
                })}
                placeholder="test@sample.com"
              />
              {errors.mail?.types.required && <p className={`red ${styles.error}`}>{errors.mail.types.required}</p>}
              {errors.mail?.types.pattern && <p className={`red ${styles.error}`}>{errors.mail.types.pattern}</p>}
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt className={styles.inputDt}>
              <label htmlFor="storeName">会社・店名</label>
            </dt>
            <dd>
              <input type="text" id="storeName" {...register("storeName")} placeholder="株式会社サンプル" />
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt className={styles.inputDt}>
              <label htmlFor="tel">
                電話番号
                <span className="red">＊</span>
              </label>
            </dt>
            <dd>
              <input
                type="tel"
                id="tel"
                {...register("tel", {
                  required: {
                    value: true,
                    message: "必須項目を入力してください。",
                  },
                  pattern: {
                    value: telRegExp,
                    message: "電話番号の形式で入力してください",
                  }
                })}
                placeholder="0123456789"
              />
              {errors.tel?.types.required && <p className={`red ${styles.error}`}>{errors.tel.types.required}</p>}
              {errors.tel?.types.pattern && <p className={`red ${styles.error}`}>{errors.tel.types.pattern}</p>}
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt className={styles.inputDt}>
              <label htmlFor="message">メッセージ本文</label>
            </dt>
            <dd>
              <textarea id="message" {...register("message")} placeholder="できる限り具体的にご記入ください。"></textarea>
            </dd>
          </dl>
          <div className={styles.descBox}>
            <p>※携帯電話メールアドレスをご利用の場合は、必ず送信前に『携帯メールフィルタの解除』を行ってください。</p>
            <p>※お問い合わせ前に「<Link href="/privacy"><a>個人情報保護方針</a></Link>」についてご確認の上、送信をお願いいたします。</p>
          </div>
          <button type="submit" className="btn3 noto">内容を確認する</button>
        </article>
        {!isValid && <p className={`red ${styles.error} ${styles.lastError}`}>まだ全ての必須項目の入力が完了していません。</p>}
      </form>
    </>
  );
}

export default InputAd;