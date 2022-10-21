import styles from '@/styles/liondor/components/sitemap.module.scss'
import { PageTitle } from "@/components/liondor";
import Container from "@/components/Layouts/container";
import PageLayout from "@/components/Layouts/PageLayout";
import Link from 'next/link';
import { sitemap } from '@/lib/liondor/constants';

const Sitemap = () => {
  return (
    <section className="cont1">
      <PageTitle title="SITE MAP" ivy />
      <Container small>
        {sitemap.map((item, index) => (
          <div className={styles.block} key={index}>
            <h3 className="ivy">{item.cat}</h3>
            <div className={styles.flex}>
              {item.group.map((gr, index) => (
                <Link href={gr.link} key={index}>
                  <a>{gr.name}</a>
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div className={styles.block}>
          <h3 className="ivy">Pick Up Information</h3>
          <div className={styles.flex}>
            <Link href="">
              <a>Information</a>
            </Link>
            <Link href="">
              <a>Influencer</a>
            </Link>
            <Link href="/liondor/present">
              <a>Present</a>
            </Link>
            <Link href="">
              <a>Others</a>
            </Link>
          </div>
        </div>
        <div className={styles.flex2}>
          <Link href="/liondor/contact">
            <a className="ivy">CONTACT</a>
          </Link>
          <div className={styles.hr}></div>
          <Link href="/liondor/faq">
            <a className="ivy">FAQ</a>
          </Link>
          <div className={styles.hr}></div>
          <Link href="/liondor/sitemap">
            <a className="ivy">SITE MAP</a>
          </Link>
          <div className={styles.hr}></div>
          <Link href="">
            <a className="ivy">COMPANY</a>
          </Link>
          <div className={styles.hr}></div>
          <Link href="">
            <a className="ivy">ABOUT LIONDOR</a>
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default Sitemap;

Sitemap.getLayout = function getLayout(page) {
  return <PageLayout>{page}</PageLayout>
}