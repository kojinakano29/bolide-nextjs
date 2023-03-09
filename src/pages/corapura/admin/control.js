import styles from '@/styles/corapura/components/control.module.scss'
import PageLayoutCorapura from "@/components/Layouts/pageLayoutCorapura";
import Container from '@/components/corapura/Layout/container';
import axios from '@/lib/axios';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/auth';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Loader } from '@/components/corapura';

const AdminControl = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth({middleware: 'auth', type: 'corapura'})
  const [authCheck, setAuthCheck] = useState(false)
  const [popup, setPopup] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange",
  })

  const onLoadCheck = async () => {
    if (user?.account_type > 2) {
      setAuthCheck(true)
    } else {
      setAuthCheck(false)
    }
  }

  useEffect(() => {
    onLoadCheck()

    if (user && user?.account_type < 3) {
      router.push('/corapura')
    }
  }, [user])

  const handleClickPopup = useCallback(async () => {
    setPopup(prevState => !prevState)
  }, [setPopup])

  const onSubmitStripeId = async (data) => {
    // console.log(data)
    await csrf()

    await axios.post(`/api/coprapura/admin/salon/update/${data.c_salon_id}`, {
      stripe_api_id: data.stripe_api_id
    }).then((res) => {
      // console.log(res)
      alert(`ID${res.data.id}のオンラインサロンにStripeのプランIDを追加しました`)
      setPopup(false)
    }).catch(e => console.error(e))
  }

  return (
    <>
      <section className="cont1">
        <Container small>
          <h2 className="ttl1">管理者</h2>
          {authCheck ?
            <div className={styles.authFlex}>
              <button
                type="button"
                className={`${styles.btn} hoverEffect`}
                onClick={handleClickPopup}
              >オンラインサロンStripeID追加フォーム</button>
            </div>
          : <Loader />}
        </Container>
      </section>

      {popup ?
        <div className={styles.popupArea} onClick={handleClickPopup}>
          <Container small900>
            <div className={styles.popupBox} onClick={(e) => e.stopPropagation()}>
              <form onSubmit={handleSubmit(onSubmitStripeId)}>
                <h3>オンラインサロンStripeID</h3>
                <dl>
                  <dt>
                    <label htmlFor="c_salon_id">オンラインサロンID</label>
                  </dt>
                  <dd>
                    <input
                      type="text"
                      id="c_salon_id"
                      {...register("c_salon_id", {required: true})}
                      placeholder="オンラインサロンのIDを入力してください"
                    />
                    {errors.c_salon_id && <p className={styles.error}>必須項目を入力してください</p>}
                  </dd>
                </dl>
                <dl>
                  <dt>
                    <label htmlFor="stripe_api_id">StripeプランID</label>
                  </dt>
                  <dd>
                    <input
                      type="text"
                      id="stripe_api_id"
                      {...register("stripe_api_id", {required: true})}
                      placeholder="StripeのプランIDを入力してください"
                    />
                    {errors.stripe_api_id && <p className={styles.error}>必須項目を入力してください</p>}
                  </dd>
                </dl>
                <button className={styles.btn}>送信</button>
              </form>
            </div>
          </Container>
        </div>
      : null}
    </>
  );
}

export default AdminControl;

AdminControl.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}