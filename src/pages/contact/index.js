import styles from '@/styles/top/components/form.module.scss'
import PageLayoutTop from "@/components/Layouts/pageLayoutTop";
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import Container from '@/components/top/Layout/container';
import { ConfirmContact, InputContact } from '@/components/top';

const BjcContact = () => {
  const router = useRouter()
  const isConfirm = router.query.confirm

  const methods = useForm({
    defaultValues: {
      content: [],
      name1: "",
      name2: "",
      furigana1: "",
      furigana2: "",
      email: "",
      tel: "",
      message: "",
    },
    mode: "onChange",
    criteriaMode: "all",
  })

  return (
    <>
      <section className="cont1">
        <Container small900>
          <h2 className="ttl2">お問い合わせ</h2>
          <div className="breadcrumbBox">
            <a href="/">トップ</a>
            <div><img src="/top/breadcrumb.svg" alt=">" /></div>
            <p>お問い合わせ</p>
          </div>
        </Container>
      </section>

      <section className={styles.formArea}>
        <Container small900>
          <FormProvider {...methods}>
            {!isConfirm ? <InputContact /> : <ConfirmContact />}
          </FormProvider>
        </Container>
      </section>
    </>
  );
}

export default BjcContact;

BjcContact.getLayout = function getLayout(page) {
  return <PageLayoutTop>{page}</PageLayoutTop>
}