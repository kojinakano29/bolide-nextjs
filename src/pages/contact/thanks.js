import PageLayoutTop from '@/components/Layouts/pageLayoutTop';
import { Btn1 } from '@/components/top';
import Container from '@/components/top/Layout/container';
import styles from '@/styles/top/components/form.module.scss'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const BjcThanks = () => {
  const router = useRouter()

  useEffect(() => {
    const contact = sessionStorage.getItem('contact')

    if (!contact) {
      router.push({
        pathname: "/contact"
      })
    }
  }, [])

  return (
    <section className="cont1">
      <Container small900>
        <h2 className="ttl2">お問い合わせ</h2>
        <div className="breadcrumbBox">
          <Link href="/">
            <a>トップ</a>
          </Link>
          <div><img src="/top/breadcrumb.svg" alt="" /></div>
          <p>お問い合わせ</p>
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

export default BjcThanks;

BjcThanks.getLayout = function getLayout(page) {
  return <PageLayoutTop>{page}</PageLayoutTop>
}