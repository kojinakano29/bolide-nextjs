import { ConfirmOfficialRequest, InputOfficialRequest } from '@/components/dellamall';
import Container from '@/components/dellamall/Layouts/container';
import PageLayoutDellamall from '@/components/Layouts/PageLayoutDellamall';
import { useAuth } from '@/hooks/auth';
import styles from '@/styles/dellamall/components/form.module.scss'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const OfficialRequest = () => {
  const router = useRouter()
  const { user } = useAuth({middleware: 'auth', type: 'dellamall'})
  const isConfirm = router.query.confirm

  useEffect(() => {
    if (user && user?.account_type < 1) {
      router.push('/dellamall')
    }
  }, [user])

  const methods = useForm({
    defaultValues: {
      content: [],
      url: "",
      type: [],
      company: "",
      furiganaCompany: "",
      tel: "",
      mail: "",
      zipcode: "",
      zip2: "",
      name: "",
      furigana: "",
      mail2: "",
      tel2: "",
      remarks: "",
    },
    mode: "onChange",
    criteriaMode: "all",
  })

  return (
    <>
      <section className="cont1">
        <Container small>
          <h2 className="ttl2">公式ショップ申請フォーム</h2>
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
              {!isConfirm ? <InputOfficialRequest /> : <ConfirmOfficialRequest />}
            </FormProvider>
          </div>
        </Container>
      </section>
    </>
  );
}

export default OfficialRequest;

OfficialRequest.getLayout = function getLayout(page) {
  return <PageLayoutDellamall>{page}</PageLayoutDellamall>
}