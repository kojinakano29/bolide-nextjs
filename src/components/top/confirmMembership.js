import styles from '@/styles/top/components/form.module.scss'
import { useAuth } from "@/hooks/auth";
import axios from "@/lib/axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Btn1 } from '@/components/top/';

const ConfirmMembership = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth()

  const [disabled, setDisabled] = useState(false)
  const { handleSubmit, getValues, formState: { isValid } } = useFormContext()

  const values = getValues()

  useEffect(() => {
    if (!isValid) {
      router.push({
        pathname: "/membership_register"
      })
    }
  }, [])

  const handleBack = useCallback(async () => {
    router.back()
  }, [router])

  const onMembershipForm = useCallback(async (data) => {
    await csrf()

    await axios.post(`/api`, data)
    .then((res) => {
      // console.log(res)
      sessionStorage.setItem('membership', true)
      router.push({
        pathname: "/membership_register/thanks"
      })
    }).catch(e => console.error(e))

    setDisabled(false)
  }, [router, setDisabled])

  const onSubmit = useCallback(async (data) => {
    // console.log(data)
    setDisabled(true)

    onMembershipForm({
      user_id: user?.id,
      c_name: values.c_name,
      position: values.position,
      name: `${values.name1}${values.name2}`,
      zipcode: values.zipcode,
      address: values.address,
      tel: values.tel,
      email: values.email,
    })
  }, [onMembershipForm, setDisabled, user])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <article className={styles.formContent}>
          <p className={styles.catch}>入力内容をご確認ください。</p>
          <dl>
            <dt>
              会社名
              <span className={styles.require}>必須</span>
            </dt>
            <dd>{values.c_name}</dd>
          </dl>
          <dl>
            <dt>
              役職名
              <span className={styles.require}>必須</span>
            </dt>
            <dd>{values.position}</dd>
          </dl>
          <dl>
            <dt>
              氏名
              <span className={styles.require}>必須</span>
            </dt>
            <dd>{`${values.name1}${values.name2}`}</dd>
          </dl>
          <dl>
            <dt>
              郵便番号
              <span className={styles.require}>必須</span>
            </dt>
            <dd>{values.zipcode}</dd>
          </dl>
          <dl>
            <dt>
              所在地
              <span className={styles.require}>必須</span>
            </dt>
            <dd>{values.address}</dd>
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
              メールアドレス
              <span className={styles.require}>必須</span>
            </dt>
            <dd>{values.email}</dd>
          </dl>
          <dl>
            <dt>
              コース選択
              <span className={styles.require}>必須</span>
            </dt>
              {parseInt(values.course) === parseInt(0) ?
                <dd>
                  企業・団体
                  <br/>￥11,000/月
                </dd>
              : null}
              {parseInt(values.course) === parseInt(1) ?
                <dd>
                  フリーランス　専門家　個人事業主　一般ユーザー（プレミアム）
                  <br/>￥5,500/月
                </dd>
              : null}
              {parseInt(values.course) === parseInt(2) ?
                <dd>
                  メディア　地方自治体
                  <br/>￥0/月
                </dd>
              : null}
          </dl>
          <div className={styles.btnFlex}>
            <div className={styles.type2} onClick={handleBack}>
              <Btn1 txt="戻る" />
            </div>
            <Btn1 txt="確認する" submit disabled={disabled} />
          </div>
        </article>
      </form>
    </>
  );
}

export default ConfirmMembership;