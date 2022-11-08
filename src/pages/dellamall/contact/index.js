import { ConfirmContact, InputContact } from '@/components/dellamall';
import Container from '@/components/dellamall/Layouts/container';
import PageLayoutDellamall from '@/components/Layouts/PageLayoutDellamall';
import styles from '@/styles/dellamall/components/form.module.scss'
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';

const Contact = () => {
  const router = useRouter()
  const isConfirm = router.query.confirm

  const methods = useForm({
    defaultValues: {
      type: [],
      url: "",
      name: "",
      furigana: "",
      company: "",
      mail: "",
      tel: "",
      content: "",
    },
    mode: "onChange",
    criteriaMode: "all",
  })

  return (
    <>
      <section className="cont1">
        <Container small>
          <h2 className="ttl2">お問い合わせ</h2>
          <ul className={styles.currentCircle__list}>
            <li className={`${styles.currentCircle__item} ${styles.is_active}`}>
              <span className="en">01</span>
              入力
            </li>
            <li className={`${styles.currentCircle__item} ${isConfirm ? styles.is_active : null}`}>
              <span className="en">02</span>
              確認
            </li>
            <li className={styles.currentCircle__item}>
              <span className="en">03</span>
              完了
            </li>
          </ul>
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
  return <PageLayoutDellamall>{page}</PageLayoutDellamall>
}