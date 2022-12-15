import styles from '@/styles/liondor/components/form.module.scss'
import Container from "@/components/liondor/Layouts/container";
import PageLayoutLiondor from "@/components/Layouts/PageLayoutLiondor";
import { PageTitle } from '@/components/liondor';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AdThanks = () => {
  const router = useRouter()

  useEffect(() => {
    const ad = sessionStorage.getItem('ad')

    if (!ad) {
      router.push(`/liondor/ad`)
    }

    sessionStorage.removeItem('ad')
  }, [])

  return (
    <section className="cont1">
      <PageTitle title="広告掲載について" />
      <Container small900>
        <div className={styles.thanksBox}>
          <p className={styles.txt}>送信が完了しました。</p>
          <p className={styles.txt2}>
            お問合わせいただき誠にありがとうございました。
            <br/>お問い合わせ内容を確認させていただき、後ほど担当者よりご回答をさせていただきます。
            <br/>恐れ入りますが、今しばらくお待ちいただけますよう、よろしくお願い申し上げます。
          </p>
          <Link href="/liondor/">
            <a className="btn3 ivy">back to top</a>
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default AdThanks;

AdThanks.getLayout = function getLayout(page) {
  return <PageLayoutLiondor>{page}</PageLayoutLiondor>
}