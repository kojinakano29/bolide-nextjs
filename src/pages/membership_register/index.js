import styles from '@/styles/top/components/form.module.scss'
import PageLayoutTop from "@/components/Layouts/pageLayoutTop";
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import Container from '@/components/top/Layout/container';
import Link from 'next/link';
import { ConfirmMembership, InputMembership } from '@/components/top';
import { useAuth } from '@/hooks/auth';

const MembershipRegister = () => {
  const router = useRouter()
  const { user } = useAuth()
  const isConfirm = router.query.confirm

  const methods = useForm({
    defaultValues: {
      c_name: "",
      position: "",
      name1: "",
      name2: "",
      zipcode: "",
      address: "",
      tel: "",
      email: "",
      course: "",
    },
    mode: "onChange",
    criteriaMode: "all",
  })

  return (
    <>
      <section className="cont1">
        <Container small900>
          <h2 className="ttl2">会員登録申請フォーム</h2>
          <div className="breadcrumbBox">
            <Link href="/">
              <a>トップ</a>
            </Link>
            <div><img src="/top/breadcrumb.svg" alt="" /></div>
            <p>会員登録申請フォーム</p>
          </div>
        </Container>
      </section>

      <section className={styles.formArea}>
        <Container small900>
          <FormProvider {...methods}>
            {!isConfirm ? <InputMembership /> : <ConfirmMembership user={user} />}
          </FormProvider>
        </Container>
      </section>
    </>
  );
}

export default MembershipRegister;

MembershipRegister.getLayout = function getLayout(page) {
  return <PageLayoutTop>{page}</PageLayoutTop>
}