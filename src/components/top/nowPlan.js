import styles from '@/styles/top/components/nowPlan.module.scss'
import { useEffect, useState } from 'react';

const NowPlan = ({planInfo, user, plans}) => {
  // console.log(planInfo)

  const [planName, setPlanName] = useState("")
  const [planPrice, setPlanPrice] = useState("")

  useEffect(() => {
    if (planInfo.stripe_status === "active") {
      if (planInfo.stripe_price === plans.plan_corporate) {
        if (user?.coupon === null) {
          setPlanName("企業・団体")
          setPlanPrice("11,000")
        } else if (parseInt(user?.coupon) === parseInt(1)) {
          setPlanName(`フリーランス　専門家\n個人事業主\n一般ユーザー(プレミアム)`)
          setPlanPrice("5,500")
        } else if (parseInt(user?.coupon) === parseInt(2)) {
          setPlanName("メディア・地方自治体")
          setPlanPrice("0")
        }
      } else if (planInfo.stripe_price === plans.plan_intrust) {
        if (user?.coupon === null) {
          setPlanName("企業・団体")
          setPlanPrice("55,000")
        } else if (parseInt(user?.coupon) === parseInt(1)) {
          setPlanName(`フリーランス　専門家\n個人事業主\n一般ユーザー(プレミアム)`)
          setPlanPrice("49,500")
        } else if (parseInt(user?.coupon) === parseInt(2)) {
          setPlanName("メディア：地方自治体")
          setPlanPrice("44,000")
        }
      }
    } else if (planInfo) {
      if (user?.account_type < 1) {
        setPlanName("一般ユーザー（フリー）")
      } else if (user?.account_type > 0) {
        setPlanName("解約済み")
      }

      setPlanPrice("0")
    }
  }, [planInfo, user])

  return (
    <div className={styles.planBox}>
      <p className={styles.planName}>{planName}</p>
      <p className={styles.planPrice}>
        <span className={`en ${styles.sm}`}>￥</span>
        <span className={`en ${styles.big}`}>{planPrice}</span>
        <span className={styles.jp}>/月</span>
      </p>
    </div>
  );
}

export default NowPlan;