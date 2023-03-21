import PageLayoutTop from '@/components/Layouts/pageLayoutTop';
import { ConfirmAd, InputAd } from '@/components/top';
import Container from '@/components/top/Layout/container';
import styles from '@/styles/top/components/form.module.scss'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';

const BjcAd = () => {
  const router = useRouter()
  const isConfirm = router.query.confirm

  const methods = useForm({
    defaultValues: {
      content: [],
      name1: "",
      name2: "",
      store_name: "",
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
          <h2 className="ttl2">広告掲載について</h2>
          <div className="breadcrumbBox">
            <Link href="/">
              <a>トップ</a>
            </Link>
            <div><img src="/top/breadcrumb.svg" alt=">" /></div>
            <p>広告掲載について</p>
          </div>
        </Container>
      </section>

      <section className={styles.formArea}>
        <Container small900>
          <FormProvider {...methods}>
            {!isConfirm ? <InputAd /> : <ConfirmAd />}
          </FormProvider>
        </Container>
      </section>
    </>
  );
}

export default BjcAd;

BjcAd.getLayout = function getLayout(page) {
  return <PageLayoutTop>{page}</PageLayoutTop>
}