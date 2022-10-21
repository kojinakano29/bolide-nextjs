import styles from '@/styles/liondor/components/form.module.scss'
import { ConfirmAd, InputAd, PageTitle } from "@/components/liondor";
import { FormProvider, useForm } from 'react-hook-form';
import Container from "@/components/Layouts/container";
import PageLayout from "@/components/Layouts/PageLayout";
import { useRouter } from 'next/router';

const Ad = () => {
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
        <PageTitle title="広告掲載について" />
        <Container small900>
          <div className={styles.form}>
            <FormProvider {...methods}>
              {!isConfirm ? <InputAd /> : <ConfirmAd />}
            </FormProvider>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Ad;

Ad.getLayout = function getLayout(page) {
  return <PageLayout>{page}</PageLayout>
}