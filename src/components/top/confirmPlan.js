import styles from '@/styles/top/components/form.module.scss'
import axios from "@/lib/axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Btn1 } from '@/components/top';

const ConfirmPlan = ({planInfo, user, plans}) => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const [disabled, setDisabled] = useState(false)
  const { handleSubmit, getValues, formState: { isValid } } = useFormContext()

  const values = getValues()

  useEffect(() => {
    if (!isValid) {
      router.push({
        pathname: "/mypage"
      })
    }
  }, [])

  const handleBack = useCallback(async () => {
    router.back()
  }, [router])

  const onPlanChangeForm = useCallback(async (data) => {
    await csrf()

    await axios.post(`/api/bolides_japan/plan_change`, data)
    .then((res) => {
      // console.log(res)
      sessionStorage.setItem('planChange', true)
      router.push({
        pathname: "/mypage/plan/thanks"
      })
    }).catch(e => console.error(e))

    setDisabled(false)
  }, [user, router, setDisabled])

  const onSubmit = useCallback(async (data) => {
    // console.log(data)
    setDisabled(true)

    onPlanChangeForm({
      user_id: user?.id,
      name: user?.name,
      email: user?.email,
      course: data.course,
    })
  }, [user, onPlanChangeForm, setDisabled])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <article className={`${styles.formContent} ${styles.planChangeForm}`}>
        <p className={styles.catch}>変更内容をご確認ください。</p>
        <dl>
          <dt>変更前プラン</dt>
          <dd>
            {planInfo?.stripe_price === plans.plan_corporate ?
              <>
                {user?.coupon === null ? "企業・団体\n￥11,000/月" : null}
                {parseInt(user?.coupon) === parseInt(1) ? "フリーランス 専門家\n個人事業主\n一般ユーザー(プレミアム)\n￥5,500/月" : null}
                {parseInt(user?.coupon) === parseInt(2) ? "メディア・地方自治体\n￥0/月" : null}
              </>
            : null}
            {planInfo?.stripe_price === plans.plan_intrust ?
              <>
                {user?.coupon === null ? "★BJおまかせプラン（※会費込み）\n企業・団体\n￥55,000/月" : null}
                {parseInt(user?.coupon) === parseInt(1) ? "★BJおまかせプラン（※会費込み）\nフリーランス 専門家\n個人事業主\n一般ユーザー(プレミアム)\n￥49,500/月" : null}
                {parseInt(user?.coupon) === parseInt(2) ? "★BJおまかせプラン（※会費込み）\nメディア・地方自治体\n￥44,000/月" : null}
              </>
            : null}
          </dd>
        </dl>
        <dl>
          <dt>変更後プラン</dt>
            {values.course === "企業・団体" ?
              <dd>
                企業・団体
                <br/>￥11,000/月
              </dd>
            : null}
            {values.course === "フリーランス・専門家・個人事業主・一般ユーザー(プレミアム)" ?
              <dd>
                フリーランス　専門家　個人事業主　一般ユーザー（プレミアム）
                <br/>￥5,500/月
              </dd>
            : null}
            {values.course === "メディア・地方自治体" ?
              <dd>
                メディア　地方自治体
                <br/>￥0/月
              </dd>
            : null}
            {values.course === "★BJおまかせプラン：企業・団体" ?
              <dd>
                ★BJおまかせプラン（※会費込み）
                <br/>企業・団体
                <br/>￥55,000/月
              </dd>
            : null}
            {values.course === "★BJおまかせプラン：フリーランス・専門家・個人事業主・一般ユーザー(プレミアム)" ?
              <dd>
                ★BJおまかせプラン（※会費込み）
                <br/>フリーランス　専門家　個人事業主　一般ユーザー（プレミアム）
                <br/>￥49,500/月
              </dd>
            : null}
            {values.course === "★BJおまかせプラン：メディア・地方自治体" ?
              <dd>
                ★BJおまかせプラン（※会費込み）
                <br/>メディア　地方自治体
                <br/>￥44,000/月
              </dd>
            : null}
        </dl>
        <div className={styles.btnFlex}>
          <div className={styles.type2} onClick={handleBack}>
            <Btn1 txt="戻る" />
          </div>
          <div>
            <Btn1 txt="送信する" submit disabled={disabled} />
          </div>
        </div>
      </article>
    </form>
  );
}

export default ConfirmPlan;