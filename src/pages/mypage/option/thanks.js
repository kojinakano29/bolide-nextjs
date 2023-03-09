import styles from '@/styles/top/components/form.module.scss'
import PageLayoutTop from "@/components/Layouts/pageLayoutTop";
import Container from "@/components/top/Layout/container";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Btn1 } from '@/components/top';

const OptionChangeThanks = () => {
  const router = useRouter()

  useEffect(() => {
    const optionChange = sessionStorage.getItem('optionChange')

    if (!optionChange) {
      router.push({
        pathname: "/mypage/option"
      })
    }

    sessionStorage.removeItem('optionChange')
  }, [])

  return (
    <section className="cont1">
      <Container small900>
        <h2 className="ttl2">オプション</h2>
        <div className="breadcrumbBox">
          <a href="/">トップ</a>
          <div><img src="/top/breadcrumb.svg" alt="" /></div>
          <a href="/mypage">マイページ</a>
          <div><img src="/top/breadcrumb.svg" alt="" /></div>
          <p>オプション</p>
        </div>
        <div className={styles.thanksBox}>
          <p className={styles.catch}>お申込みが完了いたしました。</p>
          <p className={styles.txt}>
            オプション追加のお手続きいただきありがとうございました。
            <br/>無事申込みが完了しました。BJCが責任をもって支援団体への寄付をさせていただきます。
            <br/>引き続きBolide's Japanをどうぞよろしくお願い申し上げます。
          </p>
          <Btn1 txt={"マイページへ戻る"} link="/mypage" />
        </div>
      </Container>
    </section>
  );
}

export default OptionChangeThanks;

OptionChangeThanks.getLayout = function getLayout(page) {
  return <PageLayoutTop>{page}</PageLayoutTop>
}