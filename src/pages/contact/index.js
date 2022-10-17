import styles from '@/styles/components/form.module.scss'
import { ConfirmContact, InputContact, PageTitle } from "@/components";
import { FormProvider, useForm } from 'react-hook-form';
import Container from "@/components/Layouts/container";
import PageLayout from "@/components/Layouts/PageLayout";
import { useRouter } from 'next/router';

const Contact = () => {
  const router = useRouter()
  const isConfirm = router.query.confirm

  const methods = useForm({
    defaultValues: {
      user_id: "1",
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
  return <PageLayout>{page}</PageLayout>
}