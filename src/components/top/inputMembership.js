import styles from '@/styles/top/components/form.module.scss'
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { Btn1 } from '@/components/top/';

const InputMembership = () => {
  const router = useRouter()

  const { register, handleSubmit, formState: { errors, isValid } } = useFormContext()

  const onSubmit = useCallback((data) => {
    // console.log(data)

    router.push("/membership_register/?confirm=1")
  }, [router])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <article className={styles.formContent}>
          <p className={styles.catch}>必要事項をご入力の上、お申込みください。</p>
          <dl>
            <dt>
              <label htmlFor="c_name">会社名</label>
              <span className={styles.require}>必須</span>
            </dt>
            <dd>
              <input
                id="c_name"
                type="text"
                {...register("c_name", {required: true})}
              />
              {errors.c_name && <p className={`red ${styles.error}`}>この項目は必須です</p>}
            </dd>
          </dl>
          <dl>
            <dt>
              <label htmlFor="position">役職名</label>
              <span className={styles.require}>必須</span>
            </dt>
            <dd>
              <input
                id="position"
                type="text"
                {...register("position", {required: true})}
              />
              {errors.position && <p className={`red ${styles.error}`}>この項目は必須です</p>}
            </dd>
          </dl>
          <dl>
            <dt>
              <label htmlFor="name">氏名</label>
              <span className={styles.require}>必須</span>
            </dt>
            <dd className={styles.nameArea}>
              <input
                id="name"
                type="text"
                {...register("name1", {required: true})}
                placeholder="山田"
              />
              <input
                type="text"
                {...register("name2", {required: true})}
                placeholder="太郎"
              />
              {errors.name1 && <p className={`red ${styles.error}`}>この項目は必須です</p>}
              {errors.name2 && <p className={`red ${styles.error}`}>この項目は必須です</p>}
            </dd>
          </dl>
          <dl>
            <dt>
              <label htmlFor="zipcode">郵便番号</label>
              <span className={styles.require}>必須</span>
            </dt>
            <dd>
              <input
                id="zipcode"
                type="text"
                {...register("zipcode", {required: true})}
                placeholder="0000000"
              />
              {errors.zipcode && <p className={`red ${styles.error}`}>この項目は必須です</p>}
            </dd>
          </dl>
          <dl>
            <dt>
              <label htmlFor="address">所在地</label>
              <span className={styles.require}>必須</span>
            </dt>
            <dd>
              <input
                id="address"
                type="text"
                {...register("address", {required: true})}
              />
              {errors.address && <p className={`red ${styles.error}`}>この項目は必須です</p>}
            </dd>
          </dl>
          <dl>
            <dt>
              <label htmlFor="tel">電話番号</label>
              <span className={styles.require}>必須</span>
            </dt>
            <dd>
              <input
                id="tel"
                type="text"
                {...register("tel", {required: true})}
                placeholder="00000000000"
              />
              {errors.tel && <p className={`red ${styles.error}`}>この項目は必須です</p>}
            </dd>
          </dl>
          <dl>
            <dt>
              <label htmlFor="email">メールアドレス</label>
              <span className={styles.require}>必須</span>
            </dt>
            <dd>
              <input
                id="email"
                type="email"
                {...register("email", {required: true})}
                placeholder="yourmail@example.jp"
              />
              {errors.email && <p className={`red ${styles.error}`}>この項目は必須です</p>}
            </dd>
          </dl>
          <dl>
            <dt>
              コース選択
              <span className={styles.require}>必須</span>
            </dt>
            <dd className={styles.courseArea}>
              <div className={styles.courseBtn}>
                <input id="course1" type="radio" value="企業・団体" {...register("course", {required: true})} />
                <label htmlFor="course1">
                  <p className={styles.planName}>企業・団体</p>
                  <div className={styles.planPrice}>
                    <span className={`${styles.medium} en`}>￥</span>
                    <span className={`${styles.big} en`}>11,000</span>
                    <span className={styles.sm}>/月</span>
                  </div>
                </label>
              </div>
              <div className={styles.courseBtn}>
                <input id="course2" type="radio" value="フリーランス・専門家・個人事業主・一般ユーザー(プレミアム)" {...register("course", {required: true})} />
                <label htmlFor="course2">
                  <p className={styles.planName}>
                    フリーランス 専門家
                    <br/>個人事業主
                    <br/>一般ユーザー(プレミアム)
                  </p>
                  <div className={styles.planPrice}>
                    <span className={`${styles.medium} en`}>￥</span>
                    <span className={`${styles.big} en`}>5,500</span>
                    <span className={styles.sm}>/月</span>
                  </div>
                </label>
              </div>
              <div className={styles.courseBtn}>
                <input id="course3" type="radio" value="メディア・地方自治体" {...register("course", {required: true})} />
                <label htmlFor="course3">
                  <p className={styles.planName}>
                    メディア
                    <br/>地方自治体
                  </p>
                  <div className={styles.planPrice}>
                    <span className={`${styles.medium} en`}>￥</span>
                    <span className={`${styles.big} en`}>0</span>
                    <span className={styles.sm}>/月</span>
                  </div>
                </label>
              </div>
              {errors.coupon && <p className={`red ${styles.error}`}>この項目は必須です</p>}
            </dd>
          </dl>
          <div className={styles.privacyCheck}>
            <p className={styles.require}>必須</p>
            <p className={styles.txt}>
              必ず「
              <Link href="/privacy">
                <a>個人情報の取扱いについて</a>
              </Link>
              」をご確認いただき、
              <br/>ご同意のうえ、送信してください。
            </p>
            <label>
              <input type="checkbox" {...register("privacy", {required: true})} />
              同意する
            </label>
            {errors.privacy && <p className={`red ${styles.error}`}>この項目は必須です</p>}
          </div>
          <Btn1 txt="確認する" submit />
        </article>
      </form>
    </>
  );
}

export default InputMembership;