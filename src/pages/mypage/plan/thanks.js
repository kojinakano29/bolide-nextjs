import styles from '@/styles/top/components/form.module.scss'
import PageLayoutTop from "@/components/Layouts/pageLayoutTop";
import Container from "@/components/top/Layout/container";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Btn1 } from '@/components/top';

const PlanChangeThanks = () => {
  const router = useRouter()

  useEffect(() => {
    const planChange = sessionStorage.getItem('planChange')

    if (!planChange) {
      router.push({
        pathname: "/mypage/plan"
      })
    }

    sessionStorage.removeItem('planChange')
  }, [])

  return (
    <section className="cont1">
      <Container small900>
        <h2 className="ttl2">プラン変更</h2>
        <div className="breadcrumbBox">
          <a href="/">トップ</a>
          <div><img src="/top/breadcrumb.svg" alt="" /></div>
          <a href="/mypage">マイページ</a>
          <div><img src="/top/breadcrumb.svg" alt="" /></div>
          <p>プラン変更</p>
        </div>
        <div className={styles.thanksBox}>
          <p className={styles.catch}>プラン変更申請の送信完了いたしました。</p>
          <p className={styles.txt}>
            プラン変更のお手続きいただきありがとうございました。
            <br/>お問い合わせ内容を確認させていただき、後ほど担当者よりご回答をさせていただきます。
            <br/>恐れ入りますが、今しばらくお待ちいただけますよう、よろしくお願い申し上げます。
          </p>
          <Btn1 txt={"マイページへ戻る"} link="/mypage" />
        </div>
      </Container>
    </section>
  );
}

export default PlanChangeThanks;

PlanChangeThanks.getLayout = function getLayout(page) {
  return <PageLayoutTop>{page}</PageLayoutTop>
}