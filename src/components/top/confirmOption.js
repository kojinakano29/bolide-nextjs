import styles from '@/styles/top/components/option.module.scss'
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Btn1 } from '@/components/top';

const ConfirmOption = ({user, cancel}) => {
  const router = useRouter()
  const [disabled, setDisabled] = useState(false)
  const { handleSubmit, getValues, formState: { isValid } } = useFormContext()

  const values = getValues()

  useEffect(() => {
    if (!isValid) {
      router.push({
        pathname: `/mypage`
      })
    }
  }, [])

  const handleBack = useCallback(async () => {
    router.back()
  }, [router])

  const onSubmit = async (data) => {
    setDisabled(true)

    if (data.option === "1000") {
      router.push(`/payment/${user?.id}?plan=option1000&type=${cancel ? "plan_change" : "subscribe"}`)
    } else if (data.option === "500") {
      router.push(`/payment/${user?.id}?plan=option500&type=${cancel ? "plan_change" : "subscribe"}`)
    } else if (data.option === "100") {
      router.push(`/payment/${user?.id}?plan=option100&type=${cancel ? "plan_change" : "subscribe"}`)
    }

    setDisabled(false)
  }

  return (
    <div className={styles.optionContent}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className={styles.catch}>内容をご確認ください。</p>
        <dl className={styles.optionDl}>
          <dt>オプション</dt>
          {values.option === "1000" ?
            <dd>
              社会貢献活動募金オプション
              <br/>￥1000/月
            </dd>
          : null}
          {values.option === "500" ?
            <dd>
              社会貢献活動募金オプション
              <br/>￥500/月
            </dd>
          : null}
          {values.option === "100" ?
            <dd>
              社会貢献活動募金オプション
              <br/>￥100/月
            </dd>
          : null}
        </dl>
        <div className={styles.btnFlex}>
          <div className={styles.type2} onClick={handleBack}>
            <Btn1 txt="戻る" />
          </div>
          <div>
            <Btn1 txt="決済する" submit disabled={disabled} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default ConfirmOption;