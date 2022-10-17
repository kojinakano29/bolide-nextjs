import styles from '@/styles/components/form.module.scss'
import { ConfirmPresent, InputPresent, PageTitle, SnsFollow } from "@/components";
import { FormProvider, useForm } from 'react-hook-form';
import Container from "@/components/Layouts/container";
import PageLayout from "@/components/Layouts/PageLayout";
import { useRouter } from 'next/router';

// SSR
export const getServerSideProps = async ({params}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/liondor/present/${params.id}`)
  const data = await res.json()

  return {
    props: {
      posts: data
    }
  }
}

const PresentForm = (posts) => {
  const present = posts.posts.presents
  const router = useRouter()
  const isConfirm = router.query.confirm

  const methods = useForm({
    defaultValues: {
      user_id: "1",
      facebook: "",
      insta: "",
      twitter: "",
      brand: [],
      cosmetic: [],
    },
    mode: "onChange",
    criteriaMode: "all",
  })


  return (
    <>
      <section className="cont1">
        <PageTitle title="PRESENT" ivy />
          <Container small900>
            <h3 className={styles.presentTtl}>{present?.title}</h3>
            {
              !isConfirm ?
                <div className={styles.termsBox}>
                  <p className={styles.termsTxt}>応募条件</p>
                  <p className={styles.txt}>&#9312;Bolide's JAPAN IDメンバー登録が必要です。</p>
                  <a className={styles.addon} href="" target="_blank">まだ登録がお済みでない方はこちら</a>
                  <p className={styles.txt}>&#9313;リオンドール各種SNSアカウントのいずれかをフォローしていること。</p>
                  <SnsFollow gray />
                </div>
              : null
            }
          </Container>
      </section>

      <section className={styles.cont2}>
        <Container small900>
          <div className={styles.form}>
            <FormProvider {...methods}>
              {!isConfirm ? <InputPresent present={present} /> : <ConfirmPresent present={present} />}
            </FormProvider>
          </div>
        </Container>
      </section>
    </>
  );
}

export default PresentForm;

PresentForm.getLayout = function getLayout(page) {
  return <PageLayout>{page}</PageLayout>
}