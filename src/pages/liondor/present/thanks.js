import styles from '@/styles/liondor/components/form.module.scss'
import Container from "@/components/liondor/Layouts/container";
import PageLayoutLiondor from "@/components/Layouts/PageLayoutLiondor";
import { PageTitle } from '@/components/liondor';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const PresentThanks = () => {
  const router = useRouter()

  useEffect(() => {
    const comp = sessionStorage.getItem('comp')

    if (!comp) {
      router.push(`/liondor/present`)
    }

    sessionStorage.removeItem('comp')
  }, [])

  return (
    <section className="cont1">
      <PageTitle title="PRESENT" ivy />
      <Container small900>
        <div className={styles.thanksBox}>
          <p className={styles.txt}>ご応募いただきありがとうございました。</p>
          <Link href="/liondor/present">
            <a className="btn3 ivy">back to top</a>
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default PresentThanks;

PresentThanks.getLayout = function getLayout(page) {
  return <PageLayoutLiondor>{page}</PageLayoutLiondor>
}