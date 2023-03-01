import styles from '@/styles/top/components/option.module.scss'
import { Btn1 } from "@/components/top/";
import { useRouter } from 'next/router';
import { useFormContext } from 'react-hook-form';
import { useCallback } from 'react';

const InputOption = ({user}) => {
  const router = useRouter()

  const { register, handleSubmit, formState: { errors, isValid } } = useFormContext()

  const onSubmit = useCallback(async (data) => {
    // console.log(data)

    router.push(`/mypage/option/${user?.id}?confirm=1`)
  }, [router, user])

  return (
    <div className={styles.optionContent}>
      <h3>社会貢献活動に参加しませんか？</h3>
      <p className={styles.desc}>
        BJCはSDGsの前文にある「人間と地球、そして繁栄のための行動計画」を個人・企業が積極的に取り組む姿勢を支援します。
        <br/>「経済」と「社会」と「環境」のバランスを維持しつつ、世界の個人・企業等がよりよくつながり、
        <br/>変化することができるような取り組みをしていきます。
        <br/>
        <br/>BJCでは社会貢献の一環として募金オプションを設け、「人間」「平和」「繁栄」「地球環境」への
        <br/>貢献活動を皆様と共に支援していきます。
      </p>
      <div className={styles.linkBox}>
        <p className={styles.txt}>BJC募金活動報告レポートはこちら</p>
        <Btn1 txt="PDFをDLする" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>募金をする</h3>
        <div className={styles.courseArea}>
          <div className={styles.courseBtn}>
            <input id="course1" className={styles.changePlanInput} type="radio" value="1000" {...register("option", {required: true})} />
            <label htmlFor="course1">
              <div className={styles.planPrice}>
                <span className={`${styles.medium} en`}>￥</span>
                <span className={`${styles.big} en`}>1,000</span>
                <span className={styles.sm}>/月</span>
              </div>
            </label>
          </div>
          <div className={styles.courseBtn}>
            <input id="course2" className={styles.changePlanInput} type="radio" value="500" {...register("option", {required: true})} />
            <label htmlFor="course2">
              <div className={styles.planPrice}>
                <span className={`${styles.medium} en`}>￥</span>
                <span className={`${styles.big} en`}>500</span>
                <span className={styles.sm}>/月</span>
              </div>
            </label>
          </div>
          <div className={styles.courseBtn}>
            <input id="course3" className={styles.changePlanInput} type="radio" value="100" {...register("option", {required: true})} />
            <label htmlFor="course3">
              <div className={styles.planPrice}>
                <span className={`${styles.medium} en`}>￥</span>
                <span className={`${styles.big} en`}>100</span>
                <span className={styles.sm}>/月</span>
              </div>
            </label>
          </div>
          {errors.option && <p className={`red ${styles.error}`}>金額が選択されておりません</p>}
        </div>
        <div className={styles.btnFlex}>
          <div className={styles.type2}>
            <Btn1 txt="マイページへ戻る" link="/mypage" />
          </div>
          <div>
            <Btn1 txt="変更内容を確認する" submit />
          </div>
        </div>
      </form>
    </div>
  );
}

export default InputOption;