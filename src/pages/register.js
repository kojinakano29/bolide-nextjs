import styles from '@/styles/top/components/form.module.scss'
import { useCallback, useEffect, useState } from 'react'
import PageLayoutTop from '@/components/Layouts/pageLayoutTop'
import Container from '@/components/top/Layout/container'
import { useForm } from 'react-hook-form'
import axios from '@/lib/axios'
import { Btn1 } from '@/components/top'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'

const Register = () => {
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const router = useRouter()
    const [disabled, setDisabled] = useState(false)
    const [view, setView] = useState(false)
    const [view2, setView2] = useState(false)
    const { user } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/mypage',
    })
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
        mode: "onChange",
        criteriaMode: "all",
    })

    useEffect(() => {
        if (router.query.plan === 'corp') {
            setValue('account_type', '1')
        } else if (router.query.plan === 'free') {
            setValue('account_type', '0')
        }
    }, [router])

    const onRegister = async (data) => {
        await csrf()

        await axios.post('/register', data)
        .then((res) => {
            // console.log(res)
            if (data.account_type === "0") {
                router.push({
                    pathname: "/mypage",
                })
            } else if (data.account_type === "1") {
                router.push({
                    pathname: "/membership_register",
                })
            }
        }).catch(e => console.error(e))

        await setDisabled(false)
    }

    const onSubmit = async (data) => {
        // console.log(data)
        setDisabled(true)

        onRegister({
            name: `${data.name1}${data.name2}`,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation,
            account_type: data.account_type,
        })
    }

    const handleClickView = useCallback(async () => {
        setView(prevState => !prevState)
    }, [setView])

    const handleClickView2 = useCallback(async () => {
        setView2(prevState => !prevState)
    }, [setView2])

    return (
        <>
            <section className="cont1">
                <Container small900>
                    <h2 className="ttl2">新規会員登録</h2>
                    <div className="breadcrumbBox">
                        <a href="/">トップ</a>
                        <div><img src="/top/breadcrumb.svg" alt=">" /></div>
                        <p>新規会員登録</p>
                    </div>
                </Container>
            </section>

            <section className={styles.formArea}>
                <Container small900>
                    <p className={styles.catch}>必要事項をご入力の上、お申込みください。</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <article className={styles.formContent}>
                            <dl>
                                <dt>
                                    <label htmlFor="name">お名前</label>
                                    <span className={styles.require}>必須</span>
                                </dt>
                                <dd className={styles.nameArea}>
                                    <input
                                        id="name"
                                        type="text"
                                        {...register("name1", {required: true})}
                                        placeholder="山田"
                                    />
                                    <input
                                        type="text"
                                        {...register("name2", {required: true})}
                                        placeholder="太郎"
                                    />
                                    {errors.name1 && <p className={`red ${styles.error}`}>この項目は必須です</p>}
                                    {errors.name2 && <p className={`red ${styles.error}`}>この項目は必須です</p>}
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <label htmlFor="email">メールアドレス</label>
                                    <span className={styles.require}>必須</span>
                                </dt>
                                <dd>
                                    <input
                                        id="email"
                                        type="email"
                                        {...register("email", {required: true})}
                                        placeholder="yourmail@example.jp"
                                    />
                                    {errors.email && <p className={`red ${styles.error}`}>この項目は必須です</p>}
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <label htmlFor="password">新しいパスワード</label>
                                    <span className={styles.require}>必須</span>
                                </dt>
                                <dd>
                                    <div className={styles.passwordBox}>
                                        <input
                                            id="password"
                                            type={view ? "text" : "password"}
                                            {...register("password", {
                                                required: {
                                                    value: true,
                                                    message: "この項目は必須です",
                                                },
                                                minLength: {
                                                    value: 8,
                                                    message: "8文字以上で入力してください"
                                                },
                                                maxLength: {
                                                    value: 20,
                                                    message: "20文字以内で入力してください"
                                                },
                                            })}
                                            placeholder="半角英数記号8～20文字"
                                        />
                                        <p
                                            className={styles.view}
                                            onClick={handleClickView}
                                        >{view ? "非表示" : "表示"}</p>
                                    </div>
                                    {errors.password?.types.required && <p className={`red ${styles.error}`}>{errors.password.types.required}</p>}
                                    {errors.password?.types.minLength && <p className={`red ${styles.error}`}>{errors.password.types.minLength}</p>}
                                    {errors.password?.types.maxLength && <p className={`red ${styles.error}`}>{errors.password.types.maxLength}</p>}
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <label htmlFor="password_confirmation">新しいパスワード（確認）</label>
                                    <span className={styles.require}>必須</span>
                                </dt>
                                <dd>
                                    <div className={styles.passwordBox}>
                                        <input
                                            id="password_confirmation"
                                            type={view2 ? "text" : "password"}
                                            {...register("password_confirmation", {
                                                required: {
                                                    value: true,
                                                    message: "この項目は必須です",
                                                },
                                                validate: (value) => {
                                                    return (
                                                        value === getValues("password") || "パスワードが一致しません"
                                                    )
                                                }
                                            })}
                                            placeholder="半角英数記号8～20文字"
                                        />
                                        <p
                                            className={styles.view}
                                            onClick={handleClickView2}
                                        >{view2 ? "非表示" : "表示"}</p>
                                    </div>
                                    {errors.password_confirmation?.types.required && <p className={`red ${styles.error}`}>{errors.password_confirmation.types.required}</p>}
                                    {errors.password_confirmation?.types.validate && <p className={`red ${styles.error}`}>{errors.password_confirmation.types.validate}</p>}
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    コース選択
                                    <span className={styles.require}>必須</span>
                                    <p className={styles.desc2}>※有料プランを選択した場合は次の段階で詳細コースを再度選択いただきます。</p>
                                </dt>
                                <dd className={styles.courseArea}>
                                    <div className={styles.courseBtn}>
                                        <input id="account_type1" type="radio" value="1" {...register("account_type", {required: true})} />
                                        <label htmlFor="account_type1">
                                            <p className={styles.planName}>
                                                ビジネスユーザー・企業・団体
                                                <br/>/フリーランス・専門家・個人事業主
                                                <br/>・一般ユーザー(プレミアム)
                                                <br/>/メディア・地方自治体
                                                <br/>
                                            </p>
                                            <div className={styles.planPrice}>
                                                <span className={`${styles.medium} en`}>￥</span>
                                                <span className={`${styles.big} en`}>~11,000</span>
                                                <span className={styles.sm}>/月</span>
                                            </div>
                                        </label>
                                    </div>
                                    <div className={styles.courseBtn}>
                                        <input id="account_type3" type="radio" value="0" {...register("account_type", {required: true})} />
                                        <label htmlFor="account_type3">
                                            <p className={styles.planName}>一般ユーザー(フリー)</p>
                                            <div className={styles.planPrice}>
                                                <span className={`${styles.medium} en`}>￥</span>
                                                <span className={`${styles.big} en`}>0</span>
                                                <span className={styles.sm}>/月</span>
                                            </div>
                                        </label>
                                    </div>
                                    {errors.account_type && <p className={`red ${styles.error}`}>この項目は必須です</p>}
                                </dd>
                            </dl>
                            <div className={styles.privacyArea}>
                                <p>
                                    Bolide's Japanの
                                    <a href="/terms" target="_blank" rel="noopener noreferrer">利用規約</a>
                                    はこちら
                                </p>
                                <p>
                                    LIONDORの
                                    <a href="/liondor/terms" target="_blank" rel="noopener noreferrer">利用規約</a>
                                    はこちら
                                </p>
                                <p>
                                    Dellamallの
                                    <a href="/dellamall/terms" target="_blank" rel="noopener noreferrer">利用規約</a>
                                    はこちら
                                </p>
                                <p>
                                    Corapuraの
                                    <a href="/corapura/terms" target="_blank" rel="noopener noreferrer">利用規約</a>
                                    はこちら
                                </p>
                            </div>
                            <div className={styles.privacyCheck}>
                                <p className={styles.require}>必須</p>
                                <p className={styles.txt}>
                                必ず「
                                <a href="/privacy" target="_blank">プライバシーポリシー</a>
                                」をご確認いただき、
                                <br/>ご同意のうえ、送信してください。
                                </p>
                                <label>
                                <input type="checkbox" {...register("privacy", {required: true})} />
                                同意する
                                </label>
                                {errors.privacy && <p className={`red ${styles.error}`}>この項目は必須です</p>}
                            </div>
                            <div className={styles.btnFlex}>
                                <a href="/login" className={styles.registered}>すでに登録済みの方はこちら</a>
                                <Btn1 txt="登録する" submit disabled={disabled} />
                            </div>
                        </article>
                    </form>
                </Container>
            </section>
        </>
    )
}

export default Register

Register.getLayout = function getLayout(page) {
    return <PageLayoutTop>{page}</PageLayoutTop>
}