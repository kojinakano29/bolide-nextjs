import styles from '@/styles/dellamall/components/form.module.scss'
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import Btn01 from './btn01';
import { zip } from '@/lib/dellamall/constants';

const InputOfficialRequest = () => {
  const router = useRouter()

  const furiganaRegExp = /^[ァ-ンヴー]*$/
  const mailRegExp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/
  const telRegExp = /^0\d{9,10}$/

  const { register, handleSubmit, formState: { errors, isValid } } = useFormContext()
  const [address, setAddress] = useState(false)

  const handleClickAddress = (e) => {
    if (e.target.value === "担当者連絡先を個別に設定する") {
      setAddress(true)
    } else {
      setAddress(false)
    }
  }

  const onSubmit = useCallback(async (data) => {
    // console.log(data)

    router.push('/dellamall/officialRequest/?confirm=1')
  }, [router])

  return (
    <>
      <div className={styles.desc}>
        <p className={styles.big}>下記フォームに必須事項をご入力の上、<br className="sp" />送信してください。</p>
        <p className={styles.sm}><span className={styles.require}>必須</span> の項目は入力必須となっております。</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <article className={styles.formContent}>
          <dl className={styles.dl}>
            <dt className={styles.dt2}>
              <span className={styles.require}>必須</span>
              申請内容
            </dt>
            <dd className={styles.checkArea}>
              <label>
                <input type="checkbox" value="新規で公式申請" {...register("content", {required: true})} />
                新規で公式申請
              </label>
              <label>
                <input type="checkbox" value="既存を公式に更新（無料キャプチャ設定済）" {...register("content", {required: true})} />
                既存を公式に更新（無料キャプチャ設定済）
              </label>
              {errors.content && <p className={`orange ${styles.error}`}>※こちらの項目は入力必須です</p>}
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
          <h3 className={styles.ttl}>会社情報</h3>
          <dl className={styles.dl}>
            <dt className={styles.dt2}>
              <span className={styles.require}>必須</span>
              事業形態
            </dt>
            <dd className={styles.checkArea}>
              <label>
                <input type="checkbox" value="法人" {...register("type", {required: true})} />
                法人
              </label>
              <label>
                <input type="checkbox" value="個人事業主" {...register("type", {required: true})} />
                個人事業主
              </label>
              {errors.type && <p className={`orange ${styles.error}`}>※こちらの項目は入力必須です</p>}
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt>
              <span className={styles.require}>必須</span>
              会社名
            </dt>
            <dd className={styles.long}>
              <input type="text" {...register("company", {required: true})} placeholder="株式会社サンプル" />
              {errors.company && <p className={`orange ${styles.error}`}>※こちらの項目は入力必須です</p>}
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt>
              <span className={styles.any}>任意</span>
              会社名フリガナ
            </dt>
            <dd className={styles.long}>
              <input type="text" {...register("furiganaCompany", {pattern: furiganaRegExp})} placeholder="カブシキガイシャサンプル" />
              {errors.furiganaCompany && <p className={`orange ${styles.error}`}>※カタカナのみ入力してください。</p>}
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
            <dt>
              <span className={styles.require}>必須</span>
              メールアドレス
            </dt>
            <dd>
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
              郵便番号
            </dt>
            <dd>
              <input type="text" {...register("zipcode", { required: true })} placeholder="1234567" />
              {errors.zipcode && <p className={`orange ${styles.error}`}>※こちらの項目は入力必須です</p>}
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt>
              <span className={styles.require}>必須</span>
              都道府県
            </dt>
            <dd className={styles.selectArea}>
              <select {...register("zip")}>
                {zip.map((zip, index) => (
                  <option value={zip} key={index}>{zip}</option>
                ))}
              </select>
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt>
              <span className={styles.require}>必須</span>
              番地・建物名・部屋番号
            </dt>
            <dd className={styles.long}>
              <input type="text" {...register("zip2", { required: true })} />
              {errors.zip2 && <p className={`orange ${styles.error}`}>※こちらの項目は入力必須です</p>}
            </dd>
          </dl>
          <h3 className={styles.ttl}>担当者情報</h3>
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
            <dt className={styles.dt2}>
              <span className={styles.require}>必須</span>
              連絡先
            </dt>
            <dd className={styles.checkArea}>
              <label>
                <input type="radio" value="会社情報と同じ" {...register("contact", {required: true})} onClick={handleClickAddress} />
                会社情報と同じ
              </label>
              <label>
                <input type="radio" value="担当者連絡先を個別に設定する" {...register("contact", {required: true})} onClick={handleClickAddress} />
                担当者連絡先を個別に設定する
              </label>
              {errors.contact && <p className={`orange ${styles.error}`}>※こちらの項目は入力必須です</p>}
            </dd>
          </dl>
          {address ?
            <div className={styles.otherAddress}>
              <dl className={styles.dl}>
                <dt>
                  <span className={styles.require}>必須</span>
                  メールアドレス
                </dt>
                <dd className={styles.long}>
                  <input
                    type="email"
                    {...register("mail2", {
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
                  {errors.mail2?.types.required && <p className={`orange ${styles.error}`}>{errors.mail2.types.required}</p>}
                  {errors.mail2?.types.pattern && <p className={`orange ${styles.error}`}>{errors.mail2.types.pattern}</p>}
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
                    {...register("tel2", {
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
                  {errors.tel2?.types.required && <p className={`orange ${styles.error}`}>{errors.tel2.types.required}</p>}
                  {errors.tel2?.types.pattern && <p className={`orange ${styles.error}`}>{errors.tel2.types.pattern}</p>}
                </dd>
              </dl>
            </div>
            : null
          }
          <dl className={styles.dl}>
            <dt className={styles.dt2}>
              <span className={styles.any}>任意</span>
              備考
            </dt>
            <dd>
              <textarea {...register("remarks")}></textarea>
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

export default InputOfficialRequest;