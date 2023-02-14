import styles from '@/styles/top/components/form.module.scss'
import Link from 'next/link'
import { useState } from 'react'
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
    const { user } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/mypage',
    })
    const { register, handleSubmit, getValues, formState: { errors } } = useForm({
        mode: "onChange",
        criteriaMode: "all",
    })

    const onRegister = async (data) => {
        await csrf()

        await axios.post('/register', data)
        .then((res) => {
            // console.log(res)
            if (parseInt(data.course) === parseInt(0)) {
                router.push({
                    pathname: "/mypage",
                })
            } else if (parseInt(data.course) === parseInt(1)) {
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
            course: data.course,
        })
    }

    return (
        <>
            <section className="cont1">
                <Container small900>
                    <h2 className="ttl2">新規会員登録</h2>
                    <div className="breadcrumbBox">
                        <Link href="/">
                        <a>トップ</a>
                        </Link>
                        <div><img src="/top/breadcrumb.svg" alt="" /></div>
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
                                    <input
                                        id="password"
                                        type="password"
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
                                    <input
                                        id="password_confirmation"
                                        type="password"
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
                                    {errors.password_confirmation?.types.required && <p className={`red ${styles.error}`}>{errors.password_confirmation.types.required}</p>}
                                    {errors.password_confirmation?.types.validate && <p className={`red ${styles.error}`}>{errors.password_confirmation.types.validate}</p>}
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    コース選択
                                    <span className={styles.require}>必須</span>
                                </dt>
                                <dd className={styles.courseArea}>
                                    <div className={styles.courseBtn}>
                                        <input id="course1" type="radio" value={1} {...register("course", {required: true})} />
                                        <label htmlFor="course1">
                                            <p className={styles.planName}>企業・団体</p>
                                            <div className={styles.planPrice}>
                                                <span className={`${styles.medium} en`}>￥</span>
                                                <span className={`${styles.big} en`}>11,000</span>
                                                <span className={styles.sm}>/月</span>
                                            </div>
                                        </label>
                                    </div>
                                    <div className={styles.courseBtn}>
                                        <input id="course2" type="radio" value={2} {...register("course", {required: true})} />
                                        <label htmlFor="course2">
                                            <p className={styles.planName}>
                                                企業・団体
                                                <br/>（おまかせ込み）
                                            </p>
                                            <div className={styles.planPrice}>
                                                <span className={`${styles.medium} en`}>￥</span>
                                                <span className={`${styles.big} en`}>55,000</span>
                                                <span className={styles.sm}>/月</span>
                                            </div>
                                        </label>
                                    </div>
                                    <div className={styles.courseBtn}>
                                        <input id="course3" type="radio" value={0} {...register("course", {required: true})} />
                                        <label htmlFor="course3">
                                            <p className={styles.planName}>一般ユーザー(フリー)</p>
                                            <div className={styles.planPrice}>
                                                <span className={`${styles.medium} en`}>￥</span>
                                                <span className={`${styles.big} en`}>0</span>
                                                <span className={styles.sm}>/月</span>
                                            </div>
                                        </label>
                                    </div>
                                    {errors.course && <p className={`red ${styles.error}`}>この項目は必須です</p>}
                                </dd>
                            </dl>
                            <div className={styles.privacyCheck}>
                                <p className={styles.require}>必須</p>
                                <p className={styles.txt}>
                                必ず「
                                <Link href="/privacy">
                                    <a>個人情報の取扱いについて</a>
                                </Link>
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
                                <Link href="/login">
                                    <a className={styles.registered}>すでに登録済みの方はこちら</a>
                                </Link>
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