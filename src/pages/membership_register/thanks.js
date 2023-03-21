import styles from '@/styles/top/components/form.module.scss'
import PageLayoutTop from "@/components/Layouts/pageLayoutTop";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Container from '@/components/top/Layout/container';
import Link from 'next/link';
import { Btn1 } from '@/components/top';

const MembershipThanks = () => {
  const router = useRouter()

  useEffect(() => {
    const membership = sessionStorage.getItem('membership')

    if (!membership) {
      router.push({
        pathname: "/membership_register"
      })
    }

    sessionStorage.removeItem('membership')
  }, [])

  return (
    <section className="cont1">
      <Container small900>
        <h2 className="ttl2">会員登録申請フォーム</h2>
        <div className="breadcrumbBox">
          <Link href="/">
            <a>トップ</a>
          </Link>
          <div><img src="/top/breadcrumb.svg" alt=">" /></div>
          <p>会員登録申請フォーム</p>
        </div>
        <div className={styles.thanksBox}>
          <p className={styles.catch}>会員審査の受付が完了いたしました。</p>
          <p className={styles.txt2}>
            ※ご注意※
            <br/>まだ会員登録は完了しておりません。
          </p>
          <p className={styles.txt3}>
            このたびはBolide's Japanにお申込みいただき、誠にありがとうございます。
            <br/>お申込み内容を確認させていただき、後ほど担当者より審査結果をメールにてお送りさせていただきます。
            <br/>恐れ入りますが、今しばらくお待ちいただけますよう、よろしくお願い申し上げます。
          </p>
          <Btn1 txt={"TOPへ戻る"} link="/" />
        </div>
      </Container>
    </section>
  );
}

export default MembershipThanks;

MembershipThanks.getLayout = function getLayout(page) {
  return <PageLayoutTop>{page}</PageLayoutTop>
}