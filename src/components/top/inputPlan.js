import styles from '@/styles/top/components/form.module.scss'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Btn1, NowPlan } from '@/components/top'
import axios from '@/lib/axios'

const InputPlan = ({ planInfo, user, plans }) => {
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const router = useRouter()

    const [popup, setPopup] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useFormContext()

    const onSubmit = useCallback(
        async data => {
            // console.log(data)

            router.push(`/mypage/plan/${user?.id}?confirm=1`)
        },
        [user, router],
    )

    const handleClickCancel = async () => {
        csrf()

        await axios
            .post(`/api/subscription/cancel/${user?.id}`, {
                db_name: 'corporate',
            })
            .then(res => {
                // console.log(res)
                alert('サブスクリプションを解約しました')
                router.reload()
            })
            .catch(e => console.error(e))
    }

    const handleClickPopup = useCallback(async () => {
        setPopup(prevState => !prevState)
    }, [setPopup])

    return (
        <>
            <div className={styles.planChangeTop}>
                <p className={styles.desc}>お客様が現在ご選択中のプラン内容</p>
                <NowPlan user={user} planInfo={planInfo} plans={plans} />
                {user && user?.account_type === 0 ? (
                    <p className={styles.caution}>
                        ※一度ログアウトいただかないと有料プランは登録できません
                    </p>
                ) : null}
                {planInfo && user ? (
                    <>
                        <div
                            className={styles.btnCover}
                            onClick={handleClickPopup}>
                            <Btn1 txt="解約する" />
                        </div>
                        <h3 className={styles.planChange}>プランを変更する</h3>
                        <p className={styles.txt}>
                            もっと自由に使いたい、自分の目的にあったプランへ変更したい...など選択するプランを途中で変更する場合には下記より選択いただき変更手続きが可能です。
                        </p>
                        <div className={styles.checkTxt}>
                            <p>
                                ※変更前に確認事項をご確認ください
                                <br />
                                ※当日決済されます
                                <br />
                                ※引き落としはカード会社によります
                                <br />
                                ※退会の場合はサブスクの解除を先に行って下さい
                            </p>
                            <p>
                                ・プラン変更後即時決済が行われます。
                                <br />
                                ・フリープランから有料プランへの移行は、こちらの画面ではできません。
                                <br />
                                ・一度退会手続きを行ってから再度有料プランでの登録をお願いいたします。
                                <br />
                                ・おまかせプランに変更後は、運営から連絡させていただきます。
                            </p>
                        </div>
                    </>
                ) : null}
            </div>
            {planInfo && user ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <article
                        className={`${styles.formContent} ${styles.planChangeForm}`}>
                        {planInfo?.stripe_price === plans.plan_intrust ? (
                            <dl>
                                <dt>会費のみプラン</dt>
                                <dd className={styles.courseArea}>
                                    {user?.coupon === null ? (
                                        <div className={styles.courseBtn}>
                                            <input
                                                id="course1"
                                                className={
                                                    styles.changePlanInput
                                                }
                                                type="checkbox"
                                                value="企業・団体"
                                                {...register('course', {
                                                    required: true,
                                                })}
                                            />
                                            <label htmlFor="course1">
                                                <p className={styles.planName}>
                                                    企業・団体
                                                </p>
                                                <div
                                                    className={
                                                        styles.planPrice
                                                    }>
                                                    <span
                                                        className={`${styles.medium} en`}>
                                                        ￥
                                                    </span>
                                                    <span
                                                        className={`${styles.big} en`}>
                                                        11,000
                                                    </span>
                                                    <span className={styles.sm}>
                                                        /月
                                                    </span>
                                                </div>
                                            </label>
                                        </div>
                                    ) : null}
                                    {parseInt(user?.coupon) === parseInt(1) ? (
                                        <div className={styles.courseBtn}>
                                            <input
                                                id="course2"
                                                className={
                                                    styles.changePlanInput
                                                }
                                                type="checkbox"
                                                value="フリーランス・専門家・個人事業主・一般ユーザー(プレミアム)"
                                                {...register('course', {
                                                    required: true,
                                                })}
                                            />
                                            <label htmlFor="course2">
                                                <p className={styles.planName}>
                                                    フリーランス 専門家
                                                    <br />
                                                    個人事業主
                                                    <br />
                                                    一般ユーザー(プレミアム)
                                                </p>
                                                <div
                                                    className={
                                                        styles.planPrice
                                                    }>
                                                    <span
                                                        className={`${styles.medium} en`}>
                                                        ￥
                                                    </span>
                                                    <span
                                                        className={`${styles.big} en`}>
                                                        5,500
                                                    </span>
                                                    <span className={styles.sm}>
                                                        /月
                                                    </span>
                                                </div>
                                            </label>
                                        </div>
                                    ) : null}
                                    {parseInt(user?.coupon) === parseInt(2) ? (
                                        <div className={styles.courseBtn}>
                                            <input
                                                id="course3"
                                                className={
                                                    styles.changePlanInput
                                                }
                                                type="checkbox"
                                                value="メディア・地方自治体"
                                                {...register('course', {
                                                    required: true,
                                                })}
                                            />
                                            <label htmlFor="course3">
                                                <p className={styles.planName}>
                                                    メディア
                                                    <br />
                                                    地方自治体
                                                </p>
                                                <div
                                                    className={
                                                        styles.planPrice
                                                    }>
                                                    <span
                                                        className={`${styles.medium} en`}>
                                                        ￥
                                                    </span>
                                                    <span
                                                        className={`${styles.big} en`}>
                                                        0
                                                    </span>
                                                    <span className={styles.sm}>
                                                        /月
                                                    </span>
                                                </div>
                                            </label>
                                        </div>
                                    ) : null}
                                    {errors.course && (
                                        <p className={`red ${styles.error}`}>
                                            プランが選択されておりません
                                        </p>
                                    )}
                                </dd>
                            </dl>
                        ) : null}
                        {planInfo?.stripe_price === plans.plan_corporate ? (
                            <dl>
                                <dt>★BJおまかせプラン（※会費込み）</dt>
                                <dd className={styles.courseArea}>
                                    {user?.coupon === null ? (
                                        <div className={styles.courseBtn}>
                                            <input
                                                id="course1"
                                                className={
                                                    styles.changePlanInput
                                                }
                                                type="checkbox"
                                                value="★BJおまかせプラン：企業・団体"
                                                {...register('course', {
                                                    required: true,
                                                })}
                                            />
                                            <label htmlFor="course1">
                                                <p className={styles.planName}>
                                                    企業・団体
                                                </p>
                                                <div
                                                    className={
                                                        styles.planPrice
                                                    }>
                                                    <span
                                                        className={`${styles.medium} en`}>
                                                        ￥
                                                    </span>
                                                    <span
                                                        className={`${styles.big} en`}>
                                                        55,000
                                                    </span>
                                                    <span className={styles.sm}>
                                                        /月
                                                    </span>
                                                </div>
                                            </label>
                                        </div>
                                    ) : null}
                                    {parseInt(user?.coupon) === parseInt(1) ? (
                                        <div className={styles.courseBtn}>
                                            <input
                                                id="course2"
                                                className={
                                                    styles.changePlanInput
                                                }
                                                type="checkbox"
                                                value="★BJおまかせプラン：フリーランス・専門家・個人事業主・一般ユーザー(プレミアム)"
                                                {...register('course', {
                                                    required: true,
                                                })}
                                            />
                                            <label htmlFor="course2">
                                                <p className={styles.planName}>
                                                    フリーランス 専門家
                                                    <br />
                                                    個人事業主
                                                    <br />
                                                    一般ユーザー(プレミアム)
                                                </p>
                                                <div
                                                    className={
                                                        styles.planPrice
                                                    }>
                                                    <span
                                                        className={`${styles.medium} en`}>
                                                        ￥
                                                    </span>
                                                    <span
                                                        className={`${styles.big} en`}>
                                                        49,500
                                                    </span>
                                                    <span className={styles.sm}>
                                                        /月
                                                    </span>
                                                </div>
                                            </label>
                                        </div>
                                    ) : null}
                                    {parseInt(user?.coupon) === parseInt(2) ? (
                                        <div className={styles.courseBtn}>
                                            <input
                                                id="course3"
                                                className={
                                                    styles.changePlanInput
                                                }
                                                type="checkbox"
                                                value="★BJおまかせプラン：メディア・地方自治体"
                                                {...register('course', {
                                                    required: true,
                                                })}
                                            />
                                            <label htmlFor="course3">
                                                <p className={styles.planName}>
                                                    メディア
                                                    <br />
                                                    地方自治体
                                                </p>
                                                <div
                                                    className={
                                                        styles.planPrice
                                                    }>
                                                    <span
                                                        className={`${styles.medium} en`}>
                                                        ￥
                                                    </span>
                                                    <span
                                                        className={`${styles.big} en`}>
                                                        44,000
                                                    </span>
                                                    <span className={styles.sm}>
                                                        /月
                                                    </span>
                                                </div>
                                            </label>
                                        </div>
                                    ) : null}
                                    {errors.course && (
                                        <p className={`red ${styles.error}`}>
                                            プランが選択されておりません
                                        </p>
                                    )}
                                </dd>
                            </dl>
                        ) : null}
                        <div className={styles.privacyCheck}>
                            <p className={styles.require}>必須</p>
                            <p className={styles.txt}>
                                必ず「
                                <a href="/privacy" target="_blank">
                                    プライバシーポリシー
                                </a>
                                」をご確認いただき、
                                <br />
                                ご同意のうえ、送信してください。
                            </p>
                            <label>
                                <input
                                    type="checkbox"
                                    {...register('privacy', { required: true })}
                                />
                                同意する
                            </label>
                            {errors.privacy && (
                                <p className={`red ${styles.error}`}>
                                    この項目は必須です
                                </p>
                            )}
                        </div>
                        <div className={styles.btnFlex}>
                            <div className={styles.type2}>
                                <Btn1 txt="マイページへ戻る" link="/mypage" />
                            </div>
                            <div>
                                <Btn1 txt="変更内容を確認する" submit />
                            </div>
                        </div>
                    </article>
                </form>
            ) : (
                <div className={styles.freeBox}>
                    <Btn1 txt="マイページへ戻る" link="/mypage" />
                </div>
            )}

            {popup ? (
                <div className={styles.popupArea} onClick={handleClickPopup}>
                    <div
                        className={styles.popupBox}
                        onClick={e => e.stopPropagation()}>
                        <h3>本当に解約しますか？</h3>
                        <div className={styles.btnBox}>
                            <button type="button" onClick={handleClickCancel}>
                                はい
                            </button>
                            <button type="button" onClick={handleClickPopup}>
                                いいえ
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default InputPlan
