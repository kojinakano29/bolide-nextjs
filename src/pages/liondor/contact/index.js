import styles from '@/styles/liondor/components/form.module.scss'
import { ConfirmContact, InputContact, PageTitle } from "@/components/liondor";
import { FormProvider, useForm } from 'react-hook-form';
import Container from "@/components/liondor/Layouts/container";
import PageLayoutLiondor from "@/components/Layouts/PageLayoutLiondor";
import { useRouter } from 'next/router';

const Contact = () => {
  const router = useRouter()
  const isConfirm = router.query.confirm

  const methods = useForm({
    defaultValues: {
      content: [],
      name: "",
      furigana: "",
      mail: "",
      storeName: "",
      tel: "",
      message: "",
    },
    mode: "onChange",
    criteriaMode: "all",
  })


  return (
    <>
      <section className="cont1">
        <PageTitle title="CONTACT" ivy />
        <Container small900>
          <div className={styles.form}>
            <FormProvider {...methods}>
              {!isConfirm ? <InputContact /> : <ConfirmContact />}
            </FormProvider>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Contact;

Contact.getLayout = function getLayout(page) {
  return <PageLayoutLiondor>{page}</PageLayoutLiondor>
}