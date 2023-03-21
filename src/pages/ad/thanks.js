import styles from '@/styles/top/components/form.module.scss'
import PageLayoutTop from "@/components/Layouts/pageLayoutTop";
import Container from "@/components/top/Layout/container";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Btn1 } from '@/components/top';

const BjcAdThanks = () => {
  const router = useRouter()

  useEffect(() => {
    const ad = sessionStorage.getItem('ad')

    if (!ad) {
      router.push({
        pathname: "/ad"
      })
    }

    sessionStorage.removeItem('ad')
  }, [])

  return (
    <section className="cont1">
      <Container small900>
        <h2 className="ttl2">広告掲載について</h2>
        <div className="breadcrumbBox">
          <Link href="/">
            <a>トップ</a>
          </Link>
          <div><img src="/top/breadcrumb.svg" alt=">" /></div>
          <p>広告掲載について</p>
        </div>
        <div className={styles.thanksBox}>
          <p className={styles.catch}>送信が完了しました。</p>
          <p className={styles.txt}>
            お問合わせいただき誠にありがとうございました。
            <br/>お問い合わせ内容を確認させていただき、後ほど担当者よりご回答をさせていただきます。
            <br/>恐れ入りますが、今しばらくお待ちいただけますよう、よろしくお願い申し上げます。
          </p>
          <Btn1 txt={"TOPへ戻る"} link="/" />
        </div>
      </Container>
    </section>
  );
}

export default BjcAdThanks;

BjcAdThanks.getLayout = function getLayout(page) {
  return <PageLayoutTop>{page}</PageLayoutTop>
}