import styles from '@/styles/liondor/components/faq.module.scss'
import { Accordion, PageTitle } from "@/components/liondor";
import Container from "@/components/Layouts/container";
import PageLayout from "@/components/Layouts/PageLayout";
import {Link as Scroll} from "react-scroll"

// SSG
export const getServerSideProps = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/liondor/faq`)
    const data = await res.json()

    return {
      props: {
        posts: data
      }
    }
}

const Faq = ({posts}) => {
  const companyFaq = posts.company_faq
  const userFaq = posts.user_faq

  return (
    <>
      <section className="cont1">
        <PageTitle title="FAQ" ivy />
        <Container small900>
          <nav className={styles.unkerNav}>
            <Scroll
              to="company"
              smooth={true}
              duration={200}
              offset={-100}
            >
              企業様向け
            </Scroll>
            <Scroll
              to="user"
              smooth={true}
              duration={200}
              offset={-100}
            >
              ユーザー向け
            </Scroll>
          </nav>
          <article className={styles.faqBox}>
            <h3 id="company" className={styles.faqTtl}>企業様向け</h3>
            <Accordion faq={companyFaq} />
          </article>
          <article className={styles.faqBox}>
            <h3 id="user" className={styles.faqTtl}>ユーザー向け</h3>
            <Accordion faq={userFaq} />
          </article>
        </Container>
      </section>
    </>
  );
}

export default Faq;

Faq.getLayout = function getLayout(page) {
  return <PageLayout>{page}</PageLayout>
}