import styles from '@/styles/liondor/components/form.module.scss'
import { useRouter } from "next/router"
import { useCallback, useState } from "react"
import { useFormContext } from "react-hook-form"
import { ModalBrand, ModalCosmeticBrand } from '@/components/liondor'
import { hobby } from '@/lib/liondor/constants'
import Link from 'next/link'

const InputPresent = ({present}) => {
  const router = useRouter()

  const { register, handleSubmit, getValues, formState: { errors, isValid, dirtyFields } } = useFormContext()

  const defaultBrandValue = getValues("brand")
  const defaultCosmeticValue = getValues("cosmetic")

  const [brands, setBrands] = useState(defaultBrandValue)
  const [cosmetics, setCosmetics] = useState(defaultCosmeticValue)
  const [popup, setPopup] = useState(false)

  const [modalBrand, setModalBrand] = useState(false)
  const toggleModalBrand = useCallback(() => {
    setModalBrand(!modalBrand)
  }, [setModalBrand, modalBrand])

  const [modalCosmetic, setModalCosmetic] = useState(false)
  const toggleModalCosmetic = useCallback(() => {
    setModalCosmetic(!modalCosmetic)
  }, [setModalCosmetic, modalCosmetic])

  const onSubmit = useCallback(async (data) => {
    // console.log(data)

    router.push(`/liondor/present/${present.id}/?confirm=1`)
  }, [router])

  const handleClickPopup = useCallback(async () => {
    setPopup(prevState => !prevState)
  }, [setPopup])

  return (
    <>
      <p className={styles.desc}>
        <span className="red">＊</span>
        は必須項目です。必ずご入力ください。
        <br />応募の際の注意事項は
        <button type="button" onClick={handleClickPopup}>こちら</button>
      </p>
      {popup ?
        <div className={styles.popupArea} onClick={handleClickPopup}>
          <div className={styles.popupBox} onClick={(e) => e.stopPropagation()}>
            ※応募にあたって、LIONDORのSNSを最低1つフォローすることが必須です
            <br/>※当選のご連絡はご記載いただいたSNSより通知させていただきます。
            <br/>
            <br/>上記2つの注意書きをSNSアカウントの項目「※Facebook・Instagram・Twitterのいずれかにご入力ください」の下に表示したいです。
            <br/>
            <br/>また「※応募にあたって、LIONDORのSNSを最低1つフォローすることが必須です」→「※応募にあたって、リオンドールの公式SNS（facebook・Instagram・Twitter）を最低1つフォローすることが必須です。」
            <br/>に変更していただきたいです。
          </div>
        </div>
      : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <article className={styles.formContent}>
          <dl className={styles.dl}>
            <dt className={styles.inputDt}>
              SNSアカウント
              <span className="red">＊</span>
            </dt>
            <dd>
              <dl className={styles.inDl}>
                <dt>
                  <label htmlFor="facebookId">Facebook ID</label>
                </dt>
                <dd>
                  <input type="text" id="facebookId" {...register("facebook")} />
                </dd>
              </dl>
              <dl className={styles.inDl}>
                <dt>
                  <label htmlFor="instaId">Instagram ID</label>
                </dt>
                <dd>
                  <input type="text" id="instaId" {...register("insta")} />
                </dd>
              </dl>
              <dl className={styles.inDl}>
                <dt>
                  <label htmlFor="twitterId">Twitter ID</label>
                </dt>
                <dd>
                  <input type="text" id="twitterId" {...register("twitter")} />
                </dd>
              </dl>
              <p className={styles.supplement}>※Facebook・Instagram・Twitterのいずれかにご入力ください</p>
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt>
              未婚/既婚
              <span className="red">＊</span>
            </dt>
            <dd className={styles.radioArea}>
              <label>
                <input type="radio" value="0" {...register("marriage", {required: true})} />
                未婚
              </label>
              <label>
                <input type="radio" value="1" {...register("marriage", {required: true})} />
                既婚
              </label>
              {errors.marriage && <p className={`red ${styles.error}`}>必須項目を選択してください</p>}
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt>
              子ども
              <span className="red">＊</span>
            </dt>
            <dd className={styles.radioArea}>
              <label>
                <input type="radio" value="0" {...register("child", {required: true})} />
                なし
              </label>
              <label>
                <input type="radio" value="1" {...register("child", {required: true})} />
                あり
              </label>
              {errors.child && <p className={`red ${styles.error}`}>必須項目を選択してください</p>}
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt className={styles.inputDt}>
              年収
              <span className="red">＊</span>
            </dt>
            <dd className={styles.selectArea}>
              <select {...register("income")}>
                <option value="～100万円">～100万円</option>
                <option value="100～200万円">100～200万円</option>
                <option value="200～300万円">200～300万円</option>
                <option value="300～400万円">300～400万円</option>
                <option value="400～500万円">400～500万円</option>
                <option value="500～600万円">500～600万円</option>
                <option value="600～700万円">600～700万円</option>
                <option value="700～800万円">700～800万円</option>
                <option value="800～900万円">800～900万円</option>
                <option value="900～1000万円">900～1000万円</option>
                <option value="1000万円～">1000万円～</option>
              </select>
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt>
              趣味
              <span className="red">＊</span>
            </dt>
            <dd className={styles.hobbyArea}>
              {hobby.map((cat, index) => (
                <dl className={styles.inDl} key={index}>
                  <dt>{cat.name}</dt>
                  <dd>
                    {cat.group.map((item, index) => (
                      <label key={index}>
                        <input type="checkbox" value={item.name} {...register("hobby", {required: true})} />
                        {item.name}
                      </label>
                    ))}
                  </dd>
                </dl>
              ))}
              {errors.hobby && <p className={`red ${styles.error}`}>必須項目を選択してください</p>}
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt className={styles.brandDt}>
              好きなブランド
              <span className="red">＊</span>
            </dt>
            <dd>
              <button type="button" className={styles.popupBtn} onClick={toggleModalBrand}>
                <span>ブランド一覧を見る</span>
                <span className={styles.arrow}>›</span>
              </button>
              <ModalBrand show={modalBrand} close={toggleModalBrand} brands={brands} setBrands={setBrands} />
              <div className={styles.selectBrand}>
                {brands.map((item, index) => (
                  <label htmlFor={item} key={index}>
                    <span className={styles.brandName}>{item}</span>
                    <span className={styles.brandDelete}>&#10005;</span>
                  </label>
                ))}
              </div>
              {errors.brand && <p className={`red ${styles.error}`}>必須項目を選択してください</p>}
            </dd>
          </dl>
          <dl className={styles.dl}>
            <dt className={styles.brandDt}>
              好きなコスメブランド
              <span className="red">＊</span>
            </dt>
            <dd>
              <button type="button" className={styles.popupBtn} onClick={toggleModalCosmetic}>
                <span>ブランド一覧を見る</span>
                <span className={styles.arrow}>›</span>
              </button>
              <ModalCosmeticBrand show={modalCosmetic} close={toggleModalCosmetic} cosmetics={cosmetics} setCosmetics={setCosmetics} />
              <div className={styles.selectBrand}>
                {cosmetics.map((item, index) => (
                  <label htmlFor={item} key={index}>
                    <span className={styles.brandName}>{item}</span>
                    <span className={styles.brandDelete}>&#10005;</span>
                  </label>
                ))}
              </div>
              {errors.cosmetic && <p className={`red ${styles.error}`}>必須項目を選択してください</p>}
            </dd>
          </dl>
          <div className={styles.descBox}>
            <p>※応募にあたって、LIONDORのSNSを最低1つフォローすることが必須です</p>
            <p>※携帯電話メールアドレスをご利用の場合は、必ず送信前に『携帯メールフィルタの解除』を行ってください。</p>
            <p>※お問い合わせ前に「<Link href="/privacy"><a>個人情報保護方針</a></Link>」についてご確認の上、送信をお願いいたします。</p>
            <p>※当選のご連絡はご記載いただいたsnsより通知させていただきます。</p>
          </div>
          <p className={styles.desc2}>
            プレゼント発送の際、企業様から直接送付の場合は
            <br/>お客様のご住所を企業様に提供いたします。
          </p>
          <div className={styles.consentArea}>
            <label>
              <input type="checkbox" {...register("consent", {required: true})} />
              同意する
            </label>
            {errors.consent && <p className={`red ${styles.error}`}>必須項目を選択してください</p>}
          </div>
          <button type="submit" className="btn3" disabled={!dirtyFields.facebook && !dirtyFields.insta && !dirtyFields.twitter}>内容を確認する</button>
        </article>
        {!isValid && <p className={`red ${styles.error} ${styles.lastError}`}>まだ全ての必須項目の入力が完了していません。</p>}
      </form>
    </>
  );
}

export default InputPresent;